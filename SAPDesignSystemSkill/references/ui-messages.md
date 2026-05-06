# SAP Fiori UI Elements: Messages

This reference covers the following UI components:

- [Message Box](#message-box)
- [Message Strip](#message-strip)
- [Message Strip Web Component](#message-strip-web-component)
- [Message Toast](#message-toast)
- [Toast Web Component](#toast-web-component)

---

## message-box

The message box (sap.m.MessageBox) is a special dialog that allows you to display messages to the user. Compared to the [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/) (sap.m.MessagePopover), you can use the message box to display messages that are not related to a field on the UI, such as technical errors.

**> **Hint:** **

Create a message box using either the `sap.m.MessageBox` control or the `sap.m.Dialog` control with its type set to `Message`.

## When to Use

Do
Use the message box:
- To display messages unrelated to specific UI fields.
- To interrupt users during an action.
- To show error, warning, success, confirmation, or
information messages.
- To interrupt users for other reasons.
- To require user acknowledgment of a message.
- To prompt users to make a decision.
+--------------------------------------------------------x---------------------------------------------------------+
Top Tips
+--------------------------------------------------------x---------------------------------------------------------+
- Use plain language for messages, avoiding code.
- Clearly describe the issue and suggest a constructive solution.
- Help users recognize, diagnose, and recover from messages.
- Remember that no message is often better than even a well-crafted one. Design your apps to prevent issues from
arising in the first place.

## Anatomy

The message box contains the following sections and options:
**Title:** Title text appears in the message box header.
**Content:** This area contains the actual content of the message box.
**Footer with actions:** The footer can contain one or more [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/). We recommend limiting the number to two: A [primary action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#primary) and a [negative path action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#negative-path).
The message box consists of the following sections and options:
- **Title**: The title text appears in the header of the message box.
- **Content**: This section contains the main content of the message box.
- **Footer with actions**: The footer can contain one or more [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/). We recommend a maximum of two buttons: A [primary action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#primary) and a [negative path action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#negative-path).
#### "Show Details" Button

The message box should generally provide enough information in its short message text for the user to understand what has happened. Therefore, display the _Show Details_ link only if additional information, distinct from the short message text, is important for the user.

If additional details are available, the application can present them in one of three formats:

- Plain
- Formatted
- Original code format

## Message Types

The available message types are:

- Error
- Warning
- Success
- Information
- Confirmation

### Error Message

**Default (col-1)**

Trigger error messages when users enter incorrect data or a system error occurs.
These messages should interrupt the user by displaying a dialog. The user must rectify the error before finalizing
actions, such as _Submit_, can be completed.
**Control**: sap.m.MessageBox
**Icon**: sap-icon://message-error
**Title**: Error
**Stretch**: False (no full screen on any device)

**> **Guideline:** **

- Don't just describe the problem; provide steps for resolution.
- Speak the end user's language in the short text and avoid system or configuration details.
- If the solution is complex or technical, add a long text.
- Don't repeat the short text in the long text, since both appear on the screen together.

**Default (col-2)**

**Section Metadata**

style

### Warning Message

Warning messages draw attention to potential issues while allowing users to proceed. They may include scenarios like unintended data loss.

**Control**: sap.m.MessageBox
**Icon**: sap-icon://alert
**Title**: Warning
**Stretch**: False (no full screen on any device)

#### Use Cases for Warnings

**a) No decision required**
Formulate the message as a statement.
**Button(s):** OK
**b) Decision to continue required**
Formulate the message as a statement.
**Button(s):** OK, Cancel
**c)** **Specific decision required, with one action**
Use the relevant action button. The message can also be
formulated as a question.

**Button(s):** Leave Page, Cancel
### Success Message

**Default (col-1)**

Success messages provide feedback to the user that an action has been executed. The user needs to acknowledge this
message.
**Control:** sap.m.MessageBox
**Icon:** sap-icon://message-success
**Title:** Success
**Stretch:** False (no full screen on all devices)
**Button(s):** OK

**> **Guideline:** **

As a rule, use a [message toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/) (sap.m.MessageToast) to display success messages.
Choose a message box for success messages only in exceptional cases, such as when the message contains key information that users must be able to copy.

**Default (col-2)**

**Section Metadata**

style

### Information Message

Information messages offer details that users need to
acknowledge, without requiring a decision. The
information is useful and relevant but never critical.
**Control**: sap.m.MessageBox
**Icon**: sap-icon://message-information
**Title**: Information
**Stretch**: False (no full screen on any device)
**Button(s)**: OK
### Confirmation Message

Confirmation messages ask users to verify an action they have
initiated. The message box title includes the action requiring
confirmation, such as deletion or approval.
**Control**: sap.m.MessageBox
**Icon**: sap-icon://question-mark
**Title**: \<Action> (such as “Approve or “Reject”)
**Stretch**: False (no full screen on any device)
**Button(s)**: \<Action> (such as “Approve” or “Reject”), Cancel
#### Confirmation Message with “Note” Section

You can add a "Note" section to confirmation messages, allowing users to include notes (for example, during a "Reject" process).
Since this feature isn’t provided by sap.m.MessageBox, use a standard [sap.m.Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) to add these controls within the confirmation message.

#### Confirmation for “Delete”

In most cases, deleting an object carries the risk of accidental data loss, which is why the standard delete confirmation dialog uses a warning icon. However, if the delete action isn’t critical, you may opt to use a regular confirmation dialog instead.

**Standard "Delete” message box**
When the user clicks "Delete," present a "Delete" dialog
to confirm the delete action. This dialog combines
elements of both warning and confirmation message boxes,
using "Delete" as both the title and button label in a
warning message box.
**Control**: sap.m.MessageBox
**Icon**: sap-icon://alert
**Title**: Delete
**Stretch**: False (no full screen on any device)
**Button(s)**: Delete, Cancel
**Exception**
If the delete action has minimal or no impact, doesn’t
result in data loss, and can be easily undone, use a
standard confirmation message box with "Delete" as the
title and button label.
**Control**: sap.m.MessageBox
**Icon**: sap-icon://question-mark
**Title**: Delete
**Stretch**: False (no full screen on any device)
**Button(s)**: Delete, Cancel
**Example**: The user deletes the assignment of an item
from the current page, and the item can easily be
reassigned later.
##### Use Cases

The examples below show use cases for delete confirmation messages in [list reports](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) and [object pages](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/).

**a) No context is available**
For example, neither the ID nor the description of the
business object is available at the time of deletion.
**Body text:** Delete this \<object>?
**b) The ID of the object is available**
**Body text:** Delete \<object> \<object ID>?

**c) The object ID and description are both available** at the time of deletion
**Body text:** Delete \<object> \<object ID> “\<object description>”?
description_

**d) Deleting several objects**
If more than one object is being deleted, don’t display the
object ID and description.
**Body text:** _Delete the \<n = optional> selected \<objects>?_
**> **Hint:** **

