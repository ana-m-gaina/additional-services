# SAP Fiori UI Elements: Upload

This reference covers the following UI components:

- [File Uploader](#file-uploader)
- [Upload Set](#upload-set)

---

## file-uploader

The file uploader lets users select one or more files using their local file explorer and upload them to the application. Uploading starts automatically as soon as users select the files.

Unlike the [upload collection](https://sap.github.io/ui5-webcomponents/components/fiori/UploadCollection/) component, the file uploader includes only an input field or button and is designed for simple upload tasks.

## When to Use

Do
Use the file uploader:
- To upload one or more files using the local file
explorer.
- To upload files by dragging and dropping them.
- If users may need to rename uploaded files.
In all these cases, use the [upload collection](https://sap.github.io/ui5-webcomponents/components/fiori/UploadCollection/) component instead.

+----------------------------------------------------------x----------------------------------------------------------+
Top Tips
+----------------------------------------------------------x----------------------------------------------------------+
- The file uploader works best for uploading **single files**.
- Use the [upload collection](https://sap.github.io/ui5-webcomponents/components/fiori/UploadCollection/) component
when users need to manage multiple uploads (such as deleting individual files, rearranging files, and renaming
files).

## Anatomy

1. **Input:** Container field.
2. **Placeholder text:** Upload hint.
3. **Browse button:** Removes any uploaded files and
opens the file explorer dialog of the local operating
system.
## Types

The file uploader offers two options for uploading files, an input field and a button.

**A. File uploader with input field**
**B. File uploader button only**

**> **Guideline:** **

If you use the button-only variant, make sure users can see the file name after the upload finishes. This guideline
doesn’t specify how to display the file name.

## States

### Component States

The file uploader has two basic [component states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-component-states): enabled and disabled.

**A. Enabled**
**B. Disabled**

### Interaction States

The file uploader has three basic [interaction states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-interaction-states) (regular, hover, down) and a busy state. For the busy state, you can also display a message with additional information below the field. 

**A. Regular**
**B. Hover**
**C. Down**
**D. Busy**

### Focus States

The file uploader has three basic [focus states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-focus-states): on focus, on focus while uploaded, and token focus.

**A. On focus**
**B. On focus while uploaded**
**C. Token focus**

### Value States

The file uploader has four basic [value states](https://www.sap.com/design-system/fiori-design-web/foundations/interaction/states/interaction-foundations-value-states):

**A. Positive**
**B. Critical**
**C. Negative**
**D. Information**

For all value states, you can also display a message with additional information below the field.

## Behavior and Interaction

The upload flow depends on whether you use the file uploader with an input field or only an upload button.

### File Uploader with an Input Field

#### New Upload – Select Using File Explorer

**A. Start upload using file explorer:** The user clicks
the browse button or an empty area inside the input field.

**B. Select files:** The local file explorer opens in a
dialog. The user selects files to upload and confirms the
selection.
**C. Upload in progress:** While files upload, each file
token shows a busy indicator. An information message
indicates which files are being uploaded.
**D. Upload result:**
- **Success:** The uploader shows a success state in the
input field and displays a message confirming the upload.
After uploading, each token displays the file name. The
system sets the focus on the last uploaded token.
- **Error:** If there's an error – for example, when the
file size exceeds the upload limit – the component doesn't
upload the file, and no token is displayed. The input field
shows an error state and an error message. The error state
remains visible until the user uploads a new file.
- **Error when uploading multiple files:**
If one file in a batch has an error, the error message
names that file. No files are uploaded, and no tokens
appear. The user must reselect all files for upload.
#### New Upload – Select Using Drag and Drop

**A. Start upload using drag and drop**: The user drops the file(s) into the input field.
**B. Upload in progress:** While files upload, each file token shows a busy indicator. An
information message indicates which files are being uploaded.
**C. Upload result:**
- **Success:** The uploader shows a success state in the input field and displays a
message confirming the upload. After uploading, each token displays the file name. The
system sets the focus on the last uploaded token.
- **Error:** If there's an error – for example, when the file size exceeds the upload
limit – the component doesn't upload the file, and no token is displayed. The input field
shows an error state and an error message. The error state remains visible until the user
uploads a new file.
- **Error when uploading multiple files:**
If one file in a batch has an error, the error message names that file. No files are
uploaded, and no tokens appear. The user must reselect all files for upload.
#### Uploading Files When the File Uploader Is Busy

**A. Files are uploading**
**B. Restart upload:** To start a new upload, the user
clicks the browse button or an empty area inside the
input field.
**C. Select new files:** A dialog opens with the local
file explorer. The user picks new files and confirms the
selection.
**D. Upload complete:** Each successfully uploaded file
appears as a token. The focus moves to the last token.
#### Replacing Files

The user must replace all existing files when making a
new selection. Adding files to the current selection
isn't possible. The uploader replaces the files and
uploads the newly selected files.
**A. Start upload:** To start a new upload, the user
clicks the browse button or an empty area inside the
input field.
**B. Select new files:** A dialog opens with the local
file explorer. The user picks new files and confirms the
selection.
**C. Upload in progress:** While files upload, each file
token shows a busy indicator.
**D. Upload complete:** Each successfully uploaded file
appears as a token. The focus moves to the last token.
#### Removing Uploaded Files

**A. Uploaded files:** Previously uploaded files display as tokens in the input field.
**B. Remove all files:** Clicking the _Remove All Files_ button removes all uploaded files. This button appears only when uploaded files are present.
**C: Cleared field:** Users can upload new files by starting the upload process again.

#### Truncation

File names on tokens are truncated when there isn't enough space.

If the tokens don’t all fit in the input field, the component shows an overflow button (with "n more" or "n items"). For more information, see [Multi Input](https://www.sap.com/design-system/fiori-design-web/ui-elements/multi-input-web-component/).

**A. Truncated placeholder text**
**B. Single file with truncated token text**
**C. Multiple files – _n more_ overflow button:** At least one file name appears as a token in the input field next to the "n more" button.

### File Uploader with an Upload Button

**A. Start upload:** The user clicks the upload button

**B. Select files:** The local file explorer opens in a
dialog. The user selects files to upload and confirms the
selection.
**> **Guideline:** **

Display the uploaded files next to the file uploader button. Users must always be able to see which files have
already been uploaded.

## Localization

File uploader supports left-to-right (LTR) and right-to-left (RTL) reading directions.

---

## upload-set

The upload set control allows users to upload single or multiple files from a device (desktop, tablet, or phone) to an SAP Fiori app.

Despite its name, the upload set is not limited to upload scenarios. Depending on the context or the access rights, some users may only be allowed to download the files uploaded by others. You can use the upload set control for both cases.

## When to Use

### Use the upload set control if:

- You want to show a list of uploaded files that can be modified.
- You want to allow users to add or remove several files, and to change the file names.
- You are still using one of the older upload controls:
  - `sap.ca.ui.FileUpload`
  - `sap.m.UploadCollection` (deprecated since SAPUI5 version 1.88)

### Do not use the upload set control if:

- The user can upload only one file to the app. In this case, use the [`sap.ui.unified.FileUploader`](https://sapui5nightly.int.sap.eu2.hana.ondemand.com/#/entity/sap.ui.unified.FileUploader/sample/sap.ui.unified.sample.FileUploaderBasic) control instead.

## Components

Default (col-1)

1. Toolbar with upload and download controls
2. Edit and delete actions
3. Technical status
4. Attributes and statuses
### Toolbar
The toolbar (1) can contain manual upload and download controls. The user can download one or several items selected
in the list.

> **Hint:** Unlike the deprecated Upload **Collection** control, the Upload **Set** control allows you to implement a custom uploader (see the [SAPUI5 sample](https://ui5.sap.com/#/entity/sap.m.upload.UploadSet/sample/sap.m.sample.UploadSetCustomUploader) for details).

Default (col-2)

Section Metadata

style

### List

**Actions (2)**

By default, each item has an _Edit_ button :edit: and a _Delete_ button :decline: . _Edit_ turns the title into an editable field so the item can be renamed.

**Technical statuses (3)**

Technical statuses are not bound to a workflow or business process. They are mainly used to show the current editing status of an object (_Draft_, _Locked_, _Unsaved Changes_). For further uses and more details, see [Object Display Components](https://www.sap.com/design-system/fiori-design-web/ui-elements/object-display-elements/) and [Draft Handling](https://www.sap.com/design-system/fiori-design-web/foundations/best-practices/global-patterns/object-handling/draft-handling).

**Attributes and statuses (4)**

You can display additional attributes and statuses below the file name. Attributes or statuses can include the name of the person who uploaded the file, the upload date, the version number, file size, and the object state in a workflow (such as “Approved” or “Overdue”).

\\Statuses can be shown in different colors. 
If multiple attributes or statuses are displayed, they are separated by a bullet.

> **Information:** Unlike the attribute, the object status differentiates its label and value with a different color, improving
readability. You can use the object status to display any type of information.

## Behavior and Interaction

### Uploading Files

Default (col-1)

The upload set offers two basic working modes:
- **Instant upload** (default): Files are uploaded as soon as they the user drops them onto the control or clicks the _OK_ button in the file selection dialog.
- **Manual upload**: All added files are first collected in the front-end list, where the user needs to trigger the upload.
If some users are only allowed to download the files uploaded by others, you can disable the upload option.
Unlike the deprecated Upload **Collection** control, the Upload **Set** control allows you to use a custom uploader.

> **Hint:** - Using the Boolean property `instantUpload`, you can determine whether files are uploaded immediately or whether the user needs to trigger the upload explicitly.
- The Boolean property `uploadEnabled` controls whether or not users are able to upload files.
- For an example of a custom uploader, see the [SAPUI5 sample](https://ui5.sap.com/#/entity/sap.m.upload.UploadSet/sample/sap.m.sample.UploadSetCustomUploader).

Section Metadata

style

#### Empty State
If empty, the upload set provides a hint to use the _Upload_
button or drag and drop to upload files. This hint already
provides a large enough zone for users to drop their files.
#### Drag and Drop
Users can easily select one or multiple files from their
computer and drag them onto the upload set to start the
upload.
As the user hovers over the drop zone, a border appears
around the upload set to indicate that the file can be
released.
The upload process itself is the same as if a file had
been added via the _Upload_ button.
### Opening Files

Files are opened by clicking the file name of the attachment. How the files open depends on the operating system and browser settings.

On desktop devices, clicking the file name opens the program that has been assigned to this file type. In some cases, the files are opened directly in the browser if they are among the supported file types, like jpg, png or pdf. However, this also depends on the individual browser and its settings.

Mobile devices usually open a dialog in which the user can select an app that supports the respective file type.

### Renaming Files

The _Edit_ function works identically on desktop and mobile devices.
1. The user clicks the _Edit_ button :edit: .
2. The file name becomes an input field in which the existing name is highlighted. The icon buttons for _Edit_ :edit: and _Delete_ :decline: are replaced by two text buttons: _Rename_ and _Cancel_.
3. When the user starts typing, the highlighted text is overwritten. Alternatively, the user can use the mouse or keyboard to change the selected
text.
4. The new file name can be validated in two ways:
- The user clicks _Rename_.
- The user presses **Enter**.
### Deleting Files

The _Delete_ function works identically on desktop and mobile devices.

After clicking the _Delete_ button :decline: for a file, the user is prompted to confirm the deletion.

_Delete_ confirms the deletion and the file is removed from the list. _Cancel_ aborts the process, closes the dialog, and brings the user back to the file list without making any changes. For more information on the pattern, see [Message Box – Confirmation for “Delete”](https://www.sap.com/design-system/fiori-design-web/ui-elements/message-box/#confirmation-for-delete).

### Clickable Attributes

Default (col-1)

Object attributes can be made clickable. This can be very helpful to provide users with a direct way to access
certain information, such as a person’s profile and contact data, or the version history of a file.
Examples:
- Uploaded By: John Miller
- Last Edited By: Donna Moore
- Version 1.1

> **Guideline:** - Use a [quick view](https://www.sap.com/design-system/fiori-design-web/ui-elements/quickview/) to show this additional information.
- **Don’t use more than two or three linked attributes per item.** Excessive use of clickable attributes overloads the UI with interactive elements and has a negative impact on usability.

Section Metadata

style

## Responsiveness

The upload set control offers full responsive behavior from small phones to large desktop screens. Uploading, downloading, renaming, and deleting works on all screen sizes. Texts that no longer fit into the available space are truncated.

_Size S_          | _Size M_          | _Size L_

## Example

You can use the upload set control whenever users need to be able to upload multiple files. The example below shows the object page of a product, in this case a machine, with an _Attachments_ tab containing several documents relating to the material specification and requirements.

Other possible scenarios:

- Warranty claim: Users need to upload images of a damaged item.
- Product details: Editors can upload product pictures that will be shown in the online shop.
- Service history: Whenever maintenance is carried out, the service worker attaches a document to the object.

## Top Tips

### When to Show, Disable, and Hide Actions

The _Edit_ button :edit: and _Delete_ button :decline: are visible and enabled by default. If you don’t want to allow users to edit or delete uploaded files, hide the corresponding buttons.

**Don’t** leave buttons enabled and then show an error message when the function isn’t available.

Do

Do

Do

---