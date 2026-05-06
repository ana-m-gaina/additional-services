# SAP Fiori Foundations: Integration And Services

## Sap Fiori Launchpad > App Finder

# App Finder

## Intro

The app finder allows you to browse all SAP Fiori, SAP GUI, and Web Dynpro ABAP apps in one place. It is available in the edit mode of the SAP Fiori launchpad or in the [SAP Fiori user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad#user-menu).
The app finder serves two purposes:
- Discover apps and add them to the home page
- Launch less frequently-used apps directly
Depending on the launchpad implementation, the app finder may be divided into three content areas: _Catalog_, _User Menu,_ and _SAP Menu_:
- The _Catalog_ area contains all the SAP Fiori apps.
- The _User Menu_ and _SAP Menu_ areas give users access to the SAP GUI and Web Dynpro ABAP applications that appear in the corresponding menus in the back end. Together, the two back-end menus
are also known as the “SAP Easy Access menu”.
**The app finder is provided by the SAP Fiori launchpad**. **Apps use this app finder and do not have their own individual designs.**

## Responsiveness

The app finder is fully responsive and adaptive.

On size S, the width of the app box adapts to fit the screen size.

The SAP Easy Access menu (_User Menu_ and _SAP Menu_) is not available on smartphones and tablets.

_App finder - Smartphone_          | _App finder - Tablet_          | _App finder - Desktop_

On smaller screens, the left panel disappears and a menu icon appears instead. Clicking the menu icon brings back the panel and provides access to the catalogs and menu folders.

## Components

### Catalog

The content is organized into catalog groups.

### User Menu / SAP Menu

The content is organized into hierarchical menu folders.

### Side Panel

The side panel helps the user to see all the apps for a given catalog or menu folder.

### App Boxes

The app finder contains all the apps the user is allowed to see. These are shown as app boxes. In addition, the _SAP Menu_ provides access to all the functions offered by an SAP system. The content of the _SAP Menu_ is independent of the user role, and is therefore the same for all users.

The interaction for adding apps from the app finder to the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) or [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#pages) depends on the source of the app (_Catalog_, _User Menu_, or _SAP Menu_).

## Behavior and Interaction

Each tile offers two actions:

1\) Clicking the tile takes the user to the app or page connected to this tile, as on the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).

2\) The pin icon button :pushpin-off: allows the user to add a tile to a group on the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page). In the catalog, users can also remove tiles from the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) via the pin icon button.

### Adding Apps to the Home Page

> **Information:** The info in this section applies only if you use the SAP Fiori launchpad home page. If you use SAP Fiori launchpad spaces, see [Adding Apps to a Page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder#adding-apps-to-a-page) below.

Each app box offers two actions:

1\) Clicking the tile takes the user to the app or page connected to this tile, as on the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).

2\) The pin icon button :pushpin-off: allows the user to add an app to one or several groups on the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page). In the catalog, users can also remove apps from the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) using the pin icon button.

#### Catalog

Clicking the pin icon [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) opens the _Add to Groups_ [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/), where the user can select one or more home page groups. The user can also remove the app from the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) by unchecking it in the popover, or add the app to a new group.

When the user selects or deselects a checkbox, the app is added to or removed from the respective group. When the user clicks _Close_ or anywhere outside the popover, a toast message summarizes the changes. The pin behaves like a toggle: if the app is assigned to the [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page), the pin is emphasized.

Carousel (full-width)

#### User Menu / SAP Menu

