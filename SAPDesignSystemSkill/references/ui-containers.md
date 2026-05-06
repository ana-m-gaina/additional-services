# SAP Fiori UI Elements: Containers

This reference covers the following UI components:

- [Analytical Card](#analytical-card)
- [Bar Web Component](#bar-web-component)
- [Barcode Scanning Mobile Integration](#barcode-scanning-mobile-integration)
- [Busydialog](#busydialog)
- [Calendar Card](#calendar-card)
- [Card Web Component](#card-web-component)
- [Cards](#cards)
- [Chart Toolbar](#chart-toolbar)
- [Color Palette Popover](#color-palette-popover)
- [Color Palette Popover Web Component](#color-palette-popover-web-component)
- [Dialog](#dialog)
- [Dialog Web Component](#dialog-web-component)
- [Dynamic Side Content](#dynamic-side-content)
- [Dynamic Side Content Web Component](#dynamic-side-content-web-component)
- [Filter Bar](#filter-bar)
- [Footer Toolbar](#footer-toolbar)
- [Form](#form)
- [Form Field Validation](#form-field-validation)
- [Form Web Component](#form-web-component)
- [Formatted Text](#formatted-text)
- [Header Toolbar](#header-toolbar)
- [Icontabbar](#icontabbar)
- [Infobar](#infobar)
- [Interactive Bar Chart](#interactive-bar-chart)
- [Message Popover](#message-popover)
- [P13N Dialog Popup](#p13n-dialog-popup)
- [Panel](#panel)
- [Panel Web Component](#panel-web-component)
- [Popover](#popover)
- [Popover Web Component](#popover-web-component)
- [Responsive Popover Web Component](#responsive-popover-web-component)
- [Shell Bar](#shell-bar)
- [Side Panel](#side-panel)
- [Smart Filter Bar Annotations](#smart-filter-bar-annotations)
- [Smart Form](#smart-form)
- [Stacked Bar Micro Chart](#stacked-bar-micro-chart)
- [Tab Bar Web Component](#tab-bar-web-component)
- [Table Bar](#table-bar)
- [Table Personalization Dialog](#table-personalization-dialog)
- [Toolbar Overview](#toolbar-overview)
- [Toolbar Web Component](#toolbar-web-component)
- [Tree Toolbar](#tree-toolbar)
- [Value Help Dialog](#value-help-dialog)
- [View Settings Dialog](#view-settings-dialog)
- [Visual Filter Bar](#visual-filter-bar)
- [Web Card System](#web-card-system)

---

## analytical-card

The analytical card is used for data visualization. It consists of two areas – a header area (either a standard header or a KPI header) and a chart area with a visual representation of the data. The analytical card is a single object card and does not contain a footer area. It can only be used in the [overview page (OVP)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/). In the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/), users can show more content/insights by resizing the card.

## Responsiveness

The analytical card has a uniform horizontal width of either 20 or 25 rem, depending on the screen size. The height is flexible.

The cards can be used in both the [fixed card layouts](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/) and [resizable card layouts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/). For the fixed card layout, we recommend using a limited number of data points (up to 4) or series (up to 2). For the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#resizing-principles), you can add more data points for larger card sizes, but still try to keep the series limited (up to 2).

The VizFrame charts within the cards are fully responsive.

## Header Area

You can use two header types for the analytical card, depending on the use case:

### Standard Header

- **Title (mandatory):** The title provides the most
important information. We recommend using a single-line
text, but you can also wrap the title to two lines.
- **Subtitle (optional):** The subtitle can wrap to two
lines and gets truncated at the end of the second line.
If the subtitle contains multiple qualifiers, separate
them with comma. Do not repeat the chart title.
### KPI Header

- **Title (mandatory):** The title provides the most
important information. We recommend using a single-line text,
but you can also wrap the title to two lines.
- **Subtitle (mandatory):** The subtitle can wrap to two
lines, and gets truncated at the end of the second line. The
unit of measure is shown at the end of the subtitle. We
therefore recommend keeping the subtitle short and within one
line. If the subtitle contains multiple qualifiers, separate
them with comma. Do not repeat the chart title.
- **KPI area**, containing the following elements:
- Trend arrow (optional)
- KPI value (mandatory): The KPI value uses semantic colors.
- Percentage symbol (optional)
- Value selection information (optional): Manually-entered
text to provide a better description of the key value (for
example, _Number of Products_). Use this element if the
sorting information and the filters do not provide enough
information to properly describe the value. This text
truncates after one line.
- Sorting information (mandatory): Describes the KPI/value.
- Filters (optional): Can be modified to show meaningful texts.
- Target and deviation (both mandatory). Can be relative or
absolute values.
## Types

Default (col-1)

8 chart types are currently supported by the analytical card:
- [Line](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#line-chart)
- [Bubble](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#bubble-chart)
- [Column](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#column-chart)
- [Stacked column](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#stacked-column-chart)
- [Vertical bullet](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#vertical-bullet-chart)
- [Donut](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#donut-chart)
- [Combined](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#combined-chart)
- [Scatter plot](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#scatter-plot-chart)
- [Waterfall](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-card/#waterfall-chart)

> **Information:** For additional information about the different chart types, as well as tips for choosing the correct chart type, see the following articles:
- [Choose the Correct Chart Type](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-vizframe/choose-the-correct-chart-type/)
- [Explore Available Chart Types](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-types/)

Section Metadata

style

### Line Chart

Default (col-1)

In general, the line chart is the most efficient chart for showing the evolution of a trend over a period of time.
You can choose between two line types: linear (default), and spline interpolation.

#### Line Chart - Linear vs. Spline Interpolation

Carousel (full-width, col-2)

Section Metadata

style

- Avoid showing more than four lines on the same card.
- When showing more than one line in the chart, do not
use different units. All the lines should use the same
unit, such as “EUR”.
- You can use a line chart with both a time axis and
another color dimension.
+>======================================================================================================================================================================================<+============================================================+
#### Use the line chart if…
- You want to emphasize the evolution of a trend over a period of time.
- You want to visualize data that has an intrinsic order, such as age, ranges, or ratings (but **excluding time)**.
#### Do not use the line chart if…
- You want to emphasize the values themselves. Use a column chart instead.
- The data does not have an intrinsic order.
**Note:** For time series, we recommend using the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/#time-axis).
### Bubble Chart

A bubble chart displays the correlation between three sets of numerical values. One set is represented by the horizontal axis, another set is represented by the vertical axis, and
the third set is encoded in the size of the bubbles.

We recommend showing only one or two series. Because series are represented by specific bubble colors, having too many series/colors can make the chart hard to read.
The sizes of the bubbles are determined by the values in the third data series. The measure that is represented by the bubble size is defined below the chart.
Bubble charts are often used to facilitate the understanding of social, economic, medical, and scientific relationships.
#### Color
- If the goal is to **isolate outliers** within a cloud of other bubbles, use the same color for all bubbles.
- If the goal is to **group bubbles** that have the same characteristic, use one color per group. _Warning:_ Too many colors can make the chart hard to read.
- If the goal is to **compare bubbles** individually, use one color per bubble. Only use this option if there are very few bubbles.
#### Use the bubble chart if…
- You need a rough approximation of the values encoded in the bubble size.
- You want to represent data with three dimensions on a 2D chart.
- You want to compare and show the relationships between labeled/categorized circles using positioning and proportions.
- You want to display the correlation between three sets of numerical values.
#### Do not use the bubble chart if…
- You need to represent information with only two dimensions.
**Note:** For time series, we recommend using the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/#time-axis).
### Column Chart

Column charts are used to compare multiple values over time, or values that have an intrinsic order (such as age).
Columns are clustered side-by-side along the horizontal axis and are color-coded by series.
- We recommend using no more than two series and a maximum of four category items.
- If you want to show the trend over time for two series, you can use the line chart with two lines instead of two series of columns.
#### Use the column chart if…
- Category items represent a time series. The natural orientation for time is from left to right.
- Category items have an intrinsic order (such as age, range, or ranking).
- You want to emphasize the values themselves, rather than the trend.
#### Do not use the column chart if…
- Your data is not related to a time category or to a category with an intrinsic order.
- You want to emphasize the trend. In this case, use the line chart instead.
**Note:** For time series, we recommend using the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/#time-axis).
For more detailed information, see [column chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-chart/).
### Stacked Column Chart

This type of visualization depicts items stacked on top of one other in columns, with the item categories differentiated by colored bars or strips.
This chart works only for time series and categories with an intrinsic order.
#### Use the stacked column chart if…
- You want to display the variation of a sum of measures over a period of time.
- The sum of the values is as important as the individual items.
#### Do not use the stacked column chart if…
- Accuracy or comparisons are of primary importance. In this case, a line graph might be the better option.
**Note:** For time series, we recommend using the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/#time-axis).
### Vertical Bullet Chart

The bullet chart is used to compare a primary value to a secondary value over time, or for a category that has an intrinsic order (such as age,
range, or ranking).

The bullet chart supports primary values, secondary/comparison values, and additional values. For more information, see [bullet chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/bullet-chart/).
#### Use the bullet chart if…
- You want to compare a primary value to a secondary value using a reference point (for example, if you want to compare actual and planned costs
per quarter).
- The category items represent a time series. The natural orientation for time is from left to right.
- The category items have an intrinsic order.
#### Do not use the bullet chart if…
- Your data does not have an intrinsic order.
- You have only one series of data.
- There is no data series that can act as a reference point for the other data series.
### Donut Chart

The donut chart represents parts of a whole, where the whole is always 100%. The data is displayed in rings. Each ring represents a distinct data series.
The donut chart can display absolute values (default) or relative values (%). To make the values easier to read, we recommend showing a maximum of 2 decimal places.
- If _NumberOfFractionalDigits_ is not specified in the annotation, the default is to display a single decimal place.
- If _NumberOfFractionalDigits_ is specified in the annotation, the chart shows the values with the defined number of decimal places (0, 1, 2, 3, and so on).
We recommend using a maximum of four sections in the donut chart. If there are more than four sections in the chart, you can use an _Other_ section, which merges several sections into one. The number of sections included in the _Other_ section is mentioned in the legend item.
#### Use the donut chart if…
- You want to visualize the part as a percentage of the whole.
- You have one or more category items that you want to plot.
#### Do not use the donut chart if…
- You want to plot negative or zero values.
- You have more than four categories or sections.
- You want to compare data over time. You can use the column chart, line chart, stacked column chart, or bullet chart instead.
**Note:** If you are using donut chart in the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/), users will be able to see more of the sections that were grouped in the _Other_ section as they increase the size of the card.
### Combined Column and Line Chart

Combined column and line charts are used to compare two sets of values over time, or for a category that has an intrinsic order (such as age, range, or ranking).
You could also use a column chart or a line chart instead, but using a combined column and line chart is the better choice if you want to clearly distinguish between the two sets of
values, or if the values represent different measures, such as revenue and profit.
#### Use the combined column and line chart if…
- You want to compare values in different categories.
- You want to give a clear view of which category is higher or lower.
- You want to use more than one measure.
#### Do not use the combined column and line chart if…
- The combination of the data shown in the line and columns is not logical.
**Note:** For time series, we recommend using the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/#time-axis).
### Scatter Plot Chart

A scatter plot chart displays the correlation between two
sets of numerical values. The data is displayed as a set
of points plotted on a horizontal and vertical axis.
We recommend showing only one or two series. Because
bubbles in a series are color-coded, having too many
series/bubbles can make the chart hard to read.
While the scatter plot chart can support different
shapes, we recommend that you only use bubbles to make
the chart easier to read.
If you need to increase or decrease the size of the
bubbles, you can adjust the `plotArea.markerSize`
property. The available range is from “4” to “32”. The
default value of the bubbles is “10”.
#### Use the scatter plot chart if…
- You want to show the correlation between two sets of
numerical values (for example, the correlation between
age and income).
#### Do not use the scatter plot chart if…
- You want to show the correlation between three sets of
numerical values. Use the bubble chart instead.
### Waterfall Chart

A waterfall chart is a form of data visualization that helps users to understand the cumulative effect of a sequence of positive or negative values.
This type of chart is helpful for a variety of different scenarios. For example, it could be used to visualize financial statements or changes in performance, or to navigate data on
population, births and deaths.
In the fixed card layout, we recommend showing only the subtotal and total information (up to 4 columns).
The waterfall chart can be used with categorical axis, time axis and semantic colors.
**Use the waterfall chart if…**
- You want to show intermediate totals along the way before showing the final cumulative total.
- You want to show the net value, by breaking down the cumulative effect of positive and negative contributions.
**Do not use the waterfall chart if…**
- You want to compare multiple values over time, or for values that have an intrinsic order (such as age). In this case, use the column chart instead.
**Note:** For time series, we recommend using the [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/#time-axis). Note that totals and subtotals are not supported when using a time axis.
For more information, see [Waterfall Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/waterfall-chart/).
## Behavior and Interaction

The entire header area of the card is clickable. From there, the user can navigate to the specific app or view from which the card content originates. If you need to show detailed information about a specific data point, you can use single selection mode. In this case, it is up to the app developer to provide meaningful navigation. For example, clicking a section from the donut chart could lead to an object page that provides more information.

Analytical cards support 3 navigation modes. In all modes, clicking a blank area on the chart does not trigger any actions.

**No navigation**

If navigation is not defined in the identification annotation, clicking the header or the chart does not trigger any actions.

**Data point navigation**

If data point navigation is enabled, navigation within the chart is available only for data points. This is the default behavior: users can navigate from the header and from the individual data points.

For this header and chart navigation, set the `navigation` property to “dataPointNav”.

**Header navigation**

If you only need to offer header navigation without chart navigation, set the `navigation` property to “headerNav”.

## Guidelines

#### Number of Data Points

There is no technical limitation on the number of data points, but be aware that too many data points can diminish the user experience. For example, if the card is only one column wide, and there is not enough space, the labels for the horizontal axis are displayed at 45°.

With the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#resizing-principles), you can load more data points when the card is wider than one column.

#### Chart Title

The chart title is always visible for each chart type. It describes the axes of the chart, and is constructed using the measures and dimensions of the chart. For example, _Revenue by Quarter_ indicates that the y-axis represents the revenue, and the x-axis represents the quarters. The title is truncated at the end of the line.

#### Time Axis

You can use the different chart types with either a time axis or a category axis. We recommend using the time axis when the category items represent a time series. The [time axis](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-time-axis/) is more responsive and displays information in a more user-friendly manner than the category axis. Currently, the time axis is supported for the line, column, bubble, waterfall and combination charts.

The time axis has three main advantages:

- It allows you to display dates and times in a responsive manner.
- All the complexity involved with formatting the axis labels is taken care of automatically.
- The physical spacing between the data points accurately represents the time scale, as opposed to being equidistant.

The analytical cards on the overview page automatically use the time axis if the following conditions are met:

- The chart type is “Line”, “Bubble”, “Column”, “Waterfall” or “Combination”.
- The chart is configured with only one dimension.
- The data type of the dimension is either “datetime” or “edm.string”. If the data type is “edm.string”, it must contain the additional annotation in the OData metadata annotation (`sap:semantics =` “yearmonthday”).
- If the chart type is “Bubble”, there must be exactly 2 measures.
- If the chart type is “Combination”, there must be at least 2 measures.

#### Axis Title

The axis titles are always hidden, except in the bubble and scatter plot charts. Where the axis titles are hidden, use the chart title of the analytical card to describe the chart content. For example, _Revenue by Quarter_ indicates that the y-axis represents the revenue, and the x-axis represents the quarters.

#### Axis Scaling

There are 3 axis scaling options for line charts, bubble charts, and scatter charts:

- **Default:** The minimum and maximum are calculated from the dataset. 0 is always visible.
- **Adjust scale:** The minimum and maximum are calculated from the dataset. 0 is not always visible.
- **Min-max:** Manually set by the app developer.

#### Axis Labels

Try to avoid displaying labels at 45°. Use abbreviations for time periods, such as Jan or Feb for months, or Q1 or Q2 for quarters.

#### Semantic Patterns

The analytical card supports [semantic patterns](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-semantic-pattern/), such as dashes, dots, or hatches, in order to distinguish:

- **Actual values**: What values _are_ (solid pattern).
- **Projected values**: What values _might_ be (dashed line, hatched areas).

Currently, semantic patterns are supported for the following chart types: line chart, column chart, and vertical bullet chart.

#### Semantic Colors Based on Values

Use semantic coloring based on values when you want to show data points that are positive, neutral, or negative. Based on the defined threshold values, the color of each data point could be red, green, or orange. For more information, see [colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/).

#### Legend

Colors are assigned automatically and cannot be customized.

#### View Switch

You can use the view switch to offer the user different views of the data on one card. It can be used for filtering, sorting, or grouping (for example, by supplier or material group). The view switch is optional.

---

## bar-web-component

The bar is a container that can hold text, titles, buttons, and input elements.

<https://www.sap.com/design-system/live-examples/Bar/Bar_LE_Header.html>

<https://www.sap.com/design-system/live-examples/Bar/Bar_LE_Header_Subheader.html>

## When to Use

Do
Use the bar:
- For page headers, subheaders, footers, and floating
footers used on a page, dialog, or popover.
- If you only need to include a small number of components.
## Anatomy

**1. Bar container**
The bar container provides slots:
A. **Start content**: Defines the content at the start of the bar.
B. **End content**: Defines the content at the end of the bar.
der.
## Types

### Title Bar
The bar is used as a page header.
### Title Bar with Subheader
The bar is used as a page header with a subheader.
### Page Footer Bar
The bar is used as a page footer.
### Floating Footer Bar
The bar is used as a floating footer.
## Behavior and Interaction

Within the bar container, all the interactions depend on the components used.

## Responsive Behavior

The bar doesn’t have a built-in overflow menu. If there isn’t enough space to show all the elements on the title bar, add a subheader.

<https://www.sap.com/design-system/live-examples/Bar/Bar_LE_Header.html>

## Globalization and Localization

The bar container supports left-to-right (LTR) and right-to-left (RTL) reading directions.

<https://www.sap.com/design-system/live-examples/Bar/Bar_LE_Header_FloatingFooter.html>

---

## barcode-scanning-mobile-integration

> **Information:** Barcode scanning via the SAP Fiori Client is no longer supported. For details, see [SAP Note 2992772](https://launchpad.support.sap.com/#/notes/2992772).

## Intro

This section contains guidelines for the mobile integration of a barcode scanner API in SAP Fiori applications. The general approach for dealing with native app capabilities is to use native user interfaces triggered by an SAPUI5 control whenever possible.

For more information, see [mobile integration concept](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/interaction/mobile-integration-concept).

## Usage

Only use the barcode button to read barcodes. For OCR, RFID, and other scanning methods, use independent controllers.

## Behavior and interaction

### Main Action
If the main interaction of the app is to scan, highlight
the button as the main action.
### Secondary Action
If scanning is not the main feature | _Scan button in the header toolbar as a secondary interaction_          | _Scan button in a custom list item, available as an individual action for each item_
of the app, do not highlight the
button.
### Scanner Unavailable

The barcode cannot be read if:

- The scanner is disabled, not functioning, disconnected, or damaged.
- The app is running in a “simple” browser (instead of the SAP Fiori client).
- The SAP Mobile Platform server rendered the scan feature unavailable for the application.

## Style

### Icon
Font family: SAP icons (icon-bar-code). Unicode ID: e08d.

## Guidelines

### Guidelines for the Scan Button

- Show the barcode button as a standalone button. Do not bundle it with input fields.
- On the button, show an icon. Do not show a text.
- Place the button in the header toolbar, or in the table toolbar for app-specific business actions. Only place the button in the content area if the scan action is available for individual items in the list.

### Handling When the Barcode Cannot Be Read

#### Scanning Is the Main Action
Default to an alternative manual input option:
- Offer a placeholder (input prompt) in the [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/). For example: _Enter barcode_
- Below the input field, explain the reason for the manual default: _Scanner not available_
- Button for affirmative action: _OK_.
- If the default is presented in a [dialog box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/), offer a _Cancel_ button.
#### Scanning Is a Secondary Action  | Do                                                                                                             | Don't
If scanning is not a main feature of | ---                                                                                                            | ---
the app and the barcode cannot be
read, do not display the buttons. No
warning is required, and a manual
default input method is optional.    | _Barcode scanning is not the main interaction - Scan button is hidden when scanning is not available_          | _Do not show the scan button if scanning is not the main interaction_
This is also the case if the SAP
Mobile Platform server has rendered
the scan feature unavailable for the
app.

---

## busydialog

The busy dialog informs the user about an ongoing operation. During the operation, the entire screen is blocked.

## Usage

### Use the busy dialog if:

- The user should not be able to start any other activity during an operation, and the screen needs to be blocked while the operation is ongoing.
- The operation lasts more than one second.
- You want to indicate loading in a page-to-page navigation.

### Do not use the busy dialog if:

- The operation lasts less than one second.
- The screen is not supposed to be blocked. In this case, use the [busy indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/busy-indicator/) or [busy state](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/busy-state/) of the control instead.

## Responsiveness

The busy dialog is fully responsive and can be shown in [compact and cozy](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact) mode.

_Busy dialog - Compact mode_          | _Busy dialog - Cozy mode_          | _Busy dialog on smartphone_

> **Hint:** To switch to compact mode for a dialog, you need to use:
jQuery.sap.syncStyleClass(“sapUiSizeCompact”, this.getView(), this._oDialog);
\ \For more information, see the [SAPUI5 Demo Kit](https://sapui5.hana.ondemand.com/guide/13e6f3bfc54c4bd7952403e20ff447e7.html).
## Components

The busy dialog can consist of several components and is configurable. The following properties can be set:

- **Title**: By default, it has no title. Define a title if you need to provide more context.
- **Text**: Additional text can be added above the busy animation.
- **Cancel**:(Property:showCancelButton) A _Cancel_ button is displayed. There is no _Cancel_ button by default. The label is also configurable via Property.cancelButtonText.
- **Icon**: A custom animation icon can be set via Property:customIcon.

If no title, text, or _Cancel_ button is set, the busy dialog displays only the busy icon (busy dialog, lightweight version).

_Busy dialog with 'Cancel' button_          | _Busy dialog without 'Cancel' button_          | _Busy dialog - Lightweight version_

## Guidelines

### Lightweight Version (No Title, Text, or Cancel Button)

- Use the lightweight version for page navigation (see [live example](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.BusyDialogLight/preview)).
- If you do not show a title or text, use the invisible text control ([sap.ui.core.InvisibleText](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/invisible-text-2/)) to provide the reason for the busy state to users with assistive technologies.

> **Hint:** The additional text should be associated to the busy dialog using ariaLabelledBy association.

### Busy Dialog with Text

- Do not use the title of the busy dialog.
- If a busy dialog is triggered directly by the user, provide a precise text describing the operation. The text can be as short as one verb:
- If the busy dialog is not directly initiated by the end user, use at least one sentence to describe the operation. Start either the first or the last sentence with _Please wait._ For example: 
- Recommendation: Do not use the invisible text control when you show text in the busy dialog.

### Busy Dialog with Text and Cancel Button

- Offer _Cancel_ if you expect the process to run more than 10 seconds. In addition, always display text that precisely describes the ongoing operation.
- Do not change the mouse cursor to indicate the ongoing operation.
- Recommendation: Do not use the invisible text control when you show text in the busy dialog.

### Timing and Duration

We recommend displaying the busy dialog one second after the process has been triggered and for a minimum time of 500 ms to avoid flickering. For processes that last less then one second, a busy dialog is not displayed at all.

Example: A process takes 1.3 s in total. After one second, the busy dialog is displayed. The process finishes in 1.3 seconds. To avoid flickering, you should display the busy dialog for at least 500 ms, so you will need to add 200 ms to avoid flickering.

---

## calendar-card

> **Information:** The calendar card is already available in SAPUI5, but cannot currently be consumed in the SAP S/4HANA environments
(on premise and cloud).

## Intro

The calendar card is an interactive calendar for a single entity, such as a person. It shows a chronological list of appointments for the selected date.

The calendar card is an [integration card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/cards/) that uses the generic structure of the [sap.f.card](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.f.Card) control.

## When to Use

You can use the calendar card to show a calendar for one person, based on the [single planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/single-planning-calendar/).

Do not use it to show multiple appointments/calendars. Use the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/) instead.

## Components

1. **Header**: Basic information about the calendar card, including the title, subtitle, and appointment counter.
2. **Calendar title**: Title set by the application team. Use a title that reflects the use of the calendar in your application context.
3. **Calendar subtitle**: Subtitle set by the application team to further qualify the focus of the calendar.
4. **Counter**: Indicates how many appointments are displayed on the card and how many exist for the selected day overall.
5. **Calendar navigation**: Users can navigate to the previous/next period (for example previous/next month) or use the picker to select the month and year directly.
6. **Calendar with interactive days**: Interactive calendar, showing the selected day, current day, and special days.
7. **Legend**: In-place legend. You can specify the number of items that are shown. The _More (x)_ text indicates how many legend items are hidden.
- The different types of legend items are indicated by different shapes: Squares refer to highlighted days, circles refer to types of appointment.
- Group titles from the [planning calendar legend](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/#planning-calendar-legend) are not shown in the calendar card.
8. **Appointment list**: Shows appointments for the selected day. You can define the number of visible appointments.
9. **Appointment duration:** Indicates the duration using a dynamic combination of start date, duration, and end date. The format is determined automatically based on the user’s locale.
10. **Appointment**: The appointment can have an icon, a title, and a subtitle.
- The appointment title and subtitle do not wrap. If there is insufficient space on the card, the text is truncated.
11. **Indicator for more appointments**: The _More_ button indicates that additional appointments exist for the selected day.
- You can define a navigation target for the button (recommended). This is typically the detail app containing all the appointments.
Info **(guideline, col-1)**

- Define a suitable navigation target for the header area.
- To give users easy access to the full list of
appointments, define a suitable navigation target for the _More_ button at the end of the appointment list.
- To keep the calendar card simple, display only the most
important legend items.
## Behavior and Interaction

### Calendar Card Header

When a day is selected, the counter adapts to show the number of appointments for that day (visible appointments/total appointments).

If a navigation target has been defined, clicking the navigation header opens the corresponding application.

### Selecting a Date

Instead of offering a date picker in a popover, the calendar card changes views in place and allows the user to drill in.

At each level, the user can select the relevant period, navigate back and forth using the _Previous_ and _Next_ arrows, or drill down to the next level using the date picker.

Table

Drill-\ | View              | Selection     | Previous/Next    | Date Picker    | View Opened by
down\   |                   |               | Arrows           | Display        | Date Picker Link
Level   |                   |               |
1       | Days in the month | Day           | Previous month,  | Selected month | Months in the
| next month       | and year       | selected year

2       | Months in the     | Month         | Previous year,   | Selected year  | Years in a year
year              |               | next year        |                | interval

3       | Years in a year   | Year          | Previous year    | Selected year  | Set of year
interval          |               | interval, next   | interval       | intervals
| year interval
4       | Set of year       | Year interval | Previous set of  | n/a            | n/a
intervals         |               | year intervals,
| next set of year
| intervals
### Appointment List

When a day is selected, the appointment list adapts to show the appointments for that day.

If a navigation target has been set for the appointment, clicking the appointment navigates to the corresponding application (one click area).

If additional appointments exist, and a navigation target has been defined, clicking _More_ opens the corresponding application.

## Responsiveness

The responsive behavior of the calendar card depends on the container control of the host environment (for example, SAP Fiori launchpad). The size of the card adapts dynamically to the size of the container.

### Width

Calendar cards adapt to the available width. If the width exceeds 589 px, the card switches automatically from a 1-column layout to a 2-column layout.

**Table (col-1)**

Width

295 px (minimum width)

295 – 589 px

\> 589 px

Default (col-1)

You configure the width of the calendar card by specifying the number of grid columns. The width of the card (and
thus the breakpoint for the 2-column layout) is then determined by the grid.

Default (col-2)

Section Metadata

style

> **Guideline:** When defining the number of grid columns for your calendar card:
- Ensure a minimum width of 295 px (minimum size for the calendar).
- To enable the two column layout on larger screens (recommended), allow more than 589 px.

Section Metadata

style

### Height

The height of the calendar card is determined by the content (no scrolling possible). It depends on the number of appointments that exist for the selected day and the maximum **number of visible appointments** you have defined.

When the width exceeds 589px and the card rearranges into two columns, and the height of the card shrinks. The minimum number of rows is determined by the number of visible appointments.

**Note**: If the calendar card snaps to the grid row (depending on overall card snapping behavior), this will sometimes result in blank space in the card.

> **Guideline:** To prevent the card from becoming too tall, show only a reasonable number of appointments.

## Top Tips

- Keep the legend as simple as possible.
- Consider the height of the card when you define the number of visible appointments.

---

## card-web-component

Cards are containers for different types of app content. They provide an entry-level view of the most pertinent app data for a given topic or issue.

Cards allow users to get direct insights without leaving the current screen. A card can also offer further navigation options or actions.

<https://www.sap.com/design-system/live-examples/Card/Card_LE_basic.html>

There are some predefined elements for the card header like an image (avatar component), a counter or a button, whereas the card content area can be filled with any component(s). It is also possible to show the card header only, or no header at all.

<https://www.sap.com/design-system/live-examples/Card/card_LE_type_listCard.html>

<https://www.sap.com/design-system/live-examples/Card/Card_LE_image.html>

## When to Use

Do
Use cards:
- As an entry point to an app.
- If you want the user to focus on a single object or
topic, or on a group of objects.
## Anatomy

A card comprises two components: a header area and a
content area. Both areas are optional.

**1. Card Header**
The card header consists of the following elements:
1. **Avatar (optional)**: An image.
2. **Title**: Describes the card content.
3. **Subtitle (optional)**: You can use the subtitle to
qualify the title, offer an explanation, or show a status.
The use of the subtitle can differ, depending on the card
type.
4. **Counter (optional)**: Displays how many items are on
the card in relation to the total number of relevant items.
Format: [Items on Card] of [Total Items]
Example: _5 of 40_
5. **Button (optional)**: An action.
**2. Card Content**
You can use other web components inside the content area,
such as a list, table, timeline, or the components of a
form. The structure of the card depends on the type of
information it contains.
## Behavior and Interaction

You can opt to make the header interactive and specify a click event.

Within the card content area, all the interactions depend on the components used.

<https://www.sap.com/design-system/live-examples/Card/card_LE_HeaderButton.html>

## Globalization and Localization

When designing an application, bear in mind that cards
can also be used with right-to-left languages, such as
Arabic or Hebrew. In this case, the UI of the card header
is mirrored in both display and edit modes.
The globalization and localization behavior for the
component within the card content area is defined by the
guideline of corresponding component itself.

---

## cards

A card represents an app or page. It can be used to launch the app or navigate to the page content. Integration cards are a way of making application content available to end users in a consistent manner.

Integration cards are similar to the cards on the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/). However, unlike the overview page cards, integration cards can be used in different host environments.

A card can show details about a single app or page, or contain related information from multiple sources. An app or page can also be represented by several cards, which each focus on a different aspect of the content.

## When to Use

You can offer cards on the SAP Fiori launchpad or embed them in other controls.

Offer a card if:

- You want to give users easy access to an app or page that is relevant for a business task.
- You want to show a KPI or a preview of the most important content for the task.
- You want to let users complete a simple action right away, without navigating to the underlying app.

## Card Anatomy

A card comprises a [header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#header) and a [content area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#content-area), which are separated by a divider line. Both components are inside a card container, which includes the background and the border.
### Header
The header shows what the card is about. There are two variants: the [default header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#default-header) and the [numeric header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#numeric-header).
#### Default Header
The default header shows the basic information about the card and has the following components:
1. The **title** is mandatory and represents the “point of view” of the card. Titles longer than three lines are truncated with an ellipsis (…).
2. Optional: You can use a **subtitle** to qualify the title or explain the context. Subtitles that exceed two lines are truncated.
3. Optional: You can use an **[avatar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/)** to provide a visual hint on the card header (for example, an image, icon, or initials).
4. If the content area contains multiple items, a **counter** is added to the header. It shows how many items are visible on the card in
relation to the total number of relevant items (for example, “6 of 12”).
#### Numeric Header
Use the numeric header if you need to display numeric
information.
1. Mandatory title
2. You can add a subtitle with additional qualifying
information (optional).
3. If you specify a currency or unit of measurement, it
also appears in the subtitle row. If you provide both a
subtitle and a unit of measurement, the display format is: **\<subtitle text> \| \<unit of measurement>**.
4. In additional to the general information, you can
configure the visualization for a numeric value, such as a
KPI.
5. If required, you can also show up to two additional
indicators that relate to the main KPI.
6. If required, you can display more information about the
numeric value directly below it (for example, the period
for which a KPI applies).
> **Guideline:** Ensure that the card title is short, clear and precise.
Provide all the information required to interpret the numeric value (specific description, currency or unit of
measurement, relevant period).
- For currencies and standard units of measurement, use the dedicated `unitOfMeasurement` property. The unit then
appears consistently in the subtitle line. If the value is a simple count (such as the number of open tasks), a
precise title/subtitle text is usually sufficient.
- If the value applies to a period, use the footer area (5) to specify the period.

### Content Area

The content area is reserved for showing information from the underlying source(s). Cards can represent different types of content, with several visualization options. This depends on which card type is used.

> **Guideline:** In the card content area, show the most relevant data for the task at hand.

## Card Types

The card type defines how content is presented (for example, as a list or table). The embedded controls govern the layout, navigation, and interaction in the card content area.

The following card types are available:

- [List card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#list-card)
- [Analytical card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#analytical-card)
- [Table card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#table-card)
- [Object card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#object-card)
- [Timeline card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#timeline-card)
- [Calendar card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#calendar-card)
- [Component card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/cards/#component-card)

### List Card
The list card can display multiple list items of various
types.
### Analytical Card
The analytical card visualizes analytics data. It can
contain a line chart, bar chart, or donut chart.
### Table Card
The table card displays multiple items in a table view.

### Object Card
You can use this card type to display information about
an object in groups. Each group can contain as many items
as needed.
### Timeline Card
The timeline card displays time-related content in
chronological order.
### Calendar Card
The [calendar card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/calendar-card/) shows the schedule for a single entity (typically a person) for a selected day.

### Component Card

The component card allows you to display a SAPUI5 component as content. This gives you significant flexibility in configuring the content.

## Behavior and Interaction

Default (col-1)

### Card Header
The whole header is clickable and is the navigation area for opening the underlying source. Clicking the header opens
the app or page that relates to the card.
### Card Content
The content area can have several click areas with different purposes. They depend on the control used and the
structure of the content.

> **Guideline:** Always provide meaningful navigation targets. Ensure that the navigation target supports the information flow that
starts on the card.

Default (col-2)

Section Metadata

style

## Responsiveness

The responsive behavior for integration cards depends on the container control of the host environment (for example, SAP Fiori launchpad). The size of the card adapts dynamically to the size of the container.

## Top Tips

- Cards introduce users to the content in the underlying source. Make sure that your card focuses on the most relevant content.
- Use cards if supportive visualizations and meaningful navigations are helpful for users.
- Don’t use individual branding.
- Avoid unnecessary white space on the card.

---

## chart-toolbar

The chart toolbar acts as a container for charts.

The width and height of the chart container are never defined by the app, but are always set by the container itself (as explained in [Size of the Chart Container](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/size-of-the-chartcontainer/)).

The toolbar is mandatory. Small charts or [micro charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/micro-chart/), such as dashboards, table cells, and small frames are an exception to this rule. In these cases, the developer must provide a consistent UI to enable action on the chart.

The toolbar is always placed on top of the chart. It provides actions such as multiple box selection for selecting dimensions, full screen format, personalization actions, and a toggle function for showing and hiding legends.

## Responsiveness

The chart container uses the sap.m.OverflowToolbar control. It is a container based on sap.m.Toolbar that provides overflow when its content does not fit in the visible area. For more information, please refer to the [toolbar overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#responsiveness) article (under Responsiveness).

## Components

The following content can be part of the chart toolbar. Use only the content your users really need and display them in the order shown below:

- [Title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/)
- [Variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) or perspective switch
- Business actions (app-specific)
- Actions for content management
  - _Show Legend_ / 
- _Minimize_ / 
- View switch (between different chart types or between chart and [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview))
- Overflow

## Behavior and Interaction

### Business Actions (app-specific)

If needed, you can define your own actions for the app using transparent **text** [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) only. If multiple actions are required, sort them, starting with the most important action (= primary action) on the left. You can emphasize the primary action using a ghost button.

More information:

- [Button Types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#types)
- [Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement)

### Title

A title provides a short, meaningful summary of the content, often in a single word. To display a title, use the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) control.

Use a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) if you need the chart toolbar, and if the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) of the [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) is not indicated in the surrounding area. Note that the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) is truncated if there is not enough space.

### Variant Management

In charts, a variant stores all the settings that define the chart view (for example, the selected dimensions and the sort and filter settings). The [variant management control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) enables users to load, save, and change variants. In most cases, [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) replaces the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/).

### Title and Variant Management

If you need both a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/), place the [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) control directly after the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/). Use a separator between the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/).

Since using both controls often leads to truncation problems, this pattern is not recommended.

### Perspective Switch

The perspective switch is left-aligned in the toolbar. It can be used to switch between different dimensions. We recommend using a [select control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/), but any other dropdown control can be used as well. The perspective switch replaces the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and the [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) control.

For SAP Smart Business apps, the view incorporates and defines the chart description, the dimension, the measure, and the defaulted chart type. The various views are preconfigured and maintained by an SAP Smart Business administrator.

Ensure that all switches have a meaningful title. We recommend using a short chart description followed by the dimensions:

You also have the option of extending the perspective switch if the app needs to switch between specific subdimensions. The number of dimensions and subdimensions that are needed depends on the app.

If the app does not need a perspective switch, use the chart title (property: `title`).

### Legend (Generic)

The _Legend_ button (property: `ShowLegend`) is the first generic action. The user clicks this button to hide or show the chart legend.

The legend also allows the user to select or deselect data points.

### Zoom In/Zoom Out

We recommend offering the zoom feature on the chart toolbar. Two icon buttons depicting a magnifying glass are then displayed. When the user clicks the _Zoom In_ or _Zoom Out_ button, the chart zooms accordingly.

### Settings

You can add a _Settings_ button to the chart toolbar to enable app-specific settings (property: `ShowPersonalization`). The corresponding popover or dialog must also be implemented by the app team.

We do not recommend using this feature. If you do choose to use it, exercise caution. Bear in mind that the perspective switch feature already allows preconfiguration of several combinations of dimensions, measures, and chart type selections.

When viewing charts, users do not usually want to think about which chart types, dimensions, or measures are most suitable in a particular use case. Instead, decide on the most valuable chart/dataset combinations for the end user beforehand and provide users with the most appropriate preconfigured chart view.

### View Switch (Generic)

View switches are right-aligned in the toolbar. They allow the user to switch between different chart types or table layouts. You need to offer the view switch if the chart relies on subtle color differences or color gradients. Users with visual impairments can then use the table view.

Switches are optional. The buttons can be hidden if there is no need to switch between different charts or tables.

Be careful when choosing the chart types and the number of switches. For each app, decide which chart types are best suited to visualizing data in the user’s context.

We recommend using no more than three types of visualization. The sequence of chart type switches is not fixed, but we recommend sorting them by importance and usage within the respective app.

The segmented button control is used to display the chart types. The control highlights the chart that is currently displayed.

#### View Switch – Switch Between Chart and Table

The view switch allows you to switch easily between tables and charts.

Some actions are only available in certain views. For example, the _Legend_ icon is only visible in the chart view. If the user selects the table view, the _Filter_ action is visible and the _Legend_ icon is hidden.

#### Icon Usage

Each visualization of a chart is represented by an icon. \\The [icon explorer](https://sapui5.hana.ondemand.com/sdk/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons) helps you to find the most appropriate icon.
_Bar chart: "SAP-icons" font - Unicode: | _Bar chart: "SAP-icons" font -        | _Bubble chart: "SAP-icons" font -
#e02c - Name: horizontal-bar-chart_     | Unicode: #e182 - Name:                | Unicode: #e18e - Name: bubble-chart_
horizontal-bar-chart-2_
_Horizontal bullet chart: "SAP-icons"   |                                       | _Column chart: "SAP-icons" font -
font - Unicode: #e215_                  | _Column chart: "SAP-icons" font -     | Unicode:  - Name:
Unicode: #e0ef - Name:                | vertical-bar-chart-2_
vertical-bar-chart_
_Vertical bullet chart: "SAP-icons"
font - Unicode: #e216_                  |                                       | _Donut chart: "SAP-icons" font -

Unicode: #e015 - Name: pie-chart_
_Combined column line chart:
"SAP-icons" font - Unicode: #e11f -     |                                       | _Scatter chart: "SAP-icons" font -
Name: business-objects-experience_      | _Stacked bar 100% chart: "SAP-icons"  | Unicode: & #xe18f; - Name:
font - Unicode: #e17f - Name:         | scatter-chart_
full-stacked-chart_
_Stacked bar chart: "SAP-icons" font -
Unicode: #e183 - Name:                  |                                       | _Stacked column chart: "SAP-icons"
horizontal-stacked-chart_               | _Table chart: "SAP-icons" font -      | font - Unicode: #e184 - Name:
Unicode: #e0bb - Name: table-chart_   | vertical-stacked-chart_
_Stacked column 100% chart: "SAP-icons"
font - Unicode: #e180 - Name:           | _Heatmap: "SAP-icons" font - Unicode: | _Map: "SAP-icons" font - Unicode:
full-stacked-column-chart_              | #e214_                                | #e185 - Name: choropleth-chart_

### Maximize / Minimize

In addition to zooming, the app can use the full screen mode of the chart container (property: `FullScreen`).

The user can open the chart in a full screen dialog via this toggle button. When the chart is maximized, the :full-screen: _Maximize_ button is replaced by a corresponding :exitfullscreen: _Minimize_ button.

### Overflow (Generic)

See [Overflow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow-generic) in the _Toolbar Overview_ article.

## Guidelines

See the detailed [Guidelines](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#guidelines) section in the _Toolbar Overview_ article.

### Additional Guidelines

- Think carefully about what actions you really need in the chart toolbar – do not overload the toolbar with actions.
- Try to put the actions as close to the content as possible.
- Use [appropriate tooltips](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#tooltip) to label icon buttons in the chart toolbar.

---

## color-palette-popover

The color palette popover encapsulates the [color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette/) and the [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/) within a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/). You can use it to offer color selectors on [toolbars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) (for example, triggered by a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/)). The popover allows users to select one of up to predefined 15 colors, or define any other color in a second step if none of the predefined colors fit.
The color palette popover is also used inside the [rich text editor](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/rich-text-editor/) for changing text and background colors.

## Usage

### Use the color palette popover if:

- Selecting a color from a predefined palette is the typical case.
- Users may sometimes need to define their own colors, but in most cases a predefined color or default color is sufficient.
- Selecting a color is needed as a toolbar action. In this case, use a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) or [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1) to trigger the color palette popover.

### Do not use the color palette popover if:

- You want to let users select a color directly on the page (for example, inside a [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/)). Use the [color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette/) or the [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/) instead.
- Users will nearly always define a color of their own, and rarely use the predefined palette. In this case, use the [color picker popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker-popover/) instead.

## Responsiveness

The color palette popover supports cozy and compact [content densities](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact). On a phone, the color palette popover turns into a full-screen [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/).

_Size S_          | _Size M_          | _Size L_

## Components

The color palette popover consists of:

- A [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) to select the default color (optional)

- A [color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette/)

- A [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) that opens a [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/) in a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) (optional). The color picker popover comes in three flavors: simplified, default, and large (property: displayMode). For more information on the three display options, see [color picker popover types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker-popover/#types). |
_Color palette popover with the option to set any color_          | _'More Colors...' opens a color picker dialog_          | _You can also display a simplified version of the color picker._

- Recent colors (optional).     |
Users can see the last 5      |
colors they have recently     | _Color palette popover with 5 recent colors_          | _Color palette popover with just one recent color_
picked. This function helps   |
users to select colors that   |
they have already chosen from |
the color picker. By default, |
this feature is visible.      |
## Behavior and Interaction

To select a color, users can:

- Click the _Default Color_ [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/).
- Select a color in the predefined [color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette/) or from the recent colors.
- Click _More Colors…_ to select any other color. This opens the [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/).
- With the `liveChange` event, the color change can have an immediate effect and allows app developers to be aware of real-time color changes before they close the popover that contains it.

On a keyboard, users can navigate within the color palette popover using the arrow keys. Pressing `SPACE` or `ENTER` selects a color or triggers a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/).

As soon as a color has been selected, the color palette popover closes automatically.

## Guidelines

- To trigger the color palette popover, use a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) or a value help icon from an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/).
- Show the selected color in another place (for example, as a color value inside the triggering [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)). The color palette popover closes as soon as a color is selected.

---

## color-palette-popover-web-component

The color palette popover encapsulates the color palette
and the color picker within a popover.
## When to Use

Do
Use the color palette popover:
- To let users select a color from a predefined palette
(typical use case).
- If users typically select a predefined color, but may
also need to define their own colors.
- If you need to offer color selection as an action in a
toolbar.
## Anatomy

1. **Color palette container**: Contains all activated elements.
2. **“Default Color” button (optional)**: This button allows users to select or revert to a predefined default color.
For the default color, use one of the predefined colors in the swatch container.
3. **Swatch container**: A set of predefined colors for easy selection.
You can define between 2 and 15 colors.
4. **Swatch**: Single color, part of the palette.
5. **“More Colors…” button (optional)**: Opens the [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker-web-component/).
6. **Recent colors (optional)**: Section displaying the last 5 colors picked.
## Behavior and Interaction

### Opening and Closing a Color Palette Popover

The color palette popover opens when the user clicks on a
triggering text link or button.
The color palette popover closes when the user clicks
outside the popover or selects a color within the
popover.
### Selecting a Color

The user can select a color in the following ways:
- Click _Default Color_ to select the predefined default color.
- Select a color from the predefined color palette.
- Click _More Colors…_ to select a color using the color picker.
- Select one of the recent colors.
When the user selects _More Colors…_, the color preselected in
the color picker is the last color that was chosen or used in
the color palette. If no color is selected in the color palette
popover, white is preselected in the color picker.
## Responsive Behavior

On a phone, the color palette popover turns into a full
screen dialog.

---

## dialog

The dialog control (sap.m.Dialog) interrupts the current app process to prompt the user for information or for a response. It forces a decision or a confirmation that needs to be signed off by the user.

## When to Use

Do
Use the dialog:
- To display complex content (that is **not a floorplan**), without leaving the current page.
- To display an additional step or process that needs to be confirmed by a user action.
- To enable users to create an object with a small number of fields.
- For creating objects with a large number of fields. Use an [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/) instead.
- To display a floorplan. Floorplans are not meant to be displayed inside a dialog.

## Anatomy

The dialog contains the following sections and options:
- **Title:** The title text appears in the dialog header. By default, the title is left aligned.
- **Subheader (optional):** Subheaders appear below the main header. Since the subheader is not part of the content area, it is not scrollable.
- **Content:** This area contains the actual content of the dialog.
- **Footer with actions:** The footer can contain multiple [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) (optional), depending on the use case. We recommend using one or two buttons. If no buttons are defined, the default _Close_ button is shown.
### Emphasized Buttons

Always use an emphasized [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/)
for the primary action. Emphasizing the main action in the dialog toolbar helps users to focus on the most likely choice. This saves users time and
gives new users a sense of orientation.
Never use an emphasized button for _Cancel_. If the footer contains a single action with a negative path, such as _Close_, use a transparent button. Negative paths navigate away from the dialog without executing any actions.
### Position on the Screen

The dialog is positioned at the center of the screen. It opens in a modal window to ensure that it attracts the user’s attention when it displays emergency states.

On a smartphone, the stretch property allows you to achieve full screen behavior.

## Types

### Standard Dialog

Use the standard dialog unless you need one of the specialized dialogs below. The standard dialog has a header with a gray background, and no icon.

### Other Types of Dialog

- [Table personalization dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/)
- [Select dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/select-dialog/)
- [Table select dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-select-dialog/)
- [Value help dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/)
- [View settings dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/view-settings-dialog/)
- [Busy dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/busydialog/)

### Message Box

The message box is a special type of dialog that is used to display messages quickly. For each type of message, you can decide when to use a dialog. For success messages, use the message toast (sap.m.MessageToast). For more information, see [Message Box](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/).

## Behavior and Interaction

### Navigation in a Dialog

You can let users navigate to another
page within the dialog. On the second
page, an arrow at the top of the      | _Navigation pattern list - Size L_          | _Navigation pattern details - Size L_
dialog allows users to navigate back
to the first page.
### Resizable

You can let users change the size of the dialog (property
`resizable` = “true). The resizable indicator then shows
in the bottom-right corner of the dialog.

### Draggable

By clicking and holding on the heading, users can drag the
dialog to another position (property `draggable` = “true”).

### Messaging Within a Dialog

Default (col-1)

If your dialog contains a scrollable form, use a [message popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-popover/) to help visualize any issues that are hidden when scrolling.

Default (col-2)

> **Warning:** Don’t use a message popover in small dialogs where the popover might obscure form fields that are in focus.

Section Metadata

style

### Editing and Saving Content

If a dialog is used for editing, keep it simple. If you
need a large number of editable fields, consider other
solutions instead, such as navigation to a details page.
The data in the dialog is only saved when the user clicks
_Create_ or _Save_. Use form field validation within the
dialog to make users aware of any errors.
The data in the dialog is lost if the page is refreshed
during the editing process (also in the draft scenario),
or if the user chooses _Cancel_.
## Responsiveness

The dialog provides different behavior on a smartphone than on a tablet or desktop. We distinguish between “cozy” and “compact” dialogs. For more information, see [content density](https://www.sap.com/design-system/fiori-design-web/foundations/visual/cozy-compact).

The buttons in the toolbar are aligned differently on the various devices. On a smartphone, they extend across the entire footer toolbar, but on a tablet or desktop device they are right-aligned.

#### Full Screen Dialog

We recommend displaying dialogs in S size in full screen
mode to help users focus on the content of the dialog
(property `stretch` = “true”). The toolbar containing the | _Full screen dialog - Size S_
actions is positioned at the bottom of the dialog.
#### Position of the Action Buttons
On smartphones, a dialog can have one or two actions,
which are located in the footer and right-aligned.
#### When to Open Full Screen or Modal

Always display message dialogs as modals. There is no need to display a simple message in a full screen dialog. If you want to display a simple message, use the [message box](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/) instead.

If you use standard dialogs, such as [value help](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/), open them in full screen mode to help the user can focus on the content of the message. The dialog control offers a stretch property for full screen behavior.

By default, the dialog can have up to two action buttons in the footer. The action buttons in the toolbar are right-aligned. Use cozy mode on tablet devices.

If the content height increases or is set to more than the screen height, the dialog height stops at 4 rem from the top and bottom. The user can then scroll through the content area.

By default, the dialog can have one or two actions. The
action buttons on a desktop device are right-aligned. Use
compact mode to ensure that the padding and margins are
optimized for desktop devices.
If the content height increases or is set to more than
the screen height, the dialog height stops at 4 rem from
the top and bottom. The user can then scroll through the
content area.

---

## dialog-web-component

The dialog component is a modal window that appears temporarily on top of the main screen. It interrupts the current app process to prompt the user for a response. While the dialog is open, the main screen is dimmed and blocked. A user action or confirmation is required to return to the main window.

## When to Use

Do
Use the dialog:
- To display information temporarily.
- To prompt the user for an action or a confirmation.
- To display an additional step or process that needs to
be confirmed by a user action.
## Anatomy

1. **Header**: Contains the title of the dialog.
2. **Content**: Can contain any component.
3. **Footer**: Can contain actions that affect the entire dialog.
4. **Resize handle (optional)**: If enabled, the resize handle
lets users stretch and shrink the dialog. The resize handle is
only available on desktop devices.
## Behavior and Interaction

The dialog opens in a modal window at the center of the screen. Completing an action or closing the dialog returns the user to the main screen.

### Actions in the Footer

By default, the dialog footer contains one or two actions. Depending on the specific use case, more actions are also allowed.

Always use an emphasized button for the primary action in the footer. The dialog footer can have only one primary action.

If the footer contains a single action with a negative path, such as _Close_, use a transparent button. Negative paths navigate away from the dialog without executing any actions.

### Additional Options

#### Resizable Dialog (desktop only)

You can let desktop users change the size of the dialog.
If this feature is switched on, a resize handle appears
in the bottom-right corner.

#### Draggable Dialog (desktop only)

If you switch on the “draggable” feature, users can move
the dialog around by clicking and holding on the header.
## Responsive Behavior

By default, dialogs appear as modal
windows. On mobile devices, you can
use the `stretch` property to show a | _Full screen dialog on smartphone_ | _Regular dialog on smartphone_
dialog in full screen mode.
- On small devices, you can use the
regular dialog or the full screen
dialog.
- On smartphones, we recommend using
the full screen dialog.
---

## dynamic-side-content

Dynamic side content is a layout control that displays additional content to help the user better understand the data that’s being displayed on the screen. It is displayed in a way that flexibly adapts to different screen sizes.

App development teams can configure the behavior of the control on smaller screen sizes by following the relevant guidelines.

## Usage

### Use dynamic side content if:

- You want to display information that:
  - Will enrich the main content and will help the user better perform his/her tasks;
  - Only makes sense when displayed next to the main container (side-by-side);
  - Influences the main content (for example, a filter for list; settings for chart, details for map).
- Users should have access to all of the key functions and critical information in the app even if they do not see the side content. This is important because on smaller screen sizes it may be difficult to display the side content in a way that makes it easy for users to access.

### Do not use dynamic side content if:

- You want to display critical information that should be visible all the time. The dynamic side content is not meant to split the page into two equally important sections.
- You want to display navigation or drilldown. For drilldown scenarios, use the [Flexible Column Layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).
- You want to display a list-detail scenario. Instead, use the [Flexible Column Layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).

> **Information:** Currently Dynamic Side Content is not available in Fiori Elements.

## Layout

Dynamic side content is displayed to the left or right of the main content container.

The dynamic side content can be closed by a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) that is displayed in its toolbar.

The dynamic side content can be opened, if it set to hidden, with an action within the container to which it is directly related, or by an action displayed in the container-related toolbar, if it is available.

When the dynamic side content is displayed side-by-side to the container, it doesn’t overlay it. The main container narrows down and makes space for the additional content to be displayed.

Carousel (full-width)

## Responsiveness

The dynamic side content control is built for different screen sizes and layouts.

#### Different sizes of dynamic side content

Carousel (full-width)

The default screen layout features the side content on the left or right side of the screen, covering 25% of the screen width **on a large desktop (over 1440 px)**.

**On smaller screen sizes (under 1440 px)**, the side content occupies 33% of the screen width to accommodate the nested controls. If the side content width falls below 320 px, the side content automatically slides under the main content, unless the app development team specifies that it should disappear.

**On screen sizes of less than or equal to 720 px**, the side content automatically disappears from the screen (unless specified to stay under the content) and can be triggered from a preset trigger (specified within the app). When the side content is triggered, it replaces the main content. We recommend that you always place the trigger for the side content in the same location, such as the container toolbar.

If only the side content is shown and the user increases the screen size, the main content is automatically displayed again. If the user then decreases the screen size, the side content disappears (unless specified to stay under the content), and can be opened again by the trigger.

**Equal split**: A special view of the side content is the 50:50 view, which enables users to show more data, for example, for comparison purposes. The responsive behavior of the equal split is the same as in the standard view: The side content disappears on screen widths of less than 720 px and can only be viewed by triggering it.

The app development team may specify that the side content should slide under the main content when the screen is resized to a smaller width. Sliding the side content under the main content on smaller screens allows it to remain on the screen at all times. However, it may only become visible after scrolling.

## Navigation

The side content is always related to the main content, so it must show content that can be triggered from the main content. This also means minimizing navigation, such as drill-ins within the side content, and displaying content that is triggered from the main content area. An example would be showing additional details such as contact information or conversation history. If a different type of data relates to the main content, app developers can implement a switcher in the side content. However, we recommend that you keep the side content free of additional navigation elements.

#### Triggering the side content

The side content can be set to hidden by default, and it automatically disappears when the screen width is less than or equal to 720 px (except when it is set to be under the main content).The app design team can define the trigger point. Our recommendation is to put a transparent text [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) with a meaningful label in the container [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/), or an action inside the container the dynamic side content is related to. Ensure that the user can understand how to trigger the side content. Please, avoid using icons, because they can confuse the user.

#### Hiding the side content

The side content should be hidden from the header (top) section of the side content. The side content container itself has no header. We therefore strongly recommend that you use a toolbar control with a title, a transparent [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) labeled _Close_, and a spacer between them.

## Guidelines

### Dynamic Side Content in Object Page

Dynamic side content can be used within the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/). Use dynamic side content within a section if you want to give the user additional data related to this section. If you want to display additional information about the object such as a [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/), include this information as a new section.

Do                                                               | Don't                                                              | Don't
_Correct usage of dynamic side content in object page_           | _Wrong usage of the dynamic side content in object page_           | _Wrong usage of the dynamic side content in object page_

Do                                                               | Don't                                                              | Don't
_Correct usage of dynamic side content in object page_           | _Wrong usage of the dynamic side content in object page_           | _Wrong usage of the dynamic side content in object page_

Do not separate the screen into two panels. Do not use it for navigation, for drilldown, or for displaying information related to the entire object.

### Dynamic Side Content in List Report

Do not separate the page into two panels when you are using it inside the [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/). The dynamic side content should be placed directly next to the table or the chart container.

Do

### Dynamic Side Content in Dynamic Page

Do not separate the page into two panels if you use dynamic side content within the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) layout. Place the dynamic side content directly next to the page container and under the header container. The header snaps manually and both sections have their own scrollbars.

Do

### Examples

_Dynamic side content in object page, used with map_           | _Dynamic side content in list report, used with planning calendar_           | _Dynamic side content with table_

### Use of Controls in the Dynamic Side Content

You can use most of the main controls in the dynamic side content, such as [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/), simple [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [panel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/panel/), [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/), [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/), or [feed and notes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/feedinput/). However, you must make sure that the control doesn’t result in the appearance of a horizontal scrollbar.

Do not use complex controls, such as tables.

---

## dynamic-side-content-web-component

The dynamic side content is a layout component that allows you to display additional content in a way that adapts flexibly to different screen sizes. The side content appears in a container next to or directly below the main content. The width or height of the main content area adapts accordingly.

## When to Use

Do
Use the dynamic side content to display information that:
- Enriches the main content and helps users perform their
tasks
- Only makes sense when displayed next to the main
content (side by side)
- Influences the main content (such as a filter for list,
settings for chart, or details for map)
**Important:** Ensure that users have access to all of
the key functions and critical information even if they
don’t see the side content. It might not be easy for
users to access the side content on smaller screens.
## Anatomy

Dynamic side content is a layout container that can
contain any type of component, such as lists, tables,
form fields, and more.
1. **Dynamic side content**
2. _Main content\*_

## Types

The size and position of the dynamic side content depend on the configuration and the available screen width. The following variants are available:

### Size

**Default split –** 25% or 30% of the total screen width,
depending on the resolution.

### Position

You can specify whether the side content is shown on the right or on the left. At certain breakpoints, the side content slides below the main content (see [Responsive Behavior](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/dynamic-side-content-web-component/#responsive-behavior)).

**Left**

**Below main content**

## Behavior and Interaction

Whether the side content is displayed or hidden depends on the current visibility setting and the screen size (see [Responsive Behavior](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/dynamic-side-content-web-component/#responsive-behavior)). To enable users to display the supplementary content as needed, it is important to provide options for opening and closing the side content.

**Default State**

By default, the side content is initially visible, but you can opt to hide it.

**Opening the Dynamic Side Content**

Add a trigger for opening the side content. This is typically a button in the main content area with a meaningful label. We recommend that you always place the trigger for the side content in the same location.

**Closing the Dynamic Side Content**

Enable users to close the side panel from the side panel header. Since the dynamic side panel doesn’t have a built-in header, we strongly recommend adding a toolbar with a title, a transparent Close button, and a spacer in between.

## Responsive Behavior

**Screen width > 1440 px**
- The ratio of the main content to side content is **3:1** (with a minimum of 320 px each).
- If you define a trigger, the side content can be hidden.
**Screen width <= 1440 px and > 1024 px**
- The ratio of the main content to side content is **2:1** (with a minimum of 320 px each).
If the width of the side content falls below 320 px, it automatically slides under the main
content, unless you specify that it should disappear.
**Screen width <= 1024 px and > 720 px**
- The side content ratio is fixed at 340 px and the remaining width is used for the main
content.
- If you opt to move the component below the main content, and screen width is <= 960 px
and >720 px, the side content drops below the main content.
**Screen width <= 720 px (for example, on a mobile device)**
- The side content automatically disappears from the screen, unless you specify that it
should stay below the main content. The side content is opened by the trigger you offer in
the main content. When the side content is triggered, it replaces the main content. For the
triggering action, use a label that indicates the type of content shown in the side panel.
**Special case: comparison mode**
If you opt to split the screen equally for comparisons (50% each for the main and side
content), the responsive behaviour is the same as for the standard view. If the screen
width falls below 720 px, the side content disappears and can only be viewed if it’s
actively triggered.

---

## filter-bar

The filter bar lets users set criteria to limit the data loaded and displayed in a table. It is part of the [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) and the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/), and is also available as an alternative layout to the visual filter bar in the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#layout-variants).

It is made up of input controls that filter objects according to various criteria, such as status or date. Users can [adapt](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/filter-bar/#adapt-filters-dialog) the filter bar, for example, by showing and hiding input controls or changing their order. They can also store the current set of filter criteria in a [view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/).

The filter bar is displayed in the header area of a [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), [overview page,](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) or [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/). Because these floorplans are based on the [dynamic page layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/), the expand and collapse header functions are available.

## When to Use

The filter bar is always part of the list report and overview page.

Do not use the filter bar:

- In a table in an object page section. Use the filter in the *[View Settings](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/)* dialog instead.
- In a wizard.
- In a simple list. Use the [search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) instead.

## Filter Bar Components

### Expanded Filter Bar

The expanded filter bar consists of:

1. Views (optional)
2. Basic [search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) field (optional)
3. [Filter input controls](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/filter-bar/#filter-input-controls)
4. *Go* button (only for [manual update mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/filter-bar/#behavior-and-interaction))
5. [*Adapt Filters* button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/filter-bar/#adapt-filters-dialog)

*Expanded filter bar*

[Views](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) **(1)** store the settings for the filter bar, including the values of filter input controls, the fields visible in the filter bar, and their order.

You can also use the filter bar without view management. In this case, display a page title instead.

If the [basic search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) **(2)** is available, it is displayed first. It allows users to filter the results with a given keyword. Unlike the other input control fields, the basic search field has a placeholder text instead of a label.

The [filter input controls](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/filter-bar/#filter-input-controls) **(3)** are arranged in a horizontal, linear layout, with a label above them. An asterisk next to the filter label indicates the filter is mandatory.

If the browser window size is reduced or filter input controls exceed the available width, they wrap to the next line. The height of the expanded filter bar is not limited and adjusts to accommodate the visible filters. The size of the widest input control is inherited by all other filters to ensure visual cohesion.

The *Go* button **(4)** triggers the search for the manual update mode. Alternatively, you can offer the live update mode where the table results are updated each time the user changes an input control value. For more information, see [Behavior and Interaction](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/filter-bar/#behavior-and-interaction).

In most cases, only a subset of all available filters is visible in the filter bar. Users can control the visibility and order of the filters and assign values to them in the [*Adapt Filter* s dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/filter-bar/#adapt-filters-dialog) **(5)**.

Next to *Adapt Filters*, the number of active filters is displayed in parentheses. A filter is active when a value is assigned to it either in the filter bar or the *Adapt Filters* dialog. **Note** that a filter can be active, but not visible in the filter bar.

### Collapsed Filter Bar

The collapsed filter bar takes up very little space, leaving most of the screen to display the results.

*Collapsed filter bar*

It shows a summary of the filters currently applied:

- Either *1 filter active:* or *\<n> filters active:*, where “n” stands for the number of applied filters.
- A comma-separated list of the currently applied filters for up to five filters. If there are more, an ellipsis (…) shows at the end of the string.

If no filters have been applied, the summary text is: *No filters active*

### “Adapt Filters” Dialog

Users can manage all the available filters in the *Adapt Filters* dialog, including their visibility and order in the filter bar and the values of filters both visible and not visible in the filter bar.

*Adapt Filters dialog - list view, hidden values*
The *Adapt Filters* dialog consists of:
1. Select control and search
2. *Show Values*/*Hide Values* toggle
3. List or group view
4. Mandatory and optional filters
5. Footer bar buttons
6. Arrows to move the filter up and down
7. Active filter with assigned value
When opened, the dialog displays all the available filters in the *Hide Values* view with the *List* view.
The selected filters are visible in the filter bar and displayed in the same order as in the filter bar.
#### Searching and Displaying Filters in the Dialog
To find filters **(1)**, users can search for them by name or use the select control to limit the filters displayed
in the dialog to certain filter types, such as visible, active, or mandatory.
Mandatory filters have an asterisk next to their label **(4)**. They must have values for the search to return results. Users can set the values either in the filter bar or the *Adapt Filters* dialog.
In the dialog, when a mandatory filter has:
- No value assigned, its checkbox is automatically selected and cannot be deselected.
- A value assigned, the users can deselect it to remove the filter from the filter bar.
In the dialog, users can display the filters:
- With or without the filter values **(2)**.
When the values are hidden, a visual indicator **(7)** flags the active filters.
- In the list or group view **(3)**.
The group view shows the filters according to group. The first group is called *Basic* and contains the filters for
the standard view that you design to ship with the app. You can design additional views to ship with the app, but no
additional groups are created for these views.
#### Displaying Filters in the Filter Bar
All the views in the dialog allow users to select filters to be visible in the filter bar.
In the *Hide Values* view with the *List view*, users can reorder the selected filters with the arrows **(6)**.
In the *Adapt Filters* footer bar **(5)**:
- *OK* applies changes and closes the dialog.
- *Cancel* closes the dialog without applying changes.
#### Resetting Filters
In the header area, *Reset* **(8)** (optional) restores the selected filters and filter values to the ones in the
current view. Before the filters are reset, the user gets a warning because the reset applies immediately to the
filter bar, even though the dialog stays open. Clicking *Cancel* in the footer bar does not reverse the reset action.
### Filter Input Controls

To prevent unnecessary complexity in the filter bar, pick the simplest input control that works for your use case, as recommended below:

Table

For

A predefined list for single or multiple selection

Temporal information

[Multi-input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/)

For a comprehensive overview of when to use which input field, see [Which Selection Control Should I Use?](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use)

Use the [value help control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) only as a last resort. It is especially beneficial if you want to offer an advanced function for selecting single or multiple items either inline (by entering text) or by means of a dialog.

> **Hint:** For development information, see [Data Types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-filter-bar-annotations/#data-types) for the smart filter bar.

For more information on the selection controls, see:

- [Input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)
- [Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/)
- [Combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/)
- [Multi-combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/)
- [Multi-input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/)
- [Value help](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/)
- [Date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/)
- [Date range selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/)
- [Date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/)
- [Rating indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/rating-indicator/)

## Behavior and Interaction

In the **live update mode**, the search results are updated each time the user changes the value of an input control or the search field. A *Go* button is not necessary.

As the user types in the search field, the search is triggered with the entry of each character. The table is updated with the results that match all the filter values and include the search term.

In the **manual update mode**, the search results are updated only when the users click *Go* or press **Enter** on their keyboard.

For **both update modes**, when selection is enabled for the table, make sure the update resets or “forgets” previously selected table items by asking the application developers to set the table property [rememberSelections](https://main--builder-prospect--sapudex.aem.page/design-system/fiori-design-web/v1-142/ui-elements/responsive-table/#properties) to “false.”

## Responsiveness

The name of the view or title is always visible.

The filter area (basic search field, input controls, optional *Go* button, *Adapt Filters* dialog) varies:

- Desktop: Expanded or collapsed by default
- Tablet: Collapsed by default
- Phone: Not displayed. Accessible through filter dialog.

## Examples

Carousel (full-width)

## Top Tips

### Filter Bar

Always provide a set of predefined default filters to deliver with the app (*Basic* group in the *[Apply Filters](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/filter-bar/#adapt-filters-dialog)* dialog). Include filters that are:

- Mandatory / crucial for the use case
- Frequently used
- Vital for reducing the number of items in the list

Users can set filters from the *Basic* group not to display in the filter bar, but cannot remove them from the *Adapt Filters* dialog.

### Filter Input Controls

- Use the basic search field to provide a keyword search. Do not show a search field in the table toolbar.
- Pick the simplest selection control that works for your use case. See [When to Use which Selection Control?](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use)
- For temporal filters, use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/) or [date range selector](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/).
- To help the user enter a valid value for [multi-input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/), enable suggestions.

### Preset Filter Values

- Provide meaningful default values for as many filters as possible to prevent unnecessary data from loading. This is particularly important when the application has large data sets.
  **Example:**
  A default value for date ranges should reflect the time frame the user would normally apply.
- For list reports and overview pages, preset values for mandatory filters to prevent error messages when the page loads.

### Update Mode

- Whenever possible, use the live update mode because it is more convenient for the user.
- Consider the manual update mode only in cases where:
  - The volume of unfiltered data to load would be excessively high.
  - The users need to enter multiple filter values to display results they can work with.

---

## footer-toolbar

The footer toolbar always appears as floating footer at the bottom of the screen. The floating footer property creates some padding between screen and toolbar, improving visibility.

The control is used for closing or finalizing actions that impact the whole page. It is only visible when actions appear, when message handling is visible, or when the draft indicator is displayed. One main advantage of the footer bar is that this bar is always visible and will not scroll away.

Our general guideline is to use only icon buttons **or** text buttons. Icon and text should not be combined into one button. Buttons are always right-aligned.

Buttons are sorted from frequently-used to seldom-used. This ensures that the most important buttons will go into the overflow last.

## Usage

### Use the footer toolbar:

- If you have closing or finalizing actions on your page that apply to the whole page.

### Do not use the footer toolbar:

- If you have different containers on your page (such as charts, tables, and forms) and the action influences only certain items. In this case, place the action as close to the corresponding item(s) as possible.
- If you have global actions (such as _Edit_ or _Delete_) that are not finalizing or closing actions. In this case, use the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/) instead.

## Responsiveness

To enable responsiveness, use the OverflowToolbar control. For more information, please refer to the corresponding section in the [toolbar overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) article.

The height of the toolbar changes on desktops (compact mode), tablets, and smartphones (cozy mode). For more information about cozy and compact modes, see [content density.](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact)

## Components

The footer toolbar can contain the following components:

- Message indicator
- Draft indicator
- Finalizing/closing actions

All closing or finalizing actions are placed on the right side of the toolbar.

The footer toolbar can also include a message and draft indicator. For more information, see [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) and [messaging](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

## Behavior and Interaction

Our general guideline is to use only icon buttons **or** text buttons. Icon and text should not be combined into one button. Buttons are always right-aligned.

The buttons are sorted from frequently-used to seldom-used. This ensures that the most important buttons go into the overflow last.

### App-Specific Actions

If needed, you can define your own action for the app. Use text-only [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) with a short, unambiguous text for the action the button performs. A [button text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori) is usually a single-word verb (for example, _Save_). Note that text strings can be longer in other languages.

#### Text vs. Icon Buttons

Use text-only buttons for all finalizing/closing actions (such as _Save_).

## Styles

- Use button styles only if they help the user, and not for decoration.
- Use the emphasized button for primary actions, such as _Save_.
- Use the ghost button style for secondary actions, such as _Return_, and the transparent button for negative path actions, such as _Cancel_.
- Use the semantic button for positive/negative actions (property: `type` = `accept` or `reject`).
- Use only one emphasized button per toolbar and never mix emphasized and semantic buttons.
  Exception: Additional messaging button for the [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/).

For more information, see [Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) and [Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement).

## Guidelines

See the [guidelines for the toolbar overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#guidelines).

---

## form

> **Information:** This article contains general design guidelines for all forms. The guidelines also apply for smart forms.
For additional hints on smart forms, you can still refer to the existing [Forms / Simple Forms / Smart Forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-52/ui-elements/form/) article for guideline version 1.52. However, please note that this page is no longer updated.

## Intro

A form is used to present data to the user and to allow users to enter data in a structured way.

The form acts as a container for other UI elements (such as [labels](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/), [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/), [checkboxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/), and [sliders](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/slider/)), while structuring these into a specific layout.

In SAPUI5, forms can be built using two different controls:

- Form – [sap.ui.layout.form.Form](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.layout.form.Form.html) (API)
- Simple form – [sap.ui.layout.form.SimpleForm](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.layout.form.SimpleForm.html) (API)

With a **form**, you can easily layout a list of properties and input fields. A form is structured into form containers. Each form container consists of form elements. And each form element consists of a [label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/) and an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/).

The **simple form** control gives you the possibility to achieve the same result as with the form control, but in a much easier way. Inside a simple form, a form control is created along with its form containers and form elements:

- The layout and structure are defined by the content that is entered.
- Form containers and form elements are created automatically according to the content type.
- A title ([sap.ui.core.Title](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.core.Title.html) (API)) automatically starts a new form group (form container), and a label ([sap.m.Label](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.Label.html) (API)) automatically starts a new row (form element).
- All other controls following this label will be assigned to its row (form element).

## Types

There are three types of forms:

- Display-only: the data is presented only as label-value field pairs without editable fields.
- Editable: the data is presented as label-input field pairs, so users can enter data.
- Mixed: some fields are editable and some are not.

> **Hint:** The property **editable** of the **form** and **simple form** only changes the height of labels for vertical alignment to a field (editable = true) or text (editable = false). With the form and simple form, it does **not** switch the whole form between editable and read-only mode, thus changing fields into text and vice versa.

> **Information:** Please consider, that a read-only state of an input element behaves differently (no border and background of the
field) within the **sap.ui.comp.smartform.SmartForm**.

## Responsiveness

The default settings of the control are not ideal for all possible use cases. Instead, applications can use one of the [various layouts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/#various-layouts) for the S, M, L and XL sizes.

### Column Layout

The [ColumnLayout](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.layout.form.ColumnLayout)
control renders a form group in a column-based responsive way. Depending on its size, the group is divided
into one or more columns.
- XL – max. 6 columns
- L – max. 3 columns
- M – max. 2 columns
- S – 1 column
For size XL, we recommend using the full 6 columns for large forms with a lot of content. This gives you
greater flexibility when organizing the content and the form groups.​
To make better use of screen space and give users a better overview without scrolling, you can balance form
groups across multiple columns. The group elements are spread out into columns, depending on the number of
group elements and their size.
Example:
- 4 columns and 2 groups: each group will use 2 columns.
- 3 columns and 2 groups: the larger one will use 2 columns, the smaller one 1 column.
The size of a group element will be determined by the number of visible elements assigned to it. If there are
more groups than columns, every group uses only one column. So the last row of the form control will not be
fully used. This will result in white space.
The form elements are spread out to the columns of a group arranged in a newspaper-like order. The position
of the labels and fields depends on the size of the used column. If there is enough space, the labels are
next to the fields, otherwise above the fields.
If you use the default form settings, each form group is displayed in a separate column. Depending on the
size of the form group, this can mean that users need to scroll down to see the full form, even though there
is unused space on the right side of the screen.
The examples show how forms with one and two form groups are displayed with and without layout balancing.
### Responsive Grid Layout

The responsive grid layout is a form using a responsive grid. Depending on the available space, the groups are rendered in one or multiple columns, and the labels are rendered in the same row as the fields or above the fields. This behavior can be influenced by the properties of this layout control.

By using the responsive grid layout, the form offers a responsive layout based on a 12-column grid. There are two breakpoints, which result in three supported sizes: L, M, and S. These breakpoints are not the L, M, and S breakpoints of the page. In contrast to the page breakpoints, which react to the screen width, the breakpoints of the responsive grid layout react to the width of the form.

**Note:** For downward compatibility reasons, the default form layout control for the form and simple form is the column layout, not the responsive grid layout. Therefore, you need to assign the responsive grid layout manually to each form or simple form by using the layout property.

### Breakpoints

**Size S** reaches up to 600 px. This
means that as soon as the width of
the form reaches 601 px, it changes   | _Form with breakpointM – Size S_          | _Form with breakpointM – Size M_
from S to M, because the default
value of breakpointM is 600. The
value of breakpointM is the first
value of the smaller size.
The property breakpointL between sizes L and M
works in the same way: **Size M** reaches from
601 px to 1024 px. This means that as soon as   | _Form with breakpointL – Size M_          | _Form with breakpointL – Size L_
the width of the form reaches 1025 px, it
changes from M to L, because the default value
of breakpointL is 1024.
Also the property breakpointXL
between sizes L and XL works in the
same way as before: **Size L**        | _Form with breakpointXL – Size L_           | _Form with breakpointXL – Size XL_
reaches from 1025 px to 1440 px. This
means that as soon as the width of
the form reaches 1441 px, it changes
from L to XL, because the default
value of breakpointXL is 1440.
In general if the page width changes to a smaller size,
the width of the form in the next smaller breakpoint is
usually reached **before** the width of the page reaches
its breakpoints in that size. For example the width of a
form reaches breakpoints M to S before the width of the
page reaches the breakpoints from M to S. This happens
due to the padding of the container in which the form is
placed.
> **Hint:** To set the form’s breakpoints individually and to synchronize it with the breakpoints of the page, you can use the **breakpointS** / **breakpointM** / **breakpointL** / **breakpointXL.** If you are using a simple form, set these properties directly in the simple form control.

### Label-Field Ratio

For each size, you can define how many grid columns are used for **labels** (labelSpanXL, labelSpanL, labelSpanM, labelSpanS), **fields** (implicitly), and **empty grid columns** (emptySpanXL, emptySpanL, emptySpanM, emptySpanS).
The optional empty grid columns are placed after the input elements. They avoid excessive stretching of the input fields. This ratio is displayed as **x: y :z**, where x is the number of grids used by the **labels**, y stands for the **fields**, and z for **empty columns**.
We highly recommend to change the default of the label-field-ratio according to your app’s needs. For more information, see the recommended layouts in the Layout section.
> **Hint:** To make the properties labelSpanXL, labelSpanL, labelSpanM, and labelSpanS in the responsive grid layout work as expected (e.g. labelSpanL sets the label span in size L) in Forms and SimpleForms, you must change the property **adjustLabelSpan** from its default true to **false**.
Otherwise..
- labelSpanL is used for labels in forms with several form groups arranged in **more than one column**; it applies for both – M and L screen sizes.
- labelSpanM is used for labels in forms arranged in **one column**; it also applies for both M and L screen sizes.
- The default value of the property **adjustLabelSpan** is set to true for reasons of backward compatibility.
Input controls like [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) can be displayed in both – cozy and compact mode (for more information, see [c](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact)[ontent density (cozy and compact)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact). To horizontally align a label next to a field, the form has different CSS in cozy mode and compact mode.

The form and simple form use a **single-column layout** within the responsive grid layout in **size S**
by default. This means that the form groups are positioned below each other in a single column and the
labels are positioned above the fields to avoid truncation of the labels.
The label-field ratio is **12:12:0** by default:
- 12 grid columns of the responsive grid layout are used by the labels.
(A label handles the space of a whole row.)
- 12 grid columns of the responsive grid layout are used by the fields.
(A field handles the space of a whole row.)
- 0 grid columns of the responsive grid layout are used by empty columns.
(There is no empty space on the right of the field.)

**Size M** of the form and simple form also has a **single-column layout**
within the responsive grid layout by default. However, in size M the
labels are positioned in the same row as the corresponding input field or
value, and form groups are positioned below each other.
The label-field ratio is **2:10:0** by default:
- 2 grid columns of the responsive grid layout are used by the labels.
- 10 grid columns of the responsive grid layout are used by the fields.
- 0 columns of the responsive grid layout are used by empty columns.
**Please change the default 2:10:0 according to your app’s needs** (see the recommended layouts in the Layout section).

The form and simple form in **size L** use a **two-column layout**
within the responsive grid layout by default. That means that the
form groups are placed next to each other to have all the
information on one screen and to avoid scrolling. In these
columns, the labels are positioned in the same row as the
corresponding input field or value. So the form groups adopt the Z
layout (reading direction in rows, not in columns).
The label-field ratio is **4:8:0** by default:
- 4 grid columns of the responsive grid layout are used by the
labels.
- 8 grid columns of the responsive grid layout are used by fields.
- 0 grid columns of the responsive grid layout are used by empty
columns.
### Size XL

Like the form and the simple form in **size L**, the **size XL** uses also a **two-column layout**
within the responsive grid layout by default. To have all the information on one screen and avoid
scrolling, the form groups are placed next to each other. In these columns, the labels are
positioned in the same row as the corresponding input field or value. The form groups adopt the Z
layout.
The label-field ratio for size XL is **4:8:0** (technically the value is set to -1 and inherits
the value of size L, see also the development hint below) by default:
- 4 grid columns of the responsive grid layout are used by labels.
- 8 grid columns of the responsive grid layout are used by fields.
- 0 grid columns of the responsive grid layout are used by empty columns.
> **Hint:** For forms and simple forms, the value of the properties **labelSpanXL**, **emptySpanXL** and **columnsXL** are set to -1 and inherit the value of size L (to enable backward compatibility).

## Layout

### One Page, One Form

If a **form contains only one group**, do not use a group title – instead, use the **form title**.

If the **form is the only element** on the page and if it has more than one group, you can use the **group titles** to capture the groups.

If the **form is one of several elements** on the page, such as tables and lists, use the **form title** as its caption.

### One Page, Many Forms

If you want to emphasize that some groups are very distinct, use several forms on a page instead of one form with several groups. Visually this looks more separated than using a single form with several groups. Give each form a meaningful title. If necessary, you can structure each form with groups as well. In this case, also give the groups a title.

### Various Layouts

The following sections give guidance on how to configure the form so that it meets the needs of different sizes. Depending on where you place the form, we highly recommend changing the default and using one of the following layouts according to your app’s needs.

#### Size S (Smartphones and Dialogs)

Retain the default behavior (single column layout with a
label-field ratio **12:12:0**).

#### Size M (Tablet) – Full Screen

If you place the form in the details part of a split screen, use a **single-column layout** with the label-field ratio **4:7:1**
(4 grid columns used by the labels, 7 grid columns used by the fields, and
1 grid column used by empty columns).

If you place the form in a full-screen app, use a **single-column layout** with the label-field ratio **3:5:4**
(3 grid columns used by the labels, 5 grid columns used by the fields, and 4 grid columns used by empty
columns).

As explained already in the section Responsiveness (Breakpoints), Size M
goes down to 601 px. In this size, the 3:5:4 approach may not be wide
enough for **longer labels and fields**. So if you expect long labels or input values, use the label-field ratio **4:8:0**
(4 grid columns used by the labels, 8 grid columns used by the fields, and
0 grid columns used by empty columns).
If you place the form in a full-screen app and it contains **several form groups**, use a **two-column layout** with its label-field ratio of **12:12:0**
(12 grid columns used by the labels, 12 grid columns used by the fields, and 0 grid columns used by
empty columns).

> **Hint:** Unlike all other XL-L-M-S properties, labelSpanL and labelSpanM up to SAPUI5 version 1.34 did not follow the XL-L-M-S
size paradigm. LabelSpanL set the label span in layouts that contain more than one column, and labelSpanM set the
label span in layouts that contain only one column. This has been changed since version 1.34. Due to downward
compatibility, the new parameter adjustLabelSpan was necessary. Also due to downward compatibility, its default value
is ‘true’, which causes the old behavior of the labelSpan properties. To achieve the new, correct behavior of the
labelSpan properties, you must set the property adjustLabelSpan to ‘false’.

#### Size L (Desktop Screens)

If the form contains a **single form group**, use a **single-column layout** with a label-field ratio of **3:5:4** (3 grid columns used by the labels, 5 grid columns used by the fields, and 4 grid columns used by empty columns).

If the form contains **multiple form groups**, you can also use a **two-column layout** with a label-field ratio of **12:12:0**
(12 grid columns used by the labels, 12 grid columns used by the fields, and 0 grid columns used by empty columns). As
explained already in the section Responsiveness (Breakpoints), Size L goes down to 1025 px. In this size, long labels that are
put next to the fields might not fit on smaller L-sized screens (especially in split apps). Therefore labels are put above
fields.
> **Hint:** Unlike all other XL-L-M-S properties, labelSpanL and labelSpanM up to SAPUI5 version 1.34 did not follow the XL-L-M-S
size paradigm. LabelSpanL set the label span in layouts that contain more than one column, and labelSpanM set the
label span in layouts that contain only one column. This has been changed since version 1.34. Due to downward
compatibility, the new parameter adjustLabelSpan was necessary. Also due to downward compatibility, its default value
is ‘true’, which causes the old behavior of the labelSpan properties. To achieve the new, correct behavior of the
labelSpan properties, you must set adjustLabelSpan to ‘false’.

#### Size XL (Desktop Wide Screens)

If the form contains a **single form group**, use a **single-column layout** with a label-field ratio of **3:5:4** (3 grid columns used by the labels, 5 grid columns used by the fields, and 4 grid columns used by empty columns).

The responsive grid layout has the new property **singleContainerFullSize**. This
property enables you to insert empty columns in your form: You can for example then set
the property columnsXL to 2, fill one column with the **single form group** in a label-field ratio of **4:8:0**
(4 grid columns used by the labels, 8 grid columns used by the fields, and 0 grid
columns used by empty columns), and leave the second column empty. For more information,
see also the development hint below.
If the form is put into a full-screen app, with the property **singleContainerFullSize** you can also set columnsXL to 3, fill one column with the **single form group** in a label-field ratio of **12:12:0**
(12 grid columns used by the labels, 12 grid columns used by the fields, and 0 grid columns used by
empty columns), and leave the second and third columns empty.

If the form contains **multiple form groups**, you can also use a **two-column layout** with a label-field ratio of **4:8:0** (4 grid columns used by the labels, 8 grid columns used by the fields, and 0 grid columns used by empty columns).

If the form is put into a full-screen app and it contains **multiple form groups**, you can also use a **three-column layout** with a label-field ratio of **12:12:0** (12 grid columns used by the labels, 12 grid columns used by the fields, and 0 grid columns used by empty columns).
_Form with two form groups (three columns) – Size XL (12:12:0)_           | _Form with three form groups (three columns) – Size XL (12:12:0)_

If you use a three-column layout for
XL screens, do not use a two-column
layout for L and M screens as it      | _Form with a lot of white space (two columns)_           | _Form with less white space (single-column layout)_
could create a lot of white space. In
this case, use a single-column layout
instead.
> **Hint:** Up to SAPUI5 version 1.34, a group in a form with only this single group covered the entire width, irrespective of
the value of the properties columnsM/L. Therefore, it was not possible to create an empty column next to the single
group. This had to be changed. However, the default value of columnsL has always been 2. So if single groups no
longer cover the entire form, all forms with a single group are automatically changed to two column forms in size L
if the default value of the property columnsL has not been changed manually to 1. Therefore, a new property had to be
introduced: **singleContainerFullSize**.If you are using a simple form, set this property directly in the simple form
control. Its default value is ‘true’, which reflects the old behavior. A single group covers the entire width of the
form, irrespective of the values of the properties columnsM/L/XL. If it is set to ‘false’, the form with a single
group has as many columns as the properties columnsM/L/XL are set to. The new behavior with the empty columns now can
be achieved.

## Components

The following UI elements can be placed in the form container:

- [Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#standard-buttons) and [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#segmented-buttons)
- [Checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/)
- [File uploader](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.ui.unified.sample.FileUploaderBasic/preview)
- [Icon](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/iconography/icons)
- [Image](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/)
- Input controls, such as the [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/), [multi-combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/), [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/), [date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/), [dynamic date](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/dynamic-date-range/), [time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/time-picker/), [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/), [multi-input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/), and [mask input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-mask-input/).
- [Object number](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#object-number)
- [Object status](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#-object-status)
- [Progress indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/progress-indicator/)
- [Radio button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radio-button/) and radio button group
- [Rating indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/rating-indicator/)
- [Search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/)
- [Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/)
- [Slider](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/slider/)
- [Step input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/step-input/)
- [Switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/switch/)
- [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) and [text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/)

## Guidelines

- Order the form logically from a user’s perspective. For example, ask for a user’s name before asking them for their address.
- Group related information by using form and group titles.
- Use Column layout instead of Responsive Grid layout, if possible.
- Try to arrange form groups (especially in size L and XL) in a way that the form:
  - Is easy to read and understand.
  - Does not contain too much white space (split groups if necessary).
- If you have combined fields that contain, for example, a postal code and the name of a city, you can provide one combined label (postal code and city) for this group.
- Less is more: try to minimize the number of labels and their corresponding fields as much as possible.
- If an input element is in an error or warning state, provide a meaningful message for the user. There is a corresponding property valueStateText in the sap.m.Input API.

### Label

To avoid truncation, [labels](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/) within forms wrap automatically.

Always aim to keep your labels as concise as possible. Remember that a label is **not** a help text. It must be meaningful, succinct, short, and descriptive. The purpose of the wrapping feature is to make the full label text legible and to help avoid unnecessary use of abbreviations. It is not intended as a fallback for very long labels.

- A label is **not** a help text. Give each field a meaningful label. Make labels succinct, short and descriptive.
- The label of a required field is marked with an asterisk (\*). There is a corresponding property in the API for this. **Do not write the asterisk manually in the label text.** Just use the corresponding property, and the asterisk will be inserted automatically.
- At the end of the label, the form container automatically inserts a colon (:), which is triggered by the style sheet. **Do not write the colon manually in the label text.**
- Use default settings for labels. (For example, labels are **not** supported for manual bold formatting.)

### Label Alignment

- We generally recommend placing the label above the field. This is the most usable option, since it best supports the reading flow and avoids unnecessary eye movements.
- If there is enough space on the screen, you can right-align the labels next to the value. Right-aligned labels minimize the gap between the label and field, and give the eye one line to scan along. Only place labels next to the value if there is also enough space to allow for longer labels in other languages.

> **Information:** The [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/)
can show up to four columns if the screen is wide enough. In most cases, the space available per form column is too narrow to display
the label next to the field/value. Because of this, forms within the multi-column layout of an object page only support labels **above**
the fields values. Label lengths can vary greatly, and placing the labels on top reduces the risk of truncation for both the label
and the content.

### Empty State Indicator

If the form field doesn’t have a value, show an **empty state indicator**
in display mode. This helps the user to better scan the form and perceive
the field label and empty content as one unit.

> **Hint:** The empty indicator does not show by default. You need to activate it for the respective text (property: `emptyIndicatorMode`).

### Unit of Measurement

You can add the unit of measurement after certain input controls by using the layout options of the form. Examples of supported input controls include [multi-input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/), [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/), [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/), [multi combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/), and [mask input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-mask-input/).
If you display the unit of measurement after the input control, make sure that it’s properly visualized and doesn’t wrap to the next row.

### Amount Alignment

When the form is in **edit mode** (label-value field pairs with editable and non-editable fields), **right-align** amounts.

When a form is in **display mode** (label-value field pairs without editable fields), **left-align** amounts to avoid large gaps between the labels and values, and to improve readability.

### Data Loss Message

Provide a data loss message if the user accidentally navigates away from the page (for example, if the user selects a list item in a list-detail layout and then clicks the the _Back_ or _Home_ button). For details about how the message is delivered and what text you can use, see [Message Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

### Form Field Validation

Provide form field validation which describes the validation points and the choreography associated with messaging. For more information, see [form field validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/).

### Input Assistance

Intelligent systems can help users by recommending appropriate content or suggesting an action or input the user may “prefer”. The system assists the user by entering data or filtering data. Typical examples might be a search phrase suggestion, an appropriate form template, or a set of suggested default values for certain fields, based on the user input and interaction history.

For more information, see [Designing Intelligent Systems – Input Assistance](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/recommendations#input-assistance1).

### Error Prevention

Help the user to avoid errors by using [input types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#types) (sap.m.InputTypes) and [mask input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-mask-input/) (sap.m.MaskInput). The input fields automatically get a specific format, which helps prevent the user from making invalid entries.

Always start with the least complex control (for example, use select instead of value help if the user needs to select only one item from a short list). Use more intricate controls only if the use case really requires it.

### Placeholder

Provide a placeholder (or input prompt) as a short hint (a word or short phrase) to help the user with data entry. A hint can be a sample value or a brief description of the expected format.

**Avoid** using the placeholder attribute as an alternative to a label. This is important because the placeholder text is overwritten as soon as the form is filled out. Labels are necessary to indicate the meaning of the form fields when the placeholders are no longer visible.

**Never repeat the label** in the placeholder text. Only offer a placeholder if it provides the user with additional information.

### Toolbar

The form supports actions on form toolbar level as well as on group header level. Application development teams can add actions such as ‘Edit’, ‘Save’ or ‘Cancel’. If there is an action that only applies to the specific group on group level, it can only be added on the group header level of the specific group.

### Expanded/ Collapsed Form

The form supports expand / collapse buttons on a per-group level. However, we recommend **avoiding** the usage of expand / collapse behavior on a form.

---

## form-field-validation

This article describes data validation for fields in SAP Fiori apps. This includes information about the validation points and the choreography associated with messaging.

For more information on the messaging concept for SAP Fiori apps, see the article on [message handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-mask-input/).

> **Information:** For S/4HANA applications, use the [On Enter](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/form-field-validation/#on-enter) and [On Save or Create](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/form-field-validation/#on-create-or-save) validation choreography. See the design decision.

## Behavior and Interaction

The [message popover](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/) is only used to display field-related messages.

Default (col-1)

### Validation Choreography
#### Focus Out
- Validation occurs when the value in the input field has changed and the focus leaves the field.
- The mandatory fields get value states.
- A message button appears in the toolbar (semantic button, icon: alert, counter).
- If the message popover is open and already contains one or more messages, the list is updated.

> **Warning:** Focusing out of a field or switching from one field to another manually or using the “Tab” key doesn’t validate the
entire form. It only validates the field that was previously in focus.

Default (col-2)

Default (col-3)

Section Metadata

style

##### When to Use

Do
Use the “focus out” validation when a draft has few
fields to validate.
- A draft has many fields to validate.
- Users want to enter data quickly, uninterrupted by
repeated validation.
- They navigate with the keyboard for faster data entry.
- They regularly enter data in a draft for some, but not
all fields.

#### On “Enter”
L / XL Screens                                                                                                                                                                               | _Loading animation on enter_                     | _Validation completed_
- The entire form is validated, or the whole object including all the
forms it contains.
- If the user selects a value by pressing _Enter_, the value is                                                                                                                              | _'Save' / 'Validate' split menu button_
selected without triggering validation (for example, when adopting a
suggestion or entering a value in a combo box). The user must then
press _Enter_ a second time to trigger the full form validation process.
- Any errors or warnings are displayed in a message popover.
S / M Screens
- On phones and tablet devices, there is no _Enter_ shortcut. Instead, a _Validate_ button is available in the footer. The _Validate_ button is combined with _Save_ in a split menu button.
##### When to Use

Do
Use the “on Enter” validation (or the _Validate_ button on a phone or tablet device) when:
- The object should stay in draft mode until the final _Save_ or _Create_ action.
- A draft has many fields to validate.
- Users want to control when the validation happens.
#### On “Create” or “Save”
- The entire form is validated.  | _Form with at least one input_          | _Validation completed_
- A message popover displays any
errors or warnings.
Do
Always use this option, even if you use “focus out” or
“on Enter” validation.
#### Validation
- Highlight the specific field and include a useful message.
- Display a button on the left side of the footer toolbar.
- The button displays the sap.m.MessagePopover. For more information, see [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/).
- If the issues have been resolved, and the user is able to proceed, remove the corresponding messages.
### Connected Fields

Some fields are connected because the coherence of their values depend on each other. At the time of validation, one or several of those connected fields are highlighted according to the case. In every case, the value state message is the same for every field.

Some examples of connected fields are: value/unit of measure, price/currency, or zip-code/city.

#### Empty Fields
If the entered values are incoherent, all connected
fields get the value state after the focus has left the
connected fields.
#### Mandatory Fields
If the focus has left the connected fields, only the
missing field gets the error state.
If the connected fields are not mandatory, validation
occurs only when both fields contain data.
#### Read Only
Read-only fields don’t get value states.

### Error Prevention

Help the user to avoid errors by using [input types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/#types) (sap.m.InputTypes) and [mask input](https://wiki.one.int.sap/wiki/pages/viewpage.action) (sap.m.MaskInput). The input fields automatically get a specific format, which helps prevent the user from making invalid entries.

Always start with the least complex control (for example, use select instead of value help if the user needs to select only one item from a short list). Only use more intricate controls if the use case really requires it.

## Guidelines

Depending on the floorplan, certain validation guidelines need to be applied.

### Global Edit Flow

This floorplan is significant in that the actions are only displayed in the footer toolbar on the main page of the object. The subpages do not provide action buttons. Therefore, the message popover includes all messages for the whole object (the main object page and all subpages).

The validation can be triggered by the following:

- Focus Out: Current field, or current field and dependent fields.
- On Enter: The form with the latest focus and possible dependent fields in other sections on a page
- Action Button: Complete object validation including subpages.

> **Information:** Messages that occur on subpages should include the name of the line item so that the user at least knows where to
find the field to resolve the issue.

For more information, see [Complex Objects – Global Flow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow).

### Partial Editing

When the user clicks _Save_, the whole form remains in a busy state until the action has been completed:

- If there are no messages: switch to display mode.
- If there are messages that relate to a field: highlight the respective field with its value state and **do not use the message popover.**
- If there are messages that do not relate to a field, show a dialog with the message(s).

For more information, see [Partial Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/).

### Message Popover Control
Do **not** show the [message button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/#message-button) and message popover:
- In a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-parts-of-an-object)
- In a partial editing area. If you offer partial editing, never show a message popover for the part of the screen being edited. The message popover always belongs to the footer
toolbar for the whole page.
Instead, just highlight the fields that contain errors to make it easier for the user to understand the issue(s).

---

## form-web-component

A form is used to present data to the user and to allow users to enter data in a structured way.
The form acts as a container for other components (such as labels, input fields, checkboxes, and sliders), which are
structured in a specific layout.
Form - display and edit views

## When to Use

Do
Use the form:
- When you require data input from the user to collect
information (for example, in a survey or application
form).
- When the user can edit or enhance data that is already
available.
## Top Tips

- Order the form logically from a user’s perspective. For example, ask for a user’s name before asking them for their address.
- Group related information by using form and group titles.
- Try to arrange form groups (especially in size L and XL) in a way that the form:
  - Is easy to read and understand.
  - Does not contain too much white space (split groups if necessary).
- If an input element is in an error or warning state, provide a meaningful message for the user.
- If you display the unit of measurement after the input field, make sure that it’s properly visualized and doesn’t wrap to the next row.
- When the form is in edit view, right-align amounts to avoid gaps between the amount and the unit of measurement.
- When a form is in display view, left-align amounts to avoid large gaps between the labels and values.
- If the expected input isn’t obvious from the label alone, provide a brief placeholder (word or phrase) as a hint to help the user with data entry.

## Anatomy

### Structure

A form is structured into form containers. Each form container
consists of form elements.
Structure of a single form container
1. **Container**: The form is the top-level container component.
It controls the content layout and the responsiveness.
2. **Group**: The form group enables grouping of the form content.
3. **Form item**: A pair of label and form field.
### Parts of a Form

A simple form consists of a header area and a content area with pairs of
label and form field.
Anatomy of a simple form
1. **Header area**: The header area is on top and displays a header text.
2. **Label**: The label of a single form item. It serves as the name of
the input field.
3. **Value**: In display mode, the value is read only. In edit mode, a
value can be added or edited.
## Commonly Used Components

The following components are typically placed in the form container:

- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button-web-component/) and [segmented button](https://www.sap.com/design-system/fiori-design-web/ui-elements/segmented-button-web-component/)
- [Checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox-web-component/)
- File uploader
- [Icon](https://www.sap.com/design-system/fiori-design-web/ui-elements/icon-web-component/)
- Input components, such as the [combobox](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box-web-component/), [multi-combobox](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-combo-box-web-component/), [date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker-web-component/), [date range picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-range-picker-web-component/), [date/time picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-time-picker-web-component/), [time picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/time-picker-web-component/), [input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-web-component/), and [multi input](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-input-web-component/)
- [Progress indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator-web-component/)
- [Radio button](https://www.sap.com/design-system/fiori-design-web/ui-elements/radio-button-web-component/)
- [Rating indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator-web-component/)
- [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select-web-component/)
- [Slider](https://www.sap.com/design-system/fiori-design-web/ui-elements/slider-web-component/)
- [Step input](https://www.sap.com/design-system/fiori-design-web/ui-elements/step-input-web-component/)
- [Switch](https://www.sap.com/design-system/fiori-design-web/ui-elements/switch-web-component/)
- [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-web-component/) and [text area](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-area-web-component/)

## Types and Layouts

### Form Variants

#### Form with Custom Header

You can use a custom form header (for example, with
additional buttons).
Simple form with custom header

#### Freestyle Form

The freestyle form gives you full control of the form and
its elements.
Example of a freestyle form

### Layout Variants

#### Single Form on a Page

A single form can contain one or more groups.

Form with only one group and a header title

> **Guideline:** - If a form contains only one group, don’t use a group title. Instead, use the form title.
- If the form is the only element on the page and if it has more than one group, you can use the group titles to
capture the groups.

#### Multiple Forms on a Page

You can also use multiple forms on one page. Separate forms are more distinct visually than groups within a form.

Two forms on one page

> **Guideline:** - For clearer group separation, use several forms on a page instead of a single form with multiple groups.
- Provide a meaningful title for each form.
- If needed, also use group titles within each form.

#### Default Layouts Per Size

Size S – 1 column by default.
Form in size S with 1 column

Size M – 1 column by default.

Size L – 2 columns by default.

Size XL – 3 columns by default.

#### Label-Value Alignment

You can align labels vertically or horizontally.

**Vertical alignment**: The vertically-aligned form best
supports the reading flow and avoids unnecessary eye
movements.
Form - vertical alignment

#### Form Group Span

Form groups can be distributed into one or more columns.
**Example:**
Group _More Information_ spans two columns.
#### Form Item Span

A form item can span several columns.
**Example:**
Form item “Full Name” spans in two columns.
## Features

### Label for Required Fields

The label of a required field is marked with an asterisk
(\*).
Required field marked with an asterisk (\*)
The asterisk is visible in edit view only.
### Empty State Indicator

If a form field doesn’t have a value, an empty state
indicator is shown by default in read-only mode.
Empty state indicator in a form (display view)
The indicator helps the user to better scan the form and
perceive the field label and empty content as one unit.
If a field is empty in the edit view, there is no empty
state indicator. The field is either empty or displays a
placeholder text, if defined.
Empty state indicator is not visible in edit view

## Behavior and Interaction

The visual appearance of the form depends on the [component state](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states) of the form fields. As a result, three form views are possible: display, edit, and edit with read-only fields.

### Display View

The data is presented as label-value field pairs, without
editable fields.
Form in display view

### Edit View

The data is presented as label-input fields pairs, so
users can enter or edit data.
Form in edit view

### Edit View with Read-Only Fields

Some fields are editable, and some are not (shown in
read-only state).
Form in edit view with read-only fields

## Responsive Behavior

### Breakpoints

The form component reacts and changes its layout on [predefined breakpoints](https://wiki.one.int.sap/wiki/pages/viewpage.action?pageId=2697902588). Depending on its size, the form content gets divided into one or more columns.

#### Distribution of Columns per Layout Size

Table (20-30-30-10-10)

Size | Recommended     | Default
S    | 1 column        | 1 column
M    | Up to 3 columns | 1 column
L    | Up to 3 columns | 2 columns
XL   | Up to 6 columns | 3 columns
### Content Columns

A single form group consists of 12 columns. These
invisible columns help to distribute the content within a
form group regardless of the number of columns that a
form is using per layout.
For example, the content-columns help to define form item
span and form item empty space.
#### Example

S1 M2 L3 XL6: 1 column for S, 2 columns for M, 3 columns for L, and 6 columns for XL.

Form with breakpoint – Size S

Form with breakpoint – Size L

Form with breakpoint – Size XL

### Group Spreading

If a form contains more than one group, the group with the most items is wrapped with priority by default. In the XL example below, the _Contact_ and _Address_ groups each span two columns.

Form in size XL with 6 columns and groups that span 2 and 3 columns

### Wrapping

To avoid text truncation, all values and labels within a
form wrap by default.
Wrapped labels and texts in a form

By default, form titles wrap.

Form titles wrap by default

### Alignment

If there isn’t enough space to show a horizontally-aligned form, the display switches to vertical alignment.

### Form Label Span

By default, the labels take 4/12 columns, leaving 8/12
parts for associated fields/values.
Label-field distribution in a form
**Example:**
The label takes 4 columns of the form, leaving 8 columns
for the field.
### Empty Span

Additional empty space can be defined for a form item. By
default, empty space is visible.
Proportion between label, field/value, and the empty
**Example:**
The proportion between the label, field/value, and the
empty space is 4:7:1.
## Globalization and Localization

The form can be rendered in left-to-right (LTR) or right-to-left (RTL) reading directions.

Form in LTR mode

## Guidelines

### Optional Label

All fields that are not marked with the required label by
default are considered optional in a form.

In some cases, you might need to make such optional
fields more distinguished than the required ones. To
achieve that we recommend adding ‘(optional)’ at the end
of the label. An item with ‘(optional)’ mark stands out
more and indicates that the field is not required and
does not need to be filled in by the user.
### Unit of Measurement

You can add the unit of measurement after certain input
components. Examples of supported input controls include
multi input, select, combobox, multi-combobox.
If you display the unit of measurement after the input
component, make sure that it’s properly visualized and
doesn’t wrap to the next row.

---

## formatted-text

The formatted text control displays HTML text. You can
format the text using HTML tags or embed formatted text.

## When to Use
### Use the formatted text control to:
- Embed formatted HTML text.
- Display longer texts, such as descriptions, legal texts, or manuals.
- Display simple lists with bullet points or numbers.
- Display code.
### Do not use the formatted text control to:
- Display In-app help or explanations on how to use your app. 
- Display a simple and short text. Use the [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) control instead.
- Display a semantically-colored text or a status. Use the [object status](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-72/ui-elements/object-display-elements/#-object-status) instead
- Display an object name with or brief additional information. Use the [object identifier](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/) instead.
- Display a number or sum. Use the [object number](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#object-number) instead.
- Display a currency. Use the [currency](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/currency/) control instead.
- Display a label. Use the [label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/) control instead.
- Display a single headline. Use the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) control instead.
- Let the user to type in longer texts and format them. Use the [rich text editor](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/rich-text-editor/) instead.
## Components

By default, the control uses the standard font and headlines. It supports the following HTML tags:

Default (col-1)

### Text Styling

Table (col-1)

HTML Tag

a

abbr

bdi

blockquote

cite

code

dir

em

pre

strong

Default (col-2)

### List

Table (col-2)

HTML Tag

dl

dt
(of a description list)

ul

ol

li
(of an unordered or ordered list)

Default (col-3)

### Structure

Table (col-3)

HTML Tag

br

h1-h6

p

span

Section Metadata

style

## Behavior and Interaction

The formatted text control itself is not interactive. However, it can contain interactive elements, such as [links](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) and anchors.

## Responsiveness

The text automatically adapts to the screen size unless you set a fixed width and/or height.

## Examples

Here are some examples that use the various HTML tags.

## Top Tips

- Use the different styling options carefully and not for decoration only.
- Consider accessibility, such as color contrast.
- SAP Fiori uses [theming](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/theming). Be aware that if you make custom changes to the HTML (such as changing colors), you need to take care of the theming part as well.
- The text direction is inherited by default. If you want to use a different text direction for part of the formatted text, make use of the `bdi` and `dir` HTML tags to set the direction explicitly.

---

## header-toolbar

The header toolbar always appears in the header of the page. One main advantage of the header bar is that this bar is always visible and will not scroll away. It contains actions that are relevant for the entire page.

Our general guideline is to use only icon buttons **or** text buttons. Icon and text should not be combined into one button. Buttons are always right-aligned.

Buttons are sorted from frequently-used to seldom-used. This ensures that the most important buttons go into the overflow last.

## Usage

### Use the header toolbar if:

- Your page contains several controls, and the actions are valid for the entire page.

### Do not use the header toolbar if:

- You have closing or finalizing actions for the whole page. Place them in the footer toolbar instead.
- You have actions that belong to a specific UI element. Place them as close as possible to the corresponding object (for example, in a table or chart toolbar).

## Responsiveness

To enable responsiveness, use the OverflowToolbar control. For more information, see the corresponding section in the [Toolbar Overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) article.

The height of the toolbar changes on desktops (compact mode), tablets, and smartphones (cozy mode). For more information about cozy and compact modes, see [Content Density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Components

The header toolbar can contain the following components:

- App-specific business actions
- Generic actions

The following actions count as **generic**:

- Flag and Favorite
- Share menu
- Overflow
- Paging

## Behavior and Interaction

### Business Actions

If needed, the app team can define their own actions for the app. In this case, the text buttons should contain a short, unambiguous text that explains what action the button performs. A button text is usually a single-word verb (for example, _Synchronize)_. Note that translated UIs may increase the length of the text string.

#### Text vs. Icon Buttons

Use text-only buttons for all business actions (such as _Edit_ and _Create_).
Use icon buttons only for generic actions (such as :action: for _Share_). For icons, always provide a suitable text label as a tooltip.

### Edit and Delete (1)

If you want to perform a global edit action, use the _Edit_ button.

If you want to perform a global delete action, use the _Delete_ button.

### Add / Create (2)

Place the _Add_ or _Create_ (item or row) action as close to the content as possible.

If the _Add_ or _Create_ action is a main function, don’t move the action into the overflow.

For more information on when to use _add_ or 
### Favorite and Flag (Generic) (3)

Users can mark objects as a favorite or flag objects for quick subsequent retrieval. The user does this by clicking the relevant generic _Favorite_ or _Flag_ button in the header toolbar. For more information, see [Flag and Favorite](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/flag-and-favorite/).

### Share (Generic) (4)

The _Share_ menu allows users to work with content outside
the app they are currently using. It can include a variety
of actions. All the buttons contain either text only or a        | _Possible actions in the 'Share' menu_
combination of an icon and text. The following actions can
be used and complemented by each app:
- _Send Email_ (icon: email :email: )
- _Discuss in SAP Jam_ (icon: discussion-2 :discussion-2: )
- _Share in SAP Jam_ (icon: share-2 :share-2: )
- _Send Message_ (icon: post :post: )
- _Save as Tile_ (icon: add favorite :add-favorite: )
- _Print_ (icon: print :print: )
- _Export as Excel_ (icon: Excel attachment :excel-attachment: )
- _Export as PDF_ (icon: pdf attachment :pdf-attachment: )
- _Export As…_
- _Open In…_
If you expect the user to use the _Open In…_ functionality
frequently, place it directly in the header toolbar.
The _Share_ action can appear on the full screen or the
details screen, and is never moved into the overflow menu.
It is always right-aligned. The overflow starts to the
right side of the _Share_ icon.
### Overflow (Generic) (5)

If apps use the overflow toolbar, the overflow is generated automatically. The overflow is activated if there is not enough space for all the actions on the toolbar, or if some actions are considered less important than others. In this case, the app team decides that only certain actions appear in the overflow.

The app team also decides whether some actions are so important that they should never move into the overflow.

The “**…**” (_overflow_) button can be used to toggle the overflow menu on and off.

The user clicks the overflow button to open a popover. In this action sheet, all icon buttons are labeled with text and the user can overflow the following controls:

- sap.m.[SegmentedButton](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) – when in the overflow, the segmented button is in select mode and looks like a select button, although it is technically still a segmented button
- sap.m.[Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) – when in the overflow, it is always in default mode to take advantage of the extra space, even if it was set to icon-only mode in the toolbar
- sap.m.[ToggleButton](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/)
- sap.m.[Checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/)
- sap.m.[Input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)
- sap.m.[SearchField](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/)
- sap.m.[ComboBox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/)
- sap.m.[DateTimeInput](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/date-time-input/)

Split-screen layouts have their own overflow menus.

All buttons go into the overflow from right to left. This ensures that the most important buttons are the last to be moved into the overflow menu.

### Paging (Layout)

Use the paging buttons if you want to navigate to the previous or next object.

Use the following tooltip labels:

- Icon: Up arrow
  Tooltip label: _Previous [Object]_
  Example: 
- Icon: Down arrow
  Tooltip label: _Next [Object]_
  Example: 
To avoid translation issues, never use “Next” and “Previous” as standalone labels. Always state the object you are navigating to.

If you are using the _Share_ button, place paging buttons to the right of the _Share_ button.

## Styles

- Use button styles only if they help the user, and not for decoration.
- Use them for primary actions, such as _Edit_ and _Create_.
- Use a positive/negative style (property: `type` = `accept` or `reject`) **or** an emphasized style (property: `type` = `emphasized`).
- Use only one emphasized button per toolbar and never mix emphasized and semantic buttons.
  Exception 1: Messaging button appears
  Exception 2: Object has been flagged or marked as a favorite

For more information, see [Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/).

## Guidelines

For more information, see the _Guidelines_ section in the [toolbar overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#guidelines) article.

---

## icontabbar

The icon tab bar comprises a series of tabs that each link to a different content area or view. You can use it for **navigation** within an object, or as a **filter**.

There are two key use cases:

- You want to let users navigate between different object facets in the object details area.
- You want to let users filter lists, and give them the option of calling up the entire list, or only items with a specific attribute.

In both cases, the user switches between tab pages by clicking the respective tab.

## Usage

### Use the icon tab bar if:

- Your business objects need to show multiple facets at the same time.
- You want to allow the user to browse through these facets.
- You need a prominent or very visual filter on top of a list.
- You have clear-cut process steps that need to be visualized.

### Do not use the icon tab bar if:

- You plan to use only one single tab.

## Responsiveness

The icon tab bar stretches horizontally, which often exceeds the available width on small screens. It responds to limited space by offering a scrolling mechanism.

In addition to the responsive overflow behavior, the icon tab bar can be forced into compact mode or even react dynamically to the application’s global density setting. See the [Tab Density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/#tab-density) section for details.

If there is not enough space to show all the tabs on the main tab bar, an overflow menu appears, containing all the remaining tabs that do not fit on the screen. By default, the overflow menu appears on the far right (see image “Responsiveness – Overflow on the far right”).
Another option is to display an overflow menu on both sides of the icon tab bar. The use of this overflow behavior depends on whether the order of the tabs is fixed or can be rearranged:
- For [processes with a fixed order](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/#tabs-as-process-steps) or in [the anchor bar of an object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#anchor-bar-navigation), display an overflow menu on both sides (property: `TabsOverflowMode`, value: `StartAndEnd`).
- For tabs that can be rearranged, display only one overflow menu on the far right (property: `TabsOverflowMode`, value: `End`).
## Layout

The horizontal layout of the icon tab bar never changes. The tabs always appear side by side. However, there are several types of tab bar to choose from. These are described in detail below.

## Types

You can use the icon tab bar control to build the following types of tab bars:

- Text only
- Icon tabs
- Tabs as filters
- Tabs as process steps

### Text Only

The text-only variant is one of the most common types. It allows longer labels,
and can also display counters next to the text to indicate the number of items on
the tab page.
Unlike all other tab variants, the labels **do not get truncated**. The full text
is always shown. As a result, you need to ensure that your labels do not become
too long. They should still be easy to read on smaller screens.
If you use text-only tabs, make sure that the `UpperCase` **property is disabled** and that you enter the labels in title case (for example: _Approval Flow_).
#### Counters and Text Tabs

If counters are used, set the property `HeaderMode` to   | Do
“Inline” so the counters appear in brackets after the
labels.
**Do not** use the old layout that shows the counters on
top of the labels (`Headermode` = “Standard”).

Don't

### Icon Tabs

Icon tabs are also common tab types. These round tabs can be populated with any icon from the [SAP icon font](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/resources/libraries/downloads#sap-icon-font).
Labels are optional. If you decide to use labels, use them for all tabs. You can use counters as needed.

**Please note that starting with SAPUI5 version 1.40, you
should only use the horizontal type of label (icon and
label side by side).**
If your labels get truncated, consider using shorter
labels or text tabs (without icons), since text tabs
cannot get truncated.

### Tabs as Filters

If you build the tab bar as a filter, it can comprise two
parts:

- **An “all” tab on the left** (optional)
This tab shows the total number of items, and describes
the type of item (for example, _189 Products_).
- **Tabs for specific filters**
Use the tab text to indicate the filter attribute.
We strongly recommend showing a counter on every tab.
### Tabs as Process Steps

You can also use the tab bar to depict a process. In this case, each tab stands for one step.
To connect the process steps, you can use the triple-chevron icon (:process: ) from the \[SAP icon font](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/resources/libraries/downloads#sap-icon-font)\ (technical name: process). Do not use the triple-chevron icon in the anchor bar of an object page.
If the process steps have a fixed order, set the property `TabsOverflowMode` to “StartAndEnd” to show an overflow menu on both sides and to keep the order of the tabs intact.
> **Hint:** When using icons with labels, add a comment in the properties file to make editors and translators aware that space
is limited.
Example: _Label for icon tab on detail screen. Max 14-16 characters (depending on character width)._
Test whether your labels and their translations are displayed in full, and do not get truncated.

### Hierarchies

The tab bar supports hierarchies, allowing multiple tabs underneath one main tab. This way, you can group several tabs together, with the main tab acting as a headline.

#### Subtabs
The example on the right shows the main tab _Notes_ with two subtabs, _Internal_ and _External_, with no specific hierarchy except for their order.

#### Nested Tabs
Nesting allows deeper hierarchies with indentations to
indicate the level of each tab.
By default, the property `maxNestingLevel` is “0” (zero).
To enable nesting, adjust this value to the highest level
of nesting that your app allows.
## Behavior and Interaction

### Clicking a Tab

To navigate through the views, the user clicks the tabs.

**Optional behavior:** If the user clicks a tab that is already open, the container collapses. It opens again when the user clicks any tab.

Use the `expandable` property to specify whether users can collapse the tab container (default = “true”):

- Let users collapse the container if there is additional content below the container, and the information inside the container is not always needed.
- If there is no content below the tab container, set the `expandable` property to “false”.

The `expandable` property controls the initial state of the container. Do not change the default state (“true”).

### Changing the Order of Tabs

You can allow users to rearrange the tab order in a desktop environment (property: `enableTabReordering`). If this feature is enabled, users can drag and drop tabs to reorder them, either directly on the tab bar or inside the overflow menu.

It is also possible to drag and drop tabs from the tab bar to the overflow menu and vice versa.

If nesting is enabled (property `maxNestingLevel > 0`),
users can choose the level at which they want to drop a
tab.                                                    | _Interaction - Tab nesting using drag and drop (1 of 2)_           | _Interaction - Tab nesting using drag and drop (2 of 2)_
Dragging a tab activates a visual indicator for
positioning the tab. For example, dragging tab 8 on top
of tab 5 makes tab 8 the child of the now highlighted
tab 5 (see image 1).
If the user drags a tab between two other tabs, the
indicator shows the level at which level the tab will
be nested (see image 2).
> **Guideline:** **Do not use** this feature for:
- **Tabs as process steps:** This ensures that consecutive steps do not get mixed up.
- **Anchor bar navigation:** Sections that are represented in the anchor bar have a fixed order.

## Styles

### Tab Density

The default responsive design of the icon tab bar applies
to both compact and cozy modes. However, in addition to
this responsive behavior, the control can be forced into
a compact mode, or even react dynamically to the
application’s global density setting. This feature can be
used to:
- Save vertical space on the page (applies to both text
and icon tabs)
- Save horizontal space (icon tabs only; this is
especially helpful when there are many tabs)
- Generally use less space on mobile devices
- Reduce noise when there are already more important
visual elements on the screen (primarily icon tabs)
The property for the override is called `tabDensityMode`,
which can be set to “Cozy”, “Compact”, or “Inherit”.
“Cozy” is the default setting that renders the control in
its regular dimensions. “Compact” reduces the control’s
height and icon sizes (if applicable), even if there
would be enough space for the cozy design. “Inherit”
instructs the control to follow the global density mode
defined for the application. For backward compatibility,
the default setting is “Cozy”.
The following image shows some types of tabs with their
default style (cozy, left) and the reduced density mode
(compact, right).
### Colors

The two different styles (round tabs and text only) are discussed in the _Types_ section. In both cases, you can use semantic colors to give users additional orientation.

Only use semantic colors if it is important for users to know that they need to take action (for example, to indicate errors or critical situations requiring action). Otherwise, use the neutral default colors. For more information, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

> **Hint:** To apply semantic colors to the icons and the text-only tabs, you can use the property [`sap.ui.core.IconColor`](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.IconTabFilter/controlProperties).

#### Example

In the example below, one step in the process is indicating an error. Since the other tabs have neutral colors, it is clear that they do not contain errors. Coloring them green to show that they are OK is unnecessary, and would reduce the severity of the red tab.

## Badge
A tab can have an attention badge to indicate that new
items were added to that tab. Only display a badge if new
items are triggered from outside the app. Do not display
a badge when users add new items themselves.
### Badge in Default or Value State

Default (col-1)

You can add a badge to all [types](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/?post_type=subpost\&p=212030\&preview=true#types) of icon tab bar.
The badge inherits the state of its tab (default state or value state):
- For the default tab state, the default red badge is displayed.
- If the tab has a semantic state, the badge inherits the semantic color for the current state.
Don’t mix tabs in the default state with tabs that have a semantic state.

Default (col-2)

#### Badge for the default state / value state

**Carousel (full-width, col-2)**

Section Metadata

style

### Badge Interaction

The badge becomes part of the tab. When the user selects
a tab with a badge, the badge disappears. If a new item
is added to the tab that is currently open, no badge is
shown.
In addition, the badge inherits the interaction of its
tab. For example, if a tab is moved using drag and drop,
the attention badge moves with it.
#### Overflow Menu
If there isn’t enough space to show all the tabs on the
main bar, an overflow menu appears on the right by
default, containing all the remaining tabs. Depending on
the use case, an overflow menu can also appear on both
sides (for example, for process steps or anchor bar
navigation).
A badge on the chevron icon :slim-arrow-down: indicates
that a tab within the overflow menu has received new
items. The tab in question is indicated by a second badge
on the item in the overflow menu.
## Guidelines

#### Apply the styles as follows:

- **Icons only**: Use this option if you have only 4-5 tabs that can be very clearly identified by their icon. If a short description is needed, use icons and labels.
- **Text only:** Use this option if you have more than 4-5 tabs, or if there are no clear icons to represent the content. The text-only style also allows for longer labels. Set the property `HeaderMode` to “Inline”.

Do

#### If you use icon tabs, ensure the following:

- The icons clearly identify the content on the tab pages.
- Each tab has a unique icon. Do not use the same icon more than once.
- The icons are easily distinguishable.
- Any icons between tabs (for example, as separators or connectors) are visually very different from the icons on the tabs.
- Either all or none of the icons have labels.

#### Implement the focus as follows:

- By default, show the first tab as open. This is the initial setting provided by the control.
  **Note:** Technically, you can also override the initial selection. However, this is not recommended.
- Later on, you can show the tab last selected by the user.

#### Additional guidelines:

- Do not display a loading indicator above the tab while the number for the item count is loading.
- Handle empty tabs as follows:
  - **Hide** tabs that do not contain any information, and do not allow the user to create content..
  - **Show** empty tabs that allow users to create content, such as notes or attachments.
- Only use the tab bars to navigate between tabs. Do not use any other navigation links. For example, do not let users click an item in tab A that takes them to tab B. This type of cross-navigation inside a container is confusing, and cannot be handled by the back navigation.

---

## infobar

The infobar is a type of [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) that appears above a list or panel, and shows filter or selection settings:

- **Filter criteria**: The infobar indicates the filter criteria that have been applied for a filter, for example on a table or list. Do not show the infobar if no filter is applied.
- **Selected items:** In a [multi-select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) dialog, the infobar shows the number of selected items.

## Responsiveness

The bar has the same height, text size, and icon size in both cozy and compact formats. The text inside the bar is truncated if there’s not enough space.

## Types

The infobar is shown in the following situations:

- After a general filter has been applied
- After the user has selected multiple items in a select dialog

### General Filter

All applied filters are shown as labels in the infobar.

### Multiple Selection

If the user selects multiple items, the infobar shows the number of selected items. For more information, see [select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/).

## Components

The infobar is a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) that consists of a label on the left side and an icon on the right side.

The label shows the filter criteria, and the icon selected depends on the use case.

### General Filter and Multiple Selection

No icon is shown. The only exception is the _Cancel_ icon, which is used to reset the current filter criteria. For more information, see the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#filter).

## Behavior and Interaction

The bar can have two active areas: either the entire bar can be active, or if an icon is added, it creates a second active area. We recommend that you use the active behavior for the bar and the icon.

### Bar Area

When the user clicks the bar, the filter dialog from the [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/) is shown. If only one filter is applied, the filter can be changed directly in the detailed filter selection. If more than one filter is applied, the filter dialog shows a list with general filter categories.

### Icon Area

_Cancel_: The user clicks the icon to delete the current filter settings. We recommend using the cancel icon.

### States
The infobar has two states – active and non-active
(non-clickable). If set to non-active, the whole bar
turns gray and the user cannot interact with it.

## Properties

The infobar is not a separate control. If you want to build an infobar, you need to use the [sap.m.Toolbar](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/test-resources/testsuite/testframe.html#/sapui5-sdk-dist/test-resources/sap/m/Toolbar.html) control.

To achieve the infobar design, set the `design` property of the toolbar to “info”.

---

## interactive-bar-chart

The interactive bar chart is a type of [interactive chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/) used for visual-based filtering in the visual filter bar (VFB) within the [analytical list page (ALP)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/).

It allows the user to filter by categorical data. Depending on how the data is sorted, this would be the biggest or the smallest filter values by measure.

## Usage

### Use the interactive bar chart if:

- You want to give the user the possibility to visually filter data in the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/).
- You want the user to gain insights before filtering large datasets with the visual filter bar.

### Do not use the interactive bar chart if:

- You want to visualize data without using it for filtering.
- You are not using the visual filter bar.
- You want to visualize data for more complex scenarios. In this case, use the [VizFrame chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) instead.

## Responsiveness

The interactive chart is fully responsive and supports both [cozy and compact content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Layout

The interactive bar chart consists of two mandatory areas – a filter label and an area containing the measure and visualization of the chart. The control itself does not contain an axis title.

### Filter Labels

The filter labels are left-aligned and may be truncated if not enough space is available.

### Measure and Visualization

The interactive bar chart can display percentage and actual values as a measure but never a mix of both at the same time. Always display measures using one decimal point. Measures should always be visible and never truncated.

The interactive bar chart does not support coloring, and the default color of the bars should not be customized.

Do

### Values
The interactive bar chart can display positive, negative,
and mixed (positive and negative) measure values.
### Semantic Colors
The interactive bar chart supports semantic colors that
are shown as color markers. Since interactive charts are
used to filter content visually, these markers give users
even greater clarity when evaluating the information.
Use semantic colors when you want to make users aware of
critical thresholds or categories.
## Behavior and Interaction

Selecting and deselecting a bar is toggle-like behavior – if the user clicks a selected bar, it becomes deselected, and vice versa. By default, the interactive bar chart supports multiple selections – the user can select more than one filter value.

## Guidelines

Use the interactive bar chart in the visual filter bar if you would like to have a filter for the highest or lowest values of a filter dimension. For example, to filter for the highest or lowest margin, revenue, or cost related to a project.

The interactive bar chart used in the visual filter bar contains a maximum of three filter values with their corresponding measures.

In general:

- Display the measure labels with one decimal point.
- Do not display an axis title.
- Do not display any scrollbars.

---

## message-popover

The message popover control can display multiple messages
of different types in one list. For example, it might show
several messages related to entries in a form, or messages
triggered by a finalizing action, such as _Save_.
The message popover is used in conjunction with a
technical message manager, which populates the message
list. If an error occurs at a validation point, the
corresponding message is added to the message popover
automatically, without interrupting the user.
Users can browse messages by type and navigate to the
message details. In some cases, they can also jump
directly from the message to the affected field on the UI.
## When to Use

### Use the message popover if:

- You want to display multiple messages to the user.
- You do not want to interrupt users while they are performing an action.
- Form fields are hidden when scrolling and issues may not be visible otherwise.

### Do not use the message popover if:

- You need to interrupt the user. In this case, use a [message box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/).
  (Typically, interrupting the user is only necessary for technical problems, such as network errors and connection issues.)
- You are using a small dialog. Showing a message popover would obscure important information, such as form fields that are in focus. In this case, rely on highlighting and inline messages to show issues with content fields. For more information, see [Form Field Validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/#value-state-and-value-state-message).

## Components

1. Filter bar
2. Section/subsection on the UI
3. Short description
4. Subtitle
5. Message button
6. Navigation to message details
7. Counter for aggregated messages
### Filter Bar

Initially, the filter bar shows all the different message types in the list (1).

Segmented buttons at the top of the message popover allow the user to filter the messages by type (error, warning, success, and information).

### List (1)

#### Short Description (2)

A simple and helpful short message text. It’s the same message as the one attached to the UI control where the issue occurred.

#### Subtitle (3)

You can use the subtitle to give your message an identifier. If the message relates to a specific field, show the label of the field where the error occurred. Based on the subtitle, the user should be able to identify the corresponding UI control on the UI (for example, the input field in a form).

When issues are in a table, the subtitle area can contain the identifiers of the row and column containing the issue (see [Messaging for Tables](#messaging-for-tables)).

#### Section/Subsection (4)

Messages in the list are grouped by the section and subsection on
the UI. This helps the user to find the part of the UI that
triggered the message.
Usually, the grouping reflects the hierarchy of the page.
However, some messages relate to issues that do not belong to a
particular field on a page, but result from an action. In this
case, the group title is as follows:
- **Last Action: \<Action Label>** (Example: _Last Action: Save_)
- **Last Action** (fallback solution)
When issues are in a table, the group header can contain the
table name, along with title of the page section (see [Messaging for Tables](#messaging-for-tables)).
#### Navigation to Message Details (6)

If message details are provided, the message popover automatically provides a chevron on the right-hand side for navigating to the [message details](#message-details) page.

If the popover contains only one message that also has message details, the message details page is displayed by default (see [Behavior and Interaction](#behavior-and-interaction)).

#### Aggregated Messages (7)

If you want to aggregate messages, you can use the counter property of each list item.

- The message popover only provides the counter property. The aggregation itself must be implemented by the app team.
- When 2 or more messages are aggregated, the message short text cannot be a link because there would be multiple targets.

### Message Button

If there are messages to display, the message button indicates the most critical message status in the list (5).

For example, if the list contains error messages, the message button inherits the error icon and semantic color. If the most critical message in the list is a warning, the message button shows the warning icon and corresponding semantic color, and so on.

In addition, the button contains a count indicating the number of messages of the most critical type.

If there are no messages to display, there is no message button. In this case, the footer toolbar contains only the “normal” actions for the task.

### Message Details

The message details page shows:
1. The message short text.
2. A more detailed message text to explain the issue and
propose a solution.
3. An optional link to more information, such as app
documentation.
### Messaging for Tables

The message popover includes information for locating
issues in tables.
1. The **group header** contains the section name and table
name. If the issue appears in a specific view, the group
header also contains the view name.
2. The **subtitle** shows the identifiers of the row and
column containing the issue.
- If the row or column is currently hidden (for example,
by table personalization), a “Hidden” text is shown.
- If the field doesn’t show in the table itself but is
part of a sub-object, only the row identifier is displayed
(3).
## Behavior and Interaction

### When Does the Message Popover Open?

#### Form Field Validation

If one or more errors occur when the user fills out a form, the message button appears, indicating the message type of the most critical message. The message popover **does not open automatically**. For more information on the different validation points, see [Form Field Validation](https://www.sap.com/design-system/fiori-design-web/ui-elements/form-field-validation/).

#### Finalizing Actions

If the user activates a finalizing action (such as _Create, Save,_ or _Submit_), the message popover **opens automatically** to inform the user about the errors on the UI that need to be resolved first.

If the popover contains only one message that also has message details, the message details page is displayed by default.

### Navigation to Message Details

If the message provides a long text from the back-end system, the user can navigate to the message details. There, the user will typically find more information and help.

### Navigation to the Relevant Field

#### In-Page Navigation

The navigation link takes users directly to the field on the UI that triggered the message. The message popover stays displayed and the page scrolls to the field, as required. The field can be in the visible area or somewhere else on the same page.

> **Guideline:** Always add a navigation link, where possible.

> **Hint:** Set the navigation link with the `activeTitlePress` event. This allows users to click the message text in both the first and second page of the message popover.

#### Navigation to a Subobject or an External Application

Some errors are not visible on the page where the message popover is. They can be located on a subobject page (an item in a table, for instance).

In that case, the navigation link leads to the target page with focus on the affected field.

If possible, provide a [breadcrumb](https://www.sap.com/design-system/fiori-design-web/ui-elements/breadcrumb/) navigation on the target page. Also, make sure that the back button of the [shell bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/shell-bar/) returns to the page where the message popover was.

## Responsiveness

On smartphones, the message popover is automatically
shown in full screen mode.
## Top Tips

- Whenever possible, provide a navigation link from the message to the relevant field on the UI.
- Use the message subtitle to indicate the field label.
- In forms, also highlight the individual fields, and change their value state according to the type of message. For more information, see [Form Field Validation](https://www.sap.com/design-system/fiori-design-web/ui-elements/form-field-validation/).

---

## p13n-dialog-popup

The P13n dialog control tabs allow users to personalize table and smart chart attributes.

**Table Personalization Tabs**

- **[Columns](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/p13n-dialog-popup/#columns)**: Visibility and order of columns
- **[Sort](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/p13n-dialog-popup/#sort)**: Sort criteria for table items
- **[Filter](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/p13n-dialog-popup/#filter)**: Filter criteria for table items
- **[Group](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/p13n-dialog-popup/#group)**: Grouping table items by specific attributes

The tabs can be shown in any combination, as required by the use case.

The P13n dialog is intended for complex [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) that have a large number of columns and require complex queries for sorting, grouping, and filtering.
For simple tables, see the [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/) and [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/).

**[Smart Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-chart/) Personalization Tabs**

In addition to the _Sort_ and _Filter_ tabs, the P13n dialog for smart charts can include the _[Chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/p13n-dialog-popup/#chart)_ tab to allow users to set the visibility of chart dimensions and measures.

The P13n dialog is opened using the corresponding buttons on the right-hand side of the table or chart toolbar, as shown below.

#### Dialog buttons within the toolbar

Carousel (full-width)

## Usage

### Use the P13n dialog if:

- Users can personalize more than \~20 columns.
- You need multiple personalization functions (columns, sorting, filtering, grouping, …)
- You are using the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/).
- Complex queries have to be built for the table.

### Do not use the P13n dialog if:

- Users can personalize fewer than \~20 columns.
- You only need a simple feature to show/hide columns.

## Responsiveness

The P13n dialog is available for all display sizes. For sizes L/XL (desktop) and M (tablet), it shows as a centered dialog. For size S (smartphones), it displays as a full screen dialog.

_Size S – Columns_          | _Size M_          | _Size L_

## Components

The P13n dialog can include the following tabs, separately or combined, as required by the use case:

- Sort
- Filter
- Columns (available only for tables)
- Group (available only for tables)
- Chart (available only for the Smart Chart)

App developers can add more tabs manually.

## Behavior and Interaction

### Sort

Default (col-1)

On the _Sort_ tab, the user can specify the sort criteria and sort order (ascending or descending).
Each entry has two input fields:
- One for choosing the sort column in a table or the sort dimension or measure in a smart chart
- The second for choosing the sort order.
Users can enter multiple sort criteria. Once a sort criterion is entered, a new line appears for entering another
one.
The order of the sort criteria reflects the order in which they are applied to the table or smart chart.

> **Information:** - The new P13n panels from the SmartTable (_Columns_, _Sort_, _Group_) are now available for freestyle application development.
- Using the sort feature for column headers replaces ALL sort options in the dialog!

Default (col-2)

Section Metadata

style

### Filter

Default (col-1)

The Filter tab allows users to filter the table or chart information according to specific criteria.
Once a filter criterion is entered, a new line appears for entering another one. Users can remove filters by clicking the :decline: (Remove Filter) icon at the end of each filter
item.
Filter Criterion
In the first input field, the user selects the column (for tables) or the dimension/measure (for charts) to be filtered. Any column or dimension/measure can be selected, including
columns and dimensions/measures that are not currently visible.
Define Conditions
The second field is an input field which calls a [Value Help Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) when the user clicks the selection icon (value help icon) in the input field.
The first input field in the value help dialog contains the operator that is applied to the filter value (such as greater than or not before).
To include or exclude filter criteria, the user selects the relevant operator from the Include or Exclude section of the dropdown list. For example, equal to to include a value, or
not equal to to exclude it.
If individual filter criteria have Boolean values, the operator is always “equal to” and the operator dropdown is disabled.
#### P13n Filter Settings

Carousel (full-width, col-2)

Section Metadata

style

Available operators:

_String (Text)_         | _Number_                | _Date_         | _Boolean (true/false)_
- between               | - between               | - between      | - equal to
- contains              | - equal to              | - equal to
- equal to              | - greater than          | - after
- begins with           | - greater than or equal | - on or after
- ends with             |   to                    | - before
- greater than          | - less than             | - before or on
- greater than or equal | - less than or equal to |
to                    |                         |
- less than             |                         |
- less than or equal to |                         |
#### Value

The second field in the value help dialog contains the value by which the selected column is filtered. The kind of input field that is provided depends on the data type of the selected column and the selected operator. For example, the value field for fixed or Boolean values could be a dropdown list, an input field with suggestions, or a date picker. You can also offer two or even more fields if the use case requires it.

The above mentioned guidance for filtering is applied to both the table and chart personalization.

> **Information:** If there is a filter bar, use the filter bar functionality and deactivate the filter feature of the P13n dialog.

### Columns

The _Columns_ tab allows users to change the visible
table columns and the order in which they are displayed.

The available columns are shown as list items with
checkboxes. The checkboxes for the columns that are
currently being displayed are selected.
The _Show Selected / Show All_ button toggles the display
between all columns and only those that are currently
selected.
#### Show/Hide
To show or hide a column, users select or deselect the
column checkbox.
#### Reorder
To change the order of the columns, users focus on a list
item and use the buttons on the right-hand side of the
table toolbar to move it up or down. The order of the
columns from top to bottom corresponds to the order on
the table from left to right.
#### Search
The search field in the table toolbar enables users to
find a specific column more quickly. Matching columns are
displayed as soon as the user starts to type.
> **Information:** The new P13n panels from the SmartTable (_Columns_, _Sort_, _Group_) are now available for freestyle application development.

### Group

The _Group_ tab allows users to group the table data.
In the select control, they can select a grouping criterion from a list of all available columns.
For [analytical tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/),
users can define more complex grouping scenarios. Once a grouping criterion is entered, a new line appears for entering another one. In
addition, the _Show Field As Column_ checkbox allows users to decide whether or not to display the corresponding column.
The grouped table shows the individual values for the selected field as the group headers. Expanding the group shows all the corresponding
table items.
If you have defined multiple groups, the grouped table shows the individual values for the first selected field. Expanding the groups shows
the subgroups and items in an expandable hierarchy.
> **Information:** The new P13n panels from the SmartTable (_Columns_, _Sort_, _Group_) are now available for freestyle application development.

> **Warning:** Only columns marked as visible on the _Columns_ tab can be used for grouping!

### Chart

Columns
The _Chart_ tab allows users to set the visibility of chart dimensions and measures and to change the order in
which they are displayed.

Users can add dimensions and measures with the select control or remove them by clicking the :decline: (_Remove dimension/measure_) icon at the end of each chart item.
They can enter multiple dimensions and measures. Once a dimension or measure is entered, a new line appears for
entering another one.
The order of the entered dimensions and measures reflects the order in which they are applied to the chart.
#### Dimensions
Each entry has two select controls: one for choosing the dimension, and one for choosing the layout option. The
dialog is adapted to the currently selected chart type and shows layout options that work on the selected chart
type.
#### Measures
In the select control, the user can select a needed measure from a list of all available measures.
#### Reorder
To change the order of the dimensions and measures, users focus on the list item and use the buttons on the
right-hand side of the table toolbar to move it up or down or by dragging the dimension/measure to the desired
location.
> **Warning:** Users can select or change a chart type via the Smart Charts toolbar!

---

## panel

Default (col-1)

The panel is a container for grouping and displaying information. It can be collapsed to save space on the screen.

Carousel (full-width, col-2)

Section Metadata

style

## Usage

### Use the panel if:

- You need to group or display information.
- You want to give users the option of hiding this information.
- You want to show additional information on demand (for example, a panel could show optional [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) for an advanced search).

### Do not use the panel if:

- You are designing an object page. Never use panels in the object page content area.

## Responsiveness

If the width of the panel is set to 100% (default), the panel and its children are resized responsively, depending on its parent container.

## Layout

- The panel control is a container for controls.
- The panel can have a solid or semi-transparent background.
- The panel always includes a header.
- An [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/) can be added to the panel to show extra information.

### Examples

## Types

There are two types of panels: fixed and expandable.

### Fixed Panel

Fixed panels are useful for grouping custom content. They include headers and [infobars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/).

### Expandable Panel

Expandable panels are much like fixed panels, except
their content can be expanded and collapsed by clicking
on the title bar.

## Components

A panel consists of a title bar with a header text or header toolbar, an [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/) (optional), and a content area.
The title inside the title bar can be added by using the “headerText” property. If you use the “headerToolbar” aggregation, the “headerText” property is ignored. With the “headerToolbar” aggregation, you can add a toolbar with any toolbar
content inside the title bar. For example, if you need a title text on the left and some action [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the right, add a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) to the toolbar’s content aggregation, toolbar spacer, and then your buttons.
## Behavior and Interaction

Default (col-1)

### Expand/Collapse
- When the panel is expandable, an arrow icon (pointing to the right) appears in front of the header.
- Click anywhere on the title bar to expand and collapse the content area.
- When the animation is activated, expand/collapse uses a smooth animation to open or close the content area.
- When the panel expands, the arrow icon rotates 90 degrees clockwise.
- When the panel collapses, the arrow icon rotates 90 degrees counterclockwise.
- The [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) in the header can be clicked separately.

#### Example

Carousel (full-width, col-2)

Section Metadata

style

### Overflow Scrolling (Content Area)

- By setting the height to use the default property “auto”, the height of the content area will automatically be adjusted to match the height of its content.
- When the height of the panel is set to a fixed size, the content area can be scrolled through.

#### Panel With Scrolling

## Guidelines

- Nesting two or more panels is not recommended.
- Do not stack too many panels on one page.

## Exceptions

If you add a header [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) (sap.m.Toolbar) via aggregations, it will overwrite the “headerText” property.

---

## panel-web-component

The panel is a responsive container for grouping and displaying information. You can use it to structure content on a page. To save space, you can make the content area collapsible.

## When to Use

Do
Use the panel:
- To group information.
- To give users the option of hiding this information.
- To show additional information on demand.
## Anatomy

1. **Header area**: By default, the header is clickable and can be used to toggle between the expanded and collapsed state.
1. **Icon**: Used to expand and collapse the content area. The icon rotates when the panel is expanded (arrow points down) or collapsed (arrow points right).
Note: If the panel is [fixed](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/panel-web-component/#fixed-panel), no icon is shown.
2. **Title**: Title bar with a header text or custom header.
3. **Custom header (optional)**: Title, buttons or any other HTML elements.
2. **Content area**: The content area can contain any component or set of components.
## Types

### Standard Panel

By default, the panel is expandable.
Clicking **anywhere on the title bar** expands or collapses the content area.
### Panel with Custom Header

Use this variant if you want to add actions to the panel
header.
If a panel has a custom header, the **arrow icon must be used**
to expand and collapse the panel. Clicking on other parts of
the header has no effect on the expand/collapse behavior.
### Fixed Panel

Use this variant if you want the content to be visible at
all times.
## Behavior and Interaction

See the variants for the [standard panel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/panel-web-component/#standard-panel) and [panel with custom header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/panel-web-component/#panel-with-custom-header).

## Responsive Behavior

If the width of the panel is set to 100% (default), the panel and its contents are resized responsively, depending on its parent container.

If the panel has a fixed height, it will take up the designated space even if the panel is collapsed.

### Truncation

When the space for the header title
is not enough, the title truncates.
The content wraps.
---

## popover

The popover displays additional information for an object in a compact way and without leaving the page. The popover can contain various UI elements such as fields, tables, images, and charts. It can also include actions in the footer.

**Note:** The [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/) is similar to a popover, but has a predefined structure, a fixed set of UI elements, and automatic UI rendering. Check first whether the quick view is appropriate for your use case.

## Usage

### Use a popover if:

- You need to define your own structure.
- You want to show UI elements that are not available with the [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/).

### Do not use a popover if:

- The [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/) is more appropriate for your use case.
- The objects are in the list in a list-detail layout (in this case, the details are shown in the details area).

## Responsiveness

The popover can be used in the following ways:

- **Responsive and adaptive**: sap.m.ResponsivePopover
  Shows a dialog on smartphones (to be closed with an _X_) and a popover on a tablet or desktop.
- **Non-responsive**: sap.m.Popover
  Always shows a popover. Only use a non-responsive popover if it has very little content. On smartphones, the popover should not use more than a third of the phone’s real estate.

## Layout

### Structure of Popover
The header and footer are generally optional. The other elements are as follows:
**Back** (1) – optional
Needs to be implemented if the user can trigger further popovers. Always show popovers in place. Never place them on top of
each other.
**Title** (2)
We recommend that you show an app-specific title for accessibility reasons. If you do not show a title, use the invisible text
control (sap.ui.core.InvisibleText) to set a text for screen reader support.
**Close function** (3)
This feature closes the dialog. It is available for smartphones only and is set automatically (sap.m.ResponsivePopover).
**Content** (4)
Ensure that the content has a basic design and shows only the most important information. We recommend the following:
- Use no more than two groups.
- Limit the total number of fields to eight.
- Use single-column tables.
- Use [micro charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/micro-chart/).
**Actions** (5) – optional
### Placement Types
The placement type defines how the popover will be
positioned on the screen in relation to its trigger. The
default placement is “Right”: the popover appears to the
right of the object it relates to.
If you set the placement type to “Auto”, the position of
the popover in relation to the reference control is
determined automatically, depending on the available
space.
> **Hint:** More information on the different placement types can be found [here](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.PlacementType).

### Modal Mode
The popover in modal mode opens in a modal window, which
blocks the whole screen and attracts the user’s
attention.
Use the modal mode only if you want to prompt the user to
make a decision or confirm an action. Ensure that the
user can close the popover, either by offering an action
button in the footer or a _Close_ button in the header.
## Behavior and Interaction

### Opening a Popover

The user opens a popover by clicking an object represented by a text link or an icon. To improve accessibility, we recommend using texts, such as the name or ID of an object.

### Closing a Popover

The popover is closed when the user clicks outside the popover or selects an action within the popover.

## Guidelines

- Show status information as text fields in a content group. You can use semantic text colors.
- You can define a height for the popover. If the content exceeds the height, a scrollbar is displayed.

---

## popover-web-component

A popover is a small overlay window that appears on top
of the existing content. It is used to provide additional
information and options without requiring the user to
navigate away from the current page or interrupt their
workflow.
## When to Use

Do
Use a popover:
- If you need to define your own structure.
- If you have very little content.
- If a user action or confirmation is required before processing can continue. In this case, use a dialog.

## Anatomy

1. **Title (optional)**: Including a title also improves
accessibility for screen reader users.
2. **Content area**: Can contain any component. Ensure
that the content has a basic design and shows only the
most important information.
3. **Arrow (optional)**: By default, the popover has an
arrow that connects it visually to the triggering
component. You can opt to hide the arrow.
4. **Footer (optional)**: Contains one or more actions.
## Behavior and Interaction

### Opening and Closing a Popover

The popover opens when the user clicks on a triggering
text link or button. The popover appears next to the
trigger component, but doesn’t obscure it.
The popover closes when the user clicks outside the
popover or selects an action within the popover.
### Placement Types

You can define how the popover is positioned in relation
Available options:
- Left
- Right (default)
- Top
- Bottom
The position and direction of the arrow adapt to the
placement type.
## Responsive Behavior

The popover component always shows a popover, regardless of the form factor. Only use a non-responsive popover if it has very little content. On smartphones, the popover should not use more than a third of the phone’s real estate. If you need to include more content, use a [responsive popover](https://main--builder-prospect--sapudex.hlx.page/internal/sap-design-system-academy/responsive-popover/).

---

## responsive-popover-web-component

The responsive popover displays as a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover-web-component/) on desktop and tablet devices but as a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog-web-component/) on phones.
## When to Use

Do
Use the responsive popover:
- To define your own structure.
- To show a dialog on phones.
## Anatomy

### Popover (Desktop, Tablet)

1. **Title (optional)**: Including a title also improves
accessibility for screen reader users.
2. **Content area**: Can contain any component. Ensure that
the content has a basic design and shows only the most
important information.
3. **Arrow (optional, desktop/tablet only)**: By default,
the popover has an arrow that connects it visually to the
triggering component. You can opt to hide the arrow.
4. **Footer (optional)**: Contains one or more actions.
## Behavior and Interaction

See [Popover – Behavior and Interaction](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover-web-component/#behavior-and-interaction).

## Responsive Behavior

On a phone, the responsive popover displays as a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog-web-component/).

---

## shell-bar

> **Information:** This component is relevant for the [UX Consistency Product Standard UXC-016 – Shell Bar](https://wiki.one.int.sap/wiki/display/uxc/UXC-016).

## Intro

The shell bar is a universal header at the top of all screens. It offers both global functions (like search, notifications, and user profile) and elements that are specific to the product context.

## Anatomy

1. **Side navigation**: Allows users to open or close, as well as expand or collapse, the side navigation menu.
2. **Back**: Enables users to return to the previous page or state within the application.
3. **Branding element (mandatory)**: The branding element consists of two parts:
   a. **SAP logo**: Indicates that the product is part of the SAP product family.
   b. **Product identifier**: Unique name that helps the user understand the specific context within the SAP portfolio.
   When selecting the branding element, the user navigates to the product home page. The home page is the primary or initial page users encounter when accessing the product.
4. **Additional context area**: Contains specific elements applicable to the entire product. Elements can be positioned within two containers: one aligned to the left and the other to the right. You can prioritize these elements to ensure that higher-priority elements remain visible longer than lower-priority elements as the available space decreases.
5. **Search**: A search input field or button that expands the search bar, enabling users to search within the product or across multiple products. We recommend expanding the search field by default.

6. **Joule:** Launches SAP’s AI assistant, Joule.
7. **Notifications**: Displays [notifications](https://www.sap.com/design-system/fiori-design-web/ui-elements/notification-center/).
8. **Additional actions**: A section for further actions that are defined by the product.
9. **Help:** Provides access to integrated help functionality.
10. **Profile (mandatory)**: Provides access to the [user menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/user-menu/).

11. **Product switch**: Offers access to other products.

### Back Button

**Avoid using a _Back_ button in the shell bar**; use the browser's _Back_ button instead. Only use the shell bar _Back_ button if you can’t rely on the browser _Back_ button due to technical limitations.

Only show the shell bar _Back_ button if back navigation within the product is possible. Hide the _Back_ button if there is no back history (for example, upon initial launch or when deep linking).

### Additional Actions

Only add actions to the shell bar if users need to access them **frequently**. Do not replicate shell bar actions in other areas of the product, such as the [user menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/user-menu/) or side navigation.

> **Information, Internal_Only:** The position of certain shell bar actions, like _Joule_, _Notifications_, or assistive tools, are defined within the [UX Consistency Product Standard UXC-016 – Shell](https://wiki.one.int.sap/wiki/pages/viewpage.action?pageId=4937472696).

## Responsiveness

The shell bar is designed to be fully responsive. When space is constrained, the shell bar elements are collapsed or hidden in the following order:

1. The **search field** collapses first to ensure that all other content remains visible.
2. Subsequently, any **additional shell actions** move into an overflow menu. The user menu and product switch icons remain in place
3. Next, **additional context elements** are hidden in order of priority. The lowest-priority element is hidden first, the highest-priority element last.
4. The **product identifier** part of the branding element is hidden.
5. If there is not enough space to show both the highest-priority context element and the search icon, the **search** function also moves into the overflow menu.

### Example

The example below shows how elements are collapsed or hidden as the screen width is reduced:

- **Size XL/XXL**: All elements are visible and the search field is expanded.
- **Size L**: The search field is collapsed, all other elements are still visible.
- **Size M**: The additional shell actions have moved to the overflow menu. In addition, 2 of 4 elements in the additional context area are now hidden (lowest priority elements).
- **Size S**: The product identifier in the branding element is now hidden.
- **Size XS**: Only the top-priority element in the context area remains. The search has moved into the overflow menu.

### Badge Overflow

#### One badge

If a **single action** with a badge moves into the overflow menu, the counter is also shown on the overflow button.

#### More than one badge

If a **multiple actions** with a badge move into the overflow menu, only the attention indicator is shown on overflow button.

Badge overflow – multiple actions

## Additional Context Examples

### Trial System

A trial system is a temporary setup that allows users to test and evaluate a product or service before making a commitment to purchase or implement it. It provides a hands-on experience, enabling users to explore features, assess performance, and determine if it meets their needs.

To indicate a trial system, use the [tag web component](https://sap.github.io/ui5-webcomponents/nightly/components/Tag/) with color scheme 7 from set 2. In addition, you can also show the remaining days.

Trial system

### Multiple Productive Systems

To differentiate between multiple productive systems for the same product, use the [tag web component](https://sap.github.io/ui5-webcomponents/nightly/components/Tag/). We recommend using color scheme 10 from set 2.

Multiple productive systems

### Non-Productive Systems

To differentiate between multiple non-productive systems for the same product (for non-admins), use the [tag web component](https://sap.github.io/ui5-webcomponents/nightly/components/Tag/). We recommend using color scheme 8 from set 2.

Non-productive systems

---

## side-panel

The side panel is a feature located on the side of an app page, and provides quick access to frequently used actions and content without leaving the page. It can easily be expanded and collapsed, depending on the user’s needs.

The side panel is reserved for:

- Additional context and information related to the overall page content or to an item on the page.
- Interactive tools, such as actions and list elements.

The side panel can be positioned on the right or left side of the main page content. It can contain multiple tabs or a single tab. When expanded, the side panel pushes the main page content sideways.

## When to Use

Do
You can use the side panel to give users easy access to
information relating to the main content, such as
comments, attachments, or a change log.
- In the flexible column layout.
#### SAP S/4HANA Only
- To provide controls or information that are unrelated to the content of the app page.
You can use the side panel together with a list report,
worklist, or analytical list page.
Use the side panel **only** for the following use cases:
- Comments
- Attachments
- Table filter and layout for pivot tables
- Message handling and notifications
- Activity history / change log
## Components

The side panel has the following components:
1\. Content panel icon and title.
2\. Content area
3\. Resize handle (optional)
4\. _Close_ button
5\. Side bar
6\. _Expand/Collapse_ side panel
7\. Icon tab (selected)
8\. Icon tab (not selected)
9\. Overflow button. See [Multiple actions with overflow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/side-panel/#multiple-actions-with-overflow).
> **Guideline:** We recommend offering a maximum of 5 actions in a side panel.

### Panel Width

By default, the side panel is 320 px wide when expanded. You change this setting as needed for your use case.

## Behavior and Interaction

### Side Bar and Content Panel Navigation

By default, the side panel is collapsed and no tabs are selected. You can change this as needed for your use case.

The interaction depends on how many actions you offer via the side panel.

#### Side bar with one action

Default (col-1)

If only one action is available, the side bar contains only the expand/collapse button.
The expand button :navigation-left-arrow: opens the content panel. The collapse button :navigation-right-arrow:
closes it.
On mouseover, the expand button :navigation-left-arrow: shows a tooltip with the name of the action.

> **Guideline:** Ensure that the tooltip text for the _Expand_ button matches the title of the content area.

Carousel (full-width, col-2)

Section Metadata

style

#### Side bar with multiple actions

Default (col-1)

Clicking a tab in the side bar opens the corresponding content panel directly.
To close the content panel, users can either click the tab in the side bar again or use the _Close_ button :decline: at the top of the content panel.

> **Information:** Ensure that the tooltip for the icon tab matches the title of the content area.

Carousel (full-width, col-2)

Section Metadata

style

Default (col-1)

The _Expand_ button :navigation-left-arrow: at the top of the side bar expands the side bar. The available actions
are now visible in full. The _Collapse_ button :navigation-right-arrow: collapses the side bar again.
From the list of actions, users can navigate to the individual content panels. Opening a content panel collapses the
side bar and the tab displays as selected.

Carousel (full-width, col-2)

Section Metadata

style

#### Multiple actions with overflow

Default (col-1)

If the side bar can’t accommodate all the available actions, or the screen size is reduced, an overflow button (…)
appears as the last option.
Clicking the overflow button opens a list of additional actions.
Users can close the list by:
- Selecting an item
- Clicking the overflow button again
- Clicking anywhere else on the screen

Carousel (full-width, col-2)

Section Metadata

style

### Resizing the Content Panel

You can allow users to adjust the width of the content panel.

#### Mouse Interaction

Default (col-1)

- **Click and drag** the resize handle to the left or to the right.
- **Double-click** the resize handle to adjust the side panel width size as follows: Maximum width :arrow-right: minimum
width :arrow-right: default width
- **Right-click** the resize handle or anywhere within the side panel to open the context menu with the following options:
- _Expand to Maximum Width_
- _Collapse to Minimum Width_
- _Reset to Default Width_

Carousel (full-width, col-2)

Section Metadata

style

#### Keyboard Interaction

- Press **Left Arrow** or **Right Arrow** to expand or collapse the panel by 10 px.
- Press **Shift+Left Arrow** or **Shift+Right Arrow** to expand or collapse the panel by 100 px.

#### Screen Width Limits

For legibility, we recommend limiting the screen width allowed for the side panel display as follows:

- Maximum: 90% of the screen
- Minimum: 15% of the screen

You can change these values, depending on the use case.

If the app page contains two side panels – one to the left and one to the right of the screen – the expanded side panel is limited to 50% of the screen width. Users can only expand one panel at once.

> **Guideline:** To keep your UI simple, avoid using more than one side panel.

## Accessibility

Users can perform all the following actions with both a mouse and keyboard:

- Expand and collapse the side bar
- Select and deselect the tabs on the side bar to open and close the content panel
- Set the focus on a tab
- Move the focus from the side bar to the content panel
- Resize the side panel

## Responsiveness

Information on the design for tablet and phone devices will be added soon.

---

## smart-filter-bar-annotations

> **Information:** This article is intended as an aid to designers and developers who want to explore the detail configuration options
available for the smart filter bar.

The smart filter bar uses annotations to create a filter bar. It’s a wrapper that analyzes a given OData service and renders a filter bar based on the content defined by the service. For example, the OData service determines whether a field is visible on the filter bar, and whether it supports type-ahead and [value help](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/). To configure more settings or overwrite the settings from the OData service, the developer can set additional annotations in an external document (`metadata.xml`).

The developer can use annotation properties in the classes [ControlConfiguration](https://ui5.sap.com/#/api/sap.ui.comp.smartfilterbar.ControlConfiguration.html) and [GroupConfiguration](https://ui5.sap.com/#/api/sap.ui.comp.smartfilterbar.GroupConfiguration.html) to adapt the filter bar for the purposes of the app.

These annotations let you:

- Determine the type of control (for example, whether a field is shown as a [multi-input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/) or as a [date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/))
- Enable the autocomplete suggestions feature
- Enable the [value help dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/)
- Overwrite settings from the OData service
- Set custom filter groups
- Add custom fields
- Access all settings for the underlying [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/)

You can also use all the configuration options described here in the smart filter bar for the [list report SAP Fiori element.](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)

> **Warning:** Most of the attributes/properties are not dynamic and cannot be changed once the control has been initialized.

## Usage

### Use the smart filter bar if:

- An OData service is available.
- You want to develop quickly and efficiently.

### Do not use the smart filter bar if:

- You need to make extensive changes to the [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/).

## Components

You can use the [annotation properties](https://ui5.sap.com/#/api/sap.ui.comp.smartfilterbar.SmartFilterBar%23annotations/Summary) listed below to influence how filters are rendered in the **expanded filter bar** and in the **filter dialog**.

### Expanded Filter Bar

1 **enableBasicSearch**
Defines whether the filter bar includes a basic search.
By default, the basic search is not included.
7 **LineItem/Label**
2 **FilterRestrictions/NonFilterableProperties**
Defines whether a property is available as a filter
criterion.
The dynamic date range supports different operators, such as “Today -X /
3 **FilterRestrictions/RequiredProperties**
Defines the filter field as a mandatory filter. Mandatory
filters are marked by an asterisk (\*).
8 **insertDefaultFilterValue**
4 **ValueList**\                                          | Inserts a default filter value into the aggregation `defaultFilterValues`.
Contains annotations that provide information for
rendering a value help list that has been set for a
property.
button) or in manual mode. By default, the filter bar is shown in manual
5 **FilterExpressionType/MultiValue**
Defines whether multiple values can be used in a single
filter.
### Filter Dialog
1 **FilterRestrictions/RequiredProperties**
Defines the filter field as a mandatory filter. Mandatory

2 **FieldControlType/Hidden**
Defines whether the filter is initially visible on the
expanded filter bar.
3 **SelectionFields** Defines whether a filter belongs to
the basic group. All filters in the basic group are
initially visible on the expanded filter bar.
4 **FieldGroup**
Defines whether a filter field is initially shown on the
filter dialog, and which group it belongs to.
5 **FilterRestrictions/NonFilterableProperties**
Defines whether a property is available as a filter
criterion.
6 **LineItem/Label**
A short, human-readable text for the filter name.

### Fiscal Annotations

As an example, the smart filter bar supports fiscal annotations, like i.e. for fiscal period / data / time information. Such annotations guarantee the correct rendering of such values.

### Recently Used Values

The smart filter bar provides a history of the most recent values entered in smart filter fields.

- When the user focuses on a field, the app can display a small number of recently used values. They are shown below the recommended items, which can appear at the same time.
- When the dropdown list is opened, all values are shown. When the user starts to type, the recently used values are filtered accordingly.

### IN / OUT Parameter

In the smart filter bar, a dropdown or suggestion list can only contain a sub-set of items in case a dependent filter is set (IN parameter). It is also possible that selecting a value in a dropdown or suggestion list fills the current plus additional filter fields (OUT parameter).

## Data Types

The smart filter bar analyzes and interprets the metadata provided by the OData service. This allows you to create complex UI entities, and to automatically add fields offered by the OData service to the filter bar as editable input fields. (Note that only fields marked with `sap:filterable` are added automatically.)

The tables below tell you which input controls are used for the key data types. 
#### General Data Types

Table

DataType | ODataMetadata | Additional Configuration     | Edit type                                                                                                                                                                            | Display type | Notes

\*       | \*            |                              | [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)                                                                                                 | Text
DateTime | –             | sap:display-format=”Date”    | [DatePicker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/)                                                                                            | Text
Decimal  | –             | Precision=”3″ Scale=”0″      | [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)                                                                                                 | Text
All      | –             |                              | [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) (with [VHD](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/)) | Text         | If a matching ValueList
|                                                                                                                                                                                      |              | annotation is found, the
|                                                                                                                                                                                      |              | ValueHelp for the Input
|                                                                                                                                                                                      |              | is enabled.
|                                                                                                                                                                                      |              | A ValueHelp Dialog is
|                                                                                                                                                                                      |              | created automatically,
|                                                                                                                                                                                      |              | based on the data in the
|                                                                                                                                                                                      |              | ValueList annotation.

All      | –             | sap:semantics=”fixed-values” | [ComboBox](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/)                                                                                                | Text         | If a matching ValueList
on the ValueList entity      |                                                                                                                                                                                      |              | annotation is found, and
|                                                                                                                                                                                      |              | the ValueList entity has
|                                                                                                                                                                                      |              | the
|                                                                                                                                                                                      |              | semantics=”fixed-values”,
|                                                                                                                                                                                      |              | a dropdown list is shown.

#### Filter Bar-Specific Data Types

Table

Input Type | sap:filter-restriction | display-format | hasValueHelpDialog     | controlType     | Resulting Control Type

\*         | \*                     |                | controlType/filterType |                 | As specified in additional configuration
| is specified
DateTime   | “interval”             | “Date”         | NA                     |                 | [Date Range Selection](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-range-selection/)

DateTime   | “anything other than   | “Date”         | NA                     |                 | [Date Picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/)
interval” or empty     |                |
String     | “single-value”         |                | “true” / none          |                 | Input Field With [Value Help Dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/)
|                        |                 | (with typeAhead according to hasTypeAhead flag)

String     | “single-value”         |                | “false”                | not             | [Input Field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)
|                        | specified/input | (with typeAhead according to hasTypeAhead flag)

String     | “single-value”         |                | “false”                | dropDownList;   | [ComboBox](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/)
|                        | hasTypeAhead is
|                        | not considered
|                        | here
\*         | “single-value”         |                |                        |                 | [Input Field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)

String     | empty or no            |                | “true” / none          |                 | [Multi Input Field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/) with [Value Help Dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/)
filter-restriction     |                |
String     | “multi-value”          |                | “true” / none          |                 | If no VL Annotation is found – only show the range selection part

String     | “multi-value” / empty  |                | “false”                |                 | If no VL Annotation is found – hide the ValueHelpDialog icon

String     | “multi-value” / empty  |                | “false”                | dropDownList    | [MultiComboBox](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-combobox/)

\*         | “multi-value”          |                |                        |                 | [Input Field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)

\*         | “interval”             |                | NA                     |                 | A single [Input Field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) that allows the “-” shortcut notation for intervals

## Guidelines

### Reduced set of table columns for the tabular suggestion

You have the option to define different columns in the table of the Value Help Dialog and the suggestion list of the Smart Filter Bar.

In the [ValueList annotation](https://ui5.sap.com/#/api/sap.ui.comp.smartfilterbar.SmartFilterBar%23annotations/ValueList), each parameter can be statically annotated as important using the \<code>Importance\</code> annotation with EnumMember set to High:

```
<Annotation Term="com.sap.vocabularies.UI.v1.Importance"
EnumMember="com.sap.vocabularies.UI.v1.ImportanceType/High" />
```

In the suggestion list only the important parameters are displayed as columns, while in the table of the Value Help Dialog all of the parameters are displayed.

The _Importance_ annotation is optional – if omitted all of the parameters are displayed in both table of the Value Help Dialog and the suggestion list of the Smart Filter Bar.

### Formatting option for negative numbers

The OData type “NumericText” together with display-format=”NonNegative” interprets and displays all values containing only “0” (e.g. “0”, “000”) as empty.

---

## smart-form

The smart form control creates a [form](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/). If used with [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/), the smart form provides both read-only and editable views, and OData annotations for the smart fields are taken into account. The smart form also provides a [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/) with a [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/).

## When to Use

### Use the smart form if:

- You use an OData service for your app (OData version 2 only).
- You are using only (or primarily) [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) inside your [form](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/). In this case, the smart form is faster to implement.

### Do not use the smart form if:

- You use a different technology to OData version 2. Use the [form or simple form](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/).
- You need several other controls in your form that are not provided by the [smart field](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/), such as [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/), [progress indicators](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/), or [sliders](https://www.sap.com/design-system/fiori-design-web/ui-elements/slider/). In this case, use the form or simple form.
- You just want to display a few fields within a very strict layout (such as in the [object page header facets](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-page-header-mandatory)). In this case, use layout containers for placing the controls.
- You want to place several [input fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) in one column of the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/). In this case, use layout containers for placing the controls.

## Components

The smart form consists of a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) and a [form](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/).
### Toolbar

The following options are provided:
1. Expand/collapse button
2. Title
3. App-specific actions
#### Expand/Collapse Button

Default (col-1)

The expand/collapse [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) is optional (properties: `expandable`,
`expanded`). It shows or hides the [form](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/).

> **Guideline:** - Do not use the expand/collapse button in object pages.
- Even in other places, it is not usually recommended.

Section Metadata

style

#### Title

The [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) is optional (property: `title`).
#### App-Specific Actions

Default (col-1)

App-specific actions can only be added using a custom [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) (aggregation: `customToolbar`).

> **Guideline:** For custom actions, follow the guidelines for [object handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects).

> **Hint:** The smart form can add its [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) to the custom toolbar.

Section Metadata

style

### Form

The form consists of form groups (`sap.ui.comp.smartform.Group`) and a [layout](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#column-layout).
#### Form Groups

Default (col-1)

Each form group comes with:
- A [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/)
- One or several form elements and/or semantic form elements
Form elements (`sap.ui.comp.smartform.GroupElement`) consist of a [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/) and one or several UI elements. If [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) are used, the label is automatically provided by the corresponding metadata. If more than one smart field is used, define which label to display (`GroupElement`, property: `elementForLabel`).
The semantic form element (`sap.ui.comp.smartform.SemanticGroupSlement`) provides additional support when more than one control is attached to a single label. In display mode, the corresponding [texts](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/) are displayed as a single value and therefore use less space. You can define a delimiter, which is shown between the fields.

> **Guideline:** When using more than one control in a form element, consider the semantic form element. In most cases, it will be the
better choice.

> **Hint:** - Ideally, use only [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/).
- If this is not possible, use [only controls](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#components) that implement the `IFormContent` interface. Other controls could damage the visual layout, keyboard support, and screen reader support.

Section Metadata

style

#### Layout

Default (col-1)

The layout defines how the form groups and form elements are placed on the screen, depending on the available width (aggregation: `layout`). There are two layout options: [column layout](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#column-layout) and [responsive grid layout](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#responsive-grid-layout).

> **Guideline:** - Always use the [column layout](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#column-layout).
- If using a smart form on an object page, [additional guidelines](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#forms-within-the-object-page) apply.

Section Metadata

style

## Behavior and Interaction

### Display and Edit Mode

Default (col-1)

In display mode, the line height for each row is reduced (property: `editable`). This results in less white space between two lines of text. This setting is passed to all [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) inside the smart form, which then also switch automatically.

> **Hint:** Controls other than the smart field need to be adapted manually.

Section Metadata

style

### Validation

Default (col-1)

The smart form offers two validation modes: standard and asynchronous (property: `validationMode`). The standard validation mode works only for [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) and only with synchronous validation.

> **Hint:** Always use the asynchronous mode: it works for all form elements, not only for [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/).

Section Metadata

style

## Responsiveness

The smart form acts exactly like the embedded controls. For details, see:

- [Overflow Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/#responsiveness)
- [Form / Simple Form](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/)
- [Smart Field](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/)

## Example

## Top Tips

- Use [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) wherever it makes sense.
- Use the [column layout](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#column-layout).
- When using one [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/) for several controls, consider the semantic form element.

## Properties

The following properties are available for `sap.ui.comp.smartform.SmartForm`:

- The property: `checkButton` adds a button labeled _Check_ to the toolbar. The button triggers front-end validation on available smart fields. Do not use it. Follow the guidelines for form field validation instead.
- The property: `editToggable` adds an icon-only button to the toolbar, which switches the `editable` property. Do not use it. Follow the guidelines for object handling instead.
- The property: `entityType` is used for key user adaptations.
- The property: `flexEnabled` is used for key user adaptations.
- The property: `horizontalLayoutGroupElementMinWidth` only works with the horizontal layout, which is deprecated. Do not use it. Use the column layout instead.
- The property: `ignoredFields` is used for key user adaptations.
- The property: `importance` hides all smart fields with lower importance. Do not use it.
- The property: `useHorizontalLayout` only works with the horizontal layout, which is deprecated. Use the column layout instead.

The following properties are available for `sap.ui.comp.smartform.Group`:

- The property: `horizontalLayoutGroupElementMinWidth` only works with the horizontal layout, which is deprecated. Use the column layout instead.
- The property: `label` is deprecated. Use the aggregation: `title` instead.
- The property: `useHorizontalLayout` only works with the horizontal layout, which is deprecated. Use the column layout instead.
- The aggregation: `layout` is deprecated. Use the aggregation: `layoutData` instead.

---

## stacked-bar-micro-chart

The stacked bar micro chart is designed to be embedded into a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), or [object page header](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-page-header-mandatory) as a way to represent related values atop one another in order to visualize the single values as part of a whole. These values can be displayed in two different ways:

#### Percentage compared to 100%
- Use percentage values if your goal is to see each value
in the composition as a percentage of the whole. In this
case, the sum of the bars is always 100%.
#### Values compared to a maximum value
- Use this option in a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) or [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) if your goal is to compare the sum of the values to a maximum value (for example, the maximum of all data shown in the list or table), whilst still displaying the relative value of each to its local maximum.

Please note: The stacked bar micro chart does not support negative values.

## Usage

### Use the stacked bar micro chart if:

- You want to visualize a part-to-whole relationship embedded in a list or [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), with all the features described above.

- You want to visualize a part-to-whole relationship in an [object page header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/snapping-header/), with all the features described above.
Also consider using a [Harvey Ball micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/harvey-ball-micro-chart/) as an alternative visualization for a part-to-whole relationship.

### Do not use the stacked bar micro chart if:

- You want to visualize a part-to-whole relationship on a SAP Fiori tile. The stacked bar micro chart is not designed to be embedded into an SAP Fiori [tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/) and is therefore not supported. Consider using a [Harvey Ball micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/harvey-ball-micro-chart/) instead.

## Responsiveness

The stacked bar micro chart is fully responsive. The size adjusts dynamically based on the dimensions of the parent container. In addition, there are also four fixed sizes – L, M, S and XS. Each fixed size is a snapshot of the fully responsive micro chart for specific dimensions.

_Stacked bar micro chart - Size L_          | _Stacked bar micro chart - Size M_          | _Stacked bar micro chart - Size S_          | _Stacked bar micro chart - Size XS_
You can use the smallest XS size to embed the stacked bar micro chart in the table cells of the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) (also in condensed mode). Left-align the stacked bar micro chart in the table cell.

### Maximum and Minimum Sizes

The stacked bar micro chart can have the following dimensions:

Table
**Width** | **Height**

Maximum | 320 px    | 94 px

Minimum | 64 px     | 18 px

If the label is too long to fit inside the bar, it is hidden. With the minimum chart height, the labels are not shown.

## Components

### Maximum Value

The chart is scaled relative to the maximum value. This means if a maximum value (_maxValue)_ is set, then the width of the stacked chart represents the maximum value and each value within the chart is scaled relative to this maximum.

If the maximum value is not set, then the width of the chart represents 100% and each value is displayed as a relative percentage.

### Precision

By setting a specific value for the precision, an application developer can influence rounding calculations by defining how many digits are displayed. By default this value is 1.

### Display Value

By default, the control displays percentage values on the bars. However, application developers can also set a display property to show absolute values, or to show only bars (by entering a blank space).

### Color

An application developer can set any color for the chart either by using names of [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/#HowtoUseColorPalettesinCharts-HowtoUsetheQualitativePalette1), or by using names from the [qualitative palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/) (sapUiChartPaletteQualitativeHue1…11).

**Please note**: A legend is currently not available for the stacked bar micro chart. Since the use of multiple colors is not self-explanatory, we highly recommend using semantic colors and an explanatory title for the chart.

---

## tab-bar-web-component

The tab bar comprises a series of tabs that each link to a different content area or view. You can use the tab bar to navigate between subpages for an object, as a filter, or to visualize process steps.

## When to Use

Do
Use the tab bar:
- To display multiple subpages for a business object on
one page.
- To let users switch easily between subpages.
- To visualize clear-cut process steps.
- To offer prominent, one-click visual filters above a
set of items.
## Anatomy

### Tab Bar
1. **Main bar:** Contains two types of element:
a. **Tab:** The clickable item inside the tab container.
b. **Tab separator:** Visual indicator used to separate the tabs.
2. **Overflow menu:** Contains any remaining tabs that can’t be
displayed in the available space.
3. **Content area:** Contains the content for the selected tab.
### Tab
1. **Icon:** Icon for the tab.
2. **Text:** Text for the tab.
3. **Additional text:** Supplementary text for a tab, such as a count.
4. **Subtabs:** A tab can contain subtabs. For details, see [Hierarchies](https://www.sap.com/design-system/fiori-design-web/ui-elements/tab-bar-web-component/#hierarchies).
The visual representation of the tab adapts automatically, depending on the elements it contains.
## Tab Bar Types

You can use different tab bar types, depending on your use case:

- [Text tabs](https://www.sap.com/design-system/fiori-design-web/ui-elements/tab-bar-web-component/#text-tabs)
- [Icon tabs](https://www.sap.com/design-system/fiori-design-web/ui-elements/tab-bar-web-component/#icon-tabs)
- [Filter tabs](https://www.sap.com/design-system/fiori-design-web/ui-elements/tab-bar-web-component/#filter-tabs)
- [Process tabs](https://www.sap.com/design-system/fiori-design-web/ui-elements/tab-bar-web-component/#process-tabs)
- [Semantic tabs](https://www.sap.com/design-system/fiori-design-web/ui-elements/tab-bar-web-component/#semantic-tabs)

### Text Tabs

Text tabs allow longer labels, which are not truncated.
They can also display a count after the text to indicate
number of items on the tab page.

### Icon Tabs

These round tabs can be populated with any icon. Labels
are optional. If you decide to use labels, use them for
all tabs. You can use additional text as needed.
### Filter Tabs

When used as a filter, the tab bar can contain a tab for
displaying all items (optional), in addition to the
individual tabs for each filter attribute. We strongly
recommend showing the count as an additional text for
every tab.
### Process Tabs

You can also use the tab bar to depict a process. In this
case, each tab stands for one step.
### Semantic Tabs

For all types of tab bar mentioned above, you can apply semantic colors to the tabs. Semantic tabs help attract the user’s attention and offer additional orientation. The semantic color can be positive, critical, or negative.

> **Guideline:** - Only use semantic colors if it is important for users to know that they need to take action (for example, to
indicate errors or critical situations requiring action). Otherwise, use the neutral default colors.
- To comply with the 2-senses accessibility principle, display a semantic icon on all semantic tabs. In addition, use
a tab text that reflects the semantic meaning.

Examples

Semantic tabs

## Behavior and Interaction

### Selection

Only one tab can be selected at a time. Selecting a new
tab deselects the tab that was displayed previously.

### Hierarchies

The tab bar supports hierarchies, allowing you to group
multiple tabs under a main tab. The label of the main tab
then serves as the heading for the group. An arrow
indicates that a tab has subtabs.
If the **parent tab has its own content**, it is separated into two interactive areas, like a [split button](https://www.sap.com/design-system/fiori-design-web/ui-elements/split-button-web-component/):
- Clicking the left area (text) displays the content for the parent tab.
- Clicking the right area (arrow) opens a [menu](https://www.sap.com/design-system/fiori-design-web/v1-130/ui-elements/menu-web-component/) with the subtabs.
If the **parent tab doesn’t have its own content**, it has only one interactive area. Clicking the main tab opens the [menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-web-component/) with the available subtabs.

## Responsive Behavior

### Overflow

If there isn’t enough space to show all the tabs on the
main bar, an overflow menu appears automatically,
containing all the remaining tabs.
You can set the overflow mode, depending on your use case:
- **End (default)**: The overflow only appears at the end
of the tab bar. Use this mode if the order of the tabs
isn’t relevant.
- **Start and End**: The overflow menu can appear
dynamically either on one or on both sides of the tab bar.
Where the overflow appears depends on which tab is
activated. Use this mode if the tabs need to stay in the
same order.
You can also replace the buttons for the overflow menus
with custom buttons.

---

## table-bar

The table toolbar always appears above the table. The control is used for key actions that impact the entire table.

## Usage

### Use the table toolbar if:

- There are multiple objects on your [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) and you need to edit only a single [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview).
- You want to show [actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) as close to their corresponding controls as possible.
- You need a title for your table.

### Do not use the table toolbar if:

- You are using single selection and have only one or two actions. In this case, place the [actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) on each line.

## Responsiveness

To enable responsiveness, use the [overflow toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) control. For more information, see [Toolbar Overview – Responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#responsiveness).

## Components

The table toolbar can contain several components, including a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and several types of [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/). Actions are grouped by the following [action types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#guidelines-for-the-header-toolbar):

- Finalizing actions, such as *Save* or *Cancel.* Finalizing actions are app-specific and are used only if the table is editable.
- Business actions, such as *Edit* or *Create*. Business actions can be app-specific or general object management actions.
- Actions for managing the content, such as *Sort* or *Filter.* These settings are also known as “view settings”.
- Generic actions, such as *Export to Spreadsheet.*

Between the groups, add a separator line.

The following content can be part of the table toolbar. Use only the content your users really need. For the remaining content, keep the order shown below:

- [Title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/)
- [Variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) or content switch (for example, as used to [switch between multiple views in a list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#general-layout))
- *[Search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/)*
- Finalizing actions:
  - *Save*
  - *Cancel*
- Business actions: Use this action type for app-specific actions. The order of actions in this group is not “fixed”. Place all the business actions, except for *Paste*, in the order of their importance for the use case. Always keep *Paste* as the last business action in the group. Try to keep *Create / Add*, *Edit*, and *Delete* / *Remove* together, but only if this is meaningful in your app.
- This group contains:
  - App-specific business actions
  - Actions for object management
    - *Create* (for new items) or *Add* (for existing items)
    - *Edit*
    - *Delete* (if the object itself is deleted) *or Remove* (if the reference to an item is removed)
  - *Paste*
  - Actions for content management (view settings)
    - *Show Details / Hide Details*
    - *Sort*
    - *Filter*
    - *Group*
    - *Column Settings*
- Generic actions
  - *[Export to Spreadsheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/)*
  - *Print*
- *Maximize / Minimize*
- View switch (for example, to [switch between table and chart view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-toolbar/#view-switch-generic))
- *Overflow*

*All possible components in the correct order*

## Behavior and Interaction

### Title

A title provides a short, meaningful summary of the content, mostly in a single word. To display a title, use the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) control.

Use a toolbar title if you need the table toolbar and the [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) of the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) is not displayed nearby. To prevent redundancy between titles, use a generic label for the table title, such as *Items*.

After the title, show a counter for the items displayed in the table:

- An **item counter** shows the number of items displayed in parentheses, when items are displayed, for example, *(253).*
- A **selection and item counter** shows the number of selected and displayed items in parentheses, when items are selected, for example, *(Selected: 4 of 37*).

When a title is followed by a segmented button for switching among predefined table views:

- A **selection counter** is displayed after the title, for example, *(Selected: 4)*
- An **item counter** displays the number of items for each view after the text (or icon) on the segmented button, for example, *All (37), High (3), Medium (4)*

*Title with item counter in the table toolbar*

*Title with selection and item counter in the table toolbar*

*Title with selection counter and segmented button with item counts*

### Variant Management

In tables, a variant stores all the settings that define the table view, such as the column layout, column visibility, sorting, filter settings, and grouping. The [variant management control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) enables users to load, save, and change variants. In most cases, [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) replaces the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/).

*Variant management in the table toolbar*

### Title and Variant Management

If you need both a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/), place the [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) control directly after the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/). Use a separator between the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/).

Since using both controls often leads to truncation problems, this pattern is not recommended.

*Title with variant management*

### Content Switch

To switch between different predefined views, use a [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) control or a [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/). The content switch replaces the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and the [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) control. In the rare case that the content switch is shown together with a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/), the content switch follows the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/).

A predefined view contains settings for sorting, filtering, grouping, column layout, and column visibility. Nevertheless, in most cases, the content switch is just used for different filter settings like *All*, *Mine*, and *Others*. In this case, make sure that the content switch doesn’t interfere with other filter settings. For example, remove the corresponding filter from the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/). If possible, include an item counter per view.

Another common pattern for content switches are views like *By X*, and *By Y,* which are usually defined using group settings.

Use the [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#segmented-button) and the [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) control as follows:

- For a limited set of views (2-3), use the [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#segmented-button) for desktop and tablet devices. Replace it with a [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) control if there is not enough screen space.
- If the number of views can change or is larger than 3, use the [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) control.

For more information, see [multiple views](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#content-area) for list reports.

*Segmented button with an item counter*

*Segmented text button to switch content*

*Select control to switch content*

### Search

For [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with a large number of items, consider adding a [search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/). Use a search field only if there is no other way to search within the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) (for example, if there is no additional [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/)).

Place the [search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) on the right side of the toolbar. Since the search field cannot be moved into the overflow menu, always provide a minimum width.

Ideally, search for results in all columns. As a minimum, search in all currently visible columns.

For more information, see [Search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/).

*Search in the table toolbar*

### App-Specific Business Actions

If needed, you can define your own actions for the app. In this case, use text-only [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) with a short, unambiguous text for the action the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) performs. A [button text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori) is usually a single-word verb (for example, *Share)*. Note that text strings can be longer in other languages.

*Table toolbar with app-specific buttons*

### Create / Add

Use a text [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) for *Create* or *Add* actions. If the *Create* or *Add* action is a main function, never move it into the overflow.

See also: [Object Handling (Create, Edit, Delete)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects).

*Table toolbar with 'Create' button*

*Table toolbar with 'Add' button*

### Edit

There are several options for editing a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview):

#### Edit a Single Item

To allow the user to edit a single item, show an icon-only *Edit* button at the end of the item (depending on the table control, use sap.m.ListItemBase, property: type, value: sap.m.ListType.Detail or sap.m.ListType.DetailAndActive; or row actions). The user can click the button to trigger the edit event. Use this event to make the item editable.

*Editing a single item*

#### Mass Editing

See: [Mass Editing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing)

#### Edit the Whole Table

To let the user edit a whole [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), use a text-only *Edit* [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button). When the user triggers the edit action, switch the table to edit mode. In edit mode, do not show the *Edit* [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) and add the finalizing actions *Save* and *Cancel* instead. Remove any actions that are meaningless in edit mode. Keep the view settings available.

See also: [Object Handling (Create, Edit, Delete)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects)

*Table in display mode with 'Edit' as the most important action*

*Table in edit mode*

### Delete / Remove

Use a text [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) for *Delete* or *Remove* actions. In most cases, *Delete* is used together with *Create*, while *Remove* is used together with *Add.*

If the *Delete* or *Remove* action is a main function, never move it into the overflow.

See also: [Object Handling (Create, Edit, Delete)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects)

*Table toolbar with 'Delete' button*

*Table toolbar with 'Remove' button*

### Show Details / Hide Details

Based on the responsive behavior of a table, data can be shown in the pop-in area. With the *Hide Details* / *Show Details* [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/segmented-button-web-component/), users can switch between a full data set and a reduced data set.

The tooltip labels are as follows:

- Hide: *Show less per row*
- Show: *Show more per row*

This function is part of the view settings group and is displayed at the first position of this group.

For more information, see [Smart Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/#show-details-hide-details).

*'Show Details' function to show all data in pop-in area*

*'Hide Details' function to reduce data in the pop-in area*

### Sort, Filter, Group

When the user chooses one of these actions, open the [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/) or the [P13n Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) with only the corresponding settings.

- If sorting, filtering, and/or grouping is a common use case in your app, offer one, two, or all three of the corresponding features. Do not provide these features if the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) is expected to have only a small number of entries (up to 20 in most cases).
- If filtering in a list report is a main use case, do not offer filtering on the table toolbar; use the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) instead.

Always use only the view settings you really need. For example, do not offer grouping if it does not support your use case.

Ensure a consistent user experience. When a user reopens the app and if [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) is not used, show the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with the same view settings that were last defined by this user.

For more information, see [Table Personalization](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization).

*Triggers for the different view settings (sort, filter, and group)*

### Column Settings

Use the [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/) or the [P13n Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) for adding, removing, and rearranging columns.

Offer column settings if you need more columns than those that fit on a tablet screen (which is usually five) to fulfill 80% of your main use cases. Before you do this, try to reduce the number of columns, for example, by using several lines per column or by using the pop-in feature.

Ensure a consistent user experience. When a user reopens the app and if [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) is not used, show the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with the same column settings that were last defined by this user.

For more information, see [Table Personalization](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization).

*Table toolbar with 'Column Settings' button*

### Export to Spreadsheet

The [Export to Spreadsheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) action allows the user to export table rows and is represented by an icon-only [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1).

*Table toolbar with the 'Export to Spreadsheet' menu button*

### Print

The action for printing table items is represented by an icon-only [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button).

*Table toolbar with 'Print' button*

### Maximize / Minimize

To allow the user to show the table in full screen mode (property: `ShowFullScreenButton`), show the :full-screen: *Maximize* [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button). The user can exit the full screen by clicking the :exitfullscreen: *Minimize* button.

*Table toolbar with 'Maximize/Minimize' button*

**> **Guideline:** **

- Use *Maximize / Minimize* only if really needed.
- Do not use it in [list reports](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), [worklists](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/work-list/), [analytical list pages,](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) and [initial pages](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/). We recommend it in [object pages](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/) with multiple grid tables in one tab.
- Do not use it for [responsive tables](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) with a [*More* button](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#load-items).
- Do not use it if the table is in a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) or [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/).

### View Switch

View switches are right-aligned in the toolbar and allow the user to switch between different [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) types and different controls for displaying items (for example [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/), [grid list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-list/)). Provide the view switch if a [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) relies on subtle color differences or gradients of color. In these cases, users with visual impairments can switch to the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) view.

Switches are optional and do not have to be provided if there is no need to switch between different charts or tables.

Define the number of chart types and switches with care. Offer only chart types that are meaningful for visualizing the respective data and that best assist the user. Ideally, offer no more than three types of visualization.

The sequence of chart type switches is not fixed. Sort them in order of importance.

The chart type currently in use is highlighted. To show this, use a [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#segmented-button) with icons.

For more information about the icons and the chart types they represent, see [Chart Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-toolbar/).

### Overflow

See: [Toolbar Overview – Overflow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow-generic).

## Styles

On the table toolbar, use the following [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) styles:

- If the single primary action for the whole page is on the table toolbar, use the emphasized [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) style.
- if the single primary action for the whole page is not on the table toolbar, you can still highlight the most important button of the table toolbar by using the ghost [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) style.
- For secondary actions and negative path actions, use the transparent [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button) style.
- For [split buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#split-menu-button) and [menu buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1), use the transparent button style.
- Do not use semantic [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#split-menu-button) styles on the table toolbar.

For more information, see [Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) and [Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement).

## Guidelines

To indicate if an action can be applied to the current selection:
- Enable the action if it always works, regardless of whether or not items are selected.
- Enable the action if it can be applied to all selected items.
- Enable the action if it can be applied to some of the selected items. If the action is triggered, show a [message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/) that informs the user how many items will be affected. Let the user choose whether to apply the action anyway or cancel the action.
- Only disable the action if:
- The action can’t be applied to any of the selected items.
- The number of selected items doesn’t match the action. For example, disable *Compare* if only one item is selected.
For more details, see [UI Element States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states).
If the items are still available after the action was applied, keep them selected.

For further guidelines, see [Toolbar Overview – Guidelines](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#guidelines).

---

## table-personalization-dialog

The table personalization dialog allows you to display and modify table settings. It is a UI pattern that defines the column order and visibility.

## Usage

### Use the table personalization dialog if:

- You have small [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/).
- You have a manageable number of columns.

### Do not use the table personalization dialog if:

- You have large [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/).
- You have a lot of columns to manage.

For larger tables you can use the [P13n dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) instead.

## Responsiveness

On a desktop and tablet, the control
appears as a dialog window.
_Smartphone - Size S_          | _Tablet - Size M_
On smartphone devices, always display
the table personalization dialog in
full screen mode.

## Layout

### Position on the Screen

The dialog always opens in a modal window in the center of the screen.

For smartphones, stretch the dialog to fill the entire screen. For tablet and desktop devices, keep the modal window.

### Layout of the Dialog

The table personalization dialog comprises the following five areas:

(1) Header
(2) Toolbar
(3) List Header
(4) Column list
(5) Footer toolbar
## Components

The table personalization dialog contains the following sections:

#### Dialog Header
The header displays the dialog title and the _Reset_ button to revert to the initial state.

#### Toolbar
The toolbar displays the _Move Column Up_ and _Move Column Down_ buttons, and the _Search_ field.

#### List Header
The list header displays the _Select All_ [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) for selecting all columns.

#### Column list
The column list displays the available columns. The user
can filter the selection using the search field in the
toolbar.
#### Footer toolbar
The [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) displays an _OK_ and a _Cancel_ button.

## Behavior and Interaction

The table personalization dialog is [resizable](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/#resizable).

### Open the Dialog
To open the table personalization dialog, the user clicks the :action-settings: _(Settings)_ button on the right-hand side of the table toolbar.

### Show or Hide Columns
To show or hide columns, the user selects or deselects the [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) for a column (list item).

The user can also show or hide all columns with just one
click. A checkbox on the left-hand side of the list
header enables all list items to be selected or
deselected.

### Move Columns
Users can change the order of the columns in the table using the :navigation-up-arrow: (_Move Column Up_) and :navigation-down-arrow: (_Move Column Down_) buttons in the toolbar.
To change the order, click an item (not on the check box, but on the rest of the line), and click the button: Items on top
are farthest to the left in the table, items on bottom are farthest to the right.

### Search/Filter Columns
Users can search for or filter columns using the search
field in the toolbar.
The search is a live search (also known as “search-as-you-type”), which is triggered by each character the user enters or
deletes. For more information, see [search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/).

To clear the filters, the user can delete all characters manually, or use the :decline: icon.
The list then shows all columns again.
### Reset Personalization
The _Reset_ button in the dialog header resets all settings to the initial state.
If the table personalization dialog is used together with [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/), the button resets the changes to the initial state of the selected variant.
### Confirm/Cancel Changes
The changes are applied when the user closes the dialog with the _OK_ button.
The _Cancel_ button closes the dialog without applying the changes.

---

## toolbar-overview

The toolbar enables the user to change the UI or trigger an action. For example, the toolbar allows the user to change views, manipulate data or objects, navigate to another page, perform generic actions, and so on.

This article gives an overview of what kind of different toolbars exist and when to use which one.

## Actions and Layout

Actions can be used as follows:

- They can be independent of the current selection and not related to a specific item or object.
- They can be specific to the current object (user selects one item).
- They can apply to a set of items (user selects two or more items).
- They can control the settings for parts of the UI content. For example, an action can affect all items in a table.

The toolbar is mostly used for [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) (with an icon **or** text). You can also place a title in the toolbar. The alignment of the title (left, center, right) depends on the settings for the theme.

The buttons are always right-aligned. Sort your buttons according to their importance for the user, with the most frequently-used action first and the most seldom-used action last. All buttons go into the overflow from right to left, thus ensuring that the most important buttons are the last to be moved into the overflow menu. For more information, see [Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement).

## Responsiveness

To enable responsiveness, use the OverflowToolbar control. Based on the sap.m.Toolbar control, the OverflowToolbar control is a container that provides overflow when its content does not fit in the visible area. Controls that can overflow include the [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/), [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/), [toggle button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/), [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/), [input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/), [search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/), [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/), and [date/time input](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/date-time-input/).

Only allow important actions to shrink and stay outside the overflow. The app team itself must decide which actions it considers to be sufficiently important.

The height of the toolbar changes on desktops (compact mode), tablets, and smartphones (cozy mode). For more information, see the article on [content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Behavior and Interaction

App teams should implement overflow behavior to ensure that all actions can be accessed at any time. Buttons are sorted by usage, with the most frequently used action first (on the left) and the most seldom-used action last (on the right). This ensures that the most important buttons are the last to be moved into the overflow menu. Our general guideline is to use only icon buttons **or** text buttons. Do not combine an icon and text into one button. Buttons are always right-aligned.

### Overflow (Generic)

The overflow should be activated either when there is not enough space for all actions, or if some actions are less important than others. In this case, the app team might decide to have certain actions only appear in the overflow. Furthermore, the app team can also decide that some (important) actions should never be moved into the overflow.

When you implement the [overflow toolbar](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.OverflowToolbar.html), the overflow behavior is generated automatically. The “**…**” (_overflow_) button is a toggle button and can be used to switch the overflow menu on and off.

The user clicks the overflow button to open a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/). In this action sheet, all icon buttons are labeled with text. Overflow is supported for the following controls:

- sap.m.[SegmentedButton](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) – When in the overflow, the segmented button is in select mode and looks like a select, although it is technically still a segmented button.
- sap.m.[Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) – When in the overflow, it is always in default mode to take advantage of the extra space, even if it was set to icon-only mode in the toolbar.
- sap.m.[ToggleButton](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/)
- sap.m.[Checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/)
- sap.m.[Input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)
- sap.m.[SearchField](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/)
- sap.m.[ComboBox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/)
- sap.m.[DateTimeInput](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/date-time-input/)
- sap.ui.comp.smartfield.SmartField
- sap.m.[Label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/)
- sap.m.[MenuButton](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/menu-button/)
- sap.m.[GenericTag](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-tag/)

All buttons go into the overflow from right to the left. This ensures that the most important buttons are the last to be moved into the overflow menu.

The sap.m.[ToolbarSeparator](https://sapui5.hana.ondemand.com/#/api/sap.m.ToolbarSeparator) can also go into the overflow. The separator then changes from a vertical line into a horizontal line. If the control happens to be the first or the last item of the overflow area, the separator isn’t displayed.

#### Prioritization

You can also prioritize the actions in the toolbar by applying one of five statuses:

- Always overflow: The action always goes into the overflow.
- Disappear: An action that is not so relevant for the user can disappear if the space is limited (for example, a title).
- Low: Assign the priority “Low” to an action if the user seldom needs it; this action will overflow first.
- High: Actions set to “High” remain visible in the toolbar until all lower-priority actions have moved to the overflow. Lower-priority actions are those with the priorities “Disappear” or “Low”, and all unprioritized actions.
- Never overflow: These actions are always visible in the toolbar.

The priority of each item is high by default. If two items have equal priority, the item on the right side overflows first.

#### Grouping

Items can overflow together even if they are in different positions. This can be achieved using the `group` property in the [overflow toolbar layout data](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.OverflowToolbarLayoutData). When the value of the property is 0, the element does not belong to any group. When two or more elements are given the same property value, they belong to the same group and will go into the overflow together. Elements that belong to a group are not allowed to have “always overflow” or “never overflow” as priorities, since these priorities force the items to remain either in the toolbar or in the overflow area. When group elements have different priorities, the priority of the group is defined by the maximum priority of its elements.

_Table toolbar on smartphone with overflow_          | _Table toolbar on smartphone with open overflow_
## Styles

### Button Styles
#### Header and Footer Toolbars
Use the following button styles for the different action types in the header and
footer toolbars:
- _Primary action:_ Use the emphasized button style.
- _Secondary action:_ Use the ghost button style. Note that the ghost button has
a transparent background.
- _Semantic action:_ Use the semantic buttons for positive and negative actions.
Use the “accept” style for positive actions, and the “reject” one for negative
actions. Semantic actions must always be text buttons.
- _Negative path action:_ Use the transparent button style.
Do not use any other style types.
#### Content Toolbars
Use the following button styles for the different action types in content
toolbars (for example, in tables, forms, or charts):
- _Primary action:_ Use the emphasized button style. Usually, the primary action
is positioned in the header or footer toolbar. Note that there can only be **one primary action per page**.
If a page already has a primary action, but you also need to highlight the most
important action in a content toolbar, use the ghost style for this one button in
the content toolbar.
- _Secondary action:_ Use the transparent button style.
The different button styles are designed to give appropriate feedback to users.
Do not use them for decoration purposes.
### Styles and Toolbars

Apply the following menu button styles for the different
toolbars:
- **Header and footer toolbars:** Use the ghost style.
- **Content toolbars**: Use the transparent button style.
Do not use any other style types.

### Emphasized and Semantic Buttons

- Use a maximum of 1 emphasized button per toolbar.
- Never mix emphasized and semantic buttons.
- Ideally, there should be only one emphasized action per page. There can be valid exceptions, but we generally recommend using only one emphasized button.
- For more information, see [Buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/).

### Enumeration

The toolbar style is an enumeration with two properties: `Standard` (default) and `Clear`.

- Standard style results in linear design (with border) and is intended for standalone usage of the toolbar.
- Clear style appears as a plain color without borders. This style visually groups the toolbar with a nearby control or controls.

The toolbar `style` property is combined with the toolbar `design` property to create various visual styles.

## Types

A variety of toolbars exist for different use cases (see examples below). The following types are used:

- **Header toolbar**: Contains global actions that are important for the whole page
- **Footer toolbar**: Contains only closing and finalizing actions
- **Table toolbar**: Toolbar that is positioned above a table and contains table-specific actions
- **Chart toolbar**: Toolbar that is positioned above a chart and contains chart-specific actions
- **Infobar**: Toolbar that indicates what filters have been set, and how many items have been selected
- **Tree toolbar**: Toolbar that appears above a tree or tree table, and is used for actions that impact the entire tree.

### [Header Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/)

### [Footer Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/)

### [Table Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/)

### [Chart Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-toolbar/)

### [Infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/)

### [Tree Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-toolbar/)

## Guidelines

### Order of Buttons

To provide a consistent user experience for each app, we highly recommend using the following alignment for generic actions:

- All buttons are right-aligned.
- Text buttons should be grouped together, as should icon buttons.
- Place semantic buttons side by side (for example, _Accept_ and _Reject_).
- App-specific text-only buttons and generic text-only buttons can be combined and arranged in a sequence defined by the app team. Remember to place the most frequently-used actions furthest to the left of the group of buttons. This ensures that these actions are the last to be moved into the overflow menu or are visible at all times.

### General Guidelines

- Do not overload the toolbar with actions.
- Place actions as close to the corresponding content as possible.
- Place commands in the same location throughout the app. Each page should contain only the commands that are relevant to that page. If commands are shared between pages, they should be placed as close to the same location as possible on each page so that users can predict where the commands can be found when navigating.
- Separate navigation and commands. Place commands as close to their corresponding items as possible.
- Do not place _Settings_, _Logout_, or other account management commands in the footer toolbar.
- Do not use icon buttons for app-specific actions (neither icon-only buttons, nor icon+text buttons).
- Use only icon buttons **or** text buttons. Do not combine an icon and text into one button. [Buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) are always right-aligned.
- If you want to group buttons, use a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1).
- Actions that impact the entire page are placed in the header area.
- Only closing or finalizing actions are placed in the footer toolbar (for example, _Submit_ or _Post_).

### UI Text Guidelines

Use tooltips such as _Sort_, _Filter_, and _Group_ to label the icons in the footer toolbar. In the case of _Sort_, _Group_, and _Filter_, use the following text for the _no selection made_ option:

Note: In most cases, _(Not sorted)_ is not necessary. Simply show the default sort settings instead:

---

## toolbar-web-component

A toolbar is a flexible container that can hold various other components.

<https://www.sap.com/design-system/live-examples/Toolbar/Toolbar_LE.html>

## When to Use

Do
Use the toolbar:
- For buttons with an icon **or** text.
- For user input elements.
## Anatomy

1. **Toolbar**: Contains all toolbar elements.
2. **Content**: Any toolbar elements that can be placed
inside the toolbar.
3. **Spacer**: Can be used to create space between groups
of elements. It can either be a fixed value, or take up
all remaining space.
4. **Separator**: Separates two groups of elements without
affecting their position.
5. **Overflow menu**: Contains remaining toolbar elements
that cannot be displayed due to limited space.
## Types

The toolbar elements can be aligned left (“Start”) or right (“End”) and used in conjunction with separators or spacers.

### With Spacer

<https://www.sap.com/design-system/live-examples/Toolbar/Toolbar_withspacer_LE.html>

### With Separator

<https://www.sap.com/design-system/live-examples/Toolbar/Toolbar_LE.html>

### Left-Aligned

<https://www.sap.com/design-system/live-examples/Toolbar/Toolbar_start_LE.html>

## Responsive Behavior

### Overflow

The toolbar’s overflow behavior can transition action elements into a popover when there is not enough space.

You can specify which elements can move into the overflow (overflow priority “AlwaysOverflow”) and which elements always stay on the toolbar (overflow priority “NeverOverflow”). This ensures that the most important toolbar elements remain when the screen size decreases.

<https://www.sap.com/design-system/live-examples/Toolbar/Toolbar_alwaysoverflow_LE.html>

---

## tree-toolbar

The tree toolbar always appears above a [tree](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree/) or [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/). The control is used for key [actions](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) that impact the entire tree.

## Usage

### Use the tree toolbar if:

- There are multiple objects on your [page](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) and you need to edit only a single tree.
- You want to show [actions](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) as close to their corresponding controls as possible.
- You need a [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) for your tree.

### Don’t use the tree toolbar if:

- You are using single selection and only one or two actions. In this case, place the actions on each line.

## Responsiveness

To enable responsiveness, use the [overflow toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/) control. For more information, see [Toolbar Overview – Responsiveness](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/#responsiveness).

## Components

The tree toolbar can contain several components, including a [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) and several types of [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/). Actions are grouped by the following [action types](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement):

- Finalizing actions, such as _Save_ or _Cancel_. Finalizing actions are app-specific, and are used only if the tree is editable.
- Business actions, such as _Edit_ or _Create_. Business actions can be app-specific or general object management actions. They also include actions for organizing the tree.
- Actions for managing the content, such as _Sort_ or _Filter_. These settings are also known as “view settings”.
- Actions for managing the layout, such as _Maximize_ or _Minimize_.
- Generic actions, such as _Export to Spreadsheet_.

Between the groups, add a separator line.

The following content can be part of the tree toolbar. Use only the content your users really need. For the remaining content, keep the order shown below:

- [Title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/)
- [Variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) or content switch (for example, as used to [switch between multiple views in a list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#general-layout))
- Finalizing actions:
- Business actions: Use this action type for app-specific actions. This group contains:
  - App-specific business actions
  - Actions for object management
    - _Create_ (for new items) or _Add_ (for existing items)
    - _Delete_ (if the object itself is deleted) or _Remove_ (if the reference to an item is removed)

The order of actions in this group is not “fixed”. Place the most important action first, followed by the second most important action, and so on. Try to keep _Create/Add_, _Edit_, and _Delete/Remove_ together, but only if this is meaningful in your app.

- Actions for organizing the tree:
  - _Paste_ and / or 
- Actions for content management (view settings):
  - _Collapse All_ / 
- Actions for managing the layout:
  - _Maximize_ / 
- Generic actions:
- View switch (for example, to [switch between tree and chart view](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-toolbar/#view-switch-generic))

## Behavior and Interaction

### App-Specific Business Actions

If needed, you can define your own actions for the app. In this case, use text-only [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) with a short, unambiguous text for the action that the button performs. A [button text](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori) is usually a single-word verb (for example, _Share)_. Note that text strings can be longer in other languages.

### Title

A [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) provides a short, meaningful summary of the content, mostly in a single word. To display a title, use the title control.

In addition, the title can be followed by an item counter (the number of items in parentheses).

Use a title if you need the table toolbar, and if the title of the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) is not indicated in the surrounding area. To avoid repeating text, you can use a generic text for the table title, such as _Items_. Note that the title is truncated if there is not enough space.

### Variant Management

In trees, a variant stores all the settings that define the table view, such as the column layout, column visibility, sorting, filter settings, and grouping. The [variant management control](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) enables users to load, save, and change variants. In most cases, variant management replaces the title.

### Title and Variant Management

If you need both a [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) and [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/), place the variant management control directly after the title. Use a separator between the title and variant management.

However, since displaying both the title and variant often results in truncated texts, this pattern is not recommended.

### Content Switch

To switch between different predefined views, use a [select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/) control or a [segmented button](https://www.sap.com/design-system/fiori-design-web/v1-130/ui-elements/button/#segmented-button). The content switch replaces the [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) and the [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) control. In the rare case that the content switch is shown together with a title, the content switch follows the title.

A predefined view contains settings for sorting, filtering, grouping, column layout, and column visibility. However, in most cases, the content switch is just used for different filter settings like _All_, _Mine_, and _Others_. In this case, make sure that the content switch doesn’t interfere with other filter settings. For example, remove the corresponding filter from the [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/). If possible, include an item counter per view.

Another common pattern for content switches are views like _By X_, and _By Y,_ which are usually defined using group settings.

Use the segmented button and the select control as follows:

- For a limited set of views (2-3), use the segmented button for desktop and tablet devices. Replace it with a select control if there is not enough screen space.
- If the number of views can change or is larger than 3, use the select control.

For more information, see [multiple views](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#content-area) for list reports.

### Search

For trees with a large number of items, consider adding a [search field](https://www.sap.com/design-system/fiori-design-web/ui-elements/search/). Use a search field only if there is no other way to search within the tree (for example, if there is no additional [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/)).

Place the search field on the right side of the toolbar. Since the search field cannot be moved into the overflow menu, always provide a minimum width.

Ideally, search for results in all columns. As a minimum, search in all currently visible columns.

For more information, see [Search](https://www.sap.com/design-system/fiori-design-web/ui-elements/search/).

### Create / Add

Use a text [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for _Create_ or _Add_ actions. If the _Create_ or _Add_ action is a main function, never move it into the overflow.

Insert the new item at the following position:

- If a single node is selected, insert it as a child item to this node
- If a single leaf is selected, insert it as a sibling to this leaf (within the same node)
- If no item is selected, insert it into the visible “root” node

If multiple items are selected, disable the _Create_ / _Add_ button.

More information: [Object Handling (Create, Edit, Delete)](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects)

### Edit

There are several options for editing a tree:

#### Edit a Single Item

To allow the user to edit a single item, show an icon-only _Edit_ button at the end of the item (depending on the tree control, use sap.m.TreeItemBase, property: type, value: sap.m.ListType.Detail or sap.m.ListType.DetailAndActive; or row actions). The user can click the button to trigger the edit event. Use this event to make the item editable.

#### Mass Editing

See: [Object Handling - Mass Edit](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing)

#### Edit the Whole Tree

To let the user edit a whole tree, use a text-only _Edit_ button. When the user triggers the edit action, switch the table to edit mode. In edit mode, don’t show the _Edit_ button and add the finalizing actions _Save_ and _Cancel_ instead. Remove any actions that are meaningless in edit mode. Keep the view settings available.

More information: [Object Handling (Create, Edit, Delete)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/)

### Delete / Remove

Use a text button for _Delete_ or _Remove_ actions. In most cases, _Delete_ is used together with _Create_, while _Remove_ is used together with 
If the _Delete_ or _Remove_ action is a main function, never move it into the overflow.

More information: [Object Handling (Create, Edit, Delete)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/)

### Cut, Copy, Paste

Use icon-only buttons for _Cut_ and for _Copy_. Offer these actions if the tree structure is editable. Always pair them with drag and drop.

For _Paste_, use either an icon-only button or an icon-only [menu button](https://www.sap.com/design-system/fiori-design-web/v1-130/ui-elements/button/#menu-button). In the menu, offer:

- _Paste_: to paste cut/copied rows
- _Paste from Spreadsheet_: to create new rows with data from the clipboard. Since the clipboard can’t be accessed directly, use this button to show a hint on how to paste via shortcut (**Ctrl+V**) or browser context menu.

When pasting, insert the item(s) in the following position:

- If a single node is selected, insert it as a child item to this node
- If a single leaf is selected, insert it as a sibling to this leaf (within the same node)
- If no item is selected, insert it into the visible “root” node

### Collapse All, Expand All

Use icon-only [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for _Collapse All_ and _Expand All_.

_Collapse All_ closes all nodes up to the visible root level: only items on the first visible level are shown. _Expand All_ opens all nodes down to the lowest level: all items are visible.

> **Hint:** To implement the _Expand All_ option _,_ use the expandToLevel method and define a very high number of expendable
levels. Bear in mind that expanding every single level takes time, which can have an adverse effect on performance if
you are working with deep trees. Weigh this up very carefully before offering _Expand All_ for deep trees.

### Sort, Filter, Group

When the user chooses one of these actions, open the [view settings dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/view-settings-dialog/) or the [P13n Dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) with only the corresponding settings.

- If sorting, filtering, and/or grouping is a common use case in your app, offer one, two, or all three of the corresponding features. Don’t provide these features if the tree is expected to have only a small number of entries (up to 20 in most cases).
- If filtering is a main use case, don’t offer filtering on the tree toolbar; use the [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) instead.

Only use the view settings you really need. For example, don’t offer grouping if it doesn’t support your use case.

Ensure a consistent user experience. When a user reopens the app and [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) is not used, show the tree with the same view settings last defined by this user.

For more information, see [Table Personalization](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization).

### Column Settings

Use the [table personalization dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/) or the [P13n Dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) for adding, removing, and rearranging columns.

Offer column settings if you need more columns than those that fit on a tablet screen (which is usually five) to fulfill 80% of your main use cases.

Ensure a consistent user experience. When a user reopens the app and if [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) is not used, show the tree with the same column settings last defined by this user.

For more information, see [Table Personalization](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization).

### Maximize / Minimize

Use an icon-only [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for _Maximize_ or _Minimize_. Offer the _Maximize_ button to open the same tree sized to fit the full screen. When maximized, offer the _Minimize_ button to go back to the standard view.

### Export to Spreadsheet

The [Export to Spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) action allows the user to export table rows. It is represented by an icon-only [menu button](https://www.sap.com/design-system/fiori-design-web/v1-130/ui-elements/button/#menu-button).

### Print

The action for printing tree items is represented by an icon-only [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/).

### View Switch

View switches are right-aligned in the toolbar and allow the user to switch between different [chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/) types and different controls for displaying items (for example [list](https://www.sap.com/design-system/fiori-design-web/ui-elements/list-overview/), [grid list](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-list/), [tree](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree/), [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/)). Provide the view switch if a chart relies on subtle color differences or gradients of color. In these cases, users with visual impairments can switch to the tree view.

Switches are optional: they don’t have to be provided if there is no need to switch between different charts or trees.

Define the number of chart types and switches with care. Offer only chart types that help to visualize the respective data and that best assist the user. Ideally, offer no more than three types of visualization.

The sequence of chart type switches is not fixed. Sort them in order of importance.

The chart type currently in use is highlighted. To show this, use a [segmented button](https://www.sap.com/design-system/fiori-design-web/v1-130/ui-elements/button/#segmented-button) with icons.

For more information about the icons and the chart types they represent, see [Chart Toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-toolbar/).

### Overflow

More information: [Toolbar Overview – Overflow](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow-generic).

## Styles

On the tree toolbar, use the following button styles:

- If the single primary action for the whole page is on the tree toolbar, use the emphasized button style.
- if the single primary action for the whole page is not on the tree toolbar, you can still highlight the most important button by using the ghost button style.
- For secondary actions and negative path actions, use the transparent button style.
- For split buttons and menu buttons, use the transparent button style.
- Don’t use semantic button styles on the tree toolbar.

For more information, see [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) and [Action Placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement).

## Guidelines

To indicate if an action can be applied to the current selection:
- Enable the action if it always works, regardless of whether or not items are selected.
- Enable the action if it can be applied to all selected items.
- Enable the action if it can be applied to some of the selected items. If the action is triggered, show a [message](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/) that informs the user how many items are affected. Let the user choose whether to apply the action anyway or cancel it.
- Only disable the action if it can be applied to none of the selected items.
For more information, see [UI Element States](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states).
If the items are still available after the action was applied, keep them selected.

For further guidelines, see [Toolbar Overview – Guidelines](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/#guidelines).

---

## value-help-dialog

The value help dialog is a UI pattern that helps the user **search and select** single and multiple values. The user can also **define conditions**.

The value help dialog is generally called from an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) or a [multi-input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/) by clicking the selection icon (value help icon) of the input field.

## Usage

### Use the value help dialog if:

- The user is searching within a dataset that contains more than 1,000 items.
- The user needs to use different attributes to find an object (such as city, company name, and so on).
- The user needs to define conditions, such as ranges and exclusions.

### Do not use the value help dialog if:

- There is a simpler control that fits the use case. Always start with the least complex control. For example, use the select control if the user needs to select only one item from a short list.

> **Information:** For more information on which selection control to choose, see the [selection control overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#choosing-the-right-control).

## Responsiveness

The behavior of the value help dialog on a phone differs from its behavior on a tablet or desktop device. Both the navigation and the positioning of the selection area differ depending on the device.

_Value help dialog - Sizes L and XL_          | _Value help dialog - Size M_          | _Value help dialog - Size S_

## Components

The value help dialog contains the following components:

1\) [Header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#header-1)
2\) [Icon tab bar / list control (phone)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/#icon-tab-bar-list-control-phone-2)
3\) [Search template (optional)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#search-template-3)
4\) [Basic search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#basic-search-4)
5\) [_Go_ button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#go-button-5)
6\) [Result list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#result-list-6)
7\) [Selected items and conditions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#selected-items-and-conditions-7)
8\) [Footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#footer-toolbar-8)
9\) [Filters](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#filters-9)
10\) [Area for defining conditions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#area-for-defining-conditions-10), such as ranges and exclusions

#### Components of the Value Help Dialog

Carousel (full-width)

### Header (1)

The header bar contains the dialog title. See the [Guidelines](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#guidelines) section below.

### Icon Tab Bar / List Control (Phone) (2)

Depending on the device, the following controls are used to display the content of the value help dialog:

- **Smartphones:** The start dialog provides a list ([sap.m.List](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.m.List)) with the standard list items ([sap.m.StandardListItem](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.m.StandardListItem)), _Search and Select_, and _Define Conditions_ to navigate between the different dialogs.
- **Tablet and desktop devices:** The value help dialog contains an icon tab bar ([sap.m.IconTabBar](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.IconTabBarNoIcons/preview)) to navigate between the _Search and Select_ and the _Define Conditions_ tab.
- Both controls have a counter in the title that indicates the number of items/conditions selected.

### Search Template (3)

Search templates allow the user to display different or additional fields in the filter area and result list. Depending on the use case, the user can switch between the different search templates in order to use different fields when searching. For example, the search template “Customer (by Company Code)” displays the additional field “Company Code” in the filter area and result list.

### Basic Search (4)

The basic search finds all results that are somehow related to the input. For example, the search term “A” returns all the results containing the letter “A”.

Always offer the basic search in the value help dialog. Position the basic search to the right of the search template control. If there is no search template control, left-align the basic search.

### _Go_ Button (5)

The _Go_ button triggers the search and filters the result list.

### Result List (6)

- The result list is populated on initial load by default.
- If you transferred values from the input field to the basic search field of the value help dialog, the results are filtered accordingly. Only the entered (or modified) value is transferred to the basic search. Type-ahead suggestions are ignored. The search is triggered automatically when the dialog opens.
- If available, display the ID and description of the business object in the first and second columns. Display additional information in the next columns.
- We recommend a maximum of five columns in the result list.

### Selected Items and Conditions (7)

The selected items and conditions are displayed in a tokenizer (see [Token](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/token/) for more information). Each selected item or condition is displayed as one token.

There is no longer a visual difference between included and excluded items and conditions. They are now differentiated using operators (see [Using the Filters](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/value-help-dialog/#using-the-filters)).

### Footer Toolbar (8)

The footer bar offers the _OK_ and _Cancel_ buttons.

### Filters (9)

The filter area offers a filter field for each column in the result list. In some cases, there can be specific filter fields that do not have a corresponding column on the UI. These fields typically come from the back-end service. Initially, the filter area is hidden.

For the basic search with filters, the filter bar ([sap.ui.comp.filterbar.FilterBar](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.ui.comp.filterbar.FilterBar/properties)) is implemented in advanced mode. Advanced mode differs from the basic mode in the following ways:

- There is no _Filters_ link or a dialog to make additional filter fields visible. All filter fields are added automatically to the filter area.
- There is a toggle button to show and hide the filters.
- In each of the filter fields, users can use operators like “between” or “lower than” to define conditions.

Always hide the filter area in the value help dialog by default. Only show the filter area by default if the basic search can’t be provided.

Note that the value help icon of the _Product ID_ field in the current value help dialog will open only the _Define Conditions_ screen. The full value help dialog is not shown in order to prevent endless loops. For example, the value help icon of the _Product Name_ or _Category_ field in the value help for a _Product_ field will navigate directly to the _Define Conditions: Product_ screen.

#### Using the Filters

Users can enter operators (such as “**=**“) to define the conditions directly within the field without opening the _Define Conditions_ tab.

Default (col-1)

Table (col-1)

Operator                     | Input Notation                                                | Example

between                      | value[…]{color=pink-8}value                                  | 000 … 100

equal to                     | [=value]{color=pink-8}                                       | \=0001

contains                     | [\*]{color=pink-8}value[\*]{color=pink-8}                   | \*1\*

starts with                  | value[\*]{color=pink-8}                                      | 001\*

ends with                    | [\*]{color=pink-8}value                                      | \*5

less than                    | [<]{color=pink-8}value                                       | <100

less than or equal to        | [<=]{color=pink-8}value                                      | <=200

greater than                 | [>]{color=pink-8}value                                       | \>0300

greater than or equal to     | [>=]{color=pink-8}value                                      | \>=0500

not between                  | [!(]{color=pink-8} value[…]{color=pink-8}value              | !(000 … 100)
[)]{color=pink-8}
not equal to                 | [!(=]{color=pink-8}value [)]{color=pink-8}                  | !(=0)

does not contain             | [!(\*]{color=pink-8}value[\*)]{color=pink-8}                | !(\*1\*)

does not start with          | [!(]{color=pink-8}value[\*)]{color=pink-8}                  | !(001\*)

does not end with            | [!(]{color=pink-8}[\*]{color=pink-8}value[)]{color=pink-8} | !(\*5)

not less than                | [!(<]{color=pink-8}value [)]{color=pink-8}                  | !(<100)

not less than or equal to    | [!(<=]{color=pink-8}value [)]{color=pink-8}                 | !(<=200)

not greater than             | [!(>]{color=pink-8}value [)]{color=pink-8}                  | !(>0300)

not greater than or equal to | [!(>=]{color=pink-8}value [)]{color=pink-8}                 | !(>=0500)

empty                        | [\<empty>]{color=pink-8}                                     | \<empty>

not empty                    | [!(]{color=pink-8}[\<empty>)]{color=pink-8}                 | !(\<empty>)

Default (col-2)

Default (col-3)

Default (col-3)

##### Note:
Depending on the underlying field, the operators may be labeled differently in the [Define Conditions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/#area-for-defining-conditions-10) area. This doesn’t affect the input notation, which is based on the operator logic and remains constant.

Default (col-3)

##### Example: Operators for Date Fields

Table (col-3)

Operator Label

before

before or on

after

after or on

Section Metadata

style

Users must use the following notation to get results:
Default (col-1)

### Area for Defining Conditions (10)

Default (col-1)

In the **_Define Conditions_** tab, you can use the following operators to define single and multiple conditions:
- between
- equal to
- contains
- starts with
- ends with
- less than
- less than or equal to
- greater than
- greater than or equal to
- empty
- not between
- not equal to
- does not contains
- does not start with
- does not end with
- not less than
- not less than or equal to
- not greater than
- not greater than or equal to
- not empty
For convenience, the operators are grouped into two categories: _Include_ and _Exclude_.
For Boolean attributes, where only two values are available, the operator dropdown in the condition panel is
read-only. Users can pick one of the values from the combo box.
You can also use a combo box if the possible values for a condition are fixed. Users can then choose the value they
need from the list.
Each condition is displayed as a token in the _Selected Items and Conditions_ tokenizer.

> **Information:** The operator dropdown list may not contain all the operators listed above. The type of field value determines which
operators are available.
The type of field value also determines how the operators are labeled. For example, if the field is a date field, the
operator labels “less than” and “greater than” change to “before” and “after”.

> **Hint:** For information on how to manage white space characters (blanks) when users copy and paste text into input controls, see [Removing Leading and Trailing White Space](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

Carousel (full-width, col-2)

Section Metadata

style

## Behavior and Interaction

### Basic Search and Filters

- The basic search (mandatory) and filters (optional) are triggered by clicking the _Go_ button. The search results are shown in the result list.
- If data was already entered in input field from which the user triggered the value help, this data is transferred to the basic search and the results are then filtered accordingly.
- The basic search performs a search across all fields that are displayed in the filter area and the result list.

### Selecting Items and Defining Conditions

Depending on your use case, the value help dialog can offer different selection options:

- Select a single item
- Define a single condition
- Select multiple items
- Define multiple conditions
- Select multiple items and define multiple conditions

Users open the value help dialog by clicking the value help icon in the input field. The next steps depend on the use case and form factor (smartphone or desktop/tablet).

The different use cases are described in the sections below.

#### Select a Single Item (Smartphone)
Tapping the value help icon opens the dialog. As soon as
an item is selected, the value help dialog closes
automatically.
#### Select a Single Item (Desktop/Tablet)
Clicking the value help icon opens the value help dialog for single selection.
The icon tab bar and the _Selected Items and Conditions_ are hidden. As soon
as an item is selected, the value help dialog closes automatically.
#### Define a Single Condition (Smartphone)
Tapping the value help icon opens the _Define Condition_
tab. Users define a condition by choosing the relevant
operator and entering the value or values in the
corresponding input field(s).
In this example, we have defined a range.
#### Define a Single Condition (Desktop/Tablet)
Clicking the value help icon opens the _Define Condition_
tab. Users define a condition by choosing the relevant
operator and entering the value or values in the
corresponding input field(s).
In this example, we have defined a range.
#### Select Multiple Items and Define Multiple Conditions (Smartphone)
Tapping the value help icon displays the start dialog.                                                                                                    | _Start dialog_                                       | _Defining multiple conditions (smartphone)_
- The _Search and Select_ tab is used to select multiple items.
- The _Define Conditions_ tab is used to define multiple conditions.
- The counters in the titles of both tabs represent the number of                                                                                         | _Selecting multiple items on a smartphone_           | _Filters on a smartphone_
selected items/defined conditions.
All selected items and conditions are added as tokens to the _Selected Items and Conditions (n)_ field at the bottom of the start dialog. The counter _n_
indicates the combined number of items selected and conditions
defined.
#### Select Multiple Items and Define Multiple Conditions (Desktop/Tablet)
Clicking the value help icon displays the icon tab bar with the _Search and Select_ and _Define Conditions_ tabs.
- The _Search and Select_ tab is used to select multiple items
- The _Define Conditions_ tab is used to define multiple conditions.

All selected items and conditions are added as tokens to the _Selected Items and Conditions (n)_ field at the bottom of the dialog. The counter _n_ indicates the combined number of items selected and conditions defined.
#### Define Multiple Conditions (Smartphone)
Tapping the value help icon opens the start dialog with the _Define Conditions_ tab.                    | _Start dialog_           | _Defining multiple conditions on a smartphone_
The selected values are added as tokens to the _Selected Conditions_ at the bottom of the start dialog.
#### Define Multiple Conditions (Desktop/Tablet)
Clicking the value help icon opens the _Define Conditions_ tab.
The selected values are added as tokens to the _Selected Conditions_ at the bottom of the start dialog.
### Copying and Pasting Multiple Values

The area for defining conditions allows the user to enter
multiple values at once (copied from the clipboard).

Users can paste more than one value into the value input
field. In this case, the condition row repeats with the
previously selected condition and shows one value per
row.
If there is no vertical space for the conditions,
vertical scrolling is added to the top of the dialog.
## Guidelines

### Dialog Title

The dialog title differs depending on the device and whether multiple or single selection is used.

For smartphones:

- Start dialog: _[Object]_ (for example, _Company_)
- Search and Select Dialog: 
- Filters dialog: 
- Define single condition: **Define Condition**
- Define multiple conditions: 
For tablet and desktop devices:

- Selection of multiple items combined with selection of multiple conditions: _[Object]_ (for example, _Company_)
- Single item selection: _Select: [Object]_ (for example, _Select: Company_)
- Define single condition: _Define Condition: [Object]_ (for example, 
- Define multiple conditions: _Define Conditions: [Object]_ (for example, _Define Conditions: Company_)

### Filtering

If necessary, also provide value help for fields offered in the filters. However, do **not** provide the full value help dialog for the ID and description fields of the business object that is being selected. For these two fields, make sure that the value help icon opens only the _Define Conditions_ screen.

For example, in a value help dialog for selecting the customer, do not offer full value help for the _Customer ID_ and _Customer Name_ fields. Instead, try to use the value help in combination with a helpful suggestion.

#### Constant Parameters

You can use constant parameters to pre-filter suggestion lists, dropdowns, and the value help results list. Users can’t change these parameters.

Do not show parameters with constant values as filterable fields in the filter bar of the value help dialog or in the result table columns. Constant values should not be visible to users in any way.

---

## view-settings-dialog

The view settings dialog helps users to sort, filter, or group data within a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) or a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). The dialog is triggered by icon [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) in the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).

## Usage

We recommend making each feature (sort, filter, group) available as a separate button in the table toolbar (see [Button Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/#button-placement) below). Each button then triggers a separate dialog. If specifically required, you can combine the dialogs into one with a segmented button acting as tabs to switch between the sort, filter and group options. Note: In a combined dialog, the _Reset_ button **resets all tabs**.

### Use the view settings dialog if:

- Users need to sort line items in a manageable list or table (up to about 20 columns).
- You need to offer custom filter settings in a manageable list or table (up to about 20 columns).
- Users need to group line items in a manageable list or table (up to about 20 columns).

### Do not use the view settings dialog if:

- You have complex tables (more than about 20 columns).
- Users need to rearrange columns within the table. Use the [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/) instead.
- Users need very specific sort, filter, or column sorting options within complex tables. Use the [P13n dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) instead.

### Button Placement

Use distinct icon buttons for the sort, filter, and group settings. Place the icons in the following order: :sort: _(Sort)_, :filter: _(Filter)_, :group-2: _(Group)_.

Do not place _Sort_, _Filter_, or _Group_ buttons in the footer toolbar if they refer to a table.

For more information about the button placement, see [Sort, Filter, Group (Generic)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/#sort-filter-and-group-generic) in the table toolbar article.

### Sort, Group, and Filter a List

You can also offer the view setting features for a list.

## Responsiveness

The [popover dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) appears as a modal window on desktop and tablet screen sizes, but uses the full screen on smartphones.

The view settings dialog is a composite control that consists of a modal [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) with a maximum of three tabs with lists of attributes. Each helps the user to either sort, filter, or group a table or list. If the use case requires only a sort feature, for example, you can hide the filter and group tabs.

## Behavior and Interaction

The sort, filter, and group features can all be applied to a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) simultaneously.

### Sort

The sort dialog shows two groups of sort settings. The first group
offers general _Ascending_ and _Descending_ sort options. The
second group offers attributes that fit the use case, such as _Product_, _Supplier_, _Weight_, or _Price_.
The attributes can match the table columns, but because a table
column can also contain several data points, such as “Name” and
“Surname”, the attributes allow an attribute to be shown for each
data point.
Users can select attributes using the radio buttons. Clicking _OK_
closes the dialog and shows the table items in the selected order.
If a combined dialog is used, the first tab is the sort feature.
### Filter

The filter dialog can offer a single filter selection list, a multi-filter selection list, or a category list. The category list provides an overview, and allows the user to drill down to detailed filter selection lists.

In a combined view settings dialog, filtering is on the second tab.

#### Filter Selection List – Single Selection

The dialog offers one selection list with radio buttons to select a filter. This list is useful for offering a list of preconfigured filters for a specific use, such as “Products with numbers ‘starting between 100 and 200’ with status ‘in stock’ and color ‘green’”.

#### Filter Selection List – Multi-Selection

You can also offer a multi-selection list. For example, a user might want to show all open items for both “Company A” and “Company D”.

#### Show Selected Only

If the user clicks the :multi-select: button (_Show Selected Only_), only the selected filters are shown (for example, “Company A” and “Company D”). Clicking the button again shows all of the available filter values.

#### Category List

The filter dialog shows a single list of general filter categories depending on the use case, like _Price_ or _Height_. The user chooses a category by clicking the list item, such as _Price_. As this is a simple drilldown, these categories do not have radio buttons. The follow-on dialog shows a list of optional filter settings in the _Price_ category. These filters, such as _Less than 100_, depend on the use case. The user chooses a specific filter setting by selecting one of the radio buttons offered in this list. Clicking _OK_ closes the dialog and shows the table items filtered by the selected attribute. The infobar shows which filter has been set.

#### Free-Form Apps

You can also customize your own filter UIs, for example, to support date picking.

#### Filter Values

Filters can correspond to single values as well as groups, such as “<100.00 EUR”.

#### Filter Reset

The _Reset_ button on the filter tab resets all filter settings.

#### Removing Filters

In single selection lists, offer a _Not Filtered_ option. This enables users to remove existing filters.

### Group

The group dialog shows two groups of attributes. The first group offers a general _Ascending_ or _Descending_ order, which allows the user to select the order in which the defined groups appear. The second group offers attributes that fit the use case, such as _Type_ or _Supplier_.

You can also offer an attribute like _Price_ to group data in a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview).

Users can choose attributes using radio buttons or checkboxes. Clicking _OK_ closes the dialog and shows the table with items grouped below headers.

In a combined view settings dialog, the group feature is the third tab.

#### Naming Group Headers
Be sure to name the group headers as follows: **\<Category Name>: \<Value/Range>**
Examples:
- _Category: Accessories_
- _Supplier: Red Point Stores_.

## Guidelines

On the table toolbar, use different buttons for each function (sort, filter, group). With each button, open the _View Settings_ dialog with just the corresponding tab.

If possible, give users the option not to filter or group. For sorting, this is only necessary if the use case calls for an unsorted list. In all three cases, show this option as the first entry in the list of criteria (remember to include the brackets):

---

## visual-filter-bar

> **Information:** The _Remove/Close_ icons shown in this article do not yet reflect the new _Remove/Close_ icon :decline: defined in the [product standard for UX consistency](https://wiki.wdf.sap.corp/wiki/display/uxc/UXC-013). We will update this article as soon as the new icon is available in the corresponding controls.

## Intro

The visual filter bar offers a unique way of filtering large datasets through visualizations. This helps users to recognize facts and situations, while reducing the number of interaction steps needed to gain insights or to identify significant single instances.

The visual filter bar allows users to combine measures with filter values. For example, a “Product” might have the filter value “Product Name” and the measure might typically be “Revenue”, “Cost”, or “Quantity”. If you opt for the measure “Revenue”, the chart would show the “Revenue by Product”, enabling the user to filter the data by choosing a particular product name and its revenue.

Chart visualization increases the joy of use and helps users to see relevant data more quickly. For filtering, the visual filter bar uses all of the three types of [interactive chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/): [bar chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-bar-chart/), [line chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-line-chart/) and [donut chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-donut-chart/).

## Usage

### Use the visual filter bar if:

- You are using [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) floorplan.
- Users need to see both the result and the direct impact of their filter settings in a chart representation.
- You would like to give users a condensed overview of the data in the dataset.

### Do not use the visual filter bar if:

- You are not using the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) floorplan.
- Users are not interested in seeing the impact or their filter settings directly in a chart representation.
- Users are not interested in a condensed overview of the data in the dataset.

## Responsiveness

The visual filter bar itself is fully responsive. For overall responsiveness within the analytical list page, see the [Analytical List Page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#responsiveness) article.

## Layout

The visual filter bar is a composite control built with other responsive controls, such as the header container and the interactive charts. It is used in the header area of the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/), which incorporates the [dynamic page layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).

### Collapsed Visual Filter Bar

The [collapsed](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#collapsed-header) visual filter bar takes up less space, leaving most of the screen for displaying the actual results. However, the variant selector in the upper left corner is still available for switching between [variants](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/). The user can expand or collapse the filter bar by clicking the header. If required by the use case, you can expand the filter bar by default.

On desktop and tablet devices, the collapsed filter bar shows a summary of the filters currently applied. The format of the summary text is:

- Either _1 filter active:_ or _\<n> filters active:_, where “n” stands for the number of applied filters.
- A comma-separated list of the currently applied filters for up to five filters. If there are more, an ellipsis (…) shows at the end of the string.

If no filters have been applied, the summary text is: 
### Expanded Visual Filter Bar

The [expanded](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#expanded-header) visual filter bar also shows a user-defined filter subset of the selected variant. The _Adapt Filters_ link opens the visual filter dialog, where the user can add or hide visual filters. The switch button on the top right switches between the visual filter bar and the standard (input-based) filter bar. The _Go_ button triggers the filter. Note that the _Go_ button is only shown in manual update mode.

## Structure

In order to achieve filtering through visualization, the visual filter bar uses [interactive charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/). Currently, three [interactive chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/) types are available: [bar chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-bar-chart/), [line chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-line-chart/), and [donut chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-donut-chart/). Each chart has a dedicated area for the chart title, the _(x)_ link showing the number of applied filters, and the value help icon :value-help: . When the user clicks the _(x)_ link, a popover containing the selected filter values appears. The value help icon opens a [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/).

### Filter Title Area
In addition to the chart title, the filter title area
also contains a value help icon :value-help: with _(x)_
indicator, where “x” stands for the number of applied
filters. Clicking the icon opens the value help dialog.
The value help dialog can be replaced with the select
popover icon :navigation-down-arrow: .
Use the following naming convention for the filter title,
using title case: \<Measure Name> by \<Dimension Name> \
\<Scale Factor> \<Unit of Measure>. For example, _Project
Costs by Project \| K EUR, Sales Volume by Commodity \| M
PC_.
### Bar Chart
The [interactive bar chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-bar-chart/)
in the visual filter bar can display only three bars. Based on the measure, they can be sorted ascending or descending. This makes it easy to
compare the items and see the highest and lowest values.
### Line Chart
The [interactive line chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-line-chart/) is used to display variations over a specified period of time. This chart is only used for displaying a time series and can contain only the first or last six time points (for example, last six days, last six months, and so on).
Do not use a [line chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-line-chart/) to show categories. Instead, use a [bar chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-bar-chart/).
### Donut Chart
The [interactive donut chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-donut-chart/) is best used to display up to three slices. Use this chart if the exact value of each slice is not needed for filtering.
In the visual filter bar, only the top or bottom two values are shown; the rest are aggregated into the _Other_ section.
### Visual Filter Selections

Any data point or segment selected in a chart remains selected when the user changes the measure, chart type, or sort order in any of the charts.

If a selected record falls outside the top or bottom three records being displayed, the _(x)_ status above the chart shows the number of selected records.

> **Hint:** Do not bind a single visual filter (chart) to more than one ID. This will lead to an incorrectly derived item count
in the _(x)_ link. Define separate visual filters instead. If this split is not desired, create a calculated column
(dimension) in the back end to represent this combined ID.

Don't                                           | Do                                      | Do
_Don't use a relative format for time_          | _Use titles that give context_          | _Add the year in the title if you display only 4 quarters_

### Visual Filter Dialog
The filter dialog is launched by clicking the _Adapt Filters (number of applied filters)_
link in the upper right filter area. In the filter dialog for visual filters, the user can
choose which filter fields are shown in the visual filter bar.
In this dialog, the user can make the following changes:
- Add visual filters
- Delete visual filters
- Hide visual filters in the visual filter bar
- Search for visual filters
- Change the sort order of each visual filter
- Change the chart type of each visual filter
- Switch to other measures in the visual filter display
The footer toolbar at the bottom of the dialog provides the following functions:
- **_Save_:** Saves your modified filter set variant. _Save_ and _Save As_ can be provided.
- **_Cancel_:** Closes the dialog and undoes all changes.
- **_Restore_**: Restores the initial variant values. You can hide this button if it does
not fit the app use case.
- **_Go_:** Applies the selected filter set.
- **_Clear (optional)_:** Clears all filters. Only use this button if it fits the app use case.
**Visual Filter Configuration**
In the filter dialog, users can configure individual visual
filters using the icons in the filter title area:
- Change the sort order :sort-descending: (not supported
for line charts)
- Switch to a different chart type :horizontal-bar-chart-2:
- Choose between different measures :measure:
## Behavior and Interaction

Unlike [micro charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/micro-chart/), the charts in the visual filter bar are [interactive](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/). If you are using live update mode, selecting a filter value triggers data filtering in the content area. Both single and multiple selection are supported.

### Selecting Filters

In the visual filter, you can make a selection by clicking a chart value. To deselect it, you can either click the same value in the chart again, or click the _(x)_ link showing the number of selected filters, such as _(1)_.

#### Selecting a Filter Value in an Interactive Chart

Carousel (full-width)

Any data point selected in a chart remains selected, even if the user selects a data point in another chart. Filter values also react to each other.

If a selected record in a chart falls outside the displayed filter values, the selection is visible in the _(x)_ link above the chart, where _(x)_ represents the number of selected records.

Users can select more filter values with the [value help](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) or select popover.

#### Selecting a Filter Value Using the Value Help

Carousel (full-width)

#### Selecting a Filter Value Using Select Popover

Carousel (full-width)

### Personalizing the Visual Filter Bar

**Add Visual Filter**

Users can add more visual filters via the visual filter dialog. The additional filter groups appear below the _Basic_ filter group, which contains the standard filters for the application. While the _Basic_ filter group is always visible, the additional filter groups are initially collapsed.

The _More (x)_ link in the filter group header indicates the number of filters that have not yet been added, for example _More (2)_. Clicking this link opens a dialog for selecting the additional filter. Once a filter has been selected, it displays under the group header in the visual filter dialog, and the user can customize the individual filter settings (sort order, chart type, measure, display in the visual filter bar).

If all filters in a group have already been added in the visual filter dialog, the _More (x)_ link label in the filter group title switches to _Change Filters_.

Carousel (full-width)

**Hide Visual Filter**

Users can hide a filter by deselecting the checkbox next to the relevant filter in the filter dialog. This allows the user to hide filters that are rarely changed from the extended filter bar, giving complex filters a more lightweight appearance.

Carousel (full-width)

## Guidelines

### Live Update / Manual Update

The visual filter bar is available in two modes: live update and manual update. In both modes the visual filter charts refresh based on the selection.

**Live Update**

In live update mode, the filter bar reacts instantly to every input change. Because the content area updates automatically whenever the user changes a filter selection, the _Go_ button is not necessary, and is not shown.

**Manual Update**

In manual update mode, the filter results are only updated when the user clicks the _Go_ button that is shown in manual mode. Pressing ENTER on the keyboard also triggers the filter.

**Recommendation**

In general, use live update mode, which is more convenient for users. However, consider using manual update mode if the user has to configure multiple filters to obtain a useful result set, or if you expect the resulting traffic to be excessively high.

### Chart Types

Choosing the right chart type as a representation for a particular filter will not only increase the joy of use but also will convey the right information to the user. Inappropriate chart types can mislead the user during the filtering process.

In the visual filter bar, you can choose between three [interactive charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/): [bar chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-bar-chart/), [line chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-line-chart/), and [donut chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-donut-chart/).

**Recommendation**

- If you expect users to be working with a large number of datasets, and your scenario does not depict time periods, consider using a **bar chart**.
- If you want to measure trends and changes over time when filtering, consider using the **line chart**.
- If your scenario requires filtering by parts of a whole and has only a small number of datasets, consider using the **donut chart**.

### Filter Selection

In the visual filter, users can make a selection by clicking a chart value or by using the [value help](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) to select data points that are not visible. Depending on the number of available data points, you can use the value help or the select popover.

**Recommendation**

If your scenario involves filtering 200 or more filter values, consider using the value help. For filtering less than 200 values, we recommend using the select popover.

### Scaling Factor

Always use a scaling factor to display values larger than 1000. The scaling factor is usually displayed in the interactive chart header. Do not repeat the scaling factor inside the chart itself.

**Recommendation**

Due to the limited space inside the chart, we recommend showing a maximum of 3 digits before the decimal point.

---

## web-card-system

Cards are containers for a few short, related pieces of information. They can also serve as an entry point, with a preview of the most pertinent information or a teaser pointing to more details on a given topic or issue.

### Consistent Framework, Flexible Content

The web card system provides definitions for several building blocks to create a variety of different cards. It is composed of optional block elements with an extendable set of UI components within the card header and footer. The card body can show any combination of UI components. In contrast to specific card types, this more modular approach enables you to fulfill specific product requirements by allowing a flexible combination of UI components (like a list, calendar, KPI, and more). At the same time, the system ensures consistency by offering an enhanced set of predefined building blocks. It has been designed to work with flexible sizes for multiple form factors and grid layouts.

## When to Use

Do
Use cards:
- As an entry point to an app.
- If you want the user to focus on a single object or
topic, or on a group of objects. It should be a short
representation of a conceptual unit.
## Top Tips

- Don’t overload the user by including an excessive number of UI elements within a card. A card should present information in a compact and easily scannable format.
- Don’t place unrelated elements within a card.
- Indicate clearly which parts of the cards are interactive and make them consistent with other cards in the same environment.
- Don’t put a scrollbar inside the card. The card is used to convey a key message on one subject. Users can navigate to the detail view for the full list or content.
- Don’t mix different navigation or interaction paradigms within a set of cards in one section or on the same page.
- Don’t try to build complex, small apps inside the card that require navigation flows. It doesn’t hurt users to quickly navigate away from a page to better focus on a task.

## Anatomy

undefined

1. **Card Canvas:** The card canvas is the element that holds the media, header, body, and footer of the card. The usage of these blocks is optional, but recommended.
2. **Card Header:** The card header contains essential information about the card and its associated detail page content. It provides a quick overview of key details, such as the title, subtitle, and status of the card.
   For more information, see the [Card Header](https://www.sap.com/design-system/fiori-design-web/ui-elements/web-card-system/card-header/) article.
3. **Card Body:** The card body is the central part of a card that is used to provide additional information alongside the content shown in the card header. This allows you to present in-depth details, data, or graphics relevant to the card context.
4. **Card Footer:** The card footer, located at the bottom of the card, is used for important or routine actions that directly impact the card functionality, such as “Approve’ or “Submit” actions.
5. **Media:** You can add media to highlight a card, combining it flexibly with other blocks. As an optional decorative element, media allows you to include an image that matches the card context. The media block can contain a background color or an image that spans the entire width of the card. It can also display a combination of an image and a text block with a solid background (for example, in cards with larger dimensions).
   For more information, see the [Media](https://www.sap.com/design-system/fiori-design-web/ui-elements/web-card-system/media-in-web-card-system/) article.
6. **Badge:** You can use badges to display brief and important information about card status, such as _New_, _Updated_, or _Pinned_ (icon).
   For more information, see the [Badge](https://www.sap.com/design-system/fiori-design-web/ui-elements/web-card-system/web-card-system-badge/) article.

## Types

The flexible card container allows a variety of cards to be created for any use case.

## Behavior and Interaction

A card can be interactive, meaning a card can be selected as a whole, or non-interactive, used just as a container. In addition, a card can contain interactive elements.

### Interactive Card

When a user selects a card, the visualization of the card changes, giving users clear and immediate feedback on the selection state.

##### Example: Interactive card with interactive elements (buttons)

1. **Regular interactive card**
2. **Hover on interactive card**
3. **Press on interactive element**

When the user selects a card, the system navigates to a designated page or view that provides more details, such as a list report page or an object details page.

### Non-Interactive Card

When a specific element within the card, such as list item or link, is designed to be interactive, it provides a distinct visual indication for its interactivity. Clicking the item or link triggers navigation to a dedicated details page or view for that specific element.

##### Example: Non-interactive card containing interactive elements (link and buttons)

1. **Regular non-interactive card**
2. **Hover on interactive element**
3. **Press on interactive element**

### Navigation

Default (col-1)

The following options are available for enabling and indicating the navigation option:
1. **Whole card is interactive** Navigates to a designated application, page, or view that provides more details.
2. **Interactive header (alternative to 1.)** Navigates to a designated application, page, or view that provides more details.
3. **Interactive element inside the card header or body** Triggers navigation to a dedicated details page for that specific element.
4. **Tertiary button (link) in the footer** Navigates to a page or view where users can get more information or see more items (for example, _View Details_ or an application name).

> **Guideline:** - Use a consistent navigation pattern within a group of cards. Don’t force users to search for interactive areas on cards. If you have a mix of cards with and without a navigation
- option, we recommend using a tertiary button in the footer for navigating to a page or view with more information.
For more information, see [Card Navigation in the Web Card System](https://www.sap.com/design-system/fiori-design-web/ui-elements/web-card-system/web-card-system-card-navigation/).

Section Metadata

style

### Actions on Cards

There are three ways to offer actions on a card.

1. **Header:** The card context menu in the card header typically houses actions provided by the host environment, such as actions to refresh, favorite, bookmark, or remove the card.
2. **Body:** Actions that affect the card content are applied close to components in the card body, such as buttons or links in list items.
3. **Footer**: The footer holds actions that apply to the entity or business object represented by the card, like _Approve/Reject_ for a task, or _Add to Cart_ for a product.

## Responsive Behavior

### Resizing the Card

When the user resizes the card, the header, body, footer, and media elements respond as follows.

**1. Header**
- The avatar, title, and subtitle stay left aligned.
- The button and counter stay right aligned.
- If the card width is decreased, the text of title and subtitle wrap to two or a maximum of three lines (recommended). After that, the text truncates with the ellipsis (…).
- The counter never truncates.
For information on the responsive behavior for other header blocks (numeric header, extended header), see [Card Header in the Web Card System](https://www.sap.com/design-system/fiori-design-web/ui-elements/web-card-system/card-header/).
**2. Body**
- The components inside the card body follow the responsive behavior of the components.
You can define the card size as fixed (for example, to display cards as tiles) or fill the container. If you opt to fill the container, the card adapts its size according to the size of the container in which it is placed.

> **Guideline:** - If the card size isn’t fixed, set the card height to “hug the content”. The card then adapts its height to fit all
contents inside.
- Set a minimum card width to make sure the contents inside the card are easy to read.
- Set a maximum card width to avoid too much blank space on a card.

---