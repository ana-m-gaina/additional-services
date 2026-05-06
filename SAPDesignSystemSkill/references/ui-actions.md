# SAP Fiori UI Elements: Actions

This reference covers the following UI components:

- [Action List Item](#action-list-item)
- [Action Sheet](#action-sheet)
- [Ai Button](#ai-button)
- [Button](#button)
- [Button Web Component](#button-web-component)
- [Link](#link)
- [Link Web Component](#link-web-component)
- [Menu Button Web Component](#menu-button-web-component)
- [Radio Button](#radio-button)
- [Radio Button Web Component](#radio-button-web-component)
- [Segmented Button Web Component](#segmented-button-web-component)
- [Smart Link](#smart-link)
- [Split Button Web Component](#split-button-web-component)
- [Toggle Button Web Component](#toggle-button-web-component)

---

## action-list-item

The action list item control lets the user trigger actions directly from a [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/). It is used mainly within [dialog boxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) and [popovers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/).
chart with one and three related actions.

## Behavior and Interaction

List item behavior and interaction is similar for all list item variants and is therefore described in the [list overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) article.

---

## action-sheet

An action sheet consists of a list of options a user can
select from to complete an action. Actions can be
clustered if there is not enough space on the screen.

> **Warning:** This control has a number of limitations, which were addressed with the introduction of the [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1). Use the menu button instead of the action sheet whenever possible.

## Usage

### Use the action sheet if:

- You need an option that provides more than one action.
- It is really important that the user stays in context on a phone.
- You only have a small number of actions.

### Do not use the action sheet if:

- The menu provides only one option. In this case, consider using a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) instead.
- You need to show a hierarchical menu. In this case, use the [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1) instead.
- Your users would benefit more from a [split button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1), which offers an easy-to-access default action, with the option to include additional actions.

## Responsiveness

The action sheet is fully responsive. On smartphones, the actions are displayed as a list inside a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/). On tablets and desktop devices, the actions are displayed in a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/).

## Layout

All elements in the action sheet are left-aligned. Actions are always arranged in order of importance, from top to bottom. The _Cancel_ button uses a negative button type and is centered to differentiate it from the other app actions. The cursor/focus area for buttons within the action spans the full width of the action sheet (which in turn depends on the longest button).

## Components

The following UI elements can be placed in the action sheet:

- [Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/)
- [Icon](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/iconography/icons)

## Behavior and Interaction

### Clicking

A click on the overflow icon (“…”) opens either a popover or a dialog. The user can trigger an action or close the action sheet by clicking anywhere on the screen. On a smartphone, the dialog can be closed only with the _Cancel_ button.

If the user triggers an action, the action sheet closes automatically and the system provides a [message toast](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/).

+:----------------------------------:+

Default (col-1)

Default (col-2)

Section Metadata

style

## Guidelines
- Never use only icons in the action sheet. Display text
only or a combination of icon and text.
- On smartphones, provide a _Cancel_ button to enable the
user to close the dialog without triggering an action.
- Avoid scrolling in action sheets. If you include too
many buttons in an action sheet, users have to scroll to
see all the actions in the list. Not only does it take
users longer to distinguish between actions, but they also
find it difficult to scroll without clicking a button by
mistake.

---

## ai-button

AI buttons allow users to trigger AI-powered actions. Refer to the  [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/) guidance for examples.
*AI button variants*

## When to Use

Do
Use the AI button:
- To enable users to access AI-powered functions.
- To group AI actions related to one specific element or
page.
+------------------------------------------------------------------------------------------------------------------------------------------------x-------------------------------------------------------------------------------------------------------------------------------------------------+
Top Tips
+------------------------------------------------------------------------------------------------------------------------------------------------x-------------------------------------------------------------------------------------------------------------------------------------------------+
- Adhere to the rules for SAP design system buttons. For details, see the button guidelines for [SAPUI5](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/) and [SAP Web Components](https://www.sap.com/design-system/fiori-design-web/ui-elements/button-web-component/).
- Use secondary action buttons by default.
- Use primary buttons only for the primary action on the page or panel.
- Only use leading icons.
- Only use the sparkles icon.
- Use concise button labels that clearly describe the action they represent.
- Don’t include “AI” in the button label (such as *Create with AI*, *Enhance with AI*, *Generate with AI*).

## Anatomy

The AI button is made up of the following elements to enable AI-powered functions:

**Base components**
- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button-web-component/)
- [Menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-button-web-component/)
- [Split button](https://www.sap.com/design-system/fiori-design-web/ui-elements/split-button-web-component/)
- [Menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-web-component/)
**Base components**
- [Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button-web-component/)
- [Menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-button-web-component/)
- [Split button](https://www.sap.com/design-system/fiori-design-web/ui-elements/split-button-web-component/)
- [Menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-web-component/)
### AI Button

1. **Container:** Different background colors visualize the
type and state of the AI button.
2. **Text:** Descriptive label that clearly conveys the
action that is invoked by the AI button.
3. **Icon:** Provides emphasis and symbolic identification
of the action as AI-powered in addition to the label.
### AI Menu Button

1. **Container:** Different background colors visualize the
type and state of the AI button.
2. **Text:** Descriptive label that clearly conveys the
group of actions that can be triggered by the AI menu
button.
3. **Icon:** Provides emphasis and symbolic identification
of the action as AI-powered in addition to the label.
4. **Arrow:** Indicates that choosing this button opens a
menu with a group of options.
### AI Split Button

1. **Container:** Different background colors visualize the
type and state of the AI button.
2. **Text:** Descriptive label that clearly conveys the
action that can be triggered by the left interactive area.
3. **Icon:** Provides emphasis and symbolic identification
of the action as AI-powered in addition to the label.
4. **Arrow:** Indicates that choosing this button opens a
menu with a group of options.
5. **Separator:** Indicates that the two areas result in different actions.
## Variants

### AI Button

Use the simple variant for scenarios involving a single
AI action.
*AI button with icon and label*

**> **Guideline:** **

Your button label and tooltip must clearly reveal that the action is enabled by AI.

### AI Menu Button

Use the menu variant to offer multiple AI actions. Users can select and trigger an AI-powered action from the drop-down menu.

*AI menu button with icon and label*

**> **Guideline:** **

Hiding the button label is allowed only for the menu button and within the [AI writing assistant](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/).

### AI Split Button

Use the split variant to offer one main action with
additional related options. The drop-down menu can list
refinements or variations for the main action.

## Behavior and Interaction

The example below shows how the AI button changes during the content generation process.

1. Choosing the *Generate* AI button triggers content generation.
*AI button before triggering the content generation*

2. During content generation, the button changes its appearance and function. The *Generate* button changes into a *Stop Generating* button, allowing users to stop the process at any time.
*AI button during content generation*

3. Once generation is complete or stopped by the user, the *Stop Generating* button changes into an AI menu button. In this example, it becomes *Revise* following the quick prompt pattern. This could otherwise be *Regenerate*.
*AI button after content generation*

---

## button

Buttons enable users to trigger actions. There are 4 button types:
- [Simple button](https://www.sap.com/design-system/fiori-design-web/v1-124/ui-elements/button/#button) for one action
- [Toggle button](https://www.sap.com/design-system/fiori-design-web/v1-124/ui-elements/button/#toggle-button) to switch between different states
- [Segmented button](https://www.sap.com/design-system/fiori-design-web/v1-124/ui-elements/button/#segmented-button) with a group of options
- [Menu button](https://www.sap.com/design-system/fiori-design-web/v1-124/ui-elements/button/#menu-button1) with a group of actions
## Usage

### Use the button types as follows:

- Use **simple buttons** for specific actions, such as:
  - _Create_, _Edit_, 
  - _Approve_, 
  - _Accept_, 
  - _OK_, 
- Use **toggle buttons** in a toolbar to activate or deactivate an object or element. You can also use toggle buttons to switch between different states.
- If you want the user to select one option from a small group, offer a **segmented button** in the toolbar. For example:
  - _Year_, _Month_, 
  - _Small_, _Medium_, 
- Use the **menu button** if you need a menu that provides more than one option.

### Do not use buttons if:

- You want to link to a different page or object. Use the [link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link/) instead.
- You want to let users upload content. Use the [upload set](https://www.sap.com/design-system/fiori-design-web/ui-elements/upload-set/) control instead.

## Types

### Button

Buttons can trigger primary, secondary, semantic, and negative path actions. These different action types are explained in more detail in the [action placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement) guideline.
#### Header and Footer Toolbars
Use the following button styling for the different action types in the header and footer toolbar:
- _Primary action:_ Use the **emphasized** button style. Note that there can only be **one primary action per page**.
- _Secondary action_: Use the **default** button style. In SAPUI5 you must implement **type=”ghost”** to achieve this style in the header and footer toolbar.
- _Negative path action:_ Use the **transparent** button style.
- _Semantic action:_ Use the **semantic buttons** for positive and negative actions. Use the “Accept” style for positive actions, and “Reject” for negative actions. Semantic actions must always be text buttons.

#### Content Toolbars
Use the following button styles in content toolbars for tables, forms or charts:
- If the single primary action for the whole page is in the toolbar, use the emphasized button style.
- If the single primary action for the whole page is **not** in the toolbar, highlight the most important button in the toolbar with the default button style.
- For secondary actions and negative path actions, use the transparent button style.
- For split buttons and menu buttons, use the transparent button style.
- Do not use semantic button styles.
### Toggle Button

A toggle button switches between two actions. One of the actions
is always active, one is inactive. Use the toggle button for
secondary actions.
Apply the following button styles for the different toolbars:
- **Header and footer toolbars:** Use the standard button style.
- **Content toolbars**: Use the transparent button style.
Do not use any other styling types and ensure the button label
communicates the toggleable nature of the button.
### Segmented Button

A segmented button shows a group of options. Only one of the options can be active, the others remain or become inactive. Pressing an option
activates it. By default, the control for segmented buttons calculates the button width and applies it to **all** buttons within the group. You can change this by setting the width for individual buttons.

The segmented button is comparable to a [radio button](https://www.sap.com/design-system/fiori-design-web/ui-elements/radio-button/) group control.
### Menu Button

There are two types of menu buttons. Both can contain items
and submenus.

#### Standard Menu Button
When the user activates the button, the menu opens. This is
the **default type**.
#### Split Menu Button
The split menu button is separated into two areas: the text
and the arrow icon. The separator between them signals that
the two areas result in different actions. The user has two
choices: activating the text on the button triggers the
action. Activating the arrow opens the menu. The split
button consolidates a variety of commands, especially when
one of the commands is used more often.
In split mode, the text depends on the default action. If
the default action is displayed as an icon only, all the
menu items must contain icons.
#### Split Menu Button Behaviors
The split menu button can have two different behaviors:
1. The button always triggers the default action set by the
app developer. If no default action has been defined, the
first item in the menu list becomes the default.
2. The button triggers the last action chosen by the user.
Initially, it also triggers the default action. However,
when the user selects a different action, this user action
becomes the default, and the button text changes
accordingly. The button has a fixed size and the text
truncates if the menu item exceeds the available width (as
with the combo box).
## Button Content

### Text or Icon

A button can contain an **icon OR a text**.
Always use a text button for primary, secondary, semantic, and negative path actions.
\Use icon buttons only if the icon metaphor is easily recognizable. Ideally, it should have same meaning worldwide.\ \ For more information about icons in general, check out the article on [iconography](https://www.sap.com/design-system/fiori-design-web/foundations/visual/iconography/icons).
### Badge

The button can be visualized with a badge. This badge attracts the user’s attention and is typically used in browse and collect use cases. Badges are available for all types and sizes of the standard button.

There are two different badge types: **counter badge** and **attention badge**. A button can show either a counter badge or an attention badge, but never both.

#### Counter Badge
- **Usage:** To show a number.
- **Example:** To display the number of items in a shopping cart.
- **Placement:** Depends on the form factor. Either inside the
button (compact size) or on the top right corner (cozy size).
(compact or cozy form factor).

## Behavior and Interaction

Buttons can be triggered through mouse, keyboard, touchscreen and screen reader interaction.
- A **button** provides visual feedback for “hover”, “press-down”, and “focused” states.
- A **toggle button** remains in the pressed state until it is pressed again.
- In a **segmented button**, the chosen option stays active until the user presses one of the other options.
- A **menu button** displays a dropdown menu on activation.
- In a **split button,** selecting the button text triggers that action directly. Activating the arrow opens a dropdown menu. If the user selects a menu item,
the action is triggered and the menu closes.
If an action cannot be triggered, or is temporarily unavailable, use the disabled state for the corresponding button.

If you want to switch a text, icon or tooltip after a button click, bear in mind to use the invisible message control to also convey the information to screen
reader listeners.
All three button types support the cozy and compact form factors. For more information, check out the article on [content density](https://www.sap.com/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Responsiveness

### Simple Button
The simple button usually grows to fit the size of the
text. If you set a fixed size for the button, the text
truncates.
If the button is used in a responsive container or
toolbar, it follows the responsive behavior defined for
that element. For example, the button can move to another
line.
### [Menu Button](#menu-button)
The maximum width of the menu button is 12 rem (192 px). If the button text exceeds the maximum or fixed width, it
truncates.
On **tablet and desktop devices (sizes M and L)**, the menu button triggers a cascading dropdown menu.

On **smartphones (size S)**, the menu opens in a full screen dialog, and the button label becomes the title of the dialog. The footer contains a _Cancel_ button. Items with submenus become navigable. Navigation is similar to that used in a [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/), with a _Back_ button.
## Guidelines
#### Button Text
- Choose a button text that is short and meaningful. Check out the [UI text guidelines](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori) for more information.
- Use a verb in the imperative for all actions (for example: _Save_, _Cancel_, _Edit_).
Note: The grammatical form for actions can differ for other languages. For example, German action labels use the infinitive (_Sichern_, _Abbrechen_, _Bearbeiten_).
- 
- Keep in mind that the text can be up to 300% longer in other languages.
- If you need to show the number of items that will be affected by the action of the button, you can add the number in parentheses. For example, _Edit (3)_.
- Do not change the text or icon of a toggle button when it is pressed. Screen readers announce the “pressed” state for the action. If you use a different text for the pressed state, the screen reader announcement doesn’t make sense.
#### Icon Buttons
- 
- Make sure the default accessibility text for the icon is correct for your use case.\ If the text is not ideal, define an app-specific
accessibility text.
- Offer a [tooltip](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/using-tooltips) to show the label for icon buttons.
- Don’t use the icon control for buttons. Use the icon property for the button instead.

#### Button Shortcut

- You can show the keyboard shortcut for an action. The
keyboard shortcut appears on hover or on keyboard focus,
and its positioning (top or bottom) is context-dependent.
When a tooltip is needed, it is combined with the shortcut
information.
> **Hint:** To show a keyboard shortcut, use `sap.ui.core.CommandExecution`. Do not use a tooltip.

---

## button-web-component

Buttons allow users to trigger an action and come in a variety of shapes and colors.

<https://www.sap.com/design-system/live-examples/Button/Button_LE_Enabled.html> | <https://www.sap.com/design-system/live-examples/Button/Button_LE_SemanticEnabled.html> | <https://www.sap.com/design-system/live-examples/Button/Button_LE_DisabledMix.html>
_Buttons – live examples_                                                       | _Buttons with semantics – live examples_                                                | _Disabled buttons_

## When to Use

Do
Use the button:
- To offer a **single** action, such as:
_Create_, _Edit_, _Save_, _Delete_, _Approve_, _Reject_, _Add_, _Remove_, _Cancel_

## Anatomy

1. **Background:** Different background colors visualize
the state of the button.
2. **Text / Icon:** Describes or visualizes the action
that is triggered by the button.
## Types

Three button variants are available to indicate the
action:

- Text only
- Icon only
- Text and icon
The button also visualizes the priority of the action.
Three variants are available:

- **Emphasized** – The emphasized button is also known as
primary button. Note that there can only be one primary
action per page.
- **Standard** - The standard button is also known as
secondary. This is the default button style.
- **Transparent** – The transparent button type is
presented without border and transparent. background
around the elements (text, icon). Usually is used for
negative path actions.
### Badge

The button can be visualized with a badge. This badge attracts the user’s attention and is typically used in browse and collect use cases. Badges are available for all types and sizes of the standard button.

There are two different badge types: **counter badge** and **attention badge**. A button can show either a counter badge or an attention badge, but never both.

#### Counter Badge
- **Usage:** To show a number.
- **Example:** To display the number of items in a shopping cart.
- **Placement:** Depends on the form factor. Either inside the
button (compact size) or on the top right corner (cozy size).
(compact or cozy form factor).

## Behavior and Interaction

### Component States

The button as a component has two states: _enabled_ and _disabled_.
- The **enabled** state allows the button to be used/clicked by the user.
- If an action cannot be triggered, or is temporarily unavailable, use the **disabled** state for the corresponding button.
### Interaction States

The button has three interaction states: _regular_, _hover_ and _down_.
- **Regular** is the default state of the component.
- **Hover** is a state when the cursor of a pointing device (such as
mouse or pen) is currently placed on the component while in enabled
state.
- **Down** state is displayed while triggering the action.
### Semantic Usage

The button supports three semantic types “Reject” for the
red action, “Attention” for the orange action, and
“Accept” for the green one.
- **Accept** – to convey positive meaning.
- **Reject** – to convey negative meaning.
- **Attention** – to convey attention meaning.
## Responsive Behavior

The button by default grows to fit the size of the text.
If the button is set with a fixed size, then the text
will truncate.
## Globalization and Localization

The button supports left-to-right (LTR) and right-to-left
(RTL) reading directions. All features work in both
languages. The appearance itself only changes for the
variant with icon and text when changing the reading
direction. The other variants don’t change their
appearance.

---

## link

A link (also known as a hyperlink) is an interactive text
element. It is typically used for navigation, allowing
users to move between different pages or sections of an
application.
## When to Use

Do
Use the link:
- To navigate to another page.
- To jump to an anchor.
- To open an external URL.
- To link to a specific object.
## Responsiveness

The link can either truncate or wrap. Favor wrapping over truncating and keep the link text as short and meaningful as possible.
For more information and guidelines on the responsive behavior of text, see [Wrapping and Truncation](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/wrapping-and-truncation).

## Types

Default (col-1)

There are four different link types:
- Default
- Emphasized
- Subtle
- Link with icon

> **Guideline:** Use a meaningful link text that indicates what will happen when the user interacts with the link (for example, _Open Sales Order_). Avoid texts such as _Click Here_ or _Link_, as these do not meet accessibility standards.

Default (col-2)

Section Metadata

style

### Default

Use a default link if you want to display a simple link.

### Emphasized

Use an emphasized link for extraordinarily important
links that need to attract the user’s attention quickly.

### Subtle

Use subtle links to distinguish between important (default) and less important (subtle) links when the app page is full of various links (10\+). Subtle links allow you to improve the visual hierarchy in large [lists](https://www.sap.com/design-system/fiori-design-web/ui-elements/list-overview/) and [tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview).

### Link with Icon

Default (col-1)

Use the link with an icon when the user expects and profits from the icon in the UI context. Please note that the
icon is **supportive**, which means that it supports the text next to it. Therefore, a tooltip is not required. Do
not use the icon for additional information.

> **Guideline:** Use the link with icon only if the icon is internationally well-known and easily understood. For example, :world:
(world), :calendar: (calendar), or :theater: (theater).

Default (col-2)

Section Metadata

style

## Behavior and Interaction

To access an object or navigate, the user clicks the link. It provides visual feedback for the [hover](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states#hover) and [focused](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-focus-states#focused) states.
If the link can’t be used, display the [disabled state](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#disabled). This can be the case if part of the content area is disabled, for example.

## Accessibility

To conform with the international [Web Content Accessibility Guidelines WCAG 2.2](https://www.w3.org/TR/WCAG22/), set the line height for links as follows:

- For **links within continuous text or in a text area**: Don’t increase the line height. Increasing the height can misalign the text with the links or cause uneven spacing between lines. In these cases, there is no need to increase the line height because no other actions are attached to this type of container.

---

## link-web-component

A link (also known as a hyperlink) is an interactive text
element.

It is typically used for navigation, allowing users to
move between different pages or sections of an
application.
## When to Use

Do
Use the link:
- To navigate to another page.
- To jump to an anchor.
- To open an external URL.
- To link to a specific object.
## Anatomy

A link is an interactive element in text that is
indicated by colored text or an underline.

1. Text
2. Underline
## Types

There are three different link variants:
- **Default**: To display a simple link.
- **Emphasized**: For very important links that need to
attract the user’s attention quickly.
- **Subtle**: To distinguish between more important
(default) and less important (subtle) links when the app
page contains a large number of links (10\+). Subtle links
allow you to improve the visual hierarchy in large lists
and tables.
## Behavior and Interaction

To access an object or navigate, the user clicks the link. It provides visual feedback for the [hover](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states#hover) and [focused](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-focus-states#focused) states.
If the link can’t be used, display the [disabled state](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#disabled). This can be the case if part of the content area is disabled, for example.

---

## menu-button-web-component

The menu button offers a set of options for an action, displayed in a [menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/menu-web-component/).

## When to Use

Do
Use the menu button:
- To offer a group of options when there is no obvious
default action.
- To offer a default action alongside a group of alternative options. Use the [split button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/split-button-web-component/) instead.

## Anatomy

1. **Background**: Visualizes the state of the button
using different colors.
2. **Text**: Describes the group of actions that can be
triggered by the menu button.
3. **Arrow**: Indicates that clicking this button opens a
menu with a group of options.
## Types

Three variants visualize    |
different priorities of the |
menu button and its action: |
- Primary                   |
- Secondary (= regular)     |
- Tertiary                  |
## Behavior and Interaction

The menu button has only one interactive area. Clicking the menu button opens the [menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/menu-web-component/) with the possible actions.

---

## radio-button

Radio buttons provide users with a set of mutually exclusive options. They allow a user to select only one option from two or more choices. Each option is represented by a radio button. Consequently, radio buttons only work in groups.

## Usage

### Use the radio button if:

- You need to help users choose quickly between at least two clearly different choices.

### Do not use the radio button if:

- You need to offer the user the option of multiple selection. In this case, use [checkboxes](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/) instead because radio buttons are for single-selection contexts only.
- You want to allow the user to select list items. Instead, let the user tab the list item to make a single selection (consider a [message toast](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-toast/) for confirmation) and provide checkboxes to select multiple list items.
- The default option is recommended for most users in most situations. In this case, consider a [dropdown](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/) list instead, which uses less space by not showing all options straightaway.
- You need to present more than 8 options. Use a [dropdown box](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/) or [list view](https://www.sap.com/design-system/fiori-design-web/ui-elements/list-overview/).
- In special cases, there are only two mutually exclusive options. Combine them into a single [checkbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/checkbox/) or [toggle switch](https://www.sap.com/design-system/fiori-design-web/ui-elements/switch/). For example, use a checkbox for “I agree” (for example, to terms and conditions) instead of two radio buttons for “I agree” and “I don’t agree”.
- The options are numbers with fixed steps. Use a [slider control](https://www.sap.com/design-system/fiori-design-web/ui-elements/slider/).

## Responsiveness

The radio button group control is not responsive. A horizontal radio button group should be displayed as a vertical group on
smartphones because a horizontal group should never break into two lines.

Also note that the control does not handle long [labels](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/)
in horizontal groups. Such labels do not break and are not truncated. Therefore, check label lengths and padding in horizontal
groups on desktop and tablets.

## Behavior and Interaction

### Activation

The user taps a radio button to activate the related option. Note that tapping an activated option does not deactivate it, but tapping a different option transfers activation to that option. Therefore, a user can select only one option from a group of radio buttons.

A group of radio buttons behaves like a single control: Using the tab key sets the focus directly on the selected option. Users can cycle through the group using the arrow keys.

## Styles

### States

A radio button can have different states that affect its appearance:
- Control states, such as “enabled” or “read only”
- Value states, such as “error” or “warning”, which are indicated using [semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/morning-horizon#semantic-colors)
- Visual states, such as “regular” or “hover”
- Additional states, such as “selected”
For details on the different states, see [UI Element States](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states).
For more information on semantic colors for value states, see [How to Use Semantic Colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/how-to-use-semantic-colors).
### Column Attribute

The radio button attributes also have a set arrangement
so that you do not have to implement them for every
single control. The column attribute adds or removes
n-columns to a set of radio buttons.

## Guidelines

The radio button control serves the purpose of exclusive selection and adds clarity and weight to very important options in your app. Use radio buttons when the options being presented are important enough to occupy more screen space. They should only be used if the user needs to see all available options instantly and side by side. Radio buttons draw more attention to the options as they emphasize all options equally.

### Labeling

A [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/) to indicate the option is mandatory for each radio button. Limit the radio button’s label to a single line.

### Sorting

List the options in a logical order, such as lowest to highest risk, simplest to most complex operation, or most to least likely to be selected.

Alphabetical ordering is less recommended as it is language-dependent and therefore not localizable.

### Aligning

Try to align radio buttons vertically instead of horizontally, especially for long labels. Horizontal alignment is harder to read and localize. Consider horizontal alignment in cases of one-word labels, such as in the background color settings example above.

In forms, always align radio buttons vertically instead of horizontally as the length of the labels may vary for different languages.

Do not put two radio button groups right next to each other as it is difficult to determine which buttons belong to which group. Use group labels and padding to separate them.

### Offering “No Choice”

If the user is also able to select none of the options, be sure to add this option to the control as well (as this option is generally not offered in the control). Add a radio button that offers _None_ or _Does not apply_.

### Default State

Because radio buttons do not generally offer “no choice”, the app should show the less risky option (most likely the first option in the group) as preselected by default.

### Exceptional Case: No Preselection by Default

In rare cases, preselection might result in incorrect inputs or assumptions. One such example is gender selection in a form. In this case, you should offer no preselection and decide whether a user input is mandatory or not depending on the use case.

If a choice is mandatory, set an error state if validation proves that a user did not select an option.

---

## radio-button-web-component

Radio buttons provide users with a set of mutually exclusive options. They allow users to select only one option from two or more choices. Each option is represented by a radio button.

<https://www.sap.com/design-system/live-examples/Radio_Button/RadioButton_LE_States.html> | <https://www.sap.com/design-system/live-examples/Radio_Button/RadioButton_LE.html> | <https://www.sap.com/design-system/live-examples/Radio_Button/RadioButton_LE_ValueStates.html>

## When to Use

Do
Use radio buttons:
- To choose quickly between at least two clearly distinct
alternatives.
- For single-selection scenarios only.
- To offer only two mutually exclusive options. In this case, combine them into a single [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox-web-component/) or [toggle button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toggle-button-web-component/). For example, use a checkbox for “I agree”.
- To offer options that are numbers with fixed intervals. Use a [slider](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/slider-web-component/) instead.

## Anatomy

The radio button comprises two parts:
1. **Button**: Indicates whether the option is selected.
2. **Text**: Describes the purpose of the radio button.
The text is optional if the purpose of the radio button is
already indicated by other elements.
## Behavior and Interaction

The user can select a radio button by clicking on the
button or the content. Note that clicking again on a
checked option does not uncheck it. However, clicking on
a different option transfers selection to that option.
The user can select only one option from a group of radio
buttons.

---

## segmented-button-web-component

A segmented button is a group of buttons that can be
toggled. The group appears as one large button with
multiple segments.

## When to Use

Do
Use the segmented button:
- To let users choose from a small group of options, such
as “Year, Month, Day” or “Small, Medium, Large”.

## Anatomy

1. **Background:** Different background colors visualize
the state of the button and indicate the interactive
areas (segments).
2. **Text / Icon:** Describes or visualizes the action
that is triggered for each interactive segment.
## Types

For visual representation:
- **Text only**
- **Icon only**
<https://www.sap.com/design-system/live-examples/Segmented_Button/SegmentedButton_LE_Variants_icononly.html>

For selection modes:
- **Single**: Only one item is selectable. Selecting an
item deselects the previous one.
- **Multi**: Multiple items can be selected at once. All
items ca be unselected.

Note: The segmented button can be configured to start
with no items selected. However, additional customization
is required to enable this functionality.
## Behavior and Interaction

The segmented button behaves differently in single and
multi selection mode.

**Single**: When the user clicks one of the options, this
option becomes active (pressed). All other options remain
or become inactive (not pressed).

**Multi**: When the user clicks one of the options, this
option toggles between active and inactive (pressed and
not pressed), without affecting the other options. In
multi selection mode, all options can be active or
inactive simultaneously.

---

## smart-link

Like the [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/), the smart link triggers a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) from a text link. This popover shows additional information, such as simple object details, and offers links to related apps for the user to take action. The user can choose which links are shown in the popover by selecting them in a separate dialog.
The smart link is a smart control that uses metadata annotations to offer user-specific navigation. It analyzes the user’s assigned apps and offers only relevant navigation targets.

## When to Use

### Use the smart link if:

You want to offer direct navigation to a related app. For example:

- Navigate from a product list to the app for changing the pricing
- Navigate from a sales order list to the app that shows a customer’s balance

You want to show a popover with contextual information or navigation. For example:

- Offer navigation to multiple related apps
- Display simple object details

### Do not use the smart link if:

- You want to display more or complex information about an object. Use the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) or [charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart-vizframe/chart-types/) instead.
- Access to metadata is not possible, and only a direct link to a website, document or application is needed. Use the standard link instead.
- You need to structure information in a deeper hierarchy. Use the [quick view](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/) or a [list drilldown](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) instead.

## Components

The smart link popover contains the following areas:

1. The **header bar** of the smart link popover is _only visible on mobile devices_ (see example image for responsiveness, size S).
2. The **title area** contains a title and a subtitle. You can also show the title as a link, which can be used to navigate to the
corresponding object or fact sheet. You can use the subtitle to show an object ID, for example.
3. The **content area** shows object-related information, such as details about a product or contact information. You can use any
UI control, based on what best fits your use case.
4. The **link area** offers links to all other apps that are relevant for a user role. The link list includes all semantic objects
defined for the app, and can also include additional links defined manually by the application development team. The link area can
have two states:
_Link area is empty:_ If no links have been selected for the app, or if there are more than 10 links, the link area is initially
empty. Instead, the user sees a _Define Links_ button, which opens a dialog for selecting the links to be shown.

As soon as the link area contains links, the button text changes to _More Links_. This opens the same selection dialog.
Only the header bar is mandatory (for mobile devices). All the other sections are optional. For example, you might choose to show
only a content area or a only a link area, depending on your use case.
## Behavior and Interaction

The smart link and its popover are always triggered by clicking a text element that appears as a link. You can place this text element in any list, table, or other container. You can also set the link label individually. Clicking outside the popover closes it. If only one link is offered, and there is no additional information, the smart link control navigates directly to the target without opening the popover.

If the semantic object annotation is not set, the smart link is rendered as `sap.m.Text` by default. However, you can also opt to render any other control.

### Link Selection Dialog

Clicking the _More Links_ or _Define Links_ button opens the _Define Link List_ dialog. There, the user can select the app links to be displayed in the link area. The links offered in the selection list are modifiable
semantic objects suggested by the smart link control. The app team can remove links from the selection list, change the link texts, or manually add links to any website or app.

Exception: Within [SAP Fiori elements](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates), the links offered in the _Define Link List_ dialog are generated automatically. App teams cannot adapt the list.
You can switch off the _More Links / Define Links_ option by setting the property `enableAvailableActionsPersonalization` to “false”. By default, it is set to “true”.
### Smart Links in a Smart Table
Within a [smart table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/), the link label of the smart link is set automatically using the semantic object annotation. In other words, you can’t change the description. If there are no navigation targets, the smart link is rendered as `sap.m.Text`.
## Responsiveness
The responsiveness of the smart link is based on the responsiveness of the [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) that overlays the content.
On desktop devices, clicking anywhere outside the popover closes it.
On mobile devices, the smart link opens a full screen dialog with a _Close_ icon (:decline: ) on the top right.

Section Metadata
style   | column-section-1-1, no-footprint
## Top Tips

- Check the related apps you offer carefully. Only display those that are relevant for the user.
- Use meaningful link names in the link area. Do not use the same link name more than once. If necessary, rename the links to suit your context (for example, “Add Product” instead of “Manage Products”).

---

## split-button-web-component

The split button allows users to trigger different actions via two interactive areas: a default action on the left and a menu with additional actions on the right.

<https://www.sap.com/design-system/live-examples/Split_Button/SplitButton_LE_Enabled.html>

<https://www.sap.com/design-system/live-examples/Split_Button/SplitButton_LE_DisabledMix.html>

## When to Use

Do
Use the split button:
- To offer a group of actions when one option is used
more often than the others.

## Anatomy

1. **Background:** Different background colors visualize
the state of the button.
2. **Text / Icon:** Describes or visualizes the action
that is triggered by the left interactive area.
3. **Separator:** Indicates that the two areas result in
different actions.
4. **Arrow:** Opens the menu.
## Types

Three split button variants are available to indicate the
default action:

- Text only
- Icon only
- Text and icon
The split button also visualizes the priority. Three
variants are available:

- Primary
- Secondary (= standard)
- Tertiary
## Behavior and Interaction

The split button has two interactive areas:
- The left click-area triggers the default action.
- The right area (arrow) opens a menu with the additional actions. For more information, see [Menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/menu-web-component/).

---

## toggle-button-web-component

A toggle button allows users to toggle between two states: active (pressed) and inactive (not pressed).

For example, a toggle button might be used to show or hide a screen element or to provide a filtered view of a dataset.

<https://www.sap.com/design-system/live-examples/Toggle_Button/ToggleButton_LE_Enabled.html> | <https://www.sap.com/design-system/live-examples/Toggle_Button/ToggleButton_LE_SemanticEnabled.html> | <https://www.sap.com/design-system/live-examples/Toggle_Button/ToggleButton_LE_DisabledMix.html>
_Toggle buttons – live examples_                                                             | _Toggle buttons with semantics – live examples_                                                      | _Disabled toggle buttons – live examples_

## When to Use

Do
Use the toggle button:
- To switch between different states.
- To activate or deactivate an object or element in a
toolbar.
## Anatomy

1. **Background:** Different background colors visualize
the state of the button.
2. **Text / Icon:** Describes or visualizes the state
when the button is pressed.
## Types

Three toggle button variants are available:
- Text only
- Icon only
- Text and icon

The toggle button also visualizes the priority of the
action. Three variants are available:

- Primary
- Secondary (= standard)
- Tertiary
## Behavior and Interaction

Pressing the toggle button switches between the active
and inactive states. The impact of the toggle button is
directly recognizable.

---