Clicking the pin icon [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) :pushpin-off: opens the _Add to Groups_ [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/), where the user can select one home page group and add the app. The user can repeat this process several times. However, for technical reasons, the app finder **cannot** be used to remove apps from the home page. Apps can only be removed by switching the home page itself to [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#open-and-close-edit-mode).

### Adding Apps to a Page

> **Information:** The info in this section applies only if you use SAP Fiori launchpad spaces. If you use the SAP Fiori launchpad home page, see [Adding Apps to the Home Page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder#adding-apps-to-the-home-page) above.

Each app box offers two actions:

1\) Clicking the tile takes the user to the app or page connected to this tile, as on a [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#pages).

2\) The plus icon button :add: allows the user to add an app to one or several [pages](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#pages). In the catalog, users can also remove apps from a [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#pages) using the checkmark icon button :accept:.

#### From the Catalog

Clicking the plus icon [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) opens the _Add to…_ [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/), where the user can select one or more pages. An app can be removed from a [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#pages) again by unchecking it in the popover.

When the user selects a checkbox, the app is added to that page and appears at the top of the page in a dedicated _[Recently Added Apps](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#sections)_ section. When the user deselects a checkbox, the app is removed from the respective [page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#pages). When the user clicks _OK_, a toast message summarizes the changes. The icon button behaves like a toggle: if the app is assigned to a page, the plus turns into a checkmark.

#### From the User Menu / SAP Menu

Clicking the plus icon [button](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/button/) opens the _Add to…_ [popover](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/popover/), where the user can select a page and add the app. The user can repeat this process several times. However, for technical reasons, the app finder cannot be used to remove apps from a page. Apps can only be removed by switching the page itself to [edit mode](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces#open-and-close-edit-mode).

Carousel (full-width)

---

## Sap Fiori Launchpad > Enterprise Search

# Enterprise Search

## Intro

The SAP Fiori launchpad offers an enterprise search function that searches across all apps and business objects, such as materials, customers, and maintenance
plans. The search icon is displayed in the [shell bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/) of the launchpad and is always readily available at the top of the screen.

Default (col-1)

When pressing the search icon in the shell bar, the search field and the type selector appear.

> **Information:** Some customers may not yet have business objects enabled for search. In this case, the UI adapts accordingly to
search for apps only. In particular, the type selector is not visible and the filter functionality is more limited.

Default (col-1)

After entering a search term, users can trigger the search by pressing ENTER, by clicking the magnifier icon, or by selecting one of the
suggestions. A search for _All_ can be achieved by pressing ENTER in an empty search field or by using the \* query.
If the search field is left empty, clicking the search icon closes the search field.

Default (col-2)

Section Metadata

style

## Type Selection

The search can be restricted to objects of a particular
type.

This can be done before the search is triggered, either
by using the type selector or by typing the object type
into the search field and selecting the respective
suggestion.
To filter a result list by object type, users can select
the type tabs or the respective section in the filter
panel.
## Suggestions

When the user starts typing in the search field, suggestions appear. There are 3 main
suggestion types:

- Type suggestions switch the type selector (for example, _Search In: Sales Orders_).
- App suggestions launch the app (for example, _App Create Leave Request_).
- Term suggestions execute a search with the respective terms (for example, _SAP Walldorf_)
## Result List

The result list is a ranked list of all matching items.
Different object types can have different
representations.
Apps are shown as tiles and can be launched.
Business objects are summarized in a few lines. Pressing
the title link of an object shows a full-screen
representation of that object, such as an object page or
a document viewer. If additional summary attributes area
available, clicking the down arrow :slim-arrow-down: on
the right will show them. This will also reveal
navigation shortcuts to apps that can handle the business
object.
The tabs at the top of the result list allow users to
filter by object type. The tabs are sorted by the number
of hits – categories with most hits appear first.
If the results have been limited to a certain object
type, additional actions appear in the upper right-hand
corner. Here, users can change the sort order, or switch
to a table representation with the option to show or hide
specific columns.
## Personalized Search

This feature allows the system to track the user’s search behavior in order to personalize and improve future rankings for search results. Algorithms analyze the user’s behaviors and interests, and adapt accordingly to support the user by focusing on context-relevant information.
Users can switch the personalized search on or off in the [User Menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad#user-menu) under _Settings_ -> _[User Profiling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-profiling-in-settings-dialog)._ They can also delete collected data with the _Clear My History_ button.
"Settings" dialog_
Some of these features might not be available to the user, depending on the system configuration.
## Filters

A filter icon in the top left-hand corner offers additional options for filtering the search results. When the user clicks the icon, a filter panel appears on the left-hand side. In this panel the user can change the object type, which may also be depicted as a hierarchy (depending on the system configuration).

Once the results have been limited to a certain object type, thus ensuring a homogeneous result set, result-specific filters are offered. Only meaningful filters are included. For example, if all results are for the same country, the country filter is not shown.

Up to 5 one-click options are available for each filter. You can show the selection options in a list, or visualize them in a bar chart or pie chart. Multiple selection is supported for all visualizations.

Once the filter panel has been closed, the applied filters are visible in an [infobar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/infobar/) above the result list. On the right of the infobar, all filters can be cleared without reopening the filter panel.

#### Filter Panel

Carousel (full-width)

## Advanced Filters

Default (col-1)

In addition to the the one-click filters, the user can set more filters by choosing _Show More_ or _Show All Filters_.
This opens a filter dialog with a list of all the available filters on the left. The details for the selected filter
show on the right.
The available options depend on the data type of the filter (text-based, numeric, date) and the configuration. For
most filters, a list of filter conditions is shown, similar to the filter panel. For texts, this list can be filtered
and sorted. For numbers and dates, the user can add custom ranges. There is also an option to enter variable
conditions: Instead of picking items from a list, the user can specify advanced conditions like _begins with_.

Default (col-2)

#### Dialog for setting all available filters

Carousel (full-width, col-2)

Section Metadata

style

## Configuration

Default (col-1)

Users can switch the personalized search on or off, depending on the configuration.

> **Information:** Users can access their individual settings via _[User Menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad#user-menu)_ > S _ettings_ > _[User Profiling](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-profiling-in-settings-dialog)_ > _Personalized Search_.
System-wide configuration for the personalized search is done in the [Configure Personalized Search](https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps\('F2800'\)/S11) app.

Section Metadata

style

Default (col-1)

Development teams can fine-tune the search for the business objects they are responsible for.

> **Information:** In **search models**\, you can configure:
- Which attributes are searched in (including associations to other objects)
- Which attributes are displayed and in which order
- Which attributes are displayed as filters in the filter pane
- The importance of each attribute (for a proper search ranking)
- The semantics of each attribute (to select the proper matching/fuzzy algorithms)
Using **SAP Fiori launchpad intents** you can configure:
- What happens when the user clicks the title
- What actions are listed in expanded result list items
In the **_Define Synonyms_ app**, you can configure the synonyms to be applied to each search.
In the **_Fine-Tune Ranking_ app**, you can configure ranking factors and their influence.

“products that are in stock are more important than others”
“new documents are more important”
“sales orders created by my team are more important”

Section Metadata

style

## Creation of Search Models

The display and behavior of the enterprise search is based on search models. Apply the following rules when creating search models.
- Implement the title of a search result as a **link to the [object page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/page-types/floorplans/object-page/)** or an equivalent full screen representation of that particular business object.
- **Align** the title, subtitle, and object type with the corresponding object page. Displaying objects consistently makes them easier to scan.
- To help users recognize objects quickly, use **images** whenever they are available. However, don’t display indistinctive images or placeholder images.
- Include relevant **attributes** in the object preview. They can help users to distinguish between objects and answer common questions up front (such as a contact phone number).
- Do not show unimportant attributes or attributes that aren’t shown on the corresponding object page.
Hint: When choosing attributes, focus on attributes that are important during productive use. These can differ from attributes that seem most important during development. For example,
master data attributes like “Created On” and “Created By” would not normally be relevant for the preview.
- Use consistent attribute labels that are either identical or aligned (for example, “Team Type” vs. “Type” in the “Team” section of the object page).
- Align the attribute content, especially the display order of “text (ID)” attributes.
- Make **visible fields searchable** (note that this may not be possible for all fields due to technical constraints).
- Include **facets** only if they are meaningful as filter criteria. Otherwise, avoid them.
For example, a facet for an ID would not make sense – each ID would return a single result, rather than a set of results.

---

## Sap Fiori Launchpad > Home Page

# SAP Fiori Launchpad Home Page

## Intro

> **Information:** With SAPUI5 1.75, we introduced [SAP Fiori launchpad spaces](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces) in parallel to the launchpad home page. You can now use the launchpad with either a home page or a space.

The **SAP Fiori launchpad home page** is the first page that users see after they have signed in. It is the main entry point to SAP Fiori apps on mobile and desktop devices.

The launchpad home page displays tiles and links that allow the user to launch apps, and may also show additional information. The page can be personalized and apps can be added, removed, or bundled in groups.

**The SAP Fiori launchpad home page must be used for all SAP Fiori apps.**

## Responsiveness

The SAP Fiori launchpad home page is fully responsive.
For smaller screens, the tiles are smaller so that at
least two tiles can be always be shown side by side.

## Components

### Tiles
The tiles provide direct access to apps or content. They are similar to large icons and have a rectangular shape.
The launchpad home page comes with a predefined set of groups and tiles. However, the user can also personalize the launchpad home page to reflect their individual
roles by choosing from a wide range of ready-to-use tiles from the [app finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder).
Tiles differ in the content they display. They can contain an icon, a title, some informative text, numbers, and charts. The information that is shown depends on the
function of the tile or app.
The number of tiles visible on a page depends on the screen resolution. The tiles are placed below each other and are resized for smaller screens.
### Links
Links are a different visual representation of a tile and
always look the same: they consist of a title and an
optional subtitle.
Links are collected in a dedicated area below the tiles
area within each group. As with tiles, the user can
modify the order of the links at any time.
Links are displayed inline, one after the other. It there
is not enough space for the full link at the end of a
row, the entire link moves to the next row. Links never
break between rows.
### Anchor Bar and Tab Bar
In the launchpad home page, tiles are usually clustered in groups. These groups are listed in an anchor bar or in a tab bar at the top of the page.
The anchor bar is the default setting. Optionally, users can choose the tab bar instead. Note: Both types are only shown when users have more than one group.
If you want to modify groups and tiles, select _Edit Home Page_ from the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-menu-on-the-home-page).
#### Anchor Bar
By default, all groups are displayed in the launchpad home page. These groups are listed in the anchor bar at the top of the page. When users select a group name, the page scrolls down to the selected group.
#### Tab Bar
When the tab bar is selected, the groups are separated
into tabs. Only one group is displayed at a time.
While this functionality reduces the overview of all
groups, it allows the user to focus on a selection of
tiles and improves the performance for users with a large
number groups.
#### Modifying the Home Page in Tab Bar Mode

Users can personalize the home page in tab bar mode by choosing _Edit Home Page_ in the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-menu-on-the-home-page).

In addition, they can use _Short Drop_ and _Long Drop_ functions to move apps from one tab to another.

Default (col-1)

#### Short Drop
Drag and quickly drop any app onto another tab. It disappears from your current tab and is added as the last app on
the new tab.
Note: The current tab stays in focus. The operation is invisible, but a message toast confirms that the app was
moved.

Carousel (full-width, col-2)

Section Metadata

style

Default (col-1)

#### Long Drop
Drag any app onto another tab and keep it there for a short while. The selected tab opens, and you can position the
app where you want it.
Note: The focus switches from the current tab to the selected tab. A message toast confirms that the app was moved.

Carousel (full-width, col-2)

Section Metadata

style

## Behavior and Interaction

Users can personalize their home page in a variety of ways. Tiles can be rearranged directly, but most actions require the user to activate the edit mode. For example, edit mode needs to be active to rearrange groups or customize tiles.

To enable more enhanced personalization functions, the user needs to open the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-menu-on-the-home-page)_,_ and then select 
To quit personalization, the user selects _Done_ in the footer toolbar.

### Tile and Link Actions

Default (col-1)

#### Converting Tiles and Links
Unless the group is locked, users can rearrange apps at any time, and transform a tile to a link and vice versa.
This is possible in both normal mode and edit mode using a simple drag and drop action. In edit mode, users can also
make use of the action sheet (see below).

Carousel (full-width, col-2)

Section Metadata

style

#### Generic Actions

(via _Edit Home Page_ only)

When _Edit Home Page_ is activated and the user clicks a tile, an action sheet appears showing a list of generic actions:

- _Settings_ opens a dialog in which the user can change the information that is displayed on a tile, such as the title or description.
- _Move_ opens a dialog in which the user can move the selected tile to a different group.
- _Convert to Link_ transforms a tile into a link, while _Convert to Tile_ transforms a link into a tile.

Tile designers can also add further generic actions.

#### Remove

(via _Edit Home Page_ only)

Users can remove tiles and links with the _Remove_ icon :sys-cancel:.

#### Add

Users can add apps with the _Add_ icon (:add: ), either from an empty group in edit mode, or by selecting _App Finder_ in the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-menu-on-the-home-page).

#### Move

Users can rearrange tiles and links by dragging them to a new location in the same group, or by dragging them to a different group.

#### Open

Clicking a tile or link opens the underlying app or content item.

### Group Actions

Via _Edit Home Page_, users can customize groups to their needs:

#### Adding Groups

Users can add a new group by clicking the _+ Add Group_ button. The user will be prompted to enter a new group name. If the user doesn’t immediately enter a name, the placeholder text _Enter group name_ will appear as the default name. Once the group is created, it will appear below _+ Add Group_ on the launchpad home page.

#### Moving Groups

The user can rearrange a group by dragging it to a new location in the group panel.

#### Renaming Groups

Users can rename groups by clicking a group name. A text box appears in which the user can enter the new name, which is then saved automatically. To discard a change while the text box is visible, the user must press Escape.

#### Deleting Groups

Users can delete groups they have created (including all the tiles they contain) by pressing _Delete_. Note that predefined groups, such as _My Home_, or locked groups (as defined by customers) cannot be deleted.

#### Resetting Groups

By clicking _Reset_, a user can reset a predefined group to its initial state as defined by an administrator.

#### Hiding Groups

Users can temporarily hide one or more groups on the launchpad home page. Note:
The _My Home_ group and locked groups cannot be hidden.

To hide a group, users go to _Edit Home Page_ and select _Hide_ on the top right
corner of each group. The background of the hidden group is now shown with a
darker transparency. To unhide a group, users select _Show_.

---

## Sap Fiori Launchpad > Launchpad

# SAP Fiori Launchpad

## Intro

The SAP Fiori launchpad is a shell that hosts SAP Fiori apps, and provides the apps with services such as navigation, personalization, embedded support, and application configuration.

The launchpad is the entry point to SAP Fiori apps on mobile and desktop devices. The launchpad displays a home page with tiles. Each tile represents a business application that the user can launch. Tiles can also display live status indicators, such as the number of open tasks. The launchpad is role-based. In other words, the user’s role determines which app tiles are shown.

This article provides an overview of the main elements of the SAP Fiori launchpad.

> **Information:** With SAP UI5 1.75, we introduced SAP Fiori launchpad spaces in parallel to the SAP Fiori launchpad home page. Users
can switch between the two with the user actions menu.

### Home Page

The [home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) is the heart of the launchpad and the central access point for SAP Fiori apps.
The page contains tiles, which are used to launch apps and can also show additional application information. Users can personalize the home page by adding,
removing, and grouping app tiles. Because the launchpad is role-based, only apps that are relevant for the user’s role profile are shown.
### Spaces

A [space](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces)
and its pages structure the most relevant apps for users with a certain business role. We recommend including only information and apps that users need to begin their daily
business.
Launchpad spaces display tiles that allow users to launch apps. They may also show additional application information. Users can personalize the home page by adding and
removing apps, or bundling them in groups. As the launchpad is role-based, only apps that are relevant for the user’s role profile are shown.
### User Actions Menu

The [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-menu-on-the-home-page) offers a range of user-specific services. It is accessed by clicking the icon or photo on the right-hand side of the shell bar. The user actions menu is available in all SAP Fiori screens.
The following options are always available, regardless of the current context:
- General settings and preferences
- A catalog of available apps (the [app finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder))
- Objects and apps recently visited by the user
- An _About_ dialog, with details about the SAP Fiori launchpad or app version.
- A _Sign Out_ option for logging off the SAP Fiori launchpad.
The following options depend on the current context:
- On the launchpad home page, the user actions menu contains an _Edit Home Page_ feature for personalizing the content of the home page.
- For some apps, the user actions menu might also offer app-specific settings.
In addition, customers can activate additional options for contacting the support team or giving feedback.
### Notifications

Users can access notifications by clicking the _Notifications_ button on the right of the shell bar.
The notification list displays system-generated notifications from various sources, such as the
workflow inbox or chat notifications. Notifications can be prioritized and organized into groups of
similar items. From the notification message, users can navigate to the underlying app. Depending on
the configuration, notifications can also offer buttons for taking immediate action.
## Components

### Tile

A tile is a container that represents an app on the SAP Fiori launchpad home page. Tiles are used for launching apps and presenting them on the launchpad.

For more information, see [Tile](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/).

### App Finder

The app finder is an “app store”-like interface that lists all the apps that a user might potentially use. The app finder replaces the tile catalog.

For more information, see [App Finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder).

### Shell Bar

The launchpad shell bar is always visible at the top of the screen. It offers access to cross-application functions, such as the enterprise search, SAP CoPilot, the user actions menu, and notifications. It also contains the page title with further app navigation options, as well as a branding area. Once the user opens an app, a _Back_ button appears on the left of the shell bar.

For more information, see [Shell Bar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/shell-bar/).

### Enterprise Search

The SAP Fiori launchpad offers an enterprise search function that searches across all apps and business objects.

For more information, see [Enterprise Search](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/enterprise-search).

### Services

The SAP Fiori launchpad provides a range of central services that can be used by application development teams. For example, the launchpad handles all navigation between apps, and offers controls for gathering user feedback and contacting the support team.

For more information, see [Services](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services).

### System Information Bar (SAP S/4HANA Only)

With SAP S/4HANA Cloud, customers and partners receive a three-system landscape: a development system, a test system, and a production system.

The system information bar in the development and test systems allows users to quickly recognize the system they are using. The system information bar is located above the shell bar. By default, the system information bar is turned on in all non-production systems.

For more information, see [System Information Bar](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/system-information-bar).

---

## Sap Fiori Launchpad > Sap Fiori Launchpad My Home

# SAP Fiori Launchpad “My Home”

> **Information:** For SAP S/4HANA, also check out the dedicated [SAP S/4HANA “My Home” Product Page](https://www.sap.com/design-system/fiori-design-web/discover/sap-products/sap-s4hana-only/s4hana-product-home-page-my-home).

## Intro

The “My Home” space of the SAP Fiori launchpad leads to a personalized page for the user. It serves as an entry point to a personalized set of SAP Fiori apps on mobile and desktop devices. This article provides an overview of the SAP Fiori launchpad “My Home” page.

If activated, “My Home” is the first listed [space](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-spaces) on the [SAP Fiori launchpad](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) navigation bar.
The page contains [tiles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/), which are used to launch apps and can also show additional application information. As for other spaces on the SAP Fiori launchpad, users can personalize the home page by adding, removing, and grouping app tiles. Since the launchpad is role-based, only apps that are relevant for the user’s role profile are shown.

## Adding Apps to “My Home”

If “My Home” is activated, the page is initially empty. The user can either import personalized app groups from other spaces, or add apps to the “My Home” page manually.

### Importing Personalized Content

A message at the top of the empty “My Home” page indicates that apps can be imported from the [classic home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).
The _Start importing now_ link opens the _Import Personalization Content_ dialog, which offers a list of previously personalized groups within different spaces. Here, the user selects the desired groups and clicks _Import_ to initialize the import.

### Adding Apps Manually

Alternatively, users can add applications to “My Home” manually. They can either use the [App Finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder) or click the _Edit Page_ button that is initially offered at the center of the empty “My Home” page.

## “My Home” Settings

Users can decide whether to show or hide the “My Home”
menu. This is defined in the user settings (user action
menu: _Settings_) under _Spaces and Pages_.

---

## Sap Fiori Launchpad > Sap Fiori Launchpad Spaces

# SAP Fiori Launchpad Spaces

## Intro

With SAPUI5 1.75, we introduced **SAP Fiori launchpad spaces** in parallel to the [SAP Fiori launchpad home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page). Users can switch between the two with the user actions menu.
A space and its pages structure the most relevant apps for users with a certain business role. The content of a space is visualized by tiles which allow users to quickly launch apps to access the business content they need to complete their business related
tasks.
Users can easily personalize their pages directly by rearranging or adding tiles. Users have access to advanced personalization options via the edit mode. Users may have a personalized space [“My Home”](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/sap-fiori-launchpad-my-home).
## When to Use

**SAP Fiori launchpad spaces** must be used to give access to SAP Fiori apps.

## Components

The following overview explains the concept of **spaces** and its **pages**.

**(1)** Top-level navigation where the space is visually represented as an navigation item
**(2)** One page or multiple pages per space
**(3)** Sections on a page
**(4)** Tiles in a section
**(5)** Links in a section

### Top-Level Navigation
The top-level navigation is part of a space. It gives
users access to all spaces and pages that they are
assigned to, and enables users to navigate between those.
An entry in the top-level navigation indicates a space.
Multiple spaces are visualized by multiple entries. By
selecting a space, users can access one or more pages
belonging to the space.
### Spaces
A space serves as an entry point for a business role and
shows information and functions that are assigned to this
business role. A space is represented as a navigation
item in the top level navigation. A user may have
multiple spaces assigned, which results in multiple
entries in the top-level navigation. A space consists of
one or multiple pages that are used to further structure
the content of a space.
A **space title** is _mandatory_. Do not use the business
role name as a space title, use the name of the work area
of a business role instead.
### Pages
A page is part of a space, and a space may have one or
multiple pages. Multiple pages allow users to structure
the space into multiple self-contained work-contexts.
Business roles with fewer apps may use one page per
space, whereas business roles with more apps may use
multiple pages per space. A page consists of sections
that are used to further structure the content.
Do not use function or product-oriented **page titles**,
and do not repeat the space title. Use task-oriented page
titles that summarize the tasks that can be performed on
the page.
### Sections
A section structures the content of a page semantically. To ensure consistency across pages within a space and across spaces, we highly recommend using a section “Quick Access” to summarize the most important apps and/or a section “Insights” to summarize the most
important analytical apps. To aim for lean pages, we recommend using between 2 and 5 sections per page. A section consists of tiles that visualize the content of a space.
A **section title** is _optional_. Use a term summarizing the tasks that can be performed in the section.
#### Recently Added Apps
When the user adds an app to a page using the [app finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder#adding-apps-to-a-page), a dedicated _Recently Added Apps_ section appears at the top of the page that contains the added app. Once the user moves the app to another section, the _Recently Added Apps_ section disappears.
### Tiles
The content of a space is visualized by [tiles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/). Tiles allow users to quickly access business applications to complete their tasks. Different [tile types](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/#types) and tile sizes are available. To aim for lean pages, we recommend using between 3-7 apps per section and 25 apps at most per page.

### Links
The content of a space is visualized also by links. Links
allow users to quickly access business applications to
complete their tasks.
## Behavior and Interaction

Users can switch between the launchpad home page and launchpad spaces. To personalize the pages, users may either directly rearrange tiles on a page or open the edit mode to have access to advanced personalization options.

### Switching between Spaces and Home Page
Users can switch between the **launchpad home page** and **launchpad spaces** with the user actions menu. Navigate to _Settings_, then _Spaces,_ and activate _Use Spaces_ to switch to launchpad spaces. Deactivate _Use Spaces_ to switch back to the launchpad home page. In both cases the launchpad reloads.

### Personalization

To directly personalize the page, users can rearrange or add apps.

**(1) Move:** Users can rearrange tiles and links by dragging them to a new location in the same section or to another section.

**(1) Add:** Users can add apps by selecting _App Finder_ in the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-menu-on-the-home-page).

### Open and Close Edit Mode

To open the edit mode, users need to open the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/services#user-menu-on-the-home-page) and select _Edit Current Page._ To close the edit mode, users need to select _Exit Edit Mode_ or select _Close_ in the footer toolbar.

### Edit Mode

Users may use the _Edit Mode_ to access advanced personalization options, such as tile actions or section actions to personalize a page.

#### Tile Actions

**(1) Remove**: Users can remove tiles with the _Remove_ icon :decline: .

**(2) Add:** Users can add apps by clicking the _Add Tile_ button.

**(3) Move:** Users can rearrange tiles and links by dragging them to a new location in the same section or to another section.

**(4) Action Menu:** Users can open the tile action menu to access further tile actions by clicking on the overflow icon :overflow: .

- **(4a) Convert:** Users can convert the size of a tile based on the current tile size into a link, a tile, a flat tile or a flat wide tile by clicking on the respective _Convert_ action in the action menu.
- **(4b) Move:** Users can also select _Move_ in the action menu to rearrange tiles.

#### Section Actions

**(1) Rename Sections:** Users can rename sections by typing the new name in the input field for the section title.

**(2) Add Sections:** Users can add a new section by clicking the _Add Section_ button. The user is prompted to enter a new section name. If no name is entered, the placeholder text _Enter section tile_ appears by default. Once the section is created, it appears below _Add Section_ in the launchpad space.

**(3) Move Sections:** Users can rearrange a section by dragging individual section panels to a new location.

**(4) Reset Sections:** By clicking _Reset Section_, a user can reset a predefined section to its initial state, as defined by an administrator.

**(5) Hide/Show Sections:** Users can temporarily hide one or more sections on a page within a space by clicking the toggle button _Hide Section._ The _Show Section_ button displays the section again.

**(5) Delete Sections:** Users can delete an empty section by clicking the _Delete Section_ button.

## Responsiveness

The **SAP Fiori launchpad spaces** is fully responsive. For smaller screens, the tiles are smaller so that at least two tiles can be shown side by side.

## Top Tips

### How to Design a SAP Fiori Launchpad Space

There are several means available to semantically structure and visualize the content of a space. Use multiple pages and sections to semantically structure the content of a space. Page and section titles may help identify the tasks that the content relates to. Use tiles to visualize the content of a space. Beside tiles, more options to visualize the content will be available in later releases.

**Spaces** A space comes with a predefined set of apps
related to the user’s business role. Show only the most
important and most used apps per space that users need to
complete their daily tasks. To identify those apps, we
recommend following the “Day in a life of…” approach:
What are the most important apps for the users? How often
do they use them? What do they need first, what do they
need next? Are there any dependencies in the workflow?
What are the insights they need on a regular basis? Which
apps can be semantically bundled? Are there
self-contained work-contexts? Structure the space
according to these patterns.
To further structure a space you might use one or
multiple pages depended on the number of assigned apps
associated with the users’ business role.
_Note:_ Don´t worry about the apps you leave out. Users
still can access all apps in the app finder which they
might use to add apps to their pages or to directly
launch apps that they rarely use.
**Sections** Use sections to semantically structure the
content of a page. To ensure consistency across pages
within a space and across spaces, we recommend using a
section called “Quick Access” to summarize the most
important apps, and/or a section called “Insights” to
summarize the most important analytical apps.
### Guideline

**In General**
- Aim for lean spaces and pages:
- Try to use between 2 and 5 sections per page.
- Try to show between 2 and 7 apps per section, but 25 apps at most per page.
- Go for consistency for all titles within a space and across SAP Fiori.
- Do not repeat the space title.
**Space Titles**
summarizes the content of the pages across the space, use
- A space title is mandatory.
- Do not use business role names as space titles, use the name of the work area of the
business role instead.
- Use specific terms for the application area such as “Internal Sales”, rather than
“Sales”, or “Accounts Receivables” rather than “Accounting”.
- Try to avoid the term “Management” for non-managerial roles.
- In rare cases, you may need to use specifications or a space title to differentiate
spaces for similar but not identical roles. In this exceptional case, a dash “-” can
be used. Example: _Project Controller – Finance._
- Examples for space titles are:
- “Internal Sales” for the business role _Internal Sales Representative_
- “Accounts Receivable” for the business role _Accounts Receivable Accountant_
- “Convergent Invoicing” for the business role _Invoicing Specialist_
- “In-House Repair” for the business role _Service Representative – In-House Repair_

## Related Topics

- [SAP Fiori Launchpad – Overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) (guidelines) | - [Home](https://wiki.one.int.sap/wiki/pages/viewpage.action?pageId=2599410072) (visual design specification)
- [SAP Fiori Launchpad Home Page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) (guidelines)  | - [Generic Tiles](https://wiki.one.int.sap/wiki/pages/viewpage.action?pageId=2697897673) (visual design specification)
- [Tiles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/) (guidelines)
- [App Finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder) (guidelines)
#### Elements and Controls
- [SAP Fiori Launchpad – Overview](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad) (guidelines)
- [SAP Fiori Launchpad Home Page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page) (guidelines)
- [Tiles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/) (guidelines)
- [App Finder](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/app-finder) (guidelines)
---

## Sap Fiori Launchpad > Services

# SAP Fiori Launchpad Services

## Intro

SAP Fiori launchpad services are standard functions and features that are provided at launchpad level. They include:

- Recent Activities
- Frequently Used
- App Finder
- Settings
- Edit Home Page
- Contact Support
- Give Feedback
- App Settings
- About
- Sign Out
- Save as Tile

Most of the services are accessed via the [user actions menu](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/launchpad#user-menu).

## Behavior and Interaction

### User Actions Menu on the Home Page

Clicking the user icon or photo on the very right of the
SAP Fiori launchpad shell bar opens the user actions menu
with the standard services.

### User Actions Menu in Applications

In the application shell bar, the _Edit Home Page_ option
disappears from the user actions menu. Instead, the
following additional services could be shown (depending
on their availability):
- App Settings
- About (for Apps)
## Overview of Services

### Recent Activities
This service displays a list of the most recent user activities in reverse chronological order (most recent
first). Recent activities are apps the user has been working with, or recent search queries, for example. The
_Recent Activities_ list can contain up to 30 items.
A single list item is represented by its title, the type of object, and a time stamp. For generic functions,
such as search, an icon appears next to the list item. Each item can be listed only once. The last usage
updates the timestamp and moves the item to the top of the list.
The whole list item triggers navigation to the corresponding URL target. However, there are no separate
interactive elements within a list item. Apps start in the last state that is technically recoverable,
enabling users to carry on where they left off.
Default (col-1)

### Frequently Used

Default (col-1)

This service lists the items used most often during the last 30 working days (most frequently used first).
A single list item is represented by its title and the type of object. For generic functions, such as search, an icon appears next to the list item. Each item can be listed only
once.
The whole list item triggers navigation to the corresponding URL target. However, there are no separate interactive elements within a list item. In contrast to the _Recent Activities_ app list, apps opened via the _Frequently Used_ tab start in their initial state, enabling users to start afresh.

> **Information:** In native packaged apps, the _Recent Activities_ and _Frequently Used_ lists only display apps that are part of the
specific app package. Currently, no links to apps outside the package are planned.

Default (col-2)

Section Metadata

style

### App Finder
The app finder is an “app store”-like       | _User actions menu - App finder_          | _User actions menu - App finder_
interface listing the apps that a user
might potentially use. Apps in the app
finder are sorted as follows:
1. **Front-end server catalog:** All the
apps an administrator has added to the
catalog in the front-end server. These
are the apps that typically appear for
the user in the SAP Fiori launchpad.
2. **User actions menu (SAP logon):**
All apps that have been assigned to a
user in a specific back-end system.
These are the apps a user would find in
the user actions menu when signed into
that system.
3. **SAP menu (SAP logon):** All apps in
a specific back-end system, regardless
of whether or not they were assigned to
the user, or whether the user can access
them. These are the apps that a user
would find in the SAP menu of the
back-end system.
### Settings

The _Settings_ dialog contains the
following attributes:
_User actions menu - settings_          | _'Settings' dialog_
- User Account
- Appearance
- Home Page
- Language & Region
- User Activities
- User Profiling (if implemented)
- Notifications
- Default Values
#### User Profiling in Settings Dialog

User profiling is an optional entry in the settings dialog. The user can turn _User Profiling_ on or off using the [switch](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/switch/).
If this feature is turned on, some of the user activities are recorded. This data is used to provide individual, personalized results for future searches.

#### Home Page in Settings Dialog

In the _Home Page_ settings dialog, the user can decide how content is shown in the launchpad. The default setting is that all [tiles](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/tile/) and links are shown on a single page, with an **anchor bar** at the top.
App tiles are usually shown in groups. Single groups can be accessed via the **tab bar**.
For more information on the anchor and tab bar, see [SAP Fiori launchpad home page](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/foundations/integration-and-services/sap-fiori-launchpad/home-page).
#### User Activities in Settings Dialog

In the _User Activities_ dialog, users can decide whether or not launched apps are tracked. Tracked apps are listed under _Recent Activities_ and _Frequently Used_.
If tracking is switched off, the _Recent Activities_ and _Frequently Used_ options are not shown in the user actions menu.

### Edit Home Page

_Edit Home Page_ offers additional
functions for controlling the
visibility and placement of apps and  | _User actions menu - Edit home page_          | _Launchpad - Edit mode_
groups on the home page: tiles can be
added, re-arranged, or removed from
the launchpad. Groups can be created,
re-arranged, deleted, or temporarily
hidden.
To add new applications to the home
page, users can also open the app
finder in edit mode.
### Contact Support

The _Contact Support_ dialog offers a description field for entering a problem. Users can also display the technical data that will be sent to the support team. The _Send_ button is activated if there is an entry in the description field.

The _Contact Support_ feature is only available if the customer activates it.

### Give Feedback

The _Give Feedback_ dialog gives
users an opportunity to rate their
experience and give written feedback. | _FLP shell bar - 'Give Feedback'_           | _'Give Feedback' dialog_
Users can also display the technical
data that will be sent to the support
team.
The _Give Feedback_ feature is only
available if the customer activates
it.
### App Settings

You can offer app-specific settings for each app in the launchpad. If you implement the API for the settings service, an _App Settings_ entry appears in the options menu.

You’ll need to design the settings dialog for your app yourself. Make sure that you only have one _App Settings_ entry in the _User Actions Menu_ to give the user access to the app settings for all apps.

### About

The _About_ dialog for the launchpad displays the
following information:

- Official SAP Fiori name or a specific launchpad name
- Launchpad version
- SAPUI5 version
- User agent details
The _About_ dialog for apps displays the following information:
- App icon (as specified in the component)
- Official app name, as specified in the component (config
titleResource)
- Full technical app name
- App version
- SAPUI5 version
- User agent details
- App ID
- Application component
### Sign Out

To sign out of SAP Fiori, users choose _Sign Out_ in the user actions menu. This opens the _Sign Out_ confirmation dialog.
_User actions menu - 'Sign Out'_           | _'Sign Out' confirmation dialog_

### Save as Tile

The _Save as Tile_ option lets the user save a snapshot of the app in its current state. In the _Save as Tile_ dialog, the user can enter a title, a subtitle, and a description of the new tile.
This option is offered in the _Share_ menu in the [header toolbar](https://main--builder-prospect--sapudex.hlx.page/design-system/fiori-design-web/ui-elements/header-toolbar/#share-generic) of an app.    | _'Save as Tile' in the page header toolbar_           | _'Save as Tile' dialog_
When the user chooses _OK_, a new tile is added to the My _Home_ group of the home page. It displays the title, subtitle, and description entered by the user, and triggers navigation to the app snapshot.
All the app settings that were part of the URL are reflected, such as a selected list item in a list-detail layout.

---