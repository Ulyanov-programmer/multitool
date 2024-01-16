# Instructions

## Installation

Connect the script and styles as follows: <br>
(If you use gulp_multitool, you can connect them by switching `dialogs=false` to `dialogs=true` on the `sources/index.html` page)

```html
<link rel="stylesheet" href="./path_to_folder/dialogs.css" />
<script type="module" src="./path_to_folder/index.js"></script>
```

## Buttons

You can use these attributes for buttons:

- `data-open-dialog-id`
- `data-close-dialog-id`
- `data-toggle-dialog-id`
- `data-close-dialog-id` - (_Closes the nearest parent element if the ID of the dialog is not specified_)
- `data-close-opened-dialogs` - (_Use it to close all previously opened dialogs (does not work if the dialog is just a window)_)

<br>

## Dialogs

Use `data-modal-dialog` to open the dialog as a modal window, as in the example below. <br>
By default, it opens as just a window.

```html
<dialog id="modalDialog" data-modal-dialog>
  Some content
  <button type="button" data-close-dialog-id>Close this!</button>
</dialog>
```

By default, clicking on the `::backdrop` causes the dialog to close. <br>
If you want to change this, set the `data-non-clickable-backdrop` attribute for one of the dialogs.
