# SAP Fiori UI Elements: Pickers

This reference covers the following UI components:

- [Calendar](#calendar)
- [Calendar Date Interval](#calendar-date-interval)
- [Calendar Web Component](#calendar-web-component)
- [Planning Calendar](#planning-calendar)
- [Single Planning Calendar](#single-planning-calendar)

---

## calendar

The calendar control lets users select a single date, multiple days, entire week(s), or a date range. The calendar shows all time-related data (year, month, week, day, date) at a glance. It also allows users to navigate directly from one month or year to another, or to display multiple months.

## When to Use

### Use the calendar if:

- You want the user to select a single date, multiple days, entire week(s), or a date range.
- You want to display multiple months at once.
- The calendar always needs to be visible and prominent.
- Users need to see the year, month, week, weekday and date at a glance to decide which date to select. For example, a user might want to select a date based on the day of the week.
- Users might be used to different locale-specific date formats (such as day-month-year or month-day-year). Enabling them to select the date visually using the calendar bypasses format-specific interpretation.
- You want to highlight special days or hide/disable specific days.

### Do not use the calendar if:

- The user is a power user who has to enter a lot of data fast. In this case, use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/).
- The keyboard is the primary input device. In this case, use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/).
- The available screen space is limited and displaying the calendar permanently would take up too much space.
- The user’s primary goal is to select a date range. In this case, use [date range selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/).
- You want to display a range of weekdays in a single row. In this case, use the [calendar date interval](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/calendar-date-interval/).
- The user wants to compare calendars from different people. In this case, use the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/).
- The user wants to select combined date and time values. In this case, use the [date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/).

## Components

The calendar can stand alone as a control, but is also part of many other controls, such as the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/), [date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/) or the [date range selector](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/).

By default, the focus starts on the current day, but can be customized to fit the use case.

The control allows you to show or hide the calendar weeks. You can also customize the calendar by defining the start and end of a week, or by defining the earliest or latest date.

Specific days can also be disabled, for example non-working days or public holidays.

### Month and Year View

The control offers a day view, month view, year view, or year ranges.

_Month view_          | _Year view_          | _Year range_

### Legend for Highlighted Days

Within the calendar, special days can be highlighted. A legend is used to define the meaning of the highlights. Application development teams are responsible for using the colors consistently within one product area.

## Types

The following calendar types are available:

- **Single day selection:** The user can select a single day at a time.
- **Single interval selection:** The user can select an interval or one entire week.
- **Multiple day selection:** The user can select multiple days, which do not have to be next to each other. It’s also possible to select entire week(s) and a date range.
- **Multiple months:** Use this calendar type if users need to see more than one month to make their selection. You can offer single day selection or multiple selection (such as multiple days, entire weeks, or date ranges). We recommend showing no more than two or three calendars at the same time.

Columns
_Single day selection_          | _Single interval selection_          | _Multiple day selection_          | _Multiple month view_
## Behavior and Interaction

The behavior and interaction of the calendar depends on the calendar type. Some interactions are only available for specific calendar types.

### Selecting a Single Date
Clicking the date selects it. Clicking the date again
deselects it.
### Selecting a Single Interval
The user selects a single interval by clicking the first
and last day of the date range, which also selects all
the days in between. Alternatively, the user can select
two different dates and press **Shift\+Enter** twice.
### Selecting an Entire Week
To select an entire week, the user clicks the number for calendar week
(if displayed). Alternatively, the user can select one day within the
week and press **Shift\+Space** simultaneously.
### Selecting Multiple Days
Multiple days are selected by clicking the desired days
individually. Clicking the selected days again deselects
them.
### Changing Months
If the current month is selected, the view changes to the
month view and the user can change the month. By clicking
a month, the user changes the month and the view changes
back to the day view.
Clicking the arrow in the day view of the calendar shows
the next month of the same year.

### Changing Years
Clicking the current year changes the view to year view.
When the user selects a year, the view changes back to
the day view.
Clicking the arrow in the month view shows the same
selected month in the next year.

Clicking the year range changes the view to year range
view. When the user selects a year range, the view
changes back to the year view.

Clicking the arrow in the year view shows the next year
range, changing in increments of 20 years.

Clicking the arrow in the year range switches to the next
180 year span.

## Responsiveness

Use the calendar within a responsive layout container. The calendar control itself is not responsive.

When using the multiple month view, the calendar adapts to the size of the screen. On small screens, only one calendar is displayed.

## Related Topics

- [Date Picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/) (guidelines)                       | - [Calendar](https://ui5.sap.com/?sap-ui-layer=VENDOR\&sap-ui-theme=sap_belize#/entity/sap.ui.unified.Calendar) (SAPUI5 samples)    | - [Date Picker](https://wiki.one.int.sap/wiki/pages/viewpage.action?pageId=2804200609) (visual design specification)
- [Date Range Selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/) (guidelines)     | - [Calendar](https://ui5.sap.com/?sap-ui-layer=VENDOR\&sap-ui-theme=sap_belize#/api/sap.ui.unified.Calendar) (SAPUI5 API reference) | - [Calendar – Legend](https://wiki.one.int.sap/wiki/display/visualcore/Calendar\+%28Horizon%29\+-\+Legend) (visual design specification)
- [Calendar Date Interval](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/calendar-date-interval/) (guidelines)
- [Planning Calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/) (guidelines)
- [Date/Time Picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/) (guidelines)
- [Time Picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/time-picker/) (guidelines)
- [Date Picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/) (guidelines)                       | - [Calendar](https://ui5.sap.com/?sap-ui-layer=VENDOR\&sap-ui-theme=sap_belize#/entity/sap.ui.unified.Calendar) (SAPUI5 samples)
- [Date Range Selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/) (guidelines)     | - [Calendar](https://ui5.sap.com/?sap-ui-layer=VENDOR\&sap-ui-theme=sap_belize#/api/sap.ui.unified.Calendar) (SAPUI5 API reference)
- [Calendar Date Interval](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/calendar-date-interval/) (guidelines)
- [Planning Calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/) (guidelines)
- [Date/Time Picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/) (guidelines)
- [Time Picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/time-picker/) (guidelines)
---

## calendar-date-interval

The calendar date interval displays a range of days in a single row. The control allows the user to select a single day, multiple days, or a range of days. Content corresponding to the date selection is usually displayed below the control. The user can navigate the date intervals by browsing through them (using the _Previous_ and _Next_ arrows), or by going directly to a specific month or year.

Compared to the regular [date range selection](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/) control, this control offers a flexible date range and consumes very little vertical space. You can also adapt the width to fit the available horizontal space.

## When to Use

### Use the calendar date interval if:

- You use the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/calendar/) or [single planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/). Both use the calendar date interval internally.
- You want to display a range of days in a single row.

### Do not use the calendar date interval if:

- The user simply needs a calendar. Use the [calendar](https://wiki.wdf.sap.corp/wiki/display/visualcore/Calendar+\(Fiori+3\)+-+Date+Picker) instead.
- The user wants to pick a single date out of a calendar view. Use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/single-planning-calendar/) instead.
- The user wants to pick a date and time. Use the [date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/) instead.
- The user wants to pick a date range out of a calendar view. Use [date range selection](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/dynamic-date-range/) instead.
- The user wants to set a dynamic date, such as “last x months”. Use the [dynamic date](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/) instead.

## Layout

The date interval control is divided into two main areas: date interval navigation, and date interval display and selection.

The navigation area contains two arrows (one to the left,
one to the right), which allow the user to navigate
easily to the previous and next date ranges. This area
also contains month and year indicators, which display
the currently selected month and year. These indicators
trigger the month and year navigation mode of the
control.
The display/selection area is primarily used to display
the range of days in the current date interval. You can
also display a second row to show the calendar week
(property: `showWeekNumbers`). When the user triggers
month or year navigation, a range of months or years is
displayed in this section to enable easy interval
navigation.
## Components

### Current Day

The current day is highlighted by a colored frame.
Weekends are shaded in a slightly darker gray.

### Special Days

You can mark special days, such as public holidays, with
a colored line along the lower edge.

## Behavior and Interaction

The behavior and interaction of the calendar date interval control can be divided into two parts: navigation and selection.

### Navigation

#### Previous/Next

The user clicks the _Previous_ or _Next_ arrow to replace the currently displayed date interval with the previous or next date or period. _Previous/Next_ navigation can be used while the user is in selection mode, as well as in month, year, or year interval navigation mode.

#### Navigation by Month
The user triggers month navigation mode by clicking the month link
above the date range interval. The currently selected month is
highlighted. Clicking a month switches the date range interval to
the selected month. The user can browse the months by clicking the _Previous_ and _Next_ arrows.
#### Navigation by Year
The user triggers year navigation mode by clicking the year link
above the date range interval. The currently selected year is
highlighted. Clicking a year switches the date range interval to
the selected year. The user can browse the years by clicking the _Previous_ and _Next_ arrows.
#### Navigation by Year Interval
The user triggers the year interval navigation mode by clicking
the year interval above the year selection area. The year
interval containing the currently selected year is highlighted.
Clicking a year interval switches the year range to the selected
set of years. The user can browse the year intervals with the _Previous_ and _Next_ arrows.
### Selection

The calendar date interval control can be set up for single day selection, multiple day selection, or date range selection.

#### Single day
The user clicks an unselected day to select that
particular day and deselect all previously selected days.
Clicking a selected day a second time removes the
selection. Only one day can be selected at a time. The
selected day is highlighted.
#### Multiple days
The user clicks an unselected day to select that
particular day. Clicking a selected day a second time
removes the selection. Multiple days can be selected.
Selected days are highlighted.
#### Date range
The user clicks an unselected day to select the start
date. Clicking a second unselected day selects the end
date. Both the start and end dates are highlighted. The
days in between are highlighted in a lighter color. The
minimum range is one day and only one range can be
selected at a time.
## Responsiveness

The horizontal space occupied by the control is already minimal, so the responsiveness is limited to the width of the control.

On small screens, the maximum number of days per range interval is automatically reduced to eight.

_Cozy_          | _Compact_
## Examples

---

## calendar-web-component

The calendar shows time-related data
at a glance. It allows the user to
select a single day, multiple days,  | _Calendar_
or date ranges and to navigate
through different months and years.
## When to Use

Do
Use the calendar:
- To select a single date, multiple days, or a date range.
- To enable date selection independently of the specific
date format.
- To enable context-based selection (such as a specific
day of the week).
- If you need to keep the calendar visible and prominent.
## Anatomy

1. **_Previous_ button**: Navigates back to previous month.
2. **Month view button**: Opens the view for month selection.
3. **Year view button**: Opens the view for year selection.
4. **_Next_ button**: Navigates to next month.
5. **Days of the week**
6. **Calendar weeks**: Gregorian calendar type only. Can be hidden.
7. **Working day**
8. **Selected day**
9. **Today**
10. **Non-working day**
11. **Days from next month**
## Types

You can show one calendar type or two:
- **Single calendar type**: Gregorian, Japanese, Buddhist, Islamic, or Persian | _Islamic calendar_ | _Calendar with a secondary calendar
- **Two calendar types**: A primary and a secondary calendar                   |                    | type_

You can hide the calendar weeks. They
are hidden by default for all
calendar types except the Gregorian   | _Calendar with hidden calendar weeks_
calendar.
## Behavior and Interaction

### Selection

The calendar supports different types of selection:

- **Single day**: The user can select a single day at a time.
- **Multiple days**: The user can select multiple days, which do not have to be next to each other. Navigating to other months doesn’t cancel the selection.
- **Range**: The user can select multiple days from a start date to an end date.

_Selection of a single day_ | _Selection of multiple days_ | _Range selection_

### Navigation

To change the month, the user can
either use the previous/next arrows
or select a specific month in the
month view.
To change the year, the user can
either scroll through the months with
the previous/next arrows or select a
specific year in the year view.
### Minimum and Maximum Dates

You can define the earliest and
(minimum and maximum dates).
Selection and navigation are then
disabled for dates outside this
range.
## Responsive Behavior

Use the calendar within a responsive layout container. The calendar itself is not responsive.

---

## planning-calendar

The planning calendar allows users to see different appointments at the same time and to create new appointments. It allows the user to display appointments for several objects, such as a team calendar, and compare them to each other.

## Usage

### Use the planning calendar if:

- You want to compare objects of the same type with each other over a period of time.
- You require responsive behavior.
- You have less than 100 lines in the calendar.

### Do not use the planning calendar if:

- You want to show a calendar for one object and a detailed overview of appointments over a long time interval.
- You want to show a complex or graphical representation. In this case, please use the [Gantt chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/gantt-chart/).
- You have more than 100 lines in the calendar. In this case, please use the [Gantt chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/gantt-chart/).

## Responsiveness

In size S, the control provides pop-in behavior, which allows the user to see as many appointments as possible and to connect them with the corresponding object. If the toolbar contains too many actions for the space available, the overflow icon appears.

The interval section displaying the hours, days, and months is responsive and shows 12 values in size L, 8 values in size M, and 6 values in size S. You can override this behavior, but you should then check that the responsiveness is still working.

## Types

You can define what size of interval the calendar should show, and whether multi selection should be possible. Additionally, the row header and the interval appointments are optional.

The control allows multi-select mode to be shown for the list items. This can be used, for example, to delete multiple objects from the view.

An app development team must decide whether to show the planning calendar with or without multi-select mode, or whether users should be able to switch between the two modes. Hiding the interval appointments of every object is optional.

The planning calendar can also be used without a row header. In this case, the row header disappears and only the appointments are visible. It can be used to show the calendar of one object. Note that the control was built mainly to compare time slots of different objects. For this reason, the time axis is shown horizontally and, depending on the interval, the appointments might shrink to smaller size. In this case, the text is cut off rather than truncated.

## Components

This section describes the various components of the planning calendar.

The control consists of different parts:

1. Header
2. Toolbar
3. View switch
4. Navigation
5. Time strip for hours/days/months
6. Row header
7. Row
8. List item
9. Interval appointment
10. Appointment

**1. Header**

The header contains the toolbar and the navigation.

**2. Toolbar**

The toolbar consists of the calendar title (optional) and the toolbar actions, including a default view switch. You can add generic and app-specific actions that are relevant for your use case (such as creating an appointment, search, settings, showing the calendar legend, and so on). Always place actions that affect the entire calendar in the toolbar.

For more information, check out the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) guideline article.

The generic actions are as follows:

_Add New Contact_ (icon: add-contact)
_Multi-Select Mode_ (icon: multi-select)
_Legend_ (icon: legend)
_Settings_ (icon: action-settings)
_Full Screen_ (icon: full-screen/exit-full-screen)

**3. View switch**

The view switch allows the user to switch between different time intervals (calendar views). Depending on the number of available calendar views, the view switch can be a segmented button (four views or less) or a select control (five views or more).

The _1 Month_ view shows an entire month. On desktop devices, the _1 Month_ view always displays an interval of 31 days. When the displayed month is shorter (28, 29, 30 days), days from the following month are displayed. They have a different visual state and serve as navigation to the following month.

The _1 Month_ view has an additional style for half-column appointment distribution, which is mainly used to avoid overlapping. The property `appointmentRoundWidth` can be set to “HalfColumn” or “None” (default). Currently, the width of the appointment is always rounded to 12 hours.
Note: This property is also applied when the calendar interval type is _Days_ and the view shows more than 20 days.

On size M and Size S, the _1 Month_ view is adaptive. It consists of a calendar and a list of appointments for the selected day.

If you offer the _1 Week_ view, we strongly recommend displaying a different number of days in the _Days_ view (more or less than seven). Otherwise, the user might be confused, as navigation for the two views differs.

The default calendar views are _Hours, Days, Months, 1 Week,_ and _1 Month_. The app developer can choose which views to include, depending on the use case, and how many values are shown for each view. App developers can change the default number of values shown, but they should then ensure that the app is still responsive. The app developer can also create custom views.

**Relative views**

When you need to display a period that is not connected to a certain time/date, you can map the calendar to relative dates (in contrast to absolute dates, such as, “Week 1”, “Week 2”). For example, when you would like to divide the year into quarters.

The application developer specifies the names of the intervals in the time strip and the index picker, as well as the size of the interval. The index picker then configures how many days are in one interval. All this happens in the PlanningCalendarView, once the newly created _relative_ property is set to “true”.

In addition, the application developer sets a _minDate_ in the planning calendar, determining the start date of the relative views.

**4. Navigation**

The navigation area contains back and forward arrows, the _Today_ button, a date interval link, and the time strip. Clicking the _Today_ button takes the user to the period containing the current day. Clicking the date opens a date picker for direct navigation.

**5. Time strip for hours/days/months**

The time strip reflects the selected view, and shows the hours, days or months that are currently visible. The first day of the week can be defined. If not defined, the default is taken from the current user locale.

In all views that show days (_Days, 1 Week, 1 Month_), you can display calendar weeks in an extra line below the time strip (property: `showWeekNumbers`).

**6. Row header**

The row header identifies the object for which the appointments are shown. It pops in if there is not enough space. The row header can contain a picture or icon, a title, and a subtitle.

You can also add an action on the row header (event: `rowHeaderClick`).

**7. Row**

The row contains all appointments for an object. You can turn the alternating row coloring on or off. By default, the alternating rows option is turned on.

**8. List item**

The list item contains the row header, row, appointments, and interval appointments. Each row can show different working and non-working days.

If the users have a specific working schedule, the non-working days can be different on each row. This can be applied not only for weekends, but also for non-working days based on specific schedule differences.

**9. Interval appointment**

Each row can also have interval appointments, which differ from half-sized appointments visually and in that they are always at the top of the row. Interval appointments can be used to show appointments that last for a longer period of time, such as vacations or workshops.

You can opt to hide the space reserved for interval appointments if no such appointments exist for that time period.

**10. Appointment**

Appointments consist of an icon or picture, a title, and a subtitle. Concurrent appointments are shown one above the other.

There are four types of appointments:

- Regular: Displayed in two rows. One-row display is also possible if the `appointmentsReducedHeight` property is set to “true”.
- Half-size: Always displayed in one row, shows the title.
- Large: Always displayed in three rows, also shows the description for each appointment (if available).
- Automatic: The number of rows is determined automatically.

- Table

- Appointment Info

- Title only

- Title \+ text
or:
Title \+ description
- Title \+ text \+ description

You can define the colors for different appointment types. \Appointments can also be set to tentative.

The control can register a click event on the appointment, but the app development team must define what happens next.

In the _Months_ view, appointments within the same calendar week are combined to save space. The combined appointment shows the number of appointments in the same week. If an appointment takes place between two calendar weeks (for example, from Sunday to Monday), it is not included in the combined appointments for either calendar week.

A list of the appointments in a combined appointment can be shown in a popover. However, this must be implemented by the app team. The control only provides the click event.

If necessary, you can disable combined appointments (property: `GroupAppointmentsMode`, value: “Expanded”).

Users can copy and paste appointments to a new position in the planning calendar using keyboard combinations (**Ctrl**/**Cmd** + drag and drop to the new position).

### Planning Calendar Legend

To show the types for days and appointments, the planning calendar uses a specific legend control
(`sap.m.PlanningCalendarLegend`).

Users open the planning calendar legend using a standard legend button in the toolbar (:legend: ). Like all other actions in the toolbar, the app developer must add
the legend button explicitly.
The app team also needs to decide which container to use for the planning calendar legend. We recommend placing the legend in a popover to keep the context. You can
also use a dialog, or, if there is sufficient screen real estate, show the legend as [dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/).
The planning calendar legend has two non-collapsible sections containing legend elements. By default, these are called _Calendar_ and _Appointments_. The app developer can configure the section names using the `itemsHeader` and `appointmentItemsHeader` properties. If no elements are available for a section, it is not displayed.
The _Calendar_ section contains standard legend items: _Today_, _Working Day_, _Non-Working Day_, and _Selected_ (only in the 1-month view on mobile). The app team must ensure that the _Selected_
element is added to the planning calendar legend when the planning calendar is viewed in 1-month mode in a smartphone size. This is not provided by the control. If
any of the standard legend items are not needed, you can switch them off (property: `standardItems`).
You can also apply colors for special days in the _Calendar_ section. The planning calendar legend does not automatically use the colors defined for special days in the planning calendar – this must be done by the app team.
> **Guideline:** Ensure that colors are used consistently within your product area.

The _Appointments_ section contains the color values for the
available appointment types. The app developer has to define
explicitly which color represents which type. The planning
calendar legend does not take the color automatically from the
planning calendar.
If combined appointments in the calendar are of the same type (in _Months_
view), they take the color of that type. Combined appointments of
different types are marked gray. We also recommend adding the gray
color for mixed combined appointments to the _Appointments_ section in the legend.
> **Hint:** To prevent waiting time, app developers should load the sap.ui.unified library.

## Behavior and Interaction

To create an appointment, the user must trigger an action by clicking the _Create_ button in the toolbar. You can also configure the control to create a new appointment when the user clicks directly on a row.

The user can click the appointment to see further details. The app development team must define what kind of information is then shown. For example, clicking an appointment can trigger a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) with detailed information.

Users can select more than one appointment at a time via **Ctrl/Cmd + click**. If the `multipleAppointmentsSelection` property is set to “true”, every appointment that the users click is selected.

A multi-select toggle can also be provided in the toolbar. This can be used, for example, to select multiple people in order to delete them from the planning calendar.

Various tooltips can be shown, but you should not use them to show additional information because users cannot access this functionality on touch devices.

Depending on the current visible interval, appointments might be smaller and the text cut off. The user can click the appointment to see the details.

#### View switch

The user can change the calendar view with the select control (dropdown). For example, to get an overview of a whole year, the user selects the _Months_ view. Which view is most useful depends on the average length of appointments and the use case.

#### Today

The user can trigger this action to go back to the current date/moment.

#### Back and forward navigation

The arrows allow the user to navigate to the next or previous interval.

#### Date picker

The user can open a date picker to select the start time for the visible interval. What is shown initially in the picker differs depending on the view. The current day is marked.

### Snapping Header
The header area of the planning calendar can remain fixed
on top of the screen (property: `stickyHeader`), which
allows users to view calendars with a lot of rows without
losing the context.
### Drag and Drop

Drag and drop can be used to move appointments (to enable Drag and Drop use property: `enableAppointmentDragAndDrop`). Moving an appointment automatically changes its start and end times (for example, if an appointment is scheduled from 1:00-2:00 PM, the user can drag it and change the time from 2:00-3:00 PM) . When dragged, the appointment is shown as a ghost element on the mouse cursor. Drop target areas are indicated to the user with a placeholder.

In the “Hours” view, the appointments can be moved to a specific new time, with the placeholder snapping at every 30 minutes. In the “Days” view, the appointment can be moved to a different day. The placeholder indicates the target day. On drop the appointment is moved to that day but keeps its previous start and end hour. The interaction is the same for the “Months” view. The placeholder indicates the target month and, when dropped, the appointment is moved to that month. The start and end hour and start and end day remain the same.

Appointments can be moved between rows. Note that additional coding may be needed to determine whether all calendar users will be able to perform this action.

Users can create new appointments by clicking, dragging and releasing on an empty space in the content area. The control also allows users to change the duration of an appointment by clicking and dragging one side of the appointment container. These two options are only available for desktop devices.

Combined appointments and interval appointments are not draggable.

Drag and drop is only available on supporting browsers.

> **Warning:** To comply with the new [WCAG 2.2](https://www.w3.org/TR/WCAG22/) accessibility standard, the control must offer an alternative to the drag and drop feature. Provide direct access via keyboard shortcuts, which
enables single pointer users to make use of virtual on-screen keyboards. Alternatively, use a popover for appointment information and a dialog for creating appointments. For an example, see [Planning Calendar – With Appointments Modification](https://ui5.sap.com/#/entity/sap.m.PlanningCalendar/sample/sap.m.sample.PlanningCalendarModifyAppointments).

## Guidelines

### Switching the Row Header

To enable end users to rearrange the planning calendar by switching the row header, you can implement a flexible row header. **This is not done by the control and must be implemented by the app development team.**

The list items in the row header can be a value of any attribute of an appointment. The appointment attributes are part of app-specific content, so they should be specified by the app development team. The control does not provide default attributes.

Our guideline is to use the [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) control in the place of the calendar title. The select control will contain all the attributes that can serve as the row header. When a different attribute is selected, the calendar is rearranged accordingly. You can also add a counter after the list items to indicate how many appointments fall into a specific group.

It is also possible to have both the calendar title and select control, in which case you should have first the title and then the select.

On small screen sizes, use select instead of the calendar title. If you want to keep the calendar title, place select in the overflow menu.

#### Select control in place of the title

Carousel (full-width)

---

## single-planning-calendar

The single planning calendar is a scheduling control that displays the calendar of a single person or resource over a day, work week, or week. Users can view appointments, create new appointments, and delete appointments.

## Usage

### Use the single planning calendar if:

- You want to enable users to schedule or monitor the calendar of a single person or resource.
- You want to offer multiple calendar views (day, work week, week).

### Do not use the single planning calendar if:

- You want to compare objects of the same type over a given period (for example, appointments for multiple persons or resources). In this case, use the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/).
- The main use case is to schedule all-day appointments, and you don’t need to see an hour axis. In this case, use the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/).
- You need a complex graphical representation or planning application involving activities, resources, hierarchical project structures, relationships, and so on. In this case, use the [Gantt chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/gantt-chart/).

## Responsiveness

The single planning calendar is responsive and supports the cozy and compact [density modes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

### Overflow Behavior

On smaller screens, the custom toolbar utilizes the overflow behavior of the standard SAP Fiori [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow-generic).

If the available actions do not all fit into the available space on the toolbar, an overflow menu button appears on the right of the toolbar. The rightmost actions move into the overflow menu first.

## Components

The single planning calendar consists of the following components:

1. Header
2. Toolbar
3. View switch
4. Navigation
5. Date strip
6. All-day appointment
7. Timeline
8. Appointment
9. Calendar grid
10. Now marker
> **Hint:** To prevent waiting time, app developers should load the sap.ui.unified library.

#### 1. Header

The header contains the toolbar and the navigation.

#### 2. Toolbar

The toolbar consists of the calendar title (optional) and the toolbar actions, including a default view switch. You can add other app-specific actions that are relevant for your use case (such as creating an appointment, search, filter, settings, showing the calendar legend, and so on). Always place actions that affect the entire calendar in the toolbar.

#### 3. View switch

The view switch allows the user to switch between different time intervals. The default views are day, work week, week, and month. The app developer can choose which views to include, depending on the use case.

In the month view, all appointments for the respective day have the same width and height. Each grid cell can hold 4 appointments in compact mode and 3 appointments in cozy mode. The remaining appointments can be accessed with a # More link. In month view, all-day appointments look and behave like regular appointments.

You can also create custom views by setting a different number of visible columns in the grid. We only recommend doing this if your use case really requires it. You must also ensure that any custom views are responsive. For anything over 7 days, provide an alternative view for size S.

> **Hint:** If no view is set by the application developer, the single planning calendar renders the week view. If the
application developer sets only the day view, the week view is not visible.

#### 4. Navigation

The navigation area contains back and forward arrows, the _Today_ button, a date interval link, and the date strip. Clicking the Today button takes the user to the period containing the current day.

#### 5. Date strip

The date strip is the horizontal axis of the calendar grid, showing the currently visible day or days. Non-working days are a darker color.

Default (col-1)

#### 6. All-day appointment
All-day appointments are appointments that take up 24 hours. They are located in a dedicated area below the date strip and above the first hour of the timeline.
The option to create all-day appointments must be added at application level. Consider using a switch or checkbox that automatically sets the start and end time of the appointment to 00:00. We recommend reflecting this
in the UI for creating the appointment as well. For example, offer a date picker instead of a date/time picker for selecting the start and end of the appointment (as shown in the sample dialog).
There is no limit of the height of the all-day appointments area. However, if your use case involves a lot of all-day appointments (and their area takes up most of the screen), consider using the [planning calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/) instead.
#### 7. Timeline
The timeline is the vertical axis of the calendar grid, showing the hours.

#### Creating an All-Day Appointment - Sample Dialog

Carousel (full-width, col-2)

Section Metadata

style

#### 8. Appointment
Each appointment can have an icon or image, a title, and
a subtitle. If there is not enough horizontal space for
the text, it is truncated. If an appointment has an icon,
the icon remains visible as long as there is space for
it, even if that does not leave enough space for the
title. If there is not enough vertical space, the
subtitle is not shown.
Appointments vary in height, depending on their duration,
and in width, depending on how many appointments take
place simultaneously. The minimum height of an
appointment corresponds to a 30-minute appointment.
The app can set up to 20 types of appointments. Each type
has its assigned color. Always choose appointment types
with contrasting colors. Make sure that each type is also
represented as a text, and not only by the color.
#### 9. Calendar grid
The calendar contains the appointments and all-day
appointments, and is controlled by the currently selected
view. Non-working days have a darker background color in
the calendar grid.
#### 10. Now marker
The now marker is a horizontal line through the calendar
grid, which indicates the current time. The current time
is visible on the timeline. If the current time falls
within 15 minutes of a full hour, it replaces the full
hour.
### Single Planning Calendar Legend

Default (col-1)

You can highlight special days within the calendar. A legend is used to define the meaning of the highlights. Users
open the legend using the legend icon button in the toolbar ( :legend: ). Like all other actions in the toolbar, the
app developer must add the legend button explicitly.

Default (col-1)

For details, see the legend sections for the [Planning Calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/#planning-calendar-legend) and [Calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/calendar/#legend-for-highlighted-days).

> **Guideline:** Ensure that colors are used consistently within your product area.

Default (col-2)

Section Metadata

style

## Behavior and Interaction

### Date Picker

The visible period is indicated with the date interval link in the navigation. Clicking the link opens a date picker, which helps the user to navigate quickly to a specific day or week.

### Creating an Appointment

We recommend offering a _Create_ action in the toolbar.

The UI for creating the appointment must be implemented at app level. The control provides only the underlying functionality for creating appointments. For most use cases, a dialog works best and is recommended (see sample dialog below).

#### Sample Dialog for Creating an Appointment

Carousel (full-width)

### First day of the week

You can set the day that displays as the first day of the week in the week and month views. Valid values are 0 to 6, starting with Sunday. If no value is set, the default of the used locale is used.

### Zooming

To make appointments easier to read, you can implement the zoom behavior using the controls [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/), [step input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/step-input/), or [slider](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/slider/).

The `scaleFactor` property controls the zoom level. Its values can be numbers from 1 to 6. The number represents a multiplier for the height of the rows.

### Viewing Appointment Details

The UI for viewing appointment details must be implemented at app level. The control provides only the underlying functionality for displaying appointment details. We recommend using a popover to keep the context for the user (see sample popover below).

#### Sample Popover for Viewing Appointment Details

Carousel (full-width)

### Working Hours

You can opt to set working hours in the single planning calendar (properties: `startHour`, `endHour`). The non-working hours then have a different background and can be hidden (property: `fullDay`). You can also give the user the option to toggle between working and non-working hours. We recommend offering a toggle button in the toolbar (the button must be added by the app team).

#### Working Hours vs. Full Day

Carousel (full-width)

### Sticky Header

To keep the context when the user scrolls down the calendar, the header area of the single planning calendar can remain fixed at the top of the screen (property: `stickyMode`).

At app level, you can choose to have the entire header area sticky (value: `All`) or only the Navigation area (value: `NavBarAndColHeaders`).

### Drag and Drop

You can enable drag and drop for moving appointments (property: `enableAppointmentDragAndDrop`). Moving an appointment changes its start and end times (for example, if an appointment is scheduled from 1:00-2:00 PM, the user can drag it and change the time slot to 2:00-3:00 PM). When dragged, the appointment is shown as a ghost element on the mouse cursor. A placeholder indicates the target drop area.

Appointments can also be dragged from or to the area for all-day appointments. When the user drags an all-day appointment to the planning area, a placeholder shows the duration of the appointment after dropping (default = 1 hour). Similarly, dragging a regular appointment to the all-day appointments area transforms it into an all-day appointment (default = 1 day).

For desktop devices, you can also enable the following options:

- Allow users to create new appointments by clicking, dragging, and releasing on an empty space in the content area (property: `enableAppointmentsCreate`).
- Allow users to change the duration of an appointment by clicking and dragging one side of the appointment (property: `enableAppointmentsResize`).

> **Warning:** To comply with the [WCAG 2.2](https://www.w3.org/TR/WCAG22/) accessibility standard, the control must offer an alternative to the drag and drop feature. Provide direct access via keyboard shortcuts, which enables single
pointer users to make use of virtual on-screen keyboards. Alternatively, use a popover for appointment information and a dialog for creating appointments. For an example, see [Single Planning Calendar – Create and Modify Appointments](https://ui5.sap.com/#/entity/sap.m.SinglePlanningCalendar/sample/sap.m.sample.SinglePlanningCalendarCreateApp).

---