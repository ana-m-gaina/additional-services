# SAP Fiori UI Elements: Navigation

This reference covers the following UI components:

- [Breadcrumb](#breadcrumb)
- [Breadcrumbs Web Component](#breadcrumbs-web-component)
- [Carousel](#carousel)
- [Carousel Web Component](#carousel-web-component)
- [Wizard](#wizard)

---

## breadcrumb

A breadcrumb (or breadcrumb trail) is a type of secondary navigation that indicates the position of a page in its application hierarchy. It is typically used for drilldown scenarios where users navigate through related object pages, tables, and charts.

## Usage

### Use a breadcrumb if:

- You want to show secondary navigation on the object page
- You want to show navigation in a table
- You want to show navigation in charts

Use a breadcrumb only when the drilldown scenario leads to related object pages: **parent object page / child object page 1 / child object page 2 / child object page 3**.

### Do not use a breadcrumb if:

- Your hierarchy contains only one level.

### Do not include these elements in your breadcrumb path:

- Other floorplans, such as overview pages and list reports
- Cross-application navigation to other object pages
- Standalone object pages, such as fact sheets

These cases are covered in the global navigation concept for SAP Fiori 2.0.

## Responsiveness

Breadcrumbs are responsive. If there is insufficient horizontal space, the links in the breadcrumb trail collapse into a dropdown menu ([sap.m.Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/)):

- The first link in the breadcrumb (the point of origin) collapses first, followed by the next link in the hierarchy.
- The last element in the breadcrumb is always visible, and should never collapse into the dropdown menu.
- The last element is truncated if the horizontal space is insufficient.

## Layout

The horizontal layout of the breadcrumb never changes. Links always appear next to each other.

## Types

There are two types of breadcrumb:

- **Standard breadcrumb**
  The standard breadcrumb shows the current page as the last item in the trail. The last item contains only plain text and not a link.
- **Breadcrumb without the current page**
  Use this breadcrumb for the object page only. The breadcrumb shows the position of the object page in the application hiearchy, without the current page. All items in the breadcrumb are links.

## Components

A breadcrumb can contain both links and text (standard breadcrumb), or just links (breadcrumb without current page).

## Behavior and Interaction

#### Navigation

The purpose of the breadcrumb is to trigger navigation. The action is triggered when the user clicks a link in the breadcrumb trail.
For link behavior and interaction, see [Link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/).

## Styles

You can define the style of the separator between the breadcrumb links using the `separatorStyle` property.

The available values are:

- Slash
- Backslash
- Double slash
- Double backslash
- Greater than
- Double greater than

To find out about the different link styles, see [Link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/).

## Guidelines

- In the dropdown menu on desktop and tablet devices, show only the links that are not visible in the breadcrumb trail.
- In the dropdown menu on smartphones, show all the links in the breadcrumb trail in their hierarchical order.

---

## breadcrumbs-web-component

A breadcrumb is a type of secondary navigation that
indicates the position of a page in its application
hierarchy. It enables users to navigate between items by
providing a list of links to previous steps in the user’s
navigation path.
## When to Use

Do
Use the breadcrumbs component:
- To show secondary navigation on an object page.
- To show navigation in a table.
- To show navigation in charts.
object page in another application).

## Anatomy

1. **Parent page:** The first link in the breadcrumb (the point of origin).
2. **Child pages**
3. **Current page:** The page the user is looking at.
4. **Dropdown**
5. **First link in the hierarchy**
## Types

### Without Current Page

You can opt to show the breadcrumb without the current
page. By default, the breadcrumb shows the current page.
### Separator Style

You can set the separator style. The the following
options are available:
- Slash (default)
- Backslash
- Double slash
- Double backslash
- Greater than
- Double greater than
## Behavior and Interaction

To navigate to a previous page, the user clicks the respective link in the trail.

## Responsive Behavior

Breadcrumbs are responsive. If there is insufficient horizontal space, the links in the breadcrumb trail collapse into a dropdown menu:

- The first link in the breadcrumb (the point of origin) collapses first, followed by the next link in the hierarchy.
- The last element in the breadcrumb is always visible and doesn’t collapse into the dropdown menu.
- If there isn’t enough horizontal space, the last element is truncated.

---

## carousel

The carousel allows the user to browse through a set of items. It can display one or several items at a time. From the displayed item or items, the user can navigate to either the next or the previous item.

Optionally, a paging indicator displays the user’s current position inside the set of items.

The carousel control is best used for browsing through a set of images. Viewing images one by one helps users to distinguish between different items. In a comparison scenario, it can also be useful to display several items side by side. The carousel is not limited to displaying images; it can contain any sap.m control.

## Usage

### Use the carousel if:

- You have strong visual representations of the items you want to display.
- You want to display items sequentially or side by side.

### Do not use the carousel if:

- The items you want to display are uniform.

## Responsiveness

The size of the control’s content area is adjusted automatically, depending on the amount of space available.

On non-touch devices, the user can navigate with the paging buttons displayed on the left and right of the control.

On touch devices, users can navigate through the pages by swiping or by tapping the arrow buttons, which are always visible. The tap interaction is required as an alternative to swiping to comply with accessibility standards.

The paging indicator (when activated) shows on all form factors. The paging indicator wraps if it is too long to fit onto one line.

Section Metadata                           | | | Section Metadata
style   | column-section-1-1, no-footprint | | | style   | column-section-1-1, no-footprint
## Layout

The main component of the carousel control is the content area in which the
different items are displayed.
The (optional) paging indicator can float above or below the content area.
On non-touch devices, paging buttons either float above the left and right sides of
the content area, or appear in the paging indicator area. This is controlled by the
`arrowsPlacement` property.
**Displaying multiple items**
The layout of the carousel does not change when multiple items are displayed in the
content area.
## Behavior and Interaction

The content area contains either the current item or a set of items.

### Navigation for Single Items

When the user navigates from the current item to another item, the current item is moved out of the content area, and the next or previous item slides in (depending on the direction of navigation).

On touch devices, users navigate with swipe gestures (swipe right or swipe left).

On non-touch devices, users navigate with paging buttons.

If the item set contains only one item, navigation is deactivated.

_Paging button – Previous page_          | _Paging button – Next page (hover)_
### Navigation for Multiple Items

When the user clicks one of the paging buttons, the rightmost or leftmost item is moved out of the content area, and the next or previous item slides in (depending on the navigation direction).

In addition, you can set the navigation to move through multiple items or an entire row with a single click on the paging button.

### Looping

The carousel can be set to loop (property: `loop`). In this case, the carousel jumps back to the first item once all items have been displayed. If looping is not enabled, there is no forward navigation on the last item.

### Paging

The current position inside the set of items is displayed using an optional paging indicator (properties: `showPageIndicator`, `pageIndicatorPlacement`).

If there are more than 8 pages, the paging indicator changes from icons to numbers.

---

## carousel-web-component

The carousel allows users to browse through a set of
items by swiping right or left. The component is mostly
used for showing a gallery of images, but can hold any
other HTML element. It can display a single content
element or show several content elements at once. Users
can cycle through the content using navigation buttons
and the paginator.
## When to Use

Do
Use the carousel:
- To let users browse through a set of items by paging
back and forth.
- To display items sequentially.
- To display items side by side.
## Anatomy

**1. Container**: Holds the content, navigation buttons, and page indicator.
**2. Navigation buttons**: Allow users to page backward and forward between items. You can place the navigation buttons either in the content area or on each side of the page indicator.
**3. Page indicator**: Indicates the current page in the sequence. If there are fewer than 9 pages, the page indicator is visualized as a series of dots by default. For more information, see [Show/Hide Page Indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/carousel-web-component/#showhide-page-indicator) and [Page Indicator Style](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/carousel-web-component/#page-indicator-style).
**4. Content**: Can contain any component.
## Types

You can adapt the following carousel parameters:
- Position and visibility of the navigation buttons
- Visibility of the page indicator
- Style of the page indicator
- Looping behavior
- Number of items per page
### Navigation Buttons

You can configure the navigation buttons in three ways:
- Show in the content area
- Show with the page indicator
- Hide completely
By default, navigation buttons are never shown on touch
devices.
#### In the Content Area

If you place the navigation buttons in the content area,
they are initially hidden. They only become visible when
the user hovers over the carousel content.

#### With the Page Indicator

The navigation buttons appear on each side of the
indicator.

#### Hidden

You can opt to hide the navigation buttons on all types
of device. In this case, desktop users navigate through
the pages using the keyboard.

### Show/Hide Page Indicator

By default, the page indicator is located below the content. You can also hide it.

<https://www.sap.com/design-system/live-examples/Carousel/Carousel_SE_basic.html>

### Page Indicator Style

You can display the page indicator as a series of dots or
numerically.
#### Dot Style
The page indicator shows a horizontal series of dots,
each of which represents a page in the carousel. The dot
for the current page is highlighted.
By default, the page indicator uses the dot style if
there are fewer than 9 pages.
#### Numeric Style

The numeric page indicator shows the current page and the
total number of pages (for example, “2 of 4”).

By default, the page indicator switches to the numeric
style if there are 9 pages or more.
### Cyclic

You can set the carousel to loop. Navigating forward on the last page then returns the user to the first page, and vice versa.

<https://www.sap.com/design-system/live-examples/Carousel/Carousel_SE_NonCyclic.html>

### Multiple Items Per Page

You can display multiple items at once. The page navigation buttons then have the following effect:

- _Previous Page_: The previous item slides into view on the left. The right-most item slides out of view on the right.
- _Next Page_: The next item slides into view on the right. The left-most item slides out of view on the left.

<https://www.sap.com/design-system/live-examples/Carousel/Carousel_LE_MultipleItems.html>

## Behavior and Interaction

### Click

The user can click the arrow buttons to go to the
previous or next page.

### Hover

If navigation arrows are placed in the content area: When
the user hovers over the page, the navigation buttons
appear.

### Touch Enablement

On touch devices, the carousel component makes use of the swipe gesture to page through the items. The navigation buttons are not displayed on touch devices.

## Responsive Behavior

### Responsive Behaviour

- If the width and height of the carousel is set to 100% (default), the component content area is adjusted automatically, depending on the amount of space available.
- On touch devices, swipe gestures are used to navigate through the pages.
- The paging indicator wraps if it is too long to fit onto one line.

### Content Density

The content inside the carousel can appear in two different sizes:

- The **cozy** size uses component dimensions large enough to enable fingertip interaction. This factor is ideal for devices operated by touch.
- The **compact** size reduces the component dimensions, allowing more information to be displayed on the UI. This factor is ideal for devices operated by mouse and keyboard.

The page indicator (when activated) shows on all form factors.

<https://www.sap.com/design-system/live-examples/Carousel/Carousel_SE_OneItemCompact.html>

### Globalization and Localization

When using the carousel, bear in mind that it may be used with languages that read and write from right to left.

The arrow navigation and looping behavior (if activated) adapt accordingly.

<https://www.sap.com/design-system/live-examples/Carousel/Carousel_SE_OneItemLTR.html>

---

## wizard

The wizard floorplan allows users to complete a long or unfamiliar task by dividing it into sections and guiding the user through it. The wizard consists of the walkthrough screen, where the form sections are revealed in sequence after each one is completed, and the summary page, where the form is displayed in read-only mode for assessment and final submission. In general, you can use the wizard both in [full screen mode](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) and in a [modal dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/). Beyond that, the wizard in full screen mode can also be used in a [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).

## Usage

### Wizard in Full Screen Mode

#### When to Use the Wizard Floorplan

The wizard aims to help users by dividing large or complex tasks into segments. Use the wizard if the user has to accomplish a long task (such as filling out a long questionnaire) or a task that is unfamiliar to the user. The flow should consist of a minimum of 3 and a maximum of 8 steps.

You can use the wizard for both create and edit scenarios. For edit scenarios, you can either offer a wizard or let users edit the object page directly, depending on your use case.

#### When Not to Use the Wizard Floorplan

If you have a task with only 2 steps or a format that the user is familiar with (for example, it is part of their daily routine), do not use the wizard as it only adds unnecessary clicks to the process. If your process needs more than 8 steps, the wizard will not support those steps, as the process is too long and can be confusing for the user. In this case, consider restructuring the task.

Consider whether the classic edit screens ([edit flow](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) or [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/)) are more suitable for your use case.

### Wizard in a Modal Dialog

#### When to Use the Wizard in a Modal Dialog

We recommend using the wizard in a modal dialog if:

- The wizard is closely connected to the triggering page, and the user needs to return to that page quickly.
- Users need to be able to open the wizard from any part of the product/page.
- The size of the wizard needs to be flexible.

#### When Not to Use the Wizard in a Modal Dialog

Don’t use the wizard in a modal dialog if the app you are using is a standalone application that has no relation to the page it has been triggered from. Instead, use it in a [dynamic page layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).

## Structure

The wizard has two screens: the **walkthrough screen**, where users complete a segmented task, and the **summary screen**, where they can check the data they are about to submit. Wizard content is not restricted to forms; you can also use other elements, such as a [value help dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/).

### Walkthrough Screen

After triggering the wizard from a floorplan, the user is taken to the main walkthrough screen, which shows only the first section of the form. Users can also trigger the wizard app from another application, from the [launchpad](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad), or from a notification. The wizard always starts at the initial walkthrough page and ends after the user has clicked the main action (such as _Create_ or _Submit_) on the summary screen.

The wizard comes with two different behaviors, which have different navigation patterns. Their usage depends on the use case.

#### Anchor Bar / One-Page Behavior

The [anchor bar](https://wiki.one.int.sap/wiki/pages/viewpage.action#anchor-bar-navigation1) behaves in the same way as the [anchor bar in an object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#anchor-bar-navigation). It consists of a series of links (steps) that are arranged horizontally at the top of the page. Clicking a link navigates to the respective step on the page.

The _Next Step_ button is only used on the walkthrough page. Once the user has filled out all the necessary fields, a _Next Step_ button appears below the content, which allows the user to continue with the next section of the form. If the user needs to navigate to the previous section of the form, it is possible either to scroll up the page or to navigate back by using the progress bar. When the user has completed the last section of the wizard, the button label changes to _Review,_ and the user is taken to the summary screen. On the summary screen, the user can use either the _Edit_ button in the footer or the _Back_ arrow to return to the wizard and edit any of the fields. The wizard footer is used to display the _Cancel_ button, which exits the wizard. If the user has modified any fields, a data loss warning appears. If the form is long, and the user may have to save it before finishing, you can offer a _Save as Draft_ option in the footer.

1. Header toolbar with title
2. Progress bar
3. Completed step
4. Current step
5. Upcoming step
6. Step title (for example: 3 _. Payment_)
7. Action for the next step

#### Tab Bar

As an alternative to the [anchor bar](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#anchor-bar-navigation), you can also use the tab mode (property: `rendermode`, value: `Page`). It is visualized in the same way, but shows a series of tabs (steps). These are arranged horizontally at the top of the page and each represents a subpage. Clicking a tab displays the respective subpage.

Unlike the anchor bar, the tab bar comprises not only a _Next Step_ button but also a _Previous Step_ button. Place the _Next Step_ button in the footer toolbar, as in the summary screen. As soon as users move to the following step, show an additional _Previous Step_ button on the left. This follows the guidance for [action placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement): if the primary action (such as _Next Step_) is a forward path, it needs to appear to the right of the secondary action. In the case of the wizard, the secondary action is _Previous Step_. The negative path action _Cancel_ remains unchanged.

After filling out all the necessary fields for a step, the user can navigate to the next step by clicking the _Next Step_ button. To navigate back to the previous step, the user can either click the _Previous Step_ button or use the progress bar at the top of the wizard. If you use tabs, each tab is a single wizard step.

When the user has completed the last wizard step of the walkthrough screen, the _Next Step_ button changes to _Review_, and the user is taken to the summary screen. Since the tab bar is also used for the summary screen, the user can either use the _Previous Step_ button to return to the prior wizard step or use the _Next Step_ button, which changes to the _Create/Submit_ button to finalize the wizard application.

To go back and edit entries for single wizard steps, the user can either use the _Edit_ buttons on the summary screen or select the step in the progress bar. Beneath the _Next Step/Previous Step_ buttons for processing the wizard, the wizard footer toolbar is also used to display the _Cancel_ button, which exits the wizard.

If the user has modified any fields and navigates away, a data loss warning appears. If the form is long, and the user may have to save it before finishing, you can offer a _Save as Draft_ option in the footer.

1. Dynamic page header with title
2. Progress bar
3. Completed step
4. Current step
5. Upcoming step
6. Dynamic page footer toolbar
7. Previous step button
8. Next step/finalizing button
9. Cancel button to exit wizard

The title in the header toolbar above the wizard remains unchanged during all the wizard steps. Align this title left, and make it clear to users where they are and what they are doing (for example, _New Sales Order_ or _Sales Order 4815162342)_. Especially in edit scenarios, it is vital to give users a unique identifier for the object they are changing.

The progress bar below the header highlights the completed steps and the current step. It also allows the user to navigate between steps by clicking any of the circles. If there are multiple steps, and the screen width is reduced, the steps on the progress bar are grouped. This behavior is the same on smartphone, tablet, and desktop screens.

In certain use cases, the steps in the wizard depend on the choices the user makes along the way. The user’s entries for one step determine the follow-on steps (“branching”). In these cases, a dotted line shows that more steps will follow.

Since the wizard is a lightweight way to create or edit objects, applications can use a [quick confirmation popover](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging#quick-confirmation-popover) instead of the heavier data loss message when the user selects _Cancel_.

If the wizard is used to **create** an object, the text in the popover should read _Discard this \<object>?’_ . If the wizard is used to **edit** an object, use the text **Discard changes?** In both cases, use _Discard_ as the action on the popover.

**Modifying dependent steps:** If there are steps that depend on each other (for example, a selection in step 2 triggers an additional step), and the user modifies the parent step, the dependent step is changed or deleted. Beforehand, the user is warned that data will be lost.

### Summary Screen

On the summary screen, users can check all their entries before the object is actually created or changed. Depending on the use case, and whether the wizard is used with an anchor bar or a tab bar, the structure of the summary screen differs.

- If the wizard is used with an **anchor bar**, the summary screen has no progress bar or anchor navigation, and shows the form sections for all the steps in read-only mode.
- If the wizard is used with a **tab bar**, the summary screen is included as a step in the progress bar, and therefore the progress bar and the tab bar are still visible. It shows the form sections for all the steps.

To allow the user to go back and edit entries, provide an _Edit_ button in each form section. Alternatively, users can click the _Previous Step_ button or scroll up to go to the previous step/section.

On the summary page, show the finalizing action, such as _Create_ or _Save_.

## Layout

The wizard floorplan can be used in both the [dynamic page layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) and in a modal dialog. It’s also possible to use the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/). Since there are no subsequent pages after the wizard, it always occupies the rightmost column – there is no navigation from the wizard to a subsequent page. After completing (or canceling) the wizard, the user is always returned to the triggering page.

_Wizard in full screen layout used with tab bar_          | _Wizard in a modal dialog used with tab bar_
_Wizard in full screen layout used with anchor bar_           | _Wizard in flexible column layout (2/3)_           | _Wizard in flexible column layout (1/3)_

## Types

There are two types of wizard – “standard” and “branching” – which differ in terms of the functions they offer.

Use the [standard](https://ui5.sap.com/#/sample/sap.m.sample.Wizard/preview) type if:

- The total number of steps is known in advance.
- The number of steps does **not** change during usage.
- There is linear progression from one step to the next.

Use the [branching](https://ui5.sap.com/#/sample/sap.m.sample.WizardBranching/preview) type if:

- The total number of steps is not known.
- The number of steps **may** change during usage.
- There is non-linear progression. In other words, the user’s choice during one step determines which step comes next.

In both types of wizard you can let users skip steps. Label these steps as “[Optional](https://ui5.sap.com/#/sample/sap.m.sample.WizardCurrentStep/preview)”.

## Styles

In addition to the functional types, there are also different visual styles.

### Numbers and Icons

By default, both versions use a number inside a circle to represent each step. You can also use icons instead of numbers to help users identify the steps. If you plan to use icons, be sure to assign icons to _all_ the steps (not just to some). Always choose unique, clearly distinguishable icons for each step.

### Labels

To help users identify the individual steps even more easily, app developers can assign labels. As with icons, labels must be applied to all or none of the steps.

If there is enough horizontal space, all labels are
shown.

As the width is reduced, the label is only shown for the
currently selected step.

The unselected and outermost steps are stacked on top of
each other to further accommodate the reduced space.

To access steps inside a stack, users click can open a
list of hidden steps.

#### Optional Steps

For optional steps, add an _(Optional)_ label. Place the _(Optional)_ label **below** the content label for the step.

Do

### Explanatory Texts

Ideally, the headlines and field labels for each step should provide enough information for users to complete their tasks. However, if additional explanations are needed, applications can put a simple text underneath a step headline – either via the [sap.m.Text](https://ui5.sap.com/#/entity/sap.m.Text/samples) or the [sap.m.FormattedText](https://ui5.sap.com/#/entity/sap.m.FormattedText/samples) control.

## Responsiveness and Adaptiveness

The wizard floorplan is available in the sizes: S, M, L and XL. This is also applicable to the wizard in a modal dialog.

As the size being used highly orientates on the content and the space that is needed for it, there aren’t any fixed sizes available. For a wizard with a lot of content, in modal dialog it is recommended to use width of 80% and height of 70%. For less content, the size of the modal dialog should match the content.

_Wizard - Size L_           | _Wizard - Size M_           | _Wizard - Size S_
_Wizard modal dialog - Size L_           | _Wizard modal dialog - Size M_           | _Wizard modal dialog - Size S_
If there is not much content available with a lot of whitespace around it, the wizard in a modal dialog could look like this:

_Micro wizard - Size M (1)_           | _Micro wizard - Size M (2)_           | _Micro wizard - Size S_
The wizard in full screen layout as well as in the modal dialog supports all common screen sizes and is available in [cozy and compact modes](https://www.sap.com/design-system/fiori-design-web/foundations/visual/cozy-compact), as well as high-contrast black (HCB).

On small screen if the space needed for the action buttons located in the footer toolbar (Previous/Next step) is not enough an overflow appears on the right side, containing the cancel button.

## Behavior and Interaction

### Initial Focus

When the wizard is first loaded, focus on the first editable control in the first step.

Exceptions:

- The user opens a page using a link that jumps directly to a specific step. In this case, focus on the first editable control in this step.
- The user opens the wizard using one of the _Edit_ actions from the review screen. In this case, focus on the first editable control in the selected editing step.

### Error and Draft Handling

#### Error Handling

Error handling is done via [message popovers](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-popover/). When the user clicks the button for the next step, the form sections and fields are validated. When the user clicks the _Create_ button on the summary page, the entire form is validated. If there are any errors, the message popover is displayed, and clicking any of the error items scrolls the page to the relevant field, which is also highlighted in red.

Section validation differs from validation of the entire form:

- Section validation: Validates the entries in the form fields.
- Form validation: Checks the entire form for back-end system errors (such as duplicated data entry).

#### Draft Handling

If a draft already exists when a user enters the wizard, show a dialog to inform the user. For more information, see [Draft Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling).

### Expand to Full Screen

If the wizard is displayed in a modal dialog, the user can switch between the standard size and a near [full screen](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/) size. This is done by clicking the _Enter Full Screen_ icon :full-screen: on the top-right corner.

### Resizing & Dragging

#### Resizing

If the wizard is in a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/), we advise against allowing users to resize the dialog freely. This distracts users and prevents them from solving their tasks quickly.

#### Dragging

If the wizard is in a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/), you can allow users to drag and drop the dialog to a different position on the page by clicking on the top of the dialog window. This can be helpful if the user needs information from the underlying page.

### Busy States

You can also use [busy states](https://www.sap.com/design-system/fiori-design-web/ui-elements/busy-state/). Currently, there are two different types of busy states available. One for initiating the wizard from a floorplan, and another for loading the single content parts of a wizard step.

#### Initiating the Wizard from a Floorplan

If initiating the wizard from a floorplan takes longer than one second, the control shows a [busy state](https://www.sap.com/design-system/fiori-design-web/ui-elements/busy-state/). As soon as the wizard is available, the busy state is removed, and the single parts of the wizard step are loaded.

#### Loading the Single Parts of a Wizard Step

If loading the single parts of a wizard step takes longer than one second, set the control to the [busy state](https://www.sap.com/design-system/fiori-design-web/ui-elements/busy-state/). If loading was successful, the busy indicator is removed and the content is shown. If loading wasn’t successful, the busy indicator is removed, an error [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/) appears, and the content isn’t shown.

### Dynamic Page

#### Header

Even though the wizard floorplan consumes the [dynamic page](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/), the wizard header does not allow snapping. The wizard floorplan comes with its own step-based header that already saves space.

#### Footer Toolbar

The footer toolbar of the wizard floorplan conforms to the standard dynamic page layout and uses the `sap.m.bar` control.

> **Hint:** If you use the wizard in a dynamic page layout, set the height of the wizard to “auto” instead of “100%”. Otherwise,
a scrollbar issue may occur.

---