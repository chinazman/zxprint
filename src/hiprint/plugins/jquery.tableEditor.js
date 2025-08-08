(function($) {
    $.fn.tableEditor = function(options) {
        const defaults = {
            minWidth: 37.5,
            minHeight: 22.5,
            onCellSelect: null,      // 单个单元格选中事件
            onCellsSelect: null,     // 多个单元格选中事件
            onCellResize: null       // 单元格大小改变事件
        };
        
        const settings = $.extend({}, defaults, options);

        return this.each(function() {
            const $table = $(this);
            
            // 添加表格类名
            $table.addClass('hiprint-grid-table');
            
            // 移除可能存在的border属性
            $table.removeAttr('border');
            
            // ---------------------------
            // 内部状态与工具函数（重构核心）
            // ---------------------------

            // 维护 colgroup，用于稳定列宽调整
            let $colgroup = null;

            // 计算整表的“逻辑列”数量（考虑现有 colspan）
            function computeLogicalColCount() {
                let maxCols = 0;
                $table.find('tr').each(function() {
                    let count = 0;
                    $(this).children('td,th').each(function() {
                        const colspan = parseInt($(this).attr('colspan')) || 1;
                        count += colspan;
                    });
                    if (count > maxCols) maxCols = count;
                });
                return maxCols || 1;
            }

            // 创建或同步 colgroup 列数
            function ensureColgroup() {
                const logicalCols = computeLogicalColCount();
                $colgroup = $table.children('colgroup');
                if (!$colgroup.length) {
                    $colgroup = $('<colgroup/>');
                    for (let i = 0; i < logicalCols; i++) {
                        $colgroup.append($('<col/>'));
                    }
                    $table.prepend($colgroup);
                } else {
                    const current = $colgroup.children('col').length;
                    if (current < logicalCols) {
                        for (let i = current; i < logicalCols; i++) {
                            $colgroup.append($('<col/>'));
                        }
                    } else if (current > logicalCols) {
                        for (let i = current - 1; i >= logicalCols; i--) {
                            $colgroup.children('col').eq(i).remove();
                        }
                    }
                }
            }

            // 构建整表逻辑映射：map[rowIndex][colIndex] => { cell, isOrigin, originRow, originCol }
            function buildTableLayout() {
                const rows = $table.find('tr');
                const totalRows = rows.length;
                const totalCols = computeLogicalColCount();
                const map = Array.from({ length: totalRows }, () => Array.from({ length: totalCols }, () => null));

                rows.each(function(rowIndex) {
                    let cursor = 0;
                    $(this).children('td,th').each(function() {
                        const $cell = $(this);
                        const colspan = parseInt($cell.attr('colspan')) || 1;
                        const rowspan = parseInt($cell.attr('rowspan')) || 1;

                        // 找到此行中第一个可放置的位置
                        while (cursor < totalCols && map[rowIndex][cursor] !== null) {
                            cursor++;
                        }
                        const startCol = cursor;
                        for (let r = 0; r < rowspan; r++) {
                            for (let c = 0; c < colspan; c++) {
                                const rr = rowIndex + r;
                                const cc = startCol + c;
                                if (rr < totalRows && cc < totalCols) {
                                    map[rr][cc] = {
                                        cell: $cell,
                                        isOrigin: r === 0 && c === 0,
                                        originRow: rowIndex,
                                        originCol: startCol
                                    };
                                }
                            }
                        }
                        cursor += colspan;
                    });
                });

                return {
                    rows: totalRows,
                    cols: totalCols,
                    map
                };
            }

            // 获取某个单元格的起始逻辑坐标（originRow, originCol）
            function findCellOrigin($target) {
                const layout = buildTableLayout();
                for (let r = 0; r < layout.rows; r++) {
                    for (let c = 0; c < layout.cols; c++) {
                        const entry = layout.map[r][c];
                        if (entry && entry.cell[0] === $target[0] && entry.isOrigin) {
                            return { row: r, col: c };
                        }
                    }
                }
                // 兜底：返回其所在行和 DOM 索引（不可靠，仅作为保底）
                return { row: $target.parent().index(), col: $target.index() };
            }

            // 在指定逻辑位置插入一个新 td（仅在该位置未被上层 rowspan 覆盖时使用）
            function insertCellAt(rowIndex, colIndex) {
                const layout = buildTableLayout();
                const $row = $table.find('tr').eq(rowIndex);
                // 在当前行中找到第一个“起点单元格”且逻辑列 > colIndex 的节点，作为插入参照
                let $ref = null;
                for (let c = colIndex; c < layout.cols; c++) {
                    const entry = layout.map[rowIndex][c];
                    if (entry && entry.isOrigin && entry.originRow === rowIndex) {
                        $ref = entry.cell;
                        break;
                    }
                }
                const $newCell = $('<td style="width:20pt;height:20pt"> </td>');
                addResizeHandle($newCell);
                if ($ref && $ref.length) {
                    $newCell.insertBefore($ref);
                } else {
                    $row.append($newCell);
                }
                return $newCell;
            }

            // 同步 colgroup 列数
            ensureColgroup();

            // 添加选择相关变量
            let isSelecting = false;
            let startCell = null;
            
            // 添加鼠标按下事件
            $table.on('mousedown', 'td', function(e) {
                // 如果是右键点击，不进行选择
                if (e.button === 2) return;
                
                isSelecting = true;
                startCell = $(this);
                clearSelection();
                $(this).addClass('hiprint-selected-cell');
                
                // 触发单个单元格选中事件
                if (typeof settings.onCellSelect === 'function') {
                    settings.onCellSelect($(this));
                }
                
                e.preventDefault();
            });

            // 添加鼠标移动事件
            $table.on('mouseover', 'td', function(e) {
                if (!isSelecting) return;
                
                clearSelection();
                
                // 获取开始和当前单元格的位置
                const startPos = getCellPosition(startCell);
                const currentPos = getCellPosition($(this));
                
                // 选择范围内的所有单元格
                selectCellRange(startPos, currentPos);
            });

            // 添加鼠标松开事件
            $(document).on('mouseup', function() {
                if (isSelecting) {
                    // 触发多个单元格选中事件
                    if (typeof settings.onCellsSelect === 'function') {
                        settings.onCellsSelect($('.hiprint-selected-cell'));
                    }
                }
                isSelecting = false;
            });

            // 清除选择
            function clearSelection() {
                $table.find('td').removeClass('hiprint-selected-cell');
            }

            // 获取单元格位置
            function getCellPosition($cell) {
                return {
                    row: $cell.parent().index(),
                    col: $cell.index()
                };
            }

            // 选择单元格范围
            function selectCellRange(start, end) {
                const minRow = Math.min(start.row, end.row);
                const maxRow = Math.max(start.row, end.row);
                const minCol = Math.min(start.col, end.col);
                const maxCol = Math.max(start.col, end.col);

                for (let i = minRow; i <= maxRow; i++) {
                    const $row = $table.find('tr').eq(i);
                    for (let j = minCol; j <= maxCol; j++) {
                        $row.find('td').eq(j).addClass('hiprint-selected-cell');
                    }
                }
            }

            // 初始化右键菜单
            const $contextMenu = $('<div/>', {
                class: 'hiprint-grid-menu',
                css: {
                    position: 'absolute',
                    display: 'none',
                    zIndex: 1000,
                    background: '#fff',
                    border: '1px solid #ccc',
                    padding: '5px 0',
                    boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
                }
            }).appendTo('body');

            // 添加菜单项
            const menuItems = [
                {text: '新增上方行', action: 'addRowAbove'},
                {text: '新增下方行', action: 'addRowBelow'},
                {text: '新增左边列', action: 'addColLeft'},
                {text: '新增右边列', action: 'addColRight'},
                {text: '删除行', action: 'deleteRow'},
                {text: '删除列', action: 'deleteCol'},
                {text: "合并单元格", action: 'mergeCells'},
                {text: "取消合并", action: 'unmergeCells'}
            ];

            menuItems.forEach(item => {
                $('<div/>', {
                    text: item.text,
                    class: 'menu-item',
                    css: {
                        padding: '5px 20px',
                        cursor: 'pointer',
                        '&:hover': {
                            background: '#f0f0f0'
                        }
                    },
                    on: {
                        click: function() {
                            handleMenuAction(item.action, currentCell);
                            $contextMenu.hide();
                        }
                    }
                }).appendTo($contextMenu);
            });

            let currentCell = null;

            // 修改右键菜单事件
            $table.on('contextmenu', 'td', function(e) {
                e.preventDefault();
                currentCell = $(this);
                
                // 如果右键点击的单元格不在选中范围内，清除其他选择并只选中当前单元格
                if (!$(this).hasClass('hiprint-selected-cell')) {
                    clearSelection();
                    $(this).addClass('hiprint-selected-cell');
                }
                
                $contextMenu.css({
                    top: e.pageY,
                    left: e.pageX
                }).show();
            });

            // 点击其他地方关闭菜单
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.hiprint-grid-menu').length) {
                    $contextMenu.hide();
                }
            });

            // 处理菜单动作
            function handleMenuAction(action, $cell) {
                const rowIndex = $cell.parent().index();
                const colIndex = $cell.index();
                const $row = $cell.parent();
                const rowCount = $table.find('tr').length;
                const colCount = computeLogicalColCount();

                switch(action) {
                    case 'addRowAbove':
                        insertRow(rowIndex);
                        break;
                    case 'addRowBelow':
                        insertRow(rowIndex + 1);
                        break;
                    case 'addColLeft':
                        insertColumn(colIndex);
                        break;
                    case 'addColRight':
                        insertColumn(colIndex + 1);
                        break;
                    case 'deleteRow':
                        if (rowCount <= 1) {
                            alert('不能删除最后一行');
                            return;
                        }
                        $row.remove();
                        break;
                    case 'deleteCol':
                        if (colCount <= 1) {
                            alert('不能删除最后一列');
                            return;
                        }
                        // 使用逻辑列索引删除
                        const origin = findCellOrigin($cell);
                        deleteColumn(origin.col);
                        break;
                    case 'mergeCells':
                        mergeCells();
                        break;
                    case 'unmergeCells':
                        unmergeCells();
                        break;
                }
                if (typeof settings.onCellResize === 'function') {
                    settings.onCellResize($cell);
                }
                ensureColgroup();
            }

            // 添加拖动手柄的函数
            function addResizeHandle($cell) {
                $cell.css('position', 'relative');
                
                // 添加拖动手柄
                const $resizeHandle = $('<div/>', {
                    class: 'hiprint-resize-handle',
                    css: {
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '4.5pt',
                        height: '4.5pt',
                        cursor: 'se-resize',
                        background: '#ccc'
                    }
                }).appendTo($cell);

                let startX, startY, startWidth, startHeight;
                let newWidth, newHeight;

                $resizeHandle.on('mousedown', function(e) {
                    e.preventDefault();
                    startX = e.pageX;
                    startY = e.pageY;
                    // 以 colgroup 的当前列宽为准；若无则取当前 cell 宽
                    const origin = findCellOrigin($cell);
                    const $col = $table.children('colgroup').children('col').eq(origin.col);
                    startWidth = parseFloat($col.attr('width')) || $col.width() || $cell.width();
                    startHeight = $cell.parent().outerHeight();

                    $(document).on('mousemove.resize', function(e) {
                        newWidth = Math.max(settings.minWidth, startWidth + (e.pageX - startX));
                        newHeight = Math.max(settings.minHeight, startHeight + (e.pageY - startY));

                        // 调整列宽：作用于 colgroup 指定列
                        ensureColgroup();
                        const origin = findCellOrigin($cell);
                        const $targetCol = $table.children('colgroup').children('col').eq(origin.col);
                        $targetCol.css('width', newWidth + 'px').attr('width', newWidth);

                        // 调整当前行高
                        $cell.parent().css('height', newHeight + 'px');
                    });

                    $(document).on('mouseup.resize', function() {
                        // 触发单元格大小改变事件
                        if (typeof settings.onCellResize === 'function') {
                            settings.onCellResize($cell, {
                                width: newWidth,
                                height: newHeight
                            });
                        }
                        $(document).off('.resize');
                        ensureColgroup();
                    });
                });
            }

            // 修改插入行函数（保持最小侵入；未完整处理跨行合并的复杂场景）
            function insertRow(index) {
                const colCount = computeLogicalColCount();
                const $newRow = $('<tr/>');
                for (let i = 0; i < colCount; i++) {
                    const $cell = $('<td style="height:20pt"/>').text(' ');
                    addResizeHandle($cell);
                    $cell.appendTo($newRow);
                }
                if (index === 0) {
                    const $tbody = $table.find('tbody');
                    if ($tbody.length) {
                        $tbody.prepend($newRow);
                    } else {
                        // 无 tbody 时直接在表格内插入到首行前
                        const $firstTr = $table.find('tr').first();
                        if ($firstTr.length) {
                            $newRow.insertBefore($firstTr);
                        } else {
                            $table.append($newRow);
                        }
                    }
                } else {
                    $table.find('tr').eq(index - 1).after($newRow);
                }
                ensureColgroup();
            }

            // 修改插入列函数（考虑合并单元格与 colgroup）
            function insertColumn(index) {
                const layout = buildTableLayout();
                // 对每一行：若 index 位置被上方单元格覆盖，仅在其起始行增加 colspan；否则在本行插入新 td
                for (let r = 0; r < layout.rows; r++) {
                    const entry = index < layout.cols ? layout.map[r][index] : layout.map[r][layout.cols - 1];
                    if (index < layout.cols && entry) {
                        if (entry.isOrigin && entry.originRow === r && entry.originCol === index) {
                            // 在本行 index 处前插入新单元格
                            insertCellAt(r, index);
                        } else {
                            // 被覆盖：只在起始行增加 colspan
                            if (entry.originRow === r) {
                                const $origin = entry.cell;
                                const cs = (parseInt($origin.attr('colspan')) || 1) + 1;
                                $origin.attr('colspan', cs);
                            }
                        }
                    } else {
                        // 追加在末尾：若末尾由跨列单元覆盖，仅在起始行扩展；否则在本行追加
                        const tailEntry = layout.map[r][layout.cols - 1];
                        if (tailEntry && tailEntry.originRow === r && !tailEntry.isOrigin) {
                            const $origin = tailEntry.cell;
                            const cs = (parseInt($origin.attr('colspan')) || 1) + 1;
                            $origin.attr('colspan', cs);
                        } else if (tailEntry && tailEntry.isOrigin && (parseInt(tailEntry.cell.attr('colspan')) || 1) > 1 && tailEntry.originRow !== r) {
                            // 其他覆盖情况：无需在本行插入，由起始行扩展
                        } else {
                            insertCellAt(r, layout.cols); // 末尾插入
                        }
                    }
                }
                ensureColgroup();
                // colgroup 新增一列
                $table.children('colgroup').append($('<col/>'));
            }

            // 删除列（基于逻辑列索引，正确处理跨列合并）
            function deleteColumn(index) {
                const layout = buildTableLayout();
                if (index < 0 || index >= layout.cols) return;

                const processedOrigins = new Set();
                for (let r = 0; r < layout.rows; r++) {
                    const entry = layout.map[r][index];
                    if (!entry) continue;
                    const key = entry.originRow + ':' + entry.originCol;
                    if (entry.isOrigin && entry.originRow === r && entry.originCol === index) {
                        const $cell = entry.cell;
                        const colspan = parseInt($cell.attr('colspan')) || 1;
                        if (colspan <= 1) {
                            $cell.remove();
                        } else {
                            $cell.attr('colspan', colspan - 1);
                        }
                        processedOrigins.add(key);
                    } else {
                        // 被覆盖：在起始行减少一次 colspan
                        if (!processedOrigins.has(key)) {
                            const $origin = entry.cell;
                            const colspan = parseInt($origin.attr('colspan')) || 1;
                            $origin.attr('colspan', Math.max(1, colspan - 1));
                            processedOrigins.add(key);
                        }
                    }
                }
                // 同步 colgroup 列数
                const $cols = $table.children('colgroup').children('col');
                if ($cols.length > 1) {
                    $cols.eq(index).remove();
                }
                ensureColgroup();
            }

            // 添加合并单元格功能（支持递进式合并，使用逻辑网格校验与处理）
            function mergeCells() {
                var selectedCells = $('.hiprint-selected-cell');
                if (selectedCells.length <= 1) {
                    alert('请选择多个单元格进行合并');
                    return;
                }

                const layout = buildTableLayout();

                // 计算选择集的逻辑覆盖
                const coverage = computeLogicalCoverageFromSelection(layout, selectedCells);
                if (!coverage) {
                    alert('选择区域无效');
                    return;
                }

                const { minRow, maxRow, minCol, maxCol, coveredSet } = coverage;

                // 校验：必须为完整矩形覆盖
                for (let r = minRow; r <= maxRow; r++) {
                    for (let c = minCol; c <= maxCol; c++) {
                        const key = r + ',' + c;
                        if (!coveredSet.has(key)) {
                            alert('请选择连续的矩形区域进行合并');
                            return;
                        }
                    }
                }

                // 校验：矩形内所有单元格（包括已合并的）必须完全包含在该矩形内（避免部分切割）
                const originUsed = new Set();
                for (let r = minRow; r <= maxRow; r++) {
                    for (let c = minCol; c <= maxCol; c++) {
                        const entry = layout.map[r][c];
                        if (!entry) continue;
                        const originKey = entry.originRow + ',' + entry.originCol;
                        if (originUsed.has(originKey)) continue;
                        originUsed.add(originKey);
                        const $origin = entry.cell;
                        const rs = parseInt($origin.attr('rowspan')) || 1;
                        const cs = parseInt($origin.attr('colspan')) || 1;
                        const orMinR = entry.originRow;
                        const orMaxR = entry.originRow + rs - 1;
                        const orMinC = entry.originCol;
                        const orMaxC = entry.originCol + cs - 1;
                        if (orMinR < minRow || orMaxR > maxRow || orMinC < minCol || orMaxC > maxCol) {
                            alert('选区部分包含已有合并单元格，需完整包含后才能合并');
                            return;
                        }
                    }
                }

                // 选择保留的起始单元格：矩形左上角的起始单元格
                const topLeftEntry = layout.map[minRow][minCol];
                if (!topLeftEntry || !topLeftEntry.isOrigin) {
                    alert('无法识别合并起点');
                    return;
                }
                const $keep = topLeftEntry.cell;

                // 计算合并后的跨度
                const rowSpan = (maxRow - minRow + 1);
                const colSpan = (maxCol - minCol + 1);

                // 删除矩形内其他起点单元格，仅保留 $keep
                for (let r = minRow; r <= maxRow; r++) {
                    for (let c = minCol; c <= maxCol; c++) {
                        const entry = layout.map[r][c];
                        if (!entry) continue;
                        if (entry.isOrigin) {
                            const $cell = entry.cell;
                            if ($cell[0] !== $keep[0]) {
                                $cell.remove();
                            }
                        }
                    }
                }

                // 设置保留单元格的跨度
                $keep.attr('rowspan', rowSpan).attr('colspan', colSpan);
                ensureColgroup();
            }

            // 取消合并单元格
            function unmergeCells() {
                var selectedCell = $('.hiprint-selected-cell');
                if (selectedCell.length !== 1) {
                    alert('请选择一个已合并的单元格');
                    return;
                }

                var rowspan = parseInt(selectedCell.attr('rowspan')) || 1;
                var colspan = parseInt(selectedCell.attr('colspan')) || 1;

                if (rowspan === 1 && colspan === 1) {
                    alert('该单元格未被合并');
                    return;
                }

                // 基于逻辑位置进行拆分与补齐
                const origin = findCellOrigin(selectedCell);
                selectedCell.removeAttr('rowspan').removeAttr('colspan');
                for (var i = 0; i < rowspan; i++) {
                    for (var j = 0; j < colspan; j++) {
                        if (i === 0 && j === 0) continue;
                        insertCellAt(origin.row + i, origin.col + j);
                    }
                }
                ensureColgroup();
            }

            // 辅助函数：根据选择计算逻辑覆盖；用于矩形校验
            function computeLogicalCoverageFromSelection(layout, cells) {
                const coveredSet = new Set();
                const origins = [];
                function getOriginInLayout($cell) {
                    for (let r = 0; r < layout.rows; r++) {
                        for (let c = 0; c < layout.cols; c++) {
                            const e = layout.map[r][c];
                            if (e && e.cell[0] === $cell[0] && e.isOrigin) {
                                return { row: r, col: c };
                            }
                        }
                    }
                    return null;
                }
                cells.each(function() {
                    const $cell = $(this);
                    const origin = getOriginInLayout($cell);
                    if (!origin) return;
                    const rs = parseInt($cell.attr('rowspan')) || 1;
                    const cs = parseInt($cell.attr('colspan')) || 1;
                    for (let r = origin.row; r < origin.row + rs; r++) {
                        for (let c = origin.col; c < origin.col + cs; c++) {
                            coveredSet.add(r + ',' + c);
                        }
                    }
                    origins.push(origin);
                });
                if (coveredSet.size === 0) return null;
                let minRow = Infinity, maxRow = -1, minCol = Infinity, maxCol = -1;
                coveredSet.forEach(key => {
                    const [rs, cs] = key.split(',').map(Number);
                    if (rs < minRow) minRow = rs;
                    if (rs > maxRow) maxRow = rs;
                    if (cs < minCol) minCol = cs;
                    if (cs > maxCol) maxCol = cs;
                });
                return { minRow, maxRow, minCol, maxCol, coveredSet };
            }

            // 辅助函数：检查选择的单元格是否连续（基于逻辑覆盖）
            function areSelectedCellsContiguous(cells) {
                const layout = buildTableLayout();
                const coverage = computeLogicalCoverageFromSelection(layout, cells);
                if (!coverage) return false;
                const { minRow, maxRow, minCol, maxCol, coveredSet } = coverage;
                for (let r = minRow; r <= maxRow; r++) {
                    for (let c = minCol; c <= maxCol; c++) {
                        if (!coveredSet.has(r + ',' + c)) return false;
                    }
                }
                return true;
            }

            // 辅助函数：获取选择区域的行数
            function getRowSpan(cells) {
                var rows = [];
                cells.each(function() {
                    var rowIndex = $(this).parent('tr').index();
                    if (!rows.includes(rowIndex)) {
                        rows.push(rowIndex);
                    }
                });
                return rows.length;
            }

            // 辅助函数：获取选择区域的列数
            function getColSpan(cells) {
                var cols = [];
                cells.each(function() {
                    var colIndex = $(this).index();
                    if (!cols.includes(colIndex)) {
                        cols.push(colIndex);
                    }
                });
                return cols.length;
            }

            // 修改初始化代码
            $table.find('td, th').each(function() {
                addResizeHandle($(this));
            });

            // 初始同步 colgroup
            ensureColgroup();
        });
    };
})(jQuery);