# SAP Fiori UI Elements: Other Components

## 3d-viewport

## Intro

You can use the 3D viewport control to enable 3D viewing in your SAP Fiori application. This control is available in the Visual Interaction toolkit library. The 3D viewport control can display simple and complex 3D objects in SAP Fiori, and offers basic user interaction with the 3D environment and its objects.

You can use the 3D viewer in various locations in the app, such as the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/), the [dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/) control, dialogs, or popovers.

## Usage

### Use the 3D viewport control if:

- You want to show 3D models in an SAP Fiori environment.
- You want to let users view 3D files in the browser without downloading any browser plugins.
- You want to enable users to interact with 3D models stored locally or remotely.
- You want to load multiple 3D models at the same time.

### Do not use the 3D viewport if:

- There is not enough space for users to interact with 3D content (in other words, the 3D viewport is too small to interact with 3D models).
- You require simple visual representations of objects or functions. In this case, use [sap.m.Image](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/) instead.

> **Hint:** The 3D viewport control was designed to help developers load and display 3D content quickly and easily. It does not require
knowledge of 3D space or the programming techniques needed for correct data visualization.
If you need more control over the elements in the 3D viewport, or if you require extended functionality, you can use an API
within the Visual Interaction toolkit to manipulate or interrogate 3D content.
The 3D viewport control uses the SAPUI5 logging mechanism to log various messages, which may include information, warnings or
errors. For more information, see the SAPUI5 log page: <https://sapui5.hana.ondemand.com/sdk/#/api/jQuery.sap.log>

## Responsiveness

If you use the 3D viewport in conjunction with SAP Fiori page layouts or floorplans **,** responsiveness is determined by the respective layout or floorplan, such as the [dynamic page layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) or [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).

The 3D viewport adjusts its size to fit within the available space.

## Behavior and Interaction

The 3D viewport supports a range of specific mouse and touch gestures by default. The available gestures are determined by the viewport component with which you interact.

When a 3D model is loaded into the 3D viewport, you can pan, zoom, rotate, and click or tap the model with the following actions:

Table

**Action**                | **Touch Gesture**       | **Mouse Gesture**          | **Keyboard Shortcut**

**Select or deselect an   | Tap                     | Left click                 | N/A
object in the scene**     |
**Zoom onto and visually  | Double tap              | Double click               | N/A
focus on an object in the |
scene**                   |
**Rotate the scene**      | Tap and drag            | Left click \+ drag         | Cursor keys

**Pan the scene**         | Two-finger tap and drag | Hold mouse middle button   | Shift \+ cursor keys
and drag
or
Hold both left and right
buttons and drag
**Zoom out of the model** | Pinch                   | Mouse wheel scroll forward | Minus key (-)
or
Right click \+ move mouse
up
**Zoom into the model**   | Stretch                 | Mouse wheel scroll         | Plus key (\+)
backwards
or
Right click \+ move mouse
down
The recommended selection behavior is known as “sticky” selection (default):

- When a user clicks on an object, it is marked as selected.
- Clicking another object selects that object, along with all previously selected objects.
- Clicking a selected object deselects it.
- Clicking empty space deselects all objects.

> **Information:** There are no keyboard shortcuts for object selection. As a scene can have thousands of objects, direct interaction
with the Viewport using a pointing device is required to select objects.

---

## ai-acknowledgment

## Intro

The AI acknowledgment pattern informs users during
onboarding about the presence of AI capabilities in the
product. It provides a standardized message using
predefined UI components to ensure clarity,
accessibility, and consistency across SAP products.
## When to Use

+----------------------------------x----------------------------------+
When To Use
+----------------------------------x----------------------------------+
Do
Use the AI acknowledgment pattern to:
- Inform the user about a present AI service or function.
- Educate the user on important properties of the AI system.
+----------------------------------x----------------------------------+
Don't
Don’t use the AI acknowledgment pattern to:
- Notify the user about failed or successful AI processes.
- Send marketing or advertisement information about the AI service.
- Display any other system-related information.

### High-stakes situations

AI acknowledgment is highly recommended in situations where educated user decisions on AI-created results are critical. In other words, the risks associated with such an action are usually high.

Examples of high-stake scenarios include:

- Financial forecasting
- Contract recommendations
- Human resources insights
- Customer communications

### Low-stakes situations

AI acknowledgment may be optionally used in situations where the risks associated with applied actions are usually low and can be easily reverted at any time. Other patterns, such as AI explainability and AI notice, may already provide enough visual cues to inform the user of possible AI involvement in the provided content.

Examples of low-stake scenarios include:

- Entertainment
- Recipe/lifestyle suggestions
- Generic communication responses and greetings

## Anatomy

The AI acknowledgment pattern extends the [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog-web-component/) ([message box](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/)) component to enable new AI-specific interactions.

Structure of the AI acknowledgment message

1. **Container:** Dialog component (message box type).
2. **Intro/primary message:** Describe what the message is about. Tailor it to the given context.
3. **Details/link:** Link to relevant documentation defined by the product.
4. **Title:** *Disclaimer* headline.
5. **Disclaimer text:** Standard AI notice message text.
6. **Checkbox (optional):** *Don’t show me again.*

## Types

The AI acknowledgment provides a standard message text. We advise adhering to the suggested wording to maintain consistency and ensure user familiarity. Modify the text only if necessary\.

### Recommended message text

#### Purpose

Onboarding/welcome message
more information, see \<link>.
Show this message when a user opens an AI-enabled
application for the first time.
Artificial Intelligence (AI) generates results based on
multiple sources. Outputs may contain errors and
inaccuracies. Consider reviewing all generated results
and adjust as necessary.
☑ Don’t show me again

### Footer actions

Footer actions should align with the purpose of the message.

**Informational only (no action required):**
Message with *Close* (tertiary) button.

**Informational with *Don’t show me again* option:**
Message with *OK* (primary) button and a checkbox to hide future messages.

**Acknowledgment required with *Don’t show me again* option:**
Message with *Accept* (primary) and *Dismiss* (tertiary) buttons, with a checkbox to hide future messages.
## Behavior and Interaction

### Trigger and events

The AI acknowledgment dialog is displayed when the user opens a screen that provides AI-enabled features.

### “Don’t show me again” option

You can provide a *Don’t show me again* option in the
acknowledgment popover to avoid the repetition of
identical messages. If this option is activated, the
message is no longer displayed in future sessions in the
same application locally, or for the same AI service
globally. It does not prevent other messages from showing
up.
We recommend providing a dedicated location where users
can retrieve this information again at any time.

### When to show again

The message box can be displayed again if the status or properties of the AI service have changed significantly, even if the user has selected *Don’t show me again*. We recommend displaying the AI acknowledgment again when:

- An application that previously had no AI features is now enhanced with AI capabilities.
- An application with existing AI features has been upgraded with a new AI capability.

**> **Information:** **

This behavior might be configured and personalized by the customer. Customers might also choose to communicate the
related information through different means.

## Responsive Behavior

The AI acknowledgment builds on the foundation of the message box. To learn more about the responsive behavior of the AI acknowledgment, refer to the [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog-web-component/) ([message box](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/)) guidance.

## Localization

To learn more about the support for left-to-right (LTR) and right-to-left (RTL) languages in the AI acknowledgment, refer to the [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog-web-component/) ([message box](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/)) guidance.

## Responsible AI

**Communicate clearly**
Use clear, simple language to ensure users understand the meaning of the message and linked information. Avoid technical jargon or legal
language that may confuse users.

---

## busy-state

## Intro

You can set a busy state for each SAPUI5 control. This function adapts to the space available on the UI.

## When to Use

### Use the busy state of the control if:

- The operation takes more than one second (busy state set at control level)
- You want to indicate that data is loading on a table or on a list after performing a search or filtering (set the busy state at table or list level).

### Do not use the busy state if:

- The operation lasts less than one second.
- You expect several busy states at once. In this case, consider setting the busy state at a higher level or container.
- You’re loading an app from the launchpad or navigating from an app to another. Use [placeholder loading](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/placeholder-loading/) instead (when available in your framework).

## Examples

_Busy page_          | _Busy buttons_
## Guidelines

Avoid showing multiple busy states at once. If you expect multiple busy states on various controls, you can set the busy state on a control or container above.

In some cases, however, it makes sense to allow multiple busy states. For example, a page could contain a form and several tables that load asynchronously. In this case, it does not make sense to set the busy state at page level until all the data is loaded as the user can start filling out the form which is already available. Response times may vary due to table data retrieval from different services.

Try to enable as much as possible on one screen, so the user can start working while the rest of the data is being loaded in the background. Set the busy state for those UI elements that will require some time to load.

---

## calculation-builder

## Intro

The calculation builder can be used to create complex expressions that combine numeric constants and variables with arithmetic and logical operators. The expressions can be entered using a visual editor or a text editor with three available layout options.

## Usage

### Use the calculation builder if:

- You need to create or edit complex arithmetic expressions.
- You need to define or modify business KPIs.
- You need to keep the dependencies of the underlying calculations and to be able to expand them.

## Responsiveness

The calculation builder is fully responsive, and uses 100% of the width provided by the container in which it is embedded. For size S, it is mandatory to use 100% of the page width.

Depending on the available width, the calculation content is broken into separate lines in order to keep the native vertical scrolling for the whole page.

## Layout

The calculation builder provides three different types of layout:

- By default, the header toolbar and both the visual and textual editors are displayed. The header toolbar includes a toggle button for hiding or displaying the textual editor.
- Only the header toolbar and the textual editor are displayed, making the calculation builder a text-only control.
- The header toolbar and visual editor are displayed. The header toolbar includes buttons for arithmetic and logical operators, as well as variables. The toolbar buttons show the user which operations and variables are supported.

_Header toolbar \+ visual editor \+ textual editor (default)_          | _Header toolbar \+ textual editor only_          | _Header toolbar (with operators and variables) \+ visual editor_

### Layout Examples

The following examples show how the different layout types appear on the UI.

## Components

The calculation builder can include thee components:

- A header toolbar
- A visual editor
- A textual editor

### Header Toolbar
**A – Title:** Provides a short and meaningful summary of the expression.
**B – Textual Editor Toggle:** Enables the user to hide the _Expression Output_ section and work with the visual editor only
**C – Expand All Variables:** Allows the user to expand all the variables included in the expression and see all the
underlying calculations used to compose the variable.
**D – Full Screen:** Toggles the full screen view.
**E – Divider Line:** The divider separates the header toolbar from the content below.
### Visual Editor
**A – Functions:** Functions require brackets. The
initial bracket is automatically inserted after the
function name. Only a limited subset of functions is
supported by default. However, you can define any custom
function you need using the API.
**B – Variables:** A custom set of available KPIs, such
as revenue, assets, or expenses. KPIs are predefined by
each application.
**C – Constants:** Enables user to type the values
directly as standalone constants or as part of a
function.
**D – Operators:** Arithmetic, logical, and comparison
operators are available.
**E – New Element:** The default button of each
expression triggers a dialog to add a new function,
variable, operator, or constant.
### Textual Editor
The textual editor contains a plain text representation
of the expression entered in the visual editor.
If the user copies an arithmetic expression from an
external application and pastes it to the textual editor,
the expression displayed in the visual editor will be
updated automatically. The same applies the other way
round: if the user enters an expression using the visual
editor, the textual editor gets updated, which can be
used to copy the expression to an external application.
## Behavior and Interaction

### Inserting New Calculation Elements

Columns
The user has two options for adding an
operator, constant, variable,
function, or reference to an           | _'New Element' dialog_           | _Selecting a function_
expression:
- By clicking the _New Element_ button
- By typing it directly into the
textual editor field, which makes it
appear in the visual editor as well.
The _New Element_ button triggers a
dialog with the selection of all
available calculation elements.
**> **Hint:** **

You can customize the calculation elements available to your users, add custom functions, load a specific list of
variables, or disable any of the default calculation elements.

_Selecting a reference_           | _Selecting a variable_           | _Selecting an operator_

### Expanding Variables

Default (col-1)

There are two ways a user can expand a variable to see the underlying structure of the variable.
- Expand an individual variable by clicking the _Expand Variable_ button.
- Expand all variables by clicking the _Expand All Variables_ button in the header toolbar.
In both cases, a confirmation message is displayed warning the user that this action is irreversible and variables
cannot be collapsed back.
When a variable is expanded, the user can also remove the dependency on the original variable, if needed.

> **Warning:** Expanding a variable is currently an irreversible action, and the dependency on the original variable can only be
restored if you insert the original variable again as a new calculation element.

Default (col-2)

Section Metadata

style

## Guidelines

When the default layout is used, displaying both the visual and textual editors, we advise against adding the editor buttons for operators, constants, functions, and variables to the header toolbar.

---

## cloud-file-browser

## Intro

The cloud file browser is a tool that allows users to browse through a remote repository, export data to the cloud, or import files from the cloud to an SAP application.

## Components

