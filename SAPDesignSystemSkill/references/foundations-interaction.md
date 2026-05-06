# SAP Fiori Foundations: Interaction

## Cursors

**Design System Hero**

# Cursors

## Intro

Cursors are graphical elements that show the current position in the software interface. Users can move the cursor and interact with elements on the screen using a mouse, touchpad, or keyboard. The cursor’s visual representation changes, depending on where it is placed. This indicates which mouse interactions are available in the context, such as text selection, click, drag and drop, or resize.

## When to Use

This article provides general guidance on common cursor styles in the SAP Design System and how they are applied in different use case scenarios.

**Top Tips**

- Familiarize yourself with the different cursors and their meanings. Apply them appropriately to ensure intuitive
user interfaces.
- Exceptions to cursor usage guidelines should be carefully considered. Ensure any deviations don't confuse users or
diminish their experience.
- Use cursor styles to indicate possible user interactions clearly.

## General

### Default

The default state of the cursor is platform-dependent. It
is usually displayed as an arrow. The visual
representation may differ, depending on the operating
system.
### Auto

The auto state is the common cursor state, where the
system automatically determines which cursor to display
based on the current context.
#### Examples:
- When hovered over text, the cursor changes to a text
selection cursor.
- When placed over a clickable element, the cursor
changes to a pointer.
### None

This state is used when the cursor needs to be hidden.
For instance, the cursor might disappear while typing to
reduce visual clutter. This is a common scenario in
various text editors.
## Selection

### Text

This cursor appears when a user hovers over text. It
usually indicates that the user is allowed to interact
with text (highlight, copy, insert text, ...).
The cursor direction depends on the text orientation. It
can be used to select horizontal and vertical lines of
text, respectively.
### Crosshair

This cursor is used when users are allowed to select an
area on the screen. This typically occurs when working
with graphical tools (for example, to select part of an
image or chart).
### Pointer

Historically, this cursor was mainly used when hovering
over links. However, it is now used when the mouse cursor
is placed over any type of clickable element. Don’t use
this cursor on non-interactive elements.
## Resize

This cursor is used when users can adjust the size of an element by dragging a side or edge. There are two main
groups of resize cursors based on their direction: unidirectional and bidirectional.

### Column-Resize and Row-Resize

These cursors are used when users can resize columns or
rows in tables. The orientation depends on whether the
resizing is applied to a column or a row:
- **Resize column**: Cursor displays with a vertical beam.
- **Resize row**: Cursor displays with a horizontal beam.
### Move

Use this cursor when users can rearrange elements.
Both Windows and macOS use the same visual representation
for the all-scroll cursor.
## Drag and Drop

### Grab and Grabbing

The grab cursor (open hand) is used to indicate that
users can drag an item. When users “grab” the item by
clicking, the cursor automatically changes to a closed
hand to show that the item is being “held”.
Use this cursor to indicate that the hovered item can be
dragged and repositioned.
### Not Allowed or No Drop

This cursor is used to indicate that dropping an item is
not allowed in the current position.
## Zoom

### Zoom In and Zoom Out

This cursor indicates that users can zoom in or out
within a specific area on the screen, allowing them to
adjust the view to show the desired level of detail.
## Rarely Used Cursors

The following cursors are rarely used, but they can be a good solution in certain situations. Consider whether a
specific cursor style would be beneficial for your use case.

### Copy

This cursor is used to indicate that a copy of the item
will be created after dropping it.
### Alias

This cursor is used to indicate that dragging an item
will create an alias or a shortcut.
### Progress and Wait

“Progress” and “wait” cursors are rarely used in the SAP Design System. For situations where these cursors might be relevant, see the [Busy Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/busy-indicator-web-component/) guideline.

### Help

This cursor is used to indicate that in-app help is
available. The help can either be displayed immediately
(for example, as a tooltip), or require an additional
action to be accessed.
### Context Menu

The context menu cursor is intended to help users discover
context menus. This cursor CSS is available on MacOS, but not
on Windows.
To ensure consistency across different devices and operating
systems, use of this cursor is **not recommended**.
## Additional Information

The visual representation of the cursor depends on the specifics of the operating system (OS), such as macOS or
Windows.
Cursors can be customized at the OS settings level. Personalization options include changing the shape, size, and
color. These alterations might be used to improve the cursor’s visibility and thus enhance accessibility features.

**Metadata**

Title

Description
position within the software interface.

