# SAP Fiori Page Types and Floorplans

## Floorplan Overview

# Page Layouts and Floorplans

## Intro

This article provides an overview of how SAP Fiori layouts and floorplans are used to build application pages.

## Page Layouts vs. Floorplans

The standard page **layout** in SAP Fiori is the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/), which is made up of a header, content area, and footer toolbar.

**Floorplans** are usually based on the dynamic page. Floorplans serve specific use cases and therefore come with a specific combination of UI elements in the header, content area, and footer toolbar.

The following visual shows the composition of the dynamic page layout and how the elements of a list report floorplan are built into it. Never insert a whole floorplan into just the content area of the dynamic page layout.

## Full Screen vs. Flexible Column Layout

You can decide whether your app uses a full screen layout (one page at a time) or a [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) for list-detail relationships (up to three pages side by side). The flexible column layout enables fast and fluid navigation between pages.

Default (col-1)

#### More Information
- For a general introduction, see [Get to know the information architecture: Layouts, floorplans, UI elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#get-to-know-the-information-architecture-layouts-floorplans-ui-elements).
- For a description of all floorplans, their characteristics, and when to use them, see [When to use which floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/when-to-use-which-floorplan).
- For structuring business data in the page header and content areas, SAP Fiori offers a variety of layouts and containers. Examples are [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) and [the dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/).
Find more in the UI Elements section _Form / Layout / Container_.

> **Information:** To control and optimize the left and right spacing between header and content area and between UI elements (such as tables and forms), we offer a [responsive spacing system](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/layouts/spacing).

Section Metadata

style

## Additional Layouts

The following layouts have been designed for special use cases:

Table

Layout

[Comparison](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-pattern/)
side-by-side. This makes it easier to compare the
characteristics of multiple items.

[Multi Instance](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/multi-instance-handling-floorplan/)
view. After selecting items from a list, the user opens
them in a tab container.

---

## Floorplans > Analytical List Page > Usage

> **Information:** This floorplan is implemented with [SAP Fiori Elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).

## Intro

The analytical list page (ALP) offers a unique way to analyze data step by step from different perspectives, to investigate a root cause through drilldown, and to act on transactional content. All this can be done seamlessly within one page. The purpose of the analytical list page is to identify interesting areas within datasets or significant single instances using data visualization and business intelligence.

Visualizations help users to recognize facts and situations, and reduce the number of interaction steps needed to gain insights or to identify significant single instances. Chart visualization increases the joy of use, and enables users to spot relevant data more quickly.

The main target group are users who work on transactional content. They benefit from fully transparent business object data and direct access to business actions. In addition, they have access to analytical views and functions without having to switch between systems. These include KPIs, a visual filter where filter values are enriched by measures and visualizations, and a combined table/chart view with drill-in capabilities (hybrid view). Users can interact with the chart to dig deep into the data. The visualization enables them to identify spikes, deviations and abnormalities more quickly, and to take appropriate action right away.

## Usage

### Use the analytical list page if:

- Users need to extract key information to understand the current situation or identify a root cause. The way the data is presented is crucial for giving them the insights they need to take the right action.
- Users need a way to analyze data step by step from different perspectives, investigate a root cause through drilldown, and act on transactional content within one page.
- In addition to the filtered dataset, users need to see the impact of their filter settings in a chart (visual filter).
- Users need to switch between integrated chart and table views (hybrid view).
- Users need to see the impact of their action on a global key performance indicator (KPI).
- Users need to find and act on relevant items out of a large set of items by searching, filtering, sorting, grouping, drilling down, and slicing and dicing.

### Do not use the analytical list page if:

- Drilldown is rarely used, not used at all, or is only needed after navigating to another page, rather than as free or flexible drilldown within the page itself. In this case, a [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) might be sufficient for your use case.
- Users need different visualizations for the entire dataset (for example, as a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) or [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-chart/)), but don’t need to work with both visualizations on the same page (for example, in a reporting scenario). In this case, a list report might be sufficient.
- Users need to find and act on relevant items from within a large set of items by searching, filtering, sorting, and grouping, without using drilldown or “slice and dice”. In this case, consider using a [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/).
- Users need to work with multiple views of the same content, for example on items that are “Open”, “In Process”, or “Completed”. They want to be able to switch views using tabs, segmented buttons, or a select control. In this case, consider using a [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/).
- Users need to see or edit a single item with all its details. Use the [object page floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) instead.
- Users need to find a specific item, and the item or an identifying data point is known to the user (such as a code). In this case, use the [initial page floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/).
- Users need to work through a comparably small set of items, one by one. In this case, use the [worklist floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/).
- Users have a trivial use case that does require the use of a chart, but that do not involve identifying a root cause, analyzing data, or drilldown. Instead, use a [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) with a table/chart switch.

## Structure

This section describes the basic layout of the analytical list page, as well as the different layout variants.

### Basic Layout

The [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/) is above the analytical list page. The page itself uses the [dynamic page layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) and has two main areas:
1. **[Analytical list page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#analytical-list-page-header)**:
The page header is the filter area. Users can expand and collapse the header using the [expand/collapse header icon](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#expandcollapse-header-feature).
2. **[Analytical list page content area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#analytical-list-page-content-area)**:
The content area shows the content for the chosen filters.
All elements are described in more detail in the [Components](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#components) section below.
### Layout Variants

The layout of the analytical list page is quite flexible. The display is determined by the header and content views chosen by the user.

- In the expanded page header, users can switch between the [visual filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/visual-filter-bar/) and the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) using the [filter type switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/analytical-list-page/#filter-type-switch).
- In the content area, users can switch between a [hybrid view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#hybrid-view) (chart and table), a [chart-only view](#chart-only-view), or a [table-only view](#table-only-view) using the view switch.

**The analytical list page always offers all of the above layout options.** You cannot restrict the available views at app level. For example, you can’t offer only a visual filter (with no option to show the standard filter bar). Likewise, you can’t show only a table view (with no option to display the hybrid or chart views).

> **Information:** SAP Fiori elements for OData V4 uses the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) and SAP Fiori elements for OData V2 uses the [smart filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-filter-bar-annotations/).

## Responsiveness

The analytical list page is responsive, except for the [global KPIs](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#global-kpi-tags-and-cards). Apps with one or more global KPIs are not supported on screen sizes smaller than size L (desktop).

Likewise, the analytical list page is only fully supported in the flexible column layout if no global KPIs are used. If you use the analytical list page with global KPIs within the flexible column layout, the column should have at least size M.

On size S, the analytical list page supports both the chart-only and table-only views. The table-only view supports only the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/). If no responsive table is available, the chart-only view is displayed without a view switch toggle.
Global KPIs are not supported on size S.
_Chart-only view - Size S_          | _Table-only view - Size S_          | _Chart-only view - Size M_          | _Table-only view - Size M_
## Components

### Analytical List Page Header

The page header can be expanded and collapsed on click. Different content is shown in the expanded and collapsed states. For more information about the basic behavior of the header, see [Dynamic Page Header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header).

#### Collapsed Header

The collapsed page header contains the following elements:
- [Variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#variant-management) (serves as page variant) (mandatory)
- [Global key performance indicator tags](https://www.sap.com/design-system/fiori-design-web/v1-124/page-types/floorplans/analytical-list-page/#global-kpi-tags-and-cards) (= global KPI tags) (optional)
- [Global key performance indicator cards](https://www.sap.com/design-system/fiori-design-web/v1-124/page-types/floorplans/analytical-list-page/#global-kpi-tags-and-cards) (= global KPI cards) (optional)
- [Filter dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#filter-dialog) via the _Adapt Filters_ _(x)_ link. Visible only in live mode. (mandatory)
- [Header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/) with global actions (optional)
- Summary of applied filters
The summary text is:
- Either _1 filter active:_ or _\<n> filters active:_, where “n” stands for the number of applied filters.
- A comma-separated list of the currently applied filters for up to five filters. If there are more, an ellipsis (…) shows at the end of the string.
If no filters have been applied, the summary text is: _No filters active_
#### Expanded Header

Initially when the app is launched the header is expanded by default. The expanded page header contains the following elements:
- [Variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#variant-management) (serves as page variant) (mandatory)
- [Global key performance indicator tags](https://www.sap.com/design-system/fiori-design-web/v1-124/page-types/floorplans/analytical-list-page/#global-kpi-tags-and-cards) (= global KPI tags) (optional)
- [Global key performance indicator cards](https://www.sap.com/design-system/fiori-design-web/v1-124/page-types/floorplans/analytical-list-page/#global-kpi-tags-and-cards) (= global KPI cards) (optional)
- [Filter dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#filter-dialog) via the _Adapt Filters_ _(x)_ link (mandatory)
- [Header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/) with global actions (optional)
- [Filter area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#filter-area-visual-filter-bar-and-filter-bar), including the [visual filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#visual-filter-bar) and [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) (mandatory)
- [Filter type switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#filter-type-switch) ( :filter-fields: \| :filter-analytics: ) (mandatory)
### Analytical List Page Content Area

The [analytical list page content area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#analytical-list-page-content-area) contains the following elements:
- View switch ( :chart-table-view: \| :vertical-bar-chart: \| :table-view: )

- [Hybrid view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#hybrid-view): View with one chart, chart toolbar, one table, and a table toolbar

- [Chart-only view](#chart-only-view): View with one chart and a chart toolbar

- [Table-only view](#table-only-view): View with one table and a table toolbar

## Analytical List Page Header

### Variant Management

Variant management in the analytical list page allows users to save a page variant whenever there are changes in the underlying structures
of the filter/content area. Variant management for the page is handled by the standard SAPUI5 page [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/).
Currently, the page variant captures the following states across the page:
- Filter view switch state: Visual filter bar or filter bar
- Filter set: The filters set in the visual filter bar and filter bar
- Filter selections: Selected values in the visual filter bar and filter bar
- Content view switch state: hybrid view :chart-table-view: , chart-only view :vertical-bar-chart: , or table-only view :table-view:
- Chart and table configurations, such as measures and dimensions used, sort order, or grouping
- Chart drill-down state, based on the current selections (slice & dice)
- Table entry switch state: _Hide_ ( :hide: ) or _Show_ ( :show: ) selected table records

### Global KPI Tags and Cards

Use a global KPI tag (= global key performance indicator tag) if you would like to show a global KPI related to the task in hand. The global KPI value changes only if an action is executed on the transactional content. For example, the user needs to know the effect of
releasing sales orders on a related global KPI, or the effect of posting an accounting document on certain financial global KPIs.

You can display **a maximum of three** global KPIs. Clicking a global KPI tag opens a [global KPI card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#kpi-card) that displays more details on the KPI.
The global KPI tags and corresponding KPI cards are **independent of the filter area**. This means that global KPI tags do not react to filters set in the visual filter bar and filter bar.
A global KPI tag has four components:
- Global KPI label
- Global KPI value
- Global KPI color and criticality indicator
#### Global KPI Label
The global KPI label is an abbreviation of the complete global KPI title. It is formed using the first three letters of the first
three words of the global KPI title.
Examples: _AMR_ for _Actual Monthly Revenue_, _TAR_ for _Total Advertising Revenue_, or _LPC_ for _Landing Page Conversation Rates_
If there is only one word in the global KPI title, the first three letters of the word are displayed. Example: _CON_ for _Contracts_
If the global KPI title has only two words, only the first letters of these two words are displayed. Examples: _AC_ for _Actual Costs_, _SG_ for _Sales Growth_
#### Global KPI Value
The global KPI value is displayed using a semantic color
and a scaling factor. Relative values are shown with a
percentage sign and one decimal place.
Examples: 0.3%, 82.9%
Absolute values are shown without decimal places, a
currency, or a unit of measure.
Examples: 2K, 75K, 30M, 14B
#### Global KPI Color and Criticality Indicator
The color of the global KPI value is based on the
thresholds defined for the particular KPI in the
annotation. The global KPI tag also uses a line to
indicate the criticality. The color of the line is the
same as that of the global KPI value.
#### Global KPI Card
Clicking the KPI tag opens the [analytical card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/),
which displays more information about the current value of the global KPI, the global KPI target, the deviation from the target, and how the global KPI has
evolved over time.
### Filter Area: Visual Filter Bar and Filter Bar

Default (col-1)

The filter area allows users to filter the result set, which feeds the main content area. The analytical list page comes with two filter types: compact filters in the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/), and the [visual filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/visual-filter-bar/). Always **design both** visual filters and compact filters ([filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/)) for your app. **We recommend setting the visual filter bar as the default,** but this is no longer mandatory. You can opt to use the (compact) [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) as the default if your app has the required parameter values, if your main use case involves date ranges, or if your users often need to combine multiple filters in different ways.
Currently, any visual filter configured in the visual filter bar must always be displayed as a compact filter in the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) as well. By contrast, a filter configured as a compact filter in the filter bar may or may not be configured for display as a visual filter. This means that it’s possible to have a smaller set of visual filters and a larger set of compact filters.
Both filter types supports two different modes: **live update** and **manual update**. Use the **live update mode** for both filter types **as the default** whenever possible. Apply the same mode to both filter types: the [visual filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/visual-filter-bar/) and the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/). For example, if you use the live update mode in the visual filter bar, you should also use the live update mode for the filter bar.

> **Information:** SAP Fiori elements for OData V4 uses the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) and SAP Fiori elements for OData V2 uses the [smart filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-filter-bar-annotations/).

Default (col-2)

Section Metadata

style

### Filter Type Switch

Users can toggle between the compact filters :filter-fields: ([filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/)) and :filter-analytics: ([visual filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/visual-filter-bar/)) in the upper-right area of the page header. The filter type switch is a core feature of the analytical list page and is **mandatory**. The switch is only displayed when the page header is expanded. Once the header collapses, it disappears.

#### Carrying Forward Filter Selections

Any values selected in the visual filters are always carried forward to the corresponding compact filters.

Filter dimensions that are part of a visual filter are synced to the visual filter. If the dimension value(s) chosen in the compact filter are part of a visual filter, they are shown as selected chart dimensions in the visual filter (single or multiple selections).

Filter dimensions that are not part of the visual filter, parameter values, and interval-based dimensions are applied to the filter query and the content is refreshed.

To show complex conditions, click the link for the number of selected items at the top of the visual filter.

### Visual Filter Bar

The visual filter bar combines measures or item counts with filter values. The visual filter bar becomes more powerful if you match measures to the filter dimension instead of just item counts. Use the visual filter bar if you would like to give the user a condensed overview of the data in the dataset. Chart visualization increases the joy of use, and enables users to spot relevant data more quickly.

#### Chart Types in the Visual Filter Bar

Currently, the visual filter bar supports three [interactive chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-chart/) types:

- [Interactive donut chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-donut-chart/)
- [Interactive line chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-line-chart/)
- [Interactive bar chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-bar-chart/)

These interactive charts are also referred to as 

#### Interactive Donut Chart
The [interactive donut chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-donut-chart/) | _Interactive donut chart_           | _Interactive donut chart with semantic colors_
in the visual filter bar is used for non-time-related data (for example, categories) and displays only the top or bottom two values. The rest are
aggregated into the “Other” section.
#### Interactive Line Chart
The [interactive line chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-line-chart/) is used **exclusively** for displaying **time series data**, and can show a maximum of six data points. Always show the first or last six data points (for example, last six days, last six months, first six days, and so on). | _Interactive line chart_           | _Interactive line chart with semantic colors_

#### Interactive Bar Chart
The [interactive bar chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/interactive-bar-chart/) | _Interactive bar chart_           | _Interactive bar chart with semantic colors_
can be used for non-time-related data (for example, categories) and has a maximum of three filter values. These filter values show the top
three or bottom three entries.
#### Using Interactive Charts

The interactive charts come with the following features and rules:

- **Minimum number of interactive charts**: Show at least three visual filters and try to use different chart types.
- **Filter title:**
  - Use the following naming convention for the filter title, using title case:
[Measure Name] by [Dimension Name]
    _Examples:_
Project Costs by Project
Sales Volume by Commodity
  - For an item count, use the following naming convention for the filter title, using title case:
Number of [Dimension]
    _Examples:_
Number of Products
    Number of Contracts by Month
  - Note that for some use cases, it might be appropriate to replace “Number” with a different expression. Bear in mind that the space for displaying the filter title is limited. If the measure and/or dimension names are longer than the predefined space, the text will be truncated. 
- **Filter-to-filter dependencies:** Ideally, the filters depend on each other. By selecting one or several chart data points, users can perform a quick analysis of the dataset.
  Examples: Supplier with the lowest supplier performance this year, product with the highest sales volume in March in the EMEA region
- **Adding additional filter values:** All charts have a maximum number of filter values that can be displayed within the chart itself. More filter values can be selected using the [value help](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) or the select popover.
- **Selected values:** Any data point or segment that is selected in the visual filter’s interactive charts will remain selected even when the user changes the measure, chart type, or sort order in any of the charts. If a selected record falls outside the top/bottom three records being displayed, the number of selected records is shown in parentheses at the top right of the chart.
- **Semantic colouring**: All interactive charts support semantic colors to indicate the criticality of filter values.
- **How to design a visual filter:** To design a visual filter, choose a meaningful measure out of the dataset and match it to a filter dimension. If no measures or no meaningful measures are available, use an item count instead. Have a look at the [visual filter bar article](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/visual-filter-bar/) for more information.

### Filter Dialog

In the filter dialog, the user can switch between the visual filter bar and the compact filters using a toggle button, and also manage the filters. For more about the standard filter dialog, see [Filter Bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/#filter-dialog). Visual filters are explained in more detail below.

#### Filter Dialog for Visual Filters

The filter dialog is launched by clicking the _Adapt Filters ([number of applied filters])_ link in the page header area. In the filter dialog for visual filters, the user can choose which filter fields are shown in the visual filter bar, and make the following changes:

- Add visual filters
- Delete visual filters
- Hide visual filters in the visual filter bar
- Search for visual filters
- Change the sort order :sort-descending: of each visual filter
- Change the chart type :horizontal-bar-chart-2: of each visual filter
- Switch to other measures :measure: in the visual filter display

## Analytical List Page Content Area

The content area shows different visualizations of the selected data. In the hybrid view, users can interact with both the chart and table visualizations at the same time. In addition, the analytical list page supports a chart-only view and a table-only view. The analytical list page **always** comes with **all three views**. Offering additional views or even tabs would add too much complexity, and is neither supported nor recommended.

Check out the following sections for more details on the hybrid view, chart-only view, and table-only view.

#### Hybrid View

The hybrid view uses both chart and table visualizations at the same time. It enables users to analyze data step by step from
different perspectives. Users can interact with both the chart and the table, and drill down through either the [smart chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-chart/)
or table entries to investigate a root cause. They can also act directly on transactional content. In the initial view of the
chart, **visualize the most important aspects of the whole dataset** in the chart.
**Example:** The view shows all the suppliers the user is responsible for, organized by value. By drilling down the material to
the plant with the highest/lowest volume, the user can see if materials need to be shifted from one plant to another. The
corresponding transactional data is shown in an analytical table below the chart, which might also offer an action for shifting
the material.
#### Chart-Only View

The chart-only view enables users to analyze data step by step from different perspectives, and to investigate a root cause through drilldown,
without direct access to transactional content. The [smart chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-chart/)
control provides the chart visualization in the chart-only and hybrid views: it is used to display the dataset as a chart. The smart chart
drilldown functionality provides a convenient way to analyze the dataset. In addition, the smart chart offers detailed information on the chart
data and a breadcrumb that shows the drilldown path. Ensure that you **show the most important aspects of the dataset** in the chart.
This mode is perfect for applications with analytical data that can easily be represented visually using charts, but doesn’t need to be linked to
the transactional dataset.
#### Table-Only View

The table view provides access to transactional content. The user can act on single or multiple objects, and navigate to the object details or to other applications.
Depending on the use case, you can opt to use either the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) or the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/).
Snapping or scrolling is not available for desktop-focused tables, such as the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/). Scrolling is only available when the responsive table is used. The pin is enabled by default. The table entries are loaded using lazy loading.
Users can apply filters at table level using the _Settings_ button (:action-settings: ). For analytical tables, filtering is also available at column level. For more information, see [Analytical Table (ALV) – Filter](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/#filter).
## Behavior and Interaction

The expand/collapse header and pin/unpin header features work as in the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#behavior-and-interaction).

### Initial Focus

When the analytical list page is loaded, set the initial focus as follows:

- If the compact filter is visible by default, set the focus on the first filter field (for live update mode) or on the _Go_ button (for manual update mode).
- If the header contains empty mandatory fields, set the focus on the first empty mandatory field.
- If the visual filter bar is visible by default, set the focus on the first chart container.
- If the header is collapsed (visual or compact filter), set the focus on the first chart data point or the first table row (depending on the selected view).

### Open and View the Global KPI Card via the Global KPI Tag

Clicking a KPI tag opens the KPI card, which shows the details for the particular KPI.

### Select Filters in the Visual Filter

Unlike [micro charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/micro-chart/), the visual filter charts are interactive. In live search mode, selecting a filter value triggers data filtering in the content area. Both single and multiple selection are supported.

To select a filter value, the user clicks on a value in the chart. The filter can be removed by either clicking on the value help link, or by clicking on the same value in the chart again. The user can [select](https://www.sap.com/design-system/fiori-design-web/ui-elements/visual-filter-bar/#selecting-filters) more filter values using the [value help](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) or select popover.

Any data point that is selected in a chart still remains selected when the user selects a data point in another chart. Filter values react on each other. If a selected record falls outside the top/bottom three records being displayed, the number of selected records is shown in parentheses at the top right of the chart.

### Switch Views: Hybrid, Chart-Only, and Table-Only

Users can switch between the hybrid view, chart-only view, and table-only view.

If the user selects values and then switches the view, the selection remains intact. See the table below for more details.

Table

Switch

Hybrid view to table view

Hybrid view to chart view

Chart view to hybrid view
selections are displayed

Table view to hybrid view

### Show/Hide Table Entries in Hybrid View and Table View

The table toolbar for the analytical list page offers a _Show_ :show: and _Hide_ :hide: table entries feature as a toggle switch in the hybrid and table views:

- If the **_Show_** **icon** is active, the table shows all items. These include highlighted entries (where values are selected in the chart) and non-highlighted entries.
- If the **_Hide_ icon** is active, the table shows only items that are selected in the chart.

For example, if the user selects _SAP’s Sales Revenue for 2012_ as _Customer_ in the chart, all records relating to _SAP’s Sales Revenue for 2012_ are highlighted (but not selected) in the table. Note that the record is still highlighted even if _Customer_ not displayed as a column in the table. If the table rows are grouped, the entire grouping is highlighted, even if only one record within the grouped set is affected by the chart selection. All values that are not selected in the chart are “hidden” and are not shown in this table mode.

## Guidelines

#### Show the filter dimension with one measure in the visual filter, not multiple measures

Filter dimensions in the compact filters ([filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/)) have **exactly one** representation in the visual filter bar.
Do not show the same filter dimension with two or more different measures at the same time in the visual filter bar. The example shows the filter Dimension _Year_ with two different measures _Revenue_ and _Quantity_. Showing the filter dimension _Year_ twice is not in sync with the compact filter, where it is shown only once. Furthermore, matching between the two filter types will not work.

If the use case requires you to show a dimension with different measures, consider using an [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) instead.

Do

### 
### Tips for Design Gates

#### Filter Area

- Always configure both a visual filter bar and a compact filter bar.
- It is preferable to use the visual filter as the default, but not mandatory. Consider using the compact filter bar as the default if:
  - Parameter values are required
  - Data range selection is the main use case
  - Users often need a large set of filters
- Use the live search as the default for both filter types (except when parameter values are required).
- Every visual filter must have a corresponding compact filter, but not all compact filters need a corresponding visual filter.
- Filter dimensions in the compact filter bar have exactly one representation in the visual filter.

#### Visual Filter Bar

- Always use a line chart to show a time series. Do not use a line chart to show categories; use a bar chart instead.
- If you expect the user to work with a large number of datasets, consider using the bar chart.
- If your scenario involves filtering a small number of datasets by parts of a whole, consider using the donut chart.
- If your scenario involves filtering 200 or more filter values, consider using value help. For filtering less than 200 values, we recommend using the select popover.
- Use the following naming convention for the filter title, using title case: [Measure Name] by [Dimension Name] in [Scaling Factor] [Unit of Measure]. For example, 
- **It is mandatory** that all visual filters are connected and react to each other. If a user interacts with a certain visual filter, the others must react to the selection.

#### Hybrid View / Chart-Only View

- Show the most important aspects of the dataset in the main chart.

#### Tabs

- Do not use tabs in the analytical list page.

---

## Floorplans > Initial Page Floorplan > Usage

## Intro

The initial page floorplan allows the user to **navigate to a single object** to view or edit it. The interaction point on the screen is a single input field that relies on assisted input to direct the user to the object in as few steps as possible (using features such as value help and live search). If you need to display more than one object, use the [list report floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) instead.

## When to Use

### Use the initial page floorplan if:

- The user only needs to work on one object at a time. In this case, the list report floorplan would include a redundant step for viewing a list of items found by the search.

A typical use case for the initial page floorplan is a scanning app, where each new scan leads to an object with input fields. Once the user has submitted the entries, the screen is shown in read-only mode. The cursor returns to the input field, ready for the user to scan the next object.

### Do not use the initial page floorplan if:

- The search is supposed to return a list of objects. This is the scenario for the [list report floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/).

It is also advisable to use only one input field for finding the object. If you need to include detail views, or allow the user to switch between views, offer these features when displaying the object itself.

## Components

The initial page is a floorplan based on the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/), with a [dynamic page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header) and a content area.
1. Shell bar (mandatory)
2. Dynamic page header (mandatory)
3. Content Area (mandatory)
4. Input field (mandatory)
5. [Header features](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-features) (optional)
6. Footer toolbar (optional)
**Dynamic page header**

The header area can contain the same content as the object page and thereby follows its defined structure, except for the title, which is replaced by an input field. The header initially displays in collapsed mode but expands when the user performs a search or finds an object using the input field. Choose the [selection control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#choosing-the-right-control) best suited to your use case.

**Content area**

The content area is used to display the object. It can contain a navigation bar, sections, subsections, forms, and tables.

## Behavior and Interaction

### Initial Focus

When the initial page is loaded, set the initial focus on the input field in the header title area.

### Live Search
The input field serves as the single starting point for finding the object. The assisted input uses the [live search feature](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) (search-as-you-type) to speed up the search. The live search feature can show anything from one attribute to an entire table of values. To guide the user, you can use an [illustrated message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/illustrated-message/) to display a hint, such as _Enter the ID manually_ or _Scan the code_.

### Initial Screen with dialog
If multiple hits are possible for the same search terms, you may need to implement a [select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/), [table select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-select-dialog/), or [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/). These dialogs let the user narrow down the list of items based on more specific criteria. When the user selects an object from the list, the dialog closes and the object is displayed in the content area.

### Behavior of the Search Field
The content of the dynamic page header is initially
collapsed and cannot be expanded. The input field is
located in the header title area of the object page. If
no other additional actions are provided, set the focus
to the input field . This allows the user to enter the
search term directly without clicking into the field.
However, only consider doing this if there are no other
elements that could be blocked by it, such as the
on-screen keyboard on touch devices.
Once the user finds an object, the dynamic page header
expands and displays the relevant information for the
object.
The dynamic page header collapses on scrolling or by user
interaction, but the input field for performing a
different search is always visible.
If the user enters new search terms in the input field,
the focus moves away from the field and the app triggers
a new search. If no results are found, the initial view
of the page is shown – with a collapsed header and a
corresponding message in the content area.
## Responsiveness

The initial page features a single interaction point for the user: the input field near the top of the screen. Place the input field inside header title bar (sap.f.DynamicPageTitle). Configure the width to fit the width of the longest text (allowing some additional space for other languages), but do not make it significantly wider. \When you set the maximum width of the input field, also consider the width available on mobile devices.

The field should never be as wide as the screen (except on smartphones).

---

## Floorplans > List Report Floorplan Sap Fiori Element > Usage

> **Information:** This floorplan is available with [SAP Fiori Elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).
For information on the default settings and other options for the SAP Fiori element implementation, see the topics for the list report [header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements) and [content area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-content-area-fiori-elements) in the _SAP Fiori Elements_ section.

## Intro

With a list report, users can view and work with a large set of items. This floorplan offers powerful features for finding and acting on relevant items. It is often used as an entry point for navigating to the item details, which are usually shown on an [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/).

## When to Use

### Use the list report floorplan if:

- Users need to find and act on relevant items within a large set of items by searching, filtering, sorting, and grouping.
- You want to let users display the whole dataset using different visualizations (for example, as a table or as a chart), but no interactions are required between these visualizations. An example use case might be reporting.
- Users need to work with multiple views of the same content, for example on items that are “Open”, “In Process”, or “Completed”. You want to let users switch views using tabs, segmented buttons, or a select control.
- Drilldown is rarely or never used, or is only available via navigation to another page, and not as free or flexible drilldown within the page itself.
- Users work on different kinds of items.

### Do not use the list report floorplan if:

- Users need to see or edit one item with all its details. Use the [object page floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) instead.
- Users need to find one specific item, and the item or an identifying data point is known to the user (such as a code). Use the [initial page floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/) instead.
- Users need to work through a comparably small set of items, one by one. Use the [worklist floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/) instead.
- Users need to extract knowledge or insights from data, either to better understand the current situation, or to identify the root cause for a certain value. Use the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) instead.
- Charts are not only used for visualization. Users need to switch between integrated chart and table views (hybrid view). Use the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) instead.
- Users need to see the impact of their action on a KPI. Use the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) instead.
- Users need to see not only the result, but also the impact of their filter settings directly in a chart representation. Use the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) instead.

## Components

The list report is a [full screen](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/full-screen/) floorplan. It can also be used in [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), where it is usually displayed in the first column.

The list report page is based on the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/), and is divided into a header area and a content area, as defined by the dynamic page layout.

- The **dynamic page header (1)** contains the header title **(2)** and the expandable/collapsible header content (5).
  - The **header title (2)** is part of the header area and should display a **[title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/)** or **[variant](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) (3)** for the whole page (mandatory), filter information (if the header is collapsed), and a [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/) **(4)** with global actions, such as _Share_ (optional).
  - The **header content (5)** is used to display the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) or the smart filter bar (mandatory).
  - The **[header features](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-features) (6)** allow users to expand/collapse the header **(6a)** (mandatory) and pin/unpin the header area **(6b)**.
- The **content area (7)** is used to display:
  - A table/chart title, textual [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/#text-only), or select **(8)** (optional)
  - One [table/chart toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) **(9)** per tab
  - One or multiple [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) and/or [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) **(10)**. You can use any kind of table. If you use a chart, you can display the chart on its own (without a table) or as an additional view for an existing table (switchable).
- The **footer toolbar (11)**: If needed, use a [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) to display the [messaging button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/) and finalizing actions.

## Behavior and Interaction

### Initial Focus

When the list report is loaded, set the initial focus as follows:

- If the header is expanded, set the focus on the first filter field (live update mode) or on the _Go_ button (manual update mode).
- If the header contains empty mandatory fields, set the focus on the first empty mandatory field.
- If the header is collapsed, set the focus on the first table row.

### Standard Naming Conventions

For all objects, follow the standard conventions for action buttons, the object name, and the title in the shell bar. For more information see:

- [Object Handling – Naming Guidelines](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#naming-guidelines)
- [Launchpad Shell Bar – Page Title and Navigation Menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/#page-title-and-navigation-menu)

### Header Title

#### Variant Management

[Variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) is optional. If you use variants, we recommend using one variant management control for the whole page. Use the variants to save and restore all settings for [filters](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/), selected [tabs](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/), all [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), and all [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/).
In some specific cases, you might need to add a second variant at control level. This can be the case when the user needs to change the view settings of a list independently of the page filters. However, the default is to use a single variant management control for the entire page.
Users can choose a default variant, which is selected every time the app is started.
Allow users to choose whether a variant should be executed automatically as soon as it has been selected. Not executing a variant automatically allows the user to add or remove [filters](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) before the dataset is updated. Provide this option only if the filter bar is in manual update mode. For live updates, this option is not required.
If [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) is not needed, show a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) that describes the current view instead.
#### Filter Information

Display the summary of filters currently applied only if the header content is collapsed. Use the
following text:

- Either _1 filter active:_ or _\<n> filters active:_, where “n” stands for the number of applied filters.
- A comma-separated list of the currently applied filters for up to five filters. If there are more, an
ellipsis (…) shows at the end of the string.
If no filters have been applied, the summary text is: _No filters active_
#### Header Toolbar

Use the header toolbar for non-finalizing global actions, such as _Share_. _Share_ opens an [action sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/action-sheet/), which features _Save as Tile_ (if the [SAP Fiori launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) is available), _Send Email_, and _Share in SAP Jam_ (if SAP Jam is available). Show the _Share_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) only if it makes sense for your application.
If the content area contains a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), an [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), a [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/), or any other content with its own scrollbar, display a _Show Filters_ / _Hide Filters_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for expanding and collapsing the header content.
In addition, offer any other global, non-finalizing actions needed. Hide actions that cannot be used at all (for example, because of access rights). To save space on the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/), group similar actions using a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1).
For more information on global actions, see the guidelines for the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/).
### Header Content

#### Search

The [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) can contain a [search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) (optional). If you use the search field, the content shows only items that match both the search terms and the filter criteria.
The search generally searches across all available columns of the table, regardless of whether or not they are visible. In rare cases, some columns might not be included due to technical constraints. If the search does not apply to multiple columns, do not offer the search field.
#### Filters
Filters are applied to all content, including all [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) and [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/). To improve performance, consider providing mandatory filter fields and/or default settings for filters.
If the list report loads automatically when the page loads, **ensure that mandatory filter fields always have default values** to avoid error messages.
The [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) offers two different update modes:
- The live update mode (recommended) triggers filtering immediately whenever a filter setting is changed. If the [search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) is used, the search is triggered together with all filter settings with every letter typed.
- The manual update mode displays a _Go_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/), which triggers the filtering. If the [search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) is used, the search is executed together with all filters as soon as the _Go_ button is pressed.
Make sure that all [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) and [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) in the content area are in a busy state until the new data is available. Also ensure that the content is grayed out as soon as the filter settings do not correspond to the content shown (any table, property: showOverlay). This is usually the case if the content is not yet updated and the _Go_ button needs to be triggered.
Use the manual update mode only if you run into performance problems while loading the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) data.
Regardless of the update mode, make sure that the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) and the visible content match: The [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) must always describe the items that are shown in the content area.
#### Header Content - Expand / Collapse Behavior

Carousel (full-width)

The header content collapses when the user scrolls down the page (except for desktop-centric tables), and expands again when the user scrolls back up (“snap on scroll”). Users can pin the header content to keep it visible. For more information, see [Dynamic Page – Expand/Collapse Header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#expandcollapse-header-feature).

Exception: The “Snap on scroll” and “pin header” features are not provided if the main content area contains desktop-centric tables ([grid tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), [tree tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/)) or any other content with its own scrollbar. In these [cases](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#special-case-no-page-scrolling-possible), users need to expand and collapse the header content manually using the _Show Filters / Hide Filters_ button.

When starting the application, expand the header content if no query was fired (and the table is therefore empty). Otherwise, collapse the header content.

### Content Area

#### General Layout

There are three basic list report layouts: _simple content_, _multiple views_, and _multiple content_. These are described in more detail below.

In most cases, the content consists of just a [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) and a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). If needed, provide an option to switch between the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) and a corresponding [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) view.

For more complex scenarios, provide multiple views of the same content. Multiple views involve one or more of the following:
- Showing the same [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), but with different columns.
- Showing the same [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) in different pre-filtered states. These states are usually based on a status column, for example, items that are _Open_, _In Process_, or _Closed_. Make sure that the corresponding filter is not offered on the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/).
- Differentiating between the items displayed in the content in some other fundamental way.
There are two options for switching between different views:
The first option is to replace the table [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) with a content switch. Use this approach if all views share the same sort and group states, as well as the same actions.
The content switch can be:
- A [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for up to three views
- A [select control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) for more than three views, or if the number of views changes dynamically
If you have both a [table title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and a content switch, display the [table title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) first, then the content switch. Place both on the left side of the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). Since the content switch is placed on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), the same actions are shown for all views.
If you are using the content switch together with [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/), ensure that the [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) also reacts to the content switch. This can be done by:
- Filtering the data that influences the display of the [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/)
- Changing the measures and/or dimensions (for example, _View by Country/Region_, _View by Customer_, …)
The second option for switching views is to show each view in a tab container of the [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/). Use this approach if all views show different states of the same data (sort states, group states, as well as item selection). Using tabs also allows you to offer different actions on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) for each view.

To support even more complex use cases, a list report floorplan can also contain multiple [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) that display different kinds of objects. The [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) settings are applied to all of these [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) in parallel. For example, a customer overview list report might display different [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) for invoices, deliveries, and overdue payments. All of these [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) can be filtered for a specific customer and a specific date.
Display each [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) inside a tab container of an [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/). This also allows you to offer different actions on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) for each [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview).
#### Icon Tab Bar
Use the text-only version of the [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/). Display the number of items shown in the respective [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) on each tab (sap.m.IconTabFilter, property: count).