In SAP Fiori elements, the default text will vary slightly, typically using the term “object” to refer to the item being deleted. When working with SAP Fiori elements,
replace “object” with the appropriate business object name. For more information, see [Replacing Placeholder Text](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/replacing-placeholder-text).

## Responsive Behavior

The sap.m.MessageBox control has the same responsive behavior as the sap.m.Dialog control. The message box should only be opened in modal mode. Its basic width is 25 rem. For more information, see [Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/).

---

## message-strip

The message strip is a control that is used as an information bar. It contains information about an object or a status and can be embedded within the detail area of an object or page, or in the header of an object page.

## Usage

### Use the message strip if:

- You want to provide information related to the object as a whole in the object header, such as the object status.
- You want to provide information within the detail area of an object.
- You want to inform your user about a status of an object.
- You want to warn your user about an issue.

### Do not use the message strip if:

- You want to display information within a control, in the list of a list-detail layout, or above the page header.

## Responsiveness

The message strip is fully responsive. Icons within the
message strip are displayed to the left (custom icons) or
right (_Close_ action) of the message. Text and links
behave differently and wrap.
If you place the control within the detail area, it will
always use 100% of the width and react to the
responsiveness of the container.

## Types

The following semantic types are available.
- Information
- Warning
- Error
- Success
## Behavior and Interaction

#### Static behavior
The message strip acts as an information bar. If you want
to display a status related to an object, keep the
interaction static and do not show the _Close_ button.
#### Interactive behavior
- The app team can add a link in case more content is
useful for the user to understand a situation.
- Clicking the :decline: _Close_ button on the right-hand
side hides the message strip. The app team can determine
whether the message strip comes back on page reload, the
next visit or never.
#### Accessibility

When an application adds a message strip dynamically, also notify screen reader users.

Use the following structure for the screen reader notification text:

To avoid an endless screen reader announcement, send a short message summary with only the most relevant information.

## Properties

sap.m.MessageStrip is limited to the following properties:

- _Property:showIcon_ – Allows you to display an icon before the text
- _Property:customIcon_ – Allows you to display an icon from the icon library
- _Property:type_ – Changes the semantic color and the icon in front of the message strip
- _Property:text_ – Adds text to the control
- _Property:link_ – Adds a link
- _Property:showCloseButton_ – Adds a _Close_ button

