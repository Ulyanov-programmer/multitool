import { returnScrollbarWidth, sleep } from '../general.js'

interface DialogsArgs {
  /**
   * @defaultValue `true`
   */
  closeByClickOnBackdrop?: boolean
}

export default class Dialogs {
  private static dialogOpeners: NodeListOf<HTMLElement>
  private static dialogModalElements: NodeListOf<HTMLDialogElement>
  private static dialogWindowElements: NodeListOf<HTMLElement>
  private readonly dialogActiveStateAttribute = 'open'
  private readonly dialogCloseButtonAttribute = `[data-close-dialog-id]`
  private readonly dialogDataAttribute = `[data-modal-dialog]`
  private readonly dialogActiveSelector = `dialog[${this.dialogActiveStateAttribute}]`
  private readonly dialogModalStateActiveClass = '_dialog_modal_'
  private readonly closeByClickOnBackdrop: boolean

  constructor(arg: DialogsArgs) {
    this.closeByClickOnBackdrop = arg.closeByClickOnBackdrop ?? true

    Dialogs.dialogOpeners = document.querySelectorAll('[data-open-dialog-id]')

    for (let dialogOpener of Dialogs.dialogOpeners) {
      dialogOpener.addEventListener('click', () => {
        let dialog = document.getElementById(dialogOpener.dataset.openDialogId) as HTMLDialogElement

        if (!dialog) return

        if (dialog.dataset.modalDialog)
          this.openWindowDialog(dialog)
        else
          dialogOpener.dataset.closeOpenedDialogs
            ? this.openDialog(dialog, true)
            : this.openDialog(dialog)
      })
    }


    let modalClosers = document.querySelectorAll(
      this.dialogCloseButtonAttribute
    ) as NodeListOf<HTMLElement>

    for (let modalCloser of modalClosers) {
      modalCloser.addEventListener('click', () => {
        let dialog = document.getElementById(modalCloser.dataset.closeDialogId) as HTMLDialogElement

        // If the dialog is not found and its ID is not specified, it tries to find the parent one.
        if (!dialog && modalCloser.dataset.closeDialogId == '')
          dialog = this.getParentDialog(modalCloser)

        if (!dialog) return

        if (dialog.dataset.modalDialog)
          this.closeWindowDialog(dialog)
        else
          modalCloser.dataset.closeDialogId
            ? this.closeDialog(dialog)
            : this.closeDialog(this.getParentDialog(modalCloser))
      })
    }


    Dialogs.dialogModalElements = document.querySelectorAll(
      `dialog${this.dialogDataAttribute}`
    )

    for (let dialogElement of Dialogs.dialogModalElements) {
      dialogElement.addEventListener('close', closeEvent => {
        closeEvent.preventDefault()
        this.closeDialog(dialogElement)
      })
    }


    Dialogs.dialogWindowElements = document.querySelectorAll(
      `dialog:not(${this.dialogDataAttribute})`
    )
  }


  private openDialog(dialogElement: HTMLDialogElement, closeCurrentDialogs = false) {
    if (closeCurrentDialogs) {
      for (let dialogElement of Dialogs.dialogModalElements) {
        this.closeDialog(dialogElement)
      }
    }

    this.toggleBodyScroll(false, dialogElement)
    dialogElement.showModal()
    dialogElement.classList.add(this.dialogModalStateActiveClass)

    if (this.closeByClickOnBackdrop) {
      dialogElement.addEventListener('click', this.closeByClickOnBackdropEvent.bind(this))
    }
  }
  private closeDialog(currentDialog: HTMLDialogElement) {
    if (!currentDialog || currentDialog.nodeName != 'DIALOG') return

    currentDialog.close()
    currentDialog.classList.remove(this.dialogModalStateActiveClass)
    this.toggleBodyScroll(true, currentDialog)

    if (this.closeByClickOnBackdrop) {
      currentDialog.removeEventListener('click', this.closeByClickOnBackdropEvent.bind(this))
    }
  }

  private openWindowDialog(dialogElement: HTMLDialogElement) {
    dialogElement?.show()
  }
  private closeWindowDialog(dialogElement: HTMLDialogElement) {
    dialogElement?.close()
  }


  private async toggleBodyScroll(toggleScrollOn: boolean, activeDialog: HTMLElement) {
    if (toggleScrollOn) {
      if (document.querySelector(`.${this.dialogModalStateActiveClass}`)) return

      let transitionDuration = parseFloat(
        getComputedStyle(activeDialog).transitionDuration
      ) * 1000

      await sleep(transitionDuration)

      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
    else {
      let scrollbarWidth = returnScrollbarWidth()

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = returnScrollbarWidth() + 'px'
      }

      document.body.style.overflow = 'hidden'
    }
  }

  private getParentDialog(clickedButton: HTMLElement): HTMLDialogElement {
    let activeDialog = clickedButton.closest('dialog') as HTMLDialogElement

    return activeDialog
  }

  private closeByClickOnBackdropEvent(mouseEv: PointerEvent) {
    //@ts-expect-error
    let rect = mouseEv.target.getBoundingClientRect()

    let isClickInDialogRect = (
      rect.top <= mouseEv.clientY
      && mouseEv.clientY <= rect.top + rect.height
      && rect.left <= mouseEv.clientX
      && mouseEv.clientX <= rect.left + rect.width
    )

    if (!isClickInDialogRect) {
      this.closeDialog(mouseEv.target as HTMLDialogElement)
    }
  }
}