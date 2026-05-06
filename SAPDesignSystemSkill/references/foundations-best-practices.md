# SAP Fiori Foundations: Best Practices

## Global Patterns > Action Placement

# Action Placement

## Intro

Actions trigger functions, such as saving or deleting a business object. They can also trigger navigation to a different screen, where the action can be executed, detailed out, or further reviewed. Actions are displayed as [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/).

Place actions **close to the information** they act upon. For example, actions related to a business object go to the top of the page, next to the title that identifies the object. Actions related to the task workflow go to the bottom of the page and can be carried out after working through the page content.

To make actions easier to organize and find, they are often placed in **toolbars**. Depending on the content affected by the action, different [toolbars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#components) are available. Within toolbars, some actions are usually more important than others. By [ordering](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#action-order-in-header-toolbar) the actions and applying different [styles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#style), you can set the right focus.

You can also place actions inline as part of the content. For example, an action can be positioned next to a field within a form, or within a table row.

Actions must be clearly differentiated from pure navigation. Navigation functions are usually located on the left side, such as _Home_ or breadcrumbs, whereas actions in toolbars are right-aligned.

## Components

The following toolbars are available:

1. **[Shell-level toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/):** Contains actions that affect all applications or the entire user environment.
2. **Page-level toolbars:** Contain actions that affect the entire page or that are related to the entity represented by the page, such as a business object, report, or process. Page-level toolbars remain constant and do not depend on selections or interactions within the page. Toolbars at page level are optional. If no actions are available, they are not shown. If toolbars are available, they are always visible and maintain their position when the user scrolls. The following page-level toolbars are available:
   a) [Header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#header-toolbar)
   b) [Footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#footer-toolbar)
3. **[Content-level toolbars](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#content-level-toolbars)**: Contain local actions that affect the content in a section of the screen, specifically table and chart toolbars.

Actions can also be placed in table rows and next to fields in forms. See [Actions in Table Rows and Forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#actions-in-table-rows-and-forms).

### Header Toolbar

Default (col-1)

The header toolbar contains global actions that apply to the entity shown on the page. Examples of global actions are _Edit_ or _Delete_. The header toolbar can also include global actions that relate to the page as an interface element. These can include actions for switching a page view, maximizing or minimizing the page, bookmarking the page, or leaving a comment.
The actions in the header toolbar must always be visible, independent of the scrolling position on the screen (“sticky” behavior). If there is not enough space to show all actions, they are successively moved to an [overflow menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/#overflow-generic), depending on their priority.

Table (col-1)

#### Design Rationale

Placing the header toolbar in line with the title establishes a clear connection between the entity represented in
the page and the action relating to that entity. Positioning actions next to the title indicates that they are both
on the same hierarchy level. This also supports the overall SAP Fiori design paradigm of showing content on the left
side of the screen and actions on the right.

Default (col-2)

Section Metadata

style

#### Guidelines for the Header Toolbar

> **Guideline:** - Right-align actions.
- Group actions with a common purpose and arrange these [action groups](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#action-groups) in the following order, from left to right:
1\. Business actions (such as _Edit_, _Delete_)
2\. Manage content (such as _Filter_)
3\. Manage layout (such as full screen switch)
4\. Generic actions (such as _Share_)
Arrange actions within a group according to their importance, from left to right.
- Emphasize the most important action ([primary action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#primary)). Show only one primary action for the entire page (across both
header and footer toolbars). Place the primary action on the very left, even if the action belongs to a group further to the right. If both header and footer toolbars are available, the footer is usually more in focus than the header and shows the primary action.
- In general, always place workflow actions (such as _Save_ or _Post_) in the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#footer-toolbar). Do **not** place them in header toolbar. Only place workflow actions in the header in exceptional cases, and only if very few actions are needed. In this case, place them first.

#### Header Toolbar – Example

#### Header Toolbar – Examples of Action Placement

### Footer Toolbar

Default (col-1)

The footer toolbar contains actions related to the user’s task workflow. These actions represent steps in a process. This can be something the user wants to accomplish (such as _Save_ a form), or actions to finalize a business process (such as _Post_ a goods receipt or _Accept_/_Decline_ a leave request).
The footer toolbar can also include alternative paths (such as _Return_ goods) and actions that allow the user to back out of the workflow without saving (such as _Cancel_).
We call these actions “workflow actions” or “finalizing actions”.

Default (col-1)

#### Design Rationale
Placing the footer toolbar at the end of the page supports the logical interaction flow. The user first reviews the
contents or fills in the information required, and then finalizes processing for the screen. Locating the actions
within the footer toolbar to the right of the page ensures that all actions are clearly separated from the content
and can be found by scanning the right-hand side of the page.

Default (col-2)

Section Metadata

style

#### Guidelines for the Footer Toolbar

> **Guideline:** - Right-align actions.
- Place actions in the following order, from left to right:
1\. Forward path (such as _Post_). You can also use semantic actions to express positive and negative alternatives (such as _Accept_ and _Reject_).
2\. Alternative path (optional). These actions appear as secondary actions.
3\. Negative path. These are actions that navigate away from the current page without triggering any changes (such as _Cancel_ or _Close_).
- Emphasize the most important action ([primary action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#primary)).
In the footer toolbar, this is usually the forward path action. Show only one primary action for the entire page (across both header and footer toolbars). If both toolbars are available, the footer is usually more
in focus than the header and shows the primary action.

#### Footer Toolbar – Examples of Action Placement

### Content-Level Toolbars

Content toolbars contain actions related to a specific section of the screen. They are used in tables and charts.

#### Table Toolbar

Use the table toolbar for local actions, such as:
- Adding a new item to a table
- Editing or deleting selected items in a table
- Switching the table to edit mode
- Controlling the table settings, such as filtering or sorting
For more information, see [Table Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).
#### Chart Toolbar
Use the chart toolbar for local actions such as:
- Switching the chart perspective
- Switching between chart and table views, or between different chart types
- Standard actions such as legend toggle, the personalization menu, and full screen mode
- App-specific business actions
For more information and examples, see [Chart Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-toolbar/#components).
### Actions in Forms and Table Rows

Actions can also be placed inline as part of the content, either next to a field within a form or within a table row.

#### Actions in Forms

If an action affects a single field within a form, place
the action next to the field.
#### Actions in Table Rows

If an action affects only a single line or single field of a table, place the
action in the table row.

Some row actions can be set using **table properties.** These actions include:
- Navigating to a detailed view of an item
- Deleting an item
- Editing an item
All the above actions are shown as icons, and are positioned on the right-hand
side of the table.
If you want to add your own **freely defined actions**, apply the following guidelines:
- Only place an action in the table row if there is a substantial use case.
- Offer only one action per row (the most important).
- Place the action close to the data it affects.
For more information about actions in table rows, see:
- [Responsive Table – Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#actions)
- [Grid Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/#single-item)
- [Tree Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/#line-item)
- [Analytical Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/#single-item)
## Action Types

Actions can be classified by their importance in a given business context. To reflect the importance, the visual styles differ.

### Page-Level Toolbars

The following action types are defined for header and footer toolbars:

Table (columns-1-3-1-1)

**Type**      | **What you need to know**               | **Examples**                | **Style**

Primary       | - Most important action                 | _Edit_
- Needs to stand out on the page        | _Save_
- Needed to move the workflow forward   | _Submit_
Semantic      | - Alternative to a primary action       | _Approve_ and _Reject_
- Usually come in pairs with a
positive and a negative value         | _Accept_ and _Decline_
- Exception: If a single primary
action has a strong semantic meaning
(such as _Delete_), this might be
emphasized using the semantic action.
Secondary     | - All actions that are not primary or   | _Copy_
negative path actions
- Do not stand out on the page
- Might be collapsed in menus
Negative Path | - Navigates away from the current page  | _Cancel_
without executing an action
- Usually one negative path action only | _Close_ (for modal dialogs)
Note that the example actions above don’t automatically belong to a specific type. The use case and context of the page determines whether an action is most important or less important to the user.

See also: [Button – Header and Footer Toolbars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#header-and-footer-toolbars)

### Content-Level Toolbars

The following action types are defined for content toolbars:

Table (columns-1-3-1-1)

**Type**      | **What you need to know**      | **Examples** | **Style**

Primary       | - Most important action        | _Edit_
- **Caution**: Usually, the
primary action is positioned
in the header or footer
toolbar.
- If a page already has a
primary action in the header
or footer toolbar, but you\
also need to highlight the
most important action in a
content toolbar, use the
ghost styling for this
action.
Secondary     | - All other actions            | _Copy_
- Might be collapsed in menus
Negative Path | - Used in edit mode            | _Cancel_
- Usually one negative path
action only
See also: [Button – Content Toolbars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#content-toolbars)

## Action Groups

In the header and footer toolbar, actions are grouped as follows, based on their purpose in the business context:

Table

Action Group                         | What you need to know                   | Examples

Workflow                             | - Are related to the user’s task        | Positive path:
workflow (such as editing a form or a | _Save, Submit, Accept_ and _Reject_ Alternative path:
(also known as “finalizing actions”) |   wizard)                               | _Forward, Return_ Negative (escape) path:
- Represent steps in a process          | _Cancel, Close_
- May include positive, negative or
alternative paths that allow users to
back out without changes or move
forward with their changes saved
- The positive action is usually the
primary action
- Typically trigger a page transition
(for example, switching the mode from
edit to display, or navigating away
from the page)
Business                             | - Trigger a task related to the object  | Specific:
being viewed
- May be specific to the app, or more   | _Add, Copy_
general tasks
General: _Edit, Delete_

Manage Content                       | - Affect what information is displayed  | _Filter_
in the content
- Do not affect the overall UI layout
Manage Layout                        | - Change how the overall page is        | View panel in full page
displayed
Close panel (not used on standalone pages)

Generic                              | - Are part of a general framework       | _Share_
rather than a specific workflow
## Examples

## Top Tips

### General

- Place actions as close as possible to the content they affect – usually in a toolbar or, if needed, directly in a form or table row.
- In toolbars, always **right-align**.

### Action Order in Header Toolbar

Use the following order:

1. Business actions (such as _Edit_, _Delete_)
2. Manage content (such as _Filter_)
3. Manage layout (such as viewing a panel in full screen mode)
4. Generic (such as _Share_)

Recommended: Always place the action that is **most important** for your business context **on the very left**, even if the action belongs to a group further to the right.

### Action Order in Footer Toolbar

Use the following order:

1. Primary workflow/finalizing action leftmost (such as _Post_)
2. Secondary actions (such as _Return_)
3. Negative path actions (such as _Cancel_)

### Primary Action (Emphasized)

- Use only **one** primary action per page.
- Show a primary action **or** a semantic action, but never both.

### Style

- To help the user quickly identify primary, secondary, and negative path actions, apply the correct visual styles.
  For more information, see [Action Types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/action-placement#action-types).

---

## Global Patterns > Designing For Empty States

# Empty States

## Intro

Empty states are moments in the user experience when
there is no content to display. They can appear anywhere
within an application and occur most commonly when a
user:
- Interacts with an application or feature for the first
time
- Performs a search or filters data
- Encounters an error due to permissions, systems, or
configuration issues
Empty states should never feel empty or negative,
especially when things aren’t working as expected. It is
important to tell the user what the empty state is for,
why the user is seeing it, and what the user can do next.
When designed appropriately through relatable,
encouraging content, empty states can enhance the user
experience, add value, and be a quick UX win.
This article provides an overview of empty states and
their design recommendations.
## Handling Empty States

Empty states occur for a variety of reasons and can require different treatments. The design should focus on the information you want to convey to the user. It’s a simple way to keep users informed and supported within an application. If possible, communicate what’s happening, while providing constructive guidance for the next steps.

An empty state can occur anywhere in the UI. The design layout for the empty state depends on the context of the situation and what is most suitable for the page layout.

Empty states can be handled by the [illustrated message](https://www.sap.com/design-system/fiori-design-web/ui-elements/illustrated-message/) control.

## Types

The list below suggests different approaches for common types of empty states to address the needs of the user in different situations.

Table

Type        | When to use                 | Example                     | Recommendation

No data     | There is no data for the    | The “no data” state can be  | Let users know what will be
user to see or the system   | initiated by a user,        | available when data has
has nothing to display.     | system, or another user:    | been added.
First-time use of an app or | – Before beginning a search | If possible, provide
feature.                    |                             | information on how users
– No activities             | can add data themselves or
| what to do next.
– No mail
| If the user is using a
– Application account setup | feature or app for the
| first time, guide them
| through the initial
| actions.

User action | Provide feedback to the     | A user action empty state   | Help users understand the
user based on some user     | is created by the user:     | situation and let them know
action or interaction.      |                             | if a next step is needed.
– No search results
User has completed an       |                             | For success states:
action.                     | – No filter results         | Indicate that the user has
| successfully completed a
– Completion of a process   | process or task.
or task
Errors      | The system or application   | An error state is caused by | Help users understand the
is unable to display        | missing permissions,        | problem and, if possible,
information due to an       | incorrect configuration, or | what corrective actions to
error.                      | a system issue:             | take.
– Unable to load            | Provide a sufficient level
| of detail to help users
– Unable to upload          | resolve the issue.
– Account isn’t available
## Best Practices

### Message Writing

Provide a primary message (headline) and a description.

- Primary message: Explain the reason for the empty state, preferably in a single line. Keep the text short to make it quick to read and understand.
- Description: Provide context and tell the user what to do next, in three lines or less.

Note: Consider how translations to other languages may increase the amount of text.

More Information:

- [Illustrated Message](https://www.sap.com/design-system/fiori-design-web/ui-elements/illustrated-message/)
- [Message Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging)
- [UI Text Guidelines for SAP Fiori Apps](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori)

### Call to Action

Give the user direct access to a relevant action, where appropriate. It can turn an empty state into a situation that is helpful to the user.

- If there is a clear next step, include an action, ideally in the form of a secondary button or text link. Be sure that the user has permission for the next step.
- Do not use the primary action button for empty states.

More information:

- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)
- [UX Illustrations](https://www.sap.com/design-system/fiori-design-web/foundations/visual/ux-illustrations)
- [Illustrated message](https://www.sap.com/design-system/fiori-design-web/ui-elements/illustrated-message/)

### Illustration Choice                                                                                      | Do                                               | Don't
When appropriate, support the message with an illustration. It’s a great way to convey the meaning of the
message more immediately and show personality through the distinctive visual language used for SAP Fiori UX
illustrations.                                                                                               | _When space is limited, use text only._          | _Don't use UX illustrations for small UI elements, such as tiles or message toasts._
Before adding an illustration, ask yourself these questions:
- Does the illustration enhance the communication of the message you want to deliver to the user?
- Is the illustration relevant and appropriate in other cultures or geographic locations?
- Do the illustration, message, and call to action work as one clarify the situation?
Only add an illustration if the empty state has enough space for it. Otherwise, use text messages only.
Do not use a UX illustration for UI elements that are smaller than a medium size card, such as tiles,
message toasts, message strips, or other smaller UI elements. Use a headline and supporting message only.
More information:
- [Illustrated Message](https://www.sap.com/design-system/fiori-design-web/ui-elements/illustrated-message/)
- [UX Illustrations](https://www.sap.com/design-system/fiori-design-web/foundations/visual/ux-illustrations)
### Multiple Empty States

When designing for a screen, consider how multiple empty states may impact the user experience. Attempt to mitigate scenarios where multiple empty state illustrations occur simultaneously on a screen. Think about which messages to prioritize first.

## Top Tips

- An empty state should never feel empty or negative, especially when things aren’t working as expected.
- Keep the user informed, supported, and on a productive path through relatable messaging that communicates what the user would see if they had data.
- If possible, provide the user with guidance for a next step – either in the message or through a button or text link. In a situation without solutions, explain what is going on so the user can attempt to troubleshoot.
- Empty states must have a message (headline with supporting description). An illustration and call-to-action are optional.
- Carefully consider the context and layout when using illustrations and calls to action.
- Check out the [Illustrated Message](https://www.sap.com/design-system/fiori-design-web/ui-elements/illustrated-message/) guidelines.

## Reference Examples

Here are some examples of how empty states occur in different containers.

Carousel (full-width)

---

## Global Patterns > Messaging > Messaging

# Message Handling – Overview

## Intro

Carefully orchestrated messages are key to the user experience: they guide and validate user actions, and serve to both pre-empt and help resolve problems. But messages also distract users and interrupt their flow, so it’s important to always use messages consistently and optimize the interaction as a whole.

SAP Fiori comes with a range of different message types and controls. This article provides an overview of the message formats available and how to use them in common messaging scenarios.

## Basic Principles

- Indicate errors and warnings clearly on the UI.
- Think carefully about how prominent your message needs to be and when you need to interrupt the user. Don’t interrupt users unnecessarily.
- Help the user to recognize, diagnose, and resolve the issue.

## Message Types

The following message types are available:

Table

Icon          | Message Type | When to Use                 | Example

:error:       | Error        | An issue has occurred that  | A value has been entered in
prevents further            | the wrong format.
processing. The user must
resolve the issue to
continue.
:alert:       | Warning      | A problem or inconsistency  | An action can’t be applied
has arisen. Users can carry | to some of the selected
on working, but might run   | items, but can still be
into an error later on.     | performed for the rest.

:sys-enter-2: | Success      | An action has been          | A business partner has been
performed without errors or | created.
warnings.
:information: | Information  | You want to provide         | Highlight and explain a
additional, non-critical    | system recommendation.
information. Processing is
not blocked.
:sys-help-2:  | Confirmation | You want to prompt the user | Confirm approval of a
to confirm an action before | vacation request.
it is executed.
## Message Controls

SAP Fiori uses the following message controls and visualizations:

- [Message box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/messaging#message-box)
- [Message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/messaging#message-popover)
- [Message view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/messaging#message-view)
- [Message toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/messaging#message-toast)
- [Message strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/messaging#message-strip)
- [Illustrated message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/messaging#illustrated-message)
- [Value states for input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/messaging#value-states-for-input-fields)
- [Quick confirmation popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/messaging#quick-confirmation-popover)

### Message Box

The message box (`sap.m.MessageBox`) displays a message dialog that interrupts the user in the course of an action. It forces the user to acknowledge the information or make a decision.
#### Usage
Use the message box to display messages that are not related to a field on the UI, or when you require a user decision.
More information:
[Message Box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/)
[Text Guidelines – Word Choice for Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#word-choice)
### Message Popover

The message popover (`sap.m.messagePopover`) can display multiple messages of different types (error, warning, information, or success).
Messages are added to the popover automatically, without interrupting the user.
#### Usage
The message popover is used to collect messages relating to **form fields** and **table fields**.
More information:
[Message Popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/)
[Form Field Validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/)
### Message View

The message view can contain multiple messages of different types (error, warning, information, or success). It is typically embedded in a
dialog and interrupts the user action.

#### Usage
Use a message view to collect messages that are triggered by a user action, but are **not related to form or table fields**.
More information: [Message View](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-view/)
### Message Toast

A message toast (`sap.m.MessageToast`) is a small, non-disruptive popup that disappears automatically after a few seconds.
#### Usage
The message toast is the standard message component for **success messages**.
More information: [Message Toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/)
### Message Strip

The message strip is an information bar that can be placed within the content area of a page. It can contain error, warning, success, or
information messages. The message strip can be static or interactive.

#### Usage
You can use the message strip to display general information or inform about the status of an object.
More information: [Message Strip](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-strip/)
### Illustrated Message

An illustrated message combines a message, a supportive illustration, and an (optional) call to action.
#### Usage
You can use illustrated messages to improve the user experience for [empty states](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/designing-for-empty-states) within UI elements. Illustrated messages adjust to the size of the container (such as a card, dialog, or full page).
More information: [Illustrated Message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/illustrated-message/)
### Value States for Input Fields

Value states give feedback on user entries at field level. After input validation, affected fields are highlighted using semantic colors for the message type (error, warning, success,
information). Clicking a field displays a corresponding in-place message.

#### Usage
Value state messages are used for input fields, typically in [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/).
More information:
[UI Element States – Value States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#value-states)
[Form Field Validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/)
### Quick Confirmation Popover

The quick confirmation popover displays a confirmation prompt
adjacent to the triggering action.

#### Usage
Use the quick confirmation popover when the user leaves the
create or edit screen for an object by pressing _Cancel_.
## Common Message Patterns

Standard message patterns have been defined for certain scenarios. Here’s an overview of the main patterns and where to find more information.

Table

Message Pattern                  | Summary                                                                  | More Information

#### Validation
For specific fields              | SAPUI5 provides a set of controls to guide                               | [Form Field Validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/)
users when completing forms, including
in-place value state messages for fields and
a full list of all messages in a popover.
For actions (not field-related)  | In edit mode, messages that do not relate to                             | [Message Popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/#sectionsubsection-4)
a particular field on a page, but result
from an action, appear in the message
popover.
For multiple selection scenarios | If multiple items are selected, the user is                              | [Processing Multiple Items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items)
made aware of all issues and warnings in one                             | [Draft Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#message-patterns-actions-for-multiple-items)
place. The exact format depends on the
available messaging controls and
infrastructure.
#### Data loss warning
Triggered by _Cancel_            | If there is a risk of losing unsaved data, a                             | [Message Box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation2)
warning message is provided as soon as the _Cancel_ action is triggered.
For JavaScript UI5 implementations, see
Information note below.
Triggered by navigation          | If there is a risk of losing unsaved data, a warning message is provided | [Message box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation2)
as soon as the user navigates away from the page using in-app controls.
For JavaScript UI5 implementations, see Information note below.
#### Intelligent systems
Situation handling               | Situation handling is a concept for bringing business issues to the      | [Situation Handling](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling)
attention of specific user groups. It helps the user to recognize,
understand, and resolve the situation by gathering all relevant
information and proposing solutions.
Recommendations                  | Intelligent systems can help users by recommending appropriate content   | [Recommendations](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/recommendations)
or suggesting an action or input the user may “prefer”. In this case, we
speak of a recommendation pattern and its impact on the UI.
**> **Information:** **

Note that, for technical reasons, an SAP Fiori message box **cannot be displayed** **with a JavaScript UI5 implementation**. Instead, only a native browser popup can be displayed.
Typically, this applies to:
- Navigation away from a page with unsaved data using browser controls, for example, when the user clicks the browser back button to leave an object page in an application without
draft handling
- Closing a browser page or tab with unsaved data
- Refreshing a browser page with the browser controls
However, the message box **can be displayed** for the following the actions, as described in the SAP Fiori guidelines:
- Navigation between applications
- Navigation away from pages in full or partial edit mode

## Message Copy

When formulating message texts, keep the following principles in mind:

More Information:

- [UI Text Guidelines for SAP Fiori Apps – Messages](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#messages)

## Top Tips

- Ask yourself if you really need a message. Can the message be avoided by improving the design?
- Define and test messaging scenarios in the design phase.
- Always get your message texts (including the titles and buttons) reviewed by a user assistance developer.

---

## Global Patterns > Messaging > Processing Multiple Items

# Message Handling – Processing Multiple Items

## Intro

When a user selects multiple items from a table, it might not be possible to process all of the items at once.

Users therefore need clear and user-friendly information on:

- The actions available for the selected items
- Any issues that prevent items from being processed
- Whether or not an action was successful for all items

##### Scenarios for Processing Results

This guideline outlines the message patterns and recommended message texts for the following scenarios:

- [Success](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/processing-multiple-items#success): All items were processed successfully
- [Failure](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/processing-multiple-items#failure-cases): No items can be processed / were processed
- [Partial Processing](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/#partial-processing): Only some items can be processed. Others can’t be processed or require manual validation.

#### Enabling/Disabling Actions

> **Guideline:** Enable an action that:
- Always works, regardless of whether or not items are selected
- Can be applied to at least one of the selected items
Disable an action that:
- Can’t be applied to any of the selected items
- Doesn’t correspond to the number of selected items. For example, disable _Compare_ if only one item is selected
For more details, see [UI Element States](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states).
After the action is applied, keep the items selected.

## Success

## Default (col-1)

When all items were processed successfully, show a [message toast](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-toast/).

Table (col-1)

Message Toast

**Text**

Default (col-2)

Section Metadata

style

## Failure Cases

### No items can be processed

When no items can be processed, disable the action button.
For example, if all the selected items are locked, disable the _Edit_ button.
To help users understand why the action button is disabled, use the [item states](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-116/foundations/best-practices/ui-elements/ui-element-states#item-states).
### No items were processed

Default (col-1)

When no items were processed, show a [message view](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-view/) in a dialog.

Table (col-1)

**Message View**

**Header**

**First List Item**

**Next List Items**

**Button**

Default (col-2)

Section Metadata

style

## Partial Processing

### Backend issues

Default (col-1)

When one or more of the selected items were processed successfully and one or more were not, due to backend issues,
show a message view in a dialog.

Table (col-1)

**Message View**

**Header**

**First List Item**
number of items> \<item name> were \<action>._

**Next List Items**
- Specific warning messages for processed items

**Button**

Default (col-2)

Section Metadata

style

### One or more items can’t be processed

1. Before processing, a warning message asks users whether they want to apply the action to **remaining** items.
2. After user confirmation the resulting message depends on the processing results:
   - A [message toast](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#success) for successful processing
   - A message view for when backend errors occurred during the processing

#### Before Processing

If the action cannot be applied to one or more items, a warning message asks the users whether they want to apply the action to the other items.

Table

**Warning Message Box**

**Message Text**
number of items> \<item name> can’t be \<action>._

**Message Details**
Selected \<item names> are excluded if:
- _Somebody is working on the \<item name> (a draft
exists, or changes haven’t been saved)._
- _\<action> is not allowed on the \<item name>._

**Buttons**

#### After User Confirmation
After the users confirm the primary action for the remaining items the resulting message depends on the
processing results:
- When all the **remaining** items were successfully processed, a [message toast](#_Success) is displayed.
- When one or more backend errors occurred during the processing, a _Summary_ message view in a dialog is displayed. It includes:
1. Successfully processed items
2. The backend error or errors
3. An information message for each item excluded from the processing
Information message text: _The \<item name> can’t be \<action>_
### Processing is blocked by items that require manual validation

Some warnings for individual items may require a user decision before processing can continue:

- Case 1: Just one warning. The user can ignore the warning and process the item, or skip the item.
- Case 2: More than one warning. The user can ignore the warnings and process all the items, or skip all the affected items. Processing is only interrupted once.

#### Case 1: One Item

Default (col-1)

When one item requires manual validation, show a warning message box with actions to:
- Validate and process the item
- Skip the item: When the users skip the item, in the message view in a dialog, show an information message for the
skipped item in the message view.

Table (col-1)

Warning Message Box

**Body Text**

**Show Details**

**Buttons**

Default (col-1)

For the skipped item, in the [_Summary_ message view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/messaging/processing-multiple-items#backend-issues), add an information message text below the other (success, error, and warning) items.

Table (col-1)

Message View

**Information Message Text**

Default (col-2)

Section Metadata

style

#### Case 2: More than One

Default (col-1)

When more than one item requires manual validation, show a warning message box with actions to:
- Validate and process the items
- Skip the items: When the users skip the items, in the message view in a dialog, show an information message for
each skipped item.

Table (col-1)

Warning Message View

**Header**

**Body Text**
plural>._

**Buttons**

Default (col-1)

For each skipped item, in the [_Summary_ message view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/#backend-issues), add an information message text below the other (success, error, and warning) items.

Table (col-1)

Message View

**Information Message Text**

Default (col-2)

Section Metadata

style

### Action on multiple items with field issues in edit mode

Triggering a mass action can reveal field issues because the mass action also triggers field validation.

List the field related messages among other messages in the summary message view dialog.

Once the dialog is closed, the message popover appears, with a list of only the field issues.

---

## Global Patterns > Mobile Integration Concept

# Mobile Integration

## Intro

SAP Fiori applications can also use native mobile qualities, such as camera or GPS.

### Guidelines

Here, we use the term “native mobile qualities” to refer to native device features that cannot be accessed using standard HTML or JavaScript code.

Examples of such features include:

- Phone camera
- Voice recording
- Phone contacts
- Phone calendar
- Accelerometer
- Compass
- Vibration

In SAP Fiori, the general approach for embedding these features is to **use native user interfaces triggered by an SAPUI5 control**, wherever possible.

Advantages of using the native interfaces:

- Any new features from native controls will be available immediately upon release.
- Version maintenance for SAPUI5 controls is avoided.
- Users are familiar with their respective platform interfaces.
- Browsers will improve their access to mobile functionalities, making mobile features easier to access directly.

Although the use of native UI interfaces for mobile qualities should be the general direction for SAP Fiori apps, there will be cases where a specific custom user interface might be needed.

These exceptions should be discussed on a case-by-case basis to ensure as much consistency as possible across SAP Fiori interfaces.

---

## Global Patterns > Navigation > Navigation

# Navigation

## Intro

Navigation in SAP Fiori follows standard navigation paradigms of various web applications. When a user navigates to a new screen, the user’s system default navigation is in place. Depending on individual browser settings and functionality, new screens can also be opened in a new tab or window by using a long tap or right-click (using a mouse).

SAP Fiori combines the hub-and-spoke navigation model with an application network model. A central home page (the [SAP Fiori launchpad home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) or [SAP Fiori launchpad spaces](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/)) is the center of all navigation paths. The user starts from the home page and navigates forward into the apps through multiple screens. Multiple apps can form a process. The ubiquitous back navigation function allows the user to go back to the previous screen. The user can always navigate back to the launchpad home page via logo. The logo navigates back to the first page of the launchpad. This is often [My Home](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling), if available.

## Navigation Between Apps

The [tiles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/) on the home page of the SAP Fiori launchpad represent navigation anchors to the individual apps. By selecting a tile, the user navigates to the corresponding app. It is also possible to integrate legacy UI technology through these tiles. Non-SAP Fiori UI technologies open in a new tab or window (for supported desktop operating systems only).

Individual apps can be connected to build up navigation flows. There are different ways to build a connection:

- Navigation via links (to open other objects or lists)
- Navigation via line items in a list or table (to display more details about the item in the list/table)
- Navigation via other UI elements
- Actions on buttons (to trigger transactional tasks)

By transferring context between apps, one modular app can build on the input of the previous app(s). This way, individual apps can be reused in different contexts. More complex functionality can be combined using individual modules or apps. After each navigation step, the user can always navigate back using the browser’s back button or the back arrow icon in the [shell bar](https://www.sap.com/design-system/fiori-design-web/v1-124/ui-elements/shell-bar/?external).

## Back and Home

The [launchpad shell bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/shell-bar/?external) is always located at the top of each app. It displays the _logo_, which triggers navigation to the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page), and back button, which triggers navigation to the previously visited page. An exception is made when a deep link to an application is called and there are no SAP Fiori entries in the browser history. No back button should be displayed.

## Navigation Within Apps

### Forward Navigation
Forward navigation to other pages of the app or other
apps is triggered by links, line items, buttons, or other
UI elements. No distinction is made between navigation
targets located within the same app or those located in
other apps.
Clicking a link can either trigger direct navigation, or
open a quick view or smart link popover. With the quick
view or smart link popover, further navigation targets
can be reached. This behavior should be consistent within
an app. For example, links in a table should consistently
either open a quick view or navigate to another page.
If in-place is not possible because data will be lost or
user intended to open a new tab/window, an app (non-SAP
Fiori apps only) can open in a new tab/window.
**Example: Navigation from legacy to SAP Fiori**
Legacy apps are always opened in a new tab/window from
the SAP Fiori launchpad. The same applies to any URL that
opens a non-SAP Fiori app.
### Back Navigation

The user can always navigate back to the previous page with the back button in the upper left corner of the [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/). In addition, the browser’s back arrow icon ( :slim-arrow-left: ) offers the same function. The browser history can be used to go back to previous steps. All pages can be bookmarked and the URL can be forwarded to give other users access to the same page.

#### Exceptions

Switching between display and edit mode is not a navigation step and therefore does not result in a new URL. An exception is made for the draft. Here, a unique number is added to the URL to distinguish drafts from active documents.

More information:

- Behavior in edit scenarios: \ [Simple Objects (Create, Edit)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/)
- Deep linking and bookmarking: [Draft Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling?external)

##### Flexible Column Layout

In apps with a [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/?external), the back navigation behaves slightly differently. When the app is initially started, _Back_ takes the user back to the previous page. Any drill-in or forward navigation usually opens a new column in the flexible column layout. _Back_ closes either the rightmost column (leftmost column in right-to-left languages) or the full screen mode, depending on the user’s last action.

For more information, check out the navigation section of the [flexible column layout](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/#navigation) article.

## Edit and Display

Switching from display mode to edit mode is not a navigation step and the URL itself should therefore not change, except for the GUID which is added to the URL. Hence, no new entry is made in the browser history.

#### Bookmarking draft version

After switching to **edit** mode, a GUID is added to the URL to identify the current draft version. The user may bookmark the current changes as a draft version. If the user switches back to **display** mode via _Save,_ the object will be shown with the saved changes. If the user switches back to display mode via _Cancel_, the object will be shown without the changes.

#### Navigating to draft version

When the user navigates to a bookmarked draft version, a dialog pops up prompting the user to decide whether the application should continue in **edit** mode with changes of the draft version, or whether the active version should be shown in **display** mode.

- If no draft version exists, the active version is shown in **display** mode.
- If the user rejects the edit mode, the draft version is deleted and the active version is shown in **display** mode.
- If the bookmarked draft version does not contain any changes, no dialog (popup) is shown. The active version is shown in **edit** mode.

#### Exceptions

- If another user is locking the object, the active version is shown with the status _Locked by…_ in **display** mode.
- If another user’s lock on an object has expired, the active version is shown with status _Unsaved Changes_ in **display** mode.

The behavior in edit scenarios is described in the article on [managing objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects). More information about deep linking and bookmarking can be found in the [draft handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling?external) article.

## Entries in Browser History

The state of an app is reflected in its URL. This allows the user to bookmark or send a link to the app in this specific state. But when does a new URL need to be created?

In general, there are three cases:

1. Always **create a** **new entry in the browser history** when the user opens a new app. When the user navigates to a different page within the same app, create a new entry to allow back navigation to the previous page. In these cases, users can return to the previous page using the back button or the browser’s back arrow icon.
2. **Replace the URL in the browser history** if only parts of the page are changed. This is important to avoid unnecessarily long back chains when navigating back in the browser history. An example of this is when the user selects an item in the list column of a flexible column layout on a tablet or desktop device. On smartphones, the flexible column layout is divided into separate pages, and rule 1. above applies: a new entry needs to be added to the history. You will also need to replace the URL when the user navigates through a list of items using the up/down arrows, or applies a filter to a [list](https://design-system/fiori-design-web/v1-124/ui-elements/list-overview/?external).
3. **Keep the same URL** if you don’t need to mark a new state for the app. This could be the case after choosing a selection. The URL also stays the same when switching between display and edit modes (see exception below).

#### Exception

There is an exception when working on a **draft version** (see [Edit and Display](#edit-and-display)). In this case, the URL stays unchanged and a GUID is added to identify the draft version.

**Tip:** Learn more about bookmarking and deep linking in the [draft handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling?external) article.

## Deep Links

A page of an application that is not its entry page can be bookmarked or shared as a deep link. Ideally, the full UI state of the page is retrieved. Technically, this includes every part that is represented in the URL.

For example, a list-detail app in a flexible column layout gets a new URL when another entry is selected in the list and shown in the details area. This state with the new item can be used as a deep link.

If a deep link to an application is called and there are no SAP Fiori entries in the browser history, do not display a back button.

Apps with draft handling functionality allow deep linking to a page in edit mode. Apps without draft handling allow deep linking only to the display mode of an object. In the latter case, the deep link always navigates to the display mode. For more information about deep linking and bookmarking for drafts, see [Draft Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling?external).

### Calling a Deep Link

Navigation to a deep link ideally restores every detail of the page. Technically, this includes all parts reflected in the URL. The use case and feasibility determine which changes are reflected in the URL, but the rules mentioned in this section must be fulfilled. If a deep link leads the user to an object that no longer exists or can’t be accessed, an empty page is shown. If a user calls a deep link that has been forwarded by another user, the results displayed may vary due depending on authorization levels.

### Deep Linking to Flexible Column Layouts

A deep link to a flexible column layout shows the state of the layout when it was bookmarked or saved.

#### Guidelines and Behavior:

- Load the exact layout that was stored in the deep link. For example, if the user bookmarks a 3-column layout set to 25% + 50% + 25%, load this layout when the user opens the deep link.
- If a deep link leads to an object page, scroll the list to the selected entry. If possible, show the entry as selected.
- If the object is not yet loaded in the list (growing list), show the beginning of the list next to the details area. In this case, there is no selection in the list.
- If a deep link leads to an object that no longer exists or can’t be accessed, show an empty page inside the layout panel in which the object resided.
- If the deep link points to a line item in the details area, all the rules for the flexible column layout apply. The _Back_ button above the line item details navigates to the previous page.
- Since multiselection mode in the flexible column layout is not normally reflected in the URL, a deep link leads to the previously selected object. The same state is shown when closing the multiselection.
- Depending on the use case, you can more information to the URL, such as a search term. In this way, you can ensure that the corresponding information is also restored when a deep link is called.

For more information about deep linking and bookmarking for drafts, see the [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) article. For the flexible column layout, see the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/#bookmarks) article.

## Quick View

Users can navigate from a [quick view](https://www.sap.com/design-system/fiori-design-web/ui-elements/quickview/?external) to those of the different users/objects. In this case, a back button is placed on the top left of the quick view box to allow the user to navigate back to the first or previous quick view. All other links lead to new pages and close the quick view.

## Smart Link

The [smart link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/?external) opens a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) containing detailed information about the corresponding object, as well as links to related apps. Opening related apps follow the guidelines described in the section [Navigation within Apps](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/navigation/navigation#navigation-within-apps).

## Native Operating System

How can SAP Fiori apps be embedded into the native operating system?

Any SAP Fiori app should run in a standard HTML5 browser. Like with any other webpage, users can create shortcuts to either the [launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) or the individual app to support a more integrated experience. The user can save a reference to an app on the desktop or home page of the native OS. When this reference is followed, the app can be launched directly, bypassing the SAP Fiori launchpad home page. On smartphones, this hides the browser controls and displays the app in full-screen mode.

The same applies to the SAP Fiori launchpad itself. The reference to the launchpad can also be stored on the desktop or home page of the native OS.

---

## Global Patterns > Object Handling > Copy

# Object Handling – Copy

## Intro

The copy pattern allows you to copy an object and then edit the newly created object.

## Usage

Use the copy pattern if you want to copy an object and then edit the newly created object. If you want to reference to an existing object, use the [create with reference](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/create-with-reference) pattern instead.

## Layout

There are 4 use cases for copying an object:

1. The object to be copied is part of the current table.
2. The object to be copied is not part of the current table (for example, because it has been approved).
3. The object to be copied is a template.
4. The whole object is to be copied, for example, from an object page within a list-detail-detail view (flexible column layout).

For **use cases 1–3**, place the _Copy_ function (a transparent button) in the relevant toolbar (for example, above the form or table control).

For **use case 4**, place the _Copy_ function in the header toolbar of the object page (global actions). For more information about the interaction, read about the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).

## Behavior and Interaction

This section describes the interaction flow of the copy pattern for different use cases.

#### 1) The copied object is part of the current table.

The user selects an item to be copied. Multiselection is not possible.
Clicking the _Copy_ button takes the user to the details page.

The form is prefilled with the data from the selected item on the previous page. The form remains in
edit mode until the user clicks the _Create_ button. If the user selects _Cancel_, a data loss message appears.

#### 2 + 3) The copied object is not part of the current table or is to be copied from a template.

When the user clicks the _Copy_ button, an action sheet appears. The user can choose one of three actions: _Copy_, _Copy from Object_, or _Copy from Template_. You can also choose to show only one or two of these actions to the user.

When the user selects _Copy from Object_ or _Copy from Template,_
a dialog appears prompting the user to choose an object or a
template. When the user chooses one of these and clicks the _Create_ button, the details page appears.

The details page contains a prefilled form and remains in edit mode until the user clicks the _Create_ button. If the user clicks _Cancel_, a data loss message appears.

#### 4) The copied object is located in the details view (flexible column layout)

The user selects the item to be copied from the list
view, for instance list report or worklist. The _Copy_
button appears in the header toolbar of the object page
within the first detail view. Clicking the _Copy_ button
takes the user to edit mode of the new item within the
second detail view of the flexible column layout, also
known as list-detail-detail mode.
In edit mode, the form is prefilled with the data from the item selected on the previous page. The form remains
in edit mode until the user clicks the _Create_ button. If the user clicks _Cancel_, a data loss message appears.

## Responsiveness

The responsiveness of this page
depends on the responsive behavior of
the controls being used.              | _Copy pattern adapted to smartphone_          | _Copy pattern adapted to tablet_

---

## Global Patterns > Object Handling > Create With Reference

# Object Handling – Create with Reference

## Intro

Use the create with reference pattern if you want to create a new object and reference it to an existing object.

## Usage

This pattern shows the relationship between two objects only, and does not copy the content from one object to another. If you would like to copy an object and edit it, have a look at the article on [copying](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/copy) instead.

## Layout

**There are several ways to trigger the** **_create with reference_** **function:**

- Clicking the transparent _Create_ button in the toolbar (for example, above a form or table control).
- Clicking the _Create_ (_:add:_ ) icon in the toolbar of a worklist or a list report (for example, in a list-detail-detail pattern using the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)).

**There are two ways to create an object with reference to support different use cases:**

- Using the dialog to create objects with no more than 8 editable fields.
- Using the details page to display large amounts of data that cannot be displayed in a dialog, such as long forms.

## Behavior and Interaction

This section describes the interaction flow of the **create with reference** pattern.

**> **Information:** **

Note that, for technical reasons, an SAP Fiori message box **cannot be displayed** **with a JavaScript UI5 implementation**. Instead, only a native browser popup can be displayed.
Typically, this applies to:
- Navigation away from a page with unsaved data with browser controls, for example, when the user clicks the browser back button to leave an object page in an application without
draft handling
- Closing a browser page or tab with unsaved data
- Refreshing a browser page with the browser controls
However, the message box **can be displayed** for the following the actions, as described in the SAP Fiori guidelines:
- Navigation between applications
- Navigation away from pages in full or partial edit mode

### Create with Reference Using a Dialog

Clicking the _Create_ button takes the user to a dialog. This dialog opens with an unchecked checkbox and several editable fields for creating the new object, such as a line item.

If the user wants to reference another object, such as a sales order, he or she must select the checkbox and then select the _Reference Type_ and the _Reference ID_. We recommend offering the value help dialog for selecting the reference ID. However, the choice of control will also depend on the type of content being referenced.

Clicking the _Create_ button saves the entries and adds the object (line item) to the current table. If the user chooses _Cancel_, a data loss warning appears.

### Create with Reference on Details Page

Clicking the _Create_ button takes the user to the details page. This page contains an unchecked checkbox and a large form with editable fields for creating the new object, such as a line item.

If the user wants to reference another object, such as a sales order, he or she must select the checkbox and then select the _Reference Type_ and the _Reference ID_. We recommend offering the value help dialog for selecting the reference ID. However, the choice of control will also depend on the type of content being referenced.

Clicking the _Create_ button in the footer toolbar saves the entries. The create page then switches into display mode. The _Back_ button takes the user to the previous page. If the user chooses _Cancel_, a data loss warning appears.

## Responsiveness

The responsiveness of this page depends on the responsive behavior of the controls being used.

_Create with reference pattern adapted to desktop_          | _Create with reference pattern adapted to tablet_          | _Create with reference pattern adapted to smartphone_

---

## Global Patterns > Object Handling > Delete Objects

# Object Handling – Delete

## Intro

You can delete objects either from a list report or from the corresponding object page. If the object contains subitems, the delete flow for the items depends on the structure of the object ([simple](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#simple-vs-complex-objects) or [complex](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#simple-vs-complex-objects)).

To avoid accidental deletion, display a message dialog asking the user to [confirm deletion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation7). In some non-critical use cases, you can omit this message (see [Top Tips](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/global-patterns/object-handling/delete-objects#top-tips)).

The examples below show all delete flows in a full screen layout.

## Delete from List Report

To keep it simple, the example below shows the flow for deleting just one object. The flow is the same for deleting multiple objects.

1. From a list report, the user selects an object and clicks _Delete_.
2. A message dialog prompts the user to [confirm deletion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation7).
   1. _Delete_ closes the dialog. The user sees the updated list report and a confirmation [message toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/).
   2. _Cancel_ closes the dialog. The object is still selected.

## Delete from Object Page

Usually, _Delete_ is only shown in display mode for the object page, since the user does not edit and delete an object at the same time. Nevertheless, you might need to offer a _Delete_ button in edit mode (for example, if there is no display mode).

If an object contains items, the delete flows for the items depend on the page structure ([simple vs. complex](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#simple-vs-complex-objects)). The object itself can be in display or edit mode.

For both simple and complex objects, you can offer _Delete_ in the toolbar of the table that contains the items. For complex objects, you can also show _Delete_ in the header toolbar of the item subpage.

For the flows see:

[Delete Complete Object](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects#delete-complete-object)

[Delete Item from Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects#delete-item-from-table-simple-and-complex-objects)

[Delete Item from Subpage](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects#delete-item-from-subpage-complex-objects)

### Delete Complete Object

The flow is as follows:

1. From a list report, the user navigates to the object details.
2. The user selects _Delete_ in the header toolbar of the object page.
3. A message dialog prompts the user to [confirm deletion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation7).
   1. _Delete_ closes the dialog. The user sees the updated list report and a confirmation [message toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/).
   2. _Cancel_ closes the dialog and shows the object in display mode.

If your app uses a [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) and the user confirms deletion, the object page column is closed.

### Delete Item from Table (Simple and Complex Objects)

To keep it simple, the example below shows the flow for deleting just one item. The flow is the same for deleting multiple items.

1. On the object page, the user selects an item and clicks _Delete_ in the table toolbar.
2. If necessary, a message dialog prompts the user to [confirm deletion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation7).
   1. _Delete_ closes the dialog. The user sees the updated object page and a confirmation [message toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/).
   2. _Cancel_ closes the dialog. The object is still selected.

### Delete Item from Subpage (Complex Objects)

The flow is as follows:

1. On the object page, the user navigates to the item subpage.
2. The user selects _Delete_ in the header toolbar of the subpage.
3. If necessary, a message dialog prompts the user to [confirm deletion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation7)
   1. _Delete_ closes the dialog. The user sees the updated object page and a confirmation [message toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/).
   2. _Cancel_ closes the dialog and shows the item subpage in display mode.

## Top Tips

**Delete in Display Mode**

In display mode, always show the [delete confirmation dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation7).
Reason: The objects or items are deleted in the back end and the user has no option to undo the action.

**Delete in Edit Mode**

- You can leave out the message dialog for confirming deletion if:
  - A subitem is being deleted from a table in an object page (global or local flow)
  - A subitem is being deleted from a subpage (global flow only)

Only omit the dialog **non-critical use cases** (for example, if the user can add the item easily again or just needs to simulate different data constellations).

- In the local edit flow, we recommend offering an additional option to delete items from the table in the main page, and not just from the item subpages.
  Reason: Deleting from a subpage always shows the message dialog to confirm deletion. This may annoy users if several items need to be deleted.

---

## Global Patterns > Object Handling > Draft Handling

# Draft Handling

## Intro

A draft is a temporary version of a business entity that has not yet been explicitly saved as an active version.

Drafts are used:

- To keep unsaved changes if an editing activity is interrupted, allowing users to resume editing later.
- To prevent data loss if an app terminates unexpectedly.
- As a locking mechanism to prevent multiple users from editing the same object at the same time, and to make users aware when there are unsaved changes by another user.

When a user starts creating a new business entity or edits an existing one, a draft is created in parallel in the background to enable **field validation** and **dynamic field control** based on user interaction, and to provide **default values** for fields based on recent data entry. A draft can be validated for consistency and completeness at any time using the different message types and controls described in the [message handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) article.

While the user is modifying a business entity, the draft is saved every 20 seconds. Clicking the _Save_ button is still necessary in order to incorporate the changes into an active business entity, which is called the saved version.

> **Information:** In SAP Fiori elements, draft handling behaviour is only implemented for the [global flow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow), which allows users to navigate between the main object page and sub-object pages in edit mode without explicitly saving their changes.

## Responsiveness

## Types

### Draft Types

Drafts can differ in terms of their visibility to different users and the interactions allowed. SAP Fiori currently employs an **exclusive draft scenario**. In this type of scenario, one user is the owner of the draft. As long as a user is working on an object, the business entity remains locked for other users until the lock period expires. When the lock expires, other users can discard any unsaved changes and start editing.

### Editing Status

In a draft context, we differentiate between the following editing statuses:

- **Saved version**
  - If all mandatory fields have been filled, and the entries are consistent in the business context, the user can save. When a draft entity is saved, the changes are transferred to the saved version. After saving, the draft is deleted.
- **Draft**
  - A user’s own draft is tagged as _Draft_. The _editing status_ to filter for a user’s own drafts is called _Own Draft_.
- **Locked**
  - If a user is editing a business entity, it is locked for other users. The object remains locked until the user has finished editing or until the locking time has passed. The _editing status_ to filter for locked entities is called _Locked by Another User_.
- **Unsaved changes**
  - If the locking time has expired, other users can see that there are unsaved changes by the person who edited the object The _editing status_ to filter for unsaved entities by other users is called _Unsaved Changes by Another User_.

The sap.m.objectMarker was developed to express the technical status of an object. The user name cannot be represented with the object marker.
For more information about the sap.m.objectMarker, see the article on [object display elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/).

## Behavior and Interaction

When a user creates a new business entity or edits an existing one, it remains in _Draft_ state until the user saves it.

The following interaction flow shows how the draft concept helps users to create and edit new business entities.

### Create and Edit

In a **create scenario**, drafts belong to a single user. No other user has access to the draft while the object is being created.
New business entities that have not been explicitly created (activated) are known as “create-drafts”.
In scenarios where the object entity does not have a name or ID, use the format _New [entity\|_ as a placeholder in tables, lists, or messages. If an ID or name is available, use this information instead.
In an **edit scenario**, when a user is actively editing an object, no other user has access to the edit mode of that object. In parallel, a draft is created, which is a deep copy of the business document.
As soon as the user starts editing, the editing status of the object changes to _Draft_.
Saved versions of business entities that are edited by someone are known as “edit-drafts”.
The ist report reflects the information of the “edit-draft”. If the document is unchanged, the list report reflects the information of the saved version.

#### Create Flow

Carousel (full-width, col-2)

#### Edit Flow

Carousel (full-width, col-2)

Section Metadata

style

#### Draft/Saved Version Switch
When the user changes to edit mode, the main page no
longer shows the _Edit_ button. Instead, a draft/saved
version switch is shown next to the title of the page
that allows the user to switch between the draft version
and the current saved version of the business entity.
### Select Multiple Items – List in a List-Detail Layout

The user can select multiple items in the list as follows:
- **Display first or last item (default)**: Either the first or last (default) selected item remains visible in the details area. If the first or last selected item is a draft, show the object in edit mode and enable the _Save_ and _Discard_ buttons.
- **Display aggregate**: The details area displays a summary of the selected items and offers some added value or functionality. If the selection includes a draft, use the data that
is currently displayed in the draft, and not the last activated or saved data.
For more information about multiple selection of items, see the [Mass Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing) guideline.
### Resume Editing

Once the user returns to the draft, the UI is displayed
in edit mode and the user can resume editing. When the
user exits the draft, the last modified status is
auto-saved.
### Save

If all mandatory fields have been filled and the entity has a consistent state independently and also within its business environment and business processes, users can incorporate the edits into an active business entity.
Saving an entity executes all necessary application logic and saves a consistent state. If errors occur that prevent the entity from being saved, users must first resolve these issues.
For more information, see [messaging](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) and [form field validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/).
If your use case requires further buttons apart from _Save_ (for existing objects) or _Create_ (for new objects), place them next to the _Save_ or _Create_ button. Examples might be _Save and Next_ or _Create and Next_. For more information, see [Manage Objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-56/foundations/best-practices/global-patterns/object-handling/manage-objects).
#### Save action – outdated draft
If the lock time expires due to a user’s inactivity, and
another user starts editing in the meantime, display the
following message:
Type: Error
Title: _Error_
Message text:

Button: _Close_
### Discard Draft

Default (col-1)

If the user makes changes and clicks the _Discard_ button, display a popover (sap.m.Popover) to confirm that the draft should be
deleted. The user must click outside the popover to close it.
If the user has not made any changes, the draft should be deleted, even if fields were already prefilled. To do so, use the _CreatedAt_ and _ChangedAt_ timestamps of the administrative data to check whether changes have been made to the draft entity.
#### Create-draft
For a create-draft, show the following message text:
Message text:

Button: _Discard_
When the user clicks _Discard_, display the following message:
Message text:

#### Edit-draft
For an edit-draft, show the following message text:
Message text:

Button: _Discard_
When the user clicks _Discard_, display the following message:
Message text:_Changes discarded_

#### Discard Popover

**Carousel (full-width, col-2)**

Section Metadata

style

## Guidelines

### When to Show Which Editing Status
When multiple users work on the same work list, there is always a chance that more than one
user will try to edit the same object simultaneously. This can lead to important edits being
lost when multiple users submit their changes without informing one another. Therefore, a
draft for a business entity acts as an **edit lock**, which forces object information to be changed sequentially.
In an edit scenario, when a user actively edits an object, no other user has access to the
edit mode of that object. In parallel, a draft is created, which is a deep copy of the
business entity.
The **object remains locked** until the user has finished editing. When the user who is
blocking the object has been idle for 30 minutes, the lock expires automatically. Other **users can then take over editing**, and the draft of the previous user is discarded.
This graphic shows how the draft locking concept works and when to display which message.
### How to Display the Editing Status

In most controls the **editing status** is **clickable** and provides access to additional information related to the draft, such as when the draft was created or who the owner of a draft is. Clicking the status **opens a responsive popover** that displays all relevant information.

#### Controls That Display the Editing Status

#### Object list item, object header, and object page header
If an object has a certain editing status, use one of the status
properties of the object list item or object header. Do not
overwrite existing status properties. Instead, use an additional
status line to ensure that no information gets overwritten.
If an object is locked, has unsaved changes or is in draft state,
set the ShowMarkers property of the object list item or object
header to _true_ and use the sap.m.objectMarker.
#### Tables
If you need to indicate the editing status of a business entity in a [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/), place a link below the key information. Use _sapUiTinyMarginTop_ to align the information in a responsive table.
If you need to indicate the editing status of a business entity in a **non-responsive** table, such as an analytical table, tree table, or grid table, provide an extra column for that information and place a transparent button inside. Name the column header _Editing Status_. The column should be placed after the main information on the table.
The editing status has different visualisations, such as icon only, icon and text, or text-only. Choose the one that is the most appropriate. _Draft_ should always be displayed as text-only.
#### Upload Set
The [upload set](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/upload-set/)
control uses sap.m.objectMarker to display the editing status. The default behavior for the editing status is as follows:
On L/M size:
- _Locked_ and _Unsaved Changes_ are displayed as icons and text, while _Draft_ is displayed as text.
On S size:
- _Locked_ and _Unsaved Changes_ are displayed as icons, while _Draft_ is displayed as text.
#### Editing Status Popovers

#### _Trigger_
When the user clicks the editing status, a responsive
popover appears and displays draft-related administrative
information.
#### 
When the user clicks the editing status, a popover will appear with information on who has locked an object or who has unsaved changes.

If the user’s name is not available or cannot be retrieved, replace the user’s actual name with “_another user”_.

The images show the different use cases.

### Which Information Is Shown

If the user edits an entity, update the changed
information immediately in the corresponding lists, such
as the list report, worklist, or object list item. All
other users will see the most recently saved version of
the entity.
### Bookmarking and Deep Linking

A page of an application that is not its entry page can be bookmarked or shared as a deep link. Ideally, the full UI state of the page will be retrieved. Technically this includes every part that is represented in the URL. For more information, see the article on [deep linking](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/navigation/navigation).

#### Bookmarking an entity in active status
If a bookmark is called for an active entity for which no
draft exists, open the entity in display mode.
If a bookmark is called for an active entity for which a
draft exists, display a dialog asking the user whether he
or she wants to resume editing or discard the draft.
The dialog contains the following information:
Type: Confirmation
Title: _Resume Editing_
Message text:

Buttons: _Resume \| Discard_
If the user resumes editing via _Resume_, the last
implicitly updated draft state will be displayed in edit
mode. If the user clicks the _Back_ button, the active
entity will not be displayed. Instead, the previous entry
before the user navigated to the active instance will be
displayed. Navigation to the draft does not create an
entry for back navigation.
If the user chooses _Discard_, show the original saved
version in display mode and the following message
informing the user that the draft was deleted:
Message text:

#### Bookmarking a draft
If a bookmark is called for an entity that was bookmarked while in draft
state, open the entity in edit mode.
If the bookmark relates to an entity that no longer exists due to an action
that triggered its deletion, such as _Save_ or _Discard_, or if it cannot be accessed, display an empty page.
Message text:

[App name as link]
If a user shares a link to an entity with another user, the other user will
be taken to the display view of the entity. If a different user’s draft
exists, the page shows the appropriate editing status, such as _Locked by [user name]_.

#### Deep Linking

When one user navigates from one application to an entity
in another application, and this entity has a draft
created by that particular user, display a dialog asking
whether the user wants to resume editing or discard the
draft.
The dialog contains the following information:
Type: Confirmation
Title: _Resume Editing_
Message text:

Buttons: _Resume \| Discard_
If the user resumes editing via _Resume_, the last
implicitly updated draft state will be displayed in edit
mode. If the user clicks the _Back_ button, the active
entity will not displayed. Instead, the previous entry
before the user navigated to the active instance will be
displayed. Consequently, navigation to the draft does not
create an entry for back navigation.
If the user selects _Discard_, the page will show the
original (active) document in display mode, and the
following message informing the user that the draft was
deleted:
Message text:

### Sorting, Filtering, and Grouping

#### Sorting

The table in a list report is sorted by a property defined either by the app (default sorting) or by the user, such as a key identifier, date, or status.
Draft entities are sorted by the same criteria. If the property is empty in the draft entity, the item appears at top. The table can also be sorted by _Draft_. In an ascending order, the entities that are in draft state or locked appear at the top. In a descending order, these items appear at the bottom.

#### Filtering

The table in a worklist is filtered by the properties defined by the app (by default) or by the user. Draft objects are filtered by the same criteria. If those properties are empty in the draft entity, the item will not match the criteria and will not be shown.

The table can also be filtered by _Editing Status_ with the following values:

Table

Editing Status

All

Own Draft

Locked by Another User
someone

Unsaved Changes by Another User
draft of someone is still available)

Unchanged

#### Grouping

The table in a list report is grouped by the properties defined by the app (by default) or by the user. Draft entities are grouped accordingly. If the property is empty in the draft entity, this creates a group of its own, which appears at the top of the table.

Follow this guideline for empty properties:

### Actions and Messaging

The editing status of an entity also has implications for any actions the user executes:

- Locked items can never be edited, updated, or deleted.
- Update actions cannot be applied to a user’s own draft.
- Users can delete their drafts and any objects for which the lock expired.

If your app offers mass actions with multiple selection, you may also need to consider potential conflicts – some actions may not be feasible if only some of the selected items can be processed. The sections below outline the different use cases and corresponding user messages.

#### Message Handling

We distinguish between **edit**, **update**, and **delete** actions:

- **Edit**: Open an object in edit mode.
- **Update**: Trigger changes to the latest active version, such as _Post_ and 
- **Delete**: Remove from the database.

Table

Editing Status/Action      | Edit                        | Update                     | Delete

Active Version (actively   | Editing allowed; no message | Update allowed; no message | Deletion allowed; warning
saved, no draft or unsaved |
changes exist)             |
Locked (draft locked by    | Never allow editing; error  | Never update; error        | Never delete; error
another user)              |
Draft (user’s own draft)   | Editing allowed; no message | Use case-dependent         | Deletion allowed; warning

Unsaved Changes (draft by  | Editing allowed; warning    | Update allowed; warning    | Deletion allowed; warning
another user)              |
### Decision Dialog

The user has made some changes and attempts to **navigate away** from the object while in edit mode.
- Type: Warning Message Box
- Title: _Warning_
- Message text: _You’ve made changes to this object. What would you like to do?_
- Option 1: _Save: Apply changes to the saved version._
- Option 2: _Keep Draft: Changes are only visible to you and have no effect on dependent processes and functions._
- Option 3: _Discard Draft: All changes will be lost._
- Buttons: _OK \| Cancel_
**> **Information:** **

Note that, for technical reasons, an SAP Fiori message box **cannot be displayed** **with a JavaScript UI5 implementation**. Instead, only a native browser popup can be displayed.
Typically, this applies to:
- Navigation away from a page with unsaved data using browser controls, for example, when the user clicks the browser back button to leave an object page in an application without
draft handling
- Closing a browser page or tab with unsaved data
- Refreshing a browser page with the browser controls
However, the message box **can be displayed** for the following the actions, as described in the SAP Fiori guidelines:
- Navigation between applications
- Navigation away from pages in full or partial edit mode

### Message Patterns – Actions for a Single Item

> **Information:** The message patterns below are intended to offer guidance on the information that your messages should include. The
exact format will depend on the available messaging controls and infrastructure.

#### User attempts to DELETE …

#### … own draft/active item
Type: Warning
Title: _Delete_
Message text:

Buttons: _Delete \| Cancel_
#### … a locked item
Type: Error
Title: _Error_
Message text:
User name known:

User name unknown:

Button: _Close_
#### … an item with unsaved changes by another user
Type: Warning
Title: _Delete_
Message text:
User name known:
_Another user edited this [entity] without saving the
changes:_
User name unknown:

Buttons: _Delete \| Cancel_
User attempts to EDIT **…**

#### … an item with unsaved changes by another user:
Type: Warning
Title: _Warning_
Message text:
User name known:

User name unknown:

Buttons: _Edit \| Cancel_
#### … a locked item:
Type: Error
Title: _Error_
Message text:
User name known:

User name unknown:

Button: _Close_
#### User attempts to UPDATE …

#### … own draft
Type: Error
Title: _Error_
Message text:

Button: _Close_
#### … a locked item
Type: Error
Title: _Error_
Message text:
User name known:

User name unknown:

Button: _Close_
#### … an item with unsaved changes by another user
Type: Warning
Title: _Warning_
Message text:
User name known:
_Another user edited this [entity] without saving the
changes:_
User name unknown:

Buttons: _[Action] \| Cancel_
### Message Patterns – Actions for Multiple Items

> **Information:** The message patterns below are intended to offer guidance on the information that your messages should include. The
exact format will depend on the available messaging controls and infrastructure.

The following message patterns apply to multi selection cases. In case the user selects one item of one type show the entity name instead, e.g.

**Locked items + 1 item with unsaved changes:**

Message text:

Buttons: 
**Locked items + 2 or more items with unsaved changes:**

Message text:

Buttons: 
#### User attempts to DELETE …

#### **… active/draft** items
Type: Warning
Title: _Delete_
Message text:

Buttons: _Delete \| Cancel_
#### **… locked** items and active/draft items
Type: Warning                                  | _Delete: Locked and active/draft items_           | _Delete: Locked and active/draft items - Details_
Title: _Delete_
Message text:
Short text:
_X of Y [entities] are currently locked by
other users and cannot be deleted._
_Do you still want to delete the remaining n
[entities]?_
Long text:
Grouped list with entity information, e.g. ID
and Description plus information who locks
each item.
Buttons: _Delete \| Cancel_
#### **… locked items and items with unsaved changes**
Type: Warning                                          | _Delete: Locked and unsaved changes_           | _Delete: Locked and unsaved changes - Details_
Title: _Delete_
Message text:
Short text:
_X of Y [entities] are currently locked by other
users and cannot be deleted._

_Do you still want to delete the [entities] with
unsaved changes?_
Long text:
Grouped list with entity information, such as ID and
description, as well as information on who is locking
each item/ has unsaved changes.
Buttons: _Delete \| Cancel_
#### **… locked, unsaved changes and active/ draft items**
Type: Warning                                              | _Delete: Locked, unsaved changes and active/draft items_           | _Delete: Locked, unsaved changes and active/draft items - Details_
Title: _Delete_
Message text:
Short text:
_X of Y [entities] are currently locked by other users
and cannot be deleted._

Long text:
Grouped list with entity information, such as ID and
description, as well as information on who is locking each
item/ has unsaved changes.
Buttons: _Delete \| Cancel_
#### **… items with unsaved changes**
Type: Warning                         | _Delete: Items with unsaved changes by other users_           | _Delete: Items with unsaved changes by other users - Details_
Title: _Delete_
Message text:
Short text:
_Other users have edited the selected
products without saving the changes._

Long text:
Grouped list with entity information,
such as ID and description, as well
as information on who is locking each
item/ has unsaved changes.
Buttons: _Delete \| Cancel_
#### **… items with unsaved changes and active/ draft items**
Type: Warning                                                 | _Delete: Unsaved changes and active/draft items_           | _Delete: Unsaved changes and active/draft items - Details_
Title: _Delete_
Message text:
Short text:
_X of Y [entities] are currently locked by other users and
cannot be deleted._

_Do you still want to delete the [entities] with unsaved
changes?_
Long text:
Grouped list with entity information, such as ID and
description, as well as information on who is locking each
item/ has unsaved changes.
Buttons: _Delete \| Cancel_
**User attempts to UPDATE …**

The following section does not show any example pictures. Please refer to the section before for examples.

Type: Confirmation                    | Type: Warning                                                         | Type: Error
Title: _[action]_                    | Title: _Warning_                                                      | Title: _Error_
Message text:                         | Message text:                                                         | Message text:
_[action] the selected [entities]?_ | Short text:                                                           | Short text:
Buttons: _[action] \| Cancel_        | _Some of the [entities] you selected have been edited by other       | _The selected [entities] cannot be
users, but not saved. These changes will be lost._                    | [action]. They are currently locked, or
exist as draft versions._
Long text:
Long text:
_Grouped list with entity information, such
Grouped list with entity information, such as ID and description, as  | as ID and description, as well as
well as information on who has unsaved changes.                       | information on who is locking each item and
user’s own draft._
Buttons: _[action] \| Cancel_
Button: _Close_

#### **… items with unsaved changes and locked items**
Type: Warning
Title: _Warning_
Message text:
Short text:

Long text:
Long text:
Grouped list with entity information, such as ID and
description, as well as information on who is locking
each item.

Buttons: _[action] \| Cancel_

Buttons: _[action] \| Cancel_

---

## Global Patterns > Object Handling > Manage Objects With Local Flow

# Complex Objects – Local Flow (Create, Edit)

## Intro

This article describes the local flow for **creating** and **editing items** using standard [message handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) and [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling).

If you need the flow for **deleting items**, see [Delete Objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects).

> **Information:** - If you are not using **standard draft handling**, show a [data loss message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation2) whenever the user leaves a changed subpage without saving the data. Also display the data loss message if the user changes data on the main page without saving.
- If you implement your **own draft behavior**, use the [keep draft dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#keep-draft-dialog).
- If the **items contain only a few fields**, you can also use a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) instead of a subpage. We recommend using the same pattern for creating and editing items.
Note that, for technical reasons, an application **implemented with JavaScript UI5**, cannot display an SAP Fiori message box. Instead, only a native browser popup can be displayed. Typically, this applies to:
- Navigation away from a page with unsaved data using browser controls, for example, when the user clicks the browser back button to leave an object page in an application without draft handling
- Closing a browser page or tab with unsaved data
- Refreshing a browser page with the browser controls
However, the message box **can be displayed** for the following actions, as described in the SAP Fiori guidelines:
- Navigation between applications
- Navigation away from pages in full or partial edit mode

## Global vs. Local Flow

Complex objects manage items on subpages. In the local flow, each subpage needs to be saved separately. This differs from the global flow, where only the main page needs to be saved. For more information on when to use each flow, see the [flow descriptions with examples](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#complex-objects-nested-pages).

The table below summarizes the main differences between the global and local flows on the UI.

Table

**Main object**                    | Main object must be in edit mode.                                                                                   | Main object can be in display or in edit mode.

**Actions in the footer toolbar of | Create item: _Add_ and _Cancel_ Edit item: _Apply_ and _Cancel_                                                     | Create item: _Create_ and _Cancel_ Edit item: _Save_ and _Cancel_
the subpage**
**Message toasts**                 | No message toasts are displayed after choosing _Add_ and _Apply._ Instead, an indicator appears in the items table. | Message toasts are displayed after choosing _Create_ and _Save._

## Create Items

The steps below describe the local flow for creating items on a subpage with the main page in display mode. The flow is the same when the main page is in edit mode.

### Full Screen Layout

Default (col-1)

1. On the main object page, the user chooses _Create_ in the toolbar for the items table.An empty subpage appears with the title _New \<item>_ (for example, _New Sales Order Item_). The footer toolbar contains the finalizing _Create_ action and _Cancel_.
2. After entering all the data, the user chooses _Create_.The standard flow navigates back to the main object page and shows a message toast.
Depending on your use case, you have the following alternatives:
- You can show the subpage in display mode.
- You can keep the subpage in edit mode.
- If the user needs to create several items in succession, you can offer the action _Create and Next_ in the footer toolbar of the subpage. This opens a new, empty subpage.
3. Choosing _Cancel_ opens a [confirmation popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#cancel-editing), and the user can opt to discard the draft. In this case, the system navigates back to the main object page.

> **Guideline:** If you offer _Create and Next_ on the subpage, use the following order: _Create and Next, Create, Cancel_. Only emphasize _Create and Next_.

> **Hint:** If you offer an _Create and Next_ option, add a comment for translators to indicate what “Next” refers to in your app.

Section Metadata

style

### Flexible Column Layout

In the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)**,** the standard flow is as follows:

- Choosing _Create_ on the subpage closes the subpage column. A message toast is displayed on the main page.
- Confirming _Cancel_ closes the subpage column.
- Choosing _Create and Next_ on the subpage opens a new, empty subpage in the subpage column, with a message toast.

## Edit Items

The steps below describe the local flow for editing items on a subpage with the main page in display mode. The flow is the same when the main page is in edit mode.

### Full Screen Layout

Default (col-1)

1. From the main object page, the user navigates to the details of an item.The subpage features a header toolbar with an _Edit_ button. The title of the subpage reflects the current item, for example _Sales Order Item (10)_.
If users need to open the item directly in edit mode, you can offer _Edit_ in the table toolbar or as an [inline action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#actions-in-table-rows).
2. On the subpage, the user chooses _Edit_. The subpage changes to edit mode, and the footer toolbar offers the finalizing _Save_ action and _Cancel_. The title does not change.
3. After updating all the data, the user chooses _Save_.The standard flow shows the updated item in display mode with a message toast.
Depending on your use case, you have the following alternatives:
- You can keep the subpage in edit mode.
- If the user needs to edit several items in succession, you can offer the action _Save and Next_ in the footer toolbar of the subpage. This opens the subpage for the next item in edit mode.
- You can show [up and down arrows](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#representation-of-child-pages) for navigating to the previous or next item in edit mode.
4. Choosing _Cancel_ opens a [confirmation popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#cancel-editing) and the user can opt to discard the draft. In this case, the system displays the item subpage.

> **Guideline:** - If you offer _Save and Next_, use the following order: _Save and Next, Save, Cancel_. Only emphasize _Save and Next_.
- Use either _Save and Next_ or the up and down arrows, never both.
- Choose _Save and Next_ if users need to change one item after the other. Offer the up and down arrows if the user
just needs to change a few items and needs to page through the items quickly to reach those that are relevant.

> **Hint:** If you offer a _Save and Next_ option, add a comment for translators to indicate what “Next” refers to in your app.

Section Metadata

style

### Flexible Column Layout

In the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)**,** the standard flow is as follows:

- Choosing _Save_ on the subpage switches the subpage column to display mode. A message toast is displayed on the subpage.
- Confirming _Cancel_ on the subpage switches the subpage to display mode.
- Choosing _Save and Next_ on the subpage opens the next item in edit mode in the subpage column.

---

## Global Patterns > Object Handling > Manage Objects With The Global Flow

# Complex Objects – Global Flow (Create, Edit)

## Intro

This article describes the global flow for **creating** and **editing items** using standard [message handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) and [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling).

If you need the flow for **deleting items**, see [Delete Objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects).

> **Information:** - If you are **not using standard draft handling**, show a [data loss message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-box/#Messaging-FormFieldValidation2) whenever the user leaves the entire create/edit flow or the main page without saving the data. This applies to both backward and forward navigation, for example:
- Back navigation using a breadcrumb, the shell bar, or browser back
- Forward navigation from the main page to another app
It does not apply to forward navigation from the main page to a subpage.
- If you implement your **own draft behavior**, use the [decision dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#decision-dialog).
- If the **items contain only a few fields**, you can also use a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) instead of a subpage. We recommend using the same pattern for creating and editing items.
**Restriction on Message Box**
For technical reasons, an SAP Fiori message box **cannot be displayed with a JavaScript UI5 implementation**. Instead, only a native browser popup can be displayed. Typically, this applies to:
- Navigation away from a page with unsaved data using browser controls, for example, when the user clicks the browser back button to leave an object page in an application without draft handling
- Closing a browser page or tab with unsaved data
- Refreshing a browser page with the browser controls
However, the message box **can be displayed** for the following actions, as described in the SAP Fiori guidelines:
- Navigation between applications
- Navigation away from pages in full or partial edit mode

## Global vs. Local Flow

Complex objects manage items on subpages. In the global flow, only the main page needs to be saved. This differs from the local flow, where each subpage has to be saved separately. For more information on when to use each flow, see the [flow descriptions with examples](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#complex-objects-nested-pages).

The table below summarizes the main differences between the global and local flows on the UI.

Table

**Main object**                    | Main object must be in edit mode.                                                                                   | Main object can be in display or in edit mode.

**Actions in the footer toolbar of | Create item: _Add_ and _Cancel_ Edit item: _Apply_ and _Cancel_                                                     | Create item: _Create_ and _Cancel_ Edit item: _Save_ and _Cancel_
the subpage**
**Message toasts**                 | No message toasts are displayed after choosing _Add_ and _Apply._ Instead, an indicator appears in the items table. | Message toasts are displayed after choosing _Create_ and _Save._

## Create Items

The steps below describe the global flow for creating items on a subpage. The main page must be in edit mode.

### Full Screen Layout

Default (col-1)

1. On the main object page, the user chooses _Create_ in the toolbar for the items table.
An empty subpage appears with the title _New \<item>_ (for example, _New Sales Order Item_). The footer toolbar contains an _Add_ action and _Cancel._
2. After entering all the data, the user chooses _Add_.The standard flow navigates back to the main object page. The new item is highlighted in the items table.
Depending on your use case, you have the following alternatives:
- You can keep the subpage in edit mode. In this case, the title changes to reflect the specific item. For example, _Sales Order Item (10)_.
- If the user needs to create several items in succession, you can offer the action _Add and Next_ in the footer toolbar of the subpage. This opens a new, empty subpage.
3. Choosing _Cancel_ opens a [confirmation popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#cancel-editing) and the user can opt to discard the item. In this case, the system navigates back to the main object page.
The item is only saved to the database when the user chooses _Save_ on the main object page.

> **Guideline:** If you offer _Add and Next_ on the subpage, use the following order: _Add and Next_, _Add_, _Cancel_. Only emphasize _Add and Next_.

> **Hint:** If you offer an _Add and Next_ option, add a comment for translators to indicate what “Next” refers to in your app.

Section Metadata

style

### Flexible Column Layout

In the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)**,** the standard flow is as follows:

- Choosing _Add_ on the subpage closes the subpage column. The new item is highlighted in the items table.
- Confirming _Cancel_ closes the subpage column.
- Choosing _Add and Next_ on the subpage opens a new, empty subpage in the subpage column.

## Edit Items

The steps below describe the global flow for editing items on a subpage. The main page must be in edit mode.

### Full Screen Layout

Default (col-1)

1. From the main object page, the user navigates to the details of an item.
The subpage opens in edit mode. The title of the subpage reflects the current item, for example, _Sales Order Item (10)_. The subpage shows a footer toolbar containing the _Apply_ action and _Cancel_.
2. After updating all the data, the user chooses _Apply_.The modified item is highlighted in the items table.
Depending on your use case, you have the following alternatives:
- You can keep the subpage in edit mode.
- If the user needs to edit several items in succession, you can offer the action _Apply and Next_ in the footer toolbar of the subpage. This opens the subpage for the next item in edit mode.
- You can show [up and down arrows](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#representation-of-child-pages) for navigating to the previous or next item in edit mode.
3. Choosing _Cancel_ opens a [confirmation popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#cancel-editing) and the user can opt to discard the changes to the item. In this case, the system navigates back to the main object page.
The item is only updated on the database when the user chooses _Save_ on the main object page.

> **Guideline:** - If you offer _Apply and Next_, use the following order: _Apply and Next, Apply, Cancel_. Only emphasize _Apply and Next_.
- Use either _Apply and Next_ or the up and down arrows, never both.
- Offer _Apply and Next_ if users need to change one item after the other. Offer the up and down arrows if the user just
needs to change a few items and needs to page through the items quickly to reach those that are relevant.

> **Hint:** If you offer an _Apply and Next_ option, add a comment for translators to indicate what “Next” refers to in your app.

Section Metadata

style

### Flexible Column Layout

In the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/)**,** the standard flow is as follows:

- Choosing _Apply_ on the subpage closes the subpage column. The modified item is highlighted in the items table.
- Confirming _Cancel_ closes the column subpage.
- Choosing _Apply and Next_ on the subpage opens the next item in edit mode in the subpage column.

## Message Handling

On the main page, validation is triggered on focus out and when the user selects _Save_. On a subpage, validation is triggered on focus out and when the user selects _Add_ or _Apply_.

If errors occur, a [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/) appears:

- On the **main page**, the message popover displays errors coming from the main page and error summaries coming from all related subpages. To help the user find the item and solve the issue, an indicator in the line item of the table shows which subpage contains errors. In addition, the errors in the message popover are grouped by page, tab, and section. For more information about how error messages are grouped, see [message popover components](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/#components).
- On a **subpage**, validation only applies for the current subpage. The message popover lists only errors related to this subpage.

For more information about messaging, see [message handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).

---

## Global Patterns > Object Handling > Manage Objects

# Object Handling (Create, Edit, Delete)

## Intro

In addition to the basic display option, the following actions are available for objects:

- **Create**
  Objects can be created as follows:
  - From scratch
    Most of the examples in this article show how to create objects from scratch.
  - [Copy](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/copy) an existing object
    The source object and copy are of the same object type but are not related.
  - [With reference](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/create-with-reference) to an existing object
    The object can be of another object type, and both objects are related. For example, the user creates a delivery with a reference to the corresponding sales order.
- **Edit**
  Objects can be edited at different levels: You can make the complete object editable, or only parts, such as single sections or items.
- **Delete**

The interaction flows for the “create”, “edit”, and “delete” cases depend on the structure of the object.

> **Information:** The standard floorplan for managing objects is the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/). The [wizard](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/wizard/) supports create and edit actions, but has no display option. If only a few fields (<=8) need to be managed, you can use a dialog. The content available in display mode can differ from the content in edit mode (for example, the facets in an object page header).

### Simple vs. Complex Objects

An object can consist of only one page or several nested pages:

- **Simple object with one page**: All information is on
just one page (for example, a leave request). Object pages
with navigation bars and wizards are also simple objects.
In these cases, the content is still managed in one page
but is structured using anchors or tabs (object page) or
with a progress bar (wizard).
- **Complex object with nested pages**: Information is
split between a main page and several subpages (for
example, a sales order that lists all sales order items on
the main page, and a selected item is managed on a
subpage). You can display the object and its pages in
either a full screen layout or a flexible column layout.
## Simple Objects (1 Page)

### Create

For the create flow, see [Simple Objects (Create, Edit)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-simple-objects).

### Edit

For 1-page objects, you can set the entire page to edit mode. If only a few sections are editable, set only these sections to edit mode, or open a dialog for editing. For more information, see [Partial Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-parts-of-an-object).

**Tip**: If your page contains a table and you need to edit specific fields for many items at once, use the [mass edit pattern](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing).

### Delete

For the delete flow, see [Delete Objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects).

## Complex Objects (Nested Pages)

You can choose between 3 interaction flows for handling objects with nested pages:

- Partial flow
- Local flow (only the page a user is working on is locked)
- Global flow (entire object including subpages is locked)

You can only use one of these flows for any given object. Do not mix them.

Use the following criteria to choose the right flow:

Table

Type              | The User…                      | When to Use                    | Example

#### Partial flow | - Saves the data for each      | - If only a few values can be  | An employee profile is
page section.\               |   edited.                      | managed using an object
A footer toolbar is not      |                                | page floorplan. Many
necessary.                   |                                | sections are display only,
| such as company
| information, salary, and
| employment contract
| details.
| An employee can only change
| personal information, such
| as their phone number and
| office location.

#### Local flow   | - Saves data on each page      | - If several users, possibly   | A project is managed using
separately (main page and    |   from different teams, work   | an object page floorplan.
subpages), using the footer  |   together on the object.      | Subprojects, tasks, vacant
toolbar.                     | - If a user is only            | positions, and settlement
- Without draft handling:\     |   responsible for specific     | services are managed on
Gets a message when          |   parts of the object.         | subpages.
navigating between pages     | - If the object contains
without saving first.        |   heterogeneous information    | The project lead is
(for example, for different  | responsible for managing
object types).               | the overall project.
- If the object is deeply      | Different subject matter
nested.                      | experts are responsible for
- If you don’t want the        | the specific tasks (filling
entire object to be locked   | vacant positions,
when one user is editing.    | settlement for business
| partner services, and so
| on).

#### Global flow  | - Saves all data with one      | - If a user is responsible     | A sales rep manages a sales
click in the footer toolbar  |   for the complete object.     | order using an object page
on the main page (saves      | - If the object contains       | floorplan. The sales order
changes to the main page and |   homogeneous information: the | items are listed on the
all subpages at once).       |   data on the main page and    | main page, and the details
- Can navigate freely between  |   subpages usually refers to   | of each item are managed on
the pages.                   |   the same object.             | subpages.

**> **Information:** **

Note that, for technical reasons, an application **implemented with JavaScript UI5**, **cannot display an SAP Fiori message box**. Instead, only a native browser popup can be displayed. Typically, this applies to:
- Navigation away from a page with unsaved data using browser controls, for example, when the user clicks the browser back button to leave an object page in an application without draft handling
- Closing a browser page or tab with unsaved data
- Refreshing a browser page with the browser controls
However, the message box **can be displayed** for the following actions, as described in the SAP Fiori guidelines:
- Navigation between applications
- Navigation away from pages in full or partial edit mode

You can use the [mass edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing) pattern in all flows.

For more information, see [Partial Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-parts-of-an-object), [Complex Objects – Local Flow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-local-flow) and [Complex Objects – Global Flow](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow).

## Naming Guidelines

Apply the following naming conventions for the triggering button, finalizing action, title in the shell bar, and the placeholder for newly created objects.

Table

Action              | Label of Triggering | Label of Finalizing | Title in Shell Bar | App Header (example)
Button              | Action              | (example)
Display             | _Navigation link_   | ---                 | Purchase Order
Create              | Create              | Create              | Purchase Order     | New Purchase Order
[1)]{color=pink-8} |                     |
Add                 | Add                 | Add
[2)]{color=pink-8} |                     |
Edit                | Edit                | Save                | Purchase Order
Copy                | Copy                | Create              | Purchase Order     | Copy of 123456789
|                    | [ID of copied
|                    | purchase order]

For subitems, apply the following naming conventions.

Table

Action              | Label of Triggering | Label of Finalizing       | Title in Shell Bar   | App Header (example)
Button              | Action                    | (example)
Display Subitems    | _Navigation link_   | ---                       | Purchase Order Items
| (1 of 10)
Create Subitem      | Create              | Create                    | Purchase Order Item  | New Purchase Order
[1)]{color=pink-8} |                     |                           |                      | Item

Add Subitem         | Add                 | Add
[2)]{color=pink-8} |                     |
Edit Subitems       | Edit                | Save                      | Purchase Order Items
| (1 of 10)
Copy Subitem        | Copy                | Create[\*]{color=pink-8} | Purchase Order Item  | Copy of HT-0189
|                      | [ID of copied
|                      | purchase order item]

<sup>1)</sup> Create: Brand new object that has not yet been created on the database.
<sup>2)</sup> Add: Existing object that is being added/assigned.

For naming examples, see [Creating an object or item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#creating-an-object-or-item) in the UI text guidelines.

---

## Global Patterns > Object Handling > Manage Parts Of An Object

# Object Handling – Partial Edit

## Intro

Use this interaction flow if you want to make only part of an object editable (single sections or items).

There are two variants for editing part of an object:

- Partial edit **in place** (preferred)
- Partial edit **with dialog**

You can use both variants in split screen and full screen layouts.

## Partial Edit in Place

With this flow, the user edits a **specific section** of an object **in place** by clicking a transparent _Edit_ button in the section header. The section then switches to edit mode, and the _Edit_ button is replaced by _Save_ and _Cancel_ buttons.

In-place editing is the preferred method for changing part of an existing object into edit mode.

### Data Loss Message

If the user has made changes in edit mode, show a data loss message whenever the user navigates away from the page being edited, or clicks _Cancel_. The data loss message is required for both split screen and full screen layouts.

If you want to keep unsaved changes, you need to implement [draft handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling).

## Partial Edit with Dialog

With this flow, the user **selects one or several existing objects** for editing. The values are then **edited in a separate dialog**. For more information, see [Mass Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing).

When the user clicks _Save_, the dialog closes, and the line items in the table are updated.

Use the partial edit flow with a dialog if the switch from display to edit mode involves an **extensive change of layout**, such as mass editing. If the dialog contains more than 8 editable fields, consider navigating to a details page instead.

### Data Loss Message

No data loss message is required for the partial edit flow with a dialog. The user can leave the edit dialog by clicking _Cancel_. Any changes are discarded.

---

## Global Patterns > Object Handling > Manage Simple Objects

# Simple Objects (Create, Edit)

## Intro

Use the flows described below to **create** and **edit** [simple objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects#simple-vs-complex-objects). All the information for a simple object appears on a single page. The flows use standard message and draft handling. For the **delete** flow, see [Delete Objects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/delete-objects).

## Create

### Full Screen Layout

If your app runs in **full screen** mode, meaning that one page is shown at a time, the standard create flow is as follows:

1. In a list report, the user chooses _Create_.
   An empty object page appears with the title _New \<object type>_ (here: _New Leave Request_). The footer toolbar contains the finalizing _Create_ action and _Cancel_.
2. After entering all the data, the user chooses _Create_.
   You have the following flow options, depending on your use case:
   1. The standard flow shows the object in display mode and a message toast.
      If required by the use case, you can also keep the object in edit mode.
   2. If your use case involves creating several objects in succession, you can also navigate back to the list report. The message toast is shown on the list report and an indicator highlights the new item.
3. Choosing _Cancel_ opens a [confirmation popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#cancel-editing) and the user can opt to discard the draft. In this case, the system navigates back to the list report.

### Flexible Column Layout

If your app runs in the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) and the user chooses _Create_ on the object page, the display is as follows:

- The first column shows the updated list report with the focus on the newly created item (as for 2b).
- The second column shows the object page in display mode plus the message toast (as for 2a).

If the user confirms _Cancel_, the second column is closed.

## Edit

> **Information:** If only a few sections are editable, set only these sections to edit mode, or open a dialog for editing. For more information, see [Partial Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-parts-of-an-object).

### Full Screen Layout

You can choose between the following edit flows for the entire page:

- The standard flow is to navigate from a list report to the object details. The object is shown in display mode. Choosing _Edit_ in the header toolbar of the object page opens the object in edit mode.
  See also: [Start editing from object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-simple-objects#start-editing-from-object-page)
  As an alternative, you can open the object directly in edit mode.
- In a list report, the user selects an object and chooses _Edit_ in the list report toolbar. This opens the selected object in edit mode.
  See also: [Start editing from list report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-simple-objects#start-editing-from-list-report)

#### Start editing from object page

1. From the list report, the user navigates to the details of an object.
   The object page features a header toolbar with an _Edit_ button. The title of the page is \<object type> (here: _Leave Request_).
2. The user chooses _Edit_.
   The object page changes to edit mode, showing a footer toolbar containing the finalizing _Save_ action and _Cancel._ The title does not change.
3. After updating the data, the user chooses _Save_.
   You have the following flow options, depending on your use case:
1. The standard flow shows the object in display mode and a message toast.
2. If your use case involves editing several objects in succession, you can also navigate back to the list report. The message toast is shown on the list report and an indicator highlights the updated item.

- Choosing _Cancel_ opens a [confirmation popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#cancel-editing) and the user can opt to discard the changes. The object then switches to display mode. If required by the use case, the system can also navigate back to the list report.

#### Start editing from list report

1. In a list report, the user selects an object and chooses _Edit_.
   The object page features a footer toolbar containing the finalizing _Save_ action and _Cancel._ The title of the page is \<object type> (here: _Leave Request_).
2. After updating the data, the user chooses _Save_.
   You have the following flow options, depending on your use case:
   1. The standard flow shows the object in display mode and a message toast.
   2. If your use case involves editing several objects in succession, you can also navigate back to the list report. The message toast is shown on the list report and an indicator highlights the updated item.
3. Selecting _Cancel_ opens a [confirmation popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#cancel-editing), and the user can opt to discard the changes. The object then switches to display mode. If required by the use case, the system can also navigate back to the list report.

### Flexible Column Layout

If your app runs in the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/), and the user chooses _Save_ on the object page, the display is as follows:

- The first column shows the list report with the focus on the updated object.
- The second column shows the object page in display mode plus the message toast.

If the user confirms _Cancel_, the second column shows the object in display mode.

---

## Global Patterns > Object Handling > Mass Editing

# Object Handling – Mass Edit

> **Information:** For mass edit in SAP S/4HANA, use the [Smart Multi Edit Container](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.ui.comp.smartmultiedit.Container) (SAPUI5 samples). See the [design decision](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-products/sap-s/4hana-only/sap-s-4hana-design-decisions).

## Intro

Mass editing allows users to **simultaneously** change multiple objects that share the same editable properties.

## Usage

### Use mass editing if:

- Users need to change one or more values for multiple objects.
- The objects share the same editable properties, such as _Product Category_ and _Status_.

### Do not use mass editing if:

- The objects do not share any of the same editable properties.

## Components

Mass editing is done in a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) containing [combo boxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) and [select controls](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/).

The select control restricts the user to a predefined set of values. Additionally, the combo box allows the user to enter a custom value.

## Behavior and Interaction

Users will typically select multiple objects from a list or table and press the _Edit_ button. This triggers a modal view dialog containing a select control or combo box for each visible column in the table.

All the existing values are listed alphabetically in the dropdown menu without duplicates. Selecting a value or entering a new one overwrites _all_ the existing values.

In the example below, the user’s task is to make everyone’s salary the same.

**Carousel (full-width)**

The preselected option in the select control or combo field depends on the existing values in the table column:

- If the values are different, < _Keep Values_ >.
- If the values are all identical, that specific value is preselected.
- If a column contains no existing values, the option _< Leave Blank >_ is preselected.

If it’s technically possible, the option _< Clear Values >_ is available in the dropdown list to remove all the values in a column.

If a dialog can be used to enter a new value, the option _< Use Value Help >_ or < _Use Select Dialog_ > will be displayed in the dropdown list.

**> **Information:** **

We are currently working on a detailed end-to-end flow for mass editing, which will include message handling for any
items that can’t be processed. The guidelines will be updated in due course.

## Guidelines

The examples below illustrate how to “translate” controls into their mass editing equivalent.

### Checkbox

#### Control
Select
#### Preset Entries
Mixed choices: _< Keep Values >_
All checked: _Yes_
All unchecked: _No_
### Composite Fields

#### Control
Combo box/Select (depending on use case)
#### Preset Entries
See respective control in the list above.
### Date Picker

#### Control
1. A) Select (if users are only allowed to pick a date
from a predefined list)
List all allowed dates beneath the standard actions.
1. B) Combo box (if users are allowed to pick any date)
Right above the list of dates from the object, offer
another selection
_< Select New Date >_.
2. Dialog with calendar control inside
Selecting a date and clicking OK closes the dialog and
populates the combo box with that date.
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
No values: _< Leave Blank >_
### Input (any characters allowed)

#### Control
Combo box
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
No values: _< Leave Blank >_
### Input (restricted to specific characters, such as numbers)

**Default (col-1)**

#### Control
Combo box
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
No values: _< Leave Blank >_

**> **Hint:** **

In this case, use a combo box even though only certain characters are allowed. This is necessary to make the topmost
entries _< Keep Existing Values >_ and _< Leave Blank >_ work and allow the user to select them via text input.
:message-warning: Be sure to validate the entry when the field loses focus or the user presses the ENTER key.

**Section Metadata**

style

### Input (with value help or select dialog)

#### Control
Combo box (Add _< Use Value Help >_ or _< Use Select Dialog >_ entry to trigger the respective dialog.)
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
No values: _< Leave Blank >_

### Radio Buttons

#### Control
Select
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
No values: _< Leave Blank >_
### Rating Indicator

#### Control
Select
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
No values: _< Leave Blank >_
### Segmented Button

#### Control
Select
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
### Slider

Default (col-1)

#### Control
Combo box / Select
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.

> **Information:** Sliders potentially offer hundreds of values. These should not all be represented in the dropdown. Use a combo box
and try to offer some appropriate presets as shown above and allow the user to enter other values (the user’s input
needs to be validated).
If your slider only has up to 10 steps, you can also use a select control and offer all possible values in the
dropdown.

Section Metadata

style

### Switch

#### Control
Select
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
If you use the semantic switch, make sure you provide suitably
worded options for mass editing, like _On/Off_ or _Yes/No_.
### Toggle Buttons

#### Control
Select
#### Preset Entries
Mixed choices: _< Keep Values >_
Identical choices: Use this choice as preset.
No values: _< Leave Blank >_
> **Warning:** Currently, mass editing is not supported for time selection, since the respective control has not yet been adapted.

### General Guidelines

- Provide mass editing in a dialog after the user selects multiple items from a list or table and presses the _Edit_ button.
- Ensure that the option _< Keep Values >_ is listed before the existing values in the dropdown menu.
- Ensure that the option _< Leave Blank >_ is preselected if a column doesn’t contain any values.
- If it’s technically possible, you can provide the _< Clear Values >_ option in the dropdown list to clear all the values in a column. However, do not make this option available if entering a value is mandatory.
- Include the option _< Use Value Help >_ or _< Use Select Dialog >_ if a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/#usage) or [value help](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/#usage) can be used to pick a new value – just ensure that the previously selected value (or choice) is **restored** to the input field if the user presses _Cancel_ in the value help dialog.
- If your application also allows the creation of objects, try to structure the create and mass edit screens similarly. This reduces the cognitive load for the end users. The same rule applies if your users have an additional SAP Fiori application for creating the object.
- If certain fields belong together semantically (such as _First Name/Last Name_ or _City/ZIP Code_), arrange them in such a way that the user can recognize the connection.

### Special Characters (“<” and “>”)

Always use the entries _< Keep Values >_ and _< Leave Blank >_ as described in this guideline: They must start with “<” followed by a blank space, and end with a blank space followed by “>”.

These two characters have been chosen because they are not usually used in text form in objects.

In the unlikely event that these characters are already used by a customer, replace them with another set of unlikely special characters that are not used by this customer. However, you must still ensure that _< Keep Values >_ and _< Leave Blank >_ stay at the top as the first two entries.

---

## Ui Elements > Busy Handling

# Handling Busy States

## Intro

This article describes how to handle the busy state in SAP Fiori apps in general. You can set a busy indicator locally at control level (for example, on a page or for a button) using a [busy state](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/busy-state/), or set it globally using the [busy dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/busydialog/). In SAP Fiori, the aim is to keep the blocking of UIs to a minimum, and to unblock areas where user interaction is possible. Because response time depends on available bandwidth and server performance, unblocking can take a second or more. In this case, we need to inform the user that the process is ongoing.

## Usage

Busy indicators are used in the following areas:

- Initial page loading
- Dynamic fields and forms (asynchronous loading of fields based on user preselection)
- Lazy loading of content, for example, in lists and tables
- Searching and filtering, for example, lists, tables, and global searches
- Primary actions such as _Save_, _Update_, and 
- Deleting and updating lists or modifying tables
- Partial loading of content

## Setting the Busy State

The challenge here is to decide at what level and when the busy state needs to be set. The options are as follows:

- Show the **entire UI** as busy (including SAP Fiori launchpad [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/)) using a busy dialog
- Set a busy state **at control level** (for example, on a page or for a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/))

To make the right decision, we first need to understand how a page or app is loaded.

The “Manage Products” example below uses a [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/). We will also assume that the necessary data for labels, tables, and so on is loaded asynchronously, and that the mapping is done via binding.

The app is launched from a tile on the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page). The busy indicator is shown until the initial application data is available.

First, the UI description and metadata are loaded. This is the minimum for a basic functional UI. Until this data is available, the app UI needs to be blocked. In this case, we set the busy state from the
flexible column layout control (sap.f.FlexibleColumnLayout).

**Do not use the busy dialog to block the entire UI.** Otherwise, this would also affect the [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/), and the user would not be able to access shell features such as _Sign Out_ or _Search_.
Once the metadata has been loaded, we can partially
unblock the UI where it makes sense.

The busy state is set for the list column and the details
area until the data has been loaded.
Once the data for the list area is available, the busy
state is removed. Because the data for the details area
is loaded asynchronously, its busy state is set
separately.
## Guidelines

- Only use the busy dialog if you do not want to allow the user to use the shell, for example, to navigate to the home page. In some cases, long-running processes require the user to be informed about the result in order to continue, for example, to a second step.
- If multiple busy indicators overlap, the SAPUI5 framework ensures that only the one at the uppermost level is shown.
- Do not use the busy dialog for app or page loading. Set the busy state at app level.

---

## Ui Elements > Collaboration

# Collaboration

## Intro

SAP Jam is the standard collaboration tool in SAP Fiori. There are various ways of integrating SAP Jam into the SAP Fiori experience:

- **Using tiles**: Two tile types are available for use in the SAP Fiori launchpad; one for notifications, and one to navigate to an SAP Jam group.
- **Using the menu option**: You can add the following feature to the share menu in the footer bar of the app: 
- **Using a group feed / timeline**: You can offer SAP Jam collaboration in a social timeline within your app. SAP Jam integration comes out of the box in the [group feed component](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/group-feed-component/), or can be implemented manually for the [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/) control.

> **Information:** \SAP Jam is an enterprise social collaboration software that brings together everything (and everyone) you need to solve problems quickly and drive results. Connects
your customers, partners, and employees with key information and processes in the cloud. [Find out more about SAP Jam here.](http://go.sap.com/product/content-collaboration/enterprise-social-collaboration.html)
## SAP Jam Tiles for SAP Fiori Launchpad

There are two tile types available for use in the SAP Fiori launchpad:
1. The **SAP Jam notifications tile**, which displays the latest notifications and the number of new notifications pending.
2. The **SAP Jam group tile**, which allows the user to navigate directly to a specific SAP Jam group with a single click. Users can assign each of their SAP Jam groups a separate tile on the launchpad.
SAP Jam tiles can be found in the [App Finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder).
## Share in SAP Jam

You can implement this feature using the launchpad footer
toolbar service, which will create the entry _Share in SAP Jam_
on the share menu of the footer toolbar. When the user selects
this entry, the _Share in SAP Jam_ dialog will appear.
The information the user sees in the dialog depends on the use
case of the app. Users must belong to an SAP Jam group to share
content. Users that are not yet assigned to any groups are
first directed to a dialog for creating a group in SAP Jam.
In the use case shown on the right, the user is able to share
information for a specific business object using the _Share in SAP_
Jam function. The dialog shows the user the header information
for the specific business object. The user has the option to
select which SAP Jam groups they would like to share this
object with, to add a note, and finally, to share the business
object with the selected group. Although not shown in this
particular use case, users also have the option of uploading
attachments.
## Discuss in SAP Jam

The _Discuss in SAP Jam_ dialog has been deprecated since
SAPUI5 version 1.34. However, the same functionality can
easily be achieved using the group feed component, which
is described below.
## Group Feed Component

You can use the [group feed component](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/group-feed-component/)
to offer integrated SAP Jam collaboration within an app in the form of a social timeline. The group feed enables users to post comments and reply to
posts created by other users in the specific business context without leaving the app.
The group feed can be used purely for collaboration, or to offer collaboration alongside application-generated content (such as timeline posts driven by
user actions or system events).
The features of the group feed are similar to those offered by the [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/)
control. The main difference is that the group feed component comes with built-in SAP Jam integration. The timeline control is more flexible, but doesn’t
offer any integration with social collaboration platforms out of the box.
## Timeline

If you want to build your own social platform or integrate an existing service other than SAP Jam, you can use the [timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/)
control to offer collaboration features within an app. Like the group feed component, the timeline control shows a series of user-generated or
application-generated entries in chronological order. However, the timeline does not offer integrated social collaboration features out of the
box.
If you are using SAP Jam, we generally recommend using the [group feed component](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/group-feed-component/),
which provides built-in support for SAP Jam. Nevertheless, if you have special requirements that can’t be covered by the group feed component,
or if you need your social timeline to be fully responsive, you can also use the timeline for SAP Jam integration. In this case, you would
need to take care of the platform integration yourself.

---

## Ui Elements > Formatting > Formatting Data Overview

# Formatting Data – Overview
#### sap.ui.core.format

## Intro

SAP Fiori applications are often used in an international context, and therefore need to be designed to adapt to different locales. Consistent rules for data formatting and characteristic data styles make the apps easy to work with, while enabling users to solve seamless workflows with cross-border processes and communication.

## Types

Formatters can be applied to different types of data. SAPUI5 provides formatting capabilities to format dates, time, numbers, and comma-separated lists. It is also important to consider general formatting rules when displaying units of measurement.

### Dates

The SAPUI5 date formatter supports 5 different date formats based on international rules: short, medium, long, full, and relative.
For more information, see [Formatting Dates](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-dates).

### Times

The time formatter supports 3 formats: short, medium, and long. The formatting depends on the locale defined in the browser settings.
For more information, see [Formatting Time](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-time).

### Numbers

The number format depends on the data type (integer, float, currency, or percentage) and the relevant length (short, standard, or long).
For more information, see [Formatting Numbers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-numbers).

### Comma-Separated Lists

Default (col-1)

Comma-separated lists are typically used to show a series of values in a single line. The rendering of
comma-separated lists depends on the locale.

> **Hint:** SAPUI5 provides a [formatter for comma-separated lists](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.core.format.ListFormat). 
**Do not** create comma-separated lists using hard-coded commas. The resulting format will be incorrect in some languages.

Default (col-2)

Section Metadata

style

### Units of Measurement

The formatting for units of measurement depends on the type of unit, the language, and the respective control.
For more information, see [Units of Measurement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/units-of-measurement).

---

## Ui Elements > Formatting > Formatting Dates

# Formatting Dates
#### sap.ui.core.format.DateFormat

## Intro

This article describes the international rules for date formats. The SAPUI5 date formatters will help you to comply with these rules.

## Usage

### Use date formatting if:

- You need to display dates based on the user’s locale settings.
- The application is used in an international context.

## Types

You can use five different types of date formats: **short**, **medium**, **long**, **full**, and **relative**. The formatting and order of the values differ based on the locale settings that have been configured in the browser.

> **Information:** The absolute date formats shown below are based on the Unicode Common Locale Data Repository ([CLDR](http://cldr.unicode.org/)).
Note that when the SAP Fiori app is running on an ABAP web application server, the “short” and “medium” CLDR patterns are
replaced by the patterns defined for the user in the ABAP system.

### Short Format

Dates in the short format are displayed as digits for the day, month, and year. Use the correct formatting to **avoid errors.**

**English (US):** 8/17/23

**Spanish (ES):** 17/8/23

**Chinese (CN):** 23/8/17

**German (DE):** 17.08.23

### Medium Format

In general, you should opt to use the medium date format, which usually shows an abbreviation of the month as text.

**English (US):** Aug 17, 2023

**Spanish (ES):** 17 de ago. de 2023

**Chinese (CN):** 2023年8月17日

**German (DE):** 17.08.2023

### Long Format

Use the long format if you need to display the full names of months. For some languages there may be no difference between the medium and long formats.

**English (US):** August 17, 2023

**Spanish (ES):** 17 de agosto de 2023

**Chinese (CN):** 2023年8月17日

**German (DE):** 17. August 2023

### Full Format

If you need to display the day of the week, use the full date format.

**English (US):** Thursday, August 17, 2023

**Spanish (ES):** jueves, 17 de agosto de 2023

**Chinese (CN):** 2023年8月17日星期四

**German (DE):** Donnerstag, 17. August 2023

### Relative Format

If it suits your use case, such as ongoing events within a period of six days, use the relative format. Relative dates are displayed as text, for example, _today_, _6 days_, and so on.

The default range for relative dates is between -6 and 6 days relative to the current date.

**English (US):** 2 days ago, yesterday, today, tomorrow, in 2 days

**Spanish (ES):** hace dos días, ayer, hoy, mañana, dentro de 2 días

**Chinese (CN):** 2 天前，昨天，今天，明天，2 天后

**German (DE):** vor 2 Tagen, gestern, heute, morgen, in 2 Tagen

## Guidelines

- In general, use the medium date format.
- Use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/) control if dates have to be entered in an input field.

### Date Intervals

If you need to display date intervals, use an en dash “–” (not a minus sign) as a delimiter between the dates.

For example, Feb 16, 2016 – Feb 18, 2016

### Object List Item and Object Header

[Object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) and [object header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-header/) attributes should be formatted with the long type. If space is at a premium, for example, if attributes consist of a label and a date, use the short date format.

---

## Ui Elements > Formatting > Formatting Numbers

# Formatting Numbers
#### sap.ui.core.format.NumberFormat

## Intro

This article describes the international rules for number formats. The SAPUI5 number formatters will help you to comply with these rules.

## Usage

### Use number formatting if:

- You need to display numbers based on the user’s locale settings.

### Do not use number formatting if:

- You need to display IDs.
- You need to display telephone numbers.

## Types

You can use four different data types for numbers: **integer**, **float**, **currency**, and **percentage**. Each data type can be formatted using a **short**, **standard**, or **long** format.

### Integer

Use integer if no decimal places are required.

#### Short

Integer numbers formatted using the short form are truncated after three digits. When you use the short form, the units are shown as an abbreviation, such as K (thousand), M (million), or B (billion).

**Number to format:** 1567    | **Number to format:** 1567000 | **Number to format:** 1567000000
**United States (US):** 1.57K | **United States (US):** 1.57M | **United States (US):** 1.57B
**Germany (DE):** 1.567       | **Germany (DE):** 1,57 Mio.   | **Germany (DE):** 1,57 Mrd.
**China (CN):** 1,567         | **China (CN):** 157万          | **China (CN):** 15.7亿
**India (IN):** 1.57 हज़ार    | **India (IN):** 15.7 लाख      | **India (IN):** 1.57 अ॰

#### Standard

In general, use standard format. When you use standard format, integer numbers are displayed in full.

**Number to format:** 10000000

**United States (US):** 10,000,000

**Germany (DE):** 10.000.000

**China (CN):** 10,000,000

**India (IN):** 1,00,00,000

#### Long

Integer numbers formatted using the long form are truncated after three digits. The units are shown as full text, such as _thousand_, _million_, and so on.

**Number to format:** 1567            | **Number to format:** 1567000        | **Number to format:** 1567000000
**United States (US):** 1.57 thousand | **United States (US):** 1.57 million | **United States (US):** 1.57 billion
**Germany (DE):** 1,57 Tausend        | **Germany (DE):** 1,57 Millionen     | **Germany (DE):** 1,57 Milliarden
**China (CN):** 1,567                 | **China (CN):** 157万                 | **China (CN):** 15.7亿
**India (IN):** 1.57 हज़ार            | **India (IN):** 15.7 लाख             | **India (IN):** 1.57 अरब

### Float

If you want to show decimal places, use float. The decimal places beyond the defined number of digits are truncated. If the minimum number of decimal digits is not restricted, only the trailing zeros are truncated, which could lead to very large numbers.

#### Short

Float numbers using the short form are displayed entirely without truncation of the trailing zeros. The units are displayed as an abbreviation, such as K (thousands), M (million), or B (Billion).

**Number to format:** 1590.5  | **Number to format:** 1590000.5 | **Number to format:** 1590000000.5
**United States (US):** 1.59K | **United States (US):** 1.59M   | **United States (US):** 1.59B
**Germany (DE):** 1.590,5     | **Germany (DE):** 1,59 Mio.     | **Germany (DE):** 1,59 Mrd.
**China (CN):** 1,590.5       | **China (CN):** 159万            | **China (CN):** 15.9亿
**India (IN):** 1.59 हज़ार    | **India (IN):** 15.9 लाख        | **India (IN):** 1.59 अ॰

#### Standard

In general, use the standard format. Numbers using the standard format are displayed in full.

**Number to format:** 1590000.99

**United States (US):** 1,590,000.99

**Germany (DE):** 1.590.000,99

**China (CN):** 1,590,000.99

**India (IN):** 15,90,000.99

#### Long

Use the long format to show units as full text, such as _thousands_, _million_, and so on.

**Number to format:** 1590.5         | **Number to format:** 1590000.5     | **Number to format:** 1590000000.5
**United States (US):** 1.6 thousand | **United States (US):** 1.6 million | **United States (US):** 1.6 billion
**Germany (DE):** 1,6 Tausend        | **Germany (DE):** 1,6 Millionen     | **Germany (DE):** 1,6 Milliarden
**China (CN):** 1,590.5              | **China (CN):** 159万                | **China (CN):** 16亿
**India (IN):** 1.6 हज़ार            | **India (IN):** 16 लाख              | **India (IN):** 1.6 अरब

### Currency

If you want to show currencies, use the currency formatter. Most currencies have two decimal places, although some need three digits after the decimal point, such as the Tunisian dinar. The currency formatter takes this into account. Currency amounts are rounded down automatically.

**Short format** TND 150مليو

**Standard format** TND 150,000,000.990

**Long format** TND 150 مليون

#### Short

Currency amounts that are greater than 1,000 and use the short format are abbreviated.

**Number to format:** 15000.99     | **Number to format:** 15000000.99  | **Number to format:** 15000000000.99
**United States (US):** EUR 15.00K | **United States (US):** EUR 15.00M | **United States (US):** EUR 15.00B
**Germany (DE):** 15.000,99 EUR    | **Germany (DE):** 15,00 Mio. EUR   | **Germany (DE):** 15,00 Mrd. EUR
**China (CN):** EUR 1.50万          | **China (CN):** EUR 1,500.00万      | **China (CN):** EUR 150.00亿
**India (IN):** EUR 15.00 हज़ार    | **India (IN):** EUR 1.50 क॰        | **India (IN):** EUR 15.00 अ॰

#### Standard

In general, use the standard format. Numbers using the standard format are displayed in full, including the decimal places.

**Number to format:** 15000000.99

**United States (US):** EUR 15,000,000.99

**Germany (DE):** 15.000.000,99 EUR

**China (CN):** EUR 15,000,000.99

**India (IN):** EUR 1,50,00,000.99

#### Long

Use the long format to show units as full text, such as _thousand_, _million_, and so on.

**Number to format:** 15000.99             | **Number to format:** 15000000.99         | **Number to format:** 15000000000.99
**United States (US):** EUR 15.00 thousand | **United States (US):** EUR 15.00 million | **United States (US):** EUR 15.00 billion
**Germany (DE):** 15,00 Tausend EUR        | **Germany (DE):** 15,00 Millionen EUR     | **Germany (DE):** 15,00 Milliarden EUR
**China (CN):** EUR 1.50万                  | **China (CN):** EUR 1,500.00万             | **China (CN):** EUR 150.00亿
**India (IN):** EUR 15.00 हज़ा             | **India (IN):** EUR 1.50 करोड़            | **India (IN):** EUR 15.00 अरब

### Percentage

If you want to show a percentage, use the percentage formatter.

**Please note:** Numbers formatted as a percentage are automatically multiplied by one hundred. This calculation is not shown in the following examples.

##### Short                   | ##### Standard                     | ##### Long
**Number to format:** 246000% | **Number to format:** 246,000,000% | **Number to format:** 246,000,000,000%
**United States (US):** 246K% | **United States (US):** 246,000%   | **United States (US):** 246B%
**Germany (DE):** 246.000 %   | **Germany (DE):** 246 Mio. %       | **Germany (DE):** 246 Mrd. %
**China (CN):** 246,000%      | **China (CN):** 2,460万%            | **China (CN):** 2,460亿%
**India (IN):** 246 हज़ार%    | **India (IN):** 24,600 लाख%        | **India (IN):** 246 अ॰%

## Guidelines

- In general, use the standard format.
- Follow the rules of the corresponding control to format the data appropriately. (For example, show _1.7M_ instead of _1,700,000_ in the [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/).)
- Use float numbers to prevent truncation of decimal places.
- If you need to display amount fields without a value, leave them blank. Do not display a text as _N/A_.
- Always use the correct format according to your language or locale setting to prevent confusion caused by incorrect formatting. (For example, “200,000” is interpreted as “two hundred thousand” in the United States, but “two hundred point zero” in Germany.)
- If you need to display decimal numbers, use float and keep the number of digits after the decimal point to a minimum.
- Use object numbers where possible, for example, to display amounts in [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) and [responsive tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/).

---

## Ui Elements > Formatting > Formatting Time

# Formatting Time
#### sap.ui.core.format.DateFormat

## Intro

This article describes the international rules for time formats. The SAPUI5 time formatters will help you to comply with these rules.

## Usage

### Use time formatting if:

- You need to display time based on the user’s locale settings.

## Types

You can use three different types of time formats: **short**, **medium**, and **long**. The formatting and order of the values differ based on the locale settings that have been configured in the browser.

### Short Format

In the short format, time is displayed to the user in hours and minutes only.

**United States (US):** 11:15 AM

**Germany (DE):** 11:15

**China (CN):** 上午11:15

**Denmark (DK):** 11.15

### Medium Format

If you need to display the seconds, use the medium time format.

**United States (US):** 11:17:57 AM

**Germany (DE):** 11:17:57

**China (CN):** 上午11:17:57

**Denmark (DK):** 11.17.57

### Long Format

If you need to display a time zone, use the long time format.

**United States (US):** 11:19:27 AM GMT+01:00

**Germany (DE):** 11:19:27 GMT+01:00

**China (CN):** GMT+01:00 上午11:19:27

**Denmark (DK):** 11.19.27 GMT+01:00

## Guidelines

- In general, use the short format.
- In general, display information in the user’s timezone.
- Show the timezone only if required by the use case (for example, to indicate the local arrival time of a cross-continental flight).
- Use the correct time format according to your language or locale settings.
  If you have to display a time format as an object attribute, follow the formatting rules for the [object header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-header/) and [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) attribute.

### Durations

If you need to display durations, show every number and unit of measurement according to the rules for [units of measurement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/units-of-measurement). (For example, use long text instead of ISO codes or abbreviations.)

Do                                            | Don't
_Use long text to display durations_          | _Do not use abbreviations when durations have to be displayed_
### Time Intervals

If you need to display time intervals, use an en dash “–” (not a minus sign) as a delimiter between the times.

**United States (US):** 11:29 AM – 2:29 PM

**Germany (DE):** 11:29 – 14:29

**China (CN):** 上午11:29 – 下午2:29

**Denmark (DK):** 11.29 – 14.29

---

## Ui Elements > Formatting > Leading Trailing Blank Removal

# Removing Leading and Trailing White Space
#### How to manage blanks when copying and pasting text into input controls

## Intro

This article explains how to manage leading and trailing white space (blanks) when copying and pasting text into input controls (such as [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/#styles), [text areas](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/), and so on).
Typically, white spaces are not typed manually, but rather appear as a byproduct of copying and pasting content into the input control.
White space can have negative impact to further processing. For example:
- Fields might not be found in an exact search for the visible string.
- It could lead to cluttered text alignment.
- System(s) might distinguish objects “ABC” from “˽ABC” and “ABC˽”, which are visually equal to the user.
- Fields with a fixed string length could risk losing data. For example, an input field with a maximum string length of 10 might receive “˽1234567890” via copying and pasting, but only be able to save “˽123456789” due to length limitations.
In order to avoid such issues, leading and trailing blanks can be automatically removed or trimmed.
## Usage

### Use field trimming if:
- The leading or trailing white space is not needed for
the business process.
- The input fields have uniquely identifying business
objects.
- The input fields have a fixed field length.
space as a formatting tool.

## Guidelines

The system behavior for field trimming should be coherent in all editing applications of a field and in all external interfaces (for example, for importing, system integration, and so on).

---

## Ui Elements > Formatting > Units Of Measurement

# Units of Measurement

## Intro

This article describes the rules for units of measurement.

## Guidelines

In general, use long text to display units of measurements, and do not use abbreviations, such as (ISO) codes.

Translate all units into the right language:

> **Hint:** Use the resource model provided by SAPUI5 to change properties based on the locale settings. (For example, to display
“Stück” instead of “Pieces” when the application is used in Germany.)

Use short text for common units like currency, weight, and length.

Format the numbers according to the rules of the corresponding control:

Do

### Object Number

Use the [object number](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-number/) control where technically possible as it offers a small font for displaying the unit. It also allows the numbers to be displayed in bold, for example, to highlight values on a table row.

### Price per Quantity

If you want to show a price alongside the corresponding quantity in one string, use “/” instead of text. This makes translation easier.

Do

---

## Ui Elements > How To Use Semantic Colors

# Using Semantic and Industry-Specific Colors

## Intro

You can use semantic colors and industry-specific colors to visualize the status or state of business data:

- [Semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/morning-horizon#semantic-colors) denote standard value states (such as good, bad, or warning). Each color has the same basic meaning in all contexts.
- [Industry-specific colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/morning-horizon#indication-colors) reflect the color conventions in a line of business or industry. The meaning of each color depends on the business context.
  In SAPUI5, industry-specific colors are called **indication colors.**

_Object status with industry-specific colors_          | _Object status with semantic colors_          |
Nearly all input controls support semantic colors, while industry-specific colors are only supported by a few UI elements.

For information about the color values for other themes, see [Belize Colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/colors) and [Quartz Light Colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/quartz-light-colors).

## When to Use

### Semantic Colors

Use semantic colors if:
- You want to highlight an important status.
- You want to validate fields using [form field validation](https://www.sap.com/design-system/fiori-design-web/ui-elements/form-field-validation/).
- Your app needs [message handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging).
- You want to use the [value states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states) for a control.

### Industry-Specific Colors

Use industry-specific colors if:
- You want to use a color based on industry conventions
(for example, when the meaning of a color is defined in
an industry standard).

## Semantic Colors

SAP Fiori has five semantic colors, which are associated
with the following predefined value states:

- [Regular](#regular-neutral) (neutral)
- [Good](#good--positive) (positive)
- [Warning](#warning--critical) (critical)
- [Bad](#bad--error) (error)
- [Information](#information) (highlight)
### Using Semantic Colors

Only use a semantic color if you need to convey the meaning (value state) defined for that color. For more information, see [Value States](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states).

#### Regular (neutral)

Use this color as the regular, neutral state of all UI
elements.

#### Good / Positive

This color stands for a good, positive situation, or for
the successful completion of a task.

#### Warning / Critical

This color indicates a critical situation or warning.

#### Bad / Error

Use this color for errors, or to indicate a bad or
negative status or consequence.

#### Information

Use this color for an information state.

#### Semantic Usage

Sometimes components use semantic colors that are **not** linked to a specific value state. For example, some [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) components use lighter semantic colors for semantic actions like “Approve” and “Reject”.

## Industry-Specific Colors

SAP Fiori has two sets with ten generic indication colors each that are intended only for industry-specific use cases. You can associate these colors with a specific meaning in a given industry context (for example, to reflect industry standards).

**Each application must clearly communicate the meaning of each color**.

_Object status with five industry-specific colors_          | _Object status with three industry-specific colors_          |
In addition to using a color, you must also **provide a text**, such as an [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status). All colors require a corresponding descriptive text for accessibility purposes.

The indication color palette is supported exclusively by [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) and the [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status).

### Using Industry-Specific Colors

There is no predefined meaning for the individual colors in the generic palette. If you want to use one or several colors from the industry-specific color palette in your application, proceed as follows:

- **Define the meaning for each color** you want to use.
- Whenever you use a color, provide an **additional text indicator** (such as an [object status](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/#object-status)) to ensure that the text is clear and accessible.
- Once you have defined the meaning for a color, **use the color/meaning** **consistently** within your application.

#### Color Overlap

By default, some colors are the same in the semantic palette and the industry-specific color palette (such as red, orange, green, and blue). This is intended. However, the two color palettes can be themed independently, which means that end users might not see the same colors in both.

#### No Palette Mix

Some UI elements support both the semantic color palette and the industry-specific color palette. However, you can only use one color palette at a time. It is not possible to mix different colors from both palettes.

#### Color Hierarchy

If a UI element would have multiple semantic or
industry-specific color statuses at the same time, the
control may need to determine an “overall color” at
first.
In this case, the overall color is based on the color
hierarchy: colors higher up in the hierarchy take
precedence over those lower down. Note that there is only
one hierarchy for both semantic colors and
industry-specific colors.
## Styles

The semantic colors and industry-specific colors are [themeable](https://www.sap.com/design-system/fiori-design-web/foundations/visual/theming).

---

## Ui Elements > Tables > Overview Table Personalization

# Table Personalization (Overview)

## Intro

Table personalization can be used to modify the display and settings of a table.

It is a UI pattern that is used to change one or more of the following attributes:

- Visibility of columns
- Order of columns
- Sorting
- Grouping
- Filtering

Table personalization can be applied to [simple](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/tables/overview-table-personalization#simple_table_personalization) tables (up to about 20 columns) and [complex](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/tables/overview-table-personalization#complex_table_personalization) tables (more than about 20 columns) using different controls.

## Usage

### Use the view settings dialog if:

- The user is able to personalize fewer than about 20 columns.
- A combination of sorting, filtering, and grouping is needed.

### Use the table personalization dialog if:

- The user is able to personalize fewer than about 20 columns.
- Columns need to be shown/hidden and reordered.

### Use the view settings dialog AND the table personalization dialog if:

- The user wants to personalize fewer than about 20 columns.
- A combination of show/hide and one other function is needed.

### Use the P13n dialog if:

- You are using an [analytical table (ALV)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/).
- The user is able to personalize more than about 20 columns.
- Complex queries have to be built for the respective table.

### Do not use table personalization at all if:

- The table has very few columns and rows.
- A very complex filter is needed. In this case, consider using a [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) instead of the filter tab.

## Types

### Simple Table Personalization

#### Table Personalization Dialog

All table personalization dialogs are opened via the _Settings_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the right-hand side of the [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/).
The [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/) can show/hide and reorder columns.
#### Hide/Show
To show or hide columns, the user only needs to select or deselect the [checkboxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) of the respective list item. Alternatively, the user can select all the items at once.
#### Reorder
Two [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on the left-hand side enable a selected column to be moved up or down.
The user confirms the dialog to apply the options to the table.
For more information, see [table personalization dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-personalization-dialog/).
### View Settings Dialog

The sort, filter, and group features can all be applied to a table simultaneously.

#### Sort

The first tab in the [view settings dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/view-settings-dialog/) is the sort feature, which allows the table content to be sorted according to the chosen attribute.

The dialog offers two sort features:

- The first group sorts the table by a general ascending or descending order.
- The second group lets the user choose an attribute that fits either a column or part of a column since there are also columns that contain more than one data point.

#### Filter

The second tab in the view settings dialog is the filter feature, which can offer a single filter selection list or a category list. The category list provides an overview and guides the user to detailed filter selection lists via drilldown. The options available are single selection, multiselection, a category list, a predefined list, and a custom filter.

#### Group

The third tab in the view settings dialog is the group feature, which also offers two groups of attributes:

- The first group offers a general ascending or descending order that controls the order in which the defined groups appear.
- The second group offers attributes with which to group the corresponding data in the table.

_View settings dialog – Sort tab_          | _View settings dialog – Filter tab_          | _View settings dialog – Group tab_

### Complex Table Personalization

#### P13n Dialog

The [P13n Dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/p13n-dialog-popup/) is the most complex personalization option for tables. It is used if none of the other options are sufficient. Like the view settings dialog, it can combine any of the tabs available. By allowing inclusion and exclusion filters, as well as several group options (for some tables only), it can form more complex queries than the other options.

It can also be used for [smart chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-chart/).

#### Columns
The P13n dialog offers the most options for changing the
table columns that are shown and the order in which they
are displayed.
It can show/hide a column and alter the order of the
columns.
#### Sort
It also allows the user to sort the table content
according to the columns that are chosen and in a
specific order.
For more complex sorting needs, a new line is
automatically added as soon as a column is selected.
#### Filter
A filter option allows the user to filter the table information according to specific filter criteria, which can be included or excluded in
the relevant section of the filter.
Each filter criterion consists of a column, an operator (depending on the data type of the column), and a value by which the selected column
is filtered.
For more complex cases, the user can add filters by clicking the _Add_ button (_Add Filter_), and remove them by clicking the :decline: button (_Remove Filter_) at the end of each filter item.
#### Group
The _Group_ tab enables the user to group the table data by one or more columns.
For more complex grouping scenarios, a new line is automatically added as soon as a column is selected (only available for the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/)).

---

## Ui Elements > Tables > Table Overview

# Table Overview
#### sap.m.Table

## Intro

A table contains a set of line items, each displayed as a row that’s divided into columns. Line items can contain data of any kind, but also interactive controls, for example, for editing the data, navigating, or triggering actions relating to the line item.

To display data in tabular form, several table controls are provided. They belong to two groups that each share a consistent feature set:

- Fully responsive tables are the responsive table, list, and tree.
  Use responsive tables to display a moderate amount of data. They can handle moderate amounts of data when the data is of average complexity, for example 200 items. They can handle more items when the data is less complex and fewer when the data is more complex.
- Desktop-centric tables are the analytical table, grid table, and tree table. They are optimized for handling a large data sets, but not [fully responsive](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/#Responsiveness).

## Usage

### Use the responsive table if:

- You need a table to display a moderate amount of data. When your data is of average complexity, the responsive table can handle up to 200 items. However, more complex data lowers the limit, and less complex data raises it. Note that the limit is not on the number of items in the database or in the filtered results, but the volume of **data loaded at any point**. Factors that influence the exact limit include:
  - The number of loaded rows in the table
  - The number of displayed columns
  - The complexity of the cell content (for example, simple text vs. complex charts)
  - Other elements on the page (for example, multiple pages in a flexible column layout, or several tables/elements with more complex rendering on the page)
  - The browser used
- The table content should be flexible and visually appealing. The responsive table offers the most flexibility for its content because all SAPUI5 controls, and even multiple controls, can be used. In addition, different rows can be based on different item templates.
- The users focus on line items, not on individual cells.
- A main use case involves selecting one or more items, and users need details to select them correctly.
- Line items are independent of each other and no operation across columns is needed.
- You want to have only one implementation for all devices. Make sure you adapt the responsive table design to offer the best solution for mobile devices.

For more information, see the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) control.

### Use the list if:
- You want to display a simple dataset.
- A table would be too complex.
- A list of actions is to be displayed.
- Simple two-level hierarchies are required (by using grouping or navigation).
- The main use case involves selecting one of several items based on only a few details.
- You require a list for a list-detail scenario using the [flexible column layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/).
For more information, see the [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) control.
### Use the grid table if:

- You need a table to display a large amount of complex data. The grid table is optimized for scenarios that require large amounts of complex data to be loaded to the table. The number of items in the database or the filtered results are irrelevant.
- The cell level and the spatial relationship between cells are more important than the line item, such as if users need to recognize patterns in the data, like in waterfall charts.
- Comparing items is a major use case. The grid table layout remains stable irrespective of the screen width. In addition, a cell only ever contains one control.
- The sequence of the items in the table is important.
- Your use case is for tasks performed on desktop and tablet devices.

For more information, see the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/).

### Use the tree table if:
- Data needs to be displayed in a hierarchical manner.
For more information see the [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/).

## Responsiveness

### Fully Responsive Tables

The fully responsive tables adjust their appearance to the to the screen size so you can use it on all devices.

Make sure you design the best responsive table solution for the tasks performed on each device type. Sometimes, a solution without a table is more useful and useable for mobile devices.

### Desktop-Centric Tables

The desktop-centric tables are not fully responsive, but available for only desktops and tablets, and they support touch interactions.

For mobile use cases, you need to:​

- Create a new Fiori application with reduced complexity, not an exact match of the desktop application.​
- With the new application, address the most important use cases for users in a mobile context. The responsive controls ([responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/category-navigation/), [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) or [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/),) or a relevant control for your use case (for example a [chart](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) or the [category navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) pattern) may suffice.

## Types

### Fully Responsive Tables

> **Guideline:** Always consider ways to reduce the amount of data loaded in the responsive table with, for example, filters,
graphics, aggregation of information, and navigation.
Keep in mind that you should use the responsive table only to display moderate amounts of data, including factors
like number of items and content complexity.

#### Responsive Table (sap.m.Table)

Based on the [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) provides:
- An optimized view of a line item at a glance without any horizontal scrolling, regardless of the screen width.
- Full flexibility for table content:
- Any SAPUI5 control can be used in a cell, including [micro charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/) and [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/).
- Using layout containers, such as a [grid layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/), allows more than one control to be used in a cell. Consequently, the cell shows more than one data point.
- Templates with multiple rows are supported, so different items can have different layouts. For example, this can be used to show editable items and read-only items in the same table without switching modes. In this case, the editable items could have a completely different layout than
the read-only items.
- Items with different heights are supported. This allows for more dynamic content in cells, for example, to show lists or use text controls that wrap instead of truncate.
- Smooth scrolling. This is done by rendering all items on the application background. Thus, the [responsive table](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/grid-layout/) does not have its own scrollbar but uses the scrollbar for the whole page.
- A very lightweight design.
- Touch interaction support.
#### List (sap.m.List)

The [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) is the basis for the [responsive table](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/grid-layout/). It should be used whenever a table is too complex.
The [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) provides:
- Full flexibility in regards to its content:
- There are various specializations for specific list types.
- With a custom list item, all SAPUI5 controls can be used inside a list. Using layout containers allows more than one control to be used in a custom list item.
- Templates with multiple rows are supported, so different items can be shown in the same list.
- Items with different heights are supported.
- Smooth scrolling. This is done by rendering all items on the application background. Thus, the list doesn’t have its own scrollbar but uses the scrollbar for the entire page.
- A very lean and lightweight design.
- Touch interaction support.
#### Tree (sap.m.Tree)

The [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/) is based on the [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/). It should be used whenever a hierarchical view is needed, but a [tree table](https://wiki.one.int.sap/wiki/display/visualcore/Table\+\(Horizon\)\+-\+Unused\+space\+in\+Tables) is too complex.
The [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) provides:
- A standard tree item that provides an icon, a text (that wraps), and a counter.
- Support for items with different heights.
- Smooth scrolling. This is done by rendering all items on the application background. Thus, the [tree](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/tables/table-overview) doesn’t have its own scrollbar, but uses the scrollbar for the entire page.
- A very lean and lightweight design.
- Touch interaction support.
### Desktop-Centric Tables

The following tables belong to the desktop-centric table group:

- [Grid table](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/): This is the most basic table in this group.
- [Analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/): This provides the following features on top of the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/):
  - Grouping by several levels.
  - Automatic calculation of grand totals for a column and subtotals per group level.
- [Tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/): This provides a hierarchical view of the items.

Table

The desktop-centric tables have the following
**limitations**
:
- Content layout is less flexible:
- The [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/)
supports only certain controls, mainly for displaying text or getting single-line text input from users. For example, you cannot add [micro charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/).
- Only one control can be added per cell.
- It supports only single-row templates.
- All items need to have the same height.
- Vertical scrolling is not smooth. For performance reasons, the content is not really scrolled but exchanged.

#### Grid Table (sap.ui.table.Table)

The [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) provides:
- An optimized way to show large amounts of data. It supports an unlimited number of rows. It also supports a very condensed
display of line items on non-touch devices, thus allowing more rows to be displayed on the same screen property.
- Fixed control height, thus supporting horizontal and vertical scrolling (“viewport scrolling”). However, this also means that
there are several vertical scrollbars on the screen for the page and table, which might be cumbersome on smaller screens.
- Touch interaction supported.
#### Analytical Table (sap.ui.table.AnalyticalTable)

Default (col-1)

The [analytical table](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/) is based on the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/micro-chart/) and is therefore quite similar to it.
In addition to the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/), the [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) provides:
- Multilevel grouping
- Display of grand totals per column and subtotals per group

> **Hint:** The [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree/) needs analytical binding.

Default (col-2)

Section Metadata

style

#### Tree (sap.m.Tree)

The [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) is based on the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) and is therefore quite similar to it.
In addition to the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/), the [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/) provides:
- One hierarchical column

---

## Ui Elements > Ui Element States

# UI Element States

## Overview

Using the correct state or combination of states for a UI element helps users to recognize possible options and see where they need to take action.

Default (col-1)

Depending on the UI element, different types of state are supported:
- Control states
- Value states
- Visual states
- Additional states
The table shows the possible states for each type.

Table (col-2)

Control States                                                                                                                                                                     | Value States                                                                                                                                                               | Visual States                                                                                                                                                       | Additional States

[Enabled](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#enabled)\                | [None](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#none)\              | [Regular](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#regular)\ | [Focused](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#focused)
[Disabled](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#disabled)\              | [Error](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#error)\            | [Hovered](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#hovered)\ | [Selected](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#selected)
[Hidden](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#hidden)\                  | [Warning](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#warning)\        | [Pressed](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#pressed)  | [Required](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#required)
[Read only](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#read-only)\            | [Success](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#success)\
[Display only](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#display-only)\      | [Information](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#information)
[Value help only](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/ui-element-states#value-help-only) |
Default (col-2)

Section Metadata

style

## Control States

A UI element can have only one control state at any given
time.
### Enabled

Default (col-1)

“Enabled” is the default state for all UI elements. The UI element is focusable, visible, and – if applicable –
editable. The value of the UI element is easy to recognize.

> **Hint:** To achieve the enabled state for input controls, set the “editable” property to “true”.

Default (col-2)

Section Metadata

style

#### Use the “enabled” state if:

- A UI element can currently be used.
- A UI element cannot currently be used, but disabling it is not an option because users might not know how to enable it. In this case, keep the UI element enabled and provide a message if it is used incorrectly.
  _Example_: Enable a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) even if the corresponding action can only be performed if a setting is made on another [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) or in a completely different subsection on the same [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/).
- A UI element is a [finalizing action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement), such as _Save_, _Accept_, _OK_, or _Cancel_. Finalizing actions are placed on the [footer toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/footer-toolbar/) of a [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) or [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/).
- A [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on a [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) does not depend on items in the table being selected.
  _Examples: Column Settings_, _Sort_, _Filter_, _Full Screen_, 
- A [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on a [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) depends on items in the table being selected, and one or more of the items currently selected fulfills the requirements for enabling the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/).
  _Example:_ Enable _Delete_ on a table toolbar even if the user can delete only some of the items in the current selection.
- An action is [global](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#global-actions), such as _Share_ or _Print_.

#### Do not use the “enabled” state if:

- A UI element cannot currently be used and it would be obvious how enable it. Disable it instead.
- A UI element cannot be used at all. Hide it instead.
- A [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on a [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) depends on items in the table being selected, and none of the items currently selected fulfills the requirements for enabling the [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/). Disable the button instead.

For more information on enabling actions in a table toolbar, see: [Enabling/Disabling Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).

### Disabled

Disabled UI elements are visible, but not focusable or
editable. Depending on the theme, the value of the UI
element might not be recognizable.

#### Use the “disabled” state if:

- A UI element cannot currently be used, and it is obvious how enable it.
  _Example:_
  The user must click a checkbox to add a value in an input field. The input field is placed directly next to or directly below the corresponding checkbox. Disable the input field if the checkbox is not selected, and enable it as soon as the checkbox is selected.
- A [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on a [table toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-bar/) depends on items in the table being selected, and the current selection does not include suitable items.
- Disable _Copy_ if nothing is selected.
- Disable _Compare_ if fewer than two suitable items are selected.
- Disable _Delete_ if nothing is selected or if the current selection contains only items that cannot be deleted, such as locked items.

#### Do not use the “disabled” state if:

- The user can never enable the UI element. Hide it instead.
- It would not be clear why a UI element is disabled. In this case, keep the UI element enabled and provide a message if it is used incorrectly.
- The input value of a UI element is relevant, and taken into account if a [finalizing action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) is triggered. In this case, users must also be able to read the value. Use the read-only state instead.

Never disable the checkboxes that are used to select items in a table or list. If an action can’t be executed for some of the selected items, keep the checkbox enabled and display an appropriate message when the action is triggered.

For more information on disabling actions in a table toolbar, see: [Enabling/Disabling Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/processing-multiple-items#enablingdisabling-actions).

### Hidden

Hidden UI elements are not visible, not focusable, and not editable. The UI element doesn’t take up any space. If a UI element is hidden at runtime, the freed space is used by subsequent UI elements.

#### Use the “hidden” state if:

- A UI element can never be used (for example, because the role or group assigned to the user doesn’t include the necessary authorization).
- Hiding the UI element is a meaningful form of responsive behavior.
  _Example:_ A column of a [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) is not needed on phones.
- A UI element is not available in the current mode.
  _Example:_ [Buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) that are only available in [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) should be hidden in display mode.
- A UI element is not available for the current state.
- Hide _Delete_ on a [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) in an undeletable state, such as “sent”.
- Hide _Delete_ as a [line-item action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) for an undeletable item.
- Parts of the UI are changed based on a setting.
  _Example:_ When changing the setting, hide UI elements that are not available for the new setting.

**Do not use the “hidden” state if:**

- A UI element cannot currently be used, but can be enabled by user actions.
  - A selection does not contain deletable items. In this case, disable _Delete_.
  - A [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview) was filtered down and currently doesn’t contain deletable items. In this case, disable _Delete_.

> **Information:** Actions can also be hidden by key users (for example, through runtime authoring).

### Read Only

Read-only UI elements are displayed in [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects), but are currently not editable. The UI element is visible and focusable. The value can be recognized and selected, but not changed.

#### Use the “read only” state if:

- A [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) or a part of it is in [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects), and
  - a UI element is currently not editable or changeable.
  - an input value is relevant and needs to be taken into account when triggering a [finalizing action](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement).
  - an input value must be readable.

#### Do not use the “read only” state if:

- A UI element can never become editable. Use alternatives instead (such as [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) or display only).
- A [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) or part of it is in display mode. Use alternatives instead (such as [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) or display only).

### Display Only

Default (col-1)

The display-only state is used for two cases:
- A UI element is used in [display mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects).
- A UI element is displayed in [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects), but is never editable.
The visualization of display-only UI elements is optimized for reading. The type of UI element does not necessarily need to be recognized. The UI element is not focusable (exception: [links](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/)),
and not editable. Its value is recognizable and shown in full (not truncated). The UI element might also be displayed in a “compressed” format, where the information is displayed differently to the read-only or editable
state.

> **Hint:** The display-only state is available for only a few UI elements. For most UI elements, you can achieve the same result
by replacing them with display elements, such as text.

Default (col-2)

Section Metadata

style

#### Use the “display only” state if:

- A page or part of it is in [display mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects).
- An input value is relevant and needs to be taken into account (for example, it is sent on _Submit_)
- A [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) or part of it is in [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects), and a UI element is never editable (for example, a UI element displaying a generated ID).
- A link cannot be accessed by the user but the link text contains valuable information.
  _Example:_ A link to a sales order object page shows the sales order number as link text. If the user doesn’t have access to the object page, show the sales order number as plain text.

#### Do not use the “display only” state if:

- A [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) or part of it is [editable](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) and a UI element is currently not editable. Use the read-only state instead.
- A link cannot be accessed by the user and the link text doesn’t contain valuable information. Hide the link instead.
  _Example:_ A link to a fact sheet shows the link text _Fact Sheet_ (or _Details_). If the user is not authorized to open the fact sheet, do not show the link at all.

### Value Help Only

If the control state is “value help only”, the UI element is displayed in [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects), and is visible and focusable. The value of the UI element is recognizable. The value can be changed, but only with a [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/).
This state is only available for certain user input elements.

#### Use the “value help only” state if:

- A UI element can currently be used.
- User input is limited to specific values, and you don’t want to let users type in values directly.

#### Do not use the “value help only” state if:

- You want to allow free text entry.
- User input should be limited to specific values, but typing them is faster and more efficient. In this case, work with [selects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/), [combo boxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/), or [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) with suggestions and validation to limit the user input to the permitted values.
- The surrounding page (or part of it) is in display mode.

## Value States

Value states are only available for user input elements. A UI element can have only one value state at any given time. The value states make use of the semantic colors. For more information, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

### None

“None” (same as “Regular”) is the default state. It means
that no value state is applied. Do not change the value
state unless you have a reason to do so.

#### Use the “none” state if:

- There is no reason to use another value state.
- The user input has not yet been validated.
- Validation of the user input was successful, without any issues.
- A [message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) contains non-critical, additional information for users.

#### Do not use the “none” state if:

- User input was validated and a problem occurred. Depending on the severity, use the warning or error state instead.
- A [message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) contains information about a warning or error.

### Error

The error state marks a UI element if a validation fails
with an error. Errors prevent users from continuing their
work.

#### Use the “error state” if:

- Users need to be prevented from finalizing the current [mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-parts-of-an-object) or [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).
- User input failed a validation, and the problem must be fixed before the user can continue.
- A [message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) contains information about an error.

#### Do not use the “error” state if:

- User input was validated successfully. Do not apply a value state at all.
- User input was validated and only minor problems occurred. Users can still finalize the current [mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-simple-objects) or [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/). Use the warning state instead.
- The surrounding page (or part of it) is in display mode.

### Warning

Default (col-1)

The warning state marks a UI element if a validation identifies a minor problem. Users can carry on working, but
might run into an error later on.

> **Hint:** In UI5, the warning state is called “Critical”.

Default (col-2)

Section Metadata

style

#### Use the “warning” state if:

- The current [mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) or [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/) can be finalized, but doing so might lead to an error later on.
- User input was validated and a minor problem occurred. It is possible to continue without fixing the problem, but doing so might lead to an error later on.
- A message contains information about a warning.

#### Do not use the “warning” state if:

- User input was validated successfully. Do not apply a value state at all.
- User input was validated and a major problem occurred. Users must fix the problem before finalizing the current [mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) or [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/). Use the error state instead.
- The surrounding page (or part of it) is in display mode.

### Success

The success state marks a UI element if a validation
succeeded without errors or warnings.

#### Use the “success” state if:

- A [message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) contains information about a process that was finalized without any issues. Users will need this information later on (for example, values that need to be copied to another app).

#### Do not use the “success” state if:

- A process was finalized successfully and a short notification is enough. In this case, use a message toast instead.
- The surrounding page (or part of it) is in display mode.

### Information

The information state marks a UI element to draw
attention to the information it provides.

#### Use the “information” state if:

- You want to draw attention to a control, such as highlighting [intelligent](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/overview/designing-intelligent-systems) [recommendations](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/recommendations).

#### Do not use the “information” state if:

- The surrounding page (or part of it) is in display mode.
- User input was validated successfully. Do not apply a value state at all.
- User input was validated and a major problem occurred. Users must fix the problem before finalizing the current [mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) or [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/). Use the error state instead.

## Visual States

Visual states are handled by the corresponding UI element directly. A UI element can have only one visual state at any given time.

### Regular

A UI element is shown in the regular visual state if the
user is not interacting with it.

### Hovered

The hovered state shows that the cursor of a pointing
device (such as a mouse or pen) is currently placed on a
UI element that is in an enabled, read-only, or
value-help-only state.
The hovered state is not available if the UI element is
used with keyboard and touch devices.

#### Do not use the “hovered” state if:

- You need to provide additional information for a UI element. The hovered state is only available for some interaction devices. When using other devices, the information gets lost.

### Pressed

The pressed state is displayed when a UI element is
activated or remains in an activated state (“toggled”). A
UI element is activated if a user clicks it.

## Additional States

### Focused

The focus determines which UI element receives the user input when the user input itself does not supply positioning information (for example, keyboard input).

Only one UI element can have the focus at any given time.

The focus is changed by activating another UI element with an input device that provides positioning information (mouse, pen, touch). Clicking an area without a focusable UI element removes the focus until another UI element gets the focus through a user interaction.

With a keyboard, the focus is changed as follows:

Table (col-1)

Key(s)

**Tab**

**Shift\+Tab**

**F6**

**Shift\+F6**

**Arrow keys**

Default (col-1)

When you move the focus using the keyboard, the newly-focused element does not get activated (“pressed”).

Default (col-1)

#### Initial Focus Position

Default (col-1)

When opening a new page, dialog or similar element, make sure that the focus is initially placed at a meaningful element. For example:
- At the first focusable element below the [launchpad shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/)
- The first editable field
- The first editable field that requires user input
Or in general: The element that is likely to be the first one used.

Default (col-2)

Section Metadata

style

### Selected

Default (col-1)

The “selected” state shows that the UI element is currently selected. This state is only available for selectable controls, such as [checkboxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/), [radio buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radio-button/), or [items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview).

> **Hint:** Depending on the UI element, the “selected” state could also be named differently (for example, “Checked”).

Default (col-1)

Default (col-2)

Section Metadata

style

### Required

The “required” state for a user input element shows that
users have to provide an input value. If no value is
provided, validation fails.

#### Use the “required” state if:

- A UI element must contain user input.

#### Do not use the “required” state if:

- User input is not mandatory.
- The UI element is not intended for user input, such as a [title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/title/).
- The surrounding page (or part of it) is in [display mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects).

## Guidelines

### Combining States

#### Control States

Use only one control state at any given time. If several control states need to be combined, use the most restrictive state.

List of control states in [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects), from the most restrictive to the least restrictive:

- Hidden
- Disabled
- Display only
- Read only
- Value help only
- Enabled

In [display mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects), use only the following control states:

- Hidden
- Display only
- Enabled (for display controls only)

#### Visual States

Use only one visual state at any given time. If several visual states need to be combined, use the one that requires the most user interaction.

List of visual states, from the most to least user interaction:

- Pressed
- Hovered
- Toggled
- Regular

#### Value States

Use only one value state at any given time. If several value states need to be combined, use the most severe state.

List of value states, from the most severe to the least severe:

- Error
- Warning
- Success
- Information
- None

### Combining Different Types of State

- Hidden and disabled UI elements cannot be combined with any other state.
- Display-only UI elements can be combined with the pressed state (toggle only) and the selected state.
- Read-only UI elements can be combined with pressed state (toggle only) and with the selected state. In addition, read-only elements can be focused.
- Value-help-only UI elements can be combined with any visual states. In addition, they can be required and focused.
- Enabled UI elements can be combined with any visual state, any value state, and any additional state.

---

## Ui Elements > Using Tooltips

# Using Tooltips

## Intro

Tooltips appear next to the mouse pointer when it hovers
over an element that offers a tooltip. Tooltips are shown
only for elements that do not have a label or, in rare
cases, to display additional information.
Since tooltips are handled by the browser, the form of
tooltips depends on the platform, the browser, and the
respective platform and browser versions.
## Usage
### Use a tooltip if:
- You have an element without a [label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/).
- You are showing an icon-only [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/).
- You want to show in-place information within a [map](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/maps/).
- You are showing a button that contains only an icon and a number.
### Do not use a tooltip if:

Default (col-1)

- You want to show the full text for a truncated item. Instead, make more space for the item.

- Text is truncated on a control that doesn’t support wrapping. Instead, show the full content with one click in a popup. See [Wrapping and Truncating Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/wrapping-and-truncating-text#use-truncation-if).
- You don’t want to use a [label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/). You should always use a label.
- You want to offer an explanation or provide help. Instead, use [SAP Companion](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/web-assistant).
- The content of the tooltip would be redundant.
- The corresponding UI element is static, such as layout containers, [labels](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/) or inactive [toolbars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/). Only add tooltips to interactive elements, such as [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) on [toolbars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/).
- On column headers of [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview).
**SAP S/4HANA Only:**
You can opt to offer tooltips for the column headers of tables. This allows users to read the full column header text without resizing.
- To display a shortcut for a button. Use the [corresponding options](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#button-shortcut) instead.

> **Hint:** Short cuts for buttons are added via [sap.ui.core.CommandExecution](https://ui5.sap.com/#/api/sap.ui.core.CommandExecution).

Default (col-2)

Don't

Default (col-3)

Don't

Section Metadata

style

## Responsiveness

Tooltips are usually invoked by a mouseover event, which is why they are limited to desktop devices. Most touch-only devices have no way of showing tooltips.

Because tooltips cannot be displayed on all devices, they should never contain critical information. They should also not contain redundant information.

## Types

### Icon-Only Buttons
Icon-only buttons must have a tooltip to indicate the action the button will trigger. 
### Icon-Only Buttons with Amounts
Icon-only [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) that contain numbers, but no text, must also have a tooltip.

### Maps
Within [maps](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/maps/), different areas and hotspots can show different tooltips to elaborate the current position.

## Guidelines

### Overwriting standard icon tooltips

The icon within an icon-only button usually comes with a standard tooltip. However, this default tooltip contains the technical icon name, which may not be the right term for the icon in your context. Always check all icons and overwrite the default tooltip texts with suitable texts for your specific use case.

Do                                                              | Don't
_Icon with app-specific tooltip (default overwritten)_          | _Icon with standard tooltip (default)_
> **Warning:** Ensure that your tooltips are maintained properly at all times, since they are also invoked for disabled items. Some
browsers even invoke tooltips for keyboard actions, such as tabbing through the links.

---

## Ui Elements > Which Selection Control To Use

# Which Selection Control Should I Use?

## Intro

Selection controls are UI elements that allow the user to pick one or several values or options. Different selection controls are available, which each support dedicated use cases. This article offers guidance on when to use the following selection controls:

- [Combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/)
- [Input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)
- [Select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/)
- [Multi-combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/)
- [Multi-input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/)
- [Select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/)
- [Table select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-select-dialog/)
- [Value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/)

## Selecting a Single Value or Option

To enable users to select a single value or option, display either a [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/), an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/), or a [select control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/). A value is usually a single data point, while an option can consist of several data points, such as product attributes.

### Combo Box                                                                                                                                                                                                        | ### Input Field                                                                                                                                                                                                                                                                                                                                                                                             | ### Select
The combo box allows users to **select one value/option from a predefined list.** It’s also possible to **type in a value or custom value and filter the predefined selection list** (if the application allows it). | The input field allows users to **enter and edit text or numeric values** in one line. To help the user enter a valid value, you can enable the autocomplete suggestion feature or provide a [selection dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/which-selection-control-to-use#supporting-selection-dialogs). | The select control (also known as a
dropdown) is commonly used to **select a
The selection dialog opens when the user clicks the input field icon.                                                                                                                                                                                                                                                                                                                                       | value/option from a predefined list**.

_Input field_                                                                                                                                                                                                                                                                                                                                                                                               | _Select control_

## Selecting Multiple Values or Options

The [multi-combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/) and [multi-input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/) support the selection of multiple single values or options. A value is usually a single data point, while an option can consist of several data points, such as product attributes.

### Multi-Combo Box                                                                                                                                                                                                                                                    | ### Multi-Input Field
Use the multi-combo box if users need to **select multiple values/options from a predefined list**. The values/options in the list have checkboxes that support multi-selection. Users can also **type in a value to filter the list** (if the application allows it). | A multi-input field allows users to **enter more than one value/option** which are are displayed as [tokens](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/token/). You can enable the suggestions feature or provide a [selection dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/best-practices/ui-elements/which-selection-control-to-use#supporting-selection-dialogs) to help users enter a valid value/option.
_Multi-combo box with three selected values_                                                                                                                                                                                                                           | _Multi-input field with three values_
_Focused, opened multi-combo box_                                                                                                                                                                                                                                      | _Multi-input field with three values while typing_

## Supporting Selection Dialogs

There are three selection dialogs: the [select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/), the [table select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/table-select-dialog/), and the [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/). These dialogs enable users to pick one or several values or options from a long list. Selection dialogs are useful when users need more than one data point to identify the “right” value/option, or when they want to search the list to find a particular value/option.
The selection dialogs are **always used in combination** with one of the following controls:
because the product names are very similar, it’s
- **Input field** for selecting one value/option
- **Multi-input field** for selecting more than one value/option
the product release date, help the user to pick the
Users can open the respective selection dialog from within these controls.

### Select Dialog                                   | ### Table Select Dialog                                                                                                                                                                                                   | ### Value Help Dialog
The select dialog enables users to **select one     | The table select dialog enables users to **select one or more values/options from a comprehensive table**. Usually, the table displays multiple attributes or other                                                       | The value help dialog enables users to **find and select single and multiple values/options**. It also allows users to **define conditions and multiple ranges**.
or more values/options from a comprehensive list**. | related information for an item. Making this additional information available for an entry helps users identify the correct value/option.
The select dialog comes with a list of entries
containing a few attributes. It also provides a     | The table select dialog reuses the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/). It also provides a search field to filter the list.
search field to filter the list.                    |                                                                                                                                                                                                                           | _Value help dialog on a mobile device_

## Best Practices

Depending on the number of entries in the selection list, users might need more information to identify the “right” single value/option or multiple values/options.

Use the criteria in the tables below to choose the most suitable selection control according to the number of data points you have for each value/option and the number of entries you have in the selection list.

- [Selecting a single value or option](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#selecting-a-single-value-or-option1)
- [Selecting multiple values or options](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#selecting-multiple-values-or-options1)

### Selecting a Single Value or Option

Table

The user can identify the “right” value/option based                                                             | **2-12** **entries in | **13-200 entries in   | **200-1,000 entries in  | **More than 1,000
on…                                                                                                              | the selection list**  | the selection list**  | the selection list**    | entries in the
|                         | selection list**

…a **single data point**                                                                                         | Select or combo box   | Combo box\            | Input field with        | Input field with
_with validator that  | suggestions and select  | suggestions and value
prohibits custom      | dialog                  | help dialog
values_
…**two** **data points**                                                                                         | Select or combo box\  | Combo box\            | Input field with        | Input field with
_with two-column      | _with validator that  | suggestions and select  | suggestions and value
layout_               | prohibits custom      | dialog                  | help dialog
values_
..**.3 or 4** **data points** with/without an **image**                                                          | Input field with      | Input field with      | Input field with        | Input field with
suggestions and       | suggestions and       | suggestions and select  | suggestions and value
select dialog         | select dialog         | dialog                  | help dialog

…**more than 4 data points** with/without an **image**                                                           | Input field with      | Input field with      | Input field with        | Input field with
suggestions and table | suggestions and table | suggestions and table   | suggestions and value
select dialog         | select dialog         | select dialog           | help dialog

…**several data points** and **option to narrow selection list down** (by defining conditions, selecting ranges) | Input field with      | Input field with      | Input field with        | Input field with
suggestions and value | suggestions and value | suggestions and value   | suggestions and value
help dialog           | help dialog           | help dialog             | help dialog

### Selecting Multiple Values or Options

Table

The user can identify an individual value/option                                                                 | **2-12 entries in the | **13-200 entries in  | **200- 1,000 entries in | **More than 1,000
based on…                                                                                                        | selection list**      | the selection list** | the selection list**    | entries in the
|                         | selection list**

…a **single data point**                                                                                         | Multi-combo box       | Multi-combo box      | Multi-input field with  | Multi-input field
| suggestions and select  | with suggestions and
| dialog                  | value help dialog

…**two** **data points**                                                                                         | Multi-combo box\      | Multi-combo box\     | Multi-input field with  | Multi-input field
_with two-column      | _with two-column     | suggestions and select  | with suggestions and
layout_               | layout_              | dialog                  | value help dialog

…**3 or 4 data points** with/without an **image**                                                                | Multi-input field     | Multi-input field    | Multi-input field with  | Multi-input field
with suggestions and  | with suggestions and | suggestions and select  | with suggestions and
select dialog         | select dialog        | dialog                  | value help dialog

…**more than 4 data points** with/without an **image**                                                           | Multi-input field     | Multi-input field    | Multi-input field with  | Multi-input field
with suggestions and  | with suggestions and | suggestions and table   | with suggestions and
table select dialog   | table select dialog  | select dialog           | value help dialog

…**several data points** and **option to narrow selection list down** (by defining conditions, selecting ranges) | Multi-input field     | Multi-input field    | Multi-input field with  | Multi-input field
with suggestions and  | with suggestions and | suggestions and value   | with suggestions and
value help dialog     | value help dialog    | help dialog             | value help dialog

---