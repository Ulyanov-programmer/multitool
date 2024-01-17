import { returnScrollbarWidth, sleep } from '../generalFunctions.js'

export default class Dialogs {
  private static dialogModalElements: NodeListOf<HTMLDialogElement>
  private static dialogWindowElements: NodeListOf<HTMLDialogElement>
  private readonly dialogCloserAttribute = '[data-close-dialog-id]'
  private readonly dialogOpenerAttribute = '[data-open-dialog-id]'
  private readonly dialogTogglerAttribute = '[data-toggle-dialog-id]'
  private readonly modalDialogAttribute = '[data-modal-dialog]'

  constructor() {
    this.preSetButtons(document.querySelectorAll(
      this.dialogOpenerAttribute + ','
      + this.dialogCloserAttribute + ','
      + this.dialogTogglerAttribute)
    )
    this.setOpeners(document.querySelectorAll(this.dialogOpenerAttribute))
    this.setClosers(document.querySelectorAll(this.dialogCloserAttribute))
    this.setTogglers(document.querySelectorAll(this.dialogTogglerAttribute))

    Dialogs.dialogModalElements = document.querySelectorAll(
      `dialog${this.modalDialogAttribute}`
    )

    Dialogs.dialogWindowElements = document.querySelectorAll(
      `dialog:not(${this.modalDialogAttribute})`
    )
  }

  private preSetButtons(buttons: NodeListOf<HTMLButtonElement>) {
    for (let button of buttons) {
      this.setAriaExpanded(button)

      button.setAttribute('aria-controls',
        button.dataset.toggleDialogId
        ?? button.dataset.openDialogId
        ?? button.dataset.closeDialogId)
    }
  }

  private setOpeners(openers: NodeListOf<HTMLButtonElement>) {
    for (let opener of openers) {
      opener.addEventListener('click', this.openDialog.bind(this))
    }
  }
  private setClosers(closers: NodeListOf<HTMLButtonElement>) {
    for (let closer of closers) {
      closer.addEventListener('click', this.closeDialog.bind(this))
    }
  }
  private setTogglers(togglers: NodeListOf<HTMLButtonElement>) {
    for (let toggler of togglers) {
      toggler.addEventListener('click', event => {
        let dialog = document.getElementById(toggler.dataset.toggleDialogId) as HTMLDialogElement

        dialog?.open ? this.closeDialog(event) : this.openDialog(event)
      })
    }
  }

  private openDialog(event: Event) {
    let toggler = event.currentTarget as HTMLButtonElement
    let dialog = Dialogs.getDialogByData(toggler)

    if (dialog?.open || dialog?.nodeName != 'DIALOG') return

    if (dialog.dataset.modalDialog == undefined) {
      dialog.show()
      this.toggleAllDependentButtons(dialog)

      return
    }

    Dialogs.closeAllDialogsIfSpecified(toggler, Dialogs.dialogModalElements)

    dialog.showModal()

    this.toggleBodyScroll(false, dialog)
    this.toggleAllDependentButtons(dialog)

    if (dialog.dataset.nonClickableBackdrop == undefined) {
      dialog.addEventListener('pointerdown', this.closeByClickOnBackdropEvent.bind(this))
    }

    dialog.addEventListener('cancel', event => {
      this.closeDialog(event, event.currentTarget as HTMLDialogElement)
    })
  }
  private closeDialog(event: Event, currentDialog?: HTMLDialogElement) {
    let toggler = event.currentTarget as HTMLButtonElement

    if (!currentDialog || currentDialog.nodeName != 'DIALOG') {
      currentDialog = Dialogs.getDialogByData(toggler)
    }
    if (!currentDialog?.open || currentDialog?.nodeName != 'DIALOG') return

    currentDialog.close()

    this.toggleAllDependentButtons(currentDialog)

    // if the dialog is not a modal window - return.
    if (currentDialog.dataset.modalDialog == undefined) return

    Dialogs.closeAllDialogsIfSpecified(toggler, Dialogs.dialogModalElements)

    this.toggleBodyScroll(true, currentDialog)

    if (currentDialog.dataset.nonClickableBackdrop == undefined) {
      currentDialog.removeEventListener('pointerdown', this.closeByClickOnBackdropEvent.bind(this))
    }
  }


  private async toggleBodyScroll(toggleScrollOn: boolean, dialog: HTMLElement) {
    if (toggleScrollOn) {
      if (document.querySelector('dialog[data-modal-dialog][open]')) return

      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
    else {
      let scrollbarWidth = returnScrollbarWidth()

      if (scrollbarWidth > 0)
        document.body.style.paddingRight = scrollbarWidth + 'px'

      document.body.style.overflow = 'hidden'
    }
  }
  private static getParentDialog(clickedButton: HTMLElement): HTMLDialogElement {
    let activeDialog = clickedButton.closest<HTMLDialogElement>('dialog')

    return activeDialog
  }
  private static getDialogByData(toggler: HTMLButtonElement): HTMLDialogElement {
    let activeDataset: string

    if (toggler.dataset.toggleDialogId) {
      activeDataset = toggler.dataset.toggleDialogId
    }
    else if (toggler.dataset.openDialogId) {
      activeDataset = toggler.dataset.openDialogId
    }
    else if (toggler.dataset.closeDialogId) {
      activeDataset = toggler.dataset.closeDialogId
    }

    return document.getElementById(activeDataset) as HTMLDialogElement
      ?? this.getParentDialog(toggler)
  }
  private closeByClickOnBackdropEvent(event: PointerEvent) {
    //@ts-expect-error
    let rect = event.currentTarget.getBoundingClientRect()

    let isClickInDialogRect = (
      rect.top <= event.clientY
      && event.clientY <= rect.top + rect.height
      && rect.left <= event.clientX
      && event.clientX <= rect.left + rect.width
    )

    if (!isClickInDialogRect) {
      this.closeDialog(event)
    }
  }
  private setAriaExpanded(button: HTMLButtonElement) {
    button.ariaExpanded = Dialogs.getDialogByData(button)?.open.toString()
  }
  private static closeAllDialogsIfSpecified(
    toggler: HTMLButtonElement, dialogs: NodeListOf<HTMLDialogElement>
  ) {
    if (toggler.dataset.closeOpenedDialogs == undefined) return

    for (let dialog of dialogs) {
      dialog.close()
    }
  }
  private toggleAllDependentButtons(dialog: HTMLDialogElement) {
    for (let button of document.querySelectorAll(
      // The selector of all the buttons that affect this dialog.
      `#${dialog.id} button[data-close-dialog-id],
      button[data-open-dialog-id=${dialog.id}], 
      button[data-close-dialog-id=${dialog.id}],
      button[data-toggle-dialog-id=${dialog.id}]`)
    ) {
      this.setAriaExpanded(button as HTMLButtonElement)
    }
  }
}

new Dialogs()