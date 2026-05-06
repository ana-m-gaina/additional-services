# SAP Fiori UI Elements: Lists Tables

This reference covers the following UI components:

- [Analytical Table Alv](#analytical-table-alv)
- [Display List Item](#display-list-item)
- [Grid List](#grid-list)
- [Grid Table](#grid-table)
- [List Overview](#list-overview)
- [List Web Component](#list-web-component)
- [Notification Center](#notification-center)
- [Object List Item](#object-list-item)
- [Responsive Table](#responsive-table)
- [Smart List](#smart-list)
- [Smart Table](#smart-table)
- [Standard List Item](#standard-list-item)
- [Table Web Component](#table-web-component)
- [Timeline](#timeline)
- [Tree](#tree)
- [Tree Table](#tree-table)
- [Tree Web Component](#tree-web-component)
- [Treemap Chart](#treemap-chart)
- [Upload Set With Table Plugin](#upload-set-with-table-plugin)

---

## analytical-table-alv

An analytical table\ contains a set of data that is structured in rows and columns. It provides several powerful possibilities for working with the data, including advanced grouping and aggregations.

In contrast to other tables, the analytical data binding used by the analytical table allows an aggregated number to be shown automatically in a cell. This means that a number in such a summarized cell is a total sum of several lines in the database.

## Usage

### Use the analytical table (ALV) if:
- The cell level and the spatial relationship between cells
are more important than the line item. Examples include
spreadsheet analyses and waterfall charts. Note that an
analytical table is not fully responsive. It is only
available for desktops and tablets, so you will need to
take an adaptive approach by offering an additional UI for
smartphones.
- You have to work on more than 1,000 rows. In this case,
the analytical table is easier to handle. In contrast to
the responsive table, the architecture of the analytical
table is optimized for handling large numbers of items.
Note that an analytical table is not fully responsive. It
is only available for desktops and tablets, so you will
need to take an adaptive approach by offering an additional
UI for smartphones.
- Comparing items is a major use case. In this case, an
analytical table might be more appropriate than a
responsive table. In the analytical table, each cell
contains only one data point. In contrast, the responsive
table is more flexible regarding line items, including the
ability to add more data points per cell and also the
pop-in function. Both make comparisons more difficult. Note
that an analytical table is not fully responsive. It is
only available for desktops and tablets, so you will need
to take an adaptive approach by offering an additional UI
for smartphones.
## Responsiveness

The analytical table is available for desktops and tablets, but not in smartphone sizes. It supports touch interaction devices, but is not optimized for small screens. If you use an analytical table, you need to take an [adaptive approach](https://www.sap.com/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness#adaptive-approach) by offering an additional UI for smartphones.

You could create a fallback by using a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/). However, a completely different solution, such as showing [charts](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/) in a read-only case, might be more suitable.

*Analytical table (ALV) shown on a desktop*

## Components

An analytical table does not consist of other elements. However, it is common to use a [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) above the analytical table.

The toolbar can contain entry points for the [view settings dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/view-settings-dialog/) and the [table personalization dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/) or for the [p13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/), as well as for view switches in the form of a [segmented button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/), and [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for *Add*, *Edit*, and other actions.

## Behavior and Interaction

An analytical table is quite restricted in terms of its content, although it provides powerful features for working with the content.

### Table Level

#### Scroll
*Scroll bar*
An analytical table allows horizontal and vertical
scrolling (sap.ui.table.AnalyticalTable, property:
navigationMode, value: Scrollbar).
You can add any number of line items to the analytical
table, which is known as “lazy loading”.
To prevent adverse side effects when scrolling
vertically, all line items must have the same height
(sap.ui.table.AnalyticalTable, property: rowHeight).
The analytical table is optimized to allow faster
scrolling within the first 1000 items.
#### Select

Selection for an analytical table depends on the chosen selection mode. The following options are available:

**No selection**: Items cannot be selected. (property:
selectionMode = None)

**Single selection**: One item in the analytical table
can be selected. A row selector column is shown.
(property: selectionMode = Single)
Default (col-1)

- **Multiple selection**: One or more items can be selected. The analytical table provides a column with checkboxes on the left-hand side.
Clicking a checkbox toggles the state of the corresponding row from deselected to selected and back. The **Shift** key can be used to select a range. For multiple selection, you can choose between two variants.
- Multi-toggle mode (property: selectionMode = MultiToggle)
- Multi-selection plug-in (sap.ui.table.plugins.MultiSelectionPlugin)
- These variants behave differently when the user selects more items than are currently loaded in the front end.
#### Multi-toggle
- In multi-toggle mode, you can offer a *Select All* checkbox to the left of the column header (property: enableSelectAll). Selecting this
checkbox selects or deselects all items that are currently loaded in the front end (keyboard: **Ctrl\+A**). All other items are not
selected/deselected. If the application data is stored in the back end, scrolling down further can reveal additional unselected items. The
same can happen with range selections if not all items in the selected range have been loaded to the front end.
#### Multi-selection plug-in
- If you use this plug-in instead of the multi-toggle selection mode, the behavior for range selection and *Select All* changes:
- By default, a dedicated *Deselect All* button replaces the *Select All* checkbox. There is no default UI element for selecting all items.
- You can set a limit for the number of items that can be selected (sap.ui.table.plugins.MultiSelectionPlugin, property: limit). This limit
has the following effect:
- The range that can be selected using the **Shift** key is limited to the specified number of items (default = 200). The table
automatically scrolls back to the last selected item and a message can appear (sap.ui.table.plugins.MultiSelectionPlugin, property:
enableNotification). Users can select more items by selecting additional ranges (the specified limit applies each time).
- If the selection limit is set to 0, a *Select All* checkbox is shown. There is also no limit on the number of items that can be
selected in a range. All selected items are loaded, which can lead to performance issues for large data sets. (Keyboard: **Ctrl\+A**)
- If selected items are not already available in the front end, they are loaded automatically by the plug-in and set as selected.

> **Information:** When setting a limit for the number of items that can be selected, keep the following boundaries in mind:
- The performance of your service: How many items can be loaded at once in a reasonable time? Does this also apply if
an end-user shows all available columns?
- The “minimum limit”: Internally, the analytcial table loads blocks of items as the user scrolls down. Because this
block size (sap.ui.table.AnalyticalTable, property: threshold) is usually also based on the performance of the service,
it should be safe to assume that the minimum selection limit is twice this size. In this case, loading the data would
take as long as scrolling down and loading exactly one more block. Nevertheless, we recommend using larger limits if
your service allows.

Default (col-2)

*Analytical table with multiple selection*

*Using the multi-selection plug-in with a limit*

Section Metadata

style

##### Selection Behavior

An item can be selected in different ways, depending on the configuration of the analytical table (sap.ui.table.Table, property: selectionBehavior):

- *Row*: An item is selected by clicking the checkbox or the row. Use this option for multi-selection tables if clicking a row or a cell is not used for anything else.
- *RowSelector*: An item is selected only by clicking the checkbox in the selector cell. Use this option if clicking the row (or a cell inside the row) is used for something else, such as navigation.
- *RowOnly*: An item is selected only by clicking the row, and not using checkboxes in the selector cells. Use this for single-selection tables if clicking a row or a cell is not used for another purpose, such as navigation.

#### Compact, Cozy, and Condensed

Like all SAP Fiori controls, the analytical table is shown in compact mode on a desktop and in cozy mode on tablets.
*Analytical table in compact mode*
For desktop devices, you can fit even more rows onto the screen by using the condensed mode together with the compact mode. This renders less white space
for each item.
*Analytical table in condensed mode - More items on the same screen real estate*
Note that the condensed content density must always be set in addition to the compact mode. Do not use the condensed mode on its own. Do not mix condensed
with cozy. Doing so could lead to unpredictable or unwanted results, such as cozy-sized controls in condensed-sized containers, missing padding, and so
on.
Note that neither compact mode nor condensed mode support touch interaction. Even on a desktop with a touch screen, users will have difficulty selecting
rows or using controls inside the cells with their fingers.
For more information on cozy and compact modes, see [content density](https://www.sap.com/design-system/fiori-design-web/foundations/visual/cozy-compact).
### Column Header

The column header provides the label for the corresponding column and access to the column
header menu.
Columns are resized as follows:
*Opening the column header menu on touch devices*
- **Mouse interaction:** The user drags the separator line between two columns
(sap.ui.table.AnalyticalColumn, property: Resizable). Double-clicking the line optimizes
the column according to the length of the data currently visible and the label of the
column header (sap.ui.table.AnalyticalColumn, property: Autoresizable).
- **Touch interaction:** The user clicks the column header to reveal two buttons: one to
show the column header menu and one for resizing. The user drags the latter to resize the
column.
- **Keyboard interaction:** Users can increase the width of the focused column header with **Shift\+Right** and decrease it with **Shift\+Left**.
When the user resizes a column, the adaptation of the column width depends on how the
column widths are set:
- If column widths are set in pixel-based units (px, em, rem), the resized column is
adapted and subsequent columns are moved accordingly. The width of all other columns is not
affected.
If all the columns together do not use up the full width of the table control, empty
space is added. If all the columns together exceed the width of the table control, a
scrollbar appears.
- If all column widths are set as percentages or “auto”, resizing one column automatically
resizes one or more other columns. Resizing can also affect the position of the resized
column. This option utilizes the full width of the table and ensures that no white space is
added. A scrollbar appears only if all or most of the columns become to narrow. To avoid
the side effect of undersized columns, you can set a minimum width per column. However,
this minimum width is only taken into account if columns are resized automatically. End
users can still reduce the column width to below the defined minimum (sap.ui.table.Column,
properties: width, minWidth).
Users can rearrange columns by dragging the column header to another position
(sap.ui.table.AnalyticalTable, property: enableColumnReordering). Keyboard interaction: **Ctrl\+Left** and **Ctrl\+Right** move the focused column header one position in the corresponding direction.
#### Column Header Menu
*Column header menu*
For each column, a menu can contain the following menu
items (sap.ui.table.AnalyticalColumnMenu, property:
Visible):
- *Sort Ascending/Descending*
(sap.ui.table.AnalyticalColumn, property:
showSortMenuEntries)
- Free text filter (sap.ui.table.AnalyticalColumn,
property: showFilterMenuEntries)
- *Group*
- Totals
- *Freeze* from the first to the last specified column
(sap.ui.table.AnalyticalTable, property:
enableColumnFreeze)
For each column, the menu can be replaced by an
app-specific menu.
#### Sort
*Sort settings in column header menu*
The column header menu can provide two sort options
(sap.ui.table.AnalyticalColumn, properties: sortProperty,
showSortMenuEntry):
- *Sort Ascending*
- *Sort Descending*
The user selects one of these options to sort the
corresponding column accordingly
(sap.ui.table.AnalyticalColumn, properties: sorted,
sortOrder, sortProperty).
#### Filter
*Free text filter in column header menu*
The column header menu can provide a search field for entering free text (sap.ui.table.AnalyticalColumn, properties: filterProperty,
showFilterMenuEntries).
If the user enters a term in the input field and triggers the search by pressing ENTER when the focus is on the filter input field,
the analytical table is filtered by the corresponding column and value (sap.ui.table.AnalyticalTable, properties: filtered,
filterProperty, filterValue, filterOperator, sap.ui.table.AnalyticalColumn, property: filterType).
Note that the filter may return zero results, in which case, the table might be empty.
General recommendations for filtering:
- If filtering is a main use case, choose the [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) or any other filtering UI over the built-in free text filter.
- Only use the free text filter if filtering is a secondary use case and if the filter bar is too heavy.
#### Group
*Group setting in column header menu*
The column header menu can provide the option to group by
this column (sap.ui.table.AnalyticalColumn, property:
sortProperty).
One group collects all items with the same value within
the corresponding column.
If line items are grouped in a column, every group is
provided with a collapsible or expandable group header
(sap.ui.table.AnalyticalColumn, property: grouped). The
header text consists of the column name and the value for
the corresponding group (sap.ui.table.AnalyticalColumn,
property: groupHeaderFormatter). Several grouping levels
are possible.
The corresponding column can be hidden to avoid
duplicates (sap.ui.table.AnalyticalColumn, property:
showIfGrouped). Exercise caution when using this option
since hiding the column changes the table layout and may
lead to confusion.

#### Aggregation
The column header menu can provide the option to show or
hide aggregation totals for this column.
Intermediate aggregations are shown at group level for
the corresponding columns if the group contains more than
one line item (sap.ui.table.AnalyticalColumn, property:
summed).
The overall aggregation is shown in a row at the bottom
of the analytical table when the column contains values
for a single unit of measure.
When the column contains values for **more than one** unit of measure, a *Show Details*
link is displayed in a row at the bottom of the table, for example, when the column
contains multiple currencies.
The *Show Details* link opens a popover that lists the totals for each unit of measure.
#### Freeze Columns
*Freeze setting in column header menu*
The column header menu can provide the option to freeze columns
(sap.ui.table.AnalyticalTable, property: enableColumnFreeze). Selecting *Freeze* freezes all
columns up to the one in which the operation was triggered (sap.ui.table.AnalyticalTable,
property: fixedColumnCount).
When *Freeze* is triggered, the menu item changes to *Unfreeze* for the corresponding column.
### Line Item Level
*Line item*
A line item contains a set of cells and provides options
for selecting the item.
To prevent adverse side effects when scrolling
vertically, all line items must have the same height.
(sap.ui.table.**AnalyticalTable**, property: rowHeight)
#### Drag and Drop
*Drag and drop*
One or several items can be moved to other UI elements
using drag and drop operations
(sap.ui.table.AnalyticalTable, aggregation:
dragDropConfig). While being dragged, the items are shown
as ghost elements on the mouse cursor.
Drop targets can be on items, between items, or both
(sap.ui.core.dnd.DropPosition). On a drop target, the
mouse cursor changes to either a “copy”, “link”, “move”,
or “none” cursor. “None” indicates that the dragged item
cannot be dropped in the current position
(sap.ui.core.dnd.DropEffect).
Drag and drop is only available on supporting browsers.
### Cell Level
*Cell*
A cell provides one data point.
It can contain one of the following controls to display this data point:
- [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)
- [Label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/)
- [Object status](https://www.sap.com/internal/fiori-design-web/object-status/)
- [Icon](https://www.sap.com/design-system/fiori-design-web/foundations/visual/iconography/icons)
- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)
- [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)
- [Date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/)
- [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/)
- [Combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/)
- The following micro charts in size XS: [Bullet](https://www.sap.com/design-system/fiori-design-web/ui-elements/bullet-micro-chart/), [comparison](https://www.sap.com/design-system/fiori-design-web/ui-elements/comparison-micro-chart/), [stacked bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/)
- [Multi-combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-combobox/)
- [Multi-input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/)
- [Checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/)
- [Link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link/)
- [Currency](https://www.sap.com/design-system/fiori-design-web/ui-elements/currency/)
- [Rating indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/)
- [Progress indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/)
While it is technically possible to also use other controls, doing so could lead to issues with alignment, condensed mode, screen reader support, and keyboard support.
If you use text, use only single-line text to keep the same row height. Truncate if necessary as this prevents adverse side effects when scrolling vertically (sap.m.Text, property: wrapping, value: false). Do not wrap.
#### Context Menu
*Analytical table with context menu*
You can attach a context menu (sap.m.Menu) to a table. The context menu gives users an alternative way to
modify the focused elements by giving them access to context-specific functions.
When opened, the context menu gets the row and column context, except for special columns (such as the
selection column) or special rows (like group headers). Context menus can be implemented for a specific table,
row, or cell (not recommended for editable cells).
By default, the analytical table provides a context menu on the group headers (for example, *Expand*, *Collapse*, …). Otherwise, no default context menus are provided.
Context menus are opened by right-clicking (desktop), long press (mobile), the **context menu key**, or **Shift\+F10**.
Be aware that using the context menu overrides the browser context menu, which can no longer be opened.
If a control inside a table is the “click target”, and the control also provides a context menu, the control
context menu “wins”.
## Guidelines

### Data Density vs. Complexity

The analytical table can be used to display and work with large amounts of data. Unfortunately, the analytical table has a high data density and therefore conveys an immediate feeling of complexity.

Only show tables with a lot of data as a last resort. To make the data easier to read, you should instead try the following:

- Break down the data into manageable chunks and allow the user to navigate or drill down between them.
- Use charts with drilldown functionality until the amount of data is more manageable.

Try to avoid horizontal scrolling in the default delivery.

Try to minimize the number of columns, especially if there is a large number of rows.

### Table Title

Implement the table title by using a [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) control in a [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/).

Use a table title only if the title of the table is not indicated in the surrounding area.

Do not use a table title if it simply repeats text that is already above the table. For example:

- A pricing conditions table is the only control on a tab labeled *Pricing Conditions*.
- A section or subsection on an object page contains only one table.

Use a table title if you need the item count, [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/), or [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/). To avoid repeating text, feel free to use generic text as a table title, such as *Items*.
Exception: If the surrounding area contains the table title, and both the item count and toolbar can be added to the surrounding area, no additional table title is needed.
Example: An object page (sub-)section contains only one table. In this case, add the item count and the table toolbar to the (sub-)section header.

If you use a table title, show either a title for the table, with or without [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/), or an item count in the following format:

*Items (2,534)*.

The item count in the table title includes all the visible items that a user can reach by scrolling or expanding groups. Group headers are not included.

Remove the item count in the table title if there are zero items.

> **Hint:** Assistive technologies (such as screen readers) use the title to create a hierarchical site map for faster
navigation. In addition, screen readers use the title as the label for the table.
If you don’t use a title (for example, to avoid repetition), make sure that the table is connected to another
meaningful on-screen text that can be used as a label for assistive technologies. You can do this using the method
addAriaLabelledBy.

### Selection

#### Single Selection
For single-selection list-detail scenarios within the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), do not show an additional “navigated” indicator.
#### Multiple Selection
- We strongly recommend using the multi-selection plug-in. This ensures that all items selected using *Select All* or as part of a range are included – even if some items were not initially loaded in the front end. This is not the case if you use the multi-toggle option.
- Do not limit the range selection for the multi-selection plug-in unless you have to.
- If the dataset is small and/or completely available in the front-end, set the limit property to 0 to enable the *Select All* option and allow users to select any range.
- If you have a large dataset, set a limit on the number of selected items to avoid performance issues. Also bear in mind that some actions won’t be helpful if the dataset is too big (for example, a delete operation on 2
million database entries).
- When setting a limit, also display the corresponding message when the user selects more items at once than the limit allows (sap.ui.table.plugins.MultiSelectionPlugin, property: enableNotification).
- In multiple selection mode (multi toggle), do not show
checkboxes in the first data column in the default
delivery to avoid confusion.
*Do not add checkboxes to the first column*

- Never disable the selection checkbox. If an action can’t be performed on a specific item, inform the user after the corresponding action has been triggered. For more information, see [Enabling/Disabling Actions](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).
### Loading Data

To indicate that the table is currently loading items, use the [busy state](https://www.sap.com/design-system/fiori-design-web/ui-elements/busy-state/) (sap.ui.table.AnalyticalTable, property: busy). Do not show any items or text. As soon as the data is loaded, remove the busy state and show all items.

Default (col-1)

### Errors and Warnings

Default (col-1)

To indicate that the table contains items with errors or warnings, show a [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) above the table. On the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/), provide information about errors or warnings. When issues are solved or when new issues appear, update the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) accordingly.
To indicate an error in a single row, see [Item States](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/#item-states) below.
For details on displaying errors, warnings, and other messages, see [Message Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

> **Hint:** The sap.m.plugins.DataStateIndicator displays a message strip above the table, which shows binding-related messages.

Default (col-2)

*Table containing errors and warnings*

Section Metadata

style

### Columns – Best Practices

Minimize the number of columns. Avoid the need to scroll horizontally in the default delivery.

By default, the analytical table assigns the same width to each column. We recommend overwriting this default to provide optimal space for your content (sap.ui.table.AnalyticalColumn, property: width).

If you define the column width in pixels or rems, resizing a column affects only the width of this specific column. Reducing the size of the browser window results in a scrollbar. If the user resizes a column, and the total width of all columns exceeds the table width, a scrollbar appears. If the columns do not take up the full table width, white space appears to the right of the last column.

If you define the column width as a percentage, resizing one column affects the width of several or all columns. Reducing the size of the browser window truncates the texts. This ensures that the columns fill up all the available space. A scrollbar appears only if width of all the columns still exceeds the table width after the automatic width adjustments. To avoid the side effect of undersized columns, you can set a minimum width per column. However, this this minimum width is only taken into account if columns are automatically resized. End users can still reduce the column width to below the defined minimum (sap.ui.table.Column, properties: width, minWidth).

If you set the column width to “auto”, the behavior is the same as for “percentage”. However, unlike “percentage”, “auto” distributes the columns equally.

To decide on how to set the column width (pixel/rem/em vs. percent/auto), keep the following in mind:

- For tables with only 2 to 3 columns, use pixel-based units. This ensures that the values in the columns are not spread over the whole screen on wide screens, which improves the readability of the line items.
- For tables with many columns, where a horizontal scrollbar is usually needed, use pixel based units. This avoids unintended side effects when resizing columns.
- For all other tables, use whatever fits your case better.

Be cautious when mixing columns with pixel-based and percentage-based widths. While this can be helpful in some cases, it can also cause even more side effects when resizing a column. If you are using percentage-based widths for one or more columns, consider not allowing end users to resize columns at all.

Optimize the column width for its     | Don't                                                                           | Don't
initial visible content, including
the column header texts. If this is   | \
not possible (for example, if showing | *Don't truncate the initial visible content In the default delivery*            | *Never wrap texts*
the full texts would result in
extremely wide columns), let the
texts truncate. End users can change
the width of the column to read the
full text, as needed.
Maintain a constant column width and
avoid adjusting it automatically when
the content changes.
Always keep to one line of text. Do
not wrap.
### Column Headers – Best Practices

For each column, provide a label in the column header. In the default delivery, do not truncate the column header texts. Only let the text truncate if showing the full text would make the column too wide. Never wrap the text.

### Content Alignment

For alignment of cell content, follow the guidelines below.

Left-align: text, IDs, phone numbers, URLs, passwords,
and email addresses.

Right-align: numbers, except IDs, to ensure comparability
of numbers and amounts.

Right-align amounts with currencies to the cell and align
their respective decimal points.
This ensures that amounts with different currencies are
shown correctly, regardless of whether the currencies
have 0, 2, or 3 decimals.
For aligning to the decimal point, use the
sap.ui.uinified.Currency control.
Right-align dates and times.
This ensures comparability for most formats and locales.

Left-align status information.
*Left-align status information*

Center-align icons.

Left-align micro charts.
*XS micro charts in condensed mode*

### Content Formatting

#### Key Identifier
*Emphasized link*
Use a bold label or an emphasized link as the key
identifier of an item. In the default delivery, show the
key identifier in the first column.
For strings with IDs, use one of the following:

- Show the ID together with the corresponding description in one column whenever possible. Description fields are hidden by default, so the [P13n](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/)[dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/)
remains clear, and key users can switch between ID only, description only, or a combined display at any time. Use a text arrangement if the metadata supports it, ensuring consistent sorting, filtering, and
grouping. Only use separate ID and description columns if no text arrangement is available, because users cannot combine them later.
- Show the ID in parentheses after the corresponding string. In this case, you must opt for **one** criterion for sorting, filtering, and grouping – **either the string or the ID**. This option is then used for all sort, filter and group actions and can’t be changed later by the user. Use this format only if users don’t need to sort, filter, and group by both the string and the ID.
*Text and ID in two columns – Allows sorting, filtering, and grouping for both*
*If displayed as a link, use only the string as the link, not the ID*

*If displayed as a link, use the whole text as the link*

#### Truncation
*Optimize column width for typical content, not all content*
Avoid truncation of typical content in the default
delivery (sap.ui.table.AnalyticalColumn, property:
width). However, since the columns are resizable, do not
worry too much if truncation occurs as columns can still
be enlarged if necessary.
To prevent adverse side effects when scrolling
vertically, all line items must also have the same
height. If you need to decide between truncation and
different row heights, choose truncation. Do not wrap.
#### Number of Links
*Emphasized links, links, subtle links, and text*
Are there too many links? Use subtle links to avoid a
wall of links. Standard links are also emphasized more if
they are surrounded by subtle links.
For example, a financial table consists of several
columns with summarized cells. A summarized cell shows
the total sum of several database entries. Each sum
should be a link to a report that shows details about
which database entries produce the total sum. The line
item identifier should also be a link that provides more
detail about the line item itself. Use a standard or
emphasized link for the item identifier, and subtle links
for the summarized cells.
#### Missing Value
*Leave empty fields blank*
If there is no value for a cell, leave it blank. Do not
display text as *N/A*.
#### Numbering Items
*Add a separate column for the item number*
In terms of numbering items:
- If the item number is more like an ID with regard to
its description, use ID formatting as described above.
- In all other cases, use a separate column for the item
number.
#### Status
*Semantic colors on text*
For status information, use semantic colors on the foreground elements.
For status information on text, use an [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/).
#### Micro Charts
*Micro charts in an analytical table*
Use only the following micro charts: [Bullet](https://www.sap.com/design-system/fiori-design-web/ui-elements/bullet-micro-chart/), [comparison](https://www.sap.com/design-system/fiori-design-web/ui-elements/comparison-micro-chart/), [stacked bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/). When using micro charts, use them in size XS.
#### Empty Tables
*Provide meaningful instructions*
Avoid empty analytical tables. If necessary, provide instructions on how to fill the analytical table with data (sap.ui.table.AnalyticalTable, properties: noDataText, showNoData).
Examples:
- If a table is initially empty, provide at least a basic text:
*No items available.*
Overwrite this whenever a hint can be provided on how to fill the table with data.
- If a table is used together with a [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) (as in the [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)), and is initially empty, use the following text:
*To start, set the relevant filters.*
- If a table is used together with a filter bar and the filter does not return results, use the following text:
*No data found. Try adjusting the filter settings.*
Adapt the texts above if:
- The standard text is not precise enough for your use case (for example, a search is also offered, or only the search is offered).
- The standard text is misleading (for example, if the data is filled based on a list-detail pattern instead of filter settings).
#### Invalid State
*Analytical table with invalid data*
To show an invalid state of the analytical table within the [list report floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/),
show an overlay on the analytical table and the corresponding toolbar (sap.ui.table.AnalyticalTable, property: showOverlay). The overlay
prevents user interactions.
Use this within the list report floorplan if filter settings have been changed but the analytical table has not yet been updated.
### Item States

To show that an item has been modified, for example, within the [global edit flow](https://www.sap.com/internal/fiori-design-web/edit-page/), add the string *(Modified)* in an additional column with the label *Editing Status*.
*A modified item*
In the default delivery, add a column directly behind the key identifier.
To show that a modified item contains an error, for example, within the global edit flow, add
the string *Contains errors* in the *Editing Status* column and highlight the row accordingly. This string replaces the *Modified*
string. A row with errors should be highlighted in all use cases – for example when the field
is visible in the row in edit mode.
To show that an item is [locked](https://www.sap.com/internal/fiori-design-web/v1-114/draft-handling/#editing-status), add a transparent-style button with the corresponding icon and the text *Locked by [name]* in the *Editing Status* column.
*A locked item*

To show that an item is in [draft](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) state, add a transparent-style button with the text *Draft* in the *Editing Status* column.
*Item in draft state*

Show only one state at a time.

### Numbers and Units

Show the unit of measurement in one of the following ways:

The number and unit are in the same cell. Do this if
sorting, filtering, or grouping by the unit of
measurement are not needed.
For amounts, use a currency control to display the
concatenated string.
The number and unit are in separate columns. Do this if
sorting, filtering, or grouping by the unit of
measurement are a common use case.
Note that this column can be hidden or moved
independently of the column containing the corresponding
number. Therefore, be sure to have clear labels for both
columns to communicate the dependency.
If the unit of measurement is the same for all rows, show
the unit of measurement in the column header. Otherwise,
show the unit of measurement within the row.
### Drag and Drop

Drag and drop is “invisible” on the UI: users can’t see where dragging is available and where it isn’t. In addition, there is no generic keyboard interaction. Drag and drop is also
not available on all browsers. For these reasons, provide it only in addition to existing (and visible) UI elements that fulfill the same purpose. For example, offer ([toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/)) [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for moving or for copying and pasting items. These are keyboard operable and available on all browsers.

Do not use drag and drop for rearranging items in the
analytical table. The analytical table is mainly used for
grouping items and for calculating the totals per group
and column. Moving items to another group also means that
a value of the dropped item changes: because grouping is
based on values in a column, the dropped item needs to
take on the value of the target group for the
corresponding column.
Example:
A table is grouped by availability. An item is moved from
the group “Not Available” to the group “In Stock”. In
this case, the moved item needs to change its
availability to “In Stock” to match the target group.
Because changing the value in this way doesn’t make
sense, rearranging items is not permitted in analytical
tables.
### Context Menu

Use the context menu only to give users a quick way of accessing functions that are already available elsewhere (for example, as buttons in the toolbar). Don’t just offer actions in the context menu itself, as users might not realize that these actions are available at all.

The context menu can be triggered for the table, row, or cell. However, we do not recommend using context menus for cells: because the content of a cell is a different touch target than the cell itself, opening a cell context menu via touch is quite hard, even in cozy mode.

Do not combine context menus with condensed mode: editable controls fill the entire space inside a cell. Because of this, context menus cannot be opened at all with touch or mouse interaction.

### Actions

#### Multiple Items

To trigger actions on multiple items, use a multiselection analytical table (sap.ui.table.AnalyticalTable, property: selectionMode, value: MultiToggle). Offer the corresponding actions in the table toolbar.

Do not offer action triggering on multiple items if the table is generally expected to have fewer than 10 items. In this case, try to use the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) instead of the analytical table.

#### Single Item

To trigger actions on a single item (sap.ui.table.AnalyticalTable, property: selectionMode, value: Single):

- Show the actions on the table toolbar.
- In **rare cases**, show the actions within the line item. One example would be an *Add to Cart* button in a shopping application. Since these actions are repeated in every line and thus use a lot of screen real estate, do this only for a maximum of one or two actions. Provide a separate column per action. Use a button, unless the action trigger belongs to a link. Hide the action in rows for which it is not applicable.

#### Single Cell

To trigger actions on a single cell, create the corresponding click event. Do not use the cell click event if the cell contains interactive controls, such as links.

To trigger navigation on line item level choose one of the following options:
*Navigate to details page*
- Use a **link for the attribute that identifies the row**. Clicking the link triggers the navigation.
- Add the **RowActions column** and show the navigation indicator ( :slim-arrow-right: ) at the end of the row. The navigation arrow triggers the navigation.
*Special case: Multi-selection in a list-detail scenario* When a multi-selection table is used in a list-detail scenario, it is not clear which item was last opened (for example, which item is currently shown in the second column of a [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)). In this case, you can display a **“navigated” indicator** to show which item is currently open.
Use the **RowActions** column only for one or both of the following actions:
- Navigate to details page (:navigation-right-arrow: )
- Delete (:sys-cancel: )
The RowActions column does not provide a column header text. It is fixed and will not scroll away. Users also cannot personalize this column.
#### Add Items

To let users add items, place an *Add* or *Create* text [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) on the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/).

- Use *Create* if the [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) adds a brand new item that doesn’t yet exist on the database.
- Use *Add* if the item already exists and is merely added or assigned to the current object.

Show new items as the first item of the table, with a visual highlight at the beginning of the row.

Enable the shortcut **Ctrl+Enter** (and ideally also **Enter**) to trigger the *Add* or *Create* button.

There are three options for adding an item. In order of priority (most recommended first), these are:

1. **Add the item inline**. Create an empty, editable row as the first item of the table. Show the *Save* [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) on the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/). This option is recommended for simple scenarios with just a few columns and no option to hide columns.
2. **Open a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/)** for larger tables with up to 8 editable columns. Save the new item at the [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) level.
3. **Navigate to a new page**. Only use this option for very complex scenarios that cannot be handled by a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) (for example, tables with more than 8 columns). When the user presses *Save* in the [footer toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/footer-toolbar/) of the [create page](https://www.sap.com/internal/fiori-design-web/create-page/), navigate back to the table.

Depending on the flow, an item can be in one of three different states:

- **New**: The item was just created inline and is in edit mode (for example, after pressing the *Create* [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)). It is highlighted with a visual indicator (information state).
- **Recent**: The item was just created and is in read-only mode (for example, if *Create* leads to a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/), and *Save* was triggered within the [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/)). In this case, keep the item highlighted and display it as the first item in the table. Ignore current sort, filter and grouping criteria to keep the item visible.
- **Added**: The item has been fully added. It follows the sort, filter, and grouping settings and also loses the visual highlight. This state is applied as follows:
  - Inline creation: After *Save* is triggered on the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) or at page level.
  - Create with [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/): A table showing one or several items with the state “Recent” gets updated (for example, after sorting, filtering, or grouping, or when the browser is refreshed).

If [draft handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) is used, new items are not saved at table level, but rather with the entire draft.

For more details, see the guidelines for [managing objects](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) (including subarticles).

### Editable Content

Default (col-1)

For editable content, only use the following controls, and only one control per cell:
- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)
- [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)
- [Date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/),
- [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/)
- [Combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/)
- [Multi-combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-combobox/)
- [Multi-input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/)
- [Checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/)
- [Rating indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/)
Only these controls are optimized for all viewing modes of the analytical table.
If you need edit mode, change your text controls, such as label, text, link, object status, icons, and currencies, to editable controls as soon as you switch to edit mode, but not before. You can do this by exchanging the
controls, for example, from sap.m.Text to sap.m.Input.
For mass editing items:
- Provide multiselection.
- Provide an *Edit* button.
- If several items are selected, clicking the *Edit* button opens a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) in which the user edits the corresponding fields for all selected items.
This is similar to mass editing in the split-screen layout floorplan.

> **Warning:** Do not offer editing for summarized cells. A summarized cell shows the total sum of several database entries.
Changing the total sum does not make sense since it is unclear how this sum is divided between the different database
entries.

Default (col-2)

*Interactive controls – Inline*

Section Metadata

style

### View Settings

There are several ways to show *Sort*, *Filter*, and/or *Group* settings:
*Column header menu with view settings*
- Column header menu: In all cases, show the corresponding settings in the column header menu.
- [View settings dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/view-settings-dialog/): Simple and more
flexible with regard to filter settings. No advantage for sorting. Allows the user to ungroup grouped columns.tables with a
medium amount of items.
- [Table personalization dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/):
Provides complex options for sorting items by several levels and allows the user to ungroup grouped columns. It also provides a
query-builder-like approach for filter settings. The complexity of the options is also its downside. Use the table
personalization dialog for tables with a large number of items.
- If filtering is a main use case, use the filter bar. In this case, avoid offering additional filter settings on the table. If
you do, the filter settings on the table work only on the result set provided by the filter bar.
Always be careful when synchronizing the settings in the dialog with the settings from the column header menu.
Trigger the dialogs in one of the following ways:
- **View settings dialog**: Provide several buttons, one for each of these view settings. Each button opens the view settings
dialog on the corresponding page.
- **Table personalization dialog**: Provide a settings button, which opens the table personalization dialog containing all pages.
Use only the view settings you really need. For example, do not offer grouping if it does not support your use case.
Persist the view settings. When a user reopens the app,
show the analytical table with the same sort, filter,
group, and aggregation settings as last defined by this
user.
#### Sort
*Column, sorted ascending*
Always sort the table in a meaningful way when it first
loads. In most cases, this means sorting by the column
that identifies the row. This is usually the first column
in the default delivery.
To display the current sort state, an icon is shown in
the column header of the last sorted column. This icon
indicates the sort direction
(sap.ui.table.AnalyticalColumn, properties: sorted,
sortOrder, sortProperty).
For the default sort setting, sort by the column that
identifies the row, which is usually the first column in
default delivery. Use a meaningful sort order, such as
alphabetical order for text, numeric order for numbers,
or chronological order for dates.
The descending sort order         | \
must always be the exact          | *Object status sorted ascending, with neutral status last*            | *Object status sorted descending, with neutral status first*
reverse of the ascending sort     |
order.                            |
For each column, provide a        |
meaningful sort order. For        |
example:                          |
- Sort text alphabetically        |
- Sort numbers by their value     |
- Sort status information by      |
the severity of the status:     |
- Ascending: Sort status        |
information from positive to  |
negative, with neutral last.  |
- Descending: Sort status       |
information from negative to  |
positive, with neutral first. |
- - Ascending with different        | \
values per severity level: Sort | *Object status sorted ascending and alphabetically, from positive to negative with neutral last*            | *Object status sorted descending and alphabetically, from negative to positive with neutral first*
status information from         |
positive to negative, with      |
neutral last. Sort different    |
values within a severity level  |
(semantic color)                |
alphabetically.                 |
- Descending with different       |
values per severity level: Sort |
status information from         |
negative to positive, with      |
neutral first. Sort different   |
values within a severity level  |
(semantic color)                |
alphabetically.                 |
#### Filter
*Column, filtered*
To display the current filter state, an icon is shown in
the column header of the filtered column
(sap.ui.table.AnalyticalColumn, properties: filtered,
filterProperty, filterValue, filterOperator,
defaultFilterOperator, filterType).
#### Group
*Group headers, several levels*
To display the current group state, group headers are
shown. Show the following text in the group header
(sap.ui.table.AnalyticalColumn, properties: grouped,
showIfGrouped, groupHeaderFormatter):
*[Label of the grouped column]: [Grouping value]*
If there is no grouping value, show the following text:
*[Label of the grouped column]: (Not Available)*
This is the case if you have a group of items that don’t
have a value for the grouped column.
Set the property collapseRecursive to “false” to keep
subgroups expanded even after collapsing and expanding
the parent group.
On non-touch devices, right-clicking a group header opens
the group header menu. On touch devices, the same menu is
opened by using the menu icon on the right side of a group
header.
*Group header on touch devices*
The group header menu provides several options:
- *Show/Hide*: Shows or hides the column in the table
layout, although it is grouped.
- *Ungroup*: When the user ungroups a column, the
corresponding group headers disappear. If the column was
hidden, it is shown again as a separate column.
- *Ungroup All*: The columns are shown again.
- *Move Up*: Rearranges the grouping levels hierarchy by
moving the selected group above the group that is one
level higher up in the hierarchy.
- *Move Down*: Rearranges the grouping levels hierarchy by
moving the selected group below the group that is one
level lower down in the hierarchy.
- *Collapse Level*: Collapses all groups on the
corresponding grouping level.
- *Collapse All*: All groups are collapsed.
In general:

- Offer grouping on objects and attributes.
- Do not offer grouping on measures.
- If appropriate, offer reasonable grouping by default, but do not exaggerate. As a rule of thumb, use up to three group levels.
- Provide more space for the first column. Grouping needs an indent per group level. Extra space in the first column prevents truncated text.

Default (col-1)

#### Aggregate
To display the current aggregation state, the total sum of the corresponding column is shown at the bottom of the
table.
If items are grouped, an intermediate sum is shown:
- At the bottom of each group if the group is expanded.
- In the group header if the group is collapsed.
(sap.ui.table.AnalyticalColumn, property: summed)
When aggregating amounts with different units of measurement, show an asterisk (\*) in the aggregation rows.

Default (col-1)

When sorting an aggregated column, only the leaf nodes of a group are included by default. If each measure column currently displays a single unit of measurement, the order of the groups can also be
affected.
For example:
Let’s assume that table items are grouped by *Country/Region* and aggregated by *Total Net Amount.* If you sort the *Total Net Amount* column in descending order, the largest total net amount is shown first.

> **Warning:** Only enable sorting by totals if each column has a single unit of measurement. This prevents inconsistencies in the
sorting behavior, which depends on user settings, such as filter settings or the columns currently displayed.

> **Hint:** To allow sorting by totals, the following conditions must be met:
1. For each measure column, multiple units must not occur in the displayed data, regardless of whether or not totals
are shown.
2. The autoExpandMode of the AnalyticalBinding must be set to Sequential. Note that the default is Bundled.

Default (col-1)

In general:
- Offer aggregation on measures, but not on objects or attributes.
- Avoid aggregations on the first three columns for the default delivery. As soon as grouping is used together with
aggregations, collapsing a group shows the aggregation on the group header. This conflicts with the group name.
- Where appropriate, offer reasonable aggregation by default.

Default (col-2)

*Aggregation and groups*

Section Metadata

style

### Personalization

Only offer personalization if you need more columns than a tablet screen can display at any one time, which is usually five.

Persist the column layout. When a user reopens the app, show the analytical table with the same column layout settings as last defined by this user.

#### Add, Remove, and Rearrange Columns

To add, remove, or rearrange columns, use one of the following:

- The [table personalization dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/): It offers some simple settings for column layout. Use this if you have only a few columns to choose from and/or you use the [view settings dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/view-settings-dialog/).
- The [p13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/): Besides various complex view settings, it also provides settings for column layout. Use this if you have a large number of columns to choose from and/or you use this dialog anyway for view settings.

In both cases, trigger the dialog via the settings button in the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/). As short cut, use **CTRL+COMMA**.

You can also use drag and drop to rearrange columns (sap.ui.table.Table, property: enableColumnReordering). If you allow rearranging via drag and drop as well as via a dialog, keep both places in sync.

#### Resize Columns

Resizing columns works differently on touch and non-touch devices.

- Non-touch devices: Drag and drop the column separator on the right side of the column. Double-clicking the column separator optimizes the width of the column for the data currently loaded into the front end, which is usually about 100 rows.
- Touch devices: Clicking the column header reveals two buttons: one for opening the column header menu, another one for resizing the column. Drag and drop this second button to resize the column.

#### Freeze Columns
*Frozen column*
For freezing columns, offer the setting in the column header
menu (sap.ui.table.AnalyticalTable, property:
enableColumnFreeze).
Selecting *Freeze* on a column freezes all columns from the
first one to the one where *Freeze* is selected. On this column, the menu entry changes from *Freeze* to *Unfreeze*.
#### Highlight Items
*Highlighted items*
To show that an item needs attention, you can display a highlight indicator in front of the item. The highlight indicator can be used to indicate:
- A semantic state, such as red or orange for an error or warning. In this case, use [semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Additional information, such as blue to highlight newly added items. In this case, use [semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Industry-specific or process-specific states, such as “out of stock” or “excess of inventory”. In this case, use [indication colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#indication-colors).
Be aware that the highlight is just an indication. It does not tell users exactly what is wrong. Make sure that you provide this information within the table row, ideally in the same color.
For details on the use of highlight colors, see [How To Use Semantic Colors / Industry-Specific Colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).
(sap.ui.table.AnalyticalTable, aggregation: rowSettingsTemplate)
### Tables in Object Pages

In the [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/), you can use a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#tables-in-object-pages) or [grid](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/) table and offer navigation to a list report with the previously mentioned tables. We advise using analytical and [tree tables](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/) in tab mode.

For more information on the use of tables within the object page, see the [Tables](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#tables) section of the *Object Page* article.

### Export to Spreadsheet

On the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/), apps can provide a [menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/#menu-button1) for exporting table data to a spreadsheet. For the export, use the [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) function.
*'Export to Spreadsheet' menu button*

## Properties

sap.ui.table.AnalyticalTable

The following additional properties are available for the analytical table:

- The property: width defines the width of the analytical table.
- The property: rowHeight defines the height of each row in the analytical table. Since the height required is calculated automatically by the analytical table, this property is only needed rarely.
- The property: columnHeaderHeight defines the height of the column headers. Since the height required is calculated automatically by the analytical table, this property is only needed rarely.
- The property: columnHeaderVisible can be used to hide the column headers. Always show the column headers.
- The property: showColumnVisibilityMenu provides an additional entry in the column header menu that allows columns to be shown or hidden. In SAP Fiori, columns are shown and hidden via the table personalization dialog or via the table personalization dialog. Do not use this property.
- The property: columnVisibilityMenuSorter is used for sorting the columns inside the column header menu if showing and hiding columns is provided in the menu. In SAP Fiori, columns are shown and hidden via the table personalization dialog or via the table personalization dialog. Do not use this property.
- The property: visibleRowCount defines the height of the analytical table. Show as many rows as fit on the screen.
- The property: visibleRowCountMode defines whether the height of the analytical table is fixed or automatically calculated based on the space provided by the underlying container. For automatic calculation, make sure that all rows have the same height.
- The property: minimumAutoRowCount defines the minimum number of rows that must be shown if the property: visibleRowCountMode is set to “auto”. Show at least three to five rows.
- The property: firstVisibleRow defines the first row shown in the visible area of the analytical table. The analytical table is scrolled accordingly.
- The property: allowColumnReordering is deprecated. Use the property: enableColumnReordering instead.
- The property: editable does not have a visible effect. Please do not use it.
- The property: threshold is used for optimizing lazy loading of items. In most cases, the default value is appropriate.
- The property: enableGrouping is experimental and does not have a meaningful effect on the analytical table. Do not use it.
- The property: sumOnTop shows additional aggregation values on the group header, even if the group is expanded. Do not use it.
- The property: enableCustomFilter changes the filter entry in the column header menu from an edit box to *Filter…*. Selecting this entry throws an event that apps can react to, for example, by opening a dialog. In general, you should choose the built-in filter over your own implementation. Specifically, keep filtering via the column header menu simple, while offering more advanced options via the table personalization dialog.
- The property: enableBusyIndicator has not yet been fully implemented. Do not use it.
- The property: title adds a line of text on top of the analytical table. Do not use it. To add a title to the table, use a toolbar.
- The property: footer adds a short text at the bottom of the table.
- The property: Busy sets the analytical table to busy state. While in busy state, the whole table cannot be used and items cannot be read due to an overlay.
- The property: Tooltip does not have an effect. Do not use it.
- The property: alternateRowColors displays the rows with alternating background colors (“banded rows”). Do not use it.

sap.ui.table.AnalyticalColumn

The following additional properties are available for the analytical column:

- The property: leadingProperty is used for data binding.
- The property: inResult is used for data binding.
- The property: visible defines whether a column is shown or hidden.
- The property: name defines the name shown in the column header menu for showing and hiding columns. In SAP Fiori, columns are shown and hidden via the table personalization dialog or via the table personalization dialog. Please do not use this property.
- The property: headerSpan defines whether one column header is used for one or several columns. To prevent adverse side effects, always use one column header for only one single column. Please do not use this property.
- The property: Tooltip does not have an effect. Please do not use it.

---

## display-list-item

The display list item is the simplest list item. It shows content in the form of labels and text.
As [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) are generally the preferred control for combining labels and fields, display list items are seldom used.

## Responsiveness

Labels and text generally occupy 100% of the space they
need. If a combination of the label and text is too long
for the total space available, one or both are truncated
so that each occupies a maximum of 50% of the space.
## Behavior and Interaction

List item behavior and interaction is similar for all list item variants and is therefore described in the [list overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) article.

---

## grid-list

The grid list displays a set of items. Whereas the [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) and the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) display the items in rows, the grid list displays the items as rectangular boxes on a grid. This makes it ideal for displaying visual content, such as [images](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/), [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/), or [object cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/cards/#object-card).

*Grid list*

## When to Use

### Use the grid list if:

- You want to display a set of homogeneous items.
- The rectangular format of the items is better suited to your content than [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) or [lists](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/).
- The focus is on complete items, not cells.
- Your items mimic the format of existing objects (such as business cards).
- Users need to sort, group, or filter the items.

### Don’t use the grid list if:

- Your content isn’t suitable for a card-like format. If you need to display a lot of detail or if your content is very text-heavy, use a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) instead.
- You expect to show more than 1.000 items. For better performance, use the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) or [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) instead.
- You need an overview of a large amount of data. In this case, consider using a [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/).
- You only need the grid-style layout. In this case, use a layout container, such as the [flexible grid](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-grid/).

## Components

*Grid list components*
1. [Title bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#1-title-bar) or toolbar
2. [Filter infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#2-filter-infobar-optional) (optional)
3. [Items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#3-items)
4. [*More* button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#more-button-optional) (optional)
5. [Footer](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#footer-optional) (optional)
### 1. Title Bar

Default (col-1)

The title bar contains the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) of the grid list and an item counter.
Instead of a a title bar, you can use a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). The toolbar can have the following elements:
- [Title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) and an [item counter](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#title) or [a selection and item counter](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#title)
- [Variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/)
- [Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement), such as *Add* or *Edit*.
- A [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#segmented-button) for switching views
- A button to open a [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/)
*Title bar*
*Toolbar instead of title bar*

> **Guideline:** - Use a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) if you need a counter, [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) actions, or [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/). To avoid repeating text, you can also use a generic title text, such as *Items*.
- Don’t show the title bar at all if all these elements are already available nearby ([title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/), counter, [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/), [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/)).
Example: An [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) section contains only one grid list. In this case, add the item count and the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) to the section header.
- For the item count, apply the following:
- Use the format: [Title] ([count])
Example: *Items (234)*
- Include all the items that a user can reach by scrolling, except group headers.
- Remove the item count if no items are displayed.
- For the selection and item count, apply the following:
- Use the format: [Title] (S*elected: [count of selected items] of [item count]*)
Example: *Items (Selected: 22 of 234)*
- Include all the items that a user can reach by scrolling, except group headers.
- Remove the selection and item count if no items are selected.
- If you are using a *More* button, don’t show a count on the title bar. Show the count below the *More* button instead.
- Keep the title bar sticky (`sap.f.GridList`, property: `sticky`).

> **Hint:** Assistive technologies (such as screen readers) use the title to create a hierarchical site map for faster navigation. In addition,
screen readers use the title as the label for the table.
If you don’t use a title (for example, to avoid repetition), make sure that the table is connected to another meaningful on-screen text
that can be used as a label for assistive technologies. You can do this using the method `addAriaLabelledBy`.

Section Metadata

style

### 2. Filter Infobar (Optional)

Default (col-1)

The filter [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/) shows information on the filter settings.
*Filter infobar*

> **Guideline:** Display the filter infobar when the grid list is filtered.

Section Metadata

style

### 3. Items

Default (col-1)

A grid list item can contain any content. This can include single controls or a combination of controls (for example, using layout containers).
A grid list can contain different item types. For example:
- Sales orders and purchase orders
- Items in display mode and single items in edit mode
You can [highlight items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#highlighting-items) and show an [item state](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#item-states) (such as “unread” or “locked”).
*Example of a grid list item*

> **Guideline:** - Ensure that items can be identified. For example, add a title and subtitle.
- If the item has an ID and a description, use the title for the description and the subtitle for the ID.
- Avoid truncation. Use wrapping instead.
- Since no specific item templates are available, we recommend following the guidelines for [object cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/cards/#object-card).

Section Metadata

style

*Another example of a grid list item*
#### Highlighting Items

Default (col-1)

To show that an item needs attention, you can display a highlight indicator to the left of the item.
(`sap.m.ListItemBase`, property: `highlight`)
*Highlighted item*

> **Guideline:** - Use highlighting to indicate:
- A  value state, such as red for an error or orange for a warning. In this case, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Additional information, such as blue to highlight newly added items. In this case, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Industry- / process-specific states, such as “Out of Stock” or “Excess of Inventory”. In this case, use [indication colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#indication-colors).
- Provide information within the item to explain why it is highlighted, ideally in the same color. The highlight is just a visual cue. It doesn’t tell users *why* the item has been highlighted.
- For more details on the usage of highlight colors, see [How To Use Semantic Colors / Industry-Specific Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

Section Metadata

style

#### Item States

Show the different item states as follows:

**State** | **How to Display**
Unread    | Shows most content in bold.
`sap.f.GridList `property: `showUnread`
```
sap.f.GridListItem
```
property: `unread`
*Unread item next to a read item*
> **Guideline:** - Show only one state at a time.
- For detailed guidelines on the different states, see the [item state guidelines for the responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#item-states).

[Modified](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow) | Add the string *(Modified)* near the item identifier.
*A modified item*
Error | Add the string *(Contains errors)* near the item identifier.
```                                                          | *An item with an error*
sap.m.ObjectStatus
```
Property: `state`
Value: `sap.ui.core.ValueState.Error`
Highlight the item accordingly
```
sap.f.GridListItem
```
property: `highlight`
Locked | Add a transparent [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) with the corresponding icon and the text *Locked by [Name]* near the item identifier.
Clicking the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) opens a [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/) of the person. | *A locked item*

[Draft](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) | Add a transparent [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) with the text *Draft* near the item identifier.
Clicking the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) opens a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) showing the timestamp of the last change. | *An item in a draft state*

### “More” Button (Optional)

The [*More* button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#more-button) loads more items. The count below the button indicates the items displayed and the total number of items.
*'More' button*
### Footer (Optional)

You can use the footer to display additional static information relating to the content.
*Grid list footer*

## Behavior and Interaction

This section covers the following topics:

*Grid List:*                                                                                                                                               | *Grid List Items:*                                                                                                                                         | - [Add Items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#add-items)
- [Busy State](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#loading-data)
- [Loading Items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#loading-items)             | - [Selecting Items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#selecting-items)         | - [Context Menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#context-menu)
- [Drag and Drop](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#drag-and-drop)             | - [Clickable Items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#clickable-items)         | - [Empty Grid Lists](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#empty-tables)
- [Keyboard Navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#keyboard-navigation) | - [Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#actions)                         | - [Enabling/Disabling Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions)
- [Errors and Warnings](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#errors-and-warnings) | - [Export to Spreadsheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#export-to-spreadsheet)
- [Grid List in Object Pages](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#tables-in-object-pages)
- [Paste](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#paste)
- [View Settings](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#view-settings-sort-filter-and-group)

### Loading Items

Default (col-1)

You can load the grid list in “growing” mode.
In “growing” mode, only a limited number of items are loaded when the grid list is initially displayed. Additional items are only loaded (and rendered) on request. This request can be triggered either by [scrolling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#scroll) (preferred) or by clicking the [*More* button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#more-button).

> **Guideline:** - To optimize performance, we recommend showing no more than 200 items at once in the grid list.
- For larger datasets (200 to 1,000 items), use the “growing” mechanism to limit the number of displayed items (property: `growing`), and make sure that users can filter the data.
- Ideally, use [scrolling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#scroll) to load more items instead of the *More* button (property: `growingScrollToLoad`).
- Use the [*More* button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#more-button) only if content is shown below the grid list.

> **Warning:** The 200 and 1,000 item limits given here are only recommendations. For a specific app context, the number of
manageable items might be far higher or lower.
The actual limits depend on your concrete scenario, including:
- The number of items in the grid list
- The number of displayed data points inside the items
- The complexity of the data points (for example, simple text vs. complex charts)
- Other elements on the page (for example, multiple pages in a flexible column layout, or several tables/elements
with more complex rendering on one page)
- The browser being used

Section Metadata

style

#### Scroll

Default (col-1)

The height of the grid list is defined by the number of items it contains.
The grid list is scrolled together with the page and doesn’t have its own scroll container. When the user scrolls
through the page, the title bar and filter infobar can stick to the top of the surrounding layout container
(`sap.f.GridList`, property:`sticky`).
*Sticky toolbar*

> **Information:** The “sticky” feature comes with some limitations:
- It isn’t available on all browsers.
- Certain layout containers suppress the sticky behavior, such as the grid layout. The same happens if the grid list
is placed within the object page.

Section Metadata

style

#### “More” Button

Default (col-1)

The *More* button is the default implementation when growing is switched on (property: `growing` = `true`).
*'More' button with loaded/total items*

> **Guideline:** - Only use the *More* button if your page contains content below the grid list.
- Below the *More* text, show the number of items already loaded and (if possible) the total number items.
- Don’t show an item count on the title bar. Use the count on the *More* button instead.

Section Metadata

style

### Drag and Drop
Default (col-1)

The grid list offers the same drag and drop features as the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#drag-and-drop1).
However, because the items in the grid list are rearranged after an item is dropped, it isn’t always clear where the item will finally be placed.

> **Guideline:** When dropping items from outside the grid list, adapt the size of the drop indicator to match the target layout of the item.
```
sap.f.dnd.GridDropInfo
```
Property: `dropIndicatorSize`
In addition, see the corresponding guidelines for the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#drag-and-drop1).

Section Metadata

style

### Keyboard Navigation

The grid list supports the following keyboard navigation options:

- **Arrow keys**: Navigate between items in all directions
- **Page Up** / **Page Down**: Skip several rows
- **Home**: Move the focus to the first item
- **End**: Move the focus to the last item

### Selecting Items

Default (col-1)

A grid list offers the same [selection modes as the responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#select)
(`sap.f.GridList` / `sap.m.ListBase`, property: `mode`).
Exception: A *Select All* checkbox isn’t provided. Users can only select/deselect all items with the keyboard shortcut (**CTRL\+A**).
*An unselected and a selected item in "multi-selection" mode*
*A selected item in "single select master" mode*

> **Guideline:** - For all single selection modes, make sure that one item is initially selected. Otherwise, the user can’t return to the initial state. A selected item can only be deselected by selecting another item.
- For single-selection list-detail scenarios within the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), use the mode “single select master”. Don’t show an additional “navigated” indicator.
- Avoid the mode “single select left”. It removes the option to click somewhere on the item to select it. Use “single select left” only if you really need two different click areas; a small selection area, and the rest of the item for something else.
- Never disable the selection checkbox (multiple selection) or radio button (single selection). If an action can’t be performed on a specific item, inform the user after the corresponding action has been triggered. For more information, see [Enabling/Disabling Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).
- If selecting/deselecting all items is important for your app, add a *Select All* [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) to the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). Change the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) text to *Deselect All* if all items are selected.

Section Metadata

style

### Clickable Items

Default (col-1)

The whole item can be clickable. You can define the action triggered by the click, such as opening a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) (`sap.f.GridListItem`, property: `type`, value: `sap.m.ListType.Active` or s`ap.m.ListType.DetailAndActive`).
Active elements don’t have a visual indicator and therefore can’t be differentiated from non-active elements.
Clicks on interactive controls within the item are handled by the interactive control and don’t trigger the event for the item as a whole.

> **Guideline:** - Don’t use the “Active” list item type for navigation, to switch the item to an edit state, or to delete the item.
- You can combine clickable items with [edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-edit) and [delete](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-delete) actions, but not with [navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-navigation).
- Don’t combine clickable items with single selection. “Active” uses the whole item as a clickable area and therefore can’t be used together with a grid list in “single select master” mode.

Section Metadata

style

### Actions

Default (col-1)

You can offer actions for the entire grid list, [single items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#actions-on-single-items), and [multiple items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#actions-on-multiple-items).

> **Guideline:** If an action is independent of the selection, show it on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) of the grid list. Examples of such actions are *Add* or *Edit* (in the sense of changing all items to edit mode), *Sort*, *Filter*, and *Group*.
To indicate if an action is available, follow the guidelines for [enabling/disabling actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).

Section Metadata

style

Default (col-1)

#### Actions on Single Items
You can offer actions for single items either on the toolbar or within the item.
[Delete](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-delete), [navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-navigation), and [edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-edit) actions for single items are supported by the grid list control (see below).

> **Guideline:** - Offer only one or two actions within the item. In this case, show the action trigger near the content to which it belongs.
- Use a button, unless the action trigger belongs to a link. Hide the action if it doesn’t apply to an item.
- If you offer [delete](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-delete), [navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-navigation), or [edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-edit) actions for single items, always offer them at item level.

Section Metadata

style

##### *Delete:*

Default (col-1)

Use the “Delete” mode of the grid list (`sap.m.ListBase`, property: `mode`, value: `sap.m.ListMode.Delete`).
This places a *Delete* button ( :decline: ) in the top right area of the item.
*'Delete' button*

> **Guideline:** - Don’t use the “Delete” mode if users typically need to delete multiple items.
- The “Delete” mode can’t be used with the “single select” or “multi select” selection modes.

Section Metadata

style

##### *Navigation:*

Default (col-1)

Use the “Navigation” item type (`sap.m.ListItemBase`, property: `type`, value: `sap.m.ListType.Navigation`).
This places a navigation indicator ( :slim-arrow-right: ) in the top right area of the item, and the entire item
becomes clickable.
By contrast, clicking an interactive control within an item doesn’t trigger the navigation event. Instead, the
corresponding control handles the click event.
*Navigation indicator*

> **Guideline:** - Use the navigation action to navigate to a new page containing item details. In rare cases, you can also use the navigation action for the [category navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/category-navigation/) pattern without navigating to another page.
- You can’t use the navigation action together with “[edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-edit)” or in combination with [click events for the entire item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#clickable-items) (“Active”).

Section Metadata

style

##### *Edit*:

Default (col-1)

Use the “Detail” list item type (`sap.f.GridListItem`, property: `type`, value: `sap.m.ListType.Detail`).
This places an *Edit* icon ( :edit: ) in the top right area of the item. Clicking the button triggers the edit event.
Use this event to switch the corresponding item to edit mode.
*Edit button*

> **Guideline:** If an edit mode is needed, change your text controls ([labels](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/), [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/), and [links](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/)) to [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) or other appropriate editable controls as soon as you switch to edit mode, but not before. You can do this by changing the control or, in more complex cases, by exchanging the whole item.
You can’t use the “Edit” list item type together with the “[navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#action-navigation)” list item type or in combination with [click events for the entire item](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/?post_type=subpost\&p=244761\&vc_editable=true\&vc_post_id=244761&_vcnonce=ec0931aff5#clickable-items) (“Active”).

Section Metadata

style

#### Actions on Multiple Items

Default (col-1)

To trigger actions for multiple items:
- Use a multi-selection grid list.
(`sap.f.GridList`, property: `mode`, value: `sap.m.ListMode.MultiSelect`)
- Offer the corresponding actions on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) of the grid list.
- Keep the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) sticky.
(`sap.f.GridList, property: sticky`)

> **Guideline:** - Don’t offer actions for multiple items if you expect the grid list to usually have fewer than 10 items.
- For mass editing scenarios, provide an *Edit* button. When the user clicks this button, open a dialog for editing the corresponding fields for all selected items. For more information, see [Mass Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing).
- In rare cases, you can also offer the corresponding actions in the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/). Do this only for [finalizing actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#workflow) and if the grid list is the only area on the screen to which actions can be applied.

Section Metadata

style

### Errors and Warnings

Default (col-1)

Error handling must be implemented by the app team.
For details on displaying errors, warnings, and other messages, see [Message Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).
*Grid list with errors*

> **Guideline:** If the **grid list** contains items with errors or warnings, show a corresponding [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/) above the grid list:
- On the message strip, provide information about errors or warnings.
- When issues are solved or when new issues appear, update the message strip accordingly.
Use [item states](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/grid-list/#item-states) to indicate errors and warnings for **single items**.

> **Hint:** `sap.m.plugins.DataStateIndicator` displays a message strip above the table, which shows binding-related messages.

Section Metadata

style

## Responsiveness

Default (col-1)

The responsiveness of the grid list results from the underlying grid, which is defined by rows and columns. Columns
can have a minimum and maximum size or a fixed size. Whenever an additional column fits on the screen, it is added.
If a column no longer fits on the screen, it is removed. Items are re-layouted accordingly.
You can also define different configurations for the underlying grid using breakpoints (for example, based on the
device types).
### Predefined Layouts
To define the grid layout and behavior, you can use one of the predefined layouts:
- **Grid box layout**: Adds a variable number of columns, depending on the available screen width. Columns have
either a fixed width or can “breathe” slightly. All rows have the same height and all items are the same size.
- **Responsive column layout**: The number of columns depends on breakpoints (4 columns for size S, 8 for size M, 12
for size ML and L, 16 for size XL, 20 for size XXL and XXXL). The width of the columns grows or shrinks with the
available screen space until the next breakpoint is reached. The row height of the grid is determined by the height
of the highest item in the row. The number of rows and columns taken up by an item can differ.
### Custom Grid
Alternatively, you can define your own grid. This gives you much greater flexibility to influence both the layout and
the (responsive) behavior of the grid.
The underlying grid defines the available space per item. The width can differ according to the width of the screen
(“breathing”) or be fixed. The height can differ according to the content of the item or be fixed.
Items can use one ore more grid cells. Items can also be different sizes (for example, to allow for varying text
lengths/wrapping in different items).

> **Guideline:** When defining a custom grid:
- We recommend letting items “breathe” to make better use of the available screen space.
- Make sure that the item adapts to the resulting width/height. For example:
- Re-layout the item content.
- Hide less important information.
- Re-size content, such as [images](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/) or [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/).
When designing an item,
- Use the grid list item as starting point and make sure that the content adapts responsively to a changing item width / height.
- Don’t use other list items. They aren’t responsive enough.
- Use responsive content. For example, use controls that wrap text and configure them accordingly.

Section Metadata

style

## Examples

*Size S*           | *Size M*
*Size L*

## Properties

### sap.f.GridList

The following additional properties are available for the grid list:

- `inset` adds a margin on all sides of the grid list.
- `headerText` is a simple way to set the title for the grid list. However, this excludes the following:
  - A separate toolbar
  - Variant management
- `headerDesign` affects the appearance of the header if the theme supports it. Leave the default value as it is.
- `footerText` adds a small additional row below the table footer or last item. This row can contain text only. Don’t use this property.
- `width` defines the width of the whole grid list.
- `includeItemInSelection` uses a click on the whole item to select the corresponding item if the grid list is in a selection mode. This competes with other settings like “Navigation” or “Active” and therefore shouldn’t be used in combination with these two settings.
- `enableBusyIndicator` automatically shows a busy indicator while data is loaded. (In contrast to the `busy` property, where the application can control when the grid list is set to busy state)
- `modeAnimationOn` has no effect. Don’t use it.
- `showSeparators` has no effect. Don’t use it..
- `swipeDirection` has no effect. Don’t use it..
- `rememberSelections` should be set to “false” so that selections are reset or “forgotten” when the user applies, for example, a filter or sort to the table. Only change this behavior by setting the flag to “true” for exceptional cases.
- `busy` sets the grid list to a busy state. While in the busy state, the entire grid list can’t be used and items can’t be read due to an overlay.
- `busyIndicatorDelay` defines how long a busy state is shown after the grid list has been set to this state. Use the default value.
- `visible` shows the grid list (`true`) or hides it (`false`).
- `tooltip` provides a tooltip for the whole grid list. Don’t use it.

### sap.f.GridListItem

The following additional properties are available for `sap.m.ColumnListItem`:

- `selected` allows an item to be selected programmatically.
- `counter` shows a number on the right side of an item. This is used to show the number of subitems, for example.
- Don’t use the `busy` property.
- Don’t the `busyIndicatorDelay` property.
- `visible` shows or hides the item.
- `tooltip` adds a tooltip to a whole item. The tooltip is only shown on mouse interaction. It won’t work on tablets or smartphones. Don’t use it.

## Top Tips

- Use the grid list only if the content is suitable for a rectangular format.
- Ensure that items can be identified.
- Keep your grid and your items responsive. Consider allowing cards of different sizes to avoid content truncation.
- In your card design, either mimic existing objects like business cards or follow the guidelines for [object cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/cards/#object-card).

---

## grid-table

A grid table contains a set of data that is structured in rows and columns. It allows users to scroll in both directions and is optimized for handling large numbers of rows and columns.

## Usage

### Use the grid table if:
- The cell level and the spatial relationship between cells are more important than the line item. Examples include spreadsheet analyses and
waterfall charts. Note that a grid table is not fully responsive. It is only available for desktops and tablets, so you will need to take an adaptive
approach by offering an additional UI for smartphones.
- You need a table to display large amounts of complex data. The grid table can handle higher volumes more efficiently than the responsive table.
- - The focus is on working on line items, not on cells. The **responsive table** is optimized for displaying complete items on all devices, such as file browsing and a list of documents you want to act on, like purchase orders and purchase requisitions.
The responsive table can handle around 200 items when data is of average complexity — more items when data is less complex and fewer when data is
more complex. If your scenario exceeds these data limits, use the grid table. Factors that influence the exact limit include:
- You want to have only one implementation for all devices. However, make sure you adapt the responsive table design to offer the best solution for the tasks performed on mobile devices. Sometimes, a solution without a table is more useful and usable.
- - The number of loaded rows in the table
- The number of displayed columns
- The complexity of the cell content (for example, simple text vs. complex charts)
- Other elements on the page (for example, multiple pages in a flexible column layout, or several tables/elements with more complex rendering on
the page)
- The browser used
- Comparing items is a major use case. In this case, a grid table might be more appropriate than a responsive table. In the grid table, each cell
contains only one data point. In contrast, the responsive table is more flexible regarding line items, including the ability to add more data points
per cell and also the pop-in function. Both make comparisons more difficult.
- You’re going to implement inline creation and the sequence in which the items are created is important – the grid table creates new items at the
bottom of the table.
- Your use case is for tasks performed on a desktop or tablet device. The grid table is not [fully responsive](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/#responsiveness).
## Responsiveness

A grid table is not fully responsive, but available for only desktops and tablets, and it supports touch interactions. For mobile use cases, you need to:​

- Create a new Fiori application with reduced complexity, not an exact match of the desktop application.​
- With the new application, address the most important use cases for users in a mobile context. The responsive controls ([responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), [list](https://www.sap.com/design-system/fiori-design-web/ui-elements/list-overview/) or [tree](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree/),) or a relevant control for your use case (for example a [chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/) or the [category navigation](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/category-navigation/) pattern) may suffice.

Or, you could create a fallback by using a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), but a completely different solution, such as showing [charts](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-toolbar/) in a read-only case, might be more appropriate.

## Layout

1. _Select All_ – The _Select All_ checkbox selects or deselects all items.
2. Column header – The column header allows the user to resize and
rearrange columns. It also provides access to a menu with column-specific
commands.
3. Selector cells – The selector cells allow the user to select one or more
items.
4. Items – The collection of items, or rows, occupies the main part of the
grid table.
## Components

A grid table does not consist of other elements. However, it is common to use a [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) above the grid table.

The toolbar can contain entry points for the [view settings dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/view-settings-dialog/) and the [table personalization](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/) **[dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/)** or for the [p13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/), as well as view switches in the form of a [segmented button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/), and [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for _Add_, _Edit_, and other actions.

## Behavior and Interaction

A grid table is quite restricted in terms of its content.

### Table Level

#### Scroll

A grid table allows horizontal and vertical scrolling
(sap.ui.table.Table, property: navigationMode, value:
Scrollbar).
You can add any number of line items to the grid table,
which uses “lazy loading”.
To prevent adverse side effects when scrolling
vertically, all line items must have the same height
(sap.ui.table.Table, property: rowHeight).
The grid table is optimized to allow faster scrolling
within the first 1000 items.
#### Select

##### Selection Mode

Selection for a grid table depends on the chosen selection mode. The following options are available:

**No selection**: Items cannot be selected. (property:
selectionMode = None)

**Single selection**: One item in the grid table can be
selected. A row selector column is shown. (property:
selectionMode = Single)

Default (col-1)

**Multiple selection**: One or more items can be selected. The grid table provides a column with checkboxes on the left-hand side. Clicking
a checkbox toggles the state of the corresponding row from deselected to selected and back. The **Shift** key can be used to select a range.
For multiple selection, you can choose between two variants.
- Multi-toggle mode (property: selectionMode = MultiToggle)
- Multi-selection plug-in (sap.ui.table.plugins.MultiSelectionPlugin)
These variants behave differently when the user selects more items than are currently loaded in the front end.
#### Multi-toggle
In multi-toggle mode, you can offer a _Select All_ checkbox to the left of the column header (property: enableSelectAll). Selecting this
checkbox selects or deselects all items that are currently loaded in the front end (keyboard: **CTRL\+A**). All other items are not
selected/deselected. If the application data is stored in the back end, scrolling down further can reveal additional unselected items. The
same can happen with range selections if not all items in the selected range have been loaded to the front end.
##### Multi-selection plug-in
If you use this plug-in instead of the multi-toggle selection mode, the behavior for range selection and _Select All_ changes:
- By default, a dedicated _Deselect All_ button replaces the _Select All_ checkbox. There is no default UI element for selecting all items.
- You can set a limit for the number of items that can be selected (sap.ui.table.plugins.MultiSelectionPlugin, property: limit). This limit
has the following effect:
- The range that can be selected using the **Shift** key is limited to the specified number of items (default = 200). The table
automatically scrolls back to the last selected item and you can display a corresponding message
(sap.ui.table.plugins.MultiSelectionPlugin, property: enableNotification). Users can select more items by selecting additional ranges (the
specified limit applies each time).
- If the selection limit is set to 0, a _Select All_ checkbox is shown. There is also no limit on the number of items that can be
selected in a range. All selected items are loaded, which can lead to performance issues for large data sets. (Keyboard: **CTRL\+A**)
- If selected items are not already available in the front end, they are loaded automatically by the plug-in and set as selected.

> **Information:** When setting a limit for the number of items that can be selected, keep the following boundaries in mind:
- The performance of your service: How many items can be loaded at once in a reasonable time? Does this also apply if
an end-user shows all available columns?
- The “minimum limit”: Internally, the grid table loads blocks of items as the user scrolls down. Because this block
size (sap.ui.table.Table, property: threshold) is usually also based on the performance of the service, it should be
safe to assume that the minimum selection limit is twice this size. In this case, loading the data would take as long
as scrolling down and loading exactly one more block. Nevertheless, we recommend using larger limits if your service
allows.

Default (col-2)

Section Metadata

style

##### Selection Behavior

An item can be selected in different ways, depending on the configuration of the grid table (sap.ui.table.Table, property: selectionBehavior):

- _Row_: An item is selected by clicking the checkbox or the row. Use this option for multi-selection grid tables if clicking a row or a cell is not used for anything else.
- _RowSelector_: An item is selected only by clicking the checkbox in the selector cell. Use this option if clicking the row (or a cell inside the row) is used for something else, such as navigation.
- _RowOnly_: An item is selected only by clicking the row, and not using checkboxes in the selector cells. Use this for single-selection grid tables if clicking a row or a cell is not used for another purpose, such as navigation.

#### Compact, Cozy, and Condensed

Like all SAP Fiori controls, the grid table is shown in compact mode on a desktop and in cozy mode on tablets.

For a desktop, you can also display even more rows on the same screen height by adding the condensed mode in addition to the compact mode. This renders less white space for each item.

Note that the condensed content density has always to be set in addition to compact. Do not use condensed on its own. Do not mix condensed with cozy. Doing so could lead to unpredictable and / or unwanted results, e.g. cozy sized controls in condensed sized containers, missing paddings, etc.

Note that neither compact mode nor condensed mode can be interacted with via touch. Even on a desktop with a touch screen, users will have difficulty selecting rows or using controls inside the cells when using their fingers.

Furthermore, condensed mode is not available for Internet Explorer 9. If condensed mode is to be used, please provide a fallback.

For more information on cozy and compact modes, see [content density](https://www.sap.com/design-system/fiori-design-web/foundations/visual/cozy-compact).

### Column Header

The column header provides the label for the corresponding column and access to the
column header menu.

Columns are resized as follows:
- **Mouse interaction:** The user drags the separator line between two columns
(sap.ui.table.Column, property: Resizable). Double-clicking the line optimizes the
column according to the length of the currently visible data and the label of the column
header (sap.ui.table.Column, property: Autoresizable).
- **Touch interaction:** The user taps the column header to reveal two buttons – one to
show the column header menu, and one for resizing. The user drags the latter to resize
the column.
- **Keyboard interaction:** The width of the focused column header can be increased via **Shift\+Right** and decreased via **Shift\+Left**.
After resizing a column, the adaptation of the column widths depends on how the column
width is set:
- If column widths are set in pixel-based units (px, em, rem), the corresponding column
is adapted and the columns that follow are moved accordingly. The width of all other
columns is not affected.
If all the columns together take up less width than the table control, an empty space
is added. In case all columns together take up more width than the table control, a
scrollbar appears. (sap.ui.table.Column, property: width)
- If all column widths are set in percentage or “auto”, resizing one column might also
lead to the automatic resizing of some or all other columns. The position of the resized
column might also be affected. This is done to ensure that the whole table width is used
and no white space is added. A scrollbar appears only if all or most of the columns
shrink significantly. To avoid the side effect of undersized columns, a minimum width
can be set per column. Please be aware that this minimum width is only taken into
account if columns are automatically resized. End users are still able to reduce the
column width below the provided minimum. (sap.ui.table.Column, properties: width,
minWidth)
Columns can be rearranged by dragging the column header to another position
(sap.ui.table.Table, property: enableColumnReordering). Keyboard: the focused column
header can be moved by one position in the corresponding direction via **Ctrl\+Left** / **Ctrl\+Right**.
#### Column Header Menu

For each column, a menu can contain the following menu items
(sap.ui.table.ColumnMenu, property: visible):

- _Sort Ascending/Descending_ (sap.ui.table.Column, property: showSortMenuEntries)
- Free text filter (sap.ui.table.Column, property: showFilterMenuEntries)
- _Freeze_ from the first to the last specified column (sap.ui.table.Table,
property: enableColumnFreeze)
For each column, the menu can be replaced by an app-specific menu.
#### Sort

The column header menu can provide two sort options
(sap.ui.table. Column, properties: sortProperty,
showSortMenuEntry):
- _Sort Ascending_
- _Sort Descending_
The user selects one of these options to sort the
corresponding column accordingly (sap.ui.table. Column,
properties: sorted, sortOrder, sortProperty).
#### Filter

The column header menu can provide a search field for entering free text (sap.ui.table.Column, properties: filterProperty,
showFilterMenuEntries).

If the user enters a term in the input field and triggers the search by pressing Enter when the focus is on the filter input field,
the grid table is filtered by the corresponding column and value (sap.ui.table.Table, properties: filtered, filterProperty,
filterValue, filterOperator, sap.ui.table.Column, property: filterType).
Note that the filter may return zero results, in which case, the table might be empty.
General recommendations for filtering:
- If filtering is a main use case, choose the [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) or any other filtering UI over the built-in free text filter.
- Only use the free text filter if filtering is a secondary use case and if the filter bar is too heavy.
#### Freeze Columns

The column header menu can provide the option to freeze columns (sap.ui.table.Table,
property: enableColumnFreeze). Selecting _Freeze_ freezes all columns up to the one in which
the operation was triggered (sap.ui.table. Table, property: fixedColumnCount).
When _Freeze_ is triggered, the menu item changes to _Unfreeze_ for the corresponding column.
### Line Item Level

A line item contains a set of cells and provides options
for selecting the item.

To prevent adverse side effects when scrolling
vertically, all line items must have the same height
(sap.ui.table.Table, property: rowHeight).
#### Drag and Drop

One or several items can be repositioned within a table
or moved to other UI elements using drag and drop
operations (sap.ui.table.Table, aggregation:
dragDropConfig). While being dragged, the items are shown
as ghost elements on the mouse cursor.
Drop targets can be on items, between items, or both
(sap.ui.core.dnd.DropPosition). On a drop target, the
mouse cursor changes to either a “copy”, “link”, “move”,
or “none” cursor. “None” indicates that the dragged item
cannot be dropped in the current position
(sap.ui.core.dnd.DropEffect).
Drag and drop is only available on supporting browsers.
#### Context Menu

You can attach a context menu (sap.m.Menu) to a table. The
context menu gives users an alternative way to modify the focused
elements by giving them access to context-specific functions.
When opened, the context menu gets the row and column context,
except for special columns (such as the selection column) or
special rows. Context menus can be implemented for a specific
table, row, or cell (not recommended for editable cells).
Context menus are opened by right-clicking (desktop), long press
(mobile), the **context menu key**, or **Shift\+F10**.
Be aware that using the context menu overrides the browser
context menu, which can no longer be opened.
If a control inside a table is the “click target”, and the
control also provides a context menu, the control context menu
“wins”.
### Cell Level

A cell provides one data point and can contain one of the following controls:
- [Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-126/ui-elements/button/)
- [Checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/)
- [Combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/)
- [Currency](https://www.sap.com/design-system/fiori-design-web/ui-elements/currency/)
- [Date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/)
- [Icon](https://www.sap.com/design-system/fiori-design-web/foundations/visual/iconography/icons)
- [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)
- [Label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/)
- [Link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link/)
- The following micro charts size XS: [Bullet](https://www.sap.com/design-system/fiori-design-web/ui-elements/bullet-micro-chart/), [comparison](https://www.sap.com/design-system/fiori-design-web/ui-elements/comparison-micro-chart/), [stacked bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/)
- [Multi-combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-combobox/)
- [Multi-input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/)
- [Object status](https://www.sap.com/internal/fiori-design-web/object-status/)
- [Progress indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/)
- [Rating Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/)
- [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/)
- [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)
Use only single-line text to keep the same row height. Truncate it if necessary to prevent adverse side effects with vertical scrolling (sap.m.Text, property: wrapping, value: false). Do not wrap.
We recommend against using other controls to prevent issues with alignment, condensed mode, screen reader support, and keyboard support.
## Guidelines

### Data Density vs. Complexity

The grid table can be used to display large amounts of data. Unfortunately, the grid table has a high data density and therefore conveys an immediate feeling of complexity.

Only show tables with a lot of data as a last resort. Try the following instead:

- Break down the data into manageable chunks and allow the user to navigate or drill down between them.
- Use charts with drilldown functionality until the amount of data is more manageable.

Try to avoid horizontal scrolling in the default delivery.

Try to minimize the number of columns, especially if there is a large number of rows.

### Table Title

Implement the table title by using a [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) control in a [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/).

Use a table title only if the title of the table is not indicated in the surrounding area.

Do not use a table title if it simply repeats text that is already above the table. For example:

- A pricing conditions table is the only control on a tab labeled _Pricing Conditions_.
- A section or subsection on an object page contains only one table.

Use a table title if you need the item count, [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/), or [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/). To avoid repeating text, feel free to use generic text as a table title, such as _Items_.
Exception: If the surrounding area contains the table title, and both the item count and toolbar can be added to the surrounding area, no additional table title is needed.
Example: An object page (sub-)section contains only one table. In this case, add the item count and the table toolbar to the (sub-)section header.

If you use a table title, show either a title for the table, with or without [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/), or an item count in the following format:

_Items (2,534)_.

The item count in the table title includes all the visible items that a user can reach by scrolling.

Remove the item count in the table title if there are zero items.

> **Hint:** Assistive technologies (such as screen readers) use the title to create a hierarchical site map for faster
navigation. In addition, screen readers use the title as the label for the table.
If you don’t use a title (for example, to avoid repetition), make sure that the table is connected to another
meaningful on-screen text that can be used as a label for assistive technologies. You can do this using the method
addAriaLabelledBy.

### Selection

Default (col-1)

#### Single Selection

Default (col-1)

For single-selection list-detail scenarios within the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), do not show an additional “navigated” indicator.

Default (col-1)

#### Multiple Selection

Default (col-1)

- We strongly recommend using the multi-selection plug-in. This ensures that all items selected using _Select All_ or as part of a range are included – even if some items were not initially loaded in the front end. This is not the case if you use the multi-toggle option.
- Do not limit the range selection for the multi-selection plug-in unless you have to.
- If the dataset is small and/or completely available in the front-end, set the limit property to 0 to enable the _Select All_ option and allow users to select any range.
- If you have a large dataset, set a limit on the number of selected items to avoid performance issues. Also bear in mind that some actions won’t be helpful if the
dataset is too big (for example, a delete operation on 2 million database entries).
- If you set a limit, also display the corresponding message when the user selects more items at once than the limit allows (sap.ui.table.plugins.MultiSelectionPlugin,
property: enableNotification).

> **Information:** When setting a limit for the number of items that can be selected, keep the following boundaries in mind:
- The performance of your service: How many items can be loaded at once in a reasonable time? Does this also apply if
an end-user shows all available columns?
- The “minimum limit”: Internally, the grid table loads blocks of items as the user scrolls down. Because this block
size is usually also based on the performance of the service, it should be safe to assume that the minimum selection
limit is twice this size. In this case, loading the data would take as long as scrolling down and loading exactly one
more block. Nevertheless, we recommend using larger limits if your service allows.

Default (col-2)

Section Metadata

style

- In multiple selection mode (multi toggle), do not show
checkboxes in the first data column in the default
delivery to avoid confusion.

- Never disable the selection checkbox. If an action can’t be performed on a specific item, inform the user after the corresponding action has been triggered. For more information, see [Enabling/Disabling Actions](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).
### Loading Data

To indicate that the table is currently loading items, use the [busy state](https://www.sap.com/internal/fiori-design-web/ui-components/busy-state/).
(sap.ui.table.Table, property: busy). Do not show any items or text. As soon as the data is
loaded, remove the busy state and show all items.

### Errors and Warnings

Default (col-1)

To indicate that the table contains items with errors or warnings, show a [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) above the table. On the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/), provide information about errors or warnings. When issues are solved or when new issues appear, update the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) accordingly.
To indicate an error in a single row, see [Item States](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/#item-states) below.
For details on displaying errors, warnings, and other messages, see [Message Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

> **Hint:** The sap.m.plugins.DataStateIndicator displays a message strip above the table, which shows binding-related messages.

Default (col-2)

Section Metadata

style

### Columns – Best Practices

Minimize the number of columns. Avoid the need to scroll horizontally in the default delivery.

The grid table assigns the same width to each column by default. It is recommended that you overwrite this default to provide optimal space for your content (sap.ui.table.Column, property: width).

If you define the column width in pixels or rems, resizing a column affects only the width of this specific column. Reducing the browser window size results in a scrollbar. After resizing a column, a scrollbar appears if the width of the table is not enough to show all columns. If the columns use less space than available, white space appears on the right side of the last column.

If you define the column width as a percentage, resizing one column affects the width of several or all columns. Text becomes truncated when the browser window size is reduced. This is done to make sure that all columns together fill the space of the table. A scrollbar appears only in case the automatic change of the column widths is not enough for showing all columns. To avoid the side effect of undersized columns, a minimum width can be set per column. Please be aware that this minimum width is only taken into account if columns are automatically resized. End users are still able to reduce the column width below the provided minimum.

If you define the column width as “auto”, the behavior is the same as for “percentage”. In contrast to percentage, “auto” distributes the columns equally.

To decide on how to set the column width (pixel / rem / em vs. percent / auto), keep the following in mind:

- For tables with only 2 to 3 columns, use pixel-based units. This ensures that on wide screens the values in the columns are not spread over the whole screen, which improves the readability of line items.
- For tables with many columns, where a horizontal scrollbar is usually needed, use pixel-based units. This avoids unintended side effects when resizing columns.
- For all other tables, use whatever fits your case better.

Be cautious with mixing columns with pixel-based and percentage-based widths. While this can be helpful in some cases, it could also cause even more unexpected side effects when resizing a column. When using percentage-based widths for one or more columns, think of the possibility to not allow end users to resize columns at all.

Optimize the column width for its     | Don't                                                                          | Don't
initial visible content, including
the column header texts. If this is
not possible (for example, if showing
the full texts would result in        | _Don't truncate the initial visible content in the default delivery_           | _Never wrap texts_
extremely wide columns), let the
texts truncate. End users can change
the width of the column to read the
full text, as needed.
Maintain a constant column width and
avoid adjusting it automatically when
the content changes.
Always keep to one line of text. Do
not wrap.
### Column Headers – Best Practices

For each column, provide a label in the column header. In the default delivery, do not truncate the column header texts. Only let the text truncate if showing the full text would make the column too wide. Never wrap the text.

### Content Alignment

For alignment of cell content, follow the guidelines below.

Left-align the following: text, IDs, phone numbers, URLs,
passwords, and email addresses.

Right-align numbers (except IDs).
This ensures comparability of numbers and amounts.

Right-align amounts with currencies to the cell and align
them in terms of their respective decimal points.

This ensures that amounts with different currencies are
shown correctly, whether these currencies have 0, 2, or 3
decimals.
For aligning to the decimal point, use the
sap.ui.uinified.Currency control.
Right-align dates and times.
This ensures comparability for most | _Right-alignment of dates_
formats and locales.
Left-align status information.

Center-align icons.

Left-align micro charts.

### Content Formatting

#### Locale Settings
Be locale-aware: show dates, times, numbers, and so on in
the format corresponding to the user’s locale settings.
#### Key Identifier
Use a bold label or an emphasized link as the key
identifier of an item. In the default delivery, show the
key identifier in the first column.
For strings with IDs, use one of the following options:

- Show the ID in a separate column. Use this format if users need to sort, or if they need to filter by **both the string and the ID**.
- Show the ID in parentheses after the corresponding string. In this case, you must opt for **one** criterion for sorting and filtering, **either the string or the ID**.
This option is then used for all sort and filter actions and can’t be changed later by the user. Use this format only
if users don’t need to sort and filter by both the string and the ID.

#### Truncation
Avoid truncation of typical content in the default
delivery (sap.ui.table.Column, property: width). However,
since the columns are resizable, do not worry too much if
truncation occurs as columns can still be enlarged if
necessary.
To prevent adverse side effects when scrolling
vertically, all line items must also have the same
height. If you need to decide between truncation and
different row heights, choose truncation. Do not wrap.
#### Number of Links
Are there too many links? Use subtle links to avoid a
wall of links. Standard links are also emphasized more if
they are surrounded by subtle links.
#### Missing Value
If there is no value for a cell, leave it blank. Do not
display text as _N/A_.
#### Numbering Items
In terms of numbering items:
- If the item number is more like an ID with regard to
its description, use ID formatting as described above.
- In all other cases, use a separate column for the item
number.
#### Status
For status information, use semantic colors on the foreground elements.
For status information on text, use an [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/).
#### Micro Charts
Use only the following micro charts: [Bullet](https://www.sap.com/design-system/fiori-design-web/ui-elements/bullet-micro-chart/), [comparison](https://www.sap.com/design-system/fiori-design-web/ui-elements/comparison-micro-chart/), [stacked bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/). When using micro charts, use them in size XS.

#### Empty Tables
Avoid empty grid tables. If necessary, provide instructions on how to fill the grid table with data (sap.ui.table.Table, properties: noDataText, showNoData).
Examples:
- If a table is initially empty, provide at least a basic text:

Overwrite this whenever a hint can be provided on how to fill the table with data.
- If a table is used together with a [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) (as in the [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)), and is initially empty, use the following text:
- If a table is used together with a filter bar and the filter does not return results, use the following text:
Adapt the texts above if:
- The standard text is not precise enough for your use case (for example, a search is also offered, or only the search is offered).
- The standard text is misleading (for example, if the data is filled based on a list-detail pattern instead of filter settings).
#### Invalid State
To show an invalid state of the grid table within the [list report floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), show an overlay on the grid table and the corresponding toolbar (sap.ui.table.Table, property: showOverlay). The overlay prevents user interactions.
Use this within the list report floorplan if filter settings have been changed but the grid table is has not yet been updated.
### Item States

To show that an item has been modified, for example, within the [global edit flow](https://www.sap.com/internal/fiori-design-web/edit-page/), add the string _Modified_ in an additional column with the label _Editing Status_.
In the default delivery, add a column directly behind the key identifier.

To show that a modified item contains an error, for example, within the global edit flow, add
the string _Contains errors_ in the _Editing Status_ column and highlight the row accordingly. This string replaces the _Modified_ string.

A row with errors should be highlighted in all use cases – for example when the field is
visible in the row in edit mode.
To show that an item is [locked](https://www.sap.com/internal/fiori-design-web/v1-114/draft-handling/#editing-status), add a transparent-style button with the corresponding icon and the text _Locked by [name]_ in the _Editing Status_ column.

To show that an item is in [draft](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) state, add a transparent-style button with the text _Draft_ in the _Editing Status_ column.

Show only one state at a time.

### Numbers and Units

Show the unit of measurement in one of the following ways:

#### Number and Unit in Same Cell
The number and the unit are in the same cell. Do this if sorting and filtering by the unit of measurement are not needed.
For amounts, use a [currency](https://www.sap.com/design-system/fiori-design-web/ui-elements/currency/) control to display the concatenated string.
#### Number and Unit in Separate Columns
The number and unit are in separate columns. Do this if
sorting and filtering by the unit of measurement are a
common use case.
Note that this column can be hidden or moved
independently of the column containing the corresponding
number. Therefore, be sure to have clear labels for both
columns to communicate the dependency.
Show the unit of measurment on the column header, if the
unit of measurement is the same for all rows. If not,
show the unit of measurement within the row.
### Drag and Drop

If you offer drag and drop for rearranging items within
the table, use drop targets that are between items
(sap.ui.core.dnd.DropPosition.Between). This provides
better feedback on where the item will be inserted. Show
the “move” mouse cursor
(sap.ui.core.dnd.DropEffect.Move).
Do not combine rearranging items and sorting. If you
really need to do so, make sure that there is a dedicated
sort criterion for the user-defined sort order, and only
offer options for rearranging items if this sort order is
set.
Drag and drop is “invisible” on the UI: users can’t see where dragging is available and where it isn’t. In addition, there is no generic keyboard interaction. Drag and drop is also
not available on all browsers. For these reasons, provide it only in addition to existing (and visible) UI elements that fulfill the same purpose. For example, offer ([toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/)) [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for moving or for copying and pasting items. These are keyboard operable and available on all browsers.

### Context Menu

Use the context menu only as a quick way of accessing functions that are already available elsewhere (for example, as buttons in the toolbar). Don’t just offer actions in the context menu itself, as users might not realize that these actions are available at all.

The context menu can be triggered for the table, row, or cell. However, we do not recommend using context menus for cells: because the content of a cell is a different touch target than the cell itself, opening a cell context menu via touch is quite hard, even in cozy mode.

Do not combine context menus with condensed mode: editable controls fill the entire space inside a cell. Because of this, context menus cannot be opened at all with touch or mouse interaction.

### Actions

#### Multiple Items

To trigger actions on multiple items, use a mutliselection grid table (sap.ui.table.Table, property: selectionMode, value: MultiToggle). Offer the corresponding actions in the table toolbar.

Do not offer action triggering on multiple items if the table is generally expected to have fewer than 10 items. In this case, try to use the responsive table instead of the grid table.

#### Single Item

To trigger actions on a single item (sap.ui.table. Table, property: selectionMode, value: Single):

- Show the actions on the table toolbar.
- In **rare cases**, show the actions within the line item. One example would be an _Add to Cart_ button in a shopping application. Since these actions are repeated in every line and thus use a lot of screen real estate, do this only for a maximum of one or two actions. Provide a separate column per action. Use a button, unless the action trigger belongs to a link. Hide the action in rows for which it is not applicable.

To trigger navigation on line item level, choose one of the following options:
- Use a **link for the attribute that identifies the row**. Clicking the link triggers the navigation.
- Add the **RowActions column** and show the navigation indicator ( :slim-arrow-right: ) at the end of the row. The navigation arrow triggers the navigation.
_Special case: Multi-selection in a list-detail scenario_ When a multi-selection table is used in a list-detail scenario, it is not clear which item was last opened (for example, which item is currently shown in the second column of a [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)). In this case, you can display a **“navigated” indicator** to show which item is currently open.
Use the **RowActions** column only for one or both of the following actions:
- Navigate to details page (:navigation-right-arrow: )
- Delete (:decline: )
The RowActions column does not provide a column header text. It is fixed and will not scroll away. Users also cannot personalize this column.
#### Single Cell

To trigger actions on a single cell, create the corresponding click event. Do not use the cell click event if the cell contains interactive controls, such as links.

#### Add Items

For adding items, place an _Add_ or _Create_ text [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) on the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/).

- Use _Create_ if the [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) adds a brand new item that doesn’t yet exist on the database.
- Use _Add_ if the item already exists and is merely added or assigned to the current object.

Show new items as the first item of the table, with a visual highlight at the beginning of the row.

Enable the shortcut **Ctrl+Enter** (and ideally **Enter** in addition) to trigger the _Add_ or _Create_ button.

There are three options for adding an item. In order of priority (most recommended first), these are:

1. **Add the item inline**. Create an empty, editable row as the first item of the table. Show the _Save_ [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) on the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/). This option is recommended for simple scenarios with just a few columns and no option to hide columns.
2. **Open a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/)** for larger tables with up to 8 editable columns. Save the new item at [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) level.
3. **Navigate to a new page**. This behavior should only be used for very complex scenarios that cannot be handled by a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) (for example, tables with more than 8 columns). When the user presses _Save_ in the [footer toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/footer-toolbar/) of the [create page](https://www.sap.com/internal/fiori-design-web/create-page/), navigate back to the table.

Depending on the flow, an item can be in one of three different states:

- **New**: The item was just created inline and is in edit mode (for example, after pressing the _Create_ [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)). It is highlighted with a visual indicator (information state).
- **Recent**: The item was just created and is in read-only mode (for example, if _Create_ leads to a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/), and _Save_ was triggered within the [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/)). In this case, keep the item highlighted and display it as the first item of the table. Ignore current sort and filter criteria to keep the item visible.
- **Added**: The item has been fully added. It follows the sort and filter settings and also loses the visual highlight. This state is used after:
  - Inline creation: After _Save_ was triggered on the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) or at page level.
  - Create with [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/): A table showing one or several items with the state “Recent” gets updated (for example, after sorting or filtering, or when the browser is refreshed).

In the context of [draft handling,](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) new items are not saved at table level, but rather with the entire draft.

For more details, see the guidelines for [managing objects](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) (including subarticles).

### Editable Content

For editable content, only use the following controls, and only one control per cell:
- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)
- [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)
- [Date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/),
- [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/)
- [Combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/)
- [Multi-combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-combobox/)
- [Multi-input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/)
- [Checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/)
- [Rating Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/)
Only these controls are optimized for all viewing modes of the grid table.
If you need edit mode, change your text controls, such as label, text, link, object status, icons, and currencies, to editable controls as soon as you switch to edit
mode, but not before. You can do this by exchanging the controls, for example, from sap.m.Text to sap.m.Input.
For mass editing items:
- Provide multiselection.
- Provide an _Edit_ button.
- If several items are selected, clicking the _Edit_ button opens a dialog in which the user edits the corresponding fields for all selected items.
For more information, see [Mass Editing](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing).
### View Settings

There are several ways to show _Sort_ and/or _Filter_ settings:
- Column header menu: In all cases, show the corresponding settings in the column header menu.
- [View settings dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/view-settings-dialog/): Simple and more flexible with regard to filter settings. No advantage for sorting.
- [Table personalization dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/):
Provides complex options for sorting items by several levels. It also provides a query-builder-like approach for filter
settings. The complexity of the options is also its downside. Use the table personalization dialog for tables with a large
number of items.
- If filtering is a main use case, use the filter bar. In this case, avoid offering additional filter settings on the table. If
you do, the filter settings on the grid table work only on the result set provided by the filter bar.

Always be careful when synchronizing the settings in the dialog with the settings from the column header menu.
Trigger the dialogs in one of the following ways:
- **View settings dialog**: Provide several buttons, one for each of these view settings. Each button opens the view settings
dialog on the corresponding page.
- **P13nDialog**: Provide a settings button, which opens the table personalization dialog containing all pages.
Use only the view settings you really need.
Persist the user settings: When reopening the app, show
the grid table with the same sort and filter settings as
last defined by this user.
#### Sort

Always sort the table in a meaningful way when it first
loads. In most cases, this means sorting by the column
that identifies the row. This is usually the first column
in the default delivery.
To display the current sort state, an icon is shown in
the column header of the most recently sorted column.
This icon indicates the sort direction
(sap.ui.table.Column, properties: sorted, sortOrder,
sortProperty).
For the default sort settings, sort by the column that
identifies the row, which is usually the first column in
default delivery.
The descending sort order         |
must always be the exact          |
reverse of the ascending sort     | _Object status sorted ascending, with neutral status last_           | _Object status sorted descending, with neutral status first_
order. For each column,           |
provide a meaningful sort         |
order. For example:               |
- Sort text alphabetically        |
- Sort numbers by their value     |
- Sort status information by      |
the severity of the status:     |
- Ascending: Sort status        |
information from positive to  |
negative, with neutral last.  |
- Descending: Sort status       |
information from negative to  |
positive, with neutral first. |
- - Ascending with different        |
values per severity level: Sort |
status information from         | _Object status sorted ascending and alphabetically, from positive to negative with neutral last_           | _Object status sorted descending and alphabetically, from negative to positive with neutral first_
positive to negative, with      |
neutral last. Sort different    |
values within a severity level  |
(semantic color)                |
alphabetically.                 |
- Descending with different       |
values per severity level: Sort |
status information from         |
negative to positive, with      |
neutral first. Sort different   |
values within a severity level  |
(semantic color)                |
alphabetically.                 |
#### Filter

To display the current filter state, an icon is shown in
the column header of the filtered column
(sap.ui.table.Column, properties: filtered,
filterProperty, filterValue, filterOperator,
defaultFilterOperator, filterType).
### Personalization

Only offer personalization if you need more columns than those that fit on a tablet screen, which is usually five, to fulfill 80% of your main use cases.

Persist the column layout. When a user reopens the app, show the grid table with the same column layout settings as last defined by this user.

#### Add, Remove, and Rearrange Columns

To add, remove, or rearrange columns, use one of the following:

- The [table personalization dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-personalization-dialog/): It offers some simple settings for column layout. Use this if you have only a few columns to choose from and/or you use the [view settings dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/view-settings-dialog/).
- The [p13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/): Besides various complex view settings, it also provides settings for column layout. Use this if you have a large number of columns to choose from and/or you use this dialog anyway for view settings.

In both cases, trigger the dialog via the settings button in the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/). As short cut, use **Ctrl+comma**.

You can also use drag and drop to rearrange columns (sap.ui.table.Table, property: enableColumnReordering). If you allow rearranging via drag and drop as well as via a dialog, keep both places in sync.

#### Resize Columns

Resizing columns works differently on touch and non-touch devices.

- Non-touch devices: Drag and drop the column separator on the right side of the column. Double-clicking the column separator optimizes the width of the column to the data currently loaded into the front end, which is usually about 100 rows.
- Touch devices: Clicking the column header reveals two buttons: one for opening the column header menu, another one for resizing the column. Drag and drop this second button to resize the column.

#### Freeze Columns
To freeze columns, offer the setting in the column header menu
(sap.ui.table.Table, property: enableColumnFreeze). Selecing _Freeze_
on a column freezes all columns from the first one to the one
where _Freeze_ is selected. On this column, the menu entry changes from _Freeze_ to _Unfreeze_.
#### Highlight Items
To show that an item needs attention, a highlight indicator can be shown in front of the item. The highlight indicator can be used to indicate:
- A semantic state, such as red or orange for an error or warning. In this case, use [semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Additional information, such as blue to highlight newly added items. In this case, use [semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Industry-specific or process-specific states, such as “out of stock” or “excess of inventory”. In this case, use [indication colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#indication-colors).
Be aware that the highlight is just an indication. It does not tell users exactly what is wrong. Make sure that you provide this information within the table row, ideally in the same color.
For details on the use of highlight colors, see [How To Use Semantic Colors / Industry-Specific Colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).
(sap.ui.table.Table, aggregation: rowSettingsTemplate)
### Tables in Object Pages

In the object page, you can use a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#tables-in-object-pages) or grid table and offer navigation to a [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) with the table types mentioned above. In the [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/), we advise using the [analytical](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/) and [tree tables](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/) in tab mode.

For more information on the use of tables within the object page, see the [Tables](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#tables) section of the _Object Page_ article.

### Export to Spreadsheet

On the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/), apps can provide a [menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/#menu-button1) for exporting table data to a spreadsheet. For the export, use the [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) function.

### Paste

The browser paste function can be used to paste data from the clipboard to the table if the focus is on an editable control within the table. The browser paste is triggered with the Ctrl + V keyboard shortcut, the table toolbar action, or actions in either the browser context menu or the table generic context menu.

The pasting of a new row or cell follows the [grid table inline creation](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/#use-the-grid-table-if) paradigm, where new items are created at the bottom of the table. The same happens when the data is pasted and a cell is unselected or focused.

##### Note

Pasting via the browser context menu is unavailable if the table has its own context menu because table context menu takes precedence over the browser context menu.

#### Paste (Overwrite)

Pasting overwrites data present in the table **only** when a cell with data is selected prior to pasting. When a single cell is selected, all the data in the clipboard is pasted into the table, extending from that cell. The paste will overwrite the data contained in those additional cells, too.

##### Note

If a user has selected multiple cells to overwrite, but the focus is placed outside of the selection, pasting will follow the guidelines for [inline creation](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/#use-the-grid-table-if) as above. This can happen, for example, when the user uses the arrow keys on the keyboard to move the focus.

#### Clipboard Selection Behaviour

If the clipboard has larger data set than the range selected for the paste, only the cells contained within the selection are updated.

On the other hand, if the clipboard has a dataset too small to fill all the cells selected for the paste, the pasted data updates only the selected cells for which there is data.

#### Read-Only

The paste action does not update read-only cells, even if there is data in the clipboard corresponding to those cells, but does update surrounding write cells.

##### Example

If the clipboard contains a range of four columns, and that data is pasted into a table, where column 2 is read-only, only the cells in column 1, 3, and 4 are updated.

## Properties

sap.ui.table.Table

The following additional properties are available for the grid table:

- The property: width defines the width of the grid table.
- The property: rowHeight defines the height of each row in the grid table. Since the height required is calculated automatically by the grid table, this property is only needed rarely.
- The property: columnHeaderHeight defines the height of the column headers. Since the height required is calculated automatically by the grid table, this property is only needed rarely.
- The property: columnHeaderVisible can be used to hide the column headers. Always show the column headers.
- The property: showColumnVisibilityMenu provides an additional entry in the column header menu that allows columns to be shown or hidden. In SAP Fiori, columns are shown and hidden via the table personalization dialog or via the table personalization dialog. Do not use this property.
- The property: visibleRowCount defines the height of the grid table. Show as many rows as fit on the screen.
- The property: visibleRowCountMode defines whether the height of the grid table is fixed or automatically calculated based on the space provided by the underlying container. For automatic calculation, make sure that all rows have the same height.
- The property: minAutoRowCount defines the minimum number of rows that must be shown if the property: visibleRowCountMode is set to “auto”. Show at least three to five rows.
- The property: firstVisibleRow defines the first row shown in the visible area of the grid table. The grid table is scrolled accordingly.
- The property: allowColumnReordering is deprecated. Do not use it. Use the property: enableColumnReordering instead.
- The property: editable does not have a visible effect. Do not use it.
- The property: enableCustomFilter changes the filter entry in the column header menu from an edit box to _Filter…_. Selecting this entry throws an event to which apps can react, for example, by opening a dialog. In general, you should choose the built-in filter over your own implementation. Specifically, keep filtering via the column header menu simple, while offering more advanced options via the table personalization dialog.
- The property: enableBusyIndicator has not yet been fully implemented. Do not use it.
- The property: title adds a line of text on top of the grid table. Do not use this. To add a title to the table, use a toolbar.
- The property: footer adds a short text at the bottom of the table.
- The property: Busy sets the grid table to busy state. While in busy state, the whole table cannot be used and items cannot be read due to an overlay.
- The property: Tooltip does not have an effect. Do not use it.
- The property: alternateRowColors displays the rows with alternating background colors (“banded rows”). Do not use it.

sap.ui.table.Column

The following additional properties are available for the column:

- The property: visible defines whether a column is shown or hidden.
- The property: name defines the name shown in the column header menu for showing and hiding columns. In SAP Fiori, columns are shown and hidden via the table personalization dialog or via the table personalization dialog. Do not use this property.
- The property: headerSpan defines whether one column header is used for one or several columns. To prevent adverse side effects, always use one column header for only one single column. Do not use this property.
- The property: Tooltip does not have an effect. Do not use it.

sap.ui.table.Column

The following additional properties are available for the column:

- The property: visible defines whether a column is shown or hidden.
- The property: name defines the name shown in the column header menu for showing and hiding columns. In SAP Fiori, columns are shown and hidden via the table personalization dialog or via the table personalization dialog. Do not use this property.
- The property: headerSpan defines whether one column header is used for one or several columns. To prevent adverse side effects, always use one column header for only one single column. Do not use this property.
- The property: Tooltip does not have an effect. Do not use it.

---

## list-overview

In SAP Fiori, we distinguish between [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) and lists. Both usually contain homogeneous data, but lists generally have rather basic data, whereas the data in tables tends to be more complex. Lists are mostly used in list-detail scenarios using the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), as well as in [popovers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) or [dialogs](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/). For certain use cases, lists can also be used in the [dynamic page layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).

## Usage

### Use the list if:

- You want to display a homogeneous set of basic data.
- You need to sort, group, or filter simple datasets.
- You need to display a single-level hierarchy rather than using a complex [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) to support this simple use case.

### Do not use the list if:

- You want to manage complex datasets that need to be extensively sorted, grouped, filtered, or edited. In this case, use a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/).
- You work with complex hierarchies. In this case, use a [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/).

## Responsiveness

The list is like a layout container. You can change its width, but you must also ensure that the items contained in the list adapt whenever the list is resized.

All list item variants available in SAP Fiori already adapt to the respective screen size.

## List Item Variants

The list contains various list items. These items can be of various types depending on the use case and on the content they have. SAPUI5 already provides the most common list items in SAP Fiori in the form of controls, although custom list items can also be created if necessary.

All the available list item types behave responsively and adapt to changing screen sizes out of the box. Most of them use truncation if size becomes too limited, since they are usually used to navigate to the item details. For custom list items, you can also wrap the texts, if required.

### Object List Item
The object list item is the list item variant used most frequently in SAP Fiori applications. Consisting of a title, key figure, attributes, and a status,
it contains the most important information about an object.
The space available for the attributes and status is limited as it should only show crucial information that allows the user to decide which items should be
dealt with first.
All essential information about an object is usually provided when the user navigates to the item details.
For more information, see [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/).
### Standard List Item
The standard list item is used for less complex entries, such as when the user selects an item in a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/). This list item contains an optional image, a title, description, and a single info text (which can contain semantic information).
For more information, see [standard list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/standard-list-item/).
### Display List Item
The display list item is the simplest form of a list item and is only capable of showing a label and values. It is seldom used.
For more information, see [display list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/display-list-item/).
### Action List Item
The action list item allows various actions to be triggered in a dialog. The action list item is not used in the content area.
For more information, see [action list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/action-list-item/).
### Feed List Item
The feed list item is mainly used in feeds and notes.
For more information, see [feed list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/feedinput/).
### Input List Item
The input list item allows the user to enter data in a list item. It is seldom used in SAP Fiori apps as [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) are usually the preferable method for entering data.
For more information, see [input list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-list-item/).
## Components

The list control comes with the following main properties:

#### Header
The header text contains the title of the list. It is
usually only used when the list is in the content area.
#### Footer
The footer text is the last entry in the list, and as
such, it scrolls away with the content. Therefore, this
property is also seldom used.
#### Lazy Loading
Like the table, the list also allows lazy loading. The
“growing” list property is used for this purpose.
#### Empty List
Avoid empty lists. If necessary, provide instructions on how to fill the list with data (sap.m.List/ sap.m.ListBase, properties: noDataText, showNoData).
Examples:
- If a list is initially empty, provide at least a basic text:

Overwrite this whenever a hint can be provided on how to fill the list with data.
- If a list is used together with a [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) (as in the [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)), and is initially empty, use the following text:
- If a list is used together with a filter bar and the filter does not return results, use the following text:
Adapt the texts above if:
- The standard text is not precise enough for your use case (for example, no search is offered, only the search is offered).
- You are using the live search (no _Go_ button in the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/)). In this case, leave out “run the search”.
- The standard text is misleading (for example, if the data is filled based on a list-detail pattern instead of search and filter settings).
#### Count
List items can have a count, which is located on the far
right of a row. You can use the count in simple lists,
such as those that contain standard list items, to
indicate how many subitems the user can expect when
navigating to the item.
#### Read/Unread
You can set an indicator to highlight **unread items**,
making it easier for the user to discover them (property:
showUnread = true). If you set this indicator, all texts
for the unread items are shown in bold font.
By default, this indicator is switched off, and all list
items are displayed in normal font.
#### Highlight Items
To show that an item needs attention, a highlight indicator can be shown in front of the item. The highlight indicator can be used to indicate:                                                                                                                             | _Highlighted items using status colors_           | _Highlighted items using indication colors_
- A semantic state, such as red or orange for an error or warning. In this case, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Additional information, such as blue to highlight newly added items. In this case, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Industry-specific or process-specific states, such as “out of stock” or “excess of inventory”. In this case, use [indication colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#indication-colors).
Be aware that the highlight is just an indication. It does not tell users exactly what is wrong. Make sure that you provide this information within the table row, ideally
in the same color.
For details on the use of highlight colors, see [How To Use Semantic Colors / Industry-Specific Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).
(sap.m.ListItemBase, property: highlight)
## Behavior and Interaction

There are several ways to interact with the list and its list items:

### List Level

Default (col-1)

#### Scroll
The height of the list is defined by the number of items it contains. It does not have its own scroll container, but is
scrolled together with the app.
If the list works in a “growing” mode, it only loads a few items at first. Additional items are only loaded (and
rendered) on request. The “request” can either be triggered by scrolling (preferred), or by clicking the _More_ button.

Default (col-1)

When the user scrolls, the title and the filter infobar can stick to the top of the surrounding layout container
(sap.m.List, property: sticky).

> **Information:** The “sticky” feature comes with some limitations:
- It is not available on all browsers. In non-supporting browsers, the corresponding areas are not fixed on top of the surrounding layout container while scrolling.
- Certain layout containers suppress the sticky behavior, such as the [grid layout](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/grid-layout/). The same happens if the list is placed within the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/).
- If the focus is set to a sticky area, the list is automatically scrolled to top.

Default (col-2)

Section Metadata

style

Default (col-1)

#### Mode
The list can have several modes. The respective property (_Mode_) allows the following selection methods:
- None
- SingleSelectMaster (used to pick one item with no additional indicator, as in the list-detail scenario with the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/))
- SingleSelectLeft (used to pick one item using a radio button on the far left)
- MultiSelect (used to pick several items from the list using checkboxes on the far left). The **Shift** key can be used to select a range.
- Users can (de)select all items using **CTRL\+A**. _Select All_ (de)selects all items that the user can reach by scrolling.
- Delete (used to delete items from the list using a delete indicator on the far right)

> **Guideline:** - Never disable the selection checkbox. If an action can’t be performed on a specific item, inform the user after the corresponding action has been triggered. For more information, see [Enabling/Disabling Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).
- For single-selection list-detail scenarios within the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), use the mode “single select master”. Do not show an additional “navigated” indicator.
- Avoid the mode “single select left”. It removes the option to click somewhere on the item to select it. Use this mode only if you really need two different click areas; a small one for a selection, and the rest of the item for something else.
- For all single selection modes, make sure that one item is initially selected. Otherwise, the user cannot return to the initial state. A selected item can only be deselected by selecting another item.
- If selecting / deselecting all items is important for your app, add a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) with the text _Select All_ to the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). Change the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) text to _Deselect All_ if all items are selected.

> **Hint:** In multiple selection mode, users can (de)select all items using the shortcut **Ctrl\+A**. This only affects items that have already been loaded to the front-end server. All other items are **not**
(de)selected before they are loaded (for example, items added via lazy loading with growingScrollToLoad). This conflicts with the guideline that all items the user can reach by scrolling must be
(de)selected.
To process all items, listen to the selectionChange event and to its flag selectAll. This indicates whether **Ctrl\+A** was triggered. As soon as an action is triggered, process the items accordingly. Depending on the number of items, consider processing them in the back end.

Default (col-2)

Section Metadata

style

#### Grouping
List items can be grouped. The group header is a visually
separate line at the top of the items it groups. It does
not currently provide an interaction of its own.
### Line Item Level

#### Type
The list item type defines the interaction of the list
item, which is accompanied by a visual cue.
The items can be one of the following:
- Active (click event; cursor changes to indicate that)
- Inactive (no click event; cursor does not change)
- Navigation (a small arrow appears on the far right,
indicating that clicking would navigate)
- Detail (a pencil appears on the far right, indicating
that something can be changed. The user can only click
the pencil.)
- Detail and active (same as “detail”, but the item
itself is also clickable)
The example shows how all these types are visualized.
#### Indicate Navigated Item
When multi-selection is used in a list-detail scenario, it is not clear which item was last opened (for example, which item is currently shown in the second column of a [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)). In this case only (multi-selection list with navigable items), you can display a **“navigated” indicator** to mark the item that is currently open (sap.m.ListItemBase, property: navigated).

#### Swipe
You can provide a swipe feature (sap.m.List, properties:
swipeDirection, swipeContent) for approving or deleting
items quickly without having to look at the details.
Swiping is possible in both directions (left to right /
right to left). You can provide different actions for
each direction. Because swiping is only available on
touch devices, only offer it as an additional feature.
Swiping should never be the only way to perform the
action.
#### Context Menu
The context menu can be triggered for the list or per item.
It gives users an alternative way of modifying the focused
elements by giving access to context-specific functions.
Context menus are opened by right-clicking (desktop), long press
(mobile), the **CONTEXT MENU KEY**, or **Shift\+F10**.
Be aware that using the context menu overrides the browser
context menu, which can no longer be opened.
#### Drag and Drop
One or several items can be repositioned within a list or
moved to other UI elements using drag and drop operations
(sap.m.ListBase, aggregation: dragDropConfig). While
being dragged, the items are shown as ghost elements on
the mouse cursor.
Drop targets can be on items, between items, or both
(sap.ui.core.dnd.DropPosition). On a drop target, the
mouse cursor changes to either a “copy”, “link”, “move”,
or “none” cursor. “None” indicates that the dragged item
cannot be dropped in the current position
(sap.ui.core.dnd.DropEffect).
Drag and drop is only available on supporting browsers.
## Styles

The list items can have a header when they are used in a content area. It is also technically possible to change the background of the header and of the list itself. Depending on the use case, the lines between the list items and around the list can be shown or hidden.

The property _Show Separators_ (All, Inner, None) allows
only the outer lines (Inner) or all the lines (None) to
be hidden when the list is used as a more structural
element within a content area.
## Guidelines

### Text Length

When you use the list in the first column of the flexible column layout, keep the texts as short as possible and only as long as necessary. If you expect large numbers, use formatting instead.

### Design for Performance

To optimize performance, we recommend showing no more than 200 items at once in the list. For larger datasets (up to 1,000 items), use the “growing” mechanism to limit the number of displayed items, and make sure that users can filter the data.

> **Warning:** The limits above are only recommendations. For a specific app context, the number of manageable items might be far
higher or lower.
The actual limits depend on your concrete scenario, including:
- The number of rows in the table
- The number of displayed columns
- The complexity of the cell content (for example, simple text vs. complex charts)
- Other elements on the page (for example, multiple pages in a flexible column layout, or several tables/elements
with more complex rendering on one page)
- The browser being used

### Custom List Items

If none of the list items provided suits the requirements of your app, you can also create a custom list. If you choose this option, ensure that your custom list item is responsive when resized.

When creating custom list items, take the following guidelines into account, as needed:

- [Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement)
- [Flag and Favorite](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/flag-and-favorite/)
- [Formatting](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-data-overview)
- [UI Element States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states)

### Radio Button

Only use radio buttons if they are absolutely necessary. One example would be if you want to distinguish single selection from navigation. This is a rare case in which visible radio buttons for single selection are allowed.

Default (col-1)

### Errors and Warnings
To indicate that the list contains items with errors or warnings, show a [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/) above the list. On the [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/), provide information about errors or warnings. When issues are solved or when new issues appear, update the [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/) accordingly.
For details on displaying errors, warnings, and other messages, see [Message Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

> **Hint:** The sap.m.plugins.DataStateIndicator displays a message strip above the table, which shows binding-related messages.

Default (col-2)

Section Metadata

style

### Actions

To trigger actions on single items, show the actions on a toolbar above the list. Do not offer actions on multiple items if the list is expected to have fewer than 10 items in most cases.

The following actions on single items must always be inline:

- **Delete**: Use “Delete” mode (sap.m.Tree / sap.m.ListBase, property: mode, value: sap.m.ListMode.Delete). This places a _Delete_ :sys-cancel: button at the end of each item.
- **Navigation**: Use the “Navigation” item type (sap.m.StandardTreeItem / sap.m.ListItemBase, property: type, value: sap.m.ListType.Navigation). This places a navigation indicator at the end of the corresponding items. Use this to navigate to a new page containing item details.
- **Edit**: Use the “Detail” item type (sap.m.TreeItem / sap.m.ListItemBase, property: type, value: sap.m.ListType.Detail). This places an _Edit_ :edit: icon at the end of the corresponding items.

You can combine delete and edit actions, or delete and navigation actions. However, edit and navigation actions cannot be combined.

To trigger actions that are independent of the selection, show the actions on a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) above the list. For example: _Add_, _Collapse All_, 
To trigger a default action on the entire item, use the “Active” or “DetailAndActive” item type (sap.m.TreeItem / sap.m.ListItemBase, property: type, value: sap.m.ListType.Active). When clicked, active items trigger an event that can be handled by the app (for example, to open a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)). Selection of items and expanding/collapsing a node do not trigger the event, and are handled by the tree. Do not use the active item type for navigation, to switch the line item to an edit state, or to delete the item.

Active can be combined with edit and delete, but not with navigation. Do not combine active with the single selection master.

#### Add Items

For adding items, place an _Add_ or _Create_ text [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).

- Use _Create_ if the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) adds a brand new item that doesn’t yet exist on the database.
- Use _Add_ if the item already exists and is merely added or assigned to the current object.

Show new items as the first item of the list, with a visual highlight at the beginning of the row.

Enable the shortcut **Ctrl+Enter** (and ideally **Enter** in addition) to trigger the _Add_ or _Create_ button.

There are three options for adding an item. In order of priority, these are:

- **Add the item inline**. Create an empty, editable item as the first item of the list. Show the _Save_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) of the list. This option is recommended for simple scenarios where just a few [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) have to be filled.
- **Open a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)** for items with up to 8 [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/). Save the new item at [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) level.
- **Navigate to a new page**. Only use this behavior for very complex scenarios that cannot be handled by a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) (for example, creating complex objects). When the user presses _Save_ in the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) of the [create page](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/create-page/), navigate back to the list.

Depending on the flow, an item can be in one of three different states:

- **New**: The item was just created inline and is in edit mode (for example, after pressing the _Create_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/)). It is highlighted with a visual indicator (information state).
- **Recent**: The item was just created and is in read-only mode (for example, if _Create_ leads to a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/), and _Save_ was triggered within the [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)). In this case, keep the item highlighted and display it as the first item of the list. Ignore current sort, filter and grouping criteria to keep the item visible.
- **Added**: The item has been fully added. It follows the sort, filter, and grouping settings and also loses the visual highlight. This state is used after:
  - Inline creation: After _Save_ was triggered on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) or at page level
  - Create with [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/): A list showing one or several items with the state “Recent” gets updated (for example, after sorting, filtering, or grouping, or when the browser is refreshed).

In the context of [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) new items are not saved on list level, but rather with the entire draft.

### Context Menu

Use the context menu only to give users a quick way of accessing functions that are already available elsewhere (for example, as buttons in the toolbar).

Don’t just offer actions in the context menu itself, as users might not realize that these actions are available at all.

Default (col-1)

### Drag and Drop

> **Warning:** To comply with the [WCAG 2.2](https://www.w3.org/TR/WCAG22/) accessibility standard, the control must offer an alternative to the drag and drop feature. Use the :slim-arrow-up: _Move Up_ and :slim-arrow-down: _Move Down_ [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).

Default (col-1)

Drag and drop is “invisible” on the UI: users can’t see where dragging is available and where it isn’t. In addition
there is no generic keyboard interaction. Drag and drop is also not available on all browsers. For these reasons,
provide it only in addition to existing (and visible) UI elements that fulfill the same purpose, provide the
corresponding keyboard support, and are available for all browsers.

Default (col-2)

Section Metadata

style

If you offer drag and drop for rearranging items within
the list, use drop targets that are between items
(sap.ui.core.dnd.DropPosition.Between). This provides
better feedback on where the item will be inserted. Show
the “move” mouse cursor
(sap.ui.core.dnd.DropEffect.Move).
Do not combine rearranging items and sorting. If you
really need to do so, make sure that there is a dedicated
sort criterion for the user-defined sort order, and only
offer options for rearranging items if this sort order is
set.
When combining rearranging items with grouping, be aware
that moving items to another group also means that a
value of the dropped item changes: because grouping is
based on values, the dropped item needs to take on the
corresponding value of the target group. If this is not
wanted, do not allow users to rearrange items in grouped
lists.
Example:
A list is grouped by availability. An item is moved from
the group “Not Available” to the group “In Stock”. In
this case, the moved item needs to change its
availability to “In Stock” to match the target group. If
changing the value doesn’t make sense, only allow users
to rearrange the items within the same group, or don’t
allow rearranging at all.
### View Settings

- Provide individual [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for each of the following settings on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) of the list: sort, filter, group.
- Clicking one of these buttons opens the [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/) or [P13nDialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) dialog with just the relevant page inside.
- When closed, apply the settings to the list accordingly.

Keep the following in mind:

- Do not offer any of these features if the list is expected to have only a small number of entries (up to 20 in most cases).
- If filtering is a main use case, do not offer filtering on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) of the list. Use the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) instead.
- Only use the view settings which are really needed. For example, do not offer grouping if it does not support your use case well.
- Keep the view settings consistent. When a user reopens the app, show the list with the same sort, filter, and group settings as last defined by this user.

#### Sort

- For the default sort setting, sort by the item title, which is usually the identifier of an item.
- If you offer sorting, offer it for each data point available in the item. Allow sorting in both directions, ascending and descending. The descending sort order must always be the exact reverse of the ascending sort order.
- For each data point, provide a meaningful sort order. For example:
  - Sort text alphabetically
  - Sort numbers by their value
  - Sort status information by the severity of the status:
    - Ascending: Sort status information from positive to negative, with neutral last.
    - Descending: Sort status information from negative to positive, with neutral first.
    - Ascending with different values per severity level: Sort status information from positive to negative, with neutral last. Sort different values within a severity level (semantic color) alphabetically.
    - Descending with different values per severity level: Sort status information from negative to positive, with neutral first. Sort different values within a severity level (semantic color) alphabetically.

#### Filter

- To display the current filter state, use the infobar below the title. Clicking the infobar opens the filter page of the corresponding dialog.
- Show the infobar only if the filter settings are not shown somewhere else. For example, do not show the infobar for settings located in the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) or in a [select control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) placed in the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) of the list.
- If the infobar is shown, provide an option to reset all corresponding filters on the infobar.
- Keep the infobar sticky (sap.m.List, property: `sticky`).

### Export to Spreadsheet

Apps can provide a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1) for exporting list data to a spreadsheet (for example, on the relevant [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/)). For the export, use the [export to spreadsheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) function.

---

## list-web-component

You can use the list component to display different types of list item. Each list item can include an image, text, icon, or other HTML content. List items can also be grouped.

The list component comes with built-in selection and deletion modes, as well as configurable separators.

<https://www.sap.com/design-system/live-examples/List/List_LE_Intro.html>

## When to Use

Do
Use the list:
- To display a homogeneous set of basic data.
- To display a single-level hierarchy.
- If a table would be too complex.
## Anatomy

### List

1. **Header**: The first item of the list serves as a
header. The header contains the title of the list.
2. **Footer**: If the footer element is used, the footer is
the last item in the list.
3. **Separator**: The list item separators are customizable.
### Standard List Item

The _standard list item_ is the simplest type of list item. It provides elements for the
most common use cases, such as image, text, and icon.

1. **Image**
2. **Text**
3. **Icon / additional text**:
a. **Icon**: You can use the `iconEnd` property to place an icon at the end of an item.
b. **Additional text**: You can use the `additionalText` property to display an additional text at the end of a row. The `additionalTextState` property applies a semantic state to this text.
### Custom List Item

You can use the _custom list item_ component within the
list in the same way as a standard list item. The custom
list item component accepts arbitrary HTML content to
allow full customization.
### Group Header List Item

The _group header list_ item is a special list item, used
only to separate other list items into logical groups.

## Types

The following list variants are available to support different use cases:

##### List Structure                                                                                                                                                      | ##### Processing Modes                                                                                                                                                    | ##### List Status
[Standard list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#standard-list)                     | [Single selection mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#single-selection-mode)     | [Busy](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#busy-list)
[Growing list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#growing-list-scroll)                | [Multiple selection mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#multiple-selection-mode) | [No data](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#list-with-no-data)
[List with image content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#list-with-image-content) | [Delete mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#delete-mode)
[List item separators](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#list-item-separators)
[List with group headers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#list-with-group-headers)
### Standard List

Use this variant as a starting point.

### Growing List (Scroll)

Use this variant if there are too many list items to show
in the visible space. You can display a _More_ button or
let the user scroll within the list to show more items.
By default, growing is switched off.
### List with Image Content

You can use the `imageContent` slot to add an image or avatar to the item. | <https://www.sap.com/design-system/live-examples/List/List_SE_Variant_Image_Content.html>

### List Item Separators

By default, horizontal separators are displayed between
all list items. Alternatively, you can remove all
separators, only show separators between items (inner
separators).
### List with Group Headers

Use this variant if you want to group items in the list.

### Single Selection Mode

Allows users to select only one item at a time.

### Multiple Selection Mode

Allows users select more than one item at once using the
checkboxes on the left.

### Delete Mode

Use this variant to show an icon for deleting or removing
an item.

### Busy List

Use this variant to indicate that the list is fetching
data.

### List with No Data

Use this variant to show a text when the list is empty.

## Behavior and Interaction

See the examples for the following variants:

- [Standard list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#standard-list)
- [Single selection mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#single-selection-mode)
- [Multiple selection mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/list-web-component/#multiple-selection-mode)

## Responsive Behavior

### Wrapping and Truncation

By default, texts in a list item are truncated if there isn’t enough space.

<https://www.sap.com/design-system/live-examples/List/List_SE_Long%20Texts_Truncation.html>

<https://www.sap.com/design-system/live-examples/List/List_SE_Long%20Texts_Truncation.html>

---

## notification-center

> **Information, Internal_Only:** The notification experience is part of the [UX Consistency Product Standard UXC-024 – Notifications](https://wiki.one.int.sap/wiki/display/uxc/UXC-024).

## Intro

Notifications serve as real-time alerts, providing users with information about significant events, updates, or changes in business processes, workflows, or data. Their purpose is to ensure users remain informed and can take timely action or make decisions without disrupting their ongoing tasks. Users can decide how they respond to a notification; engaging with it is completely at their discretion.

Notifications are temporary and one-way, initiated by an event. They offer users the flexibility to ignore, read, act on, or dismiss them. Once sent, the notification content remains unchanged and may become outdated.

Users can access notifications by clicking the bell icon :bell: in the top right corner of the screen.

Open notifications panel

**> **Hint, Internal_Only:** **

The notification experience is available as a ready-to-run plugin (front end and backend) that can be integrated into products. For more information, see the [Technology Guidelines Business Notifications TG47](https://github.tools.sap/CentralEngineering/TechnologyGuidelines/blob/tg47/draft/tg47/README.md).

## When to Use

Notifications should be well-instrumented to provide value to users. Using notifications effectively involves timing them to provide value without being intrusive. An excessive number of notifications can frustrate users, diminishing their effectiveness. Notifications should be brief and concise, conveying specific information or prompting an action.

In a nutshell, a notification should be:

- Clear on its purpose (e.g., update, reminder, or alert)
- Concise and to the point
- Relevant and useful for the user
- Well-timed
- Personalized, where possible
- Action-oriented, with a clear call to action
- Transparent on importance (ensure that you use the importance indicator consistently across your product)
- Well-paced (avoid overwhelming users with too many messages in a short time span)

### Notification Scenarios

Here are some scenarios where using notifications can be beneficial:

- **Reminders**:
  For upcoming events, appointments, deadlines, payments, or tasks that require the user's attention or action.
- **Alerts**:
  For urgent information, such as business critical alerts.
- **Updates**:
  Significant changes to something the user is interested in, such as status updates or workflow progress.

> **Guideline:** - Always consider the user's perspective and the context in which they're receiving the notification.
- Aim to provide value and relevance without overwhelming or interrupting the user.
- Consider grouping notifications for similar event types. If the number of notifications reaches a certain threshold
and the event is not business-critical, grouping notifications reduces the overall the number of notifications.

> **Information, Internal_Only:** It is important to distinguish notifications from other similar experiences like a message inbox/mailbox, a task center, or a feed.
While these experiences might seem similar initially, they each serve a different purpose, follow different lifecycles, and require distinct features
and interactions to coexist effectively. These experiences may use notifications to inform users of news and updates but will reside within their own
contexts.
Notifications integrate events and updates from various sources in one place. Please also consider the <u>Product Standard for UX Consistency 024</u>.

## Anatomy – Notification Panel

+-------------------------------------------------------------------------------x-------------------------------------------------------------------------------+:-----------------------------------:+
1. **Notification panel title**
2. **Notification panel actions**

- **_Clear All_**: Removes all notifications
- **_Sort_**:
- By date (default)
- By importance
- **Notification settings:** Link to all notification settings
3. **Notification list**: Contains notification group and notification list items (scrolling area).
4. **Notification group item**: Collapsible group that contains notification list items when expanded. The group title is displayed in bold if it contains
one or more notification list item that has not been read.
5. **Notification list item**: See below.
6. **Notification panel**: A [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/) is used as a base for the notification panel.
## Anatomy – Notification List Item

+----------------------------------------------------------------x----------------------------------------------------------------+---------------------------------------+
1. **Avatar**:  You can use an additional avatar to give a notification more context. Only display avatars when they help users
to distinguish notification items.
2. **Status indicator:** You can use this visual indicator to display the following states:
- Positive
- Negative
- Critical
3. **Title**: Initially displays a maximum of 2 lines.
4. **Action**: Unsubscribe and legacy actions.
5. **Delete**: Removes the notification item from the list.
6. **Description**: Initially displays a maximum of 2 lines.
7. **More / Less**: If the title or description exceeds two lines, a _More_ link allows the user to display the truncated text.
8. **Timestamp**
9. **Importance indicator**: Important notifications can be marked with an importance indicator.
10. **Source information**: Indicates the business domain or process that triggered the notification. This can be beneficial
for products with a broader scope.
## Behavior and Interaction

### Scrolling

The notification group titles remain fixed at the top of the scroll container as you scroll. When you reach the next group, the title at the top of the container changes to the title of this group.

Notification panel – scrolling

### Clear All

The _Clear All_ button removes all notifications that are currently in the panel. The user is prompted to confirm the action.

Notification panel – ‘Clear All’ button

### Sorting

The notification panel offers two sort options:

- **By Date** (default):  Newest to oldest
- **By Importance**: Notifications with importance indicators are grouped in an “Important” group. This group is displayed at the top of the panel and sorted by newest to oldest. The remaining notifications are grouped under “Other” below the “Important” group. They are sorted by creation date in descending order.

Notification panel – sorting by date or importance

### Expand / Collapse Notification Group

Users can expand and collapse notification groups using the chevron to the left of the notification group title.

Expanded and collapsed notification groups

### Unread / Read

The title of the notification item is **bold**, indicating that it hasn't been clicked. When the user clicks the notification, the title's font weight changes from **bold** to normal.

Unread and read notification items

### Unsubscribe Action

The overflow button :overflow: allows the user to access the _Unsubscribe_ option for this specific notification type. We do not recommend adding further actions.

'Unsubscribe’ action for a notification item

### Delete

Clicking _Delete_ :decline1: removes the notification item.

### More / Less

The title and description for a notification item are each limited to two lines. Longer texts are truncated. To view the full text, the user can click _More_. Clicking _Less_ shows the truncated text again. 

'More’ and ‘Less’ buttons for a notification item

### Banner Fly-In

Users can set certain notifications to fly in from the right as banners while using the product. These notifications appear for five seconds before sliding away. Users can interact with them if necessary. Clicking the _Dismiss_ button :decline1: removes the notification, but it remains listed in the notification panel.

Banner fly-in

### Bell Interaction

The counter above the bell icon :bell: shows the number of new notifications received since the user last opened the notification panel. Clicking the bell icon resets the counter to zero and the badge is hidden.

Desktop: If the notification count is 1000 or more, the counter shows +999.

Mobile: If the notification count is 100 or more, the counter shows +99.

Bell interaction

## Responsiveness

The notification panel is fully responsive.

---

## object-list-item

The object list item offers a quick overview of an object within a list. Typically, it is used in the list of a list-detail application using the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).
The object list items usually allow the user to navigate to the details of an object. Therefore, the object list item should only contain essential information that is necessary for the
user to identify which object to work on first.

## Responsiveness

The object list item’s text sizes are limited due to truncation. The title wraps once and truncates after two lines. The key attribute also truncates if it does not have enough space. Apps therefore need to use [formatters](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-numbers), for example, to transform _1,659,963,900.42_ into _1.7 B_. (Note that this transformation is language-specific.)

Status texts (on the right) and object attributes (on the left) do not wrap, but only truncate. Status texts can have a semantic color (to reflect the state) and an optional icon. The object attributes are placed next to the status texts. If they do not have a neighboring status text, they use the full width available for the list item.

## Components

The object list item provides the following optional data:
- Title of the object instance, which acts as the main identifier (title)
- Key attribute (number) \+ unit (numberUnit)
- [Object status](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#-object-status) (sap.m.ObjectStatus)
- List of object attributes (sap.m.ObjectAttribute)
- Introductory text indicating the origin of the object, such as _Forwarded by…_ or _On Behalf of…_ (intro)
- Icon that identifies the object (icon)
The first status line can contain indicator icons for locked items, favorites, or items that have been flagged for follow-up.
## Behavior and Interaction

List item behavior and interaction is similar for all list item variants and is therefore described in the [list overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) article.

## Guidelines

- An icon in front of the title requires a lot of space. Ensure there is sufficient space available if you are planning to use one.
- This control can only throw one event. Therefore, object list items cannot contain an additional link.
- Display the [date](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-dates) within the title in the long format and within the attributes in the medium format.
- Avoid long descriptive texts. They may not be displayed due to truncation.

---

## responsive-table

The responsive table contains a set of line items and is fully responsive. Depending on the scenario, users can also navigate from the line items to further details.

A line item contains several data points sorted into columns. A data point refers to a unit of information, such as a number, a text, a unit of measurement, and so on, which can be used to form the content of a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) or other control. One data point is usually displayed by a control, such as a [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/), [object status](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#-object-status), or [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/). A control can display more than one data point, for example, by concatenating text.

In contrast to traditional tables, a “cell” of the responsive table is not limited to displaying only one control, and therefore a single cell can present far more than one data point.

*Responsive table*

## Usage

### Use the responsive table if:

- You need a table to display a moderate amount of data. When your data is of average complexity, the responsive table can handle up to 200 items. However, more complex data lowers the limit, and less complex data raises it. Note that the limit is not on the number of items in the database or in the filtered results, but the volume of data **loaded at any point**. Factors that influence the exact limit include:
  - The number of loaded rows in the table
  - The number of displayed columns
  - The complexity of the cell content (for example, simple text vs. complex charts)
  - Other elements on the page (for example, multiple pages in a flexible column layout, or several tables/elements with more complex rendering on the page)
  - The browser used
- For loading large amounts of complex data, use a [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) instead, as it can handle higher volumes more efficiently.
- You need to use various controls inside a line item, such as [micro charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/micro-chart/). By contrast, the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) supports only a very limited set of controls.
- The focus is on line items, not on cells. The responsive table is optimized for viewing complete items on all devices.
- Selecting one or more items is a main use case and details are needed to choose the correct item.
- Line items are independent of each other and no operation across columns is needed.
- You want a single implementation for all devices. As its name suggests, the table is responsive and adjusts its appearance to the screen size so you can use it on all devices. However, make sure you adapt the responsive table design to offer the best solution for the tasks performed on mobile devices. Sometimes, a solution without a table is more useful and usable.

### Do not use the responsive table if:

- The main use case is to select one item from a very small number of items, without viewing additional details. In this case, a [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) or [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) might be more appropriate.
- The main use case is to select one item from several items, with the possibility of viewing only a few details per item. In this case, a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) might be more appropriate. Pay attention to the layout of the [list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/#list-item-variants) to ensure that it has a pleasant appearance.
- The cell level and the spatial relationship between cells is more important than the line item. In this case, use the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) or [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/). Examples include spreadsheet analyses and waterfall charts. Note that neither the analytical table nor the grid table are fully responsive. Both are only available for desktops and tablets, so you will need to take an adaptive approach by offering an additional UI for smartphones.
- You expect users to work with large amounts of complex data. Use the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) or [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) instead; they are optimized for those cases.
  Note that the analytical table and the grid table are not fully responsive, but available only for desktops and tablets, so you will need to take an [adaptive approach](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness#adaptive-approach) by offering an additional UI for smartphones.
- Comparing items is a major use case. In this case, the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) or [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) might be more appropriate because each cell contains only one data point. In contrast, the responsive table offers greater flexibility within line items, including the ability to add more data points per cell and the pop-in function. Both make comparisons more difficult. Note that neither the analytical table nor the grid table are fully responsive. Both are only available for desktops and tablets, so you will need to take an adaptive approach by offering an additional UI for smartphones.
- Data needs to be structured in a hierarchical manner. In this case, a [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) might be more appropriate. Although the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) can have several grouping levels, it is not as flexible when nodes at several levels contain child nodes. Note that the analytical table isn’t fully responsive and is only available for desktops and tablets, so you will need to take an adaptive approach by offering an additional UI for smartphones.
- You need an overview of a large amount of data. In this case, use a [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/).
- You just need it for layout reasons. In this case, use a layout container such as a horizontal layout or a vertical layout instead.
- You need read-only or editable field-value pairs. In this case, use a [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) instead. The responsive table is not optimized for form-like input navigation.

Don't
*Don't use a responsive table as a form*
See the [table overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) to decide which SAP Fiori table is most suitable for your needs.

## Responsiveness

The responsive table is optimized for viewing one line item at a time with no scrolling or only vertical scrolling, irrespective of the display width.

On smartphones, only the most important data remains in the one-column or two-column table, while all other data is moved to the space between two item rows, known as the “pop-in area”.

In this area, data for the corresponding cell is provided as a label/value pair. The label is defined by the column header, and the value is taken from the corresponding cell. Labels can be displayed next to the value or above the value.

Within the pop-in area, the label/value pairs can be displayed in the following ways (sap.m.Table, property: PopinLayout):

- Block: Label/value pairs are listed one below the other.
- GridSmall: Label/value pairs are displayed next to each other in equally spaced grid cells. An additional column is shown for each 13 rem of available width (208 px with default browser settings). If the number of grid cells exceeds the available width, the grid cells wrap. On S size, this layout transforms automatically to a block layout.
- GridLarge: The display logic is the same as for GridSmall,, but grid columns come with a larger minimum width (26 rem instead of 13 rem).

In all layouts, you can show the labels next to or above (recommended) the corresponding data.

The responsive table uses all the available space, and does not provide any padding. If there is space around the table, it comes from the spacing defined for the surrounding layout container.

> **Information:** The GridSmall and GridLarge layouts are not available in all browsers. If the chosen layout is not available, it is
automatically changed to Block layout.

*Responsive table displayed on a smartphone (size S)*

*Responsive table displayed in compact mode on a desktop computer (size L)*

The responsive behavior is optional. If it is not used, the responsive table minimizes all visible columns until they are no longer readable. The priority level assigned to columns also impacts the display of the responsive table. For more information on the priority levels, see: [Smart Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/#show-details-hide-details)

There are two ways to configure responsiveness: auto pop-in mode and manual pop-in mode (sap.m.Table, property: autoPopinMode).

The **auto pop-in mode** ensures responsiveness automatically and is sufficient in most cases. You can still influence the behavior per column, but only to a limited extent.

The **manual mode** is more flexible, but needs are more configuration. This configuration becomes more cumbersome when table columns can be shown/hidden or re-ordered. On the other hand, only the manual mode allows you to:

- Let more than one column stay in the tabular layout
- Move more than one column into the pop-in area at once

In both modes, the responsive table ensures that at least one column always remains in the table layout.

### Auto Pop-In Mode

The auto pop-in mode handles responsiveness automatically. You can optimize this to a certain extent by adapting the behavior per column.

Columns have a minimum width. As soon as the width of all the visible columns exceeds the table width, the right-most column moves to the pop-in area. The default minimum width per column is 8 rem. You can change this value for each column (sap.m.Column, property: autoPopinWidth).

To further influence the behavior, you can assign columns a priority. Low-priority columns move to the pop-in area first (right-most low priority column first), medium-priority columns next, and high-priority columns last. The default priority is “none”, which is handled like the “medium” priority (sap.m.Column, property: importance).Instead of moving columns to the pop-in area, you can also hide columns of one or more priority levels (property: hiddenInPopin).

In auto pop-in mode, all other pop-in-related column settings are ignored.

### Manual Pop-In Mode

The manual pop-in mode allows more flexibility but also requires more effort if you want it to work in a meaningful way. You also need to invest additional effort if table columns can be shown/hidden or re-ordered.

You need to configure each column manually. Depending on the width of the table (in pixels), the column needs to know which of the following responses is required:

- Stay in the table layout (in auto pop-in mode, only one column stays in the table layout).
- Move to the pop-in area (sap.m.Column, with the properties: demandPopin, minScreenWidth, popinHAlign, popinDisplay).
- Hide

By default, the table width is assumed to be the screen width. If the table does not use the full width of the screen, app developers must configure the table accordingly (sap.m.Table, property: contextualWidth).

Because you configure the pop-in response for each column individually, you can also handle more than one column at a given breakpoint. This allows you to move several columns to the pop-in area at once, which isn’t possible in auto pop-in mode

Each of the three device types has a predefined value for the screen width. However, you will get better results if you offer more breakpoints by using pixel values instead of the predefined values.

For the smallest screen width, keep the following information in the table layout:

- The identifier of the line item
- The key attribute

### Example for Block Layout

A typical responsive table.
*A typical responsive table*

Hide the information column for a width smaller than 570
px.
*Hiding the information column*

Move the column “vendor” to the pop-in area for a width
smaller than 460 px (sap.m.Column, properties:
demandPopin, minScreenWidth).

Move the column “limit” to the pop-in area for a width
smaller than 350 px (sap.m.Column, properties:
demandPopin, minScreenWidth).

Move the column “price” to the pop-in area for a width
smaller than 270 px (sap.m.Column, properties:
demandPopin, minScreenWidth).

If you still need to support smaller screens, values can
be moved below the corresponding labels inside the pop-in
area. In these examples, this happens for a width smaller
than 220 px (sap.m.Column, property: popinDisplay).
### Example for GridLarge Layout

A more complex responsive table.
*A more complex responsive table (full screen without pop-in content)*

In this example, the *Average Occupancy Rate* and *Available In*
columns move to the pop-in area if the screen width is less than
1900 pixels.

If the width is less than 1500 pixels, the *Average Stay* column moves to the pop-in area.
*GridLarge layout - 'Average Stay' column moves to the pop-in area*

If the width is less than 1100 pixels, the *Description*
column moves to the pop-in area. Since all four columns
in the pop-in area do not fit into one row, the pop-in
content wraps.
If the width is reduced even further, the *Details*
column moves to the pop-in area. On this narrow screen,
only one column fits into one pop-in row, so it looks
exactly like the block layout.
## Layout
The optional **title bar** consists of the title of the responsive table, an item counter, [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/), and the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).
The **filter infobar** appears when the responsive table is filtered, and shows information on the filter settings.
The **column header** shows the label for each column. In addition, it allows the user to resize the column.
The collection of **items**, or rows, occupies the main part of the responsive table.
You can add aggregation information (such as totals) on the **table footer**.
A ***More* button** can be shown if you do not want all items to be loaded at the start (known as “lazy loading”). Ideally, you should use scrolling to load more items instead of choosing the *More* button.
## Components

The title bar contains the title of the responsive table, an item counter, [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/), and the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).
The toolbar can contain entry points for the view settings dialog and the [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/), as well as view switches in the form of a [segmented button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/), and [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for *Add*, *Edit*, and other actions.
Beneath the toolbar, display a filter infobar (which itself is a special toolbar) if the responsive table is filtered.
To format within items, apply the guidelines for formatting data. Controls commonly used inside items are the object identifier and the object number. For more information about these controls, see [object display components](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/).
You can use the table footer to display additional static information relating to the table content.
The *More* button loads more items to the front end if not all items have yet been loaded.
## Behavior and Interaction

The responsive table is quite flexible with regard to its content.

### Table Level

#### Scroll
The height of the table is defined by the number of items it contains. It does not have a scroll container on its own, but is scrolled together with the app (in contrast to the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) and the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/)).
If the table works in [“growing” mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/responsive-table/#load-items), it only loads a few items at first. Additional items are only loaded (and rendered) on request. The “request” can either be triggered by scrolling (preferred), or by clicking the *More* button.
Default (col-1)

When the user scrolls, the [title bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), column headers, and filter infobar can stick to the top of the surrounding layout container (sap.m.Table, property: sticky).

> **Information:** The “sticky” feature comes with some limitations:
- It is not available on all browsers. In non-supporting browsers, the corresponding areas ([title bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), column headers, filter infobar) are not fixed on top of the surrounding layout container while scrolling.
- Certain layout containers suppress the sticky behavior, such as the [grid layout](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/grid-layout/). The same happens if the table is placed within the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/).
- If focus is set to a fixed column header, the table is automatically scrolled to top.

Default (col-2)

*Sticky table title and sticky column header*

Section Metadata

style

#### Merge Duplicates
To simulate the behavior of row spanning, you can merge cells of consecutive rows inside one or more columns
automatically if they contain the same value (`sap.m.Column`, properties: `mergeDuplicates`, `mergeFunctionName`).
Use the merge feature if you expect the column to contain duplicate entries, and it makes sense to group them. In
the example screenshot, the *Supplier*, *Product*, and *Dimensions* columns reflect a hierarchical structure:
Suppliers have products, which in turn have dimensions. Because suppliers typically have multiple products,
merging duplicate entries for the supplier column makes the table easier to read. Note, however, that when the
user sorts the table by another field, the hierarchy changes and the merged items are regrouped accordingly.
Do not use the merge feature:
- If duplicate entries are not part of the design. If consecutive table rows happen to have the same values at
runtime, this alone isn’t a valid reason to group them.
- If the corresponding column can contain blank cells. Otherwise, it is cumbersome to differentiate between blank
values and merged values.
#### Select
A responsive table can have one of the following selection modes (`sap.m.Table`/ `sap.m.ListBase`, property: `mode`):                                                                                                                                                                                                                                                                       | *Responsive table without selectable items*
- **None**: Items cannot be selected (`sap.m.ListMode.None`).
Note: Line items can still use the `sap.m.ListType` “navigation”, which allows click handling for specific line items. Only use this option if the click triggers navigation to a corresponding details page.
- **Single select master**: One item in the responsive table can be selected. Items are selected by clicking the whole row. The single select master mode has no obvious
visual cues, such as checkboxes or radio buttons. It only provides a light blue background for the selected state. Because of this, it can barely be differentiated from
tables without selection (mode: `None`). Single select master is the preferred mode for single selection (`sap.m.ListMode.SingleSelectMaster`).
- **Single select left**: One item in the responsive table can be selected. For this, the responsive table provides radio buttons on the left side of each line item. This mode is not recommended (`sap.m.ListMode.SingleSelectLeft`).
- **Multi select**: Users can select one or more items using the checkboxes on the left of each line item. The **Shift** key can be used to select a range. Users can (de)select all items using the *Select All* checkbox to the left of the column header (or **CTRL\+A**). *Select All* should (de)select all items that the user can reach by scrolling. (sap.m.ListMode.MultiSelect).
Another multi select variant is to not provide a *Select All* option, but just a *Clear All* check box in the same place (property: `multiSelectMode`, value: `ClearAll`).
Keyboard: If the focus is on a row, the **space bar** selects the corresponding item.
*Multi select with 'Select All' checkbox*
*Multi select with 'Clear All' button*

#### Group
When items are grouped, a group header is displayed. The
group header is not interactive.
#### Show Aggregations
Show aggregations (such as totals) on the table footer (`sap.m.Column`, aggregation: `footer`).                                                                                                                                                                                                                   | *Table footer displays aggregated total*
Don’t show aggregations in [“growing” mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/responsive-table/#load-items). In “growing” mode it isn’t clear which values are being aggregated; only the items currently loaded in the front end, or all items.
Default (col-1)

#### Load Items
When the responsive table fits the general requirements for your use case, always consider ways to reduce the amount of **data loaded** in the responsive table with, for example, filters, graphics, aggregation of information, and navigation. Keep in mind you should use it only to display [moderate amounts of data](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/responsive-table/#use-the-responsive-table-if), including factors like number of items and content complexity.
To show more than 100 items, use the “growing” mode (`sap.m.Table`/ `sap.m.ListBase`, properties: `growing`, `growingThreshold`, `growingScrollToLoad`, `growingTriggerText`). The “growing” mode allows the user to load only the first few items. Additional items are only loaded (and rendered) on request, which improves [performance](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#design-for-performance). You decide whether the user triggers the request by scrolling (preferred) or by clicking the *More* button.
If you use the *More* button, show the number of items already loaded and the total number items below the *More* text, if possible.
Do not show aggregations in “growing” mode. Also, do not display an item count on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) if “growing” mode is used. Use the count on the *More* button instead.

> **Guideline:** If you expect users to work with large amounts of data, use the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) because it is optimized for handling large data sets.
The growing mode will only help to reduce the amount of data loaded at once but the [limits to the overall amount of data](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/responsive-table/#use-the-responsive-table-if) still apply.

Default (col-2)

*Load on scroll*

Section Metadata

style

### Column Header Level

The column header provides the label for the corresponding column. It also handles the functionality for resizing columns.

#### Resizing Columns

Default (col-1)

If you implement column resizing, users can resize the columns as follows:
- **Mouse interaction**: The user drags the separator line between two columns. Double-clicking the line optimizes the column width based on the length of the
currently visible data and the label of the column header.
- **Touch interaction**: As for mouse interaction, but with a larger target touch area.
- **Keyboard interaction**: When the focus is on the column header, **Shift\+Right** increases the width of the focused column. **Shift\+Left** decreases the width.
When a column is resized, the other columns can keep their original width or adapt their width. This depends on the column width settings:
- If column widths are set in pixel-based units (px, em, rem), the resized column is adapted and the columns that follow are moved accordingly. The width of all the
other columns is not affected. If the visible columns don’t use the full width of the table control, empty space is added. If the visible columns exceed the width
of the table control, one or more columns move to the pop-in area.
- If all column widths are set as a percentage or as “auto”, resizing one column might also result in automatic resizing of some or all other columns. The position
of the resized column might also be affected. This ensures that the full table width is used and no white space is added.

> **Hint:** To enable resizable columns, implement the plugin:
`sap.m.plugins.ColumnResizer`.

Default (col-2)

*Resizing a column*

Section Metadata

style

### Line Item Level

#### Delete Single Item Rows
To delete single item rows, use the table in the mode “delete” (sap.m.Table/ sap.m.ListBase,
property: mode, value: sap.m.ListMode.Delete). This adds *Delete* buttons to each line item.
Clicking this button triggers the deletion of the corresponding line item. (Keyboard: If the
focus is on the row itself, the **Delete** key can be used to trigger the *Delete* button.)
Do not use this mode if deleting multiple lines at once is the preferred use case.
Delete is a mode of the responsive table and therefore cannot be used together with single
selection or multiselection.
#### Highlight an Item
To highlight an item, use the “highlight” indicator
(sap.m.ColumnListItem, properties: highlight).
#### Navigate
To allow navigation from a line item, use an item with the type “navigation” (sap.m.ColumnListItem/ sap.m.ListItemBase, property: type, value: sap.m.ListType.Navigation). This creates an indicator at the end of the
line (“>”) and the entire line item becomes clickable (keyboard: if the focus is on the row itself, the **Enter** key triggers navigation). If the user clicks on the line, navigate to a new page containing line item details. In rare cases, you can also use the navigation mode for [category navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/category-navigation/), without navigating to another page.
By contrast, clicking an interactive control within a line item does not trigger the navigation event. Instead, the corresponding control handles the click event.
If no navigation is possible, set sap.m.ListType to “inactive”.
“Navigation” is a list item type and therefore cannot be used together with “edit”, or in combination with click events for the entire item (“active”).
#### Indicate Navigated Item
When multi-selection is used in a list-detail scenario, it is not clear which item was last opened (for example, which item is currently shown in the second column of a [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)). In this case only (multi-selection table with navigable items), you can display a **“navigated” indicator** to mark the item that is currently open (sap.m.ColumnListItem, property: navigated).

#### Edit Line Items

To allow editing for a line item, set sap.m.ListType to
“detail” within the corresponding item
(sap.m.ColumnListItem/ sap.m.ListItemBase, property: type,
value: sap.m.ListType.Detail or
sap.m.ListType.DetailAndActive). This will create an *Edit*
button at the end of the line. Clicking the button triggers
the edit event (keyboard: If the focus is on the row
itself, the **F2** key triggers the *Edit* button). Use
this event to switch the corresponding line item to edit
mode.
Edit is a list item type and therefore cannot be used
together with “navigation” or in combination with click
events for the entire item (“active”).
#### Click an Item

Items as a whole can be clickable. An event is fired by
clicking on the item (anywhere where there is no
interactive control inside the item). Apps can react on
the event, for example, by opening a dialog
(sap.m.ColumnListItem/ sap.m.ListItemBase, property:
type, value: sap.m.ListType.Active or
sap.m.ListType.DetailAndActive).
Active elements do not have a visual indication and can
therefore not be differentiated from non-active elements.
Active is a list item type and can therefore not be used
together with “navigation” or “edit”. In addition,
“active” uses the whole item as a clickable area and
therefore cannot be used together with a single-selection
table.
#### Drag and Drop

One or several items can be repositioned within a table
or moved to other UI elements using drag and drop
operations (sap.m.ListBase, aggregation: dragDropConfig).
While being dragged, the items are shown as ghost
elements on the mouse cursor.
Drop targets can be on items, between items, or both
(sap.ui.core.dnd.DropPosition). On a drop target, the
mouse cursor changes to either a “copy”, “link”, “move”,
or “none” cursor. “None” indicates that the dragged item
cannot be dropped in the current position
(sap.ui.core.dnd.DropEffect).
Drag and drop is only available on supporting browsers.
#### Context Menu

You can attach a context menu (sap.m.Menu) to a table. The
context menu gives users an alternative way to modify the
focused elements by giving them access to context-specific
functions.
When opened, the context menu gets the row and column
context, except for special columns (such as the selection
column). Context menus can be implemented for a specific
table or row.
Context menus are opened by right-clicking (desktop), long
press (mobile), the context menu key, or **Shift\+F10**.
Be aware that using the context menu overrides the browser
context menu, which can no longer be opened.
If a control inside a table is the “click target”, and the
control also provides a context menu, the control context
menu “wins”.
### Cell Level

#### Showing Information

In contrast to traditional tables (such as the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) or the [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/)), a cell can contain more than just one line of text.
*Several lines of text within one cell*

#### Add Controls

Alongside textual elements, you can also add any control to a table cell, such as input fields, microcharts, buttons, and so on.

*Controls inside cells*

A cell can contain more than one control and more than
one data point.
*Several controls per cell*
With the *View Settings* dialog, users can sort, filter,
and group by each of these data points.
You can also have different controls in different rows in
the same column. This could be the case if one item is
locked, but another item is in edit mode, for example.

## Guidelines

### Responsiveness

In most cases, the auto pop-in mode is sufficient. If you need to optimize further, first try to adapt the columns to influence the automatic behavior (sap.m.Column, properties: autoPopinWidth, importance). For example, set the priority for the two or three most important columns to “High” (identifying column, key attribute).

While the pop-in layouts GridLarge and GridSmall make better use of the available width, they also only look good with content that is specifically designed for these pop-in layouts. If you have text-only tables with only one value per column, use the Block layout (sap.m.Table, property: popinLayout).

Place the column header labels in the pop-in area above the corresponding values (sap.m.Column, property: popinDisplay, value: Block). This avoids alignment issues with different content. Be aware that the labels get top-aligned with the adjacent content.
Only place the label next to the corresponding value under the following conditions (sap.m.Column, property: popinDisplay, value: Inline):

- The values are text-only (no input fields, icons, images, micro charts, and so on)
- The available space is at least the double the width of size S.

This avoids truncation or “over-wrapping” of the labels and content.

If a column does not have a column header text (for example, if it always contains the same button with its own label), do not show the header text as a label in the pop-in area either (sap.m.Column, property: popinDisplay, value: withoutHeader). If you forget this setting, you will see an empty space followed by a colon (“:”).

> **Information:** The GridSmall and GridLarge layouts are not available in all browsers. If the chosen layout is not available, it is
automatically changed to Block layout.

### Table Title

Implement the table title by using a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) control in a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).

Use a table title only if the title of the table is not already shown nearby. Do not use a table title if it simply repeats text that is already above the table. For example:

- A pricing conditions table is the only control on a tab labeled *Pricing Conditions*.
- A section or subsection on an object page contains only one table.

Use a table title if you need the item count, [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), or [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/). To avoid repeating text, feel free to use generic text as a table title, such as *Items*.
Exception: If the surrounding area contains the table title, and both the item count and toolbar can be added to the surrounding area, no additional table title is needed.
Example: An object page (sub-)section contains only one table. In this case, add the item count and the table toolbar to the (sub-)section header.

> **Hint:** Assistive technologies (such as screen readers) use the title to create a hierarchical site map for faster
navigation. In addition, screen readers use the title as the label for the table.
If you don’t use a title (for example, to avoid repetition), make sure that the table is connected to another
meaningful on-screen text that can be used as a label for assistive technologies. You can do this using the method
addAriaLabelledBy.

If you use a table title, show either a title for the table, with or without [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/), or an item count in the following format:*Items (2,534)*
The item count in the table title includes all the visible items that a user can reach by scrolling. Group headers are not included.
Remove the item count in the table title if there are zero items. Do not use an item count together with “growing” mode.
If possible, keep the title bar sticky (sap.m.Table, property: sticky).
When selection is enabled for the table, show the selection and item count next to the table title, in the following format: *Items: (Selected: 10 of 2,534).*
### Selection

For single selection cases, use the selection mode “single select master”. This is the recommended single-selection mode for list-detail scenarios within the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-96/page-types/page-layouts/flexible-column-layout/). If you use it there, do not show a “navigated” indicator.
In rare cases, you can also use the click area for the row for another purpose (for example, to open dialogs). As a result, the click area cannot be used for selecting the row. In these cases
only, use the “single select left” selection mode to offer a radio button as an additional click area for each row. To avoid confusion, make sure that the first data column does not contain radio
buttons in the default delivery.
For all single selection modes, make sure that one item is initially selected. Otherwise, the user cannot return to the initial state. A selected item can only be deselected by selecting another
item.
In multiple selection mode:
*Multiple selection - Don't show checkboxes in the first column in the default delivery*
- Prefer *Select All* over *Clear All*
- Use *Clear All* only for tables with a large number of items (more than recommended above), where loading all items to select them would harm performance.
- To avoid confusion, don’t show checkboxes in the first data column in the default delivery.
- Make sure that the *Select All* checkbox (de)selects all items the user can reach by scrolling. This is only possible if all items are rendered.
- Never disable the selection checkbox. If an action can’t be performed on a specific item, inform the user after the corresponding action has been triggered. For more information, see [Enabling/Disabling Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-96/ui-elements/responsive-table/#enablingdisabling-actions).
*Use the selection mode "single select left" if clicking the row is used for something else (such as
navigation)*
Do
*Use the selection mode "single select master" in all other single selection cases*

> **Hint:** *Select All* is only applied to items that have already been loaded to the front-end server. All other items are not
(de)selected before they are loaded, such as items added via lazy loading with growingScrollToLoad. This conflicts with the
guideline that all items the user can reach by scrolling must be (de)selected.
To process all items, listen to the selectionChange event and to its selectAll flag. This indicates whether the *Select All*
checkbox was triggered. As soon as an action is triggered, process the items accordingly. Depending on the number of items,
consider processing them in the back end.

#### Selection Reset

When selection is enabled, make sure that selected items
are reset or “forgotten” each time the user refreshes the
table, for example, after applying a filter or sort.
(property: remember`Selections`, value: False).
Only for exceptional cases should you change this
behavior by setting the flag to “true”.
### Loading Data

To indicate that the table is currently loading items, use the [busy state](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/busy-state/).
(sap.m.Table, property: busy). Do not show any items or text. As soon as the data is loaded, remove the busy state and show
all items.

### Errors and Warnings

Default (col-1)

To indicate that the table contains items with errors or warnings, show a [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/) above the table. On the [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/), provide information on errors or warnings. When issues are solved or when new issues appear, update the [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/) accordingly.
To indicate an error in a single row, see [Item States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#item-states) below.
For details on displaying errors, warnings, and other messages, see [Message Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

> **Hint:** The sap.m.plugins.DataStateIndicator displays a message strip above the table, which shows binding-related messages.

Default (col-2)

*Table containing errors*

Section Metadata

style

### Columns – Best Practices

Minimize the number of columns:
- On a smartphone, use only one or two columns, depending on the content.
- On a tablet or desktop, use three to five columns if the responsive table is shown within the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/). Use about eight columns if using the [full screen](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/full-screen/) width, depending on the content.
If the responsive table does not fit into the width provided:
*Do not distribute just a few columns across the full width*
- Hide columns to reduce the width of the table.
- Use pop-in areas to show the whole content by increasing the height of the line items (sap.m.Column, properties: demandPopin, minScreenWidth).
At the smallest size, keep the following information in the table layout:
- The column that identifies the line item.
- The column that contains the key attribute.
*Use a fixed column width instead*
If both of these do not fit into the width provided, keep just the column with the line item identifier in the tabular layout.
The responsive table assigns the same width to each column by default. In doing so, it uses all the available space. We recommend overwriting this default to provide optimal space for your content (sap.m.Column, property: width).
Especially for tables with just a few columns, we recommend assigning a fixed width to each column and to disabling automatic distribution of the remaining available space (property: fixedLayout, value: Strict). In this case, the rest of the table is filled with empty space.
Optimize the column width for its initial content (sap.m.Column, property: width). If the content is dynamic, optimize the column width for typical content.
When defining the column width, consider the implications when a column is resized:
- If you define the column width in pixels or rem, resizing a column only affects the width of that particular column.
- If the table isn’t wide enough to show all the columns after a column has been resized, one or more of follow-on columns move into the pop-in area.
- If the columns don’t use up the available space, white space appears to the right of the last column (property: fixedLayout, value: strict).
- If only one column remains, and the width of this column exceeds the width of the table itself, the width of the column is reduced to the width of the table.
- If you define the column width as a percentage, resizing one column affects the width of several or all columns. Text wraps more when the browser window size is reduced. This ensures that all columns together make use of the full table width.
- If you define the column width as “auto”, the behavior is the same as for “percentage”. However, unlike “percentage”, “auto” distributes the columns equally.
- Be cautious of mixing columns with pixel-based and percentage-based widths. While this can be helpful in some cases, it could also cause even more unexpected side effects when columns are resized. If you are using percentage-based widths for one or more columns, consider not allowing end users to resize columns at all.
If you need more columns than those that fit on a tablet screen (usually five) to fulfill 80% of your main use cases, offer an option to add, remove, and rearrange columns via the [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/). Before doing so, try to reduce the number of columns, for example, by using several lines per column or by utilizing the pop-in function. See the [cheat sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/responsive-table-content-formatting-cheat-sheet/) for an example.
### Column Headers – Best Practices

Within the column header, provide a label for each column (sap.m.Column, aggregation: header). The column header label is reused as a label in the pop-in area.

**Exception:** If the column does not pop in, no column header label is needed as long as at least one column still has a column header label.

To keep the column headers readable, wrap or truncate the texts as follows:

- If columns are **not resizable**, use controls that **wrap** and support wrapping with hyphenation, such as [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) (with wrapping and hyphenation enabled). Do not use controls that truncate.
- If columns are **resizable**, use controls that **truncate**.

Keep column headers sticky.

Do
*Wrap column headers if columns are not resizable*

Column headers (sap.m.Column, aggregation: header) usually contain [links](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) or text-based controls.

Column headers can also contain other kinds of SAP Fiori controls. However, the column header cannot be aligned vertically, making it difficult to use many controls in the column header. Using other kinds of controls also creates problems with pop-in behavior and could thus lead to accessibility issues. Therefore, exercise caution when using them in a column header.

*Accepted: Link as column header text (rarely used)*

If a column cell contains several fields, use an umbrella term in the column header (such as *Address* for fields like *Street*, *ZIP Code*, and *City*).

For text and ID fields, use a generic label (for example, *Employee* for *Name* and *ID*).

If none of these are possible, separate the labels with “/” (for example, *Name / Status*).

For boolean values, such as checkboxes, find a descriptive text for the column header.

### Horizontal Content Alignment

For alignment of cell content, follow the guidelines below (sap.m.Column, properties: halgin, valign, sap.m.ColumnListItem, property: VAlign). Align the column header horizontally according to the content of the cell.

**Exception:** Secondary information in a column always follows the alignment of the main information.

#### Left-Align

Left-align: Text, IDs, phone numbers, URLs, passwords,
and email addresses.
*Left-align text*

Left-align: [Status information](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#-object-status)
*Left-align status information*

#### Right-Align

Right-align: Dates and times (to ensure comparability for
most formats and locales)
*Right-align dates*

Right-align: Numbers and amounts, except IDs, to ensure
figures are comparable
*Right-align numbers*

#### Center-Align

Center-align: [Icons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/), [images,](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/) and [avatars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/)
Keep the column name for center-aligned columns as short as possible to avoid excessive white space between columns. Alternatively, you can leave the column header empty on the visual UI, and use the [invisible text control](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/invisible-text-2/) to provide information on the column content for screen reader listeners.
Align buttons with the content hierarchically
Always place buttons directly next to their content. Do
not add an additional column for buttons. If you have
more than one button, display them next to each other.
Order the buttons based on importance. The most important
button is on the left, the least important on the right.
If there is not enough space to display them all in one
line, move the buttons from the right onto the next line
one by one. Do not use more than two buttons per line
item.
### Vertical Content Alignment

Top-align where possible to facilitate reading the content on one line.

Do not use top-alignment if it results in a peculiar layout. This usually happens when controls that need more vertical space are combined with text-only controls, such as input fields. In this case, try center-alignment instead and fine tune it until the layout fits.

Do
*Use top-alignment where possible*

### Content Formatting

The responsive table provides flexibility, including multi-line cells, by enabling every control to be put into a cell.

As a key identifier of an item, use an **object identifier**. Show the key identifier in the first column. For more information, see [object display components](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/).
If the table width is small, do not hide this column or move it to the pop-in area.

Strings with IDs: If the responsive table contains more
single-line data, show the ID in brackets after the
corresponding string.
This minimizes the line height.
*If displayed as a link, use the whole text as the link*

Strings with IDs: If line height is already large, show the ID below the corresponding string. Use the [object identifier](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/) to do so.
*For items with a large line height, place the ID below the corresponding string*
*Is displayed as a link, use only the first line as the link*

If there is more than one key identifier (for example, *First Name* and *Last Name*), display these columns first and show the values in bold text.
*Several key identifiers*

For status information, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-status/) on the foreground elements.
For status information on text: If the status is actionable, add a transparent icon button next to the text.

Avoid truncation. Use controls that wrap the text and support hyphenation.

For example, use [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/).

Do
*Wrap text*

For editable content, use [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)
and other interactive controls within the table cells. If you need to offer edit mode, change your text controls (labels, text, and links, to
input fields or other appropriate controls) as soon as you switch to edit mode, but not before.
You can do this by changing the control or, in more complex cases, by exchanging the whole responsive table.
If there is no value for a cell, leave it blank. Do not
display text as *N/A*.
*Leave empty fields blank*

#### Numbering Items
- If the item number has four digits/letters or less and is
equally important as the corresponding description,
concatenate the item number with the description and show
it in one column.
- If the item number has five digits/letters or more, or if
it is more important than the corresponding description,
for example, when no description is available, use a
separate column for the item number.
- If the item number is more like an ID in regards to its
description, use ID formatting, like *Description (ID)*.
#### Flag and Favorite
Place the [flag or favorite](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/flag-and-favorite/) marker in the first column (in the default delivery). To change the settings, users need to drill down into the object itself.

#### Empty Tables
Try not to display an empty responsive table. If there is no way around this, provide instructions on how to fill the table with data (sap.m.Table/ sap.m.ListBase, properties: showNoData, noDataText).
Examples:
- If a table is initially empty, provide at least a basic text:
*No items available.*
Overwrite this whenever a hint can be provided on how to fill the table with data.
- If a table is used together with a [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) (as in the [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)), and is initially empty, use the following text:
*To start, set the relevant filters.*
- If a table is used together with a filter bar and the filter does not return results, use the following text:
*No data found. Try adjusting the filter settings.*
Adapt the texts above if:
- The standard text is not precise enough for your use case (for example, a search is also offered, or only the search is offered).
- The standard text is misleading (for example, if the data is filled based on a list-detail pattern instead of filter settings).
Remove the item count in the table title if there are zero items.
#### **Displaying Boolean Values**
If a column contains Boolean values, such as “Yes” or
“No”, show a read-only checkbox next to the texts.
The supplementary checkbox makes it easier for users to
see at a glance which items are “true” (checked) and
which are “false” (unchecked).
Developer Hint
Use sap.m.checkbox with the Horizon theme and set the
editable property to “false” to get the read-only
variant. Add the checkbox next to the existing text
value. The text itself should remain unchanged.
### Item States

To show that an item is unread, use the corresponding
flag (sap.m.Table, property: showUnread,
sap.m.ColumnListItem/ sap.m.ListItemBase, property:
unread). This shows most of the content in bold font.
To show that an item has been modified, for example,
within the global edit flow, add the string *(Modified)*
at the bottom of the column that identifies the line
item.
To show that a modified item contains an error (for example, within the [global edit flow](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow)), add the string *(Contains errors)* at the bottom of the column that identifies the line item. To do this, use an object status control with the error state (sap.m.ObjectStatus, property: state, value: sap.ui.core.ValueState.Error).
In addition, highlight the row accordingly (sap.m.ListItemBase, property: highlight). A row with errors should be highlighted in all use cases – for example when the field is visible in the row in edit mode.

To show that an item is [locked](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/locking/), use a transparent button with the corresponding icon and the text *Locked by [Name]* at the bottom of the identifying column. The user can click the button to open a [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/) of the person.
*A locked item*

To show that an item is in a [draft](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) state, use a transparent-style button with the text *Draft* at the bottom of the identifying column. The user can click the button to open a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) showing the timestamp of the last change.
*Item in draft state*

Show only one state at any one time.

#### Highlight Items
To show that an item needs attention, you can show a highlight indicator next to the item. The highlight indicator can indicate:
- A  value state, such as red or orange for an error or warning. In this case, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Additional information, such as blue to highlight newly added items. In this case, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Industry-specific or process-specific states, such as “out of stock” or “excess of inventory”. In this case, use [indication colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#indication-colors).
Be aware that the highlight is just an indication. It doesn’t tell users exactly what is wrong. Make sure that you provide this information within the table row, ideally in the same color.
For details on the use of highlight colors, see [How To Use Semantic Colors / Industry-Specific Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).
(sap.m.ListItemBase, property: highlight)
### Numbers and Units

If the following conditions all apply, show the unit of measurement in the column header:

- The unit of measurement is the same for all rows
- A single cell contains only one amount with the unit of measurement
- The column header does not scroll away

In all other cases, show the unit of measurement together with the corresponding amount within the row.

Show the unit of measurement in the same column as the corresponding amount.

For numbers with units, show the correct formatting by
using the object number control.
*Object number*

For the most important number with its unit, show the
correct formatting by using the object number control and
the emphasized flag.
**Exception:** If all numbers are of equal importance,
emphasize none of them.
If the table width is narrow, do not hide this column or
move it to the pop-in area.
**Exception:** If the column containing the object
identifier and the column containing the key attribute do
not fit together on the screen, move the column
containing the key attribute to the pop-in area.
### Drag and Drop

Drag and drop is “invisible” on the UI: users can’t see where dragging is available and where it isn’t. In addition there is no generic keyboard interaction. Drag and drop is also not available on all browsers. For these reasons,
provide it only in addition to existing (and visible) UI elements that fulfill the same purpose and provide the corresponding keyboard support. For example, offer ([toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/)) [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for moving or for copying and pasting items. These are keyboard operable and available on all browsers.
*Use drag and drop only in addition to existing visible UI elements*
Currently, there is no keyboard support for drag and drop.
If you offer drag and drop for rearranging items within
the table, use drop targets that are between items
(sap.ui.core.dnd.DropPosition.Between). This provides
better feedback on where the item will be inserted. Show
the “move” mouse cursor
(sap.ui.core.dnd.DropEffect.Move).
Do not combine rearranging items and sorting. If you
really need to do so, make sure that there is a dedicated
sort criterion for the user-defined sort order, and only
offer options for rearranging items if this sort order is
set.
When combining rearranging items with grouping, be aware
that moving items to another group also means that a
value of the dropped item changes: because grouping is
based on values in a column, the dropped item needs to
take on the value of the target group for the
corresponding column. If this is not wanted, do not allow
users to rearrange items in grouped tables.
Example:
A table is grouped by availability. An item is moved from
the group “Not Available” to the group “In Stock”. In
this case, the moved item needs to change its
availability to “In Stock” to match the target group. If
changing the value doesn’t make sense, only allow users
to rearrange the items within the same group, or don’t
allow rearranging at all.
### Context Menu

Use the context menu only to give users a quick way of accessing functions that are already available elsewhere (for example, as buttons in the toolbar).

Don’t just offer actions in the context menu itself, as users might not realize that these actions are available at all.

The context menu can be triggered for the whole table or per row.

### Actions

To trigger actions on **multiple items**, use a multiselection table (sap.m.Table, property: mode, value: sap.m.ListMode.MultiSelect), and offer the corresponding actions on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). Keep the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) sticky (sap.m.Table, property: sticky).

Do not offer actions for multiple items if the table is expected to have fewer than 10 items in most cases.

To trigger actions on a **single item** only (sap.m.Table, property:
mode, value: sap.m.ListMode.SingleSelectMaster):
- Show the actions on the **table toolbar**.
- In **rare cases**, show the actions within the line item. Since these
actions are repeated in every line and thus use a lot of screen real
estate, do this only for a maximum of one or two actions. In this case,
show the action trigger near the content to which it belongs. Do not add
a specific column for actions. Use a button, unless the action trigger
belongs to a link. Hide the action in rows for which it is not
applicable.
- Don’t bundle inline actions that don’t belong together under an
unspecific label, such as *Misc*, *Actions*, *…* , or similar.

The following actions on single items must always be in-line:

Delete: Use “Delete” table mode (sap.m.Table/ sap.m.ListBase, property: mode, value: sap.m.ListMode.Delete). This places a *Delete* [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) at the end of each row.
*Delete button*
Navigation: Use the “Navigation” column list item type (sap.m.ColumnListItem/ sap.m.ListItemBase,
property: type, value: sap.m.ListType.Navigation). This places a *Navigation* indicator at the end of each row.
*Navigation indicator*
Use this to navigate to a new page containing line item details. In rare cases, you can also use this
for navigation within the table without navigating to another page.
Edit: Use the “Detail” column list item type (sap.m.ColumnListItem/ sap.m.ListItemBase,
property: type, value: sap.m.ListType.Detail). This places an *Edit* icon at the end of each row.
*Edit button*

From these three actions (delete, navigation, and edit), you can combine delete and edit, or delete and navigation.

Edit and navigation cannot be combined.

To trigger actions that are independent of the selection, show the actions on the table toolbar. Examples of such actions are add, edit (in the sense of changing the whole table to edit mode), sort, filter, group (or view settings), and table personalization.

To trigger a default action on the whole line item, use the “Active” or “DetailAndActive” column list item type (sap.m.ColumnListItem/ sap.m.ListItemBase, property: type, value: sap.m.ListType.Active).

Active items trigger an event when clicked, which can be handled by apps (for example, to open a dialog). Clicks on interactive controls within the item do not trigger the event, but are handled by the interactive control. Do not use this for navigation, to switch the line item to an edit state, or to delete the item.

Active can be combined with edit and delete, but not with navigation. Do not combine active with single selection.

Table

For information on enabling and disabling actions, see [Enabling/Disabling Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).

#### Add Items

For adding items, place an *Add* or *Create* text [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).

- Use *Create* if the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) adds a brand new item that doesn’t yet exist on the database.
- Use *Add* if the item already exists and is merely added or assigned to the current object.

Show new items as the first item of the table, with a visual highlight at the beginning of the row.

Enable the shortcut **Ctrl+Enter** (and ideally **Enter** in addition) to trigger the *Add* or *Create* button.

There are three options for adding an item. In order of priority (most recommended first), these are:

1. **Add the item inline**. Create an empty, editable row as the first item of the table. Show the *Save* [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). This option is recommended for simple scenarios with just a few columns and no option to hide columns.
2. **Open a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)** for larger tables with up to 8 editable columns. Save the new item at the [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) level.
3. **Navigate to a new page**. This behavior should only be used for very complex scenarios that cannot be handled by a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) (for example, tables with more than 8 columns). When the user presses *Save* in the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) of the [create page](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/create-page/), navigate back to the table.

Depending on the flow, an item can be in one of three different states:

- **New**: The item was just created inline and is in edit mode (for example, after pressing the *Create* [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/)). It is highlighted with a visual indicator (information state).
- **Recent**: The item was just created and is in read-only mode (for example, if *Create* leads to a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/), and *Save* was triggered within the [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)). In this case, keep the item highlighted and display it as the first item of the table. Ignore current sort, filter and grouping criteria to keep the item visible.
- **Added**: The item has been fully added. It follows the sort, filter, and grouping settings and also loses the visual highlight. This state is used after:
  - Inline creation: After *Save* was triggered on the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) or at page level
  - Create with [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/): A table showing one or several items with the state “Recent” gets updated (for example, after sorting, filtering, or grouping, or when the browser is refreshed).

In the context of the [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) new items are not saved on table level, but rather with the entire draft.

For more details, see the guidelines for [managing objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) (including subarticles).

*Add button in table toolbar*           | *New item as first row in edit mode*           | *Saved new item, still highlighted, still the first item*

### Editable Content

For editable content, use input fields and any other interactive controls within the table cells that meet your input needs.

All SAPUI5 controls can be used.

If you need edit mode, change your text controls, such as label, text, and link, to input fields, or other appropriate controls as soon as you switch to edit mode, but not before.

You can do this by exchanging the control or, in more complex cases, by exchanging the entire responsive table.

For mass editing items:

- Provide multiselection (sap.m.Table/ sap.m.ListBase, property: mode, value: sap.m.ListMode.MultiSelect).
- Provide an *Edit* button.
- If several items are selected, choosing the *Edit* button opens a dialog in which the user edits the corresponding fields for all selected items.

For details, see [mass editing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing).

### View Settings: Sort, Filter, Group
Sort, filter, and/or group settings are handled in the [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/). This dialog can provide any combination of these three settings, including just one setting, such as sort only.
- If sorting, filtering, and/or grouping are a common use case in your app, offer one, two, or all three of the corresponding features in one or more view settings dialogs. Note: Do not offer
these features if the table is expected to have only a small number of entries (up to 20 in most cases).
- If filtering is a main use case, do not offer filtering in the view settings dialog. Use the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) instead.
To trigger the view settings dialog, provide several [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/), one for each of these view settings. Each button opens a view settings dialog that contains only the relevant page.
You should always use only the view settings you really need. For example, do not offer grouping if it does not support your use case well.
Using the view settings dialog allows you to define several sort, filter, and/or group settings per column. Therefore, you can sort, filter, and/or group a column with several data points
independently by each data point.
#### Sort                         |
Always sort the table in a        | *Object status sorted ascending, with neutral status last*           | *Object status sorted descending, with neutral status first*
meaningful way when it first      |
loads. In most cases, this        |
means sorting by the column       |
that identifies the row. This     |
is usually the first column       |
in the default delivery. Use      |
the primary data point from       |
this column.                      |
If you offer sorting, offer       |
it for each data point. In        |
other words, allow sorting by     |
both the primary and              |
secondary information in a        |
column. Allow sorting in both     |
directions, ascending and         |
descending. The descending        |
sort order must always be the     |
exact reverse of the              |
ascending sort order.             |
For each data point, provide      |
a meaningful sort order. For      |
example:                          |
- Sort text alphabetically        |
- Sort numbers by their value     |
- Sort status information by      |
the severity of the status:     |
- Ascending: Sort status        |
information from positive to  |
negative, with neutral last.  |
- Descending: Sort status       |
information from negative to  |
positive, with neutral first. |
- - Ascending with different        |
values per severity level: Sort |
status information from         | *Object status sorted ascending and alphabetically, from positive to negative with neutral last*            | *Object status sorted descending and alphabetically, from negative to positive with neutral first*
positive to negative, with      |
neutral last. Sort different    |
values within a severity level  |
(semantic color)                |
alphabetically.                 |
- Descending with different       |
values per severity level: Sort |
status information from         |
negative to positive, with      |
neutral first. Sort different   |
values within a severity level  |
(semantic color)                |
alphabetically.                 |
Default (col-1)

#### Filter
To display the current filter state, use the [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/) below the table title. Clicking the infobar opens the view settings dialog on the filter page.
Show the infobar only if the filter settings are not shown somewhere else. For example, do not show the infobar for settings taken in the filter bar or in a [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) placed in the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).
If the infobar is shown, provide an option to reset all corresponding filters on the infobar.
Keep the infobar sticky (sap.m.Table, property: sticky).

> **Hint:** To display the current filter settings on the infobar, consider using the [list formatter](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-data-overview#commaseparated-lists) (sap.ui.core.format.ListFormat).

Default (col-2)

*Filtered table*

Section Metadata

style

#### Group
To display the current group state, group headers are
shown.
On the group header, show the following text
(sap.m.GroupHeaderListItem, property: title):
*[Label of the grouped column]: [Grouping Value]*
Do not use several values on the group header.
If there is no grouping value, show the following text:
*[Label of the grouped column]: (Not Available)*
*Grouped table, with missing grouping value*
This is the case if you have a group of items that don’t
have a value for the grouped column.
Persist the view settings. When a user reopens the app, show the responsive table with the same sort, filter, and group settings as last defined by this user.

### Personalization: Add, Remove, Rearrange Columns

To enable users to add, remove, or rearrange columns, use the [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/). Trigger the dialog via a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) in the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). Add the shortcut **Ctrl+Comma**.

Offer personalization if you need more columns than those that fit on a tablet screen, which is usually five, to fulfill 80% of your main use cases. Before doing so, try to reduce the number of columns, for example, by using several lines per column or by utilizing the pop-in function. See the [cheat sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/responsive-table-content-formatting-cheat-sheet/) for an example.

If all columns are hidden, the table shows a corresponding “no data” text.

*View settings and table personalization icons*

Persist the column layout settings. When a user reopens the app, show the responsive table with the same column layout as last defined by this user.

### Tables in Object Pages

For more information on the use of tables within the object page, see the [Tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#tables) section of the *Object Page* article.

### Export to Spreadsheet

On the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), apps can provide a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1) for exporting table data to a spreadsheet. For the export, use the [export to spreadsheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) function.
*'Export to Spreadsheet' menu button*

### Paste

To paste data from the clipboard to the table, the browser functionality for paste can be used (**Ctrl+V** or browser context menu).

- If the focus is on row level, the app has to take the data from the clipboard and add it to the corresponding controls within the table.
- If the focus is on an editable control within the table, the control gets the data automatically.

Pasting via context menu does not work if a custom context menu is used.

## Properties

sap.m.Table

The following additional properties are available for the responsive table:

- The property: **fixedLayout** defines the algorithm the control uses to define column width. Setting it to “false” would perform automatic calculations for the column width, based on the longest non-breakable content. You should always set it to “true” for performance reasons. Exceptions are permissible if the table has only a few columns for a large width and fewer than 10 rows are displayed.
- The property: **backgroundDesign** defines the background on which items are rendered. Use the default value.
- The property: **showOverlay** provides an overlay on the whole table, which prevents use of the responsive table. This is used within the list report floorplan to mark the table as outdated after filter settings have been changed but the new filter settings have not yet been applied. Do not use it in other cases.
- The property: **inset** adds a margin on all sides of the responsive table.
- The property: **headerText** is a simple way to set the table title if you just need a title. However, do not use any of the following:
  - A separate toolbar
  - variantManagement
  - headerToolbar aggregation
- The property: **headerDesign** affects the appearance of the header if the theme supports it. Leave the default value as it is.
- The property: **footerText** adds a small additional row below the table footer or last item. This row can contain text only. Do not use this property.
- The property: **width** defines the width of the whole table.
- The property: **includeItemInSelection** uses a click on the whole line item to select the corresponding item if the responsive table is in a selection mode. This competes with other settings like “Navigation” or “Active” and should therefore not be used.
- The property: **enableBusyIndicator** automatically shows a busy indicator while data is loaded. (In contrast to the property: busy, where the application can control when the table is set to busy state)
- The property: **modeAnimationOn** does not have any effect. Do not use it.
- The property: **showSeparators** allows you to show all, none, or some separators. The default setting, which is to show all separators, is to be used.
- The property: **swipeDirection** allows you to define the direction in which to swipe if additional actions are hidden behind a table row. This works only on touch devices. Do not use this property.
- The property: **rememberSelections** should be set to “false” so that selections are reset or “forgotten” when the user applies, for example, a filter or sort to the table. Only change this behavior by setting the flag to “true” for exceptional cases.

* The property: **busy** sets the table to a busy state. While in busy state, the whole table cannot be used and items cannot be read due to an overlay.
* The property: **busyIndicatorDelay** defines the time after which a busy state is shown after the responsive table has been set to this state. Use the default value.
* The property: **visible** shows the table (“true”) or hides it (“false”).
* The property: **tooltip** does not have an effect. Do not use it.
* The property: **alternateRowColors** displays the rows with alternating background colors (“banded rows”). Do not use it.

sap.m.Column

The following additional properties are available for sap.m.Column:

- The property: **width** defines the width of the column in all units allowed by HTML, such as em, rem, %, and px.
- The property: **styleClass** is used if you need to change the visual design of a column. Do not use this, but use the default style instead.
- The property: **visible** shows or hides the column.
- The property: **tooltip** does not have an effect. Do not use it.

sap.m.ColumnListItem

The following additional properties are available for sap.m.ColumnListItem:

- The property: **selected** allows an item to be selected programmatically.
- The property: **counter** does not have any effect. Do not use it.
- Do not use the property: **busy**.
- Do not use the property: **busyIndicatorDelay**.
- The property: **visible** shows or hides the item.
- The property: **tooltip** adds a tooltip to a whole row. The tooltip is only shown on mouse interaction. It will not work on tablets or smartphones. Do not use it.

---

## smart-list

You can use the smart list control to create lists or trees.

_Smart list as list_          | _Smart list as tree_
> **Information:** Unlike most smart controls, the smart list does not use annotations to create the content automatically.

## When to Use

You can use the smart list if you use an OData service for your app (OData version 2 only).

For detailed recommendations on when to use a list or a tree, see the corresponding guideline articles:

- [When to use a list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/#usage)
- [When to use a tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/#usage)

## Components

The smart list control consists of an [overflow toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) (1) in combination with either the [list control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) (2) or the [tree control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/) (3).

Smart list used as a **list**:
(1) An overflow toolbar on the top
(2) List control below

## Behavior and Interaction

The individual controls mentioned in the _Components_ section behave exactly as they would on their own.

For more information, see the respective guidelines:

- [**Overflow Toolbar**: Behavior and Interaction](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#behavior-and-interaction)
- [**List Control**: Behavior and Interaction](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/#behavior-and-interaction)
- [**Tree Control**: Behavior and Interaction](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/#behavior-and-interaction-incl-gestures)

## Responsiveness

Both smart list variants are responsive. Each embedded control behaves as specified.

The following schematic examples show how list and tree use cases appear on different devices.

_Responsive list - Size S_          | _Responsive list - Size M_          | _Responsive list - Size L_          | _Responsive tree - Size S_          | _Responsive tree - Size M_          | _Responsive tree - Size L_

For more information, see the respective guidelines:

- [**Overflow Toolbar**: Responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#responsiveness)
- [**List Control**: Responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/#responsiveness)
- [**Tree Control**: Responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/#responsiveness)

## Top Tips

#### List or tree? What you should consider

Due to their one-dimensional layout, lists are much easier for users to grasp than trees. First consider if you can use a list to present your data. Only use a tree if your data requires a hierarchy. Make sure that the nodes are clearly labeled and that information is not nested too deeply.

> **Hint:** The `listType` property controls whether the smart list presents itself as a list or tree. It must be appended by either `List` or `Tree` to work.

#### More guidelines and tips for each component of the smart list

- Guidelines and tips for **[toolbars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#guidelines)**
- Guidelines and tips for **[lists](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/#guidelines)**
- Guidelines and tips for **[trees](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/#guidelines)**

---

## smart-table

The smart table creates a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/), or [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/) based on an OData (Open Data Protocol) service and its annotations. The [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) comes with additional built-in features, such as [personalization](https://www.sap.com/internal/fiori-design-web/p13n-dialog/), [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/), and [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/).

## When to Use

### Use the smart table if:

- You use an OData service for your app (OData version 2 only).
- The feature set of the smart table fits for your app. In this case, the smart table is faster to implement.
- You need more than one of the major features of the smart table. Otherwise, you might not benefit from a shorter implementation time. For example, if you just need the [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) feature, creating a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) directly is usually faster than using the smart table.

### Do not use the smart table if:

- You use a different technology to OData version 2. Use the corresponding [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) control directly.
- You need more flexibility in the content design, such as several different row templates or less complex personalization features. Use the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) directly.
- You do not have complex data. Another control like a [select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/), [combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/), [list](https://www.sap.com/design-system/fiori-design-web/ui-elements/list-overview/), [grid list](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-list/), [tree](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree/), or smart list might do the job better.
- You have very complex data. Did you check the [chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/)?
- Users need to switch between a [chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/) and [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). The smart table is not designed to work inside an existing chart container. In this case, use either the [smart chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-chart/) or the corresponding [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization) directly.
- You need to layout different controls in a table-like grid. Use a [flexible grid](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-grid/) instead.
- You need to layout different input fields with labels. Use a [form, simple form](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/), or smart form.

## Components

The smart table consists of a [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) (1), an [infobar](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/#infobar) (2), and a [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) (3).

### Table Toolbar

The [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) is generated automatically. The following toolbar content is provided by the smart table out-of-the box:

1. [Title](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#Title)
2. [Item counter](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#item-counter)
3. [Variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#variant-management)
4. [_Show Details_ / _Hide Details_](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#Show-Details-/-Hide-Details)
5. 
6. 
7. [_Maximize_ / _Minimize_](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#Maximize-/-Minimize)

In addition, you can add [app-specific actions](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#App-Specific-Actions).

#### Title

**Default (col-1)**

Displaying a [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) is optional (property: `header`).

**> **Guideline:** **

- Add a [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/) whenever the title is not indicated in the surrounding area.
- If you don’t display a title, ensure that you still provide a table title for screen reader users.

**> **Hint:** **

If there is no title [title](https://www.sap.com/design-system/fiori-design-web/ui-elements/title/), support screen reader users as follows: create a simple [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) in the XML view, use `ariaLabelledBy` to point to the corresponding text, and add this [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) to the smart table. Make sure that the table type within the smart table is set accordingly. The smart table will take care of the rest (creating columns, and so on).

**Section Metadata**

style

#### Item Counter

**Default (col-1)**

The [item counter](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#title) is optional and only available if you show a title (property: `showRowCount`).

**> **Guideline:** **

Show the [item counter](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#title) together with the [table title](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#title), unless:
- You expect this to cause performance problems.
- You use a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) and use the [_More_ button](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#load-items) for loading additional items. Use the [item counter](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#title) on the [_More_ button](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#load-items) instead.

**Section Metadata**

style

#### Variant Management

**Default (col-1)**

[Variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) is optional (properties: `persistencyKey`, `useVariantManagement`, `currentVariantID`, association: `smartVariant`).

**> **Guideline:** **

Use [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) only if really needed.

**Section Metadata**

style

#### Show Details / Hide Details

The [_Show Details_ / _Hide Details_](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#show-details-hide-details) button is mandatory with and only available for the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/). Columns with a low priority (low or medium priority on phones) are hidden in the pop-in area (properties: `demandPopin`, `enableAutoColumnWidth`, `showDetailsButton`, annotation: `UI.Importance`).
You can define which priority levels cause the columns to be hidden (property: detailsButtonSettings). The [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) only appears if there are columns that belong in the pop-in area. Columns disappear from right to left but columns with the priority “High”, are never hidden. They are shown in the pop-in area if they do not fit on the current screen size

#### View Settings

**Default (col-1)**

_View Settings_ are optional. The [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) triggers a [P13n Dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) (property: `useTablePersonalisation`). The _View Settings_ dialog can also be opened with the shortcut **Ctrl\+Comma**.

**> **Guideline:** **

Offer [view settings](https://www.sap.com/internal/fiori-design-web/p13n-dialog/) only if they are really needed. [Tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with just a few columns and rows do not need to be sorted, filtered, or grouped.

**Section Metadata**

style

##### 

**Default (col-1)**

Sorting, filtering, and column settings are automatically available for all columns in all [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). For single columns, you can remove the sort and filter settings (annotations: `SortRestrictions`, `FilterRestrictions`).
- The current sort state and sort order is displayed as an icon in the column header of the sorted columns.
- The current filter state is displayed as follows:
- In the [responsive table,](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) an [infobar](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/#infobar) is shown if filters have been set in the table personalization settings.
- For all other tables, filtering is indicated by an icon in the column header of each filtered column.
When amounts with different currencies appear in a single column, you can change the sort behavior to sort these columns first by currency, then by amount (annotation: `ApplyMulitUnitBehaviorForSortingAndFiltering`). This behavior is applied for all such columns in the smart table. It cannot be defined per column.

**> **Guideline:** **

- Do not turn off the [info bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/infobar/) (property: `useInfoBar`).
- In the default delivery, sort items in a meaningful order. This works only for the [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/), and [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/). You can also provide default filter settings (all tables) and grouping ([responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) and [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/) only) (annotation:
`PresentationVariant`).
- If the smart table is used together with a [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) (property:
`smartFilterId`), do not offer filtering for the smart table itself.

**> **Hint:** **

The smart table can be linked to a [smart filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-filter-bar-annotations/). If linked, the [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) settings are automatically applied to the smart table (`sap.ui.comp.smarttable,SmartTable`, property: `smartFilterId`).

**Section Metadata**

style

##### 

**Default (col-1)**

Group settings are only available for the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) (all columns, one level only) and the [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/) (dimension columns only, multiple levels).
The following text is usually shown on the group header:
[Label of the grouped column]: [Grouping value]
Within the [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/), the grouped column remains visible by default if it is grouped using the [P13n Dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/). The column is hidden if it is grouped using the column header menu.

**> **Guideline:** **

In some cases, the group header text may not be shown automatically as described. This applies to special cases in
the [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/) (for
example, if the displayed text is not taken directly from the data source), as well as custom columns in both
responsive and analytical tables. In such cases, you must set and format the group header text yourself.

**Section Metadata**

style

##### 

**Default (col-1)**

Column settings are used to show and hide columns. For the [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/), and [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/), the column settings automatically enable resizing via the column header and size-to-fit for text-only columns (double-click on column separator line).

**> **Guideline:** **

If sorting, grouping, and/or filtering are needed, also show the column settings (`sap.ui.comp.smarttable.SmartTable`, property: `useTablePersonalisation`).

**> **Hint:** **

Only offer column settings if you need more columns than a tablet screen can display at a time (usually more than
five).

**Section Metadata**

style

#### Export to Spreadsheet

**Default (col-1)**

_Export to Spreadsheet_ is optional. The [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) triggers either a front-end export using the [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) utility, or a back-end export via Gateway (properties: `useExportToExcel`, `exportType`). The front-end export allows for additional settings and can also be triggered with the shortcut **Ctrl\+Shift\+E**.

**> **Guideline:** **

- Only offer the _[Export to Spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/)_ option if your end users typically export the data shown in the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) to work with it in a spreadsheet application.
- This is usually the case if data is collected from several systems and analyzed in the spreadsheet application.
- This is not usually the case for [worklists](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/work-list/), attachment lists, [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with only a few items, shopping carts, or data that does not need to be analyzed.
- If you offer the _Export to Spreadsheet_ button, use the front-end export.
- If your table has columns with non-textual content, provide a textual equivalent for those columns. Non-textual content is not exported.

**> **Warning:** **

With both methods, the file size is limited by the available browser memory. As a result, exporting large [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) can lead to memory overflows and crash the export process.
Apply the following size restrictions as a rule-of-thumb:
- For the front-end export, do not export more than 2 million table cells on desktop browsers or 100,000 table cells on tablets and phones.
- For the back-end export, do not export more than 100,000 table cells.
For larger [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), consider using custom-built, specialized export solutions instead.

**Section Metadata**

style

#### Maximize / Minimize

**Default (col-1)**

[_Maximize_ / _Minimize_](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#maximize-minimize) is optional. It allows users to show the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) in full screen mode and to exit full screen mode (property: `showFullScreenButton`).

**> **Guideline:** **

- Use _Maximize / Minimize_ only if really needed.
- Do not use it in [list reports](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), [worklists](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/work-list/), [analytical list pages,](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) and [initial pages](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/initial-page-floorplan/). We recommend it in [object pages](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/) with multiple grid tables in one tab.
- Do not use it for [responsive tables](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) with a [_More_ button](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#load-items).
- Do not use it if the table is in a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) or [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/).

**Section Metadata**

style

#### App-Specific Actions

**Default (col-1)**

[App-specific actions](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#appspecific-business-actions) can only be added using a custom toolbar (aggregation: `customToolbar`).

**> **Hint:** **

- If additional [actions](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) are needed, use a custom [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) for the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). The smart table can also add integrated functionality, such as a [table title](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#title), [item counter](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#title), [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/), [view settings](https://www.sap.com/internal/fiori-design-web/p13n-dialog/), and [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) to the custom [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) (aggregation: `customToolbar`).
- If you are using a custom [toolbar](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar) in a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), show the bottom border of the [toolbar](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar). For all other [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), do not show it (property: `style`, value: `clear`).
- The property `placeToolbarInTable` adds the [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) to the corresponding aggregation of the inner SAPUI5 [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). In most cases, set this to “true”, especially when you are using the custom toolbar with the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/). Otherwise, the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/) cannot stick to the top of the surrounding layout container.

**Section Metadata**

style

### Infobar

**Default (col-1)**

The [infobar](https://www.sap.com/design-system/fiori-design-web/ui-elements/infobar/) is only available for the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/). It indicates which filter settings are currently active. If no filters are set, the [infobar](https://www.sap.com/design-system/fiori-design-web/ui-elements/infobar/) is hidden (property: `useInfoToolbar`, value: `Auto`).

**> **Guideline:** **

- For the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), the [info bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/infobar/) is mandatory.
- For all other tables, do not show the [info bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/infobar/).

**Section Metadata**

style

### Table

The table is generated automatically. The sections below describe the behavior and different possibilities:

- [Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#Table)
- [Column Visibility](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#Column-Visibility)
- [Column Layout](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#Column-Layout)
- [Column Headers](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#Column-Headers)
- [Column Content](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#Column-Content)

#### Table

The [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) provides the following features:

**Default (col-1)**

- You can use the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/), or [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/) within the smart table (property: `tableType`).

**> **Guideline:** **

- The analytical table, tree table and grid table are not fully responsive. They are available only for desktops and tablets, so you will need to take an [adaptive approach](https://www.sap.com/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness#adaptive-approach) by offering an additional UI for smartphones.
- For the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), the smart table initially loads 20 items and shows a _More_ button for loading additional items. Change this behavior if:
- You expect fewer than 200 items. Load all items from the start (`sap.m.Table`, property: `growing`).
- You expect more than 200 items. Adapt the number of items initially loaded to cater for large screens, and load additional items automatically when the user scrolls down (`sap.m.Table`, property: `growingScrolllToLoad`).

**> **Hint:** **

To change the growing behavior, create a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/)
with just the settings for the growing behavior, and hand it over to the smart table. The smart table then takes care of the rest (such as
adding columns, and so on).

**> **Hint:** **

- The property `tableBindingPath` defines the path from which the data is fetched.
- The property `enableAutoBinding` fetches the data automatically as soon as the corresponding OData model is
initialized and the smart table is created.

**Section Metadata**

style

**Default (col-1)**

- While the [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/), and [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/) support multi-selection by default within the smart table, the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) does not offer any kind of selection. The selection mode can be changed.

**> **Hint:** **

To change the selection mode, add a navigation indicator to single rows, or add a highlight to specific rows, you need to create a [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with the corresponding settings. You do not need to define anything else. Hand this [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) over to the smart table. The smart table then takes care of the rest (such as adding columns, and so on). This method allows you to use the multi-selection plug-in with the [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/), and [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/).

**Section Metadata**

style

#### Column Visibility

**Default (col-1)**

- Columns are created automatically. Items are rendered based on the properties and metadata of the underlying OData service (annotation: `LineItem`, properties: `entitySet`, `tableBindingPath`, `initiallyVisibleFields`, `ignoreFields`). A column is generated for each OData entity property.

**> **Hint:** **

If a column needs to be in the model but should not be shown, you can hide it from both the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) and the [P13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) (property: `ignoredFields`, annotation: `UI.Hidden`).
Use this option if:
- A column is needed to provide an ID that is used for navigation purposes only. However, you only want to display the corresponding text on the UI, and not the ID.
- The values of a column are needed to perform calculations, but only the results are shown on the UI.
You can use the property `requestAtLeastFields` to request additional (technical) columns with every request, regardless of whether these columns are currently visible. This does not work with the [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/).
The property `ignoreFromPersonalization` is only available with the [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/). It loads additional key fields that are needed for aggregations but are never visible.

**> **Hint:** **

Columns can be removed at runtime. This is useful if the same [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview)
is used for similar, but slightly different objects. For one of the objects, specific columns need to be shown, for others they must be hidden, and users must not be able to add them
in the personalization settings (function: `deactivateColumn`).

**Section Metadata**

style

**Default (col-1)**

- You can define which columns are initially visible when the app is first launched. All other columns are initially
hidden (annotation: `PresentationVariant`/ `LineItem`, property: `initiallyVisibleFields`).

**> **Guideline:** **

- Keep the number of initially visible columns to a minimum. Avoid pop-in behavior ([responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/)) or horizontal scrolling (all other tables) on a tablet screen size in the default delivery (annotation: `PresentationVariant`/ `LineItem`).
- Also keep the number of additional columns offered in the personalization settings to a minimum. You can use the [P13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) to let users show/hide the columns. Select the columns offered in the [P13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) carefully. Do not just show all columns available in the backend tables (annotation: `sap:visible`, value: `false`).

**Section Metadata**

style

**Default (col-1)**

- For each column that is initially visible, the `LineItem` annotation includes a `DataField` record, which allows you to influence the content rendering of the smart table.
For columns that are initially invisible, the content rendering can also be influenced via the annotation `DataFieldDefault`.

**> **Hint:** **

If the same column is defined via `LineItem` and via `DataFieldDefault`, `LineItem` wins.

**Section Metadata**

style

#### Column Layout

**Default (col-1)**

- A default column width can be calculated for each column based on the data type, the column label, the edit/read-only state, and the annotations: `textArrangement`, `MaxLength` for strings, `Precision` and `Scale` for numeric data (property: `enableAutoColumnWidth`).
The calculated width is between 3 rem and 20 rem. Apps can change this default width if needed (annotation: `CSSDefaults`).
If the combined width of all the columns is less than the width of the table, the remaining space stays empty.

**> **Guideline:** **

Choose a column width that avoids truncation for the initial data and (if feasible) for the column header label. If
the default column width doesn’t fit, change it.

**> **Hint:** **

For the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), enableAutoColumnWidth also applies the following changes:
- The smart table property `demandPopin` is set to `true`.
- The [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) property `fixedLayout` is set to `Strict`.
- The [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) property `contextualWidth` is set to `Auto`.
- Column resizing is enabled for all columns (including custom columns).
- [Labels](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/) in the column headers no longer wrap. If there is not enough space, they truncate.
In this case, the properties above must not be managed by the app.

**Section Metadata**

style

- Columns can be [resized](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/#column-header) by dragging the column separator. If the combined width of all columns is less than the width of the table, the remaining space stays empty. The smart table provides column resizing automatically in the following cases:
- [Grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/) / [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/) / [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/): Column resizing is automatically enabled with the [column settings](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#column-settings).
- [Responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/): Column resizing is automatically enabled with the [automatically calculated default column width](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#column-layout).

**Default (col-1)**

- If the automatically generated content does not fit for your use case, you can override the automatic behavior with your own column template.
You can also add further columns. This allows you to provide columns with app-specific or inline [actions](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement), columns which show calculated values (based on more than one OData entity property), or – for [responsive tables](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) – columns that show more than one control.

**> **Hint:** **

To add or override columns (“custom columns”):
- Use an XML view to define the underlying [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with just the columns to be added/overridden.
- To override columns, provide the column key of the column you want to exchange.
- Add this “unfinished” [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) to the smart table. The smart table adds all the automatically generated columns and additional features.
Make sure that the `sortProperty` and the `filterProperty` are set (define `p13nData` via the aggregation `CustomData`). If you offer the [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) option, ensure that it works as expected.
If you are using a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), also make sure that the responsive behavior for this column works as expected (`sap.m.Column`, property: `importance`).

**Section Metadata**

style

#### Column Headers

**Default (col-1)**

- You can specify a column header text for each column (annotation: `sap:label`).
- **SAP S/4HANA Only:**
Tooltips are available by default for smart table column headers.
In smart tables, texts that exceed the column width always truncate (see [Column Layout](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#column-layout)). The tooltip allows users to read the full column header text without resizing.

**> **Guideline:** **

Provide a column header text for each column. (annotation: `sap:label`).

**Section Metadata**

style

**Default (col-1)**

- The column headers contain the following settings:
- _Sort Ascending_, _Sort Descending_
- _Filter:_ Opens the [P13n Dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/). If this does not fit for your use case, exchange this menu item (property: `enableCustomFilter`)
- _Group_ (only [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/), only on dimension columns)
- _Total_ (only [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/), only on measure columns): This setting is not persisted (annotation: `sap:aggregation-role`, value: `measure`).
If a column contains entries with different units of measurement, a _Show Details_ link appears instead of the total. Clicking the link opens a popover showing the subtotals per unit of measurement.
- _Freeze_ (only available for [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/), and [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/)): Must be added manually.

**> **Guideline:** **

Offer column totals by default for all columns where totals make sense (annotation: `PresentationVariant`).

**> **Hint:** **

To add a _Freeze_ option manually, declare the corresponding [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) inside the smart table in the XML view, and use the corresponding settings for this inner table.

**Section Metadata**

style

#### Clicking the column header reveals sort and filter options (responsive table)

**Carousel (full-width, col-1)**

**Default (col-2)**

**Default (col-3)**

**Section Metadata**

style

#### Content

The smart table offers the following options for creating columns automatically:

**Default (col-1)**

1. You can render the smart table in either read-only or edit mode (with no option to switch), or allow users to switch between the two modes (properties: `editable`, `useSmartToggle`).
2. In read-only or edit mode, the smart table renders the controls as listed in the table below, or uses the [smart field](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) for both modes. If you use [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) together with the option to switch between read-only and edit mode, the smart table renders the read-only controls as in the list below, but uses the [smart field](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) for edit mode. The [smart field](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) limits the rendering options (aggregation: `customData`, key: `useSmartField`), but also allows for:
- Better control of the visibility of a field per row ([smart field](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/), annotation: `FieldControl`)
- Use of value help for input fields

**> **Hint:** **

From a performance perspective, using the [smart field](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) is more expensive than using the controls provided by the smart table directly. With this in mind, follow the rules below:
- For read-only tables, use the controls provided by the smart table.
- For simple editing cases with no need for `FieldControl` or [value help](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/) on [input fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/), use the controls provided by the smart table.
- For more complex editing cases, use [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/).
- For switching between read-only and edit modes:
- In read-only mode, use the controls provided by the smart table.
- In edit mode, use either [smart fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-field/) or the controls provided by the smart table, based on the guidance above.

**Section Metadata**

style

In cases where the controls are rendered by the smart table, the following controls are used:

**Table**
Read-only                                                                                                                                                                                                                                                                                               | Edit                                                                                                      | Annotations / Edm type         | Comment

Static text        | [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)                                                                                                                                                                                                                            | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)                | Edm.String
Decimal numbers    | [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)                                                                                                                                                                                                                            | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)                | Precision, Scale, Edm.Byte,
| Edm.Decimal, Edm.Double,
| Edm.Int16, Edm.Int32,
| Edm.Int64, Edm.SByte,
| Edm.Single
Status information | [Object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/) or Icon                                                                                                                                                                                        | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)                | Criticality, CriticalityType,\ | Do not use editable status information.
| CriticalityRepresentationType
Key identifier     | [Object identifier](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/) (responsive table)\                                                                                                                                                                        | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) for the ID     | SemanticKey,
[Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)\                                                                                                                                                                                                                           |                                                                                                           | Common.EditableFieldFor
(all other tables)                                                                                                                                                                                                                                                                                      |
Text and ID        | [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/), [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/), or [object identifier](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/) | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) for the ID     | TextArrangement                | Use together with the annotation mentioned above for static text, status information, or key identifier.
|                                | Sorting, filtering, and grouping only works for the ID, even if the ID is not displayed.

Links with/without | [Smart link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/)                                                                                                                                                                                                                | [Smart link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/)                  | SemanticObject                 | [Smart links](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/) can be customized using the aggregation: `semanticObjectController`
quick view         |                                                                                                                                                                                                                                                                                                         |
Dates              | [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)                                                                                                                                                                                                                            | [Date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/)                | Edm.DateTime,
| sap:display-format, value:
| date, IsCalendarDate
Dates and times    | [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)                                                                                                                                                                                                                            | [Date/time picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/datetime-picker/)       | Edm.DateTime,
| Edm.DateTimeOffset
Times              | [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)                                                                                                                                                                                                                            | [Time picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/time-picker/)                | Edm.Time
Fiscal periods     | [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)                                                                                                                                                                                                                            | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)                | IsFiscalYear, IsFiscalPeriod,
| IsFiscalYearPeriod,
| IsFiscalQuarter,
| IsFiscalYearQuarter,
| IsFiscalWeek,
| IsFiscalYearWeek,
| IsDayOfFiscalYear
Amounts with       | Two [text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/) controls                                                                                                                                                                                                               | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) for the amount | sap:semantics, value:          | In edit mode, the currency is shown as static text next to the [input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/).
currencies         |                                                                                                                                                                                                                                                                                                         |                                                                                                           | currency-code
Phone numbers      | [Link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link/)                                                                                                                                                                                                                            | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)                | IsPhoneNumber                  | Opens the system application for making phone calls.

Email              | [Link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link/)                                                                                                                                                                                                                            | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)                | IsEmailAddress                 | Opens the system application for writing emails.

Pictures           | [Image](https://www.sap.com/design-system/fiori-design-web/ui-elements/image/)                                                                                                                                                                                                                          | [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/image/)                      | IsImageURL                     | Only available for the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/). In edit mode, the input field contains the URL to the image.

Boolean            | [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)                                                                                                                                                                                                                            | [Checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/)                      | Edm.Boolean                    | For read-only, the displayed text is _Yes_ or _No_.

In all cases, the smart table automatically takes care of the content alignment and formatting (except for custom columns).

[Input fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) can be accompanied by a [value help dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/) (annotation: `ValueList`). If annotated, triggering the value help button opens a [value help dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/). Within this dialog, you can provide a [search field](https://www.sap.com/design-system/fiori-design-web/ui-elements/search/) (annotation: `ValueList`, property: `SearchSupported`).

If no `ValueList` annotation is provided, you can restrict the number of characters for an [input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) (annotation: `MaxLength`).

**Default (col-1)**

You can provide additional controls, such as [micro charts](https://www.sap.com/design-system/fiori-design-web/ui-elements/micro-chart/), [rating indicators](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/), [progress indicators](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/), and [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/), as custom columns (using an XML view). For custom columns, you must provide any read-only and editable content manually.

**> **Guideline:** **

For inline actions, use a text-only or an icon-only [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/). Make sure the icon communicates the function clearly enough. Otherwise, use a text-only [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/).

**Section Metadata**

style

If the smart table is used with the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), you can show the status of an item by displaying a [highlight indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#highlight-items) on the left of the item (property: `highlight`).

## Behavior and Interaction

The behavior is generally inherited from the underlying [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/), [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/), [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/), and [P13n dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) (see the corresponding articles for details.) Note that the smart table provides limited options and not all settings of the underlying controls are available.

### Empty Tables

**Default (col-1)**

If there is no data to show, the smart table renders a default text. This text can be overwritten by the app development team. The default texts are:
- If a [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) is initially empty:

Overwrite this whenever a hint can be provided on how to fill the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with data.
(property: `initialNoDataText`, value: `$NO_FILTERBAR`)
- If a [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) is used together with a [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) (as in the [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)), and is initially empty, use the following text:
_To start, set the relevant filters._(property: `initialNoDataText`, value: `$FILTERBAR`)
- If a [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) is used together with a [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) and the filter does not return results, use the following text:

(aggregation: `noData`, changeable at runtime)
- If the user has hidden all of the columns in the [personalization](https://www.sap.com/internal/fiori-design-web/p13n-dialog/) settings, the following text is shown:
_Right now, there are no visible columns in the table. Please select the columns you need in the table settings._ This text cannot be changed.

**> **Guideline:** **

- For all other cases, provide instructions on how to fill the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) with data (aggregation: `noData`).
- The “no data” text can be exchanged at runtime. Use specific texts for different situations.
- Avoid displaying a [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) without any items, especially when the app is initially loaded.

**Section Metadata**

style

### Errors and Warnings

**Default (col-1)**

To indicate that the table contains items with errors or warnings, the smart table can show a [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) above the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) (aggregation: `dataStateIndicator`). On the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/), information about errors or warnings is provided, as well as the possibility to filter down the table to the corresponding rows. When issues are solved or when new issues appear, the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) is updated accordingly.
For details on displaying errors, warnings, and other messages, see [Message Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

**> **Guideline:** **

To show that an item contains an error,
- [Highlight](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#highlight-items) the row accordingly.
- Add the string (contains errors) and place it at the bottom of the [column that identifies the line item](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#item-states) (responsive table) or in the _[Editing Status](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/#item-states)_ column (all other tables).

**> **Hint:** **

Binding-related messages are shown automatically.

**Section Metadata**

style

## Responsiveness

**Default (col-1)**

The smart table acts exactly like the embedded controls. For details see:
- [Toolbar Overview](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/)
- [Infobar](https://www.sap.com/design-system/fiori-design-web/ui-elements/infobar/)
- [Responsive Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) via [auto pop-in mode](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#auto-popin-mode)
(`sap.ui.comp.smarttable.SmartTable`, property: `demandPopin`, value: `true`).
You can use the `UI.Importance` annotation to influence the priority of each column.
You can provide a _Show Details_ button to let users show/hide columns with low importance (property: `showDetailsButton`).
- [Grid Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [Tree Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/), [Analytical Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/) are not fully responsive. They are available **only for desktops and tablets**. For smartphones, you need to take an [adaptive approach](https://www.sap.com/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness#adaptive-approach) by offering an additional UI.

**> **Guideline:** **

If used with the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), enable the pop-in behavior (sap.ui.comp.smarttable.SmartTable, property: demandPopin, value: `true`). Ensure that the most important columns stay in the tabular layout as long as possible (annotation: UI.Importance). The most important columns are those that contain the following information:
- The column that identifies the line item.
- The column that contains the key attribute.

**> **Hint:** **

- To change the layout of the pop-in area (Block, GridSmall, GridLarge), you need to create a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) with the corresponding settings (property: `popinLayout`). You do not need to define anything else. Hand this [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/) over to the smart table. The smart table then takes care of the rest (such as adding columns, and so on).
- Do not use the annotation `UI.Importance` together with the [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), [tree table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/), or [analytical table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/). It hides columns with low priority on phones or narrow-width screens, without the possibility to show them again.

**Section Metadata**

style

## Examples

## Top Tips

- If you are using the responsive table, enable and configure the [auto pop-in mode](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#auto-popin-mode) and use the _Show Details_ / _Hide Details_ [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/).
- For custom columns, follow the guidelines of the respective [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview). If needed, use responsive paddings for aligning the content.
- Enable only the features that are needed for your use case. Very small [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) do not need to be sorted, filtered, grouped, and rarely exported. Don’t just add unnecessary features for consistency purposes.
- If the page has a [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/), don’t offer filtering for the [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview).
- If you are using custom columns, make sure that any export and personalization features you are using also work for these columns.

## Properties

The following properties are available for `sap.ui.comp.smarttable.SmartTable`:

- The property: `toolbarStyleClass` is deprecated. Do not use it.
- The property: `useOnlyOneSolidToolbar` is deprecated. Do not use it.

---

## standard-list-item

The standard list item is a type of list item used in
simple lists. You can use it to display a simple data
point (title) or a set of data, such as a product title
and a few product attributes.

## Usage

### Use the standard list item if:

- You want to display a simple set of data in a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/).
- You want to display a simple set of data as part of a list within the [select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/).

### Do not use the standard list item if:

- You want to display a business object. Use the [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) instead.

## Components

The standard list item can consist of the following parts:
- **Title** (mandatory). By default, the title font is larger if there’s no description. If you have list items with and without a description, this results in
differently sized titles that are harder to read. In this case, switch off the title size adaptation (property: `AdaptTitleSize`).
- **Visual: icon or image** (optional): Either displayed in the form of an icon from the SAP icon font or as an image.
- **Short description** (optional).
- **Status** (optional): This semantic information is equivalent to the [object status](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status). It’s usually displayed as colored text and displays the status. Keep the status text as short as possible.
As an alternative, you can invert the display to place a stronger focus on the status
(property: `infoState`). Use the inverted display only if the status is critical for your use case and requires immediate action.
## Responsiveness

The title and short description can wrap and truncate.
However, we recommend keeping the text as short as
possible. The semantic information text is always
displayed in full.

## Behavior and Interaction

The list item behavior is identical for all list item types. For more information, see the interaction details in the [list overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/#behavior-and-interaction) article.

## Examples

Here are a few examples of standard list items:

_Standard list items in a list_          | _Standard list item with a title and status_                             | _Standard list item with an icon, title, short description, and checkbox for selection_
_Standard list item with a title and short description_                  | _Borderless standard list item_

---

## table-web-component

A table contains a set of data that is structured in rows and columns.

Table cells can contain any kind of data, including interactive controls that allow users to edit the data, navigate, or trigger related actions.

<https://www.sap.com/design-system/live-examples/Table/Table_LE_basic.html>

## When to Use

Do
Use the table:
- If you need to display tabular data.
- To enable selection of one or more items when details
are needed to choose the correct item.
- If rows are independent of each other and no operations
are required across columns.
- If you want to have only one implementation for all
devices.
## Anatomy

### Table

1. **Column Header**: Contains the title for each column.
2. **Column**: Vertical arrangement of data within the
table. A column represents a single type of information
that is associated with each row in the table.
3. **Row**: Horizontal arrangement of data within the
table. A row represents a line item for an entity with
multiple data points, organized in columns.
4. **Cell**: A cell can contain any type of component.
Each cell can contain one or more lines of text.
### Group Row

A group row is a visual separator between sets of data in
the table. It is used to group related data and make it
easier to read and understand.
Each group row contains a heading that describes the data
below it. To preserve the intended design, we strongly
recommend using text only.
## Types

You can adapt the following table parameters

- [Set “sticky” column headers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/table-web-component/#table-with-sticky-column-header)
- [Selection mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/table-web-component/#table-selection-mode)
- [Growing behavior](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/table-web-component/#growing-behavior)
- [Components per cell](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/table-web-component/#cells-with-additional-components)
- [“No data” message for empty tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/table-web-component/#table-with-no-data)
- [Display of a busy indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/table-web-component/#busy-indicator)

### Table with Sticky Column Header

You can set the column header of the table to remain fixed at the top of the page during vertical scrolling as long as the table component is in the viewport.

### Table Selection Mode

The table supports different types of selection mode:

- None (default)
- Single selection
- Multiple selection

**Single selection:** Only one row can be selected.

**Multiple selection:** Multiple rows can be selected. A
checkbox appears at the beginning of each row.
You can also specify if a visual response is provided upon press when the user clicks on a row or presses **Enter**.

### Growing Behavior

You can let the table grow – either by adding a scrollbar to the table or by showing a _More_ button. By default, the growing capability is switched off.

**Scroll:** More rows are loaded when the user scrolls to
the bottom of the table.
**Button**: Shows a _More_ button at the bottom of the
table. Pressing the button loads more items.

You can change the text for the growing button.
In addition, you can display a subtext below the button.

### Cells with Additional Components

You can add additional components to a cell. This allows
you to provide additional information, include a visual
representation, or otherwise increase usability. Only use
components that make sense in the context of the table.
### Table with No Data

If no data is available in the table, a “No Data” text is
displayed by default. App teams can customize the text.

### Busy Indicator

If the table is in the process of fetching data, show the
busy indicator. The opacity of the table component is
then reduced and the busy indicator is displayed on top
of the table content.
## Behavior and Interaction

### Focus

Clicking a row sets the focus on that row.

<https://www.sap.com/design-system/live-examples/Table/Table_LE_basic.html>

### Single Selection Mode

Selecting a row in single selection mode highlights the row.

<https://www.sap.com/design-system/live-examples/Table/Table_LE_SingleSelect.html>

### Multiple Selection Mode

In multiple selection mode, selecting the checkbox for a **row** selects the row and highlights it.

Selecting the checkbox in the **table header** selects all the table rows at once.

<https://www.sap.com/design-system/live-examples/Table/Table_LE_MultiSelect.html>

<https://www.sap.com/design-system/live-examples/Table/Table_LE_MultiSelectWithGrouping.html>

### Sticky Column Header

If the column headers are set to “sticky”, they remain in place when the user scrolls down.

<https://www.sap.com/design-system/live-examples/Table/Table_LE_StickyHeader.html>

### Touch Enablement

The behavior for selecting a row from the table on touch devices is similar to the mouse interaction.

The gesture for selecting a row is a **one-finger tap**.

## Responsive Behavior

You can make tables responsive on smaller screens by hiding columns or by moving some content into the first column.

Use of these responsive features is optional. By default, the table just minimizes all visible columns until they are no longer readable.

**If you don’t implement the responsive behavior, ensure that you provide an adaptive solution for smaller screens.**

### Minimum Width

For each column, you can set the minimum table width that is required for the column to be displayed. In this way, you can determine which columns are shown for different screen sizes. You can also allow the column to “pop in” instead of hiding it (see below).

### Pop-In Mode
If the table isn’t wide enough to show all columns, you can
opt to let the content of the missing columns “pop in” below
the content of the first column.
**By default, the pop-in mode is switched off. App teams must
activate it explicitly.**
For smaller screens, you can pick which columns remain in the
one-column or two-column table. All other data is moved to the
space between two rows, known as the “pop-in area”.
In this area, data for the corresponding cell is provided as a
label/value pair. The label is defined by the column header,
and the value is taken from the corresponding cell. Labels can
be displayed next to the value or above the value.
Within the pop-in area, multiple label/value pairs can be
displayed in two ways:
- **Inline**: Label/value pairs are listed next to each other.
- **Block**: Label/value pairs are listed one below the other.
Depending on how the table will be used, we recommend using
the last column to show right-aligned content.
### Content Density

The table is available in two different sizes:

- **Cozy:** Broader spacing for touch devices
- **Compact:** Regular spacing for desktop devices

<https://www.sap.com/design-system/live-examples/Table/Table_SE_basic.html>

## Globalization and Localization

For right-to-left languages, the table is mirrored. In pop-in mode, the content pops in on the right.

<https://www.sap.com/design-system/live-examples/Table/Table_SE_basic.html>

---

## timeline

The timeline control shows entries (such as objects, events, or posts) in chronological order.

A common use case is to provide information about changes to an object, or events related to an object. These entries can be added manually or generated by the system (for example, value XY changed from A to B). The latest entry is always on top.

Another use case is a feed that is driven by user updates and comments. This feed can also be entirely devoid of machine-generated content.

> **Information:** Do not confuse the timeline control with the similar-looking [group feed component](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/group-feed-component/).
While the group feed component was created explicitly for integration with SAP Jam, the timeline is more flexible, fully responsive, and not restricted to a specific source. However, the timeline
control doesn’t offer any integration with social collaboration platforms out of the box.

## Usage

The timeline does not have a fixed location on the UI. Where you place it depends on your use case.

For example:

- If the timeline is closely related to the content and needs to be seen in parallel, you can use the [dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/) floorplan. Alternatively, you can create a separate page with the timeline as the central element and show it next to the main content using the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).
- If the timeline contains only secondary information, or only needs to be accessed occasionally, you can embed it in a [tab](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/).
- If you are using the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) floorplan, you can use the horizontal layout to integrate the timeline (see _[Orientation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/#orientation)_ in the _Styles_ section below).

These are just some of the ways you can position the timeline on a page.

**If you also require social collaboration features**, you have two options: For integration with SAP Jam, you can use the [group feed component](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/group-feed-component/), which offers similar features to the timeline. For integration with other social collaboration solutions, you can use the timeline control, but the integration does not come out of the box and needs to be provided by the app team.

### Use the timeline if:

- You want to display read-only content, such as an object history.
- Your customers do not use SAP Jam.
- You expect a long list of posts triggered by the system, the users, or both.
- You want users to be able to create their own posts.
- You want to offer custom actions for individual items.

### Do not use the timeline if:

- You expect only a few entries. In this case, use a simple [feed](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/feedinput/).
- You want to provide a way to upload files. Use the [upload set](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/upload-set/) control instead. You can still use the timeline to show automated updates about the user’s uploads.
- You need SAP Jam integration. In this case, use the [group feed component](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/group-feed-component/).

## Responsiveness

The timeline control is fully responsive and works well with multiple screen sizes.

For better usability, both the single-sided and the double-sided [layouts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/#orientation) have a maximum width. This prevents the control from being excessively stretched.

For size S (smartphone), we highly recommend using the single-sided layout combined with narrow containers, such as the dynamic side panel. Also use the single-sided layout if the column in the flexible layout is too narrow for the double-sided layout. As soon as you have enough screen real estate, switch to the double-sided version to fully utilize the available space.

The single-sided version has a maximum width of 30 rem, while the double-sided layout has 57.5 rem.

## Layout

The timeline control consists of:
- A header (optional, but highly recommended)
- A chronological axis
- Posts/entries

### Header

The title describes the content displayed along the timeline axis.

### Axis

Along the axis, the entries are arranged chronologically. The distance does not correspond to the time between each occurrence.

You can use a vertical or horizontal axis. The timeline can be scrolled along its axis.

By default, the latest entries appear on top. Replies are sorted the other way round.

### Post (Entry/Feed Update)

Posts can be entered manually or generated by the system (for example, “Object ABC was changed by Mr. X”). The entry should include information about who changed what, and when (depending on the use case). Typically, posts in the timeline consist of four sections:

1. A **node** Using icons on a node is optional. Use icons for either **all or none** of the posts.
2. A **header section**, which can contain:

- An avatar, showing a circular or square image, or an icon.
(See [avatar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/) control for more details.)
- Text(s) and/or link(s)
- A time stamp (use [SAP Fiori formatting](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-time))
1. An (expandable) **content section**, which can contain:
- Text(s) and/or link(s)
- Structured or unstructured information
- Images
1. An optional **action section** containing actions that can be performed on an item, such as _Edit_ or _Delete_. Actions are provided by the application.
**Note:** If a section is not used, it should not take up any space within the bubble.
Here are just a few examples of different visualizations. Because the timeline control is very flexible, there are also numerous other possibilities.

#### Posts can originate from three sources:

- **Manual post**: A person actively posts to the timeline (or to another place that supplies updates to the timeline).

Example:
- **Post triggered by user action**: The post is triggered by something a person does (such as creating an object, adding a note, or uploading an attachment).

Examples:

(Followed by an optional preview of the header data)

_John Miller uploaded the document Sales-Revenue_Q4.xls_
(Followed by an optional preview of the document, if available)

(Followed by an optional preview of the note)

_Julie Armstrong added the picture our_team.jpg_
(Followed by an optional preview of the image)

- **Post triggered by a technical source**: Posts can also originate from a purely technical source (for example, if a threshold has been exceeded, or a deadline has been reached).

Examples:

> **Information:** **Notes vs. Posts:**
Notes are not the same as timeline posts. They must be kept separate and visualized differently. Like attachments,
users create notes in the context of a business object, typically within a _Notes_ tab.
In the context of a business object, notes have the same character as attachments.
The difference is even more apparent if you compare posts to complex notes created with a rich text editor. These
notes are fundamentally different from timeline posts.
To show notes on the timeline, trigger a feed post with a teaser text. For example, “Julie Armstrong added a new
note: Lorem ipsum…”.

Columns
## Types                            | _Example of a basic read-only use case_
The timeline offers many levels of  |                                                                                         | _Example of a highly interactive history feed_
expansion, ranging from a simple
read-only history to a highly
interactive mode. This flexibility
allows the timeline to cater for a
wide range of use cases.
For example, you could use a
read-only version to show
system-generated posts that don’t
require any user interaction.
Nevertheless, this timeline could
still be used to show actions the
user has taken within the app (like
creating notes and attachments, or
making calls). These actions appear
in the timeline as
application-generated posts.
## Behavior and Interaction

### Search
Because a timeline can contain a vast number of entries,
always offer a search. A search helps users to find what
they are looking for without having to scroll through all
the posts and updates.
### Expand and Collapse

Some updates might be too lengthy to show in full. For these cases, applications can decide to show only a preview and let users expand the post if they want to read it. You can set a limit for the number of lines to be shown (recommended), or for the number of characters.

This example shows a post that previews 3 lines before
truncating and showing a _more_ button in the next line.
Clicking this button expands the post to its full length
and changes the button text to _less_. Clicking this
button again collapses the post to its previous height.
### Filter (Optional)

For timelines with several entries or entry types, it makes sense to enable filtering. You can let users filter the timeline by entry type and by other useful attributes (such as _bookmarked_). Users can even filter by time range to find posts between two specific dates, months, quarters, or years.

The filter is triggered with the filter
icon :filter: icon in the toolbar.

Depending on the complexity of the timeline, you can offer
different kinds of filter dialog:
- **Single selection**

- **Multi-selection**

- **Multi-faceted filter**
To implement this combination of feed source and filter, use the [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/).

If a filter is set, inform the user in the [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/).

> **Hint:** As of SAPUI5 version 1.48, sorting and filtering is no longer restricted to the front end. The timeline offers full
filter and sorting support for model binding.

### Scrolling

The timeline offers endless scrolling. As soon as the user reaches the end of the pre-loaded list, more posts are fetched from the back end.

> **Hint:** To enable infinite scrolling, set the properties `GetLazyLoading` and `EnableScroll` to “true”.

In exceptional cases, it might be more useful to let users trigger the fetching process manually. Once the number of entries displayed in the timeline exceeds the number of entries set, a _Show More_ button appears at the bottom of the list for loading additional posts.

Each app team can determine the number of entries displayed before the _Show More_ button appears, based on the specific use case and app performance.

Use the _Show More_ button instead of infinite scrolling if you expect users to look at **only the most recent posts** and do **not** expect them to scroll through longer lists of posts.

### Grouping

The timeline allows applications to group posts by certain criteria (for example, by year). Groups can be expanded and collapsed for a better overview.

Grouping is supported by all timeline types and layouts: vertical and horizontal as well as left-, right- and double-sided.

The following example shows two collapsed groups (_2021_ and _2020_) and an expanded group (_2019_).

### Navigate

The timeline supports click events on item level. This is needed for timeline cards, where a click on a timeline list item navigates to the corresponding object directly.

### Custom Actions

You can introduce custom actions for timeline posts. Keep in mind that the available space is limited and translated words can take up much more space than their English counterparts. Only offer actions that are essential to your users and reduce the number of actions to a minimum. If more actions or more complex interaction is required, let your users navigate to a separate page for the item they need to work on (such as an object page).

In the first example, the custom actions _Edit_ (1) and _Delete_ (2) have been added to the post.
In the second example, the custom
action _Download_ (3) enables the
user to quickly download an        | _Behavior – Custom action 'Download'_
attachment directly from the post.
### Refresh

Instead of showing new posts as soon as they arrive (which would interrupt users while they are reading), the timeline offers a very subtle way of notifying users about new posts.

You can place a [message strip](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.MessageStrip/preview) directly below the toolbar to show how many new posts are waiting to be retrieved from the back end.
If a filter is active, the message
strip shows alongside the filter
infobar.                           | _Behavior – Refresh and filter_
### Social Actions

The timeline does not offer integrated social collaboration features out of the box. For integration with SAP Jam, see the [group feed component](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/group-feed-component/).

If you want to build your own social platform or integrate an existing service other than SAP Jam, the timeline is flexible enough to handle most social collaboration features. The following section gives some guidance on how to design the interaction.

#### Adding a Post

You can allow users to add their own posts by offering a _Post a Comment_ button in the toolbar on top of the timeline.

Use the _Post a Comment_ button to trigger a popover containing a [text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/). Set the focus inside the text area to enable the user to start typing right away.
_Post_ sends the user’s text, which then appears in the timeline. To prevent empty posts, keep the button inactive until the user has typed something.

#### Replying to a Post

Alongside the _Post_ function, _Reply_ is probably the most basic and essential social feature. Unlike [feed controls](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/feedinput/) (sap.m.FeedInput and sap.m.FeedListItem), the timeline enables communication at item level. Feed controls always add entries to the top of the list; there are no inline replies within the feed. By contrast, the timeline lets users reply directly to a specific entry. The number of replies is shown next to the _Reply_ action, for example, _Reply (5)_.

When the user clicks the _Reply_ link, the app needs to
trigger a popover that shows all previous replies, as
well as a text area for posting a reply.

## Styles

### Orientation

There are various layout options. When you choose the layout, consider the type of content and the screen real estate available for displaying the control.
(See [guidelines section](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/timeline/#guidelines) for more details.)

#### Vertical

Use the vertical timeline for narrow containers or on smartphones (in portrait mode).

_Styles – Vertical (single-sided), right_           | _Styles – Vertical (single-sided), left_           | _Styles – Vertical (double-sided)_

#### Horizontal
You can use the horizontal timeline on wide screens, the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/), or even on smartphones in landscape mode.
You can display both the vertical and horizontal timelines with or without icons.

### Icons vs. Nodes

When you design your application, you
can choose between two visualizations
for listing posts on the timeline:    | _Styles – Vertical without icons_           | _Styles – Vertical with icons_
icons or nodes.
You can use icons if all entry types
that will appear in the timeline can
be represented by an icon.
If you cannot find icons for all post
types, use nodes instead.
### Colors

\ \You can use colors to highlight entries in the timeline and to convey semantic information (for example, to indicate the status or urgency of an entry).
## Guidelines

- Only use the speech bubble icon :post: for posts entered manually by users.
  CSS name: icon-post
  HTML Unicode: & # xe 0 a b ; (remove the spaces)
- Do not use colors for decoration. Only use colors to convey semantic information (for example, warnings or errors). 
- When using the **vertical** timeline, use **single-sided (right)** or **double-sided** layout, unless the use case calls for the left-sided version.
- When using the **horizontal** layout, use the **single-sided (bottom)** or **double-sided** version, unless the use case is better supported by the top-sided version.
- When you choose the layout, consider the type of content and the screen real estate available for displaying the control. For example:
  - In a vertically-oriented [dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/) container, also use vertical orientation for the timeline. Likewise, if the container is oriented horizontally (either by design or due to responsive behavior), the timeline should also be horizontal.
  - If sections on an object page offer more horizontal than vertical space, use a horizontal timeline. This can be either single-sided (bottom) or double-sided.

---

## tree

Within SAP Fiori, we distinguish between [tree tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) and trees. Both usually allow the user to display and work with a hierarchical set of items. While tree tables are usually used for more complex data, **trees** are generally used for rather basic data. Trees are mostly used in the main list for a list-detail scenario using the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) and in [popovers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) or [dialogs](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/). In certain use cases, they can also be used in the [dynamic page layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).

In the case of tree tables and trees, items that contain additional items are called nodes, while items that do not contain any other items are called leaves. If available, a single topmost node is called a root node. Apart from the hierarchical structure of its nodes and leaves, a tree is quite similar to a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/).

## Usage

### Use the tree if:

- You need to display the key identifier of hierarchically structured items (for example in the first column of the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)).
- Selecting one or more items out of a set of hierarchically structured items is a main use case.
- The hierarchy has a restricted number of levels (up to about 12, depending on the content) and items (around 200).
- You want to have only one implementation for all devices.

### Do not use the tree if:

- The main use case is to select one item from a very small number of non-hierarchical items, without viewing additional details. In this case, a [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) or [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) might be more appropriate.
- Items are not structured hierarchically. Use a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) instead.
- The hierarchy turns out to have only two levels. In this case, use a grouped [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/).
- The hierarchy turns out to be just a categorization based on several details of the item. In this case, an [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) provides multi-level grouping. Note that the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) is not fully responsive. It is only available for desktops and tablets, so you will need to take an adaptive approach by offering an additional UI for smartphones.
- You need to display very deep hierarchies with additional data per item. In this case, use a [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/). Note that the [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) is not fully responsive. It is only available for desktops and tablets, so you will need to take an adaptive approach by offering an additional UI for smartphones.
- The structure contains more than [around 200 items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/#performance). In this case, use the [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/). It is optimized for large item sets and provides better performance. Note that the [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) is not fully responsive. It is only available for desktops and tablets, so you will need to take an adaptive approach by offering an additional UI for smartphones.
- You need an overview of a large amount of data. In this case, use a [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/).

Check out the [table overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) to decide which SAP Fiori table is most suitable for your needs.

## Responsiveness

The tree is like a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) containing hierarchical data. It acts as a container for items, with the possibility to expand and collapse nodes. When reducing the width, item texts wrap to ensure that the tree adapts to the new size.

In addition, the tree changes the indentation per level dynamically when the user expands a node, based on number of levels currently showing.

_Tree displaying 2 levels_          | _Tree displaying 3 levels_          | _Tree displaying 4 levels_

## Layout

The title bar (optional) contains the title of the tree. In addition, an item counter and [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) items can be placed on the title bar.
The collection of hierarchical items occupies the main part of the tree.

## Components

The title bar consists of a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). The toolbar can contain a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/), an item count, and other toolbar items such as actions or view settings, for example.
The standard tree item consists of:
- A highlight indicator (optional)
- An expand/collapse [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for nodes
- A selector in form of a [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) or a [radio button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radio-button/) (optional)
- An [icon](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/?post_type=foundation\&p=29418) (optional)
- A [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)
- A counter (optional)
- Additional buttons with actions such as _Edit_, _Navigate_, or _Delete_ (optional)
If additional controls are needed, use a custom tree item. The custom tree item allows you to use any combination of controls inside the tree.
## Behavior and Interaction (incl. Gestures)

### Tree Level
**Scrolling**
The height of the tree is defined by the number of items
it contains. It does not have its own scroll container,
but is scrolled together with the app.
Default (col-1)

When the user scrolls, the title and the filter infobar can stick to the top of the surrounding layout container
(sap.m.Tree, property: sticky).

> **Information:** The “sticky” feature comes with some limitations:
- It is not available on all browsers. In non-supporting browsers, the corresponding areas are not fixed on top of the surrounding layout container while scrolling.
- Certain layout containers suppress the sticky behavior, such as the [grid layout](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/grid-layout/). The same happens if the table is placed within the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/).
- If focus is set to a sticky area, the tree is automatically scrolled to top.

Default (col-2)

Section Metadata

style

#### Selection Modes

A tree can have one of the following selection modes
(sap.m.Tree / sap.m.ListBase, property: mode):

**None:** Items cannot be selected (sap.m.ListMode.None).
Beware: Items can, nevertheless, use the sap.m.ListType
“navigation” which allows click-handling on specific
items. This should only be used when the click triggers a
navigation to a corresponding item details page.
**Single select master:** One item of the tree can be
selected. To select an item, click anywhere on the item.
Single select master does not add any visual indication
to the tree and therefore cannot be differentiated from
trees without selection if no item is selected.
Therefore, always keep one item selected. For single
selection, this is the preferred mode.
(sap.m.ListMode.SingleSelectMaster)
**Single select left:** One item of the tree can be selected. For this, the tree provides [radio buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radio-button/)
on the left side of each line item. Use this selection mode only if clicking on the item triggers something else, such as a navigation. Ideally, always keep one
item selected, even in initial state (sap.m.ListMode.SingleSelectLeft).

Default (col-1)

**Multiple selection**: Allows the selection of one or more items. For this, the tree provides [checkboxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) on the left side of each line item. Each item is selected independently of the others. The **Shift** key can be used to select a range. Users can (de)select all items using **Ctrl\+A**. _Select All_ should (de)select all items that the user can reach by scrolling. (sap.m.ListMode.MultiSelect).

> **Hint:** In multiple selection mode, users can (de)select all items using the shortcut **Ctrl\+A**. This only affects items that have already been loaded to the front-end server. All other items are **not**
(de)selected before they are loaded (for example, items added via lazy loading with growingScrollToLoad). This conflicts with the guideline that all items the user can reach by scrolling must be
(de)selected.
Also note that **Ctrl\+A** only (de)selects items within expanded nodes.
To process all items, listen to the selectionChange event and to its flag selectAll. This indicates whether **Ctrl\+A** was triggered. As soon as an action is triggered, process the items accordingly. Depending on the number of items, consider processing them in the back end.

> **Guideline:** - Never disable the selection checkbox. If an action can’t be performed on a specific item, inform the user after the corresponding action has been triggered. For more information, see [Enabling/Disabling Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).
- For single-selection list-detail scenarios within the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), use the mode “single select master”. Do not show an additional “navigated” indicator.
- Avoid the mode “single select left”. It removes the possibility of clicking somewhere on the item to select it. Use it only if it is really necessary to have two different click areas; a small one for a selection, and the rest of the item for something else.
- If selecting / deselecting all items is important for your app, add a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) _Select All_ to the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-toolbar/). Change the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) text to _Deselect All_ if all items are selected.

Default (col-2)

Section Metadata

style

#### Deleting

To delete single items, use the tree in “delete” mode (sap.m.Tree / sap.m.ListBase, property: mode, value: sap.m.ListMode.Delete). This adds a _Delete :decline:_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) to each item. Clicking this button triggers the deletion of the corresponding item. **Do not use this mode if deleting multiple items at once is the preferred use case.** Delete is a mode of the tree and therefore cannot be used together with single selection or multi selection.

### Line Item Level

#### Expandable and Collapsible Nodes

An _Expand_/_Collapse_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) is provided automatically for each node.

#### Highlight an Item
To highlight an item, use the “highlight” indicator
(sap.m.TreeItemBase, properties: highlight).
#### Navigating

To allow navigation from an item, set type to
“navigation” within the corresponding item
(sap.m.StandardTreeItem / sap.m.ListItemBase, property:
type, value: sap.m.ListType.Navigation). This will create
an indicator at the end of the line (“>”) and the entire
item will become selectable. Clicking the line triggers
the navigation event. However, clicking a selectable area
or an expandable/collapse node does not. Use the
navigation event to navigate to a new page containing
item details.
If no navigation is possible, set type to “inactive”.
Navigation is an item type and therefore cannot be used
together with “edit” or in combination with click events
for the entire item (“active”).
#### Indicate Navigated Item
When multi-selection is used in a list-detail scenario, it is not clear which item was last opened (for example, which item is currently shown in the second column of a [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)). In this case only (multi-selection tree with navigable items), you can display a **“navigated” indicator** to mark the item that is currently open (sap.m.TreeItemBase, property: navigated).

#### Editing Items

To allow the user to edit an item, set type to “detail” within the corresponding item (sap.m.StandardTreeItem / sap.m.ListItemBase, property: type, value: sap.m.ListType.Detail or sap.m.ListType.DetailAndActive). This will create an edit :edit: [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) at the end of the line. Clicking the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) triggers the edit event. Use this event to either open a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) or a details page where the item can be edited.
Edit is an item type and therefore cannot be used together with “navigation” or in combination with click events for the entire item (“active”).

#### Clicking an Item

Items as a whole can be clickable. An event is fired by clicking on the item (anywhere except when triggering a selection or when expanding/collapsing
a node). Apps can react to the event, such as by opening a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) (sap.m.StandardTreeItem / sap.m.ListItemBase, property: type, value: sap.m.ListType.Active or sap.m.ListType.DetailAndActive).
Active elements do not have a visual indication and therefore cannot be differentiated from non-active elements.
“Active” is an item type and therefore cannot be used together with “navigation” or “edit”. In addition, “active” uses the entire item as a clickable
area and thus cannot be used together with the “single select master” mode.
#### Context Menu

You can attach a context menu (sap.m.Menu) to a tree. The context
menu gives users an alternative way to modify the focused
elements by giving them access to context-specific functions.
The context menu can be triggered for the tree or per item.
Context menus are opened by right-clicking (desktop), long press
(mobile), the **context menu key**, or **Shift\+F10**.
Be aware that using the context menu overrides the browser
context menu, which can no longer be opened.
If a control inside a tree is the “click target”, and the control
also provides a context menu, the control context menu “wins”.
#### Drag and Drop

One or several items can be repositioned within a tree or
moved to other UI elements using drag and drop operations
(sap.m.ListBase, aggregation: dragDropConfig). While
being dragged, the items are shown as ghost elements on
the mouse cursor.
Drop targets can be on items, between items, or both
(sap.ui.core.dnd.DropPosition). On a drop target, the
mouse cursor changes to either a “copy”, “link”, “move”,
or “none” cursor. “None” indicates that the dragged item
cannot be dropped in the current position
(sap.ui.core.dnd.DropEffect).
Drag and drop is only available on supporting browsers.
## Guidelines

### Tree vs. List

Trees are more complex than [lists](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) due to their hierarchical view. Users tend to have more problems finding items in hierarchical views than in flat [lists](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/),
except where the hierarchical view is natural. By natural we mean that every child node should be part of only one parent, and this
relationship between the child and parent is clear and well known.
Do

### Broad vs. Deep Hierarchies

When you use trees, you should choose broad hierarchies
over deep hierarchies. Deep hierarchies make finding
items more complicated. So try to reduce hierarchical
levels where possible, especially if the hierarchy is not
natural. Ideally, a tree should have a maximum of four
levels, the first two of which should contain the most
important items.
Do

You can use the following methods to reduce hierarchy levels:
- Avoid a single root node. It is usually not needed.
- Container nodes at the top level can usually be replaced by [tabs](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/) or [value pickers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/).
- Eliminate unnecessary mid-level containers, for example, by combining redundant ones.
- Exercise care when using a tree due to its overall complexity. The hierarchical structure of the data does not necessarily mean that a tree control is required.
### Design Concepts

The tree can be used to display hierarchical data. Unfortunately, trees convey an immediate feeling of complexity. Ideally, show trees only if there is no other option. You should instead try the following:

- Flatten the data. A [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) is still complex, but less so than a tree. A [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) might also fit in some use cases.
- When only two levels are needed, a grouped [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) control can be used. This works well, where group nodes are used for categorizing their children and where the group nodes themselves do not need to be selectable.
- Break down the data into manageable chunks. Allow the user to navigate or drill down between them.
- Use [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/) with drilldown functionality until the amount of data is more manageable.

### Design for Performance

To optimize performance, we recommend showing no more than 200 items at once in the tree. For larger datasets (up to 1,000 items), use the “growing” mechanism to limit the number of displayed items, and make sure that users can filter the data.

> **Warning:** The limits above are only recommendations. For a specific app context, the number of manageable items might be far
higher or lower.
The actual limits depend on your concrete scenario, including:
- The number of rows in the table
- The number of displayed columns
- The complexity of the cell content (for example, simple text vs. complex charts)
- Other elements on the page (for example, multiple pages in a flexible column layout, or several tables/elements
with more complex rendering on one page)
- The browser being used

### Title

Use a title only if the title of the tree is not indicated in the surrounding area. If needed, implement the title text by adding a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) to a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). Place the toolbar above the tree.
Do not use a title if it simply repeats text that is already above the tree. For example:
- A _Beverages_ tree is the only control on a tab labeled _Beverages_.
- A section or subsection on an object page contains only one tree.

Use a title if you need the item count, [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), or [variant management](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/). To avoid repeating text, feel free to use generic text as a title, such as _Items_.
Exception: If the surrounding area contains the title, and both the item count and toolbar can be added to the surrounding area, no additional title is needed.
Example: An object page (sub-)section contains only one tree. In this case, add the item count and the table toolbar to the (sub-)section header.
If you use a title, be sure to include the following:
- A title text for the tree.
- An (optional) item count using the following format: **Title (Number of Items)**. For example, _Items (17)_. Depending on the use case, either count all items or only leaves (for example, if nodes are mainly used for categorization).
Remove the item count in the title if there are zero items.
If possible, keep the toolbar sticky (sap.m.Tree, property: sticky).
> **Hint:** Assistive technologies (such as screen readers) use the title to create a hierarchical site map for faster
navigation. In addition, screen readers use the title as the label for the tree.
If you don’t use a title (for example, to avoid repetition), make sure that the tree is connected to another
meaningful on-screen text that can be used as a label for assistive technologies. You can do this using the method
addAriaLabelledBy.

### Loading Data

To indicate that the tree is currently loading items, use the [busy state](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/busy-state/)
(sap.m.Tree, property: busy). Do not show any items or text. As soon as the data is loaded, remove the busy state and
show all items.

### Initial Display

Think of the initial expandable/collapsible state of a tree. If your structure contains many items on the root level, it might make sense to collapse the whole tree in its initial state.

In contrast, if the most important items are displayed on a deeper level (if, for example, the parent nodes are simply a kind of categorization), the tree should be expanded up to the first level where the most important items immediately appear.

### Errors and Warnings

To indicate that the tree contains items with errors or warnings, show a [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/) above the tree. On the [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/), provide information about errors or warnings. When issues are solved or when new issues appear, update the [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/) accordingly.
To indicate an error in a single row, see [Item States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/#item-states) below.
For details on displaying errors, warnings, and other messages, see [Message Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).
> **Hint:** The sap.m.plugins.DataStateIndicator displays a message strip above the table, which shows binding-related messages.

### Content

### Content Formatting

To display object names with an ID, show the ID in
parentheses after the corresponding object name.

Try not to display an empty tree. If there is no way around this, provide instructions on how to fill the tree with data (sap.m.Tree / sap.m.ListBase, properties: showNoData, noDataText).
Examples:
- If a tree is initially empty, provide at least a basic text:

Overwrite this whenever a hint can be provided on how to fill the tree with data.
- If a tree is used together with a [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) (as in the [list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)), and is initially empty, use the following text:
- If a tree is used together with a filter bar and the filter does not return results, use the following text:
Adapt the texts above if:
- The text is not precise enough for your use case (for example, no search is offered, only the search is offered).
- You are using the live search (no _Go_ button in the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/)). In this case, leave out “run the search”.
- The standard text is misleading (for example, if the data is filled based on a list-detail pattern instead of search and filter settings).
### Highlighting Items

To show that an item needs attention, you can display a highlight indicator in front of the item. The highlight indicator can be used to indicate:
- A value state, such as red or orange for an error or warning. In this case, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Additional information, such as blue to highlight newly added items. In this case, use [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Industry-specific or process-specific states, such as “out of stock” or “excess of inventory”. In this case, use [indication colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#indication-colors).
Be aware that the highlight is just an indication. It does not tell users exactly what is wrong. Make sure that you provide this information within the table row, ideally in the same color.
For details on the use of highlight colors, see [How To Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).
(sap.m.ListItemBase, property: highlight)
### Item States

To show that an item has been modified, for example within the [global edit flow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow), add the string _(Modified)_ to the text of the item.

To show that a modified item contains an error, for example within the [global edit flow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow), add the string _(Contains errors)_ to the text of the item and highlight the row accordingly. A row with errors should be highlighted in all use cases – for example when the field is visible in the row in edit mode.

To show that an item is locked, add the string _(Locked by [name])_ to the text of the item.

To show that an item is in a draft state, add the string _(Draft)_ to the text of the item.

Show only one state at any one time.

### Actions

To trigger actions on items, show the actions on a toolbar above the tree. Do not offer action triggering on multiple items if the tree is expected to have fewer than 10 items in most cases.
The following actions on single items must always be in-line:

Delete: Use “Delete” mode (sap.m.Tree / sap.m.ListBase,
property: mode, value: sap.m.ListMode.Delete). This places
a _Delete :decline:_ button at the end of each item.

Navigation: Use the “Navigation” item type
(sap.m.StandardTreeItem / sap.m.ListItemBase, property:
type, value: sap.m.ListType.Navigation). This places a
navigation indicator at the end of the corresponding
items. Use this to navigate to a new page containing item
details.
Edit: Use the “Detail” item type (sap.m.TreeItem / sap.m.ListItemBase, property: type, value:
sap.m.ListType.Detail). This places an _Edit_ :edit: icon at the end of the corresponding items.

From these three actions (delete, navigation, and edit), you can combine delete and edit, or delete and navigation. Edit and navigation cannot be combined.

To trigger actions that are independent of the selection, show the actions on a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) above the tree. For example: _Add_, _Collapse All_, 
To trigger a default action on the entire item, use the “Active” or “DetailAndActive” item type (sap.m.TreeItem / sap.m.ListItemBase, property: type, value: sap.m.ListType.Active). Active items trigger an event when clicked, which can be handled by apps, for example, to open a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/). Selection and expanding/collapsing a node does not trigger the event, but are handled by the tree. Do not use this for navigation, to switch the line item to an edit state, or to delete the item.
Active can be combined with edit and delete, but not with navigation. Do not combine active with single selection master.

#### Add Items

For adding items, place an _Add_ or _Create_ text [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [tree toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-toolbar/).

- Use _Create_ if the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) adds a brand new item that doesn’t yet exist on the database.
- Use _Add_ if the item already exists and is merely added or assigned to the current object.

Enable the shortcut **Ctrl+Enter** (and ideally **Enter** in addition) to trigger the _Add_ or _Create_ button.

Show new items as the first item of the tree or node:

- If nothing is selected, add the new item to the root.
- If a single node is selected, add the new item to the selected node.
- If a single leaf is selected, add the new item as a child of this leaf. The original selected item becomes a node.

If your tree doesn’t support adding items to the root, selected node, or selected leaf, disable _Create_ or _Add_ for the corresponding levels.

Disable _Create_ or _Add_ if more than one item is selected.

There are three options for adding an item. In order of priority (most recommended first), these are:

1. **Add the item inline**. Create an empty, editable item as the first item of the selected node. Show the _Save_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [tree toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-toolbar/). This option is recommended for simple scenarios where just a few [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) have to be filled.
2. **Open a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)** for items where up to 8 [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) need to be filled. Save the new item at [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) level.
3. **Navigate to a new page**. This behavior should only be used for very complex scenarios that cannot be handled by a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) (for example, creating complex objects). When the user presses _Save_ in the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) of the [create page](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/create-page/), navigate back to the tree.

Depending on the flow, an item can be in one of three different states:

- **New**: The item was just created inline and is in edit mode (for example, after pressing the _Create_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/)). It is highlighted with a visual indicator (information state).
- **Recent**: The item was just created and is in read-only mode (for example, if _Create_ leads to a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/), and _Save_ was triggered within the [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)). In this case, keep the item highlighted and display it as the first item of the corresponding node. Ignore current sort, filter, and grouping criteria to keep the item visible.
- **Added**: The item has been fully added. It follows the sort, filter, and grouping settings and also loses the visual highlight. This state is used after:
  - Inline creation: After _Save_ was triggered on the [tree toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-toolbar/) or at page level.
  - Create with [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/): A tree showing one or several items with the state “Recent” gets updated (for example, after sorting, filtering, or grouping, or when the browser is refreshed).

In the context of [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling), new items are not saved at tree level, but rather with the entire draft.

For more details, see the guidelines for [managing objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) (including subarticles).

### Editing Items

To edit items, add an _Edit_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) either in-line on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) above the tree. Triggering the button either opens a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) or navigates to an editable details page.

For mass editing:

- Provide multiselection (sap.m.Tree/ sap.m.ListBase, property: mode, value: sap.m.ListMode.MultiSelect).
- Provide an _Edit_ button on the toolbar above the tree.
- If several items are selected, triggering the _Edit_ button opens a dialog in which the user edits the corresponding fields for all selected items.

For more details, see [mass editing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing).

### Context Menu

Use the context menu only to give users a quick way of accessing functions that are already available elsewhere (for example, as buttons in the toolbar).

Don’t just offer actions in the context menu itself, as users might not realize that these actions are available at all.

### Drag and Drop

> **Warning:** To comply with the new [WCAG 2.2](https://www.w3.org/TR/WCAG22/) standard, the control must offer an alternative to the drag and drop feature. See the [visible alternatives](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/tree/#visible-alternatives-to-drag-and-drop) described below.

Drag and drop is “invisible” on the UI: users can’t see where dragging is available and where it isn’t. In addition, there is no generic keyboard interaction. Drag and drop is also not available on all browsers. For these reasons, provide it
only in addition to existing (and visible) UI elements that fulfill the same purpose. For example, offer ([toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-toolbar/)) [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) for moving or for copying and pasting items. These are keyboard operable and available on all browsers.

If you offer drag and drop for rearranging items within a
tree, use the following options:

- For dropping items as a child, use whole nodes as drop
targets (sap.ui.core.dnd.DropPosition.On).
- For dropping items on the same level, use the space
between items as drop targets
(sap.ui.core.dnd.DropPosition.Between).
- If you want to allow users to drop items as a child or
sibling, offer both drop targets
(sap.ui.core.dnd.DropPosition.OnOrBetween).
This provides better feedback on where the item will be
inserted. Show the “move” mouse cursor
(sap.ui.core.dnd.DropEffect.Move).
Do not combine rearranging items within one level and
sorting. If you really need to do so, make sure there is
a dedicated sort criterion for the user-defined sort
order, and only offer options for rearranging items if
this sort order is set.
Moving items from one node to another can be combined
with sorting without any issues.
#### Visible Alternatives to Drag and Drop

Depending on the functionality you need, use one or more of the following alternatives:

- To move items up or down within a node:
  Use the :slim-arrow-up: _Move Up_ and :slim-arrow-down: _Move Down_ [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/). These buttons move the selected items until the first selected item can’t be moved up or the last selected item can’t be moved down any further.
  Depending on your tree, this can make sense for both leaves and nodes, only for leaves, or only for nodes. When moving a node, move the whole node and (if applicable) all its children up or down to the next position within the parent node.
  Always make sure that when the user moves an item in one direction and then moves it back, the order is the same as it was before.
  Do not combine the option to move items up and down with sorting.
- To move items to another node:
  Use _Copy_ and _Paste_ [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).
  Alternatively, offer a _Move To_ button. Clicking _Move To_ opens a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) that shows all the nodes of the tree, but no leaves. Selecting an item in this dialog closes the dialog and moves the corresponding items to the selected node.
- To change the level of an item:
  In some trees, such as document structures, users can change the level of an item without affecting the level of parent or child items. In this case, use left and right arrow [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) (:slim-arrow-left: :slim-arrow-right: ).

### Filtering

What exactly needs to stay or be removed is highly dependent on the kind of structure and data your tree displays. For many trees, the following approach works well if you want to apply filters only to the leaves of a tree:

- Remove all leaves that don’t fit the filter criteria
- Remove empty nodes

If you also apply filters to nodes, keep the following in mind:

- A node may or may not fit the filter criteria.
- A node can contain items (nodes and/or leaves) that fit the filter criteria.

Because of this, the results might contain more nodes than those that are relevant for the filter criteria.

> **Information:** The tree control itself has no influence on the filter result. It sends a filter request and displays whatever comes
back. Make sure that the result set is meaningful.

### Sorting

Before you start, ask yourself if sorting is meaningful in your tree. If so, decide on a meaningful default sort order.

If sorting is meaningful, is it meaningful on all levels? Or does the tree structure need to be stable? In the latter case, sort only leaves, but not nodes.

Always sort the tree in a meaningful way when it first loads.

The descending sort order must always be the exact reverse of the ascending sort order. Use a meaningful sort order. For example:

- Sort text alphabetically
- Sort numbers by their value
- Sort status information by the severity of the status:
  - Ascending: Sort status information from positive to negative, with neutral last.
  - Descending: Sort status information from negative to positive, with neutral first.
  - Ascending with different values per severity level: Sort status information from positive to negative, with neutral last. Sort different values within a severity level (semantic color) alphabetically.
  - Descending with different values per severity level: Sort status information from negative to positive, with neutral first. Sort different values within a severity level (semantic color) alphabetically.

### Export to Spreadsheet

On the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/), apps can provide a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1) for exporting the tree data to a spreadsheet. For the export, use the [export to spreadsheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) function.

---

## tree-table

A tree table contains a hierarchical set of data structured in rows and columns and grouped into nodes. The analytical table (also know as ALV) can provide additional details in several non-hierarchical columns per line item.

## Usage

Trees are used to display and work with large amounts of hierarchical data. They have a high data density and therefore convey an immediate feeling of complexity. Ideally, you should only show trees with a lot of hierarchical data as a last resort. Try the following instead:

- Break down the data into manageable chunks and allow the user to navigate or drill down between them.
- Use charts with drilldown functionality until the amount of data is more manageable.

## Responsiveness

A tree table is available for desktops and tablets, but not in smartphone sizes. It supports touch interaction devices, but is not optimized for small screens. For smartphones, you need to take an [adaptive approach](https://www.sap.com/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness#adaptive-approach) by offering an additional UI.

Possible solutions are as follows:

- Use navigation to different pages instead of a tree structure. This works well for structures that are no more than four levels deep.
- Remove levels until only one or two remain. Replace a single-level tree by a [table](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), and a two-level tree by a grouped table or a split-screen layout.
- Use filtering instead of a tree structure.

You can try to create a fallback based on these ideas, but a completely different solution, such as showing charts in a read-only case, might be more appropriate.

## Types

Like all SAP Fiori controls, the tree table is shown in compact mode on a desktop and in cozy mode on tablets.

For a desktop, you can also display even more rows on the same screen height by adding the condensed mode in addition to the compact mode. This renders less white space for each item.

Note that the condensed content density has always to be set in addition to compact. Do not use condensed on its own. Do not mix condensed with cozy. Doing so could lead to unpredictable and / or unwanted results, e.g. cozy sized controls in condensed sized containers, missing paddings, etc.

Note that neither compact mode nor condensed mode can be interacted with touch. Even on a desktop with a touch screen, users will have difficulty selecting rows or using controls inside the cells when using their fingers.

Furthermore, condensed mode is not available for Internet Explorer 9. If condensed mode is to be used, please provide a fallback.

For more information on cozy and compact modes, see [content density](https://www.sap.com/design-system/fiori-design-web/foundations/visual/cozy-compact).

### Compact Mode

## Components
### Column Header
The column header provides the label for the corresponding column and access to the column
header menu.

Resizing columns works in the following ways:
- **Mouse interaction:** Dragging the separator line between two columns (sap.ui.table.
Column, property: Resizable). Double-clicking optimizes the column according to the length
of the currently visible data and the label of the column header (sap.ui.table.Column,
property: Autoresizable).
- **Touch interaction:** The user taps the column header to reveal two buttons: one for
showing the column header menu and one for resizing. Drag the latter to resize the column.
- **Keyboard interaction:** The width of the focused column header can be increased with **Shift\+Right** and decreased with **Shift\+Left**.
After resizing a column, the adaptation of the column widths depends on how the column
width is set:
- If column widths are set in pixel-based units (px, em, rem), the corresponding column is
adapted and following columns are moved accordingly. The width of all other columns is not
affected.
If all the columns together take up less width than the table control, an empty space is
added. If all the columns together take up more width than the table control, a scrollbar
appears.
- If all column widths are set in percentage or “auto”, resizing one column might also
lead to the automatic resizing of some or all other columns. The position of the resized
column might also be affected. This is done to ensure that the whole table width is used
and no white space is added. A scrollbar appears only, if all or most of the columns get
very small. To avoid the unintended side effect of undersized columns, a minimum width can
be set per column. Please be aware that this minimum width is only taken into account if
columns are automatically resized. End users are still able to reduce the column width
below the provided minimum. (sap.ui.table.Column, properties: width, minWidth)
Columns can be rearranged by dragging the column header to another position
(sap.ui.table.TreeTable, property: enableColumnReordering). Keyboard: the focused column
header can be moved by one position to the corresponding direction with **Shift\+Left** / **Shift\+Right**.
### Line Item
A line item contains a set of cells and provides options
for selecting the item.
To prevent adverse side effects when scrolling
vertically, all line items must have the same height
(sap.ui.table.TreeTable, property: rowHeight).
In **rare cases**, show the actions within the line item. One example would be an _Add to Cart_ button in a shopping application. Since these actions are repeated in every line and thus use a lot of screen real estate, do this only for a maximum of one or two actions. Provide a separate column per action. Use a button, unless the action trigger belongs to a link. Hide the action in rows for which it is not applicable.

### Tree Column
The first colum (tree column) provides the hierarchical
structure.
### Expand/Collapse Button
The expand/collapse button is offered on container nodes
to allow the child items of the corresponding container
to be shown or hidden.

### Container Node
A container node is a line item that contains child
elements.
### Leaf Node
A leaf node is a line item that does not contain child
elements.
### Cell
Each cell provides one data point. It can contain one of the following controls to display the data point:
- [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/)
- [Label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/)
- [Object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status)
- [Icon](https://www.sap.com/design-system/fiori-design-web/foundations/visual/iconography/icons)
- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)
- [Input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/)
- [Date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/)
- [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/)
- [Combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/)
- The following micro charts in size XS: [Bullet](https://www.sap.com/design-system/fiori-design-web/ui-elements/bullet-micro-chart/), [comparison](https://www.sap.com/design-system/fiori-design-web/ui-elements/comparison-micro-chart/), [stacked bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/)
- [Multi-combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-combobox/)
- [Multi-input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/)
- [Checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/)
- [Link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link/)
- [Currency](https://www.sap.com/design-system/fiori-design-web/ui-elements/currency/)
- [Rating indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/)
- [Progress indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/)
While it is technically possible to also use other controls, doing so could lead to issues in regards to alignment, condensed mode, screen reader support, and keyboard support.
If you use [text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/), use only single-line text to keep the same row height. Truncate if necessary as this prevents adverse side effects when scrolling vertically (sap.m.Text, property: wrapping, value: false).
### Tree Cell
A tree cell is a cell inside the tree column. Besides its
data point, it provides a collapse/expand button on
container nodes, and it indents the different hierarchy
levels.
### Column Header Menu
For the tree column, the column header menu can contain the menu item _Freeze_ and a _Filter_ field, in which the user enters free text.
For all other columns, only the free text filter is available.
### Selection Cells
For multiselection tree tables, the first column contains
checkboxes for selecting line items. Besides
multiselection, the tree table offers a single-selection
mode and also a read-only mode, in which line items are
not selectable.
### Select All
For multiselection tree tables, the column header can
contain a checkbox above the selection cells for
selecting or deselecting all line items.
### Scrollbar
The tree table allows horizontal and vertical scrolling.
You can add any number of line items to the tree table,
which uses “lazy loading”.
To prevent adverse side effects when scrolling
vertically, all line items must have the same height
(sap.ui.table.TreeTable, property: rowHeight).
The tree table is optimized to allow faster scrolling
within the first 1000 items.
## Behavior and Interaction

### Selection

The tree provides the following possibilities:

**No selection**: Items cannot be selected. (property:
selectionMode = None)

**Single selection**: One item in the tree table can be
selected. A row selector column is shown. (property:
selectionMode = Single)

Default (col-1)

**Multiple selection**: One or more items can be selected. The tree table provides a column with checkboxes on the left-hand side. Clicking
a checkbox toggles the state of the corresponding row from deselected to selected and back. The **Shift** key can be used to select a range.
For multiple selection, you can choose between two variants.
- Multi-toggle mode (property: selectionMode = MultiToggle)
- Multi-selection plug-in (sap.ui.table.plugins.MultiSelectionPlugin)
These variants behave differently when the user selects more items than are currently loaded in the front end.
**Multi-toggle**
In multi-toggle mode, you can offer a _Select All_ checkbox to the left of the column header (property: enableSelectAll). Selecting this
checkbox selects or deselects all items that are currently loaded in the front end (keyboard: **Ctrl\+A**). All other items are not
selected/deselected. If the application data is stored in the back end, scrolling down further can reveal additional unselected items. The
same can happen with range selections if not all items in the selected range have been loaded to the front end.
##### Multi-selection plug-in
If you use this plug-in instead of the multi-toggle selection mode, the behavior for range selection and _Select All_ changes:
- By default, a dedicated _Deselect All_ button replaces the _Select All_ checkbox. There is no default UI element for selecting all items.
- You can set a limit for the number of items that can be selected (sap.ui.table.plugins.MultiSelectionPlugin, property: limit). This limit
has the following effect:
- The range that can be selected using the **Shift** key is limited to the specified number of items (default = 200). The table
automatically scrolls back to the last selected item and a message can appear (sap.ui.table.plugins.MultiSelectionPlugin, property:
enableNotification). Users can select more items by selecting additional ranges (the specified limit applies each time).
- If the selection limit is set to 0, a _Select All_ checkbox is shown. There is also no limit on the number of items that can be
selected in a range. All selected items are loaded, which can lead to performance issues for large data sets (Keyboard: **Ctrl\+A**).
- If selected items are not already available in the front end, they are loaded automatically by the plug-in and set as selected.

> **Information:** When setting a limit for the number of items that can be selected, keep the following boundaries in mind:
- The performance of your service: How many items can be loaded at once in a reasonable time? Does this also apply if
an end-user shows all available columns?
- The “minimum limit”: Internally, the grid table loads blocks of items as the user scrolls down. Because this block
size (sap.ui.table.TreeTable, property: threshold) is usually also based on the performance of the service, it should
be safe to assume that the minimum selection limit is twice this size. In this case, loading the data would take as
long as scrolling down and loading exactly one more block. Nevertheless, we recommend using larger limits if your
service allows.

Default (col-2)

Section Metadata

style

##### Selection Behavior

An item can be selected in different ways, depending on the configuration of the tree table (sap.ui.table.Table, property: selectionBehavior):

- _Row_: An item is selected by clicking the checkbox or the row. Use this option for multi-selection tree tables if clicking a row or a cell is not used for anything else.
- _RowSelector_: An item is selected only by clicking the checkbox in the selector cell. Use this option if clicking the row (or a cell inside the row) is used for something else, such as navigation.
- _RowOnly_: An item is selected only by clicking the row, and not using checkboxes in the selector cells. Use this for single-selection tree tables if clicking a row or a cell is not used for another purpose, such as navigation.

Set the property collapseRecursive to “false” in order to keep the selection on subnodes even after collapsing and expanding the root node.

### Drag and Drop
One or several items can be repositioned within a table
or moved to other UI elements using drag and drop
operations (sap.ui.table.TreeTable, aggregation:
dragDropConfig). While being dragged, the items are shown
as ghost elements on the mouse cursor.
Drop targets can be on items, between items, or both
(sap.ui.core.dnd.DropPosition). On a drop target, the
mouse cursor changes to either a “copy”, “link”, “move”,
or “none” cursor. “None” indicates that the dragged item
cannot be dropped in the current position
(sap.ui.core.dnd.DropEffect).
Drag and drop is only available on supporting browsers.
### Column Header Menu

#### Sort
The column header menu can provide two sort options
(sap.ui.table.Column, properties: sortProperty,
showSortMenuEntry):
- _Sort Ascending_
- _Sort Descending_
The user selects one of these options to sort the
corresponding column accordingly (sap.ui.table.Column,
properties: sorted, sortOrder, sortProperty).
#### Filter
The column header menu can provide a search field for
entering free text. If the user enters a term in the
input field and triggers the search by pressing Enter,
the tree is filtered by the tree column and the
corresponding value. If no items match the filter values,
the filtered tree table may be empty.
#### Freeze Columns
The _Freeze/Unfreeze_ option is provided in the column
header menu of all columns. Using _Freeze_ on one column
freezes all columns from the first one to the selected
one.
### Column Handling

#### Show/Hide Columns

Columns can be shown and hidden. If the tree column is hidden, the following column is the tree column.

#### Rearrange Columns

The user rearranges columns by dragging and dropping the corresponding column header. The tree column is always the first column and cannot be dragged. Keyboard: the focused column header can be moved by one position to the corresponding direction with **Ctrl+Left** / **Ctrl+Right**.

#### Resize Columns

#### Columns are resized as follows:

- **Mouse interaction:** The user drags the separator line between two columns (sap.ui.table. Column, property: Resizable). Double-clicking the line optimizes the column according to the length of the currently visible data and the label of the column header (sap.ui.table.Column, property: Autoresizable). Note that auto-resizing works only if the cells in this column contain one of the following controls: [text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text/), [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/), [link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link/), or [input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/).
- **Touch interaction:** The user clicks or taps the column header to reveal two buttons: One to show the column header menu, and one for resizing. The user drags the latter to resize the column.
- **Keyboard interaction:** The width of the focused column header can be increased with **Shift+Right** and decreased with **Shift+Left**.

#### Context Menu

You can attach a context menu (sap.m.Menu) to a table. The
context menu gives users an alternative way to modify the focused
elements by giving them access to context-specific functions.
When opened, the context menu gets the row and column context,
except for special columns (such as the selection column) or
special rows (like group headers). Context menus can be
implemented for a specific table, row, or cell (not recommended
for editable cells).
Context menus are opened by right-clicking (desktop), long press
(mobile), the **context menu key**, or **Shift\+F10**.
Be aware that using the context menu overrides the browser
context menu, which can no longer be opened.
If a control inside a table is the “click target”, and the
control also provides a context menu, the control context menu
“wins”.
### Cell Content

The tree is traditional in that each cell can contain only one data point in one single line.

Apart from plain read-only text, cells can contain the following:

- [Text](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-area/)
- [Label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/)
- [Object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status)
- [Icon](https://www.sap.com/design-system/fiori-design-web/foundations/visual/iconography/icons)
- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)
- [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-list-item/)
- [Date picker](https://www.sap.com/design-system/fiori-design-web/ui-elements/date-picker/)
- [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/)
- [Combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/)
- The following micro charts in size XS: [Bullet](https://www.sap.com/design-system/fiori-design-web/ui-elements/bullet-micro-chart/), [comparison](https://www.sap.com/design-system/fiori-design-web/ui-elements/comparison-micro-chart/), [stacked bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/stacked-bar-micro-chart/)
- [Multi-combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-combobox/)
- [Multi-input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/)
- [Checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/)
- [Link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link/)
- [Currency](https://www.sap.com/design-system/fiori-design-web/ui-elements/currency/)
- [Rating Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/)
- [Progress indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/)

While it is technically possible to also use other controls, doing so could lead to issues in regards to alignment, condensed mode, screen reader support, and keyboard support.

If you use text, use only single-line text to keep the same row height. Truncate if necessary as this prevents adverse side effects when scrolling vertically (sap.m.Text, property: wrapping, value: false).

## Guidelines

### Filtering

What exactly needs to stay or be removed is highly dependent on the kind of structure and data your tree table displays. For many trees, the following approach works well if you want to apply filters only to the leaves of a tree:

- Remove all leaves that don’t fit the filter criteria
- Remove empty nodes

Where nodes need to be filtered, keep the following in mind:

- A node may or may not fit the filter criteria.
- A node can contain items (nodes and/or leaves) that fit the filter criteria.

Because of this, the results might contain more nodes than those that are relevant for the filter criteria.

> **Hint:** The tree table itself has no influence on the filter result. It sends a filter request and displays whatever comes
back. Make sure that the result set is meaningful.

### Sorting

First of all: Is sorting meaningful in your tree? If so, decide on a meaningful default sort order.

If sorting is meaningful, is it meaningful on all levels? Or does the tree structure need to be stable? In the latter case, sort only leaves, but not nodes.

Always sort the table in a meaningful way when it first loads. In most cases, this means sorting by the column that identifies the row. This is usually the tree column.

To display the current sort state, an icon is shown in the column header of the most recently sorted column. This icon indicates the sort direction (sap.ui.table.Column, properties: sorted, sortOrder, sortProperty).

The descending sort order must always be the exact reverse of the ascending sort order. For each column, provide a meaningful sort order. For example:

- Sort text alphabetically
- Sort numbers by their value
- Sort status information by the severity of the status:
  - Ascending: Sort status information from positive to negative, with neutral last.
  - Descending: Sort status information from negative to positive, with neutral first.
  - Ascending with different values per severity level: Sort status information from positive to negative, with neutral last. Sort different values within a severity level (semantic color) alphabetically.
  - Descending with different values per severity level: Sort status information from negative to positive, with neutral first. Sort different values within a severity level (semantic color) alphabetically.

### Loading Data

To indicate that the table is currently loading items, use the [busy state](https://www.sap.com/internal/fiori-design-web/ui-components/busy-state/) (sap.ui.table.TreeTable, property: busy). Do not show any items or text. As soon as the data has been loaded, remove the busy state and show all items.

### Initital Display

Think of the initial expand / collapse state of a tree: If your structure contains many items on the root level, it might make sense to collapse the whole tree in the beginning.

In contrast, if the main items to work with are displayed on a deeper level (e.g. the parent nodes are just some kind of categorization), the tree should be expanded up to the first level where the needed items appear.

### Errors and Warnings

To indicate that the tree table contains items with errors or warnings, show a [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) above the tree table. On the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/), provide information on errors or warnings. When issues are solved or when new issues appear, update the message strip accordingly.

For details on displaying errors, warnings, and other messages, see [Message Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

> **Hint:** The sap.m.plugins.DataStateIndicator displays a message strip above the table, which shows binding-related messages.

### Selection

- We strongly recommend using the multi-selection plug-in. This ensures that all items selected using _Select All_ or as part of a range are included – even if some items were not initially loaded in the front end. This is not the case if you use the multi-toggle option.
- Do not limit the range selection for the multi-selection plug-in unless you have to.
  - If the dataset is small and/or completely available in the front-end, set the limit property to 0 to enable the _Select All_ option and allow users to select any range.
  - If you have a large dataset, set a limit on the number of selected items to avoid performance issues. Also bear in mind that some actions won’t be helpful if the dataset is too big (for example, a delete operation on 2 million database entries).
- When setting a limit, also display the corresponding message when the user selects more items at once than the limit allows (sap.ui.table.plugins.MultiSelectionPlugin, property: enableNotification).
- For single-selection list-detail scenarios within the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), do not show an additional “navigated” indicator.
- In multiple selection mode, do not show checkboxes in the first data column in the default delivery to avoid confusion.
- Never disable the selection checkbox. If an action can’t be performed on a specific item, inform the user after the corresponding action has been triggered. For more information, see [Enabling/Disabling Actions](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).

### Empty Table

Try to avoid empty tables. If necessary, provide instructions on how to fill the tree table with data.

Remove the item count in the table title if there are zero items.

### Add Items

For adding items, place an _Add_ or _Create_ text [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) on the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/).

- Use _Create_ if the [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) adds a brand new item that doesn’t yet exist on the database.
- Use _Add_ if the item already exists and is merely added or assigned to the current object.

Enable the shortcut **Ctrl+Enter** (and ideally **Enter** in addition) to trigger the _Add_ or _Create_ button.

Show new items as the first item of the tree table or node:

- If nothing is selected, add the new item to the root.
- If a single node is selected, add the new item to the selected node.
- If a single leaf is selected, add the new item as child of this leaf. The original selected item becomes a node.

If your tree doesn’t support adding items to the root, selected node, or selected leaf, disable _Create_ or _Add_ for the corresponding levels.

Disable _Create_ or _Add_ if more than one item is selected.

There are three options for adding an item. In order of priority (most recommended first), these are:

1. **Add the item inline**. Create an empty, editable row as the first item of the selected node. Show the _Save_ [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) on the [tree toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-toolbar/). This option is recommended for simple scenarios with just a few columns and no option to hide columns.
2. **Open a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/)** for larger tree tables with up to 8 editable columns. Save the new item at [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) level.
3. **Navigate to a new page**. This behavior should only be used for very complex scenarios that cannot be handled by a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) (for example, tree tables with more than 8 columns). When the user presses _Save_ in the [footer toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/footer-toolbar/) of the [create page](https://www.sap.com/internal/fiori-design-web/create-page/), navigate back to the tree table.

Depending on the flow, an item can be in one of three different states:

- **New**: The item was just created inline and is in edit mode (for example, after pressing the _Create_ [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)). It is highlighted with a visual indicator (information state).
- **Recent**: The item was just created and is in read-only mode (for example, if _Create_ leads to a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/), and _Save_ was triggered within the [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/)). In this case, keep the item highlighted and display it as the first item of the corresponding node. Ignore current sort, filter, and grouping criteria to keep the item visible.
- **Added**: The item has been fully added. It follows the sort, filter, and grouping settings and also loses the visual highlight. This state is used after:
  - Inline creation: After _Save_ was triggered on the [tree toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-toolbar/) or at page level.
  - Create with [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/): A tree table showing one or several items with the state “Recent” gets updated (for example, after sorting, filtering, or grouping, or when the browser is refreshed).

In the context of [draft handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) new items are not saved at tree table level, but rather with the entire draft.

For more details, see the guidelines for [managing objects](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) (including subarticles).

### Columns

Minimize the number of columns. Avoid the need to scroll horizontally in the default delivery. In the first column, show the hierarchical data, which should identify the line item. Choose the name over the ID, but if both are needed, show the name first, then the ID.

The tree table assigns the same width to each column by default. It is recommended that you overwrite this default to provide optimal space for your content (sap.ui.table.Column, property: width).

If you define the column width in pixels or rems, resizing a column affects only the width of this specific column. Reducing the browser window size results in a scrollbar. After resizing a column, a scrollbar appears if the width of the table is not enough to show all columns. If the columns use less space than is available, white space appears on the right side of the last column.

If you define the column width as a percentage, resizing one column affects the width of several or all columns. Text becomes truncated when the browser window size is reduced. This is done to make sure that all columns together fill the space of the table. A scrollbar appears only in case the automatic change of the column widths is not enough to display all columns. To avoid the side effect of undersized columns, a minimum width can be set per column. Please be aware that this minimum width is only taken into account if columns are automatically resized. End users are still able to reduce the column width below the provided minimum. (sap.ui.table.Column, properties: width, minWidth)

If you define the column width as “auto”, the behavior is the same as for “percentage”. In contrast to percentage, “auto” distributes the columns equally.

To decide on how to set the column width (pixel/rem/em vs. percent/auto), keep the following tips in mind:

- For tables with only 2 to 3 columns, use pixel-based units. This ensures that on wide screens the values in the columns are not spread over the whole screen, which improves readability of line items.
- For tables with many columns, where a horizontal scrollbar is usually needed, use pixel-based units. This avoids unintended side effects when resizing columns.
- For all other tables, use whatever fits your case better.

Be cautious with mixing columns with pixel-based and percentage-based widths. While this can be helpful in some cases, it could also cause even more unintended side effects when resizing a column. When using percentage-based widths for one or more columns, think of the possibility to not allow end users to resize columns at all.

### Alignment of Cell Content

Align column headers according to their cell content:

- Texts are left-aligned.
- Numbers (except for IDs), dates, and times are right-aligned.
- Icons are centered.
- Micro charts are left-aligned.

In addition, align amounts with currencies to the decimal point. You can do this with the sap.ui.unified.Currency control.

Note that most currencies have two digits after the decimal point, but there are exceptions, for example:

- The Tunisian dinar has three digits.
- The Japanese yen has no digits.

In tree tables with mixed currencies, all amounts still have to be aligned to the decimal point.

To enable positive and negative values to be identified more easily, position the minus sign to the right of the number. It is placed in the same position in every row.

For more information, see [currency](https://www.sap.com/design-system/fiori-design-web/ui-elements/currency/).

### Formatting Cell Content

- Note that there are different locale formats, so show dates, times, and numbers in the correct format for the user’s language/country.
- If you show both a a text and an ID, consider the requirements for sorting, grouping and filtering:
  - If users need to sort, group, and/or filter by **both** text and ID, show the text and ID in two separate columns.
  - If users only need to sort, group, and/or filter by **either** text **or** ID, show the ID in parentheses after the corresponding text.
- If the unit of measurement is the same for all rows, show the unit of measurement in the column header. Otherwise, show the unit of measurement within the row.
- If you want to let users sort, filter, or group by amount and by unit of measure independently, put both in different columns. If you combine them in one column, offer only sorting, filtering, and grouping by amount.

### Tree vs. Table

Trees are more complex than tables due to their hierarchical view. Users tend to have more problems finding items in hierarchical views than in flat lists, except where the hierarchical view is natural. By natural we mean that every child node should be part of only one parent, and this relationship between the child and parent is clear and well known.

Do

When you use trees, you should choose broad hierarchies over deep hierarchies. Deep hierarchies make finding items more complicated. So try to reduce hierarchical levels where possible, especially if the hierarchy is not natural. Ideally, a tree should have a maximum of four levels, the first two of which should contain the most important items.

Don't

You can use the following methods to reduce hierarchy levels:

- Avoid single root nodes. A single root node is often used to provide a _Select All_ feature. Since the tree control provides an extra space for a _Select All_ feature, the root node is not usually needed.
- When you use only two levels, choose a grouped table or grouped ALV over a tree table control. Expand all groups for the default delivery.
- Container nodes at the top level can usually be replaced by tabs or value pickers.
- Eliminate unnecessary mid-level containers, for example, by combining redundant ones.
- Exercise care when using a tree due to its overall complexity. The hierarchical structure of the data does not necessarily mean that a tree control is required.

### Design Concepts

The tree table can be used to display large amounts of hierarchical data. Unfortunately, tree tables have a high data density and therefore convey an immediate feeling of complexity. Ideally, tree tables with large amounts of data should only be shown if there is no other option. You should instead try the following:

- Flatten the data. A list, table, or ALV is still complex, but less so than a tree table.
- Break down the data into manageable chunks. Allow the user to navigate or drill down between them.
- Use charts with drilldown functionality until the amount of data is more manageable.

Try to avoid horizontal scrolling in the default delivery.

### Navigation

To trigger navigation on line item level, choose one of the following options:

- Use a **link for the attribute that identifies the row**. Clicking the link triggers the navigation. This is the preferred option.
- Add the **RowActions column** and show the navigation arrow ( :slim-arrow-right: ) at the end of the row. No column header text is required. The navigation column is fixed and will not scroll away. Users also cannot personalize this column. The navigation arrow triggers the navigation.
  Do not use the RowActions column for actions other than navigation and deletion.

_Special case: Multi-selection in a list-detail scenario_ When a multi-selection table is used in a list-detail scenario, it is not clear which item was last opened (for example, which item is currently shown in the second column of a [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)). In this case, you can display a **“navigated” indicator** to show which item is currently open.

### Examples of Incorrect and Correct Usage

When you use trees:                                                         | Don't                                 | Don't
- Choose breadth over depth.
- Emphasize important values. Do not let the user run
into a wall of text without guidance. You can use **bold** text for this. | _Avoid truncating the initial visible | _Never wrap texts_
- Try to minimize the number of columns, especially if                      | content in the default delivery_
there is a large number of rows.
- Optimize column width for its initial visible
content. Do not automatically adjust column width based
on content changes.
- Do not wrap content, truncate it. End users can
easily change the column width to see the full text.
- Maintain a fixed layout, except when the user wants to
change it.
- In the default layout, use the tree column for the item
name or data that identifies the row. This helps the user
to choose between different items.
- Create a clear and immediately understandable hierarchy.
Use clear parent-child relationships. If this is not
possible, add a child in different nodes to help the user
find the element.
- Consider persisting the layout settings. When a user reopens the app, show the tree table with the same column sizes, column order, and view settings as last defined by this user.
- Use the _Select All_ feature only if it makes sense. Note that selecting a lot of data also takes time and might not be appropriate for all use cases. For example, a delete operation on two million database entries might not be very helpful in many cases.
- Set the property collapseRecursive to “false” to keep the selection on subnodes even after collapsing and expanding the root node.

### Empty Tree Tables

Avoid empty tree tables. If necessary, provide instructions on how to fill the tree table with data (sap.ui.table.TreeTable, properties: noDataText, showNoData).

Examples:

- If a tree table is initially empty, provide at least a basic text:
  _No items available._
  Overwrite this whenever a hint can be provided on how to fill the tree table with data.
- If a tree table is used together with a [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) (as in the [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)), and is initially empty, use the following text:
- If a tree table is used together with a filter bar and the filter does not return results, use the following text:
Adapt the texts above if:

- The standard text is not precise enough for your use case (for example, no search is offered, only the search is offered).
- You are using the live search (no _Go_ button in the [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/)). In this case, leave out “run the search”.
- The standard text is misleading (for example, if the data is filled based on a list-detail pattern instead of search and filter settings).

### Highlight Items
To show that an item needs attention, a highlight indicator can be shown in front of the item. The highlight indicator can be used to indicate:
- A semantic state, such as red or orange for an error or warning. In this case, use [semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Additional information, such as blue to highlight newly added items. In this case, use [semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
- Industry-specific or process-specific states, such as “out of stock” or “excess of inventory”. In this case, use [indication colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors#indication-colors).
Be aware that the highlight is just an indication. It does not tell users exactly what is wrong. Make sure that you provide this information within the table row, ideally in the same color.
For details on the use of highlight colors, see [How To Use Semantic Colors / Industry-Specific Colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).
(sap.ui.table.TreeTable, aggregation: rowSettingsTemplate)
### Drag and Drop
Drag and drop is “invisible” on the UI: users can’t see where dragging is available and where it isn’t. In addition, there is no generic keyboard interaction. Drag and drop is also not
available on all browsers. For these reasons, provide it only in addition to existing (and visible) UI elements that fulfill the same purpose. For example, offer ([toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-toolbar/)) [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) for moving or for copying and pasting items. These are keyboard operable and available on all browsers.

If you offer drag and drop for rearranging items within a
tree table, use the following options:

- For dropping items as a child, use whole nodes as drop
targets (sap.ui.core.dnd.DropPosition.On).
- For dropping items on the same level, use the space
between items as drop targets
(sap.ui.core.dnd.DropPosition.Between).
- If you want to allow users to drop items as a child or
sibling, offer both drop targets
(sap.ui.core.dnd.DropPosition.OnOrBetween).
This provides better feedback on where the item will be
inserted. Show the “move” mouse cursor
(sap.ui.core.dnd.DropEffect.Move).
Do not combine rearranging items within one level and
sorting. If you really need to do so, make sure there is
a dedicated sort criterion for the user-defined sort
order, and only offer options for rearranging items if
this sort order is set.

Moving items from one node to another can be combined
with sorting without any issues.
#### Visible Alternatives to Drag and Drop

Depending on the functionality you need, use one or more of the following alternatives:

- To move items up or down within a node:
  Use the :slim-arrow-up: _Move Up_ and :slim-arrow-down: _Move Down_ [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) on the [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/). These buttons move the selected items until the first selected item can’t be moved up / the last selected item can’t be moved down any further.
  Depending on your tree, this can make sense for both leaves and nodes, only for leaves, or only for nodes. When moving a node, move the whole node and (if applicable) all its children up or down to the next position within the parent node.
  Always make sure that when the user moves an item in one direction and then moves it back, the order is the same as it was before.
  Do not combine the option to move items up and down with sorting.
- To move items to another node:
  Use _Copy_ and _Paste_ [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) on the [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/).
  Alternatively, offer a _Move To_ [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/). Clicking _Move To_ opens a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) that shows all the nodes of the tree, but no leaves. Selecting an item in this dialog closes the dialog and moves the corresponding items to the selected node.
- To change the level of an item:
  In some trees, such as document structures, users can change the level of an item without affecting the level of parent or child items. In this case, use left and right arrow [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) (:slim-arrow-left: :slim-arrow-right: ).

### Context Menu

Use the context menu only to give users a quick way of accessing functions that are already available elsewhere (for example, as buttons in the toolbar). Don’t just offer actions in the context menu itself, as users might not realize that these actions are available at all.

The context menu can be triggered for the table, row, or cell. However, we do not recommend using context menus for cells: because the content of a cell is a different touch target than the cell itself, opening a cell context menu via touch is quite hard, even in cozy mode.

Do not combine context menus with condensed mode: editable controls fill the entire space inside a cell. Because of this, context menus cannot be opened at all with touch or mouse interaction.

### Tables in Object Pages

In the [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/), you can use a [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#tables-in-object-pages) or [grid](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/) table and offer navigation to a [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) with the previously mentioned table types. We advise you to use the [analytical](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/) and tree tables in tab mode.

For more information on the use of tables within the object page, see the [Tables](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#tables) section of the _Object Page_ article.

### Export to Spreadsheet

On the [table toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/), apps can provide a [menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/#menu-button1) for exporting table data to a spreadsheet. For the export, use the [export to spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/) function.

---

## tree-web-component

Trees provide a way to display and work with basic
hierarchical data. They offer a clear representation of
structured information and are typically used in the main
list for list-detail scenarios, popovers, or dialogs.
## When to Use

Do
Use the tree component:
- To display hierarchically structured items.
- To enable selection of one or more items from a set of
hierarchically structured items.

## Anatomy

### Tree

1. **Header (optional)**: The first item of the tree serves as a header,
and contains the title of the tree.
2. **Node**: Item that contains additional items.
3. **Root**: Single topmost node (level 1).
4. **Leaf**: Item that doesn’t contain any other items.
5. **Expand/collapse icon**: An icon for expanding and collapsing the node
is provided automatically for each node that has child nodes.
6. **Footer (optional**): The last item of the tree can serve as a footer.
### Standard Tree Item

The standard tree item (ui5-tree-item) is the simplest type
of tree item. It provides the most common features, such as
text, icon, and a checkbox or radio button.
1. **Checkbox / radio button**:
- In multiple selection mode, a checkbox is displayed.
- In single selection mode, a radio button is displayed.
2. **Icon (optional)**: You can place an icon at the
beginning of an item (before the text).
3. **Text**
4. **Additional text (optional)**: The tree item can have an
additional text located on the far right of the row
(property: additionalText). You can also apply a semantic
value to this text (property: additionalTextState property).
5. **Delete button**
### Custom Tree Item

If additional components are needed, use a **custom tree item**. The custom tree item allows you to use any combination of components inside the tree.
We recommend sticking with the intended tree design and only inserting additional components within the given tree structure.

## Types

### Standard Tree

Use this variant as a starting point.

### Single Selection

One item in the tree can be selected. To select an item,
you can click anywhere on the item. For single selection,
this is the preferred mode.
Always keep one item selected. The basic single selection
mode doesn’t add any visual indication to the tree. If no
item is selected, it can’t be differentiated from trees
without selection.
### Single Selection with Radio Button

One item in the tree can be selected. For this, the tree
provides radio buttons on the left or right side of each
line item. Use this selection mode only if clicking on
the item triggers something else, such as navigation.
Ideally, always keep one item selected, even in the
initial state.
### Multiple Selection

Allows selection of one or more items. For this, the tree
provides checkboxes on the left side of each line item.
Each item is selected independently of the others.

### Delete

To allow deletion of single items, use the tree in “Delete” mode.
This adds a _Delete_ button :decline: to each item.

Do not use this mode if deleting multiple items at once is the
main use case. Delete cannot be used together with single
selection or multiple selection.
## Behavior and Interaction

The tree is like a list containing hierarchical data. It acts as a container for items, with the possibility to expand and collapse nodes. In addition, the tree changes the indentation per level dynamically when the user expands a node, based on number of levels currently showing.

See the examples for the following variants:

- [Standard Tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/tree-web-component/#standard-tree)
- [Single Selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/tree-web-component/#single-selection)
- [Single Selection with Radio Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/tree-web-component/#single-selection-with-radio-button)
- [Multiple Selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/tree-web-component/#multiple-selection)
- [Delete](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/tree-web-component/#Delete)

## Responsive Behavior

When the width is reduced, item texts can truncate or wrap to ensure that the tree adapts to the new size. For more information, see [Wrapping and Truncation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/interaction/wrapping-and-truncation).

---

## treemap-chart

Treemaps are used to display hierarchical data. The information is displayed as a cluster of rectangles varying in size and color, depending on their data value. The size of each rectangle represents a quantity, while the color can represent a number value or a category. Treemaps are economical in that they can be used within a limited space and yet display a large number of items simultaneously. Treemaps allow you to view trends and make comparisons quickly.

## Usage

Treemaps are one of the most compact and space-efficient options for displaying hierarchies and are also great for comparing the proportions between categories via their size. When there is a correlation between color and size in the tree structure, the user is able to see patterns that would be difficult to spot in other charts.

### Use the treemap if:

- Space is limited and you want to give users an overview of a large amount of hierarchical data.
- You cannot use conventional graphs, such as bar charts, because there are too many items to represent as bars in a single graph or in a series of graphs on one screen.
- You want to offer a quick, high level summary of the similarities and anomalies within one category, as well as between multiple categories.
- You want to enable part-to-whole comparisons.
- You want to enable rough comparisons between top-level categories, as well as comparisons within categories at a lower level.

### Do not use the treemap if:

- You want to enable precise quantitative comparisons. In this case, use the bar chart instead.
- The dataset contains only a small number of categories. In this case, we recommend using the bar chart.
- There is a big difference in the magnitude of the measure values.
- You would like to display negative values. They cannot be displayed in treemaps.

## Responsiveness

The treemap chart is fully responsive. When the size of the screen gets smaller, the labels start to truncate and hide if there is not enough space.

## Color Palette

The treemap chart supports sequential and semantic color palettes.

- Use the [sequential palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/values-and-names/#sequential-palette) to visualize high-to-low values using six shades for up to three measures.
- Use the [semantic palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/values-and-names/#semantic-palette) to show good, bad, and critical values.

## Legend

The treemap chart supports both the legend and value-based legend.

- Use the [legend](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/legend/) if you are using semantic colors.
- Use the [value-based legend](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-value-based-legend/) if you are using the sequential color palette.

## Drilldown

You can let users drill down through the hierarchical data. This is done by selecting a rectangle and pressing the _Drill Down_ button in the chart toolbar.

## Selection and Popover

When the user clicks on a rectangle, all the associated values are displayed in a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/pop-over/). You can also customize the popover to display other information and actions.

---

## upload-set-with-table-plugin

The upload set with table plugin allows users to upload a single file, multiple files, or a directory of files from a device (desktop, tablet, or phone) to an SAP Fiori app.

Despite its name, the upload set with table plugin is not limited to upload scenarios. You can also use it for cases where users can only download files uploaded by other users, due to the context or access rights.

The successor to the upload set control, the upload set with table plugin is enhanced with new features. While the upload set control was designed for the list UI control, the upload set with table plugin was designed to work with the table control.

This plugin can be connected to tables, such as the [grid table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/), the [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/), or the Meta Driven Controls (MDC) table.

**> **Information:** **

For more information, see:
- [MDC table](https://sapui5.hana.ondemand.com/#/entity/sap.ui.mdc.Table) (SAPUI5 samples)
- [MDC table](https://sapui5.hana.ondemand.com/#/api/sap.ui.mdc.valuehelp.content.MDCTable) (SAPUI5 API reference)

*Upload set plugin in a responsive table*

## When to Use

Do
Use the upload set with table plugin:
- To show uploaded files in a table row that can be modified.
- To allow users to add or remove several files, and to change the  | - Instead, use the `sap.ui.unified.FileUploader` control.
file names
- To replace an older or deprecated control:
- `sap.ca.ui.FileUpload`
- `sap.m.UploadCollection` (deprecated since SAPUI5 version 1.88.
- `sap.m.upload.UploadSet`
## Upload Actions

The plugin offers the following upload actions:
- *Upload* for uploading files from the local file system
- *Upload from Cloud* for uploading files from the
connected cloud workspace account
### Additional Actions
Additionally, you can provide an action to:
- Download a file
- Rename a file
- Add a URL: The URL is used to create the file
**> **Hint:** **

You implement the additional actions with the following public APIs:
- [Download a file](https://sapui5.hana.ondemand.com/#/api/sap.m.plugins.UploadSetwithTable%23methods/download)
- [Rename a file](https://sapui5.hana.ondemand.com/#/api/sap.m.plugins.UploadSetwithTable%23methods/renameItem)
- [<u>Upload a file without content</u>](https://sapui5.hana.ondemand.com/#/api/sap.m.plugins.UploadSetwithTable%23methods/uploadItemWithoutFile)
- [<u>Upload a file via a URL</u>](https://sapui5.hana.ondemand.com/#/api/sap.m.plugins.UploadSetwithTable%23methods/uploadItemViaUrl)

## File Preview

Users can preview uploaded files with a specialized file preview dialog control that displays the file content.
The plugin supports the preview for only specific file types listed in the [FilePreviewDialog](https://sapui5.hana.ondemand.com/#/api/sap.m.upload.FilePreviewDialog) (SAP UI5 API reference).

## Behavior and Interaction

### Uploading Files

The users drop files onto the table area or they click the *OK* button in the file selection dialog.

Depending on the working mode that the application development team uses for the upload set, the user experience differs slightly:

- With the **default** working mode, instant upload, the files are uploaded immediately.
- With the working mode, manual upload with item validation, a dialog is displayed with the files that the users selected. In the dialog, users can confirm or cancel the upload and:
  - Browse for additional files to upload
  - Select the type for the documents that they are uploading
  - Delete the items selected for upload

If some users are allowed only to download the files that others have uploaded, you can disable the upload option.

The upload set with table plugin allows you to use a custom uploader, unlike the deprecated upload collection control,

**> **Hint:** **

You implement the additional actions with the following public APIs:
- The default working mode is instant upload.
- For manual upload, where the users trigger the upload explicitly and with item validation callback, configure the `itemValidationHandler`. The selected files are uploaded only after a promise from the callback is resolved.
- The Boolean property, `uploadEnabled `controls whether or not users can upload files.

#### Empty State

If the table is empty, the plugin provides an [illustrated message](https://www.sap.com/design-system/fiori-design-web/ui-elements/illustrated-message/) that tells the users to upload files by dragging and dropping them into a large zone in the table area or by using the *Upload* button.

*Table with an empty state*

#### Drag and Drop

To start the upload, users can select one or more files from their computer and drag them onto the table’s drop area. The same process is used as the one for the *Upload* button.

*Dragging a file into a table*

### Previewing Files

To preview files, users click the file name of the attachment. The preview opens in a dialog.

When necessary, on mobile devices, a dialog opens where users can select an app that supports the respective file type, such as \*.doc or \*.pptx.

**> **Hint:** **

The API openFilePreview integration or configuration is essential for previewing files. For example, the openFilePreview API is invoked when the file name is
clicked.
For more information, see the [openFilePreview](https://sapui5.hana.ondemand.com/#/api/sap.m.plugins.UploadSetwithTable%23methods/openFilePreview) API reference.

### Renaming Files

The *Rename* action works identically on desktop and mobile devices.
The action is enabled when the user selects an entry from the table.
It opens the *Rename Document* dialog.
### Adding a URL

The users can upload a file using a URL, rather than a
file. The URL is then used to create the file.
*Add a URL dialog*

**> **Hint:** **

- The API `uploadItemViaUrl` returns a promise that initiates an upload when it is resolved.

---