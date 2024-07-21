"use strict";
/*
这个JavaScript文件定义了一个名为`Ct`的模块，它主要负责管理和注册一系列的打印元素选项项（print element options）。这些选项项用于配置打印元素的各种样式和行为，例如字体、对齐方式、边框、水印、页码等。具体来说，该文件实现了以下功能：

1. **选项项注册与管理**：`Ct`模块提供了`registerItem`和`getItem`方法，用于注册和获取打印元素的选项配置。

2. **创建用户界面**：每个选项项都有一个`createTarget`方法，用于生成对应的HTML元素，这些元素构成了用户界面的一部分，允许用户进行配置。

3. **获取和设置值**：每个选项项都有`getValue`和`setValue`方法，用于从用户界面获取配置值，以及设置选项项的值。

4. **样式应用**：一些选项项具有`css`方法，用于将用户选择的样式应用到打印元素上。

5. **事件处理**：一些选项项可能还包括事件处理逻辑，例如处理用户的输入或选择。

6. **销毁方法**：每个选项项都有`destroy`方法，用于清理和移除创建的DOM元素，防止内存泄漏。

7. **国际化支持**：使用`i18n`进行国际化处理，支持多语言。

8. **条形码和二维码生成**：包含条形码和二维码的格式设置和样式配置。

9. **水印功能**：提供水印的设置选项，包括内容、颜色、大小、旋转角度等。

10. **页面布局和分页规则**：允许用户设置页面的布局方式、分页规则、页码显示等。

11. **文本格式化**：提供文本格式化的选项，如字体大小、行高、对齐方式、颜色等。

12. **边框和背景设置**：允许用户设置元素的边框样式、颜色、圆角以及背景颜色。

13. **表格特定选项**：针对表格元素的特定配置，如行列合并、表头重复、表尾显示等。

14. **数据类型和格式化**：允许用户根据不同的数据类型（如日期时间、布尔值）设置不同的显示格式。

15. **函数选项**：提供了一系列函数选项，如格式化函数、样式函数等，允许用户定义自定义的逻辑来进一步控制打印元素的行为和样式。

整体来看，这个文件是一个打印配置模块，用于构建和管理打印元素的选项，并通过用户界面允许用户进行详细的打印设置。

 */

/**
 * 打印设置
 */
import {i18n,$} from "../hiprint.comm.js";
import PrintTableCell from "./PrintTableCell.js";
  
