# SAP Fiori Elements

SAP Fiori Elements provides predefined templates for common app patterns.

## Contents

- [Analytical List Page Overview Page Sap Fiori Elements 2](#analytical-list-page-overview-page-sap-fiori-elements-2)
- [Find Information And Get Help](#find-information-and-get-help)
- [List Report > Integration Of Classic Sap Uis Sap Fiori Elements List Report](#integration-of-classic-sap-uis-sap-fiori-elements-list-report)
- [List Report > List Report Content Area Fiori Elements](#list-report-content-area-fiori-elements)
- [List Report > List Report Header Sap Fiori Elements](#list-report-header-sap-fiori-elements)
- [List Report > Worklist Sap Fiori Elements](#worklist-sap-fiori-elements)
- [Object Page > Object Page Content Area Sap Fiori Elements](#object-page-content-area-sap-fiori-elements)
- [Object Page > Object Page Footer Bar Sap Fiori Elements](#object-page-footer-bar-sap-fiori-elements)
- [Object Page > Object Page Header Sap Fiori Elements](#object-page-header-sap-fiori-elements)
- [Object Page > Object Page Overview Sap Fiori Elements](#object-page-overview-sap-fiori-elements)
- [Replacing Placeholder Text](#replacing-placeholder-text)
- [Smart Templates](#smart-templates)
- [Tables And Lists > List Sap Fiori Elements](#list-sap-fiori-elements)
- [Tables And Lists > Table Features Sap Fiori Elements](#table-features-sap-fiori-elements)
- [Tables And Lists > Table Rows Sap Fiori Elements 2](#table-rows-sap-fiori-elements-2)
- [Tables And Lists > Table Types Sap Fiori Elements](#table-types-sap-fiori-elements)
- [Tables And Lists > Tables Toolbar](#tables-toolbar)
- [Terminology Sap Fiori Elements](#terminology-sap-fiori-elements)

---

## Analytical List Page Overview Page Sap Fiori Elements 2

# Analytical List Page / Overview Page

## Intro

Both the analytical list page floorplan and overview page floorplan are implemented as SAP Fiori elements templates. Consequently, you can find the information for all the design possibilities supported by those templates in the guidelines linked below.

---

## Find Information And Get Help

# Find Information and Get Help

## Intro

Here, you will find selected information assets to help you:

- Get familiar with SAP Fiori elements
- Better communicate with application developers
- Stay current on new features

Table

This article is available internally only. The same is true of many of its links. We’ve labelled the links available
externally, so you can share them with customers and partners.

> **Information:** We assume that you are already familiar with the floorplans, patterns, and UI elements in the SAP Fiori Guidelines
for the web.

## Technical Basics

SAP Fiori elements form a framework that provides the most common floorplans as templates, including interaction patterns. The framework generates the user interface (UI) automatically so application developers are spared the effort of coding it.

Instead, application developers configure the templates with annotations, so that the framework knows how to generate the UI.

Annotations specify, for example:

- The business objects handled, such as a purchase order or product
- The actions that the user can perform on a business object, such as edit or delete
- The features available, such as the display of header facets in an object page or use of a tab bar instead of anchors

When generating the UI, the SAP Fiori elements framework fetches data from the backend system to use in the template, with the OData protocol. The OData protocol also sends the users’ input from the UI to the backend system.

In the backend system, business objects, their data, and their supported actions are implemented and managed.

### SAP Fiori Elements Versions

Each version of SAP Fiori Elements corresponds to a version of the OData protocol:

- SAP Fiori elements for OData V4 is the latest version and used for all new apps
- SAP Fiori elements for OData V2

### Beyond the Templates

You may have learned from designing for applications developed with SAP Fiori elements that application developers cannot **always** configure the templates to match your design.

To bring your design to life beyond what the templates allow, application developers can **extend** the UI by:

- Creating custom code for parts of an SAP Fiori element
- Adding a freestyle page, using the SAP UI5 framework

Table

Implementing a design sometimes means finding the right balance among simple configuration, custom coding portions of
a page, or even coding an entire freestyle page.
Collaborate with your product management, and development team to hit the sweet spot: What’s the best possible user
experience you can deliver within the given time, resources, and budget constraints?

Section Metadata

style

## How to Get Started

- **Discover** introductory assets for SAP Fiori elements.
- **Learn** the technical basics with training.
- **Dive deeper** into documentation and community participation.

### Discover

We’ve collected the following introductory assets and recommend you consume them in the following order:

1. [What is SAP Fiori elements?](https://www.youtube.com/watch?v=6_VuA5QcuHQ) (video 1:48 minutes)
2. [Why use SAP Fiori elements?](https://ui5.sap.com/#/topic/0a5377076f4e4ccba055a9072befadbd) (documentation 2-minute read)
3. [SAP Fiori elements flexible programming model](https://www.youtube.com/watch?v=IwBgIhgK8ZQ) for SAP Fiori elements for OData V4 (video 30:53 minutes)
   In this video (starting at 5:50), the presenters introduce you to what can be configured in the SAP Fiori elements framework and what is possible with custom coding.

### Learn with TechUP Training

For an overview of the SAP Fiori elements technology and some guided, hands-on practice with the framework, choose
the TechUp training.
It’s designed for and taught by experts in design who present information at the right technical level for you.

You’ll learn about:

- HTML, CSS, JavaScript
- Cloud computing
- SAPUI5
- SAP Fiori elements

You will:

- Create a simple SAP Fiori elements app on your own, using SAP Fiori tools.
- Gain an overview of test and demo systems, and how to access them.

Table

If you’re eager to create a simple SAP Fiori elements app with SAP Fiori tools, go directly to the tutorial: [Create a List Report – Object Page App](https://developers.sap.com/group.fiori-tools-lrop.html).

Section Metadata

style

#### Interested?
Go the Cloud ERP User Experience [SharePoint](https://sap.sharepoint.com/sites/126611/SitePages/TechUP!%20.aspx) to learn more about the TechUP! content, duration, and how to request the training.
New cohorts are organized based on the requests received.
### Dive Deeper

For a deeper understanding of SAP Fiori elements or an answer to a specific question:

- Check the assets in the [Help Yourself](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/find-information-and-get-help#help-yourself) section.
- Participate in communities.

Start with the [Fiori Design Community](https://workzone.one.int.sap/site#workzone-home&/groups/4nHIPjvAMWYhZrTqKELfT3/workpage_tabs/0BKXhLl6rmiS17pNtahizh), where you can search the answers to the questions and design issues that your colleagues have submitted previously.

Otherwise, just post your question. For more information, see [Communities](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/find-information-and-get-help#communities).

Finally, stay up to date on changes and subscribe to the SAP Fiori elements newsletter, for example. For more information, see the [Stay Current](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/find-information-and-get-help#stay-current) section.

## Help Yourself

The following tables provide self-contained information assets, including recommendations for sections beneficial for designers.

The sources targeted at developers contain many code examples. You don’t need to understand the coding detail, but a basic understanding will help you communicate with developers.

The table below links to official sources of information that are available to customers and partners.

Table

Official Source                                                                                                                            | Main Target Group | Description                   | When to Use It                                                                                                                                                                                                                                               | Tips

[SAP Fiori Design Guidelines](https://www.sap.com/internal/fiori-design-web/) >                                                            | UX Designers      | - Documents available         | Start here to learn about supported features.                                                                                                                                                                                                                | See [Terminology (SAP Fiori Elements)](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/terminology-sap-fiori-elements) terms that may cause misunderstanding between designers and developers.
|   features for each SAP       |
[SAP Fiori Elements Framework](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates)  |                   |   Fiori element and its       |
|   default setting             |
| - Structures the              |
|   features according to       |
|   the layout of a             |
|   floorplan so it’s           |
|   meaningful to designers     |
| - Mentions differences        |
|   between SAP Fiori           |
|   elements for OData V2       |
|   and V4, when they exist     |
| - Links to developer          |
|   documentation to            |
|   support your                |
|   communication with          |
|   developers                  |
SAP UI5 Demo Kit > Documentation > [Developing Apps with SAP Fiori Elements](https://ui5.sap.com/#/topic/03265b0408e2432c9571d6b3feb6b1fd) | Application       | Part of the official SAP      | Find out the features supported for an SAP Fiori element.                                                                                                                                                                                                    | Also see the:
Developers        | UI5 documentation, this       |
| source:                       | You can search and sort the [SAP Fiori Elements Feature Map](https://ui5.sap.com/#/topic/62d3f7c2a9424864921184fd6c7002eb) table to locate the information you need.                                                                                         | - Introductory sections, especially [Why Use SAP Fiori Elements?](https://ui5.sap.com/#/topic/0a5377076f4e4ccba055a9072befadbd)
|                               |                                                                                                                                                                                                                                                              | - [FAQs](https://ui5.sap.com/#/topic/f4817b73671a4fb7af785b8fdd59f8e8)
| - Lists all the available     |                                                                                                                                                                                                                                                              | - [Glossary](https://ui5.sap.com/#/topic/9ef211e569ed4f819af904ba360ea7f6), to better understand technical terms
|   features in the SAP Fiori   |
|   elements feature map        |
| - Documents their             |
|   development with both       |
|   versions of SAP Fiori       |
|   elements                    |
[Flexible Programming Model Explorer](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/overview/introduction)        | Application       | - Applies only to SAP Fiori   | Learn where developers can add extensions, see the [Extension Points](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/customElements/customElementsOverview) tab, for example, custom sections, actions, dialogs, columns, and pages. | SAP Fiori elements for OData V4 uses specific SAPUI5 controls, called metadata-driven controls (MDC).
Developers        |   elements for OData V4       |
| - Showcases how to extend     |                                                                                                                                                                                                                                                              | You can see them in action in the [Building Blocks](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/buildingBlockOverview) tab. Examples are forms, tables, filter bar, charts.
|   or custom code applications |
|   developed with SAP Fiori    |                                                                                                                                                                                                                                                              | MDC controls are based on SAPUI5 controls.
|   elements.                   |
|                               |                                                                                                                                                                                                                                                              | They are also available in the SAPUI5 demo kit. For all MDC controls, go to [Samples](https://ui5.sap.com/#/controls) and enter _sap.ui.mdc_ in the search field.

### Internal Only Sources

The table below links to sources of information that are available internally only.

Table

Internal Only Source                                                                                                                                                                               | Main Target Group     | Description           | When to Use               | Tips

SAP S/4HANA Fiori Expert Network >                                                                                                                                                                 | Developers in SAP     | Contains the standard | See the slide decks to
S/4HANA               | slide decks for SAP   | understand how
[SAP Fiori Elements](https://sap.sharepoint.com/:f:/r/teams/S4HANAFioriExpertNetwork/Shared%20Documents/Fiori%20Expert%20Network%20Meeting/FioriUXGuidelines/FioriElements?csf=1\&web=1\&e=k7e9l6) |                       | Fiori elements for    | developers learn about
| OData V2 and V4,      | SAP Fiori elements and
(SharePoint)                                                                                                                                                                                       |                       | including, previous   | the programming model:
| versions of the       |
| decks.                | - SAP Fiori elements
|                       |   for OData V4 including
|                       |   custom code options and
|                       |   differences between V2
|                       |   and V4
|                       | - SAP Fiori elements V2
SAP Fiori Technology > [SAP Fiori elements](https://wiki.one.int.sap/wiki/display/fioritech/SAP\+Fiori\+elements)                                                                                  | Teams who develop SAP | Cross-unit program    | To find out SAP Fiori     | In the Important Links section, use the [Fiori Elements Jira](https://jira.tools.sap/secure/RapidBoard.jspa?rapidView=2776\&view=planning.nodetail\&issueLimit=100) link to check what’s planned for the current and upcoming releases.
Fiori apps            | for SAP Fiori,        | elements contact names,
(Wiki)                                                                                                                                                                                             |                       | including SAP Fiori   | such as CPO, APO,
| elements.             | architects, user
|                       | assistance, marketing.
| Contains links to the |
| developer guide, user |
| assistance, quality   |
| and testing, roll-out |
| and go-to-market      |
| information.          |
## Communities

Except for SAP Fiori Design Community, these sources of information are ones to refer application developers to.

Table

Source                                                                                                                                        | Main Target Group | Description                 | When to Use

[Fiori Design Community](https://workzone.one.int.sap/site#workzone-home&/groups/4nHIPjvAMWYhZrTqKELfT3/workpage_tabs/0BKXhLl6rmiS17pNtahizh) | Designers         | A managed community for     | For answers to your design
| designers of SAP Fiori apps | questions, including:
(Work Zone)                                                                                                                                   |                   |
|                             | - Those related to SAP
|                             |   Fiori elements
|                             | - Requests for
|                             |   clarification when a
|                             |   guideline is unclear or
|                             |   doesn’t address your
|                             |   question

[Center of Expertise](https://wiki.one.int.sap/wiki/x/irRiYg)                                                                                 | Developers        | Centers of Expertise are a  | As a source for expert
| group of developers with    | advice on implementing your
(Wiki)                                                                                                                                        |                   | expertise in a specific     | design that you can refer
| area whom you can contact   | application developer to
| for technical consulting.
| Not restricted to SAP Fiori
| elements, the experts also
| cover SAPUI5, gateway,
| development infrastructure,
| ABAP development.
[Consulting for V4](https://github.wdf.sap.corp/fiori-elements/v4-consulting)                                                                 | CoE Developers    | Managed by SAP Fiori        | As a source for expert
| elements development, this  | advice on implementing your
(Github)                                                                                                                                      |                   | site lets you submit issues | design that you can refer
| or questions about the      | application developer to
| behavior of existing
| features for immediate
| assistance.
[Stack Community](https://sap.stackenterprise.co/questions/ask)                                                                               | Developers        | A managed community for all | As a source for expert
| SAP developers and other    | advice on implementing your
(Stack\@SAP)                                                                                                                                  |                   | roles.                      | design that you can refer
|                             | application developer to
| Use tags to send your
| questions to the right
| experts and to find
| questions and articles
| relevant to your concern
| Tags to use:
| - fiori-elements
| - fiori-elements-v2
| - fiori-elements-v4
| - s4hana-design
## Stay Current

To stay current, use the following:

- The monthly **SAP Fiori Elements Newsletter** from development informs you of new features for SAP Fiori elements for OData V2 and V4. Join the distribution list [here](https://profiles.wdf.sap.corp/groups/5c57c5470dadd802844ac5c1/users?page=1)
- The [What’s New](https://www.sap.com/design-system/fiori-design-web/discover/whats-new) page, [SAP Fiori Elements](https://www.sap.com/design-system/fiori-design-web/discover/whats-new#sap-fiori-elements-framework) section for each update of the SAP Fiori for web design guidelines
- The [Development Update](https://wiki.one.int.sap/wiki/display/SimplSuite/Development+Update) in the SAP Fiori End-to-End Development Guide lists updates on SAP Fiori elements for OData V2 and V4, as well as other topics

For deeper technical insights, join the developers’ S/4HANA Fiori Expert Network Meeting every Friday 10:30 a.m. CET.

Add yourself to the distribution list for guests [here](https://profiles.wdf.sap.corp/groups/6536df241b59e6028c216484/users) **and** send an email to Michael Hoffmann (<michael.hoffmann@sap.com>) to ask for the meeting request.

## Best Practices

Below are examples of typical designer questions with guidance on where to find their answers.

**Question**

When will the analytical table be available in V4?

**Where to Find the Answer**

1. Check the backlog of planned features at [Fiori Elements Jira](https://jira.tools.sap/secure/RapidBoard.jspa?rapidView=2776\&view=planning.nodetail\&issueLimit=100).
2. Ask the [Fiori Design Community](https://workzone.one.int.sap/site#workzone-home&/groups/4nHIPjvAMWYhZrTqKELfT3/workpage_tabs/0BKXhLl6rmiS17pNtahizh).

**Use Case**

Is it possible to have more than 1 identifier in a table?

**Where to Find the Answer**

1. Check [SAP Fiori Elements Framework](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates) documentation.
2. Check the [SAP Fiori Elements Feature Map](https://sapui5.hana.ondemand.com/#/topic/62d3f7c2a9424864921184fd6c7002eb).
3. Ask the [Fiori Design Community](https://workzone.one.int.sap/site#workzone-home&/groups/4nHIPjvAMWYhZrTqKELfT3/workpage_tabs/0BKXhLl6rmiS17pNtahizh).

---

## Integration Of Classic Sap Uis Sap Fiori Elements List Report

# Integration of Classic SAP UIs (SAP Fiori Elements List Report)

## Intro

This article describes how to navigate to create, display, and edit screens from a list report when you need to integrate classic UIs for some or all of these actions.

### SAP Fiori apps vs. Classic UIs

In addition to SAP Fiori, SAP S/4HANA uses other UI technologies, such as SAP Web GUI and WebDynpro, which were available prior to SAP Fiori. We refer to these technologies as classic UIs.

In many cases, an SAP Fiori app and a classic UI are available. They are often used in parallel to create, edit, or display objects. The SAP Fiori app can differ from the classic UI in two ways:

- The SAP Fiori app covers parts of the broader scope of the classic UI. This can be due to strategic decisions to exclude edge cases or because the full scope isn’t yet covered.
- The SAP Fiori app offers additional functions not available in the classic UI.

### Navigation to Classic UIs

Classic UIs for create, edit, and display actions were not part of the standard SAP Fiori [navigation flow](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/navigation/navigation) from the SAP Fiori elements list report. This means that each classic UI needed a tile on the launchpad.

Now, the list report supports direct navigation to the classic UIs, thus supporting the standard navigation from a list report to business objects. Tiles on the launchpad are not necessarily needed. See the [example](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/integration-of-classic-sap-uis-sap-fiori-elements-list-report#example).

**Technical Background**

Classic UIs for displaying and editing objects start with a selection screen that requires the ID of the object. After entering the ID, the user navigates to the display or edit screens.

The SAP Fiori elements list report skips the entry screen and navigates directly to the classic UI. Changes carried out in the classic edit UI are reflected in the list report. Objects created using the classic create UI are also reflected in the list report.

## When to Use

Use the list report as the entry point for:

- Searching, filtering, and navigating to objects in classic UIs to edit and display them
- Creating objects using a classic UI

## Components

In the list report, you can offer navigation to classic UIs via the table toolbar or within a line item. If users need to access both the SAP Fiori and classic UIs for the same task, you can offer both side by side. This section outlines which UI elements to use.

> **Guideline:** If your SAP Fiori apps and the corresponding classic UIs cover the same features, just offer navigation to the SAP
Fiori apps.

1. **Table toolbar**
   For the create action, you can choose either a simple or a split menu button:
   1. [Simple button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/)
      Use it if you want to offer direct access to the create app.
   2. [Split menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/#split-menu-button)
      Use it if both an SAP Fiori app and a classic UI are available for the create action.
2. **Line item**
   For display and edit, you have the following options:
   1. Navigation :navigation-right-arrow:Use it to navigate directly to the object in display mode.
   2. Edit :edit:Use it to navigate directly to the object in edit mode.
   3. [Smart link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/)
      Use it to show all edit and display navigation options.

> **Warning:** Currently, you can show either the edit icon :edit: **or** the navigation icon :navigation-right-arrow: per line item. The default is the navigation icon :navigation-right-arrow:.
Showing both the edit and navigation icons is not yet possible. 
> **Guideline:** **Table toolbar:**
Offer a button (simple button or split menu) only for creating an object. For editing and displaying an object, use the line item UI elements. In a split menu button, show the SAP Fiori app first. Keep in mind that the [menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/#menu-button1) always shows the last action selected by the user.
**Line item:**
- Since you can only choose either the edit icon :edit: or the navigation icon :navigation-right-arrow:, show the one most relevant for your use case.
- Offer all navigation options in the [smart link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/).
- In the smart link, structure the entries in a meaningful way and show the most important first. If an SAP Fiori app and a classic UI are available for the same task, show the SAP Fiori app first, followed by the classic UI.
**Naming:**
- Whenever you need to offer both the SAP Fiori app and the classic UI in a UI element, add the transaction code for the classic UI in parentheses: \<action (transaction code)>.
Otherwise, apply the guidance for [Word Choice](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#word-choice).
- In a [split menu button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/#split-menu-button), show _Create_ on the button and the object type (such as _Purchase Order_) only in the menu list.

## Navigation Flows

The navigation flows depend on the mix of SAP Fiori apps and classic UIs that you need to open from your list report. This section outlines the typical navigation flows for three use cases:

- **[Classic UIs only](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/integration-of-classic-sap-uis-sap-fiori-elements-list-report#classic-uis-only)**
  Classic UIs are used for all actions (create, display, edit)
- **[Mainly SAP Fiori apps](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/integration-of-classic-sap-uis-sap-fiori-elements-list-report#mainly-sap-fiori-apps)** (\~80% SAP Fiori apps)
  For most create, edit, and display tasks, SAP Fiori apps are available and cover the most essential features. The corresponding classic UIs offer features not yet implemented in the SAP Fiori app. For a few tasks, only classic UIs are available.
- **[Mainly classic UIs](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/integration-of-classic-sap-uis-sap-fiori-elements-list-report#mainly-classic-uis)** (\~20% SAP Fiori apps)
  For create, edit, and display tasks, classic UIs are available. SAP Fiori apps are either not available or do not offer all features of the corresponding classic UI.

### Classic UIs Only

Use the list report as the entry point for navigating to the classic UIs.

#### Create, Edit, Delete – Classic UIs Only

In the list report, the user chooses:

1. **_Create_ button**
   The classic create UI opens. On the create page, the main navigation options are:
   - Finalizing action _Create_: Saves the object and goes back to the list report.
   - _Exit_ action: Exits the create UI and navigates to the list report.
   - _Cancel_ action: Discards any entries and goes back to the list report.
2. **Navigation** :navigation-right-arrow:
   The classic display UI opens. On the display page, the main navigation options are:
   - Shell bar back icon :nav-back: : Goes back to previous page (list report).
   - _Edit_ action: Switches to the classic edit UI.
3. **Edit** :edit:The classic edit UI opens. On the edit page, the main navigation options are:
   - Finalizing action _Save_: Saves the object and goes back to the list report.
   - Shell bar back icon :nav-back: : Goes back to previous page (list report).
   - _Exit_ action: Exits the edit UI and navigates to the list report
   - _Display_ action: Switches to classic display UI.
   - _Cancel_ action: Discards any entries and goes back to the list report.

### Mainly SAP Fiori Apps

This section outlines the flows for the following scenario:

- For creating a purchase order, both an SAP Fiori app (most essential features) and a classic UI (all features) are available. Depending on their needs, users can decide where to create the purchase order. See [Create - Classic UI Only](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/integration-of-classic-sap-uis-sap-fiori-elements-list-report#create--classic-ui-only).
- For displaying and editing a purchase order, both an SAP Fiori app (most essential features) and a classic UI (all features) are available. The default navigation points to the SAP Fiori app. However, the [smart link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-link/) also allows users to navigate to the classic edit and display UIs. See [Display – SAP Fiori App (Default) and Classic UI](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/integration-of-classic-sap-uis-sap-fiori-elements-list-report#display--sap-fiori-app-default-and-classic-ui) and [Edit – Classic UI Only](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/integration-of-classic-sap-uis-sap-fiori-elements-list-report#edit--classic-ui-only).

#### Create – SAP Fiori app and Classic UI

In the list report, the user chooses from the split menu button **_Create_**:

1. **_Purchase Order_**
   The SAP Fiori create app opens. The main navigation options are:
   - Finalizing action _Create_: Saves the object and goes back to the list report.
   - Shell bar back icon :nav-back: : Goes back to previous page (list report).
   - _Cancel_ action: Discards any entries and goes back to the list report.
2. **_Purchase Order (ME21N)_**
   The classic create UI opens. The main navigation options are:
   - Finalizing action (_Create_ in the example): Saves the object and goes back to the list report.
   - _Exit_ action: Exits the create app and navigates to the list report.
   - _Cancel_ action: Discards any entries and goes back to the list report.

#### Display, Edit – SAP Fiori App (Default) and Classic UIs

In the list report, the user chooses:

1. **Navigation** :navigation-right-arrow:The SAP Fiori display app opens. On the display page, the main navigation options are:
   - Shell bar back icon :nav-back: : Goes back to previous page (list report).
   - _Edit_ action: Switches to SAP Fiori edit app.
2. **Edit** :edit:
   The SAP Fiori edit app opens. On the edit page, the main navigation options are:
   - Finalizing action _Save_: Saves the object and goes back to the list report.
   - Shell bar back icon :nav-back: : Goes back to previous page (list report).
   - _Cancel_ action. Discards any entries and goes back to the list report.
3. **[Smart Link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/)**
   Both SAP Fiori and classic display and edit apps are available.

### Mainly Classic UIs

This section outlines the flows for the following scenario:

- For creating a purchase order, only a classic UI is available.
- For displaying a purchase order, both an SAP Fiori app (most essential features) and a classic UI (all features) are available. In this case, the SAP Fiori app is used.
- For editing a purchase order, only a classic UI is available.

#### Create – Classic UI Only

In the list report, the user chooses **_Create_** (1).

The classic create UI is opened. On the create page, the main navigation options are:

- Finalizing action (_Create_ in the example): Saves the object and goes back to the list report.
- _Exit_ action: Exits the create app and navigates to the list report.
- _Cancel_ action. Discards any entries and goes back to the list report.

#### Display – SAP Fiori App (Default) and Classic UI

In the list report, the user chooses the **navigation icon** :navigation-right-arrow: (2).

The SAP Fiori display app opens. On the display page, the main navigation options are:

- _Edit_ action: Switches to the classic edit UI.
- Shell bar back icon :nav-back: : Goes back to previous page (list report).

The user can navigate to the classic display UI using the [smart link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/).

#### Edit – Classic UI Only

In the list report, the user chooses the **edit icon** :edit: (3).

The classic edit UI opens. On the edit page, the main navigation options are:

- Finalizing action (_Save_ in the example): Saves the object and goes back to the list report.
- Shell bar back icon :nav-back: : Goes back to previous page (list report).
- _Exit_ action: Exits the edit UI and navigates to the list report.
- _Display_ action: Switches to the SAP Fiori display app.
- _Cancel_ action: Discards any entries and goes back to the list report.

## Example

**Before**: In _Purchasing_, the user navigates to the classic UIs to create, edit, and display purchase orders using tiles on the launchpad.

**Now**: The user navigates to the classic UIs via the _Manage Purchase Orders_ list report.

From the list report, the user can:

1. Create a purchase order.
   The split menu button enables navigation to both the SAP Fiori app and the classic UI (ME21N).
2. Edit a purchase order (classic UI ME22).
3. Display a purchase order (classic UI ME23N).

## Top Tips

- If your SAP Fiori apps and the corresponding classic UIs cover the same features, just offer the SAP Fiori apps within your navigation.
- Collect all SAP Fiori and classic UIs for create, edit, and display actions and define a navigation flow, starting from the list report.
  Use the [example flows](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/integration-of-classic-sap-uis-sap-fiori-elements-list-report#navigation-flows) as a reference.
- For navigating from the list report:
  - For create, use a button.
  - For edit and display, use the line item edit :edit: and navigation :navigation-right-arrow: icons and a [smart link](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-link/).
- If you need to offer both an SAP Fiori app and a classic UI via the create button or a smart link:
  - Place the SAP Fiori app first and the classic UI below.
  - Add the transaction code for classic UIs in parentheses:
    \<action (transaction code)>
  - In the split menu button, show _Create_ on the button and the object type (such as _Purchase Order_) in the menu list.
  - In the smart link, show all edit and display apps and UIs.

---

## List Report Content Area Fiori Elements

# List Report – Content Area

## Intro

The SAP Fiori elements list report template supports the three content area layouts detailed below.

For design information, see [General Layout](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#general-layout) and the links below.

## Simple Content Layout

The default layout for the content area is the simple content layout and displays the data for one business object in a single table view. It supports:

- Display of one business object in one table, or — with SAP Fiori elements for OData V2 — in one list
- Automatic data loading
- One table toolbar
- Creation of business objects via a dialog
- Creation of cards for the _Insights_ section of _My Home_ in SAP S/4HANA Cloud, when My Home in SAP S/4HANA Cloud has been enabled. The _Add Card to Insights_ option automatically appears in the overflow toolbar of the table in list report. You can turn off this feature.

> **Warning:** - We **strongly recommend against** table-level view management, but it is supported.
- With SAP Fiori elements for OData V4 these restrictions apply for the Insights cards:
- When users navigate from the card in the _Insights_ section of the _My Home_ page to the list report table, the table
view is similar to its state at card creation, but it does not retain the changes in the position or removal of filter
fields or table columns.
- The formatting of unit of measure fields differs between the Insights card and the list report table.

> **Hint:** For more information on card creation and disabling it, refer application developers to [Creating Cards for the Insights Section of My Home in SAP S/4HANA Cloud](https://sapui5.hana.ondemand.com/#/topic/9b13559ef978405a99e8b624a87daf31).

Columns

## Multiple View Layout

For more complex scenarios, you can turn on the multiple view layout which supports:

- Display of multiple views of a table that shows one business object, for example, each view of the same table can display different prefiltered states
- The segmented button for a maximum of three views or the select control for four or more views
  Note that the SAP Fiori elements framework determines the switch control automatically based on the number of views.
- Display of the count or number of total rows in the view (must be enabled)
- One table toolbar
- Automatic data loading
- Creation of business objects via a dialog with SAP Fiori elements for OData V2
- Creation of cards for the _Insights_ section of _My Home_ in SAP S/4HANA Cloud, by default when My Home in SAP S/4HANA Cloud has been enabled. You can turn off this feature.

> **Warning:** - We **strongly recommend against** table-level view management, but it is supported.
- With SAP Fiori elements for OData V4 these restrictions apply for the Insights cards:
- When users navigate from the card in the _Insights_ section of the _My Home_ page to the list report table, the table
view is similar to its state at card creation, but it does not retain the changes in the position or removal of filter
fields or table columns.
- The formatting of unit of measure fields differs between the Insights card and the list report table.

> **Hint:** For more information on card creation and disabling it, refer application developers to [Creating Cards for the Insights Section of My Home in SAP S/4HANA Cloud](https://sapui5.hana.ondemand.com/#/topic/9b13559ef978405a99e8b624a87daf31).

Columns

## Multiple Content Layout

To support even more complex scenarios, you can turn on the multiple content layout which supports:

- Display of one or more business objects in multiple tables, for example, you can display a customer overview with different tables for invoices, deliveries, and overdue payments. All the tables can be filtered by a specific customer and a specific date
- Text-only icon tab bar to switch among the tabs
- Views with data visualization in either table or chart format with both SAP Fiori elements for OData V2 and V4
- Automatic data loading
- Different toolbars for each view

> **Warning:** - We **strongly recommend against** table-level or chart-level view management, but it is supported.
- Creation of business objects **must** be done in an object page. Doing it via a dialog is not supported
- **Do not** use a mix of responsive and non-responsive tables.

> **Hint:** Application developers may be unfamiliar with the designer term “multiple content layout.”
For more information on implementing this feature, refer the development team to:
- [Defining Multiple Views on a List Report Table – Single Table Mode](https://sapui5.hana.ondemand.com/#/topic/0d390fed360c4c58a0f0619338938de1)
- [Defining Multiple Views on a List Report Table – Multiple Table Mode](https://sapui5.hana.ondemand.com/#/topic/37aeed74e17a42caa2cba3123f0c15fc)

Columns

---

## List Report Header Sap Fiori Elements

# List Report – Header

## Intro

The SAP Fiori elements list report template supports the features and settings for the list report header detailed below.

For design information, see the [List Report Floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) guidelines and the links below.

> **Warning:** Put all controls for searching and filtering data in the list report filter bar.
**Do not** include the search or filter options that are available in the table header.

## Feature Availability

Table

#### Features

[Page-Level View Management](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#page-level-view-management)

[Share Menu](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#share-menu)

[Manual Update Mode](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#update-mode)

[Live Update Mode](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#update-mode)

[Search](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#search)

[Filter Bar](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#filter-bar)

[Initial State of Header](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#initial-state-of-header)
- Expanded on large screens
- Collapsed on medium and small screens when the
application is configured to load the list report data on
app launch

[Pin Button](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#pin-button)
list report contains at least one responsive table.

[Editing Status Filter](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#editing-status-filter)
You can hide it.

[Input Controls for Filters](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#input-controls-for-filters)

[Adapt Filters UI Element](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-header-sap-fiori-elements#adapt-filters)
- Default: popover with SAP Fiori elements for OData V4

## Feature Details

### Page-Level View Management

By default, page-level view management is enabled and the header displays a page title.

You can disable it.

> **Guideline:** If you disable page-level view management, you must display a header title.

For more information, see [Header Title](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-title).

### Share Menu

By default, the header contains the generic _Share_ menu with the global actions _Send Email_ and _Save as Tile._ It can also include the:

- _Share in SAP Jam_ menu item when SAP Jam integration is configured.
- _Microsoft Teams > As Chat_ and _As Card_ options when the required settings have been made by the system administrators of SAP S/4HANA or SAP S/4HANA Cloud. This feature is part of collaborative ERP (enterprise resource planning), which integrates the best of SAP S/4HANA or SAP S/4HANA Cloud with Microsoft Teams. It’s not available for all users. When available, the menu item opens a separate window where users can directly share a link to a business application in the SAP S/4HANA or SAP S/4HANA Cloud system with co-workers.

\With SAP Fiori elements for OData V4, you can control the visibility in the _Share_ menu of the _Send E-mail_ and _Share: Microsoft Teams_.
**Save as Tile**

The tile created opens the list report with the same results shown at the time the tile was saved.

Users can also save a dynamic tile for results shown after the users have filtered for a relative date value, such as today or this year.

For more information, see:

- [Share (Generic)](https://www.sap.com/design-system/fiori-design-web/ui-elements/header-toolbar/#share-generic-4)
- [Collaboration](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/collaboration)

> **Hint:** For more information, refer application developers to:
- [The Share Functionality](https://ui5.sap.com/#/topic/022bf0dcae1d4d90961ebe23d642fca3)
- [Integrating Microsoft Teams](https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/257ec7408db6420682462cd1d000e744.html) for SAP S/4HANA Cloud
- [Integration with Microsoft Teams](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8308e6d301d54584a33cd04a9861bc52/849465e69b7a490a88049fe0b24fb01e.html?version=2023.000) for SAP S/4HANA

### Update Mode

By default, the update mode is manual.

You can enable live update mode instead.

For more information, see [Update Mode](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/#update-mode).

### Search

By default, the search is disabled.

You can enable it.

The limit for search strings is 1000 characters.

> **Guideline:** Work with the development team to define the searchable properties in the data.

For more information, see [Search](https://www.sap.com/design-system/fiori-design-web/ui-elements/search/).

### Filter Bar

SAP Fiori elements for OData V2 uses the [smart filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-filter-bar-annotations/).

SAP Fiori elements for OData V4 uses the [filter bar](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/).

With SAP Fiori elements for OData V4, you can also show a _Clear_ button on the filter bar to let users:

- Remove all filter values
- Reset the value in the _Editing Status_ filter to All

> **Warning:** Put all controls for searching and filtering data in the list report filter bar.
**Do not** include the search or filter options that are available in the table header.

### Initial State of Header

The default behavior is shown below:

Table

#### Screen Size | #### Application Starts with Data | #### Application Starts without Data

**S**            | Collapsed                         | Expanded

**M**            | Collapsed                         | Expanded

**L**            | Expanded                          | Expanded

**XL**           | Expanded                          | Expanded

### Pin Button

With SAP Fiori elements for OData V4, the _Pin_ :pushpin-off: /_Unpin_ :pushpin-on: buttons are displayed under the header when a list report contains at least one responsive table,

The pin option keeps the header collapsed or expanded when the user scrolls.

The grid table and the analytical tables are not scrollable so the _Pin_ :pushpin-off: /_Unpin_ :pushpin-on: buttons are **not** displayed when the list report contains only these types of table.

For more information see, [Pinning the Header Content](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#pinning-the-header-content).

### Editing Status Filter

By default, the filter is enabled for draft-enabled applications. You can disable it.

The filter values and corresponding results are as follows:

- _All_ (Default value):
  - All saved (or active) versions of the documents for which the current user has no drafts
  - All the users own drafts of unsaved changes to existing documents. The version last saved before the user began editing the draft is not shown in the results.
- _All (Hiding Drafts)_: Only the saved objects.
- _Own Draft_: Drafts that the current user can display or edit.
- _Locked by Another User:_ Saved versions that are locked by other users. The current user cannot edit these versions.
- _Unsaved Changes by Another User_: Saved versions that were edited by another user but are no longer locked. The current user can edit and overwrite these versions, and the previous draft will be overwritten.
- _No Changes_: Saved versions with no corresponding draft.

For more information, see [Draft handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling).

### Input Controls for Filters

You can decide which filter/input controls to use and set the following for them:

- The properties available as a filter criterion
- The labels for the filter fields
- The default filter values
- Mandatory filters: Marked by an asterisk (\*), they always show in the filter bar.
- Type-ahead for values entered
- Value help lists
  By default, a dialog conditions tab is displayed for the value help. Remind application developers to define the right value help options.

> **Hint:** For information on defining the value help, refer application developers to [Field Help](https://ui5.sap.com/sdk/#/topic/a5608eabcc184aee99e1a7d88b28816c).

You can also:

- Decide on the selection controls for the filters
- Restrict the values accepted in the field. By default, the field accepts multiple values.

> **Guideline:** **Date Picker and Date / Time Picker**
By default, filter fields for the date picker (sap.m.DatePicker)and date/time picker (sap.m.DateTimePicker) result in a control that opens a dialog for adding **multiple** dates.
When your use case requires a date/time picker for a **single** value, specify this to the the application developers because it requires explicit configuration.
For more information refer them to: [Configuring Filter Fields](https://ui5.sap.com/#/topic/f5dcb29da3bf4e0091eba3e7ccef4580).

For more information, see:

- [Filter/Input Controls](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/#filter-input-controls)
- [Selection Controls](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/which-selection-control-to-use)

### Adapt Filters

By default, SAP Fiori elements for OData V2 uses the _Adapt Filters_ dialog and SAP Fiori elements for OData V4 uses the _Adapt Filters_ popover.

You can configure the following:

- Filters that are initially visible in the expanded filter bar. When you set filters to be visible by default, they are displayed under the Basic group in the dialog.
- Additional groups for the filters
- Show input fields: Visible by default. You can hide the _Hide value/Show value_ button.

Users can add additional fields through views.

The _OK_ and _Cancel_ buttons are displayed when the application team or the user has chosen manual [update mode](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/#update-mode) for the filter bar.

By default, the _Reset_ button is displayed, you cannot change this.

For more information, see: [Adapt Filters](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-filter-bar-annotations/#filter-dialog).

---

## Worklist Sap Fiori Elements

# Worklist

## Intro

With SAP Fiori elements, the worklist is a simplified list report without a filter bar and shares many features and settings with the list report that are described in the SAP Fiori elements list report articles.

The worklist features and settings that differ from those in the list report are detailed below.

For design information, see the [Worklist Floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/work-list/) guidelines and the links below.

## Feature Availability

Table

#### Worklist-Specific Features

View Management Not Enabled

Page-Level View Management

Header Title

Filter Bar

Table Title

Table Behavior

Search

Personalization Actions Enabled: _Sort, Filter, Group,_ and _Column Settings_

Export to Spreadsheet

---

## Object Page Content Area Sap Fiori Elements

# Object Page – Content Area

## Intro

The SAP Fiori elements object page template supports the features and settings for the object page content area detailed below.

For design information, see the [Object Page Floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) guidelines and the links below.

> **Warning:** **Always** build the object page using the [dynamic page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-page-header-mandatory).
Set the [shellbar page title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/#page-title) to the name of the business object shown in the object page to indicate the user’s position in the system.
**Do not** use the current implementation of the “page view management” feature in SAP Fiori elements. This feature is technically available for object pages, but we are still working on the final design.

## Feature Availability

Table

#### Content Area

[Draft Object Validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#draft-object-validation)
Users can trigger the validation by pressing the Enter key while their cursor is in a field on the object or subobject page.

[Navigation Bar: Anchor Bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#navigation-bar)

[Navigation Bar: Tab Bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#navigation-bar)

[Sections and Subsections](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#sections-and-subsections)

[Reuse Components as Sections](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#reuse-components-as-sections)

#### Subsections

Link
With SAP Fiori elements for OData V4, you can display an [icon or image with the link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/link/#link-with-icon).
With SAP Fiori elements for OData V2, the default link shows the text and ID. You can remove the text or the ID.

[Contact Facets](https://sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#contact-facets)

[Tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#tables)

[Charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#charts)

[Views for Tables and Charts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#views-for-tables-and-charts)

[Address](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#address)

Display of Related Properties Together
The properties can also display as links.

[Forms](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#forms)
The number of columns in a form depends on the screen size. With SAP Fiori elements for OData V2 you can change the number of columns for an extra large screen size.

[Text Control](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#text-control)
You can:
- Change the maximum
- Enable growing mode
- Show users the number of characters allowed in the text area

[File Upload](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#file-upload)

[Dynamic Side Content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#dynamic-side-content)

#### Subsection Behavior

[Subsection Starts Loading After the Object Page Elements Are Loaded](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#subsection-loading-behavior)

[Adjustment of the Width for Content Display in a Subsection](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#width-for-content-display-in-a-subsection)

#### Content Visibility

[Visible Sections, Subsections, Quickviews, and Tables](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#sections-subsections-quickviews-and-tables)

[Hiding Section, Subsection, Quickview and Table Content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#sections-subsections-quickviews-and-tables)

[User-Controlled Visibility with _Show More/Show Less_](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#usercontrolled-visibility)

[Visible Smart Form Fields](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-content-area-sap-fiori-elements#visibility-of-smart-form-fields)

\
## Content Area

### Draft Object Validation

By default, data validation for the object page happens only when the users save the object so they enter data without interruption.

They can trigger data validation by pressing the **Enter** key while their cursor is in a field on the object or subobject page.

For more information, see: [Form Field Validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/)

### Navigation Bar

By default, the anchor bar is generated when the object page has **more than one** section.

It lets users navigate to the individual content area sections.

You can:

- Hide the anchor bar when you only have one section.
- Replace it with a tab bar.

**With extensions**, you can replace the buttons with another type of control.

If there is no Anchor Bar, but there is editable information in the header, the first temporary section in the Object Page which controls the header content will have a section title called ‘Header’.

For more information, see:

- [Navigation Bar](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/?external#navigation-bar)
- [Anchor Bar Navigation](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#anchor-bar-navigation)
- [Tab Bar Navigation](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/?external#tab-bar-navigation)

### Sections and Subsections

You can add sections and subsections to the content area.

Sections contain only subsections. You build the subsection content with tables, charts, and forms.

When the object page uses:

- Tab bar navigation, the section title isn’t displayed in the content area
- Anchor bar navigation, only the title of the first section is hidden in the content area, unless the first section contains a table

> **Guideline:** When you assign a section or subsection title, do not use a comma (,) in it because commas serve as delimiters in SAP
Fiori elements.

#### Section and Subsection Titles

To minimize both the number of titles displayed and redundancies among the title values:

- When a section or subsection contains a single table or chart control, only the control title is displayed, but its value is replaced by the section or subsection title.
- For sections or subsections that contain a single text area, with SAP Fiori elements for OData V4, application teams can enable an option to display the section or subsection title instead of the text area label when the object page is in display mode. With the option enabled, the label is only displayed in edit mode if the field is mandatory.

For more information, see: [Sections and Subsections](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#sections).

### Reuse Components as Sections

You can embed a reuse component as a section in the object page.

> **Warning:** A reuse component that is used in an SAP Fiori elements-based application cannot be used in a freestyle application.
Consult the development team on the requirements for the reuse component.

## Subsections

### Contact Facets

With both versions of SAP Fiori elements, in subsections, you can include a link that users can click to see additional information in a quickview.

For applications with Microsoft Team integration, the contact card and the quick view card both display options for starting a Microsoft Teams audio call, video call, or chat with the contact.

For more information, see:

- [Smart Link](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-link/)
- [Quick View](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/)
- [Quick View Examples](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/#quick-view-examples)

### Tables

You can include a table in a subsection.

When a table is the only content in a subsection, the subsection title is not displayed. Instead, the title of the table shows the value assigned to the subsection title.

For more information on SAP Fiori elements capabilities for tables, see the articles under SAP Fiori Elements: Table, starting with [Table Types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-types-sap-fiori-elements).

### Charts

You can include a single chart facet in a subsection.

In the chart, you can:

- Display measures, their aggregation calculations, and dimensions to categorize the measures.
- Add custom actions to the toolbar for a chart and define whether they are enabled at all times or only after the user selects part of the chart for the action.
- Allow users to personalize the chart settings

When a chart is the only content in a subsection, the subsection title is not displayed. Instead the title of the chart shows the value assigned to the subsection title.

#### SAP Fiori Elements for OData V2

Charts are only supported for business objects or services that are **not draft enabled** or are **read-only**.

#### SAP Fiori Elements for OData V4

You can define a chart for a draft-enabled business object. The chart only displays active data, not data entered into an unsaved draft record.

For more information, see [Chart (VizFrame)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/chart/).

For more information on chart options, see [Chart](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/chart-sap-fiori-elements/).

> **Hint:** For more information, refer application developers to [Configuring Charts](https://ui5.sap.com/#/topic/653ed0f4f0d743dbb33ace4f68886c4e).

### Views for Tables and Charts

You can turn on views for:

- All the tables and charts on the page
- Individual tables and charts

For more information, see [Views (Variant Management)](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/variant-management/).

### Address

You can add one or more address fields:

- As a separate subsection
- As part of a field group within a subsection
- To a quick view with smart link navigation

For more information, see:

- [Quick View](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/)
- [Quick View Examples](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/quickview/#quick-view-examples)

### Display of Related Properties Together

You can display two related properties side-by-side and
with a single label in display mode.

For example, the label _Date Time_ can display with the
properties date and time side-by-side, even when they are
distinct properties in the back end.
You can separate the values with a delimiter such as a
slash (/) or a hyphen (-).
In edit mode, the fields can be edited separately.
#### Related Properties as Links
The related properties can also display as links.
> **Hint:** Application developers call the related properties semantically connected fields. For more information on this
feature, you can refer them to [Grouping of Fields](https://ui5.sap.com/#/topic/cb1748ea9b984251addc03718d98df35).

### Forms

You can add action buttons to the toolbar for a form contained in a subsection.

With SAP Fiori elements for OData V4, you can also add an action next to the form header.

The action types can be:

- Actions that occur in the system while the user stays on the object page.
- Actions that navigate to a different application, for example, when the user can open a purchase requisition from a specific purchase order.

#### Conditional Enablement of Navigation Buttons

You can enable buttons that navigate the user to another page or application based on the value of a specific field with SAP Fiori elements for OData V4. To achieve this with SAP Fiori elements for OData V2 requires extensions.

For example, you can enable the _Generate Purchase Order_ button only for sales orders with the completed status.

> **Guideline:** Implement this feature only when the way to enable the button is obvious to end users.

#### Columns in a Form

To optimize horizontal onscreen space, the number of columns in a form depends on the screen size, as shown in the table below.

With SAP Fiori elements for OData V2, you change the number of columns for the extra large screen size to 4.

**Table (col-width-30-70)**

#### Screen Size

Small

Medium

Large

Extra large

#### Groups in a Form

You can group fields in a form and assign a name to the group.

Note that the group name is displayed **only** when a group contains fields.

#### User-Controlled Load of Fields with Low Importance

To improve the performance on application startup, you can prevent form fields with **low** importance from loading until the user clicks _Show Details_ with SAP Fiori element for OData V4.

After the user clicks the button, the fields are loaded and the _Hide Details_ button is displayed.

#### Text Control

By default, with SAP Fiori elements for OData V4, in edit mode, the default length of the text control allows for the entry of four lines of text.

You can:

- Set a maximum number of lines for the text control that’s greater than four.
- Enable growing mode: The length of the text control on first load allows for four lines. After the user has entered that number of lines, the length grows by one line at a time until it reaches the maximum number. A scrollbar is displayed next to the text entry area.
- Display below the text area the number of characters allowed in it. As the users enter text, the number decreases to show how many characters remain.

A notification is displayed if the users try to enter text beyond the limit.

In display mode, the text is truncated to 100 characters and a _More_ link allows the user to display the full text. Alternatively, you can set the full text to display in a popover when the the user clicks _More_.

#### File Upload

With SAP Fiori elements for OData V4, users can upload a file to an object page property and delete the file.

For example, the sales order object can have a property for a contract and users can upload the contract file to the property.

The application developers can define the file size and types allowed for upload.

### Dynamic Side Content

You can display additional content to the right of an object page subsection. Consult with the development team on doing this with a standard extension.

With this feature, the subsection toolbar contains a _Show Details/Hide Details_ action for users to control the display of the dynamic side content. By default, the side content is hidden. You can show it instead. You can also rename the action to make it meaningful to the end user.

> **Guideline:** - Do not use tables in the side content panel.
- Do not add content that may introduce a horizontal scroll bar to the dynamic side content.
- For the best view of the dynamic side content, set it to display in 50% of the screen.

For more information, see:

- [Dynamic Side Content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/dynamic-side-content/)
- Object Page: [Dynamic Side Content](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-side-content)

> **Hint:** For more information, see [Adding Dynamic Side Content to Object Page Sections](https://ui5.sap.com/#/topic/8e01a463d3984bfa8b23c2270d40e38c).

## Subsection Behavior

### Subsection Loading Behavior

By default, the subsection starts loading after the main object page elements are loaded.

You can change the loading behavior to load the subsection after the header data is loaded.

**Example**

When the subsection contains a table or chart and you want to allow the user to filter in the header before subsection data loads.

### Width for Content Display in a Subsection

When you mix content — such as forms and tables — in one subsection, you can adjust the width allotted to each content type to display a table next to a form.

## Content Visibility

### Sections, Subsections, Quickviews, and Tables

By default, the object page displays these components.

You can set the entire components or selected content in the components to be displayed or hidden in the content area, according to the object’s state. For example, you can hide the Delivery section in a Sales Order until the order has a status where the delivery is planned.

### User-Controlled Visibility

You can enable the _Show More/Show Less_ button in the bottom right corner of a section to let users control the display of subsection content.

- When the subsection is hidden, _Show More_ is displayed.
- When the subsection shows, the _Show Less_ link is displayed.

### Visibility of Smart Form Fields

By default, all smart form fields have the high importance setting and show on all screen sizes.

You can lower the level of importance for the fields to hide them on smaller screens.

According to the importance assigned to the field, it is displayed as follows:

- High (default): On all (small, medium, and large) screen sizes.
- Medium: On large and medium screens only.
- Low: On large screens only

For more information, see [Responsiveness](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#responsiveness2).

---

## Object Page Footer Bar Sap Fiori Elements

# Object Page – Footer Bar

## Intro

The SAP Fiori elements object page template supports the features and settings for the object page footer detailed below.

For design information, see the [Object Page Floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) guidelines and the links below.

> **Warning:** **Always** build the object page using the [dynamic page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-page-header-mandatory).
Set the [shellbar page title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/#page-title) to the name of the business object shown in the object page to indicate the user’s position in the system.
**Do not** use the current implementation of the “page view management” feature in SAP Fiori elements. This feature is technically available for object pages, but we are still working on the final design.

## Feature Availability

Table

#### Footer Bar Actions

[Finalizing Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#finalizing-actions)

Create

[Save](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#save)

[Close on Save](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#save)

[Save and Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#save-and-edit)
elements for OData V2 only

[Save and Next](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#save-and-next)

[Apply](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#apply)
applications only

[Message Popover Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#message-popover-button)

[Discard Draft](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#discard-draft)

[Cancel](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#cancel)
handling

[Enabling / Disabling of Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#enabling-disabling-of-actions)

[Keyboard Shortcuts for Actions](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#keyboard-shortcuts-for-actions)

## Footer Bar Actions

In create and edit modes, the footer bar appears at the bottom of the screen.

### Finalizing Actions

You can add finalizing actions to the footer bar.

A message toast is displayed when an operation is successful.

Finalizing actions complete the work on the current screen, by permanently changing the object state. You can also set them to navigate away from the object page.

Note that developers may call these actions determining actions.

> **Guideline:** Replace the generic placeholder text in the message toast with text that’s meaningful to the user.

For more information, see:

- [Footer Toolbar](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/footer-toolbar)
- [Action Placement: Guidelines for the Footer Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#guidelines-for-the-footer-toolbar)
- [Footer Toolbar Examples of Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement#footer-toolbar-examples-of-action-placement)

### Save

The action is displayed by default in edit mode.

After saving, the user stays on the object page for applications both with and without draft handling enabled.

You can enable users to automatically navigate back to the list report when they save with SAP Fiori elements for OData V2. To do this, ask your development team to add close logic to the _Save_ action.

### Save and Edit

You can enable this action in non-draft applications with SAP Fiori elements for OData V2.

With the _Save and Edit_ action, users save current changes and stay on the object page to continue editing.

### Save and Next

This action is enabled with SAP Fiori elements for OData V2 when the [direct edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#direct-edit) feature is enabled in the corresponding list report.

With the _Save and Next_ action, users save current changes and navigate to the next editable object in the list report.

After they click _Save and Next_ for the last editable object in the list report, they return to the list report.

### Apply

You can enable this action in the footer bar of a **subobject** page in draft-enabled applications.

With the _Apply_ action, users conclude the create or edit activity, save the draft, and navigate one step up in the object hierarchy to the object page.

Similarly, when the subobject page is open in flexible column layout with three column layout, clicking _Apply_ now closes the column where the subobject is displayed and returns the user to the object page.

### Message Popover Button

Turned on by default, the button is only visible when messages are present and allows the user to open the message popover. The color of the message button reflects the most crtical message level.

The message popover displays the count of error messages.

Messages without a criticality level are treated as information messages.

With SAP Fiori elements for OData V2, the messages in the message popover are grouped by section and table so users can easily locate where they need to take action.

For more information, see:

- [Message Popover Button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/message-popover/#message-button)
- [Message Popover](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/message-popover)

### Discard Draft

Displayed by default in edit mode for applications **with** draft-handling, this action button lets the users leave the object page without saving the changes they’ve made in a draft version of the object.

### Cancel

Displayed by default in edit mode for applications **without** draft-handling this action button lets users leave the object page without saving changes they’ve made to the object.

### Enabling / Disabling of Actions

You can enable or disable footer bar actions according to certain conditions. For example, to prevent users from archiving a sales order that is still being processed, you can enable the _Archive_ action only for sales orders with the status Delivered or Cancelled.

Note that even if you disable all footer bar actions, the footer bar still appears onscreen for the display of the [message popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#message-popover-button), described above.

### Keyboard Shortcuts for Actions

Keyboard shortcuts are available for basic operations.

You can also enable custom shortcuts for application-defined actions.

> **Hint:** For more information, refer application developers to [Keyboard Shortcuts](https://ui5.sap.com/#/topic/0cd318c83ec5473d9a091c1782d03c21).

---

## Object Page Header Sap Fiori Elements

**Design System Hero**

# Object Page – Header

## Intro

The SAP Fiori elements object page template supports the features and settings for the object page header detailed below.

For design information, see the [Object Page Floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/) guidelines and the links below.

**> **Warning:** **

**Always** build the object page using the [dynamic page header](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-page-header-mandatory).
Set the [shellbar page title](https://www.sap.com/design-system/fiori-design-web/ui-elements/shell-bar/#page-title) to the name of the business object shown in the object page to indicate the user’s position in the system.
**Do not** use the current implementation of the “page variant” feature in SAP Fiori elements. This feature is technically available for object pages, but we are still working on the final design.

## Feature Availability

**Table**

#### Behavior and Interaction

[Expanded State](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#collapsedexpanded-state)

[Collapsed State](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#collapsedexpanded-state)
With SAP Fiori elements for OData V2, on mobile phone
screens, the object page displays a summary line instead
of the collapsed header.

[Header Content Display in Display Mode](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#display-of-header-content)

[Header Content Display in Edit and Create Modes](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#display-of-header-content)
- The first dynamic section in the content area, the
header section, displays all the fields in the header
that can be rendered in a form — both editable and
uneditable fields.
- UI elements in the header that cannot be rendered in a
form, such as micro charts, are not shown.

[Header Content Visible](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#header-content-visibility)

[Header Content Hidden](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#header-content-visibility)

[Header Field Editability](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#header-field-editability)
- Not editable with SAP Fiori elements for OData V2
- Editable with SAP Fiori elements for OData V4
You can change the default.

[Highlighting Values Based on Criticality](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#highlighting-values-based-on-criticality)

#### Components

Dynamic Page Header

[Title](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#title)

[Menu for Saved Version / Draft](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#menu-for-saved-version-draft)

[Breadcrumbs](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#breadcrumbs)

Subtitle

[Object Marker](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#object-marker)

[Image](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#image)

[Paging Buttons on the First Object Page](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#paging-buttons)

[Paging Buttons on the First Subobject Page](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#paging-buttons)

Toolbar

#### Toolbar Actions

[Edit and Delete](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#edit-and-delete)
You can turn one or both actions off.

[Copy](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#copy)

[Related Apps Menu Button](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#related-apps-menu-button)
With SAP Fiori elements for OData V4, you can change the
button name to _Open in…_

[Generic Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#generic-actions)
turned off for drafts.

[Application-Specific Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#applicationspecific-actions)

[Conditional Enablement of Navigation Buttons](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#conditional-enablement-of-navigation-buttons)
Requires an extension with SAP Fiori elements for OData
V2

[Order of Toolbar Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#order-of-toolbar-actions)
You can change the default order.

#### Additional Content (Optional)

[Message Strip](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#message-strip)
a whole, such as the object status

[Simple Header Facets](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#simple-header-facets)

[Plain Text Facets](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#plain-text-facets)

[Contact Facets](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#contact-facets)

[Micro Chart Facets](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#micro-chart-facets)

[Form Facets](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#form-facets)

[Address Facets](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#address-facets)

[Header Field Group](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#header-field-groups)

[Rating Indicator Facets](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#rating-indicator-facets)

[Progress Indicator Facet](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#progress-indicator-facets)

[Key Value Facet](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-header-sap-fiori-elements#key-value-facets)

Link
With SAP Fiori elements for OData V2:
- The default link shows the text and ID. You can remove
the text or the ID from the link.
- You can include a link that navigates to a site
external to the application.

## Behavior and Interaction

### Collapsed/Expanded State

When the object page header contains at least one facet:
- On the initial load of the object page, the header is expanded.
- When the user scrolls down the page, the header collapses.
- The _Expand/Collapse :navigation-down-arrow: :navigation-up-arrow:_ button and the _Pin/Unpin :pushpin-off:_ button are displayed.
When the object page header contains only a title and a subtitle, the _Expand/Collapse :navigation-down-arrow: :navigation-up-arrow:_ button and the _Pin/Unpin :pushpin-off:_ button are not displayed.
With SAP Fiori elements for OData V2, when users scroll on a mobile phone screen, the object page optimizes the screen space by displaying a summary
line instead of the collapsed header.
Next to the title, an arrow :navigation-down-arrow: button lets the users expand the header.
For more information, see:
- [Dynamic Page Header (Mandatory)](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-page-header-mandatory)
- [Header Toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/header-toolbar/)
- [Header Features](https://www.sap.com/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/#header-features)
### Display of Header Content

In display mode, the header content area displays **all** the header content.

In edit and create modes, when the header is:

- **Editable**
  - The first dynamic section in the content area, the header section, displays all the fields in the header that can be rendered in a form — both editable and uneditable fields.
- The header section is only present in the edit and create modes.
  - The first temporary section will have a section title called “Header” if there is no Anchor Bar available.
  - UI elements in the header that cannot be rendered in a form, such as micro charts, are not shown.
- **Not Editable**, the header is hidden.

Note that, by default, the header is

- Editable with SAP Fiori elements for OData V4
- Not editable with SAP Fiori elements for OData V2

You can ask the application developers to change the default.

For more information, see [Dynamic Page Header (Mandatory)](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-page-header-mandatory).

**> **Hint:** **

To change the default for the editability of the header, you can refer the application developers to: [Toggling the Editability of Header Fields](https://ui5.sap.com/#/topic/c8a9a40a5cee4fb4bcdf97d09420de5e).

### Header Content Visibility

By default, header content is visible.

You can set the following header components or selected content, fields, or actions in them to be displayed or hidden, according to the object’s state:

- Entire header facets
- Content, such as fields, in a header facet
- Content in quick views

With Fiori elements for OData V2, you can set:

- The header to be displayed in edit mode.
- Header facets to be visible in edit mode.

**> **Hint:** **

For more information on the features, refer the development team to:
- [Hiding Features Using the UI.Hidden Annotation](https://ui5.sap.com/#/topic/ca00ee45fe344a73998f482cb2e669bb)
- [Adapting the UI: List Report and Object Page](https://ui5.sap.com/#/topic/0d2f1a9ebd2d4a4c906216ded1d33783.html)

### Header Field Editability

By default, in edit mode the header is:

- Not editable with SAP Fiori elements for OData V2
- Editable with SAP Fiori elements for OData V4

You can change the default.

Even when the header is editable, certain fields or facets in the header may not be editable, for example, micro chart facets or text fields marked as `ReadOnly`.

**> **Hint:** **

To change the default for the editability of the header, you can refer the application developers to: [Toggling the Editability of Header Fields](https://ui5.sap.com/#/topic/c8a9a40a5cee4fb4bcdf97d09420de5e).

### Highlighting Values Based on Criticality

You can assign colors and icons to text to indicate the criticality of a field value.

With SAP Fiori elements for OData V4, you can add a quick view to text that’s been set to display in a color to indicate the criticality of its value. The text is displayed underlined as a link so users know the quick view is available.

## Components

### Title

By default, with:

- SAP Fiori elements for OData V2, the title area is empty.
- SAP Fiori elements for OData V4, the title area displays the text: (Unnamed Object).

**> **Guideline:** **

Tell the developers which property to use as the title.

### Menu for Saved Version / Draft

With this menu next to the object page title, users can navigate between the **saved** version of an object and the **draft** version that they’ve created. This is a default feature in applications with draft-handling,

### Breadcrumbs

Breadcrumbs are displayed above the object title.

**> **Guideline:** **

Limit the breadcrumbs to the drilldown levels within the object page.

### Object Marker

The object marker indicates the object is locked by another user in draft-enabled applications.

### Image

The image is an avatar control. By default, it has a square shape.

You can set:

- An image to display instead of the avatar. SAP Fiori elements for OData V4 uses the [lightbox](https://www.sap.com/design-system/fiori-design-web/ui-elements/lightbox/) control to allow a larger view of the image.
- The avatar to a have a circular shape.

When no image is set or found for the avatar, the avatar initials are displayed.

If those are not set or found either, an icon for the avatar is displayed:

- A square avatar for a product
- A circular avatar for a person.

For more information on the logic used for displaying an object, consult the development team and see [Using Images, Initials, and Icons](https://ui5.sap.com/#/topic/5760b638ea274d7aab59e4e434899528).

### Paging Buttons

By default, with **both** SAP Fiori elements for OData V2 and V4, the paging buttons appear in the subobject page of applications that use the dynamic page layout in the following conditions:

- The user has navigated from a table in the object page to the subobject.
- The table in the object page contains at least two items.

With SAP Fiori elements for OData V2, you can:

- Enable the paging buttons to show on the first object page opened from a list report.
- Disable the default display of the paging buttons on the subobject page.

## Toolbar Actions

### Edit and Delete

By default, these actions are displayed when the data in the object page allows them.

You can:

- Set each enabled action to be displayed or hidden based on certain conditions in the back end. For example, you can hide the actions for a sales order that has already been paid.
- Disable the actions.

For more information, see:

- [Object Handling (Create, Edit, Delete)](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects)
- [Edit](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#edit)

### Copy

You can place a copy action button in the header to let the user create a new object with the same data as the current object with SAP Fiori elements for OData V2.

You set the label for the button according to your use case. Otherwise, the default label is _Copy_.

In the object page, the _Copy_ button is displayed after the _Delete_ button.

**> **Hint:** **

Application developers can define a standard copy action button by annotating a function import action (DataFieldForAction) as a _Copy_ action. For more information, refer them to: [Enabling Actions in the Object Page Header](https://ui5.sap.com/#/topic/5fe439613f9c4e259015951594c423dc).

### Related Apps Menu Button

You can enable the _Related Apps_ menu button. It displays the actions available on the same object in different applications. Users select the action to open the same object in another application.

You can also:

- Hide specific actions in the menu.
- Change the button name to _Open In…_ with SAP Fiori elements for OData V4.

### Generic Actions

By default, the Share button is displayed for saved objects and hidden for drafts.

It can include the:

- _Share in SAP Jam_ menu item when SAP Jam integration is configured.
- _Microsoft Teams > As Chat_ and _As Card_ options when the required settings have been made by the system administrators of SAP S/4HANA or SAP S/4HANA Cloud. This feature is part of collaborative ERP (enterprise resource planning), which integrates the best of SAP S/4HANA or SAP S/4HANA Cloud with Microsoft Teams. It’s not available for all users. When available, the menu item opens a separate window where users can directly share a link to a business application in the SAP S/4HANA or SAP S/4HANA Cloud system with co-workers.

\With SAP Fiori elements for OData V4, you can control the visibility in the _Share_ menu of the _Send E-mail_ and _Share: Microsoft Teams_.
For more information, see:

- [Share (Generic)](https://www.sap.com/design-system/fiori-design-web/ui-elements/header-toolbar/#share-generic-4)
- [Collaboration](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/collaboration)

**> **Hint:** **

For more information, refer application developers to:
- [The Share Functionality](https://ui5.sap.com/#/topic/022bf0dcae1d4d90961ebe23d642fca3)
- [Integrating Microsoft Teams](https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/257ec7408db6420682462cd1d000e744.html) for SAP S/4HANA Cloud
- [Integration with Microsoft Teams](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8308e6d301d54584a33cd04a9861bc52/849465e69b7a490a88049fe0b24fb01e.html?version=2023.000) for SAP S/4HANA

### Application-Specific Actions

You can include the actions required for your use case.

The header toolbar displays application-specific actions to the left of the generic actions.

You can also define custom shortcuts for application-defined action buttons and navigation buttons.

**> **Hint:** **

For more information, refer application developers to [Keyboard Shortcuts](https://ui5.sap.com/#/topic/0cd318c83ec5473d9a091c1782d03c21).

### Conditional Enablement of Navigation Buttons

With SAP Fiori elements for OData V4, you can enable buttons that navigate the user to another page or application based on the value of a specific field.

With SAP Fiori elements for OData V2, this feature requires extensions.

For example, you can enable the Generate Purchase Order button only for sales orders with the completed status.

**> **Guideline:** **

Implement this feature only when the way to enable the button is obvious to end users.

### Order of Toolbar Actions

The default order — left to right — for actions in the object page toolbar is below:

- Copy with SAP Fiori elements for OData V2
- Application-specific action buttons
- _Related Apps_ menu button
You can rearrange the order, for example, by setting an application-specific action that’s the primary action to the leftmost position on the toolbar.

For more information, see:

- [Action Placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement)
- [Header Toolbar](https://www.sap.com/design-system/fiori-design-web/ui-elements/header-toolbar/)

## Additional Content

### Message Strip

You can add a message strip in the header to provide information related to the object as a whole, such as the object status.

The message strip is displayed under the object page title and optional subtitle. When the header is collapsed, the message strip remains visible.

When more than one message is relevant for the object as a whole, the message strip displays the text “_The object contains errors / warnings / information_.”

The user can find the individual messages via the message popover in the footer bar.

For more information, see:

- [Message Strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/)
- [Message Popover Button](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-popover/#message-button)

### Simple Header Facets

With SAP Fiori elements for OData V2:

- You can use a simple header facet to show simple data points that align horizontally across the header.
- When form fields contain **no** value, they display the [empty state indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#empty-state-indicator) (–).

### Plain Text Facets

You can use the plain text facet to display a continuous text in the header.

For more information, see [Plain Text Facet.](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#plain-text-facet)

### Contact Facets

You can enable a quick view for a contact.

For applications with Microsoft Teams integration, the contact card and the quick view card both display options for starting a Microsoft Teams audio call, video call, or chat with the contact.

With SAP Fiori elements for OData V4:

- When a quick view detail contains **no** value, the [empty state indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/form/#empty-state-indicator) (–) is displayed.
- You can add a quick view to text that’s been set to display in a color to indicate the criticality of its value. The text is displayed underlined as a link, so users know the quick view is available.

For more information, see [Quick View](https://www.sap.com/design-system/fiori-design-web/ui-elements/quickview/).

### Micro Chart Facets

You can display the following micro charts in the header:

- Area micro chart
- Bullet chart
- Radial chart
- Column chart
- Line micro chart
- Harvey ball chart
- Stacked bar chart

For more information, see [Micro Charts](https://www.sap.com/design-system/fiori-design-web/ui-elements/micro-chart/).

### Form Facets

You can add a quick view to the form facet.

For more information, see [Form Facet (Dataset)](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#form-facet-dataset).

**> **Hint:** **

For more information, refer the development team to [Form Facet](https://ui5.sap.com/#/topic/ebe05d52c43241c19aaf79dd5f1c69f1).

### Address Facets

You can display an address such as a shipping address.

**> **Hint:** **

For more information, refer the development team to [Address Facet in the Object Page Header](https://ui5.sap.com/#/topic/0b73cbbeda344d88b5d0f8bea4d4498e).

### Header Field Groups

You can define fields to display together in a facet. For example, for the product object, in the _General Information_ section, you can include the fields quantity, weight, and supplier.

### Rating Indicator Facets

You can add a rating indicator to the header. It is read-only in both display and edit modes.

By default, the maximum rating is five stars.

You can:

- Change the maximum rating.
- Specify more descriptive text for the subtitle.

**With extensions**, you can make the rating editable.

#### Display Mode

The rating indicator shows with the:

- Title
- Subtitle with the total number of ratings
- Rating shown with stars: Both the aggregated and non-aggregated single rating types are supported.

#### Edit Mode

The rating indicator moves into the header facet and appears with only the title in edit mode.

For an aggregated rating, the number of ratings is shown in parentheses after the stars.

For more information, see:

- [Rating Indicator Facet](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#rating-indicator-facet)
- [Rating Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/)

### Progress Indicator Facets

You can add a progress indicator facet to the object header.

For more information, see:

- [Progress Indicator Facet](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#progress-indicator-facet)
- [Progress Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/)

### Key Value Facets

You can add a key value facet to highlight important data or KPIs.

For more information, see [Key Value Facet](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/#key-value-facet).

---

## Object Page Overview Sap Fiori Elements

# Object Page – Overview

## Intro

The SAP Fiori elements object page template supports the features and settings for the overall object page behavior detailed below.

For design information, see the [Object Page Floorplan](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/) guidelines and the links below.

> **Warning:** **Always** build the object page using the [dynamic page header](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/#dynamic-page-header-mandatory).
Set the [shellbar page title](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/#page-title) to the name of the business object shown in the object page to indicate the user’s position in the system.
**Do not** use the current implementation of the “page view management” feature in SAP Fiori elements. This feature is technically available for object pages, but we are still working on the final design.

## Feature Availability

Table

#### Features

Illustrated Message for Unfound Page
See [Illustrated Message](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/illustrated-message/).

[Unsaved Changes Warning](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/frameworks/sap-fiori-elements/object-page/object-page-overview-sap-fiori-elements#unsaved-changes-warning)
- Another application without saving changes. You can turn it off.
- The previous page without saving changes.

## Feature Details

### Unsaved Changes Warning

By default, in draft-enabled applications, on the main object page, a message warns users of unsaved changes when the users navigate:

- **Forward** to another application without saving changes in edit mode or without entering data for a new object in create mode.

You can ask the application developers to turn the message off for forward navigation. The draft is kept for the user to return to later.

- **Backward** to the previous page without saving changes in edit mode or the data entered for a new object in create mode.

Depending on whether the object page is in edit or create mode, the message lets the users opt to:

- Save changes in edit mode
- Create the object in create mode
- Keep the draft
- Discard the draft
- Cancel the navigation

> **Information:** No message is displayed when the user navigates backward without entering data for a new object in create mode. The
object is discarded.

---

## Replacing Placeholder Text

# Replacing Placeholder Text

## Intro

Onscreen text and messages that are familiar to users in their business context simplify their work.

Both SAP Fiori elements for OData V2 and SAP Fiori elements for OData V4 define default or “placeholder” text for labels and messages, but it’s often too generic to be meaningful to users.

> **Guideline:** - Apply the [UI Text Guidelines for SAP Fiori Apps](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori) when you replace the default text.
- Review the default text and replace generic terms with the business terms familiar to users.

This article:

- Explains where you can find the default text to review
- Highlights the most valuable replacements to make

## Reviewing the Default Text

To review all default text for labels and messages, see the tables for SAP Fiori elements for OData V2 and SAP Fiori elements for OData V4 respectively in [Localization of UI Texts](https://sapui5.hana.ondemand.com/#/topic/b8cb649973534f08a6047692f8c6830d).

> **Guideline:** Refer to [Localization of UI Texts](https://ui5.sap.com/#/topic/b8cb649973534f08a6047692f8c6830d) for the current version of the default text, not in the examples in this article.

The tables at this link show:

- **i18n Key**: a unique key that identifies the default text string in the application’s internationalization (i18n) file.

The application developer uses the key to identify the text to replace with the improved text you provide.

Note that Fiori elements for OData V2 and Fiori elements for OData V4 do not share keys.

- **Default Text in SAP Fiori Elements**: the default text
- **Used In**: a description of the UI element where the text is displayed and when it is displayed
- **(Optional) Recommendation**: advice on how to improve the default text

## Important Replacements to Make

For a seamless user experience, replace the following generic text with the specific and meaningful business terms that are familiar to users.

- “Object” and “objects”
- “Item” and “items” for subobjects
- “Perform action,” “process,” and other generic actions

Also, pay close attention to revising the various messages related to the delete action. Because an unintentional delete action results in data loss, make sure the text warns the user about what will be deleted and confirms what has been deleted.

### Replacement Examples

Replace “object” and “objects” with the business terms familiar to the users.

Table

**Default Text**                             | **Internationalization (i18n) Key**                                         | **Example Replacement**

_New Object_ (Title for the _Create_ dialog) | Fiori elements for OData V2 : `CREATE_DIALOG_TITLE`                         | _New Sales Order_

_New Object_                                 | Fiori elements for OData V4: `T_NEW_OBJECT`                                 | _New Sales Order_

_Other users have edited the selected        | Fiori elements for OData V2: `ST_GENERIC_DELETE_UNSAVED_CHANGES_PLURAL`     | _Other users have edited the selected
objects without saving the changes._         |                                                                             | contracts without saving the changes._
_Delete them anyway?_                        |                                                                             | _Delete them anyway?_

_The selected objects have unsaved changes   | Fiori elements for OData V4:                                                | _The selected contracts have unsaved
by other users._                             |                                                                             | changes by other users._
`C_TRANSACTION_HELPER_CONFIRM_DELETE_WITH_UNSAVED_CHANGES_MULTIPLE_OBJECTS`
_Delete anyway?_                             |                                                                             | _Delete anyway?_

---

## Smart Templates

# SAP Fiori Elements

## Intro

Default (col-1)

SAP Fiori elements is a framework that comprises the most used floorplan templates and is designed to:
- Speed up development by reducing the amount of frontend code needed to build SAP Fiori apps.
- Drive UX consistency and compliance with the latest SAP Fiori design guidelines.
The articles in the “SAP Fiori Elements Framework” section of the guidelines cover all the design possibilities based
on the current technical capabilities of the SAP Fiori elements framework and the version used to develop your
application.

Embed (col-2)

<https://www.youtube.com/embed/6_VuA5QcuHQ?feature=oembed>

Section Metadata

style

**\**

**\**

### Versions

Ask your engineering colleagues what SAP Fiori elements version they will use to develop your app because there are differences in the design options that each version supports. The articles in this section of the guidelines indicate when such differences exist.

Each version of SAP Fiori elements supports a different version of OData (Open Data Protocol), as their names indicate:

- SAP Fiori elements for OData version 2 (V2)
- SAP Fiori elements for OData version 4 (V4)

## Usage

Your use case should determine whether or not the application is developed with SAP Fiori elements:

- Do the SAP Fiori elements floorplans deliver all the features you need to provide to the users?
- If not, can you provide the features with extensions to the SAP Fiori elements floorplans?
- If not, can you provide the features by building a freestyle app within the SAP Fiori elements framework and using SAP Fiori elements OData V4 extension capabilities?

Although [extensions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/smart-templates#extensions) require effort to develop and maintain, they also retain benefits of the SAP Fiori elements framework that save on other efforts.

> **Information:** The analytical list page and the overview page are only available as SAP Fiori elements.

## Supported Floorplans

The following floorplans are available as SAP Fiori elements templates:

Columns

\ | \ | 
_List report_           | _Worklist_           | _Object page_

Columns

\ |
_Overview page_           |

Each floorplan can be placed inside the flexible column layout, except the overview page. The overview page must always be implemented as a standalone application that pulls in data from a minimum of two other applications.

## Supported Features

Both SAP Fiori elements for OData V2 and for OData V4 offer:

- Message handling
- The [global edit flow](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow), which includes [draft handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling)
- Keyboard shortcuts for basic operations
- Custom shortcuts for application-defined actions. Note that custom shortcuts for inline actions on table rows are not supported.
- Storage in the personalization settings for each application and device type of how the user has resized columns in flexible column layout
- Seamless navigation across applications with the:
  - Inner app state that stores the state of the current page when the user leaves it, including such details as filter values, table and chart personalization, and the selected tab or section. The app state restores these details when the user returns.
  - Support of the SAP Fiori Launchpad feature called `sap-keep-alive` mode.
    With `sap-keep-alive` mode, the app page is restored to the same state it was in when the user left it, including scroll position and table selection. It also improves the performance of the page reload after back navigation.
    However, ensuring the page reflects changes that the user made in an external application before returning to it requires explicit configuration by the application developers.

**Only** SAP Fiori elements for OData V2 supports the [local edit flow](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-local-flow) without draft handling.

> **Hint:** For more information, refer application developers to:
- [Keyboard Shortcuts](https://ui5.sap.com/#/topic/0cd318c83ec5473d9a091c1782d03c21)
- [Refresh Entity Sets in `sap-keep-alive` Mode](https://ui5.sap.com/#/topic/3c65f2cc630c472da8328a6f3c193683)
- [Refresh Data Set for Back Navigation When `sap-keep-alive` Is Set to True](https://ui5.sap.com/#/topic/f1c2704cc302401ba935f18e6303f123)

## Placeholder Texts

Some UI texts provided by the SAP Fiori elements framework are generic placeholders. Always replace them with text that is meaningful to your user – for example:

Table
|  | Placeholder    |  |  | Replacement
|  | Text           |  |  | Text

List Report   |  |  | Create Object  |  |  | Create Sales
|  |                |  |  | Order

Object Page   |  |  | New Object     |  |  | New Sales
|  |                |  |  | Order

Overview Page |  |  | Could not      |  |  | Unable to
|  | perform action |  |  | approve the
|  |                |  |  | request

For more information, see: [Replacing Placeholder Text](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/replacing-placeholder-text).

> **Hint:** For more information about placeholder texts in SAP Fiori elements, see [Replacing Standard UI Texts](https://ui5.sap.com/#/topic/b8cb649973534f08a6047692f8c6830d).

## Extensions

SAP Fiori elements may not deliver all the features required by your use case so application developers can create extensions to bridge the gaps. They can:

- Extend the SAP Fiori elements floorplans
- Extend the SAP Fiori elements application
- Build a freestyle application within the SAP Fiori elements framework with SAP Fiori elements for OData V4 options for extensions

Although extensions require efforts in development and maintenance in subsequent releases, they also retain benefits offered by the SAP Fiori elements framework that save on effort, such as navigation, binding, and usage of building blocks in the freestyle code.

Some extensions only take minutes of additional development time so ask application developers to evaluate the effort for the extensions required for a good user experience.

### Extensions with SAP Fiori Elements for OData V4

SAP Fiori elements for OData V4 provides various ways to extend applications.

The flexible programming model makes it easy for application developers to implement customizations. They’re free to use SAPUI5 coding or controls in extension points and can also take advantage of building blocks and controller extensions.

#### Building Blocks

Building blocks result in low-maintenance and timeless software. They allow application developers to create a visual representation of application data in a convenient way.

Building blocks are reusable artifacts that are consistently orchestrated by the framework to ensure SAP Fiori compliance and standard application behavior like draft handling and side effects.

For more information and list of building blocks available, see [Flexible Programming Model Explorer](https://ui5.sap.com/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/buildingBlockOverview).

> **Hint:** You can create extensions, by adapting the `manifest.json` of your app, or through annotations or UI adaptation. For more information, see
- [Extending SAP Fiori Elements-Based Apps](https://ui5.sap.com/#/topic/358cf2598d71462b8ac2bd8c944efbfd)
- [Extending List Reports and Object Pages Using App Extensions](https://ui5.sap.com/#/topic/a892eb8ae1fb498a9bc6c5194432e820)
- [Flexible Programming Model Explorer](https://sapui5untested.int.sap.eu2.hana.ondemand.com/sapui5-sdk-internal/test-resources/sap/fe/core/fpmExplorer/index.html#/buildingBlocks/buildingBlockOverview)

---

## List Sap Fiori Elements

# List

## Intro

With SAP Fiori elements for OData V2, you can enable the display of a list in the list report with:

- [Standard list items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/standard-list-item/)
- [Object list items](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/object-list-item/)

With both list item types:

- A chevron icon lets users navigate to the item.
- A navigation row indicator highlights the list item that the user has navigated to.
- You can assign semantic coloring of red, green, or orange to the data points, such as price, based on their values.

---

## Table Features Sap Fiori Elements

# Table Features

## Intro

The SAP Fiori elements templates support the features and settings for a table detailed below.

For design information see the table guidelines, starting with [Table Overview](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), and the links within this article.

## Feature Availability

Table

#### Table Settings

Column Header Labels

Asterisk in Labels for Mandatory Fields
in the column header label for mandatory table fields with SAP
Fiori elements for OData V4.

[Tooltips on Column Headers](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#tooltips-on-column-headers)

[Clear All](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#clear-all--select-all)
in both the list report and object page when the selection of
multiple rows is enabled for:
- Grid tables
- Analytical tables
- Tree tables
You can change the default.

[Select All](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#clear-all--select-all)
when the selection of multiple rows is enabled for a
responsive table.
You can change the default.

Sticky Column Header Behavior

[Column Width](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#column-width)
change it.

[Column Importance](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#column-importance-in-responsive-tables)
importance of none, **except** for list report columns for key
fields. These have high importance.
You can change the level of importance.

[Freezing Columns](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#freezing-columns)
for the number of columns that you decide.

[Labels for Multiple Fields in a Column](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#labels-for-multiple-fields-in-a-column)
OData V4

[Ascending Sort Order on a Column](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#sort-order)

[Quick Sort on a Column](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#quick-sort-on-a-column)

[Grouping](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#grouping)
tables

Filters on Aggregation
OData V4.
You can set filters on aggregated measures.

[Number of Table Rows Displayed at Once](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#number-of-table-rows-displayed-at-once)
between optimal user experience and optimal technical
performance.

[No Data Found Message](https://sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#no-data-found-message)
- An illustrated message with generic placeholder text is
displayed with SAP Fiori elements for OData V4. You can add an
action to it. You can change it to a text-only message, as
required.
- Generic placeholder text is displayed with SAP Fiori
Elements for OData V2
Replace the generic text with text that’s meaningful to the
user.

Message Strip above the Table
- List report, object page, and analytical page with SAP Fiori
elements for OData V2
- List report with SAP Fiori elements for OData V4
In the object page, by default, a message strip is displayed
when there are errors in the table.
When there are multiple messages, the one with the highest
severity is displayed.

[Generic Context Menu](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#generic-context-menu)

[Order of Nodes in the Tree Table](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#order-of-nodes-in-the-tree-table)
always displays a newly created node as the first in the table
or as the first child below its parent node, even when a sort or
a filter is applied to the table.
You can change the default.

#### List Report and Analytical Page Only

[Number of Table Levels Expanded at Initial Load](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#initial-expansion-of-table-levels)
analytical table.

#### List Report Only

Copy

#### Object Page Only

[Message Strip for Rows with Errors](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#message-strip-for-rows-with-errors)

Rows Displayed in a Grid Table
onscreen space for an object page with:
- Anchor bar navigation and a single section that contains only
a grid table
- Tab bar navigation and a current tab that contains only a grid
table

## Table Settings

### Tooltips on Column Headers

On desktop applications, all table columns display tooltips, based on the text in:

- `Common.QuickInfo`, when it’s visible
- The column label, in all other cases

Tooltips are available only in desktop applications because users must hover their mouse on the column header to see them.

### Clear All / Select All

When the [selection of multiple rows](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#item-selection) is enabled for a table in the list report and object page, the _Clear All_  :clear-all:  checkbox is displayed by default in the selection column header for all tables, but the responsive table. You can change the default.

> **Information:** To select a range of items when the _Clear All_  :clear-all:  checkbox is displayed, users can select an item, press **Shift**, and select others.

Table

#### Table Type  | #### Selection Default   | #### Users Can Select

Grid table       | _Clear All_  :clear-all: | Up to 200 rows by default
Analytical table |                          | We recommend you consult the application
| development team on how changes to the limit
Tree table       |                          | would impact performance.

Responsive table | _Select All_  :border:   | All the rows displayed on the interface, **not all the rows in the table**.
| A message informs users that “Only the first _n_
| of the items you selected were added to the
| selection,” where “_n_” equals the number of
| items loaded on the interface.

> **Warning:** For grid tables, analytical tables, and tree tables, changing the default _Clear All_  :clear-all:  checkbox to the _Select All_ :border: checkbox can lead to performance issues because _Select All_ :border: loads all the table rows to the frontend.
Always ask the application development team about the impact on performance before you consider such a change.

> **Guideline:** When the object page is in tab bar mode, we recommend enabling the _Clear All_  :clear-all: when the selection of multiple rows is enabled.

### Column Width

The default column width varies according to the column contents:

- Text: can range from 3 to 20 rem
- Image: 5 rem
- Rating or progress indicator: 6.875 rem
- Chart: 20 rem

You can change the width.

You can also ask the application developers to ensure the column width takes into account the contents of both the column and the column header.

> **Hint:** For more information, refer the development team to [Setting the Default Column Width](https://sapui5.hana.ondemand.com/1.88.1/#/topic/a76525362b754354a85981a7389ca7af).

### Column Importance in Responsive Tables

By default:

- Key fields have high importance in list reports.
- Other columns have the importance of none and are handled like columns assigned medium importance.

You can change the level of importance.

The importance assigned to a column determines whether or not the table displays its values onscreen when screen space is limited:

- The values from high importance columns are always displayed onscreen — as columns or in the pop-in area, depending on the screen size.
- The values in columns with low importance are first to be hidden.

When at least one column is hidden, the table toolbar displays the _Show Details_ button so users can view the previously hidden columns in the table [pop-in area](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#responsiveness). After the user clicks _Show Details_ to display the column, the action changes to _Hide Details_.

You can also assign an importance to custom columns.

For more information, see:

- [Responsiveness](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#responsiveness)
- [Auto Popin Mode](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#auto-pop-in-mode)

### Freezing Columns

You can freeze the first columns of an analytical table, grid table, or tree table so that they always remain visible when the users scroll the table horizontally. You specify the number of columns.

> **Hint:** For more information, refer application developers to [Tables](https://sapui5.hana.ondemand.com/#/topic/c0f6592a592e47f9bb6d09900de47412).

### Labels for Multiple Fields in a Column

By default, with SAP Fiori elements for OData V4, when a column contains a field group with more than one field, the labels for those fields are not displayed.

You can enable the display of a label for each field. The field group label then is displayed as the column title in the header.

### Sort Order

By default, the sort order for a column is ascending.

You can:

- Set the default sort order to descending.
- Define other, customized sort orders.

For more information, see the sort guidelines according to table type:

- [Responsive Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/)
- [Analytical Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/)
- [Grid Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/)
- [Tree Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/)

### Quick Sort on a Column

Available for any sortable column.

When a column contains a combination of fields, such an ID and a description or a field group, the users can specify a sort and sort order for each field in the column with the quick sort.

### Number of Table Rows Displayed at Once

By default, a responsive table loads the following number of rows at once:

- 20 rows in a list report.
- 10 rows in an object page with multiple sections.

When more rows exist, the users can click the _More_ button at the end of the table to view additional rows.

With SAP Fiori elements for OData V2, you can change the default number.

For an object page that includes one section and one subsection, the responsive table loads 20 rows and the user can scroll to view additional ones.

> **Guideline:** Work with the development team to find the best compromise between optimal user experience and optimal technical
performance.

### Grouping

Grouping is available in responsive and analytical tables.

You can define the format of the grouping headers.

For more information, see:

- Analytical Table: [Group](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/#group)
- Responsive Table: [Group](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#group)

### No Data Found Message

By default:

- An [illustrated message](https://www.sap.com/design-system/fiori-design-web/ui-elements/illustrated-message/) with generic text is displayed with SAP Fiori elements for OData V4. You can add an action to the illustrated message or you can replace it with a text-only message.
- Generic placeholder text is displayed with SAP Fiori Elements for OData V2.

> **Guideline:** Replace the placeholder text with text that’s meaningful to the user.
For more information, see: [Replacing Placeholder Text](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/replacing-placeholder-text)

### Generic Context Menu

Columns

By default, on desktop and mobile applications, a generic context menu is activated and **cannot be deactivated** for all table types with both versions of SAP Fiori elements for OData.
The generic context menu generally behaves like the standard context menu described in the corresponding table articles, linked below.
the context menu applies to the non-selected row_
The context of the generic context menu can be either a single row or multiple selected rows.
The following action types are available on the generic context menu:
_Multiple row context - one or more selected rows are the "click
#### All toolbar actions that become active only if rows are selected
Developers call them “bounded toolbar actions” or “context-dependent actions.”
With SAP Fiori elements for OData V4, the generic context menu for tree tables can contain the _Create_ action, as well as actions specific to the tree table for example:
- _Move Up_ and _Move Down_ for reordering nodes within the same hierarchical level
- _Expand Entire Node_ and _Collapse Entire Node_
- _Cut_ and _Paste_
- _Create Child Node_
#### The “Open in New Tab or Window” action
It allows up to 10 items to be opened in separate tabs or windows depending on the user’s browser settings.
Similar to the standard context menu, if a control inside a row is the “click target”, and the control also provides a context menu,
the control menu “wins”.
For information on the standard context menu, see:
- [Context Menu (Responsive Table)](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#context-menu)
- [Context Menu (Grid Table)](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/#context-menu)
- [Context Menu (Analytical Table)](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/#context-menu)
- [Context Menu Tree Table](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree-table/#context-menu)
### Order of Nodes in the Tree Table

With SAP Fiori elements for OData V4, by default, a newly created node is always displayed first in the table or as the first child below its parent node, even when a sort or a filter is applied to the table. For example, a node created:

- At the root of the table is displayed **first in the table**
- In a container node is displayed **first in the container node**

Instead, you can enable an option to display new nodes in the order that they were created in the table or parent node. For example, a node created:

- At the root of the table is displayed as the **last in the table**
- In a container node is displayed **last in the container node**

This feature allows users to act directly on the table hierarchy — not just its display — when they:

- Create new table elements
- Reorder nodes from the generic context menu, by moving them up or down in the table or in their parent nodes

> **Information:** - With this feature, a message [strip/toast] informs the user when the filter criteria applied to a table prevents a
new node from being displayed.
- For backend systems on RAP, this feature is unavailable for tree tables in a list report.

> **Hint:** For more information, refer application developers to [Tree Tables](https://sapui5.hana.ondemand.com/#/topic/7cf7a31fd1ee490ab816ecd941bd2f1f).

## List Report and Analytical Page Only

### Initial Expansion of Table Levels

By default, on initial load, the following expandable tables are expanded to this number of levels:

- Responsive table: 1 level
- Tree table: 1 level
- Analytical table: 0 levels

You can change the default value for the tree table and analytical tables.

> **Hint:** For more information, refer the development team to [Initial Expansion Level for Tables in List Reports & Analytical List Pages](https://sapui5.hana.ondemand.com/#/topic/bc05d353d2c44854b1ea228b99e922a2).

### Message Strip for Rows with Errors

When table rows contain errors, a message strip is displayed above the table. It contains a _Filter Items_ link that lets users see only the rows with errors. After the users click the link, a _Clear Filter_ link replaces it.

## Object Page Only

### Message Strip for Rows with Errors

When table rows contain errors, a message strip is displayed above the table. It contains a _Filter Items_ link that lets users see only the rows with errors. After the users click the link, a _Clear Filter_ link replaces it.

---

## Table Rows Sap Fiori Elements 2

# Table Rows

## Intro

The SAP Fiori elements templates support the features and settings for table rows or inline items detailed below.

For design information see the table guidelines, starting with [Table Overview](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), and the links below.

## Feature Availability

Table

#### Actions

[Empty Row for Data Entry in Create and Edit Modes](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#empty-row-for-data-entry-in-create-and-edit-modes)
tables: the table displays an empty row for data entry.
You can turn it off for edit mode.

Editable Multi-Input Fields

[Inline Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#inline-actions)

[Direct Edit](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#direct-edit)
elements for OData V2

[Conditional Enablement of Navigation Buttons](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#conditional-enablement-of-navigation-buttons)
- Available with SAP Fiori elements for OData V4
- Requires an extension with SAP Fiori elements for OData
V2

[Single Item Selection](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#item-selection)

[Multiple Item Selection](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#item-selection)

[Item Limit for Multiple Selection](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#item-selection)
tree tables. You can change the limit.

[Delete](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#delete)

[Custom Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#custom-actions)

[Messages for Critical Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#messages-for-critical-actions)
meaningful text for the user.

#### Display

[Restrict Field to Read Only in a Table](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#read-only-field)

[Editing Status](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#editing-status)
the responsive table and grid table in a list report.
With SAP Fiori elements for OData V4, it is also
displayed by default in a tree table.

[Rating Indicator](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#rating-indicator)

[Progress Indicator](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#progress-indicator)

[Quick Contact View](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#quick-contact-view)

[Avatar](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#avatar-and-other-images)

[Avatar Tooltip](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#avatar-and-other-images)

[Other Images](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#avatar-and-other-images)

Table Cells with Multiple Values
In edit mode, the multiple values fields are editable in
object page tables.
The cells that displayed multiple values in the table
onscreen are empty when exported to a spreadsheet.

[Highlighting New Line Items](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#highlighting-line-items)
Default with SAP Fiori elements for OData V4 for grid and
responsive tables in draft-enabled applications

[Highlighting Line Items Based on Criticality](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#highlighting-line-items)

#### Responsive Table Only

[Multiple Fields in a Single Column](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#multiple-fields-in-a-single-column)

[Smart Micro Chart](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#smart-micro-chart)

## Actions

### Empty Row for Data Entry in Create and Edit Modes

With this feature, when the object page is in create or edit mode, responsive tables and grid tables display one empty row where the users can enter data for a new subobject.

The empty row:

- Is displayed at the top of the responsive table.
  The toolbar has no _Create_ button.
- Is displayed at the end of a grid table.
  The _Create_ button in the toolbar scrolls to the empty row at the end of the table and puts the focus on the first editable field.
- Has no inline navigation action to the item via the chevron.
- Cannot be sorted or grouped because it doesn’t exist in the table on the back end.

With SAP Fiori elements for OData V4, you can set the empty row to be deletable.

If the users delete all the empty rows in the table, a new one is added so they can continue data entry.

#### Automatic Creation of a New Empty Row

After users start to enter data in one field in the empty row, a new empty row is added underneath it so they can continue data entry for either one column or one row at a time.

The row with data in one field:

- Is highlighted with a blue line to its left to show it’s a newly created draft
- Displays the navigation chevron
- Can also display an inline delete action
- Displays error messages for [mandatory fields](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#mandatory-fields) without a value.

If users do not enter data in a new empty row, it is removed when the users save.

#### Drafts Saved for Rows

A draft for a once empty row is saved after the users:

- Shift the focus away from the input field in the row with SAP Fiori elements for OData V4
- Have shifted their focus away from the input field in the row and an interval of 20 seconds has passed with SAP Fiori elements for OData V2

#### Enablement Options

In draft-enabled applications, with both versions of SAP Fiori elements, you can enable or disable this feature for:

- An application so the setting applies to all grid tables and responsive tables in all object pages
- A table so it applies only to the table

When settings are made at **both** application and table levels, the table setting takes priority.

Additionally, with SAP Fiori elements for OData V2, you can enable or disable the feature at the object page level. When the settings are made at application, object page, and table levels, the setting at the most granular level takes priority, as follows: table, object page, application.

##### User-Enabled Creation of Empty Rows in Edit Mode

In edit mode, you can turn off the default creation of empty rows for tables whose maintenance mostly requires updating data in existing rows.

If the users want to create additional rows, the _Create_ button lets them enable the automatic creation of one empty row.

On first click, the _Create_ button creates the empty row. On subsequent clicks, the _Create_ button moves the focus to the first editable field in the first empty table row. After the users save their changes, the automatic creation of empty rows is turned off.

#### Additional Settings

When you enable the empty row creation, for the empty row, you can also set:

- [Mandatory fields](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-rows-sap-fiori-elements-2#mandatory-fields)
- Default values to populate fields
- Fields to be read-only at creation time and become editable only after the row is saved

##### Mandatory Fields

In create and edit modes, both versions of SAP Fiori elements guide users in completing the required fields for an empty row, as follows:

- With SAP Fiori elements for OData V4, a red asterisk (\*) is displayed in the column header label for the mandatory fields.
- Both SAP Fiori elements for OData V2 and V4 show an error message strip above the table:
  - When the table does not display mandatory columns. It instructs users to display the columns from the table settings.
  - When mandatory fields are not filled. In addition to the message strip for the table, the mandatory field displays a value state message. “_Enter a value_” is the the placeholder message text.

> **Guideline:** Replace the placeholder text to specify the value to enter with wording more meaningful to the users, for example, “_Enter a delivery date._”
You can do this in the `i18n` file for the application.
For more information see: [Replacing Placeholder Text (SAP Fiori Elements)](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/replacing-placeholder-text).

### Inline Actions

You can define actions for table rows or inline items. The action types can be:

- Actions that occur in the system while the user stays on the list report screen, for example _Approve_ or _Reject_.
- Actions that navigate to a different application, for example, when the user can open a purchase requisition from a specific purchase order in the table.

When a page contains a grid table, an analytical table, or tree table that leads to object or subobject pages, users can navigate to the object or subject page at row level. The _Show Detail_ button is not displayed in these tables. Instead, users can click the navigation indicator: :navigation-right-arrow: .

#### Direct Edit

You can enable this action to let users navigate from the table row to the corresponding object page in edit mode with the _Edit_ icon :edit: with SAP Fiori elements for OData V2.

This feature is available for responsive and grid tables. When it’s enabled, the object page footer displays the _[Save and Next](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/object-page/object-page-footer-bar-sap-fiori-elements#save-and-next)_ button.

For more information, see:

- [Action Placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement)
- [UI Text Guidelines for SAP Fiori](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori#word-choice) 
### Conditional Enablement of Navigation Buttons

In list reports and object pages:

- With SAP Fiori elements for OData V4, you can enable buttons that navigate the user to another page or application based on the value of a specific field.
- With SAP Fiori elements for OData V2, this feature requires extensions.

For example, you can enable the Generate Purchase Order button only for sales orders with the completed status.

> **Guideline:** Implement this feature only when the way to enable the button is obvious to end users.

### Item Selection

Both versions of SAP Fiori elements allow you to determine whether users can select:

- One table row for a toolbar action, using a radio button.
- Multiple table rows for a toolbar action, using checkboxes.
  For an object page, you can enable selection of multiple rows for **all the tables** on the page, or for **specific tables only**.
  For an analytical table, grid table, or tree table, ask the development team to use the [Multi-Selection Plugin](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/#select).

When the selection of multiple rows is enabled for a table, both versions of SAP Fiori elements have the following defaults that you can change:

- Display of either the _Clear All_ or _Select All_ checkbox in the header of the selection column. The two versions differ in the way they do this.
  For complete information, see: [Clear All / Select All](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/table-features-sap-fiori-elements#clear-all--select-all).
- A limit of 200 rows that the user can select at once for grid tables, analytical tables and tree tables.
  You can change the limit. We recommend you consult the application team on how a change would impact performance.

#### SAP Fiori Elements for OData V2

By default, single selection is enabled for a table. You can enable multiple item selection, known by application developers as multiselect.

#### SAP Fiori Elements for OData V4

With the default auto mode, the application checks whether any table toolbar actions depend on item selection to be enabled. If not:

- In display mode, item selection is not possible.
- In edit mode, when the delete action is enabled, multiple selection is also enabled.

Instead, you can enable one of the following selection modes:

- None:
  - Display mode allows no item selection.
  - Edit mode allows multiple item selection when a _Delete_ action is available in the table toolbar.
- Single: Both display and edit modes allow single item selection.
- Multi: Both display and edit modes allow multiple item selection.

> **Warning:** When you enable multiple selection for the **table**, do not enable a delete action in the **table rows**. The application will fail to load when both these features are enabled.
Instead, enable a delete action for the **table**. The delete action is then available in the table toolbar.

For more information, see:

- Responsive Table: [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#select)
- Analytical Table: [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/#select)
- Grid Table: [Select](https://www.sap.com/design-system/fiori-design-web/ui-elements/grid-table/#select)
- Tree Table: [Selection Modes](https://www.sap.com/design-system/fiori-design-web/ui-elements/tree/#selection-modes)

> **Hint:** For more information, refer the development team to:
- [Enabling Multiple Selection in Tables](https://ui5.sap.com/#/topic/116b5d82e8c545e2a56e1b51b8b0a9bd)
- [Multi-Selection Plugin](https://www.sap.com/design-system/fiori-design-web/ui-elements/analytical-table-alv/#select)

### Delete

In responsive tables only, you can:

- Display an inline delete action.
- Prevent the deletion of certain rows.

In support of best design practices, SAP Fiori elements **does not** allow you to combine an **inline** delete action with a **central** delete action in the toolbar.

For more information, see [Delete Single Item Rows](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#delete-single-item-rows).

### Custom Actions

You can define custom inline actions.

Because custom inline actions are grouped, you cannot control their exact display order. However, you can control which columns display the groups.

### Messages for Critical Actions

For actions that you set as critical, you can display one of the following after the user triggers the action:

- A message toast confirmation
- A confirmation message box to check the users want to proceed with specific critical actions

Also, the backend can require a confirmation on some actions. In this case, the confirmation message is always shown in a message box.

> **Guideline:** Replace the generic placeholder text in the messages with text that’s meaningful to the users, as shown in the
example below. You do this by providing the new text to the develoment team for update in the application’s
internationalization (i18n) file for the object type.
Ask the development team whether or not the backend requires confirmations for your use case.

#### Example

Table
**SAP Fiori elements for OData V2**   | **SAP Fiori elements for OData V4**

**Default Text**     | “Do you really want to execute the    | “Do you really want to perform this
action \<Action Label>?”              | action?
\<Action Label> is the label shown on
the button.
**Replacement Text** | “Are you sure you really want to      | “Are you sure you really want to
activate this product?”               | activate this product?”

For more information, see [UI Text Guidelines for SAP Fiori Apps](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori).

## Display

You can include the display features described below in a table row or inline item.

### Read-Only Field

With SAP Fiori elements for OData V4, you can set a field to display as read-only in a table, but set it as editable in another place on the UI.

### Editing Status

By default, for draft-enabled applications, in a list report, the editing status is displayed:

- In the first column of a responsive table
- In a separate column, next to the key column, in a grid table. The column is unlabeled. Users can hide or display it by deselecting or selecting _Edit Status_ in the table personalization dialog.

You can also add the semantic key to the status.

The edit status reflects the state of the object or item in the processing cycle. For example, it can give the user information about the state of completion for the item or whether it’s currently available.

- For Unsaved Changes and Locked statuses, a popover displays the full name or technical name of the user who last changed the object when the name is available. “Another user” is displayed when it’s not.
- For Draft, Unsaved Changes and Locked statuses, a popover displays the user who last changed the item and the time of the change.

For more information, see [Tables](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling#tables).

### Rating Indicator

You can add an inline, read-only rating indicator and define a maximum rating of up to five stars. By default, five stars is the maximum.

The number of stars displayed depends on the value of a field in the backend. Decimal values are rounded up or down and when the value after the decimal point falls between x.25 and x.74, it is represented by a half star.

**With extensions,** you can enable editing of the rating indicator

For more information, see [Rating Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/rating-indicator/).

### Progress Indicator

You can:

- Enable an inline progress indicator to visually represent the level of completion of a project or goal, for example.
- Set the progress measure as a percentage or an absolute number, for example 3 or 8.
- Configure the progress bar to reflect the state of progress with color, based on the criticality of the progress.

For more information, see [Progress Indicator](https://www.sap.com/design-system/fiori-design-web/ui-elements/progress-indicator/).

### Quick Contact View

You can add a quick view to a contact to display key contact details in a popover.

For applications with Microsoft Team integration, the contact quick view card displays options for starting an audio call, video call, or chat in with the contact in Microsoft Teams.

For more information, see [Quickview](https://www.sap.com/design-system/fiori-design-web/ui-elements/quickview/).

Default (col-1)

Default (col-1)

### Avatar and Other Images
You can display an avatar in the row and set a tooltip that displays when the focus is on the avatar.

> **Warning:** Other images are not displayed correctly within the table borders. Only use them with live box mode.

Default (col-1)

For more information, see [Avatar](https://www.sap.com/design-system/fiori-design-web/ui-elements/avatar/).

Section Metadata

style

### Highlighting Line Items
By default, with SAP Fiori elements for OData V4, in
draft-enabled applications, a newly created item in draft
status is always highlighted in blue in grid and
responsive tables.
Highlighting of new line items in draft-enabled
applications is available with both SAP Fiori elements for
OData V2 and V4.
You can also define highlighting and icons for line items
based on their criticality.
After a newly created item is saved, it is highlighted
according to the criticality, as follows:
- Green for success (criticality value 3)
- Yellow for warning (criticality value 2)
- Red for error (criticality value 1)
- No highlighting for no criticality (criticality value 0)
## Responsive Table Only

In a responsive table, you can include the display features described below in a table row or inline item.

### Multiple Fields in a Single Column
You can combine multiple IDs, descriptions, and action buttons in a single column in a responsive table.
For example, you can display the following in a single column:
- Company name
- Company ID
- Items in Stock
- Progress Indicator for Items in Stock
- Overall value of the Items
- Multiple Action buttons that allow the user to both:
- Execute an action while staying on the list report page
- Navigate to other objects and applications
The visibility and position in the table of a column that combines multiple fields can be changed.
#### Field Labels
By default, with SAP Fiori elements for OData V4, when a column contains a field group with more than one
field, the labels for those fields are not displayed.
You can enable the display of a label for each field. Then, the field group label is displayed as the column
title in the header.
**Limitation on Export to Spreadsheet**
When users export a table with a column that contains multiple fields to a spreadsheet, only the **first piece of information** displayed in the column is exported.

---

## Table Types Sap Fiori Elements

# Table Types

## Intro

The SAP Fiori elements templates support the features and settings for the different table types detailed below.

For design information, see the guidelines starting with [Table Overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), and see the links below.

## Feature Availability

\
Table

### Table Type                                                                                                                          | ### Responsive Table (Default) | ### Analytical                                                                                                                                                                                                                                     | ### Grid                                                                                                                                                                                                                                           | ### Tree

#### SAP Fiori Elements for OData Version                                                                                               | #### V2 & V4                   | #### V2 & V4                                                                                                                                                                                                                                       | #### V2                                                                                                                                                                                                                                            | #### V2

**Devices**

Desktop                                                                                                                                 | **:accept:**                   | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

Tablet                                                                                                                                  | **:accept:**                   | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

Phone                                                                                                                                   | **:accept:**                   | **:decline:**                                                                                                                                                                                                                                      | **:decline:**                                                                                                                                                                                                                                      | **:decline:**

**Responsive**\                                                                                                                         | **:accept:**                   | **:decline:**                                                                                                                                                                                                                                      | **:decline:**                                                                                                                                                                                                                                      | **:decline:**
(hide column, popin support)                                                                                                            |                                |                                                                                                                                                                                                                                                    |
**Density Mode**                                                                                                                        |                                | See [Analytical Table: Compact, Cozy, Condensed](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/analytical-table-alv/#compact-cozy-and-condensed).                                                    | See [Grid Table: Compact, Cozy, Condensed](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/grid-table/#compact-cozy-and-condensed).                                                                    | See [Tree Table: Types.](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tree-table/#types)
See [Content Density](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/cozy-compact). |                                |                                                                                                                                                                                                                                                    |
Compact density                                                                                                                         | **:accept:**                   | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

Condensed density                                                                                                                       | **:decline:**                  | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

Cozy density                                                                                                                            | **:accept:**                   | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

Summarized cell                                                                                                                         | **:decline:**                  | **:accept:**                                                                                                                                                                                                                                       | **:decline:**                                                                                                                                                                                                                                      | **:decline:**

Hierarchical data                                                                                                                       | **:decline:**                  | **:decline:**                                                                                                                                                                                                                                      | **:decline:**                                                                                                                                                                                                                                      | **:accept:**

Large number of rows (> 200)                                                                                                            | :alert:                        | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

Grouping                                                                                                                                | **:accept:**                   | **:accept:**                                                                                                                                                                                                                                       | **:decline:**                                                                                                                                                                                                                                      | **:decline:**

Freeze columns                                                                                                                          | **:decline:**                  | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

Horizontal scrolling                                                                                                                    | **:decline:**                  | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

Merge duplicates                                                                                                                        | **:accept:**                   | **:decline:**                                                                                                                                                                                                                                      | **:decline:**                                                                                                                                                                                                                                      | **:decline:**

Supported Inline Controls                                                                                                               | **All**                        | **Limited**\                                                                                                                                                                                                                                       | **Limited**\                                                                                                                                                                                                                                       | **Limited**
| See [Inline Controls for Non-Responsive Tables](https://www.sap.com/design-system/fiori-design-web/v1-130/discover/frameworks/sap-fiori-elements/tables-and-lists/table-types-sap-fiori-elements#inline-controls-for-non-responsive-tables) below. | See [Inline Controls for Non-Responsive Tables](https://www.sap.com/design-system/fiori-design-web/v1-130/discover/frameworks/sap-fiori-elements/tables-and-lists/table-types-sap-fiori-elements#inline-controls-for-non-responsive-tables) below. | See [Inline Controls for Non-Responsive Tables](https://www.sap.com/design-system/fiori-design-web/v1-130/discover/frameworks/sap-fiori-elements/tables-and-lists/table-types-sap-fiori-elements#inline-controls-for-non-responsive-tables) below.

Row-based                                                                                                                               | **:accept:**                   | **:decline:**                                                                                                                                                                                                                                      | **:decline:**                                                                                                                                                                                                                                      | **:decline:**

Column-based                                                                                                                            | **:decline:**                  | **:accept:**                                                                                                                                                                                                                                       | **:accept:**                                                                                                                                                                                                                                       | **:accept:**

## Inline Controls for Non-Responsive Tables

These inline controls are supported for grid, analytical, and tree tables:

Columns

- Text         | - ComboBox          | Also, the following when they are of
- Label        | - MultiComboBox     | a responsive or very small size:
- ObjectStatus | - CheckBox
- Icon         | - Link              | - StackedBarMicroChart
- Button       | - Currency          | - ComparisonMicroChart
- Input        | - RatingIndicator   | - BulletMicroChart
- DatePicker   | - ProgressIndicator
- Select       |

---

## Tables Toolbar

# Table Toolbar

## Intro

The SAP Fiori elements templates support the features and settings for the table toolbar detailed below.

For design information, see the guidelines starting with [Table Overview](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/table-overview), and see the links below.

## Feature Availability

Table

#### List Report and Object Page Features

Title
You can hide it.
You can show the table row count next to the title.

Infobar
summarizes the filter criteria applied to the table data. It is displayed below the table toolbar and above the
column headings when at least one filter is set.

Order of Toolbar Actions
with the most frequently-used action and ending with the most seldom-used action, regardless of whether the action
is a custom or standard one.

[Table Personalization Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#table-personalization-actions)

[Show/Hide Details](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#show-hide-details)

[Mass Edit](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#mass-edit)
- In both the list report and object page with SAP Fiori elements for OData V4
- In the list report with SAP Fiori elements for OData V2

[Export](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#export)
- _Export to Spreadsheet_ is enabled by default.
- _Export to PDF_ is available.
With SAP Fiori elements for OData V2, _Export to Excel_ is enabled by default in:
- A list report table
- An object page table **only if** the _Paste_ icon is displayed

[Copy to Clipboard](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#copy-to-clipboard)

[Paste from Clipboard](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#paste-from-clipboard)

[Application-Specific Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#applicationspecific-actions)

[Actions Disabled Before Row Selection](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#actions-disabled-until-the-user-selects-a-row)

[Conditional Enablement of Navigation Buttons](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#conditional-enablement-of-navigation-buttons)
Requires an extension with SAP Fiori elements for OData V2

[Messages for Critical Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#messages-for-critical-actions)

[Messages for Destructive Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#messages-for-destructive-actions)

[Multiple Views on a Table](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#multiple-views-for-a-table)

#### List Report Only Features

Toolbar Sticky Behavior

[Standard Actions](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#standard-actions): _Create_ and _Delete_

Object Creation via an Object Page

[Object Creation via a Dialog](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#via-a-dialog)

[Object Creation with Reference to Another Object](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#via-a-dialog-with-a-reference-to-an-existing-object-of-the-same-type)

[Copy Object](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#copy-object)
You determine the label on the action button.

[Hiding Actions in Multiple Content Layout](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#hiding-actions-in-multiple-content-layout)

Message Strip for the Table

[Add Card to Insights](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#add-card-to-insights)
You can turn it off.

#### Object Page Only Features

[Search](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#search)

[Edit](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#edit)

[Delete](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#delete)

[Subobject Creation via Subobject Page](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#subobject-creation)

[Subobject Creation via Dialog](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#subobject-creation)

[Create Not Visible](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#create-action-visibility)

[Inline Creation](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#inline-creation)

[Prefilling Fields for New Object Creation](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#prefilling-fields-for-a-new-object)

[Full Screen Mode for Table Display](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#full-screen-mode-for-table-display)

[Segmented Button for Switching Table Views](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#content-switch-for-table-views)

[Select Control for Switching Table Views](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#content-switch-for-table-views)

## List Report and Object Page Features

The information below relates to table toolbar actions and settings in **both** the list report and object page floorplans.

### Table Personalization Actions

By default, sort, group and order actions are enabled for the table. They are available in the _Personalization_ dialog as tabs. Users open the dialog with the _Settings_ icon button.

For specific use cases, you can disable the actions.

Table-level view management is not a prerequisite for personalization.

For more information, see [Table Personalization (Overview)](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/tables/overview-table-personalization).

### Show / Hide Details

The responsive table toolbar displays the _Show Details_ action when at least one column is hidden from the screen because of limited onscreen space.

After the user clicks _Show Details_, the the table displays the hidden information in the [pop-in area](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#responsiveness), and the action changes to _Hide Details_.

The importance assigned to a column determines whether or not the table displays its values onscreen when screen space is limited:

- The values from high importance columns are always displayed onscreen — as columns or in the pop-in area, depending on the screen size.
- The values in columns with low importance are first to be hidden.

By default, in responsive tables:

- Key fields have the importance set to high in list reports.
- Other columns have the importance set to none and are handled like columns assigned medium importance.

You can change the level of importance.

### Mass Edit

You can enable mass edit in responsive tables and grid tables for applications with draft handling in the:

- List report with SAP Fiori elements for OData V2
- List report and object page with SAP Fiori elements for OData V4

#### List Report

Users cannot apply the mass edit to a draft record.

The edit is applied to all the objects selected that don’t return errors or warnings during the update. When they **do** return an error or warning, none of their fields are updated.

#### Object Page

With SAP Fiori elements for OData V4, you can enable the mass edit for a table in the object page. When the object page is in display mode, users can apply the mass edit to the subobjects in a table.

#### Fields Displayed in the Edit Dialog

By default, the _Edit_ dialog contains all the table columns that are currently visible and editable.

The application team can define the fields that display in the dialog, by both:

- Including fields in the dialog that **are not** displayed in the table
- Excluding fields from the dialog fields that **are** displayed in the table

> **Hint:** For more information on enabling this feature for an object page table with SAP Fiori elements for OData V4, you can refer application
developers to [Using the Mass Edit Functionality](https://sapui5.hana.ondemand.com/#/topic/965ef5b2895641bc9b6cd44f1bd0eb4d).

### Export

The export action exports the values in a table. When enabled, it is displayed in the table toolbar.

- With SAP Fiori elements for OData V4:
  - _Export to Spreadsheet_ is enabled by default.
  - _Export to PDF_ is available.
  - By default, a maximum of 1000 rows can be exported. The application development team can change the limit.
  - Columns that contain a [multi-input field](https://www.sap.com/design-system/fiori-design-web/ui-elements/multiinput/) (1:N) are not exported.
- With SAP Fiori elements for OData V2 _Export to Excel_ is enabled by default in:
  - A list report table
  - An object page table if the _Paste_ icon is available

For more information see [Export to Spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/).

> **Hint:** For more information, refer application developers to:
- [Using the Export Button (SAP Fiori elements for OData V4)](https://sapui5.hana.ondemand.com/sdk/#/topic/4bab6f2043814257974b52d4dafe1dcd)
- [Adapting the UI: List Report and Object Page (SAP Fiori elements for OData V2)](https://sapui5.hana.ondemand.com/sdk/#/topic/0d2f1a9ebd2d4a4c906216ded1d33783)

### Copy and Paste

Users can copy to the clipboard data from other SAP Fiori elements applications or from external applications — such as Microsoft Excel or Microsoft Word — and then, paste the data from the clipboard to tables in SAP Fiori elements applications that are editable.

#### Copy to Clipboard

By default, the _Copy_ action is displayed in the table toolbar. This includes tables with the selection type of none with SAP Fiori elements for OData V2.

With it, users can copy multiple rows or ranges of rows and columns to the clipboard.

They can select a range of cells in rows or columns:

- With their mouse, by clicking and holding the mouse button while they select the cells
- With the key combinations, described in [Copying Multiple Rows and Range Selections](https://sapui5.hana.ondemand.com/sdk/#/topic/c0f6592a592e47f9bb6d09900de47412)

#### Paste from Clipboard

The _Paste_ action is displayed in the table toolbar if the table supports it.

After users copy data from another SAP Fiori elements application or an external application, they can paste it to:

- **The table**

Users set the focus on the table or select an empty row before pasting the data. One or more new rows are created for the pasted data.

This feature is available only for draft-enabled applications and for tables where inline creation or the insertion of empty rows has been enabled.

- **A cell or range of cells, only in grid and responsive tables**

Users select a cell or cell range within the table and paste the data. If the selected cell or cells are in:

- - Active or draft rows, the pasted data replaces the values in those rows.
  - An empty row, new rows are created for the pasted data.

To paste, they can use the _Paste_ action in the toolbar or use a keyboard shortcut (**Ctrl+V** for Microsoft Windows, **Cmd+V** for MacOS).

#### Limitations

- Pasting is supported only for fields that contain a single value, not for complex fields, such as smart links and images.
- If there are validation errors, a dialog displays an error message so the user can take remedial action.
- The greater the number of records copied, the longer the paste operation takes.
- The order of the of the data copied from the spreadsheet can differ from the order in the table in the application after the paste. SAP Fiori elements cannot control this.
- Users cannot paste data into custom columns of tables.
- This feature is not supported for custom tables.

> **Information:** Pasting the data from the clipboard into another SAP Fiori elements table can cause formatting issues because the copy action doesn’t separate the
content of fields that include more than one value, for example, a field with both an amount and a currency or both a value and its description.
Instead, we recommend users [export the data into a spreadsheet](https://www.sap.com/design-system/fiori-design-web/ui-elements/export-to-spreadsheet/)
format that separates multiple values in one field into separate columns, with a single value in each, and then, adjust the format to match the one the
target table.

> **Hint:** For more information, refer application developers to
- [Tables](https://sapui5.hana.ondemand.com/sdk/#/topic/c0f6592a592e47f9bb6d09900de47412)
- [Copying and Pasting from External Applications to Tables](https://ui5.sap.com/#/topic/f6a8fd2812d9442a9bba2f6fb296c42e)

### Application-Specific Actions

You can define these actions and the text displayed on the buttons.

The application team can control when the action button is displayed and enabled.

For application-specific actions, application teams can define custom keyboard shortcuts.

For more information, see:

- [Action Placement](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement)
- [Terminology for Common Actions](https://www.sap.com/internal/fiori-design-web/terminology-for-common-actions/)

> **Hint:** For more information on shortcuts, refer application developers to [Keyboard Shortcuts](https://sapui5.hana.ondemand.com/#/topic/0cd318c83ec5473d9a091c1782d03c21).

### Actions Disabled Until the User Selects a Row

You can set actions in the table toolbar to display as disabled until the user selects one or more table rows for the action.

Note that the development team may call actions that require selection “context-dependent” actions and actions that are enabled without a selection “context-independent” actions.

For more information, see [UI Element States](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/ui-elements/ui-element-states).

### Conditional Enablement of Navigation Buttons

With SAP Fiori elements for OData V4, you can enable buttons that navigate the user to another page or application based on the value of a specific field.

With SAP Fiori elements for OData V2, this feature requires extensions.

For example, you can enable the Generate Purchase Order button only for sales orders with the completed status.

> **Guideline:** Implement this feature only when the way to enable the button is obvious to end users.

### Messages for Critical Actions

For actions that you set as critical, you can display one of the following after the user triggers the action:

- A message toast confirmation
- A confirmation message box to ensure the user wants to proceed with specific critical actions

Also, the backend can require a confirmation on some actions. In this case, the confirmation message is always shown in a message box.

> **Guideline:** Overwrite the default message text so it’s meaningful to the users, as shown in the example below. Provide the new
text to the development team. Then, the development team updates it in the application’s internationalization (i18n)
file for the object type.
Ask the development team whether or not the backend requires confirmations for your use case.

#### Example

Table
**SAP Fiori elements for OData V2**   | **SAP Fiori elements for OData V4**

**Default Text**     | “Do you really want to execute the    | “Do you really want to perform this
action \<Action Label>?”              | action?
\<Action Label> is the label shown on
the button.
**Replacement Text** | “Are you sure you really want to      | “Are you sure you really want to
activate this product?”               | activate this product?”

For more information, see:

- [Replacing Placeholder Text](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/replacing-placeholder-text)
- [Message Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging)
- [UI Text Guidelines for SAP Fiori Apps](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori)

### Messages for Destructive Actions

By default, a message is displayed for confirmation of an action that will delete or destroy important data.

> **Guideline:** Overwrite the default message text so it’s meaningful to the users, as shown in the example below. Provide the new
text to the development team. Then, the development team updates it in the application’s internationalization (i18n)
file for the object type.
Ask the development team whether or not the backend requires confirmations for your use case.

#### Example

Table
**SAP Fiori elements for OData V2**   | **SAP Fiori elements for OData V4**

**Default Text**     | The default message reuses the title  | “Do you really want to perform this
and the description defined for the   | action?
object in the table.
- In flexible column layout: Delete
object \<title> \<description>?
- For example, “Delete object 12345
(Sales Order)?”
- In full screen mode: Delete object
\<title>?
- For example, “Delete object 12345?”
**Replacement Text** | “Are you sure you really want to      | “Are you sure you really want to
delete this product?”                 | delete this product?”

For more information, see:

- [Message Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging)
- [UI Text Guidelines for SAP Fiori Apps](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/ui-text-guidelines-for-sap-fiori)

### Multiple Views for a Table

You can display a table with multiple views, for example, each view of the same table can display different columns or prefiltered states.

For a maximum of three views, a segmented button is displayed. For four or more, the select control is displayed.

With SAP Fiori elements for V4, you can also display the row count for each view next to the view name.

## List Report Only Features

The information below relates **only** to table toolbar actions and settings in the list report floorplan.

### Standard Actions

By default, _Create_ and _Delete_ are enabled.

You can disable them.

You can also enable or disable the _Delete_ button based on conditions specified in the backend.

**Example**

You can disable deletion for a sales order that has already been paid. When a user selects an item that cannot be deleted, the _Delete_ button is disabled. In addition, if the user navigates from this item in the list report to the object page, the _Delete_ button is hidden.

> **Warning:** In a responsive table, if you put a _Delete_ button in the toolbar, do not enable the inline _Delete_ for table rows.

### Create Object Actions

By default, the create via the object page feature is enabled. The create action opens the object page in create mode so the user can enter the data. Alternatively, you can enable object creation as described the sections below:

#### Via a Dialog

The action opens a dialog in modal view so the user can enter the data.

With both versions of SAP Fiori elements, you can:

- Include a maximum of eight fields in the dialog
- Enable filter values saved in the filter bar to prefill fields in the dialog. This feature requires an extension with SAP Fiori elements for OData V2.

> **Warning:** When you enable the object creation via a dialog feature, users cannot navigate to an object page in create mode.
Instead, they can navigate to the object page in display mode and switch to edit mode.
Note that when a user clicks _Cancel_ in the create dialog, no draft states are maintained.

**> **Hint:** **

For more information, refer application developers to:
- [Enabling Object Creation Using the Dialog in the List Report](https://ui5.sap.com/#/topic/ceb9284b16f64f30865ce999dbd56064)

#### With Default Values That Prefill Fields for the New Object

This feature is available with:

- SAP Fiori elements for OData V2 for applications **without** draft handling
- SAP Fiori elements for OData V4

#### Via a Dialog with a Reference to an Existing Object of the Same Type

With SAP Fiori elements for OData V4, application developers can build a
custom create action via a dialog that lets the user create a new object
with a reference to an existing object of the same type.
The user:
1. Clicks the action button.
You can name the button to suit your use case.
2. Selects the value of the existing object to reference in the dialog.
3. Completes the fields for the new object by selecting one or more
values to copy from the existing one.
4. Completes additional fields for the new object in the object page.
> **Hint:** For more information, refer application developers to:
- [Actions](https://sapui5.hana.ondemand.com/#/topic/cbf16c599f2d4b8796e3702f7d4aae6c)
- [Handling of the preferredmode Parameter](https://sapui5.hana.ondemand.com/#/topic/bfaf3ccf3d6d4735990cc793b21f5529)

### Copy Object

You can place a copy action button in the table toolbar to allow the user to create a new object with the same data as the selected object.

You set the label for the button according to your use case. Otherwise, the default label is _Copy_.

In the toolbar, the _Copy_ button is displayed after the _Create_ button.

> **Hint:** Application developers can define a standard copy action button by annotating a function import action (DataFieldForAction) as a _Copy_ action. For more information, refer them to: [Actions in the List Report](https://sapui5.hana.ondemand.com/#/topic/993e99eae4414b73bc7afef9518c79bf).

### Hiding Actions in Multiple Content Layout

You can hide an action from a toolbar for a specific table when the list report contains multiple views with multiple tables.

For more information, see:

- [Multiple Content Layout](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-content-area-fiori-elements#multiple-content-layout)
- [General Layout](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/#general-layout)

### Add Card to Insights

By default, the _Add Card to Insights_ option is displayed in the overflow toolbar of list report tables with the single content layouts when My Home in SAP S/4HANA Cloud is enabled.

You can ask the application development team to turn the option off.

For more information, see: [Simple Content Layout](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-content-area-fiori-elements#simple-layout-default).

> **Hint:** For more information on card creation and disabling it, refer application developers to [Creating Cards for the Insights Section of My Home in SAP S/4HANA Cloud](https://sapui5.hana.ondemand.com/#/topic/9b13559ef978405a99e8b624a87daf31).

## Object Page Only Features

The information below relates **only** to table toolbar actions and settings in the object page floorplan.

### Search

You can enable a search on the table.

The limit for search strings is 1000 characters.

For more information, see [Search](https://www.sap.com/design-system/fiori-design-web/ui-elements/search/).

### Edit

By default, _Edit_ is displayed when the business object shown in the table is editable.

### Delete

By default, _Delete_ is displayed in edit mode when the business object shown in the table is deletable.

You can enable or disable the _Delete_ action to allow users to delete only in certain conditions.

For example, after the sales items for a Sales Order have shipped, you can hide the _Delete_ action for the items. When a user selects an item that cannot be deleted, the _Delete_ action is disabled.

When multiple selection is enabled for the table, the _Delete_ action is enabled if at least one selected item is deletable.

> **Warning:** In a responsive table, if you put a _Delete_ action in the toolbar, do not enable the inline _Delete_ for table rows.

### Subobject Creation

By default:

- _Create_ is displayed in edit mode when the business object shown in the table is editable. For specific circumstances when the _Create_ button is disabled, see [Create Action Visibility](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#create-action-visibility) below.
- The default creation action is via the suboject page — the action opens the subobject page in create mode so the user can enter the data.

You can:

- Enable or disable the _Create_ action to allow users to create subobjects only in certain conditions. For example, after a sales order reaches the Delivery is Shipped status, you can hide the _Create Sales Item_ action.
- Enable creation of a subobject via a dialog with 8 fields maximum. The action opens a dialog in modal view so the user can enter the data. The dialog must contain all the mandatory fields for the subobject. With SAP Fiori elements for OData V2, you can enable filter values saved in the filter bar to prefill fields in the _Create_ dialog.
- Enable inline create for draft-enabled applications in grid and responsive tables with SAP Fiori elements for V4. See [Inline Creation](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/tables-and-lists/tables-toolbar#inline-creation) below.
- Enable default values to prefill the fields for the new object. This feature is available with SAP Fiori elements for OData V4, and with SAP Fiori elements for OData V2 for applications **without** draft handling.

> **Guideline:** Replace the default dialog title or subobject page title “New Item” to reflect the name of the subobject and to
provide a name for unnamed objects that’s meaningful to the user.

For more information, see:

- [Create Items](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects-with-the-global-flow#create-items)
- [Add Items](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#add-items)

### Create Action Visibility

Whether or not the _Create_ action is visible in the table toolbar depends on:

- The object page mode.
- Whether the flow is global or local.
- Where the user enters the data for the new subobject — in the subobject page or directly in the table with the inline edit.

Table

**Flow Type**              | **Read Mode for All Tables**      | **Edit Mode for Tables with        | **Edit Mode for Tables with
| Subobject Pages**                  | Inline Edit**

**Global Flow for          | - Navigation indicators           | - Navigation indicators            | - Navigation indicators
Draft-Enabled Applications |   :navigation-right-arrow: are    |   :navigation-right-arrow: are     |   :navigation-right-arrow: are
with Fiori Elements for    |   visible (if required).          |   visible (if required).           |   visible (if required).
OData V2**                 | - _Create_ button is not visible. | - _Create_ button is visible.      | - _Create_ button is visible.

**Local Flow for Non-Draft | - Navigation indicators           | - Navigation indicators            | Not Supported.
Enabled Applications**     |   :navigation-right-arrow: are    |   :navigation-right-arrow: are not
visible (if required).          |   visible.
- _Create_ button is visible.     | - _Create_ button is not visible.
### Inline Creation

You can enable inline creation of entries for applications with draft handling enabled. The _Create_ action is displayed in the table toolbar in edit mode.

The inline creation adds a new row to the table where the users can enter the subobject data.

By default, the new row is highlighted in blue and displayed at the top of the table. The highlighting disappears after the users save the data.

You can:

- Work with the development team to define a custom sort order.
- Enable default values to prefill the fields for the new object.

For more information, see [Add Items](https://www.sap.com/design-system/fiori-design-web/ui-elements/responsive-table/#add-items).

### Prefilling Fields for a New Object

You can turn this on in draft-enabled applications for the default create action via the object page, where the user navigates to another application to enter the data in the new object page.

The new object must be the main object on the object page.

You determine both the fields to prefill and the default values for the fields.

### Full Screen Mode for Table Display

You can enable full screen mode for a table. However, it is generally not recommended.

Users click the _Maximize_ action in the toolbar to display to the table in a dialog. They can return to the object page by clicking either the _Minimize_ or _Close_ action.

For more information on the restrictions for this feature, see [Maximize/Minimize](https://www.sap.com/design-system/fiori-design-web/ui-elements/smart-table/#maximize--minimize).

### Content Switch for Table Views

The number of views defined for a table determines the UI control that lets users [switch the table views](https://www.sap.com/design-system/fiori-design-web/ui-elements/table-bar/#content-switch):

- A [segmented button](https://www.sap.com/design-system/fiori-design-web/ui-elements/button/#segmented-button) for a maximum of three views
- A [select control](https://www.sap.com/design-system/fiori-design-web/ui-elements/select/) for four or more views.

By default, the count or number of records in the view is not displayed next to the title of the content switch for table views for performance reasons. Talk to the development team about how displaying the counts impacts performance for your use case.

---

## Terminology Sap Fiori Elements

# Terminology for SAP Fiori Elements

## Intro

To help you better communicate with application developers, this article presents development and design terms used in the context of SAP Fiori Elements.

They are classified as follows:

Table (**col-width-5-95)**

Symbol

:source-code:

:idea-wall:

:disconnected:

## List of Terms

Table (**col-width-20-80)**

Term

#### Action Placement<br>:idea-wall:
:status-critical-colored: However, because the SAP Fiori elements framework determines where the action is displayed, application developers cannot specify the placement with annotations.
For example, they may not be familiar with what you mean by a “finalizing action” in a list report. To implement this type of action, they use the annotation property `determining=true`.
Below, you can find additional examples of the differences between designer terminology for actions and how the application developers implement them.
| ##### Design Terminology                             | ##### Application Development Annotations
| A finalizing action that leaves the current state or | `Determining = true`
| navigates away from the page.                        |
| An action in a table row or line item that:          | `Inline = true`
| - Affects an individual table row or line item.      |
| - Triggers functionality or toggle states.           |
| A table action that:                                 | `Determining = false`
| - Affects the table.                                 | False is the default value for the property.
| - Is displayed in the table toolbar                  |
| A global action in the toolbar header that           | Not applicable. Implementation requires an extension.
| - Changes a state or mode                            |
| - Opens other related apps or tools                  |
#### Annotations<br>:source-code:
For example, annotations and their properties control the:
- Display and position of columns in a table
- Sort order for the table rows
- Measures, dimensions, and sort order in a chart
- Enablement of a navigation button always or only after the user has selected an item
Application developers can also configure the required controls and their behavior through the manifest file, a term described below.

#### App States<br>:source-code:
- Inner app (iApp) state for navigating within the application
- External app (xApp) state for navigating from one app to another
Also see the term Navigation below.
##### IApp State
When a user navigates within an application, the iApp state stores all the information to retrieve for a specific URL when the user returns to it, for example:
- Filters applied
- Visible table columns
- Sort orders applied
The user can return to the URL via
- A refresh
- Back navigation
- A tile created with _Save as Tile_
- A link shared with _Send email_
##### XApp State
When a user navigates from one source app to another target app, the xApp state stores all the information from the source app to pass the target app, for example:
- Filter values
- Values of the fields in the selected rows
- Page context
- Sort order of the table in the source app
- Other aspects of the presentation

#### Asynchronous Actions<br>:source-code:
Users can continue to work on the UI without any interruption to their flow.
Also see the term Synchronous Actions below.

#### Column in a Table<br>:idea-wall:
To configure a table, application developers use the `LineItem` annotation and the `datafield` property, where each property displays as a column in the table.
For more information, you can refer them to [Defining Line Items](https://sapui5.hana.ondemand.com/#/topic/f0e1e1743bef4f519c34025ad4351f77).

#### Content Switches<br>:idea-wall:
Icon tab bar
Segmented button
Select control
| ##### Content Switch | ##### Number of Business Objects | ##### Number of Views | ##### Example
| Segmented button     | 1                                | 3 maximum             | Business object: sales
|                      |                                  |                       | orders
|                      |                                  |                       | Each view shows the sales
|                      |                                  |                       | orders prefiltered
|                      |                                  |                       | according to a different
|                      |                                  |                       | status: draft, estimated,
|                      |                                  |                       | ordered, packed, delivered,
|                      |                                  |                       | completed
| Select control       | 1                                | 4 or more             | Business object: sales
|                      |                                  |                       | orders
|                      |                                  |                       | Each view shows the sales
|                      |                                  |                       | orders prefiltered
|                      |                                  |                       | according to a different
|                      |                                  |                       | status: draft, estimated,
|                      |                                  |                       | ordered, packed, delivered,
|                      |                                  |                       | completed
| Icon tab bar         | More than 1                      | More than 1           | Business objects:
|                      |                                  |                       | customers, deliveries,
|                      |                                  |                       | invoices, payments
|                      |                                  |                       | The list report shows a
|                      |                                  |                       | customer overview where
|                      |                                  |                       | each view shows the
|                      |                                  |                       | deliveries, invoices and
|                      |                                  |                       | payments.
For more information, see [List Report – Content Area](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/frameworks/sap-fiori-elements/list-report/list-report-content-area-fiori-elements).

#### Entity<br>:source-code:
For example, for a sales order processing application, the sales order is an entity and the sales order item is its child entity in the data model.
This parent-child association in the data model lets users navigate from the sales order to the sales order item in the application interface.

#### Facet<br>:disconnected:
:status-critical-colored: Developers use the word facet **more generically** to describe a unit for building for the object page so don’t be surprised to hear application developers speaking about “facets” for parts of the object page outside of the header.
For example, they use the annotation `ReferenceFacet` for what designers call a subsection and `CollectionFacet` for a section that contains all the subsections.
When you talk to application developers about a “facet,” specify where you want it to display.

#### Manifest<br>:source-code:
For example, in the manifest, an application developer can configure:
- A filter field to be displayed on the UI as both a compact filter field in the filter bar and a visual filter.
- A table to allow the selection of one or more table rows.
Application developers can also configure the required controls and their behavior through annotations, a term described above.

#### Navigation: Internal, External, Outbound, Inbound<br>:source-code:
Navigation within an app — for example, from a list report to an object page to a subobject page: The application uses an inner app (iApp) state to store the page state and context and **restore** the same page state and context:
- After users navigate away from the page and, then, return to it with a back navigation.
- When users go to the page from a tile created with _Save as Tile_ or from a link shared with _Send email._
##### External navigation
Navigation across applications — for example, from Managing Sales Orders to Managing Deliveries — uses the external app (xApp) state to pass the context from the source app to the target app.
Just as an outbound train leaves the station and an inbound train arrives at the station:
- Outbound navigation is when the user leaves an analytical list page, list report or object page in the current app for another app.
- Inbound navigation is when the user arrives at the analytical list page, list report, or object page in the current app from another app.
Also see the term App States above.

#### OData Services<br>:source-code:
OData services deliver one or more functionalities or capabilities on the backend system, such as the retrieval of data or execution of a series of actions. The code for the services can be reused for various purposes by different client applications.
SAP Fiori elements support different versions of OData, as their names indicate:
- SAP Fiori elements for OData version 2 (V2)
- SAP Fiori elements for OData version 4 (V4)

#### Paginator Buttons<br>:source-code:
For more information, see: [Header Toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/#paging-layout)

#### Section<br>:idea-wall:
Instead, to build an object page section, application developers use different types of facet annotations. They start with a facet, described above, add a reference facet, and add other controls for a form, table, or chart.
For more information, you can refer them to [Defining and Adapting Sections](https://sapui5.hana.ondemand.com/#/topic/facfea09018d4376acaceddb7e3f03b6).

#### Semantic Key Field<br>:source-code:

#### SideEffects<br>:source-code:
For example, in an employee record, changing the value for _City_ in the employee address makes the value in the _State_ or _Region_ field invalid.

#### Smart Controls and Control Library<br>:source-code:
Consequently, they take the annotations into account in their rendering and behavior.
For example, a smart field isn’t displayed on the UI if it’s marked with the annotation to hide it, `UI.Hidden`.
SAP Fiori elements for OData V2 uses smart controls.
SAP Fiori elements for OData V4 uses a different control library.

#### Synchronous Actions<br>:source-code:
Also see the term Asynchronous Actions above.

#### TextArrangement<br>:source-code:
- Only the text: Germany
- First the text, then the ID: Germany (001)
- First the ID, then the text: 001 (Germany)

---

