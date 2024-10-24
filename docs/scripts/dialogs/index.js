export default class Dialogs {
  static dialogModalElements;
  static dialogWindowElements;
  dialogCloserAttribute = "[data-close-dialog-id]";
  dialogOpenerAttribute = "[data-open-dialog-id]";
  dialogTogglerAttribute = "[data-toggle-dialog-id]";
  modalDialogAttribute = "[data-modal-dialog]";
  constructor() {
    this.preSetButtons(
      document.querySelectorAll(
        this.dialogOpenerAttribute + "," + this.dialogCloserAttribute + "," + this.dialogTogglerAttribute
      )
    );
    this.setOpeners(document.querySelectorAll(this.dialogOpenerAttribute));
    this.setClosers(document.querySelectorAll(this.dialogCloserAttribute));
    this.setTogglers(document.querySelectorAll(this.dialogTogglerAttribute));
    Dialogs.dialogModalElements = document.querySelectorAll(
      `dialog${this.modalDialogAttribute}`
    );
    Dialogs.dialogWindowElements = document.querySelectorAll(
      `dialog:not(${this.modalDialogAttribute})`
    );
  }
  preSetButtons(buttons) {
    for (let button of buttons) {
      this.setAriaExpanded(button);
      button.setAttribute(
        "aria-controls",
        button.dataset.toggleDialogId ?? button.dataset.openDialogId ?? button.dataset.closeDialogId
      );
    }
  }
  setOpeners(openers) {
    for (let opener of openers) {
      opener.addEventListener("click", this.openDialog.bind(this));
    }
  }
  setClosers(closers) {
    for (let closer of closers) {
      closer.addEventListener("click", this.closeDialog.bind(this));
    }
  }
  setTogglers(togglers) {
    for (let toggler of togglers) {
      toggler.addEventListener("click", (event) => {
        let dialog = document.getElementById(toggler.dataset.toggleDialogId);
        dialog?.open ? this.closeDialog(event) : this.openDialog(event);
      });
    }
  }
  openDialog(event) {
    let toggler = event.currentTarget;
    let dialog = Dialogs.getDialogByData(toggler);
    if (dialog?.open || dialog?.nodeName != "DIALOG") return;
    if (dialog.dataset.modalDialog == void 0) {
      dialog.show();
      this.toggleAllDependentButtons(dialog);
      return;
    }
    Dialogs.closeAllDialogsIfSpecified(toggler, Dialogs.dialogModalElements);
    dialog.showModal();
    this.toggleBodyScroll(false);
    this.toggleAllDependentButtons(dialog);
    if (dialog.dataset.nonClickableBackdrop == void 0) {
      dialog.addEventListener("click", this.closeByClickOnBackdropEvent.bind(this));
    }
    dialog.addEventListener("cancel", (event2) => {
      this.closeDialog(event2, event2.currentTarget);
    });
  }
  closeDialog(event, currentDialog) {
    event.stopPropagation();
    let toggler = event.currentTarget;
    if (!currentDialog || currentDialog.nodeName != "DIALOG") {
      currentDialog = Dialogs.getDialogByData(toggler);
    }
    if (!currentDialog?.open || currentDialog?.nodeName != "DIALOG") return;
    currentDialog.close();
    this.toggleAllDependentButtons(currentDialog);
    if (currentDialog.dataset.modalDialog == void 0) return;
    Dialogs.closeAllDialogsIfSpecified(toggler, Dialogs.dialogModalElements);
    this.toggleBodyScroll(true);
    if (currentDialog.dataset.nonClickableBackdrop == void 0) {
      currentDialog.removeEventListener("click", this.closeByClickOnBackdropEvent.bind(this));
    }
  }
  async toggleBodyScroll(toggleScrollOn) {
    if (toggleScrollOn) {
      if (document.querySelector("dialog[data-modal-dialog][open]")) return;
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }
  static getParentDialog(clickedButton) {
    let activeDialog = clickedButton.closest("dialog");
    return activeDialog;
  }
  static getDialogByData(toggler) {
    let activeDataset;
    if (toggler.dataset.toggleDialogId) {
      activeDataset = toggler.dataset.toggleDialogId;
    } else if (toggler.dataset.openDialogId) {
      activeDataset = toggler.dataset.openDialogId;
    } else if (toggler.dataset.closeDialogId) {
      activeDataset = toggler.dataset.closeDialogId;
    }
    return document.getElementById(activeDataset) ?? this.getParentDialog(toggler);
  }
  closeByClickOnBackdropEvent(event) {
    let rect = event.currentTarget.getBoundingClientRect();
    let isClickInDialogRect = rect.top <= event.clientY && event.clientY <= rect.top + rect.height && rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
    if (!isClickInDialogRect) {
      this.closeDialog(event);
    }
  }
  setAriaExpanded(button) {
    button.ariaExpanded = Dialogs.getDialogByData(button)?.open.toString();
  }
  static closeAllDialogsIfSpecified(toggler, dialogs) {
    if (toggler.dataset.closeOpenedDialogs == void 0) return;
    for (let dialog of dialogs) {
      dialog.close();
    }
  }
  toggleAllDependentButtons(dialog) {
    for (let button of document.querySelectorAll(
      // The selector of all the buttons that affect this dialog.
      `#${dialog.id} button[data-close-dialog-id],
      button[data-open-dialog-id=${dialog.id}], 
      button[data-close-dialog-id=${dialog.id}],
      button[data-toggle-dialog-id=${dialog.id}]`
    )) {
      this.setAriaExpanded(button);
    }
  }
}
new Dialogs();