import LineHeightOption from "./options/LineHeightOption.js";
import FontFamilyOption from "./options/FontFamilyOption.js";
import FontSizeOption from "./options/FontSizeOption.js";
import FontWeightOption from "./options/FontWeightOption.js";
import LetterSpacingOption from "./options/LetterSpacingOption.js";
import TextAlignOption from "./options/TextAlignOption.js";
import HideTitleOption from "./options/HideTitleOption.js";
import TableBorderOption from "./options/TableBorderOption.js";
import TableHeaderBorderOption from "./options/TableHeaderBorderOption.js";
import TableHeaderCellBorderOption from "./options/TableHeaderCellBorderOption.js";
import TableFooterBorderOption from "./options/TableFooterBorderOption.js";
import TableFooterCellBorderOption from "./options/TableFooterCellBorderOption.js"; 
import TableHeaderRowHeightOption from "./options/TableHeaderRowHeightOption.js";
import TableHeaderFontWeightOption from "./options/TableHeaderFontWeightOption.js";
import TableHeaderFontSizeOption from "./options/TableHeaderFontSizeOption.js";
import TableBodyCellBorderOption from "./options/TableBodyCellBorderOption.js";
import TableBodyRowHeightOption from "./options/TableBodyRowHeightOption.js";
import TableHeaderBackgroundOption from "./options/TableHeaderBackgroundOption.js";
import BorderWidthOption from "./options/BorderWidthOption.js";
import BarcodeModeOption from "./options/BarcodeModeOption.js";
import BarWidthOption from "./options/BarWidthOption.js";
import BarAutoWidthOption from "./options/BarAutoWidthOption.js";
import BarcodeTypeOption from "./options/BarcodeTypeOption.js";
import QrcodeTypeOption from "./options/QrcodeTypeOption.js";
import QrCodeLevelOption from "./options/QrCodeLevelOption.js";
import ColorOption from "./options/ColorOption.js";
import TextDecorationOption from "./options/TextDecorationOption.js";
import FieldOption from "./options/FieldOption.js";
import TitleOptionOption from "./options/TitleOptionOption.js";
import TestDataOption from "./options/TestDataOption.js";
import CoordinateOption from "./options/CoordinateOption.js";
import WidthHeightOption from "./options/WidthHeightOption.js";
import ImageSourceOption from "./options/ImageSourceOption.js";
import ImageFitOption from "./options/ImageFitOption.js";
import BorderColorOption from "./options/BorderColorOption.js";
import WatermarkOptionsOption from "./options/WatermarkOptionsOption.js";
import PaperNumberFormatOption from "./options/PaperNumberFormatOption.js";
import PaperNumberDisabledOption from "./options/PaperNumberDisabledOption.js";
import PaperNumberContinueOption from "./options/PaperNumberContinueOption.js";
import LongTextIndentOption from "./options/LongTextIndentOption.js";
import ShowInPageOption from "./options/ShowInPageOption.js";
import PageBreakOption from "./options/PageBreakOption.js";
import PanelPaperRuleOption from "./options/PanelPaperRuleOption.js";
import PanelPageRuleOption from "./options/PanelPageRuleOption.js";
import LeftSpaceRemovedOption from "./options/LeftSpaceRemovedOption.js";
import FirstPaperFooterOption from "./options/FirstPaperFooterOption.js";
import LastPaperFooterOption from "./options/LastPaperFooterOption.js";
import EvenPaperFooterOption from "./options/EvenPaperFooterOption.js";
import OddPaperFooterOption from "./options/OddPaperFooterOption.js";
import FixedOption from "./options/FixedOption.js";
import AxisOption from "./options/AxisOption.js";
import LeftOffsetOption from "./options/LeftOffsetOption.js";
import MinHeightOption from "./options/MinHeightOption.js";
import UnShowInPageOption from "./options/UnShowInPageOption.js";
import TableBodyRowBorderOption from "./options/TableBodyRowBorderOption.js";
import TransformOption from "./options/TransformOption.js";
import ZIndexOption from "./options/ZIndexOption.js";
import BorderRadiusOption from "./options/BorderRadiusOption.js";
import OptionsGroup from "./options/OptionsGroup.js";
import BorderTopOption from "./options/BorderTopOption.js";
import BorderLeftOption from "./options/BorderLeftOption.js";
import BorderRightOption from "./options/BorderRightOption.js";
import BorderBottomOption from "./options/BorderBottomOption.js";
import ContentPaddingLeftOption from "./options/ContentPaddingLeftOption.js";
import ContentPaddingTopOption from "./options/ContentPaddingTopOption.js";
import ContentPaddingRightOption from "./options/ContentPaddingRightOption.js";
import ContentPaddingBottomOption from "./options/ContentPaddingBottomOption.js";
import BorderStyleOption from "./options/BorderStyleOption.js";
import BackgroundColorOption from "./options/BackgroundColorOption.js";
import BarColorOption from "./options/BarColorOption.js";
import OrientOption from "./options/OrientOption.js";
import TextContentVerticalAlignOption from "./options/TextContentVerticalAlignOption.js";
import TextContentWrapOption from "./options/TextContentWrapOption.js";
import ColumnsOption from "./options/ColumnsOption.js";
import TextTypeOption from "./options/TextTypeOption.js";
import TableTextTypeOption from "./options/TableTextTypeOption.js";
import TableBarcodeModeOption from "./options/TableBarcodeModeOption.js";
import TableQRCodeLevelOption from "./options/TableQRCodeLevelOption.js";
import TableColumnHeightOption from "./options/TableColumnHeightOption.js";
import TableSummaryTitleOption from "./options/TableSummaryTitleOption.js";
import TableSummaryTextOption from "./options/TableSummaryTextOption.js";
import TableSummaryColspanOption from "./options/TableSummaryColspanOption.js";
import TableSummaryAlignOption from "./options/TableSummaryAlignOption.js";
import TableSummaryNumFormatOption from "./options/TableSummaryNumFormatOption.js";
import ShowCodeTitleOption from "./options/ShowCodeTitleOption.js";
import TableSummaryFormatterOption from "./options/TableSummaryFormatterOption.js";
import UpperCaseOption from "./options/UpperCaseOption.js";
import TableSummaryOption from "./options/TableSummaryOption.js";
import TopOffsetOption from "./options/TopOffsetOption.js";
import PanelLayoutOption from "./options/PanelLayoutOption.js";
import GridColumnsOption from "./options/GridColumnsOption.js";
import GridColumnsGutterOption from "./options/GridColumnsGutterOption.js";
import TableHeaderRepeatOption from "./options/TableHeaderRepeatOption.js";
import PaddingLeftOption from "./options/PaddingLeftOption.js";
import PaddingRightOption from "./options/PaddingRightOption.js";
import DataTypeOption from "./options/DataTypeOption.js";
import FormatterOption from "./options/FormatterOption.js";
import StylerOption from "./options/StylerOption.js";
import RowColumnsMergeOption from "./options/RowColumnsMergeOption.js";
import RowColumnsMergeCleanOption from "./options/RowColumnsMergeCleanOption.js";
import FooterFormatterOption from "./options/FooterFormatterOption.js";
import GroupFieldsFormatterOption from "./options/GroupFieldsFormatterOption.js";
import GroupFormatterOption from "./options/GroupFormatterOption.js";
import GroupFooterFormatterOption from "./options/GroupFooterFormatterOption.js";
import GridColumnsFooterFormatterOption from "./options/GridColumnsFooterFormatterOption.js";
import RowStylerOption from "./options/RowStylerOption.js";
import AlignOption from "./options/AlignOption.js";
import VAlignOption from "./options/VAlignOption.js";
import HAlignOption from "./options/HAlignOption.js";
import CellStylerOption from "./options/CellStylerOption.js";
import StylerHeaderOption from "./options/StylerHeaderOption.js";
import CellFormatterOption from "./options/CellFormatterOption.js";
import RenderFormatterOption from "./options/RenderFormatterOption.js";
import AutoCompletionOption from "./options/AutoCompletionOption.js";
import MaxRowsOption from "./options/MaxRowsOption.js";
import TableFooterRepeatOption from "./options/TableFooterRepeatOption.js";
   
  
    // 打印元素选项项管理器类
