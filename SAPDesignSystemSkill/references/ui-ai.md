# SAP Fiori UI Elements: Ai

This reference covers the following UI components:

- [Ai Notice](#ai-notice)
- [Ai Writing Assistant](#ai-writing-assistant)
- [Local Ai Notice](#local-ai-notice)

---

## ai-notice

Transparency is essential for [building trust](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-120/foundations/ai-and-joule-design/guidelines/building-trust-with-generative-ai#fairness-and-inclusion) when incorporating AI into product experiences, and the AI notice is pivotal in achieving transparency. It informs users when content is AI-generated, reminding them to double-check its accuracy before using it.

This article focuses on the AI notice in text generation scenarios.

## Usage

Use the AI notice pattern in scenarios where AI generates the content and the user needs to be informed.

The current version of the AI notice primarily addresses the generation of unstructured text. For collaboration on additional application scenarios and future enhancements to this pattern, please get in touch with the [AI Experience team](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/ai-design-contact-us).

Do
- Use the AI notice for text area or rich text editor
markup containing AI-generated text.
- Don’t hide the AI notice.
- Don’t overwhelm users with excessive AI notice usage;
balance transparency and user experience.
- Don’t change the text provided.
- Don’t use AI service names that are different from
those recommended.

## Anatomy

The AI notice pattern extends the [text area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area/) and [rich text editor](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/rich-text-editor/) components. These components can carry AI content to enable further AI-specific interactions, such as identifying AI-generated text, providing explanations, or collecting user feedback.

### AI Notice Structure

For more information, see the following components that are used in this pattern: [Label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/), [Link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/), [Icon Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#icon-buttons).

1. **AI credit**: “Created with AI”
2. **Service reference link (optional)**: Link to provide access to further background information.
3. **Verification prompt**: “Verify results before use.” Shows if horizontal space is sufficient. See [Responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/ui-elements/ai-notice/#responsiveness).
4. **Toolbar (optional)**: Additional options related to the AI content (such as giving user feedback).
For more information, see the following components that are used in this pattern: [Label](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/label/), [Link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/), [Icon Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/#icon-buttons).
## Types

The current iteration of the AI notice focuses on AI-assisted text editing within the text area and rich text area components. As we refine this guideline, we anticipate including additional application scenarios in the future.

### Text Editing with AI Assistance

The AI notice “Created with AI” highlights that some or all of the content is AI-generated. The AI content can be triggered through a conversational experience or by a local action embedded in the main screen.

#### AI Notice Placement

Carousel (full-width)

At SAP, intelligent solutions are enabled through various machine learning methods. The AI notice doesn’t expose information about the technology or API service used. To provide this information, use the [explainable AI concept](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/explainable-ai) and apply [progressive disclosure](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/ai-and-joule-design/ai-design-glossary#progressive-disclosure-).

### Text Variants

If a third-party AI service is embedded, qualify the AI source by adding a prefix.

Table

#### Scope

##### Hosted by SAP
Joule Digital Assistant

Embedded AI Features

##### Third-Party AI Services
Embedded AI Features

## Behavior and Interaction

The only interaction you can offer to users is an embedded link representing the AI service in use. Clicking this link provides progressive disclosure of relevant information and resources (for example, on SAP Help Portal).

## Responsiveness

The length of the text can vary as per your device size. See the recommended variants per screen size below:

Table (col-1)

#### Viewport/Screen Size

##### Mobile
Size S

Size M

##### Desktop
Size L

Size XL

## Recommended Reading

- [Building Trust with Generative AI](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-120/foundations/ai-and-joule-design/guidelines/building-trust-with-generative-ai#fairness-and-inclusion)
- [SAP Global AI Ethics Policy](https://www.sap.com/documents/2022/01/a8431b91-117e-0010-bca6-c68f7e60039b.html)
- [UI Text Guidelines for SAP Fiori Apps](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-120/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori)
- [Text Area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/text-area-web-component/)
- [Rich Text Editor](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/rich-text-editor/)

---

## ai-writing-assistant

This article discusses the usage of the AI writing assistant.

The AI writing assistant streamlines interactions with generative AI, helping users complete tasks more efficiently and making the experience intuitive and valuable for them.

The AI writing assistant is available within an input field, text area, or rich text editor component to assist users in creating, iterating, and improving their text input through [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/). These instructions for generative AI are crafted by experts known as prompt engineers, who focus on prompt quality and achieving the most optimal output. The AI writing assistant menu provides writing-specific prompts such as *Change Tone*, *Adjust Length*, *Translate*, and *Make Bulleted List*, which users can apply to the entire text.

*AI writing assistant applied to a rich text editor*

## When to Use

+----------------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------------+
When To Use
+----------------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------------+
Do
Use the AI writing assistant:
- For repetitive text writing and editing tasks.
- To spark creativity with diverse, unexpected AI outputs.
- To enhance and speed up text iteration and refinement.
+----------------------------------------------------------------------------------------------------x-----------------------------------------------------------------------------------------------------+
Don't
Don’t use the AI writing assistant:
- For non-AI functions.
- For non-text editing tasks.
- Together with the button or menu for [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/).
- For personalized or customized outputs. Use [guided prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/guided-prompts/), custom prompts, or Joule instead.
- Where AI-assisted editing adds no value, for example:
- Pre-populated fields with confident AI recommendations
- Unpredictable user intent
- Lack of context or data for high-quality results; consider using [guided prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/guided-prompts/), custom prompts, or Joule instead.

+------------------------------------------------------------------------------------------------------------------x------------------------------------------------------------------------------------------------------------------+
Top Tips 
+------------------------------------------------------------------------------------------------------------------x------------------------------------------------------------------------------------------------------------------+
- Use the AI writing assistant with the [AI notice base concept](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/ai-notice-base-concept) to inform users they’re interacting with AI.
- Make sure that the language used by the AI agent is unbiased and inclusive. It should also correspond to the company tone and identity.
- Use recommended AI action labels and keyboard shortcuts.
- Ensure text area and rich text editor components have the proper minimum height to accommodate the AI writing assistant.
- Prioritize AI value and performance:
- Enable the AI writing assistant only on key fields that benefit from creative or iterative suggestions.
- Coordinate with your product team to limit AI prompts based on user needs and subscription costs.
- Use a character limit as a parameter for content generation to reduce subscription costs and improve user outcomes.

+------------------------------------------------------------x------------------------------------------------------------+
Top Tips 
+------------------------------------------------------------x------------------------------------------------------------+
- Make sure that the language used by the AI agent is unbiased and inclusive.
- Use recommended AI action labels and keyboard shortcuts.
- Ensure text area and rich text editor components have the proper minimum height to accommodate the AI writing
assistant.
- Prioritize AI value and performance:
- Enable the AI writing assistant only on key fields that benefit from creative or iterative suggestions.
- Use a character limit as a parameter for content generation to reduce subscription costs and improve user outcomes.

## Components

The AI writing assistant pattern extends the following components to enable new AI-specific interactions:

- [AI button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/)
- [Menu](https://www.sap.com/design-system/fiori-design-web/ui-elements/menu-web-component/)
- [Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/input-web-component/)
- [Text area](https://www.sap.com/design-system/fiori-design-web/ui-elements/text-area-web-component/)
- [Rich text editor](https://www.sap.com/design-system/fiori-design-web/ui-elements/rich-text-editor/)

### Within input

In a single-line input, the AI writing assistant includes the following components:

1. **AI icon menu button:** Embedded within the input
field, the button indicates AI writing assistance and
offers a menu with AI prompts.
2. **Menu:** Popover menu consisting of AI prompts
configured by product teams.
3. **Versioning:** Enables users to navigate through the
different versions of text. Positioned within the menu, it
includes:
**a. Version indicator**
**b.*Previous Version* button** for navigation
**c. *Next Version* button** for navigation
### Within a text area or rich text editor

In the text area and rich text editor components, the AI writing assistant includes the following components:

1. **AI writing assistant toolbar:** Embedded within the text area or rich text editor, the toolbar spans the entire width of the parent component. The AI icon menu button is shown alongside the performed AI prompt label and versioning elements when supported.
2. **Versioning**: Enables users to view different versions of AI-generated content. Positioned within the AI writing assistant toolbar, it includes:
   ***a. Previous Version* icon button** for navigation
   **b. Version indicator**
   ***c. Next Version* icon** **button** for navigation
3. **Performed AI prompt:** Label displaying the AI prompt applied to this version of the content. When available, the prompt label is shown to the right of the versioning elements.
4. **AI icon menu button:** Positioned within the AI writing assistant toolbar, the button indicates AI writing assistance and provides a menu with AI prompts.

*Anatomy of the AI writing assistant for a text area or rich text editor*

## Behavior and Interaction

When the user focuses on an AI-enabled field, the AI
writing assistant appears within the component. Choosing
the AI icon menu button opens the AI writing assistant
menu, allowing users to generate content or refine
existing text.
### Content generation in input

#### Starting the generation process

The AI icon menu button opens the menu for the AI writing assistant
prompts, allowing the user to select the *Generate* AI action.
*Initiating the AI writing assistant for an input*

#### During generation

1. **Busy indicator:** The input shows a busy indicator, informing the user that the AI is
processing the request. Once the generation starts, the busy indicator is replaced by text
streaming – AI-generated text that appears token by token in the input.
2. ***Stop Generating* icon button:** The AI icon menu button changes to a *Stop Generating*
icon button, allowing the user to halt the AI process at any time. If the user chooses this
button, the input reverts to its previous state.
#### After generation

When generation is complete, the new text is displayed. A
version control is embedded in the menu for refinement.
The versioning element appears when an AI prompt is
applied to a populated field, or when more than one AI
prompt is applied to the same field.
### Content generation in a text area or rich text editor

#### Starting the generation process

The AI icon menu button, located in the AI writing assistant toolbar, opens the menu for the AI writing assistant prompts, allowing the user to choose the *Generate* AI action.

*AI writing assistant in the rich text editor*

#### During generation

1. **Busy indicator:** The text area shows a busy indicator, informing the user that the AI is processing the request. Once the generation starts, the busy indicator is replaced by text streaming.
2. **AI writing assistant toolbar:** Embedded within the text area or rich text editor, the toolbar allows the user to see the applied prompt and the *Stop Generating* action.
3. ***Stop Generating* icon button:** The AI icon menu button changes to a *Stop Generating* icon button, allowing the user to halt the AI process at any time. If the user chooses this button, the text area reverts to its previous state.

*Generating content in the rich text editor*

#### After generation

Once the generation process is completed, the new text is displayed in the text area.

AI menu options now include recommended AI writing assistant quick prompts, which can be applied to the entire text.

*Generation completed*

For details on how to display the busy indicator during content generation, see [Busy Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/busy-indicator-web-component/).

### Refining

Users can iterate and refine the generated text as needed by applying more AI writing assistant prompts. The number of prompts should be determined by your product team, as it affects the customer’s AI subscription costs.

*AI writing assistant completed generation of content within the rich text editor*

### Versioning

The versioning elements appear in the AI writing assistant when an AI prompt is applied to a populated field, or when more than one AI prompt is applied to the same field.
If no prompts have been used, the versioning elements are hidden.
*Versioning for an input within the menu of the AI writing assistant*
If versioning is supported, the versioning elements appear inside the menu for input fields. In text areas or rich text editors, the versioning elements appear in the
toolbar.
Each time new content is generated through an AI prompt, a new version is created and the version number updates. The *Previous Version* and *Next Version* icon buttons
adjust to the appropriate states (regular or disabled). If the user adds text, applies formatting, or manually edits the generated text, these changes are retained within
the version and won’t create new versions.
After [form field validation](https://www.sap.com/design-system/fiori-design-web/ui-elements/form-field-validation/?external), the value state remains within each version.
*AI writing assistant after generating content within the rich text editor*

**> **Guideline:** **

**Align with your product team** on the use of the AI writing assistant:
- To manage costs and sustainability, follow product team guidance on the number of prompts users can apply in a given use case.
- Define the relationship between global AI actions and the AI writing assistant version control.
- If versioning functionality is not supported, we recommend adding a warning [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog-web-component/) to ensure users are aware of potential content loss when applying more prompts to fine-tune the content.

### Quick prompts

#### Using AI actions

To ensure a consistent user experience across all SAP products, we recommend using the AI writing assistant prompts listed in the [terminology](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/ai-writing-assistant/#terminology) section below, as long as they align with your product use case.

We don’t recommend using *Make Bulleted List* and *Adjust Length* prompts for single-line input fields.

#### Grouping

For guidance on menu and submenu terminology, see [Quick Prompts – Grouping](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#grouping) and the [Terminology](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/usage#terminology) section below.

### Handling errors

If the AI writing assistant prompt is interrupted or fails, follow the guidance for error messages from the [message handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging) pattern.

For a consistent user experience, we suggest using the following error message:
*Something went wrong while generating your content. Please try again.*

## Terminology

The following guidance is based on the default labels provided in the [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/) article. To ensure a consistent and familiar experience for users, we recommend using the suggested wording. Only make changes to the default text if absolutely necessary for your specific use case.

### Recommended AI UI text for the AI writing assistant

**Table**

Label for Menu Items     | Text for Performed AI Prompt        | Description

Generate                 | Generated Text                      | Create first text version.

Regenerate               | Regenerated Text                    | Regenerate the text using the same
prompt.

Fix Spelling and Grammar | Fixed Spelling and Grammar          | Correct errors in spelling and
grammar.

Rewrite Text             | \*\* choose performed AI prompt for | Change the structure of the text.
applied submenu action
Adjust Length            | \*\* choose performed AI prompt for | Adjust the length of the text.
applied submenu action
Make Bulleted List       | Made Bulleted List                  | Organize information into a list.

Change Tone              | \*\* choose performed AI prompt for | Adjust the style or emotional quality
applied submenu action              | of the text.

Translate                | Translated to < Language # >        | Convert text from one language to
another.

**Table**

Menu Items with Submenu | Labels for Submenu Items | Text for Performed AI      | Description
Prompt
Rewrite Text            | Simplify                 | Simplified Text            | Make text easier to
| understand.
Expand                   | Expanded Text              | Elaborate on the content,
| providing more detail or
| depth.
Summarize                | Summarized Text            | Condense information while
| retaining the key points.

Change Tone             | Make More Casual         | Made More Casual           | Make text less formal.
Make More Professional   | Made More Professional     | Makestext more formal.

Adjust Length           | Make Shorter             | Shortened Text             | Reduce the length of the
| text.
Make Longer              | Lengthened Text            | Increase the length of the
| text.

Translate               | Language 1               | Translated to < Language 1 | Translate text into the
\>                         | selected language.
Language 2               | Translated to < Language 2 | Translate text into the
\>                         | selected language.

**> **Guideline:** **

For prompts not covered above, apply the following guidelines:
- Use an imperative verb.
- Keep AI action labels as short and clear as possible while prioritizing clarity for users.
- Use the same AI action labels consistently.

## Responsible AI

Responsible AI guidance for the AI writing assistant extends the following guidance:

- [Quick Prompts: Responsible AI](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#responsible-ai)

### Appropriate use of the AI writing assistant

To ensure responsible use, carefully assess which prompt types suit your use case. Remember that the AI writing assistant uses [quick prompts](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/). These are predefined AI prompts, crafted by prompt engineers, and provided by the system to save users from writing their own.

Use the AI writing assistant only when it enhances user experience by sparking creativity, improving and refining text, accelerating delivery, and improving user confidence and outcome quality.

Avoid using this pattern when the AI lacks the context to produce high-quality outcomes; use guided or custom prompts or a combination instead.

For guidance on menu and submenu terminology, see [Quick Prompts – Grouping](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#grouping) and the [Terminology](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-writing-assistant/#terminology) section above.

### Building trust

**Default **

#### Transparency
Ensure users know they’re interacting with AI when they use the AI writing assistant. Follow the provided pattern guideline, incorporating recommended components and patterns, such as the [AI icon](https://www.sap.com/design-system/fiori-design-web/foundations/ai-and-joule-design/foundation/ai-icon), [AI menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/#menu-button), and [AI notice](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/ai-notice-base-concept). Use [consistent terminology](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#terminology).
For more information, refer to the [responsible AI guidance](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#responsible-ai) within the quick prompt guidelines.

**Default **

#### Transparency
Ensure users know they’re interacting with AI when they use the AI writing assistant. Follow the provided pattern guideline and incorporate recommended components and patterns, such as [AI menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/ai-button/#menu-button). Use [consistent terminology](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#terminology).
For more information, refer to the [responsible AI guidance](https://www.sap.com/design-system/fiori-design-web/ui-elements/quick-prompts/#responsible-ai) within the quick prompt guidelines.

#### Fairness and inclusion

Ensure our AI avoids using harmful stereotypes from its training data. To achieve this, it’s crucial to craft prompts carefully, rigorously evaluate data sources, regularly test LLMs for bias and fairness, and use methods like blocklists.

### Designing for AI safety

#### Fail-safes

Ensure users are able to cancel generative AI actions in progress. Provide transparency into AI errors and interruptions using the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip-web-component/) component.

#### Give users control over the system

People should always have control of what’s being created by generative AI applications, including the ability to turn it off or to override its decisions.

### Designing for AI sustainability

#### Energy consumption

Generative AI models use a lot of energy. This can have a significant environmental impact since the energy used to power these models comes from fossil fuels. Be proactive and mindful of keeping \products energy-efficient by:

- Only applying the AI writing assistant when it delivers measurable value to users and customers.
- Limiting the number of times users can apply AI writing assistant prompts to an input field or text area.
- Using recommended quick prompts for text editing and limiting them to those most relevant to your use case.

## Helpful Terms

### Blocklist

A list of specific words, phrases, or types of content that are filtered out to prevent the AI from producing inappropriate outputs.

### Fine-tuning

Fine-tuning LLMs is the resource-intensive process of customizing a pre-trained language model on specific tasks or datasets to make it more proficient and accurate in generating relevant text.

### Generative AI

A type of artificial intelligence that, when instructed by a user, can generate novel content — such as text, images, sound, or video — based on patterns learned from training data.

### Quick prompt

Predefined instructions provided by the system and expertly crafted by prompt engineers, eliminating the need for users to write their own prompts.

---

## local-ai-notice

The local AI notice pattern ensures users are informed
when content is AI-generated, encouraging them to verify
its accuracy prior to use.
For simplicity, this guideline shows illustrations of the
object page floorplan as an example, but the fundamental
rule of placement is applicable to all page types and
layouts.
**> **Information:** **

This guideline is **mandatory** according to [Article 50 of the EU AI Act](https://artificialintelligenceact.eu/article/50/) and in alignment with the [SAP AI Ethics Policy](https://www.sap.com/documents/2022/01/a8431b91-117e-0010-bca6-c68f7e60039b.html) for all user interfaces that involve AI-generated or AI-edited information. For more information on application scenarios, AI notice lifecycle, and AI impact assessment process, see the [AI notice base concept](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/ai-notice-base-concept).

Currently this pattern is not available in [SAP Fiori Elements](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates).

## When to Use

+----------------------------------------x-----------------------------------------+
When To Use
+----------------------------------------x-----------------------------------------+
Do
Use the local AI notice pattern:
- To explicitly mark content areas that contain information generated by AI.
+----------------------------------------x-----------------------------------------+
Don't
Don’t use the local AI notice pattern:
- For any purpose other than disclosing AI content as defined in this guideline.
- To mark non-AI-related content.

## Components

This pattern is based on the following concept and components:

**Foundational AI concepts**                                                                                                                     | **Components**
- [AI notice base concept](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/ai-notice-base-concept) | - [Link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link-web-component/)
- [Smart link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/?external)
- [Label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label-web-component/)
## Guidelines

The local AI notice is always paired with other patterns. Refer to the [AI notice base concept](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/ai-notice-base-concept) to learn how it fits into the overall experience.

**Standard text**

For a consistent user experience, use the following standard text:
*Created with AI. Verify before use.*

## Variants

### Interactive AI notice label

This variant is **recommended** for all applications with **high and very high impact decision scenarios**. It enables progressive disclosure of further information through a popover. For more information, see the [link](https://www.sap.com/design-system/fiori-design-web/ui-elements/link-web-component/) component.

**Link styling**
The interactive AI notice uses the standard link styling as defined in the link component specification.

If necessary, you can use the [subtle state](https://www.sap.com/design-system/fiori-design-web/ui-elements/link-web-component/#types) of the link component to further reduce the visual impact when compared to other interactive elements in the environment.
### Read-only AI notice label

Use this variant to fulfill basic labeling requirements when no further **details on the validation of AI results** can be provided. For more information, see the [label](https://www.sap.com/design-system/fiori-design-web/ui-elements/label-web-component/) component.
*Read-only AI notice label embedded below the subsection title*

## Placement

The placement of the AI notice label is crucial to support correct association of the AI notice label with the related AI results.

Limit the number of AI notice labels to **one per screen**. If you find it difficult to identify the correct placement of the AI notice label, apply the following rule of thumb:

**Place the label next to the lowest possible hierarchical title element that contains all present AI results.**

You have AI results distributed within one sub-section **→** AI notice is placed next to the sub-section title.
*AI notice label placed on subsection level*

You have AI results distributed across multiple sub-sections on your object page **→** AI notice is placed on the next higher section title.
*AI notice label placed on section level*

AI has created content for multiple sections in your object page or generated the entire object itself **→** AI notice is placed next to the object title.
*AI notice label placed on page level*

### Information hierarchy

**On top of the content area**
For high–very high impact scenarios.
Place the embedded AI notice label between the section
header and the content area where the AI result is
displayed.
**At the end of the content area**
For low–medium impact scenarios.
Place the embedded AI notice label in the footer of the
AI results area. No additional AI content should appear
below it, and it must remain within the boundaries of the
associated section.
**> **Guideline:** **

Product teams must **apply correct accessibility annotations** when placing the local AI notice label. As a rule, you
must inform the user when an area contains AI-generated or AI-assembled information. You do this by placing the local
AI notice label at the beginning of the area that contains the AI content.
As an exception, in low-impact scenarios, you can place the AI notice at the end of the area. To comply with the
latest accessibility guidance, we advise using the following ARIA attribute to the accessibility region marker if the
label is placed at the end of the content area:
*invisible label: \<region name>. Contains AI-generated content*

## Behavior and Interaction

The interactive AI notice variant uses **progressive disclosure** to indicate that the content was generated with AI and to advise users to review and fact-check results before use. For that purpose, the AI notice can include a link to open a long text description providing more details than the short text.

### Progressive disclosure

The interactive AI notice allows progressive disclosure at 3 levels:

1. Link: AI notice short text
2. Popover: AI notice long text
3. External page: SAP Help Portal product documentation

#### 1. Link: AI notice short text

- Predefined AI notice text to mark AI content areas.
- Can link to a long text in a popover, if provided.
*Interactive AI notice label*

#### 2. Popover: AI notice long text

- Provides a more contextualized explanation of what the
notice means in the current context.
- Can be adjusted to fit the context it is used in.

**> **Guideline:** **

Define the content required in the AI notice long text together with your local AI user experience and user
assistance experts in your product area.

#### 3. External page: SAP Help product documentation

- Can contain a link to a dedicated page on SAP Help
Portal.
- Product teams must work with their local UA experts to
define the appropriate destination and content in their
product documentation.
## Responsive Behavior

The AI notice label must never be truncated. The notice must always be fully readable. Avoid wrapping to keep the notice in one line. To allow for limited space, use breakpoints to show longer or shorter variants of the AI notice text.

How these principles are applied in practice is defined within the related pattern and component guidelines. See the [Related Links](https://www.sap.com/design-system/fiori-design-web/ui-elements/local-ai-notice/#related-links) section below.

#### Standard AI notice label

**Default** for all AI application scenarios.
*Created with AI. Verify before use.*

#### Short AI notice label

**Exceptional use** for placement in limited space.
*Created with AI.*

---