---

## message-strip-web-component

The message strip component allows you to embed
application-related messages on the UI. It draws the
user’s attention to information that is important in the
context of the page content. This could be a warning or a
change of state that might otherwise be easy to miss.
## When to Use

Do
Use the message strip:
- To provide information related to the object as a whole
in the object header, such as the object status.
- To provide information within the detail area of an
object.
- To inform the user about a status of an object.
- To warn the user about an issue.
## Anatomy

1. **Container**: Holds the icon, message text, and _Close_ button.
2. **Icon (optional)**: Visual indication of the message type. By
default, the message strip uses standard icons for error, warning,
success, and information messages.
We strongly recommend displaying an icon. If you decide to
remove it, include an additional text to indicate the message type.
3. **Text**: Message text. To preserve the intended design, we
strongly recommend using only text for the message itself.
4. **_Close_ button (optional)**: Allows the user to remove the message strip from the UI.
## Types

You can use the message strip with or without an icon or _Close_ button. If necessary, you can also configure a [custom message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/message-strip-web-component/#custom-message-strip).

### With Icon and Close Button

### Without Icon, With Close Button

### Custom MessageStrip

If the application needs a custom message strip, other than the standard semantic variations, use the colors defined for the \inverted object status tag\\. You can use both sets of indication colors.
See all the available icons in the [Icon Explorer (Horizon)](https://sapui5untested.int.sap.eu2.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html?sap-theme=sap_horizon#/overview/BusinessSuiteInAppSymbols/?tab=grid).
## Behavior and Interaction

Clicking or tapping the _Close_ button removes the message strip from the UI.
## Responsive Behavior

The message strip is fully responsive. Message type icons
always display on the left, while the _Close_ icon always
displays on the right. Text that exceeds the available
width wraps to the next line.
If you place the message within the detail area for an
object, it always uses 100% of the available width and
reacts to the responsiveness of the container.
### Content Density

The compact message strip is used for both cozy and compact form factors.

## Globalization and Localization

For right-to-left languages, such as Arabic or Hebrew, the message strip is mirrored.

---

## message-toast

A message toast (sap.m.MessageToast) is a small, non-disruptive popup for **success messages** that disappears automatically after a few seconds.

## Usage

### Use the message toast if:

- You want to display a short success message.
- You do not want to interrupt users while they are performing an action.
- You want to confirm a successful action.

### Do not use the message toast if:

- You want to display an error or warning message.
- You want to interrupt users while they are performing an action.
- You want to make sure that users read the message before they leave the page.
- You want users to be able to copy the message content to the clipboard (such as a product or transaction number). In this case, use a [success message dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation3) instead.

## Responsiveness

The message toast has the same behavior on all devices.

## Layout

### Position

The message toast is always centered horizontally at the bottom of the screen.

### Width

The standard width of the toast is 15 rem, and text that exceeds this width will wrap.

## Behavior and Interaction

### Choreography

When an action is successful, the message toast fades in and out automatically. The timing and duration of the message toast is defined by the application team.

Users can also keep the message toast on screen with the following keyboard shortcuts:

- Ctrl + Shift + M (Windows)
- Cmd + Shift + M (Mac OS)

### Navigation

In some scenarios, the action that triggers the message toast also triggers navigation to a different page (for example, after a save or submit action).

In this case, **always navigate first**, and then **show the message toast on the target page**.

Only show the message toast on the same page if no navigation is involved.

#### Exception: success message dialog

If you need to interrupt users before they leave the current page, do not use the message toast, but a message box (sap.m.MessageBox, property: type – success), which includes a success message. For more information, see [message box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/).

> **Information:** Only put a success message in a message box if your use case requires explicit user interaction, such as copying an
order number to process it. We strongly recommend using a message toast where possible.

### Animation

Set the duration of the animation according to the length of the message text: the longer the text, the longer the duration should be. The message does not react to the user’s focus.

## Guidelines

### Message Toast Texts

To make the toast message easy to scan, keep the text as short as possible. Remember that the user will not have time to take in very much detail.

Do not use the word “successfully” in the message text. This is implicit in a success message.

#### Patterns

For standard actions (such as create, save, delete, or send), we recommend using the following patterns, depending on your use case.

Table

Use Case         | Use Case Variant            | Pattern (EN)                | Example (EN)

Single item      | Object name is not needed.  | [object] [action taken]   | _Sales order created_
Hint: If the name or ID is
not crucial feedback in
your context, leave it out.
Object name is needed.      | [name] [action taken]     | _SAP added to customer group_
Hint: If you mention the
object name, you can often
leave out the object type
(usually obvious in the
context).
Multiple items   |                             | [item count] [objects]    | _2 sales orders were deleted._
[action taken]
Multiple actions | Single items, object names  | 1 [object] [1st action    | _1 product added, 1 product
are not needed              | taken], 1 [object] [2nd   | removed_
action taken]
Single items, object names  | [object] [name] [1st     | _Product A was added, product
are needed.                 | action taken], [object]    | B was removed._
[name] [2nd action taken]
Hint: Only include object
names if the user really
needs the specific
feedback.
Multiple items              | [item count] [objects]    | _2 products added, 3 products
[1st action taken], [item | removed_
count] [objects] [2nd
action taken]
<u>Notes</u>:

- The exact phrasing will depend on your target audience and the conventions in your app family. If an action is repeated regularly by a heavy users, be as brief as possible (for example, _Order deleted_). If your app is typically for occasional users, a full sentence might be more appropriate (for example, _Your request has been sent to the support team._).
- Bear in mind that long object names can increase the length of the message toast. Remember to allow for this when defining the toast duration. If long or multiple object names make the toast too cumbersome to read, leave them out. If you really need to list them in a success message, use the success message box instead.
- 
Do

Do

#### SAP Fiori Elements

If you are using SAP Fiori elements, remember to replace the “object” placeholder with your business object.
For more information, see [SAP Fiori Elements – Mandatory Adjustments](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates#mandatory-adjustments).
Do

## Properties

You can change the values of the following properties.
Only change the values if the standard values don’t work
for your use case.
**Position:** We recommend that you always use the
initial value (horizontally centered, at the bottom of
the page).
**Duration:** The standard value is 3,000 ms. You can set
a duration of more than 3,000 ms, but do not use less
than 3,000 ms.
**Offset:** Do not change this value.
**Auto-close:** True/false

---

## toast-web-component

A toast is a small, non-disruptive popup for a
non-semantic success message that disappears
automatically after a few seconds.
## When to Use

Do
Use the toast:
- If you want to display a short, non-semantic success
message to confirm that an action was performed.
- If you don’t want to interrupt users.
- If you want to confirm a successful action.
- If you need positive semantic styling for a success statement. In this case, use the [message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip-web-component/) or message [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog-web-component/) instead.

## Anatomy

1. **Text**
2. **Container**
## Behavior and Interaction

### Placement

You can define the position of the toast on the screen.
By default, it is centered horizontally at the bottom of
the display.
### Triggering a Toast

When an action is successful, a toast automatically fades
in and out. You can specify how long the toast remains
visible. Set a longer duration for longer message texts.
## Message Text

To make the toast message easy to scan, keep the text as short as possible. Remember that the user will not have time to take in very much detail.
Don’t use the word “successfully” in the message text. This is implicit in a success message.

Do

### Patterns

For standard actions (such as create, save, delete, or send), we recommend using the following patterns, depending on your use case.

Table

Use Case         | Use Case Variant            | Pattern (EN)                | Example (EN)

Single item      | Object name is not needed.\ | [object] [action taken]   | _Sales order created_
Hint: If the name or ID is
not crucial feedback in
your context, leave it out.
Object name is needed.\     | [name] [action taken]     | _SAP added to customer group_
Hint: If you mention the
object name, you can often
leave out the object type
(usually obvious in the
context).
Multiple items   |                             | [item count] [objects]    | _2 sales orders were deleted._
[action taken]
Multiple actions | Single items, object names  | 1 [object] [1st action    | _1 product added, 1 product
are not needed              | taken], 1 [object] [2nd   | removed_
action taken]
Single items, object names  | [object] [name] [1st     | _Product A was added, product
are needed.\                | action taken], [object]    | B was removed._
Hint: Only include object   | [name] [2nd action taken]
names if the user really
needs the specific feedback
Multiple items              | [item count] [objects]    | _2 products added, 3 products
[1st action taken], [item | removed_
count] [objects] [2nd
action taken]
Notes:

- The exact phrasing will depend on your target audience and the conventions in your app family. If an action is repeated regularly by a heavy users, be as brief as possible (for example, _Order deleted_). If your app is typically for occasional users, a full sentence might be more appropriate (for example, _Your request has been sent to the support team._).
- Bear in mind that long object names can increase the length of the message toast. Remember to allow for this when defining the toast duration. If long or multiple object names make the toast too cumbersome to read, leave them out. If you really need to list them in a success message, use the success message box instead.
- Use periods only for complete sentences. See [UI Text Guidelines for SAP Fiori – Punctuation – Period](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori).

Do

---