#### Table Toolbar
Display at least a table [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) (ideally with an item count) and icon-only [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for sorting, grouping, and column settings. Do not offer additional filter settings on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). For sort and group, show a [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/) with just the corresponding features enabled. For column settings, show the [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/). If you need more extensive functionality (for example, grouping or sorting on several levels, tables with more than 20 columns), use the [P13n-Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) with just the corresponding feature enabled.
If alternative visualizations are provided (such as [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/)), offer an additional view switch on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). Triggering the switch replaces the current visualization with another one. If a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) and [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) need to be shown in parallel, offer a switch for the combined view.
In rare cases, you can offer an additional layout [variant](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). The layout variant stores view settings like the column order and the sort and group settings. If you use a layout variant, do not store the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) settings in the filter variant. Offer this additional layout [variant](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) only if there is a strong use case for switching filter and layout variants independently. If there is no strong use case, or you are unsure, do not use a layout [variant](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) at all.

In addition, offer any other actions needed. Disable selection-dependent actions (such as _Delete_) if no items are selected, or if the action cannot be applied to the selected items. Always enable selection-independent actions (such as _Add_). To save space on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), group similar actions using a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1). For example: | Do
- _Release_ and _Release with Conditions_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ---
- _Add Contact_ and _Replace Contact_
- _Edit Account_ and _Edit Title_
For more information on table/chart actions, see the guidelines for the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), the [chart toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-toolbar/), and for [managing objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects).                                                       | _Table without the filter icon_
Don't

#### Table

If there are no items to display, use the “no data” text of the corresponding [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). Explain why the table is empty, and what the user needs to do to display items.

Examples:

- After starting the app, no filters are applied:
- The filter was executed, but no items were found. This can also happen if the list report was opened by a related app, and the filter criteria were transferred automatically:
If you are using a responsive table, always enable “[scroll](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#scroll) to load” behavior.

#### Sticky Behavior

The icon tab bar, table/chart toolbar, and column headers of all table types must be “sticky”. This means that they stay fixed on top when the user scrolls down the page.

#### Navigation

There are three types of navigation at item level in the list report floorplan:

- **Line item navigation**: If applicable, allow navigation to a detail view (usually an [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/)) at line item level. Show a navigation indicator (chevron icon) for each line item that provides a detail view. In a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/), or [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/), clicking the line item triggers the navigation.
  In a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/), clicking the navigation indicator triggers the navigation.
  Another option is to use a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) as the identifier for the line item. This [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) triggers the navigation. Use this only if the navigation indicator is being used for a different target.
  Only show navigation indicators for target pages the user is authorized to access.
- **Drilldown navigation**: If a line item contains aggregated data, allow navigation to a view that contains details for the aggregated amount. This is usually another list report. In this case, use a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) to display the aggregated amount. If the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) contains many columns with [links](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/), use the [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) options to provide different levels of highlighting.
  In [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/), offer the drilldown navigation [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) in the popover for the chart element. In this case, also navigate to the corresponding list report to show the details.
- **Cross navigation**: If a line item contains cross-references to other entities, such as people or business objects, use a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) to display the corresponding data point in the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization). Triggering the [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) opens a [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/). Typically, the [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/) displays basic details of the referenced object and a navigation [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) to another page (usually an [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/)) or another app that shows the object details.

> **Information:** **SAP Fiori Elements – Navigation to Classic UIs** If you need to navigate to classic UIs for create, display, or edit actions, see [Integration of Classic SAP UIs (SAP Fiori Elements List Report)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-products/sap-s/4hana-only/integration-of-classic-sap-uis-sap-fiori-elements-list-report). This article describes which UI elements and navigation flows to use in different scenarios.

#### Working Modes

When the user edits a list item in a filtered list, the changed item might no longer match the filter criteria. For this use case, there are two alternative working modes:

- **Worklist mode**
- Users want to see a direct system reaction to their changes. Items that don’t match the current filters
- vanish immediately. This mode applies to about 80% of all use cases.
- **Continuous working mode**
- The user still needs the edited item, even though it no longer matches the filter criteria. The item stays in the list until the next filtering process is triggered. The item is marked, and a system message informs the user about the filter mismatch. This mode applies to about 20% of all use cases.

The app developer can choose the appropriate working mode for the app use case.

#### Footer Toolbar
Use the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) to display the [messaging button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/) and finalizing actions. Only use the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) if finalizing actions for the whole page and/or the [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/) are available.
Always show the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) in edit mode.
Hide actions that cannot be used at all (for example, if the user doesn’t have authorization). To save space on the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/), group similar actions using a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1).
For more information on finalizing actions, see the guidelines for the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/).
## Actions

(1) Global actions in the header toolbar
(2) Table actions in the table toolbar
(3) Line item actions
(4) Finalizing actions in the footer toolbar

### 1. Global Actions

Place actions that affect the entire page in the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/) in the header title (1). These include the following standard actions:

- _Show Filters_ / _Hide Filters_: This [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) expands and collapses the header content. Show this [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) only if the list report contains a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/).
- _Share_: This [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) opens an [action sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/action-sheet/) that contains actions like _Save as Tile_ (if the [SAP Fiori Launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) is available), _Send Email_, and _Share in SAP Jam_ (if SAP Jam is available). Show the _Share_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) only if it makes sense for your application.

Hide actions that cannot be used at all (for example, because the user has no authorization). To save space on the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/), group similar actions using a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1).

Do not place actions that finalize the current process (“finalizing actions”) on the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/) of the header title, even if they affect the entire page.

For more information on global actions, see the guidelines for the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/).

### 2. Table/Chart Actions

Place actions that affect the content of a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) or [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) in the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) (2).

> **Information:** When you use the [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/), or [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/), actions on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) move up out of the visible screen area when the user scrolls down.

If you are using an [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/), be aware that each tab contains its own table toolbar.

#### When to Enable, Disable, or Hide Actions

Indicate whether an action is available. Some actions are always available (such as _Create_ for new objects). Other actions are only relevant if items have been selected (for example, _Edit_ at item level, _Remove_, object-specific actions, or actions that change the status of an item).

_Enable_ the following actions:

- All _Add/Create_ actions, unless the user needs to specify where in the table the new item should be added.
- _Edit_ actions that switch the entire table to edit mode (independent of the selected items).
  If the user triggers the _Edit_ button, replace it with _Save_ and _Cancel_ buttons (see [Editing the Whole Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/#option-2-editing-the-whole-table)).
- Item-dependent actions that can be applied to some or all of the selected items.

_Disable_ the following actions:

- Item-dependent actions when no items have been selected.
- _Add/Create_ actions where the user needs to specify the insert position in the table, but either no item has been selected, or more than one item has been selected.

_Hide_ actions that cannot be used at all (for example, because the user has no authorization).

For more information, also see [UI Element States – Control States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#control-states).

**Partial Processing**

Enable the user to apply the changes to as many of the selected items as possible.

If an action can’t be applied to all selected items, show a warning message **before** executing the action:

- Indicate the number of selected items that can’t be processed (out of the total number of selected items).
- Give a reason why the action can’t be applied to these items.
- Let the user choose whether to apply the action to the remaining items anyway or cancel the action.

[See an example here](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/#guidelines).

Note: In some scenarios, you might not be able to identify whether an action can be applied to all selected items before executing it. If the system is unable to apply the action to all items, show a message after executing the action.

##### Sort, Group, Personalization

Decide if you need to provide a sorting, grouping or personalization for your use case. If you offer more than one of these actions, offer them as single actions. We recommend keeping them in the following order: 
##### Add/Create Items Using a Dialog

You can let users add or create new items at list report level using a dialog. This approach is recommended for cases where there are fewer than 8 required fields. Display the action in the table toolbar.

You can use this option for both draft and non-draft scenarios.

##### More Information

For more information on table and chart actions, see the guidelines for the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), [chart toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-toolbar/), and for [managing objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects).

### 3. Line Item Actions

In rare cases, actions that affect a single item can be placed directly inside the line item. Use this only for specific, frequently used tasks (3). If the same action can also be applied to several items at once, feel free to also place it on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). Nevertheless, if you do so, reconsider whether you really need to offer the action at line item level. Examples of line item actions include:

- _Start/Stop_ (a batch job)
- _Approve_ (an item)
- _Assign_ (an item)

Do not disable line item actions. If an action cannot be used, hide it. This can be the case if the user has no authorization or the line item is in the wrong state.

### 4. Finalizing Actions

Place actions that trigger the end of a process and affect the entire page in the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) (4).

Examples:

Please be aware: Even if you are using the [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/), there is only one [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) for all tabs.

Hide actions that cannot be used at all (for example, because the user has no authorization).

For more information on finalizing actions, see the guidelines for the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/).

## Responsiveness

In general, the list report floorplan is responsive. However, there are exceptions if the following controls are used:

- [Grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), and [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) are supported on **desktop and tablet devices only** so you cannot use them for mobile use cases.

Instead, take an [adaptive approach](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness#adaptive-approach):

- - Create a new Fiori application with reduced complexity, not an exact match of the desktop application.
  - With the new application, address the most important use cases for users in a mobile context. The responsive controls ([responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) or [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/),) or a relevant control for your use case (for example a [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) or the [category navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/category-navigation/) pattern) may suffice.
- [Smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/): The smart table is a wrapper around the different existing [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) controls. If a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) is used inside the smart table, you will run into the limitation mentioned above.

For more details, see the respective guideline articles.

_List report - Size L_           | _List report - Size M_           | _List report - Size S_

## Examples

The examples below show variants of the list report with the most commonly-used controls. You can also see the manual update mode (with a “Go” button) and the live update mode (no “Go” button).

Carousel (full-width)

## Top Tips

