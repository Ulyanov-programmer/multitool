import Dialogs from './dialogs.src.js'
/*
  Includes a set of scripts for convenient work with dialog boxes.
  ! Mark your dialogs that should open as modal windows with the [data-modal-dialog]

  Please note, for buttons that:
   should open a dialog, assign
    ? [data-open-dialog-id="yourId"]
   should close a parent (dialog with a close button inside it), assign
    ? [data-close-dialog-id]
   should close a specific dialog, assign
    ? [data-close-dialog-id="yourId"]
   should open a dialog and close all previously opened ones, assign
    ? [data-close-opened-dialogs]

*/
new Dialogs({
  closeByClickOnBackdrop: true,
})