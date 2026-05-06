# SAP S/4HANA Design Guidelines

Specific design guidance for SAP S/4HANA applications.

## Best Practices For Designing Sap Fiori Apps

# Best Practices for Designing SAP Fiori Apps

## Intro

After the “Discover” phase of the [design-led development process](https://www.sap.com/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/design-led-development-process-external), your product team knows which apps need to be designed for whom. In other words, you know the user’s business role and tasks.

How do you translate this into an SAP Fiori design?

Start by deciding on the [SAP Fiori design language](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/sap-fiori#sap-fiori-design-languages):

- Is a native mobile app required because you need device capabilities such as a camera, or offline capabilities?
- Does it make sense to offer the app in a conversational bot for managing service calls, for example?
- Do you need to make the app available in different design languages to make use of their specific capabilities?

If your use case doesn’t require any device-specific capabilities or modifications, use SAP Fiori for web as your design language. Due to the [responsive and adaptive](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/responsiveness-adaptiveness) design, web apps run on both desktop and mobile devices. The apps run in the device browser, so there’s no need to install any software.

## The Basics

If you’re designing SAP Fiori web applications, familiarize yourself with the essentials:

Default (internal_only)

- [Stick to the guidelines for SAP Fiori for web](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#stick-to-the-guidelines-for-sap-fiori-for-web)
- [Keep the design principles in mind](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#keep-the-design-principles-in-mind)
- [Understand the launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#understand-the-launchpad)
- [Get to know the information architecture](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#get-to-know-the-information-architecture-layouts-floorplans-ui-elements): Layouts, floorplans, UI elements
- [Get to know the most important general patterns](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#get-to-know-the-most-important-general-patterns)

Default (external_only)

- [Keep the design principles in mind](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#keep-the-design-principles-in-mind)
- [Understand the launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#understand-the-launchpad)
- [Get to know the information architecture](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#get-to-know-the-information-architecture-layouts-floorplans-ui-elements): Layouts, floorplans, UI elements
- [Get to know the most important general patterns](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/get-started/best-practices-for-designing-sap-fiori-apps#get-to-know-the-most-important-general-patterns)

### Keep the design principles in mind

Use the SAP Fiori [design principles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/design-principles) as the overarching guidance: Role-based, adaptive, simple, coherent, and delightful.

### Understand the launchpad

The SAP Fiori launchpad is a shell that provides a role-based access to SAP Fiori apps (using the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) and [spaces](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces)) and a [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/) on top that hosts a logo, navigation options, enterprise search, notifications, personalization, and more. The shell bar is always visible.

### Get to know the information architecture: Layouts, floorplans, UI elements

SAP Fiori is based on modular components that together build a consistent information architecture. In this section, we’ll explain what we mean by pages, layouts, floorplans, and UI elements. You’ll then see how pages are structured and populated with UI elements.

### Pages, Layouts, Floorplans

The basic entity in SAP Fiori is a **page**. A page uses the entire viewport of an app and consists of three main areas: A header, a content area, and an optional footer toolbar. We call this **layout** the [dynamic page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/page-layouts/dynamic-page-layout/).

The following picture shows how a page is composed:

Columns

_Page_ | _Dynamic page_ | _Floorplan – List report_

For use cases relevant to many applications, we have defined standard page layouts, which we refer to as **floorplans.**

Examples:

- The list report, for finding, identifying, and selecting business objects.
- The object page, for displaying, creating, and editing a single business object.

You can find all floorplans in the _Floorplans_ section of the navigation structure.

Most floorplans are based on the dynamic page and come with a specific combination of UI elements in the header and content areas. For use cases that cannot be designed using a floorplan, take the dynamic page as a basis.

> **Information:** **UI elements** are the smallest entities in SAP Fiori, ranging from simple **controls,** such as buttons, to **complex controls,**
such as toolbars, tables, and forms. Complex controls themselves use other controls. For example, a toolbar contains buttons and a
smart table contains a title, a toolbar, and items.

Instead of showing one page at a time, you can also show up to three pages next to each other if they have a list-detail relationship. We call this the **flexible column layout**. For example, the first column contains a list report floorplan with all business objects, and the second the object page floorplan of the selected business object.

The following picture shows a flexible column layout with three pages:

### Dynamic Page: Structure of Header and Content Area

Most of the actual business content appears in the page header and content area.

- The **header** contains content that is relevant for the entire page and is visible at all times.
- The **content area** is the user’s main work area.

**Header**

The following picture shows the structure of the page header.

The header consists of:

- A title bar with a title and an optional toolbar.
- Content (optional).
- Header navigation (optional).
  The header navigation is used to quickly access specific parts of the content area. You can either set anchors on the page or split the content in different tabs. Keep in mind that even if the content is split in different tabs, it is still one page.

**Content Area**

The structure of the content area varies depending on the header navigation. There are three options:

Columns

#### No header navigation            | #### Anchor navigation              | #### Tab navigation
The content area is organized in one | The content area is organized in    | The content area uses a tab
or more content blocks.              | sections. Each section contains one | container. The tab container contains
or more content blocks.             | one or more content blocks.

Columns

_Content area - No header navigation_          | _Content area - Anchor navigation_          | _Content area - Tab navigation_

**Content blocks** represent different aspects of the overall page content, such as a business object or a workflow. The blocks help you design the content area in a well-balanced way. A content block itself is a container with a title and an optional toolbar on top, and a layout to arrange the controls:

**Example**

The example below shows a page without header navigation and with 3 content blocks in the content area:

The three blocks above contain:

#### No. | #### Content Block | #### Description
1    |  | Form container with:
| - Title bar, showing the
|   title (a) and toolbar (b)
| - 2 form groups (c), each
|   form group contains a form
|   with a title and label-value
|   pairs
2    |  | Chart container with:
| - Title bar, showing a
|   title (a)
| - Column chart (b)
3    |  | Table container with:
| - Title bar, showing the
|   title (a) and toolbar (b)
| - Table with items (c)
### Floorplan Structure

Columns

Floorplans come with a predefined structure in the header and content areas, some more restrictive, such as the list report, some less, such as the object page floorplan. See the respective floorplan
articles for a detailed description.

The picture shows a simplified representation of a list report (for a complete description, see [List Report](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/)):
- The **header** title bar contains a title and a toolbar, and the header content contains a filter bar with search fields. No other controls apart from the filter bar are allowed in the header
content. You could use the header navigation to show different tables and/or charts in the content area.
- The **content area** holds a table and/or a chart. No other content blocks, such as forms, are allowed.
Explore all [layouts and floorplans](https://www.sap.com/design-system/fiori-design-web/page-types/) and [UI elements](https://www.sap.com/design-system/fiori-design-web/ui-elements/).
### Get to know the most important general patterns

SAP Fiori includes interaction patterns that we\ use consistently in all SAP Fiori web apps. Make yourself familiar with these patterns. We recommend starting with:

Table

Pattern

[Object Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects)
different edit flows, such as editing a complete object
or only parts of an object.

[Message Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/messaging/messaging)
error, warning, and how to present them to the user. See
[Form Field Validation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/form-field-validation/)
validated.

[Action Placement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/action-placement)

[Navigation](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/navigation/navigation)
using the shell bar options or using UI elements on the
pages, such as smart links or quick views.

[Draft Handling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling)

You can find all patterns in the _General Patterns_ area in the navigation structure.

## See SAP Fiori in Action

Reading guidelines is one thing, trying out how it works another.

[SAPUI5 samples](https://ui5.sap.com/#/controls) allow you to check the behavior of layouts and controls, such as the dynamic page, tables, and buttons.

> **Warning:** Keep in mind that SAPUI5 samples may not always be 100% SAP Fiori compliant. This is because SAPUI5 is also consumed
by products not using the SAP Fiori design system.

## 3 Steps Toward a Consistent SAP Fiori Design

### Step 1: Download the Latest UI Kit

The design assets in the UI kit are high-fidelity drafts of SAP Fiori layouts, floorplans, and UI elements. Because the design assets follow the guidelines, they can help you to create consistent and guideline-compliant SAP Fiori apps. You also need to download the SAP typeface 72 and the SAP icon font.

To download the UI kit, go to [SAP S/4HANA Web UI Kit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/resources/libraries/cloud-erp/design-stencils-for-figma).

Default (col-1)

### Step 2: Choose Your Floorplans and Layouts
- If possible, use one of the existing floorplans.
For more information, see [When to Use Which Floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/when-to-use-which-floorplan)
- Use **colors** and **icons** consistently.
  - If you want to emphasize or classify information using colors, stick to the [semantic colors](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/visual/how-to-use-semantic-colors) defined for SAP Fiori.
  - Use icons only for their intended purpose and do not transfer them into another context.
- Consider **accessibility**, including support for screen readers and keyboard navigation/interaction. See [Accessibility in SAP Fiori](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-design-system/product-standards/accessibility-in-sap-fiori).

---

## Dld In S4 Hana Icd And Dsc

# Design-Led Development in S/4HANA, S/4HANA Industries, and DSC

## Intro

The design-led development (DLD) process for S/4HANA, S/4HANA Industries (formerly known as ICD), and Digital Supply Chain (DSC) aims to equip every design project with appropriate user research and interaction design support. It serves to improve collaboration between application UX, product management (PM), product owners (PO), development teams, and SAP UX.

The new process strengthens the role of the project teams in UX related activities. It is also more flexible, and can cater for different development constellations, such as monthly delivery.

## Basic Setup

The DLD process centers on **design projects** with a defined **design project charter**. The **design project team** is responsible for the UX quality, which is reviewed in a mandatory **UX quality check**.

Members of the application design teams in the product organization walk the product teams through the DLD process and perform design activities for clearly-prioritized design projects.

- **Design project**
  Design projects focus on a cluster of UX backlog items, rather than single apps. Each design project is categorized as an A, B, or C project, depending on its reach and importance. Design projects take a more holistic view of end-user roles and processes.
- **Design project charter** The purpose of the design project charter is to gain a common understanding of the functional scope, user research needs, interaction design needs, project budget, and staffing.
- **Design project team** The design project team consists of members from the product area (PO, PM, UX advocate, user assistance developer, etc.) and from application design teams (application designer, design lead/hub lead, and user researcher). The members of the project team can vary depending on the design project category.
- **UX quality check**
  All design projects are subject to a mandatory design review, known as a design gate (or D-Gate). Members of the application design teams are responsible for carrying out the D-Gates.

## Process Overview

The DLD process involves the following main steps:

1. A design project is planned and categorized as an A, B, or C project.
2. Fill out the project charter and request the mandatory Design Project Charter Meeting ([see details](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/sap-products/sap-s/4hana-only/dld-in-s4-hana-icd-and-dsc#projectcharter)).
3. As soon as your design project is fully staffed and ready to start, continue with [Discover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/sap-products/sap-s/4hana-only/dld-in-s4-hana-icd-and-dsc#discover) / [Design](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/sap-products/sap-s/4hana-only/dld-in-s4-hana-icd-and-dsc#design) / [Implement](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/sap-products/sap-s/4hana-only/dld-in-s4-hana-icd-and-dsc#implement) phases.
4. Request the mandatory D-Gate ([see details](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/sap-products/sap-s/4hana-only/dld-in-s4-hana-icd-and-dsc#implement)).
5. Implement any necessary changes.
6. Ready for delivery! (responsible application UX sets “sign-off” flag in OAM).

## Planning, Project Setup, and Commitment

During the planning and setup phase, design projects are identified and categorized. Every design project creates a design project charter and agrees on it during the **Design Project Charter Meeting**.

### Design Project

Default (col-1)

After the regular portfolio and release planning meetings, all UX-related backlog items are grouped into coherent
design projects. Items can be clustered based on affected end user roles, along end-to-end processes, or by
functional area (for smaller renovation topics or app improvements).
Every design project identified needs to be categorized as an A, B, or C project.
#### A-projects
If one or more of the criteria below apply, the project is a potential candidate for category A.
The solution/functionality:
- Will be used by multiple roles or many end-users
- Is the primary solution for at least one role (“8h usage”)
- Addresses complex functionality to realize a key business process not yet supported
- Is often mentioned in sales pitches (“lighthouse app”)
- Is a critical differentiator in the market
- Is intended to replace a solution that important customers complain about
- Constitutes a unique selling point
#### C-projects
If one or more of the criteria below apply, the project is a potential candidate for category C.
The solution/functionality:
- Is seldom used by only a small number of end users
- Is used to configure the SAP product
- Is a minor enhancement to an existing app that does not substantially change the end user flow
- Is very similar to an existing app or function with only minor differences.
#### B-Projects
Projects that don’t fall under A or C are handled as B-Projects.
The category of a design project mainly affects the staffing of UX personal and the time and effort for user
research. A design project with category A is supposed to do extensive user research and will be assigned an
application designer, a user researcher (if resources permit) and a personal contact in SAP UX Design to address
directly any emerging new design patterns or guideline conflicts. In contrast, a design project with category C is
unlikely to do extensive research. The design project charter caters for these differences.

> **Information:** There are **certain exceptions** for specific types of technologies with regard to the DLD setup. For example, apps based
on Job Scheduling or Application Log Framework don’t need to be part of a design project. To see the full list of
exceptions, please consult [this wiki](https://wiki.wdf.sap.corp/wiki/display/fiorisuite/How\+to\+Request\+Fiori\+IDs).

> **Information:** The responsibility for grouping UX-related backlog items into design projects is with the design lead (hub lead) and
the product owner responsible for release planning (for example CPO in DSC, PM in S/4HANA, etc.).

Section Metadata

style

### Project Charter and Design Project Charter Meeting

Default (col-1)

As soon as your design project is defined and categorized, create a new issue with the type “DLD Design Project” in the Jira project [DLDUXPLAN](https://sapjira.wdf.sap.corp/projects/DLDUXPLAN/), representing the project charter. Follow the detailed [how-to guide](https://sap.sharepoint.com/teams/DLDRepository/SitePages/How-to-use-Jira-to-manage-your-Design-Project.aspx). In the **Design Project Charter Meeting**,the project charter is signed off by application UX, product management, and the product owner. A UX coach will schedule the meeting and participate to ensure consistent quality across the project charters. To request a meeting, set the corresponding status for the DLD Design Project in Jira.
To prepare for the meeting, we recommend:
- Collecting and reviewing all available design artifacts up front (persona, use cases, user stories, and so on)
- Gathering as much information as possible about the project in order to agree on the necessary user research investment
As soon as all stakeholders have agreed on the project charter, and the design project is staffed, you can start with the discovery phase and request a Fiori ID (if needed). Before you request a Fiori ID, create an entry in the [Fiori App portfolio](https://wiki.wdf.sap.corp/wiki/display/fiorisuite/Fiori\+App\+Portfolio) to register your app. Follow the [guidance](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?pageId=1588149430) provided in the wiki. After registering your app, use the email template provided in the [DLD repository](https://sap.sharepoint.com/teams/DLDRepository/Shared%20Documents/Forms/AllItems.aspx?sortField=LinkFilename\&isAscending=true\&viewid=e0295382%2D031d%2D4c98%2D8766%2Da14c60d1c23f\&id=%2Fteams%2FDLDRepository%2FShared%20Documents%2FGeneral) to request a Fiori ID.

> **Information:** The responsibility for filling out and signing the project charter is with the project team that will later execute
project (designer, UX advocate, product owner, etc.).

Section Metadata

style

## Explore

As described in the general [Design-Led Development Process](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/design-led-development-process/) article, this phase focuses on understanding business challenges and exploring innovation opportunities. These activities are part of the product roadmap definition. In order to closely collaborate with customers in this phase, EMMI (Exploratory Multidisciplinary Method for Innovation) provides a proven methodology. Usually, the explore phase is only relevant for [A-projects](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-products/sap-s/4hana-only/dld-in-s4-hana-icd-and-dsc#aprojects).

## Discover

Default (col-1)

As described in the general [Design-Led Development Process](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/design-led-development-process/) article, this phase is all about understanding the customer and their end
users’ needs. Document the insights you gained and use them in the design phase. This is extremely important to ensure a high-quality user experience. Your product and your end users will benefit hugely from the effort you invest at the beginning
of your project.
#### Research Checklist
As soon as the team has a a coherent, documented, and up-to-date understanding of the end users and their context, your research has been successful and you can start the project. The proof point for this understanding is your ability to give
documented answers to the following questions:
- What are the tasks and working context of the users? (Which steps does the user have to perform in what sequence? What does the data flow look like? What is the working environment like?)
- What pain points do the users have?
- How do your end users interact with other users?
- What quality goals and deadlines do users have to meet? When are they satisfied with the outcome?
Your knowledge has to be based on direct contact with end users. Several customer contacts for different industries and/or countries increase the data quality significantly.
For documentation purposes, we recommend using [best practice templates](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/design-led-development-process/#discover) for personas, use case diagrams, user stories, and so on.
Consider the following additional questions during your research:
- Are there ideas on how to integrate innovative solutions for this role (such as AI, ML, or the Situation Handling framework)?
- Do you know of any functional gaps?
- Are there any interaction breaks within the app or process?
- Do you know the corresponding E2E process, and how your end users are involved in it?
- Are you aligning with other teams working on this role?

> **Information:** Take a look at our [user research method cards](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/resources/user-research/user-research-method-cards) to find the best method for your user research activities.
For more information on user research, see:
- [User Research @ SAP](https://workzone.one.int.sap/site#workzone-home&/groups/e1EUcS7E0zeUtq71pDkON9/overview_page/W5GcUMaHhznjKlDm72mPuI)
(SAP Work Zone)
- [User Research-Led Design](https://workzone.one.int.sap/site#workzone-home&/groups/XwLuhINmdioVQmUpfumi4X/overview_page/ZCG8hmpNCmnNJ9WnjxTIxD)
(SAP Work Zone)

Section Metadata

style

Columns

### Step 1
**Prepare**
Collect any existing material available (personas, use cases, previous user research reports, and so on). This will help you to find out which questions from the [research checklist](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-products/sap-s/4hana-only/dld-in-s4-hana-icd-and-dsc#research-checklist) you can answer and which need more user research.
different customers. Make sure to plan and organize well
ahead.
Common methods for conducting research in the “Discover”
phase are observations of the user workflows at their
workplaces, contextual or remote user interviews to
uncover any unknown end user needs and pain points,
and/or workshops.
In the current situation, where no customer-facing events
are possible, Mural can be a helpful tool to support
interviews and/or workshops. If you lack access to end
users, consider using the recruiting tool Respondent.io,
if applicable in your area.

Columns

### Step 3
**Understand**
Document your insights using best practice documents, such as persona, use case diagram, or other templates, depending on your needs (find all templates [here](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/design-led-development-process/#discover)). Store those documents in the [Role Repository](https://sap.sharepoint.com/sites/117628/Shared%20Documents/Forms/AllItems.aspx?csf=1\&web=1\&e=SIjJNP\&cid=d3a9f7d6%2D58dd%2D45d4%2D8827%2D351d8d58f2cc\&RootFolder=%2Fsites%2F117628%2FShared%20Documents%2FSAP%20UX%20Design%2FRole%20Repository\&FolderCTID=0x0120001A902A343C6EA34A9CAA8209F64F49CA). All existing role documents from BUILD are going to be exported to this repository

With this knowledge base, you are well-prepared for the design phase. If you believe that user research is not being conducted to the extent it should be in your project, address this to your assigned designer or design lead.

## Design

Default (col-1)

The goal of the design phase is to produce an initial design based on the findings from the discovery phase. For best practices and templates, see the general [Design-Led Development Process](https://main--builder-prospect--sapudex.hlx.page/internal/fiori-design-web/design-led-development-process/) article. Make sure that your designs are aligned with the SAP Fiori design guidelines and the product consistency rules.
To facilitate collaboration with Fiori design concepts team, SAP UX offers support via the [SAP Fiori Design Community](https://workzone.one.int.sap/site#workzone-home&/groups/4nHIPjvAMWYhZrTqKELfT3/overview_page/0BKXhLl6rmiS17pNtahizh), as well as consultation hours for design projects.

> **Information:** There is no D-Gate 1 any more. The project teams are responsible for delivering apps that are compliant with the SAP
Fiori design guidelines. Additional UI or mockup reviews can be set up individually as needed.

Section Metadata

style

## Implement

Default (col-1)

The goal of the develop phase is to implement the design and create a desirable product. A design project can include
the implementation/extension of one or more apps.
In this phase, we conduct a **mandatory D-Gate** for the **design project** to ensure compliance with the SAP Fiori
design guidelines and UX product consistency standard. The major part of the review is a product demo by the product
owner or substitute from the development team.

> **Information:** If you are using SAP Fiori Elements and realize that you need a breakout to implement the desired app behavior, please reach out to the Fiori elements colleagues before you start implementing the breakout. Sometimes there are alternatives, or your requirement may
even become part of the standard template. Go to this [wiki page](https://wiki.wdf.sap.corp/wiki/display/fioritech/Fiori\+elements\+V2\+Breakout\+Analysis) and enter your breakout use case. The colleagues will get back to you.

Section Metadata

style

### Flow of the Development Phase

Columns

### Step 1
**Deliver**
Complete the implementation of your design project. If
you use SAP Fiori elements, check out the info box above.

Columns

### Step 3
**Request D-Gate**
First, check if the [DLD repository](https://sap.sharepoint.com/:f:/r/teams/DLDRepository/Shared%20Documents/General/document%20templates/organize%20D-Gates?csf=1\&web=1\&e=Smfmep)
contains specific instructions for your design hub. If there are none, clarify with your design lead (hub lead) who is responsible for organizing the D-Gate meeting: it’s either the
person responsible for the product or the person responsible for the design (UX designer or UX advocate). Feel free to use the [templates](https://sap.sharepoint.com/:f:/r/teams/DLDRepository/Shared%20Documents/General/document%20templates/organize%20D-Gates?csf=1\&web=1\&e=Smfmep) provided to ask for a meeting via email or to create a meeting request directly. Either way, add the URL to the “demo” system you have prepared.
application designers conduct the review and give
feedback. The review results are documented during the
meeting.

Columns

### Step 5
**Decision Based on Review Results**
Depending on the outcome of the review, the reviewers set a
D-Gate status:
- **Signed Off:** No issues were identified, or any issues have been fixed.
- **Corrections Pending:** Issues were identified during
the review, but are expected to be fixed for the current
release.
- **Signed Off with Mitigation Plan:** Issues were
identified that are primarily due to current technical
limitations. In this case, backlog items must be created to
ensure the issues are resolved in upcoming releases.
- **Rejected Sign-Off:** In the unlikely event that there
is no mitigation plan in place for the identified issues,
the reviewers set the status to _Rejected Sign-Off._ In
this case, exception handling for shipment without UX
sign-off is with the CPO.
- **Run and Scale:** During this phase we collect feedback
from end users based on real-life usage as an input for
further improvements.
## FAQ

### What is a design project?

After the regular portfolio and release planning meetings, all UX-related backlog items are grouped into coherent design projects. Items can be clustered based on affected end user roles, along end-to-end processes, or by functional area (for smaller renovation topics or app improvements). We recommend to consider which functionalities you would like to see together in a D-Gate later in the process.

Every design project identified needs to be categorized as an A, B, or C project. Find some guiding questions in the [Planning, Project Setup, and Commitment](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/discover/sap-products/sap-s/4hana-only/dld-in-s4-hana-icd-and-dsc#projectcharter) section.

### When do I fill out the project charter?

In general, you can fill out the project charter after the portfolio or release planning as soon as design projects are defined. Create a new issue of type DLD Design Project in the Jira project [DLDUXPLAN](https://sapjira.wdf.sap.corp/projects/DLDUXPLAN/) representing the project charter. Follow the detailed [how-to guide](https://sap.sharepoint.com/teams/DLDRepository/SitePages/How-to-use-Jira-to-manage-your-Design-Project.aspx). Be aware that projects with bigger open research questions (mainly A and sometimes also B category projects) should be considered already at least one release before planned development to allow for planning and organizing customer visits to conduct user research with end users.

### How to request a design project charter meeting?

As soon as your design project is defined and categorized, create a new issue of type DLD Design Project in the Jira project [DLDUXPLAN](https://sapjira.wdf.sap.corp/projects/DLDUXPLAN/) representing the project charter. Follow the detailed [how-to guide](https://sap.sharepoint.com/teams/DLDRepository/SitePages/How-to-use-Jira-to-manage-your-Design-Project.aspx).

To prepare for the meeting, we recommend:

- Collecting and reviewing all available design artifacts up front (persona, use cases, user stories, etc.)
- Gathering as much information as possible about the project in order to agree on the necessary user research investment.

After this preparation you can request a Design Project Charter Meeting by setting the Jira issue into the corresponding state. You will be invited to a meeting by the UX coaches.

As soon as all stakeholders have agreed on the project charter and the design project is staffed, you can start with the discovery phase and can get a Fiori ID assigned (if needed). To request a Fiori ID, use the email template also provided in the [DLD repository](https://sap.sharepoint.com/teams/DLDRepository/Shared%20Documents/Forms/AllItems.aspx?sortField=LinkFilename\&isAscending=true\&viewid=e0295382%2D031d%2D4c98%2D8766%2Da14c60d1c23f\&id=%2Fteams%2FDLDRepository%2FShared%20Documents%2FGeneral).

### How do I get a Fiori ID?

As soon as all stakeholders have agreed on the design project charter in the Design Project Charter Meeting and the design project is staffed, you can start with the discovery phase and can get one or several Fiori IDs assigned (if needed). To request a Fiori ID, use the email template also provided in the [DLD repository](https://sap.sharepoint.com/teams/DLDRepository/Shared%20Documents/Forms/AllItems.aspx?sortField=LinkFilename\&isAscending=true\&viewid=e0295382%2D031d%2D4c98%2D8766%2Da14c60d1c23f\&id=%2Fteams%2FDLDRepository%2FShared%20Documents%2FGeneral). Please also visit the wiki page “[How to request Fiori IDs](https://wiki.wdf.sap.corp/wiki/display/fiorisuite/How+to+Request+Fiori+IDs)” to get details on exceptions for certain UI technologies.

### Can I review my designs before starting implementation?

If you have just a few questions regarding applying the guidelines, reach out to the [SAP Fiori Design Community](https://workzone.one.int.sap/site#workzone-home&/groups/4nHIPjvAMWYhZrTqKELfT3/overview_page/0BKXhLl6rmiS17pNtahizh). We encourage you to also consider doing informal reviews with your peer designers and within your product areas.

### How and when do I request a mandatory D-Gate?

As the D-Gate is conducted on the implementation, it should be scheduled well before development close, so that you can adapt according to the reviewer’s feedback. To request a D-Gate, contact your design hub lead or application UX contact and provide a links to the implementation and to your project charter. The hub lead / application UX will set up a meeting accordingly. You can use the [templates](https://sap.sharepoint.com/:f:/r/teams/DLDRepository/Shared%20Documents/General/document%20templates/organize%20D-Gates?csf=1\&web=1\&e=Smfmep) provided in the DLD repository.

### For which UI technologies (e.g. reuse components) does the DLD apply?

Please find all corresponding information [here](https://wiki.wdf.sap.corp/wiki/display/fiorisuite/Design+Gates).

### What is the difference between DLD and EMMI?

EMMI provides a proven methodology for conducting category A projects within the design-led development process, putting an explicit focus on end-to-end multi-customer collaboration and a multidisciplinary project team.

---

## Learning Journey

# Learning Journey

> **Information:** This page is no longer updated. We plan to integrate this content into the [SAP Design System Academy](https://www.sap.com/design-system/fiori-design-web/sap-design-system-academy/get-started) space.

## Intro

Columns

The following learning resources are available for both new and more experienced SAP Fiori designers:
- **Knowledge sessions** and specific **guideline articles** provide a first overview of SAP Fiori for web design.
- **Knowledge chunks** dive deeper into specific SAP Fiori design topics.
- A training deck for the prototyping tool **Figma.**
- The [Related Links](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/v1-124/discover/get-started/learning-journey#related-links) section contains general UX onboarding and learning resources.
## New to SAP Fiori Design for Web?

Take a look at our onboarding assets.

Columns

### Knowledge Session \| SAP Fiori Design System                                                                                                                                                                                        | ### Knowledge Session \| SAP Fiori Design Guidelines for Web

#### Content
- Learn how SAP Fiori evolved from an escalation into the design system for SAP.
- Get a deeper understanding of the design system.
- See examples of the design system and its application.
#### Resources
[▷ Watch the recording](https://video.sap.com/media/t/1_9yqhs6ww)
[View the slide deck](https://sap.sharepoint.com/:b:/r/sites/117628/Shared%20Documents/SAP%20UX%20Design/Enablement%20Services/Fiori%20for%20Web%20Onboarding%20Sessions/Onboarding_Fiori%20Design%20System.pdf?csf=1\&web=1\&e=ELS0cX)
Last update: January 2021

Columns

### Knowledge Session \| SAP Fiori and Accessibility                                                                                                                                                                          | ### Knowledge Session \| SAP Fiori Elements for Designers

#### Content
- Get an overview of global accessibility laws and regulations.
- Learn how to consider accessibility in software design and development.
- Understand how accessibility is supported by the SAP Fiori design.
#### Resources
[▷ Watch the recording](https://video.sap.com/media/t/1_4mizndgw)
[View the slide deck](https://sap.sharepoint.com/:b:/r/sites/117628/Shared%20Documents/SAP%20UX%20Design/Enablement%20Services/Fiori%20for%20Web%20Onboarding%20Sessions/Onboarding_Accessibility.pdf?csf=1\&web=1\&e=5wZsBR)
Last update: January 2021

Columns

### Article \| Best Practices for Designing SAP Fiori Apps

#### Content
- What do you need to know when designing SAP Fiori apps?
- SAP Fiori information architecture (layouts, floorplans, UI elements)
- Overview of the most important general patterns
- How to experience SAP Fiori in action
- 3 steps towards a consistent SAP Fiori design
#### Resources
[Read the article](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/best-practices-for-designing-sap-fiori-apps)
## Deepen Your Knowledge

Get detailed information on specific topics in 30-minute online sessions.

Columns

### Knowledge Chunk \| How to Handle Dialogs                                                                                                                                                                                                                         | ### Knowledge Chunk \| Messages in SAP Fiori

#### Content
- Get to know the difference between:
- Dialog
- Popover
- Quick view
- Smart link
- Learn when to use which type of dialog
[▷ Watch the recording](https://video.sap.com/media/t/1_5830b34p/205658513)
#### Resources
[View the slide deck](https://sap.sharepoint.com/:p:/r/sites/117628/Shared%20Documents/SAP%20UX%20Design/Enablement%20Services/Fiori%20for%20Web%20Knowledge%20Chunks/Learning%20Chunk%20-%20Message%20HandlingJuly2021.pptx?d=wc8221c3b2ce1404fa747b18215d6ff6f\&csf=1\&web=1\&e=9wYN7j)
[▷ Watch the recording](https://video.sap.com/media/t/1_jhwnrqg3)
Last update: July 2021
[View the slide deck](https://sap.sharepoint.com/:p:/r/sites/117628/Shared%20Documents/SAP%20UX%20Design/Enablement%20Services/Fiori%20for%20Web%20Knowledge%20Chunks/LearningChunk_DialogsFeb2021.pptx?d=we9f5d9e1d9c240c491a04d306b23c355\&csf=1\&web=1\&e=o8z1aJ)
Last update: March 2021
## Learn Figma

The modular training deck is aimed at both beginners and advanced users of the Figma prototyping tool. It concentrates on the most important features and functions, with a focus on SAP use cases. You can use the built-in navigation to jump directly to your topic of interest, or go through the complete training deck to discover features you weren’t aware of.

[Check out the Figma Training Deck](https://www.figma.com/proto/3w4DGD2WLHcPXgjAUluYLN/Figma-Modular-Training)

---

## Product Consistency

# Product Consistency

## Intro

The SAP Fiori design guidelines define universal rules for the SAP Fiori design language, ensuring a minimum level of consistency across all products.

Depending on your product, you may also need to follow additional guidelines that detail out how SAP Fiori is being applied in your solution space. This page contains product-specific guidelines that apply on top of the general SAP Fiori design guidelines.

## Application Cross-Consistency for S/4HANA

:download-blue:
[Download S/4HANA Cross-Consistency Rules (PDF)](https://experience.sap.com/wp-content/uploads/sites/56/2017/11/S4HANA_Cross_Consistency_V1.5.pdf)
Last Updated: November 8, 2018 (v.1.5)

> **Hint:** SAP Fiori Elements Coding Guide for Development:
<https://wiki.wdf.sap.corp/wiki/display/SFCCockpit/CC+Rules+Coding+Guide+for+Fiori+Elements>

### Scope

The initial rule set covers \~35 issues. To maximize the benefits of harmonization, we focused on:

- Key **floorplans / SAP Fiori elements** (object page, list report, analytical list page, overview page)
- Important **cross-topics** that impact a large number of users (such as table settings or messaging)

### Explanation
The consistency rules explain how to handle each issue,
and indicate the development effort involved.
In some cases, the rules just reiterate existing rules in
the SAP Fiori design guidelines. In other cases, they
offer more specific guidance for S/4HANA.
### Download

All the rules are available in a single PDF document. You will always find the latest rules in the download box at the top of this page.

> **Information:** When designing and developing S/4HANA apps, always make sure you are working with the latest version of the
consistency rules.

### Applying the Rules

#### New apps

S/4HANA developers and UX designers must take the consistency rules into account for all new app development starting from release **1802**.

**What about existing apps?**

An ongoing effort to apply the consistency rules to existing apps is expected.

**When should I start?**

LoBs should start investing in the corresponding areas to achieve a consistent user experience in 1802 and future releases.

### New Rules

Improving cross consistency in S4/HANA is a continuous effort, and we are already working on additional rules. If you see consistency issues and have proposals for additional rules, please contact [Kerstin Blum](mailto:kerstin.blum@sap.com).

---

## S4Hana Product Home Page My Home

# SAP S/4HANA Product Home Page – My Home
#### SAP S/4HANA Cloud

## Intro

The SAP S/4HANA product home page is an alternative to the SAP Fiori launchpad [My Home](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-my-home) page when using SAP S/4HANA Cloud. The previously available SAP Fiori launchpad My Home page is the entry point to a personalized set of apps, presented as tiles or links, whereas the SAP S/4HANA product home page orchestrates much more information.

The new product home page is the entry point to **apps**, and also offers:

1. Access to **tasks** and **situations**
2. **News** feed
3. Quick navigation to **pages**
4. Analytical **insights**
5. SAP **Business AI** recommendations

Additionally, users benefit from enhanced personalization features for content and layout.

> **Information:** The term “My Home” alone is ambiguous. It can mean either the **SAP S/4HANA product home page** described in this article, which displays _My Home_ on its interface, or the **SAP Fiori launchpad** _My Home_. To prevent misunderstanding, specify which meaning you intend and ask others to do the same.

The SAP S/4HANA product home page is based on launchpad [spaces](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces) and runs best with the [Horizon theme](https://www.sap.com/design-system/fiori-design-web/foundations/visual/theming), although it supports other SAP and custom themes. The SAP S/4HANA product home page must be activated by a key user.

## Components

The SAP S/4HANA _My Home_ page is the leftmost option in the top-level [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/) navigation and provides the following sections:

1. [To Dos](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#to-dos) show tasks and situations.
2. [News](https://sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#news) shows new features, and changes from the latest release.
3. [Pages](https://sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#pages) show a maximum of 8 pages displayed as tiles.
4. [Apps](https://sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#apps) show the user’s favorite apps, most used apps, recently used apps, and apps recommended by SAP Business AI.
5. [Insights Tiles](https://sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#insights-tiles) show tiles with analytical information.
6. [Insights Cards](https://sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#insights-cards) show cards from overview pages and list report-based apps.

The **section menu (7)** can be triggered from the arrow next to a section title and shows actions for the section.

In [My Home Settings](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#my-home-settings)_,_ users can define the **layout** and **visibility** of the individual sections to personalize the _My Home_ page.

### To Dos

1. The **To Dos section**  includes tabs for **workflow tasks** from the  _My Inbox_  app and **situations** from the  _My Situations_ app.
2. A **counter**  next to each tab indicates the number of open tasks and situations.
3. [Cards](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/), displayed in a row, present the tasks or situations in the tab:
   - **Task cards** contain a title, priority, creator name, and attributes according to the task type. The footer displays card actions.
   - **Situation cards** contain a title, body text, and a time stamp.
4. The **priority** of the cards determines their order in the row, from high to low.
5. The **[Show More button](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#showing-more-or-less-section-content)** is displayed if not all tasks and situations can be displayed. The number of cards shown depends on the user’s screen resolution.
6. The **Refresh button** displays the time stamp of the last refresh.

> **Information:** If the _My Inbox_ and _My Situations_ apps are not assigned to the user, the _To Dos_ section is not available. If only one of the apps is assigned, the corresponding tab is shown.

### News

1. The **News section** shows a **news tile** with either RASD-based information feed or an RSS feed. Only news feed from one line of business (LOB) can be displayed on a news tile at a time.
2. A **carousel** lets users switch among previews for the LOB-specific news threads.

In the _[Personalize News](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-news)_ section of My Home Settings, users can personalize their news feed by choosing an LOB.

> **Information:** The news feed is available only if a key user has activated it.

When users click a [tile](https://www.sap.com/design-system/fiori-design-web/ui-elements/tile/) in the carousel, a summary with further information on the LOB-specific news feed opens in a [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/).

### Pages

1. The **Pages section** shows a **maximum of 8** favorite pages.
2. **Tiles** represent the favorite pages.

In the [Personalize Pages](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-pages) section of _My Home Settings_, users can control the pages to show or hide in the Pages section.

> **Information:** Key users can assign custom colors and icons to the pages.

### Apps

The _Apps_ section includes:

1. **Favorite** apps, users can apps to their _Favorites_ directly from the _Most Used_, _Recently Used_, or _Recommended_ tab. They can also change the icon for the favorite app or remove it from _Favorites_. See [Personalizing the Apps Section](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalizing-the-apps-section).
2. **Most Used** apps
3. **Recently Used** apps
4. **Recommended** apps, the apps recommended by the **SAP Business AI** based on the user's business role. Users can hide the tab from _My Home_ in the advanced section (under recommendations) of the _Settings_ dialog.
5. The **Add Apps** action opens the [app finder](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder), where users can add apps to their _Favorites_.
6. The **Import Apps Now** action imports personalization content, for example, personalized groups from the classic Home page.
7. **App groups** are displayed as a colored folder that contains the apps that the user has added to the group.
8. **An app** is displayed with a colored icon that matches the app title.
9. A **deprecated badge** next to outdated apps that will be removed in a future release.

> **Information:** Most used and recently used apps are shown only if the user allows app tracking in the _Settings_ dialog.
The _Most Used_ tab displays the apps used in the last 30 days, in the order of the most to least used. _Recently Used_ displays up to 30 activities, in the order of the most to least recently used.

### Insights Tiles

1. The **Insights Tiles section** contains [tiles](https://www.sap.com/design-system/fiori-design-web/ui-elements/tile/) with analytical information, such as **charts** or **KPI's**. The section header includes a counter that shows the number of tiles in the section.  All tiles are displayed in one row.
2. **Add Tiles** opens the [app finder](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder) where users can search and add tiles. They can also add tiles from their favorite apps.
3. The **[Show More button](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#showing-more-or-less-section-content)** is displayed if not all tiles can be displayed the one row. The number of displayed tiles depends on the screen resolution.

Further personalization of tiles is possible. See [Personalize Insights Tiles](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-insights-tiles).

### Insights Cards

The _Insights Cards_ section header includes a counter that shows the number of available cards. The section contains:

1. A **maximum of 10** [cards](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/) from overview pages and list report-based applications
2. An **overflow menu** for each card
3. **Card-specific actions**
4. The **[Show More button](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#showing-more-or-less-section-content)** is displayed if not all cards can be displayed in one row. The number of displayed cards depends on the screen resolution.

Further personalization of cards is possible. See [Personalize Insights Cards.](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-insights-cards)

## Behavior and Interaction

Users can personalize the SAP S/4HANA My Home page according to their needs. In the Apps section on My Home, users can add and import apps to their Favorites, and personalize their favorite apps with colors and icons.

All other personalization options are available in the **respective** _My Home_ **sections** or via _My Home Settings_ in the **[user actions menu](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad#user-actions-menu)**.

### Showing More or Less Section Content

The _Show More_ button is displayed at the top right of the _To Dos_, _Insights Tiles_, and _Insights Cards_ sections when the section includes more content than can be displayed in one row.

On selection, it:

- Displays all the section content
- Hides the other _My Home_ sections
- Changes the button's action to 
If needed, scrolling within the show more view is possible.

When users select the _Show Less_ button, it:

- Displays the section content in one row. The number of tiles or cards displayed depends on the screen resolution.
- Displays the other _My Home_ sections
- Changes the button's action to 
### Personalizing the Apps Section

Users can **add** and **[import](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#apps)** apps.

#### Adding Apps to Favorites

Users can add apps to their _Favorites_ both from:

- The _My Home_ page
- An app overflow menu

From the _My Home_ page, users can select the _Add Apps_ button to open the [app finder](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder), where they can search for apps and add them to the _My Home_ page, with the _Add_ button.

From the Most Used, Recently Used and Recommended tabs, users can open the overflow menu and select the Add to Favorites action.

From the Most Used, Recently Used and Recommended tabs, users can open the overflow menu and select the Add to Favorites action.

### Personalizing Favorites

In the _Favorites_ tab, from the overflow menu for an app, users can change the app's color, move it to an app group, or remove it from 
#### Creating App Groups

Users can create app groups:

- From the overflow menu for an app
- From the menu for the _Apps_ section
- By dragging and dropping an app onto another

From the app group folder overflow menu, they can:

- Change the name and color of the folder
- Remove all apps from the folder
- Delete the folder

#### Acting on Recommended Apps

The _Recommended_ tab is active by default at first login. In it, the user sees applications recommended by **SAP Business AI** based on the user's business role.

1. An **information message strip** at the top of the tab advises users that in the _Settings_ dialog, they can hide the _Recommended_ tab, and it contains a link to the dialog.
2. In the **overflow menu**, the user can do one of the following to the recommended app:

- Add it to _Favorites_ tab. This also removes it from the _Recommended_ tab.
- Remove it from the _Recommended_ tab, by declining the recommendation with the _Not Relevant_ menu item.

> **Information:** The default app colors correspond to the colors of the [page tiles](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#pages).

#### Personalizing Other Sections

For other sections, such as News, Pages, News, Insights Tiles or Cards, personalization options are available in the:

- Corresponding section menu, via the _My Home Settings_ item, users can change the settings from within the context of the section.
- **[User actions menu](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad#user-actions-menu)**, via the _My Home Settings_ item, users can change all settings for the _My Home_ page from one dialog.

#### My Home Settings

In _My Home Settings_, users can

1. [Personalize the layout](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-layout)
2. [Personalize News](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-news)
3. [Personalize Pages](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-pages)
4. [Personalize Insights Tiles](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-insights-tiles)
5. [Personalize Insights Cards](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#personalize-insights-cards)
6. [Change advanced settings](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home#advanced-settings)

### Personalize Layout

Users can:

1. **Enable** the visibility of sections on the _My Home_ page
2. **Disable** the visibility of sections on the _My Home_ page
3. **Change the order of the sections** by dragging and dropping them
4. **Reset** the layout to the defaults setting defined by the key user

### Personalize News

Users can:

1. **Personalize** their news feed by choosing one or more lines of business
2. **Display all** **action items** that require preparation in the news feed

### Personalize Pages

Users can:

1. **Search** for specific spaces and pages
2. **Select up to 8 pages** to show on 
### Personalize Insights Tiles

Users can:

1. **Search** for specific tiles
2. **Change the order** of tiles by dragging and dropping them
3. **Remove** tiles
4. **Set the size** of _smart business tiles:_ Activating _Wide_ displays larger tiles, deactivating it displays smaller ones.

### Personalize Insights Cards

Users can:

1. **Refresh** cards
2. **Show only visible cards** in the _Insights Cards_ section of the _My Home Settings_ dialog
3. **Search** for specific cards
4. **Enable the visibility of up to 10** cards on the _My Home_ page
5. **Change the order** of cards by dragging and dropping them
6. **Preview** cards in a popover

In the Card details view, users can:

1. Delete the card.
2. Copy an existing card and customize it to create a new one.

In the copy of a card, users can change the title, subtitle, and modify the filters. Then, to see the impact of the changes, they can refresh the Preview of the card.

In the copy of a card, users can change the title, subtitle, and modify the filters. Then, to see the impact of the changes, they can refresh the Preview of the card.

#### Advanced Settings

Users can:

1. **Export** sections to a file
2. **Enable or disable** the SAP Business AI recommendations that show in the _Recommendations_ tab in _Apps_ section.
3. **Import** sections or content from file
4. **Reset all changes** to the default setting that the key user defined 
+-------------x-------------+
**Carousel (full-width)**

\---

## Responsiveness

The SAP S/4HANA _My Home_ page is responsive and can be used on tablets and phones.

---

## Sap S4Hana Design Decisions

# SAP S/4HANA Design Decisions

## Intro

Contains design decisions for SAP S/4HANA. If needed, the respective guideline articles introduce the decisions with **SAP S/4HANA Only**.

## General Patterns

Table

Date   | Pattern   | Decision                                                                                                                                                                                                                                            | Links

9/2022 | Mass edit | For mass edit, use the [Smart Multi Edit Container](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.ui.comp.smartmultiedit.Container) (SAPUI5 samples). It supports previously entered values, recommendations, and recent values. | [Mass Edit](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/mass-editing)

## UI Elements

Table

Date    | UI Element  | Decision                   | Links

04/2023 | Smart table | Tooltips are available by  | - Smart table: [Column Headers](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/smart-table/#column-headers)
| default in column headers. | - [Using Tooltips](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/best-practices/ui-elements/using-tooltips)
|                            | - [Wrapping and Truncating Texts](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/wrapping-and-truncating-text)

---

## Overview In A Situations App

# Overview in a Situations App

## Intro

The Situations app displays all situations in a user’s area of responsibility.

There are two versions of the app:

- [My Situations – Extended](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/5137227e8fce4240830d20a875b99704.html?locale=en-US) comes with the [extended framework for Situation Handling](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/92a58a164a4c4320bd6bf563d745baca.html) and is the reference app for UX design.
- [My Situations](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/67439c313b834f7ca2048da985824faa.html) comes with the [standard framework for Situation Handling](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/19460b5cabb746b0b5198fc82f14335a.html?locale=en-US) and is a simplified version that contains only a work list.

## Situations Tile

Columns

The situations tile on SAP Fiori launchpad features the number of situations.
The tile includes the following components:
- App title
- Situation indicator
- Number of situations
### Control
The control is based on a standard [SAP Fiori launchpad tile](https://www.sap.com/design-system/fiori-design-web/ui-elements/tile/).
### Interaction and Behavior
Selecting the tile opens the Situations app.
## List View of Situations App

When users open the Situations app, they can see all the situations in their area of responsibility.

The list view is based on a flexible column layout and contains the following components:

- Scenario pane **(6)**
  - Search field **(1)** for situation scenarios
  - Navigation pane that lets you select all situation scenarios **(2)** or a specific [situation scenario](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/f9aa0506e594401a8202cad1302850e5.html) **(3)**
- Situation pane **(7)**
  - Smart filter bar **(4)** with a _Search_ field for situation instances
  - List view of the situations **(5)**, including their statuses and contextual information

### Interaction and Behavior

The layout differs depending on the scenario selected in the navigation pane:

- When the user opens the app, all situation scenarios are selected and all situations in their area of responsibility are displayed. The smart filter bar contains standard filters.
- When the user selects a specific scenario, the layout changes and only situations related to this scenario are displayed. Additionally, the smart filter bar and the contextual information change, depending on the configuration.

All [custom layouts for the My Situations – Extended](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/71557c869a5643c48492d10c2a1cff56.html?locale=en-US) app are configured in the _Manage Situation Scenarios_ app.

#### No Situation Exists

If there are no situations in the user’s area of responsibility, the generic view is displayed with zero situations and the generic information, “_You don’t have any situations that match your search criteria._“

#### Situations in Aggregated Notification

When users navigate from an aggregated notification that refers to multiple situations, they go to a dedicated page that lists these situations.

The title of the page is _Open Situations in Notification._ The list view is the same as the scenario-specific view. It filters for the situations mentioned in the notification. The page does not contain search and filter options.

##### Interaction and Behavior

Users can open this page only if they click an aggregated notification. The list view is a subset of all situations referring to a scenario, filtered by the items that are mentioned in the notification. The list view supports the same interaction as the scenario-specific list view, but without search or filter options.

The header also contains breadcrumb navigation to the generic list view of the [My Situations – Extended](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/5137227e8fce4240830d20a875b99704.html?locale=en-US) app or the scenario-specific view relating to the situations in the list.

## Scenario Pane

Columns

The scenario pane consists of a search field and a
navigation pane.

### Search
The search field applies to the scenarios in the
navigation pane. Users can search for scenarios by
entering text in the search field.
### Navigation Pane
The navigation pane displays all the situation scenarios
for which situations exist. It shows the scenario name
and the number of situations that relate to the scenario.
#### Interaction and Behavior
Selecting a scenario in the navigation pane displays only
the situations in the list pane that relate to the
scenario.
If the last situation related to a scenario is closed,
the scenario disappears from the navigation pane. If no
situation exists, the navigation pane is empty.
## Situation Pane

The situation pane consists of a smart filter bar and a list view that shows the situations.

### Smart Filter Bar

When users open the app, the smart filter bar contains a search field and standard filters:
- Status: The status of a situation is either _open_ or in _progress_.
- Created At: With a [Dynamic Date Range](https://www.sap.com/design-system/fiori-design-web/ui-elements/dynamic-date-range-2/) dialogue, users select a specific date or period
- Scenario: With the dropdown, users select one or more scenarios
The filter bar also contains the standard actions _Go_ and _Adapt Filters_.
#### Interaction and Behavior
When you select a specific scenario, the content of the smart filter bar changes. The filter bar shows the search field, a standard filter _Status_, and [custom filters](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/71557c869a5643c48492d10c2a1cff56.html?locale=en-US) that are defined in the _Manage Situation Scenarios_ app.
### List View

The list view consists of the list header and list items.
##### Header
The list view header has the default title _Situations_ followed by the number of situations in parentheses. In addition to the standard actions _Refresh_, _Group_, and _Settings_ the action _Close Situation_ is shown.
##### Line Items
The line items in the list view have multiple columns:
- [Situation description](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-description-s): summary of the situation
- Status: situation status
- Processor: name of the processor if the situation status is _in progress_
- Scenario: name of the scenario to which the situation belongs
- Key Information: a dynamic column with [custom data](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/71557c869a5643c48492d10c2a1cff56.html?locale=en-US) providing contextual information that is configured in the _Manage Situation Scenarios_
- Forward navigation: opens the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-detail-view-l)
**Interaction and Behavior**
When the Situations app is opened, the initial focus is on the first line item in both the navigation pane and in the list view.
When the user selects a specific scenario in the navigation pane, the _Key Information_ column is replaced with [custom columns](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/5137227e8fce4240830d20a875b99704.html?locale=en-US).
Selecting a situation item takes the user to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-detail-view-l).
- The [My Situations – Extended](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/5137227e8fce4240830d20a875b99704.html?locale=en-US) app opens the situation page
- The [My Situations](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/67439c313b834f7ca2048da985824faa.html?locale=en-US) app opens an object page with a situation section in the corresponding business app.

---

## Situation Detail View

# Situation Detail View

## Intro

The situation details view displays the situation with contextual information from the time the situation was created, so that users understand the circumstances that triggered the situation.

The situation details view contains the following sections:

- Situation description
- Contextual information/Situation details
- Actions to solve the situation, if applicable

There are two versions of the situation detail view:

- [Situation page](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#situation-page): The situation page is part of the [My Situations – Extended](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/5137227e8fce4240830d20a875b99704.html?locale=en-US) app and available with the [extended framework for Situation Handling](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/92a58a164a4c4320bd6bf563d745baca.html?locale=en-US).
- [Situation section in a business app](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#situation-section-in-a-business-app): The situation details are embedded in the object page in a business app and available with the [standard framework for Situation Handling](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/19460b5cabb746b0b5198fc82f14335a.html?locale=en-US).

## Situation Page

The situation page displays the situation with contextual information from the time the situation was created so users understand the circumstances that triggered the situation.

The situation page is based on an object page layout and contains the following sections:

- Header: The header is based on a default layout and contains the summary of the situation and standard actions.
- Contextual information/Situation details: This section contains [custom information](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/71557c869a5643c48492d10c2a1cff56.html?locale=en-US).
- Actions: This section contains [solution proposals](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#solution-proposals) and navigation to related business apps, depending on the configuration.

Columns

1. **Situation description**
2. **Navigation bar**
3. **Situation details**
4. **Solution proposals**
5. **Navigation to related business apps**
6. **Status**
### Behavior and Interaction

When the situation page is opened, the initial focus is on the first section.

### Components

#### Header

Columns

The header of the situation page contains the following components:
- [Situation description](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-description-s)
- Status: The status of the situation which is either _open_ or _in progress_
- Processor: The name of the person assigned to the situation if the status is _in progress_
- Actions: _Close Situation_ and _Assign to Me_
##### Behavior and Interaction

Columns

The _Close Situation_ action opens the _Situation Close_ dialog where users can close a situation manually.
Columns

With the _Assign to Me_ action, users can assign the situation to themselves.

Columns

The status changes to _In Progress_ and the user’s name is shown as the processor.
The name of the button changes to _Unassign_.

Columns

Selecting _Unassign_ resets the situation to the status
“open” and removes the processor label and name. The
button name changes back to _Assign to Me_.

#### Situation Details

Situation details help users make educated decisions when solving situations. It is entirely based on the [custom layout](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/71557c869a5643c48492d10c2a1cff56.html?locale=en-US). Depending on the configuration, it contains contextual information from the affected business object and data from the object that triggered the situation.

#### Actions

The situation page can contain the [action](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/f88ebd535c0348219bb1889b2d241602.html) types described below:

- [Solution Proposals](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#solution-proposals)
- [Navigation to Related Apps](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view?external#navigation-to-related-apps)

Both are configured in the [Situation Type](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/45d60edcf02d409c87076f9270372eb8.html?locale=en-US).

##### Solution Proposals

Columns

Solution proposals are quick actions that resolve a
situation and remove it so the situation is no longer
displayed.
Columns

**Interaction and Behavior**
The tab _Solution Proposal/Common Action_ is only visible if an action that closes a situation is configured.
Selecting a simple solution proposal opens a [confirmation message](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/#confirmation-message).
Columns

Confirming the proposal, for instance, _Cancel Order_, closes the situation and takes the users back to the list view where a success message toast is shown.
The corresponding list item is removed and the number of situations in the list is reduced by one.
For a complex solution proposal, users can also use a [value help dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/value-help-dialog/) for selecting the appropriate parameters before confirming the proposal.
##### Navigation to Related Apps

These actions navigate to the business apps that support users in solving a situation.

**Behavior and Interaction**

The tab _Related Apps_ is only displayed if an action that navigates to a business app is configured.

Selecting a related app navigates to the corresponding business app or to a specific object page, depending on the [configuration](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/d973eb6d464d4dce84f354b9668ef43c.html?locale=en-US). The status of the situation remains unchanged.

## Situation Section in a Business App

The situation section displays the situation with contextual information from when the situation was created, so that users understand the circumstances that triggered the situation. The situation section is displayed as the first section in the object page of a business app and contains the following subsections:

- Situation: the tab contains the [situation message strip](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-message-strip).
- Related information (optional): the tab contains contextual information that supports users in solving a situation, and a quick action that closes a situation.

Additionally, the title of the object page header is followed by an [interactive situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#switch-for-interactive-situation-indicator).

Columns

1. **Situation indicator**
2. **Situation tab in navigator bar**
3. **Situation message strip**
4. **Situation details**
5. **Situation proposals**
### Behavior and Interaction

When the object page of a business app is opened, it shows the [interactive situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#switch-for-interactive-situation-indicator). in the header.

When the users select the indicator, the [situation preview](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/situation-handling-framework-ui-text-guidelines#situation-preview-m) opens.

Choosing _Show Details_ unhides the situation section. If users navigate from a situation preview outside the object page, for example, from the [My Situations](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/67439c313b834f7ca2048da985824faa.html?locale=en-US) app, or from a [notification](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-notification), the situation section is displayed and the focus is on it.

---

## Situation Handling Controls

# Situation Handling Controls

## Intro

Situation Handling comes with multiple controls for the UX pattern of progressive disclosure that improves usability by delivering users information and capabilities gradually: Initially, users see the minimal display for a situation. They can seek additional levels of detail about it, according to their needs and goals.

The controls are displayed in multiple places in the SAP Fiori UI.

They are:

- Situation indicator (XS)
- Situation description (S)
- Situation preview (M)
- Situation detail view (L)

Additionally, a standard dialog for **closing a situation** manually is part of various situation components.

## Situation Indicator (XS)

The situation indicator illustrates that a business object is affected by a situation. It is the smallest control for flagging an issue.

Two types of situation indicator exist:

- [Situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-indicator)
- [Interactive situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#interactive-situation-indicator)

### Situation Indicator

Default (col-1)

The situation indicator consists of an icon that represents a business situation.

#### Control

A situation corresponds to a warning so the general warning icon is used.

Table (col-1)

Control            | Icon             | State

sap.m.ObjectStatus | sap-icon://alert | Warning

Default (col-2)

Section Metadata

style

### Usage

Default (col-1)

The situation indicator is displayed in front of a situation title in controls such as the [situation description](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-description-s), the [situation preview](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-preview-m), or the [situation page](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#situation-page).

Carousel (full-width, col-2)

Section Metadata

style

### Interactive Situation Indicator

Default (col-1)

The interactive situation indicator is shown with the affected business object and acts as a button that allows users
to see additional details, according to the principle of progressive disclosure.

Default (col-1)

#### Control

A situation icon indicates a single situation.

A situation icon is followed by a number indicating multiple situations.

Table (col-1)

Control      | Icon             | Type

sap.m.Button | sap-icon://alert | Attention

Default (col-2)

Section Metadata

style

Columns

#### Usage
Use the interactive indicator to mark a business object
that is affected by a situation. It is displayed after
the object name. You use it for list items and object
page headers in business app. You can also use it as
standalone icon in a list column so users can to filter
for items affected by a situation.
#### Interaction and Behavior
The behavior of the interactive situation indicator
differs depending on if there is one or more situations.
##### Single Situation

Default (col-1)

When users hover over an interactive situation indicator, a tooltip displays the generic text: _There is one situation for this item_.
When they select an indicator, a popover displays a [situation preview](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-preview-m).
It contains the [situation description](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-description-s) and the _Show Details_ button that takes users to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-detail-view-l).

Carousel (full-width, col-2)

Section Metadata

style

##### Multiple Situations

Default (col-1)

When users hover over an interactive situation indicator for multiple situations, a tooltip displays a generic text that includes the number of situations for the object, for example: _There are 3 situations for this item_.
When users select an interactive situation indicator, a popover is displayed with the [situation switch](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-switch).
They can select a situation from the list to open a [situation preview](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-preview-m) that provides further details about the situation.
The _Show Details_ button takes them to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-detail-view-l).

Carousel (full-width, col-2)

Section Metadata

style

## Situation Description (S)

The situation description is a summary of the exceptional circumstance and its date of occurrence. It includes the following elements:

- Situation indicator
- Situation title
- Situation text, a brief description of the situation
- Occurrence of the situation as relative date

It is displayed in various controls:

- [Situation notification](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-notification)
- [Situation card](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-card)
- [Situation list item](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls?external#situation-list-item)
- [Situation message strip](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-message-strip)

It is also shown on the [situation page header](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#header).

### Situation Notification

Default (col-1)

You use notifications to alert users about urgent and important situations on SAP Fiori launchpad.
#### Control
For layout details see: [Notifications](https://www.sap.com/design-system/fiori-design-web/ui-elements/notification-center/).
#### Usage
The notification is triggered automatically if it was configured in the [Situation Type](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/bb5d6d504d5541cc8359990260255ffd.html?locale=en-US).

> **Guideline:** Consider [aggregating the notifications](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/3791628c90a14cd8b659229e77266529.html?locale=en-US) so the user is not overwhelmed.

Default (col-1)

#### Interaction and Behavior
When users select a notification, they go to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-detail-view-l).
If multiple situations are aggregated in one notification, it takes users to a filtered list of situations in the business app or to the aggregated notification view in the [My Situations – Extended](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/5137227e8fce4240830d20a875b99704.html?locale=en-US) app, depending on the configuration.

Default (col-2)

Section Metadata

style

### Situation Card

Columns

The situation card is shown in the To-Dos section of My Home on SAP S/4HANA Cloud Fiori launchpad.

#### Usage
The latest situations in a user’s area of responsibility are displayed in the To-Dos section. The number of cards is automatically adapted to the screen width according to the responsive design. The number of cards
displayed depends on the screen width,
#### Interaction and Behavior
Users select a card to go to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-detail-view-l).
#### Control
For layout details, see [Cards](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page-ovp/overview-page-card/).
### Situation List Item

Columns

The situation list item displays the [situation description](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-description-s) as a list item.
#### Control
For detailed layout see: [Standard List Item](https://www.sap.com/design-system/fiori-design-web/ui-elements/standard-list-item/).
#### Usage
The situation list item is displayed in the [list view of the Situations app](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/overview-in-a-situations-app#list-view-of-situations-app).
#### Interaction and behavior
Users select a situation list item to go to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-detail-view-l).
### Situation Message Strip

Columns

The situation message strip is shown on an object page of a business app and is available only for the standard framework for Situation Handling. In addition to the other [situation description](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-description-s) controls, it can contain the following components:

- Link More Information (optional)
- Action Close Situation
- Situation Switch (dynamic)
#### Control
The control is based on the [message strip](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-strip/).
#### Usage
The message strip is part of the [situation section](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#situation-section-in-a-business-app) that dynamically appears as the first section on the object page in a business app. The situation section also contains contextual information and optional actions to resolve the situation.
#### Interaction and Behavior
The link _More Information_ takes you to helpful information on, for example, a web page or a process handbook, which can be configured in the [Situation Type](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/45d60edcf02d409c87076f9270372eb8.html?locale=en-US).
The _Close Situation_ action opens the [close situation dialog](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#close-situation-dialog).
The [switch in the situation message strip](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#switch-for-situation-message-strip) appears dynamically as a transparent button if the business object is affected by more than one situation.
### Situation Switch

Columns

If a business object is affected by more than one situation, the situation switch lets users choose one.

There are two kinds of situation switches:
- [Switch for interactive situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#switch-for-interactive-situation-indicator)
- [Switch for situation message strip](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#switch-for-situation-message-strip)
#### Switch for Interactive Situation Indicator

Columns

The switch for the interactive situation indicator contains the following components:

- Situation indicator
- Situation title
- Occurrence of situation as a relative date
##### Control
The control is based on the [list Item](https://www.sap.com/design-system/fiori-design-web/ui-elements/standard-list-item/).
##### Usage
The situation switch is displayed when the users select an [interactive situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#interactive-situation-indicator) for multiple situations. The popover contains a list of situations.
##### Interaction and Behavior
The situation switch contains a list of situations.
Users select a situation from the situation switch to open a [situation preview](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-preview-m) that provides further details about the situation.
#### Hierarchical Situation Switch

Columns

The standard framework for Situation Handling also
supports the hierarchical situation switch. This switch
both displays the situations for the affected object and
indicates when objects below it in the hierarchy are also
affected by a situation, for example, on an item or
schedule level.
#### Switch for Situation Message Strip

Columns

The switch for the [situation message strip](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-message-strip) is available only for the [standard framework for Situation Handling](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/19460b5cabb746b0b5198fc82f14335a.html?locale=en-US). It contains the following components:
- Situation indicator
- Situation title

##### Control
The control is based on the [list Item](https://www.sap.com/design-system/fiori-design-web/ui-elements/standard-list-item/).
##### Usage
The situation switch is a popover that’s displayed when users select the arrow on the transparent button after the situation title in the [situation message strip](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-message-strip). contains the situation switch. The popover contains the situation switch
##### Interaction and Behavior
The situation switch contains a list of situations.
The selection of a situation from the situation switch changes both the data in the message strip and the contextual information in the [situation section](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#situation-section-in-a-business-app) of the business app’s object page.
## Situation Preview (M)

Columns

The situation preview provides information about the situation and an action. It contains the following components:

- Situation indicator
- Situation title
- Occurrence of situation
- Situation text
- _Show Details_ button
### Control
The control is based on the [popover](https://www.sap.com/design-system/fiori-design-web/ui-elements/popover/).
### Usage
Users open the situation preview by selecting an [interactive situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#interactive-situation-indicator) or an item belonging to the [situation switch](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-switch).
### Interaction and Behavior
When users choose the _Show Details_ button they go to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-detail-view-l).
## Situation Detail View (L)

The [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view) contains all the information users need to solve a situation.

- Situation description
- Contextual information
- Actions to solve a situation, if applicable

There are two versions of the situation detail view:

- Situation page. The situation page is part of the [My Situations – Extended](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/5137227e8fce4240830d20a875b99704.html?locale=en-US) app and available with the [extended framework for Situation Handling](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/92a58a164a4c4320bd6bf563d745baca.html?locale=en-US).
- Object page in business app. The situation details are embedded in the object page in a business app and available with the [standard framework for Situation Handling](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/19460b5cabb746b0b5198fc82f14335a.html?locale=en-US).

## Close Situation Dialog

Columns

Users can close a situation manually with the Close Situation dialog.

### Control
This control is based on a [dialog](https://www.sap.com/design-system/fiori-design-web/ui-elements/dialog/) of type _Message_ and state _Information_.
### Usage
Users can always close a situation manually. For example, in cases where the solution proposals offer no available quick actions or users want to
overrule the system behavior because they resolved the situation through activities outside the system such as negotiating a new contract when the
current one is about to expire. Sometimes, the situation may also be outdated or invalid. Users can provide the corresponding reason:
- Resolved – the situation is solved.
- Obsolete – the situation is outdated.
- Invalid – the situation is a false alarm.
### Interaction and Behavior

Columns

The close situation dialog opens when you select the _Close Situation_ button. The button is available in various components, for example:
- [List view in the Situations app](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/overview-in-a-situations-app#list-view-of-situations-app)
- [Situation page](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#situation-page)
- [Situation message strip](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-message-strip)
Columns

After the users select the feedback and confirm, the situation is closed. A success message toast is displayed.

Depending on where the user has closed the situation, the display changes as follows:
- **List view**: The selected situation list items are removed, and the number of situations is reduced accordingly.
- **Situation page**: The page closes and users go back to the list of situations. The corresponding list item is removed, and the number of situations reduced by one.
- **Situation message strip**: The [situation section](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view#situation-section-in-a-business-app) closes and users go to the object page. In case of multiple situations, the next situation is displayed.
After closing a situation, all the indicators in apps are removed.

---

## Situation Handling

**Design System Hero**

# Situation Handling

## Intro

Situation Handling helps businesses run smoothly by automatically informing the right users about the issues that require their attention, for example, consumed contracts, pending confirmations and approvals, deviating deliveries, and upcoming deadlines.

Users can see situations displayed in business apps and in an app dedicated to situations. They can also be informed by notifications on SAP Fiori launchpad or by email.

Situation Handling is available for [SAP S/4HANA](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8308e6d301d54584a33cd04a9861bc52/516c8ecb7462453ca430a42481cc33ec.html) and [SAP S/4HANA Cloud](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/516c8ecb7462453ca430a42481cc33ec.html). In addition to informing users about issues, Situation Handling also monitors how the situations are addressed. The collected context data can be exported to [Intelligent Situation Automation](https://help.sap.com/docs/intelligent-situation-automation) on SAP BTP, which has advanced analytics capabilities and enables the automatic resolution of situations.

Situation Handling consists of the following:

- The [standard framework](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/19460b5cabb746b0b5198fc82f14335a.html?locale=en-US) that provides situation cases that you can use out of the box.
- The [extended framework](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/92a58a164a4c4320bd6bf563d745baca.html) that enables you to both create your own situation cases and benefit from predefined situation cases.

## When to Use

Do
Use Situation Handling if:
- You want to bring exceptional circumstances to the
attention of the right user.
- The business issue is not part of an application.
- The business issue is not part of a standard business
process.
- You want to support users with contextual information
and solution proposals.
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------x----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
Top Tips
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------x----------------------------------------------------------------------------------------------------------------------------------------------------------------------+
- **Situation granularity**: Situation Handling is designed to support users in exceptional circumstances. Limit the number of situations per user so that users can focus on their daily business.
- **Texts for the user**: Describe the situation to the users in a way that supports them in understanding and resolving the issue. Follow the [UI text guidelines for situation handling](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/situation-handling-framework-ui-text-guidelines).
- **Use of notifications**: Use notifications with care and avoid overwhelming users. Restrict notifications to urgent and important issues. Also consider aggregating notifications where possible.
- **Solution proposals**: Where possible, offer concrete actions that can close a situation (such as _Assign Contract_ and _Reschedule Purchase_). If the solution is more complex, offer navigation options to related business apps.

## Components for Progressive Disclosure

Situation Handling comes with multiple components for the UX pattern of progressive disclosure. It improves usability by delivering users information and capabilities, gradually: Initially, users see the appropriate situation component displayed according to where they are on the interface. They can seek additional levels of detail about the situation according to their needs and goals.

### Situation Indicator

The minimum display is the situation indicator (XS).

### Description of a Situation

**Default (col-1)**

The short description of a situation (S) is used, for instance, for list items or for the situation message strip
embedded in business apps.
It must include:
- Situation title
- Date of occurrence
- Situation description
**Examples**
- Situation message strip
- Situation notification

**Carousel (full-width, col-2)**

**Section Metadata**

style

### Situation Preview

**Default (col-1)**

The situation preview (M) is used, for example, when selecting a situation indicator.
It includes:
- Description of a situation
- Navigation to detail view
**Examples**
- Situation card
- Situation preview

**Carousel (full-width, col-2)**

**Section Metadata**

style

### Situation Detail View

The situation detail view (L) is displayed on the situation page in the Situations app or on an object page of a business app.
This view contains a brief description and contextual information that helps the user make an educated decision. It also includes either actions to resolve the situation or navigation options to related
applications, or both actions and navigation options.
**Examples**
- Situation page
- Object page section
Texts for the User
Describe the situation to the users in a way that supports them in understanding and resolving the issue. For guidance, see: [Situation Handling Framework – UI Text Guidelines](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/situation-handling-framework-ui-text-guidelines).
Situation Proposals
Where possible, offer concrete actions that can close a situation, such as _Assign Contract_ and _Reschedule Purchase_. If the solution is more complex, offer navigation options to related business apps.
**> **Information:** **

For more information about the components and their use, see:
- [Situation Handling Controls](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls)
- [Overview in a Situations App](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/overview-in-a-situations-app)
- [Situation Detail View](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-detail-view)
For best practices for informing users, see: [Situation Handling Framework – UI Text Guidelines](https://www.sap.com/design-system/fiori-design-web/foundations/writing-and-wording/ux-writing/situation-handling-framework-ui-text-guidelines).

## Behavior and Interaction

Situations are displayed in various locations in the SAP Fiori environment. The navigation adheres to the principle of progressive disclosure in a well-defined way.

The navigation paths take various use scenarios into consideration. Here are some examples:

**A. Navigation from a situation card or a notification**

Users select a [situation card](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-card) on the _My Home_ page or a notification on SAP Fiori launchpad **(1)** and navigate to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling#situation-detail-view). Depending on the configuration, this is the situation page in the [My Situations – Extended](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/5137227e8fce4240830d20a875b99704.html?locale=en-US) app **(4)** or an object page in a business app **(5)**.

**B. Navigation from the Situations app**

Users open the Situations app **(2)** and it displays the list of situations **(2.1)** in their area of responsibility. They select a situation to navigate to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling#situation-detail-view), **(4)** or **(5)** depending on the configuration.

**C. Navigation from the situation indicator displayed with a list item in a business app**

In a business app **(3)**, users choose the [interactive situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#interactive-situation-indicator) next to a list item and a popover displays the [situation preview](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-preview-m) **(3.1)**. They select _Show Details_ to navigate to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/foundations/ai-and-joule-design/guidelines/situation-handling#situation-detail-view), **(4)** or **(5)** depending on the configuration.

**D. Navigation from the situation indicator in the header of a business app**

In a business app, on an object page, users select the [interactive situation indicator](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#interactive-situation-indicator) **(3.2)** after the object page title and a popover displays the [situation preview](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling/situation-handling-controls#situation-preview-m) **(3.3)**. They select _Show Details_ to navigate to the [situation detail view](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/situation-handling#situation-detail-view), **(4)** or **(5)** depending on the configuration.

---

## System Information Bar

# System Information Bar

## Intro

With SAP S/4HANA Cloud, customers and partners receive a three-system landscape: a development system, a test system, and a production system.

The system information bar in the development and test systems allows users to quickly identify the system they are using. The system information bar is located above the shell bar. By default, the system information bar is turned on in all non-production systems.

The administrators can change the default icons and color of the system information bar, see “[Icons and Colors](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s/4hana-only/system-information-bar#icons-and-colors)“, in the SAP Fiori launchpad settings. They can also switch off the system information bar.

## Components

The system information bar contains the following components:

1. **System type** in the form of an icon, such as development system
2. **Tenant type**, such as development or customizing tenant
3. **System ID/Client ID**

## Responsiveness

The system information bar is responsive.

## Icons and Colors

The following table shows all system types and tenant types with their default icons and colors. The system information bar is supported in all [themes](https://www.sap.com/design-system/fiori-design-web/foundations/visual/theming).

## Resources

Want to dive deeper? Follow the links below to find out more about related controls.

Columns

#### Elements and Controls
- [System Landscapes in SAP S/4HANA Cloud](https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/aa60b129af7b4ce8ae052618c8315d29.html)
- [SAP Fiori Launchpad: Shell and Shell Bar — What do you see in the information bar?](https://help.sap.com/docs/SAP_S4HANA_CLOUD/4fc8d03390c342da8a60f8ee387bca1a/1fcec711535845fda50228cb294f6640.html?)

---

## Ux Role Guidance

# Business Roles and Tasks

## Intro

This article outlines best practices for mapping a [business role](https://wiki.one.int.sap/wiki/display/fiorisuite/Fiori+Role+Portfolio) to SAP Fiori, including:

- Avoiding typical mistakes
- Setting goals for redesigning existing applications
- Breaking down tasks based on the level of detail and complexity (“pyramid approach”)
- Designing for different task types (recommended SAP Fiori floorplans and features)

## Break Bad Habits

When you redesign a solution for SAP Fiori, avoid the following typical mistakes:

#### Mistake 1: “Repainting” the existing application

Do not try to translate the legacy UIs 1:1 into SAP Fiori screens. Although this may appear to be a routine procedure, the resulting design has no additional UX benefits and conflicts with the [SAP Fiori design principles](https://www.sap.com/design-system/fiori-design-web/discover/sap-design-system/vision-and-mission/design-principles).

**Mistake 2: Total decomposition**

Avoid fragmenting the user experience into too many atomic applications. This approach results in an unclear information architecture and frustrating navigation for the user.

## Set Appropriate Goals

The issues described above can be caused by suboptimal goal setting for a redesign project.

Columns

#### Good example:
> Increase the SAP Fiori experience in the user’s daily
> work.
Can be achieved with good user research and by
prioritizing user tasks.

## Use the Pyramid Approach

The pyramid approach maps the business role and their respective tasks to a certain level of the pyramid, based on the nature of a task. A business role and a pyramid have a 1:1 relationship. The pyramid can be seen as an abstraction for each role.

### Break Down User Tasks by Level

On **Level 1**, the user starts with a single point of entry, which can be a corporate portal, an SAP Business Client, or just an icon on his desktop. For SAP Fiori, the recommended point of entry is the [SAP Fiori launchpad home page](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page). On the home page, the user normally gets a glimpse of the context from the available tiles, but it mainly serves as an entry point to the SAP world.

On **Level 2**, the user can get an overview of a special task or domain, with more contextual information than on the launchpad home page. If a user has several roles assigned, it might be the case that each role comes, for example, with an [overview page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page/) that the user can access to get an overview of that domain. But also a [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) could provide a good overview on a specific area, such as purchase orders, for example.

On **Level 3,** the user is already deep into his or her task and needs more details and information to complete the task. Here we typically talk about [object pages](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/), [create](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) and [edit](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/manage-objects) scenarios, and other “standard” activities.

**Level 4** provides access to special apps for highly specialized experts. We call them _expert tasks_. These tasks are so complex that they would not fit into Level 1-3, but are still relevant enough for the user to offer them in SAP Fiori.

**Level 5** provides access to all tasks and functions that are not SAP Fiori-enabled and that are considered lower priority, meaning that the user does not need to spend much time on this level.

Columns

#### Task-Based Coverage Approach
By picking concrete role tasks where the user spends most
of his or her time, you can make much greater progress
towards creating an efficient Fiori redesign. In the
following section, you will find out how to map the tasks
to the different pyramid levels.
Do

## Define the Task Type

Once you’ve researched your user personas and their activities to determine the **business role**, we recommend clustering the resulting use cases into several _task types_. Each task type contains a set of practical tips to map it to the SAP Fiori Design Guidelines.

> **Information:** 
\The prerequisite for task categorization is completing the [user research](https://www.sap.com/design-system/fiori-design-web/resources/user-research/user-research-resources?external) phase. 
We differentiate between five basic task types which have their own practical tips for a successful mapping into SAP Fiori.

Table

Task Type

**Routine Task**
regular basis and are quick to handle.

**Firefighting Task**
on an external trigger.

**Monitoring Task**
domain, as well as information absorption activities with
open result.

**Analytical Task**
results. Basis for strategic planning and forecasting
activities.

**Expert Task**
as design and system configuration activities.

### Routine Task

**Definition:** Routine tasks are process-driven activities or exceptions that happen on a regular basis and that are quick to handle.
**Keywords/Examples:** Exception Handling, Process-Based, Routine, Workflow, Quick Action, No-Brainer, Recurring

#### Use Cases Examples

- As a Transportation Planner, I want to review Full Truck Load (FTL) proposals in order to approve them if possible.
- As a Contract Manager, I want to identify expired contracts in order to renew them if needed.

#### Practical Tips

- Use the [worklist floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/work-list/) with quick actions for low volume tasks (up to 40 items).
- Use [list report floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) with variants and filters for higher volumes.
- Use [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) with _Create as Tile_ functionality to bring user-specific variants to the [launchpad home page](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) for monitoring.
- Use the [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/) as a backup to provide more context if required.
- Enable the [enterprise search](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/enterprise-search) for your objects and task lists.
- Bring actions to the [enterprise search result list](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/enterprise-search#result-list) if there is sufficient context for the user to make a decision.
- Bring actions to the [overview page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page/) (stacked cards) if the context for making decision is sufficient.
- Use [notifications](https://www.sap.com/design-system/fiori-design-web/ui-elements/notification-center/) to inform or remind the user about tasks.

### Reactive (Firefighting) Task

**Definition:** Reactive incident resolutions based on external trigger(s).
**Keywords/Examples:** Incident Management, Firefighting, External Trigger, Reactive, Search as Navigation

#### Example Use Cases

- As a Transportation Planner, I want to change the carrier of an existing Freight Order in order to react on urgent carrier cancellation.
- As a Transportation Planner, I want to change an appointment of an existing Freight Order in order to react to an urgent customer service request.
- As a Remote Service Engineer, I want to confirm and block a service date in order to react to short term customer requests.

#### Practical Tips

- Use the [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/) as the main destination to solve this type of task.
- Enable the [enterprise search](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/enterprise-search) for all your objects. Think about the search as the main navigation tool for this type of task.
- Use [quick views](https://www.sap.com/design-system/fiori-design-web/ui-elements/quickview/) with actions within the [list report](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) and [object page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/) floorplans, and block edit on the object page for spot adjustments.
- Use the [list report floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) enabled with local search, sorting, and filters to organize objects in lists.
- Use actions in the [enterprise search result list](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/enterprise-search#result-list) if there is sufficient context for the user to make a decision.
- Use [notifications](https://www.sap.com/design-system/fiori-design-web/ui-elements/notification-center/) as an alternative form of navigation and to bring more context to the task.

### Monitoring Task

**Definition:** KPI-driven monitoring of the specific domain with a purpose in mind as well as information absorption activities with open result.
**Keywords / Examples:** Measure-driven, KPI-driven, List Reports, Monitoring Variants, Embedded Analytics, Dashboards

#### Example Use Cases

- As a Transportation Planner, I want to see an overview of activities in my domain in order to understand the operations and receive feedback regarding my planning activities.
- As a Transportation Manager, I want to have an overview across my areas of responsibility in order to detect where I have to intervene because of negative KPI values.
- As an MRP Controller, I want to monitor a specific material group in order to avoid shortages within a particular time horizon.
- As an Accounts Payable Accountant, I want to monitor supplier line items, and if needed, block payments for a specific item.

#### Practical Tips

- Define KPIs and measures for your role. You can use them across analytical and operative SAP Fiori floorplans (including [Smart Business](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/smart-business-drilldown-app), [overview pages](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page/), [list reports](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/), [object pages](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/object-page/), and so on), as well as on the [launchpad](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).
- Use the [list report floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) and [Smart Business apps](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/smart-business-drilldown-app) with [variants](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) and [filters](https://www.sap.com/design-system/fiori-design-web/ui-elements/filter-bar/) to create specific monitoring lists. Later, these lists can serve as a basis for your overview page content (list and stacked cards).
- Use [variant management](https://www.sap.com/design-system/fiori-design-web/ui-elements/variant-management/) together with the _Create as Tile_ functionality to bring user-specific variants to the SAP Fiori launchpad for monitoring.
- Use the [launchpad](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) to monitor tasks across different business roles.
- Use the [overview page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page/) to monitor tasks inside a specific business role.
- Connect to analytical tasks by providing navigation to analytical tools depending on the role’s requirements and skills (for example, [Smart Business Framework](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/smart-business-drilldown-app), [Analysis Path Framework](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/analysis-path-framework), [analytical list page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/), and so on).

### Analytical Tasks

**Definition:** Root cause analysis as well as data mining with open results.
**Keywords/Examples:** Design Time, Analysis Path Framework, BW Report , (ZEN) Design Studio, Lumira, Predictive, Drilldowns, Cloud For Analytics

#### Example Use Cases

- As a Transportation Manager, I want to drill down into arrival performance statistics in order to find out which of my carriers on which routes are frequently not delivering on time.

#### Practical Tips

- Define characteristics and key figures for your role. You can use them for for the creation of [analytical reports](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) and KPIs for the [overview page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/overview-page/) or the [launchpad](https://www.sap.com/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).
- Select an appropriate analytical tool depending on the requirements and skills of the role (for example, [Smart Business Framework](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/smart-business-drilldown-app), [Analysis Path Framework](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/analysis-path-framework), [analytical list page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/), and so on)
- Use the [list report floorplan](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/list-report-floorplan-sap-fiori-element/) or the [analytical list page](https://www.sap.com/design-system/fiori-design-web/page-types/floorplans/analytical-list-page/) with variants, sorting, and filtering if you do not need a drilldown.
- Use the [Smart Business Framework](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/smart-business-drilldown-app) with evaluations, filters, and a good set of predefined views for simple drilldown analyses.
- Use the [Analysis Path Framework](https://www.sap.com/design-system/fiori-design-web/discover/frameworks/analytical-frameworks/analysis-path-framework) with predefined paths, filters, and views for more complex drilldown analyses.

### Expert Tasks

**Definition:** Planning activities, complex exception handling, and design and system configuration activities.
**Keywords / Examples:** Workbench, Planning, What-If, Simulation, Comparison, Testing, Configurations, Orchestration

#### Practical Tips

The experts tasks, by their nature, require very complex interactions with the system which may differ very much from use case to use case.
Just think about the following sample use stories, which are always a good candidates for an expert level:

- As a Transportation Planner, I want to assign demands to shipments in order to create a transportation plan.
- As an MRP Planner, I want to simulate different solution proposals in order to find an optimal solution for material shortage.
- As a Master Data Specialist, I want to create and enrich a new master data object (material, business partner, cost center, and so on)
- As an Internal Sales Representative, I want to navigate into a sales order to add a sales order item.

Each of these tasks may require different interaction concepts, such as preview or simulation (Transportation Planner and MRP Planner), digital assistance (MRP Planner, Master Data Specialist), or [draft handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling) (Internal Sales Representative and Master Data Specialist). Consequently, it is quite difficult to come up with a fixed set of practical tips that fit all the tasks in this category.

In general, designing an expert task is a project in itself. It requires careful research of the user’s needs and the underlying business processes. We highly recommend involving the SAP Design team early on to work in collaboration with application design. The resulting design solution may include several interaction concepts and is very individual for each business domain.

You may find some useful examples with screenshots for this and other task types in our [guidelines for business roles](https://wiki.one.int.sap/wiki/display/fiorisuite/Guidelines+for+Business+Roles) (wiki).

## Summary

To properly translate your role into the SAP Fiori Design language, you have to keep in mind following important points:

- **Research:** Understand your end user. Carry out solid research to figure out the tasks of your user.
- **Task Types:** Categorize your research results based on provided task types and their importance.
- **Examples and Practical Tips:** Use practical tips and examples during the Ideation phase to map your use cases into SAP Fiori Design Guidelines and create an information architecture for your project.
- **Big Picture:** Plan your portfolio and break it down into SAP Fiori applications based on the “big picture” created in the previous steps.

---