- Avoid loading list report page without any data, even if there are no mandatory filters.
- Use only one [key identifier](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#object-identifier) in the table.
- If you are using the [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/), place it beneath the filters.
- In the icon tab bar, use text labels only (without icons).
- Choose [selection controls](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use) that best fit your use case.
- Make sure that columns in the table are [aligned correctly](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/responsive-table-content-formatting-cheat-sheet/).
- Ensure that mandatory [filter](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#filters) fields always have default values.
- Avoid using variant management for tables. Use the page variant instead.
- Always enable [actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#when-to-enable-disable-or-hide-actions) like _Add, Create_ or _Edit_. Once _Edit_ is triggered, replace it with _Save_ and _Cancel_.
- Never place finalizing actions in the header toolbar, even if they affect the whole page.
- When using the icon tab bar, be aware that each tab contains its own table toolbar.

---

## Floorplans > Object Page > Usage

> **Information:** This floorplan is available with [SAP Fiori elements](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).
For information on the default settings and other options for the SAP Fiori element implementation, see the topics for the object page [header](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements), [content area](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements), and [footer bar](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements) in the _SAP Fiori Elements Framework_ section.

## Intro

The object page floorplan is used to display and categorize all relevant information about an object. Categorized content can be accessed quickly using anchor or tab navigation, and users can switch from display to edit mode to change the content. To create a new object, users can switch to create mode.

The object page floorplan comes with a flexible, responsive layout and a [dynamic page header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) that can be adapted to display simple and complex business objects. This allows you to adjust the layout to a wide range of use cases.

> **Warning:** - Always build the object page using the **dynamic page header** and not the former object page header. Using the old object page header creates issues that can’t be fixed retrospectively. Using the dynamic
header will also ensure consistency across all floorplans and provide greater flexibility. For details, see the [Header](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#header) section below.
- **Do not use the current implementation of the “page variant” feature** in SAP Fiori elements. This feature is technically available for object pages, but we are still working on the final design.

## When to Use

### Use the object page floorplan if:

- Users need to display, create, or edit an object.
- Users need to get an overview of an object and interact with different parts of the object.
- You need to structure your content into **different sections**.
- You have a page with one section and editable header content.

Table

### Do not use the object page floorplan if:

- Users need to edit several items at the same time.
- Users need to find relevant items without knowing the exact item details.
- Users need to be guided through a series of steps when a new object is created.
- The creation process for a new object is not linear, but can have different paths, depending
on the information selected.
- Users need to find one specific item, where the item or an identifying data point is known to
the user (such as a code identified by a scanner).
- Users need a way to analyze data step by step from different perspectives. They need to drill
down to investigate a root cause and act on transactional content within one page.
- Users need to interact with interdependent chart and table views (rather than using charts
for visualization only).
- Your content can be shown in just **one section** and you don’t have editable header content.

## Components

The object page consists of the following elements:

- Dynamic page header (mandatory)
- Navigation bar (optional)
- Content area (mandatory)

The image below provides an overview of the object page components.

Default

1. Dynamic page header
2. Navigation bar
3. Content area
4. Shell bar
5. Breadcrumbs
6. Global actions
7. Header content
8. Footer toolbar

The following sections explain these components in more detail.

### Dynamic Page Header (mandatory)

The dynamic page header contains key information about the object and provides the user with the necessary context. The header initially expands in display mode. It also contains global actions for the object, such as _Edit_ or _Delete_.

The header consists of the following elements:
1. Breadcrumbs (optional)
2. Title (mandatory)
3. Subtitle (optional)
4. Header content (optional)
5. Object marker (optional)
6. [Header toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/header-toolbar/) with global actions (optional)
7. Visual indicator for [header features](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-features) (mandatory if the header can be collapsed and expanded)
If the object page is used in the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), it can also contain layout actions.

Please note:

- To display images and placeholders in the header, use the [avatar](https://www.sap.com/design-system/fiori-design-web/ui-elements/avatar/) control.
- The subtitle is now below the title. (In the former object page header, it was next to the title.)

For more information, see the [Dynamic Page Header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-title) section for the dynamic page layout.

> **Warning:** Always build the object page using the **dynamic page header** and not the former object page header. Using the old object page header creates issues that can’t be fixed retrospectively. Using the dynamic header will also
ensure consistency across all floorplans and provide greater flexibility. For details, see the [Header](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#header-content-optional) section below.

> **Hint:** To use the dynamic page header in SAP Fiori elements, set the class “objectPageHeaderType” to “Dynamic”.

### Breadcrumbs

A breadcrumb is displayed above the object title. Limit the breadcrumb to the drilldown levels within the object page.

### Header Content (optional)

The header content displays app-specific contextual information. You build the content using containers, called facets.

The facets are arranged inline, with a left float. Each facet adapts its size to the content and makes optimal use of the space without truncating the texts. If the facets do not all fit on one line, those on the right wrap to the line below.

The header content is hidden by scrolling down the page or clicking the collapse indicator.

There are several types of header facets for different kinds of data. The facets must be implemented by the app team for standalone object pages. For SAP Fiori elements, they are predefined.

The following header facets are available:

- [Form (dataset)](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#form-facet-dataset)
- [Plain text](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#plain-text-facet)
- [Image](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#image-facet)
- [Key value](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#key-value-facet)
- [Micro chart](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#micro-chart-facet)
- [Progress indicator](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#progress-indicator-facet)
- [Rating indicator](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#rating-indicator-facet)

Default (col-1)

#### Form Facet (Dataset)
You can use the form facet to display datasets.
A form facet consists of:
1. Title (optional)
2. Label-text pair (no more than 5 in a group)
- The labels can be invisible, but need to have a text for accessibility purposes.
- The labels can be icons, but need to have a text for accessibility purposes.
- Each text can hold a link.

> **Hint:** For **non-SAP Fiori element object pages** only:
For each label-value pair in the form header facet, use a _sap.m.Label_ and a sap.m.Text or sap.m.Link, nested within an sap.m.HBox.

Default (col-2)

Section Metadata

style

Default (col-1)

#### Plain Text Facet
You can use the plain text facet to display a continuous text in the header.
A plain text facet consists of:
1. Title (optional)
2. Text
You can have links inline in the continuous text. They can navigate to another page or open a [quick view](https://www.sap.com/design-system/fiori-design-web/ui-elements/quickview/). The text can contain more than one link, with different actions.
The default width of the facet is 320 px. The width of the facet doesn’t adapt to its content, but when the headline is broader than the facet width, the header wraps. You can also set a specific width to make optimal use of the given space.

> **Hint:** For **non-SAP Fiori element object pages** only:
To set the width of the plain text facet, nest the text within an sap.m.HBox and set the property:width of the
sap.m.HBox.

Default (col-2)

Section Metadata

style

Default (col-1)

#### Image Facet
You can use the image facet to show a picture of the object or a user profile. The header can have either one image
facet or no image facet. The position of the image facet is fixed to the left. The image can have a press event. The
default press event enlarges the image. When the header collapses, the image facet moves to the left of the title and
becomes smaller.

> **Guideline:** Always use the [avatar control](https://www.sap.com/design-system/fiori-design-web/ui-elements/avatar/) for the image in the header. This applies to both expanded and collapsed images.

Default (col-2)

Section Metadata

style

Default (col-1)

#### Key Value Facet
You can use the key value facet to highlight important data or KPIs.
A key value facet contains:
1. Title (mandatory)
2. Text or number in a larger font size
If the key value facet is used with a text, such as a status, you can also display an icon to the right of the text.
This icon must only be used as a visual cue for the text it relates to, and not to add more information.

> **Hint:** For **non-SAP Fiori element object pages** only:
Larger value texts are now possible following the introduction of new properties for the [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status) and [object number](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-number1).

Default (col-2)

Section Metadata

style

Default (col-1)

#### Micro Chart Facet
A micro chart facet consists of:
1. Title (mandatory)
2. Subtitle (optional)
3. Micro chart (mandatory)
4. Footer text (optional)
To display the unit used in the micro chart, use the footer.
The following micro charts can be used in the micro chart facet:
- [Bullet chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/bullet-micro-chart/)
- [Column chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/column-micro-chart/)
- [Line micro chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/line-micro-chart/)
- [Comparison chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/comparison-micro-chart/)
- [Delta chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/delta-micro-chart/)
- [Harvey ball chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/harvey-ball-micro-chart/)
- [Radial chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/radial-micro-chart/)
The micro chart facet can have a click event on the chart itself. This can lead to a page with a bigger chart or open
a quick view, for example.
For more information, see [Micro Charts](https://www.sap.com/design-system/fiori-design-web/ui-elements/micro-chart/).

Default (col-2)

Section Metadata

style

Default (col-1)

#### Progress Indicator Facet
A progress indicator facet consists of:
1. Title (mandatory)
2. Subtitle (optional)
3. Progress indicator
4. Footer text (optional)
For more information, see [Progress Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/).

Default (col-2)

Section Metadata

style

#### Rating Indicator Facet
You can use the [rating indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/)
facet to display a single rating value or an aggregated rating (such as an average rating for a product). The facet
structure is slightly different in each case.

The single rating consists of:
1. Title (mandatory)
2. Subtitle (optional): Displays supplementary texts
3. Rating indicator

The aggregated rating consists of:
1. Title (mandatory)
2. Subtitle (optional): Indicates the amount of data being
aggregated.
3. Rating indicator
4. Footer text (mandatory): Displays the exact aggregation
value. Use the format “\<average rating> out of \<maximum
rating>”. For the average rating, use the exact value with
one decimal place.
> **Guideline:** We recommend the following property settings when using the rating indicator in header facets:
- Show 5 symbols as the default.
- Use the _Favorite_ icon as the symbol.
- Display half-stars to represent decimal values.

Section Metadata

style

### Navigation Bar

You can only have several sections in the object page layout and there are two ways to structure it:

- [Anchor bar navigation (default)](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#anchor-bar-navigation)
- [Tab bar navigation](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#tab-bar-navigation)

### Anchor Bar Navigation

The anchor bar is the default navigation control for the object page. It consists of a series of anchor links, which are arranged horizontally at the top of the page. The anchors represent sections or subsections of the page. Clicking a link makes the screen scroll to the corresponding section of the page and the anchor bar remains visible.

Use tab bar navigation if your page covers different topics that each have complex content, such as long tables or lists.

Default

Default (col-1)

1. Active anchor
2. Inactive anchor
3. Subsection dropdown
4. Subsection
5. Subsection dropdown indicator
6. Overflow carousel button
7. Overflow menu button
8. Overflow menu dropdown
9. Section (hover) in overflow menu
10. Section in overflow menu
11. Subsection in overflow menu

> **Hint:** Make sure that the `UpperCaseAnchorBar` property is disabled and that you enter the anchor bar labels in **title case** (for example: _Contact Information_).

Section Metadata

style

#### Overflow

If there are more anchors than the screen can accommodate, the remaining anchors move into an overflow menu. The overflow button on the right of the navigation bar (:overflow:) opens a hierarchical dropdown list of all sections and subsections. When the user scrolls down the page, the anchor links scroll horizontally to ensure that the active anchor is always visible.

You might also see a small right arrow on the anchor bar. This arrow allows you to scroll horizontally to reveal any hidden content, and only appears when you hover over the overflow menu. In the meantime, this arrow has been replaced by the overflow menu button, but is still supported technically for legacy reasons.

#### Responsiveness

On small screens, the anchor bar becomes a dropdown list. The text field of the dropdown list shows the section currently selected. Clicking the dropdown menu opens a hierarchical list with all the sections and subsections of the page.

#### Behavior and Interaction

Table

**Click / Select:**

Anchor link
section (not to the title).

Arrow next to section anchor with several subsections

Item in the overflow list
or subsection (not to the title).

Keyboard left and right arrows

Fade area to the left or right of the anchor bar
only). The overflow arrow button is always visible in
cozy mode.

Overflow scroll button (right arrow)
are hidden in the overflow into view.

Overflow menu button (:overflow:)
sections and subsections of the page.

### Tab Bar Navigation

As an alternative to the anchor bar, you can also use the tab bar for navigation. The tab bar works in a similar way to the [icon tab bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/icontabbar/#responsiveness), but is not the same control. The tab bar navigation for the object page is a variant of the anchor bar, and is handled by the object page floorplan.

The tabs are a series of links arranged horizontally at the top of the page which link to subpages. Clicking a link displays the corresponding subpage below and the tabs remain visible.

Use tab bar navigation if your page covers different topics that each have complex content, such as long tables or lists.

Default

1. Anchor/tab bar navigation
2. First section
3. Second section

If you set the tab bar property (`useIconTabBar` = “true”), the navigation bar displays tabs instead of anchors. The object page only supports text-only tabs; icon tabs and icon/text tabs are not available. The object page sections and subsections are reflected in the tab navigation: sections of the object page become the tabs, and subsections become the internal content of the tab. The tabs can have an item counter, which is displayed in parentheses next to the title of the tab.

On small screens, the tab bar uses the same horizontal carousel overflow pattern as the icon tab bar. This differs from the dropdown approach used for the anchor bar.

If the content of a section contains a control, for example a table, then we recommend to always display it, even if the control title and tab title are identical. This makes it easier for the user to orientate themselves.

#### Subnavigation

To make it easier to reach specific content on a long tab page, tabs can have subnavigation. Subnavigation is optional, but the default state is set to “true” and a dropdown arrow is shown next to the tab. Clicking on the dropdown arrow displays a dropdown menu with the subsection anchors for that tab. Applications can decide which tabs are enabled for anchor subnavigation by setting their property to “true”.

### Content Area

The object page content consists of sections and subsections arranged in a column layout.

#### Sections
Sections are containers for subsections. They provide the
basic structure for navigation and are directly reflected
in the navigation bar.
The first section doesn’t have a title.
2. Toolbar with actions (optional)
All the following sections consist of:
4. Mixable related content (optional)
1. Title with item counter (counter is optional)
2. Subsections
If the subsection contains a table or a chart and the title is the
Sections cannot contain controls.
If a section contains only one subsection, the title of
the subsection is used as the name of the section. In
this case, there is no subsection submenu in the anchor
bar.
content. App developers can specify which content is shown initially,
Sections can only contain subsections, not content.
Because of this, the object page only provides toolbars
for local actions at the subsection level.
> **Guideline:** If a section contains a control, like a table or a chart, and the title of the control is the same as the section
title, then the section title can be hidden so that this title is only displayed once. This avoids unnecessary
redundancies.
We recommend the same for subsection titles.

#### Responsiveness
The content blocks in a subsection display in a row. The
width of the row depends on the column layout for the
respective screen size. If there is not enough space to
display a content block, it wraps to the line below.
> **Hint:** For **non-SAP Fiori element object pages** only:
The content of the dynamic page header, navigation bar, (sub)section titles, and subsections must be vertically aligned. To achieve this, apply the `sapUxAPObjectPageSubSectionAlignContent` CSS class to the content of the subsections and set the `width` property to “auto”.

#### Forms within the Object Page

Form columns can be displayed with the standard number of columns or more to allow application teams to efficiently handle information density.

**> **Guideline:** **

We recommend you optimize the information density of forms on:
- Extra large screens that allow the display of 6 columns, if short titles are used.
- Large and medium screen that allow the display of more columns between the breakpoints for the screens.

For guidance on layout columns and content density for form content in the object page, see [Responsiveness](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#responsiveness-2).

Forms are located within subsections. They follow the column design of the object page, whereby each form group is arranged into a column. The title of the form is given by the subsection header. To improve access to the different forms we recommend always using one subsection per form, rather than placing multiple forms into one subsection.

To add actions, use the subsection header. For actions at the group level, use a group header. To prevent confusion, we recommend inserting actions only in one place, depending on the use case.

Use top-aligned labels for form fields. Top-aligned labels are known to reduce completion times and are the best approach for forms requiring localization or long labels. Using top-aligned labels also prevents issues with the spacing between the label and form field, which can occur with left- and right-aligned labels.

You can enable users to show and hide forms, groups or label-value field pairs using the _Show More / Show Less_ toggle button.

SAP Fiori elements provide an option to show or hide fields on small screen devices based on their importance.

> **Hint:** You can set the importance of a field using the `UI.Importance` annotation type (`"High"`, `"Medium"`, or `"Low"`), the fields are shown or hidden depending on the screen size. If you do not specify the `UI.Importance` annotation, the default is set to `"High"` and the field is shown on all device types.

#### Blocks
Layout blocks allow content to be aligned within the columns as follows:
- Layout 1: Occupies the maximum available horizontal space of one column.
- Layout 2: Occupies the horizontal space of only two columns. If there is only one column available, it occupies one column.
- Layout 3: Occupies the horizontal space of three columns. If there is only one column available, it occupies one column. If there are only two columns available, it occupies two columns.
To show and hide blocks, you can use a _Show More_ / _Show Less_ toggle button. Do not use the [panel](https://www.sap.com/design-system/fiori-design-web/ui-elements/panel/) container in the object page content area.
#### **Tables**

When a section or subsection contains one table and no other content, remove the redundant table title so the section or subsection title serves as the table title. In the subsection, also reduce the vertical space.

Grid tables in sections must have at least 4 rows, and the maximum number of rows visible will depend on the window size. To prevent any need for the user to scroll to access the horizontal scrollbar, keep the table within the screen size limitations. This may not be possible in all use cases, for example, if the table contains a large data volume, then you must use two scrollbars.

In an object page with anchor bars, use no more than 4 grid tables to prevent cognitive overload. (Consider using different sections between multiple tables to ease the burden, except for table comparison use cases.) To include more than 4 grid tables, place them in individual tabs.

To embed analytical tables or tree tables in an object page, use an object page with tabs and place each table in its own tab. If you are using a scrollable object page without tabs, use responsive or grid tables instead, and offer navigation to another page with the respective table type.

Depending on the number of table items, use one of the following loading behaviors:

Table

**Number of Table Items:**

Up to 20

Up to 100

More than 50-100 but less than 200

More than 200 or tab approach is unsuitable

If a table is expected to have more than 20 items, use one of the 3 options below for long tables.

For all three options, we recommend **providing a search**, and if feasible, **sorting and filtering for the table** in the object page. **Avoid grouping.**

If you expect up to 100 items, use the [_More_ button](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#layout) of the responsive table. The initial number of items shown depends on the height of the rows. We recommend initially showing 10 items, but not more than 20. If there is more than one table in the object page, only use this option for tables with up to 50 expected items.

If you expect to have more than 50 to 100 items, but fewer than 200, using the object page with tab navigation instead of anchor navigation also solves the problems associated with long tables. To enable the scroll-to-load behavior, the table must be the only or last element within a tab.

For tables with more than 200 items, or when the tab
approach is unsuitable, restrict the size of the table in
the object page to a reasonable number of items. We
recommend showing a preview of only 10 items, but not
more than 20. This can be achieved using predefined
filters and/or by sorting the table. If necessary, you
can also set a fixed number of items (such as the top
10). To enable the user to work with the entire table,
offer navigation to a separate page, such as a list
report, subobject page, or dynamic page with the
respective table type. To do this, place a right-aligned
link below the table with the label _Show All (x)_, where
x represents the total number of items in the table.
#### Representation of Child Pages

In object pages with drilldown navigation, child pages are represented in two ways:

- Breadcrumbs: A breadcrumb is displayed above the object title. Limit the breadcrumb to the drilldown levels within the object page.
- Paging buttons: Up and down arrows in the [layout action area](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-title) allow the user to navigate between subitems without going back to the original list.

### Footer Toolbar

The footer toolbar is used for closing and finalizing actions in:

- Edit and create mode, for example, _Save_, _Post_, _Accept_, _Reject_, and 
- Display mode, for example, _Approve, Accept,_ and 

## Behavior and Interaction

The basic layout of the object page in terms of header, navigation, and content remains the same in all modes (display, edit, create).

### Initial Focus

When the object page is loaded, set the initial focus as follows:

- If the object page is in display mode, set the focus on the first section.
- If the object page is in edit mode, set the focus on the first empty mandatory field.
- If there are no mandatory fields, set the focus on the first editable element or first action.

### Edit

The object page can contain a mixture of editable and read-only content.

Use the same content layout for both display and edit mode – content should not change location when the user switches between display and edit modes.

For global and local editing guidelines, see [Object Handling (Create, Edit, Delete)](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects).

There are two ways of editing header content depending on whether you’re implementing Global Edit or Partial Edit, both of which are explained below.

#### Editing header content in Global Edit mode

Because the header snaps on scroll, there are no editable forms in the header itself, so if you’re dealing with editable header content, a temporary “Header” section is generated above all the other sections of the page where the header content can be edited. The same principle applies if your object page only has one section and there is editable content in the header, except a temporary navigation bar should be generated as well. Any changes made to the header are not reflected until the user saves them.

When there is editable content in the header, the title bar information and all editable fields from the header container move from the header to the temporary “Header” section and non-editable content displays as read-only. You can leave out header content that doesn’t make sense in edit mode (for example, aggregated values that are calculated from several sources, KPIs, or micro charts). If only a few fields in the header are editable, and they match an existing section, they are moved to that section. In this case, no editable header section appears. The header container in edit mode can also contain independent facets that are not included in the header content in display mode which provide information to assist editing.

**> **Guideline:** **

The temporary “Header” section for editing header content requires manual implementation for freestyle applications.
Consider whether it’s better to place editable content in the object page sections instead of in the header.

> **Hint:** The temporary “Header” section described comes out of the box with SAP Fiori elements. With freestyle applications,
it needs to be implemented manually.

#### Editing header content in Partial Edit mode

The user can edit the header content separately by pressing the _Edit Header_ button.

If there are only a few elements to edit, the partial edit triggers a dialog.

If there are too many elements to fit in a dialog, the partial edit triggers a subpage. The subpage contains all editable information from the header. However, it differs from the “Header” section in global edit mode in that it has no action buttons in the toolbar, no navigation, and no breadcrumbs.

#### Create and edit subobjects

The following options are available for creating or editing subobjects:

- Navigation to a subobject page
- Inline create or inline edit in a [table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#add-items)
- Dialog containing the fields of the object

To enable users to create subobjects inline, offer an _Add_ or _Create_ button on the table toolbar. Clicking the button creates a row at the top of the table. Pressing **Ctrl+Enter** has the same effect.

If the subobject has less than 8 fields, use a dialog or the inline create/edit option (no separate page for the subobject). Exceptions can apply if additional content for the subobject is available but not part of the edit process, or if other apps need to offer deep links to the subobject page.

#### Edit Actions in Display Mode (freestyle apps only)

The standard flow is to switch to edit mode for edit and delete actions. However, in some cases, it can be helpful to offer certain edit actions in display mode as well.

You can offer edit actions in display mode if:

- Switching to edit mode would inconvenience the user. This is especially true if the change is small and quick, and switching to edit mode would take longer than making the change.
- The change does not impact a critical flow or result in technical inconsistencies.

_Examples:_ Adding a comment, uploading a file

Do not offer edit actions in display mode if:

- The change has a critical impact on business data/follow-on processes.
- The change requires a finalizing action.

_Example:_ Deleting a sales order item would affect the entire sales order and dependent data.

When offering delete actions in display mode, always show a delete confirmation dialog. For more information, see:

- [Delete Objects – Object Page](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects#delete-from-object-page)
- [Delete Objects – Top Tips](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects#top-tips)

#### Unsaved Changes
If [draft handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling)
has been implemented, documents are automatically saved as draft versions in the background. An editing icon to the right of the object title
indicates that a draft version exists. In other words, either the current user or another user has made changes, but not yet actively saved the
document (“unsaved changes”). Do not show the editing icon for unsaved changes if draft handling is not supported.
Selecting the editing icon invokes a popover with more information about the unsaved changes. This normally states:
- Who made the changes
- When the last changes were made
The popover closes when the user clicks outside the popover or clicks the :decline: (_Close)_ icon.
### Create

Create mode is similar to edit mode, except that the user creates a new object and defines a title for it. Until the new object title is known, display the placeholder text “New ” (for example, _New Purchase Order_). Replace the placeholder text with the actual name or ID of the new object as soon as this has been entered or generated.

Consider using the [wizard floorplan](https://www.sap.com/design-system/fiori-design-web/ui-elements/wizard/) instead of the object page floorpan if:

- You need to guide the user through a series of steps when a new object is created.
- You need a progressive disclosure approach for the creation process.
- The creation process is not linear, but can have different paths, depending on the information selected.
- The user is not familiar with the creation task.

### Loading Behavior
The object page loads in a “growing” mode. This means that the object page loads section by section to show users some content before the whole
page is loaded. Scrolling down the page triggers loading for the sections below. Hidden items in sections are only loaded (and rendered) by
clicking the _Show More_ button for the section.
If loading takes a long time, a busy indicator is shown on top of the section or item until the content is loaded and visible.
SAP Fiori elements uses a skeleton template with generic placeholders. For more information, see [Placeholder Loading](https://www.sap.com/design-system/fiori-design-web/ui-elements/placeholder-loading/).
## Message Handling

### In Display Mode
The following controls can provide messages to users in the object page in display mode:
1. Generic tag
2. Message strip
3. Object status
#### Generic Tag
The [generic tag](https://www.sap.com/design-system/fiori-design-web/ui-elements/generic-tag/) displays KPIs and [situations](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling).
#### Message Strip

You can place a [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) in the header or in a section in the content area:
- **Header**
Show the message strip in the header if the information relates to the whole object.
Place the message strip between the object page title and the header content. When the header is collapsed, it remains visible.

- **Content area section**
Show the message strip in the content area section if the information relates to a specific section.
Place the message strip at the top of the section above the section title.
Use a single message strip with a single message per area. Do not stack several message strips together.
A message strip can display:
- A call to action, such as a task that the user must perform
- Temporary information that the user needs to know
- An issue that is not related to a form field
- The object status if the object status control is too small to convey the information.
- For a brief status text, use the [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status) control.
If you decide to display both the message strip and the object status control, they should not repeat the same information.
- Brief guidance on how to use or read the page.
If the object page requires multiple hints for the user, consider using [SAP Companion](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/web-assistant) instead.
#### Object Status
The [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status) displays a brief description of the object status.
### In Edit Mode

In edit mode, use the [message popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-popover/) to help validate forms and tables as a single object.

## Responsiveness

The object page floorplan is responsive and supports all SAP Fiori screen sizes: small (S), medium (M), large (L), and extra large (XL).

For standard columns provided by the form, see the [Form / Simple Form](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#responsiveness).

### SAP Fiori Elements: Extended Columns Feature

SAP Fiori elements, by default, provide reduced content density for form content:

- Small: 1 column
- Medium: 3 columns
- Large: 4 columns
- Extra large: 6 columns

### Use

- For general content or for forms that contain longer text/label value pairs, use the **standard column distribution** provided in [Form / Simple Form.](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#responsiveness)
- For forms that contain short text/label value pairs in SAP Fiori elements, use the **extended column feature** to improve information density.

### Extra Large Screens

#### Responsiveness of Form Content

For size XL, we recommend using the full 6 columns for forms with a lot of content. This gives you greater flexibility when you organize the form content and the groups

**> **Guideline:** **

- **Use the default balanced option** to spread the content of the form group or groups evenly across a maximum of 4 columns.
- **Use the extended column option** to spread the content of your form and group or groups evenly across 6 columns.

### Large Screens

#### Content Density of Forms with Large Screens

Forms on an L screen have 3 columns by default. You can increase the number to as many as 4.

**> **Guideline:** **

- **Use the default balanced option** to spread the content of your form group or groups evenly across a maximum of 3 columns.
- **Use the extended option** to spread the content of your forms and group or groups evenly across 4 columns.

### Medium Screens

#### Content Density of Forms with Medium Screens

Forms on an M screen have 2 columns by default. You can increase the number to 3.

**> **Guideline:** **

- **Use the default balanced option:** to spread the content of your form group or groups equally across 2 columns.
- **Use the extended option:** to spread the content of your forms and group or groups equally across 3 columns.

### Small Screens

Forms on an S screen (smartphone or small desktop screens) have one column by default.

## Guidelines

### Dynamic Page Header

Use the header to set the context. Ensure that it is clearly structured and contains only essential information. Too much information impedes the main purpose of providing clear context.

> **Hint:** **How to achieve a small header:**
- The header container is always optional. If there is no important data to be displayed, you can omit it. In this
case, only the header title bar is shown.
- Omit the image if it is not necessary. It is generally the tallest element in a header container.
- Use a light theme to reduce the emphasis on the header if it doesn’t contain much information.
- Consider moving information from the header into a general information section.

### Actions

Arrange the actions in the header toolbar with care, and consider what matters most to the user:

- Highlight actions that are common or most important.
- Differentiate between secondary and generic actions.
- Use either a text button or an icon for an action, but not both.
- Use icons only for generic actions (such as :action: for _Share_). For all business actions, use text buttons.
- Place the most important actions on the left (actions go into the overflow from right to left).
- Establish a coherent visual approach.

For more information, see [Action Placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement).

### Image Facet

If you intend to use images in the object header, consider the following:

- How will the user manage the images?
- How will the system block people without permission from editing images?
- How will these images be reflected in other floorplans if they are part of the object?
- If there are a large number of items, how would a user be able to manage images without having to navigate from page to page?
- Will the organization be able to manage the images?

### Tab Navigation

If you have a complex object page, use the tab navigation approach. This can be useful when a complex object page has performance issues in a flat view, or in response to a specific user preference.

### Content Area

- Avoid using the object page as a universal container for masses of information. Use the object page in accordance with the SAP Fiori principles: role-based, coherent, simple, and adaptive.
- Give your users quick and easy access to the information they need to complete their task(s). Use a progressive disclosure strategy to keep your interface clean. You can always provide additional information on request.
- Only present your users with information that makes sense for their industry, role, activity, and task.

### Dynamic Side Content

You can offer [dynamic side content](https://www.sap.com/design-system/fiori-design-web/ui-elements/dynamic-side-content/) alongside the object page under the following conditions:

- Use the side panel only for contextual content. Do not place finalizing or global actions in the side panel. This is because opening the side panel occupies the whole right side of the screen. There is no way to show it only below the header and anchor bar.
- Do not place object information in the side panel. This information should always be in the content area of the object page.

### Standard Naming Conventions

For all objects, follow the standard conventions for action buttons, the object name, and the title in the shell bar. For more information, see:

- [Object Handling – Naming Guidelines](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#naming-guidelines)
- [Launchpad Shell Bar – Page Title and Navigation Menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/shell-bar/#page-title-and-navigation-menu).

---

## Floorplans > Overview Page > Usage

> **Information:** This floorplan is implemented with [SAP Fiori Elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).

## Intro

#### View, Filter, and Take Immediate Action
The overview page (OVP) is a data-driven SAP Fiori app type and floorplan that provides all the information a user needs in a single page, based on the user’s specific domain or role. It
allows the user to focus on the most important tasks, and view, filter, and react to information quickly.
- Content from different sources shows side by side – no
Each task or topic is represented by a card (or content container). The overview page acts as a UI framework for organizing multiple cards on a single page.
- Information can be visualized on cards in different
The overview page is based on [SAP Fiori elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates)
technology, and uses annotated views of app data, meaning that the app content can be tailored to the domain or role. Different types of card allow you to visualize information in an
attractive and efficient way.
## When to Use

### Use the overview page if:
- You want to provide an entry-level view of content related to a **specific domain or role**.
- Users needs to filter and react to **information from at least two different applications** to complete their role-specific tasks.
- You want to offer **different information formats** (such as charts, lists, and tables) on a single page.
- You plan to have **at least three cards**. These cards should not all be of the same type.

Default (col-1)

#### SAP Fiori Launchpad Home Page, Overview Page, and Object Page
The [launchpad home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) contains **all of a user’s favorite apps** and offers access to them via [tiles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/). This covers all the roles that a user might have, such as employee, manager, production worker, or quality manager.
An overview page focuses on the **key tasks for a specific role**, and contains only the most frequently-used apps for that role. The overview page uses cards, which display more (preview) information than tiles because of their size, properties, and interaction areas. One card type also allows users to perform simple actions. Cards represent an entry-level view of application content.

Default (col-2)

#### Launchpad Home Page vs. Overview Page

Table (col-2)

Launchpad Home Page

Framework (given)

“Birds-eye” view

Single point of entry

One SAP Fiori launchpad per user

Access to all the user’s favourite applications

Uses tiles

No actions

Section Metadata

style

Default (col-1)

The overview page is always role-based. The user sees a heterogeneous set of information related to a specific business context and the tasks associated with a specific role. This is not the case with the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/), which contains homogenous, object-based information.

Default (col-2)

#### Overview Page vs. Object Page

Table (col-2)

Overview Page

Role-based

“Street-level” view

Heterogeneous information

Section Metadata

style

#### Role-Specific Overview Pages
As you can see in the picture, the overall content scope
(shown in gray) becomes more focused with each
interaction step. An overview page brings together
information from different sources that support a
specific task or information need. Only provide an
overview app for a role if it makes sense to do so.
If a role or user has several main tasks that each
require a specific set of information, the role or user
might also have multiple overview apps. For example, one
overview app could be used to reflect the user’s role as
manager, with information for managing team performance
reviews. Another overview app could be used to track
quality issues and other relevant information pertaining
to the machines that the user is responsible for in the
role of quality manager.
## Components

The basic structure and appearance of the overview page is governed by the [dynamic page layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#components), and is divided into a header area and a content area.
This enables you to use variant management, text, and a smart filter bar in the upper part of the screen (dynamic page header). The content of the overview page is presented using [cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/).
Two different [layouts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/#overview-page-layout) are available, which determine the size and position of the cards: [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/) and [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/).
### Dynamic Page

The [dynamic page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header) comprises the header title and expandable/collapsible header content. Three different header variants are available for overview pages.

In the overview page, the header content is used for the [smart filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) with the live update mode (variant 1 and variant 2): the results are updated immediately whenever the user changes a filter field. As a result, there is no _Go_ button for the filter bar.

Users can expand/collapse and pin the header content with the two icon buttons below the smart filter bar:

1. [Expand/collapse header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#expandcollapse-header-feature): :slim-arrow-down: or :slim-arrow-up:
2. [Pin/unpin header content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#pinning-the-header-content): :pushpin-off:

#### Dynamic Page Variants for the Overview Page

The header title (either text or variant management) is mandatory, while the header content (smart filter bar) is optional. Variant 3 shows only a text in the header title.

Table
Variant 1          | Variant 2        | Variant 3

Dynamic page header | Yes                | Yes              | Yes

Header title        | Variant Management | Text             | Text

Header content      | Smart Filter Bar   | Smart Filter Bar | –

Page content        | Cards              | Cards            | Cards

Accordion

Variant 1 – Variant Management and Smart Filter Bar
(default)

Variant 2– Text in the Header Title and Smart Filter Bar

Variant 3 – Text in the Header Title

### Overview Page Layout

The overview page layout describes the position, size, and characteristics of cards in the content area below the dynamic page header.

There are two layout variants:

- [Fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/)
- [Resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/)

Only place [cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/) on the overview page. Never add [tiles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/).

#### Fixed Card Layout vs. Resizable Card Layout

Table

Fixed Card Layout

Fixed card width and predefined height

Users can’t influence the card size

Predefined static card characteristics
different levels of detail)

Lower implementation effort – defined card patterns

Self-contained cards

Fast overview and navigation

Cards can be swapped

Maximum of 5 card columns (letterboxing)

### Personalized Selection of Cards

Users can also hide cards. The corresponding setting is in the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad#user-menu) under _Manage Cards_. A dialog appears on the overview page, and lists the different card names. Users can opt to show or hide the cards using a [switch control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/switch/). _Restore_ reinstates the default setup. The personalized setup stays until the user next changes it.

Each overview page app has its own _Manage Cards_ setting. Users who work with several overview pages can personalize the cards shown for each one.

## Behavior and Interaction

As for any other SAP Fiori app, users open overview page apps by selecting a tile on the [SAP Fiori launchpad home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page), or by bookmarking the direct link in a browser. From the overview page the user decides which issues need attention, and navigates via cards to the relevant SAP Fiori apps. In addition, users can also access the [navigation menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/#navigation-menu) in the shell bar, which allows fast and easy navigation to other apps. The overview page supports navigation to both SAP Fiori and non-SAP Fiori apps. For SAP Fiori apps, it uses intent-based navigation. Non-SAP Fiori apps open in a new browser window.

In the screen flow, always position the overview page app between the SAP Fiori launchpad home page and the SAP Fiori app. The overview page doesn’t replace the SAP Fiori launchpad home page. Never start overview page apps from another SAP Fiori app.

The picture below illustrates the complete interaction flow:
SAP Fiori launchpad home page ➝ SAP Fiori overview app ➝ SAP Fiori app or non-SAP Fiori app

#### Initial Focus

When the overview page is loaded, set the initial focus as follows:

- If no cards are loaded, and the filter bar is in manual mode, set the focus on the _Go_ button or on the first filter field.
- If no cards are loaded, the filter bar is in manual mode, and a mandatory field is still empty, set the focus on the mandatory field.
- When all cards are loaded, set the focus either on the first card or the header of the first card.

#### Dedicated Floorplan

While other floorplans like the list report and object page can be combined in a single app, there is a **1:1 relationship between the overview page floorplan and the corresponding overview app**. The overview page floorplan is never combined with other floorplans. Because of this, the terms “overview page floorplan” and “overview (page) app” are often used synonymously.

## Cards

Cards are containers for app content, and represent an entry-level view of the most pertinent app data for a given topic or issue. The overview page can contain several cards that reference the same underlying application. However, each card must bring added value to the user, and not just repeat information already offered on another card.

Cards can display different types of content. They can show a chart, a list, a table, informative text, or a combination of two elements. Cards can also vary in size, depending on the selected [layout](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page/#overview-page-layout). However, cards never have editable fields.

When designing cards, make sure that you define and format the texts on all the cards consistently. Check the [UI text guidelines for the overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/overview-page-ui-text-guidelines) for details.

For more information about the [cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/) and [card types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#card-types) available for the overview page, see the dedicated topics:

- [Analytical Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/)
- [List Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/)
- [Bar Chart List Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/#bar-chart-list-card)
- [Link List Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/#link-list-card)
- [Table Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-table-card/)
- [Stack Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/)
- [Custom Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-custom-cards/)

> **Information:** Please note that the [integration cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/cards/) cannot be consumed by the overview page.

## Responsiveness

The overview page is fully responsive and can accommodate typical laptop screens as well as larger desktop monitors. The responsive behaviour differs for the two layout types – [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/#responsiveness) and the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#responsiveness).

Both feature responsive (collapsible) “columns” of cards that can scale all the way down to tablet or phone screen sizes. For more information on each card type, follow the respective links.

## Top Tips

Before you start designing an overview page, familiarize yourself with following best practices to optimize the user experience. They reflect the basic findings of multiple usability tests across different scenarios and user groups.

- **Make a conscious decision on the number of cards:** Show only cards that really support the specific role context or task.
- **Accentuate the most important information:** Semantic colors in texts, charts, attract more attention. The same applies to larger cards.
- **Offer a well-balanced mixture of card types**: Diversity makes it easy to recognize, select, and read information.
- **Define a deliberate card order:** Users assume that bigger cards and cards at the top of the page are more important than others.
- **Group similar topics:** Users assume that related cards will be shown next to each other.
- **Choose easy-to-read and actionable texts**: If the user needs to take action, use the active voice (for example “Reorder Soon” when stocks are running low).
- **Be semantically consistent:** Users expect crucial terms like “Urgent” or “Out of Stock” to be highlighted with semantic colors.

---

## Floorplans > Overview Page Ovp > Cards > Overview Page Custom Cards > Usage

## Intro

**Adaption of standard cards**

Custom cards allow you to define the appearance of a card on an [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/), and the type of content that appears in the [card content area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-custom-cards/#contentarea). They offer additional flexibility when you require features that are not offered by the [standard cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#card-types) for overview pages.

> **Information:** **Keep in mind:**
- A card is not a substitute for an application.
- A card focuses on the most important task-related data. It lets the user view, filter, and react to information
quickly.
- The content must be defined for a specific context. Do not display irrelevant or unclear content.

## Usage

### Use a custom card if:
- Your use case **cannot be satisfied in any way** by the [standard cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#card-types) provided for the overview page. Always consider the requirements below before using a custom card.
- You are not using the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) floorplan.

## Standard Requirements

Custom cards must meet the standard SAP Fiori requirements, especially:

- **Responsiveness:** Ensure that the cards can run on different devices (touch, mouse and keyboard), using breakpoints supported by SAPUI5.
- **Cozy/compact:** Provide different control dimensions as described by the visual design. If your existing design already covers both use cases (mouse and touch input), you do not have to provide two different designs. For more information on cozy and compact form factors, see [content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).
- **Theming:** Custom designs must allow [theming](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/theming) and use the LESS parameters provided by the official Belize theme. Implementation of the customized design must be tested in all themes (high-contrast white, high-contrast black, and Belize Deep).
- **Accessibility:** Support keyboard navigation and screen readers (as stipulated by accessibility requirements).
- **Browsers:** Support all types of browser.
- **Performance:** Ensure the performance of the implementation is satisfactory.

> **Information:** Be aware that implementing a custom card **costs time and effort for development**.

## Components

Custom cards have two components:
- A mandatory header area
- A mandatory content area
**Header Area**
The title and subtitle of custom cards follow the [guidelines for standard titles and subtitles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#title).
From the header area, users can navigate to the parent app. Since the entire header area is clickable, only one navigation target is allowed. We highly recommend offering this navigation option to give users access to the full-blown app with
the complete set of results and actions. If a card displays a subset of grouped items, use a text label to show how many of the relevant items are showing on the card. Also refer to the guidelines for the [overview page card header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#card-header).
If a card features content with a single focal point (detail/entity), the header area [navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#singleobject-cards) must always lead to this specific focal point. If a card features a subset of items grouped by a common criterion, the header area [navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#object-group-cards) must always lead to all items.
**Content Area**
The content area is reserved for application content and shows an entry-level view of the content. The use case determines what should be shown in the content area of a custom card. The content must adhere to the [standard content guidelines](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/overview-page-ui-text-guidelines).
Make sure that the content is responsive.
Provide a stable context for the content area and sustain it when the user navigates away from the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) into another app. Transfer any sort or filter criteria to the application. In other words, show the same context, but with additional information.
### Card Size

Follow the guidelines for the [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/) or the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/). Make sure that the card is responsive whichever layout you use.

## Guidelines

Custom cards inherit the drag and drop behavior from the standard cards. Only place custom cards on the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) itself (not in the object stream).

Custom cards must:

- Provide information that is relevant for the user’s specific domain or role
- Offer an entry-level view of application content
- Represent a single topic, task, or context
- Provide a stable context and sustain it after navigating from the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) to another application
- Be integrated in the [_Manage Cards_ dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/#personalized) (show/hide cards)
- React on filtering (when a [smart filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) is used)
- Follow the [guidelines for formatting](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#formatting-dates-times-amounts-and-currencies) dates, times, amounts, currencies, as well as for truncation (ellipsis). These guidelines are the same as for standard cards.
- Contain consistent texts and formatting, aligned with the other cards on the overview page. Check the [UI text guidelines for the overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/overview-page-ui-text-guidelines) for details.

---

## Floorplans > Overview Page Ovp > Cards > Overview Page List Cards > Usage

## Intro

**Lists with Different Flavors**

List cards display a set of items or links in a list format. The [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) supports three types of list card: list card, bar chart list card, and link list card. You can also show icons and images. For general information on cards, see [Cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/).

## List Card

#### Overview Page - List Cards

Carousel (full-width)

List cards are a type of [object group card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#object-group-cards), and display a set of items in a vertical list. List cards use the [sap.m.List](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/) container in the content area.

### Navigation

Clicking the **header** area of a list card opens the parent application, which uses the same filter as the annotated card, and shows a list of all the objects returned for the result set. The counter indicates how many items are showing on the card in relation to the total number of relevant items: _[Items on Card] of [Total Items]_, as in _5 of 40_.

Clicking a **list item** (row) on the card opens the detail view for that specific item in the same parent application. Only aggregate list items in exceptional cases.

Because the header area and line items are based on the same result set, they must always link to the same target application. You can also integrate a [view switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#view-switch) inside the content area of a card.

### List Item Types

Two different list item types are available:

- The **standard list item** always shows 3 pieces of information and inherits the properties of the SAPUI5 control [sap.m.StandardListItem](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/standard-list-item/).
  You can also show an (optional) icon or image on the left.
- The **extended list item** can show up to 6 pieces of information and inherits the properties of the SAPUI5 control [sap.m.ObjectListItem](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/).

In addition, you can display the data on the right-hand side in [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/carousel/#semantic-colors).

You can only use one type of list item on any given card.

_Standard list item_          | _Extended list item_
### Size of a List Card

The [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/) defines a specific size. The height of list cards can vary, depending on the number of text fields. Show no more than five standard list items and no more than three extended list items on one card. To see the full result set, the user needs to navigate to the parent app.

In the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/), users can see more content/insights by resizing the cards.

## Bar Chart List Card

#### Overview Page - Bar Chart List Cards

Carousel (full-width)

Bar chart list cards are a type of [object group card](https://wiki.wdf.sap.corp/wiki/display/fioritech/OVP+List+Card#object-group-cards), and display a set of items in a vertical list. Unlike list cards, bar chart list cards are embedded in another component: the [comparison micro chart](https://wiki.wdf.sap.corp/wiki/display/fioritech/OVP+Link+List+Card). This allows you to display negative values and use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-micro-chart/#semantic-colors).

### Navigation

Clicking the **header** area of a list card opens the parent application, which uses the same filter as the annotated card, and shows a list of all the objects returned for the result set. The counter indicates how many items are showing on the card in relation to the total number of relevant items: _[Items on Card] of [Total Items]_, as in _5 of 35_.

Clicking a **list item** (row) on the card opens the detail view for that specific item in the same parent application. Only aggregate list items in exceptional cases.

Because the header area and line items are based on the same result set, they must always link to the same target application. You can also integrate a [view switch](https://help.sap.com/viewer/DRAFT/96880755e4e64fcd96c12694f430fece/Internal/en-US/56f39e077efb477d9e851cd082b7760c.html#view-switch) inside the content area of a card.

### Bar Chart List Item Types

Three different list item types are available:

- The **standard list item** always shows 3 pieces of information.
- The **condensed list item** can show up to 4 pieces of information.
- The **extended list item** can show up to 6 pieces of information.

You can only use one type of list item on any given card.

_Standard list item_          | _Condensed list item_          | _Extended list item_
### Size of a Bar Chart List Card

The [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/) defines a specific size. The height can vary, depending on the number of text fields. Show no more than five standard/condensed list items and no more than three extended list items on one card. To see the full result set, the user needs to navigate to the parent app.

In the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors), users can see more content/insights by resizing the cards.

## Link List Card

Link list cards allow you to display a collection of links or images that can reference both internal and external targets. Links and images are handled as two separate variants: list and image.

### Variant Type: List

#### Overview Page - Link List Cards (List Variant)

Carousel (full-width)

The list variant shows a collection of [links](https://sapui5.hana.ondemand.com/) that can navigate to a target or open a popover with additional information. You can also show an optional subtitle below the link with a description or additional information. The link text and subtitle are each limited to one line.

You can display an icon or image before each link. For example, you might want to include app icons for set of links to recently-used apps, or images for a list of recent contacts. Use icons and images consistently:

- If you opt to use icons, show an icon before every link.
- If you include images, use a placeholder for images that are not available.

### Variant Type: Image

The image variant uses the [sap.m.Carousel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) control to display one or more images. If the carousel contains only one image, the _Previous_ and _Next_ icons and the paging indicator are not visible. The link and an optional subtitle are displayed above the carousel. The link text and subtitle are each limited to one line.

### Size of a Link List Card

In the [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/), link list cards with the variant type “list” can have a maximum of 6 links. There is no maximum limit for cards with the variant type “image”.

In the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/), there is no maximum limit. Users can see more links by resizing the cards.

---

## Floorplans > Overview Page Ovp > Cards > Overview Page Stack Card Quick View Card > Usage

## Intro

**Take Action on the Overview Page**

As well as giving users access to content from multiple applications using different visualizations, the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) can also let users take immediate action. This is supported by a special interaction pattern with a set of closely-integrated card types: the [stack card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#stackcard), [object stream](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#objectstream), and [quick view card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#quickviewcard). These three card types are only ever used together, and navigation between them has been optimized to best support user needs.

A stack card is a collection of quick view cards, which provide a footer area with [actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#actions). These quick view cards are displayed in the object stream (overlay). The advantage of using stack cards is that users don’t have to leave the overview page, and therefore don’t lost their focus.

#### Explanation:

1. Stack card (left side): Opens the parent application (such as a list report with all approvals).
2. Stack card (right side): Opens the object stream.
3. Heading of the object stream: A link that navigates to the parent application (such as a list report with all approvals).
4. Single quick view cards within the object stream: Offer navigation to the object details (such as an object page with the selected approval), as well as actions.
5. Placeholder card: The last card a one-click area and navigates directly to the parent application (such as a list report with all approvals).

## Stack Card

Default (col-1)

A stack card is a special collection of single-object [quick view cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#quickviewcard), based on a topic or action. Unlike the other card types, the top-level stack cards don’t show any application content. Instead, they act as an entry point to an [object stream](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#objectstream) containing multiple cards.
Stack cards have the following components:
- The **title** is the top element and is always required. It is used as the heading for the detail view, and comprises 1-2 lines of text.
- The **subtitle** is optional. You can use it to qualify the title, offer an explanation, or show a status. The purpose of the subtitle is explain the content of the stack in one line, so its usage depends on the context.
- The **stack content count** indicates the number of cards in the stack (object stream). The object stream can contain up to 20 cards. Below the number of cards in the stack, you see the total number of items returned for the annotated view (for example, “20 of 42”).
The top-level stack card contains two clickable navigation areas:
- The left area and _View All_ link navigate to the parent application, where the user can see all the objects returned for the annotated view (42 in the example above). The [placeholder card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#placeholdercard) and [heading](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#heading) inside the object stream have the same navigation target.
- The right area opens the object stream, which contains a scrollable collection of cards presented in an overlay format. The user can browse individual cards, with the option to view, inspect, or take action.

#### Overview Page – Stack Card Components

Carousel (full-width, col-2)

Section Metadata

style

### Object Stream

Clicking the right-hand area of the stack card opens the object stream. The object stream appears on top of the overview page as a modeless overlay, and serves as a layer for showing [quick view cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#quickviewcard) with actions. The overlay has heading on the top left, and a _Close_ button on the right. The heading is the same as the stack card title, and links to the full result set in the parent application (same target as the left-side navigation on the stack card and the navigation from the [placeholder card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#placeholdercard)). Clicking outside the overlay area also closes the object stream.

The object stream can have up to 20 cards (maximum), which all get their content from the same parent application. By default, the cards are ordered chronologically, with the most recent items first. However, app developers can define the best object stream sorting option for their own needs and content. If the number of cards exceeds the available space in the overlay window, an arrow icon appears on the right for scrolling. Mobile device users can swipe to see more cards. If the object stream is empty, the stack link is not active and the overlay cannot be opened. The stack count number displays _0_. If only one item is returned, the object stream contains just a single card.

The header area of the quick view cards in the object stream navigates to the detail view for that specific object in the parent application. The footer area of the quick view cards can also offer [actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#actions).

#### Object Stream – Scroll Arrows

Scroll arrows only appear on desktop devices. If all the cards in the object stream fit on the screen, the arrows are not visible. If the number of cards exceeds the available space, an arrow icon appears on the right when the user mouses over the object stream overlay. Mousing over the arrow button area scrolls the cards across the screen from right to left. As soon as the first card on the left moves out of the visible overlay area, a second arrow appears on the left for moving in the other direction. Once the last card is in full view, the arrow on the right disappears.

#### Placeholder Card
If the number of items returned for the annotated view exceeds the maximum 20 cards allowed in the object stream, a placeholder card is added automatically at the end of the stream (as card 21). The entire
placeholder card is navigable, and takes the user to the full result set in the parent application.
The text on the placeholder card is composed as follows:
**See all _[total] [items]_ in the _“[app name]”_ app.**
Where:
- The values for _[total]_ and _[app name]_ are supplied by the system.
- The term for _[items]_ must be rephrased by the app team to reflect the type of item or business object. For more information, see [Mandatory Adjustments](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates#mandatory-adjustments).
Examples:
- See all 42 items awaiting approval in the “Approve Leave Requests” app.
- See all 42 purchase orders awaiting approval in the “Approve Purchase Orders” app.
#### Object Stream – Tablet Version
On tablet devices, the modeless       | _Tablet in horizontal orientation_          | _Tablet in portrait orientation_
overlay expands horizontally. It also
expands vertically to accommodate the
card height and allow space for the
title and _Close_ button. The user
can swipe through cards and perform
micro actions. Swiping a card into
view moves the entire object stream.
Tapping the _Close_ button closes the
stack card and returns the user to
the main overview page. There are no
scroll arrows on touch devices.
#### Object Stream – Phone Version
On smartphones, the overview page     | _Phone in horizontal orientation_          | _Phone in portrait orientation_
layout collapses to a single column
in both portrait and landscape modes.
Tapping the right-hand navigation
area of a stack card opens the object
stream on top of the overview page in
a new full screen window.
The object stream expands
horizontally and vertically to
accommodate the card height, and to
allow space for the title and _Close_
button. The user can swipe through
the cards and perform micro actions.
Swiping a card moves the entire
object stream. Since the cards are
too large to fit on the screen in
landscape mode, users can also scroll
vertically to see the full card
content. Tapping the _Close_ button
closes the stack card and returns the
user to the main overview page. There
are no scroll arrows on touch
devices.
## Quick View Card

Quick view cards are single-object cards. They display the basic details for one object, such as the name, address, and phone numbers for a contact. This card type is only available within the [object stream](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#objectstream); you can’t place quick view cards on the overview page itself. The quick view card inherits the SAPUI5 element [sap.m.QuickView](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.m.QuickView/samples).
The header area contains a static text, such as _Purchase Order_, and an optional dynamic text, such as _1005-3345_. In this way, each card header can show different content. Clicking on the header area of the card opens the detailed view of
the object in the corresponding parent app. If the content area of a card cannot display all the information, a scrollbar appears on the right. Only the footer area of the quick view card can provide [actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#actions). The footer bar is a specific feature of the card anatomy for quick view cards.
_Quick view card for a contact_           | _Quick view card for a product_           | _Quick view card for a purchase order_

#### Actions on Cards

Only [quick view cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#quickviewcard) within an [object stream](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#objectstream) can have actions in the footer area. The [overflow toolbar](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.OverflowToolbarSimple/preview) manages how the actions are displayed. All actions are right-aligned. Any actions that don’t fit into the available space move into the overflow action sheet, represented by the ellipsis (:overflow: ). A maximum of six actions are allowed in the footer area. Only offer actions the user really needs in the specific context.

There are two possible types of action: navigation and function import. Any combination of navigation and function import actions is allowed. Error or confirmation [messages](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) are displayed directly on the overview page. Always overwrite the predefined default text for errors in a [message box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/): Formulate your message in plain language (without code), describe the issue precisely, and suggest a constructive solution.

Navigation is “intent-based” and takes the user to a different SAP Fiori app that specializes in executing an action. Navigation actions are always multi-click (meaning they can be repeated over and over). The destination screen opens in the same browser window, and any error or task confirmation messages are handled by the supporting application, not the overview page.

Function imports are custom OData service operations for actions. These actions are handled by the overview page, rather than by another SAP Fiori app. The interaction depends on whether or not the action requires user input:

- If the action requires additional user input, the input parameters are handled directly on the overview screen without further navigation. A [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) appears on top of the card, allowing the user to enter data or make a selection. An example of additional input might be the rejection reason for a “Reject” action.
- If the action has no input parameters, the action request is sent immediately. Once the action has been completed, the card disappears from the object stream.

If an action on a card requires an input dialog box, use a full screen dialog on smartphones.

---

## Floorplans > Overview Page Ovp > Cards > Overview Page Table Card > Usage

## Intro

Table cards are a type of [object group card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#object-group-cards), and display a set of items in a table format. Table cards use the responsive SAPUI5 control [sap.m.Table](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.Table). For general information on cards, see [Cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/).

Carousel (full-width)

## Navigation

Clicking the **header** area of a table card opens the parent application, which uses the same filter as the annotated card, and shows a list of all the objects returned for the result set. The [counter](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#counter) indicates how many items are showing on the card in relation to the total number of relevant items: _[Items on Card] of [Total Items]_, as in 3 _of 10_.

Clicking a **list item** (row) on the card opens the detail view for that specific object in the same parent application. You can also use the [smart link control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-link/) in table cards. However, only use smart links if they add genuine value in your use case. Otherwise, you risk confusing users by offering too many navigation targets.

All three columns can show either a data field or a data point. Data points can use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).

Because the header area and line items are based on the same result set, they must always link to the same target application. You can also integrate a [view switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/#view-switch) inside the content area of a card.

### Size of a Table Card

The [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/) defines a specific size. The height can vary depending on the number of table cells. Tables are limited to a maximum of 3 columns and 3 rows, with a maximum of 3 lines of text per row. To see the full result set, the user needs to navigate to the parent app.

In the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/), users can see more content/insights by resizing the cards.

---

## Floorplans > Overview Page Ovp > Overview Page Card > Usage

## Intro

**Cards – Harmonized and Powerful Information**
Each task or topic on an [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/) is represented by a card. The overview page acts as a UI framework for organizing multiple cards for one role on a single page .
- Each card represents a specific topic, task, or
Cards are containers for app content, and represent an entry-level view of the most pertinent app data for a given topic or issue. Technically, a card is a smart component that uses UI annotations to render its content. Cards allow you to show application content from different sources side by side – without requiring the user to switch screens. Cards differ in the content they display: They can show a chart, a list, a table, informative text, or a combination of two elements. However, cards never have editable fields.
- Cards help users to focus by applying progressive
Cards can focus on a [single object](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-dates#singleobject) or topic, or on a [group of objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/#objectgroup). Cards can also vary in size, depending on the selected [layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#overview-page-layout).
- Cards are powerful and beautiful.
The overview page can contain several cards that reference the same (parent) application. However, each card must bring added value to the user, and not just repeat information already offered on another card.
Before you start designing cards for an overview page, see the [best practices](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-card/#best-practices).
## Card Anatomy

Each card comprises two components: a header area and a content area. The header and content areas are mandatory. A footer area is only used for [actions in the quick view card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/#actions-on-cards).
The interactive navigation in the header and content areas is represented by a hover effect.
When designing cards, make sure that you define and format the texts on all the cards consistently. For details , check out the [UI text guidelines for the overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/).
### Card Header

The card header area is mandatory, and serves the following purposes:

- It indicates what the card is about.
- It functions as a navigation area for opening the parent app, whereby the whole header area is clickable. We highly recommend offering this navigation to enable users to move seamlessly to the app details without losing focus on the task in hand (exception: [link list card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#link-list-card)).
- A counter shows how many items are on the card in relation to the total number of relevant items.
- An overflow menu with options to add the card to the My Home page or to refresh only the data in the card, not the entire page.

The height of the header area is variable; it expands vertically to accommodate the text. The header area can contain two text fields: a mandatory title, and an optional subtitle. The primary purpose of the header area is to identify the content source, summarize the focus of the card (title), show any relevant parameters (subtitle), and offer navigation to the content source (parent app).

#### Title
The title is mandatory and represents the card’s “point of
view”. In one or two words, it explains why this card exists
and why a user might want to use it. It is a natural language
reflection of the annotated view. Titles that exceed three
lines are truncated with the ellipsis (_…_).
#### Subtitle
The subtitle is optional. You can use it to qualify the title,
offer an explanation, or show a status. The use of the
subtitle can differ, depending on the card type. Subtitles
that exceed one line are truncated with the ellipsis (…).
#### Counter

The counter in the header area indicates how many items are showing on the card in relation to the total number of relevant items:

Format: _[Items on Card] of [Total Items]_ Example: 
The counter is right-aligned and is never truncated (the title wraps instead). The width of the counter is flexible, depending on the amount of data. _[Items on Card]_ can show a maximum three digits, and _[Total Items]_ a maximum of four digits. For larger numbers, a scaling factor is shown. If all the relevant items are visible on the card, no counter is shown. There is also no counter if there is an issue loading a card, or no items are found for the filter criteria.

In the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/), the card counter adapts to the card size. If the user increases the size of a card with a scaled counter, the counter shows the exact number of items (without the scaling factor). The scaling factor appears when values exceed 1000.

#### Overflow Menu

The overflow menu lets users perform the following actions:

- Refresh: refresh only the data in the card, not the entire page.
- Add Card to My Home: add the card to the Insights area of the My Home page.

### Card Content

The content area is mandatory and is reserved for application content. Content is currently displayed on cards by embedding SAPUI5 controls that specify the properties and data format. For example, an embedded [standard list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/) control provides formatting, such as row height, font sizes, and the number of text blocks.

The resizable card layout also has a special kind of the content area, called [mini content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-card/#mini-content). It describes the minimum height for the card content.

## Card Types

The overview page supports the following standard card types:

- [Analytical card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/)
- [List card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/)
- [Bar chart list card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/overview-page-ui-text-guidelines#bar-chart-list-card)
- [Link list card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-numbers#link-list-card)
- [Table card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/)
- [Stack card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/)

You also have the option of creating [custom cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-time). Custom cards allow you to define the appearance and the type of content within the content area of a card.

**Important:** Only use custom cards if the features required for your use case are not offered **in any way** by the standard cards for the overview page. If your basic requirements can be reasonably covered by one of the standard cards, always use the standard card, even if there are technical or visual limitations.

## Appearance

### Texts in Cards

Make sure that you define and format the texts on all the cards consistently. Check the [UI text guidelines for the overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/) for details.

### Formatting Dates, Times, Amounts, and Currencies

Apply the following formats:

- **Dates**: The default is the [relative date format](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/#relative-format) (for example, _Today_). However, you can also use the [medium date format](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-card/#medium-format) (such as _Aug 7, 2015_).
- **Times**: Times are not visible by default, but if you need to show a time, use the [short format](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/#short-format) (for example, _11:28 AM_).
- **Integers**/**Float**/**Currencies**: Use the [short format](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-table-card/) (for example, _1K_ for 1000).

### Refresh Behavior

You can set a specific refresh interval for the card content. All cards are refreshed at once.

Keep the user in mind: the shorter the refresh interval, the more disruptive it is for users.

## Navigation and Interaction

The navigation and interaction depends on the technical card type:

- [Single-object cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-table-card/#singleobject)
- [Object group cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-card/#objectgroup)
- [Link list cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#linklistcards)
- [Stack cards](https://wiki.wdf.sap.corp/wiki/display/fioritech/OVP+Cards#stackcards)

The [view switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-table-card/#viewswitch) enables you to reduce the number of similar cards and avoid repeating information.

#### Single-Object Cards
Cards that feature content with a single focal point, detail, or entity are called single-object cards. An example is a [quick view card](https://wiki.wdf.sap.corp/wiki/display/visualcore/2.\+OVP\+Cards#quick-view-card) with information about a particular product. [Analytical cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) are also single-object cards. The header area of this card type always navigates to this specific focal point, detail, or entity. The content area can also have interaction areas (for example, a section in a chart, or a telephone number for a contact). However, only quick view cards can have [actions in the footer area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates#actions-on-cards).

#### Object Group Cards
Cards that feature a subset of items grouped by a common criterion are called object group cards. A typical example would be a list of purchase orders grouped by delivery date, amount, or supplier. The cards do not have actions, but each row or list item is selectable, thus providing direct navigation to the object details within the parent application. The header area of this card type always navigates to all items in the list or table. Object group cards include all types of [list cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/), [bar chart list cards](https://help.sap.com/viewer/DRAFT/96880755e4e64fcd96c12694f430fece/Internal/en-US/74332d5d829b413f9d7c0950dc6a71d2.html#bar-chart-list-card), and [table cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/).

#### Link List Cards
Link list cards allow you to display a collection of links or images that can reference both internal and external targets.
- **Links** can navigate to a target or open a popover with additional information.
- Clicking an **image** opens an [image carousel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/carousel/).
#### Stack Cards
A stack card is a special card type for showing a collection of single-object cards. Stack cards have 3 components with different navigation areas:                                                                                                                                                                           | _Interaction for a stack card_          | _Interaction for a placeholder card_
- The top-level [stack card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) opens the collection and contains two clickable areas: the left area navigates to the parent app (with the list of all items), and the right area opens the object stream.
- The [object stream](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/overview-page-ui-text-guidelines#object-stream)
shows individual cards that represent objects from the parent application. The object stream heading links to the parent application, while individual cards can contain links and actions
relating to the respective object. A _Close_ button returns the user to the stack card.
- The last card in the object stream is the [placeholder card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-card/#placeholder-card). The entire card is navigable and leads the user directly to the parent application.
#### View Switch

You can use a view switch to offer several different content areas on one card, which can help to reduce the number of cards on the overview page. The user chooses the view using a [select control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-custom-cards/).
You can only combine views that have a common denominator. The options offered by the select control merely offer different perspectives. For example, a card “Purchasing Spend” (title in the
header area) could offer two views “By Material Group” and “By Supplier” (options in the select control). The view switch is located in the upper part of the content area.
You can use the view switch for the following cards:
- [Analytical card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/overview-page-ui-text-guidelines)
- [List card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-card/)
- [Bar chart list card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/#bar-chart-list-card)
- [Table card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/standard-list-item/)

---

## Floorplans > Overview Page Ovp > Overview Page Fixed Card Layout > Usage

## Intro

**Self-Contained Cards**
The fixed card layout is a layout for the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/). It comes with predefined card characteristics that support automatic, easy and fast card design. The cards have a fixed width, and the height is determined by the card type and the embedded control.
- Fixed card width and predefined height
The cards are ordered in responsive and collapsible columns. The number of columns is also fixed to keep the focus on the middle of the screen and show the set of cards in a compact display (a kind of letterboxing). For more
information, see [Responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-table-card/#responsiveness).
The fixed card layout is one of two layout options for the overview page. The other is the [resizable card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/).
Before you start designing cards for an overview page, see the [best practices](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/#best-practices).

## Fixed Card Sizes

### Grid
The grid is based on rows and columns. The spacing of 1 rem between the cards is always stable. Furthermore, there is a minimum width of 20 rem per card (corresponding to the
column width). The columns with the cards adapt to the available screen real estate (also see [Responsiveness](https://sapui5.hana.ondemand.com/#responsiveness)).
Based on the underlying grid, users can rearrange the cards (see [Rearranging Cards – Behavior](https://help.sap.com/viewer/DRAFT/96880755e4e64fcd96c12694f430fece/Internal/en-US/c64ef8c6c65d4effbfd512e9c9aa5044.html#rearranging)).
The cards are arranged as a “Z” flow: cards are ordered from left to right, starting with the first card on the top left of the page. For example, if a 5-column layout is reduced to
4-column layout, the fifth card drops to the next row, assuming the leftmost position underneath the first card.

There is no limit on the number of cards included. However, be careful not to overwhelm your users.
For general information on cards, see [Cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/).
### Card Sizes per Type

The card size is determined by the predefined card characteristics and maximum content for a given card type. As a result, the card types differ in height. The [stack card](https://wiki.wdf.sap.corp/wiki/display/fioritech/Fixed\+Layout\+Design) and corresponding [quick view card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-stack-card-quick-view-card/#quick-view-card) are handled independently.
Default (col-1)

#### List Card
The height of [list cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/)
can vary, depending on the number of text fields. Show no more than five standard list items and no more than three extended list items on one card. To see the full result set,
the user needs to navigate to the parent app.

Carousel (full-width, col-2)

Section Metadata

style

Default (col-1)

#### Bar Chart List Card
The height of [bar chart list cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/#bar-chart-list-card)
can vary, depending on the number of text fields. Show no more than five standard/condensed list items and no more than three extended list items on one card. To see the full result set, the user needs to
navigate to the parent app.

Carousel (full-width, col-2)

Section Metadata

style

Default (col-1)

#### Link List Card (Variant Type “List”)
The [link list card with the variant type “list”](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/cards/overview-page-list-cards/#variant-type-list) is limited to a maximum of six links. There is no limit to the number of links for the [variant type “image”](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/#variant-type-image).
Carousel (full-width, col-2)

Section Metadata

style

Default (col-1)

#### Table Card
The height of [table cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/)
can vary, depending on the number of table cells. Tables are limited to a maximum of 3 columns and 3 rows, with a maximum of 3 lines of text per row. To see the full result set, the
user needs to navigate to the parent app.

Carousel (full-width, col-2)

Section Metadata

style

## Rearranging Cards – Behavior

### Drag and Drop
Users can reposition cards on the overview page by dragging them to a different location. As the user drags a card, it swaps places with any cards in its path. As soon as a neighbouring card is touched, the position of that card becomes the new target location for
the card being dragged. A dashed line offers a preview of the new position.
To drag a card, the user has to long press on a card instead of just clicking. It doesn’t matter where the cursor is positioned – cards can be dragged from both the header and content areas. The mouse cursor also changes to indicate that the card can be dragged.
Releasing the mouse or lifting the finger from the touch surface completes the move. To avoid gaps, cards always snap to the next free space in the row, or to the start of the next row.
In addition, users can [personalize](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#personalized-selection-of-cards) their own overview page by hiding cards.
## Getting Started

Default (col-1)

In the fixed card layout, you can’t influence the amount of information on each card. However, you can define the card order. Before you design your overview page, take a look at the [best practices](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/#best-practices), which outline how to best use cards for an optimal user experience.

> **Hint:** 
Section Metadata

style

## Responsiveness

The fixed card layout uses padding on both sides. The cards are displayed inside collapsible columns, making the page fully responsive. When the user resizes the browser or uses a smaller screen, the
columns containing the cards collapse. To view all the cards, the user just scrolls down. In this way, the layout can accommodate typical laptop screens, larger desktop monitors, and mobile devices.
_Fixed card layout – Size S_           | _Fixed card layout – Size M_
The width of the cards is tied to the column width. Breakpoints for the different screen resolutions determine whether the column width is 20 or 25 rem. The cards inside the columns adapt their width and
content automatically. By contrast, the height of the cards is flexible, and depends on the content and type of card (see [Card Sizes per Type](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/#cardsizes)).
- Phone: 1 column                                                                                                                                                                                                                                                                                                            |                                        | _Fixed card layout – Size L_
- Tablet (portrait): 2 columns
- Laptop / tablet (landscape): 3 columns
- Large desktop: 4 columns
- Extended monitor: 5 columns (maximum)

---

## Floorplans > Overview Page Ovp > Resizable Card Layout Overview Page > Usage

## Intro

#### Unlimited Possibilities for Designing Cards
The resizable card layout is a layout for the . It
enables users to define a personalized card layout by
changing not only the position of a card, but also its
size, and thus how the card content is presented.
This layout gives users much greater flexibility in
tailoring the overview page to their specific business
needs. And it allows app teams to offer varying levels of
detail for any given card. Whenever the size of a card
changes, the content adapts automatically to show the
most relevant information in the available space.
Unlike the [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/), cards in the resizable card layout do not have fixed dimensions. In addition, the number of columns in the resizable layout is no longer limited (also see [letterboxing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#letterboxing)).

The cards are positioned on an underlying [grid](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#grid), making it possible to arrange and resize cards in a flexible, yet guided manner. You can offer different views of the card content for different dimensions of the various card types. For example, you can show more items, zoom in or out, or change the granularity of a dataset.

The resizable card layout does **not** replace the [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/).

## Usage

### Use the resizable card layout if:
- You want to give users the **flexibility** to rearrange and adapt their overview page as they need.
- You want to **help users focus** by applying progressive disclosure principles.
- You want to make use of **different card sizes**.
- You want to **show more content** (for example, more items or an additional level of detail)
## Flexible Card Sizes

### Grid
Cards can be increased and decreased vertically in rows
of 1 rem and horizontally in steps of 20 rem (minimum
width). These dimensions facilitate both a high degree of
flexibility and measured guidance. The card content
responds immediately to a change in size.
The grid provides a guided resizing and repositioning
experience. This ensures that the cards are always
correctly aligned on the overview page as the user moves
or resizes them.
### Card Anatomy
A [card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/) is made up of a mandatory header and a content area.
#### Mini Header
The smallest representation of the card is the header. The card can be collapsed to only its header height. We call this the “mini header” card height.
#### Mini Content
The “mini content” height of a card is defined by the next suitable size for a card when it is resized. The minimum height for the card content depends on the card type, and must be as high as the
smallest representation of the content. In a list card, for example, first list item needs to fit in.
To avoid states with cut or unsubstantial content, there are no resizing steps between mini header and mini content.
### Dealing with White Space

If no additional content is available, the user still can make the card bigger, resulting in white space.

## Resizing Parameters

The card content depends on the available space, which in turn determines how many items are shown, how each item is displayed, and the level of detail (granularity). How the content is resized depends on the type of card. For example, table cards can have fewer columns when the size of the card is decreased. By contrast, the content shown for each item on list cards remains the same.

### Space
When a card is resized, the content adapts responsively.
_Example: List card_ When the size of a card is reduced,
texts might be truncated or wrapped. When the card size
is increased again, the text is shown in full and
previously wrapped text moves back onto one line. The
line item content itself is unchanged.
### Items
When you increase the size of a list or table card, more
line items are shown.
### Granularity
If you increase the size of an analytical card, more data
points are revealed. In this example, the donut chart on
the larger card shows more individual product categories.
## Rearranging Cards – Behavior

When a user long presses on a card instead of just clicking, the mouse cursor changes to indicate that the card can be dragged. Cards can be dragged from both the header and content areas.

Cards always strive towards the top of the page (uplift mode). When you move or stretch cards horizontally, the existing cards you displace are pushed downwards.

Image

<https://main--builder-prospect--sapudex.hlx.page/design-system/images/resizing-cards.gif>

## Getting Started

### UX and DEV Investment Required

To enable users to benefit fully from the resizable card functionality, you need to define additional content that is revealed progressively as the card size grows. You will need to develop a content strategy to prioritize the chunks of information for each card type, and hence the order in which these additional chunks of information appear. For instance, the content strategy for a table card should answer the following questions:

- What should be the [initial size](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#set-initial-card-sizes) of the card in the layout?
- Which table columns do you want to show in the card with the minimum width?
- Which table columns do you want to add when the card width is increased by one, two, three, … horizontal steps?

\Keep in mind that the overview page is an [SAP Fiori element](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).

> **Hint:** If you want to enable the resizable card layout for an existing overview page with the fixed card layout, consider
the investment you’ll need to make in additional and meaningful content.

### Set Initial Card Sizes

Set an initial order and initial dimensions for each card as a default. Do this for the mini header, the mini content, and for bigger card sizes. In cards with content, define the exact number of items included in the content area.

Consider the best practices for designing an [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) and the principles for resizing the cards. It’s important to provide a meaningful starting point for users. If users change the card size or order, the initial app default can always be restored using the [Manage Cards setting](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/#personalized-selection-of-cards) in the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad#user-menu).

**Important: Do not provide only mini headers in the initial layout for your overview page.**

### Block Card Resizing

App teams can block the resize feature for each card individually. In this case, the cards can’t be resized by users and the resize icon is not shown on the card. Use this feature judiciously and only if you really have to. The majority of cards should be resizable. Otherwise, users are likely to be confused, and might feel driven to check the resizing behavior for each card.

If you want to make use of the different card sizes, but don’t want to allow resizing for users at all, you can block the resizing function for all cards (independently of the [initial card size](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#set-initial-card-sizes)). This allows you to use different card sizes and the same (limited) personalization features as in the [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/). Because none of the cards are resizable, users won’t be confused.

### Letterboxing

The resizable card layout uses different letterboxing behavior than the [fixed card layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-fixed-card-layout/): to handle different card sizes more flexibly, the resizable card layout does not have a fixed number of columns. Cards take up the the available screen real estate and adapt accordingly (also see [responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/overview-page-ovp/resizable-card-layout-overview-page/#responsiveness)). As a result, larger screens can be almost completely filled.

## Responsiveness

> **Information:** Resizing is not supported on mobile devices. However, users can resize cards freely in smaller windows on a desktop
device.

UI controls inside the cards react responsively when cards are resized. On mouse-release, additional content might be loaded, or content might be removed to reflect the new dimensions.

The number of grid columns in the layout is dependent on the width of the browser window. The breakpoints are defined as follows:

Table (col-1)

Width of Browser Window

Less than 656 px

656 – 975 px

976 – 1359 px

1360 – 1679 px

1680 – 1999 px

More than 2000 px

There is no limitation to the number of columns. You can also design for bigger screens.

Default (col-2)

Section Metadata

style

---

## Floorplans > When To Use Which Floorplan

# When to Use Which Floorplan

## Intro

Default (col-1)

Choosing the right floorplan is not always easy. Roughly speaking, SAP Fiori offers floorplans that:
- Provide an overview of information and tasks: **overview page**
- List several objects: **list report**, **analytical list report**, **worklist**
- Manage an object: **object page**, **wizard**
- Allow navigation to work on one object: **initial page**
For a quick check of which floorplan to use, see below. For more information, go to the respective floorplan article.

> **Information:** Except for the wizard and initial page, all floorplans are available as [SAP Fiori elements](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).

Section Metadata

style

## Overview Page

**Floorplan**                                                                                            | **Use Case**             | **Key Features**     | **Thumbnail**
[Overview Page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page/) | - Get an overview of     | - Filter bar,
the key tasks and      |   including a search
information needed for |   field
a specific user role   | - Content from
- React to information   |   different apps is
shown on one page
- Content can be
displayed in
different formats
(such as charts,
lists, or tables)
## List Floorplans

**Floorplan**                                                                                                                    | **Use Case**            | **Key Features**                                                                                   | **Thumbnail**
[List Report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) | - Find objects from a   | - Filter bar, including a search field
large data set        | - Objects can be shown in a table or in a
- Act on the relevant   |   chart. Switching between the table and
objects               |   chart is possible.
- Predefined views on the objects are
possible, for example _All_, _Open_, _Assigned_. Switching between the views is possible.
[Analytical List Page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/)           | - Extract knowledge or  | - Visual filter bar, where filters are represented as charts
insights from objects | - Switch to the non-visual filter bar without search field is possible
by using business     | - Data is represented in a chart and a table on one page
intelligence features | - Users can see the impact of their action on a global key performance indicator (KPI)
(drilldown for root   |
cause analysis, slice |
and dice)             |
- Act on the relevant   |
objects               |
[Worklist](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/work-list/)                                  | - Process a predefined  | - Filter bar not needed
set of objects        | - Predefined views on the items are possible, for example _All_, _To Be Assigned_, _To Be Ordered_
## Object Floorplans

**Floorplan**                                                                                                    | **Use Case**          | **Key Features**         | **Thumbnail**
[Object Page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/)             | - Display, create, or | - Flexible header
edit an object      | - Anchor or tab
- Get an overview of  |   navigation to access
an object and       |   the content
interact with       | - Flexible layout for
different parts of  |   the content
the object          |
[Wizard](https://www.sap.com/design-system/fiori-design-web/ui-elements/wizard/)                                 | - Create or edit an   | - Minimum of 3 steps,
object              |   maximum of 8 steps
- Guide the user      | - Summary that shows
through a series of |   the data for all steps
steps               |
- Task is rather long |
or unfamiliar for   |
users               |
[Initial Page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/) | - Navigate to one     | - Single input field
object and work on  |   with value help
this object         |
---

## Floorplans > Work List > Usage

> **Information:** This floorplan is available with [SAP Fiori Elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).
For information on the default settings and other options for the SAP Fiori element implementation, see [Worklist](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/worklist-sap-fiori-elements) in the _SAP Fiori Elements_ section.

## Intro

A worklist displays a collection of items a user needs to process. Working through the list usually involves reviewing details of the items and taking action. In most cases, the user has to either complete a work item or delegate it.

The worklist is a versatile floorplan that offers three main variants: a simple worklist (plain page with a table), a worklist with tabs, and a worklist with one or more KPI tags. These variants are based on different user needs and use cases. For more details, see the options under [Components](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/#components).

_Simple worklist_          | _Worklist with tabs_          | _Worklist with KPI_

## When to Use

### Use the worklist floorplan if:

- Users have numerous work items and need to decide which ones to process first.
- You want to give users a direct entry point for taking action on work items.
- Users need to work with multiple views of the same content (for example, items that are “Open”, “In Process”, or “Completed”). You want to offer tabs for switching between views.

### Do not use the worklist floorplan if:

- The items you are showing are not work items.
- You want to show large item lists, or combine different data visualizations (charts or tables). In this case, use the [list report floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#top) instead.
- Users need to find and act on relevant items from within a large set of items by searching, filtering, sorting, and grouping. Use the list report floorplan instead.

## Components

The worklist floorplan is based on the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#components) layout and is divided into a header and the page content. The header has a [header title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-title), but no header content. As a result, the [expand/collapse](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#expandcollapse-header-feature) and [pin](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#pinning-the-header-content) features are not needed.

The worklist consists of the following areas:

1. The **header title** containing:
   - 1a – A [variant](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#variant-management) or a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) for the whole page (mandatory)
   - 1b – One or more [key performance indicators (KPI)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/#key-performance-indicator-kpi) (optional)
   - 1c – The [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#header-toolbar-global-actions) with global actions (mandatory)
2. The **content area** displaying:
   - 2a – The [tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#tab-bar) (optional)
   - 2b – A [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#table) (mandatory)
3. A **[footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#footer-toolbar)** (optional) including:
   - 3a – The [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/#top)
   - 3b – [Finalizing actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#4-finalizing-actions)

### Header Title

#### Variant Management

[Variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/) is optional. If used, apply it to the whole page. Use the variants to save and restore all settings, including selected [tabs](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/), all [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), and all personalization settings.

If variant management is not needed, just show a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) that describes the view.

#### Key performance indicator/ KPI

The [key performance indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-tag/#top) (KPI) allows users to track the impact of their actions while processing the worklist. You can display one or more KPIs within the KPI container next to the page title to show the [status/criticality](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-tag/#a-status-indicator-criticality-indicator-mandatory) of the tag.

#### Header Toolbar (Global Actions)

Use the header toolbar for global actions, such as _Share_. Do not place actions that finalize the current process (“finalizing actions”) on the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/) of the header title, even if they affect the entire page.

For more information, see [Global Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#1-global-actions).

### Content Area

#### Tab Bar

The tab bar is part of the page content container, and must be sticky.

In the worklist, the [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/) works as a filter on the content below. It enables users to call up work items in specific categories. This can help users to identify critical items more easily. Different tabs show different perspectives on the same dataset.

> **Guideline:** - Display the number of items shown in the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) on each tab (`sap.m.IconTabFilter`, property: `count`).
- Only use icons if you need to display [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/#colors) on the icon tab bar. You can offer visual orientation by applying semantic colors to the icons for the different categories (for example, red for the _Error_ tab).
- Bear in mind that each tab in an [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/) contains its own [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#table-toolbar).

#### Table Toolbar

Display at least a table [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) (ideally with an item count) and, if needed, icon-only [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for sorting, grouping, and column settings. For filter, sort, and group, show a [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/) with only the corresponding features enabled. For column settings, show the [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/). If you need more extensive functionality (for example, grouping or sorting on several levels, tables with more than 20 columns), use the [P13n-Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) with just the corresponding feature enabled.

#### Table

In general, you can use any kind of table and list for the worklist floorplan in the content area.

If there are no items to display, use the “no data text” for the corresponding [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). Explain why the table is empty, and what the user needs to do to display items. For more information and examples see: [“No data” texts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#no-data-texts).

The most basic version of the worklist is the simple worklist: a plain page with a table.

### Footer Toolbar

The footer toolbar is an optional component of the worklist floorplan. Only use it if finalizing actions for the whole page and/or the [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/#top) are required. Keep in mind that the footer toolbar is only visible in edit mode. For more information, see the guidelines for the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/).

> **Guideline:** Follow the standard naming conventions for all objects, the object name, action buttons, and the title in the shell bar. For more information, see:
- [Object Handling (Create, Edit, Delete)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#naming-guidelines)
- [Launchpad Shell Bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/#page-title-and-navigation-menu)

## Behavior and Interaction

### Initial Focus

When the worklist is loaded, set the initial focus as follows:

- If the worklist contains only a table, set the focus on the first line item of the table.
- If the worklist contains an icon tab bar, set the focus on the first tab.

### Sticky Behavior

The tab bar, table toolbar, and column headers must all be “sticky”. This means that they stay fixed at the top when the user scrolls down the page.

### Table Navigation

The worklist floorplan supports three types of navigation at item level:

- **Line item navigation**: If applicable, allow navigation to a detail view (usually an [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/)) at line item level. Show a navigation indicator (chevron icon) for each line item that provides a detail view. In a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/), or [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/), clicking the line item triggers the navigation. In a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/), clicking the navigation indicator triggers the navigation. Another option is to use a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) as the identifier for the line item. This link triggers the navigation. Use it only if the navigation indicator points to a different target.
- **Drilldown navigation**: If a line item contains aggregated data, allow navigation to a view that contains details for the aggregated amount. This is usually a list report. Use a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) to display the aggregated amount. If the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) contains many columns with links, use the link options to provide different levels of highlighting. In [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/), offer the drilldown navigation link in the popover for the chart element, and navigate to the corresponding list report to show the details.
- **Cross navigation**: If a line item contains a cross-reference to another entity, such as a person or business object, use a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) to display the corresponding data point in the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization). Triggering the link opens a [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/).

### Actions

The worklist offers four locations for actions:

1. Global actions in the header toolbar
2. Table actions in the table toolbar
3. Line item actions
4. Finalizing actions in the footer toolbar

> **Guideline:** - Hide actions that cannot be used. This can be the case if the user has no authorization or the line item has the wrong state.
- To save space, group similar actions using a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1). For example:
- _Release_ and _Release with Conditions_
- _Add Contact_ and _Replace Contact_
- _Edit Account_ and _Edit Title_
- If there is not enough space to show all actions, they are moved to an [overflow menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow-generic), depending on their priority. For more information, see [Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#components).

#### 1. Global Actions

Place actions that affect the entire page in the header title within the header toolbar. Examples of global actions are _Edit_, _Delete,_ or _Share_.
Actions in the header toolbar are always right-aligned. Emphasize the most important action and place it on the very left.

For more information, see [Header Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/).

#### 2. Table Actions

Place actions that affect the content of a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) in the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).

##### When to Enable, Disable, or Hide Actions

Indicate whether an action is available. Some actions are always available, such as _Create_ for new objects. Other actions are only relevant if items have been selected. For example, _Edit_ at item level, _Remove_, object-specific actions, or actions that change the status of an item.

**Enable** the following actions:

- All _Add/Create_ actions, unless the user needs to specify where in the table the new item should be added.
- _Edit_ actions that switch the entire table to edit mode (independent of the selected items).
  If the user triggers the _Edit_ button, replace it with _Save_ and _Cancel_ buttons (see [Editing the Whole Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/#edit-the-whole-table)).
- Item-dependent actions that can be applied to some or all of the selected items.

**Disable** the following actions:

- Item-dependent actions (such as _Delete_) when no items or only unsuitable items have been selected .
- _Add/Create_ actions where the user needs to specify the insert position in the table, but either no item has been selected, or more than one item has been selected.

For more information, see [UI Element States – Control States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#control-states).

**Partial Processing**

Allow the user to apply the changes to as many of the selected items as possible.

If an action can’t be applied to all selected items, show a warning message **before** executing the action:

- Indicate the number of selected items that can’t be processed (out of the total number of selected items).
- Give a reason why the action can’t be applied to these items.
- Let the user choose whether to apply the action to the remaining items anyway or cancel the action.

[See an example here](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/#guidelines).

Note: In some scenarios, you might not be able to identify whether an action can be applied to all selected items before executing it. If the system is unable to apply the action to all items, show a message after executing the action.

##### Sort, Group, Personalization

Decide if you need to provide sorting, grouping or personalization for your use case. If you offer more than one of these actions, offer them as single actions. We recommend keeping them in the following order: 
For more information on table and chart actions, see:

- [Table Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/)
- [Chart Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-toolbar/)
- [Object Handling (Create, Edit, Delete)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects)

#### 3. Line Item Actions

In rare cases, actions that affect a single item can be placed directly inside the line item. Use this option only for specific, frequently-used tasks. If the same action can also be applied to several items at once, you can also place it on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). However, if you do so, reconsider whether you really need to offer the action at line item level. For more information, see [Actions in Table Rows](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#actions-in-table-rows).

Examples of line item actions include: _Start/Stop_ (a batch job), _Approve_ (an item) or _Assign_ (an item).

Do not disable line item actions. If an action can’t be used, hide it.

#### 4. Finalizing Actions

Place actions that trigger the end of a process and affect the entire page in the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/). Examples of finalizing actions include _Save_, _Cancel,_ and _Submit_.

Bear in mind that even if you are using the [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/), there is only one footer toolbar for all tabs.

> **Guideline:** Often, users will need more information before they can take action. If this is the case, offer navigation to the work item details, and show all the relevant
actions in the detail screen. Once the user has completed the task, the app should:
- Return the user to the worklist
- Remove the processed item from the list, or move it to a “completed” section
- Confirm the user’s action with a [message toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/)

## Responsiveness

The [Grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), and [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) are supported on **desktop and tablet devices only** so you cannot use them for mobile use cases. Instead, for these cases, take an [adaptive approach](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness#adaptive-approach):

- Create a new Fiori application with reduced complexity, not an exact match of the desktop application.
- With the new application, address the most important use cases for users in a mobile context. The responsive controls ([responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) or [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/),) or a relevant control for your use case (for example a [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) or the [category navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/category-navigation/) pattern) may suffice.

For more details, see the respective guideline articles.

_Worklist floorplan - Size L/XL_          | _Worklist floorplan - Size M_          | _Worklist floorplan - Size S_

## Examples

_Worklist floorplan - Size L/XL_          | _Worklist floorplan - Size M_           | _Worklist floorplan - Size S_

## Top Tips

### General

- Decide whether the worklist or the list report is the right floorplan for your needs: The focus of the worklist floorplan is on processing items. This differs from the [list report floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), which focuses on finding and acting on relevant items from a large dataset.
- Choose one of the three basic worklist variants, based on your use case and the user’s needs.

### Header

- Always display a title or offer variant management.

### Content

- Responsive table is the only fully responsive table. Analytical table, tree table and grid table are not fully responsive. They are available only for desktops and tablets, so you will need to take an adaptive approach by offering an additional UI for smartphones.
- In the table toolbar, display at least a table [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) (ideally with an item count). If needed, offer icon-only [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for sorting, grouping, and column settings.
- The tab bar, table toolbar, and column headers of all table types must all be [sticky](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/floorplans/work-list/#sticky-behavior).

### Footer Toolbar

- If you are using the icon tab bar, remember that there is only one [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) for all tabs.
- Only use the footer toolbar if finalizing actions for the whole page and/or the [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/#top) are available.

---

## Page Layouts > Dynamic Page Layout > Usage

## Intro

The dynamic page is the foundation for all pages in SAP Fiori. It is a generic layout control designed to support various floorplans and use cases. As a result, the content of both the header and the page can vary. Depending on your use case, you can either use one of the [predefined floorplans](https://www.sap.com/design-system/fiori-design-web/page-types/when-to-use-which-floorplan) or create your own layout.

One part of the dynamic page header (1) is collapsible, which helps users to focus on the actual page content (2), while ensuring that important header information and actions are readily available. The dynamic page also includes an optional footer toolbar (3) for closing or finalizing actions that impact the whole page.

Carousel (full-width)

All SAP Fiori floorplans use the dynamic page, or are visually aligned to look the same. For detailed guidance, see the corresponding floorplan articles.
The following floorplans use the dynamic page:
- [Object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#components)
- [Analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/#basic-layout)
- [List report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#components)
- [Overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/#dynamic-page)
- [Wizard](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/wizard/)
- [Worklist](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/#components)
## When to Use

### Use the dynamic page if:

- You want to build a freestyle application that uses the foundation layout components for SAP Fiori pages, such as the [dynamic page header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header) and the [footer toolbar](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#footer-toolbar). Also see the related [semantic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/semantic-page/).
- You want to build a simple [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#navigation-bar-optional) with only one section.
- You want to represent your application in full screen. Also the combination within the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#Combining) is possible.

### Do not use the dynamic page if:

- You are planning to use [SAP Fiori elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates), such as the [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/), [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/), or [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/). These floorplans already incorporate the dynamic page.
- You want to implement an [initial page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/) or an [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#navigation-bar-optional) floorplan with complex content and several sections. These floorplans only use the dynamic page header.
- You only need to display a small amount of information. In this case, use a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) instead. If you can’t avoid using the dynamic page, use [letterboxing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/letter-boxing/) to mitigate the issue.

### Dynamic Page vs. Semantic Page

The dynamic page is a skeleton structure that comes with empty content containers (page header, page content) and built-in responsive behavior.

This basic structure can be “filled” with content elements in three ways:

- **Automatically**: If you are using an [SAP Fiori element floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates), the content of the dynamic page is provided out of the box.
- **Via the semantic page (recommended for freestyle apps)**: If you are creating a floorplan from scratch, you can use the [semantic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/semantic-page/) (`sap.f.semanticPage`) to create a freestyle page. The semantic page is a separate control that comes with built-in logic for adding predefined content elements to the page, such as a title, global actions, and a footer toolbar. Using the semantic page significantly reduces the development effort for app teams, and ensures that the header and footer content is structured consistently.
  Note that in this case, the app developer uses only the semantic page control (which already embeds the dynamic page), and not the dynamic page control itself.
- **Manually**: Technically, it’s possible to build the dynamic page from scratch. However, implementing the dynamic page manually is a significant development effort! Only consider this option in exceptional cases (for example, if you have special requirements for a freestyle app that cannot be implemented using the preconfigured semantic page control).

## Components

Like all layouts, the dynamic page is below the [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/) of the SAP Fiori launchpad, which is always at the very top. The dynamic page consists of the following areas:

1. [Dynamic page header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header), comprising the header title (1a) and the expandable/collapsible header content (1b)
2. Title
3. Subtitle/summary
4. Key information / KPI
5. Global actions
6. [Header features](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-features) to expand/collapse (6a) and pin/unpin (6b) the header
7. Page content (differs depending on the use case and floorplan)
8. [Footer toolbar](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#footer-toolbar) with finalizing actions

Carousel (full-width)

### Dynamic Page Header

The dynamic page header contains the [header title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#header-title) (mandatory) and the [header content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#header-content) (optional).

#### Header Title

The header title bar (`sap.f.DynamicPageTitle`) always contains one of the following elements:

- **Title** (1): The title is located on the left of the header title bar, and is always visible. The title can contain one of the following components:
  - [Title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) (text)
  - [Link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/)
  - [Variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/)
  - [Input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use) (for the [initial page)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/)

- **Subtitle/summary** (2)
  Placement: Always below the title. The subtitle is often used to summarize the most important information in the collapsed header content. For example, if the header area contains a filter (as in a [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/), or [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/)), the subtitle can be used to display the “Filtered By” information.
- **Breadcrumb** (3)
  Placement: Above the title. Depending on the floorplan and use case, you can add [breadcrumb](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/breadcrumb/) navigation. The breadcrumb is located above the header title, and is primarily used to display the hierarchy of subpages within an object page.
  Note that in the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), the breadcrumb is only available in full screen mode, and only if just one column is visible.
- **Key information** (4)
  Placement: In the middle area, but left-aligned. Floorplans can also contain key information, such as text, mini facets, and KPI tags.
  Note that currently, KPI tags are only used within the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) and [worklist](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/) floorplans.
- **Global actions** (5)
  Placement: Global actions for the entire floorplan appear on the right-hand side of the header title bar. Always offer the actions as [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/), visualized either as text or icons. For more information, see [Header Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/#business-actions). In the collapsed mode, the header title offers the same actions as in the expanded mode and keeps them actionable.
- **Layout actions** (6)
  Placement: Typical layout actions are the _Close_, _Full Screen_, or _Exit Full Screen_ icons, which are mainly offered by the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/). Depending on the screen size, the layout actions are placed either on the very right of the global actions toolbar, separated by a divider line, or above the global actions (see more in the [Responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#responsiveness) section). Note that the dynamic page only provides the area for the layout actions. The **navigation actions themselves are defined separately** (for example, using the [semantic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/semantic-page/)).

> **Guideline:** - Do not remove or disable the actions within the global action toolbar when the header content is collapsed.
- In the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), ensure that the icons for the _Close_ or _Full Screen_ / _Exit Full Screen_ actions always stay on the very right. Their position then remains stable, even if other actions are added (such as the [paging buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/#paging-layout) :slim-arrow-up: and :slim-arrow-down: ). The _Close_ and _Full Screen_ / _Exit Full Screen_ actions must never move into the overflow.

#### Header Content

The optional header content (`sap.f.DynamicPageHeader`) is located below the header title. You can place any components in the header content area (1) as long as they follow the guidelines for the respective floorplan.

When the dynamic page header collapses, the header content area is hidden. If there is no header content, the header content area is hidden automatically. In the latter case, the header title is not interactive ([snap on scroll](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-scroll) or [snap on click](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-click)) and there is no [expand/collapse header](#clicking-the-expandcollapse-header-button) feature.

### Header Features

The header features (3) allow users to control the visibility of [header content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-content) using two icon buttons at bottom of the header content area:

1. [Expand/collapse header](#clicking-the-expandcollapse-header-button): :slim-arrow-down: or :slim-arrow-up:
2. [Pin/unpin header content](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#pinning-the-header-content): :pushpin-off:

### Footer Toolbar

The [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) (`sap.m.Toolbar`) is an optional part of the dynamic page. You can use it to offer closing or finalizing actions.

### Combining the Dynamic Page with the Flexible Column Layout

The layout of the dynamic page is responsive and optimized for use within a [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/). Each column (1, 2, 3) can contain its own dynamic page with a different floorplan, depending on the use case.

## Behavior and Interaction

### Initial Focus

The dynamic page itself doesn’t set an initial focus. The initial focus depends on the floorplan that is using the dynamic page and the specific app use case.

### Dynamic Page Header                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
The dynamic page header supports three optional interaction patterns that can be combined. To show more of the actual page content, the header content can collapse or expand using defined triggers ([snap on scroll](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-scroll) and [snap on click](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-click)). In addition, users can fix the header content while scrolling through the page content with the [pin feature](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#pinning-the-header-content). The combined usage of all three patterns is recommended and activated by default. | _Dynamic page - Snap on scroll_          | _Dynamic page - Snap on click_           | _Dynamic page - Pin/unpin_

#### Starting in Expanded or Collapsed Mode

By default, the header content is initially expanded. In certain cases, it can also make sense to deviate from the default and allow the header to appear in collapsed mode when initiating the app. However, the idea is to always expand the header content when the application starts without a query (and the content area is therefore empty).

#### Snap on Scroll

Scrolling is the typical trigger for collapsing the header content. When the user scrolls down the page, the header content scrolls away. The header title switches to collapsed mode and stays fixed. When the user scrolls up the page, the header content expands again.

Note that this interaction pattern works only in combination with an expandable/collapsible header content. It can be combined with [snap on click](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-click), but does not have to be.

Carousel (full-width)

#### Snap on Click

The snap on click pattern is another way of expanding and collapsing the [header content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#header-content). The user can collapse the header without scrolling, and expand it again even when it has been collapsed by scrolling down. Two interaction variants are offered, which always appear in combination: clicking the header title and clicking the _Expand Header / Collapse Header_ icon button in the header features area.

Again, the interaction pattern works only in combination with expandable/collapsible header content. It can be combined with [snap on scroll](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-scroll), but does not have to be.

##### Clicking the Header Title

The user can expand and collapse the header content by clicking anywhere on the header title bar that has no active elements (such as links or active buttons). When using a mouse, the cursor changes from an arrow to a hand to support the user’s interaction. In addition, a hover effect is visible on the header title and on the _Expand Header / Collapse Header_ icon button in the header area. If the header is expanded and the user clicks the title bar, the header content collapses, and vice versa.

Carousel (full-width)

##### Clicking the Expand/Collapse Header Button

The expand/collapse header feature is a small icon button directly below the header, which is also used to expand or collapse the header content. When the pin is active, the expand/collapse header button is still available and overrules the pin. The icon buttons for expanding and collapsing the header are an alternative to [clicking on the header title bar](#clicking-the-header-title), which might not have much clickable space. They also support [keyboard actions](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#keyboard-interaction).

Carousel (full-width)

#### Pinning the Header Content

Activating the pin feature keeps the header expanded while the user scrolls through the page content. This mode remains fixed until the user clicks the pin icon again or triggers [snap on click](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-click). This feature is optional and can be switched off if it is not useful for your application.

The expand/collapse header button remains visible when the pin is activated. Clicking the _Collapse Header_ icon overrules the pin, collapses the header, and switches the pin button off. Do not offer the pin feature for floorplans without scrollbars (see [special case](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#special-case-no-page-scrolling-possible) below), or if there is no header content.

In the smartphone version, the pin action is not provided, as the pinned header would take up too much screen real estate. The same applies whenever the dynamic page header would occupy more than 60% of the screen, regardless of the device type. Overruling the pin feature keeps the focus on the content.

Note that this interaction works only in combination with expandable/collapsible header content. The pin button is available as soon as [snap on scroll](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-scroll) (or [snap on click](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-click)) is activated.

Carousel (full-width)

#### Special Case: No Page Scrolling Possible

The following special case applies for pages containing desktop-centric tables, such as the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), or [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/).

Because these tables use up all of the available screen space, there should not be a vertical scroll function, and hence no [snap on scroll](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#snap-on-scroll). In this special case, an explicit interaction via the expand/collapse header button is required to expand or collapse the content area. The [pin feature](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#pinning-the-header-content) is obsolete and is not provided.

This exceptional case also applies to [chart containers](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.suite.ui.commons.sample.ChartContainerCustomIconsOneChart/preview) that use up all the available screen space in a similar way to desktop-centric tables.

#### Keyboard Interaction

Default (col-1)

The dynamic page header expands automatically as soon as keyboard actions like tabbing or group jumps (F6) bring the
content of the dynamic page header into focus.
The dynamic page header collapses as soon as the keyboard focus leaves the dynamic page header content area.

Table (col-2)

Key(s)

**Tab**
bar. The dynamic page header expands automatically. If
the focus is inside the header content area, move the
focus to the next UI element within the header.
If the focus is on the last UI element within the header
content area (expand/collapse header feature), leave the
header. Collapse the header content.

**Shift\+Tab**

**F6**
focus to the header title bar. Expand the header content.
If the focus is within the header content, move the focus
out of the header and collapse the header content.

**Shift\+F6**

Section Metadata

style

## Responsiveness

The dynamic page offers considerable freedom and flexibility. In addition, the dynamic page header and the footer toolbar are designed to adapt automatically to small, medium, and large screen sizes.

The **title** (`sap.m.Title`) and **subtitle** (`sap.m.Text`) on the left truncate in collapsed mode to save vertical space, and wrap in expanded mode to offer the full text. This behavior needs to come from the respective controls for the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and [subtitle](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/). Overall, we recommend showing a maximum of 2 lines of text in collapsed mode. This prevents a disproportionate header height, especially on mobile devices if no [summary line](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#summary-line) is used. The 2 lines can either be a combined title and subtitle, or a longer wrapping title. For more information, see [wrapping and truncating text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/wrapping-and-truncating-text).

**Key information,** such as a **KPI** (middle area, left aligned), stays as long as possible before it moves into the overflow.

**Global actions** stay as long as possible. If there is no key information, the title and the global actions automatically get more space. The toolbar follows the standard [toolbar overflow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) guidelines, and adds the available buttons to the [overflow menu](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.m.OverflowToolbar/samples) from right to left.

**Layout actions:** The dynamic page offers a specific area for layout actions, which reacts to the predefined breakpoint of 1280 px:

- Less than 1280 px: Navigation actions are placed in a separate row above the global actions.
- 1280 px or more: Navigation actions are placed to the right of the global actions on the same line.

This breakpoint corresponds to the page width and not to the window width. Therefore it doesn’t matter whether the page is used in the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), on a desktop device, or on a mobile device.

[Letterboxing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/letter-boxing/) limits the width of the content area to 1280 px. This prevents the app content from becoming too “stretched” on wide screens, and optimizes readability. Letterboxing can be used together with the dynamic page if the use case requires it. However, most business apps offer so much content that the page is typically shown across the entire screen, without letterboxing.

#### Size L

Carousel (full-width)

#### Size M

Carousel (full-width, col-1)

#### Size S

Carousel (full-width, col-2)

Section Metadata

style

Default (col-1)

#### Summary Line
To save vertical space on smartphones, you can opt to display a smaller summary line instead of the collapsed header. The header
content scrolls away as soon as the user scrolls up the page. The header converts to a summary line, which shows only the [title](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-title)
and an arrow icon button on the very right of the screen. Tapping the summary line also expands and collapses the whole header. The
rest of the page stays in the same position.

> **Guideline:** Use the summary line to help users to focus on the page content.

Default (col-2)

Section Metadata

style

## Examples

The dynamic page is a generic control. The content of both the header and the page differs from floorplan to floorplan. Here are some examples showing the most frequently-used variants for each type of floorplan. For detailed guidance, see the corresponding floorplan guidelines ([analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/), [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/), [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), [worklist](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/#dpiwlf), [initial page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/), [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/), [wizard](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/wizard/)).

#### Floorplan Examples

Carousel (full-width)

## Top Tips

- Always use a [header title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#header-title) – either as a text or link, or by including variant management. For the [initial page floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/), use an input field.
- Use the [header title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#header-title) and [header content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#header-content) to provide the most relevant information and actions for your use case.
- Only use KPI tags within the [analytical list page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) and [worklist](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/) floorplans.
- Do not remove or disable the [actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#header-title) within the global action toolbar when the header content is collapsed.
- Make sure that the [layout actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/dynamic-page-layout/#header-title) in the flexible column layout are displayed correctly and never get hidden in the overflow.
- Start your application in [expanded mode](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#starting-in-expanded-or-collapsed-mode) if users need further content or adjustment options to get started.
- Offer the [pin feature](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#pinning-the-header-content) whenever users may need to fix the header content while scrolling through the page content.
- Activate the [summary line](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#summary-line) on smartphones to help users focus on the page content.

---

## Page Layouts > Dynamic Page Web Component > Index

# Dynamic Page Layout
#### ui5-dynamic-page \| v1.0

Usage

**Metadata**

**Title**

**Breadcrumbs**

Description
dynamic behavior, a content area, and an optional
floating footer.

**uiElementsTechnology**

**designOwner**

**elementType**

**uiElementsStatus**

---

## Page Layouts > Dynamic Page Web Component > Usage

## Intro

The dynamic page is a generic layout control designed to support various floorplans and use cases.

Dynamic page

## When to Use

Do
Use the dynamic page if:
- You want to build a freestyle application that uses dynamic page layout components for SAP Fiori pages, such as the [dynamic page header](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-web-component#dynamic-page-header) and the footer [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-web-component/).
- You want to build a simple [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/) with only one section.
- You want to use a full screen layout.
- You want to use dynamic pages in a [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout-web-component/).
**Top Tips**

- Always use a header title – either as a text or link, or by including variant management.
- Use the header title and header content to provide the most relevant information and actions for your use case.
- Don’t remove or disable the actions within the global action toolbar when the header content is collapsed.
- Make sure that the layout actions in the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout-web-component/) are displayed correctly and never get hidden in the overflow.
- Start your application in [expanded mode](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout-web-component/#starting-in-expanded-or-collapsed-mode) if users need further content or adjustment options to get started.
- Offer the [pin feature](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout-web-component/#pinning-the-header-content) whenever users may need to fix the header content while scrolling through the page content.
- Don’t offer the pin feature for size S screens. This saves vertical space.
- Activate the [summary line](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout-web-component/#summary-line) on size S screens to help users focus on the page content.

## Anatomy

+--------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------+
Requirements
+--------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------+
The dynamic page consists of a title, a header with dynamic behavior, a content area, and an optional floating footer.
1. **Dynamic page header**: Comprises the header title (a) and expandable/collapsible header content (b).
a. **Header title**: The title area contains a mandatory title element, along with optional elements such as breadcrumbs,
subtitle/summary, content, KPIs, and actions.
b. **Expandable/collapsible header content**: An area that can hold any components, depending on the use case. This content is hidden when the dynamic header collapses.
2. **_Expand Header_ and _Pin Header_ buttons:** Buttons used to expand or collapse the header, and to pin or unpin the expanded header.
3. **Content area:** The content of the dynamic page.
4. **Optional: Footer area:** A footer toolbar is used for finalizing page actions.
+--------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------+

## Types

### Freestyle Dynamic Page

In the freestyle dynamic page, any component can be
placed in the title and header content areas.

### Combining the Dynamic Page with the Flexible Column Layout

The dynamic page can be combined with the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout-web-component/).
For example, each column can contain its own dynamic page with a different floorplan, depending on the use case.

**> **Guideline:** **

In the flexible column layout, ensure that the icons for the _Close_ or _Full Screen_ / _Exit Full Screen_ actions always stay on the very right.
Their position then remains stable, even if other actions are added (such as the paging buttons :slim-arrow-up: and :slim-arrow-down: ). The _Close_ and _Full Screen_ / _Exit Full Screen_ actions must never move into the overflow.

### Dynamic Page for Floorplans

Many SAP Fiori floorplans use the dynamic page, or are
visually aligned to look the same (for example, overview
page, list report, worklist, object page, wizard).

## Behavior & Interaction

### Dynamic Page Header

The dynamic page header supports three optional interaction patterns that can be combined. With [snap on scroll](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout-web-component/#snap-on-scroll) or [snap on click](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout-web-component/#snap-on-click), the header content can be collapsed or expanded. In addition, the header content can be fixed with the [pin feature](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout-web-component/#pinning-the-header-content).

By default, all three interaction patterns are combined and activated.

_Dynamic page header can be snapped | _Dynamic page header can be snapped | _The header content can be pinned_
on scroll_                          | on click_
### Starting in Expanded or Collapsed Mode

The dynamic header has both expanded and collapsed modes. By default, the header content is initially expanded.

You can opt to display the header in collapsed mode when the app is opened, deviating from the default. However, the idea is to always expand the header content when the application starts without a query.

### Snap on Scroll

When the user scrolls down the page, the header content scrolls away. The header title switches to collapsed mode and stays fixed. When the user scrolls up the page, the header content expands again.

+-------------x-------------+
**Carousel (full-width)**

### Snap on Click

The snap on click pattern is another way of expanding and collapsing the header content. The user can collapse the header without scrolling, and expand it again even when it has been collapsed by scrolling down. This interaction only works in combination with expandable/collapsible header content.

There are two click options. Users can:

- Click the header title area
- Click the _Expand Header_ icon button

This interaction pattern can be combined with [snap on scroll](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout-web-component/#snap-on-scroll).

#### Clicking the Header Title Area

The user can expand and collapse the header content by clicking anywhere on the header title area that has no active elements (like links or active buttons).

+-------------x-------------+
**Carousel (full-width)**

#### Clicking the _Expand Header_ Button

The _Expand Header_ icon button directly below the header can also be used to expand or collapse the header content.

+-------------x-------------+
**Carousel (full-width)**

### Pinning the Header Content

Activating the pin feature keeps the header expanded while the user scrolls through the page content. This interaction works only in combination with expandable/collapsible header content.

Dynamic page header with pin feature activated

## Responsive Behavior

### Responsiveness

The dynamic page is designed to adapt automatically to small, medium, and large screen sizes.

##### Dynamic Page in Sizes S, M, L, and XL

+-------------x-------------+
**Carousel (full-width)**

**> **Guideline:** **

On small screens, the _Pin Header_ action is not provided, as the pinned header would take up too much screen real estate.

### Summary Line

To save vertical space on small screens, the dynamic page
header offers a smaller summary line instead of the
collapsed header.

The header content scrolls away as soon as the user
scrolls up the page.
The header converts to a summary line, which shows only
the title and an arrow icon button on the right of the
screen.

Tapping the summary line also expands and collapses the
whole header. The rest of the page stays in the same
position.
## Wrapping and Truncation

The dynamic page offers considerable freedom and flexibility.

### Global Actions

- Global actions stay as long as possible.
- If there is no key information, the title and the global
actions automatically get more space. The toolbar follows
the standard toolbar overflow guidelines.
### Title and Subtitle

- The title and subtitle wrap in expanded mode to offer the full text. This behavior needs to come from the respective controls for the title and subtitle.
- The title and subtitle truncate in collapsed mode to save vertical space.

Wrapping and truncation of the title and subtitle

### Layout Actions

The placement of navigation actions depends on the screen size:

- Less than 1280 px: Navigation actions are placed in a separate row above the global actions.
- 1280 px or more: Navigation actions are placed to the right of the global actions on the same line.

##### Example: Positioning of Layout Actions

+-------------x-------------+
**Carousel (full-width)**

---

## Page Layouts > Flexible Column Layout > Usage

## Intro

The flexible column layout is a layout control that displays multiple floorplans on a single page. This allows faster and more fluid navigation between multiple floorplans than the usual page-by-page navigation. The flexible column layout offers different layouts with up to three columns (1, 2, 3). Users can freely resize the columns, switch between different layouts, and view the rightmost column in full screen mode.

The flexible column layout behaves responsively, which makes it suitable for both desktop and mobile devices. Depending on the available screen width, an optimized layout is loaded to ensure the best possible user experience on each device. The flexible column layout is a generic control. As a layout container, it does not provide any content itself.

The flexible column layout is already incorporated within [SAP Fiori elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).

## Usage

### Use the flexible column layout if:

- You want to create a list-detail or list-detail-detail layout, in which the user can drill down or navigate.

### Do not use the flexible column layout if:

- You want to build a workbench or tools layout. The flexible column layout is not meant to provide a main column with additional side columns on the left and/or right. If you want to display additional content to enrich the main content and to help users better perform their tasks, use the [dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/) instead.
- You want to create a dashboard with context-independent pages.
- You want to open multiple instances of the same object type. Use the [multi-instance handling floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/multi-instance-handling-floorplan/) instead.
- You want to split a single object into multiple columns, or display only a small amount of information.
- You want to embed the [SAP Fiori launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) or [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) into one of the columns.

## Structure

As with all layouts, the flexible column layout is embedded in the [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/) of the SAP Fiori launchpad. From the shell bar, users have access to the launchpad services, including the home page, search, settings, and help. Apps are embedded in the shell and have little influence over its features. The shell bar also provides the back navigation and the app title, including the navigation menu.

Depending on the current layout and display size, the flexible column layout consists of one, two, or three horizontally-aligned columns. Each column contains content that is not provided by the flexible column layout itself. The flexible column layout is not restricted to a specific floorplan, as long as the floorplan you use is responsive down to phone size. However, we recommend using the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).

> **Information:** It is not possible to use the [SAP Fiori launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) or the [overview page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page/) in one of the columns.

### Possible Layouts

To give users a better overview, the flexible column layout offers different layouts with one, two, or three columns. Depending on the screen size, up to five alternative default layouts are available.

By default, the ratio is fixed:

- 33% : 66% or 66% : 33% for 2 columns
- 25% : 25% : 50%, 25% : 50% : 25%, or 50% : 25% : 25% for 3 columns

The user can also change the size of a column freely by dragging the splitter (for example, 15% : 85%).

> **Information:** #### Language Dependency
For simplicity, this article assumes that the last column (the lowest drilldown level in the hierachy) is the
rightmost column (left-to-right languages).
For right-to-left languages, however, the last column is the leftmost column.

#### Size L and XL (Desktop)

There are five different default layouts in sizes L and XL: a full screen layout, as well as two different 2-column and 3-column layouts.

#### Size M (Tablet)

There are three different default layouts in size M: a full screen layout and two different 2-column layouts. There is no 3-column layout due to the limited width. However, you can still load 3 pages in size M. Instead of showing them all side-by-side, the user can switch between columns 1/2 and 2/3.

#### Size S (Phone)

Because of the limited width, there is no multi-column layout for Size S. Instead, the rightmost column is shown in full screen mode.

## Components

The flexible column layout offers a few simple actions that allow users to adapt the current layout according to their needs.

**Note:** Some of the actions (illustrated by blue lines in the image below) recover the last state of the layout to which they refer. In other words, the result of the action depends on the previous state of the layout.

### Layout Splitter

The layout splitter is a control that allows users to freely resize the columns by dragging the splitter, thereby changing the layout. However, this action cannot be used to expand a column to full screen mode. There is a separate action for that purpose.

The layout splitter is next to the divider between the columns. If a column cannot be resized any further, the layout splitter is hidden.

### Enter Full Screen Mode

With the _Full Screen_ icon :full-screen: , the user can switch the rightmost column to full screen mode. The action is located in the rightmost column, and is only offered if there is more than one column.

### Exit Full Screen Mode

By selecting the _Exit Full Screen_ icon :exitfullscreen: , the user can exit the full screen and switch back to the multi-column (side-by-side) view. The action is only available while in full screen mode.

> **Information:** The actions are not available in size S, which only displays a single column.

#### Entering and Exiting Full Screen Mode

Carousel (full-width)

### Close

With the _Close_ icon :decline: , the user can close the last (rightmost) column. If the user selects this action in the second column while the third column is minimized, both columns are closed. _Close_ is also available in full screen mode, and in the second/third column for size S.

#### Close Action

Carousel (full-width)

> **Information:** The Close and Enter Full Screen / Exit Full Screen actions:
- Are only displayed in the third column (or in the second column if there is no third column, or if the third column is minimized).
- Are displayed as the last actions in the [layout action section](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#additional-elements-optional)
(or in the global actions toolbar if there is no layout action section in the floorplan). The layout action section is displayed to the right of the global actions on columns ≥1280 px wide, and in a separate line above
the global actions on columns <1280 px wide.
- Never move into the overflow.
- Are always shown side-by-side (_Enter Full Screen / Exit Full Screen_ icon left, _Close_ icon right).
Exception: There is no _Enter Full Screen_ action in size S.

> **Hint:** The actions for entering and exiting full screen mode and closing columns are not provided automatically by the flexible column layout control, and need to be implemented manually. However, you can use the [semantic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/semantic-page/), which supports these actions for freestyle applications (only available with the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/)).

Section Metadata

style

### Navigation

Default (col-1)

In addition to the actions specific to the flexible column layout, the user can also use the forward and backward
navigation to navigate through the flexible column layout. Drilling in or navigating forward opens a new column,
while _Back_ closes a column or exits the full screen mode (depending on what the last action was).
Please note: _Back_ does not restore layout changes (such as switching from 33% : 67% to 67% : 33%). It also doesn’t
reopen columns that were closed previously using the _Close_ button ( :decline: ).
Because the flexible column layout only supports a maximum of 3 columns, any follow-on pages are loaded in full
screen mode. These pages do not contain _Close_ or _Enter Full Screen_ / _Exit Full Screen_ actions.
By default, the width is initially 33% for the second column and 25% for the third column. You can also set the width
of the second column to 67%, or the third to 50% **if your use case requires it**.

> **Hint:** To implement the navigation/routing, you can use the `SemanticHelper` class, which provides predefined behavior to simplify the implementation.

Section Metadata

style

#### Forward Navigation

Carousel (full-width)

#### Backward Navigation

Carousel (full-width)

## Responsiveness

The flexible column layout changes its behavior for sizes XL, L, M and S in real time whenever the user resizes the screen.

If no previous state has been saved, ensure that the default layout appears automatically. For example, if the flexible column layout was initially loaded in size S and then, the user navigates to the second column and changes the browser window to size M, the default 2-column layout for size M (67% : 33%) should be shown.

## Behavior and Interaction

### Dialogs

Dialogs triggered in one of the columns are centered over the entire screen.

Do

### Vertical Size / Scrolling

Each column inside the flexible column layout contains an independent floorplan with its own scrolling behavior. There is no “all-encompassing” scrollbar which scrolls all columns simultaneously. The height of each floorplan is defined by the screen size.

Do

### Scroll Position

During column resizing, the navigated item in the list column may no longer be in the visible screen area. In such cases, we recommend setting the scroll position to the item currently open in the details column (“navigated” item). This allows the user to see at a glance which item from the list or table is being displayed in the details column.

> **Hint:** To get the right scroll position, you can use the “columnResize” event. For more information, see the [API reference](https://openui5nightly.hana.ondemand.com/api/sap.f.FlexibleColumnLayout#events).

### Two Columns (List-Detail Mode)

By default, the flexible column layout starts off with one column. The user opens new columns by navigating forward. You can also use just two columns **if your use case requires it**. Do not start your application with three columns. Too much information at the beginning can confuse users.

**Note:**

- If you start with two columns, make sure that size S shows the first column. Otherwise, users see the second column first, which might be confusing. (Showing the second column is the normal responsive behavior of the flexible column layout, which always shows the last column in size S.)
- Even if you start with two columns, offer the layout splitter and the _Close_ action in the second column.

### Titles / Breadcrumbs / Up and Down Arrows

If more than one column is visible, show the application title in the [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/). If the user switches to full screen mode, show the page title. Also show the page title for size S, where only one column is visible.

If multiple columns are visible, hide the breadcrumbs and up/down arrows.

### Bookmarks

Every layout inside the flexible column layout can be bookmarked. For example, if the user bookmarks a 3-column layout set to 25% : 50% : 25%, load this layout when the user opens the bookmark.

### Minimized Third Column

When the user expands the first column in a 3-column layout, the third column is minimized. _Close_, _Enter Full Screen_, and layout splitter actions also appear on the right-hand border of the second column to allow the user to return to the original 3-column layout.

**Close:** The second and third (minimized) columns close. A [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) can appear to warn the user about any unsaved data in the third column.

**Full screen:** When the user clicks the _Enter Full Screen_ icon, the second column switches to full screen mode. The third column remains open (but not visible), and closes as soon as the user selects another item in the second column, or uses the _Close_ action in the second column. If the user selects the same item in the second column, it opens in the same state as before it was minimized.

**Layout splitter**: When the third column is minimized, the second splitter is only available when the second column is bigger than the first column (by default 33% : 67%). Otherwise, the second splitter is hidden.

### Using _Close_ in Combination with Back Navigation

The back navigation must not restore a column that was previously closed with the _Close_ icon :decline: .

Example: The user closes the third column by clicking the _Close_ icon :decline: in the upper-right corner. If the user then navigates back (UI or browser), the second column closes.

### 3 Columns in Size M

To offer a desktop-like experience in size M, the flexible column layout displays either the _first and second_ or the _second and third_ columns. The user can switch between these views by dragging the layout splitter to the left or right side of the flexible column layout. **Note:** This behavior is only intended for size M. Do not use it for sizes L or XL.

### Letterboxing

Do not use [letterboxing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/letter-boxing/) in combination with the flexible column layout, as it will reduce the size of the usable screen area.

Do

### Full Screen Navigation

After switching a column to full screen mode, selecting the _Back_ icon exits the full screen mode.

If the screen is in full screen mode, and the user navigates forward, also show the next column in full screen mode. If the user navigates backward, go back in full screen mode until the point where the user initially switched to full screen. If the user then clicks _Back_ again, return to the multi-column mode.

### Footer Toolbar

Each column of the flexible column layout can have its own footer toolbar. There is no overall footer toolbar that spans several columns.

Do

### Overlapping Header

The flexible column layout can display multiple floorplans side-by-side. However, it is not designed for splitting a single floorplan into several columns. As a result, there is no overall header that spans several columns. If you need to show additional content within a floorplan, use the [dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/).

Do

### Empty Details Column

Do not display an empty details column when using the flexible column layout. For example, if no items have been selected in the second column, do not show an empty third column.

Do

### Usage With One or Several Initial Full Screen Pages

Some use cases require starting an application with one or more full screen pages. You can do this by using the first column of the flexible column layout in full screen mode. This allows you to show one or several initial full screen pages with different content. Because of technical constraints, you must always use the flexible column layout to show this initial content.

### Content Padding Inside Columns

The flexible column layout doesn’t provide additional paddings around the content area. Since some controls have different internal paddings, please ensure that they are aligned correctly.

> **Hint:** If you are using the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) inside the flexible column layout, you can use the class `sapFDynamicPageAlignContent` to overcome misalignment issues.

### Navigation Indicator

It is important for users to be able to scan through the list and quickly identify the item for which the details are being shown in the second or third column. This is especially important for large lists. For this case, you can enable a “navigated” indicator for tables and lists to mark the item that was last opened.

If there are several tables/lists on one page, ensure that the indicator shows only for the last navigated item. There should never be two navigation indicators on one page.

_Navigation indicator and list without actions_           | _Navigation indicator and list with single selection_           | _Navigation indicator and list with multiple selection_

### Content Interaction

#### Selecting a Different Item
If the user selects a different item in the list-detail
or list-detail-detail layout, the content of the details
column changes to reflect the data of the newly selected
item. If the item is selected in the first column, and
the last column was open before the new item was
selected, selecting the item closes the last column.
#### Deleting an Item
When an item is deleted, there are two options for
handling the content of the details columns:
- Select the next item and change the content in the
details column.
If the user deletes the last item, you can opt to either
select the previous item or close the details column(s).
If the user deletes all the objects, always close all
columns, since there is no content to display.
- Do not select an item and close the other columns.
#### Behavior on Filtering
Filtering in one of the columns does not affect the
content in the other columns.
Once a filter is applied, the results are shown in the
same column. The content in the remaining columns does
not change, unless another item is selected.
#### Tab/Anchor Navigation
Tabs and anchors are used for navigation within an object
or as a filter (for example, in object pages). They
affect only the respective column and do not close or
change the content in the other columns.
## SAP Fiori Elements

The flexible column layout is available in [SAP Fiori elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates) for scenarios that use [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling). **If you use draft handling, we strongly recommend using the SAP Fiori elements implementation, wherever possible**. The implementation already includes the navigation and routing behavior, as well as the _Close_ and _Full Screen_ actions, for example. Starting the application with two columns is also supported by SAP Fiori elements.

---

## Page Layouts > Flexible Column Layout Web Component > Usage

## Intro

The flexible column layout is a pattern for displaying multiple floorplans on a single page. The flexible column layout is not restricted to a specific floorplan, as long as it is responsive down to phone size.

<https://www.sap.com/design-system/live-examples/Flexible_Column_Layout/FlexibleColumnLayout_LE_Intro.html>

## When to Use

Do
Use the flexible column layout:
- To create a list-detail or list-detail-detail layout,
in which the user can drill down or navigate.
- To open multiple instances of the same object type.
- To split a single object into multiple columns.
- To display only a small amount of information.

## Anatomy

1. **Columns:** Depending on the current layout and display
size, the flexible column layout consists of one, two, or
three horizontally-aligned columns. Each column contains
content that is not provided by the flexible column layout
itself.
2. **Layout Arrow:** The layout arrows allow users to expand
the width of a given column and change the current layout.
3. **Actions (_Enter/Exit Full Screen,_ _Close_):** The
layout actions are always displayed as the last actions in
the respective layout action section, in the last column
(rightmost for left-to-right orientation). They never
overflow and are always in the same order. The actions are
not available for phone sizes, which display only a single
column.
## Behavior and Interaction

### Expanding the Column
With the layout arrows, users can expand the width of a given column and change the current layout.
The layout arrow points in the direction in which a column can be expanded.
### Full Screen Mode
The :full-screen: _Enter Full Screen_ button switches the rightmost column to full screen mode.
The :exitfullscreen: Exit Full Screen button switches back to the multi-column view. This action is
only available in full screen mode.
After switching a column to full screen mode, selecting the _Back_ button also exits the full screen mode.
If the screen is in full screen mode, and the user navigates forward, the next column shows in full
screen mode. If the user navigates backward, all screens show in full screen mode until the point
where the user initially switched to full screen. If the user then clicks _Back_ again, they return to the multi-column mode.
### Closing the Last Column
The :decline: _Close_ button closes the last column. Back navigation doesn’t restore a column that
was previously closed with the _Close_ button .
If the last column was in full screen mode when it was closed, the second column is displayed full
screen mode.
### Vertical Size / Scrolling
The height of each floorplan is defined by the screen size.
Each column inside the flexible column layout contains an independent floorplan with its own
scrolling behavior. There is no scrollbar to scroll all columns simultaneously.
### Minimized Third Column
When the user expands the first column in a 3-column layout, the third column is minimized.
:decline: _Close_, :full-screen: _Enter Full Screen_, and layout arrow actions also appear on the
right-hand border of the second column to allow the user to return to the original 3-column layout.
When the user clicks :full-screen: _Enter Full Screen_, the second column switches to full screen
mode. The third column remains open (but not visible), and closes as soon as the user selects
another item in the second column, or uses the :decline: _Close_ action in the second column. If the
user selects the same item in the second column, it opens in the same state as before it was
minimized.
### Selecting a Different Item
If the user selects a different item in the list-detail or list-detail-detail layout, the content of
the details column changes to reflect the data of the newly selected item. If the item is selected
in the first column, and the last column was open before the new item was selected, selecting the
item closes the last column.
### Deleting an Item
When an item is deleted, there are two options for handling the content of the details columns:
**Option 1:** Selecting the next item and changing the content in the details column. If the user
deletes the last item, the previous item is selected.
**Option 2:** Not selecting an item and closing the other columns.
### Behavior on Filtering
Filtering in one of the columns doesn’t affect the content in the other columns.
When a filter is applied, the results are shown in the same column. The content in the remaining
columns doesn’t change, unless another item is selected.
### Tab/Anchor Navigation
Tabs and anchors are used for navigation within an object or as a filter (for example, in object
pages). They affect only the respective column and don’t close or change the content in the other
columns.
### Dialogs
Dialogs triggered in one of the columns are centered over the entire screen.
### Footer Toolbar
Each column of the flexible column layout can have its own footer toolbar. There is no overall
footer toolbar that spans several columns.
## Responsive Behavior

The flexible column layout is responsive. It changes its behavior in real time when the user resizes the screen. For any size, the default layout appears automatically.

#### Size L and XL (screen width > 1024 px)

There are five different layouts: a full screen layout, a 2-column layout, and a 3-column layout.

#### Size M (screen width between 600 px and 1023 px)

There are two different layouts: a full screen layout and a two 2-column layout.

For example, if the flexible column layout was initially loaded in size S and the user then navigates to the second column and changes the browser window to size M, the default 2-column layout for size M will show.

**Three columns in size M**

To offer a desktop-like experience in size M, the flexible column layout displays either the first and second or the second and third column. The user can switch between these views by using the layout arrow on the left or right side of the flexible column layout. This behavior is only intended for size M.

#### Size S (screen width < 599 px)

Because of the limited width, there is no multi-column layout for small screens. Instead, the rightmost column is shown in full screen mode.

---

## Page Layouts > Flexible Grid > Usage

## Intro

The flexible grid control allows you to divide a layout into multiple columns and rows in which you can place UI elements. You can also customize the grid by aligning and arranging your elements to suit your content.

Since the flexible grid behaves responsively, it is suitable for both desktop and mobile devices. Depending on the available screen width, an optimized layout is loaded to ensure the best possible user experience on each device.

> **Information:** Flexible grid uses the properties of the CSS grid. For more information, see the [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) on the Mozilla Developer Network.
The grid is not fully supported by all browser platforms. It doesn’t work with Internet Explorer 11.

## When to Use

The flexible grid can be used as an underlying layer for different types of page layouts, much like a template. You place elements such as cards or other SAP Fiori UI elements in the grid. This layout approach helps maintain one coherent experience within a page or across several pages.

Keep in mind that the elements placed in your grid are empty containers. Therefore, your grid layout is invisible until there is content in them to display.

The flexible grid can be used within different types of pages, such as the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) or other pages of an application. For an overview of the application page types, see the [Explore page](https://www.sap.com/design-system/fiori-design-web/ui-elements/).

You can determine how you want to use the available space in your grid and how the content flows by adding breakpoints.

Some features and behaviors are configurable to enable the flexible grid for a variety of use cases.

### Use the flexible grid if:

- You want to display your content in columns and rows so that it adapts flexibly to changes in the screen size.
- You want to display your content in full-page layouts so that your content flows but stays aligned and spaced out evenly.
- The focus of your layout is on flexibility and responsiveness, not on constraining the content to grid cells.
- You want to include explicit or nested grid elements to have your elements or content adapt to any row or column size and to any breakpoints.
- You want to have only one implementation for all devices.
- You want to embed elements from another page into one of the columns.

### Do not use the flexible grid if:

- Your content is not appropriate for a card-like format, or for simple forms. For example, do not use the flexible grid for displaying a list or table that a user can edit or that needs to show a large number of items. Use a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) instead.
- You want to manage complex content, such as datasets that need to be extensively sorted, grouped, filtered, or edited. In this case, use a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) instead.
- You want to display a set of items on a grid. Consider using the [grid list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-list/) instead.
- Your layout needs to be defined only by columns or only by rows, _not_ both. Use a [flex box](https://sapui5.hana.ondemand.com/#/api/sap.m.FlexBox) instead.

## Components

Table

[A]{color=pink-8} Column
horizontally in the layout.

[B Row]{color=pink-8}
in the layout.

[C Gutter – Column]{color=pink-8}
between columns).

[D Gutter – row]{color=pink-8}
between rows).

[E Margin – left]{color=pink-8}
(left, right, top, bottom).

[F Margin – bottom]{color=pink-8}
[G Margin – right]{color=pink-8}
[H Margin – top]{color=pink-8}
[I Cell]{color=pink-8}
is conceptually much like a table cell, and elements can
be placed in a cell (or combination of cells) and aligned
in columns and rows. The size of a cell depends on the
width of a column and the height of a row. The width may
differ from the height.

[J Cell area]{color=pink-8}
cells (aligned horizontally) and 2 cells (aligned
vertically).

### Flexible Grid Elements

You can place elements (SAP Fiori controls) in the flexible grid and then define the size of the elements by how they are laid out in the grid.

The order in which you add the elements determines how they appear in the layout.

### Placement and Nesting

The grid layout can be used as a standalone, or inside other layout containers such as another page, a header, or a dialog.

The grid layout supports nesting, which allows you to place a flexible grid layout inside a grid element.

## Behavior and Interaction

### Layout Flexibility

You can use the flexible grid to define a layout for more than one page. This means you don’t need to define a template for each page.

### Size of Elements in a Flexible Grid

Depending on the use case, you can assign specific sizes to a grid element to ensure that the content in the grid layout is displayed correctly.

**Minimum and maximum size**

If necessary, you can apply a minimum and/or maximum size to a grid element. For example, if the minimum width for a grid element is three columns, the space used by the element will never be less than three columns, even when the layout is resized.

Grid elements can also have a combination of specified minimum and maximum sizes (such as a range of sizes). However, you can only use whole (not half) columns or rows when referencing a size unit (for example, 2×3, 4×4).

Note: Keep in mind that the number of columns for a grid element should never be less than the minimum number of columns of the flexible grid layout in its smallest form factor.

**Full-width elements**

Grid elements can be defined to span the full width of the grid (using all the columns) for one or several rows in the grid layout.

### Defining How the Content Fills the Space

You can define how the content fills the space of grid elements by adjusting the content to the height of the row. This can affect visual balance and consistency in the overall flexible grid layout. You can also choose to constrain content to the height of the elements (with a card control, for example).

Conversely, if the content doesn’t fill up all the space of the layout elements, you can include areas of white space (or empty space) to have “breathing” room in your layout.

**Defining columns**

Always use the full width of the layout elements, so that the content spans across the full width of the page or the width of the column.

**Defining rows**

When placing grid elements in rows, we recommend adding some white space (breathing space) between rows, especially if the content displayed in the elements is dense.

Note: You can choose whether to use the full height of the layout elements or only the desired space.

## Responsiveness

You can enable your flexible grid to adapt to the size of the screen on a device (desktop, tablet, or phone), as well as to the display orientation or the available space on the screen.

Responsiveness is fully configurable by the developer. It is possible to create an adjustable layout with the flexible grid so that the content “breathes” (includes empty space). In this case, the columns adjust the content in the layout depending on the width of the overall grid.

You can define a new flexible grid at any breakpoint. With the flexible grid properties it is possible to define:

- Columns, rows, and their sizes in the grid
- Vertical and horizontal gaps, space between the grid elements
- The flow algorithm when new elements are added to the grid.

The size of grid elements (or controls) is overridden when you specify how much space is used in the grid, or how many columns and rows the grid contains overall. If you specify the row or column from which an element starts, this overrides the automatically calculated position.

### Row Height

There are only as many rows as needed by the grid elements. When resized, the grid adjusts the number of rows as content is added based on your predefined settings, such as the maximum number of rows and the minimum/maximum width of the grid.

### Number of Columns

There are three options for defining the number of available columns in your flexible grid:

- **Predefined number of columns using breakpoints** You can apply a predefined number of columns by using breakpoints based on the width of the screen. The width of the screen depends on the size of the device (S, M, L, and XL). When resizing the screen, the columns can “breathe” and every column width can be adjusted until a breakpoint is reached.
- **Flexible number of columns** The number of columns is calculated based on the available width of the screen. When you resize the screen, the columns adjust in width to allow the content to adapt to the space on the page when new columns are added or removed.
- **Fixed number of columns and column width** In this case, the number and size of columns is predefined. Therefore, depending on the width of the flexible grid, it might be necessary to show horizontal scroll bars. This approach is not responsive and should be avoided in layouts used on different form factors.

### Columns and Breakpoints

Note: For reference only. For more information, see [Responsive Spacing System](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/layouts/spacing).

Table

**Screen**

**S (phone)**

**M (Tablet)**

**L (Desktop)**

**XL (Desktop)**

### Arranging Grid Elements

We recommend arranging flexible grid elements in a sequence so that the elements have a specific position in the layout.

Whether you add, remove, or rearrange elements, elements already in the grid will shift to the next or previous column (or row), depending on where they were initially positioned.

### Content Flow

You can arrange layout elements so that the content displays or flows both horizontally and vertically in the flexible grid. If a column is set to auto-width and other columns have a fixed size, the auto-width column expands to the maximum width available, as defined by the overall grid width.

Here are two flow designs for the flexible grid:

#### Z-Flow (default)

Grid items are displayed in a sequence row-by-row (or Z shape-pattern), top-to-bottom. The reading order is left-to-right (when RTL is enabled, it is right-to-left).

#### ᴎ-Flow

Grid items are displayed in a column-by-column, top-to-bottom sequence (or N-shape pattern). The reading order is left-to-right (when RTL is enabled, it is right-to-left).

### Resizing the Screen

When resizing the screen, the grid layout adapts to the available space, and the grid elements are automatically rearranged based on their position in the sequence. This allows you to apply the flexible grid to a variety of devices and use cases.

> **Hint:** The flexible grid is fully configurable by the developer. It is possible to let columns “breathe”, which means that
the column widths grow/shrink depending on the grid size.

### Implicit and Explicit Grid

The grid creates (implicit) rows and columns on its own when needed. For example, if a grid element is positioned in a row or column that is not explicitly sized, implicit rows or columns are created to hold it.

> **Hint:** Explicit grids are rows and columns defined with `gridTemplateColumns` and `gridTemplateRows`. Implicit rows or columns are defined with `gridAutoColumns` and `gridAutoRows`.

## Top Tips

Include UI elements and controls that make sense in a flexible grid layout. Their content should adapt appropriately when the grid is resized, or the elements rearranged.

Include UI elements for which you might want to customize both the vertical and horizontal alignment.

If you want to include nested grids, consider the UX investment you’ll need to make to achieve the desired visual and structural result with your grid layout.

We don’t recommend using several nested grids, as it might result in an over-complicated UI layout. Also, the UI elements in your grid might not align at all with other UI elements of the grid as intended.

## Properties

### sap.ui.layout.cssgrid.CSSGrid

The following additional properties are available for the flexible grid:

- The property **width** sets the width of the flexible grid.
- The property **gridTemplateColumns** defines the number of columns in the flexible grid.
- The property **gridTemplateRows** defines the number of rows in the flexible grid.
- The property **gridColumnGap** sets the width of the gap (gutter) between columns.
- The property **gridRowGap** sets the width of the gap (gutter) between rows.

## Related Topics

+---------------------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------------------+
Cards (icons, internal_only)
+-------x-------+-------------------------------------------------------------------------------------------------------------x-------------------------------------------------------------------------------------------------------------+
#### Elements and Controls
- [List](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) (guidelines)
- [Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/) (guidelines)
- [Tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/) (guidelines)
- [Responsive Spacing System](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/layouts/spacing) (guidelines)
- [Responsive Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) (guidelines)
- [Multi-Device Support: Responsive vs Adapative](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness) (guidelines)
+-------x-------+-------------------------------------------------------------------------------------------------------------x-------------------------------------------------------------------------------------------------------------+
#### Implementation
- [CSS Grid](https://sapui5.hana.ondemand.com/#/entity/sap.ui.layout.cssgrid.CSSGrid) (SAPUI5 samples)
- [Grid List](https://sapui5.hana.ondemand.com/#/entity/sap.f.GridList) (SAPUI5 samples)
- [Grid List](https://sapui5.hana.ondemand.com/#/api/sap.f.GridList) (SAPUI5 API reference)
- [Generic Tile](https://sapui5.hana.ondemand.com/#/entity/sap.m.GenericTile) (SAPUI5 samples)
- [Simple Form](https://sapui5.hana.ondemand.com/#/entity/sap.ui.layout.form.SimpleForm) (SAPUI5 samples)
- [List Report and Object Page](https://sapui5.hana.ondemand.com/#/topic/c0eec49db81a441e878f528c8f3d28de) (developer guide)
+-------x-------+-------------------------------------------------------------------------------------------------------------x-------------------------------------------------------------------------------------------------------------+
#### Visual Design
- [Responsive Grid](https://wiki.one.int.sap/wiki/pages/viewpage.action?pageId=2697902545) (visual design specification)

+---------------------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------------------+
Cards (icons, external_only)
+-------x-------+-------------------------------------------------------------------------------------------------------------x-------------------------------------------------------------------------------------------------------------+
#### Elements and Controls
- [List](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) (guidelines)
- [Card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/) (guidelines)
- [Tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/) (guidelines)
- [Responsive Spacing System](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/layouts/spacing) (guidelines)
- [Responsive Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) (guidelines)
- [Multi-Device Support: Responsive vs Adapative](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness) (guidelines)
+-------x-------+-------------------------------------------------------------------------------------------------------------x-------------------------------------------------------------------------------------------------------------+
#### Implementation
- [CSS Grid](https://sapui5.hana.ondemand.com/#/entity/sap.ui.layout.cssgrid.CSSGrid) (SAPUI5 samples)
- [Grid List](https://sapui5.hana.ondemand.com/#/entity/sap.f.GridList) (SAPUI5 samples)
- [Grid List](https://sapui5.hana.ondemand.com/#/api/sap.f.GridList) (SAPUI5 API reference)
- [Generic Tile](https://sapui5.hana.ondemand.com/#/entity/sap.m.GenericTile) (SAPUI5 samples)
- [Simple Form](https://sapui5.hana.ondemand.com/#/entity/sap.ui.layout.form.SimpleForm) (SAPUI5 samples)
- [List Report and Object Page](https://sapui5.hana.ondemand.com/#/topic/c0eec49db81a441e878f528c8f3d28de) (developer guide)
+-------x-------+-------------------------------------------------------------------------------------------------------------x-------------------------------------------------------------------------------------------------------------+

---

## Page Layouts > Letter Boxing > Usage

## Intro

In web design, it’s common practice to restrict the user interface to a certain width in order to preserve its original aspect ratio. This way, the interface does not become distorted or stretched when adapting to larger screen sizes.

If the screen is wider than the set width restriction, blank areas to the left and right of the user interface will appear. In many cases, these areas are used to display advertisements. This design element is called **letterboxing** because it restricts the user interface to a certain width similar to the shape of a classical letterbox.

SAP Fiori also offers letterboxing. Today, we can easily adjust content to different screen sizes by using responsive layouts and controls, so letterboxing is an optional feature. If letterboxing is switched on, the screen size is reduced to 1280 px.

## Guidelines

### When to Switch ON Letterboxing

- You want to make the UI appear simple and focused.
- There is too little content on the UI to require using the full width of the screen.
- The content cannot respond to large differences in size, and stretching the app would distort the content and lead to poor usability.

Letterboxing can be switched on or off per entire application or for individual pages within an application. Only enable letterboxing for individual pages if the app contains one or a few pages that benefit from using letterboxing.

> **Information:** If a user frequently navigates between two apps / pages, avoid changing between letterboxing and full screen
settings. Otherwise, users might lose focus due to the constant layout change.

If you want to use letterboxing for an application, set the _appWidthLimited_ property of the _sap.m.Shell_ control to _true_.

In some cases, applications may need to have the flexibility to change the width at runtime for different views. Example: fullWidth in view A and letterboxing in view B.

Through a new API, apps can change the width in the AppConfiguration service at runtime for different views.

### When to Switch OFF Letterboxing

- A lot of information needs to be displayed. This will require the app to accommodate the content to all intermediate screen sizes in a graceful way.
- The user needs to have as much content as possible on the screen without having to scroll. This has to be handled carefully as it can create a crowded and messy appearance.

---

## Page Layouts > Multi Instance Handling Floorplan > Usage

## Intro

The multi-instance layout allows the user to display and edit multiple objects within one page.
Beforehand, the user selects the objects from another page, usually a list report or a table. Each object then appears on a separate tab.
As a result, the user can work on several objects simultaneously and switch between them easily.

_1. Select items in a list report_          | _2. New page with several editable tabs_          | _3. Tab in edit mode_

> **Information:** The multi-instance layout must be implemented by the app team.

## Usage

**Use** the multi-instance layout if users need to open and edit multiple objects simultaneously.

**Do not use** this layout if your users need a side-by-side display on the same page. Use the [comparison pattern](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-pattern/) instead.

## Components

The multi-instance layout uses a [tab container](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.m.TabContainer).

The content of each tab is managed using an embedded [object page floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/).

The tab container holds:
1. Opened [tabs](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/multi-instance-handling-floorplan/#tabs)
2. [Scroll buttons and overview list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/multi-instance-handling-floorplan/#scroll-buttons-and-overview-list) (if not all tabs can be shown on the screen)
3. A [_Create_ button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/multi-instance-handling-floorplan/#create-button) (optional)
### Tabs

Each tab represents one object. One tab is always active, while the others are inactive.

The tab contains a title and a _Close_ button:

- **Title**
  ID or name of the object. If the title text exceeds 25 characters, it is truncated.
  An asterisk next to the tab title indicates that the object was changed but not saved.
  **:accept:** Guideline: Use the same title as in the object page.
- **_Close button_** (:decline: )
  The _Close_ button is shown on all tabs.
  **:accept:** Guideline: If the user closes a tab without saving first, display a warning. See [Handling Unsaved Changes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/page-types/page-layouts/multi-instance-handling-floorplan/#handling-unsaved-changes).

### Scroll Buttons and Overview List

The tab container has an overflow mechanism for cases where there are too many tabs to display on the screen:

- Horizontal scroll buttons ( :slim-arrow-left: and :slim-arrow-right: ) can be used to scroll back and forth through the tabs.
- An overflow menu lists all the tabs, including the hidden tabs.

### “Create” Button

You can offer a _Create_ button on the far right of the tab container. Selecting this button opens a new tab containing an empty object page.

**:accept:** Guideline: Only use this button if the application allows users to create new objects.

## Behavior and Interaction

### Opening Tabs

The multi-instance layout is always triggered from another page, such as a list report.

To work on multiple objects, users select the relevant objects and choose a triggering action, such as _Open in Tabs (3)._ This opens a new page, in which the selected objects appear as tabs.

### Closing Tabs

To close a tab, the user can click the _Close_ (:decline: ) button on the tab itself, or close the tab from the overflow menu.

#### Closing the Last Tab

When the last remaining tab is closed, the complete page is closed and the user is returned to the page from which the items were selected.

### Handling Unsaved Changes

If objects have unsaved changes, the corresponding tabs show an asterisk (\*) next to the title.

To prevent data loss, show a warning message in the following cases:

Case 1: The user tries to **close a tab with unsaved changes**.
Message type: Warning
Message text: _Your changes will be lost when you close this tab._ Buttons: _Close_, _Cancel_
Case 2: The user tries to **leave the page when one or more tabs have unsaved changes** (by clicking the _Back_ button or navigating to a different page).
Message type: Warning
Message text: _If you leave this page, your changes to the following [objects] will be lost:_

Buttons: _Leave Page_, _Cancel_
## Responsiveness

The multi-instance layout is controlled by the sap.m.TabContainer control.

The tab container supports all three SAP Fiori responsive sizes: small, medium, and large.

_Size L_          | _Size M_

## Top Tips

- To open the page containing the tabs, use a meaningful button text with the number of selected objects in brackets.
  Recommended label: _Open in Tabs (number of objects)_
  Example: 
- Use the same tab title as the object page title.
- Always use an object page floorplan to display the content of a tab.
- Only offer a _Create_ button if the application allows users to create new objects.

## Related Topics

+---------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------+
Cards (icons)
+------x-------+-------------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------------+
#### Elements and Controls
- [List Report Floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) (guidelines)
- [Object Page Floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) (guidelines)
- [Message Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) (guidelines)
+------x-------+-------------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------------+
#### Implementation
- [Tab Container](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.m.TabContainer) (SAPUI5 samples)
+------x-------+-------------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------------+
#### Visual Design
- [Multi-Instance Handling](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1825561234) (visual design specification)

---

## Page Layouts > Page Web Component > Usage

## Intro

The page is a container component for a full application screen comprising a header, content area, and footer.

<https://www.sap.com/design-system/live-examples/Page/page_LE_intro.html>

## When to Use

Use the page as a base for any screen you need for your application.

## Anatomy

1. **Header**
A. Home icon
B. Title
C. Button
2. **Content**
3. **Footer (optional)**. The footer can float or be
fixed at the bottom of the page.
D. Button
## Types

The page can have a floating or fixed footer bar.

## Behavior and Interaction

The page itself has no specific interactions. All interactions belong to the components within the page container and depend on the application use
case.

For details, see the guidelines for the individual components, such as the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button-web-component/).
## Responsive Behavior

The page offers considerable freedom and flexibility and
the page header and the footer are designed to adapt
automatically to small, medium, and large screen sizes.
- The title truncates if needed.
- The actions in the header and in the footer should stay
as long as possible but when the space is not enough, they
should transform to an overflow menu from right to left.
- If a priority is set to the actions, the highest priority
button is the last to move to the overflow menu.
- It is also possible to assign one button never to move to
the overflow menu.
Letterboxing is used to limit the width of the content area
to 1280 px. This prevents the app content from becoming too
“stretched” on wide screens, and optimises readability.
Letterboxing can be used if the use case requires it.
However, most business apps offer so much content that the
page is typically shown across the entire screen, without
letterboxing.
The page supports both cozy and compact mode.
## Globalization and Localization

When designing an application, have in mind that this
component also can be used with languages that use
right-to-left direction for writing and reading. In this
case the UI should be mirrored in order to be more
convenient for the users to interact with it.

---

## Page Layouts > Semantic Page > Usage

## Intro

The semantic page is recommended as the basic layout for freestyle applications. It builds on the basic functionality of the [dynamic page](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) and adds predefined content elements to the header toolbar (1) and footer toolbar (2), such as a title, global actions, and finalizing actions.

Using the semantic page significantly reduces the development effort for app teams, and ensures that the placement of the header and footer content conforms with the SAP Fiori Design Guidelines.

## When to Use

### Use the semantic page if:

- You are building a freestyle application.
- You want to use a predefined layout to reduce development time.

### Do not use the semantic page if:

- You are planning to use [SAP Fiori elements](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates), such as the [list report](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), [analytical list page](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/), [overview page](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/floorplans/overview-page/), or [object page](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/floorplans/object-page/).
- You want to implement an [initial page](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/) or [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) floorplan.
- You only need to display a small amount of information. In this case, use a [dialog.](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/ui-elements/dialog-web-component/) If you must use the dynamic page, use [letterboxing](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/page-layouts/letter-boxing/) to mitigate the issue.

## Components

The semantic page is based on the structure of the [dynamic page](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#components). In short, the semantic page has the following elements:

1. [Header title](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#header-title)
2. [Header content](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#header-content)
3. [Page content](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#page-content), dependent on the use case
4. [Footer toolbar](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#footer-toolbar) with finalizing actions

The control’s semantics determine whether content specified in the control appears in the [header toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/header-toolbar/) or [footer toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/footer-toolbar/).

### Header Title

- **Title** (1): The title is located on the left-hand side of the header title bar and is always visible.

- **Subtitle** (2): The subtitle is always below the title and is often used to summarize the most important information.
- **Breadcrumb** (3): Depending on the use case, you can add a [breadcrumb](https://www.sap.com/design-system/fiori-design-web/ui-elements/breadcrumb/) navigation.
- **Key information** (4): Key information is located in the middle area, and is left aligned. This can be text, mini facets, or KPI tags, for example.
- **Global actions toolbar** (5): The global actions toolbar for the entire floorplan is located on the right-hand side. Always use [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for global actions, visualized either as text or icons. For more information, see [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/#business-actions).
  Overflow menu: Actions move into the overflow from right to left. Icons are shown in the overflow menu with a corresponding text.
- **Layout actions** (6): These are actions like the _Close_ or _Full Screen_ / _Exit Full Screen_ icons, which are mainly offered by the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/). Depending on the screen size, layout actions are placed either to the right of the global actions toolbar, separated by a divider line, or above the global actions.

For more information about the expandable and collapsible header and its features, see [dynamic page](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).

> **Guideline:** - Layout actions never move into the overflow and are always last in the [header toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/header-toolbar/).
- Do not remove or disable actions within the header title when it is collapsed.

### Header Content

The _optional_ header content is not defined in the semantic page and can be populated according to the use case.

### Page Content

Like the header content, the page content is also not specified by the semantic page. It is proportionally the largest area of the layout and can be populated according to the use case.

### Footer Toolbar

The [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) is _optional_ and contains the following components:

1. Message button (containing the [message popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-popover/)) on the left-hand side
2. [Draft indicator](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) on the right-hand side, just before the finalizing actions
3. [Finalizing actions](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) on the right-hand side

## Behavior and Interaction

The interaction and guidelines for the [dynamic page](https://main--builder-prospect-prod--sapudex.aem.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#behavior-and-interaction) also apply for the semantic page. The actions in the semantic page and their order are predefined and follow the rules of the [action placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) concept. For more information about toolbars in general, see [toolbar overview](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/).

### Initial Focus

When the semantic page is loaded, set the initial focus as follows:

- If the page is in display mode, set the focus on the first section.
- If the page is in edit mode, set the focus on the first empty mandatory field.
- If there are no mandatory fields in edit mode, set the focus on the first editable element or first action.

## Responsiveness

The semantic page offers considerable freedom and flexibility. It is designed to adapt automatically to small, medium, and large screen sizes. Next to that the responsive behavior depends on the behavior of the content being displayed.

The **title** (`sap.m.Title`) and **subtitle** (`sap.m.Text`) on the left truncate in collapsed mode to save vertical space and wrap in expanded mode to offer the full text. This behavior needs to come from the respective controls for the [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) and [subtitle](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/). Overall, it is recommend not to show more than 2 lines of text in collapsed mode to avoid a disproportionate header height, especially on mobile devices, when no [summary line](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#summary-line) is used. This can either be a combined title and subtitle or a longer wrapping title. For more information, see [Wrapping and Truncation](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/wrapping-and-truncation).

**Key information** (middle area, left aligned) stays as long as possible before it moves into the overflow.

Global actions also stay as long as possible, but have a predefined width depending on the available space. If no key information is available, the title and global actions automatically get more space. The toolbar follows the standard [toolbar overflow](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/) guidelines, and adds buttons to the [overflow menu](https://ui5.sap.com//#/entity/sap.m.OverflowToolbar) from right to left.

The combination of a semantic page within in a [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) and accompanying [layout actions](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#responsiveness) works as described for the [dynamic page](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#combining-the-dynamic-page-with-the-flexible-column-layout). The same applies for the [summary line](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#summary-line) and [letterboxing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/letter-boxing/).

#### Size L

Carousel (full-width)

#### Size M

Carousel (full-width, col-1)

#### Size S

Carousel (full-width, col-2)

Section Metadata

style

## Top Tips

- Use always a [header title](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#header-title).
- Use the [header title](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#header-title) and [header content](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#header-content) to provide the most relevant information and actions for your use case.
- Do not remove or disable actions within the [header title](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#header-title) when it is collapsed.
- Make sure that the [layout actions](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/semantic-page/#header-title) in the flexible column layout are displayed correctly and never get hidden in the overflow.
- Start your application in [expanded mode](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#starting-in-expanded-or-collapsed-mode) if users need further content or adjustment options to get started.
- Offer the [pinning feature](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#pinning-the-header-content) whenever users may need to fix the header content while scrolling through the page content.
- Activate the [summary line](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#summary-line) on smartphones to help users focus on the actual content of the page.

---

## Page Layouts > Spacing

# Responsive Spacing System

## Intro

The responsive spacing system uses responsive padding and margin style sheet classes to control and optimize padding between elements that are common to all SAP Fiori interfaces.

## Responsive Padding and Margin Classes

Responsive padding and margin classes control:

- The left and right spacing within the header and content areas
- The space between components, such as tables and forms

These classes adapt to different screen sizes at specific breakpoints to ensure that no space is wasted on small screens and that content has more room to breathe on large screens:

- Size S screen: Up to 599 pixels
- Size M screen: Between 600 pixels and 1023 pixels
- Size L screen: Between 1024 pixels and 1439 pixels
- Size XL screen: 1440 pixels or more

The visual below illustrates how the padding adapts to different screen sizes.

> **Hint:** The spacing system is built into SAP Fiori Elements, but it must be implemented manually in freestyle SAP Quartz-themed applications using the
responsive margin and padding classes in SAPUI5. You can use individual spacing and padding classes to apply individual spacing inside or around
controls.

#### More Information
- [How to Code Padding and Margin Classes](https://www.youtube.com/watch?v=2QQL7CIlsuk) (YouTube video)
- [Enabling Responsive Paddings](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/topic/c71f6df62dae47ca8284310a6f5fc80a) (SAPUI5 Demo Kit)
- [Using Predefined CSS Margin Classes](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/topic/3b718b5372fa457c92cf5087a673e953) (SAPUI5 Demo Kit)

---