Breadcrumbs

---

## Interaction Design Foundations States

# States - Overview

## Intro

Using the correct state or combination of states for a UI element helps users to recognize possible options and see where they need to take action.

## Types of State

UI elements can have different types of state. Follow the links below to see the guidelines for each state.

Table

State                                                                                                                                             | Description                          | Variants

[Component State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states)     | Determines the interactivity and     | [Enabled](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#enabled)
visibility of the component.         | [Disabled](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#disabled)
[Read Only](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#read-only)
[Hidden](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#hidden)

[Focus State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-focus-states)             | Determines which component receives  | [Focused](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-focus-states#focused)
the user‘s input. The focus state is | [Unfocused](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-focus-states#unfocused)
most important for keyboard
interaction.
[Interaction State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states) | Indicates the current interaction    | [Regular](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states#regular)
state of a component.                | [Hover](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states#hover)
[Down](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states#down)

[Selection State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-selection-states)     | The selection state is applied after | [Selected](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-selection-states#selected)
the user selects the element to      | [Unselected](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-selection-states#unselected)
distinguish it from other elements.  | [Indeterminate](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-selection-states#indeterminate)

[Value State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states)             | Shows the semantic meaning of a UI   | [None](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states#none)
element in a specific use case and   | [Positive](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states#positive)
context.                             | [Negative](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states#negative)
[Critical](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states#critical)
[Information](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states#information)
[Custom](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states#custom)

## Combining States

Certain states can also be combined. For details, see [State Combinations](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-state-combinations).

---

## Overview

# Interaction Design Foundations - Overview

## Intro

The interaction design foundations define how the user interface should behave when users interact with it to complete specific tasks and achieve their goals. Interaction occurs through input devices such as a mouse, keyboard, gestures, or voice commands, and output devices like screens or screen readers.

These foundations are standardized across the SAP Design System and cannot be modified by individual teams. They should serve as a baseline when designing components, patterns, and floorplans, where applicable.

We will continue to build out the foundation guidelines on an ongoing basis.

**Foundations (available)**
The following guidelines are currently available:
following topics:
- [Cursors](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/cursors)
- [Screen Reader](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/screen-reader)
- [States](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/interaction-design-foundations-states)
- [Wrapping and Truncation](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/wrapping-and-truncation)
- Keyboard Support
Read on for a short summary of each one.
- Motion Design
- Scrolling
- Selection
- Timing
- Tooltips

**Foundations (available)**
The following guidelines are currently available:
- [Cursors](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/cursors)
- [States](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/interaction-design-foundations-states)
- [Wrapping and Truncation](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/wrapping-and-truncation)
Read on for a short summary of each one.
## Cursors

Cursors are graphical elements that show the current position in the software interface. The cursor’s visual
representation changes, depending on where it is placed. This indicates which mouse interactions are available in the
context.
For more information, see [Cursors](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/cursors).

## States

States define the appearance and behavior of a UI element based on user interactions or system status. They influence aspects such as interactivity, visibility, and the semantic meaning of a component. Applying the correct state—or combination of states—helps users identify available options and understand
where their input is needed.
UI elements can have different types of states, which may appear individually or combined:
- [Component State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states)
- [Focus State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-focus-states)
- [Interaction State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states)
- [Selection State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-selection-states)
- [Value State](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states)
For more information, see [States Overview](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/interaction-design-foundations-states) and [State Combinations](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-state-combinations).
## Wrapping and Truncation

Wrapping and truncation determine how text behaves when its length exceeds the available space. This responsive behavior is consistent across all
devices and form factors. Various controls utilize wrapping and/or truncation to manage text display.
For more information, see [Wrapping and Truncation](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/wrapping-and-truncation).

---

## Screen Reader

# Screen Reader

## Intro

Every application and UI component should be designed to allow blind and visually impaired users to utilize screen reader announcements for all relevant content.

This foundation concept provides an overview of what is needed to make a UI component accessible to screen readers.

### Key Terms

- **WCAG**: Web Content Accessibility Guidelines
  International standard that explains how to make web content more accessible to people with disabilities.
  For more information, see [WCAG for W3C](https://www.w3.org/WAI/standards-guidelines/wcag/).
- **ARIA**: Accessible Rich Internet Applications Suite
  Defines a way to make Web content and Web applications more accessible to people with disabilities.
  For more information, see the [WAI-ARIA Overview for W3C](https://www.w3.org/WAI/standards-guidelines/aria/).

## Basic Requirements

The following information must be provided for any focusable element:

- **Role**: The element type (such as “button” or “textbox”)
- **Label**: The name of the field
- **Description:** Additional “custom” information
- **State:** The current state of the element (such as “enabled” or “disabled”)
- **Properties:** Additional standardized information

### Reading Order

On the currently **focused** element, screen readers usually provide available information in the following order:

1. Label
2. Role
3. State
4. Description
5. Properties

#### Examples

**Table**
+------------x------------+----x-----+-----x-----+--------x--------+-------x--------+
**Label**               | **Role** | **State** | **Description** | **Properties**

**Never Show Me Again** | Checkbox | Checked   | \-              | \-

**Price**               | Input    | Read-only | EUR / kg        | EUR / kg

## Additional Features

Screen readers usually provide additional features for a better overview or fast navigation:

### Reading Mode

In this mode, screen reader users can access non-focusable elements. Make sure that these elements also provide the necessary information (role, state, label, properties, description).

### Navigation Dialogs

For specific roles (such as form, table, or link), some screen readers can display a list of all instances on the current page. Users can navigate to these items or trigger them directly.

Items are listed by their label.

**> **Guideline:** **

Make sure labels on a page are unique.

**Example**

A page contains five links, each labeled "Details."

- To enhance accessibility and usability, provide meaningful and distinct names for each link, indicating the destination or context they relate to.
- Without unique labels, the dialog list will display the “Details” entry five times, giving the user only a 1 in 5 chance of selecting the correct link.

## Roles

Roles are available for:

- Interactive controls (such as buttons and links)
- Non-interactive controls (such as images, icons, and separators)
- Non-interactive structural areas (such as landmarks)
- ...

A role implies which states and properties can be used.

**> **Guideline:** **

Choose the role based on the semantics, functionality and the anticipated keyboard support for the control, not on
the visuals.

For a list of available roles, see [Roles](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1795-833\&node-type=frame\&t=2IFWiKOTWz4Bb7bW-0) in the screen reader design specification.

## States

States are ARIA attributes that define the current condition of a particular UI element, which can change due to user interaction or automated processes.

**> **Guideline:** **

Assign the states that reflect the current control state according to the state concept.

For a list of available states, see [States](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1795-1481\&t=MJirK8uV9Msmmx9e-1) in the screen reader design specification.

## Properties

ARIA properties are static attributes that define the inherent characteristics or behaviors of an HTML element, making these more accessible. For example, `aria-keyshortcuts` indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.

For a list of available properties, see [Properties](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1795-2034\&t=MJirK8uV9Msmmx9e-1) in the screen reader design specification.

## Labels

ARIA is used to label and describe purposes, as recommended by the Web Content Accessibility Guidelines. For more information, see [ARIA-6](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6) in the [ARIA Techniques for WCAG 2.2](https://www.w3.org/WAI/WCAG22/Techniques/).

A label is a specific identifier or name (= accessible name) given to a particular individual element within a certain role. It provides unique information about the individual element to distinguish it from other elements in the same role.

For more information, see [Labels](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1796-2549\&t=MJirK8uV9Msmmx9e-1) in the screen reader design specification.

## Descriptions

Descriptions are used to provide additional information on an element (such as instructions, format requirements for an input field, tooltips, units of measurement, and custom attributes).

For information on adding descriptions, see [Descriptions](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1796-2549\&t=MJirK8uV9Msmmx9e-1) in the screen reader design specification.

## Building Blocks and Example Patterns

### Building Blocks

Building blocks provide the essential structure needed to define accessible, user-friendly, and efficient components.

- [Disclosure Pattern](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=2203-2471\&t=qaSKFHjbhTwNZd39-4)
- [Hiding Semantics](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1800-353\&t=qaSKFHjbhTwNZd39-4)
- [Inputs with Drop-Down Area](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1800-415\&t=qaSKFHjbhTwNZd39-4)
- [Ranges, Meters, Sliders, Multithumb-Sliders, Spin buttons, Window splitters](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1803-552\&t=qaSKFHjbhTwNZd39-4)
- [Orientation](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1803-636\&t=qaSKFHjbhTwNZd39-4)
- [Current Selected Context](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1803-718\&t=qaSKFHjbhTwNZd39-4)
- [Selection](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1806-344\&t=qaSKFHjbhTwNZd39-4)
- [Composites](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1806-462\&t=qaSKFHjbhTwNZd39-4)
- [Value States](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1806-561\&t=qaSKFHjbhTwNZd39-4)
- [Required User Input](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1809-707\&t=qaSKFHjbhTwNZd39-4)

### Example Patterns

Example patterns are fundamental, well-defined components that serve as a basic setup, designed to be reusable and adaptable across various use case scenarios.

- [Dialogs, Popovers](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1809-921\&t=qaSKFHjbhTwNZd39-4)
- [Menus](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1811-1967\&t=qaSKFHjbhTwNZd39-4)
- [Message Strips](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1832-674\&t=qaSKFHjbhTwNZd39-4)
- [Splitter](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1834-664\&t=qaSKFHjbhTwNZd39-4)
- [Tabs](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1834-743\&t=qaSKFHjbhTwNZd39-4)
- [Forms](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1839-1219\&t=qaSKFHjbhTwNZd39-4)
- [Read-Only Tables](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1855-791\&t=qaSKFHjbhTwNZd39-4)
- [Listbox](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1855-1178\&t=qaSKFHjbhTwNZd39-4)
- [List](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=2263-1914\&t=qaSKFHjbhTwNZd39-4)
- [Trees](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1855-1398\&t=qaSKFHjbhTwNZd39-4)
- [Grid and Table Properties](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1856-1507\&t=qaSKFHjbhTwNZd39-4)
- [Tree Tables](https://www.figma.com/design/R15blpLp4Hbr4TJSZMiFZq/%5BWeb-DS-Foundation%5D-Screen-Reader?node-id=1869-1221\&t=qaSKFHjbhTwNZd39-4)

### More Patterns

#### Primitives

- [Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/)
- [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)
- [Radio](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- [Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)

#### Complex Components

- [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
- [Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)
- [Spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/)
- [Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
- [Alert Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)
- [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
- [Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
- [Feed](https://www.w3.org/WAI/ARIA/apg/patterns/feed/)

#### Structure

- [Landmarks](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/)
- [Structural Roles](https://www.w3.org/WAI/ARIA/apg/practices/structural-roles/)

---

## States > Interaction Foundations Component States

**Design System Hero**

# Component States

## Intro

The component state determines the interactivity and the visibility of the component. A component can have only one component state at any given time. The following component states are available: enabled, disabled, read-only, and hidden.

## Enabled

An enabled component can be interactive and can be used
to perform the action. Usually, this is the default state
for all components. The component is focusable, visible,
and – if applicable – editable.
+----------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------+
When To Use
+----------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------+
Do
Use the enabled state:
- If a component can currently be used.
+----------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------+
Don't
Don’t use the enabled state:
- If a component can’t currently be used.
- If a component can’t be used at all. [Hide it](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#hidden) instead.

## Disabled

A disabled component can’t currently be used. Disabled
components have reduced visibility and aren’t focusable
or editable.

+--------------------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------------------+
When To Use
+--------------------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------------------+
Do
Use the disabled state:
- If a component can’t currently be used, but it’s obvious how to enable it.
+--------------------------------------------------------------------------------------------------x--------------------------------------------------------------------------------------------------+
Don't
Don’t use the disabled state:
- If the user can never enable the component. [Hide it](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#hidden) instead.
- If it wouldn’t be clear why a component is disabled. In this case, keep the component enabled and provide a message if it is used incorrectly.

## Read-Only

Read-only components are displayed in edit mode but
aren’t editable. The component is fully legible and
focusable. The value can be recognized and selected but
not changed.
+---------------------------------------------------x---------------------------------------------------+
When To Use
+---------------------------------------------------x---------------------------------------------------+
Do
Use the read-only state:
- If a page or a part of it is in edit mode, and a component is currently not editable or changeable.
- If an input value must be readable.
+---------------------------------------------------x---------------------------------------------------+
Don't
Don’t use the read-only state:
- If a component can never become editable. Use alternatives instead (such as text or display only).

## Hidden

Hidden components are not visible, not focusable, and not editable. The component doesn’t take up any space.

+----------------------------------------------------------x----------------------------------------------------------+
When To Use
+----------------------------------------------------------x----------------------------------------------------------+
Do
Use the hidden state:
- If a component can never be used (for example, because the role or group assigned to the user doesn’t include the
necessary authorization).
- If hiding the component is a meaningful form of responsive behavior.
Example: A column of a table isn’t needed on phones.
- If the component isn’t available for the current context.
- If parts of the UI are changed based on a setting.
+----------------------------------------------------------x----------------------------------------------------------+
Don't
Don’t use the hidden state:
- If a component can’t currently be used but can be enabled by user actions.

---

## States > Interaction Foundations Focus States

**Design System Hero**

# Focus States

## Intro

Focus states determine which component receives the user’s input when the input doesn’t supply positioning information. The focus state is most important for keyboard users. The following focus states are available: focused and unfocused.

## Focused

The component shows the focus state when it receives user
input. If a keyboard is available, all interactive
elements must provide a focus state.
Only one element can be focused at a time. If another
element is focused, the previously focused element
becomes unfocused.
+--------------------------------------------------------x--------------------------------------------------------+
When To Use
+--------------------------------------------------------x--------------------------------------------------------+
Do
Use the focused state:
- If an element is interactive.
- If a device has a remote control attached that allows users to move the focus (like remote controls for TVs).
+--------------------------------------------------------x--------------------------------------------------------+
Don't
Don’t use the focused state:
- If the component is disabled or hidden.
Exceptions are allowed for a few special cases, such as a disabled menu item.

## Unfocused

The unfocused state is applied to all elements that
aren’t focused.
Button, input – unfocused

---

## States > Interaction Foundations Interaction States

**Design System Hero**

# Interaction States

## Intro

Interaction states are handled by the corresponding component directly. A component can have only one interaction state at any given time. The following interaction states are available: regular, hover, and down.

## Regular

The regular state is the default state. The component is
shown in the regular visual state if the user isn’t
interacting with it. It can also be focusable.

## Hover

The hover state shows that the cursor of a pointing
device is currently placed on a component that is in an
enabled state.
The hover state isn’t available if the component is used
with keyboard and touch devices.
**> **Guideline:** **

The hover state is only available for some devices; touch devices don’t support the hover state. If you use the hover
state to provide additional information (for example, in a tooltip), this information is lost on touch devices.

## Down

The down state is displayed while the user is activating
or triggering the element. The down state is only applied
while the user is clicking and has not yet released the
mouse. After the action has been performed and the user
has released the mouse, the down state is removed.
Down, pressed, or active states are similar in meaning
and are used in different contexts, depending on the
component.

---

## States > Interaction Foundations Selection States

**Design System Hero**

# Selection States

## Intro

The selection state is applied after the user has selected the element. The selected element should be clearly distinguishable from the other elements. The following selection states variants are available: selected, unselected, and indeterminate.

## Selected

The selected state shows that the UI element is currently
selected.
It is only available for selectable components, such as
checkboxes, radio buttons, items, switch, segmented
buttons, toggle button, or tokenizer.
## Unselected

The unselected state is applied when the element is not
selected – the element is in its regular state.
Toggle button, radio button, checkbox, switch –
unselected

## Indeterminate

The indeterminate state is specific to multi-selection
cases. It shows a state where no selection has been made,
or the accumulated state for a list of checkboxes when
only some of them are checked.
+--------------------------------------------------------x---------------------------------------------------------+
When To Use
+--------------------------------------------------------x---------------------------------------------------------+
Do
- If the parent in a tree has a mix of selected and unselected children, show the parent in indeterminate state.
+--------------------------------------------------------x---------------------------------------------------------+
Don't
- Don’t use the intermediate state if the use case requires the element to be either selected or not.

---

## States > Interaction Foundations State Combinations

**Design System Hero**

# State Combinations

## Intro

Some of the states can be used together with other states.

## Permitted Combinations

Enabled components can be combined with the selection
state, value state, and interaction state.
List – enabled, selected, and hover

The focus state can be combined with an interactive
enabled or read-only component. At the same time, you can
use other states like value states, selection states, or
interaction states.
Read-only components can be combined with the down state
(toggle only) and with the selected state.
Checkbox – read-only and selected

## Non-Permitted Combinations

Hidden and disabled components cannot be combined with any other state.

---

## States > Interaction Foundations Value States

**Design System Hero**

# Value States

## Intro

Value states show the semantic meaning of a UI element in a specific use case and context. A UI element can have only one value state at any given time.

By default, the value states are depicted using the standard semantic colors for the respective theme (such as [Morning Horizon](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/morning-horizon#semantic-colors)). The following value states are available: none, positive, negative, warning, information, and custom.

**Note on naming:**

These standard names for the value states are generic. They might not reflect the most appropriate term for the state in the business context, or the technical names used in some existing implementations.

## None

This is the default state of an element. It means that no
semantic or industry-specific meaning is assigned to it.
Input – none
Other names: Neutral
+--------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------+
When To Use
+--------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------+
Do
Use the neutral state:
- Before validation is triggered.
- After successful validation.
- If there is no reason to use another value state.
- If you want to indicate a neutral object status.
- If a message contains non-critical, additional information.
+--------------------------------------------------------------------------------------------------------x---------------------------------------------------------------------------------------------------------+
Don't
Don’t use the neutral state:
- After validation with problems.
- For information messages. In this case, use the [information value state](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states#information).

## Positive

Use this status to convey that the displayed element or
value has a positive meaning for the given use case.
Input – positive
Other names: Success (messaging), Good
+-------------------------------------x-------------------------------------+
When To Use
+-------------------------------------x-------------------------------------+
Do
Use the positive state:
- If an action or validation was successful.
- If a message indicates that a process was finalized without any issues.
+-------------------------------------x-------------------------------------+
Don't
Don’t use the positive state:
- If issues occurred while finalizing a process.
- If issues occurred during validation.

## Negative

This status is used for elements that carry negative
meaning, such as errors. It indicates a bad or negative
status or consequence and prevents users from continuing
their work.
Other names: Error (messaging), Bad
+---------------------------------------------------x---------------------------------------------------+
When To Use
+---------------------------------------------------x---------------------------------------------------+
Do
Use the negative state:
- If users need to be prevented from finalizing the current mode or page.
- If validation for the user input failed and the problem must be fixed before the user can continue.
- If a message contains information about an error.
- If the component carries information that requires the user’s immediate attention.
+---------------------------------------------------x---------------------------------------------------+
Don't
Don’t use the negative state:
- If the user input was validated successfully.
- If the user input was validated and only minor problems occurred.

## Warning

This state identifies a minor problem or warning that the
user should take into consideration. Users can carry on
working but might run into an error later.
Other names: Warning (messaging)
+-------------------------------------------------------x-------------------------------------------------------+
When To Use
+-------------------------------------------------------x-------------------------------------------------------+
Do
Use the critical state:
- If the current content can be finalized but doing so might lead to an error later.
- If the user input was validated and a minor problem occurred. It is possible to continue without fixing the
problem, but doing so might lead to an error later.
- If a message contains information about a warning.
+-------------------------------------------------------x-------------------------------------------------------+
Don't
Don’t use the critical state:
- If the input was validated successfully.
- If the user input was validated and a major problem occurred.

## Information

Depending on the component, this state can be enabled for the following
cases:
- If used with inputs and any other form components, this state can
indicate an **AI suggestion**.
- If used in a list, as a text, or in any type of dialog, it can
indicate an **information message** or **highlighted element**.
+---------------------------------------------------------x----------------------------------------------------------+
When To Use
+---------------------------------------------------------x----------------------------------------------------------+
Do
Use the information state:
- If you need to display an information message.
- If you want to draw attention to a component (for example, to highlight that recommendations are available for a
field).
+---------------------------------------------------------x----------------------------------------------------------+
Don't
Don’t use the information state:
- If the user input was validated successfully.
- If the user input was validated and a major problem occurred.

## Custom

If there is no suitable semantic state, a custom state can be offered. The exact visualization depends on the colors set (custom state) or what is inherited (inherit state).

+--------------------------------------x--------------------------------------+
When To Use
+--------------------------------------x--------------------------------------+
Do
Use the custom state:
- If additional states are required to support a special business use case.
- If the value states required have different semantics or no semantics.
+--------------------------------------x--------------------------------------+
Don't
Don’t use the custom state:
- If one of the value states already provided fits the use case.

## Semantic and Industry-Specific Colors

### Semantic Colors

Semantic colors denote standard value states (such as positive, negative, and warning). Each color has the same basic meaning in all contexts.

### Industry-Specific Colors (Indication Colors)

Industry-specific colors reflect the color conventions in a line of business or industry (technical name: indication colors). The meaning of each color depends on the business context.

To apply the industry-specific colors, you can use the custom state.

---

## Wrapping And Truncation

# Wrapping and Truncation

## Intro

Wrapping and truncation define how text behaves when the length of the text exceeds the available space. The responsive behavior is device-independent and is the same on all form factors. Different controls make use of wrapping and/or truncation. This article provides an overview of best practices.

## Variants

### Wrapping

Wrapping automatically moves text at the end of a line to
a new line to keep the text within a preset space. When a
word no longer fits at the end of a line, either the
whole word shifts down to the next line, or only certain
syllables.
### Truncation

Truncation shortens a word or text by cutting it off.
Excess text is no longer visible. Usually, a truncation
indicator appears at the end of the truncated text (…),
but this depends on the browser support.
### Combination of Wrapping and Truncation

Wrapping and truncation can be combined. For example, a
text might wrap over two lines and then truncate.
## When to Use

Always check the responsive behavior of text, even if the text appears to fit at first glance. Issues often arise when text is translated into another language, or when the text container is resized. Choose the most appropriate text display variant for your use case.

In general, wrapping is the default way to design the responsive behavior of text. Always consider using wrapping unless there are specific requirements otherwise.

Default (col-1)

#### Use wrapping if:
- The information is crucial for the user.
- The user is required to read the full text (for example, in consent forms).
- You are uncertain about how important the text is for the user.
- You want to display numbers in a piece of continuous text.
- The text for a list item is crucial for the user.
- You are displaying a label, object status, link, or title. For these components, use a short, precise text.

> **Guideline:** Although wrapped text may not always provide the best visual design, it is important to prioritize the user
experience when crucial information is involved. By using wrapping, you can ensure that users can access the
information they need without requiring additional interaction.

Default (col-2)

#### Use truncation if:
- The component is designed to save vertical space and only allows one line of text with a limited width (for
example, the title of a toolbar).
- The text contains only secondary information. For example, the text in a table cell could use truncation if the
corresponding column is resizable or uses a custom display concept to provide an additional interaction.

> **Guideline:** If you need to use truncation, provide a way for users to view the full text with a **single interaction**. For more information, see [Displaying Truncated Text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/foundations/interaction/wrapping-and-truncation#displaying-truncated-text).

Section Metadata

style

#### Use a combination of wrapping and truncation if:
- The text is a teaser or serves as an appetizer for a
longer text, such as an article. In this case, you can
define the maximum number of lines shown.
- The component is designed to save vertical space, and
only allows a limited number of lines, with a limited
width (for example, tiles with two lines for the title).
## Displaying Truncated Text

It is important to provide users with a quick way to see the full text with a single interaction. This can be achieved with the existing interactions for a component, via navigation to a detailed view, or by implementing a custom display concept.

### Built-In Display Mechanism

The component already has an interaction mechanism that
reveals the full text.

### Display via Detail View

The full text becomes visible once the user navigates to
the detail view in the user flow. Typically, the user
navigates to a different screen or opens a popover or
dialog.

### Custom Display Concept: Expandable Text

If the component has no built-in mechanism or navigation option to display the full text, implement a custom solution using **expandable text.**

Expandable text allows the user to display the full text with a single interaction on an additional element, such as a link. The text can be expanded in place or be displayed in a separate popover.

**Example 1: Expanded text in place**

text_

**> **Guideline:** **

Ensure that users can interact with the truncated text on interactive components, not only using a mouse, but also with a keyboard or touchscreen.
The order of tabs on a tab bar must always remain consistent. The tab order should not be affected by truncation or by a custom solution to display the full tab text.

### Usage Overview

Table **(col-width-20-40-40)**

Pattern                            | Use Case                              | Guideline

Built-in display mechanism         | The truncated text is located inside  | This is an automatic display mechanism. No other solution is needed when the full text is readily available via a single interaction within the component.
Display via detail view            | The truncated text is part of an      | This optional display mechanism needs to be evaluated by the application team to determine if it sufficiently meets the needs of their users based on specific use cases.
interactive element, and the full
text is available after navigating to | No other solution is required if:
the detail view in the user flow. For
example, the full text can be viewed  | - The full text is readily available through a single interaction.
on a detail dialog or on a follow-on
page.                                 | However, consider using an additional custom display concept if:
- The full text is not visible directly in detail view.
- Navigating to the detail view to display the full text would disrupt the user’s flow.

Custom display concept: expandable | There is no built-in mechanism or     | Allow users to expand the truncated text with a single click on an additional element, such as a text link.
text                               | navigation option to display the full
text.                                 | This custom solution must be implemented by the application team.
or
The truncated text is a longer text.

---