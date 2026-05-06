# SAP Fiori UI Elements: Inputs

This reference covers the following UI components:

- [Ai Prompt Input](#ai-prompt-input)
- [Checkbox](#checkbox)
- [Checkbox Web Component](#checkbox-web-component)
- [Color Picker](#color-picker)
- [Color Picker Popover](#color-picker-popover)
- [Color Picker Web Component](#color-picker-web-component)
- [Combo Box](#combo-box)
- [Combo Box Web Component](#combo-box-web-component)
- [Date Picker](#date-picker)
- [Date Picker Web Component](#date-picker-web-component)
- [Date Range Selection](#date-range-selection)
- [Date Time Picker Web Component](#date-time-picker-web-component)
- [Datetime Picker](#datetime-picker)
- [Feedinput](#feedinput)
- [Generic Mask Input](#generic-mask-input)
- [Input Field](#input-field)
- [Input List Item](#input-list-item)
- [Input Web Component](#input-web-component)
- [Multi Combo Box Web Component](#multi-combo-box-web-component)
- [Multi Input Web Component](#multi-input-web-component)
- [Multiinput](#multiinput)
- [Range Slider](#range-slider)
- [Range Slider Web Component](#range-slider-web-component)
- [Rating Indicator](#rating-indicator)
- [Rating Indicator Web Component](#rating-indicator-web-component)
- [Select](#select)
- [Select Dialog](#select-dialog)
- [Select Web Component](#select-web-component)
- [Slider](#slider)
- [Slider Web Component](#slider-web-component)
- [Step Input](#step-input)
- [Step Input Web Component](#step-input-web-component)
- [Switch](#switch)
- [Switch Web Component](#switch-web-component)
- [Table Select Dialog](#table-select-dialog)
- [Text Area](#text-area)
- [Text Area Web Component](#text-area-web-component)
- [Time Picker](#time-picker)
- [Time Picker Web Component](#time-picker-web-component)
- [Token](#token)
- [Translation Of Textual User Input](#translation-of-textual-user-input)

---

## ai-prompt-input

The AI prompt input is a core UI element for interacting with generative AI systems. Its primary function is facilitating instructions for AI systems expressed in natural language: custom prompts written by a user. In addition to text, it may also support other input options, such as images, voice, or various file formats.

This component is part of a set of UI elements and UX patterns for instructing or prompting generative AI. For more information, see [Designing Effective AI Prompts](https://www.sap.com/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/effective-ai-prompts) and the patterns for [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/) and [guided prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/guided-prompts/).

Note: Custom prompts are instructions the user writes from scratch in natural language for AI to follow when generating outputs. They allow users to explore a wide range of possibilities, collaborate with the AI, and generate diverse outputs far faster than humanly possible. They encourage creative freedom and can be valuable for writing, brainstorming, or generating ideas.

## Usage

Do
Use the AI prompt input:
- Don’t use the AI prompt input if the AI supports a limited number of tasks. Use [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/) instead.
- To facilitate custom prompts written by users to
instruct AI systems.
- When users need to provide additional context.
+----------------------------------------------------------x----------------------------------------------------------+
Top Tips
+----------------------------------------------------------x----------------------------------------------------------+
- Improve query input efficiency and accuracy by incorporating predictive text features like typeahead suggestions,
auto-completion, and error correction.
- Leverage AI input fields to create personalized interactions that adapt and learn from user input over time.
- Avoid limiting input options to only one modality when users may benefit from utilizing multiple modalities.

## Anatomy

An AI prompt input allows users to write custom instructions for AI in natural language to guide the generation of content tailored to their needs.

1. **Label (optional)**: Describes the intent of the text input from cell.
2. **Input field**: Indicates selectable area where input values are displayed.
3. **_Submit_ button**: Disabled until a valid input is available.
4. **Character count (optional):** Displays the remaining number of
characters that can be input in real time.
1. **Trailing action**: For example, you can enable a _Clear_ icon to remove the text that has been typed into the field.
2. **_Submit b_ utton**: Enabled state based on valid input.
3. **Popover**: Content area slot provides suggestions based on input.
For more information, see the components that are utilized and reused in this pattern: [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label-web-component/), [input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-web-component/), [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button-web-component/), [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover-web-component/), and character count from the [text area](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-area-web-component/#text-area-counter) component.
## Types

### AI Prompt Input with Label

Always provide a meaningful [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label-web-component/) (1) for any input field. Labels are necessary to indicate the meaning of the input fields when the placeholders are no longer visible. To indicate that a particular field is mandatory, set the “Required” indicator for the label.

### AI Prompt Input with Character Counter

If you have set a [character limit](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-area-web-component/#text-area-with-character-limit) (1) without restricting text input, the counter indicates how many characters are left, or how many characters exceed the limit.

## Behavior and Interaction

This pattern primarily inherits its mouse and keyboard interaction specifications from the base components it utilizes.

For more information see: [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label-web-component/), [input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-web-component/), [button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button-web-component/), [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover-web-component/), [text area](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-area-web-component/) (including [text area with character limit](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-area-web-component/#text-area-with-character-limit) and [text area counter](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-area-web-component/#text-area-counter)).

#### Enabled

The AI Input field is currently active and allows user interaction. It can be empty, contain a placeholder text, or contain a value entered or selected by the user. The _Submit_ action is disabled until a valid input is available.

#### Disabled

All interactive functions have been removed and the user is unable to interact with the input field. The field can’t be focused on or recognized by screen readers and doesn’t need to meet visual contrast requirements.

#### Suggestions and Autocomplete

Using suggestions and autocomplete is the quickest way for users to discover and select relevant input terms and values.

- The current typed term is always highlighted with bold text.
- Only the characters entered in the input field are highlighted, not the whole word.
- All relevant instances are highlighted, even if they occur in one line item.

#### Clear

You can enable a _Clear_ icon :decline1: in the input field. It appears as soon as the input field has a value. Selecting the _Clear_ icon removes the value from the field. If you use this option, make sure that the input field is wide enough to show the clear icon in addition to the value.

## Terminology

The placeholder text should be specific enough to guide the user on what the AI can assist them with. The text should be concise, avoiding overly technical language, unless suitable for the target audience.

Do **not** repeat the label in the placeholder text.

For more information, see the [UI text guidelines for placeholder text](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#user-input).

## Responsible AI

Allowing users to create their prompts using the AI prompt input gives them more freedom, but it can also lead to issues, such as getting incorrect answers when the prompts are unclear or too specific, and there is a risk of perpetuating bias.

We will continue developing usage guidelines for this UI element and related custom prompt patterns (coming soon), including guiding the user in writing quality prompts and preventing bias. In the meantime, follow the guidelines below to get the most out of custom prompts and mitigate the risks.

#### Be transparent about the use of AI

Use the AI prompt input transparently: indicate that users are engaging with AI-powered features. Avoid any misleading language, like labels and placeholder text that may obscure the involvement of AI.

#### Mitigate bias in imperfect user prompts

Implement measures to detect and flag potentially biased prompts, such as algorithms that analyze the language, tone, and content of the prompt to identify any biases or stereotypes.

## Recommended Reading

1. [AI Prompt Input](https://sap.github.io/ui5-webcomponents/nightly/components/ai/PromptInput/) (UI5 Web Components documentation)
2. [Designing Effective AI Prompts](https://www.sap.com/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/effective-ai-prompts)
3. [Building Trust with Generative AI](https://www.sap.com/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/building-trust-with-generative-ai)
4. [SAP Global AI Ethics Policy](https://www.sap.com/documents/2022/01/a8431b91-117e-0010-bca6-c68f7e60039b.html)
5. [Guided Prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/guided-prompts/)
6. [AI Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/)
7. [AI Icon](https://www.sap.com/design-system/fiori-design-web/v1-130/foundations/ai-and-joule-design/foundation/ai-icon)
8. [UI Text Guidelines for SAP Fiori Apps](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori)

---

## checkbox

A checkbox lets the user set a binary value (such as “true/false”). When the user clicks the checkbox, it toggles between checked and unchecked. Checked means that the state described by the checkbox text applies, or that the item has been chosen.

The checkbox text describes the positive action (as in “true” or “yes”). The text can be either a label control to the left of the checkbox, or a checkbox text that appears to the right of the box.

- If there is only one checkbox, you can use a label or text depending on the form format.
- If there is more than one checkbox, the label describes the whole group of checkboxes. In this case, use the `text` property of the checkbox to describe the individual checkboxes.

Within a group of checkboxes, each checkbox can be checked or unchecked. The user can check multiple options.

A checkbox does not apply a setting right away; the changes take effect after user confirmation via a triggering action button (such as _Save_).

## Usage

### Use the checkbox control if:

- Only one option can be selected or deselected, for example to accept terms of use. Use it only if the meaning is obvious (single checkbox).
- You have a group or a list of options that can be selected independently of each other (checkbox group).
- Your use case requires all available options to be displayed right away without any user interaction (also in read-only cases).
- The values of the option list are primary information and need to be displayed right away.
- Changes to the settings need to be confirmed and reviewed by the user before they are submitted. This helps prevent users from changing settings accidentally.
- You want to group multiple suboptions under a parent option, and require an intermediate selection state (tri-state). The tri-state indicates that some (but not all) suboptions are selected.

### Do not use the checkbox control if:

- The user needs to choose multiple options from a large list. Use a [multi-combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/) instead.
- The user can choose only one option from a list. For a small list, use a [radio button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radio-button/) group instead. For a large list, use the [select control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) or a list with multi-selection functionality.
- You want to offer two options for a “yes/no” or “on/off” type of decision. Consider using a [switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/switch/) control instead.
- The user needs to perform instantaneous actions that do not need reviewing or confirming. Consider using the [switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/switch/) control instead.
- There is not enough space available on the screen. Use the [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) control instead.

## Responsiveness

A checkbox can appear in two different sizes. In cozy mode, it is bigger than it is in compact mode. This makes the checkbox easier to select on touch devices. For more information on cozy and compact modes, see the article on [content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

In both sizes, the touch/click area around the checkbox is bigger than the checkbox itself, making the checkbox easier to select. Clicking inside this area toggles the checkbox.

**Note**: Because the touch/click area does not include the label on the left, clicking the label will not toggle the checkbox.

## Layout

The checkbox control consists of a box and a text that describes the
purpose of the checkbox.

If the checkbox is checked, an indicator is shown inside the box.
Although the clickable area to select/deselect a checkbox covers a
wider area than the box (see the _Responsiveness_ section), the focus
is indicated by a dotted line that surrounds only the box.
If the checkbox appears alone inside a form, the text can be omitted
if the label in front of the checkbox takes over its function.
**Note:** Because the touch/click area does not include the label on
the left, clicking the label does not toggle the checkbox.
If there are several options to choose from in a form, the label
describes the entire checkbox group, and the texts describe the
individual checkboxes.
Since **checkbox texts** are also a type of label, use **title case**
to be consistent with other labels. If the label is long, it can wrap
in order to fit the text into the visible area of the content holder.
There is no limit on the number of lines a text can wrap.
**Exception:** If one or several of the checkbox texts is very long,
or is formulated as a phrase, use sentence case and appropriate
ending punctuation.
For forms with labels above the fields, place the label above the
checkbox group, or do not use a label. For a single checkbox, use
only a checkbox text.
For forms with labels to the left of the field, place the label next
to the group, aligned with the first checkbox field, or do not use a
label. For a single checkbox, use only a label, or only a checkbox
text.
> **Hint:** **Do not use empty labels to arrange the checkboxes.** Creating a label in front of each checkbox and leaving the
text empty looks fine – nobody sees the label, and the checkboxes are aligned correctly underneath each other.
However, the screen reader will notice these labels and read each of them as “label”. Instead, use the layout data
property (layoutData) for the checkbox. In this property, force a line break (linebreak) and set the value of the
indents in sizes L and M (indentL, indentM) according to the value of the label span in the simple form (labelSpanL,
labelSpanM).

_Checkbox group with label aligned to the left or on top_          | _Checkbox group without label_          | _Single checkbox with label or with text_

## Behavior and Interaction

Clicking a checkbox toggles the state of the checkbox between checked and unchecked.

#### Tri-State

The main purpose of this state is to represent the mixed selection states of dependent input fields. If some (but not all) of the dependent fields are selected, the checkbox shows a partially selected state. This is only a visual state and can’t be achieved by a direct user interaction.

## Properties

You can set the width of the element containing the checkbox and the text manually (property: `width`).

If the text exceeds the available width, it can wrap. The touchable area for toggling the checkbox ends where the text ends.
If the width allows more space than the text requires, white space is added. The touchable area for toggling the checkbox is increased according to the manually-set
width.

The text can be positioned manually in this space (property: `textAlign`). However, we do not recommend using the right-align option, which can result in a large amount of white space between the checkbox and the checkbox text.
**States**
If a checkbox is part of an editable form, it can be edited in when the form is in edit mode. In display mode, the checkbox uses its “display-only” state (property: `displayOnly`), and two icons replace it to represent the checked and unchecked states.
If the checkbox appears in a read-only form, set the checkbox to read-only (property `editable` = “false”).
**Do not combine the settings “disabled” and “read-only”.** This is technically possible, but does not make any sense.
The checkbox can represent a mixed selection state, or **tri-state** (property: `partiallySelected`). The visual state depends on the value of the `selected` property.

---

## checkbox-web-component

A checkbox allows users to set a binary value to “true” or “false”, indicating whether or not an item has been chosen. If a checkbox acts as a parent for a group of checkboxes (for example, _Select All_), it can also display an indeterminate state to indicate that not all subitems have been checked.

<https://www.sap.com/design-system/live-examples/Checkbox/CheckBox_LE_States.html> | <https://www.sap.com/design-system/live-examples/Checkbox/CheckBox_LE_ValueStates.html> | <https://www.sap.com/design-system/live-examples/Checkbox/CheckBox_LE_Indeterminate.html>

## When to Use

Do
Use the checkbox to:
- Select or deselect. Use it only if the meaning is
obvious.
- Offer a list of options that can be selected
independently of each other.
- Group multiple suboptions under a parent option that
requires an indeterminate selection state.
## Anatomy

The checkbox component has two parts:

1. **Box**: Checkbox with 3 possible settings: checked, unchecked, or indeterminate.
2. **Text**: Describes the purpose of checkbox.
   If the purpose of the checkbox is already described by other elements, the checkbox text is optional.

## Behavior and Interaction

Clicking a checkbox toggles the state of the checkbox
between checked and unchecked. Checked means that the
state described by the checkbox text applies, or that the
item has been chosen. Unchecked means that it doesn’t
apply.
Clicking a checkbox triggers a visual indication of
focus: a solid line surrounds the entire component.
A parent checkbox can also display an indeterminate,
partially selected state, indicating that some but not
all of the dependent input fields are selected. This
state is commonly used for a group of checkboxes and is
only a visual, non-interactive state. If all dependent
checkboxes are checked, the parent checkbox is also
checked automatically, and vice versa.

---

## color-picker

The color picker allows users to choose any color and
provides different input options for selecting colors.

## Usage
### Use the color picker if:
- Selecting any color freely is the typical use case.
### Do not use the color picker if:
- Users need to select one color from a predefined set of colors. Use the [color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette/) instead.
- Selecting a color from a predefined palette is the typical case, but users should still be able to define their own colors. Use the [color palette popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette-popover/) instead.

## Responsiveness

The color picker supports cozy and compact [content densities](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).
_Size S: Color picker opens in responsive popover_          | _Size M – Cozy form density_          | _Size L – Compact form density_

## Layout

The color picker consists of the following elements:
- The **color picker box** for setting lightness and saturation
- **Sliders** for setting the hue and transparency (“alpha channel”)
- **Form elements** for:
- Displaying the current and new color settings (Prior to any
selection, the default color is white. However, the app developer
can set a different predefined color using the `setSelected` method.)
- Setting the color as a hexadecimal value
- Setting the color as red/green/blue (RGB) value (0 to 255 each)
(optional)
- Setting the color as hue/saturation/lightness (HSL) value (hue:
0 to 360 degrees, saturation: 0% to 100%, lightness: 0% to 100%)
(optional)
- Switching between RGB and HSL values (if applicable)
- Setting the transparency (“alpha channel”) value of the color
(0.00 for full transparency to 1.00 for opaque)
## Types

The color picker comes in 3 flavors:

- **Simplified**: The simplified color picker offers
settings for hue, saturation, and lightness, but not for
the alpha channel. It shows the current and new color.
Text input is only possible for hex values.
- **Default**: The default color picker allows all
settings. It displays input fields either for red / green /
blue / alpha or for hue / saturation / lightness / alpha.
End users can switch between both sets of input fields.
- **Large**: The large color picker allows all settings
and displays all fields at the same time.

## Behavior and Interaction
- **Mouse/touch**: Users select a combination of saturation and lightness in the color picker box (click and drag).
Hue and alpha values are selected with sliders.
- **Keyboard**: The tab key is used to set the focus on the sliders and input fields. Values are entered using the
corresponding input controls. The sliders react on arrow keys, page up / page down keys, as well as on home and end
keys. The color picker box is not keyboard-enabled.

## Guidelines
- Do not place the color picker directly on a page. Always offer the picker in a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) or [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/).
- Use the simplest color picker type that does the job.

---

## color-picker-popover

The color picker popover consists of a [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/) within a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/). It enables the user to choose a color from the color spectrum or define it numerically using hex, RGB(A), HSL(A), or HSV(A) values. You can use it to offer color selectors on [toolbars](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) (for example, triggered by a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/)).

## Usage

### Use the color picker popover if:

- Selecting any color freely is the typical use case (for example, for user-created content).
- There is no need for or benefit from a predefined color palette.
- Selecting a color is needed as a toolbar action. In this case, use a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) or [menu button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#menu-button1) to trigger the color picker popover.

### Do not use the color picker popover if:

- You want to let users select a color directly on the page (for example, inside a [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/)). Use the [color palette](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette/) instead.
- A predefined palette is beneficial. Use a [color palette popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette-popover/) instead.

## Responsiveness

The color picker popover supports cozy and compact [content densities](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact). On a phone, the color picker popover turns into a full-screen [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/).

_Size S_          | _Size M_          | _Size L_

## Layout

The color picker popover consists of a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) containing a [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/) and a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/).

The [color picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-picker/) consists of the following elements:

- The **color picker box** for setting lightness and saturation
- **Sliders** for setting the hue and transparency (“alpha channel”)
- **Form elements** for:
  - Displaying the current and new color settings (Prior to any selection, the default color is white. However, the app developer can set a different predefined color using the `setSelected` method.)
  - Setting the color as a hexadecimal (hex) value
  - Setting the color as red/green/blue (RGB) value (0 to 255 each)
  - Setting the color as hue/saturation/lightness (HSL) value (hue: 0 to 360 degrees, saturation: 0% to 100%, lightness: 0% to 100%)
  - Setting the transparency (“alpha channel”) value of the color (0.00 for full transparency to 1.00 for opaque)

The [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/) contains two [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/): _OK_ (emphasized) and _Cancel_.

## Types

The color picker popover comes in 3 variants with different levels of complexity:

- **Simplified**: The simplified color picker offers
basic color manipulation represented only with a hex
value, without an alpha value. It shows the current and
new color. Text input is only possible for hex values.
- **Default**: The default color picker allows all
settings. It displays input fields either for red / green /
blue / alpha or for hue / saturation / lightness / alpha.
End users can switch between both sets of input fields.
- **Large**: The large color picker allows all settings
and displays all fields at the same time.

## Behavior and Interaction

Colors can be selected using mouse/touch or a keyboard:

- **Mouse/touch**: Users select a combination of saturation and lightness in the color picker box (click and drag). Hue and alpha values are selected with sliders.
- **Keyboard**: The tab key is used to set the focus on the sliders and input fields. Values are entered using the corresponding input controls. The sliders react on arrow keys, page up / page down keys, as well as on home and end keys. The color picker box is not keyboard-enabled.

The color change can be applied immediately. The _OK_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) confirms the selection of the new color and closes the popover. The _Cancel_ [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) closes the color picker popover without applying the new color.

## Guidelines

- To trigger the color picker popover, use a [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) or a value help icon from an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/).
- Show the selected color in another place (for example, as a color value inside the triggering [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)). The color picker popover closes as soon as a color is selected.
- Use the simplest color picker popover type that does the job.

---

## color-picker-web-component

The color picker allows users to choose any color and provides different input options for selecting colors.

## When to Use

Do
Use the color picker:
- To let users select any color freely.
- If you want to let users select one color from a predefined set of colors, with the additional option of defining their own colors. Use the [color palette popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/color-palette-popover-web-component/) instead.

## Anatomy

1. **Color Picker Container:** Sets up lightness and saturation.
2. **Sliders:**
2a) Modifies the hue
2b) Modifies the transparency (“alpha channel”)
3. **Comparison Color Fields:** Display the current and new color settings.
4. **Hex Input:** Sets the color as a hexadecimal value.
5. **Color Mode Panel: C** onsists of HSL(A) / RGB(A) Inputs
6. **Color Mode Switching Button**
## Types

### Default Color Picker

The default color picker offers full color customization,
including support for transparency (alpha channel). It
provides two sets of input controls:
- Red / Green / Blue / Alpha (RGBA)
- Hue / Saturation / Lightness / Alpha (HSLA)
Users can switch between the RGBA and HSLA input modes,
depending on their preference or the requirements of the
task. This version of the color picker is suitable for
advanced use cases, where precise color and transparency
control is needed.
### Simplified Color Picker

The simplified color picker provides controls for
adjusting hue, saturation, and lightness. Unlike the
default color picker, it doesn’t include an alpha
(transparency), RGB or HSL setting.
The simplified color picker displays both the current
color and the newly selected color, allowing the user to
easily compare changes. This component is intended for
use cases where a more focused and minimal color
selection is needed, without the complexity of full RGBA
or hexadecimal input options.
## Behavior and Interaction

### Picking a Color in the Color Picker Box

The color picker box enables users to select a color by
moving the color picking circle within the box. Moving
the circle vertically adjusts the hue or saturation,
while horizontal movement changes the brightness or
lightness.
This interaction allows for precise control over the
selected color by navigating through a continuous
gradient of shades and tones.
### Setting a Hue and Transparency

The hue slider enables users to select a base color by
dragging the handle horizontally across the full color
spectrum.
The transparency slider adjusts the opacity level of the
selected color, where movement from left to right
typically increases opacity.
### Picking a Color with the HSL(A) / RGB(A) Inputs

Colors can also be selected by entering values directly
into the HSL(A), RGB(A), or Hex input fields. If a user
enters a value outside the valid range, it is
automatically adjusted to the nearest allowed value. For
example, values above 255 in RGB inputs are set to 255,
and values above 360 in the hue (H) input are set to 360.
Negative values are adjusted to 0.
### Changing the Color Format

The color picker allows users to switch between RGB and
HSL color formats by clicking on the arrow buttons.
Changing the format updates the input fields accordingly,
while preserving the currently selected color.
## Responsive Behavior

The color picker supports cozy and compact [content densities](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

---

## combo-box

The combo box control allows users to select an item from a predefined list.

The control provides an editable input field for filtering the list, and a dropdown menu with a list of the available options.

If the entries are not validated by the application, users can also enter custom values.

## Usage

### Use the combo box if:
- Users need to select a single item from a long list of
items (minimum 13, maximum 200 entries).
- The values of the option list are secondary information
and do not need to be displayed right away.
- Searching on multiple attributes is required. Consider using the [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) with [select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) or [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/).
- Your use cases require that all available options should be displayed right away without any user interaction. Consider using [radio buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/radio-button/) or a radio button group.

> **Information:** For more information on which selection control to choose, see the [selection control overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#choosing-the-right-control).

## Responsiveness

Also see the section on [mobile handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/#mobile-handling) below.

## Components

### Title
A descriptive heading (1).           | _Size S_          | _Size M/L_
### Input Field
The input field (2) displays the
selected value. Users can type any
character to filter the option list.
### Dropdown Arrow
The dropdown menu’s arrow (3)
collapses and expands the option
list.
### Option List
The option list (4) contains a list
of values (5) that users can choose
from.
### Two-Column Layout
Use the combo box with a two-column layout if you need to
display additional information for the selection options,
such as currencies, country abbreviations, or system
abbreviations.
Users can filter both columns simultaneously showing only
matching entries.
### Grouping
You can group the items in the       | _Grouped suggestion list_          | _Grouped suggestion list - Size S_
suggestion list by a specific
attribute and separate them visually
with a group header.
The group headers are not
interactive.
### Clear
You can add a :decline: (_Clear)_ icon to the combo box (property: `showClearIcon`). The icon appears as soon as the combo box has a value. Clicking the _Clear_ icon removes the value from the field. | _'Clear' icon_
If you offer the _Clear_ icon, make sure that the combo box is wide enough to show
the icon in addition to the value.
## Behavior and Interaction

### Select a Value

Default (col-1)

There are three ways to select an item from the list:
1. Select the item directly from the dropdown list.
2. Type the item into the input field.
3. Use the up and down arrows to navigate the list.
Clicking the input field places the cursor in the field (1). Clicking the arrow opens the option list (2). When the
user starts typing, the list is filtered accordingly. The first item that starts with the characters entered is
highlighted in the list and autocompleted in the input field (3). Up/down moves the highlight in the list and
populates the value in the field (4). Selecting a value closes the list of options (5).

> **Hint:** With the `showitems` API, you can open the option list without having the dropdown arrow in a “pressed” state.
Clicking the arrow again opens the full option list and changes the state to “pressed”. This allows you to show some
items on focus and all items on click.

Default (col-1)

#### Autocomplete

Default (col-1)

When the first few letters are typed in the input field, the control performs autocomplete to help users to easily
select one item from the option list.

> **Warning:** The typeahead input feature is not available on Android devices.

Default (col-1)

#### Choose from Option List

Default (col-1)

The option list displays all the available items the user can choose from. The selection is always highlighted.
Selecting another option from the list moves the highlight to the newly selected option.
Clicking the arrow opens the option list below the field. If there is not enough space, the list is displayed above
the input field.

Default (col-2)

Section Metadata

style

### Filtering the Option List

When the user starts typing in the input field, the option list is filtered. Only items that match the characters entered are shown in the dropdown list. The default filtering
method is “starts with per term”, which matches the beginning of each word in an item’s text.

In addition, application developers can set a custom filtering method “starts with” or “contains” (method: [setFilterFunction](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.ComboBoxBase/methods/setFilterFunction)). The “starts with” approach filters only for items where the beginning of the label matches the query entered. The “Contains” approach searches the full label for a match.
As a visual hint for the user, the matched characters are highlighted in the option list items. The highlighting works on the basis of “starts with per term”, regardless of the
filtering method.
If the filtered option list contains items that start with the characters entered by the user, the first matching, unselected item is autocompleted in the input field.
### Auto-Resize

The width of the option list adapts
to its content. The minimum width is
the input field plus the dropdown    | _Option list – Minimum width_           | _Option list adapts to long entries_
arrow. The maximum width is the part
of the screen furthest to the right.
If the option list content requires
even more width, entries become
truncated.
### Mobile Handling

The user can enter text into the input field (supported by autocompletion). Clicking the dropdown arrow of the combo box (1) opens in a full-screen dialog (2). The user can now modify the selected entry by clicking the input field of the combo box. The mobile keyboard is then displayed, and the user can begin to enter a new term to filter the option list, also supported by autocompletion (3). The option list closes when the user clicks the _OK_ button at the bottom of the list (4) or selects an item in the list (5).

Carousel (full-width)

> **Information:** For information on how to manage leading and trailing white space (blanks) when copying and pasting text into input controls, please see [removing leading and trailing white space](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

## Styles

A combo box has different styles for its different
states. Here are some examples:

The combo box offers four value states:
- Error
- Warning
- Success
- Information

For error, warning, and information states, you can show an additional value state text message when the focus is on the combo box. The message can either be a plain text or a [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/).
For more guidance on when to use which state, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

For more information on how to use the different semantic states of the control, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

## Guidelines

### Label

The combo box control can be displayed with or without a label. If the field is attached to another field, you do not need to define a second label. For more information, see the article on how to use [labels](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/) in SAP Fiori.

### Placeholder

Do not use the placeholder attribute as an alternative to a label. This is important because the placeholder text is overwritten as soon as the form is filled out. Labels are necessary to indicate the meaning of the form fields when the placeholders are no longer visible. Show a placeholder only if the user needs a hint on data entry. Do not repeat the content of the label. A hint could be a sample value or a brief description of the expected format. Read more about how to use [placeholders](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/).

### Option List

The option list contains text values only. Keep the text values short because the list is represented using only single lines. Values that are too long might be truncated.

If you need to express that none of the selection options are selected, show a blank input field. Define a default selection whenever possible.

Don’t [disable](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#disabled) items in the option list. If an item can’t be selected, hide it.

### Sorting

We recommend sorting options alphabetically to help users find the right option quickly. For more sorting rules, check out the guidelines for the [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) control.

### Width

You can adjust the width of the option list to some extent.

The combo box control is usually used in [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), where the width is determined by the form element or container in which the combo box control is embedded. Therefore, we do not recommend defining a fixed width, but rather working with proper layout containers that have a defined width, such as the following properties: “form”, “simpleform”, “responsivegridlayout”, and “layoutdata” .

If you need to restrict the width to a defined value, set the width accordingly.

Keep in mind that there is no horizontal scrolling in the option list. Entries in the list that are too long become truncated and users may not be able to read them.

If localized text is not an issue, consider using a smaller width.

### Unit of Measurement

You can use the layout options of the [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) to add the unit of measurement (UoM) after the combo box control. Apps can use the [label-field ratio](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/#labelfield-ratio) to show the UoM after the field. However, you must make sure that the UoM is properly visualized and doesn’t wrap to the next row.

> **Hint:** 
For accessibility purposes, you can use `ariaDescribedBy` from the input control.

## Properties

### Selection

When you select a value, there are two events:

- **Change:** Occurs when the text in the input field is changed and the focus leaves the input field or the user presses the Enter key.
- **Selection change:** Occurs when the user types something that matches an item in the list; also when the user clicks a list box item, or when navigating via keyboard.

---

## combo-box-web-component

The combobox allows users to select an item from a
predefined list.
It provides an editable input field for filtering the
list, and a dropdown menu with a list of the available
options.
If the entries are not validated by the application,
users can also enter a custom value.
## When to Use

Do
Use the combobox:
- If users need to select a single item from a long list
of items.
- If the list items are secondary information and do not
need to be displayed right away.
## Anatomy

1. **Input field:** Displays the selected value.
2. **Value/text:** The content the user has entered into the field.
3. **Dropdown button:** Expands and collapses the option list.
4. **Option list:** Contains values from which the user can choose.
## Types

### List Layouts

Use the **two-column layout** if you | You can **group items** in the option list.
need to display additional
information for each option.
Two-column layout | Grouped items
### Filters

When the user starts typing in the input field, the option list is filtered. Only items that match the characters entered are shown in the dropdown list. The following filter variants are available:

**Starts with per term** (default):   | **Starts with**: Filters only for | **Contains**: Searches the full label
Filters for items where the beginning | items where the beginning of the  | for a match.
of _any word_ in in the label matches | label matches the query entered.
the query entered.
‘Starts with per term’ filter variant | ‘Starts with’ filter variant | ‘Contains’ filter variant

## Behavior and Interaction

### Choose from List
1. Clicking the dropdown button opens the suggestion list.
2. Selecting an item from the list enters it in the input field.
### Type or Paste Text
1. The component responds as the user types or pastes in text:
- - Suggestions are **filtered** based on the typed text (see [Filter Variants](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box-web-component/#Filters)).
- The **autocomplete** feature proposes matching labels. The autocompleted part of the text is highlighted.
2. To enter a value in the input field, the user can:
- - Press **Enter** to accept the autocompleted text.
- Click an item in the suggestion list.
#### Handling of Incorrect Values

- If the user pastes or types a text that doesn’t match
one of the selection options, it remains in place by
default.
- If data validation is implemented, entering an
incorrect text triggers an error message and the field
displays in an error state.
## Responsive Behavior

On mobile phones, the selection list is displayed as a full screen dialog.

---

## date-picker

The date picker lets users select a localized date using touch, mouse, or keyboard input. It consists of two parts:
the date input field and the date picker.
Use this control if the user needs to enter a single date or a date range. The control also allows users to navigate
directly from one month or year to another.

## Usage

### Use the date picker if:

- You need a range and know that your user is a power user who has to input lots of data. If the keyboard is the primary device used for navigating the app, use two input fields. This allows the user to quickly jump from field to field. By selecting a date in one of the fields, the other field should know what is selected and jump to the same selection.

## Responsiveness

The date picker provides responsive behavior that allows for simple operation on all devices. It is smaller in compact mode and provides a touch-friendly size in cozy mode.

Clicking the date picker button opens the popover in full screen. To close it, the user can select a date (which triggers the close event), or click _Cancel_ without selecting a date. Clicking the date input field allows the user to type and does not open the date picker popover.

_Date picker on a smartphone_          | _Date picker on a desktop device_
## Components

The date picker has two components: the **date input field (1)** and the **date picker button (2)**.
On all devices users can either use the input field to type a date or use the date picker button to
open the date picker calendar.

### Date Input Field

In the input field, the user can enter a date directly or select it using the date picker. The system validates the entry and provides the user with feedback. You can also show placeholder text in the field.

It is possible to add additional descriptive texts to the input field (a unit of measurement, for example) by using a new association in the `sap.m.InputBase` control called `ariaDescribedBy`. The association is responsible for referencing the elements that describe the control.

### Date Picker

With the date picker, the user can see a day view, month view, year view, or year ranges.

The **current day (1)** and the **selected date (2)** are highlighted. The calendar week is also visible in the day view. The calendar closes when a final day is selected. The user can click the arrows to navigate to the **previous and the next day (3)**, **month (4)**, or **year view (5)**, depending on the current view. To select a date the use can use the **calendar (6)**.

The selected date is shown with a blue background. The current day is indicated with a purple border and owns the focus.

The date picker can also show **special days**, which are highlighted with a colored line at the bottom of the date cell. For more information about the colors and legend, see [Legend for Highlighted Days](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/calendar/#legend-for-highlighted-days).

_Date picker with a selected date and the current date_          | _Clickable areas of the date picker_          | _Date picker with highlighted days_

You can change the default focus “today” to another date.
This can save users several clicks when they create
events. For an event end date, for example, the focus
should propose a date in the future (after the start
date).
### Month and Year Views

The month and year views can be used separately in a month or year picker. The year ranges are related to the year view and are not used separately. Selecting a year range navigates back to the year view, not the day view.

_Month view in the date picker_          | _Year view in the date picker_          | _Year ranges in the date picker_

### Footer
You can add a footer with _OK_ and _Cancel_ buttons to
the date picker popover. However, we advise against this
unless it’s very important that the user can pick
multiple values (day, month, year) without closing the
popover.
The default and recommended behavior is to close the date
picker popover upon selection of the day (or month/year
for the month and year pickers).
## Behavior and Interaction

### Selecting a Date

The user selects a date by clicking it. After the user
selects a day, the calendar closes and the date appears
in the date input field.

Clicking the arrow shows the next day, month, or year
view.

If the current month is clicked, the view changes to the
month view and the user can change the month.

By clicking on a month, the user changes the month and
the view changes to the day view.

The user can similarly change the year. By clicking the
current year, the view changes to the year view. After
the user selects a year, the view changes back to the day
view.
After the user selects a year, the view changes back to
the day view. The date in the date input field stays the
same until the user selects a new date.

### “Today” Button

You can offer a shortcut for navigating to the current date (`sap.m.DatePicker`, property: `showCurrentDateButton`). This displays an additional _Today_
icon button (:appointment: ) in the navigation part of the calendar. Pressing this button sets
the focus to the current date.
This feature is available for pickers that enable selection of individual days. For the others,
the property has no effect.
## Styles

### Value States
The date picker supports the following value states:
1. Regular
2. Positive
3. Warning
4. Error
5. Information
You can display a value state text for error, warning, and information states to provide hints for the user.
For more information on how to use the different semantic states, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).
For more information about different value states, see [UI Element States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states).
## Guidelines

### Date Formats

#### Long Date Format

Use the long date format for a **[list in a list-detail layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) / [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) / title** and **[object header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-header/) / title**. Here are some examples:

- English (US): January 16, 2022
- German (DE): 16. Januar 2022
- Danish (DK): 16. Jan. 2022

#### Short Date Format

Use the short date format for a **[list in a list-detail layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) / [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) / list of object attributes** if space is a concern. For example, you might need to save space if there is a label with the date. Here are some examples of the short date format:

- English (US): 1/16/22
- German (DE): 16.01.22
- Japanese (JP): 22/01/16

#### Relative and Medium Date Format

If appropriate, use a relative format for a **[list in a list-detail layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) / [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) / list of object status**. For example: today, 1 day ago, 2 days ago, and so on up to 6 days ago. After 6 days, use an absolute date with the medium format.

Use the absolute date with medium format in the corresponding object header in the details area. Do not use the relative format here.

#### Responsive Table

If screen space is at a premium (for example, if there are too many columns), use the short date format in table cells. Otherwise use the medium format.

If you need to display the weekday, use the full format. For example:

- English (US): Sunday, January 16, 2022
- German (DE): Sonntag, 16. Januar 2022
- French (FR): dimanche 16 janvier 2022

---

## date-picker-web-component

The date picker lets users enter a single date and
navigate directly from one month or year to another.

## When to Use

Do
Use the date picker:
- If users typically need to enter a single date.
- To navigate directly from one month or year to another.
- Тo enter a lot of data fast or primarily using the
keyboard.
## Anatomy

1. **Date input field:** The container in which a user
enters data. It contains a mask.
2. **Text:** A placeholder or selected/typed text.
3. **Date picker button:** Button that opens the calendar.
4. **Calendar component**
## Types

The date picker supports Gregorian, Japanese, Buddhist, Islamic and Persian calendars. You can use a **single calendar type** only, or show **two calendar types –** one primary and one secondary.

### Single Calendar Type

The date picker supports Gregorian, Japanese, Buddhist,
Islamic and Persian calendars.

### Two Calendar Types

In addition to the primary calendar, you can add a
secondary calendar type.

### Custom Placeholder

You can provide a **custom placeholder text**. By
default, the placeholder text shows the specific date
format (based on the user’s locale).

### Restricted Date Range

You can set **minimum and maximum dates**. In this case,
the user can only select dates within the approved range.

## Behavior and Interaction

### Selecting a Date

If the date picker is editable, the user can select a date in two ways:

- By typing in the input field.
- By choosing a date from the calendar. After selection, the calendar closes and the date appears in the date input field.

### Navigation

To change the month, the user can either use the _Previous_/_Next_ arrows or select a specific month in the month view.

To change the year, the user can either scroll through the months with the _Previous_/_Next_ arrows or select a specific year in the year view.

### Shortcuts

The following shortcuts are available for entering specific dates:

- “today”
- “yesterday”
- “in x days”
- “x days ago”

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

## date-range-selection

The control for selecting the date range is a single-field input control. Users can enter a localized date range using touch, mouse, or keyboard input, or by selecting a date range in the calendar. They can also navigate directly from one month or year to another.

## Usage

### Use the date range selection if:
- You need a time range and know that your user is a power
user who has to input lots of data. If the keyboard is the
primary device used for navigating the app, use two input
fields. This allows the user to quickly jump from field to
field. By selecting a date in one of the fields, the other
field should recognize the information and jump to the same
selection.
## Responsiveness

The date range selection is fully responsive. It is smaller in compact mode and provides a touch-friendly size in cozy mode. For more information about cozy and compact modes, see the article on [content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).

## Components

The date range selection consists of two components:
1. **Date range input field**
2. **Date range picker**
### Date Range Input Field

The user can type the date directly into the input field, or use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/). You can also show a prompt text in the field (property: placeholder). The system validates the date and gives the user feedback.
1. **Current day**
2. **Currently selected date range**
It is possible to add additional descriptive texts to the input field (a unit of measurement, for example) by using a new
association in the `sap.m.InputBase` control called `ariaDescribedBy`. The association is responsible for referencing the elements that describe the control.
### Date Range Picker

With the date range picker, the user can see a day view,
month view, or year view. The current day and the
selected date are highlighted. The calendar week is also
visible in the day view. The calendar closes when a final
day is selected. The user can click the arrows to view
the previous and next days, months, or years (depending
on the current view).
The selected date is shown with a blue background. The
current day is indicated with a purple border in the
calendar.
1\. **Previous month**
2\. **Quick month selection**
3\. **Quick year selection**
4\. **Next month**
5\. **Day selection**
Optionally, you can offer a footer with _OK_ and _Cancel_
buttons. This gives users an alternative way of
confirming the selected date range.

### Alternative triggers for the Date Range Selection
In addition to the date range input field, you can set
one of the following to trigger the date range selection
popover:
- A button
- A link
## Behavior and Interaction

### Selecting a Date Range

The users can type two dates into the date range input field or click the calendar icon to open the calendar and select a date. These two possibilities work for all devices – desktops, tablets, and smartphones.

#### Switch View

Users can click an arrow to shows the next or previous
day, month, or year.

When they click the month the month picker is displayed.

In the month picker, after the users click a month to
select it, the day picker is displayed with the focus on
the last selected start date.

When the users click the current year, the year picker is
displayed. After selecting a year, they navigate back to
the day picker.

#### Selecting a Range

After the users select a start date, the dates that they
hover over turn light blue to indicate they are selected
for the range. When the users select an end date, the
calendar closes. The range appears in the date input
field.

#### Entering Single Dates

The date range selection also allows the users to input single dates. They can type one date into the input field, or select the same day as a start and end date in the calendar.

### “Today” Button

You can offer a shortcut for navigating to the current date (`sap.m.DateRangeSelection`, property: `showCurrentDateButton`). This displays an additional _Today_ icon button (:appointment: ) in the navigation part of the calendar.
When the user clicks the _Today_ button, the system automatically makes the current date the starting date for the new date range.
If the user has already selected the first date in the date range and then clicks the _Today_ button, the
focus is set to the current date. The system cancels the previous selection and makes the current day the
starting date for the new selection.
This feature is available for pickers that enable selection of individual days. For the others, the
property has no effect.
## Styles

### Delimiter

The delimiter visualizes the start and end date. If no delimiter is given, the app uses the one defined for the used locale.

### Placeholder

If no range is selected, show a placeholder text to indicate the correct format. If no placeholder is defined, the control shows the default locale placeholder format. You can define your own placeholder, but you must also take localized versions into account.

### Validation

Use inline validation to give the user feedback, especially for errors and warnings. Possible validation states are warning, error, success, and information. The date range input field in question is highlighted by a frame in the corresponding color. If the focus is inside the field, an explanation is shown. Ensure that this explanation is as specific as possible.

For more information on how to use the different semantic states, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

_Visible frame that shows an error when the field is out of focus_                  | _Visible frame that shows a warning when the field is out of focus_                   | _Visible frame that shows that additional information is available_
_Error state with meaningful text; the date range input field is focused_           | _Warning state with meaningful text; the date range input field is focused_           | _Information state with additional information, such as a recommendation_

## Guidelines

### Display Format

You can choose whether the displayed texts are to be shown in short, medium, or long format, or in another date format like _dd–MM–yyyy_. However, other date formats (besides short, medium, and long) should be used carefully due to local dependencies.

_Long display format_           | _Medium display format_           | _Short display format_

### Input Types

The following input types are available. (Note: these examples show German date formats for January 14, 2014.)

- Unicode CLDR short format: 14.01.14
- Unicode CLDR medium format: 14.01.2014
- ISO date format: 2014-01-14
- ISO date format without delimiters: 20140114
- Unicode CLDR short format without delimiters: 140114
- Unicode CLDR medium format: 14012014

### Date Formats

#### Long Date Format

Use the long date format for a **[list in a list-detail layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) / [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) / title** and **[object header](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/object-header/) / title**. Here are some examples:

- English (US): January 16, 2022
- German (DE): 16. Januar 2022
- Danish (DK): 16. Jan. 2022

#### Short Date Format

Use the short date format for a **[list in a list-detail layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) / [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) / list of object attributes** if space is a concern. For example, you might need to save space if there is a label with the date. Here are some examples of the short date format:

- English (US): 1/16/22
- German (DE): 16.01.22
- Japanese (JP): 22/01/16

#### Relative and Medium Date Format

If appropriate, use a relative format for a **[list in a list-detail layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/flexible-column-layout/) / [object list item](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/) / list of object status**. For example: today, 1 day ago, 2 days ago, and so on up to 6 days ago. After 6 days, use an absolute date with the medium format.

Use the absolute date with medium format in the corresponding object header in the details area. Do not use the relative format here.

#### [Responsive Table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/)

If screen space is at a premium (for example, if there are too many columns), use the short date format within table cells. Otherwise, use the medium format.

If you need to display the weekday, use the full format. For example:

- English (US): Sunday, January 16, 2022
- German (DE): Sonntag, 16. Januar 2022
- French (FR): dimanche 16 janvier 2022

---

## date-time-picker-web-component

The date/time picker allows users to select both the date (day, month, and year) and time (hours, minutes, and seconds).

## When to Use

Do
Use the date/time picker:
- If you need a combined date and time input component.
- If users typically need to enter a date. Use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker-web-component/) instead.
- If users typically need to enter a time. Use the [time picker](https://sap.github.io/ui5-webcomponents/playground/?path=/docs/main-timepicker--time-picker-overview) instead.
- If users typically need to enter a date range. Use the [date range picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-picker-web-component/) instead.

## Anatomy

1. **Date input field:** Field for entering and displaying the
date and time. It contains a mask.
2. **Date/time button**: Button that opens the date/time dialog.
3. **Date picker**: Used to select a localized date.
4. **Time picker**: Used to select a localized time.
5. **Dialog footer** with _OK_ and _Cancel_ buttons.
## Types

The date/time picker supports Gregorian, Japanese, Buddhist, Islamic, and Persian calendars.

### Basic Date Time Picker

## Behavior and Interaction

### Selecting a Date and Time

If the date/time picker is editable, the user can select a date and time in two ways:

- By typing in the input field.
- By choosing a date from the calendar and time from the clock. After selection, the date/time picker closes and the date and time appear in the date input field.

### Navigation

- To change the **month**, the user can either use the _Previous_/_Next_ arrows or select a specific month in the month view.
- To change the **year**, the user can either scroll through the months with the _Previous_/_Next_ arrows or select a specific year in the year view.
- To change the **time**, the user can either choose a time on the clock or type in the specific time in time picker input field above the clock.

### Shortcuts

By default, the system enters the current time.

The following shortcuts are available for entering specific dates:

- “today”
- “yesterday”
- “in x days”
- “x days ago”
- “yesterday – today”
- “x days ago – in x days”

### Restricted Date Range

If minimum and maximum dates have been set, selection and navigation to dates outside this range are disabled.

### Formatting

When users enter a date in the input field, it must comply with the required date format. For instance, if the format pattern is yyyy-MM-dd, the user should input a date like 2015-07-30.

Supported format options are based on patterns using Unicode Locale Data Markup Language (LDML) date format notation.

Whenever possible, we recommend using the user's default date format for clarity and familiarity.

**> **Guideline:** **

Whenever possible, we recommend using the **user's default date format** for clarity and familiarity.
If technical constraints prevent supporting the default format, opt for a **medium format** instead. In most locales,
the medium format displays four-digit years, like DD/MM/YYYY or MM-DD-YYYY, which helps users quickly identify the
year.

---

## datetime-picker

The date/time picker allows users to select date and time values in a combined input. It combines a calendar view with time selection in a single field, supporting both compact and cozy display modes.

Date/time picker showing both date and time in the input field

## When to Use

Do
Use the date/time picker if:
- You need a combined **date and time** input component.

## Anatomy

Data/time picker anatomy

1. **Date input field:** The container in which users enter date and time. Includes a mask to guide input formatting.
2. **Date time button:** The button which opens the date time selection dialog.
3. **Time picker:** Allows users to select a time using a localized clock interface.
4. **Dialog footer:** Contains the _OK_ and _Cancel_ buttons for confirming or discarding input.
5. **Date Picker:** Displays a calendar for selecting the date.

## Behavior and Interaction

### Selecting Date and Time Values

#### Sizes M and L/XL

The date/time picker appears as a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) when the user clicks the date/time icon in the [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/). The user can then select the desired date from the calendar and the time from the rotating wheel. For the time, it’s possible to select hours, minutes, and seconds.

When the user clicks the _OK_ button, the popover closes and the selected date and time appear in the input field. When the user selects _Cancel_, the action is aborted and the input field remains unchanged.

If there is no value in the input field, no date is selected in the calendar. The user needs to explicitly select a date. If a date is already selected and the user changes the year or the month, they need to explicitly select the date again to confirm the change.

Date/time picker – entering a value manually or by opening the popover to pick a date and time.

#### Size S and Mobile Size

On smaller devices, the user can choose the date and time value in arbitrary order by tapping the segmented button on top of the screen. Be aware that the [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) is superimposed on the [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) during the selection process for **mobile/S sizes.**

The user can select the desired date from the [calendar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/planning-calendar/), and the time from the rotating time wheel. For the time, it’s possible to select hours, minutes, and even seconds. Clicking a date in the calendar automatically takes the user to the time selection screen.

When the user selects _OK_, the popover closes and the selected date and time appear in the input field. When the user selects _Cancel_, the action is aborted and the input field remains unchanged.

Date/time picker - smartphone view showing segmented controls for switching between date and time selection.

### “Today” Button

You can offer a shortcut for navigating to the current date (`sap.m.DateTimePicker`, property: `showCurrentDateButton`). This displays an additional _Today_ icon button (:appointment: ) in the navigation part of the calendar. Pressing this button sets the focus to the current date.

This feature is available for pickers that enable selection of individual days. For the others, the property has no effect.

“Today” button in the calendar navigation lets users quickly jump to the current date.

## States

The date/time picker combines date and time selection and supports both interaction states and value states. Interaction states include default, hover, active, focused, and disabled offering visual cues for user input. Value states - success, warning, error, and information. These states offer validation feedback to confirm correct or incorrect entries. The combination of interaction and value states reflects the current status of the field and guides user input.

### Component and Interaction States

**A. Regular:** Default state with no interaction or focus.
context and detail.
**B. Hover:** Highlighted border appears when hovering over the field.
**B. Warning:** Highlights a potentially problematic input that may still be allowed.
**C. Active:** Indicates the field is currently focused and ready for user input.
**C. Success:** Confirms the value was entered and validated correctly.
**D. Read Only:** Field is visible but cannot be edited.
**D. Information:** Signals neutral status or context without implying errors or warnings.
**E. Disabled:** Field is grayed out and not available for interaction.
For the Warning, Error and Information states, there are additional messages available to provide hints for the user.

For more information, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

## Guidelines

### Date Picker and Time Picker

In general, we recommend separating the date/time picker controls as the time picker supports the [mask input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-mask-input/) function and the date picker allows the user to enter date in different formats. This makes it easier and more convenient for the user to enter the desired values. For additional guidelines and information on individual controls, see the Related Links section below.

### Default Values

Independently of the chosen control, set the default values of the date/time picker carefully to avoid unnecessary scrolling. It often makes sense to set the default for the time to the full or half hour, setting the minutes to 00 or 30. Sometimes, it may also make sense to use the current time and date.

### Date Input Field

It is possible to add additional “description” texts to the input field (a unit of measurement, for example) by using a new association in the `sap.m.InputBase` control called `ariaDescribedBy`. The association is responsible for referencing the elements that describe the control.

### Formatting Dates and Times

For guidelines and information on the SAPUI5 date formatters, see [formatting dates](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-dates).

For guidelines and information on the SAPUI5 time formatters, see [formatting times](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-time).

### Setting Steps

You can set intervals for the minutes and seconds on the slider (properties: `minutesStep` and/or `secondsStep`). For example, if you set the seconds step to “5”, the slider offers “00”, “05”, “10”, “15”, and so on.

### Time Zone

If the user has to set a time that is time zone-sensitive, offer a select control next to the date/time picker control to choose the appropriate time zone.

## Properties

_AM_ and _PM_ are locale-dependent. The locale can be set using the property `localeId`.

You can set the display format (property: `displayFormat`) to define the format in which the time input field and the time picker dropdown display the time.

---

## feedinput

Feeds and notes are commonplace in many SAP Fiori applications. The [sap.m.FeedInput](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.FeedInput/preview) control allows users to input and post plain text, while the [sap.m.FeedListItem](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.FeedListItem/preview) control handles and displays this text. Both can be used individually, but they also complement each other well to create a simple feed or notes control.

## Usage

### Feed Input

#### Use the feed input if:
- A user needs to input small amounts of text without
formatting.
- You expect multiple instances, such as notes or feed
entries.
### Combination of Both Controls (as Feed or Notes Control)

#### Use both controls if:
- You need a feed to show textual posts.
- Your users need to input notes.
- You want to display SAP Jam feeds.
In these cases, use the [social timeline](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/#!) instead (requires SAP Jam).

## Responsiveness
Due to their responsive behavior, both controls can be used in small and large view ports or screens.                                                                                                        | _Feed – Size S_          | _Feed – Size M_
For better usability, we highly recommend that you do not stretch the controls across the full width on large screens – 2/3 or even 1/2 works just fine.
This can easily be achieved using the grid layout \.

When the width of the available space falls below 25 rem
(for example, in portrait mode on smartphones), the two
controls respond as follows:
- If a user image previously appeared in the feed input,
it will be omitted in narrow screens to give the text
field more space.
- If there is no user image, there will be no visual
change.
In the feed list item, the user’s name, image, and the
time stamp move on top of the text. If there is no image,
the name and time stamp are left-aligned together with
the text.

## Layout

### Feed Input
The feed input consists of:
- A text input field with a placeholder (input prompt)
Example: _Add a comment_
- A _Send_ button
- An optional user image
You can also choose not to show user images at all. In
this case, the size of the input area increases
automatically.
### Feed List Item
The feed list item consists of the user’s name and an optional picture of the user who wrote the note or update. The name can
contain a link that triggers a quick overview of the user’s profile data. The actual text written by the user follows the
name. Below it is a separate byline that can contain a time stamp and an attribute in the form of free text. This allows you
to put in your own attribute, such as _Approval_, _Internal_, or _External_. Both the time stamp and the attribute are optional.
If the name is a link, the picture should also be linked with the same attributes.
If the user does not have a picture assigned, a
placeholder is shown instead:

The name (and picture) can also be read-only, that is,
without a link:

If the app does not support user images, they can be
omitted:

Here, too, the name can be read-only:

It’s also possible to display rich text (formatted text)
in the feed list item. This feature should be handled
with care as it allows for countless custom layouts.
Please see that you use it responsibly and provide your
users with a consistent experience. Only deviate from the
default layout and font if absolutely required by the use
case.
Example use case: Render URLs as links.
> **Information:** The items in the feed list must be **homogeneous**. This means that they must contain the same layout and
visualization. For example, it is not possible to have a feed containing both linked and plain names, or both user
images and default images.

### Special Case: Multiple Types of Notes

Apps sometimes need to discern between different types of notes. There is an easy way to allow users to choose which type they want to see or add to the list.

You can place a toolbar containing a [select control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) at the top of the feed input control. From there, users can select the type of notes, such as _Internal Notes_ or _External Notes_. The list of notes must contain only the type selected. If the user adds a note via the feed input, the type must be set automatically according to the selection.

### Interaction – Note Types

Carousel (full-width)

## Components

The [feed input](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.FeedInput/preview) and [feed list item](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.FeedListItem/preview) do not contain subcontrols. However, you can easily combine them to create a simple feed or notes control.

Although the feed input counts as a single control, the input area inherits its behavior from the [sap.m.TextArea](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/) control.

## Behavior and Interaction

### Send Message

Initially, the feeder contains a placeholder (input prompt), and
the _Send_ button is disabled, with reduced opacity.

Clicking into the input field puts the focus on the field and
allows to start typing.
When the user starts to type, the placeholder disappears and the _Send_ button becomes active and more prominent.
If the available width is below 25 rem (for example, in portrait
mode on a smartphone), the picture is removed.
To send the text, the user must explicitly click the _Send_
button. Pressing Enter on the keyboard (on-screen or physical)
results in a line break.
### Show More Text

When the text exceeds a certain number of characters (you can overwrite the default value), the rest of the text is truncated and a _MORE_ link appears after the truncated section.

The _MORE_ link indicates the possibility of expanding the section of the feed list item itself. Hovering over the link underlines it.

### Show Less Text

When the user expands the text, the name of this link changes to _LESS_, but still behaves the same way as before.

Carousel (full-width)

Modify “MORE” / “LESS” links to “More / Less” to be
consistent with other components.

### Feed and Notes in Tables

In tables, users sometimes need to see if an object has a comment (or feed or note) without further navigation, and even be able to add/edit right from the table.

Add an additional column, named according to the type of user
input, such as _Comment_, _Note_, or _Feed_.

Place a link inside each cell with the appropriate action (row:
_Comment_, link: _Comment_ / row: _Feed_, link: _Post_).
If there can be more than one item, add a counter after the
text as well (see example on the right).
This solution works with **every** table control.
**Optional**:
Depending on the use case, it might help users if they can see the latest note. The [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) allows the feed list item (sap.m.FeedListItem) to be used inside a cell.

Reduce the property “maxCharacters” to an amount that your table can handle.
Note that once the maximum number of characters has been reached, a _MORE_ link allows users to expand the text. Technically, this is no problem for the
responsive table, but you need to ensure that the layout of your page allows this kind of expansion.
Place a link below the feed list item to allow users to add something (as described above).
When the user clicks a link, such as _Comment_ or _Note_, display a [dialog](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.m.Dialog/samples) showing all comments (notes, feed entries, and so on) along with possible actions, such as _Add_ or _Edit_, depending on your use case.

There are several ways to show notes (comments, feed entries, and so on) in a dialog:

- You can use the feed list item (and feed input) as described in this article.
- If only one single note is allowed, you can use the [text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/).
- For a large feed, you can use the [timeline control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/timeline/) (SAP Jam is required for social features).

### Actions On Feed List Items

Applications can define actions that users can perform on individual feed posts. The two most typical actions are _Edit_ and _Delete_. Other actions can be introduced as required by the use case. To keep the feed as lightweight as possible, don’t overwhelm users with too many actions or complicated actions (max. 5 per post).

## Styles

By default, feed entries are separated by divider lines. We recommend that these separators remain enabled, since they help distinguish between individual posts. However, if your list is expected to hold only a handful of entries, you can disable the separators by setting the _showSeparators_ property at list level (not at list item level) to _none_.

## Guidelines

Because the feed list item is built on the basis of the standard list item, it inherits multiple properties that may not make sense in a feed use case.

**Use only properties that are described in this article.** Especially making the entire feed list item clickable can lead to functional issues and usability problems.

Don’t stretch the feed input or the feed list items across large screens (size L and beyond). This will have a negative effect on usability and readability. Instead, only use 1/3 or even 1/2 of the screen. Implement this with the grid layout \.

If you display formatted text (rich text) in the feed list item, use formatting that is beneficial to users, **not decorative formatting**. Use formatting responsibly, and provide your users with a consistent experience. Deviate from the default layout and font only if absolutely required by the use case (example: render URLs as links).

---

## generic-mask-input

Default (col-1)

The mask input control (sap.m.MaskInput) governs what a user is permitted to enter in an input field. It allows users
to easily enter data in a certain format and in a fixed-width input (such as a date, time, phone number, credit card
number, currency, and IP address).

Carousel (full-width, col-2)

Section Metadata

style

## Usage

### Use mask input if:

- You have to govern what a user is allowed to enter in an input field.
- You have to enter data easily in a certain format and in a fixed-width input.
- You have to enter input such as a date, time, phone number, serial number, ISBN, or product activation key.

### Do not use mask input if:

- The mask prevents users from entering essential data.
- The users need to enter data in a format other than the one used by the mask (for example, if users have to enter a phone number with a format for a different region).

## Responsiveness

Mask input extends the input control ([sap.m.Input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/)) and has all the normal properties of an input field.

## Components

The mask input control has a fixed length format to which the user’s input
must conform. This can be particularly useful when the user needs to enter
text or numbers with specific formatting, such as a phone number, postal
code, or credit card number.
Mask input or a placeholder text are not substitutes for the input label.
Using a label is mandatory. Placeholder texts in an input field are
optional. Note that if there is no placeholder text, the input field will
initially look empty. The mask formatting is revealed as soon as the focus
is on the field.
It is possible to add additional descriptive texts to the input field (a
unit of measurement, for example) by using a new association in the `sap.m.InputBase` control called `ariaDescribedBy`.
The association is responsible for referencing the elements that describe
the control.
**Immutable Characters**

When defining the mask format, the developer can place immutable characters, such as brackets and dashes, in specific positions. The format also specifies the range of valid characters for each separate position, thus preventing the user from entering invalid input.

For example, when the user enters a phone number, the area code in brackets and the space between the numbers are already present.

Note that the sap.m.MaskInput control extends sap.m.Input and has all the normal properties of an input field.

When creating a new mask, the developer can change the configuration of some default properties. For example, the default placeholder symbol “_” can be changed to something else.

## Behavior and Interaction (incl. Gestures)

### Entering Text

- Mask string appears in the input field on focus.
- The default placeholder symbol is “_” and can be
changed to something else.

### Copying and Pasting

#### Copying to a mask input field:

Users can copy both formatted and unformatted strings into a mask input field. When the texts are pasted, they take on the format defined for the mask input field.

Example: Mask input field for a number with the format: (000) 000 000000

Table

Copied source string

(555) 333 123456

555-333-123456

555 (333) 12 34 56

#### Copying from a mask input field:

If you copy a string from a mask input field and paste it elsewhere, the format of the mask input field is copied as well.

> **Information:** For information on how to manage leading and trailing white space (blanks) when copying and pasting text into input controls, please see [removing leading and trailing white space](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

### Deleting Content

Deleting a character from the string leaves the input
information unchanged, except for the deleted character,
which is replaced by a placeholder. (The mask does not
shift if a character is deleted.)

## Guidelines

### Validation Rules

Another option is to define new validation rules, such as allowing lowercase characters from “a” to “e” only. This is particularly flexible because these rules are defined with regular expression syntax.

The mask comes with two predefined validation rules: one for all characters in the English alphabet, and one for the numbers from zero to ten.

Therefore, when the mask format is being defined, the alphabetic rule is represented by the letter “a”, and the numeric rule by the number “9”. For example, a numeric mask format with a length of five characters would be specified as “99999”, a mask that accepts only alphabetical characters would be specified as “aaaaa”, and a mixed mask could be “aaa99”. In the mixed mask example, the user would not be able to enter numeric characters anywhere other than in the last two positions.

When you create the MaskInput instance, you can specify the following settings:

- Mask: The format specification, such as (123) 999-999.
- PlaceholderSymbol: A single character used to represent empty positions in a mask value, such as _ _ _ _ _.
- Rules: A collection of sap.m.MaskInputRule instances.

### Unit of Measurement

You can use the layout options of the [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) to can add the unit of measurement (UoM) after the mask input control. Apps can use the [label-field ratio](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/#labelfield-ratio) to show the UoM after the field. However, you must make sure that the UoM is properly visualized and doesn’t wrap to the next row.

> **Hint:** 
For accessibility purposes, you can use “ariaDescribedBy” from the input control.

## Properties

**Mask string**
The mask is defined by its character type (or by its length, as applicable). You should consider the following important facts:

1. The mask characters normally correspond to an existing rule (one rule per unique character). Characters that do not are considered immutable characters. For example, the mask ‘2099’, where ‘9’ corresponds to a rule for digits, has ‘2’ and ‘0’ as immutable characters.
2. Adding a rule that corresponds to the symbol placeholder is not recommended and would lead to unpredictable behavior.

**Placeholder symbol string “_”**

This defines a placeholder symbol. It is shown in a position where there has not yet been any user input.

---

## input-field

A text input field allows users to enter and edit text or numeric values in one line. To help users enter a valid value, you can enable the autocomplete suggestion feature and the value help option.

## Usage

### Use the input field if:

- The user needs to enter a short, single-line text or number.
- The user needs to enter a password, URL, phone number, or email address.
- The user needs to select a single item from a large amount of data (for example, more than 200 items).
- The user needs to find an object by searching for more than one attribute, such as an ID, city, and customer name. Use this control in combination with the autocomplete suggestion feature and value help option. For a small set of values (for example, fewer than 20 items), consider using the [select control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/). Otherwise, use the [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/) (for 20-200 items).

### Do not use the input field if:

- The user needs to enter dates and times. In this case, use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/), [date range selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/), or [date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/).
- The user needs to enter long texts. In this case, use the [text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/).
- The user needs to carry out a search. In this case, use the [search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/).
- The user needs to select multiple values. In this case, use the [multi-combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/) (for fewer than 200 items) or the [multi-input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/) (for more than 200 items).

> **Information:** For more information on which selection control to choose, see the [selection control overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use).

## Responsiveness

In the examples below, the input field is shown in combination with the tabular autocomplete feature for different device sizes.

Note that when tabular suggestions are used, the column headers stay sticky when scrolling within the suggestion list.

[Cozy mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact):
When the user clicks the input field, a new full screen dialog opens in which suggested items can be selected. Here, the pop-in feature of the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) is used.

[Cozy mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact):
The pop-in feature of the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) is used here, and defined columns are wrapped into a new line due to the limited space available.

[Compact mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact):
The full table is shown by the suggest feature.
## Types

Six input types are currently supported ([API](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.InputType.html)). Be sure to select the correct type for your use case. Depending on the input type, a different keyboard layout is displayed on a mobile device (see some [sample input types](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.InputTypes/preview)).

**Note:** The control does not provide validation based on the type. The app development team must implement format validation. If binding is used, validation is carried out by the model, but error handling must still be implemented on the UI side.

### Text (default)                                           | ### Number                                                     | ### Email
_Input type text – Keyboard layout on a smartphone_          | _Input type number – Keyboard layout on a smartphone_          | _Input type email – Keyboard layout on a smartphone_

### URL                                                     | ### Telephone Number                                                     | ### Password
_Input type URL – Keyboard layout on a smartphone_          | _Input type telephone number – Keyboard layout on a smartphone_          | _Input type password – Keyboard layout on a smartphone_

Some types, such as number or telephone number, can be used together with [mask input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/generic-mask-input/) for better guidance.

## Behavior and Interaction

### Entering Text Using the Autocomplete Feature

Have a look at the interaction flow below:

Carousel (full-width)

### Entering Text Using the Value Help Dialog

Have a look at the interaction flow below:

#### Value Help Dialog on Mobile

Carousel (full-width)

#### Value Help Dialog on Desktop

Carousel (full-width)

> **Information:** For information on how to manage leading and trailing white space (blanks) when copying and pasting text into input controls, see [removing leading and trailing white space](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

## Styles

An input field can have the following styles. For more information, see [UI Element States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states).

## Properties

### Value State and Value State Message

The input control offers the four value states listed below, for which you can show an additional value state text message when the focus is on the input field.

1. Error
2. Warning
3. Success (no message is available for this state)
4. Information

For more guidance on when to use which state, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

The value state message can be either a plain text or a [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/).

### Enabled, Read-only and Disabled states
The input field has three states (see [examples of input states](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.InputStates/preview)):
1. Enabled: This is the default setting.
2. Read-only: The input field is shown in a read-only state, with a grey background.
3. Disabled: The input field is shown with a visual indication that editing isn’t possible (for example, because the user isn’t authorized to make changes).

### Required

Use this property to indicate that user input is
required. Set the property for the specific input field
to ensure that the asterisk is shown in front of the
label.
### Maximum Length

Use this property to set the maximum number of characters allowed. There is no limit by default.

### Placeholder

The placeholder, or input prompt, is a short hint (a word
or short phrase) to help the user with data entry. A hint
can be a sample value or a brief description of the
expected format.
### Description

You can provide an additional description on the input
field, for example, for units or currency. The width of
the input field and description is distributed equally by
default. Although the default setting is 50%, you can
change this with the fieldWidth property.
### Width

The width of the input field is set to 100% by default. Input fields are usually used in [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), where the width is determined by the form element or container that the input field is embedded in. Instead of defining a fixed width, we recommend working with proper layout containers, like the form, simple form, and responsive grid layout, and with the layout data property, where the width is defined by the 12-column approach.

### Text Alignment

The input field offers six types of alignment for text values ([API](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.core.TextAlign)):

- Begin
- Center
- End
- Initial (default): Browser-configured alignment is used
- Left
- Right

### Value Help

Default (col-1)

To help the user find the correct value, you can enable the value help option (property: `showValueHelp`). By enabling this option, a small
value help icon (:value-help: )is displayed in the input field on the right-hand side. To give a better indication of the type of data that can
be selected, you can exchange the value help icon (property: `valueHelpIconSrc`). Once the value help option is enabled, the click event can be registered and one of the following displayed:
- [Select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) (simple)
- [Value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) (complex)

> **Warning:** Don’t use the “value help only” option (property: `valueHelpOnly`). This can result in inconsistencies for screen reader users.

Default (col-2)

Section Metadata

style

The values can also be pasted into the input field by copying and pasting, or dragging and dropping, if the user prefers. In this case, the values are automatically transformed into conditional expressions. For example: Copying values “1234” and “5678” leads to the token generation “=1234” and “=5678”. Additionally, these values are shown in the conditions tab of the value help dialog.

### Input Assistance
Intelligent systems can help users by recommending appropriate content or suggesting an action or input the user may “prefer”. The system assists the user by entering data or filtering data. Typical examples might be a search phrase
suggestion, an appropriate form template, or a set of suggested default values for certain fields, based on the user input and interaction history.
For more information, see [Designing Intelligent Systems – Input Assistance](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/recommendations#input-assistance1).
### Autocomplete Suggestions

The input control offers three different types of autocomplete suggestions: single, two-value, and tabular. By default, the width of the suggestion box is the same as the width of the input field. You can change it with the [`maxSuggestionWidth`](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.Input.html#getMaxSuggestionWidth) property.
Note: The maximum width of the suggestion box is always slightly smaller than the width of the screen or browser window (with 1 rem of free space on the left and right sides), regardless of the value you provide for `maxSuggestionWidth`.

The position of the suggestion box depends on the space available below the control. If there is not enough space, the suggestion box is shown above the control.

As the user types, the first suggestion item that matches the characters entered is autocompleted in the input field. The typed characters are matched against the beginning of the suggestion items, based on the “starts with” filter. As a visual hint for the user, the matched characters are highlighted (bold) in the option list items. The highlighting works on the basis of “starts with per term”, regardless of the filtering method. The user can accept the autocompleted value by pressing `ENTER`.

The [autocomplete](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.Input) property is set by default if suggestions are available, but can also be switched off.

> **Warning:** The typeahead input feature is not available on Android devices

#### Single Value with Autocomplete
Single-value autocomplete displays a list of suggestions with one left-aligned value. As a base for the aggregation [suggestionItems](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#getSuggestionItems), [sap.ui.core.Item](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.core.item) is used.
Use the single-value autocomplete feature if you want to search by only one attribute, such as an ID or a customer name.
See this [live example](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.InputAssisted/preview) of single-value autocomplete suggestions.
#### Two Values with Autocomplete
The two-value autocomplete suggestion feature displays two attributes of a business object, such as a customer and an ID. As a base for the aggregation of [suggestionItems](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#getSuggestionItems), [sap.ui.core.ListItem](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.ui.core.ListItem) is used.
The text property is displayed first, and is left-aligned. The additionalText property is right-aligned. The first text property is autocompleted in the input field.
Use the two-value autocomplete feature if you want to search by two attributes. This ensures that the search is carried out for both attributes.
See this [live example](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.InputAssistedTwoValues/preview) of two-value autocomplete suggestions.
#### Tabular Autocomplete
This autocomplete feature displays the values in a table layout. Use the tabular autocomplete feature if you need to display more than two attributes.
For input fields in a tabular view, we recommend using a maximum of 4 columns. Focus on columns that are really relevant for the use case. If there are too many columns for the available
space, the width of the columns shrinks. Alternatively, you can enable the responsive behavior of the [table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/#responsiveness) (property: `enableTableAutoPopinMode`).
To use the tabular suggestion feature, use the [suggestionColumns](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.Input.html#getSuggestionColumns) aggregation to define the
columns and the correct responsive behavior for the pop-in content. Define appropriate responsive behavior for sizes S and M. For more information, see the article on the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/).
With the [showTableSuggestionValueHelp](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.Input.html#getShowTableSuggestionValueHelp) property, you can offer a _Show All Items_
button at the end of the suggest result list. Because the number of results in the suggest functionality is limited, this option helps the user find the relevant item via an alternative
dialog:
- [Select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) (simple)
- [Value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) (complex)
The width of the columns is distributed equally by default. To avoid truncation, accurately estimate the primary attribute length and set a minimum width for this column.
The column headers remain in place when the user scrolls through the suggestion list (“sticky” behavior).
See a [live example](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.m.sample.InputAssistedTabularSuggestions/preview) of tabular autocomplete suggestions.
### Grouping

You can group the items in a suggestion list by a specific attribute and separate each group visually with a group header. This feature is also available for tabular suggestion lists.

The group headers are not interactive.

### Clear

You can add a _Clear_ icon to the input field (property: `showClearIcon`). It will appear as soon as the input field has a value. Clicking the _Clear_
icon removes the value from the field. If used, make sure that the input
field is wide enough to show the _Clear_ icon in addition to the value.

### Accessibility

- The property `ariaDescribedBy` links the input field to other controls to provide additional information for assistive technologies, such as screen readers. If you use this property, we recommend linking either to on-screen controls that provide additional context or to an [invisible text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/invisible-text/).

## Guidelines

Always provide a meaningful label for any input field, and use the least complex control (such as select instead of value help). Use more intricate controls only if the use case really requires it. Where appropriate, help users by providing mask input or placeholder texts.

### Maximum Columns

For input fields in a tabular view, we recommend using a maximum of 4 columns.

### Maximum Length

Limit the length of the input field. For example, if you don’t want users to enter more than 5 characters, set the maximum length to 5. The maximum permissible character length is not defined by default. If the back-end system has a limit, ensure that you set this property accordingly.

Note that this parameter is not compatible with the input type `sap.m.InputType.Number`. If the input type is set to `Number`, the value of the `maxLength` property is ignored.

### Placeholder

Avoid using the placeholder attribute as an alternative to a label. This is important because the placeholder text is overwritten as soon as the form is filled out. Labels are necessary to indicate the meaning of the form fields when the placeholders are no longer visible.

### Description

The description field should be used, for example, for displaying units or currency. Do not use a description for help text or as a label replacement. Note that the description is not placed in a new line in size S. Therefore, only use the description property for small input fields with a short description.

### Width

- Avoid setting a fixed width, but rather embed it in a proper layout (such as a [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), simple form, or grid layout) and use the layout data property to define the responsive behavior for sizes S, M, and L:
  - Simple form – See a [live example of a simple form](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.ui.layout.sample.SimpleForm354/preview).
  - Form – See a [live example of a form](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/sample/sap.ui.layout.sample.Form354/preview).
  - Grid layout – See a [live example of a grid layout](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.ui.layout.Grid).
- Ensure an appropriate width for the range of values to be entered for the sizes S, M, and L. Keep in mind that word length can vary between languages, so take localization into account. 
### Editable and Enabled States

#### Editable

Property settings: editable = true, enabled = true

The input control is enabled and editable by default. Set the control to editable to allow the user to enter a value.

#### Not Editable

Property settings: editable = false, enabled = true

Use this state, for example, to display data only.

#### Disabled

Property settings: editable = not relevant, enabled = false

Set the control to disabled in an edit scenario to indicate that the user cannot change the control, for example, due to missing access rights or previous conditions not having been fulfilled or selected.

### Alignment

The alignment rules are the same for display mode and edit mode.

#### Align left if:

- Text is used. Also use left alignment for a phone number, URL, password, and email address.

#### Align right if:

- Amounts and decimal numbers are used.
- Values need to be added and compared.

### Value Help

Show the value help option to help the user select the correct value (such as a customer ID) from a large dataset via the:

- [Value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) (complex)
- [Select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) (simple)
- [Custom dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)

Use this option in combination with the autocomplete _suggestion_ feature.

The value help dialog should tell users what values have already been entered into an input field.

### Creating and Editing Objects

Sometimes a new object needs to be created if the user cannot find a specific item via autocomplete or value help. In this case, we recommend that you place the _New_ action next to the input field.

If you want the user to be able to edit a selected object directly, you should place the _Edit_ link next to the input field.

If both actions are needed, they should be toggled based on the content of the input field. If a valid object is selected, you should display _Edit_. If the input field is empty or the object is not valid, you should display _New_. This pattern can also be applied for the [multi-input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/), [combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/combo-box/), [multi-combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/), and [select](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select/) controls.

---

## input-list-item

The input list item contains a label and any sort of
input UI element.

## Responsiveness

In input list items, only the labels become truncated if the text is too long for the space available.

## Behavior and Interaction

Input list items are mainly used for entering data in a similar way to entering data in [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/).

Therefore, the general behavior of [list](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/list-overview/) items, such as navigation, is usually **not enabled** when input list items are used.

## Guidelines

The input list item was introduced with the original mobile-focused version of SAPUI5. However, SAP Fiori applications currently run across multiple devices and therefore tend to use the [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) for input purposes rather than the now rarely used input list item.

---

## input-web-component

An input allows users to enter and edit text or numeric values in one line.

<https://www.sap.com/design-system/live-examples/Input/Input_LE_main.html> | <https://www.sap.com/design-system/live-examples/Input/Input_LE_ValueStateMessage_v1.html>
## When to Use

Do
Use the input component:
- To enter a short, single-line text or number.
- To enter a password, URL, phone number, or email address.
- To select a single item from a large amount of data (for
example, more than 200 items).
- To find an object by searching for more than one
attribute, such as an ID, city, and customer name.
## Anatomy

An input usually consists of a field that contains a text.
1\. **Field**: Field container
2\. **Text:** Placeholder or typed text
3\. **Icon (optional)**: For example, you can enable a _Clear_ icon to remove the text that has been typed into the field.
### Dropdown Areas

The input component provides two types of dropdown area:

- An area for **suggestions**, which is triggered by typing.
- An area for **value help**, which is triggered by the respective icon button.

## Types

### Value Help

To help the user find the correct value, you can add a
value help option. A small value help icon (:value-help:
) is then displayed in the input on the right. To give a
better indication of the type of data that can be
selected, you can exchange the value help icon.
### Input with a Label

Always provide a meaningful [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label-web-component/) for any input. Labels are necessary to indicate the meaning of the input when the placeholders are no longer visible.
To indicate that a particular field is mandatory, set the “Required” indicator for the label. This displays an asterisk
(\*) next to the label associated with the field.
### Input as a Search

An input component can be used as a search field (free
text search). You can also use the search field to filter
a set of data.

## Behavior and Interaction

### Enabled, Read-Only, and Disabled States
An input can have three states:
##### Enabled

The input is currently active and allows user
interaction. It can be empty, contain a placeholder text,
or contain a value entered or selected by the user.

##### Read Only

The input contains valid values and is visualized
differently to indicate that editing isn’t possible. The
read-only state is similar to the disabled state in that
interactive functions are removed. However, a read-only
input can still be focused on and recognized by screen
readers. It also complies with visual contrast standards
for readability.
##### Disabled

All interactive functions have been removed and the user
is unable to interact with the input. The field can’t be
focused on or recognized by screen readers, and doesn’t
need to meet visual contrast requirements.
### Suggestions and Autocomplete

Using suggestions and autocomplete is the quickest way
for users to discover and select relevant input terms and
values.
- The current typed term is always highlighted with bold
text.
- Only the characters entered in the input are
highlighted, not the whole word.
- All relevant instances are highlighted, even if they
occur in one line item.
### Clear

You can enable a _Clear_ icon (:decline: ) in the input.
It appears as soon as the input has a value. Clicking the
_Clear_ icon removes the value from the field. If you use
this option, make sure that the input is wide enough to
show the _Clear_ icon in addition to the value.
## Responsive Behavior

If the user clicks the input on a mobile device in cozy mode, a new full screen dialog opens.

## Globalization and Localization

The input component supports left-to-right (LTR) and
right-to-left (RTL) reading directions.

---

## multi-combo-box-web-component

The multi combobox component enables users to select
options from a predefined list or enter a custom text.
It provides an editable input field to filter the list
and a dropdown arrow to open the list of available
options. The select options in the list have checkboxes
that permit multiple selection.
## When to Use

Do
Use the multi combobox:
- To select one or more options from a long list of options
(no more than \~200).
- If the values in the option list contain secondary
information that doesn’t need to be displayed right away.
- If the list contains more than \~200 items.

## Anatomy

1. **Text**: Placeholder or typed text
2. **Input field:** Area for displaying tokens and typing text.
3. **Arrow button:** Opens a dropdown list with the values that
can be added as tokens.
4. **Tokens:** Show individual selected values.
5. **Overflow button**: Show all selected values.
1. **n More**: Appears after the last visible token. The
count n indicates how many other values are selected.
2. **n Items**: Appears if no tokens fit into the input
field. The count n indicates how many values are selected
overall.
## Types

### Grouped Items                   | ### Predefined Options Only          | ### With Free Text Input
_Multi combobox with grouped items_ | _Multi combobox with predefined      | _Multi combobox with free text input_
options only_
The user also has the option of
The user can only write text that    | entering a freestyle text. If the
matches a predefined value in the    | text doesn’t match one of the
list. The text must start with the   | available options, no token is
first letter of a value. If the user | created and the text is displayed
types something that doesn’t match   | directly in the input field.
one of the options, the multi
combobox switches to an error state.
## Behavior and Interaction

### Select

To select values, users can:
- Click the dropdown arrow and select the relevant options
from the list.
- Start to type a value and then select the proposed option.
The selected options then appear as tokens in the input
field. If there isn’t enough space to display all the
tokens, an overflow button appears (_n More_, or _n Items_).
### Adjust Selection

To **view the selected options**, users can:
- Click the arrow button to display the full selection list (both selected and non-selected
items).
- Click the overflow button _n More_ or _n Items_ (if shown) to view all the selected items.
To **remove an item from the selection**, users can
- Click the “X” icon in the token.
- Focus on the token to select it and use the keyboard delete key to remove the token.
## Globalization and Localization

The multi combobox supports **left-to-right (LTR)** and **right-to-left (RTL)** reading directions.

---

## multi-input-web-component

A multi input allows the user to enter multiple values,
which are displayed as tokens.
To help the user enter a valid value, you can enable the
suggestions feature and the value help option.
## When to Use

Do
Use the multi input:
- To provide the value help option to help users select
or search for multiple business objects.
- To let users select multiple ranges (with the value
help).
- To enable users to add custom values.
## Anatomy

1. **Tokens:** Show individual selected values.
2. **Input field:** Area for displaying tokens and typing text.
3. **Value help icon:** Trigger for opening a value help dialog.

## Types

### With Tokens

#### Predefined Tokens Only

The user can write text in the input field that does not
correspond with the predefined values in the list, but a
token isn’t created and the text just appears in the
input field.
#### Including Token Creation

The user can write text in the input field that does not
correspond with the predefined values in the list and
create tokens with this text.
### With Value Help Icon

You can add a value help icon in the input field to
trigger a separate value help dialog for selecting the
values. The dialog must be implemented separately.
## Behavior and Interaction

### Select/Enter Values

To add values to the multi input, users can:
1. Start typing and **select a value** from the dropdown list. The selected values appear as tokens.
2. Type a text and press **Enter** to add a new value. This **creates a new token** with the typed text.
If there isn’t enough space to display all the tokens, an overflow button appears (_n More_, or _n Items_).
The user can only enter a value once. The multi input displays an error if the same token is selected
twice.
### View/Adjust Selection

If tokens are hidden in the overflow, clicking _n More_ or _n Items_ **displays all the selected values**.
To **remove an item from the selection**, users can
- Click the “X” icon in the token.
- Focus on the token to select it and use the keyboard delete key to remove the token.
## Globalization and Localization
The multi input supports left-to-right (LTR) and
right-to-left (RTL) reading directions.

---

## multiinput

A multi-input field allows the user to enter multiple values, which are displayed as [tokens](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/token/). To help the user enter a valid value, you can enable the suggestions feature and the value help option.

## Usage

### Use the multi-input field if:
- You want the user to select multiple ranges (with the value help option and the [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/)).
- The dataset to choose from is expected to increase over time (for example, to more than 200 values).
- You need to provide the value help option to help users select or search multiple business objects.
- You want to enable users to add custom values.
> **Information:** For more information on which selection control to choose, see the [selection control overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#choosing-the-right-control).

## Responsiveness

- [Cozy mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).
- When the user clicks the multi-input field, a new full screen dialog opens. After clicking the input field and typing, the suggestions can be selected. When the user makes a selection, the dialog closes and the token is displayed.
- The user can review the tokens by swiping them to the left or right.

_Multi-input field (size S)_          | _Suggestions on a smartphone (size S)_

- [Cozy mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).
- The suggestions appear below or above the multi-input field.
- The user can review tokens by swiping them to the left or right.

- [Compact mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).
- The suggestions appear below or above the multi-input field.
- The user can review tokens by pressing the right or left arrows on the keyboard.

## Types

The input types of the multi-input field are identical to those of the [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/).

## Behavior and Interaction

### Adding Tokens

A token can be added using **suggestions** or **value help**. As the user types, the first suggestion item that matches the characters entered is autocompleted in the input field. The typed characters are matched against the beginning of the suggestion items, based on the “starts with” filter. The user can accept the autocompleted value by pressing `ENTER`. The `autocomplete` property is set by default if suggestions are available, but can also be switched off.

When an item is selected from the suggestions dropdown, the corresponding token is created, and the input field is ready for the next entry. Tokens are placed next to each other on one line.

The suggestions dropdown can be wider than the input field itself, but not wider than the current browser window (property: `maxSuggestionWidth`).

> **Warning:** The typeahead input feature is not available for Android devices.

> **Hint:** Values that are entered can also be tokenized when the user presses ENTER. The app development team can perform a
custom validation of the entered data and decide whether a token should be created.

> **Information:** For information on how to manage leading and treading whitespace (blanks) when copying and pasting text into input controls, please see [removing leading and trailing whitespace](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

### Reviewing Tokens

If tokens have been selected, and the input field is not in focus, the input field displays as many tokens as possible in the available space. If more tokens have been selected, an _[n] More_ label indicates the number of hidden tokens. The tokens in the input field appear in the order in which they were selected.

Clicking the _[n] More_ label opens a popover below the input field, in which all selected items are shown. The user can deselect an item by clicking its delete icon.

If the length of the last selected token exceeds the width of the input field, a label _[n] Item/s_ is shown when the field is not in focus.

Clicking the _[n] Item/s_ label opens a popover below the input field, in which all selected items are shown. The user can deselect an item by clicking its delete icon.

If there is only one token in the input field and its length exceeds the width of the input field, the text is truncated. Clicking the token opens a popover below the input field, in which the full text of the token is shown.

_Multi-input field - '1 Item' case (desktop)_          | _Multi-input field - 'n Items' label (desktop)_
_Showing the compete item_                             | _Displaying all items_
In the input field itself, the user can review tokens
using the left or right cursor keys on a desktop, or by
swiping to the left or right on a smartphone or tablet.
Tokens can be selected by either clicking/tapping them or
by pressing **Space** (selects the focused token).
### Deleting Tokens

The user can delete tokens by pressing the _Backspace_ or _Del_ button (when selected) on a desktop’s keyboard, or by tapping the _Delete_ icon on a mobile device.

### Using Value Help

You can enable the value help option to provide a more advanced dialog for finding the relevant business object. Two dialogs can be used at present:

- [Select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) (simple)
- [Value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) (complex)

_Value help icon on empty multi-input field_           | _Select Dialog_           | _Selecting Items_           | _Displaying the selected items in the multi-input field_

_Value help icon on empty multi-input field_           | _Value help dialog_           | _Selecting Items_           | _Displaying the selected items in the multi-input field_

To give a better indication of the type of data that can
be selected, you can exchange the value help icon.

### Filtering

When the user starts typing in the input field, the list is filtered. Only items that match the character or characters entered are shown in the dropdown list. The default
filtering method is “starts with per term”, which matches the beginning of each word in an item’s text.

In addition, application developers can set a custom filtering method “starts with” or “contains” (method: [setFilterFunction](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.Input/methods/setFilterFunction)).
The “starts with” approach filters only for items where the beginning of the label matches the query entered. The “contains” approach searches the full label for a match.
As a visual hint for the user, the matched characters are highlighted (bold) in the option list items. The highlighting works on the basis of “starts with per term”,
regardless of the filtering method.
### Copying and Pasting Data from a Spreadsheet or Text File

The multi-input field can handle paste actions containing multiple items, such as items that have been selected in a column of a spreadsheet or text file. The user simply selects a whole column in the spreadsheet, copies it, and then pastes it from the clipboard into the multi-input field. Each item is represented as a token. If a single value is copied and pasted into the field, it is shown as a text value, as further editing might be required before it is converted into a token.

### Grouping

You can group the items in a suggestion list by a specific attribute and separate each group visually with a group header. This feature is also available for tabular suggestion lists.

The group headers are not interactive.

The column headers within the tabular suggestion list remain in place when the list is scrolled (“sticky” behavior). Make sure the suggestion list has no more than 4 columns. If the columns don’t all fit on the screen or get too narrow on small screens, enable the responsive behavior to move columns into the pop-in area (property: `enableTableAutoPopinMode`).

_Multi-input with grouped suggestions_           | _Multi-input with grouped tabular suggestions_           | _Multi-input field with grouped tabular suggestions making use of the table's pop-in behavior_

Due to a technical limitation, the group headers are not visible when clicking on the _n More_ text.

### Clear

You can add a :decline: (_Clear)_ icon to the input field (property: `showClearIcon`). The icon appears as soon as the multi-input field has non-tokenized text. Clicking the _Clear_ icon removes the non-tokenized text from the field.
If you offer the _Clear_ icon, make sure that the multi-input field is wide enough to show
the icon in addition to the value.

## Styles

The following images show how the states of the
multi-input field are styled.

When an error, warning, or information value state is displayed, the details can be provided as text or [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/). The text is shown when the corresponding control has the focus. If using a [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/), you can include one or several links.

For details on the different states, see [UI Element States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states).

For more information on semantic colors for value states, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

## Guidelines

- Give the control a width that is appropriate for the range of values that are going to be entered. Try to avoid setting a fixed width on this control. Instead, embed it in a proper layout (such as a form, simple form, or grid layout) and work with the layout data property.
- Provide meaningful labels for all input fields. Do not use the placeholder as a replacement for the label. The placeholder should only provide an additional hint.
- The multi-input field can currently contain tokens and one free text value. If you allow only validated values, display an error or warning when the user tries to leave the field to indicate that the value entered is invalid, or remove the value.
- If users try to select an item that has been selected before, we recommend setting an error state and providing a meaningful message.

- You can use the layout options of the [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) to add the unit of measurement (UoM) after the multi-input control. Apps can use the [label-field ratio](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/#labelfield-ratio) to show the UoM after the field. However, you must make sure that the UoM is properly visualized and doesn’t wrap to the next row.

> **Hint:** 
For accessibility purposes, you can use `ariaDescribedBy` from the input control.

- The multi-input field can be used in the [grid table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/), [analytical table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/) and [tree table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/) as well, as condensed mode is already supported, both for desktop and mobile (tablets).

- In display mode, use a [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/). Show the texts of the tokens, separated by bullet points. Provide an overflow for all texts that do not fit in one line.
- In display mode, consider the following alternatives:
  - A bulleted list with a bullet per token text (for example, using [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/))
  - A horizontal list with bullet separators between the individual token texts (for example, using [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) or [formatted text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/formatted-text/))
  - If the display mode equivalent needs to be a single-line text (as required for the grid table, tree table, analytical table), provide an overflow for all texts that do not fit onto the line (for example, by adding a [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/), opening a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/), or using an [expandable text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/expandable-text/)).

_Recommend display-mode equivalent_           | _Recommended display-mode equivalent with overflow indicator_           | _Recommended display mode equivalent with overflow opened_

## Properties

Since the multi-input field is derived from the input field, refer to the properties in the [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) article.

---

## range-slider

A range slider is a user interface control that enables the user to select a value range within a predefined numerical interval.

## Usage

Use the range slider if you want to **select a value range** within a predefined numerical interval. If you want to specify only a single value within a predefined numerical interval, use the [slider](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/slider/) instead.

## Responsiveness

The range slider itself is not responsive. It adjusts to the responsiveness of its parent container by recalculating and resizing the width of the control. The range slider supports the [cozy and compact](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact) form factors.

## Types

Only a horizontal range slider is available.

### Custom Scale
Range sliders allow you to define a custom scale (for
example, with descriptive text instead of numeric
values). This gives you full control over the labels,
their placement, density, and text.
Choose custom values that are as short and as meaningful
as possible.
> **Hint:** To use custom scales in a range slider, you must map them to the floats for the range slider scale. 
## Components

The range slider consists of:
- Progress line
- Minimum and maximum value
- Grips
- Tooltips or input fields
## Behavior and Interaction

### Changing Values

If the range slider is editable, the hand cursor appears
when hovering over the range slider with the mouse. A
tooltip also appears when hovering, displaying the
current values of each grip. The grips move together with
the corresponding tooltips.
The user can change the value range on the slider in two
ways:
- By using drag and drop to adjust the grips
- By clicking the bar outside the value range. The
corresponding grip then moves to the new position.
The grips can be moved with or without increments based
on the predefined steps.
### Range Slider with Input Fields
The range slider can be used with input fields instead of
tooltips.
### Moving the Entire Range
Users can move the entire value range by dragging and
dropping the progress line.
### Equal Values
The grips of the range slider can be positioned on the
same value.
### Overlapping

The grips of the range slider can be moved across each other. The minimum can become the maximum, and vice versa.

### Tick Marks
You can apply tick marks to the range slider. The tick
marks are related to the step property. For example, if
you have a range from 1 to 100 and a step of 10, the
range slider will have 11 tick marks. The tick marks are
responsive. If the distance between 2 tick marks is less
than 8 px, all tick marks except for the first and last
disappear.
### Tick Marks and Labels
If tick marks are set, you can define labels for the tick
marks. The labels are displayed below the tick marks and
show the corresponding value of the tick mark. The labels
must never overlap. You can also define labels only for
specific tick marks if you don’t need a label for every
tick mark on the slider. The application developer is
responsible for defining a reasonable set of tick marks.
If there is not enough horizontal space to display all
the labels, a responsive mechanism is activated. The
first and the last label are always visible.
## Properties

- The step property must be positive. If a negative number is provided, the default value 1 is used instead.
- The minimum, maximum, and value properties can be decimals (float values). The slider automatically sets the minimum value to 0 and the maximum value to 100 by default.
- The width of the control can be provided in percentage (%), em, px, and all possible CSS units. The slider automatically sets the width of the slider to 100% by default.
- The range property determines the range in which the user can select values. If the value is lower/higher than the allowed minimum/maximum, a warning message is displayed.
- The inputsAsTooltips property indicates whether input fields are being used as tooltips for the grips.

---

## range-slider-web-component

A range slider enables the user to select a value range within a given numeric interval.

<https://www.sap.com/design-system/live-examples/Range_Slider/RangeSlider_LE_main.html>

## When to Use

Do
Use the range slider:
- To provide graphical support for selecting a value
range within a given numeric interval.
## Anatomy

1. **Start point:** Minimum value of the slider range.
2. **Track** (active or inactive)
3. **Focused slider handle**: Active handle for setting the value in focus.
4. **Non-focused slider handle**: Inactive handle indicating the other selected value.
5. **Value Indicator (optional):** Displays a value indicator with the current value above the handle.
6. **Tick marks (optional):** Visualize the value intervals (steps). Each tick mark represents a selectable value.
7. **Labels (optional):** Labels some or all the tick marks with their values.
8. **End point:** Maximum value of the slider range.
## Types

The following range slider variants are available:

<https://www.sap.com/design-system/live-examples/Range_Slider/RangeSlider_SE_VariantsBasicSlider.html>

<https://www.sap.com/design-system/live-examples/Range_Slider/RangeSlider_SE_VariantsSliderwithTooltip.html>

### Custom Scale
Range sliders allow you to define a custom scale (for
example, with descriptive text instead of numeric
values). This gives you full control over the labels,
their placement, density, and text.
Choose custom values that are as short and as meaningful
as possible.
**> **Hint:** **

To use custom scales in a range slider, you must map them to the floats for the range slider scale.

## Behavior and Interaction

### Changing the Value Range

If the range slider is editable, the hand cursor appears
when the user hovers over the range slider. If value
indicators have been activated, hovering over the slider
also displays value indicators showing the current values
for each handle. The handles move together with the
corresponding value indicator.
The user can change the value range on the slider:
- By using drag and drop to adjust the handles. The handle
snaps to the nearest incremental value.
- By clicking the track outside the selected value range.
The corresponding handle then moves to the new position.
- By using the key combination **Ctrl/Cmd \+ Arrow keys**.
### Moving the Entire Range
Users can move the entire value range by dragging and
dropping the active segment of the track.
### Equal Values
The handles of the range slider can be positioned on the
same value.
### Overlapping
The handles of the range slider can be moved across each
other. The minimum can become the maximum, and vice
versa.
## Responsive Behavior

The range slider itself is not responsive. It adjusts to the responsiveness of its parent container by recalculating and resizing the width of the component.

---

## rating-indicator

The rating indicator can be used to rate content or to indicate a rating. It enables users to rate an item on a numeric scale. The most popular scale is 1 (lowest) to 5 (highest).

## Responsiveness

The rating indicator runs on all form factors and therefore works on all devices. It is embedded in a container and thus behaves as part of it.

## Layout

### Context

You can use the rating indicator in [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), [tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), in a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/) box, or in the [filter bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/).

_Rating indicator as part of a form_          | _Rating indicator in the filter bar / as part of a table_          | _Rating indicator as part of a dialog_

### Popover with Details
In collaborative rating scenarios, the rating indicator shows an average of all ratings. You may show the sum of ratings in brackets behind the rating indicator as a [text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) or [link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/). You may also add a [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/) that shows the detailed ratings for the average of all ratings.

## Behavior and Interaction

### Hover

When the user hovers over the rating indicator, a different icon or image is shown (property: `iconHovered`). This is an orange star by default.

### Select

If enabled for rating, the rating that the user previously selected is shown. When the user performs a rating, an event is triggered.

### Types
There are two types of rating indicators:
- Interactive – used for rating an item
- Disabled

As the non-interactive state (rating result preview) is
not available currently, use the disabled state instead.

## Properties

### Rating Symbols

You can also specify the URLs for the images or icons that are used as rating symbols (property: `iconUnselected`). Five star symbols are used by default. Although you can use other images or icons, we generally recommend that you use the star symbol. You can only choose 1 symbol for the unselected and 1 for the hovered state.

### Number of Rating Symbols

You can specify the number of rating symbols (property: `maxValue`). We recommend using a maximum of 7 symbols, although 5 symbols are preferred.

### Visual Mode of Rating Symbols

The visual mode defines how float values are visualized: as a half or a full star (property: `visualMode`). A half star cannot be select by a user. Therefore, it can only be displayed in read-only mode. The main use case for this is to show average ratings.

### Size of Rating Symbols
The recommended sizes of the image or icon to be
displayed are:
- Large: 2 rem (32 px)
- Normal: 1.375 rem (22 px) – default
- Small: 1 rem (16 px)
- XS: 0.75rem (12px)

---

## rating-indicator-web-component

The rating indicator can be used to rate content or to indicate a rating. It enables users to rate an item on a numeric scale. The most popular scale is 1 (lowest) to 5 (highest).

## When to Use

Do
Use the rating indicator:
- If you want to collect user feedback in the form of star
ratings (for example, for user satisfaction surveys or
product reviews).
- If you need a visually appealing way to showcase the
popularity or quality of items, products, or content.
complexity to your UI, especially when you don’t
anticipate much user interaction.

## Anatomy

1. **Selected icon**: Indicates the rating. At least one
element must be selected.
2. **Icon not selected**: Indicates non-active rating states.
## Types

### Required

You can require users to enter a rating. If you use this option, we recommend using a [label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label-web-component/) together with the rating indicator to indicate that the rating is mandatory.
### Number of Symbols

You can specify the number of rating symbols (property: `max`).
We recommend using a maximum of 7 symbols, though 5 symbols are
preferred.
## Behavior and Interaction

The behavior and interaction depends on the control state:
- In the **enabled** state, users can enter a rating.
- In the **disabled** state, the component is non-interactive.
- The **read-only** state provides visual feedback upon user
interaction. In this state, you can use a half star to show
average ratings.
## Responsive Behavior

The rating indicator runs on all form factors and therefore works on all devices.

---

## select

The select component, sometimes called a dropdown, lets users pick an item from a small, predefined list.

The select control can be placed in toolbars, such as [chart toolbars](https://www.sap.com/design-system/fiori-design-web/ui-elements/chart-toolbar/), [footer toolbars](https://www.sap.com/design-system/fiori-design-web/ui-elements/footer-toolbar/), or [header toolbars](https://www.sap.com/design-system/fiori-design-web/ui-elements/toolbar-overview/), as well as in [forms](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/) or [tables](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/).

Select component

## When to Use

**When To Use**

Do
Use the select component if:
- Users need to choose only one item from a short list, typically [between 2 and 12 items](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#best-practices).
- Users don't need to see all options at once, and it's fine for the list to stay hidden until they open it.
- It's helpful for users to start with a default selection, especially if one option is used most often.
- Users would benefit from a logically grouped list, with the most common items shown first and the others sorted alphabetically, numerically, or by topic.
- Users need to select from a predefined list of options instead of entering free-form text.

Don't
Don’t use the select component if:
- Users need to choose between only two options. Use a [switch](https://www.sap.com/design-system/fiori-design-web/ui-elements/switch/) instead.
- Users need to pick one item from a very large set. Use a [combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/) instead.
- You need to display more than one attribute or allow searching on multiple attributes. In this case, use an [input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) with a [select dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/select-dialog/) or [value help dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/).
- You need to display all available options right away, without any user interaction. Use [radio buttons or a radio button group](https://www.sap.com/design-system/fiori-design-web/ui-elements/radio-button/) instead.

For more information on which selection control to choose, see the [selection control overview](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use).

+-----------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------+
Top Tips
+-----------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------+
- Don’t overload the select component. Keep texts concise and avoid complex content.
- Whenever possible, define a default selection.
- [Sort](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/#sorting) the values in the selection list in a meaningful order.
- If you need a “[not selected](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/#no-selection)” option, use an appropriate text and not a blank value.
- Avoid using [icons](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/#tselect-with-icons) in the selection list. If you do, make sure they match the text.
- Avoid using a fixed [width](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/#width) and don’t allow the width to auto-adjust based on the selection.
- If using a [two-column layout](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/#two-column-layout), place the most relevant value in the first column.
- Avoid disabling selection options.

## Anatomy

1. **Value/Text:** The selected value.
2. **Input field:** Displays the selected option.
3. **Dropdown button:** Expands and collapses the dropdown list.
4. **Selection list:** Contains the values users can choose from.
## Types

### Layout Options

#### Simple Layout

In the simple layout, the dropdown list shows only the
value for each item.
Selection list with simple layout

#### Two-Column Layout

Use the two-column layout if you need to display additional information for each option, such as currencies or abbreviations. You can adjust the width ratio of the columns.

**Enabled**
Only the content of the first column appears in the input
field. Users see the second value when they open the
dropdown.
**Read-Only**
Both values are displayed in the input field, separated
by an en dash.
If the standard en dash separator isn’t suitable for your
use case, you can use a vertical line or bullet separator
instead.

**Disabled**
Only the content of the first column is shown.

**> **Guideline:** **

When using a two-column layout, place the more common or more relevant value in the first column.

### Select with Icons

The selection list can include text-only values or text with an icon. For more information about adding icons to list items, see [Standard List Item](https://www.sap.com/design-system/fiori-design-web/ui-elements/standard-list-item/).

Select with an icon

**> **Guideline:** **

While it's technically possible to include icons, we advise against it unless they enhance recognition or
understanding.
If your use case requires icons:
- Ensure that the icons match their intended meaning and follow established metaphors.
- Set icons via the `icon` property.
- Keep the accompanying text concise.

## States

### Component and Interaction States

[Component states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states) and [interaction states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states) define how the select control appears and behaves in response to user actions or its current condition.
**A. Hover:** Highlights the control when the cursor is placed over it.
**B. Active:** Indicates the control is focused or interacted with (clicked).
**C. Read only:** Shows that the control is visible but cannot be modified.
**D. Disabled:** Grays out the control, making it unavailable for any user interaction.
### Value States

You can use [semantic colors](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/how-to-use-semantic-colors#semantic-colors-1) to visualize [value states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states) for the selected item. This helps users quickly spot error, warning, confirmation, or information messages.

Select components using semantic colors for information, success, critical, and error value states

**A. Information:** Offers neutral or helpful context, without implying success or error.

**B. Positive:** Confirms a valid or successful selection.

**C. Critical:** Highlights a warning or a value that may need review.

**D. Negative:** Marks an error or invalid value that users need to correct.

Note that the positive or success value state doesn't show a message when focused.

For more information, see [Using Semantic and Industry-Specific Colors](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/how-to-use-semantic-colors).

## Behavior and Interaction

### Initial Display

The input field displays the current selection. If no previous selection has been made and no default option is specified, the first option is automatically selected.

**> **Guideline:** **

Whenever possible, define a default selection.

### Selection

When the user clicks the input field, the dropdown opens. Once an option is chosen, the list closes, and the selected option appears in the field. If there’s only an icon instead of a select input field, clicking the icon opens the dropdown. The currently selected item is always highlighted in the list to help the user see what's selected.

Select component – choosing a different item from the dropdown list

## Guidelines

### Selection List

#### Disabling Selection Options

Avoid [disabling](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#disabled) options, since users may not know how to re-enable them. Instead, [hide](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states#hidden) options that aren’t available.

#### No Selection

Offer a “not selected” option when there’s no initial selection or when users can clear a selection. Show this option in parentheses and place it at the start of the list.
Recommended texts:
- **(Not Selected)**
- **(No Values Selected)**
For more examples, see the [UI text guidelines](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#selection-list-options).
Don’t use a blank value to show that nothing is selected. If your use case needs a blank input field, use a [combo box](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box/).
#### No Selection – Sort/Filter/Group

When you use an icon to open options for sorting,
grouping, or filtering a set of items, use the texts
below for the “not selected” option. Place this option in
parentheses at the start of the list.
- **(Not Sorted)**
Note: In most cases, this option isn’t necessary. Show
the default sort settings instead.
- **(Not Filtered)**
- **(Not Grouped)**
### Sorting

The sorted selection list contains all items available to the user. Choose one of the following styles to order the content:

- **Logical**: Sort items in a meaningful order. Group related options together and show the most common options first, followed by less common options. If you have more than eight select options, sort them alphabetically.
- **Alphabetical**: Sort currencies, names, and similar content alphabetically.
- **Numeric:** Sort numeric values in ascending order, starting with the lowest number.
- **Chronological**: Sort time related information with the most recent item first.

Example of logical sorting

Example of numeric sorting

### Label

You can display the select component with or without a label. If the field is attached to another field, you don’t need to define a second label.

### Unit of Measurement

You can use the [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/) layout options to add the unit of measurement (UoM) after the select component. Use the [label-field ratio](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#label-field-ratio) to display the UoM after the field. Make sure the UoM is clearly visible and doesn’t wrap to the next row.

> **Hint:** 
For accessibility, you can use "ariaDescribedBy" from the input component.

## Responsiveness

### Appearance

The display of the select component depends on the device:
- Opening the select on a smartphone brings up the option
list in full screen mode. The full screen mode can be
closed using the icon on the top right corner.
- On desktop and tablet devices, the select appears as a
popover. If there isn’t enough space to show the selection
list below the field, it opens above the field.
### Title for Size S
You need to set a title for the full screen mode. We
recommend the following format:
#### Single Selection
**Select [Entity]**

#### Multi Selection
**Select [Entities]**

### Width

The select control is usually used in [forms](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), where the width is determined by the form element or container in which the select control is embedded.

If you need to limit the width to a specific value, you can set the width accordingly.

> **Guideline:** We do not recommend defining a fixed width. Where possible, use layout containers (such as a form, simple form, or
responsive grid layout), and define the width via the layout data property.
Don't allow the control to auto-adjust based on the selection.
If the text length is fixed and doesn’t require localization (for example, currency codes), consider reducing the
width.

#### Width of the Selection List

The width of the selection list automatically adjusts to
fit the longest item, with a maximum width of 600px.
Maximum width of the selection list

#### Text Wrap in the Selection List

The selection list doesn’t support horizontal scrolling.
By default, entries that exceed the maximum width of
600px for the dropdown are truncated.
If you expect the dropdown to contain longer entries, we
recommend wrapping items in the selection list to enable
users to read the full text (property: `wrapItemsText`).
If wrapping is enabled, the text can wrap to multiple
lines.
## Localization

Select is also available for right-to-left (RTL) usage. All its functionality and features are fully available in the RTL version.

Select in a left-to-right mode

---

## select-dialog

The select dialog enables users to select one or more items from a comprehensive list. The select dialog comes with a list of entries and a search field to filter the list.

A more enhanced dialog for single selection and multiselection is the [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/) as it offers range selection and excluding functions.

## Usage

### Use the select dialog if:
- Users need to select one or more entries from a
comprehensive list that contains multiple attributes or
values.

> **Information:** For more information on which selection control to choose, see the [selection control overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#choosing-the-right-control).

## Responsiveness

The display of the select control depends on the device. On phones, the selection list takes up the whole screen. On desktop and tablet devices it appears as a popover.

_Single select dialog in full screen on smartphone_          | _Multi-select dialog in full screen on smartphone_

_Single select dialog on tablet_          | _Multi-select dialog on tablet_

_Single select dialog on desktop_          | _Multi-select dialog on desktop_
## Components

### Dialog Header
You need to set the title of the dialog header **(1)**. We recommend the following form:
#### Single selection
Select
Example: _Select Product_
#### Multi-selection
Select
Example: _Select Products_
### Search
The first element in the dialog is a standard search field **(2)**.
## Behavior and Interaction

The select dialog can be called from any control. The most common trigger is an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) with a selection icon, also known as a “value help field”, or F4. Alternative triggers are [buttons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) or [icons](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/image/), which add items to an existing list.

### Single Select

Once users select an entry, the select dialog is closed and the selected entry is taken over. If applicable, the entry is displayed in the field from which the dialog was triggered.

### Multi-Select

In the multi-select version of the select dialog, [checkboxes](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) are provided for choosing multiple entries. The selection is taken over when the user chooses _Select_. _Cancel_ closes the dialog without taking over the selected values. An infobar indicates the number of selected items.

### Search

The user can search items.

### Resize and Drag Dialog

You can make the select dialog resizable and draggable by setting the corresponding properties (also called _resizable_ and _draggable_) to “true”.

A resizable dialog makes sense if the items inside have long names or descriptions.

A draggable dialog allows users to see the app content behind the dialog.

> **Guideline:** Both features are optional. However, even if you only need one, always **set both of them to “true”** to ensure consistency.

## Guidelines

### List Options

If you need to indicate that none of the selection options are selected, or you need to allow users to not select an option, offer an appropriate option, such as _(Not Selected)_ or _(No Values Selected)_. Show this option in parentheses and place it at the beginning of the list.
##### Examples:

:accept: _(Not Assigned)_
:accept: _(No Product Selected)_
:decline: _(None)_

When using the select dialog for selecting filters: If you need to indicate that all items apply as filter options, provide _All_ as an option and place it at the beginning of the list.

### Search Behavior

Two types of search behavior are available:

(1) A **live search**, also known as “search-as-you-type” (property: _liveChange_), which is triggered by each character that the user enters or deletes.

(2) A **manual search**, which is triggered explicitly after the user enters text in the [search field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/) and clicks the _Search_ icon or presses the ENTER key.

Although app developers need to decide themselves which search to use, we recommend implementing the live search whenever possible. Use the manual search only if the amount of data is too large and your app would otherwise run into performance issues. For more information, check out the article on [search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/).

### Reset/Remember Selections

By default, the selection is reset when the dialog is closed. This allows users to make a new selection when they reopen the dialog and makes sense when users need to add multiple items to a table.

However, if your use case requires selections in a dialog to be remembered so that the user can make corrections, you can set the rememberSelections function in the select dialog to “true”. When users exit the dialog by clicking _Cancel,_ the selection is then restored to the state it was in when the dialog was opened.

This also works in single-select dialogs. There, if users click the remembered item again, the dialog closes and they do not have to explicitly click _Cancel_.

### Infobar

In multi-selection mode, an [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) shows the number of selected items. Use the following format:
Selected: [Number of selected items]
Example: _Selected: 2_
Note that the infobar is not “sticky”. When the user scrolls down the list, the infobar scrolls off the screen.

**Infobar States**
The infobar has two states – active and non-active (non-clickable). For more information see [Infobar States](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/#states).
### “Clear” Button

The _Clear_ button allows users to clear all the selected items. By default, the button is **not** shown. To display the button, set the `showClearButton` property to “true”.

### Content

By default, the select dialog comes with a growing feature (property: growing = “true”). We recommend disabling the growing feature and setting this property to “false”. This ensures that all items in the table are loaded at once, and that the “Items selected” count, the search, and select/deselect features all work properly.

---

## select-web-component

##

## Intro

The select component lets users choose an item from a
small, predefined list.
Select component

## When to Use

+----------------------------------------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------------------------------------+
When To Use
+----------------------------------------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------------------------------------+
Do
Use the select component if:
- Users need to choose one item exclusively from a short list.
- Users don't need to see all options at once, and it's fine for the list to stay hidden until they open it.
+----------------------------------------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------------------------------------+
Don't
Don’t use the select component if:
- Users need to choose between only two options. Use a [switch](https://www.sap.com/design-system/fiori-design-web/ui-elements/switch-web-component/) instead.
- Users need to pick one item from a very large set. Use a [combobox](https://www.sap.com/design-system/fiori-design-web/ui-elements/combo-box-web-component/) instead.
- You need to display more than one attribute or allow searching on multiple attributes. In this case, use an [input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-web-component/) component with a select dialog or value help.
- You need to display all available options right away, without any user interaction. Use [radio buttons](https://www.sap.com/design-system/fiori-design-web/ui-elements/radio-button-web-component/) instead.

## Anatomy

### Select

1. **Input field:** Displays the selected value.
2. **Dropdown button:** Expands and collapses the dropdown list.
3. **Selection list:** Contains the values users can choose from.

### Dropdown List Item

1. **Value/Text:** Shows the value of the item or the name of the group.
Anatomy of the dropdown list item

**> **Guideline:** **

Although it's technically possible to include icons, we don't recommend it. If your use case requires icons, make
sure you choose icons that match their intended meaning and follow established metaphors.

## Types

The select component doesn't offer multiple types. Only the items in the dropdown list can have different types. You can also combine different dropdown list item variants.

### Simple Layout

In the simple layout, the dropdown list shows only the
value for each item.
Selection list with simple layout

**> **Guideline:** **

If the texts for the select options are very long and contain more than one piece of information, consider using a [two-column layout](https://www.sap.com/design-system/fiori-design-web/v1-139/ui-elements/select-web-component/#two-column-layout).

### Group Header

You can include group headers in dropdown lists to help
users scan and understand the options more easily. Group
headers are non-interactive; users can't select them as
values.
Keep in mind that the select component is designed for
small lists of items.
### Two-Column Layout

A two-column layout lets you show two values for every selectable
item. Each dropdown list item has two columns, and you can adjust
their width ratio.
The text in the input field depends on the state of the select
component:
**A. Enabled state**: Only the content of the first column appears in
the input field. Users see the second value when they open the
dropdown.
**B. Read-only state**: Both values are displayed in the input field,
separated by an en dash. If text is truncated, desktop users can
access the full text using a tooltip.
**C. Disabled state**: Only the content of the first column is shown.
**> **Guideline:** **

- Keep texts concise and avoid complex content, so you don't overload the component.
- Place the more common or more relevant value in the first column.

#### Alternative Separator

If the default en dash separator used in the input field
in read-only mode is ambiguous or unclear, you can use a
vertical line or bullet separator instead.
**A. Bullet separator**
**B. Vertical line separator**
For example, if column values include characters that
could be mistaken for separators, choosing a different
separator can help distinguish between columns.
## Behavior and Interaction

If the select component is editable, users can select an item by clicking the dropdown button and choosing an item from the list.

The component can start with no item selected or with a default value already set, which means one item in the dropdown list appears selected.

Interaction flow when no item is initially selected

## Responsive Behavior

The input field uses truncation and doesn't wrap text. Users can see the full text by opening the dropdown list or, in read-only mode, by using the tooltip on desktop devices. Items in the dropdown list use either wrapping or truncation.

Truncation and wrapping in edit mode
**> **Guideline:** **

Use simple and short text. This helps keep the select component clear and easy to use, and prevents a cluttered or
overwhelming experience for users.

### Width of the Dropdown List

The dropdown uses the same minimum width as the field. It
expands to fit the text until it reaches the maximum
width you have set. After that, text either truncates or
wraps, depending on your settings.

---

## slider

A slider is a control that enables the user to adjust single values within a specified numerical range.

## Usage

Use the slider to change values with graphical support.

## Responsiveness

The slider itself is not responsive. It adjusts to the responsiveness of its parent container by recalculating and resizing the width of the control.

The slider supports the [cozy and compact](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact) form factors. The compact form factor is used for apps that run on devices operated by a mouse and keyboard.

## Types

Only a horizontal slider is available.

### Custom Scale
Sliders allow you to define a custom scale (for example,
with descriptive text instead of numeric values). This
gives you full control over the labels, their placement,
density, and text.
Choose custom values that are as short and as meaningful
as possible.
> **Hint:** To use custom scales in a slider, you must map them to the floats for the slider scale. 
## Behavior and Interaction

### Changing the Value

If the slider is editable, the hand cursor appears when
the user hovers over the grip.

The user can change the slider setting in two ways:
- By using drag and drop to adjust the grip
- By clicking the bar. The grip then moves to this new
position.
The grip can be moved with or without increments based on
the predefined steps.
### Slider with Text Fields
The slider can be used with [text fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) instead of tooltips. In this case, the value of the grip is displayed.

### Slider with Input Fields
The slider can be used with [input fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) instead of text fields. This allows the user to enter a specific value.

### Slider with Tick Marks
You can apply tick marks to the slider. The tick marks
are related to the step property, and are responsive. If
the distance between 2 tick marks is less than 8 px, all
tick marks except for the first and last disappear.
### Slider with Tick Marks and Labels
If tick marks are set, you can define labels for the tick
marks. The labels are displayed below the tick marks and
show the corresponding value of the tick mark. The labels
must always be numbers, and must never overlap. You can
also define labels only for specific tick marks if you
don’t need a label for every tick mark on the slider. The
application developer is responsible for defining a
reasonable set of tick marks.
If there is not enough horizontal space to display all
the labels, a responsive mechanism is activated. The
first and the last label are always visible.
## Styles

The slider can be shown with or without a progress bar. By default, the progress bar is shown.

#### Examples

## Properties

- The step property must be positive. If a negative number is provided, the default value 1 is used instead.
- The minimum, maximum, and value properties can be decimals (float values). The slider automatically sets the minimum value to 0 and maximum value to 100 by default.
- The width of the control can be provided in %, em, px, and all possible CSS units. The slider automatically sets the width of the slider to 100% by default.

---

## slider-web-component

A slider enables the user to adjust a single value within a specified numerical range.

<https://www.sap.com/design-system/live-examples/Slider/Slider_LE_main.html>

## When to Use

Do
Use the slider:
- If you want to provide graphical support for changing a
value.
## Anatomy

1\. **Start point**: Minimum value of the slider range.
2\. **Track** (active or inactive)
3\. **Slider handle**: Grip for setting the value.
4\. **Value Indicator (optional):** Displays a value indicator with the current value above the handle.
5\. **Tick marks (optional)**: Visualize the value intervals (steps). Each tick
mark represents a selectable value.
6\. **Labels (optional):** Labels some or all of the tick marks with their values.
7\. **End point**: Maximum value of the slider range.
## Types

The following slider variants are available:

<https://www.sap.com/design-system/live-examples/Slider/Slider_SE_VariantsBasicSlider.html>

<https://www.sap.com/design-system/live-examples/Slider/slider_SE_VariantsSliderwithTooltip.html>

### Custom Scale
Sliders allow you to define a custom scale (for example,
with descriptive text instead of numeric values). This
gives you full control over the labels, their placement,
density, and text.
Choose custom values that are as short and as meaningful
as possible.
**> **Hint:** **

To use custom scales in a slider, you must map them to the floats for the slider scale. 
## Behavior and Interaction

### Changing the Value
If the slider is editable, the hand cursor appears when the
user hovers over the slider.
The user can change the slider setting in the following
ways:
- By using drag and drop to adjust the handle. The handle
snaps to the nearest interval value.
- By clicking the track. The handle then moves to this new
position.
- By using the key combination **Shift/Cmd \+ Arrow keys**.
## Responsive Behavior

The slider itself is not responsive. It adjusts to the responsiveness of its parent container by recalculating and resizing the width of the component.

---

## step-input

The step input control allows the user to change the input values in predefined increments (steps).

## Usage

### Use the step input if:

- The user needs to adjust amounts, quantities, or other values quickly.
- The user needs to adjust values for a specific step (for example, in a shopping cart).

### Do not use the step input if:

- The user needs to enter a static number (for example, postal code, phone number, or ID). In this case, use the regular [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) control instead.
- You want to display a value that rarely needs to be adjusted and does not pertain to a particular step. In this case, use the regular [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/) control instead.
- You want the user to enter dates and times. In this case, use the [date picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-picker/), [date range selection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/date-range-selection/), [time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/time-picker/), or [date/time picker](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/datetime-picker/) instead.

## Responsiveness

### Size S and M (Smartphone and Tablet)
On smartphones and tablets, the step input is shown in cozy mode. When the focus is in the input field, the keyboard layout for numeric input is displayed.

On desktop devices, the step input is shown in compact mode.
For more information on the cozy and compact modes, see [content density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact).
## Components

The step input consists of:
(A) Input field
(B) Button to decrease the value
(C) Button to increase the value

You can show a descriptive reference or unit of
measurement after the field (property: `description`).
Depending on your use case, you may need to adjust how
the space is distributed between the input field and the
descriptive text (property: `fieldWidth`).
## Behavior and Interaction

### Default Value

The step input always contains a value. When no value is set, the default value is generally 0. However, app developers can set a different default value (property: value).

If the minimum value is larger than 0, the generic value is the minimum value set by the app team.

### Changing the Value

The user changes the value:

- By pressing the increase/decrease buttons
- By typing a number
- With keyboard shortcuts (up/down, page up/down)
- With the mouse scroll wheel

On desktop devices, clicking the input field places the cursor in the input field. On mobile devices, tapping the input field displays the numeric keyboard.

Clicking the buttons changes the value by a step and does not place the caret in the input field.

When the user clears the value and leaves the input field, the value in the field becomes 0 or the minimum if the minimum is larger than 0.

If the user enters an invalid value, the invalid value remains in the input field. An error state is displayed.

### Increasing the Step

To allow the user to change values by a larger step with keyboard shortcuts, app developers can set a multiple of the step (property: `largerStep`). The default value is two times the set step.

If your use case requires more complex step increments (for example, if you want the step increment to be the closest number that is divisible by the defined step) you can use the `stepMode` property. For details, please refer to the [API reference](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/api/sap.m.StepInput.html).

### Maximum and Minimum Values
App developers can set a maximum and minimum value for the step input.
When the maximum/minimum values are reached, the _Increase_/_Decrease_ button and up/down keyboard navigation are disabled.
### Display Value
The step input control allows decimal values and can control the number of digits shown after the decimal point (property:
displayValuePrecision). When the property is set to a specific value – from 0 (default) to 20 – the control restricts users
accordingly as they type or paste a value. Trying to type more digits triggers an error state.
## Styles

### Editable and Enabled States
**Editable**
Property settings: editable = true, enabled = true
The step input control is enabled and editable by
default. Set the control to editable to allow the user to
enter a value.
**Not Editable**
Property settings: editable = false, enabled = true
Use this state, for example, to display data only.
**Disabled**
Property settings: editable = not relevant, enabled =
false
Set the control to disabled in an edit scenario to
indicate that the user cannot change the control, for
example, due to missing access rights or previous
conditions not having been fulfilled or selected.
### Value States

The step input control offers the four value states listed below. For the error, warning, and information states, you can show an additional value state text when the focus is on the input field. If the text gets too long, it wraps.

- Warning
- Error
- Success: No value state message is shown
- Information: Value state message can show additional information, such as recommendations.

For more information on how to use the different  value states, see [How to Use Semantic Colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors).

For more information on showing value states in a form, see [Form Field Validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/).

_Error state_          | _Warning state_          | _Success state_           | _Information state_
_Error state – With value state text_           | _Warning state – With value state text_           | _Success state – No value state text_           | _Information state – With value state text_
## Guidelines

Always provide a meaningful label for the step input.

### Width

By default the width of the step input is set to 100% of the container. Avoid setting a fixed width, but rather embed the control in a proper layout such as a [form](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form/), simple form, or [grid layout](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/grid-layout/), and use the layout data property where the width is defined by the 12-column approach to define the responsive behavior for sizes S, M, and L.

When used in forms, the width of the step input control comes from the **label:field ratio** of the form. The app development team should be able to restrict the width to a proper number of columns (12-grid responsive layout) so that the step input is not too wide.

Ensure an appropriate width for the range of values to be entered for all the sizes S, M, and L. Avoid a larger width than necessary.

Keep in mind the varying lengths of decimals. Limit the number of digits after the floating point if possible in your use case. For more information, have a look at the article on [formatting numbers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-numbers).

---

## step-input-web-component

The step input component allows the user to change the input value in predefined increments (steps).

<https://www.sap.com/design-system/live-examples/Step_Input/StepInput_LE_basic.html>

## When to Use

Do
Use the step input component:
- To adjust amounts, quantities, or other values quickly.
- To adjust values for a specific step (for example, in a
shopping cart).
does not pertain to a particular step.
- To enter dates or times.

## Anatomy

The step input component consists of:
1. **Icon buttons** to decrease or increase the value
2. An **input field**
## Types

The value in the input field can be aligned left,
centered, or aligned right (default). To make it easier
to compare numbers, we recommend using right alignment.
You can also use a label with the step input component.

<https://www.sap.com/design-system/live-examples/Step_Input/StepInput_SE_withLabel.html>

## Behavior and Interaction

The user changes the value by clicking the increase/decrease buttons, by typing a number, or by scrolling. The buttons increase or decrease the value by the increment (step) you specify.

### Initial Value

The input field always contains a value. You can set the
initial value or leave the default initial value of 0.

You can also add a placeholder text, which is visible
when the value is deleted and the step input is active.
### Value Precision

The step input component supports decimal values. You can
specify the number of digits displayed after the decimal
point.

### Minimum and Maximum Values

You can specify minimum and maximum values. When the
minimum or maximum value is reached, the corresponding
increase/decrease button and up/down keyboard navigation
are disabled.
If the user manually enters a value that is outside the
permitted range, the step input component displays an
error state and message.

---

## switch

The toggle switch mimics a physical switch. It allows
users to set individual features (such as personalization
or display settings) to either active or inactive.

## Usage

### Use the switch if:

- You want to enable users to set something as active or inactive (for example, within a [dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dialog/)).
- You need to clearly show the mode or state of a setting.
- The change takes immediate effect.

### Do not use the switch if:

- The user has to choose several options or perform extra steps for changes to become effective.
- It’s not clear if the control is showing a state or an action. In this case, use a [checkbox](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/checkbox/) instead.

## Types

There are three switch types: basic, semantic, and with optional text.

### Basic Switch (Default)

The basic switch changes |
something to active or   |
inactive. This is the    | _Default switch_
default switch.          |
### Semantic Switch

The semantic switch changes |
something to ‘positive’ or  |
‘negative’. An icon is      | _Semantic switch_
displayed automatically for |
each semantic state and     |
cannot be changed.          |
### Switch with Optional Text

You can display a text ([sap.m.text](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text/) or [sap.m.objectstatus](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-display-elements/)) next to the switch to indicate what the ‘active’ and ‘inactive’ states mean in your specific use case. Keep the text succinct. |
Position the text next to the switch:                                                                                                                                                                                                                                                                                                                                                                                 | _Switch with optional text_          | _Semantic switch with optional text_
- **Before** the switch in left-to-right writing systems                                                                                                                                                                                                                                                                                                                                                              |
- **After** the switch in right-to-left writing systems                                                                                                                                                                                                                                                                                                                                                               |
### On/Off Switch

Technically, the switch can also                                              | Don't
display 2-3 letters within the                                                |
switch.                                                                       |
**:message-warning: This design is                                            | _Switch containing text_
obsolete.** To avoid localization issues, **never use text inside a switch**. |
## Behavior and Interaction

The control supports mouse, touch, keyboard and screen reader interaction.

The user can switch between two states: active or inactive. The state is changed by moving the toggle from one side to another or by clicking the empty side. The toggle then moves over.

## Styles

Switches can have different |
states and markups, but are |
always ‘active’ or          | _Enabled semantic switch_          | _Hovered semantic switch_          | _Disabled semantic switch_
‘inactive’. The control     |
supports an enabled,        |
hovered, and disabled       |
state.                      |

---

## switch-web-component

The switch mimics a physical switch. It allows users to
toggle individual features on or off.

Switches are mainly used for settings, personalization,
and other use cases where the impact of the switch is
directly recognizable.
## When to Use

Do
Use the switch:
- To set something as active or inactive (such as a
dialog).
- To clearly show the mode or state of a setting.
- If the change takes immediate effect.
## Anatomy

1. **Track:** The track is the container for the handle.
The track color also visualizes the state of the switch.
2. **Handle:** The handle indicates whether the switch is
toggled on or off. This is visualized by different icons
within the handle.
## Behavior and Interaction

Clicking the switch toggles the state of the switch
between active and inactive. If the switch is active, the
described state is applied.
Clicking a switch sets the focus to the switch component.
This is indicated visually by a solid line that surrounds
the entire component.

---

## table-select-dialog

Table select is a commonly-used dialog that helps users to make a selection from a comprehensive table containing multiple attributes or values. With the dialog, users are also able to access additional information about the objects in the table without needing to select them first.

The dialog provides a [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/) layout with additional search, filter, and selection functionalities in the header. A footer toolbar provides actions for canceling or confirming the process.

## Usage

### Use the table select dialog if:
- You need to help users select one or more items from a
comprehensive list that contains multiple attributes or
values.
- Your use case only requires filtering without selection. In this case, use the [filter toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/filter-bar/) instead.

> **Information:** For more information on which selection control to choose, see the [selection control overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use#choosing-the-right-control).

## Responsiveness

The table inside the table select dialog behaves like the [responsive table](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/responsive-table/). On smaller screens, the columns wrap and build a list that shows all the information. All other elements in the control are also responsive.

## Behavior and Interaction

The table select dialog can be called up from any control. The trigger is usually a button with a selection icon in an [input field](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/input-field/), or an _Add_ button in a [toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/toolbar-overview/).

### Triggers

#### Input Trigger
This trigger can be useful if users need to select, for
example, one customer from a large customer register.
#### “Add” Button
This trigger can be useful if users need to add an item to a
list. For example, the dialog could help users select the
product from a large product catalog. Clicking _Select_ in the
footer toolbar of the dialog adds the selected products to the
list.
#### “Clear” Button
The _Clear_ button allows users to clear all the selected items.
Default (col-1)

### Sticky Header
The column headers and info toolbar in the table select dialog are “sticky”, which means that they stay fixed on top
when scrolling (sap.m.Table, property: sticky).

> **Information:** The “sticky” feature has some browser limitations, and is not supported in Internet Explorer and in Microsoft Edge
versions older than 41. In these browsers, the headers of the table select dialog will not be sticky.

Default (col-2)

Section Metadata

style

### Single Select

The single-select version does not need a _Select_ button in the footer toolbar because the selected entry is taken over and closed as soon as a user selects an item from the table. If applicable, the entry is displayed in the field from which the dialog was triggered. Alternatively, a [toast message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-toast/) can be shown if necessary.

### Multi-Select

The multi-select version of the table select dialog provides checkboxes for users to choose multiple items. The blue infobar above the table indicates the number of selected items. The selection is taken over when the user closes the dialog via the _Select_ button in the footer toolbar. Clicking _Cancel_ closes the dialog without taking over the selected values.

### Remembering Selections

If selections need to be memorized in order to help users make corrections, you can set the RememberSelections property to _true_. This restores the selection to the state it was in when the dialog was last opened as soon as users exit the dialog via _Select_ or _Cancel_. The interaction flow of the RememberSelections property is shown and explained in the [select dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) article.

### Grouping

The list can also be displayed as grouped. Group headers
divide the table into segments. A pregrouped table is
useful for tables with many entries, which can be sorted
by a single attribute.
### Resize and Drag Dialog

You can allow users to resize and drag the table select dialog by setting the `resizable` and `draggable` properties to “true”.

- A resizable dialog makes sense if the items within the dialog can have long names or descriptions.
- A draggable dialog allows users to see the app content behind the dialog.

> **Guideline:** Both features are optional. However, if you only need one, always **set both properties to “true”** for consistency reasons.

## Guidelines

Set the information provided in the table select dialog from top to bottom as follows:

### Dialog Header

Use the following format for the dialog header:

- For single selection: Select [Business Object]
  Example: 
- For multiple selection: Select [Business Objects]
  Example: 
### Search

The first interactive element in the dialog is a standard search field. Two types of search behavior are available:

- A **live search**, also known as “search-as-you-type,” which is triggered by each character that the user enters or deletes.
- A **manual search**, which is triggered explicitly after the user enters text in the search field and clicks the _Search_ icon or presses the ENTER key. As soon as the user hits the _Search_ button, a _Delete_ icon appears at the end of the input field to delete the keyword and cancel the result list.

App developers need to decide which search to use. **We recommend implementing the live search whenever possible**. Use the manual search only if the amount of data is too large and if your app would otherwise run into performance issues. For more information, check out the article on [searching](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/search/).

### Infobar

In multi-selection mode, an [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/select-dialog/) shows the number of selected items. Use the following format:

[Business Objects] Selected: [Number of Items]
Example: 
### “Clear” Button

The “Clear” button for clearing all the selected items is optional. By default, the button is **not** shown. To display the button, set the showClearButton property to “true”.

### Content

The content area provides a table. This behaves like the responsive table, so the columns wrap on smaller screens and display a list.

By default, the table select comes with a growing feature (property: growing = true). We recommend disabling the growing feature and setting this property to “false”. This ensures that all items in the table are loaded at once, and that the “Items selected” count, the search, and select/deselect features all work properly.

### Footer Toolbar

In the multi-select version, the footer toolbar contains the _Select_ and _Cancel_ buttons. _Select_ takes over the selection, while _Cancel_ resets the selection to the state it was in when the user opened the dialog.

In the single-select version, only provide _Cancel_ in the footer toolbar because the dialog takes over the selection as soon as the user chooses one.

---

## text-area

The text area is an input control that allows the user to enter several lines of text.

## Usage

Use the text area if you want users to enter multiple lines of text. If you only want them to enter a single line of text, use the [input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/) instead.

## Responsiveness

You can set the maximum number of lines to be shown. The amount of text depends on the size of the screen. On smaller screens, the user can scroll down the text area to see the entire text. To indicate that the text continues, the control shows only half of the last line. This also applies for mobile devices.

## Components

The text area allows the user to enter multiple lines of
text.

You can also set a placeholder (input prompt), which is
inherited from `sap.m.InputBase`; property: `placeholder`.
The prompt text is displayed when the input field is
empty.

> **Information:** For information on how to manage leading and trailing white space (blanks) when copying and pasting text into input controls, see [removing leading and trailing white space](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

## Behavior and Interaction

### Entering and Removing Text

As soon as the user starts typing, the placeholder
disappears. It appears again when the user removes all
the content from the text area.
You can also limit the number of characters a user can
enter. In this case, the text area prevents the user from
adding more characters than the maximum value defined
(property: `maxLength`).
### Making Text Non-Editable

You can set the text area to non-editable (property: `editable`).
This mode still allows the user to scroll to the text that is
currently hidden.

### Disabling Text

You can also set the text area to _disabled._ In this case, the user cannot edit or scroll (property: `enabled`).

### Growing Behavior

The text area control offers a growing property. It gives
the control the ability to automatically grow and shrink
with its content while the user is typing.
The maximum height of the text area is configurable.
Define the height to reflect the space where the control
will be located.

### Text Area Counter

#### General Information
If you have set a character limit for the text box (property: `maxLength`),                  | _Text area counter - Default state (within the limit)_
you can use the text area counter to show a character count (remaining
characters, characters over the limit).
To turn on the counter, set the property `showExceededText` to `true`.                       | _Counter over the limit_
The user can then see all inserted characters, including those that
are over the limit.
#### Basic Interactions
The number of characters allowed is displayed below the text area,
aligned to the right. A label indicates how many characters are left.
When the characters used are over the limit:
- Тhe user can continue typing
- The value of the counter changes.
- We recommend changing the text area to a warning state.
When the user pastes copied text, characters that are over the limit
are selected automatically. The user can delete any excess characters
by pressing _Delete_ or _Back_ on the keyboard (or virtual keyboard for phones and tablets).
> **Hint:** If the text area already has a value state and the text length exceeds the limit, the value states are displayed in the
following order (highest to lowest priority):
- **Additional error state available:** This results in a higher priority (error \+ warning = error). If an error state
is set, the text area is shown in an error state. When the error is fixed, the text area returns to the warning state
until the character count is within the limit.
- **Additional warning state available:** An additional warning state has the same priority as the counter warning
state (warning \+ warning = warning). The text area stays in the warning state until all of the issues are fixed. The
warning state set by the developer has the higher priority.
- **Additional success state available:** In this case, the warning state has higher priority (success \+ warning =
warning). Once the text count is within the limit, the text area shows the success state.

## Styles

As with any other input control, you can validate the fields and show the result as a value state of the control (property: `valueState`). Possible value states are error, warning, success, information, or neutral (none).
For more information, see [Semantic and Industry-Specific Colors](https://www.sap.com/design-system/fiori-design-web/foundations/visual/colors/how-to-use-semantic-colors) and [Form Field Validation](https://www.sap.com/design-system/fiori-design-web/ui-elements/form-field-validation/). | _Text area – Warning state_

## Guidelines

- As with other [input fields](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-field/), use a label. For exceptions regarding label usage, see the [Exceptions section of the Label article](https://www.sap.com/design-system/fiori-design-web/ui-elements/label/#exceptions).
- The placeholder does not substitute a label. It can be used to give an additional hint, but should not repeat the label in long format.
- If you want to use the text area with a **fixed text length** (property: `maxLength`), for example, inside a form, use text beside the text area to count down the number of remaining characters while the user is typing.
- If you are applying the growing behavior of the text area, bear in mind that its maximum height should not exceed the height of the screen.
- As a display mode equivalent, consider using an [expandable text](https://www.sap.com/design-system/fiori-design-web/ui-elements/expandable-text/).

#### Saving Forms with a Text Area Counter

If a text exceeds the limit for the text area, there are two options for saving the form:

- The form can be saved, but only contains the text within the character limit. If you follow this approach, inform the user that only part of the text will be saved. **In this case, we strongly recommend setting the text area state to “warning” to indicate that there is a problem with the text.**
- The form cannot be saved until the user edits the text and the character count is within the limit **. In this case, we strongly recommend setting the text area state to “error”.**

## Properties

- You can provide a width by specifying the average character width (property: `cols`).
- You can define the height of the text area by specifying the number of lines of text (property: `rows`). You can also set the height of the text area (property: `height`), which overrides the `rows` property.
- You can define the type of wrapping for the text area (property: `wrapping`) as `soft`, `hard`, or `off`.
- `sap.m.TextArea` has a growing property that enables the height of the text area to change dynamically while the user is typing.
- `sap.m.TextArea` can show a count for the number of permitted characters, and allow users to type/paste text over the limit (property: `showExceededText`). This property determines whether characters that exceed the character limit are visible.
  - If this property is set to `false`, the user is not allowed to exceed the number of characters set in the `maxLength` property.
  - If this property is set to `true`, characters exceeding the `maxLength` value are selected on paste, and the counter below the input field displays the number of characters that are over the limit.
- To provide additional information for assistive technologies like screen readers, use `ariaDescribedBy` and `ariaLabelledBy`.

---

## text-area-web-component

The text area is an input component that allows the user to enter several lines of text.

<https://www.sap.com/design-system/live-examples/Text_Area/TextArea_LE_Basic.html>

## When to Use

Do
Use the text area:
- If users need to enter more than one line of text.

## Anatomy

1. **Input field**: Container in which a user enters text.
2. **Text**: Placeholder or typed text. The placeholder is an optional prompt text that is displayed when the input field is empty.
3. **Scrollbar**
4. **Counter**: If you have set a [character limit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/text-area-web-component/#text-area-with-character-limit) without restricting text input, the counter indicates how many characters are left, or how many characters exceed the limit.
## Types

### Text Area with Character Limit

You can set a character limit for the text. In this case, you have two options for handling the text input:

#### Text is cut off after the character limit

Once the character limit has been reached, users can no
longer type or enter additional text. Pasted text is cut
off. This is the default setting.

#### Text can exceed the character limit

You can allow the user to enter text that exceeds the
character limit. We strongly recommend using this variant
because it offers users much better orientation:
- A character counter indicates how many characters are can
still be entered, or how many characters are over the
limit.
- If the text exceeds the limit, you can show a warning
state and a message that explains the limit.
- If users type or paste a longer text, they can see the
full text while they decide on how to best shorten it.
### Text Area with a Label

You can add a label to the text area.

## Behavior and Interaction

### Fixed Height

You can configure the height of the text area to fit the
space available on your UI. If the text doesn’t fit into
the available space, a scrollbar appears.

### Growing Behaviour

The text area component offers a growing property. If
growing is active, the input container grows and shrinks
automatically as the user types.
You can configure the minimum and maximum number of lines
to be shown. If the text exceeds the maximum number of
lines, the text area stops growing and a scrollbar
appears.
### Text Area Counter

If you have set a [character limit for the text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/text-area-web-component/#text-area-with-character-limit) but don’t restrict text entry, a character counter is displayed below the text.
If the text is over the limit:
- The user can continue typing.
- The counter indicates how many characters are over the limit.
- We recommend changing the text area to a warning state and displaying an appropriate message.
If the text is pasted into the field, any excess characters are selected automatically.
## Responsive Behavior

You can set the maximum number of lines to be shown. The amount of text depends on the size of the screen. On smaller screens, the user can scroll down the text area to see the entire text. To indicate that the text continues, the component shows only half of the last line. This also applies for mobile devices.

---

## time-picker

The time picker allows the user to select a localized time. It can be used with touch, mouse, or keyboard input.

## When to Use
### Use the time picker if:
- Users need to select a time.
- Users need to select a time range. In this case, one time picker can be used to set the starting time and
a second one to set the end time.
- Users need to select a specific duration, such as 1 minute and 30 seconds.
### Do not use the time picker if:
- Users need to select a standard duration such as 15 minutes, 30 minutes, 1 hour, or 2 hours. In this
case, use the [select](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/) control instead.
## Components

The time picker consists of a **time input field**. Users can enter a time directly or use the **time picker button** to select a time using the **time picker popover**.

On phones, selecting the time input field opens a **time input popover** for entering the time with the touch keyboard.

The time input field can also contain a placeholder (input prompt).

_Time input field on desktop_             | _Time input field on tablet_             | _Time input field on phone_
_Time picker popover on desktop_          | _Time picker popover on tablet_          | _Time input popover on phone_

### Time Picker Popover

In the time picker popover, the user can select a time by using
the clock face to set hours, minutes, and seconds. The full
time is always displayed at the top of the popover.
The popover has the following parts:
1. **Hours field**. Displays the hour entered or selected.
2. **Minutes field**. Displays the minutes entered or selected.
3. **Seconds field (optional)**. Displays the seconds entered
or selected. You can can removed the seconds field if it’s not
relevant for your use case.
4. **AM/PM switch**. The switch is displayed if the user has
opted for the 12-hour format.
5. **Clock face** for selecting the time. The appearance of the
clock face depends on the focus (hours, minutes, or seconds)
and the time format (12-hour or 24-hour clock).
6. **Footer** with _OK_ and _Cancel_ buttons.
**Hours Clock Face**
Depending on the time format, the hours | _12-hour clock face_          | _24-hour clock face_
clock face shows 12 hours or 24 hours:
- The 12-hour clock face shows only one
circle.
- The 24-hour clock face shows an
additional inner circle for the times
from 13:00 to 24:00 hours.
**Minutes Clock Face**
When the minutes value is selected in the time display,
the minutes clock face is shown.
**Seconds Clock Face**
When the seconds value is selected in the time display,
the seconds clock face is shown.
### Alternative triggers for the time picker popover
In addition to the time input field, you can set one of
the following to trigger the time picker popover:
- A button
- A link
## Behavior and Interaction

Users can enter the time in two ways:

- Enter a time directly in the input field
- Select a time using the time picker popover

### Entering a Time in the Input Field

On desktop devices, the user selects the time input field and enters the time using the keyboard.

On phones, focusing on the time input field opens a time input popover. The user can then use the mobile keyboard to enter the time. For the 12-hour time format, the popover also offers an AM/PM switch.

#### Time input popover on mobile/tablet devices

_1) Focus on time input field_           | _2a) Time input popover, 24-hour format_           | _2b) Time input popover, 12-hour format with AM/PM switch_

### Time Selection with the Time Picker Popover

By default, the time picker shows the hours clock face, and the hour value is highlighted in the time display at the top of the popover. On desktop devices, users can select the hour using a mouse or the keyboard arrows. Tablet and mobile device users can drag the handle around the dial to the desired number, or tap the number on the dial. The selected hour is then entered in the time display at the top.

When an hour value is set, the hours clock face automatically switches to the minutes view: the minutes clock face is shown and the minutes value is highlighted in the time display. If an hour was selected by mistake, the user can switch back to the hours clock face by selecting the hours value.

Minutes and seconds are selected in the same way.

Clicking the _OK_ button confirms the selected time. Clicking _Cancel_ or clicking anywhere outside the popover discards the changes.

### Default Time

You can set a predefined time, which shows as the initial value in the time input field and the time picker popover. If you don’t set a default time at application level, the control defaults to the current time. Users can overwrite the initial value.

### Preventing Errors

You can prevent users from making incorrect entries by only allowing certain characters (see [mask input](https://www.sap.com/design-system/fiori-design-web/ui-elements/generic-mask-input/)). If the user enters a time that has the correct format but is invalid (such as 12:60:85), the time picker displays a validation error (see [input validation](https://www.sap.com/design-system/fiori-design-web/ui-elements/form-field-validation/)).

You can switch off the integrated mask input feature, but we strongly recommend using it. Only deactivate mask input if you need to make an exception for your use case (for example, if a variable length is required for a specific locale).

### Now Button
You can offer a shortcut for setting the current time by displaying the _Now_ icon button (:present: ) in the navigation part of the clock (`sap.m.TimePicker`, property: `showCurrentTimeButton`). Pressing the button changes the values to reflect the current time. | _Selection of the current time with the 'Now' button_
This property applies only to pickers that enable the selection of individual times.
It has no effect on other pickers.
## Style
The time picker has five basic [value states](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states#value-states):
1. Regular
2. Information
3. Success
4. Warning
5. Error
For the information, warning, and error states, you can also display a message with additional information below the field.
## Responsiveness

The time picker comes with a cozy mode and a compact mode. In the compact mode, the time input field and the button are smaller than in the cozy mode. For more information, see [Content Density](https://www.sap.com/design-system/fiori-design-web/foundations/visual/cozy-compact).

For **mobile** (size S) devices, the time picker popover does not open below the time input field, but in a subview.

## Guidelines

### Time Formats

#### Seconds

Only let the user select time in seconds if this information is really necessary.

#### Time Zone

If the user has to set a time that is time zone-sensitive, offer a select control next to the time picker control to choose the appropriate time zone.

For more information, see [Formatting Time](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-time).

## Properties

_AM_ and _PM_ are locale-dependent. You can set the locale with the property `localeId`.

You can define the display format for the time in the input field and at the top of the time picker popover (property: `displayFormat`). For more information about time formats, see [Formatting Dates](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/formatting-dates).

---

## time-picker-web-component

> **Information:** This guideline describes the **target design** for the time picker. Some features are not yet implemented in the time picker web component.

## Intro

The time picker allows the user to select a localized time. It can be used with touch, mouse, or keyboard input.

## When to Use

Do
Use the time picker:
- To select a time.
- To select a time range. In this case, one time picker
can be used to set the starting time and a second one to
set the end time.
- To select a specific duration, such as 1 minute and 30
seconds.
## Anatomy

### Time Picker

1. **Time picker input field**: The container in which a user enters data. It contains a mask.
2. **Time picker button**: The button that opens the time picker popover-.
3. **Time picker popover**
4. **Hours field**: Displays the hour entered or selected.
5. **Minutes field**: Displays the minutes entered or selected.
6. **Seconds field (optional)**: Displays the seconds entered or selected.
You can add the seconds field if it’s relevant for your use case. The
recommended display format doesn’t include seconds.
7. **AM/PM switch**. The switch is displayed if the user has opted for the 12-hour format.
8. **Clock face for selecting the time**: The appearance of the clock face
depends on the focus (hours, minutes, or seconds) and the time format
(12-hour or 24-hour clock).
9. **Footer**: With _OK_ and _Cancel_ buttons.
### Clock Face

1. **Tick marks**
2. **Clock face circle**
3. **Number selector**
4. **Selected hours/minutes/seconds**
5. **Hours/minutes/seconds label**
## Types

### 24-Hour Clock Face

### Selection of Seconds

### Value States
## Behavior and Interaction

### Selecting a Time

To enter a time, the user can either type the value in the input field
or choose the values from the time picker popover and built-in clock
interface. By default, the time fields in the time picker popover show
the current time. Users can edit this value in the time picker popover
in two ways:
- By clicking on a value or tick mark on the clock face to select the
corresponding time value. Even if the time doesn’t initially display a
number, it becomes visible upon hover or click.
- By dragging the mouse round the clock face for more precision.
Once a value has been selected, the focus automatically moves to the
next time field in the sequence (for example, from hours to minutes).
The clock face shows the current value for this field (for example 30
minutes). Once the value for the last time field has been selected,
the focus remains unchanged.
To change a time value, the user can click on the corresponding time
field (for example, hours) and choose a different value on the clock
face.
Clicking the _OK_ button confirms the selected time. Clicking _Cancel_ or clicking anywhere outside the popover discards the changes.
### Shortcuts

You can use the following shortcuts to enter a specific time.

- “now”
- “in 1 hour” / “in x hours”
- “1 hour ago” / “x hours ago”

The system calculates the time automatically and enters it in the input field.

## Responsive Behavior

On a tablet or mobile device, tapping the input field
opens a popover. To set the value, the user enters the
desired value in each input field within the popover.

Tapping the time picker button within the input field
opens the time picker popover.

On smartphones, the popover is displayed as a full screen
dialog.

---

## token

Tokens are small items of information (similar to tags) that mainly serve to visualize previously selected items. The tokenizer is the container that handles the tokens. Tokens can be added, removed, selected, or deselected.

## Usage

Use tokens only in the [multi-combo box](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multi-combobox/), [multi-input](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/multiinput/) control, or [value help dialog](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/value-help-dialog/).

## Components

The tokenizer is an invisible container that can display multiple tokens.

Tokens have the following properties:
- They usually contain single text items.
- They may also contain key-value pairs, such as _John Miller (ID1234567)._
- They contain a :decline: _(Remove)_ icon, which is only visible if the token is in edit mode.
## Behavior and Interaction

### Interacting

Users can interact with tokens using a mouse, keyboard, and/or touch input. In size L (desktop) only, hovering with the mouse over the token produces a tooltip with the entire content of the token (on a maximum of two lines).

### Selecting and Deselecting Tokens

Users can select tokens by clicking them, or by using the keyboard. The selected tokens are then indicated. Users can select multiple tokens separately by holding down the **Ctrl** key and clicking the relevant tokens.

The user can select a series of tokens by placing the cursor in an initial position (which can also be a token), holding down the SHIFT key, and clicking a new position. The tokens between these two cursor positions are then selected.

### Adding Tokens

The user can add tokens to the multi-combo box and multi-input control. New tokens are added in the order in which they are entered.

> **Information:** For information on how to manage leading and trailing white space (blanks) when copying and pasting text into input controls, please see [removing leading and trailing white space](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/formatting/leading-trailing-blank-removal).

### Removing Tokens

The user can instantly remove tokens via the keyboard, or by clicking the _Remove_ :decline: icon.

## Styles

There are five different styles of tokens: **regular**, **on hover**, **selected**, **selected on hover** and **read-only**. These styles correspond to the type of interaction being used.

_Regular_   | _On hover_  | _Selected_  | _Read only_ | _Hover selected_

## Guidelines

- The tokenizer can also be used as a tag container.

---

## translation-of-textual-user-input

> **Information:** This article only covers texts **maintained by the user of an application**. It does not cover translation of UI texts, documents, or configuration.

## Intro

In order to fulfill international business needs, business
objects may need to support textual input to be
translatable into several languages. The use cases for
translations of texts might be very specific to the
application context. This guideline will define a pattern
for a general use case. If your use case differs, use this
pattern as the basis and adapt it as necessary.
The key features of this pattern are:
- The initial maintenance of an object and its translation
are separate steps. Therefore the maintenance screen of the
object (in many cases the object page) will accept any
textual input in the login language.
- The translation of the textual input is a separate
(follow up) step. It is done in a separate pop-over dialog
focusing solely on the translation task.
## Usage

### Use text field translation if:
- Several fields of an object need to be translated.
- The users maintain data of their actual business
processes in one language.
- Translation into another/several other languages is a
follow-up step.
## Structure

Default (col-1)

This pattern assumes that the business user wants to focus on the maintenance of the business object as regards the
business results needed. To achieve that, the translatable text fields are on the object page among any other
editable fields of the object. Translation is done in both patterns in a separate dialog.
The following logic applies:
Display mode:
- Translatable text fields are displayed in the login language.
- If the text does not exist in the login language, a fallback language will be shown.
1. Fields show the login language.
2. If the login language does not exist, texts will be shown in English.
3. If the English version does not exist, the original text language will be shown.
- To make it visible for the user that the text is not shown in the login language, the language code can be appended
to the text.
Edit mode:
- Translatable text fields are always displayed and edited in the login language.
- If the text does not exist in the login language, a fallback language will be shown.
1. Fields show the login language.
2. If the login language does not exist, texts will be in English.
3. If the English version does not exist, the original text language will be shown.
- The fallback text is shown as a placeholder text. It cannot be edited, but it can be overwritten with the login
language text at any time.
- The language code can be appended to the placeholder text.

> **Warning:** Do not show the fallback language in an editable text field. It would be unclear for a user if the field would be
written in the login language or in its original language after an update.

Default (col-2)

Section Metadata

style

## Behavior & Interaction

Default (col-1)

The text field translation pattern is intended to support the users to:
- Initially maintain a business object in their language.
- Translate the object into the needed languages
- themselves,
- via a peer or
- via an external translation bureau.
The object page focuses on the business needs. The translation task is moved to a pop-up.
- The pop-up is opened by clicking the _Translate_ button.
- Depending on the distribution of the fields of the object page, the translate action can be placed as a global action
in the header toolbar or as a local action in the relevant section.
- Optionally, an attribute in the object page header can give Information on the translation status, as an overview or
as a quick view with details.
The translation pop-up is organized in tabular form. For each field one line is included. Per displayed language one
column is shown. The following requirements apply:
- If the translate action on the main header bar is activated, the translation will open as an expanded pop-up.
- In the filter the user can select which languages to choose.
- The field type matches the field type of the main UI.
- Set text areas to “growing” mode.
- The table is a responsive table.
- In case of an object with a deep structure with translatable fields in details of the object, fields can be repeated.
- Optionally, the functionality for Excel import/export can be supported to ease communication with translation bureaus.

#### Object Page Example - Multiple Field Translation

Carousel (full-width, col-2)

Default (col-2)

Section Metadata

style

## Responsiveness

Default (col-1)

Since the translation pop-up uses the responsive table, it can be used on form factors M and L. If too many languages
are displayed, the pop-in behavior of the responsive table will apply.
Since the task of actual translation demands a side-by-side display of the original and translated fields, this use
case cannot reasonably be achieved on form factor S.
Therefore on form factor S:
- Only **one** language is displayed.
- The edit mode is not supported.

Carousel (full-width, col-2)

Section Metadata

style

---