The cloud file browser is composed of the following controls embedded in a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/):
1. **A file share select field**
2. **A file name field** (export mode only)
3. **[Breadcrumb](https://www.sap.com/design-system/fiori-design-web/ui-elements/breadcrumb/) navigation**
4. **A _New Folder_ button** (export mode only)
5. **A [responsive table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/)** with files and folders
6. **The finalizing and _Cancel_ actions**
### Iconography
1. **Spreadsheet** (Microsoft Excel, Google Sheets, CSV…)
Tooltip: _Spreadsheet_
sap-icon://excel-attachment
2. **Text Document** (Microsoft Word, Google Docs, RTF…)
Tooltip: _Document_
sap-icon://doc-attachment
3. **Presentation** (Microsoft PowerPoint, Google Slides…)
Tooltip: _Presentation_
sap-icon://ppt-attachment
4. **Portable Document Format (PDF)**
Tooltip: _PDF_
sap-icon://ppt-attachment
5. **Plain Text**
Tooltip: _Text File_
sap-icon://attachment-text-file
6. **HTML File**
Tooltip: _HTML File_
sap-icon://attachment-html
7. **Image File, Photo**
Tooltip: _Image File_
sap-icon://attachment-photo
8. **Audio File**
Tooltip: _Audio File_
sap-icon://attachment-audio
9. **Video File**
Tooltip: _Video File_
sap-icon://attachment-video
10. **Archive** (ZIP, RAR…)
Tooltip: _Archive_
sap-icon://attachment-zip-file
11. **Unknown Format**
Tooltip: _File_
sap-icon://document
12. **Folder**
Tooltip: _Folder_
sap-icon://folder-full
13. **Locked Folder**
Tooltip: _Files can’t be exported to this folder._
sap-icon://locked
## Behavior and Interaction

### Export

When a data file is exported to the cloud, in the _[Export As](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/#export-as-dialog)_ dialog, the _Destination_ field is set to the value _Cloud_ and the finalizing action _Export To…_ opens the cloud file browser.

The spreadsheet or data file can be exported in various file types according to the client’s configuration and the remote file share type. For example, CSV, Google Sheets, or Microsoft Excel.

For more details, see: [Export to Spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/).

#### Accessibility

The initial focus is placed in the _File Name_ field.

Users can trigger the primary action while the focus is inside other controls in the dialog by using one of the following key combinations:

- Enter
- Ctrl + Enter (Windows)
- Cmd + Enter (Mac)

#### Update / Overwrite a file
To update an existing file, users can select the file in the list and export the new version.
The version history stores all older versions of the file.
The user is free to change the exported file name via the _File Name_ field. According to the file share rules, if the user enters unauthorized characters, the field changes the error state accordingly.
More details about [field states](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/#value-state-and-value-state-message).
For error prevention, the cloud file browser should display only the files of the type that has been chosen in the _Export As_ dialog.
After the user has chosen the file format in the _Export As_ dialog, they cannot change it via the file browser. Instead, they need to cancel the file browser and return to the settings dialog.
Depending on the file type, a _Warning_ may inform the
users that the file already exists and request user
confirmation of the export.
It also informs users that older versions of the file are
available in the version history.
#### Create a Folder

The user can create a folder with the _New Folder_ button or the keyboard shortcut Ctrl+B.

The folder is created when the users move the focus away from the _Name_ input field or press the Enter key.

After the folder is created, provide a [message toast](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-toast/) to confirm the creation and open the new folder automatically.

Message text: 

#### Locked Folders
Users can browse locked folders, but cannot export files to them. In such cases, the _Locked_ icon replaces the _Folder_ icon and the _Export_ button remains disabled.
For more details, check [Iconography](https://www.sap.com/design-system/fiori-design-web/ui-elements/cloud-file-browser/cloud-file-browser/#iconography).
### Import
The cloud file browser allows users to import files from the cloud to an SAP instance.
The _Upload_ button is disabled until a file is selected for import.
#### Accessibility
The initial focus is placed on the first selectable item in the list.
The primary action can be triggered by a keyboard shortcut. For more details, see [Export: Accessiblity](https://www.sap.com/design-system/fiori-design-web/ui-elements/cloud-file-browser/cloud-file-browser/#export).
### Loading Data
Use the busy indicator to cover the table space during
the initial content loading.
If there are too many items to load, a limited number of
items is loaded and more items load when the scroll hits
the bottom of the list. The busy indicator shows at the
bottom of the list.
### Empty States
Use illustrated messages when the following cases arise:
#### No file share found
The default file share doesn’t load or there is no available file
share.
Headline: _No File Share found_
Description: _Try reloading the file browser. If that doesn’t help,
contact your administrator._
Illustration: ErrorScreen
Disable _New Folder_ and primary actions.
Provide a _Reload_ button that attempts to reconnect to the file share.
#### Folder fails to load
Headline: _Unable to load the folder_
Description: _Try reloading the file browser. If that doesn’t help,
contact your administrator._
Disable _New Folder_ and primary actions.
#### Empty folder
Headline: _There are no files yet_
Description: _When there are, you’ll see them here._
Illustration: SearchFolder
#### The user doesn’t have permission to access the file share
Headline: _Permission Denied_
Description: _You cannot access this file share. To get access, contact
your administrator._
Disable _New Folder_ and primary actions.
### Last Selected Location

When leaving the cloud file browser, the last selected folder and file share are remembered so the user can access it directly when coming back to the cloud file browser.

If the last selected file share is unavailable, an illustrated message shows in the cloud file browser (more details in [Empty States](https://www.sap.com/design-system/fiori-design-web/ui-elements/cloud-file-browser/cloud-file-browser/#empty-states)).

If that last selected folder is inaccessible, the user is taken to the default location without warning.

#### Column sorting

The sorted column and the sort order is remembered when the user leaves the cloud file browser.

## Responsiveness
The cloud file browser embedded       | _Mobile (size S)_           | _Mobile (size S) with 200% zoom_
components (responsive table,
toolbar, form) respond to the browser
size according to their individual
specifications.

---

## color-palette

## Intro

You can use the color palette to let users choose a color
from a predefined set of colors. The colors are fixed and
do not change with the theme.

## Usage

### Use the color palette if:

- The user needs to select one color from a predefined set of colors.
- The color set contains between 2 and 15 predefined colors.
- There is no need to offer additional colors.

### Do not use the color palette if:

- Users need to be able to select any color. Use the [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/) or [color picker popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker-popover/) instead.
- Selecting a color from a predefined palette is the typical case, but users should still be able to define their own colors. Use the [color palette popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette-popover/) instead.

## Responsiveness

The color palette supports cozy and compact [content densities](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

_Size S_          | _Size M_          | _Size L_

## Components

- A [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) to select the default color (optional).
- The color palette, consisting of 2 to 15 color buttons.
- A [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/) that opens a [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/) in a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) (optional).
- Recent colors (optional). Users can see the last 5 colors they have recently picked. This function helps users to select colors that they have already chosen from the color picker. By default, this feature is visible.

## Behavior and Interaction

Users can select a color with the left mouse button, the tap gesture, or by pressing `SPACE` or `ENTER` on a keyboard. The selected color is not indicated in the control itself.

With the `liveChange` event, the color change can have an immediate effect and allows app developers to be aware of real-time color changes before they close the popover that contains it.

Hovering over a color provides a visual feedback.
To navigate between different colors on a keyboard, use
the arrow keys.
## Guidelines

- Show the selected color in another place. The color palette does not visualize the selected color.
- Label the color palette.
- If you do not want to show the color palette in-place, consider the [color palette popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette-popover/) instead.

---

## color-palette-web-component

## Intro

The color palette allows users to select a color from a
predefined set of colors.

## When to Use

Do
Use the color palette:
- If typically need to select a color from a given set of
colors.
## Anatomy

The color picker consists of the following elements:
1. **Swatch**: Single color, part of the palette.
Applications can define the available colors.

---

## comparison-pattern

## Intro

The comparison pattern allows users to select items from a list and display them side-by-side. This makes it easier to compare the characteristics of multiple items.

#### Show Comparison for Selected Items

Carousel (full-width)

## When to Use

### Use the comparison pattern if:

- Users need to compare two or more similar items.
- Users need to compare versions of the same item.
- You are using the [Dynamic Page Layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).

### Do not use the comparison pattern if:

- There is no business need for displaying items side-by-side. Don’t use the pattern purely for visualization.
- You want to display only one item. In this case, use the [Object Page Floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) instead.

## Components

The comparison pattern comprises the following components. All are mandatory:

- **Triggering action**: Opens the comparison view for the selected items.
- **Header area**: Shows the most important characteristics for identifying and comparing items. Each item is represented by a card.
- **Content area**: Shows all characteristics needed for comparison. Each item is represented by a panel.

Default (col-1)

### Triggering Action
The comparison is triggered by a button (1) on a selection screen (for example, in a table toolbar).

> **Guideline:** Use the action text _Compare_ or _Compare [Objects]_. In parentheses, include a counter for the number of selected items.
For example:
**_Compare (3)_**
**_Compare Products (3)_**

Default (col-2)

Section Metadata

style

Default (col-1)

### Header Area
The [dynamic page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header) holds the header area of the comparison pattern. To show more of the actual page content, the header content can collapse or expand using defined triggers ([snap on scroll](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#SnapOnScroll) and [snap on click](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#SnapOnClick)). When launching the app, the header is expanded by default. Users can fix the expanded header content while scrolling through the page content with the [pin feature](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#Pinning). For more information about the basic behavior of the header, see [Dynamic Page Layout – Dynamic Page Header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#dynamic-page-header).
The header area of the comparison pattern has two main components:
#### 1. Carousel
The [carousel control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/carousel/) displays the items in cards (1).
If there is not enough space to show all cards, paging buttons are displayed. Each time a user navigates left or right, the previous or next card is displayed. This also affects the respective panels in the content area. They are updated with the details of the item represented by the card.

> **Hint:** Always show the paging indicator when there is navigation between the cards (property `showPageIndicator` = `true`).

Default (col-1)

#### 2. Card
The card contains the most important characteristics for an item (2). It consists of the card header and the card
content.

> **Guideline:** - Apply the same size and structure for all cards.
- In the **header area**, show at least a title. A subtitle and image/avatar are optional. Do not show any other information.
- For a lighter and more convenient comparison, limit the details you display in the **card content**. This keeps the cards shorter and easier to read. Use the panels to show more information.

Default (col-1)

When the header snaps, the information in the header area stays and the card content hides.

Default (col-2)

Section Metadata

style

Default (col-1)

### Content Area
The dynamic page content area holds the content area of the comparison pattern.
The content area must contain at least two panels. For easier and faster comparison, use up to 10 panels to display the specifics of the selected items.
#### Panel
The [expandable panel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/panel/#expandable-panel) (1) is used to display all comparable characteristics in columns. A column is aligned with the respective card.
The first column of each panel should contain the characteristics of the item represented with the first card, the second column the item represented with the second card, and so on.
A panel must have a title that describes the characteristics. When collapsed (2), the panel displays only the title toolbar.

> **Guideline:** - Show at least two panels in the content area.
- For easier and faster comparison, use up to 10 panels to display the specifics of the selected items.
- If an item is missing a characteristic, leave the corresponding field blank. Learn more [here](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#table-content).

Default (col-2)

Section Metadata

style

## Behavior and Interaction

The expand/collapse header and pin/unpin header features work as described in the [Dynamic Page article](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#behavior-and-interaction).

### Adding More Items

If your users need to add more items while comparing, place an _Add to Comparison_ action in the header. For more information, see [Dynamic Page Layout – Header Title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-title).

For adding more items, either show a dialog or the original page the user started from. Make sure that you display the items that are already in the comparison: in the dialog, also show the previously selected items; in the original page, keep the items selected.

## Responsiveness

The comparison pattern adapts the number of visible items based on the screen size. If a card is no longer in the visible area, also hide its corresponding column in the panels.

On **size S**, there is only one visible card in the header area and its corresponding panels in the content area. Users can navigate left or right to see the next or previous item.

The comparison pattern maintains the scrolling position of the page when switching to the next or previous item. This feature helps the user focus on a certain characteristic while navigating through the items.

On **size M and larger**, always show two or more cards with their corresponding panel columns in the visible area.

## Example

Carousel (full-width)

## Top Tips

Compare apples with apples.

### Wording

- For triggering the comparison, use a meaningful button text with the number of selected items in brackets. We recommend “Compare (\<number of selected items>)”, for example, _Compare (3)_.
- Use a page title that describes the task. We recommend “Compare \<selected object type>”, for example, _Compare Products_.
- Use precise panel titles to describe the characteristics.

### Cards

- Show only the most important information for an item on the card.
- If the cards contain only a title, subtitle, and image/avatar, show the dynamic page header in collapsed mode when starting the app.
- Link each item’s object page (if available) to the header area of the card. This gives users access to all the characteristics for a specific item to help them make a final decision.

## Related Topics

- [Carousel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/carousel/) (guidelines) | - [Comparison Pattern](https://ui5.sap.com/#/entity/sap.m.ComparisonPattern) (SAPUI5 samples)
- [Panel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/panel/) (guidelines)
---

## currency

## Intro

Use this control to display different currencies in a vertical layout, such as in a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/), or [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/). The control ensures that the amount is always aligned to the decimal point.

## Usage

### Use the currency control if:

- You need to display amounts with different currencies in a vertical layout, such as in a table, list, or form, and it is important that the user is able to compare the amounts.

### Do not use the currency control if:

- You need to display amounts with the same currency in a table. Use an [object number](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-number/) instead.
- You need to display a number with a unit of measurement that is not a currency. Use an object number instead.
- You need to display an amount in a structure other than a list, table, or form.

## Responsiveness

The currency control supports amounts smaller than 100 trillion, which still fit on a smartphone screen in portrait mode. For larger amounts, the unit of measurement wraps to the next line, which makes it difficult to compare the amounts.

## Components

The currency control consists of:
- An amount, which is formatted automatically according to the
user’s locale (using delimiter symbols for the decimal point and
thousand separators) and to the currency set for this specific
number (number of decimal places). _Property: value._
- A currency expressed as a three-letter code. _Property: currency._
## Guidelines

- When you display a unit of measurement, always show the corresponding three-letter code. (_property: useSymbol_)
- Display amounts with a maximum of three decimal places. More than three simply increases the white space between other numbers and their units of measurement with no further benefit. Less than three does not work for all currencies. (_property: maxPrecision_)

---

## date-range-picker-web-component

## Intro

The date range picker allows users to enter a date range by either typing two dates in the **input field** or selecting a date range in the **calendar**.
The date range picker can also be used to enter a single date.

## When to Use

Do
Use the date range picker if:
- Users need to enter a date range and you know that the
keyboard is not the primary device used for navigating
the app.

## Anatomy

1. **Date input field**: Field for typing in dates directly. It contains a mask.
2. **Text**: A placeholder or the selected/typed text.
3. **Date range picker button**: Button that opens the calendar.
4. **Calendar**: See the [calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/calendar-web-component/) guideline for more details.
5. **Current date**
6. **Selected date range**
## Types

The date picker supports Gregorian, Japanese, Buddhist, Islamic and Persian calendars. You can use a **single calendar type** only, or show **two calendar types –** one primary and one secondary.

### Restricted Date Range

You can set **minimum and maximum dates**. In this case,
the user can only select dates within the approved range.

### Predefined Date Range

You can set a predefined date range that is selected by
default when the user opens the calendar. The user can
still change the dates.

## Behavior and Interaction

### Selection

**Date range:** After selecting a start date, hovering over another date turns the dates in between to light blue, indicating that they are in the selected range. When the user selects an end date, the calendar closes and the range appears in the date input field.

**Single date:** To enter a single date, the user can type one date into the input field, or select the same day as the start and end date in the calendar.

### Shortcuts

The following shortcuts are available for entering specific dates:

- “today”
- “yesterday”
- “in x days”
- “x days ago”
- “yesterday – today”
- “x days ago – in x days”

### Restricted Date Range

If minimum and maximum dates have been set, selection and navigation to dates outside this range is disabled.

### Formatting

When users enter a date in the input field, it must comply with the required date format. For instance, if the format pattern is yyyy-MM-dd, the user should input a date like 2015-07-30.

Supported format options are based on patterns using Unicode Locale Data Markup Language (LDML) date format notation.

**> **Guideline:** **

Whenever possible, we recommend using the **user's default date format** for clarity and familiarity.
If technical constraints prevent supporting the default format, opt for a **medium format** instead. In most locales,
the medium format displays four-digit years, like DD/MM/YYYY or MM-DD-YYYY, which helps users quickly identify the
year.

---

## dynamic-date-range-2

## Intro

The dynamic date range is a standalone control that offers a choice of absolute and relative dates, using different offsets from the current date.

## When to Use

#### Use the dynamic date range if:

- You want to let users choose from a flexible set of absolute and relative dates and date ranges.
- Your use case requires relative dates.

#### Do not use the dynamic date range if:

- Users need to select a date range manually and can do this with simple [date range selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/).

## Components

Default (col-1)

The dynamic date range has two main components:
1. Input with a button
2. Dropdown list with options
### Available Values
The control offers 29 default options for selecting dates, which cover different use cases.

**Single Dates:**
- Date
- Today
- Yesterday
- Tomorrow

**Date Ranges:**
- Date range
- From
- To
- Year to date
- Date to year
- Last x days / weeks / months / quarters / years
- Next x days / weeks / months / quarters / years
- Today -x / \+y
**Weeks:**
- This week
- Last week
- Next week

Application development teams can also implement custom options and plug them into the control.

> **Guideline:** If you offer the option **_Last X Days_** and/or **_Next X Days_**, also include the options **_Yesterday_** and **_Tomorrow_** respectively.
This ensures that the display field automatically shows _Yesterday_ or _Tomorrow_ when the value for X is “1” (Last 1 Day, Next 1 Day).

**Default (col-2)**

Section Metadata

style

## Behavior and Interaction

If the user selects an option that requires specific user input, a subscreen opens for entering the values.

The existing [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/) control is used for selecting dates.

The dynamic date control also comes with more complex options for selecting relative dates. For example, “**Today -x / +y**” days allows users to enter a timeframe that includes the current day by entering the number of days before “today” and the number of days after “today”.

## Responsiveness

On desktop devices, clicking the input icon for the
dynamic date range opens a dropdown list with the
predefined options.
user taps _Cancel_.

Section Metadata
style   | column-section-1-1, no-footprint
## Top Tips

- Only offer options that are relevant for your use case.
- You can also add your own values, if necessary.
- If you use your own values, provide human readable text.

---

## export-to-spreadsheet

## Intro

“Export to Spreadsheet” is a utility for exporting data from an app to a spreadsheet, enabling users to work with the data in common spreadsheet applications. Typical use cases are to mix the data with other sources, perform complex calculations, or change the layout of the data (for example, to present the content differently).

## Usage

### Use “Export to Spreadsheet” if:

- Users need to work with the data in common spreadsheet applications.
- Exported data should be the same as displayed (for example, taking visible columns, column order, filter, and sort settings into account).
- The amount of data to be exported is limited.

### Do not use “Export to Spreadsheet” if:

- You want to export a complete database table. Use custom-built exporters instead.
- You need to export large tables. Use custom-built exporters instead.

## Behavior and Interaction

“Export to Spreadsheet” can be used in all cases where the exported data can be represented in a tabular format. The export is independent of the control used to display the data in the app. It can be used not only for [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), but also for all other controls that work internally with tabular or hierarchical data, such as [charts](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart/).

### Content Formatting

The exported file contains only simple read-only text content. Basic data type information can be configured per column, such as text, integer number, floating point number, percentage, date/time (UTC or local time), and so on. Since spreadsheet applications provide their own formatting for cell content, SAPUI5 [formatters](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-data-overview) (for example, for dates, times, and numbers) are not taken into account.

You can combine several data points and display them in one cell, or spread them over several cells.

In the spreadsheet files, tree structures are displayed using the grouping functionality (first seven levels) and double indentation (all levels).

#### Exporting Readable Texts

By default, the _Export to Spreadsheet_ feature only uses data from the back end. Front-end formatting is not considered. For example, if the back-end database value is “F” and the value displayed in the front end is “Finished”, the exported value is still “F”.

To ensure that the data is exported as it is displayed on the screen, you can define key value pairs to overwrite the back-end values for a given column or columns (such as “F” for “Finished”).

If you opt to use this feature, bear the following in mind:

- The correct translated text must be provided by the application. It isn’t done by the framework.
- The text is just replaced, without additional formatting.

In [this sample](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.ui.export.Spreadsheet/sample/sap.ui.export.sample.formatting) the exported texts for the _Enumeration_ column in the exported file are identical with those shown on the UI, even though the database values are 1, 2, and 3.

Default (col-1)

#### Exporting
During the export, a modal progress [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) is displayed. The user can cancel the export at any time.
As soon as the spreadsheet file has been created, it is offered for download automatically.

> **Warning:** The file size of the exported file is limited by the available browser memory. Exporting large tables can therefore
lead to memory overflows and browser crashes.
The recommended maximum table size is 1 million table cells for desktop browsers or 100,000 table cells on tablets
and phones.
For larger tables, consider using custom-built, specialized export solutions instead.

Default (col-2)

Section Metadata

style

## Components

### Menu Button

Provide a [split menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/#split-menu-button) for triggering the export (for example, on the [toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/) of the corresponding control).
Design the menu button as follows:
- The **export icon** starts the export with default settings, or custom settings chosen previously by the user in the _Export As_ [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/).
- The **dropdown arrow** opens a menu with two options:
- - **_Export_**
Exports the table with default settings, or custom settings chosen by the user via the _Export As_ dialog.
- - - **_Export As…_**
Opens a dialog for specifying the export settings. The settings are stored until the user changes them again.
For _Export As…_, use the shortcut: **Shift\+Ctrl\+E**
The [tooltip](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/using-tooltips) label of the button is “_Export Table_“
### Export As Dialog

Default (col-1)

The dialog allows the users to define export settings, including:
- The exported file name
- The format for the exported file
- An option to include the current filter settings. If the user selects this option, the current filter is included
on a second sheet in the exported file.
- An option to split cells with multiple values into separate columns.
Selected, the option exports data best suited for calculating and filtering it in a spreadsheet application.
When the option is unselected, the results in exported data with formatting best suited for presentations.
The primary action label is “_Export”_ or, if cloud is enabled and selected as the destination, “_Export To…”_.
After the primary action is triggered, the settings are stored until the user changes them again.

> **Hint:** For smart tables, the menu button and dialog are available out of the box.
For freestyle apps, however, both the dialog and the triggering menu button must be implemented by the app team. The
“export to spreadsheet” function provides only the underlying export functionality.

Default (col-2)

Section Metadata

style

#### Export to Cloud

When cloud is enabled on the client’s instance, the dialog displays the _Destination_ select field below the _Format_ field. It opens a menu where the users can select _Cloud_, the default, or _Local_.

For the cloud destination, the primary action label in the dialog is “_Export To…_” and opens a [cloud file browser](https://www.sap.com/design-system/fiori-design-web/ui-elements/cloud-file-browser/cloud-file-browser/) where users choose the target location for the exported file through a remote repository.

## Guidelines

### Default Configuration

When you configure the exporter, ensure that your data is converted to a tabular representation. For example, when exporting a [list item](https://www.sap.com/design-system/fiori-design-web/ui-elements/list-overview/), configure the exporter to display each data point in a separate column.

For [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) export the data as it is displayed on the screen:

- Export all visible columns in the same order.
- Combine data points as they are combined on the screen (for example text and ID in one cell).
- Take the [view settings](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization) (sort, group, filter, …) into account.
- Use the same column header texts.
- Do not include the filter settings.

When exporting, convert non-text elements to a text-only representation. Non-text elements include [icons](https://www.sap.com/design-system/fiori-design-web/foundations/visual/iconography/icons), [images](https://www.sap.com/design-system/fiori-design-web/ui-elements/image/), [micro charts](https://www.sap.com/design-system/fiori-design-web/ui-elements/micro-chart/), or controls like [checkboxes](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/) and [buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/). Converting them to text ensures that the data is not lost in the exported spreadsheet file.

---

## flag-and-favorite

## Intro

You can let users **flag** objects for follow-up, or mark frequently-used objects as **favorites**. When an object is flagged or marked as a favorite, the corresponding [object marker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#objectmarker) appears next to it:

- A small flag indicates that the object is flagged.
- A small star indicates that the object is marked as a favorite.

## Usage

- Offer the _Flag_ option if users need to flag objects for later reference and follow-up.
- Offer the _Favorite_ option if users need to mark frequently-used objects.

> **Information:** The flag and favorite behavior is not support by SAP Fiori Elements

> **Information:** The `markFlagged` and `markFavorite` properties are deprecated for the object header (`sap.m.ObjectHeader`) and the object list item (`sap.m.ObjectListItem`). When using these controls, please use the marker aggregation of `sap.m.ObjectMarker` instead.

## Responsiveness

The _Flag_ and _Favorite_ markers are normally displayed as icons (rather than text) on all screen sizes. If you implement the [overflow toolbar](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.OverflowToolbar), you can specify how the _Flag_ and _Favorite_ actions are handled when there is a shortage of space on the toolbar (move to overflow menu as necessary, always show on toolbar, always show in the overflow menu). For more information, see the [toolbar overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow).

## Layout

The position of the flag or favorite marker depends on the UI control or floorplan. The button for making the setting appears in the relevant toolbar.

### Object Header (Object Page)

In the [object header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-header/#objectmarker), the markers appear right next to object title. The icon button for setting the status appears in the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/).

### Object List item

In an [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/), the marker appears in the first status line.

### Tables

In [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) and [list reports](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), the marker for a line item shows right beside the checkbox. To make the settings, users need to drill down into the object itself.

### Custom List Item

In custom lists, the position of the _Flag_ or _Favorite_ icon depends on whether it is read-only or interactive:

- If the _Flag_ or _Favorite_ marker is **read-only**, place it **after the text**.
- If the _Flag_ or _Favorite_ marker is **interactive**, place it **before the text**.

## Behavior and Interaction

Users switch the setting on or off by clicking the _Flag_ or _Favorite_ button (icon), which behaves as a toggle.

---

## generic-tag

## Intro

The generic tag control displays complementary information that relates to the current page, such as key performance indicators (KPI) and situations.

## Usage

### Use the generic tag:

- To display complementary information for an object, such as a KPI.
- In the [dynamic page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-title) or in the [header area of an object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#header), following the title.

### Do not use the generic tag:

- For decorative purposes.
- For navigation.

## Structure
#### A – Status Indicator / Criticality Indicator – Mandatory
The indicator displays the status/criticality of the tag. Only use it with the available [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/colors/colors#semantic-colors).
#### B – Message Icon – Optional
The message icon can help visualize the status/criticality of the tag. The color of the icon is always the same as the color of the status indicator. Always [use the correct message icon](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#types) for the respective status/criticality.
Section Metadata
#### C – Title – Mandatory
style   | column-section-1-1, no-footprint
Always use a meaningful title. Keep it simple and try to use no more than 3 words.
#### D – Value and Unit of Measure – Optional
The value represents the numeric (key) attribute and its unit. The value has a semantic color, and the unit inherits the color from the value. The color of the value must be the same as
the color of the status indicator. For more information, see [Object Number](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#object-number).
### Generic Tag for KPIs
To display KPIs, use the following structure:
- A – Status indicator / criticality indicator
- C – Title
- D – Value and unit of measure
Section Metadata
style   | column-section-1-1, no-footprint
The generic tag for KPIs also contains an error state. It
is shown when the KPI cannot be properly displayed.
Section Metadata
style   | column-section-1-1, no-footprint
## Responsiveness

The generic tag itself is not responsive. To enable responsiveness, use the [overflow toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow-generic).

## Behavior and Interaction

The generic tag has a press event. Use this event only to open a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) or [analytical card](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-card/) containing relevant information, \\using the progressive disclosure technique\.

---

## group-feed-component

## Intro

Default (col-1)

You can use the group feed component to offer a social timeline that is **integrated with SAP Jam**. The group feed enables
SAP Jam users to post comments and reply to posts created by other users. You can use it just for collaboration, or offer
collaboration alongside application-generated content.
Like the [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/),
the group feed component shows a series of entries in chronological order, such as changes to an object, events related to
an object, or user-driven updates and comments. The latest entry is always on top.

> **Information:** Although both the group feed component and the [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/)
control offer similar features, the group feed component was created explicitly for integration with SAP Jam. The timeline control is more flexible, fully
responsive, and not restricted to a specific source, but doesn’t offer any integration with social collaboration platforms out of the box.

Default (col-1)

## Usage
### Use the group feed component if:
- You need SAP Jam integration.
- You want users to be able to create their own posts.
- You need social interaction, such as replies.
- You expect a long list of posts triggered by the system, the users, or both.
- You want users to be able to create their own posts.

Default (col-1)

### Do not use the group feed component if:
- You don’t need the social features offered by SAP Jam. In this case, use the [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/) control.
- You need social collaboration, but without using SAP Jam. In this case, use the [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/) control.
- You expect only a few entries. Instead, use a simple [feed](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/feedinput/).
- You want to provide a way to upload files. Use the [upload set](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/upload-set/) control instead. You can still use the group feed component to show automated updates about the user’s uploads.
- You require fully responsive behavior and are not dependent on SAP Jam integration. In this case, use the [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/) control.

Default (col-1)

### Placement
The group feed does not have a fixed location on the UI. Where you place it depends on your use case:
- If users need to check the content of the group feed on a regular basis, you can display the group feed component as part of the page content (however, because the responsiveness of the group feed is limited, we advise against placing it in an object page section).
- If the posts and updates are closely related to the content and need to be seen in parallel, you can use the [dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/) floorplan. Alternatively, you can create a separate page with the feed as the central element and show it next to your main content using the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).
- If the group feed component contains only secondary information, or only needs to be accessed occasionally, you can embed it in a [tab](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/) or trigger it dynamically using the [dynamic side content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/).

Default (col-2)

Section Metadata

style

## Responsiveness
The group feed lacks responsive and adaptive behavior. However, it works well in small spaces, such as the dynamic side panel or on a smartphone. If you
require fully responsive behavior and are not dependent on SAP Jam integration, please use the fully responsive [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/) instead.

## Layout

The group feed component consists of: | The following optional features can
be added:
- A header (optional, but highly
recommended)                        | - Filter
- A chronological axis                | - Group
- Posts/entries                       | - Add entries
### Header

The title describes the content displayed along the group feed axis.

### Axis

Along the axis, the entries are arranged chronologically. The distance does not correspond to the time between each occurrence.

The group feed component always uses a single-sided vertical axis. It can be scrolled along its axis.

By default, the latest entries appear on top. Replies are sorted the other way round.

_Vertical feed, single-sided (right)_          | _Vertical feed, single-sided (left)_
### Post (Entry/Feed Update)

Posts can be entered manually or generated by the system (for example, “Object ABC was changed by Mr. X.”). The entry should include information about who changed what, and when (depending on the use case). Typically, posts in the group feed consist of four sections:

1. A **node** Using icons on a node is optional. Use icons for either **all or none** of the posts.
2. A **header section**, which can contain:

- An image or an icon
- Text(s) and/or link(s)
- A time stamp (use [SAP Fiori formatting](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-time))
1. An (expandable) **content section**, which can contain:
- Text(s) and/or link(s)
- Structured or unstructured information
- Images
1. An optional **action section** containing some or all of the actions offered by SAP Jam (such as _Reply_, _Like_, _Bookmark_, or _Share_). You can also offer application-specific actions (see [custom actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/group-feed-component/#custom-actions)).
**Note:** If a section is not used, it should not take up any space within the bubble.
Here are just a few examples of different visualizations. Because the group feed is very flexible, there are also numerous other possibilities.

#### Posts can originate from three sources:

- **Manual post**: A person actively posts to the group feed (or to another place that supplies updates to the group feed).

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
Notes are not the same as group feed posts. They must be kept separate and visualized differently. Like attachments,
users create notes in the context of a business object, typically within a _Notes_ tab.
In the context of a business object, notes have the same character as attachments.
The difference is even more apparent if you compare posts to complex notes created with a rich text editor. These
notes are fundamentally different from posts on the group feed.
To show notes on the group feed, trigger a feed post with a teaser text. For example, “Julie Armstrong added a new
note: Lorem ipsum…”.

## Behavior and Interaction
### Search

Because a group feed can contain a vast number of entries, always offer a search. A search helps users to find what they are looking for without having to scroll through all the posts and updates.

Initially, the search field is closed and only visualized with a search icon. Clicking the icon opens the search field with the focus in the field so the user can start typing.

#### Search in the Group Feed

Carousel (full-width)

### Expand and Collapse

Some updates might be too lengthy to show in full. For these cases, applications can decide to show only a preview and let users expand the post if they want to read it. You can set a limit for the number of lines to be shown (recommended), or for the number of characters.

This example shows a post that previews 3 lines before
truncating and showing a _More_ button in the next line.
Clicking this button expands the post to its full length
and changes the button text to _Less_. Clicking this
button again collapses the post to its previous height.
### Filter (Optional)

For group feeds with several entries or entry types, it makes sense to enable filtering. You can let users filter by entry type and by other useful attributes (such as _bookmarked_). Users can even filter by time range to find posts between two specific dates, months, quarters, or years.

The filter is triggered with the filter icon :filter:
icon in the toolbar.

Depending on the complexity of the group feed, you can
offer different kinds of filter dialog:
- **Single selection**
- **Multi-selection**

- **Multi-faceted filter**
To implement this combination of feed source and filter, use the [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/).

If a filter is set, inform the user in the [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/).

### Refresh

Instead of showing new posts as soon as they arrive (which would interrupt users while they are reading), the group feed offers a very subtle way of notifying users about new posts.

You can place a [message strip](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.MessageStrip/preview) directly below the toolbar to show how many new posts are waiting to be retrieved from the back end.

If a filter is active, the message strip shows alongside
the filter infobar.

### Social Actions

#### Adding a Post
In the group feed, users can add new posts by clicking the plus (:add: ) icon on top of the control. This opens a popover with the focus set inside the text area so the user can start typing right away.
_Post_ sends the user’s text, which then appears in the group feed. To prevent empty posts, the button stays inactive until the user has typed something.
Users can also add [@mentions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/collaboration#mention) (references) to other users or business objects.
#### Replying to a Post
Alongside the _Post_ function, _Reply_ is probably the most basic and essential social feature. Unlike [feed controls](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/feedinput/) (
sap.m.FeedInput and sap.m.FeedListItem), the group feed control enables communication at item level. Feed controls always add entries to the top of the list; there are no
inline replies within the feed. By contrast, the group feed lets users reply directly to a specific entry. The number of replies is shown next to the _Reply_ action, for example, _Reply (5)_.
Clicking the reply link triggers a popover that shows all previous replies, as well as a text area for posting a reply.
#### @Mention
This feature is well known from multiple social networks, and allows users to add a reference to another person or a business object. A “mentioned” person usually receives a
notification about the respective post.
The @mention feature is available in all areas that allow the user to post something:
- Create new post
- Reply (example in the image)
- [Share in SAP Jam dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/collaboration#share-in-sap-jam)
Due to technical restrictions, this feature cannot be used on smartphones\.
### Custom Actions

Applications can provide custom actions by using an overflow menu ([action sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/action-sheet/)).

## Styles

### Icons vs. Bullets

When you design your application, you
can chose between two visualizations
for listing posts on the group feed:  | _Group feed with icons_           | _Group feed without icons_
icons or bullet points.
You can use icons if all entry types
that will appear in the group feed
can be represented by an icon.
If you cannot find icons for all post
types, use bullet points instead.
### Colors

\ \You can use colors to highlight entries in the group feed and to convey semantic information (for example, to indicate the status or urgency of an entry).
## Guidelines

- Only use the speech bubble icon for posts entered manually by users: :post:
  CSS name: icon-post
  HTML Unicode: & # xe 0 a b ; (remove the spaces)
- Do not use colors for decoration. Only use colors to convey semantic information (for example, warnings or errors). 

---

## guided-prompts

**> **Information:** **

This guideline focuses on guided prompts within dialogs. Variants for popovers and side panels are not included.
Product teams may adapt the example provided to fit their use cases.

## Intro

Guided prompts provide structured input fields and controls that help users instruct the generative AI model on the desired output without having to write descriptive \custom prompts\\. Guided prompts are useful when users want to specify attributes, styles, or criteria for the generated content, such as length or language.

Users can provide specific details through form fields and guided UI elements. The system combines these inputs into a backend prompt, offering control and precision in generating output that aligns with user preferences.

*Guided prompt in a dialog*

## When to Use

+------------------------------------------------------------------------------------x------------------------------------------------------------------------------------+
When To Use
+------------------------------------------------------------------------------------x------------------------------------------------------------------------------------+
Do
Use guided prompts when:
- Users typically submit a limited set of queries.
- The system supports only a specific set of actions.
- Users lack experience in writing prompts.
- Users need consistent and predictable outcomes.
- Users need ways to direct the AI model’s output.
+------------------------------------------------------------------------------------x------------------------------------------------------------------------------------+
Don't
Don’t use guided prompts when:
- Users need a high degree of flexibility and control over the outcome. Use custom prompts instead.
- Tasks are repetitive or common within a workflow. Use [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/) instead.
- The use case requires only one or a few specific actions. Use [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/) instead.
- User intents or desired outcomes are uncertain or undefined. Use custom prompts instead.
- Tasks are complex or multi-step, requiring nuanced input. Use custom prompts instead.

## Anatomy

The guided prompt pattern uses a variety of components to enable new AI-specific interactions. In this example, it is based on a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog-web-component/) container that can be triggered via an [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/) or [AI menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/#ai-menu-button-1). Any container or input component available in the design system can be selected and configured by product teams to afford the options provided in the guided prompt. Examples are: [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label-web-component/), [select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select-web-component/), [range slider](https://www.sap.com/design-system/fiori-design-web/ui-elements/range-slider-web-component/), and [segmented button](https://www.sap.com/design-system/fiori-design-web/ui-elements/segmented-button-web-component/). Refer to each component guideline when adopting it in your use case.

1. **Container:** A guided prompt is always based on a container, which provides the structure for content input.
2. **Content:** The content consists of a selection of form input components. The structure and visual design depend on the respective guidelines.

Choose input components based on the use case. Select components appropriate to the context and output, and avoid using dropdown menus as the default for all inputs.
3. **Action:** The action is implemented using the [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/) or [AI menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/#ai-menu-button-1).

The action applies the chosen prompt criteria and ensures AI processing only begins with user confirmation.

This prevents automatic regeneration or loss of content, avoiding unintended AI modifications.

The container includes an explicit cancel option as a safeguard, allowing users to explore guided prompt options and exit at any point, with clear control over the process.

Action placement follows the general guideline for the container. Wording should be ultimately defined depending on the use case\. For more guidance on terminology, refer to the [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#terminology) or [AI writing assistant](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/#terminology) guideline.
## Behavior and Interaction

The guided prompt flow follows a standard interaction pattern based on the chosen container. In this example, users open the dialog, adjust criteria, and confirm to generate content.

### Opening a dialog

Clicking the AI button opens a menu with actions (for example, *Compose Text*) that can trigger the guided prompt.

*Guided prompt button applied to a form input in an object page Floorplan schematic*

### Adjusting criteria

The guided prompt dialog opens with controls to adjust criteria and refine the generated content.

*Guided prompt in a dialog*

### Generating content

Clicking the confirmation action starts content generation based on the specified criteria. As the generation process begins, a busy state is displayed, and the AI button changes into the *Stop Generating* button, allowing users to stop generation at any time.

*Busy state behavior during the generative AI process*

Refer to the [AI writing assistant](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/) and [regenerate](https://www.sap.com/design-system/fiori-design-web/ui-elements/regenerate/) guidelines for how to handle warnings about overwriting content when versioning is not supported.

Refer to the [busy indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/busy-indicator-web-component/) guideline for when and how to display the indicator during content generation.

### After generation

The AI-generated content appears in the respective field, and the AI button transitions back to the default state.

*Content generated with guided prompt*

### Handling errors

If the guided prompt is interrupted or fails, follow the guidelines for error messages in the [message handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) guidelines.

For a consistent user experience, we suggest using the following error message:

*Something went wrong while generating your content. Please try again.*

*Error handling for content generation using guided prompts*

### Combining with quick prompts

The AI menu button can be used to combine the easy access for predefined actions of quick prompts with the structured controls of guided prompts.
Add a meaningful action to trigger the guided prompt dialog. In the example, the menu item is labeled *Compose Text*, but the final wording should be \tailored to the use case.
For more information, see the guidelines for [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/) guidelines and [grouping AI actions](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#grouping).
## Recommendations

### Example scenario: Text composition

One of the most common scenarios for using guided prompts is text composition. Since the guided prompt pattern reuses existing components, you must follow the guidelines for the chosen components.

The following are some examples of prompt criteria that could be used in the context of text composition.

#### Language
*Select component used to provide language options*

#### Text length
*Range slider used to set the length of generated output*

#### Application-specific criteria

For scenarios such as generating a customer response or
handling different types of support responses, criteria
such as *Type of Response* can be added, and the selected
type can be used as a reference for the content
generation process.
## Terminology

The following guidance is based on the default labels provided in the [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#terminology) guidelines. We strongly recommend maintaining these labels to ensure consistency and support user familiarity across AI tooling. Adjust the labels only as needed for your specific use case\.

#### Standard AI action labels for AI text generation and transformation

**Table (col-width-30-70)**

AI Button Labels

Compose Text
generation.

Revise

**Table (col-width-30-70)**

AI Action Labels for Input Components

Structure
paragraph or list.

Text Length

Language

Tone of Voice

**> **Guideline:** **

For actions not covered above, apply the following guidelines:
- Use a verb in the imperative.
- Keep AI action labels as short as possible while prioritizing clarity for users.
- Use the same AI action labels consistently.
For more information, see [UI Text Guidelines for SAP Fiori Apps](https://www.sap.com/design-system/fiori-design-web/v1-136/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#word-choice).

---

## html

## Intro

The HTML control allows you to display rich text or add freestyle HTML to your apps. This helps to cover use cases that would otherwise not be possible with standard SAP Fiori controls.

> **Warning:** If you opt to use freestyle HTML, **you \must make sure\\ that standard capabilities such as theming, accessibility, and responsiveness are supported**.
For more information, see [Top Tips](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/HTML/#toptips) below.

## When to Use

> **Information:** Be aware that implementing custom content **costs time and effort for development**.

### Use the HTML control to display:

- (External) HTML content, such as work instructions or articles with images or videos.
- User-created HTML content.
- Content created with the [rich text editor](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/rich-text-editor/) (as a live view during creation, or in read-only mode).
  (While [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/) only supports a limited set of tags, using HTML will give you the full set of HTML tags.)

### Do not use the HTML control to display:

- In-app help or explanations on how to use your app. Use [SAP Companion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/web-assistant) instead.
- A simple and short text. Use the [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) control instead.
- A semantically-colored text or a status. Use the [object status](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-72/ui-elements/object-display-elements/#-object-status) instead.
- An object name with a brief descriptive text. Use the [object identifier](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/) instead.
- A number or total. Use the [object number](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#object-number) instead.
- A currency. Use the [currency](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/currency/) control instead.
- A label. Use the [label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/) control instead.
- A single headline. Use the [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/) control instead.

## Components

Where possible, reuse existing controls inside your freestyle content. Do not reinvent standard controls, such as [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) or [popovers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/). Instead, use the the available controls that are described in the SAP Fiori Design Guidelines.

## Behavior and Interaction

When creating freestyle content, always apply the [SAP Fiori design principles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/design-principles). Design your interactions on the basis of these principles and build upon existing, established patterns.

If part of your content looks similar to an existing control, it should behave similarly. Do not change established interactions or patterns just because freestyle HTML allows you to, or because it looks more fancy. Users appreciate consistency.

## Responsiveness

Using freestyle HTML comes with responsibilities. Making sure your content is responsive and adaptive is one of them.

If you have a large amount of content, consider an adaptive approach: Don’t try to cram all the content you show on a desktop into a mobile version of your app. Instead, think about how your customers would use this app while away from their PC. For more information, see [Multi-Device Support](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness).

## Example

The following image showcases how freestyle HTML can be used to create step-by-step work instructions by combining formatted rich text and videos. If you follow the SAP Fiori design guidelines, the freestyle section integrates seamlessly into the SAP Fiori application (shown here as a schematic object page layout).

## Top Tips

Using freestyle HTML means that you are responsible for taking care of certain aspects that are otherwise covered automatically by standard SAP Fiori controls:

- [SAP Fiori design principles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/design-principles)
- [Theming](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/theming): Ensure correct theming if the HTML is part of the UI. This is not necessary if the HTML content is entirely user-created.
- [Accessibility](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/product-standards/accessibility-in-sap-fiori): For example: contrast ratios, screen reader support, HCB
- [Multi-device support](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness): Support all screen sizes for both touch- and mouse-enabled devices, including adaptive and responsive behavior.
- **Multi-browser support**: Make sure your custom content is displayed correctly on all prevalent browsers.
- **Performance**: Optimize performance and ensure that your custom content does not slow down the app or the user’s workflow.
- **Translatability**: Make sure that your content is translated correctly.
- **Security**: See the warning below.

> **Warning:** By default, the HTML content (property: `content`) is not sanitized and is therefore open to XSS attacks. App teams must either sanitize the content themselves, or activate automatic sanitizing with the `sanitizeContent` property. For more information, see the [API reference](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.core.HTML).

---

## image

## Intro

Images are a powerful way to capture the user’s attention and to communicate your message. You can use the image control to integrate images into your apps for dedicated purposes.

## When to Use

### Use the image control if:

- You want to display decorative images. Decorative images serve as a visual eyecatcher and are useful to transport the brand identity. Usually, decorative images are used as hero images, headers, or background images.
- You want to display images to support or enhance the page content (for example, visual representations of an object’s design, functions, or features).
- You want to display images in a gallery.

### Do not use the image control if:

- You want to display an image, initials, or a placeholder for a person. Use the [avatar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/) instead.
- You want to display standardized images for business-related content (such as products, parts, product and company logos, or ad campaign images). Use the [avatar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/) instead.
- You want to display icons. Use the [avatar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/) instead.
- You want to display images with a transparent background. Use the [avatar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/) instead.
- You want to display a placeholder image. Use the [avatar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/) instead.
- You want to display pictures in a carousel. Use the [carousel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/carousel/) control instead.

## Behavior and Interaction

Images can be non-interactive or interactive. Most commonly, clicking an image opens a [lightbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/lightbox/) or new tab/window and displays a larger version of the image. If you plan to open a popover or dialog, ensure that this information is announced by the screen reader beforehand (property: `ariaHasPopup`).

The control also offers an image map option, where one image can have several click areas. Don’t use this option. It’s a relic of past times and has the potential to cause usability issues.

## Guidelines

### Screen Reader Details

- Provide an [alternative text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/product-standards/accessibility-in-sap-fiori#screen-reader-support) for each image for screen reader users. Use the alternative text to describe the visual content specifically for blind or visually impaired users. Only decorative images don’t require an alternative text. The alternative text can also be helpful for sighted users if the image is not available or cannot be displayed.
- An image can be decorative only. Images are considered as decorative if the same information is also conveyed in another content element and the image content is secondary. In other words, if the image doesn’t provide any additional value, it’s decorative. Decorative images are not announced by screen readers.
- In addition to the alternative text, you can also provide screen reader users with more details about an image (property: [ariaDetails](http://veui5infra.dhcp.wdf.sap.corp:8080/sapui5-sdk-internal/#/api/sap.m.Image%23associations)). For example, images that display technical or scientific content may require background knowledge to understand the image. In the image details, you can include this background knowledge in in text form. For example, if an image shows the construction of a turbine, and certain formulas are required to understand it, the details would describe the formulas first and then relate them to the displayed image content.

### Image File and Quality

- It is extremely important that you
choose the right file format when
saving your images. Four image formats  | _Good quality_          | _Poor quality_
are used consistently in browsers –
PNG, JPG, GIF, and SVG.
- When choosing the format for your
image, always be conscious of the image
quality and file size.
- Optimize high-resolution images to
avoid unnecessarily large files. Large
image files can severely impede page
performance.
## Responsiveness

The image size adapts |  |
responsively to the   |                             |
screen size.          | _Images on size S_          | _Images on size M_          | _Images on size L_
You can also set a    |                             |
fixed width and/or    |                             |
height for an image.  |                             |
## Examples

---

## invisible-message

## Intro

The invisible message control provides a hidden message that can be used by assistive technologies, such as screen readers. Invisible messages provide information to users when the visible screen content changes dynamically (for example, when a page is refreshed).

## When to Use

### Use the invisible message if:

- You need to offer accessibility support to communicate dynamic changes on the interface that are visually perceptible.
- You need to provide a message for screen reader users independently of the focus position.

### Do not use the invisible message if:

- You want to provide static and visible, but non-focusable information for users of assistive technologies. Use the [invisible text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/invisible-text/) instead.
- You want to provide additional information for users of assistive technologies that is not available for sighted users. While you should not discriminate users of assistive technologies, you should also not give them “privileges” .
- You want to hide information. It might still be available for users of assistive technologies.
- You want to hide long texts. The information is probably important enough to be shown! Furthermore, short texts are far more convenient, even for users of assistive technologies.

## Examples

The examples below show typical use cases for invisible messages.

> **Information:** Invisible messages may also be provided by the framework as an intrinsic part of the control. If no message is
provided out of the box, you must create one.

#### Search

- Indicate when a results list is rendered following a [search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/).
- Indicate the number of hits found.
- Provide a short hint on how to get to the result list.

#### Navigation within Dialogs
Indicate when the entire content of a dialog changes. Provide accessibility support for [navigation in a dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/#navigation-in-a-dialog). | _Dialog navigation - List_          | _Dialog navigation - Details_

#### Saving
Indicate when the page or a form has been saved in apps with or without [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling).

**Auto-Update**

Use an invisible message to indicate:

- When a page has been refreshed
- When data on the page has been updated automatically
- When an entry in an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) has been corrected automatically

#### Deletion

Provide a success message when an item has been deleted. Refer to the [UI text guidelines for message toasts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/#message-toast-texts).

#### Dynamic Messaging
Indicate when a [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/) has appeared automatically and provide its content.

#### Dynamic Change in a Control
Indicate when a user action has changed the appearance of a control (for example, if pressing a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) changes the button text or icon tooltip).

**Busy Indicator**
When a busy indicator appears on the screen, ensure that
it is announced by screen readers. Deliver one message
when the page gets busy and another one when the busy
state ends.
The use case is valid only for full screen busy scenarios
lasting at least 1-2 seconds.
## Top Tips

- Provide short and meaningful texts.
- Avoid mentioning system or configuration details.

---

## lightbox

## Intro

The lightbox control allows the user to view an image in its original size. This control displays the image in a popup while dimming the rest of the screen.

## Usage

### Use the lightbox if:

- The thumbnail view is not detailed enough, and it would help the user to see the image in its original size.
- The original size of the image is bigger than the thumbnail.

### Do not use the lightbox if:

- The image you are using is smaller than or as big as the thumbnail.
- There is another click event attached to the [image control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/).
- You are using an image placeholder to display the object.

## Responsiveness

The lightbox container is displayed in the middle of the screen.

The image is displayed in its original size unless the original image size is bigger than the size of the screen. In this case, the image is resized proportionally in order to be fully visible and fit on the screen.

On a mobile device, flipping the device to landscape mode will flip the lightbox. The image will then be adjusted to fit the new dimensions.

## Components

The lightbox contains the following components:
1. **Lightbox container:** This is the main container that holds all other components.
2. **Image:** This component is an embedded [image control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/) that displays the image file with the maximum available size. The size of the image should not exceed the original size and it should fit within the screen.
3. **Image title:** This component is mandatory and is used to describe the object to which the image is attached.
4. **Image subtitle:** This component is optional and is used to give additional information about the object.
5. **_Close_ button:** This is a mandatory component and is used to close the lightbox container.
## Behavior and Interaction

### Basic Interactions
The lightbox control is attached to the press event of the [image control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/).
To trigger the lightbox, the user should click an image. Every image with an attached lightbox control is indicated with
a zoom icon on the bottom right.
When the lightbox control is triggered, the lightbox overlays the page content and the rest of the screen is dimmed out.
If it takes more than one second to load the original image, a [busy indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/busy-indicator/) is shown inside the lightbox container.
The user can close the lightbox by clicking the _Close_ button or by clicking outside of the lightbox container.
Default (col-1)

### Error Handling
An [illustrated message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/illustrated-message/) is displayed inside the lightbox when:
- The original file is missing or the connection to the server is lost.
- The image takes more than 10 seconds to load due to a server error or the size of the image.

> **Hint:** The URL of the image is mandatory. If it is not specified, the lightbox will not be triggered.

Default (col-2)

Section Metadata

style

---

## maps

## Intro

Maps are used to visualize data in an easy and intuitive way. A map is a symbolic visual illustration of areas, regions, and themes. SAP Visual Business supports analytic maps and geographic maps.

The **analytic map** shows regions such as continents or
countries. Another term for this kind of map is a
choropleth map.
In the context of a business application, the analytic
map is useful for displaying quantitative or qualitative
data by coloring various regions.
The analytic map is the best choice if you want to
visualize region-specific values, such as for visualizing
the sales revenue for different countries.
The **geomap** displays geographic elements like roads,
cities, forests, and other details and is mostly used for
navigation. In the context of a business application, a
geomap is useful for displaying points of interest, area
objects, or other charts over the map.
The geomap is the best choice if you have location-based
data, and you want to show a road map, satellite map, or
another specialist map in the background. For example, a
geomap is good for visualizing the revenue of stores.
In addition to the analytic map and geomap control, the [SAP UI5 map container control](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/map-container/) provides you with a toolbar on top of the map. It also enables you to switch between maps and charts, includes personalization, provides a full screen mode, and enables you to include a list panel stack for displaying content on top of the map.

## Components

A map can include any of the following elements:

- Toolbar (optional)
- Navigation tools:
  - Legend (optional)
  - Navigation control (optional) and scale (optional)
- Symbols for improved visualization of use cases:
  - Spots (optional)
  - Labels (optional)
  - Circles/geocircles (optional)
  - Areas (optional)
  - Routes (optional)
  - Container (optional) – here an arbitrary SAPUI5 control or chart can be shown on a map

### Toolbar

If you need a toolbar, use the [SAP UI5 map container control](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/map-container/).

### Navigation Tools
#### Legend
A panel containing a legend is displayed and expanded by
default. You can collapse, expand, hide, or move the
legend anywhere on the map if necessary.
The legend can be used interactively, in which case you
have to enable the legend click event, which is provided
by the control.
#### Navigation Control and Scale
Use the navigation control only if you do not use the
chart container toolbar.
The navigation control is responsive and adapts to mobile
and desktop devices. For mobile devices, the zoom
function is visualized by using “_\+_” and “_–_”, while
an extended navigation tool is used for the desktop
version.
The scale of a geomap is shown by default, although for
analytic map it is not.
### Symbols for Improved Visualization of Use Cases
#### Spots
You can use spots to visualize specific locations on the
map. There are five different types of spots: the default
blue spot without any semantic value and the four
semantic spots with icons. Adding numbers or text to a
spot will replace an existing icon on the spot.
If you want to use a number with more than one digit, or
text with up to five characters, you can use the relevant
predefined spots that are provided. Spots are available
for numbers containing up to one, three, and five digits.
For text, spots are available for up to five characters
(in all five colors). Use the label for numbers or text
that exceed these limits. Ensure that numbers and texts
on spots are not translated; if this is necessary, use
labels.
#### Labels

You can use a label to provide more information about a symbol. The label supports multiple lines and should be equally aligned for a group of symbols; for example, use the same alignment for all labels of spots.

For routes, the position of the label adapts to the map section. In other words, the label moves on the route so you can always see it at any zoom level. If a label is not sufficient, we recommend you use a container with the appropriate SAPUI5 control.

The label is available in five different colors: the default (neutral) white label and the semantic labels. The label adapts to the number of digits, and the content of the labels is translated if necessary.

In cases where a spot is insufficient, for example, if you want to include content that needs to be translated or that exceeds five characters, you can use a label instead of a spot. The label is available in four semantic colors, with or without anchors. It can be used as a standalone without any other symbols, like spots or routes.

_Default label on a route_          | _Standalone labels with semantic colors, with and without anchors_
#### Circles/Geocircles

You can use circles to visualize specific, quantitative parameters, while geocircles can be used to visualize specific sizes or measures. The difference between circles and geocircles is as follows:

- Circles: Radius is given in pixels – constant screen size.
- Geocircles: Radius is given in meters – constant size in reality.

A use case for circles on a map might be to show the size of the biggest towns in a region or the revenue of a company per production location.

_Analytic map displaying two parameters_           | _Geomap with circles_
#### Areas

You can visualize personalized areas. This can be used, for example, for visualizing regions such as countries or zip code zones.

_Analytic map with areas (based on regions)_           | _Geomap with areas_
#### Routes

Routes can be displayed on maps with varying levels of detail, such as a map of the world or a local/national map depicting transport networks. For both levels of detail, app developers can adjust the following properties:

- Dot width: The default dot width for a route is zero, which results in a solid line. You can adjust the dot width to enable dotted or dashed lines, or a combination of dots and dashes.
- Route width: App developers can choose an appropriate route width. We recommend a route width of 3 px.
- Color: We recommend that you use the SAP Fiori chart colors.
- Arrow head: The route does not have an arrow head by default. You can enable an arrow head for the start and end points by changing the start or end property to 1.
- Direction indicator (only if arrow heads are enabled): The direction indicator is not set by default. If the direction of a route should always be visible, you can use the direction indicator, which displays additional arrows/triangles on the route as soon as the start or end point arrows are outside the visible area. In addition to the direction indicator, we recommend that you also use a white borderline.
- Borderline: No borderline is set by default. For accessibility reasons, we recommend that you only use a borderline to make a route more visible on the map.
- Curved route: Routes are displayed as straight by default. You can change them from straight to curved to display flight routes or bidirectional routes.

For accessibility reasons, we recommend that you use not only color, but also dot width for differentiation purposes. For example, use a solid line for planned routes and a dashed line for unplanned routes.

_Analytic map with route_           | _Analytic map with flight routes_           | _Geomap with route_

#### Container
You can use containers to display an arbitrary SAPUI5
control on the map. The map control only provides the
container. The default container is transparent without a
border. The app team can personalize the container (in
terms of fill, border, and size) and add an arbitrary
SAPUI5 control.
## Behavior and Interaction

### Zoom

There are four ways of performing a zoom:

- Navigation tool: use the navigation controls to zoom in and out.
- Mouse wheel: use the mouse wheel to zoom in and out.
- Gesture: on a touchscreen, use the ‘pinch and spread’ gestures.
- Keyboard: use the ‘+’ and ‘-‘ keys to zoom in and out, or use the ‘Z’ key to use the rectangular zoom.

### Thumbnail Mode (Minimized Map Control)

The map control can be minimized to a thumbnail, which can be used for tiles on the [SAP Fiori launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) or for the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/). Note that the thumbnail is a full-scale VBI control. If you use data binding, the thumbnail is updated automatically.

The app development team can specify the size of the thumbnail.

In the minimized state, only the thumbnail click event is available; all other mouse, keyboard, and touch events are disabled.

### Clustering
To avoid cluttered screens with too many objects on the
map, you can use one of three cluster algorithms:
- Grid clustering: Visual objects are clustered based on a
grid. You can have multiple grid-based clusters. The
visualization object is placed in the center of the grid
cell with a specified offset.
- Tree clustering: Complex clustering based on Voronoi
diagrams. The clustering itself is based on the areas in
the Voronoi diagram, and cluster objects are aggregated to
a hierarchy over several levels of detail.
- Distance clustering: Visual objects are clustered based
on the visible distance between them. Objects are
aggregated to a cluster object as long as they are within a
specified range from the start object. The start object of
a cluster is not specifically defined; only the nearest
object that does not belong to a cluster is taken. The
visualization objects are placed in the center of gravity
of the covered objects. Thus the actual distance between
them may vary. This type of clustering is fast, but the
results may not be very convincing.
The control for visualizing clusters provides cluster icons
in the four semantic colors (four types). If no type or
text has been set, the default neutral, gray cluster is
used. App developers can personalize the icons provided as
follows:
- Change color
- Change icon
- Add text
- Replace the cluster icons provided with their own
_Unclustered spots_           | _Example: distance clustering with personalized semantic cluster icons_           | _Example: grid clustering with personalized semantic cluster icons_

### Select

You can choose different selection modes: single selection to select a single item, and rectangular or lasso selection to select multiple items. You can also use the Shift key to add items to an existing selection, and the **Ctrl** key to select/deselect items.

#### Single Selection

This is the default selection mode. You can click your mouse button to select an object, while at the same time deselecting a previously selected object.

#### Rectangular Selection

You can switch to rectangular-selection mode by pressing the ‘R’ key. The cursor changes and you can use your left mouse button to draw a rectangle. Each object that lies within the rectangle is considered selected. Press the ‘R’ key again to leave this selection mode and return to single-selection mode.

#### Lasso Selection

You can switch to lasso-selection mode by pressing the ‘A’ key. The cursor changes and you can use your left mouse button to make a lasso selection. Each object that lies within the lasso is considered selected. Press the ‘A’ key again to leave this selection mode and return to single-selection mode.

### View Tooltip

For desktops, a tooltip is enabled to provide additional information about the symbol.

### Keyboard Shortcuts (desktop only)

Table

**Action**

Lasso selection

Rectangular selection

Zoom in

Zoom out

Rectangular zoom

Move

Go to initial start position

## Styles

### Analytical Map

#### Colors

For general rules about using colors in charts, see [Chart – Color Palettes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/). You can define colors programmatically for each region.

#### Default Colors
Water and regions have default colors. The color of water
cannot be changed. The color of each region can be
changed individually. Keep the default color if the
region has no data.
#### Regions Only

#### Colors from Qualitative Palette

Use colors from the qualitative palette to highlight
particular regions. Use the first color of the
qualitative palette. Also use colors from the qualitative
palette to separate regions into distinct groups. Note
that colors from the qualitative palette have no semantic
value. For example, do not choose a color because it is
blue or green as the hue associated to these colors may
change in the future or may be customized by the
customers. Start by using the first color and then the
second color and so on, unless there is a good reason for
not doing so. If there is no data for a region, keep the
default color.
#### Colors from Sequential Palette

Use colors from the sequential palette to encode quantitative differences, that is, to visually represent the idea of level, progression, or graduation. If there is no data for an item, keep the default color.
See the section on _How to Use the Sequential Palette_ in the [Chart – Color Palettes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/) article.

#### Colors from Semantic Palette

Use colors from the semantic palette to show that data
points are bad, neutral, or good. If there is no data for
an item, keep the default color.

#### Colors for Symbols

#### Symbols and Regions
Map with Circles/Geocircles
If you need to display circles over a map and use
sequential colors for the regions, use the sequential
palette with the following colors:
Table
Region                     | Circle                           | After
Multiple brightness of the | sapUiChartPaletteSequentialHue2; | @sapUiLightestBorder
first hue                  | Opacity: 60%
See the section on _How to Use the Sequential Palette_ in the [Chart – Color Palettes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/color-palettes/) article.

## Guidelines

### General Guidelines

- If you want to include a toolbar and/or show additional content on a map, use the [SAP UI5 map container control](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/map-container/).
- Use the sequential color palette if there are no more than six different states. If you have more than three states, we recommend that you use the tooltip or legend in addition to the colors to provide detailed information. The reason for this is that the contrast of the colors for maps is too low to differentiate all colors at first glance. The sequential palette aims to highlight the most interesting states by using the darkest and the lightest color.
- Use the qualitative color palette if you want to visualize various states that are independent of each other, such as election areas.
- Use the semantic palette if you want to express good versus bad states, such as with revenue figures.
- If you want to display two regions with specific parameters, a combination of coloring the regions and using circles would be the best choice. Avoid overlaps by providing different aggregation levels at different zoom levels. Note that there could be problems with relating a parameter to the radius of a circle because a user will compare the area and not the radius. The area has a quadratic relation to the radius. Consequently, a smaller number looks very small and cannot be visually compared with other values.

---

## menu-web-component

## Intro

A menu offers the user a list of alternative actions. The
actions can also be grouped in submenus.
## When to Use

Do
Use the menu:
- If you need to offer more than one action.
- If users need to stay in a certain context.
- If there are only a small number of actions.
## Anatomy

### Menu

1. **Menu:** Container that is shown as an overlay.
2. **Menu item:** List item inside the menu that represents an action.
3. **Separator (optional):** Horizontal line that groups the menu items visually.

### Menu Item

1. **Text:** Describes the action that is triggered by the menu item. The text is mandatory.
2. **Icon (optional):** Visualizes the action that is triggered by the menu item.
3. **Additional text (optional):** Provides additional information relating to the menu item (such as shortcuts).
4. **Navigation indicator:** Indicates that a submenu is available for the menu item.
The visualization of the menu item adapts automatically, depending on which elements
are included.
## Types

The menu can be basic, with only a single list of options, or can contain menu items with submenus.
The elements within a menu item can be combined in various ways. The minimal variant is to show only a text. If a
menu item has subitems, an additional text won’t be shown, since the space is needed for the navigation indicator.

### Variants Without Icons

- Text only
- Text and additional text
- Text and navigation indicator (subitems)
with navigation indicator)_

### Variants with Icons

- Icon and text
- Icon, text, and additional text
- Icon, text, and navigation indicator (subitems)
text, with navigation indicator)_

## Behavior and Interaction

Initially, the menu is closed and therefore not visible.
- Clicking the reference control opens the menu (for example, a [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/menu-button-web-component/)).
- Clicking a menu item without submenu indicator triggers the respective action.
- Clicking a menu item with a submenu indicator opens the submenu next to the main menu. The cursor can now be moved to the submenu while all other
levels remain open. For each submenu, the same navigation principles apply as for the main menu. Multiple submenus are possible.
- Clicking outside the component closes the menu.

---

## message-view

## Intro

You can use the message view to display messages that are not related to form or table fields. These messages are triggered in response to a user action.

Although the message view can be embedded within various controls, we recommend that you use it only within a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/).

## Usage

### Use the message view if:

- You want to display multiple messages triggered by an action within a disruptive [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/).

### Do not use the message view if:

- You want to display messages for form field validation. Instead, use the [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/).
- You want to display a single message that interrupts the user. Instead, use the [message box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/).

## Responsiveness

The responsiveness of the message view is determined by the [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/#responsiveness) container in which it is embedded.

## Layout

### Filtering

#### Multiple Message types – Filtering by Message Severity
If different types of message are available, users can
filter messages by type (error, warning, success, and
information) using the segmented buttons at the top of the
message view.
#### One Message Type Only – Filtering Hidden
The filter bar is hidden if there is only one type of
message (for example, only errors).
### List

#### Short Description (1)
A simple and helpful short message text.
#### Subtitle (2)
You can use the subtitle to give your message a description that helps users to identify the object they are looking for.
#### Navigation to Message Details (3)
If message details are provided, the message view automatically provides a chevron on the right-hand side for navigating to the [message details](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/message-view/#message-details).
If the view contains only one message that also has message details, the message details page is displayed by default.
#### Aggregating Messages (4)
You can aggregate messages by filling out the counter property of each list item.
The message view only provides the counter property. The aggregation itself must be implemented by the app team.
#### Short Description (1)
A simple and helpful short message text.
#### Subtitle (2)
You can use the subtitle to give your message a description that helps users to identify the object they are looking for.
#### Navigation to Message Details (3)
If message details are provided, the message view automatically provides a chevron on the right-hand side for navigating to the [message details](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/message-view/#message-details).
If the view contains only one message that also has message details, the message details page is displayed by default.
#### Aggregating Messages (4)
You can aggregate messages by filling out the counter property of each list item.
The message view only provides the counter property. The aggregation itself must be implemented by the app team.
### Message Details

The detail view has the following parts:
1\. Back-end short text
2\. Back-end long text
3\. Optional link
## Behavior and Interaction

#### Navigation to Message Details
If the backend contains a long text, the user can click
the arrow/chevron on the right-hand side to view the full
text in the message details.
#### **Life Cycle**

We recommend that messages no longer be displayed after the user closes the dialog (sap.m.MessageBox/sap.m.Dialog).

---

## micro-process-flow

## Intro

The micro process flow control enables you to visualize
the state of individual items in a linear workflow. You
can embed it into a list or a table.

## Usage

### Use the micro process flow if:

- You need to show the state of each step in a linear, multi-step process.
- Users need to see the progress of multiple items displayed in a list or table at a glance.

### Do not use the micro process flow if:

- You only need to show the state of a single-step process. Use the [progress indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/) or [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status) instead.
- You want to visualize a complex non-linear workflow. Use the [process flow](https://www.sap.com/design-system/fiori-design-web/ui-elements/process-flow/) instead.

## Responsiveness

The micro process flow is responsive and adapts to the
size of its parent container. If the micro process flow
is too long for the parent container’s width, you can
choose how it should behave:
- **Simple wrap**: Steps that don’t fit into the width of
the parent container wrap to a new line.

- **Overflow**: Navigation arrows appear on both sides of
the micro process flow, with the number of hidden steps
indicated next to each arrow. By clicking the navigation
arrows, users can scroll horizontally through all of the
steps in the micro process flow.
The micro process flow control supports [cozy and compact form factors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/cozy-compact).
## Layout

The micro process flow acts as a generic container in
which process steps are laid out linearly along the
horizontal axis. The control provides the following
layout options:
### Default

Default (col-1)

The process steps appear as icons with a circular background. They use semantic colors and provide click events. You can choose from different icons provided by the [SAP icon font](https://www.sap.com/design-system/fiori-design-web/foundations/visual/iconography/iconography-horizon#sap-icon-font).

> **Guideline:** **Always replace the default icons** with icons that fit to your use case.

Default (col-2)

Section Metadata

style

### Custom

Default (col-1)

The default steps can be replaced by other controls. The following controls are supported:
- [Status indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/status-indicator/)
- [Micro chart](https://www.sap.com/design-system/fiori-design-web/ui-elements/micro-chart/)

> **Guideline:** Make sure that you replace the default tooltip texts from the original icons or controls with the names of individual steps in the process. For example, _Payment_, _Shipping_, _Delivery_. For more information, see [Using Tooltips](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/using-tooltips).

Default (col-2)

Section Metadata

style

## Types

There are two micro process flow types: one with
dependent steps and one with independent steps.
### Dependent Steps (Default)
Default (col-1)

The dependent steps come with a connector line that appears between the process step and the step that follows it.
Use this type when the completion of a step is a precondition for the subsequent step.

> **Guideline:** When customizing the width of the connector lines, the minimum width must not be less than the default width, and the
maximum width must not exceed the step width or step height (whichever is greater).

Default (col-2)

Section Metadata

style

Default (col-1)

You can also indicate the state of the transition between two steps with a suitable icon.

> **Guideline:** The width of the icon must not exceed 60% of the connector line width. The height of the icon must not exceed the
size of the step node.

Default (col-2)

Section Metadata

style

### Independent Steps

Independent steps are not connected and can be processed
in any order. Use this type when the user doesn’t need to
perform the steps in a linear sequence.

## Guidelines

### Popover with Step Details

Users often need more information about a step. To provide more details, add an on-click [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/) for **each** step. Also add a click event for each step to invoke the popover.

### Exchange Default Icons

Always exchange the default icons and | Do                                  | Don't
replace them with icons that best fit
your use case and line of business.   | ---                                 | ---
_Use case-specific icons_           | _Former default icons_

---

## multi-combobox

## Intro

The multi-combo box control is commonly used to enable users to select one or more options from a predefined list. The control provides an editable input field to filter the list, and a dropdown arrow to open the list of available options. The select options in the list have checkboxes that permit multi-selection.

## Usage

### Use the multi-combo box if:
- The user needs to select one or more options from a
long list of options (maximum of approximately 200).
- The values of the option list contain secondary
information that does not need to be displayed right
away.
- Your use case requires more options to choose from. In this case, consider using the [multi-input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/), either with the [select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) or [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) (for more than 1000 items).

> **Information:** For more information on which selection control to choose, see the [selection control overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#choosing-the-right-control).

## Responsiveness

The multi-combo box is optimized for keyboard and mouse interaction.

_Filter bar with multi-combo box - Size S_          | _Option list in full screen - Size S_

Also see the section on [behavior for mobile devices](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/#behavior-for-mobile-devices).

## Components

### Input Field
The [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) (2) can display a placeholder text (6) when it’s empty, or a [token](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/token/) (1) if a value is selected.
### Dropdown Trigger
The dropdown button (3) collapses and expands the dropdown list.
### Option List
The option list (7) contains a list of selectable options (5). Clicking the label of an entry closes the option list and creates a token for the selected
option. To enable multi-selection, every entry also has a [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) (4). Clicking a checkbox creates a token. The option list remains open.
### Two-Column Layout
Use the multi-combo box with a two-column layout if you
need to display additional information for the selection
options, such as currencies, country abbreviations, or
system abbreviations.
## Behavior and Interaction

### Select a Value

Default (col-1)

There are three ways to select an item from the list:
- Tick the checkbox (option list remains open).
- Click the label of a select option (option list is closed).
- Use the keyboard (space bar or Enter).
The user clicks the input field to place the cursor in the field (1). Clicking the down arrow displays the list (2). As the user types into the input field, the list is filtered accordingly (3). The **arrow up** and **arrow down** keys move the focus within the list (4), while the typed text remains in the input field. Selected options are automatically entered into the input field as tokens (5).
If the user selects items from the filtered option list (3) by clicking the checkbox or by pressing the **space bar** on the keyboard, the text entered in the input field remains. The option list stays open. If the user selects items by clicking the label or by pressing **Enter**, the entered text is cleared and the option list is closed.
The **shift** key can be used to select a range of items (**shift\+click** marks the end of the range, **shift\+arrow up** / **shift\+arrow down** extends or narrows the selection range in the corresponding direction. **Ctrl\+A** selects or deselects all items. If selecting all items is a common use case, you can also show a _Select All_ [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) at the top of the list (property: `showSelectAll`).

> **Hint:** With the `showitems` API, you can open the option list without having the dropdown arrow in a pressed state. Clicking
the arrow again opens the full option list and sets it to pressed state. This way, you can show some items on focus
and all items on click.

Default (col-1)

#### Input Field
Any character in the input field acts as a filter for the option list. The input field only allows users to type text
that matches the items in the list. If the user tries to enter character combinations that are not in the option
list, visual feedback is provided to indicate that the combination of characters is invalid, while the input field
suppresses the characters entered.

Default (col-2)

Section Metadata

style

#### Choose from Option List

The option list displays all the available items that the user can choose from. Clicking the arrow opens the option list below the field. If there is not enough space to display the dropdown list below the field, it is displayed above the field instead.

### Reviewing Tokens

If tokens have been selected, and the multi-combo box is
not in focus, the input field displays as many tokens as
possible in the available space. If more tokens have been
selected, an _[n] More_ label indicates the number of
hidden tokens. The tokens in the input field appear in
the order in which they were selected.
Clicking the _[n] More_ label opens a popover below the
input field, in which all selected items are shown. The
user can deselect an item by clicking its checkbox or
label.
If the length of the last selected token exceeds the width of the input field, a label _[n] Item/s_ is shown when the field is not in focus.
Clicking the _[n] Item/s_ label opens a popover below the input field, in which all
selected items are shown. The user can deselect an item by clicking its checkbox or
label.
If there is only one token in the input field and its length exceeds the width of the
input field, the text is truncated. Clicking the token opens a popover below the input
field, in which the full text of the token is shown.
### Filtering the Option List

Default (col-1)

When the user starts typing in the input field, the option list is filtered. Only items that match the characters entered are shown in the dropdown list. The default filtering method is “starts with per term”, which matches the
beginning of each word in an item’s text.
In addition, application developers can set a custom filtering method “starts with” or “contains” (method: [setFilterFunction](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.ComboBoxBase/methods/setFilterFunction)). The “starts with” approach filters only for items where the beginning of the label matches the query entered. The “Contains” approach searches the full label for a match.
As a visual hint for the user, the matched characters are highlighted in the option list items. The highlighting works on the basis of “starts with per term”, regardless of the filtering method.
If the filtered option list contains items that start with the characters entered by the user, the first matching, unselected item is auto-completed in the input field.

> **Warning:** The typeahead input feature is not available for Android devices.

Default (col-2)

Section Metadata

style

### Grouping

Option list items can be grouped.
Visually, the group header is a
separate line above the items it      | _Grouping_           | _Grouping on phones_
groups. It does not currently provide
an interaction of its own.
### Clear

You can add a :decline: (_Clear)_ icon to the combo box (property: `showClearIcon`). The icon appears as soon as the combo box has non-tokenized text. Clicking the _Clear_ icon removes the non-tokenized text from the field.
If you offer the _Clear_ icon, make sure that the multi-combo box is wide enough to show the
icon in addition to the value.
### Behavior for Mobile Devices

The following sections describe how the multi-combo box interacts on mobile devices.

#### Clicking the Arrow
Clicking the arrow opens the option list in a full screen dialog
(1) with a title displayed in the header (2). The _Close_ button
(3) closes the dialog and cancels any selection changes in the
option list. Clicking the label of an entry (4) closes the
option list and creates a token of the selected option. By
selecting a checkbox (5), the option list remains open and
allows multi-selection. The _OK_ button (6) takes over the selection and closes the dialog.
> **Hint:** The title of the full-screen dialog could be customized by adding a label as _ariaLabelledBy_ to the multi-combo box. If no label is associated with the multi-combo box, the default title “Select” is set.

As the user types into the input field (7), the list is
filtered using the default “starts with per term”
approach. Pressing the button next to the input field (8)
toggles the view between all options and the selected
options only.
#### Input Field on Collapsed List
If items have already been selected, the input field
remains functional and the tokens remain visible (1).
Clicking the _Remove_ icon :sys-cancel: in a token
removes it (2). When the user clicks the input field, the
list opens in full screen (3). Clicking the input field
sets the focus on it (4) and the mobile device keyboard
opens (5). When the user starts typing, the list is
filtered (6) using the “starts with per term” approach.
The input field only lets the user type characters that
match the items in the list.
#### Multiple Selected Items
Not all the selected tokens can be displayed at the same
time because the space is limited to the size of the
input field (6). Swiping to the side scrolls horizontally
to reveal a cropped token (7).
### Copying and Pasting Data from a Spreadsheet or Text File

The control for the multi-combo box can handle paste actions containing, for example, multiple items that have been selected in a column of a spreadsheet or text file. The user simply selects an entire column in the spreadsheet and copies it. When items are entered into the multi-combo box, the user just pastes them from the clipboard and each item is then represented as a token. Only items that are part of the list are displayed as tokens.

> **Information:** For information on how to manage leading and trailing whitespace (blanks) when copying and pasting text into input controls, please see [removing leading and trailing whitespace](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

## Styles

The following images show how the states of the
multi-combo box are styled.

The multi-combo box offers four value states:
- Error
- Warning
- Success
- Information

For error, warning, and information states, you can show an additional value state text message when the focus is on the combo box. The message can either be a plain text or a [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/).
For more guidance on when to use which state, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

## Guidelines

#### Label

The multi-combo box control can be displayed with or without a label. If the field is attached to another field, you don’t need to define a second label. For more information about labels in SAP Fiori, see the [label guidelines](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/).

#### Placeholder

Don’t use the placeholder attribute as an alternative to a label. This is important because the placeholder text will be overwritten as soon as the form is filled out. Labels are necessary because they indicate the meaning of the form fields if the placeholders are no longer visible. Show a placeholder only if the user needs a hint about what data to enter. Don’t repeat the content of the label. A hint could be a sample value or a brief description of the expected format. For more information about how to use the placeholder, see [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/).

#### Option List

Keep the label of an entry in the select option list as short as possible because the list uses single lines only. Values that are too long may be truncated. If you need to indicate that none of the selection options are selected, show a blank input field. Define a default selection whenever possible. The multi-combo box cannot display columns. If you want to show two values in the option list, show the leading information first, followed by the secondary information in parentheses, such as _Walldorf (Germany)_.

Don’t [disable](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#disabled) items in the option list. If an item can’t be selected, hide it.

#### Sorting

The option list contains all available items that the user can choose from. Choose one of the following styles depending on how you want the content to be arranged:

- **Logical:** Sort items into a meaningful order. Group
related options together and show the most common options
first followed by less common options.

- **Alphabetical:** Sort currencies, names, and so on into
alphabetical order. We recommend this for lists with more
than eight items.

- **Numeric:** Sort numeric values into a sequential
order with the lowest number first.

- **Chronological:** Sort time-related information into
chronological order with the most recent first (if
applicable).

#### Width

You can adjust the width of the option list to some extent. The multi-combo box control is usually used in [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), where the width is determined by the form element or container in which it is embedded. Therefore, we don’t recommend defining a fixed width, but rather working with proper layout containers such as the form, simple form, or responsive grid layout, and with the layout data property, where the width is defined. If you need to restrict the width to a defined value, set the width accordingly. Keep in mind that there’s no horizontal scrolling in the option list. Entries that are too long are truncated and users won’t be able to read them. To avoid this, you can enable wrapping (property: `wrapping`).

> **Information:** If localized text isn’t an issue, such as with currency codes, use a smaller width.

#### Unit of Measurement

You can use the layout options of the [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) to add the unit of measurement (UoM) after the multi-combo box. Apps can use the [label-field ratio](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/#labelfield-ratio) to show the UoM after the field. However, you must make sure that the UoM is properly visualized and doesn’t wrap to the next row.

> **Hint:** 
For accessibility purposes, you can use `ariaDescribedBy` from the input control.

#### Multi-Combo Box in a Filter Scenario

The multi-combo box can serve as a filter. For example, if the multi-combo box is offered in a table toolbar, and is empty (no tokens selected), the table shows all items. If the user selects picks something in the multi-combo box, the table shows only the matching items.

#### Alternatives for Display Mode
If a form or table supports both display and edit mode, use the multi-combo box only in edit mode. In display mode, consider the following alternatives:
- A horizontal list with bullet separators between the individual token texts (for example, using [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) or [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/)).
- A bulleted list with a bullet per token text (for example, using [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/)).

If the display mode equivalent needs to be a single-line text (as required for the grid table, tree table, analytical table), provide an overflow for all texts that do not fit onto the line (for example, by adding a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/), opening a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/), or using an [expandable text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/expandable-text/)).

---

## network-graph

## Intro

The network graph displays a large amount of data by highlighting the relationships between individual records. Records are displayed as nodes, and connectors (lines) show the relationships between them. The vivid display of network nodes can highlight non-trivial data discrepancies that would have been previously overlooked.

## Usage

### Use the network graph if:

- You need to display a large amount of data and contextual information. Use cases include material management and supply chains, logistics structures, and value chains.
- You want to display complex nonlinear structures, trees, and generic charts (such as organizational charts).
- You want to give the data a spatial context.

### Do not use the network graph if:

- You want to visualize a document flow. Use the [Process Flow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/process-flow/) control instead.
- You want to enable editing of displayed data. Note that the network graph is available in read-only display mode.
- You need to embed the chart into smaller areas or use it as embedded analytics.

## Responsiveness

The network graph is not a responsive control. Only the
top bar and popovers are fully responsive. The graph
content, including all the groups, nodes and connectors,
keeps the same proportions regardless of the screen size.
The proportions are changed only with zoom.

## Layout

The network graph is split into a header toolbar that contains all the controls, and the chart.

As an extension to this layout, the control can provide a separate column either on the right or left side of the graph. This column contains a chart map to enable users to navigate to a very large structure more easily. The map displays a smaller version of the graph and the corresponding active area. This column can also be extended by other SAP Fiori controls in order to provide users with enhanced application capabilities.

_Schematic visualization of a network graph_          | _Extension panel on the right_          | _Extension panel on the left_

## Types

The network graph comes with three different layout algorithms:

- Generic unordered KLay layout
- Column-based layout displayed as either vertical or horizontal swim lanes
- Force layout

Each of the layouts can be visualized as a directed or undirected chart. A bi-directional mode is also supported.

**Undirected:** Data dependency (parent-child) or data flow is not implemented.

**Directed:** Data dependency is implemented, and different chart orientation can be set. By default, the network graph is oriented left-to-right. Other chart orientations include top-down, center-out, or right-to-left.

## Components

By default, the network graph is split into the header toolbar area and the graph content. Within the graph content, groups, nodes, and connectors are displayed. All of these elements are interactive and display action menus or popovers with additional information.

### Header Toolbar
- **A – Title:** Provides a short, meaningful summary of the chart contents.
- **B – Search Field:** Standard [search component](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) with variant suggestions enabled by default.
- **C – Legend:** Toggles the legend on/off.
- **D – Zoom In:** Zoom in with both mouse wheel or by clicking the icon.
- **E – Current Zoom Level:** Zoom level is expressed as a percentage of the original current chart size.
- **F – Zoom Out:** Zoom out with both mouse wheel or clicking the icon.
- **G – Fit to Viewport:** The network graph automatically applies a zoom level to fit the whole chart into your viewport.
- **I – Fullscreen:** Toggles the full-screen view.

### Chart Area
#### Node
A node represents a single record in the underlying dataset comprising multiple field values. You can use two different shapes to represent a node: a rounded rectangle or a circle.
You click a node to select it. A menu is then displayed, which enables you to expand or collapse the connecting chart structure, display a details popover, or a links popover.
#### Connector
A connector represents the relationship between two records and can be displayed as a straight line or a line with arrows.
You click a connector or the surrounding area to call up the details popover for that specific connector.
#### Group
A group is a chart element that represents a collection of nodes. A group is envisioned as a slightly larger box containing 1-n nodes. When a group is collapsed it behaves like a node.

> **Warning:** Following features have not yet been integrated into this version and will come in the next release(s):
- Icons for rounded rectangular nodes
- Semantically colored values with different font-weight
- New visuals for Group statuses
- Starting Node visualization

## Behavior and Interaction

### Navigation and Zoom

A user can navigate around the entire network graph by holding down the left mouse button and dragging the mouse. By dragging the graph, the user changes the active area of the available graph map extension. Clicking or dragging the selected area in the graph map extension changes the focus area of the network graph.

To zoom in or out, the user can use the mouse wheel, pinch open or pinch close on the touch devices, or click the respective buttons on the top bar. Each of these actions changes the number label, located between the zoom in and zoom out icon buttons, and indicates the current zoom level.

_Fit to Viewport_ automatically adjusts the zoom level to fit the entire network graph into the user’s viewport.

### Component Interaction

Clicking a node displays a menu, which provides the users
with the option to collapse the following chart
structure, display the details popover, or display the
links popover.
Clicking a connector or the area surrounding it calls up
the connector’s details popover.
For group interactions, clicking the display details icon
button nested in the group heading calls up the group’s
details popover (it also contains the list of the nodes
included in the group).
#### Collapsed Structure Indication
In more complex structures, many structures may be hidden
within the graph. To indicate collapsed structures, we
use a visual indication to represent collapsed structures
following the node and collapsed structures within a
group.
#### Partially Expanded Indication
In a **directed** graph, _Expand/Collapse_ applies only
to the subtree directly connected to the selected node.
Each node supports a three-state action button for
expanding or collapsing:
- Fully expanded
- Partially expanded
- Collapsed
When a user clicks the action button in a fully expanded
state, the affected node’s subtree is collapsed, and the
action button of that node is indicated as collapsed. All
other nodes sharing parts of the subtree with this node
and will then be indicated as partially expanded.
When a user clicks the action button in a partially
expanded state, the affected node’s subtree is collapsed,
and the action button of that node is indicated as
collapsed. All other nodes affected by this action are
indicated as partially expanded.
When a user clicks the action button in a collapsed
state, the affected node’s subtree is expanded and the
action button of that node is indicated as expanded.
## Styles

Each node can be visualized with a circle or rounded rectangle shape. These two shapes can be combined inside one graph to provide users with deeper semantic meanings: for example, circular nodes represent customers, whereas rounded rectangles represent suppliers.

Semantic meanings can be assigned to line styles for connectors, and semantic colors can be assigned to both nodes and connectors.

### Node Types
As mentioned above, there are two default node shapes:
circle or rounded rectangle. In addition, these node
shapes have different label and title (icon) positioning.
If needed, the application owner can also define the
number of the allowed lines for a node title.
### Connector Types
You can give connectors semantic meaning by assigning
them semantic colors or different line types. You can
also use both semantic colors and different line types to
provide connectors with a deeper meaning.
## Guidelines

In applications, embed the network graph only within components that use the whole canvas area, such as the tab container on the object page. Do not embed the network graph in smaller containers, such as panels, headers, tables, forms, and dialogs.

The network graph is not a substitute for a [Process Flow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/process-flow/). For more details, see the _Usage_ section at the top of this article.

Keep the amount of information inside each node to a minimum. You can reveal more information via the details popover.

---

## output-management

## Intro

The output control is a “reusable component”, which means that it can be used as a building block, also for [SAP Fiori Elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates). The control allows the user to manage the output process of a business document (such as sales orders or billing documents). It gives the user the possibility to evaluate the output history for a specific business document – including the state of an output process – and interact with it.

When triggered by the business application, the output control collects and validates all output parameters, creates the output documents, and outputs them. The possible output parameters handled include what to output, for whom, when, and through which medium.

A simple use case is: you choose to email an output document to your customer based on an available form template. The system records the date the output was created, and indicates that the output has been sent.

## Responsiveness

The control is based on the [smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/), and behaves responsively.

## Layout

Technically, you can use the control in [any floorplan or layout type](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplan-overview). However, the control is typically used in [object pages](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) or [full-screen layouts](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/full-screen/).

## Components

### Smart Table

- The **table toolbar** shows actions such as text [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) and the [table personalization](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/) icon button.
- The **table items** display the status and different parameters of the output items:

_Log:_ Shows the processing protocol.

_Status:_ The status can be _In preparation_, _To be output_, _Pending_, _Completed_, or _Error_.

_Dispatch Time:_ The dispatch time can be set to _Immediately_ or _Scheduled_.

_Output Type:_ For example, a billing document or a sales order.

_Role_: Shows the receiver role.

_Recipient:_ The recipient can be a business partner or a technical system, for example. If the channel is set to _Email,_ the _Output Details_ [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) allows the user to add and edit specific persons to the _To_, _CC,_ and _BCC_ input fields.

_Channel:_ Possible channels are printer, email, and EDI. The application development team decides which ones are offered. Depending on the channel, the _Output Details_ offer specific information.

_Form Language_ and _Form Template:_ Show which language and template are used.

_Changed On_: Shows the date and time the output item was changed.

_Form Country/Region:_ Show the country/region selected for the specific form template.

_Attachments_: Show the attachments available for the output.

_Display_: Is always available as a PDF.

### Popover

The _Output Details_ link within the table will open a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) to show more details of the output item. The popover is **only** used for the channels _Email_ and _Print_. It shows the following additional fields that can be changed in edit mode:

### Dialog

By selecting the number in the Attachments column, a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) opens that lets you select the available attachments for the output. You can specify whether the attachment should be merged with the form template, or if it should be an additional attachment for the output.
You can merge PDF attachments along with the rendered form into a single PDF document if the print queue format is PDF. You can merge and unmerge attachments for original output items but not for duplicates. You can’t unmerge the PDF or move attachments out of the “Merge with Form Template” section once the output has been triggered.

### Footer Toolbar

The [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) offers actions affecting the whole page (for example, the whole billing document). A global edit allows you to change the output details within the component. In the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/), this function is located in the object page header toolbar.

## Behavior and Interaction

### Actions

**Table toolbar actions**

- _Send Output_ triggers the output process according to the dispatch time.
- _Retry_ triggers the output again in case an error occurred. A copy is created for successful documents you wish to output again.
- _Set to Completed_ generally happens automatically, but you can also manually set the status to complete if the output is obsolete.

**Table row actions**

- The PDF icon allows the user to preview the document as a PDF.

**Footer toolbar**

- _Edit_ as global edit will be placed in either the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) or in the object page header toolbar for [object pages](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/). There is no partial edit for the output management component available.

### Status Dependencies

Actions are enabled or disabled dynamically depending on the status of the output item. The following table explains how the status of output items proceeds and determines the actions that you can perform:

Table

Status of Output |                                                                                                                                                 | Possible Actions

In preparation   | This is the status after creating an output document until the output process is                                                                | Send Output, Edit
triggered automatically or manually via the action _Send Output_.
To be output     | Indicates that the output item is ready to be output. Only visible if the dispatch                                                              | Editable – Only the dispatch time,
time is set to _Scheduled_. If the dispatch time is set to _Immediately_, the jobs starts to run and the status is not visible to the end user. | Show Application Log

Error            | An error occurred during the output process.                                                                                                    | Resend, Set to Completed, Show Log

Completed        | The output item has been fully processed.                                                                                                       | Resend, Show Log

## Guidelines

The output management component is not an independent application and therefore needs to be embedded into the [floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplan-overview) of an application.

---

## pdf-viewer

## Intro

The PDF viewer control displays PDF documents within your app. It can be embedded in your page layout, or you can set it to open in a popup dialog. In addition, this control allows you to print and download the PDF documents it displays.

## Usage

### Use the PDF viewer control if:

- You want your app to display PDF files on all devices and platforms.
- You want the users of your app to be able to preview their documents as PDF files right inside your app.
- You need to ensure the consistent behavior of PDF files across all SAP Fiori apps.
- You need to work with events (loaded, validation, error) provided by the PDF viewer.

### Do not use the PDF viewer if:

- You need to provide an interactive PDF file (such as a data input form).

## Responsiveness

The PDF viewer control is fully responsive on large-screen
devices (size L). The range of responsive behavior
available on desktop devices depends on the display mode.
- **When the PDF viewer opens in a dialog popup:**
By default, the dialog supports two or more actions, such
as _Close_ and _Download_. On large-screen (desktop)
devices, the action buttons are right-aligned. Use compact
mode to ensure optimal padding and margins on desktop
devices.
If the content height is increased beyond the screen
height, the dialog height cannot go beyond 4 rem from the
top and bottom of the screen.
The dialog popup must be resized automatically and cannot
support dragging or custom resizing.
- **When the PDF viewer is embedded in a container on the
app page:**
The dimensions of the frame in which the PDF file is
displayed are defined by the PDF viewer properties.
The control in which the PDF viewer is embedded must have
at least 1 rem (16 px) padding to set it apart from the
rest of the content.
Only vertical scrolling is allowed. The behavior of
desktop touch devices should follow the default behavior of
the device or platform.
On mobile devices (smartphones and tablets), the PDF viewer
control renders a toolbar with the title and a download
icon, which behaves as a standard device/browser file link.
If required, you can customize the behavior for mobile
devices and trigger the default device action for the file
link from a different anchor in the application.
## Layout

#### Displaying PDF Files in a Dialog
The dialog is positioned in the center of the screen. It
opens in a modal window to attract the user’s attention
when it displays emergency states. The dialog consists
of:

- A dialog header
- A dialog PDF content
- A dialog footer
#### Displaying Embedded PDF Files
The secondary mode of the PDF viewer displays PDF files
directly on the page. The application owner, using the
PDF viewer control, provides the dimensions of the frame
in which the PDF file is embedded. The container should
have at least 1 rem (16px) padding from the other content
on the page to allow users to distinguish between the
embedded PDF and the rest of the page’s content.
When the PDF viewer is embedded on the page, it
comprises:
- An overflow toolbar header
- A container for rendering the PDF file (determined by
the application owner)
> **Hint:** The footer can be extended by any desired buttons. However, both the _Close_ and _Download_ buttons must be displayed. This is to ensure that the accessibility requirements are fulfilled. Additional information about action placement and order can be found in the [Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) article.

## Components

The PDF viewer in **popup mode** is rendered within a [Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) and consists of:

_Title(Header)_: The title text appears in the dialog header.

_Content_: This area contains the actual PDF file displayed within the content of the dialog.

_Footer with actions_: The footer contains two mandatory buttons: _Close_ and _Download._ Other actions can be added to the footer as well.

The PDF viewer in **embedded mode** can be rendered in any container desired by the application.

The title is displayed within the [Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/) (Overflow Toolbar).

> **Hint:** Use a [Flexbox](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.m.FlexBox/samples) container to wrap the embedded mode of the PDF viewer inside the application.

## Behavior and Interaction

All the interactions for the PDF files themselves must remain the same across platforms and browsers: paging, scrolling, zooming, and print must all be available.

**Download** – For accessibility reasons, the PDF viewer always provides an additional download button for downloading the displayed PDF file and gives users the option to download the embedded PDF renderer on a specific device or system (not all PDF reader plugins have their own download button).

**Popup mode interactions:**

- No custom resizing of the dialog
- No dragging of the dialog

## Guidelines

To avoid the risk of performance issues, do not embed more than three instances of the PDF viewer per page. You may embed more instances of the PDF viewer in one page if the number of PDFs does not affect performance. Carry out benchmark tests to ensure that performance will not be affected.

The PDF viewer can be used within other sap.m components, such as carousel and panel, respecting the specific guidelines of these components.

The embedded mode of the PDF viewer can be used on the [Object Page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) if the container is as wide as the object page. If this is not the case, use the popup mode of the PDF viewer instead.

The PDF viewer can provide accessibility options when used with screen readers and other accessibility software. To ensure that all the accessibility options are supported, you need to have Adobe PDF Reader installed.

---

## placeholder-loading

## Intro

Placeholder loading is a type of busy indicator that provides the user with a skeleton page as a placeholder while the content is still loading. The aim is to inform the user of the ongoing loading progress.

A skeleton page shows the frame of the final content without the content being fully loaded. Visually, skeleton pages are grey boxes with animations to indicate loading activity.

Skeleton pages are used to create an impression of speed and reliability when an app encounters performance barriers. They provide a generic preview of the layout, which makes the app seem to load faster. This improves the overall user experience.

## When to Use

### Use a skeleton page with generic placeholders when

- Launching an application from the launchpad.
- Navigating from one application to another application.

> **Information:** This happens mostly when an application is started for the first time and the application isn’t cached in the browser
yet.

## Components

For placeholder loading in Fiori, we have decided to use the **generic placeholder loading concept**. This means that for each floorplan there is a generic placeholder that is displayed as a generic fixed page.

Available Placeholder Floorplans:

- Analytical list page
- List report
- Object page
- Overview page

The placeholders are available in the following themes:

- Quartz Light
- Quartz Dark
- High Contrast White
- High Contrast Black

Carousel (full-width)

## Behavior and Interaction

The generic skeleton pages are visible as soon as the initial loading of an application or an app to app navigation has started when the target application is called the first time.

### Behavior List Report and Object Page

In the first release, the placeholder is removed when all data is loaded. If the table has to be loaded manually, the busy indicator appears during the loading process.

Carousel (full-width)

### Behavior Flexible Column Layout

With the flexible column layout, only the newly loaded content is visible with placeholders.

Carousel (full-width)

### Behavior Overview Page

The placeholders are removed as soon as the first card is completely loaded and the remaining cards are loaded without content

## Responsiveness

All skeleton pages are responsive and support all SAP Fiori screen sizes: small (S), medium (M), large (L), and extra large (XL).

---

## process-flow

## Intro

The process flow control allows you to show flows of multiple types of objects, such as documents and approvals. Document flows can split into numerous branches, while approval flows are usually straightforward.

## Usage

### Use the process flow if:

- You need to display document flows.
- You need to display approval flows.
- You need to display other kinds of flows with linear and/or branching paths.

### Do not use the process flow if:

- You want to display the process flow header in combination with something other than the flow map. In this case, use the [icon tab bar (style: process)](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.IconTabBarProcess/preview) instead.

## Responsiveness
The process flow reacts to the size   | _Process flow – Size S_          | _Process flow – Size M_
of the container it is put into. It
has four zoom levels, with level 1
being the largest and level 4 the
smallest. In containers wider than    |                                  | _Process flow – Size L_
1024 px, level 2 is chosen
automatically. For containers from
600 to 1023 px, level 3 is set, and
below 600 px, it is level 4. For more
information, see Behavior and
Interaction.
## Layout

The process flow enables different layout forms within the nodes:

- The **default layout** contains fixed sections that can easily be filled with content.
- The **freestyle layout** comprises an empty container that can be filled with different controls.

### Default (Fixed) Layout

At the top of the control is a bar, with the zoom buttons on the left and the full screen toggle on the right.

Below the bar is the process flow header, which can also be used on its own if the complex visualization of nodes is not required. The header consists of multiple steps, each of which is visualized by a circled \\icon\. Each icon is surrounded by a circular chart to indicate the distribution of statuses per column.

The flow map lies beneath the header. The elements belonging to a certain step are vertically aligned beneath one another. Arrows point to the next (follow-up) element or multiple elements. Dotted arrows pointing to semi-transparent elements indicate planned or pending elements.

In turn, each element comprises different sections:
1. **Header** (mandatory) – Wraps twice before truncation.
2. **Status** (optional) – With \\semantic color\ and icon; can wrap once.
3. **Attribute 1** (optional) – Wraps once before truncation.
4. **Attribute 2** (optional) – Wraps once before truncation.
Naturally, the header information is mandatory because it is the key identifier of an object. The header should contain a brief but meaningful description and, if necessary, an ID in brackets.

Although the status is optional, an icon appears on an item without a status at the smallest zoom level. When the user zooms out completely, only the status icon remains visible on an item. Without it, the element looks broken and does not provide any information.

There are two options to filter the nodes for certain types or attributes. For simple filtering, you can use a filter button in the toolbar to trigger a filter dialog. For more complex filtering, the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) control can be placed on top of the process flow.

### Freestyle Layout

The freestyle layout gives you the most freedom within the borders of each node. Inside this empty container, you can structure your content as your use case requires. Of course, you still need to conform to the guidelines for each control you use in your layout. The next sections show two examples of freestyle layouts with texts and images.

If text is the main focus of a node, we recommend using the “dog ear” visualization (property _FoldedCorners_ = _true,_ see [Styles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/process-flow/#styles) section for further details). If an image is the most notable content of a node, we advise against using the “dog ear” visualization.

Regardless of the controls you use inside the nodes, ensure that users can easily identify the item or meaning behind a node without having to click it. Users should only have to click to retrieve additional information or to perform an action, but not to identify an item. An exception to this rule is the lowest zoom level, which only shows the most basic information.

What should be displayed at the lowest zoom (level 4) depends on the context and use case of your application. If an image is the centerpiece of the node, a down-sampled version of this image can help users to identify each individual node. In other instances, an icon might be more appropriate to show the status of a node or hint at its content. In both cases, it is **mandatory** for applications to supply an icon (such as :process: to indicate that the object is in process, or :text-align-left: to show that the item contains textual information). You can also use status icons with semantic colors if they support the use case.

You can offer actions on the [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) or [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/) that is triggered to show additional information. If no additional information is required, you can also use the node’s click event to trigger an [action sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/action-sheet/). However, use this latter option with caution; for most use cases, you will need to show additional information, especially at the lowest zoom level.

#### Freestyle Example: Text

If you need to display text inside a node, you can use the built-in click event to show a popover with the full text and any additional actions. While zooming out, less and less text is shown until the smallest zoom level is reached. Since text cannot be previewed in such a small container, use the icon :text-align-left: to indicate that the item contains textual information.

_Layout – Freestyle – Level 1_          | _Layout – Freestyle – Level 2_          | _Layout – Freestyle – Level 3_          | _Layout – Freestyle – Level 4_

#### Freestyle Example: Image

The following examples show how images can be displayed inside the process flow nodes – in this case to represent an employee. Additional information, such as the employee’s profile and contact information, can be shown in a quick view. As the node gets smaller with each zoom level, some information needs to be omitted. On the lowest zoom level, only the image is shown.

_Layout – Freestyle Image - Level 1_          | _Layout – Freestyle Image - Level 2_          | _Layout – Freestyle Image - Level 3_           | _LLayout – Freestyle Image - Level 4_

## Components

The process flow control consists of the process flow header and the flow map.

For better usability, it is highly recommended to add a toolbar with zooming controls ( :zoom-in: :zoom-out: ).

A full-screen switch is optional and can also be put in the toolbar ( :full-screen: ).

## Behavior and Interaction

### Navigation and Zoom

User can move the whole flow with the left mouse button held down, just like they would move a street map in a browser.

To zoom in or out, the user can use the mouse wheel or, if implemented, click the respective buttons on the bar on top of the flow line. The zoom is semantic: detailed information is added or removed depending on the zoom level.

If the process flow is wider than the available space, a chevron (_<_ or _>_) appears on the side where the flow extends beyond the visible area. A number also indicates how many process steps lie outside, such as _< 2_ or _5 >_.

Level 1
Larger elements provide the most    | _Zoom in (node)_           | _Zoom in (process flow)_
space for\
textual information. However, fewer
elements\
fit on the screen.
Level 2 (automatic preset for screens
wider than 1024 px)
_Zoom in – Standard size_           | _Zoom in – Standard size_
The standard size provides the best
combination\
of content information and overview.
Level 3 (automatic preset for screen
widths from 600 px to 1023 px)
_Zoom in – Elements are reduced to a header and status information_           | _Zoom in – Elements are reduced to a header and status information_
Elements are reduced to header and
status\
information to provide a better
overview for\
large flows.
Level 4 (automatic preset for screens
below 600 px width)
_Zoom in – Element is reduced to a status icon_           | _Zoom in – Elements are reduced to a status icon_
The smallest zoom level provides a
maximum\
overview of the flow while the
information about\
each element is reduced to a status
icon.
When a node is clicked, applications should provide a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/pop-over/)
with additional details about this element. It should give users a deeper insight into the status or, in the event of an issue, a way to solve the problem. From the quick overview,
users should be able to navigate to the element’s fact sheet.
If no additional information needs to be displayed, an [action sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/action-sheet/) can be triggered instead of the popover to allow users to perform actions on the item.
### Labels on Connections
Some use cases focus on the connections between the nodes
as much as on the nodes themselves. For these cases, we
provide labels that can be displayed on each connection
which, in turn, provide the user with the necessary
information.
If multiple paths overlap, applications need to aggregate
the respective labels and show the ‘worst’ status.
_Process flow – Labels (1)_           | _Process flow – Labels (2)_           | _Process flow – Labels (3)_
When the user clicks an aggregated    | In the popover, the user should now   | To give the user more information, a _Details_ button needs to be shown in the footer.
label, app developers need to provide | be able to browse through the paths,
a popover showing a list of           | while the process flow is updated
connection paths for the user to      | accordingly.
select from.
The details must be shown in the same popover, and a back
button must be offered that allows the user to return to
the path overview.
The footer of the details overview can contain up to two
actions.
### Highlighted Path
The “highlighted path” feature allows users to focus on
specific nodes and their path through the process flow,
for example by highlighting a search or filter result.
**Example:** A user searches for a specific item inside
an order. The nodes containing or exclusively
representing this item are highlighted, while the rest of
the flow is dimmed.
**Attention:** Do **not** combine a highlighted path with
a selected path. When you set one path type, make sure
that the other is deactivated.
### Business Focus
The business focus is a rarely used feature. It allows
applications to put a visual focus on a node that is
separate from (and not to be confused with) the selection or
keyboard focus.
If, for example, the process flow is used next to another
control (such as the timeline), the business focus can be
used to highlight a node that corresponds to a selection in
the other control:
1. The timeline shows an automated post “There is an
invoicing problem with Item 0815 from Order 4711.”
2. The user clicks the post (not onto a specific link).
3. The respective node in the lane _Invoice_ is highlighted.
If you use the business focus, make sure that only one node
is selected at a time.
### Editing

If users can edit a node’s content, offer an _Edit_ button. Place the button on whatever is triggered when the user clicks a node ([action sheet](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/action-sheet/), [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/), [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/)). The editing itself can be handled in a small dialog. The information structure depends on the controls used inside the node. Usually, a form and/or text areas will cover most use cases.

## Styles

Two visualizations are available for the nodes inside the flow: a specific visualization for documents, and one for general objects (basically everything except documents). App teams can use the _FoldedCorners_ property to choose the type of objects that the process flow represents.

_FoldedCorners_ = _true_: This style gives the node a “dog ear”, which makes it very recognizable as a document.

_FoldedCorners_ = _false_ (default): This setting has no specific visual style and is therefore suitable for all object types.

The property affects **the entire flow**; in other words, it cannot be applied solely to individual nodes. Therefore, it should only be set to _true_ if all the nodes represent documents (or document-like objects). If some or all of the elements are better visualized with the general style, _FoldedCorners_ should be set to _false_.

### Aggregation
Some flows can be arranged more clearly by using aggregation. Nodes that belong to the same lane (column) can be
displayed as a stack by setting the property _Type_ to _Aggregated_. This means that nodes that would usually be displayed one below the other are shown as a stack of nodes.
The interaction for these stacks is identical to the regular nodes: the control provides a single click event that
app developers can use to show a popover with more detailed information.
The description on these stacks should be helpful to users, for example, by telling them how many nodes are in the
stack. Aggregated amounts can also be shown.
Use the following format to describe the stack and the number of nodes it contains: \<Object Type> (\<Counter>).
For example, _Invoices (8)_ or _Sales Orders (42)_.
The statuses in the stacks can be heterogeneous. However, it is imperative to **show the ‘worst’ status(es) at the top** so that users know whether they have to take action.
In the upper example on the right-hand side, the nodes under _Delivery_ and _Invoice_ are shown as stacks instead of individual nodes.
The lower example on the right shows the same stacks when zoomed out (level 4).
## Guidelines

The process flow header is **not** a substitution for the [icon tab bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/icontabbar/). For more details, see the _Usage_ section at the top of this article.

Keep the amount of information inside each node to a minimum. Reveal more information via a popover.

Although technically possible, the node titles should not be turned into links. The _IsTitleClickable_ property should be left in its default state (“false”). Titles that the user can click may lead to usability issues. Handle every action or interaction via a popover and/or navigation to a subsequent page.

### UI Texts

Use a noun to describe the process phase.
Example: 
If the process and a business object have the same name, add _Processing_ to the process name.
Example: _Order Processing_ (in this case, “_Order_” is used for the business object)

---

## quick-prompts

## Intro

In generative AI, prompts are essential for guiding the AI's output. Clear and effective instructions ensure that the output aligns with the user’s needs.
Content generation with quick prompts
Quick prompts are predefined actions integrated into workflows for easy access. These types of prompts are crafted by experts known as prompt engineers, who focus on the efficiency of AI.

## When to Use

+--------------------------------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------------------------------+
When To Use
+--------------------------------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------------------------------+
Do
Use quick prompts when:
- Tasks are repetitive or for common actions within a workflow.
- The system can only assist with specific actions.
- Users lack expertise in the subject matter.
- It’s crucial to minimize any bias introduced by users’ writing prompts.
- Maintaining consistent and predictable output is essential.
+--------------------------------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------------------------------+
Don't
Don’t use quick prompts:
- When a user’s intent is unpredictable.
- When users need more flexibility in directing the output of the AI model.
- For non-AI functions.
- For multiple fields in the form – use actions at the form level instead.
- When implemented through the [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/) or menu button alongside the [AI writing assistant](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/).

+------------------------------------------------------------------------------------------------------------------------------x------------------------------------------------------------------------------------------------------------------------------+
Top Tips 
+------------------------------------------------------------------------------------------------------------------------------x------------------------------------------------------------------------------------------------------------------------------+
- Use quick prompts with the [AI notice base concept](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/ai-notice-base-concept) to inform users they’re interacting with AI.
- Clearly identify quick prompts with the [AI icon](https://www.sap.com/design-system/fiori-design-web/foundations/ai-and-joule-design/foundation/ai-icon).
- Make sure that the AI output is unbiased, inclusive, and aligns with the company tone and identity.
- Use recommended [AI action labels](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#standard-ai-action-labels-for-ai-text-generation-and-transformation).
- Follow the [action placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) guidelines and use the emphasized button style only when a quick prompt is the primary action for the page.
- Ensure users can complete the task without using quick prompts and without using AI.

+---------------------------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------------------------+
Top Tips 
+---------------------------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------------------------+
- Clearly identify quick prompts with the AI icon.
- Make sure that the AI output is unbiased, inclusive, and aligns with the company tone and identity.
- Use recommended [AI action labels](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#standard-ai-action-labels-for-ai-text-generation-and-transformation).
- Follow the [action placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) guidelines and use the emphasized button style only when a quick prompt is the page’s primary action.
- Ensure users can complete the task without using quick prompts and without using AI.

## Components

The quick prompts pattern extends the following components to enable new AI-specific interactions:

- [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/)
- [Menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-web-component/)

### AI button

Use an AI button when only one quick prompt is available.
Style it properly with the AI icon to show that the
action is AI-powered and use a clear label to describe
the action.
### AI menu button

Use an AI menu button when multiple quick prompts are
available. Pair it with the AI icon and a label that
describes the set of AI-powered actions accessible from
the menu.
For more information, see [Menu Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-button-web-component/), [Menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-web-component/), and the [Terminology](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#terminology) section.

## Behavior and Interaction

### Generating content

##### Starting the generation process

Clicking the AI button initiates content generation with
AI.

##### During generation

When generation begins, the AI button switches to *Stop Generating*,
giving users the option to interrupt the process at any time. The
text area first displays a busy indicator to show that the request
is being processed. As soon as output starts streaming in, the busy
indicator is replaced by the generated text. During this time,
primary actions are temporarily disabled to prevent interaction with
partially generated content.
### Refining

When generation finishes or is stopped, the button transitions to an AI menu button, offering quick prompts users can apply to refine the output. Users can also edit the content directly.

Refining generated content with quick prompts

For information on handling warnings when versioning is not supported, see [AI Writing Assistant](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/) and [Regenerate](https://www.sap.com/design-system/fiori-design-web/ui-elements/regenerate/).

For information on how to display the text area during generation, see [Busy Indicator](https://www.sap.com/design-system/fiori-design-web/v1-130/ui-elements/busy-indicator-web-component/).

### Handling Errors

If the quick prompt is interrupted or fails, follow the guidance for error messages in the [message handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) article.

For a consistent user experience, we suggest using the following error message:
*Something went wrong while generating your content. Please try again.*

Error handling for content generation using quick prompts

### Grouping

If necessary, organize prompts into submenus to improve
navigation and reduce visual clutter. Group them by
purpose or task, prioritize essential actions at the top,
and keep group sizes manageable to avoid overwhelming
users.
##### Grouping AI and non-AI actions

Group related actions by purpose or outcome, whether they are AI or non-AI functions. When combining both in the same
menu, use the AI icon to identify AI-powered quick prompts and visual dividers to clearly separate them from non-AI
actions.
For more information and labels for submenus, refer to the [terminology](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#terminology) section.
## Terminology

Use the default labels provided below for text generation scenarios. To ensure a consistent and familiar experience for users, we recommend using the suggested wording. Only make changes to the default text if absolutely necessary for your specific use case.

### Recommended AI UI text for AI text generation and transformation

**Table (col-width-50-50)**

AI Button Labels

Generate

Revise

**Table (col-width-50-50)**

AI Action Labels for Menu Items

Regenerate

Fix Spelling and Grammar

Summarize

Paraphrase

Make Bulleted List

Explain Content

**Table (col-width-20-30-50)**

Menu Items with Submenu | Labels for Submenu Items | Description

Rewrite Text            | Simplify                 | Makes text easier to understand.
Expand                   | Elaborate on the content, providing
more detail or depth.

Change Tone             | Make More Casual         | Make writing less formal.
Make More Professional   | Make writing more formal.

Adjust Length           | Make Shorter             | Reduce the length of the text.
Make Longer              | Increase the length of the text.

Translate               | Language 1               | Translate text into the selected
language.
Language 2               | Translate text into the selected
language.

**> **Guideline:** **

For actions not covered above, apply the following guidelines:
- Use a verb in the imperative.
- Keep AI action labels as short as possible while prioritizing clarity for users.
- Use the same AI action labels consistently.
For more information, see [UI Text Guidelines for SAP Fiori Apps](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#word-choice).

## Responsible AI

### Appropriate use of quick prompts

Quick prompts are designed to make interactions easier by providing clear, predefined options. They help users complete tasks faster and reduce confusion. However, it's important to use them appropriately. Quick prompts should align with the user's needs. In complex scenarios where more detail or context is required, they may fall short. In such cases, guided or custom prompts can lead to more accurate and comprehensive responses.

### User autonomy

Empower users by enabling them to disable quick prompts and AI features in their workflow. Ensure alternative methods are available for users to complete their tasks without relying on AI.

### AI transparency

Ensure clarity in the deployment of quick prompts, making their use and purpose transparent to users. Use clear indicators, like AI icons or buttons, to ensure users know when they’re interacting with AI. Follow our design guidelines to maintain consistency in how these features are presented.

### Prevent bias in prompt design

Ensure the prompt design process actively involves measures to prevent bias. Like biased training data, poorly designed prompts can produce skewed or harmful results.

Advocate for a diverse group of users and technical experts to focus on thoughtful prompt design, conduct comprehensive evaluations of user needs and outcomes, and iterate to ensure that AI-generated content is as free from bias as possible.

## Prompt Engineering

Prompt engineering is the process of designing and refining instructions to guide the behavior and output of generative AI models.

Your product team is responsible for engineering effective prompts tailored to the underlying AI model, ensuring users get the desired results when using quick prompts.

Follow the \\best practices\ and, where necessary, use advanced LLM techniques like embeddings and fine-tuning to get the best outcomes.

## Helpful Terms

### Foundation models

Large deep learning models trained on massive unlabeled data with self-supervised learning. They provide general-purpose capabilities across domains (text, images, audio, multimodal).

### Large language models (LLMs)

A subset of foundation models specialized in natural language. Trained on vast text datasets, they excel at understanding and generating human language and can be fine-tuned for specific tasks or domains.

### Prompt engineering

The process of designing and refining instructions to guide the behavior and output of generative AI models.

### Embeddings

A way to represent language or data as numbers that capture meaning and similarity. This enables AI to recognize when different words or phrases convey similar ideas, allowing it to retrieve relevant information even without exact word matches and to generalize beyond its training data.

### Fine-tuning

Fine-tuning LLMs is the resource-intensive process of customizing a pre-trained language model on specific tasks or datasets to make it more proficient and accurate in generating relevant text.

---

## quickview

## Intro

The quick view is similar to a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/), but has a predefined structure, a fixed set of UI elements, and automatic UI rendering.

## Usage

### Use the quick view if:

- You want to display a concise overview of an object.
- You want to display information about, for example, an employee or a company.
- You can split your information into groups (for example, contact details and company information).

### Do not use the quick view if:

- You want to provide information in a way other than displaying it in groups.
- You want to display complex information about an object.

## Responsiveness

The quick view is based on the popover. It therefore inherits the same basic properties from it and provides the same responsiveness. For more information, see [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/#anchor-behavior).

## Layout
### Generic Quick View
The figure on the right shows how the content is structured within the quick view. At the top of the content area, you can display an [avatar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/avatar/#top)
next to the title and subtitle. Additionally, groups and fields are used to structure the information. When a field is empty, the “–” character
shows.
You can use the `fallbackIcon` property to define a backup icon. This icon is displayed if the initial avatar can’t be loaded.
### Quick View Examples

You can create your own quick view element or, as with the two examples below show, there are also basic structures for displaying employee and company information in a quick view.

## Behavior and Interaction

The quick view is based on the popover. It therefore inherits the same basic properties from it and provides the same interaction. For more information, see [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/#anchor-behavior).

---

## regenerate

## Intro

The regenerate pattern provides a general approach for using AI to create or modify content across different scenarios. It lets users generate alternative AI results or update existing AI-generated content, such as text, images, or other digital items, with the help of AI. Users can also iteratively refine the results to better match their needs or preferences.

## When to Use

+-----------------------------------------------------------x-----------------------------------------------------------+
When To Use
+-----------------------------------------------------------x-----------------------------------------------------------+
Do
Use the regenerate pattern:
- To rerun the generation of information for a defined content element.
- To re-initiate the generation of content based on a form that provides further configuration options to control the
final output.
+-----------------------------------------------------------x-----------------------------------------------------------+
Don't
Don’t use the regenerate button:
- For non-AI functions.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------x----------------------------------------------------------------------------------------------------------------------------------------------------------------+
Top Tips
+----------------------------------------------------------------------------------------------------------------------------------------------------------------x----------------------------------------------------------------------------------------------------------------------------------------------------------------+
- Use clear, meaningful labels that make the purpose of each action easy to understand in context.
- Always check\ if the generic labels used in this guideline are sufficient or if you need to apply more descriptive labels to guide your users.
- Message the user before overwriting the existing content.
- Inform the user where to retrieve previous variants if you use versioning.
- Use loading indicators, busy state and messaging patterns to inform users that new content is being generated.
- Consider user needs, subscription costs, and \\sustainability\ when enabling content regeneration.

## Components

This pattern is based on the following key elements to support regeneration scenarios:

**Foundational AI patterns**                                                                       | **Global patterns**                                                                                                                       | **Components**
- [Quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/)   | - [Action placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement)      | - [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/)
- [Guided prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/guided-prompts/) | - [Messaging overview](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging)
- [Handling busy states](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/busy-handling)
### AI Button

The [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/) is the base component for placing AI-related actions in the user interface.
*AI button and AI split button in the regenerate pattern*

**> **Information:** **

The AI button component extends common base components like [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button-web-component/), [menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-button-web-component/), [split button](https://www.sap.com/design-system/fiori-design-web/ui-elements/split-button-web-component/), and [menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-web-component/). For more information, see the [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/) component guideline.

### Guidelines

#### Icon Usage

Only use the standard icons as described in the [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/) guideline.
*Don’t use alternative icons on the ‘Regenerate’ button*

#### Button Types

Don’t use the icon button for regenerate use cases.
Always use buttons with both an icon and a label.
*Don’t use an icon-only ‘Regenerate’ button*

#### Label

Use the generic term *Regenerate* only if the outcome of the action is obvious or explained through the context.

## Behavior and Interaction

### Regenerate

When an AI action is triggered, the user is passed through the following steps:

- **Event:** Content regeneration can be triggered by a user activating an AI action, by a system event (such as auto-generation), or through interaction with Joule.
- **Send request:** The results provided by AI might be influenced by given directions (prompts) as well as available and accessible contextual information (for example, document data, user inputs, or relational data).
- **Response time:** If the response takes too long, inform the user and let them choose to either cancel the request or continue processing it in the background and get notified when it’s ready. For more information, see the guidance for [message handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).
- **Process time:** AI results might be provided using a batch job approach. However, we recommend enabling content streaming and allowing for asynchronous processing to shorten the perceived waiting time for the user. Alternatively, the target element may be set to [placeholder loading](https://www.sap.com/design-system/fiori-design-web/ui-elements/placeholder-loading/) or [busy state](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/busy-handling) if the generation process is ongoing.
- **Delivery:** The final AI result can be provided in different ways, as outlined in the [output handling](https://www.sap.com/design-system/fiori-design-web/ui-elements/regenerate/#output-handling) section of this guideline.
- **Finalization:** The user may need to provide explicit approval, either through a confirmation [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog-web-component/) or by selecting which AI-generated result should be applied.
- **Implementation:** Some implemented AI results might receive additional visible and invisible markup to ensure compliance with public legal regulations\, as well as to increase user trust and ensure proper user control over AI results.
*Regenerate pattern applied to a text area in a dialog*

### Output Handling

This pattern might be applied in the following setups:

#### Overwriting

Results provided by AI are implemented directly and overwrite any existing data in the affected target element. Always notify users before overwriting content. We recommend providing options to easily revert previous actions (such as an *Undo* button).

#### Preserving Content

- **Versioning:** Results are provided in addition to existing data. The user chooses their preferred option **within the affected target element** before finalizing.
- **Sandbox:** Results are first provided in a separate, safe environment before they are implemented in the target destination. For example, a sandbox can be any UI element like a dialog or side-panel, or an element inside the Joule conversational UI. The output can then be compared with any existing content, refined, and optimized. Once approved, the finished content is transferred to the final destination.

**> **Warning:** **

Versioning is currently only supported within the [AI writing assistant](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/) experience.

### Update after Changed Context

#### Change Contextual Information

Generated results might become invalid due to changes in the data used by the AI system to generate the result – known as the context. We recommend [messaging](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) the user if the information on which the output was based has changed. New context can lead to different outcomes, and relying on outdated information may result in undesirable consequences.

#### Time and Status Stamps

AI results might receive additional status and time attributes to let the user know when they were generated or when they expired.

**> **Guideline:** **

- When versioning is not supported, it's important to inform users that regenerating will replace existing content. For
details, see [Overwriting](https://www.sap.com/design-system/fiori-design-web/ui-elements/regenerate/#overwriting).
- In mixed forms that contain both user input and AI-generated content, the regeneration process should replace only the
AI-generated fields to ensure that user content is preserved.

## Placement

In most cases, the placement of the *Regenerate* action is defined by the global [action placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) guidance. However, there are a few additional aspects to consider:

### Principles

- AI flows **are always optional.** Users must always have the option to complete the task manually or through traditional, non-AI, methods. This means most AI buttons are non-primary actions.
- *Generate* and *Regenerate* actions can only be primary if they are a consecutive or finalizing step of a defined AI flow (for example, *Generate* as a finalizing action for preceding action *Generate Job Description*).
- Related actions that lead to the same or similar end goal should be grouped together, **regardless of whether they are AI or non-AI functions** (for example, *Create Report* opens the options *Menu,* *From Document*, and *Generate*). Avoid individual placement of multiple AI functions in the same toolbar.
- In most cases, the *Regenerate* button should replace the *Generate* button if the AI has previously provided results in the same session, keeping its original position.

### Placement on the Page

AI actions can be placed in [toolbars](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/) at any hierarchy level of the page, depending on the affected target of the AI action.

**> **Guideline:** **

It is considered a best practice to place actions near their associated target element. For example, if your AI
action provides generative functions that affect the entire page, place it in the header toolbar. If your AI feature
only affects a specific text field within a page section, place your embedded AI action close to the target field.

*‘Regenerate’ for a full page*

#### Placement in the Object Page Footer Bar

The object page footer bar is reserved for finalizing actions applied to the entire object. We don’t recommend placing AI functions in the footer bar as primary actions. In alignment with our AI design principles, AI interaction is always optional and should not block users from achieving their task through traditional non-AI methods.

### Placement in Dialogs

You can place AI actions in dialogs to support regeneration functions. See the guideline on [dialogs](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog-web-component/) for proper action placement.

#### In the Dialog Body

Use a secondary button embedded in a toolbar to regenerate individual editable parts of content inside the body of the dialog.

#### In the Dialog Footer

Use a secondary button to regenerate all of the content within the dialog. Use a primary button to regenerate content outside of the dialog.

*Dialog with secondary ‘Regenerate’ action*

### Placement on a Single Element

To enable regeneration of single elements, place the *Regenerate* button as close to the content as possible, following the [action placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) guidelines. If additional customization options are available, consider using [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/).
*Regenerate split button attached to text area*

**> **Guideline:** **

Placing dedicated AI functions directly on individual elements should be the exception, not the standard. Consider
whether this placement is truly necessary, or if the same value can be achieved by integrating the function into the
common toolbar of the next higher-level wrapping element (for example, form, subsection, or section toolbar).

## Messaging

### Pending Request

You may inform the user if the system is under heavy load
and can’t process requests immediately.
*Info message dialog*
**Example**
*“The system is taking longer than usual. We’ll notify
you as soon as your request is complete.”*
### Overwriting

When versioning is not supported, use a message [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog-web-component/) to inform users about content replacement and data loss. For a consistent user experience, we recommend using the following warning message:
**Example**
*“Regenerating will overwrite all fields with AI-generated content. Do you want to continue?*”
### Finalization

Some AI application scenarios require explicit
confirmation or selection from the user before AI results
are finalized, or the page is exited. You may notify the
user about any unconfirmed results and ask how they
should be handled.
**Example**
*“You have \<number> unconfirmed recommendations.
Unconfirmed AI results will be lost.*”
For low-impact scenarios where repeated warnings are unnecessary, include an option to skip the message in the future (*Don’t ask me again* or *Don't show me again)*.

### Warning Message Strip

In scenarios where a warning needs to be shown permanently, use a message strip after showing the initial warning dialog.

For more information, see the guidelines for the [message box](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/) and [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip-web-component/).

*Warning message strip in a full page*

---

## rules-builder

## Intro

The rule builder is the technical representation of a simple business rule for a specific a business case.

Users define the business logic in a decision table, which includes:

- One or more **conditions**
- The **results** that are returned after evaluating the conditions

## Usage

### Use the rule builder if:

- You need to define multiple combinations of conditions and results.
- Your decision logic is best represented in a table format.
- The logical AND operator applies to all condition columns.
  _Example:_
  In the example above, the equipment allocated to an employee depends on two conditions: the employee role (condition 1) and the the salary level (condition 2). If the employee role is “Manager” AND the salary level is “T4”, the employee is entitled to order a “Macbook Air” and “iPhone 6S”.

### Do not use the rule builder if:

- Your use case doesn’t require multiple combinations of conditions and results.

## Responsiveness

The rule builder control is **not responsive/adaptive**. It uses [sap.ui.table.Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), which is currently only available for desktop and tablet devices.

## Layout

The rule builder uses the maximum screen width,
irrespective of the number of columns it contains.

## Types

The decision table supports two modes:

- **Guided input:** The user can choose from a predefined subset of operators and rule expressions. The user merely selects the relevant expression.
- **Text input:** The user can choose from the full set of operators and rule expressions in an auto suggest list. To see the suggestions, the user needs to start typing.

## Components

The rule builder uses the following components:

- Grid table: [sap.ui.table.Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/)
- Table toolbar: [sap.m.OverflowToolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/)
- Dialog for table settings: [sap.m.dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)

## Behavior and Interaction

### Display

In display mode, the user sees the conditions and results, but no actions are available.

### Edit

In edit mode, the user can change values by clicking the value fields.

In addition, the following actions are available:

- **Add Row:** Standard action with two options:
  - _Insert First_: Add a row at the top of the table
  - _Insert After_: Add a row at the bottom of the table
- **Delete Row:** Standard action that deletes the selected row or rows.
- **Copy Row:** Optional action for copying the selected row.
- **Cut Row:** Optional action to cut the selected row.
- **Paste Row:** Optional action to paste an item above or below the selected item:
  - _Insert First_: Insert above the selected item.
  - _Insert After_: Insert below the selected item.
- **Table Settings (icon)**: Standard action for table settings.

If no rows are selected, the corresponding actions are disabled.

The standard actions _Add Row_ and _Delete Row_ are always offered. The other actions are optional.

Carousel (full-width)

---

## scroll-container

## Intro

The scroll container is an empty area that can be filled with content, such as other UI elements. The user can scroll through the content.

## When to Use

### Use a scroll container if:

- You want to provide a content area that would otherwise be partly or completely covered or hidden.

### Do not use a scroll container if:

- A page uses a full screen element that can handle vertical scrolling.
- You are using other controls that come with their own scroll container, such as a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/), [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/), or [panel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/panel/).
- You plan to nest different scroll containers that scroll in the same direction.
- You plan to have several scroll containers with different scroll directions (horizontally and vertically) on one page. This may lead to confusion about when to use which scrolling direction and how it all fits together.

## Behavior and Interaction

The scroll container displays a scrollbar on the side for
vertical scrolling and on the bottom for horizontal
scrolling.
In addition, the scroll container is also focusable.
## Responsiveness

The scroll container is responsive and adapts to the screen size. By default, the width consumes the complete available width and the height reflects the height of the content. You can also set a fixed width or height. Always use responsive controls for the content, so that they also adapt to the available width and height.

> **Guideline:** If you are only using horizontal scrolling, do not set the height, or ensure that the height of the container always
exceeds the height of the content.

---

## search

## Intro

A search is a means of accessing information quickly. If
an amount of data is too large for users to find
something just by scanning through it, you should
consider providing a search function.
## Usage

Use a search field (`sap.m.SearchField`) if you want to enable users to enter text to search for information. The search field is also the control of choice for filtering down a given amount of information.

## Responsiveness

When suggestions are turned on, the suggestion list displays differently depending on the device type.

Clicking the search field opens a new full screen dialog
in which items can be selected from a list of
suggestions.

Suggestions are shown below the search field.

Suggestions are shown below the search field.

## Types

SAP Fiori comes with two different search types.

1. The **manual search** is triggered explicitly after the user enters text in the search field and clicks the _Search_ button or presses the _Enter_ key.
2. The **live search** (also known as “incremental search” or “search-as-you-type”) is triggered by each character that the user enters or deletes. There is a default delay of 400 ms before sending the search data to the back end. This ensures better performance and optimizes user experience.

Queries that are entered are used to search the back-end data for term matches (not case-sensitive). While a live search uses a “contains” approach, a manual search uses a “starts with” approach. “Contains” means that the result needs to match the query only partly to be a valid result. “Starts with” means that full terms of the result need to start with the entered query to be visualized.

## Layout

The **search input field** (or search box) consists of two parts:

1. The text input, which is left-aligned. Initially, the field shows a placeholder (_Search_). As soon as the user enters a character, this prompt text disappears. It appears again if the user deletes the entry.
2. If a manual search is to be implemented, a search button with a magnifier icon is placed on the right side of this input control. The user clicks this button to trigger the search. In live searches, the magnifier icon is also placed here, but it functions more like an additional indicator to signify that this is a search input field. It also functions as an explicit search button if the user wants to search again for a query that has already been entered.

All item attributes defined by the app development team are searched. When the results are displayed, the **items found** do not necessarily have to show the attribute through which the item was found. The results are displayed in the same list that contained the original item set. Initial grouping and the order of the list are not affected by the search.

When the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) is used to show a list-detail relationship, the search field appears at the top of the list. In [full screen](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/full-screen/) mode, the search field is placed at the top of the page.

## Behavior and Interaction
### Entering a Search Term
Search terms can be entered easily into the input field.
The search box then displays all full-text search terms.
There is no line break and no truncation if the query is
longer than the input field. Results might also be
displayed that do not match the query in their title or
subtitle. This might be because details can also be
searched for. The user can see the matching terms in the
specific details section.
### Deleting a Search Term
The user can click the “X” icon ( :decline: ) button to
remove the text from the field. In the case of the live
search, this also resets the search. In a manual search,
deleting the search term and then triggering the search
resets the search results.
### Refreshing
If the _Refresh_ button is available, the user can update
the list without triggering a new search. This is usually
needed when backend data changes quickly and often.
If the currently selected item is no longer available
after the list has been refreshed, the next item in the
line is selected. If no next item is available, the first
item in the line should be selected next.
Default (col-1)

On mobile phones and tablets, the _Refresh_ icon is not visible in the search field. In this case, _Pull Down to Refresh_ is used instead. The _Pull Down to Refresh_ arrow icon is animated and spins to signal that the user should release it.
#### Pull to Refresh on a touch device

Carousel (full-width, col-1)

Default (col-1)

Default (col-2)

Section Metadata

style

> **Information:** For information on how to manage leading and trailing white space (blanks) when copying and pasting text into input controls, please see [removing leading and trailing white space](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

## Properties

The following methods are important.

For the live search:

- **[attachLiveChange](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#attachLiveChange)**(oData _?_, fnFunction, oListener _?_) Attach event handler `fnFunction` to the `liveChange` event of this `sap.m.SearchField`.
- **[detachLiveChange](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#detachLiveChange)**(fnFunction, oListener) Detach event handler `fnFunction` from the `liveChange` event of this `sap.m.SearchField`.
- **[fireLiveChange](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#fireLiveChange)**(mArguments _?_) Fire `liveChange` event to attached listeners.

For the manual search:

- **[attachSearch](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#attachSearch)**(oData _?_, fnFunction, oListener _?_) Attach event handler `fnFunction` to the `search` event of this `sap.m.SearchField`.
- **[detachSearch](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#detachSearch)**(fnFunction, oListener) Detach event handler `fnFunction` from the `search` event of this `sap.m.SearchField`.
- **[fireSearch](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#fireSearch)**(mArguments _?_) Fire `search` event to attached listeners.

If a _Refresh_ button is needed:

- **[getShowRefreshButton](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#getShowRefreshButton)**() Getter for property `showRefreshButton`.
- **[setShowRefreshButton](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#setShowRefreshButton)**(bShowRefreshButton) Setter for property `showRefreshButton`.

To show the _Search_ button:

- **[getShowSearchButton](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#getShowSearchButton)**() Getter for property `showSearchButton`.
- **[setShowSearchButton](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#setShowSearchButton)**(bShowSearchButton) Setter for property `showSearchButton`.

To ensure the focus is set to input:

- **[setSelectOnFocus](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/docs/api/symbols/sap.m.SearchField.html#setSelectOnFocus)**(bSelectOnFocus) Setter for property `selectOnFocus`.

If the search is triggered automatically when the value of the field is changed (unlike the `liveChange` event, the `change` event is not fired for each key press):

- **[attachChange](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.SearchField%23methods/attachChange)**(oData _?_, fnFunction, oListener _?_) Attach event handler `fnFunction` to the `change` event of this `sap.m.SearchField`.
- **[detachChange](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.SearchField%23methods/detachChange)**(fnFunction, oListener) Detach event handler `fnFunction` from the `change` event of this `sap.m.SearchField`.
- **[fireChange](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.SearchField%23methods/fireChange)**(mArguments _?_) Fire `change` event to attached listeners.

## Guidelines

- Implement the live search whenever possible.
- Use a manual search only if the amount of data is too large and if your app would otherwise run into performance issues.
- Show an appropriate prompt text:_Search_ if queries are sent to all connected services, or _Search In:_ if the search is limited to a certain source or providing service.

---

## side-navigation

> **Information, Internal_Only:** This component is relevant for the [UX Consistency Product Standard UXC-026 – Side Navigation](https://wiki.one.int.sap/wiki/display/uxc/UXC-026).

## Intro

The side navigation component provides a vertical menu, allowing users to easily access different sections or pages within an application. It is accessed via the hamburger menu located in the shell bar. The side navigation operates in two modes: embedded and overlay. In embedded mode, users can expand or collapse the side navigation using the hamburger menu button. This mode supports up to 3 levels of nested items.
Launch modal

## Anatomy

1. **Main navigation area**: This area includes primary navigation elements, such as navigation groups (4), navigation list items (3, 5), and navigation child items (6). It features its own scrolling section.
2. **Fixed footer area**: The footer area remains visible at all times and does not scroll away. It is separated visually by a divider. Position frequently accessed actions, such as quick creates, in the footer area.
3. **Navigation item (without nested navigation elements)**: A navigation item without nested elements consists of text and an icon. In collapsed mode, only the icon is displayed.
4. **Navigation group**: This group can be collapsed or expanded and contains navigation list items. It is not displayed when the side navigation is collapsed.
5. **Navigation item (with nested navigation elements)**: A navigation item with nested navigation subitems, which can be collapsed or expanded.
6. **Navigation subitem**: A navigation subitem is nested under a navigation item and displays only text.
7. **Quick action**: A quick action enables users to access frequently required actions efficiently, allowing them to perform tasks with minimal clicks.
8. **External link**: A navigation item with an external link.
9. **Popover navigation for subitems**: When the side navigation is collapsed, subitems appear in a popover.

## Behavior and Interaction

The examples below illustrate how to collapse the side navigation in embedded mode and how it opens in overlay mode.

The example below shows the interaction when expanding navigation groups and elements. If needed, a scroll bar appears. The fixed footer remains in place.

## Responsiveness

On touch devices like tablets and laptops, the side navigation appears in overlay mode. On phones, it displays full screen within a dialog.

In collapsed mode, navigation elements shift into the overflow area if space is limited. Selecting an overflow element brings its parent navigation element into view above the overflow button.

## Guidelines

- Label each navigation item clearly and descriptively.
- Group related items for quick information access.
- Limit the fixed footer to 4 elements.
- Name the first element "Home" and link it to the entry page.
- Use the side navigation in embedded mode for easier discovery.

---

## smart-field

## Intro

The smart field creates different user input controls and their read-only equivalents based on an OData (Open Data Protocol) service and its annotations. It comes with additional built-in features, such as [autocomplete and suggestions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#autocomplete-suggestions), [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/), [recently used and recommended values](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#input-assistance), [validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/), and [message handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

> **Information:** The smart field is only available for OData version 2.

## When to Use

### Use the smart field if:

- You use an OData service for your app (OData version 2 only).
- The feature set of the smart field fits your app. In this case, the smart field is faster to implement.
- You use the [smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/) and your app is not performance-critical. The smart field offers more flexibility than the controls provided directly by the [smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/), especially for editing.
- You use a smart form.

### Do not use the smart field if:

- You use a different technology to OData version 2. Use the corresponding controls directly.
- You need a different control for entering or displaying data, such as [multi input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/), a [multi combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/), [step input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/step-input/), a [radio button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radio-button/), or a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/). In this case, use the corresponding control directly.
- You need a different dialog for offering value help, such as the [select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) or [table select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-select-dialog/).
- You use the [smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/) and your app is performance-critical. In this case, the controls offered directly by the [smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/) offer less flexibility but better performance.

## Components

The smart field consists of a basic UI element and an optional label. The following UI elements are available:

Edit mode:
- One or two [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) (with or without a [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/))
- [Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/)
- [Combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/)
- [Text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/)
- [Checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/)
- [Date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/)
- [Date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/)
- [Time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/time-picker/)
For details, see the corresponding guideline topics.

### User Input Control

The smart field chooses the control automatically based on the data type (Edm type) and annotations of the OData service and additional properties. The following controls are used:

Table
Read-Only                                                                                                                                                   | Edit                                                                                                                                 | Edm Types / Annotations /      | Comment
| Properties
Single-line text                                                                                                    | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)              | Edm.String
| Configuration: controlType,
| value: input
[Combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) | Edm.String
Configuration: controlType, value: dropDownList
[Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/)       | Edm.String
Configuration: controlType, value: selection
Multi-line text                                                                                                     | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/)                  | Edm.String
| MultiLineText
Decimal numbers                                                                                                     | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | One or two [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)\ | Edm.Int16, Edm.Int32,
(for number and unit)                                                                                                                | Edm.Int64,
[Object number](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-number/)                                                  |                                                                                                                                      | Edm.SByte, Edm.Byte,
| Edm.Single, Edm.Float,
| Edm.Double,
| Edm.Decimal
| Precision, Scale
Status information                                                                                                  | [Object status](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status)         |                                                                                                                                      | Edm.String
| criticality,
| criticalityRepresentationType
Text and ID                                                                                                         | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)              | TextArrangement                | The following
|                                | patterns can be
[Object identifier](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#object-identifier) |                                                                                                                                      | controlProposal                | selected via
|                                | displayBehavior:
[Object status](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/)                       |                                                                                                                                      | displayBehavior
|                                | - Text (ID)
| textInEditModeSource,          | - ID (Text)
| sap:text,\                     | - Text
| fetchValueListReadOnly         | - ID

Links\                                                                                                              | [Link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/)                                                   |                                                                                                                                      | Edm.String
(with/without quick view)                                                                                           |                                                                                                                                                             |
[Smart link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-link/)                                       |                                                                                                                                      | IsURL, url
| semanticObjectController
Dates                                                                                                               | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/)              | Edm.DateTime
| sap:display-format=”Date”
| IsCalendarDate
| Configuration: controlType
Dates and times                                                                                                     | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/)     | Edm.DateTime
| Edm.DateTimeOffset
Times                                                                                                               | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/time-picker/)              | Edm.Time
Fiscal periods                                                                                                      | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)              | IsFiscalYear, IsFiscalPeriod,
| IsFiscalYearPeriod,
| IsFiscalQuarter,
| IsFiscalYearQuarter,
| IsFiscalWeek,
| IsFiscalYearWeek,
| IsDayOfFiscalYear
Amounts with currencies                                                                                             | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | One or two [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)  | ISOCurrency or sap:unit with
| sap:semantics=”currency-code”
Phone numbers                                                                                                       | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)              | IsPhoneNumber
Email                                                                                                               | [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)                                                   | [Input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)              | IsEmailAddress
Boolean                                                                                                             | [Checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/)                                           | [Checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/)                    | Edm.Boolean
[Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/)           | [Combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/)                                         | Edm.Boolean                                                                                                                          | The text in display mode can be influenced via
| displayBehavior:
valueList
| - Yes/No
displayBehavior                                                                                                                      | - True/False
| - On/Off

> **Guideline:** - Set a default value whenever appropriate (annotation: `text`, property: `value`).
- To show a static unit of measurement, use a description (annotation: `text`).
- To display a text and ID in the same place, use the format _Text (ID)_ wherever possible. Use another format only if displaying the text doesn’t make any sense. Be careful when using the text arrangement options in [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview): end users will only be able to sort, group, or filter based on the ID, even if the ID isn’t visible.
- If you are not using the smart field within a smart form or [smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/), label the smart field with a smart label (annotation: `label`, properties: `textLabel`, `showLabel`). The standard [label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/) doesn’t know the inner structure of a smart field.
- You can set a [tooltip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/using-tooltips) (annotation: `QuickInfo`), but this should usually be avoided. See [Using Tooltips](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/using-tooltips).
- If data entry is expected in a specific format, set a [placeholder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#placeholder) (property: `Placeholder`).

> **Hint:** Performance: Using the `TextArrangement` annotation to display both the text and ID (in any order) triggers two requests to the back end.

## Behavior and Interaction

### Context

Default (col-1)

You can use the smart field in different contexts
(property: `controlContext`):
- Standalone
- Within a [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) (depending on the form layout)
- Within a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) (depending on the table type)
The context influences:
- Labels: In most cases, forms provide the label automatically.
- Empty values in display mode: In [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), empty values are shown as a dash. In [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), the field remains blank. In popins, empty values are shown as a dash because the popin is similar to a form in a table.
- How units of measurement are displayed

> **Guideline:** - If the width is not handled by the context, set a meaningful width for the smart field, based on the expected data
(property: `Width`).
- If you use a “standalone” smart field in a form-like arrangement, use a dash to show an empty value in display mode.

Section Metadata

style

### Switching Between Edit and Display Mode

Default (col-1)

Switching between edit and display mode can be controlled manually (annotation: `FieldControl`, property: `editable`) or automatically by the containing smart form or [smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/) (property: `contextEditable`).

> **Guideline:** - Define which fields should be editable (annotations: `updateable`, `creatable`, `updateable-path`, `InsertRestrictions`, `UpdateRestrictions`, `computed`, `immutable`, `fieldControl`, `fieldControlType`).
- For fields with a unit of measurement, define whether the unit of measurement is editable or static (annotation: `FieldControl`, property: `uomEditable`).
- Make sure that the full text is shown in display mode (property: `wrapping`), unless this is handled differently for the corresponding context (for example, see guidelines for content in the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/#truncation)).
- When you display the text and ID, the smart field automatically displays both values in display mode, but only the ID in edit mode (annotation: `TextArrangement`). In most cases, it makes sense to also display both values in edit mode (annotation: `sap:text`, property: `textInEditModeSource`, aggregation: `Configuration` with property: `displayBehavior`).

Section Metadata

style

### Suggestions and Value Help

You can enable [suggestions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#autocomplete-suggestions) for controls that offer this feature (property: `showSuggestions`). The list of suggestible values must be provided (annotation: `ValueList` or `ValueListWithFixedValues` only for `Edm.String`, property: `entitySet`). This list can contain several attributes and is also used for the [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/). You can restrict the number of attributes from this list to be shown as [suggestions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#autocomplete-suggestions), while all attributes are shown within the [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/).
[Autocomplete](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#autocomplete-suggestions) is enabled automatically.
For input fields, the [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) is also created automatically. Hide it if it is not needed (property: `showValueHelp`). The [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) in the [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) can be filled with initial content (annotation: `ValueList`, property: `fetchValues`, `sap.ui.comp.smartfield.Configuration`, property: `preventInitialDataFetchInValueHelpDialog`)
Both the [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) and the [suggestion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#autocomplete-suggestions) list can be prefiltered (annotation: `ValueList`, property: `valueListParameterIn`). The selected items can be used to prefilter other fields (annotation: `ValueList`, property: `ValueListParameterOut`). The corresponding filter settings are visible. “Invisible” prefiltering is also supported. To use this option, provide the exact matching filter value (`Common.ValueListParameterConstant`).                                                                                                                                                                                                                                                                                            | _Smart field as an input field with suggestions, auto complete, and a value help button_
If a value has been entered in the smart field, this value is transferred to the search field of the value help dialog automatically. In the value help dialog, individual values can be valid, deprecated, or revoked. Revoked values are hidden from the value help (annotation: `IsConfigurationDeprecationCode`).
The following controls are used to offer suggestions or value help:
- A fixed value list leads to a [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) or [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/), depending on the control configuration.
- A non-fixed value list leads to an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) with a [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/).
### Recently Used Values

Default (col-1)

[Input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/), [combo boxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/), and [selects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) can provide up to five [recently used values](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#input-assistance) automatically on focus if suggestions or value help are available. This can be turned on or off per field (property: `historyEnabled`). Recently used values are shown by default for [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/), but not for [combo boxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) and [selects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/).

> **Guideline:** Do not show recently used values for a field if:
- There are only a small number of options.
- The field contains personal sensitive data (annotation: `IsPotentiallySensitive`).
- It is unlikely that the same values will be selected again and again.

Section Metadata

style

### Recommended Values
In addition to recently used values, a smart field can show [recommended values](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/recommendations#input-assistance1) (annotation: `RecommendationState`).
The corresponding smart field is highlighted and/or prefilled:
- If no recommendation is available or the current user input matches the recommendation, the smart field is shown in the default state.
- If a recommendation is available and there is no user input, the smart field is shown in the information state.
- If a recommendation is available and it differs from the current user input, the smart field is displayed in the warning state.
The [recommended values](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/recommendations#input-assistance1) are shown as soon as the user focuses on the smart field.
### Validation

The smart field offers the following validations automatically:
- Validation for [required](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#required) fields: This can be done on the client or server side (property: `clientSideMandatoryCheck`, annotation: `Nullable`). | _Automatic validation_
- Validation for a group of fields: Validation is triggered when the focus moves outside a **group** of fields, rather than when a single field loses the focus. A group is defined by all smart fields that share the same field group ID (property: `fieldGroupIds`).
- Validation for the maximum length of user input: Validation is triggered when a field loses the focus or the ENTER key is pressed (property: `maxLength`).
- Validation for [combo boxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/): Checks if the value entered is available in the dropdown list (property: `fixedValueListValidationEnabled`).
The validation result is indicated by a [value state](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#value-states) (property: `showValueStateMessage`).
When the user edits a smart field showing a text and ID, you can allow any kind of input to avoid unnecessary validation issues (annotation: `ValueListNoValidation`).
Examples:
- Allowing the user to enter additional values (which are not in the suggestion list)
- Typing a text instead of an ID to filter down the suggestion list
- Using the smart field in a [draft](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling)
### IDs
The smart field offers automatic validation for number-only ID fields (annotations: `IsDigitSequence` or `sap:display-format="NonNegative"`):
- It checks for non-negative numbers.
- It shows values containing only “0” digits as empty.
- It does not show leading zeros.
### Units

For decimal number fields and for fields that show an amount with a currency, you can add a unit of measure (annotations: `unit`, `sap-unit` with `sap:semantics="unit-of-measure"` or `sap:semantics="currency-code"`, property: `uomVisible`).
In display mode, the unit is added to the corresponding number. In edit mode, the unit is shown either as text or, if editable, as a
second input field (properties: `uomEditable`, `uomEnabled`).                                                                                                                                                                                    | _Smart field showing an amount with a currency in display mode_

### Sensitive Data
Sensitive data, such as passwords, can be masked. The text is then replaced with
asterisks (annotations: `IsPotentiallySensitive`, `masked`).
### Capitalizing Text Input
Text input can be capitalized automatically (property: `IsUpperCase`).
Default (col-1)

### States
Smart fields support the following states (annotation: `fieldControl`):
- Editable or [display only](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#display-only) (additional annotations: `updateable`, `creatable`, `updatable-path`, `InsertRestrictions`, `UpdateRestrictions`, property: `editable`)
- [Enabled](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#enabled) or [disabled](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#disabled)
- Visible or [hidden](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#hidden) (additional annotations: property: `visible`, annotation: `sap:visible`)
- [Required](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#required): If set, the smart field must contain a value when validated. This is indicated by an asterisk next to the corresponding label (additional annotation: `Nullable`, property: `mandatory`).
The following states for a unit of measurement can be set independently of the corresponding field:
- If editable, a unit of measurement can be [enabled](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#enabled) or [disabled](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#disabled) (property: `uomEnabled`)
- The unit of measurement can be visible or [hidden](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#hidden) (property: `uomVisible`)

> **Hint:** In the SAPUI5 SDK API Reference for the smart field, the [display only](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#display-only) state is referred to as [read only](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#read-only).

Section Metadata

style

### Dependencies between Smart Fields
If the content of a smart field is changed, you can
trigger additional changes to other fields on the UI
(annotation: `SideEffects`).
### Content Alignment

Default (col-1)

You can change the horizontal alignment of the text within any kind of input field (property: `textAlign`).

> **Guideline:** Follow the alignment rules for the respective context ([responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#horizontal-content-alignment), other [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/#content-alignment), [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/#guidelines)). If you are using the standalone option for the smart field (without a context), apply the rules for the corresponding input fields.

Section Metadata

style

## Responsiveness

The smart field acts exactly like the embedded controls. For details see:

- [Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/#responsiveness)
- [Object display components](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/#responsiveness)
- [Link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/#responsiveness)
- [Smart link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-link/#responsiveness)
- [Input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#responsiveness)
- [Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/#responsiveness)
- [Combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/#responsiveness)
- [Date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/#responsiveness)
- [Date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/#responsiveness)
- [Text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/#responsiveness)
- [Checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/#responsiveness)

## Top Tips

- Always label a smart field if it is not inside a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/) context.
- Use [suggestions with autocomplete](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#autocomplete-suggestions) whenever possible and meaningful.
  - Do not show suggestions if there are only a few choices.
  - Use recently used values as appropriate.
  - Reduce the number of attributes shown in the [suggestion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#autocomplete-suggestions) list to a maximum of 4 or 5.
- Make use of [validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/) features.

## Properties

The following properties, aggregations, and associations are available for `sap.ui.comp.smartfield.SmartField`:

- The property: `expandNavigationProperties` is deprecated. Do not use it.
- The property: `importance` hides the field if the smart field is placed in a smart form, depending on the importance setting of the smart form. End users have no possibility to show the corresponding fields again. Do not use this property.
- The property: `jsontype` is deprecated. Do not use it.
- The property: `name` is used in HTML forms that send data to the server via “Submit”.
- The property: `uomEditState` is for internal use only. Do not use it.
- The property: `proposedControl` is deprecated. Do not use it.
- The property: `textDirection` provides support for reading directions in different locales.
- The aggregation: `controlProposal` is deprecated. Do not use it.
- The association: `ariaLabelledBy` can be used for linking additional labels to the smart field.

---

## status-indicator

## Intro

The status indicator uses a filled shape to visualize a
single value. Unlike the progress indicator or the radial
micro chart, the indicator provides the user with a
meaningful association through its use of icons. You can
embed the status indicator in other controls.
## Usage

### Use the status indicator if:

- You need to display a single value with an icon that describes its context.
- You need to display a single value that can be updated in real time without reloading the page.

### Do not use the status indicator if:

- You need to display a single value within a table. Use the [progress indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/progress-indicator/) or [radial micro chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radial-micro-chart/) instead.
- You need to show a rating. Use the [rating indicator](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/rating-indicator/) instead.
- The status indicator does not provide the user with any meaningful information and would be for decoration only.

## Responsiveness

Default (col-1)

The status indicator provides four different sizes: small (size S), medium (size M), large (size L), and extra-large
(size XL).
For the small size, the partial fill is replaced by a fully-filled shape that can only indicate the semantic per
threshold reached.

#### Predefined Sizes of the Status Indicator (S, M, L, XL)

Carousel (full-width, col-2)

Section Metadata

style

## Layout

A status indicator can consist of a scalable vector graphics (SVG) shape and additional information, such as a label. The status indicator can be configured as a shape only (default), or as a shape with a fixed label.

### Shape Only
By default, the status indicator consists of a single
shape. We recommend using this type of status indicator
when you need to display a fraction of a value, rather
than a specific value.
### Shape with a Fixed Label
This type of status indicator includes not only a shape,
but also a label that uses semantic colors defined for
the the value thresholds of the status indicator. In
addition, you can switch between different alignment
options, such as left, right, top, or bottom. We
recommended using this type of status indicator when the
user needs to see the exact value.
## Types

Default (col-1)

### Linear Fill
Most shapes can be filled linearly. You can set the shape to be filled from the left, right, top, or bottom, or
define a specific angle for filling.

#### Status indicator with linear fill

Carousel (full-width, col-2)

Section Metadata

style

Default (col-1)

### Circular Fill
For round shapes, you can use the circular fill.

#### Status indicator with circular fill

Carousel (full-width, col-2)

Section Metadata

style

Default (col-1)

### Filling Sequence
The sequential fill option is useful when the shape consists of multiple parts. You can fill the parts sequentially
one by one, or set your own filling order.

#### Status indicator with filling sequence

Carousel (full-width, col-2)

Section Metadata

style

### Grouping
You can group several shapes together and decide how the
filling should be orchestrated among the shapes in this
group.
### Thresholds
You can set one or more thresholds for each status
indicator and assign a color to each threshold. The color
changes when a threshold has been exceeded. Only use
thresholds and semantic colors if they are meaningful to
the user. Do not use them for decoration.
## Behavior and Interaction

You can define a click event for the status indicator. If the status indicators are grouped, you can define a click event for each status indicator or for the entire group.

> **Information:** When setting a click event for a non-filled shape, we recommend using a darker background color to emphasize that the
shape is clickable and not disabled.

## Guidelines

### Shape Definition

You can [download the predefined shapes](https://main--builder-prospect--sapudex.hlx.page/wp-content/uploads/sites/56/2018/07/status_indicator_shapes.zip) or create your own custom shapes. For more information on how to create custom shapes correctly, see the [API documentation](https://sapui5.hana.ondemand.com/#/api/sap.suite.ui.commons.statusindicator.CustomShape/controlProperties).

> **Hint:** Only circle, rectangle, and path tags are supported inside the SVG file.

### Animation Duration

Shape animation follows the [motion design](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/motion-design) principles, with a maximum duration of 250 ms (small moves).

## Examples

---

## t-account

## Intro

In double-entry bookkeeping, journal entries are transferred to the general ledger by posting their debit and credit amounts on specific ledger accounts, which are often referred to as T accounts. A ledger account (or T account) is usually displayed in a format that resembles the letter T: with the account name above the T, debit entries to the left of the T, and credit entries to the right of the T.

T accounts are usually clustered together, so the accountants can analyze how individual line items from different journal entries affect the ledger balances.

## Usage

### Use the T account if:

- You need to analyze how individual line items affect one or several ledger accounts.
- You want to highlight the cross-account impact of one journal entry.
- You want to aggregate data of individual ledger accounts and provide total balances.

### Do not use the T account if:

- You need to aggregate data through a different dimension than the account balance. Use a table instead.
- You need to display objects that are not journal entry line items.

## Responsiveness

The T account control is fully responsive, and uses 100%
of the available width of the container in which it is
embedded. Depending on the available width, the number of
T accounts on each line is updated dynamically to fit the
available space.
On mobile devices, the T account control requires the
full available width in order to display all its content.
The minimum width of each T account element is **20 rem**
(320 px). The width of the T account element grows until
it reaches a breakpoint where enough width is available
to render 2 or more T accounts on one line, leaving a
space of **1 rem** (16 px) between the T account items.

## Layout

The T account control consists of a header toolbar, an
account group heading, and individual T account elements.
The header toolbar and account group heading can be
hidden on the API level.
## Components

By default, the T account control consists of a header toolbar, account group heading, and T accounts.

### Header Toolbar
- **A – Title:** Provides a short and meaningful summary of the control’s content.
- **B – Total Balance:** Calculates the overall balance based on total credit and debit amounts of
the ledger accounts included.
- **C – View Switch:** Switches the view between the T account view and table view.
- **D – Settings:** Displays a settings dialog, allowing users to show or hide additional information about accounts.
### Account Group Heading
Each account group heading uses the expand/collapse behavior of the sap.m.Panel control, with an
additional total balance indicator for the T accounts in the group as well as _Expand All_ / _Collapse All_ buttons. The _Expand All_ / _Collapse All_
buttons can be used to expand or collapse the content of all T accounts included in this account
group.
- **A – Expand/Collapse:** Expands or collapses the group of accounts.
- **B – Account Group Title:** The name of the group of accounts.
- **C – Group Balance:** Calculates the balance based on total credit and debit entries of all T
accounts included in the account group.
- **D – Expand All:** Expands all T accounts within the group of accounts.
- **E – Collapse All:** Collapses all T accounts within the group of accounts.
### T Account
Every T account element consists of a heading, debit and credit content headings, and individual
ledger entry blocks.
The number of individual entry blocks is unlimited and could potentially reach hundreds of blocks.
The entry blocks are nested under **Credit** and **Debit** headings. Each entry block takes **50%** of the available width of the container. The credit and debit entry blocks are separated by a **1 rem** (16 px) space.
- **A – Expand/Collapse:** Expands or collapses the T account.
- **B – Account Title:** The name of the T account.
- **C – Account Balance:** The sum of all credit and debit entries in the T account.
- **D – Debit Content Heading**
- **E – Credit Content Heading**
- **F – Entry** **Block Amount**: Provides the amount for a single ledger entry.
- **G – Entry Block**: Displays details of a specific ledger entry.
## Behavior and Interaction

### Matching Entries

Each journal entry usually impacts several ledger
accounts. When the user clicks an entry in a T account,
the control highlights this entry and all related entries
in other T accounts, which helps identify matching
entries in different accounts.
### Color Indicators

Default (col-1)

You can allow users to add color indicators to specific journal entries.
The T account control supports this on API level. However, the implementation should be done on the app level.

> **Information:** To ensure consistency with other controls, sap.m.ColorPalette or sap.ui.unified.ColorPicker controls must be used
together with standard SAP Fiori color palettes.

Default (col-2)

Section Metadata

style

### Drag and Drop

By default, the control arranges T accounts dynamically to consume as little space as possible within the column grid. However, users can rearrange the T accounts freely by dragging them around.

If you would like to let users store their reordered layouts, use the variant management control.

### View Settings

The view settings dialog enables the users to show or
hide certain attributes of each entry block in a T
account.
Additionally, you can show or hide labels that precede
the values.

---

## tag-web-component

## Intro

A tag provides additional information about an object, such as a number or a KPI (Key Performance Indicator). It directs the user’s attention to specific details like state, quantity, or condition and can include both icons and text.

Tag examples

## When to Use

Do
Use the tag:
- To display complementary information for an object,
such as a number or a KPI.
- To show certain information (such as a category or
status) in a compact form.
+------------------------------------x------------------------------------+
Top Tips
+------------------------------------x------------------------------------+
- Avoid adding too much text to a tag.
- Don't use single letters or numbers on a tag (minimum width applies).
- Use only one icon in an icon-only design.
- Don’t overuse tags on pages.

## Anatomy

Tag anatomy

+------------------------------------------------------------------------x-------------------------------------------------------------------------+
Requirements
+------------------------------------------------------------------------x-------------------------------------------------------------------------+
1. _Mandatory_ **Background:** Different background colors allow customization or semantic coloring.
2. _Mandatory_ **Text/Icon:** Describes or visualizes the information displayed. You can show both an icon and text, only an icon, or only text.

## Types

### Size and Semantic Meaning

The tag component offers a range of visualizations to cover different use cases, including small/large sizes and [value states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states). Small is the default size, and is often used in tables and lists to indicate a general status. Large is typically used in object headers.

Tag sizing and semantic meaning

### Variants

The tag can contain only an icon, only text, or both an icon and text.

Tag variants

## Behavior and Interaction

### States

The tag component has an “Active” state that should only be used to display additional information (typically in a [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/)) using the progressive disclosure technique.

## Responsiveness

Text in a tag can be wrapped by word or truncated with the ellipses. For more information, see [Wrapping and Truncation](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/wrapping-and-truncation).

---

## tile

## Intro

A tile is a container that represents an app on the [SAP Fiori launchpad home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).
Tiles can display different types of content, which is based on data supplied by the app. They can contain an icon, a title, an informative text, KPIs, counters, and charts.
A **link** is a special representation of a tile. Links are displayed in a separate area below the tiles area and comprise a title and an optional subtitle. Most tile types can be converted to links, and links can be converted to tiles at any time.
Users can personalize their home page by selecting the tiles for the apps they want to use from the [app finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder). The apps available in the app finder depend on the user’s role.
The number of visible tiles on the launchpad home page depends on the screen resolution. If the tiles in a group do not fit in one row, they are wrapped to the next row.

## Responsiveness

By default, the standard tile size is responsive. The tile size is independent of the device: small screens get smaller tiles (even on a desktop device), and all larger screens (including some smartphone screens) get larger tiles.

The examples below show how the tiles render for different screen sizes.

#### Alternative Configuration – Small Tiles for All Screen Sizes

To fit more tiles onto the screen, customers can opt to use the smaller tile size for all screen sizes. In this case, there is no special tile size for small screens.

Key users or administrators can change the tile size for all tiles on the launchpad centrally (property: sizeBehavior, value: Small).

> **Warning:** **Do not** use this option for single tiles. Because all tiles on the launchpad need to be consistent (all
responsive, or all small), the tile size should not be defined at app level.

## Layout

The generic tile control supports the following
dimensions:

- 2×2 tile
- 4×2 tile (wide)
- 2×1 tile (flat)
- 4×1 tile (flat wide)

The layout of the generic tile is fixed, with designated
areas for the header, content, and footer.
### Header Area
The header area is mandatory, and contains the title and
an (optional) subtitle. The header is always in the upper
left corner of the tile, except on feed tiles.
#### Title Text (Required)

Default (col-1)

The space available for the title depends on the [tile type](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/tile/#types). On a regular 2×2 launch tile, the title truncates as follows:
- If the tile contains an icon or KPI, the title text truncates after 2 lines (or after 3 lines if there is no subtitle).
- If the tile is text-only tile, the title text truncates after 4 lines (or after 5 lines if there is no subtitle).
The title text supports hyphenation (property: wrappingtype = Hyphenated). Switching on hyphenation activates it for all languages that have hyphenation support.

> **Changes:** 
Default (col-1)

#### Subtitle (Optional)
The subtitle can have one line of text before it is truncated.

Default (col-2)

Section Metadata

style

### Content Area
The content area is optional. The content itself is
defined by the apps and can be a KPI, counter, chart,
text, or icon.
### Footer Area
The footer is optional, and comprises a single line of
text. It is typically used to qualify the content (for
example, the period and currency for a KPI), but can also
contain a refresh icon and status.
### Visual Representation
Apps can be visualized as tiles or links. While there are many types of tiles, links always have the same format: they comprise a title an optional subtitle.
For more information about links and the conversion between tiles and links, see [SAP Fiori Launchpad Home Page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).
## Types

### KPI Tile
Key performance indicators (KPIs) are used to measure and
monitor a company’s performance at a strategic and
operational level.
The tile displays the KPI values as large,
easy-to-recognize digits. In addition, you can show
deviation arrows, negative values, and scaling factors.
You can also use semantic colors to emphasize the
content. The number of digits is limited by the size of
the tiles.
You can use the 4×2 tile to combine the content of two
tiles into one. For example, you can show a KPI next to a
comparison chart (as shown on the right), or use any
other combination such as KPI/KPI, chart/chart, and so
on. You can show different information in both the
content and status areas. However, in all other respects,
the 4×2 tile behaves as one tile – with one headline,
subtitle, clickable area, and target.
### Comparison Chart (Micro Chart)

You can use [comparison charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/comparison-micro-chart/) to show detailed comparisons with semantic coloring for entries in a “Top N” list. You can choose between two different layouts:
- 2×2 tile with two or three entries
- 4×2 tile with up to four entries
### Bullet Chart (Micro Chart)

A [bullet chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/bullet-micro-chart/)
is a variation of a bar chart. It compares a single, primary value to one or more target values. The primary value is shown in
the context of qualitative ranges (thresholds) such as poor, satisfactory, and good.
See the image on the right for examples of different bullet charts:
- The chart on the left focuses on the actual value in relation to the target value and the forecast.
- The chart in the middle shows the same combination, but without the forecast.
- The chart on the right focuses on the delta between the actual value and the target value. Note that the delta visualization
never shows the forecast.
All the charts show certain thresholds to give the user a sense of orientation.
### Trend Chart/Area Chart (Micro Chart)

You can use [trend charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/area-micro-chart/)
(also known as area charts) to show cumulated totals over time, based on amounts or percentages. In this example, you can see a stacked
trend chart. You can also use trend charts to depict trends for related attributes.
The trend chart is similar to the plot chart, except that the area below the plotted line is colored to indicate the volume.
### Column Chart (Micro Chart)

You can use [column charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/column-micro-chart/)
(bar charts) to compare categories using vertical bars. One axis of the chart shows the specific categories, while the other axis represents
a discrete value. You can also cluster multiple bars into groups within the column chart.

### Basic Launch Tile

The most basic launch tile contains a title, subtitle,
and icon. However, you can also use it as a text-only
tile.

Links are a different visual representation of a tile and
always look the same: they consist of a title and an
optional subtitle.

Default (col-1)

On flat tiles, you can show:
- A two-line title with a subtitle or footer
- A one-line title with an icon

> **Information:** Flat tiles are not available for the SAP Smart Business framework.

Default (col-2)

Section Metadata

style

### Monitoring Tile

Use the monitoring tile when you want to display status
updates or an object count.

You can also apply semantic colors to the status bar to
indicate a positive, negative, or critical status.
Default (col-1)

Flat monitoring tiles nearly have the same information density, but use less space. You can show:
- A one-line title
- A KPI
However, you can’t display a subtitle or footer when the numeric content is used.

> **Information:** Flat tiles are not available for the SAP Smart Business framework.

Default (col-2)

Section Metadata

style

### SAP Jam Tile

If an organization uses SAP Jam, users can also add SAP Jam tiles to the launchpad. The SAP Jam tile shows the content of new notifications in 10-second intervals. It can
scroll through up to 10 new notifications. Tile content is updated every five minutes. If there are no new notifications, the tile displays the most recent notification. If
the 4×2 tile does not contain an icon, the headline uses the full length of the container. For more information, see [collaboration](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/collaboration).

### Feed Tile

The feed tile is a special tile that shows a news feed.
It refreshes every three to five seconds and is twice the
size of a standard tile. In addition to the news
headline, it comes with a background image, the news
source, and a time stamp. The feed tile flips through
news messages, which are configured for the tile. For
accessibility reasons, the tile contains a start and
pause button which can be found by hovering the mouse
over the tile on desktop devices. On touch devices, the
buttons are always displayed. Additionally, the number of
slides contained the tile is visualized as dots on on the
bottom of the tile.
## Behavior and Interaction

All tiles on the [SAP Fiori launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) support one click event and one navigation target.

### Open App

All tiles have one click area that opens the corresponding app.

## Styles

### Tile Loading
When a tile is loading, the standard loading indicator
appears in the center of the tile. The tile itself is
overlayed in white.
If a tile cannot be loaded, a warning icon and text
appear at the bottom of the tile. Error messages should
not be displayed in the status area. For each tile, the
error text can be defined individually by the system
administrator when preparing the tile.
## Guidelines

### Do’s

- Use only [this control](https://ui5.sap.com/#/entity/sap.m.GenericTile/samples).
- Only use tiles on the [launchpad home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page). Don’t use them anywhere else.
- In the content area, only show content types described in this guideline. For example, don’t play videos, animations, or gifs in the tiles.
- If you are not showing a KPI or a chart, try to show an icon instead to help users to distinguish the tiles.
- Use flat tiles to free up space and add variety to the [SAP Fiori launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).
- Use short tile names. 
### Don’ts

- Do not use the standard tile (sap.m.StandardTile) or custom tile (sap.m.CustomTile). These are deprecated.
- Do not use the status area for error messages.
- Do not use the tile subtitle for explanations. Use the subtitle only if you need a differentiator (such as a specific view on the data).
- Do not use icons on KPI tiles; only use icons on basic launch tiles or monitoring tiles.
- Do not show icons next to an counter when you expect 5 digits or more.

### Icons

- We have decided to stop unique launch icons being created for individual apps. Creating a unique icon for every app was and is not scalable in terms of iconography and production (hinting and PNG exportation). 
- Projects without a SAP Fiori ID do not get an individual icon.
- Do not develop your own icons or use custom icons.

---

## user-menu

> **Information, Internal_Only:** This component is relevant for the [UX Consistency Product Standard UXC-020 – User Menu](https://wiki.one.int.sap/wiki/display/uxc/UXC-020).

## Intro

The user menu provides access to user-specific settings and information. It is accessed by clicking on the user profile icon within the shell bar, represented by an avatar.

## Anatomy

The user menu popover consists of the following elements:
1. **Popover** holds all the content of the user menu.
The popover represents the user currently signed in and contains the following information:
2. **Avatar**: A visual element with the user's profile picture. If no profile picture is
available, the avatar displays the user's initials. Editing the avatar/profile picture is
optional.
3. **Title**: A UI element that displays the user's first and last name.
4. **Subtitle 1**: Shows the unique identifier of the signed-in user, such as an email address or username.
5. **Subtitle 2**: Can display additional details about the user, such as their job role or position.
6. **_Manage Account_ button**: If the product's user profile is managed outside the product
itself as a central profile, this button navigates the user to the appropriate experience.
Don’t display this button if no central profile is available.
7. **_Other Accounts_ panel**: If the product supports multiple accounts, this panel lists
other accounts the user can log into.
8. **_Manage Accounts_ icon button**: Links to the experience where accounts can be managed.
9. **User menu items**: Displays list items that provide access to standard options, such as _Settings_, _Legal Information_, or _About_. If necessary, you can also include product-specific options that are related to the user.
10. **Submenu**: If necessary, you can add a 2<sup>nd</sup>-level menu.
11. **Sign Out**: Procedure to exit the product in a secure manner.
## Interaction

### Scrolling

Scrolling

## Responsiveness

The user menu opens on full screen on size S for touch-enabled devices.

User menu responsiveness – Size S (touch)

---

## variant-management

> **Information:** **Note on terminology:**
On the user interface, we now call variants “views”, which is better understood by end users. To describe the SAPUI5
controls, however, we still speak of “variants” and “variant management”.

## Intro

Variants store view settings, such as filter settings or control parameters.

The filter settings consist of filter parameters, selection fields, and the layout of filters. They are set within the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/).

Control parameters are the sort order, filter and group settings, column visibility, and the layout of a table or chart. They are set within the [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) of the control.

The variant management control enables the user to load, save, change, and maintain variants.

## Usage

### Use the variant management control if:

- The user needs to save and load different filter settings to find the relevant data.
- The user needs to save and load different layouts (for example, a table) to display data in different views.
- The user needs to save the settings for the whole page, including the filter settings and table layout.

## Responsiveness

On phones, the _My Views_ dialog for selecting variants, the _Manage Views_ dialog, and the _Save View_ dialog open in full screen mode.

_My Views_          | _Manage Views_          | _Save View_

_My Views_          | _Manage Views_          | _Save View_

_My Views_          | _Manage Views_          | _Save View_

## Components

Variant management come with several components:

- A clickable title with an icon
- The _My Views_ dialog for selecting variants
- The _Manage Views_ dialog for setting view parameters and deleting views
- The _Save View_ dialog for creating a new view

### Name of View

The view name is the entry point for opening the _My Views_, _Manage Views_, and _Save View_ dialogs. |
If the user has made changes to the user interface that affect the saved                              | _Selecting a view_
view, the view is marked with an asterisk (\*) to indicate the unsaved                                |
changes. This happens when the user deletes or adds a filter to the filter                            |
bar, for example.                                                                                     |
### _My Views_ Dialog

The _My Views_ dialog contains all favorite views, including the default view, the pre-shipped standard views, and the views marked as favorites
by the user. The default view and the pre-shipped standard views are marked as favorites automatically.
_'My Views' dialog with a few views_           | _'My Views' dialog with more than 10 views and a search option_
#### Default View
There can only be one default view, which the user can change in the _Manage Views_ dialog. If the user sets a new default view, the last view remains as a favorite. The user can explicitly unfavorite the last view in the _Manage Views_ dialog.
#### Pre-Shipped Standard Views
The standard view is the minimum set of filters delivered by SAP, and cannot be modified or deleted. It is flagged as a favorite and cannot be
removed. There can be several pre-shipped standard views, depending on the use case.
#### Favorite Views
Users can mark views as favorites (or unfavorite them) in the _Manage Views_ dialog. If more than 10 favorite views exist, a search option is displayed.
The views created by users themselves are favorited automatically, while views created by other users are unfavorited by default. This prevents
the _My Views_ popover from becoming overcrowded with public variants that are not relevant for the user.
The user can also mark public views as favourites.
#### Public Views
Public views are visible to all users who have access to the app. A view can be set to _Public_ by individual users, key users, SAP (default delivery), or partners. All views that are set to _Public_ are available within the _Manage Views_ dialog.
A public view can be edited by the user who created it and by key users. All other users can only display the public view.
#### Actions in the _My Views_ Dialog
Users can open the _Manage Views_ dialog using the _Manage_ button in the footer bar of the _My Views_ dialog. From this dialog, users can _Save_ changes to the current view, or choose _Save As_ to create a new view, which opens the _Save View_ dialog.
### _Manage Views_ Dialog

In the _Manage Views_ dialog, users can make the following changes:
- Mark a view as a favorite
- Change the name of a self-created view
- Set a view as the default
- Apply the view automatically
- View the _Sharing_ and _Created By_ information of each view
- Delete a self-created view
In addition to the personal views users create for themselves, they
can also see the pre-shipped and public views. A user can only
modify his or her own views, and not public, pre-shipped, or
third-party views created by other users.Exception: Key users can
also change and delete views created by others.
#### Apply View Automatically
Users can select or deselect this option. The control
allows app teams to add an optional text next to the
checkbox. This can be useful if you apply filter
exceptions that overwrite the standard behavior.
### _Save View_ Dialog

The _Save View_ dialog is for creating a new view. For each view, you
can make the following settings:

- _View_: Name of the new view (required field)
- _Set as Default_: If checked, the new view is the new default view.
- _Public_: If checked, the new view is available to everyone who has
access to the app.
- _Apply Automatically_: If checked, the view is applied immediately
whenever it is selected. The user does not need to click the _Go_ button in the filter bar.
We do not recommend checking this option if the selection is likely
to cause long loading times.
## Layout

The variant management control is merged with the page title (or next to or merged with title of the respective control, such as a table).

### Filter Bar (Page Title)

The variant management control is merged with the page
title within the page header container, and saves the
stored filter settings or both the filter and control
settings.
### Table

The variant management control can also store control
settings like layout, table column visibility, sorting,
or grouping independently of the filter settings.
It is either merged with the control title or placed next
to it.
If you place the title or variant management control
inside a toolbar, apply the following styles:
- Set the toolbar height to 3 rem.
- Use a transparent toolbar.
- Use the title class “sapMH4Fontsize”.
If the table has a separate title, place the title first.

## Behavior and Interaction

This control allows the user to select, create, update, and delete variants for filter settings and control parameters such as layout, table column visibility, sorting and grouping.

### _My Views_ dialog: Selecting a View

The page title displays the active variant. Clicking the title dropdown opens a popover
that displays all available variants. The currently active variant is highlighted. To load
another variant, the user simply selects one from the list.
#### Save
_Save_ can only be applied to variants that the user is allowed to save. Otherwise, this
button is disabled. _Save_ overwrites the active variant.
#### Save As
_Save As_ enables the user to save the current filter settings as a new view. The _Save As_ function can also be used to duplicate existing variants for later modification.
#### Manage
_Manage_ opens the _Manage Views_ dialog that allows the user to update, delete or favorite/unfavorite existing variants.
### _Save View_ dialog

The _Save View_ dialog is for creating new views. Providing a name for the new
view is mandatory. Clicking _OK_ saves the new view.

### _Manage Views_ dialog

In the _Manage Views_ dialog, the user can rename,
delete, and change properties of existing views.

Users can only modify or delete entries if they have the
necessary permissions. By default, variants that a user
has created can also be modified and deleted.
### Save as Tile

The user can save the currently selected variant as a tile on the
launchpad using the _Save as Tile_ action in the _Share_ menu.

In the _Save as Tile_ dialog, the user can define the tile title and
subtitle, a description, and the launchpad group in which the tile should
appear.

## Guidelines

### Save as Tile

Use the name of a variant as the title of the application tile. Map this as a preset title that cannot be edited by the user. In this case, whenever the variant is updated, the tile is updated accordingly.

_Exception:_ If the variant cannot be referenced directly due to technical limitations, offer the standard tile creation option where filter parameters and settings are only saved within the URL.

---