class PrintElementOptionItemManager {
  static printElementOptionItems;

  // 初始化方法
  static init() {
    if (!PrintElementOptionItemManager.printElementOptionItems) {
      PrintElementOptionItemManager.printElementOptionItems = {};
      PrintElementOptionItemManager._printElementOptionItems.forEach(optionItem => {
        PrintElementOptionItemManager.printElementOptionItems[optionItem.name] = optionItem;
      });
    }
  }

  // 注册选项项
  static registerItem(styleItem) {
    if (!styleItem.name) {
      throw new Error("styleItem must have name");
    }
    PrintElementOptionItemManager.init();
    PrintElementOptionItemManager.printElementOptionItems[styleItem.name] = styleItem;
  }

  // 获取选项项
  static getItem(itemName) {
    PrintElementOptionItemManager.init();
    return PrintElementOptionItemManager.printElementOptionItems[itemName];
  }

  // 预定义的打印元素选项项
  static _printElementOptionItems = [
    new FontFamilyOption()
, new FontSizeOption()
, new FontWeightOption()
, new LetterSpacingOption()
, new LineHeightOption()
, new TextAlignOption()
, new HideTitleOption()
, new TextTypeOption()
, new TableBorderOption()
, new TableHeaderBorderOption()
, new TableHeaderCellBorderOption()
, new TableHeaderRowHeightOption()
, new TableHeaderFontSizeOption()
, new TableHeaderFontWeightOption()
, new TableBodyCellBorderOption()
, new TableFooterBorderOption()
, new TableFooterCellBorderOption()
, new TableBodyRowHeightOption()
, new TableHeaderBackgroundOption()
, new BorderWidthOption()
, new BarcodeModeOption()
, new QrCodeLevelOption()
, new ColorOption()
, new TextDecorationOption()
, new FieldOption()
, new TitleOptionOption()
, new TestDataOption()
, new CoordinateOption()
, new WidthHeightOption()
, new ImageSourceOption()
, new ImageFitOption()
, new BorderColorOption()
, new PaperNumberFormatOption()
, new PaperNumberDisabledOption()
, new PaperNumberContinueOption()
, new WatermarkOptionsOption()
, new LongTextIndentOption()
, new ShowInPageOption()
, new PageBreakOption()
, new PanelPaperRuleOption()
, new PanelPageRuleOption()
, new LeftSpaceRemovedOption()
, new FirstPaperFooterOption()
, new LastPaperFooterOption()
, new EvenPaperFooterOption()
, new OddPaperFooterOption()
, new FixedOption()
, new AxisOption()
, new TopOffsetOption()
, new LeftOffsetOption()
, new MinHeightOption()
, new UnShowInPageOption()
, new TableBodyRowBorderOption()
, new TransformOption()
, new BorderRadiusOption()
, new ZIndexOption()
, new OptionsGroup()
, new BorderTopOption()
, new BorderLeftOption()
, new BorderRightOption()
, new BorderBottomOption()
, new ContentPaddingTopOption()
, new ContentPaddingLeftOption()
, new ContentPaddingRightOption()
, new ContentPaddingBottomOption()
, new BorderStyleOption()
, new BackgroundColorOption()
, new OrientOption()
, new TextContentVerticalAlignOption()
, new TextContentWrapOption()
, new ColumnsOption()
, new GridColumnsOption()
, new PanelLayoutOption()
, new GridColumnsGutterOption()
, new TableHeaderRepeatOption()
, new PaddingLeftOption()
, new PaddingRightOption()
, new DataTypeOption()
, new FormatterOption()
, new StylerOption()
, new FooterFormatterOption()
, new RowColumnsMergeOption()
, new RowColumnsMergeCleanOption()
, new GroupFieldsFormatterOption()
, new GroupFormatterOption()
, new GroupFooterFormatterOption()
, new GridColumnsFooterFormatterOption()
, new RowStylerOption()
, new AlignOption()
, new HAlignOption()
, new VAlignOption()
, new CellStylerOption()
, new StylerHeaderOption()
, new RenderFormatterOption()
, new CellFormatterOption()
, new AutoCompletionOption()
, new MaxRowsOption()
, new TableFooterRepeatOption()
, new TableColumnHeightOption()
, new TableBarcodeModeOption()
, new TableQRCodeLevelOption()
, new TableTextTypeOption()
, new TableSummaryTitleOption()
, new TableSummaryTextOption()
, new TableSummaryColspanOption()
, new TableSummaryOption()
, new TableSummaryAlignOption()
, new TableSummaryNumFormatOption()
, new TableSummaryFormatterOption()
, new ShowCodeTitleOption()
, new UpperCaseOption()
, new BarcodeTypeOption()
, new QrcodeTypeOption()
, new BarColorOption()
, new BarWidthOption()
, new BarAutoWidthOption()
  ];
}

export default PrintElementOptionItemManager;