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
                const colCount = $row.children().length;

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
                        deleteColumn(colIndex);
                        break;
                    case 'mergeCells':
                        mergeCells();
                        break;
                    case 'unmergeCells':
                        unmergeCells();
                        break;
                }
                settings.onCellResize($cell);
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
                    startWidth = $cell.width();
                    startHeight = $cell.height();

                    $(document).on('mousemove.resize', function(e) {
                        newWidth = Math.max(settings.minWidth, startWidth + (e.pageX - startX));
                        newHeight = Math.max(settings.minHeight, startHeight + (e.pageY - startY));
                        
                        // 调整单元格大小
                        const colIndex = $cell.index();
                        $table.find('tr').each(function() {
                            $(this).find('td, th').eq(colIndex).css('width', '');
                        });
                        $cell.width(newWidth);

                        const rowIndex = $cell.parent().index();
                        $table.find('tr').eq(rowIndex).children('td, th').css('height', '');
                        $cell.height(newHeight);
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
                    });
                });
            }

            // 修改插入行函数
            function insertRow(index) {
                const colCount = $table.find('tr:first').children().length;
                const $newRow = $('<tr/>');
                for (let i = 0; i < colCount; i++) {
                    const $cell = $('<td style="height:20pt"/>').text(' ');
                    addResizeHandle($cell);
                    $cell.appendTo($newRow);
                }
                if (index === 0) {
                    $table.find('tbody').prepend($newRow);
                } else {
                    $table.find('tr').eq(index - 1).after($newRow);
                }
            }

            // 修改插入列函数
            function insertColumn(index) {
                $table.find('tr').each(function() {
                    const $cell = $('<td style="width:20pt"/>').text(' ');
                    addResizeHandle($cell);
                    if (index === 0) {
                        $(this).prepend($cell);
                    } else {
                        $(this).find('td,th').eq(index - 1).after($cell);
                    }
                });
            }

            // 删除列
            function deleteColumn(index) {
                $table.find('tr').each(function() {
                    $(this).find('td,th').eq(index).remove();
                });
            }

            // 添加合并单元格功能
            function mergeCells() {
                var selectedCells = $('.hiprint-selected-cell');
                if (selectedCells.length <= 1) {
                    alert('请选择多个单元格进行合并');
                    return;
                }

                // 检查选择的单元格是否连续
                if (!areSelectedCellsContiguous(selectedCells)) {
                    alert('请选择连续的单元格进行合并');
                    return;
                }

                // 获取选择区域的范围
                var firstCell = selectedCells.first();
                var lastCell = selectedCells.last();
                var rowSpan = getRowSpan(selectedCells);
                var colSpan = getColSpan(selectedCells);

                // 保留第一个单元格，删除其他单元格
                firstCell.attr('rowspan', rowSpan).attr('colspan', colSpan);
                selectedCells.not(firstCell).remove();
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

                // 移除rowspan和colspan属性
                selectedCell.removeAttr('rowspan').removeAttr('colspan');

                // 重新创建被合并的单元格
                var row = selectedCell.parent('tr');
                var cellIndex = selectedCell.index();

                for (var i = 0; i < rowspan; i++) {
                    var currentRow = i === 0 ? row : row.nextAll('tr').eq(i - 1);
                    for (var j = 0; j < colspan; j++) {
                        if (i === 0 && j === 0) continue; // 跳过第一个单元格
                        var $newCell = $('<td></td>');
                        currentRow.find('td').eq(cellIndex + j - 1).after($newCell);
                        // 为新创建的单元格添加拖动手柄
                        addResizeHandle($newCell);
                    }
                }
            }

            // 辅助函数：检查选择的单元格是否连续
            function areSelectedCellsContiguous(cells) {
                // 实现检查逻辑
                return true; // 简化版本
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
        });
    };
})(jQuery);