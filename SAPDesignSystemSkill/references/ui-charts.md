# SAP Fiori UI Elements: Charts

This reference covers the following UI components:

- [Area Micro Chart](#area-micro-chart)
- [Bullet Chart](#bullet-chart)
- [Bullet Micro Chart](#bullet-micro-chart)
- [Chart](#chart)
- [Column Chart](#column-chart)
- [Column Micro Chart](#column-micro-chart)
- [Comparison Micro Chart](#comparison-micro-chart)
- [Delta Micro Chart](#delta-micro-chart)
- [Gantt Chart](#gantt-chart)
- [Harvey Ball Micro Chart](#harvey-ball-micro-chart)
- [Interactive Chart](#interactive-chart)
- [Interactive Donut Chart](#interactive-donut-chart)
- [Interactive Line Chart](#interactive-line-chart)
- [Line Chart](#line-chart)
- [Line Micro Chart](#line-micro-chart)
- [Micro Chart](#micro-chart)
- [Radial Micro Chart](#radial-micro-chart)
- [Smart Chart](#smart-chart)
- [Waterfall Chart](#waterfall-chart)

---

## area-micro-chart

An area micro chart is a trend chart. It provides information for actual and target values for a specific time range. These values are visualized as segmented lines and can be compared to threshold areas shown in the background.
The area micro chart can be visualized in normal or wide mode. If no thresholds are defined, the area micro chart shows only the lines on a transparent background. You can also use colored lines from the [qualitative color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette) or apply [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette1).

## Usage

The area micro chart can be embedded into a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/), or [header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/snapping-header/).

### Use the area micro chart if:

- You want to visualize a trend with information about actual and target values for a specific time range.
- You want to visualize and compare actual and target values with threshold values.

### Do not use the area micro chart if:

- You have a scenario that does not require a comparison over time.

## Responsiveness

The area micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are four fixed sizes: L, M, S, and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

_Area micro chart - Size L_          | _Area micro chart - Size M_          | _Area micro chart - Size S_          | _Area micro chart - Size XS_
You can use size XS to embed the area micro chart in the cells of a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). Left-align the area micro chart in the table cell.

### Maximum and Minimum Sizes

The area micro chart can have the following dimensions:

Table
Width  | Height

Maximum | 320 px | 94 px

Minimum | 64 px  | 18 px

If the chart height is less than 56 px, the labels are hidden in the normal mode.
If the chart height is less than 36 px, the labels are hidden in the wide mode.

## Layout

The area micro chart can be visualized in normal or wide mode. When no thresholds are defined, the area micro chart shows only the lines on a transparent background.

_Area micro chart - Normal mode_          | _Area micro chart - Wide mode_          | _Area micro chart without thresholds_

## Components

### Actual and target values

The actual values are displayed as a solid line, the target values as a dotted line.

### Thresholds

The thresholds are displayed as colored areas in the background.

### Labels

You can show labels for the start and end values, the
maximum and minimum values, and the beginning and end of
the time range.
If the chart contains only start and end value labels and
start and end date labels, each takes up half of the
chart width. The responsive behavior of the chart hides
the labels if there is not enough space to display them
(for XS size and smaller or if If the chart height is
less than 56 px for normal mode or less than 36 px for
wide mode). Ensure that the labels for the values are not
truncated. Bear in mind that if one of the paired labels
(start or end) is too long, both labels are hidden.
If the chart also has minimum or maximum value labels,
each label takes up a third of the chart width. The
minimum or maximum value labels are optional. If the
minimum or maximum value label gets truncated, both the
minimum and maximum value labels are hidden.
In the wide mode, the labels are placed before and after
the chart. The same rules apply to hiding the labels: if
one of the paired labels does not fit in, they are both
hidden.
## Guidelines

For the wide mode, we strongly recommend that the chart width is greater than or equal to the chart height. Otherwise, use the normal mode.

Do

---

## bullet-chart

The bullet chart is used to compare primary and secondary (comparison) values.

## Encoded Values

#### Primary Values
Frequently used for actual values, primary values can
also be used for any type of value that you want to
compare to the secondary/comparison value.
#### Secondary/Comparison Values
Frequently used for target and plan values, comparison
values can also be used to compare the primary value with
any other value. There are use cases where the comparison
value is used to express a forecast, a competitor, or a
specific year.
#### Additional Values
The bullet chart can also express an additional value so
long as it’s directly related to the primary value.
## Orientation

The bullet chart can be orientated horizontally or vertically. It’s best to orientate it vertically for time series.

## Color Palette

If nothing is customised, the bullet chart will automatically use colors from the [qualitative palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/).
However, it is also possible to customize the colors (for example, if you want to differentiate between categories). For more information, check out the article on [bullet chart colors](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/colors-for-primary-bar-only/).

## Selection and Popover

Unlike other charts, when the user clicks on a bullet, all the associated values are displayed in the [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/pop-over/)
– primary value, comparison value along with additional value, projected value, and qualitative ranges (if used). The popover can also be customized to display other
information and actions if you wish.

## Legend

As with all other charts, when you customize the colors, the text of each legend item must also be manually maintained because the chart component
cannot guess the meaning of each color.

For more information, see [legend](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/legend/).
## Negative Values

The horizontal and the vertical bullet charts can support
negative values. Negative values can be applied to both
the primary and the secondary (comparison) values.

---

## bullet-micro-chart

A bullet chart is a variation of a bar graph originally developed by Stephen Few and adapted by SAP Fiori in order to fulfill additional requirements. Much like the traditional thermometer charts and progress bars found in many dashboards, the bullet chart serves as a replacement for dashboard gauges and meters.

The bullet chart features a single, primary measure (for example, current year-to-date revenue). It compares that measure to one or more other measures to enrich its meaning (for example, compared to a target), and displays it in the context of qualitative ranges of performance, such as poor, satisfactory, and good.

_Bullet micro chart without forecast_          | _Bullet micro chart with forecast_          | _Bullet micro chart with only delta value shown_

The actual value is shown as a colored horizontal bar, the target value as a vertical line (marker), and the thresholds as indicators above and below the bar. The actual and target values can have a label.

Only [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/) (good, critical, bad, neutral) can be used for the actual value.

The forecast is shown as a bar with a lighter tint of the same color as the actual value in the background.

Based on the data points you want to show, choose one of the following visualizations:

- Actual value vs. target value
- Actual value vs. target value with forecast
- The delta between the actual value and the target value. For this option, the delta is shown as a bar starting or ending at the target marker.

## Usage

The bullet micro chart can be embedded into a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/), and [header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/snapping-header/).

## Responsiveness

The bullet micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are also four fixed sizes – L, M, S and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

Columns
_Bullet micro chart - Size L_          | _Bullet micro chart - Size M_          | _Bullet micro chart - Size S_          | _Bullet micro chart - Size XS_
You can use the smallest XS size to embed the bullet micro chart in the table cells of the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). Left-align the bullet micro chart in the table cell.

### Maximum and Minimum Sizes

The bullet micro chart can have the following dimensions:

Table
**Width** | **Height**

Maximum | 320 px    | 94 px

Minimum | 64 px     | 18 px

If the chart height is less than 56 px, the labels are hidden.

---

## chart

Use the **sap.viz.ui5.controls.VizFrame** control to display different types of charts. The VizFrame control can display charts containing large sets of values in an interactively rich and responsive way, or it can display charts containing a small amount of data with no interaction.

You can put the VizFrame control inside the ChartContainer SAPUI5 control. This enables you to place a toolbar above the chart which gives users the ability to switch between a chart view and a table view, as well as switch to full screen mode.

## Guidelines

### Chart Types:
- [All Chart Types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-types/)
- [Choosing the Correct Chart Type](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/choose-the-correct-chart-type/)
### Colors and Patterns
- [How to Use the Color Palettes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/)
- [Color Names and HEX Values](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/values-and-names/)
- [Semantic Pattern](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-semantic-pattern/)
### Interactions:
- [Embedding](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/embedding/)
- [Gestures](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/gestures/)
- [Popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/pop-over/)
- [Selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/selection/)
- [Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-toolbar/)
- [Zoom](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/zoom/)
### Additional SAP Fiori Requirements:
- [Number and Time Format](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-numbers-dates-format/)
### Advanced Features:
- [Legend](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/legend/)
- [Legend (Value-Based)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-value-based-legend/)
- [Reference Lines](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/reference-lines/)
- [Size of the Chart Container](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/size-of-the-chartcontainer/)
- [Time Axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-time-axis/)
- [Value Display](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/value-display/)
- [Range Selector](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/range-selector/)

---

## column-chart

Column charts are used to compare multiple values over time, or values that have an intrinsic order (such as age, ranges, or ratings). The idea is to convey a progression or a trend, which is best represented by showing these values on the horizontal axis.

## Column Chart vs. Bar Chart

### Use a column chart if:

- Category items represent a time series. The natural orientation for time is from left to right.
- Category items have an intrinsic order.

### Use a bar chart if:

- Category items do not have an intrinsic order (such as products, projects, or countries).

If you use a column chart for categories that do not have an intrinsic order, there is a high probability that the labels will be displayed at 45°, forcing truncation and making them hard to read. However, this will not happen with a bar chart, as illustrated below.

Do

## Time Axis

If the horizontal axis represents time, you can use the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-time-axis/).

The time axis has three main advantages:

- It allows you to display dates and times in a responsive manner.
- All the complexity involved with formatting the axis labels is automatically taken care of.
- The physical spacing between the data points accurately represents the time scale, as opposed to being equidistant.

If you do not need the advantages offered by the time axis, you can use a horizontal categorical axis instead.

## Labels

When space is limited, the labels are displayed at 45°, making them difficult to read. Here’s how to avoid this:

- First, check that the category has an intrinsic order. If not, consider using a bar chart instead.
- If the category is time-based, use a time axis.
- If it is not possible to use a time axis, the only solution is to abbreviate the labels.

---

## column-micro-chart

A column chart uses vertical bars to compare multiple values over time or across categories. One axis of the chart shows the categories being compared, the other axis represents a value. The bars of the column micro chart can represent both positive and negative values.

There are three main ways to visualize a column micro chart:

- View with top labels for start and end values, and bottom labels for start and end dates
- Detail view with labels for each vertical bar. This view can be used only if there is enough space for enough bars width in the container.
- No labels. In all cases, the label can be switched off.

You can use either the [semantic chart palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette1) or the [qualitative chart palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette).

_Column micro chart with top labels for start and end values, and bottom labels for start and end dates_          | _Column micro chart without labels, using semantic colors_          | _Column micro chart without labels, using qualitative colors_

## Usage

The column micro chart can be embedded into a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/), or [header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/snapping-header/).

### Use the column micro chart if:

- You want to visualize a trend.
- You want to compare multiple values over time or across categories.

### Do not use the column micro chart if:

- You have a scenario that does not require a comparison over time.

## Responsiveness

The column micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are four fixed sizes: L, M, S and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

_Column micro chart - Size L_          | _Column micro chart - Size M_          | _Column micro chart - Size S_          | _Column micro chart - Size XS_
You can use size XS to embed the column micro chart in the cells of a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). Left-align the column micro chart in the table cell.

### Maximum and Minimum Sizes

The column micro chart can have the following dimensions:

Table
Width  | Height

Maximum | 320 px | 94 px

Minimum | 64 px  | 18 px

If the chart height is less than 72 px, the column labels are hidden. Instead, the chart switches to the standard view, and shows the start and end values per chart, as well as start and end dates.

If the chart height is less than 56 px, all labels are hidden.

## Components

### Bars

The bars of the column micro chart can represent both positive and negative values.

We strongly recommend using only colours from the [semantic palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/) for the bars (good, critical, bad, neutral). If your use case requires colours from the [qualitative palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/), use only one colour per chart.

### Top and Bottom Labels

The labels for the column micro chart are optional. Use the bottom labels to indicate the beginning and the end of the time period. Use the top labels to show the corresponding values for the beginning and the end of the chart. The responsive behaviour of the chart hides labels if there is not enough space to display them (for XS size and smaller or if If the chart height is less than 56 px). Ensure that the labels for the values are not truncated.

### Bar Labels

For a more detailed view of the chart, you can use bar labels. The bar labels are displayed only if the container is wide enough to accommodate a minimum number of bars. The bars must be at least as wide as the label. Otherwise, the responsive behavior of the chart automatically switches to the mode with only top and bottom labels displayed. Ensure that the labels for the values are not truncated.

---

## comparison-micro-chart

The comparison micro chart is a bar chart. It compares entries in a top N list. Depending on the width of the parent container, it can have two different layouts: normal view and wide view. You can use either the [semantic chart palette](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#semantic-palette) or the [qualitative chart palette](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#qualitative-palette).

_Comparison micro charts in normal view_          | _Comparison micro charts in wide view_
## Usage

The comparison micro chart can be embedded into a [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://www.sap.com/design-system/fiori-design-web/ui-elements/list-overview/), [tile](https://www.sap.com/design-system/fiori-design-web/ui-elements/tile/), or [header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header).

## Responsiveness

The comparison micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are also four fixed sizes – L, M, S and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

Columns
_Comparison micro chart with 3 bars - Size L_          | _Comparison micro chart with 3 bars - Size M_          | _Comparison micro chart with 3 bars - Size S_          | _Comparison micro chart with 3 bars - Size XS_
You can use the smallest XS size to embed the comparison micro chart in the table cells of the [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). Left-align the comparison micro chart in the table cell.

### Maximum and Minimum Sizes

The column micro chart can have the following dimensions:

Table
Width  | Height

Maximum | 320 px | 94 px

Minimum | 64 px  | 18 px

In normal view, the labels for the bars are positioned on top of each bar.

If the chart width exceeds 192 px, the chart goes into wide view and the labels for the bars are positioned on both sides of the bar.

If the chart width is 96 px or less, the labels are hidden.

_Comparison micro chart with 3 bars and labels on both sides_          | _Comparison micro chart with 3 bars and labels above_          | _Comparison micro chart with 3 bars without labels_

## Guidelines

- Use a maximum of 12 bars in a single comparison micro chart.
- We strongly recommended using at least 2 bars in a single chart to visualize a comparison.
- When embedding comparison charts in tables, use the same number of bars for all the charts in a given table column. This makes the data comparable and avoids misleading the user. Use a suitable column header to describe the embedded charts.

Do

---

## delta-micro-chart

The delta micro chart helps to visualize a delta value (difference) between two main key figures. The delta can be a positive or negative value. Configured thresholds define the [semantic coloring](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/) of the delta bar. The left-aligned labels can be omitted, whereas the right-aligned labels with the values are always shown.

## Usage

The delta micro chart can be embedded into a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/), or [header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header).

## Responsiveness

The delta micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are four fixed sizes: L, M, S and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

Columns
_Delta micro chart - Size L_          | _Delta micro chart - Size M_          | _Delta micro chart - Size S_          | _Delta micro chart - Size XS_
You can use size XS to embed the delta micro chart in the cells of a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). Left-align the delta micro chart in the table cell.

### Maximum and Minimum Sizes

The delta micro chart can have the following dimensions:

Table
**Width** | **Height**

Maximum | 320 px    | 94 px

Minimum | 64 px     | 18 px

If the chart height is less than 56 px, all labels are hidden but the delta value is still visible.

With the minimum chart height, the labels are not shown.

## Components

### Labels
The delta micro chart has two main labels, which refer to
two data points:
- The **main key value labels** indicate the actual data
points that are used to calculate the delta.
- The **delta value** is the difference between these two
data points and is displayed in a semantic color.
In the wide mode, the labels are placed before and after
the chart. If the width is not sufficient to show all
labels, the values are hidden first, followed by the date
labels.

---

## gantt-chart

The Gantt chart enables you to present time-dependent data in an intuitive graphical manner, from a hierarchical and/or resource-oriented viewpoint. It shows the user the sequence in which various activities occur and the dependencies between these activities. The user can easily see the start and end of a particular activity.

The Gantt chart control provides the basis for creating such a Gantt chart and is a generic tool. Applications can consume the control in order to implement their use cases, and if necessary, they may even enhance the control.

It consists of three areas: a chart area, a table area, and a global toolbar.

Another feature is the option to have a split screen that includes two or more views next to one another, each view consisting of one table and one chart. These views can be arranged vertically or horizontally, and they share a common (global) toolbar.

## Usage

### Use the Gantt chart if:

- You want to build an interactive and complex planning application involving activities, resources, hierarchical project structures, relationships, and other basic shapes such as diamonds, utilization line charts, or bar charts.
- You want to build a simple application which may be read-only or which does not have a table component.
- You want to build a simple application that is also capable of evolving into a more powerful application later on.

### Do not use the Gantt chart if:

- Your application needs to run on a smartphone. Consider using the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/) control instead.

- You need to show less than 100 rows. You can still use a Gantt chart, but consider using the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/) control instead.
- You want to show only a simple graphical representation based on rectangles (in other words, without relationships, milestones, and so on). Consider using the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/) control instead.

## Responsiveness

The Gantt chart is responsive in principle. It can be displayed in a small window (size M) and preserve its layout without needing to create multiple levels of scrollbars nested in one another in the browser window. However, the control is **not** available in smartphone size (size S).

The Gantt chart control can be used to display data in tablet (size M). 
## Types

Like all SAP Fiori controls, the Gantt Chart is shown in compact mode on a desktop and in cozy mode on tablets.

For desktop devices, you can fit even more rows onto the screen by using the condensed mode together with the compact mode. This renders less white space for each item.

The condensed content density must always be set in addition to the compact mode. Do not use the condensed mode on its own. Do not mix condensed with cozy. Doing so could lead to unpredictable or unwanted results, such as cozy-sized controls in condensed-sized containers, missing padding, and so on.

Note that neither compact mode nor condensed mode support touch interaction. Even on a desktop with a touch screen, users will have difficulty selecting rows or using controls inside the cells with their fingers.

Furthermore, condensed mode is not available for Internet Explorer 9. If you plan to use condensed mode, please provide a fallback.

For more information on cozy and compact modes, see [content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Layout
The buttons contained in the optional global toolbar can
control the behavior of the entire Gantt chart across
multiple views. Each view can contain a local toolbar.
This local toolbar is optional and is located above the
tree table.
The buttons contained in the local toolbar can only
control the behavior of its corresponding view. Each view
can contain a tree table to the left and a chart to the
right. However, the tree table is optional and the chart
area can stand on its own.
## Components

The Gantt chart consists of three areas: a global toolbar, a table area, and a chart area. There can be more than two table and chart areas in a split-screen layout.

### Global Toolbar

The global toolbar provides standard functions, which are required by several applications. However, app teams can add extra functions. The user can also hide certain standard functions.

The following standard functions are available:

- **Legend** (see details below)
- **Settings** (see details below)
- **Zooming** (see details below)
- **View combination switch**: This dropdown menu is shown only if the consuming application provides more than one view combination.
- **View arrangement:** Hide one of multiple views; add views; switch between vertical and horizontal alignment of the views. This can be skipped by the consuming application.
- **Overflow behavior:** The global toolbar has the same overflow behavior as the SAPUI5 toolbars. For more information, see [toolbar overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/).

#### Legend

For the legend, we provide two templates to address fast implementation in most use cases:

- **List template**: Displays a list of shapes and their corresponding texts. You can also add a [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) before each shape, which allows the application to control if the shape will be displayed in the chart.
- **Dimension template:** Shows a matrix of shapes and their corresponding texts for varied combinations of two dimensions.

#### Settings

Users can configure the display of the Gantt chart using the _Change Settings_ button (:action-settings: ). The control offers some standard settings (such as _Indicate Current Time_, _Show Cursor Line_, _Show Divider Lines_, _Show Ad Hoc Lines_, and _Synchronize Time Scroll_). The app team can also add their own settings to the settings dialog, giving users more options to control the behavior of the Gantt chart.

You can hide the _Change Settings_ button if the settings are not suitable for your use case. The Gantt Chart control provides the API `setToolbarSchemes`, which allows applications to override the default buttons in the chart toolbar. Other APIs also allow you to define default values for all the settings. For more information, check out the [API reference](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.gantt.GanttChartContainer).

#### Zooming

The control provides a zooming function for the chart area. It consists of a _Zoom In_/_Zoom Out_ magnifier buttons and a slider. You can hide the slider if there is not sufficient room for it, for example in size M. The zooming function also controls the labelling of the time axis, which determines whether you see years, months, or days. For more information, see [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-time-axis/).

### Chart Area

The chart area that includes the Gantt chart comprises a time axis and rows that contain different shapes. The position of a shape on the time axis depends on the dates of the object represented by the shape.

#### General

The chart area is closely connected to the table area. This means a line in the table corresponds to a line in the chart. Selecting a row in the table also selects this row in the chart. The height of the line is the same in both areas. If the user scrolls in one area, the other area scrolls in exactly the same manner.

#### Time Axis

The chart control can display the time axis in different time measurements as defined by the consuming application. Every time axis should have two levels. The app team can define the formatting of the labels for the times axis. The formats defined by SAPUI5 are supported. The Gantt control provides a default configuration for the time axis.

For more information, see [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-time-axis/).

As shown in the above examples, you can display a vertical line indicating the current date. The actual date can be displayed on the axis. It’s also possible to show non-working time frames, such as weekends, by graying out these time frames. These dates can vary from line to line.

#### Basic Shapes

The Gantt control offers these basic shapes:

- Rectangle
- Polygon
- Line (for example, to show notifications for rectangles)
- Triangle (for example, to represent constraints such as time windows)
- Diamond (for example, to represent milestones)
- Chevron (for example, to represent project phases)
- Cursor (for example, to represent checklist items)
- Image (for example, to place images in the chart)

These shapes can also be combined. The chart control can render the shapes with different border and fill styles and border and fill colors, and use gradients. For more information, see [colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors).

App teams can add their own shapes, but they must adhere to the [chart guidelines on colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/). In general, you should use the qualitative palette, but if you need more colors, use the sequential palette.

When choosing the colors and hues to represent different object types, remember to select those that have a significant contrast.

The most commonly used shape is the rectangle (or bar).

Although it is technically feasible to use two bars above and below each other in one row, we do not recommend this practice. Particularly with high screen resolutions, this can lead to visual crowding so that the user cannot discern between different elements.

For example, if you want to show the degree of completion in a bar, it may be better to superimpose the finished section using a different shade over the original task.

#### Relationships

You can link two shapes with a line in various styles and colors. The exact meaning of the relationship depends on the use case and the application. However, it usually implies that one activity has to be performed or at least started before the subsequent activity can begin.

- A relationship can begin from the start or end date of a shape.
- A relationship can end at the start or end date of a shape.
- The end of a relationship is shown using an arrow.
- One shape can have multiple relationships.

The app team should define the logic of a relationship, such as rescheduling.

#### Utilization Chart

The utilization line chart and utilization bar chart enable you to display the level of consumed capacity of a resource at a specific point in time.

The system displays the utilization curve of the selected resource in the chart panel. You are notified of low load utilization and over-capacity by predefined colors. Moreover, the [tooltip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/using-tooltips) along the utilization curve displays the utilization of a resource in specific aspects according to your settings. You can customize it to fit your business needs, for example, to display the loading utilization of a vehicle resource in terms of volume or weight.

#### Recommendations

Use line widths large enough for the user to distinctly recognize the line. Avoid using dotted or dashed lines whenever possible.

### Table Area

The Gantt control contains a table area that allows you to display and edit details of each line. For example, you may want to edit dates using a [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/) rather than dragging a shape into the chart area. The table used in the control is the SAPUI5 [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/).

## Behavior and Interaction

Various tooltips can be shown, but you should not use them to show additional information because users cannot access this functionality on touch devices.

The Gantt chart supports various events, allowing you to build rich and interactive applications.

### Shape Selection

When a shape (including relationships) is clicked, the shape is highlighted and an event is raised. The application can provide respective event handling to catch the event and perform tasks as needed, such as showing an [action sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/action-sheet/), or showing a detailed information [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/). A parameter is provided to enable three different selection behaviors for different usage environments:

- Single selection of the shape via clicking
- Multi-selection of the shapes via clicking
- Multi-selection of the shapes by pressing the **Ctrl** key and clicking

### Shape Drag and Drop

When you click a shape and hold the mouse in the chart area, a shadow of the shape moves along the mouse. When you release the mouse, an event is raised, and then the application can provide an event handler to catch the event and perform tasks as needed, such as moving the shape to a new position. You can also drag and drop the shape across different views inside the same Gantt chart or even outside the Gantt chart; it’s also possible to drag-and-drop multiple selected shapes.

### Shape Resize

When you move the mouse icon to a certain border of a shape, the mouse icon changes into a double-headed arrow, pointing left and right. This indicates that you can resize the shape. You can click and hold the mouse and then drag the shape border horizontally. Once the border reaches the expected position, release the mouse. The Gantt chart raises an event when the mouse is released. Your application can use an event handler to catch the event and then perform tasks as needed, such as changing the duration of the shape.

### Relationship Creation

You can connect shapes in the Gantt chart. This can be used to represent the relationship between two activities.

To connect shapes:

1. Click a shape to display its connection points on the shape borders.
2. Click the connection point of the shape and then slightly drag it. This displays the connection points of all other connectable shapes.
3. Connect the shape to another one by reaching its connection point via drag and drop.

### Row Selection

You can select a row the same way as in a tree table, and the corresponding row in the tree table and chart part is highlighted;

Here are other important events supported by Gantt control:

- Chart click
- Chart right-click
- Chart double-click
- Chart mouse over
- Horizontal scroll
- Vertical scroll
- Splitter resize

For more information, see the **[API reference](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.gantt.html)**.

---

## harvey-ball-micro-chart

You can use a Harvey Ball chart to visualize a value compared to its total. This is not a pie chart with multiple values or sections, but rather just one value from a total. If you configure thresholds, the [semantic color](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette1) of the value shows a positive, critical, or negative value. You can also use regular chart colors from the [qualitative palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette) without a semantic meaning.

## Usage

The Harvey Ball micro chart can be embedded into a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/),or [header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header).

## Responsiveness

The Harvey Ball micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are four fixed sizes: L, M, S and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

Columns
_Harvey Ball micro chart - Size L_          | _Harvey Ball micro chart - Size M_          | _Harvey Ball micro chart - Size S_          | _Harvey Ball micro chart - Size XS_
You can use size XS to embed the Harvey Ball micro chart in the cells of a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). Left-align the Harvey Ball micro chart in the table cell.

### Maximum and Minimum Sizes

The Harvey Ball micro chart can have the following dimensions:

Table
**Width** | **Height**

Maximum | 320 px    | 94 px

Minimum | 64 px     | 18 px

If the chart height is less than 56 px, only the slice label is visible.

## Components

### Labels

If the container scales in height, the size of the micro
chart adapts to the available vertical space.

- If the container height increases, the size of the
micro chart increases (assuming the available width is
suffcient).
- If the container height decreases, the size of the
micro chart is reduced again.
If the micro chart is smaller than size S, only the chart
slice and slice label are visible. If there is not enough
space for the label, it is not shown.

---

## interactive-chart

The interactive chart is used for visual-based filtering in the visual filter bar (VFB) within the [analytical list page (ALP)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/). It allows the user to filter by categories, time periods, or by parts of a whole.

## Usage

### Use the interactive chart if:

- You want to give the user the possibility to visually filter data in the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/).
- You want the user to gain insights before filtering large datasets with the visual filter bar.

### Do not use the interactive chart if:

- You want to visualize data without using it for filtering.
- You are not using the visual filter bar.
- You want to visualize data for more complex scenarios. In this case, use the [VizFrame chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) instead.

## Responsiveness

The interactive chart is fully responsive and supports both [cozy and compact content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Types

There are three types of interactive charts currently available:

[Interactive Bar Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-bar-chart/) | [Interactive Line Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-line-chart/) | [Interactive Donut Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-donut-chart/)
_Filter by categorical data_                                                                                                                | _Filter large sets of data by time period_                                                                                                    | _Filter by parts of a whole_

---

## interactive-donut-chart

The interactive donut chart is a type of [interactive chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/) used for visual-based filtering in the visual filter bar (VFB) within the [analytical list page (ALP)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/).

The interactive donut chart allows the user to filter by parts of a whole – depending on the sorting this would be the biggest or the smallest filter values by measure.

## Usage

### Use the interactive donut chart if:

- You want to give the user the possibility to visually filter data in the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/).
- You want the user to gain insights before filtering large datasets with the visual filter bar.

### Do not use the interactive donut chart if:

- You want to visualize data without using it for filtering.
- You are not using the visual filter bar.
- You want to visualize data for more complex scenarios. In this case, use the [VizFrame chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) instead.

## Responsiveness

The interactive chart is fully responsive and supports both [cozy and compact content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Layout

The interactive donut chart consists of two mandatory areas – a visualization and an area containing the filter label and measure of the chart. The control itself doesn’t contain an axis title.

### Filter Labels

The filter labels are left-aligned and may be truncated if not enough space is available.

### Measure and Visualization

The interactive donut chart can display percentage and actual values as a measure but never a mix of both at the same time. Always display measures using one decimal point. Measures should always be visible and never truncated.

The interactive donut chart does not support coloring, and the default color of the bars should not be customized.

Both areas (visualization and filter label/measure) should be aligned and be displayed at the same height.

The visualization is always displayed on the left side, and should not appear in a different position relative to the labels, such as above or below them.

Do                                                                                                            | Don't
_Do: Align both areas (visualization and filter label and measure) and show them at the same height_          | _Don't: Leave both areas (visualization and filter label and measure) unaligned_
### Values

The interactive donut chart cannot display a mix of positive and negative measure values. It should be used for displaying only positive or only negative values (parts of a whole).

### Semantic Colors
The interactive donut chart supports semantic colors that
are shown as color markers. Since interactive charts are
used to filter content visually, these markers give users
even greater clarity when evaluating the information.
Use semantic colors when you want to make users aware of
critical thresholds or categories.
## Behavior and Interaction

Selecting and deselecting a section resembles toggle-like behavior. If the user clicks a selected section, it becomes deselected, and vice versa. By default, the interactive donut chart supports multiple selection, allowing the user to select more than one filter value.

## Guidelines

Use the interactive donut chart in the visual filter bar if you would like to have a filter for the highest or lowest values of a filter dimension. For example, to filter for the highest or lowest margin, revenue, or cost related to a project.

Within the visual filter bar, only the two biggest or smallest values (depending on the sorting order) are shown, while the rest are aggregated into the “Others” section.

In general:

- Display the measure labels using one decimal point.
- Do not display an axis title.
- Do not display any scrollbars.

---

## interactive-line-chart

The interactive line chart is a type of [interactive chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/) used for visual-based filtering in the visual filter bar (VFB) within the [analytical list page (ALP)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/).

It allows the user to filter large sets of data by time period. The user can see both the time period and the measure at the same time, where the period is always the horizontal (X) axis of the chart.

## Usage

### Use the interactive line chart if:

- You want to give the user the possibility to visually filter data in the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/).
- You want the user to gain insights before filtering large datasets with the visual filter bar.
- You want to measure trends and changes over time when filtering.

### Do not use the interactive line chart if:

- You want to visualize data without using it for filtering.
- You are not using the visual filter bar.
- You have scenarios that do not depict time periods.
- You want to visualize data for more complex scenarios. In this case, use the [VizFrame chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) instead.

## Responsiveness

The interactive chart is fully responsive and supports both [cozy and compact content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Layout

The interactive line chart consists of two mandatory areas – a filter label and an area containing the measure and visualization of the chart. The control itself doesn’t contain an axis title.

### Filter Labels

The filter labels contain the filter criteria and are left-aligned. They may be truncated if not enough space is available. To avoid this, we highly recommend using the [short format](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-time) for time-related filter labels. For example:

- Year: 2017
- Half Year: H1, H2
- Months: Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
- Quarters: Q1, Q2, Q3, Q4
- Week: W1-W52
- Weekdays: Mon, Tue, Wed, Thu, Fri, Sat, Sun
- Days: Jan 1, Jan 2 … Dec 31

### Measure and Visualization

The interactive line chart can display percentage and actual values as a measure, but never a mix of both at the same time. Always display measures using one decimal point. Measures should always be visible and never truncated.

The interactive line chart does not support coloring, and the default color of the bars should not be customized.

Do

### Values
The interactive line chart can display positive, negative
and mixed (positive and negative) values.
The time axis line serves as the zero line, which can be
displayed accordingly to indicate different relations
between the positive and negative values.
### Semantic Colors
The interactive line chart supports semantic colors,
which are shown as color dots. Since interactive charts
are used to filter content visually, these colors give
users even greater clarity when evaluating the
information.
Use semantic colors when you want to make users aware of
critical thresholds or categories.
## Behavior and Interaction

Selecting and deselecting a section resembles toggle-like behavior. If the user clicks on a selected section, it becomes deselected, and vice versa. By default, the interactive line chart supports multiple selection, allowing the user to select more than one filter value.

## Guidelines

Use the interactive line chart in the visual filter bar if you would like to have a filter for the highest or lowest values of a filter dimension. For example, to filter for the highest or lowest margin, revenue, or cost related to a project.

In the visual filter bar, the interactive line chart only displays the first or last six data points (such as last six days, last six months, and so on).

In general:

- Display the measure labels with one decimal point.
- Do not display an axis title.
- Do not display any scrollbars.

---

## line-chart

A line chart displays information as a series of data points connected by straight lines. It is a basic type of chart that is common in many areas. Line charts are typically used to visualize a data trend over intervals of time, so the line is often drawn chronologically.

## Usage

### Use the line chart if:

- You want to display trends over time, where the focus is on the trend, not on the individual values.
- You want to help users see dependencies between two or more variables.
- You want to show higher and lower values (like prices or workloads).

### Do not use the line chart if:

- The y axis has a set of distinct (not successive) categories (not a timeline). In this case, use a bar chart, or a line chart with separate horizontal lines.

## Color Palette

By default, the line chart automatically uses colors from the [qualitative palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/). However, you can also customize the colors (for example, if you want to differentiate between categories).

## Selection and Popover

When the user clicks on a data point in the line chart, the associated value is displayed in the [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/pop-over/). The popover can also be customized to display other information and actions.

## Axes

Line charts can be used with 3 types of axes:

- [Time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-time-axis/)
- Categorical axis
- Dual axis

## Using the Time Axis

If the horizontal axis represents time and you want to show the variation of values over time, you can use the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-time-axis/).

It can display years, quarters, months, weeks, days, hours, minutes, and seconds.

The time axis has three main advantages:

- It allows you to display dates and times in a responsive manner.
- All the complexity involved with formatting the axis labels is automatically taken care of.
- The physical spacing between the data points accurately represents the time scale, as opposed to being equidistant.

If you do not need the advantages offered by the time axis, you can use a horizontal categorical axis instead.

### Choosing the Corrects Axis

For certain chart types, the physical spacing between your data points accurately reflects the time scale being displayed, as opposed to just rendering all your data points equidistantly. We can see what a difference this makes by comparing the charts below. The chart on the left uses the categorical axis, and the chart on the right uses the time axis. Even though both charts were generated from exactly the same dataset, the high concentration of early data points means they tell completely different stories about how the values have increased over time.

Don't

## Customization

### Managing Null or Missing Values in a Line Chart

If you expect to have null values or missing values in your dataset, you can connect the available data points, or show a clear break between them.

---

## line-micro-chart

A line chart is a basic type of chart used in many fields. It displays information as a series of data points connected by a line. The chart is often used to visualize a trend over time.

The line micro chart supports up to three lines, but we recommend using only one. You can modify the color of each line using the [qualitative color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette) or [semantic patterns for charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-semantic-pattern/).

_Line micro chart - Single line_          | _Line micro chart - Multiple lines using semantic chart patterns_          | _Line micro chart with semantic colors_

## Usage

### Use the line micro chart if:

The line micro chart can be embedded into a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/), or [header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header).

- You want to **visualize the shape.**
Use this option to show a trend or sparkline. By default, the chart is rendered in blue, but application developers can set any color for the chart using the names for [semantic palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette1) or names from the [qualitative palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette).

- You want to **show data points that are above or below a certain threshold**.
In addition to data points, you can use two different colors for the lines. When the micro chart displays only one line, we recommend that you use only [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette1),
such as green for values above the threshold, and red for values below the threshold. When two or three lines are displayed, on the other hand, we recommended that you use one color per line to ensure clarity and avoid visual clutter. Note that
the threshold can also be set to zero.
- You want to **show focus points**.
Use this option to display a trend or sparkline to focus on several special values, such as the first and/or last value of the chart. By default, the chart is rendered in blue, but application developers can choose another color for the chart line and data points from the [qualitative palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette). Note that the threshold can also be set to zero.

- You want to **show focus points with semantic colours**.
Use this option to display a trend or sparkline to focus
on several special values with a semantic meaning, such as
the first and/or last value above or below a certain
threshold. Note that the threshold can also be set to
zero.
### Do not use the line micro chart if:

- You have scenarios that do not depict time periods.
- You need to show more than three lines.

## Responsiveness

The Line micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are also four fixed sizes – L, M, S and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

_Line micro chart - Size L_          | _Line micro chart - Size M_          | _Line micro chart - Size S_          | _Line micro chart - Size XS_
You can use the smallest XS size to embed the line micro chart in table cells of the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). When displayed in a table cell, the line micro chart should be left-aligned.

### Maximum and Minimum Sizes

The line micro chart can have the following dimensions:

Table
Width  | Height

Maximum | 320 px | 94 px

Minimum | 64 px  | 18 px

If the height of the chart is less than 56 px, the labels are hidden.

## Layout

### Line Micro Chart in a Tile or Facet

You can embed the line microchart with all its features in a [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-58/ui-elements/tile/) or [header facet](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/v1-58/snapping-header/). The chart uses the full height and width of the control.

**Note:** If the threshold is not zero, the title of the tile or header facet should clearly express the value of the threshold (for example, “Values above/below 50”).

### Line Micro Chart in a Table or List

You can embed a line micro chart with all its features in a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-58/foundations/best-practices/ui-elements/tables/table-overview) or [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-58/ui-elements/list-overview/).

**Note:** If you intend to synchronize the chart visualization, use the manual scale.

## Components

To present the line micro chart in the most useful way, application developers can set several properties.

### Data points
The line micro chart can display or hide data points. To display data points, we recommend that you use 4 (for quarters) to 12 (for months) data points per chart. The responsive behaviour of the chart hides data points if there is not enough space
to display them (for XS size and smaller).
Data points with a semantic meaning can use colors defined by the [semantic color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette1) (green, orange, or red).
If data points do not have a semantic meaning, the line is colored blue by default, but application developers can assign any color from the [qualitative palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette).
Alternatively, you can show a line-only chart, with all the data points hidden. In this case, you can use up to two colors per line in the chart. If the values relate to a threshold, we recommend using semantic colors for the line to highlight
values above or below the threshold.
### Focus points
Unlike data points, focus points highlight specific values, such as the first and/or last value of a time series. Neutral focus points are coloured blue. Focus points with a semantic meaning can be colored using the [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette1) (green, orange, or red). The responsive behaviour of the chart hides focus points if there is not enough space to display them (for XS size and smaller).

### Threshold
You can set a threshold line. If the threshold isn’t
zero, include its value in the title of the tile, header
facet, or column in lists and tables to ensure that the
chart is not misleading for the user.
There is also an optional threshold value label. The
threshold value is hidden if it takes more than 50% of
the chart’s parent container. The threshold value is
shown only when the threshold line is displayed.
### Labels
The labels for the line micro chart are optional. Use the
bottom labels to indicate the beginning and the end of
the time period. Use the top labels to show the
corresponding values for the beginning and the end of the
chart. When the chart includes more lines, the smallest
values appear in the beginning and the largest values at
the end of the chart (across lines). The responsive
behavior of the chart hides labels if there is not enough
space to display them (for XS size and smaller or if If
the chart height is less than 56 px). Ensure that the
labels for the values are not truncated.

---

## micro-chart

Micro charts help you visualize a small number of data points in a small, non-interactive way. They can be embedded in tiles, [SAP Smart Business](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/smart-business-drilldown-app) drilldowns, and any SAPUI5 container (such as SAPUI5 tables).

## Usage

### Use the micro chart if:

- You want to provide tracking at a glance.
- You want to display changes in the data in an easy and condensed way.

### Do not use the micro chart if:

- You are looking for interactive analytics. Use the [analytical card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/) instead.
- You want to display extensive data. Use the [vizFrame chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) instead.

## Responsiveness

All micro charts are fully responsive. The size of the control adapts automatically to the size of the parent container and does not have a defined width or height.

## Types

The following micro charts are currently available:

[Area Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/area-micro-chart/) | [Bullet Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/bullet-micro-chart/) | [Column Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-micro-chart/)

[Comparison Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-micro-chart/) | [Delta Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/delta-micro-chart/) | [Harvey Ball Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/harvey-ball-micro-chart/)

[Line Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/line-micro-chart/) | [Radial Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radial-micro-chart/) | [Stacked Bar Micro Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/)

## Choosing the Correct Chart Type

Charts are used to visually represent the relationships between numeric values. In order to choose the correct chart type, it’s important to define the type of relationship you want to illustrate.

**Ranking**
If you want to rank items from highest to lowest, or vice versa, we recommend using the [comparison (bar) micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-micro-chart/). For time-based categories, the [column micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-micro-chart/) is more appropriate.

**Comparison**
To compare items that don’t have a particular order, you can use the [comparison micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-micro-chart/) (offering category and value labels for each part) or the [column micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-micro-chart/).
Sometimes it can also be useful to show when a certain value reaches or exceeds a reference point (for example, when an actual value is compared to a target or forecast).
In such cases, use a [bullet micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/bullet-micro-chart/). Keep in mind that the bullet micro chart shows data points for given points in time. Do not use it to show a time series.
To compare value totals within and across different categories, you can use the [stacked bar micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/).
**Variation over Time**
By convention, time is represented horizontally from left to right which means it’s best to use the horizontal axis to represent the time in chart visualizations.
To show changes in measures over time, you can use the [line micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/line-micro-chart/), the [column micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-micro-chart/), and the [area micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/area-micro-chart/). The exact chart type depends on the type of change you want to visualize.
If you want to emphasize the trend over time, use the [area micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/area-micro-chart/) (which provides information for actual and target values, visualized and compared to threshold areas) or the [line micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/line-micro-chart/). If you want to emphasize the values themselves, use the [column micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-micro-chart/).
**Part to Whole**
You can use several chart types that depict the contribution of individual values to a whole.
The typical chart for visualizing part of a whole is the [Harvey ball micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/harvey-ball-micro-chart/). This is most suitable if you want to display a single value compared to its total. To show a single percentage value, use the [radial micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radial-micro-chart/).
The [stacked bar micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/) works best for visualizing different values as part of one whole; its bars are shown next to each other. The [comparison micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-micro-chart/) is better if you want to compare parts to each other and display category labels and value labels associated with each part.
**Deviation**
These chart types visualize the difference or variance between two values (or two sets of values).
To show a time-related deviation between sets of values, use the [area micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/area-micro-chart/) (for example, to show the difference between actual expenses and target expenses), or the [line micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/line-micro-chart/).
If you want to emphasize the deviating values, use the [column micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-micro-chart/) (suitable for showing variances), or the [comparison micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-micro-chart/) (offering category and value labels).
The [bullet micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/bullet-micro-chart/) shows the difference between two values (actual and target) or three values (actual, target, and forecast) at a given point in time.
The [delta micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/delta-micro-chart/) helps to visualize a delta value (difference) between two main key figures, which can be time-related or category-based.
**Distribution**
To visualize how values are distributed within a set, we recommend using the [column micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-micro-chart/) or the [comparison micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-micro-chart/) (offering category and value labels). The [stacked bar micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/) shows the distribution of values as part of a whole.
If you want to emphasize the shape of the distribution over time, use the [line micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/line-micro-chart/).
## Behavior and Interaction

### Clicking (Optional)

The micro charts include one interaction: a click event that can be switched on or off.

### “No data” Text

When data is missing, a white rectangular placeholder with the text “No data” is shown instead of the chart. The size of the placeholder depends on the size of the chart. No labels and tooltips are shown. The “No data” placeholder can be focused, but it’s not possible to attach a click event to it.

_Area micro chart without data_                 | _Bullet micro chart without data_           | _Column micro chart without data_
_Comparison micro chart without data_           | _Delta micro chart without data_            | _Harvey Ball micro chart without data_
_Line micro chart without data_                 | _Radial micro chart without data_           | _Stacked bar micro chart without data_

## Guidelines

### Truncation

Never truncate numeric labels, as this could be misleading for the user. If there is not enough space for the label, hide it.

### “No data” Text

If the micro chart is placed in the cell of a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) and there is no data for the chart, leave the cell blank (empty).

If the chart is used in the micro chart facet of the [object page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#structure) and data is missing, make sure the footer of the facet is removed as well if it doesn’t add any value for the user.

---

## radial-micro-chart

The goal of the radial chart is to display a single percentage value. The chart consists of a colored radial bar with a percentage value inside.
The radial micro chart can be embedded into a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/), or [header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/snapping-header/).

## Usage

### Use the radial micro chart if:

- You want to display a single value in a table.
- You want to show a percentage value; the proportion of the total is always calculated and displayed as a percentage.
- You want to emphasize the visualization; the circular shape is more prominent.
- You want to use colors from the [chart color palettes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/).

### Do not use the radial micro chart if:

- You want to display a single value in the form of a fillable shape or group of shapes that describe their context. Use the [status indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/status-indicator/) instead.
- You want to make it easier to compare better two or more values visually. Use the [progress indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/progress-indicator/) instead.
- You want to display custom values and not only percentages. Use the [progress indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/progress-indicator/) instead.

## Responsiveness

The radial micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are four fixed sizes: L, M, S and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

_Radial micro chart - Size L_          | _Radial micro chart - Size M_          | _Radial micro chart - Size S_          | _Radial micro chart - Size XS_
You can use size XS to embed the radial micro chart in the cells of a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). Left-align the radial micro chart in the table cell.

### Maximum and Minimum Sizes

The radial micro chart can have the following dimensions:

Table
**Width** | **Height**

Maximum | 320 px    | 94 px

Minimum | 64 px     | 18 px

If the chart height is less than 56 px, only the slice label is visible.

## Components

### Labels
If the micro chart is smaller than size S, the label
moves to the right (outside the radial chart). If there
is no space to the right of the chart, no label is
displayed.

---

## smart-chart

> **Warning:** This guideline was written for release 1.52 and is no longer updated. For the latest design guidelines on charts, see [Chart (VizFrame)](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/) and [Chart Toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-toolbar/).
**Background:**
As of guideline release 1.54, the SAP Fiori Design Guidelines contain only general guidelines for all implementations. These guidelines also apply for implementations using smart controls.
You can still use the smart chart, but the exact features will no longer be updated in the design guidelines.

## Intro

The smart chart is a wrapper around existing chart types, and can be used together with all existing chart types within [VizFrame](https://ui5.sap.com/#/entity/sap.viz.ui5.controls.VizFrame/samples). The main purpose of the smart chart is to reduce development effort. However, this comes at the expense of decreased flexibility. The smart chart creates visualization based on the underlying OData service and the corresponding annotations. It also adds some generic functionality, such as a [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/), [complex personalization settings](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/), [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/), [breadcrumb](https://www.sap.com/design-system/fiori-design-web/ui-elements/breadcrumb/), tooltip, drilldown and zoom capabilities. Everything that can be done using the smart chart can also be achieved using the standard [VizFrame Chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/), but with more development effort.

## Usage

### Use the smart chart if:

- Data is fed through OData services.
- You need to reduce development effort.
- You would like to profit from drilldown and detailed information support.

### Do not use the smart chart if:

- You create your own UI coding, and the data is **not** fed through OData services. In this case, use the [VizFrame chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/) instead.

## Responsiveness

The smart chart is fully responsive It uses the [overflow toolbar control](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow-generic), which is a container based on sap.m.Toolbar and which provides overflow when its content does not fit in the visible area. The _Details_ text button never moves into the overflow, since it has a central function.
_Size S_          | _Size M_

## Layout

The header area contains the title of the smart chart, [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/), and the [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) itself. All of these elements are optional.
The chart area shows the corresponding chart.

## Components

1. **Title and/or variant management:** The title provides a short, meaningful summary of the chart content. Use the [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) control only if the user needs to save and load different filter settings and views of the chart.
2. **Breadcrumb:** The interactive [breadcrumb](https://www.sap.com/design-system/fiori-design-web/ui-elements/breadcrumb/) offers a history of the user’s drilldown path, enabling the user to return to the previous views of the chart.
3. **Details:** If one or more data points are selected, the user can see detailed information for the selection(s) using the _Details_ button. In the [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/), you can offer both global actions and actions at item level.
4. **Drilldown**: The chart provides two drilldown options:
- The _Drill Up_ / _Drill Down_ arrow icon buttons that come by default with the chart.
- The _Drill Down_ button (_recommended_). If no data points are selected, the _Drill Down_ button affects all the data in the chart. If one or more data points are selected, drilling down is based on the selection.
5. **Legend**: The _Toggle Legend Visibility_ icon button toggles the legend on and off.
6. **Zoom in/out:** The _Zoom In_ and _Zoom Out_ icon buttons allow users to decrease or increase the number of data points they see in one view.
7. **Download:** The _Download_ button downloads the current view of the chart.
8. **Chart personalization:** If you need to let users set the visibility of chart dimensions, or sort and filter data points, you can add a personalization dialog similar to the [P13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/).
9. **Full screen:** The icon button toggles the full screen view.
10. **Chart type switch:** The _Selected Chart Type_ icon button offers a [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/) with the different available chart types.
11. **Tooltip:** Shows information about the data point on hover.
## Behavior and Interaction

### Selection

Data points can be selected by clicking or dragging. Both single selection and multiple selection are possible. Data points, labels, and legend items can be selected. Clicking into the background deselects all data points. For more information, see [Chart – Selection](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-vizframe/selection/).

### Details

The _Details_ [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/) gives detailed information on each selection made in the chart. The number of selections is shown in brackets.

1. The _Details_ popover shows detailed information on the selection.
2. Clicking on an item/selection in the popover shows the semantic navigation ([smart links](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/)) related to the selection. In the example below, the information is divided into two groups.
3. The third image shows the semantic navigation information for the selected group (_Name_).

#### Smart Chart - Interaction for the 'Details' Popover

Carousel (full-width)

## Guidelines

### Semantic Colors

To display chart measures, the smart chart uses semantic coloring based on the UI.DataPoint annotation.

Use semantic coloring when you want to show data points with negative, critical, positive or neutral meanings. Based on the defined threshold values, the color of each data point can be red, green, or orange. For more information on color use, see [Colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/morning-horizon).

### Semantic Patterns

The smart chart supports [semantic patterns](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-semantic-pattern/), such as dashes, dots, or hatches, in order to distinguish:

- **Actual values**: What values _are_ (solid pattern).
- **Projected values**: What values _might_ be (dashed line, hatched areas).

---

## waterfall-chart

Waterfall charts are used to analyze a cumulative value. They show how the cumulative value changes from an initial state to a final state by representing the accumulation of successive values.

### Examples

#### Profit and Loss
The margin is a cumulative value equal to the sum of all
revenues (positive) and all costs (negative).
#### Inventory over Time
The stock level is equal to the sum of all incoming
stocks (positive) and outgoing stocks (negative).
## Chart Types

The orientation of the waterfall chart (horizontal or vertical) should follow best practices of the business area from which the application is designed.

### Waterfall Chart Without Time Dimension
If the chart does not represent changes over time, use a
horizontal waterfall chart with horizontal bars. This
way, you will avoid unnecessarily truncating the category
labels.
### Waterfall Chart with Time Dimension

If the chart represents the change of a cumulative value over time, use a vertical waterfall chart with vertical bars, with the horizontal axis representing the temporal dimension.

For the horizontal axis, you can choose between a categorical axis or a time axis:

- Choose a categorical axis if you need to display the
total and subtotal. But be aware that the dates might be
displayed at a 45° angle in the categorical axis, and that
you must manage the localization of the date and time by
yourself.
- Choose the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-time-axis/)
if you do not need to display the total and subtotal. With the time axis, the dates will be correctly displayed in the horizontal axis and correctly
localized. Also, with the time axis, the physical spacing between your data points accurately respects the time scale being displayed, as opposed to
just rendering all your data points equidistantly.
- With the time axis, you can also display multiple
measures in the so-called “periodic waterfall chart”. In
the periodic waterfall chart, all measures are cumulated
for each period.
## Total and Subtotal

> **Warning:** Total and subtotal are not supported when using a time axis.

The initial and the final values are usually represented
by an entire column starting from the zero axis. An
intermediate total can be added.

You can also add intermediate subtotals that are the sum
of previous values.

## Colors

### Default Colors
By default, the chart use three colors based on the following semantic:
- Positive values use a color defined by the property: **plotArea.dataPoint.color.positive**.
- Negative values use a color defined by the property: **plotArea.dataPoint.color.negative**
- Totals use a color defined by the property: **plotArea.dataPoint.color.total**
By default, these three colors are:
- **Blue** (@sapUiChartPaletteSequentialHue1Light1)
- **Orange** (@sapUiChartPaletteSequentialHue2Light1)
- **Gray** (@sapUiChartPaletteSequentialNeutral)
These colors are defined by the [sequential palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/), but can be customized.
### Custom Colors

You can customize the colors in two ways:

- Change the colors, or
- Use your own rules.

#### Changing Colors
The colors _color.positive, color.negative_ and _color.total_
can be changed to any color from the chart palette. The chart
will use these three colors based on the rules defined above.
**Example:** Positive and negative are blue, and total by gray.
**Example:** Positive are green and negative are red. Total is gray.

#### Using your Own Rules

You can set any color to any bar based on your own rules. To define the rules, use the property **dataPointStyle:rules**.

Use **dataPointStyle:others** to define the colors for all data points that are not covered by the rules. If the color of a data point is not defined, the data point will be displayed with a black color to indicate that no color has been defined.

**Example:** Direct costs and indirect costs use
different shades of orange from the sequential palette.

---