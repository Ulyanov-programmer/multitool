import { returnScrollbarWidth, sleep } from './general.js'

interface DialogsArgs {
  closeByClickOnBackdrop?: boolean
}

export default class Dialogs {
  private static dialogOpeners: NodeListOf<HTMLElement>
  private static dialogModalElements: NodeListOf<HTMLDialogElement>
  private static dialogWindowElements: NodeListOf<HTMLElement>
  private readonly dialogActiveStateAttribute = 'open'
  private readonly dialogCloseButtonAttribute = `[data-close-dialog-id]`
  private readonly dialogActiveSelector = `dialog[${this.dialogActiveStateAttribute}]`
  private readonly dialogModalStateActiveClass = '_dialog_modal_'
  private readonly closeByClickOnBackdrop: boolean

  constructor(arg: DialogsArgs) {
    this.closeByClickOnBackdrop = arg.closeByClickOnBackdrop ?? true

    Dialogs.dialogOpeners = document.querySelectorAll('[data-open-dialog-id]')
    for (let dialogOpener of Dialogs.dialogOpeners) {
      dialogOpener.addEventListener('click', () => {
        let dialog = document.getElementById(dialogOpener.dataset.openDialogId) as HTMLDialogElement

        if (dialog && dialog.dataset.modalDialog != undefined) {
          if (dialogOpener.dataset.closeOpenedDialogs == undefined) {
            this.openDialog(dialog)
          } else {
            this.openDialog(dialog, true)
          }
        }
        else if (dialog) {
          this.openWindowDialog(dialog)
        }
      })
    }


    let modalClosers = document.querySelectorAll(
      this.dialogCloseButtonAttribute
    ) as NodeListOf<HTMLElement>

    for (let modalCloser of modalClosers) {
      modalCloser.addEventListener('click', () => {
        let dialog = document.getElementById(modalCloser.dataset.closeDialogId) as HTMLDialogElement

        // If the dialog is not found and its ID is not specified, it tries to find the parent one.
        if (dialog == undefined && modalCloser.dataset.closeDialogId == '') {
          dialog = this.getParentDialog(modalCloser)
        }

        if (dialog && dialog.dataset.modalDialog) {
          if (modalCloser.dataset.closeDialogId) {
            this.closeDialog(dialog)
          }
          else {
            this.closeDialog(this.getParentDialog(modalCloser))
          }
        }
        else if (dialog) {
          this.closeWindowDialog(dialog)
        }
      })
    }


    Dialogs.dialogModalElements = document.querySelectorAll('dialog[data-modal-dialog]')
    for (let dialogElement of Dialogs.dialogModalElements) {
      dialogElement.style.padding = '0'
      dialogElement.style.border = 'none'
      dialogElement.style.margin = '0'
      dialogElement.style.height = 'fit-content'
      dialogElement.style.width = 'fit-content'

      dialogElement.addEventListener('close', (closeEvent) => {
        closeEvent.preventDefault()
        this.closeDialog(dialogElement)
      })
    }

    Dialogs.dialogWindowElements = document.querySelectorAll(
      'dialog:not([data-modal-dialog])'
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
      dialogElement.addEventListener('pointerdown', this.closeByClickOnBackdropEvent.bind(this))
    }
  }
  private closeDialog(currentDialog: HTMLDialogElement) {
    currentDialog?.close()
    currentDialog.classList.remove(this.dialogModalStateActiveClass)
    this.toggleBodyScroll(true, currentDialog)

    if (this.closeByClickOnBackdrop) {
      currentDialog?.removeEventListener('pointerdown', this.closeByClickOnBackdropEvent.bind(this))
    }
  }

  private openWindowDialog(dialogElement: HTMLDialogElement) {
    dialogElement.show()
  }
  private closeWindowDialog(dialogElement: HTMLDialogElement) {
    dialogElement?.close()
  }


  private async toggleBodyScroll(toggleScrollOn: boolean, activeDialog: HTMLElement) {
    if (toggleScrollOn) {
      if (document.querySelector(`.${this.dialogModalStateActiveClass}`)) {
        return
      }

      let transitionDuration = parseFloat(
        getComputedStyle(activeDialog).transitionDuration
      ) * 1000

      await sleep(transitionDuration)

      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    } else {
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
    // ? Checks whether the dialog itself was pressed (including its ::backdoor), or its child.
    // When the dialog is active, a currentTarget will always be the dialog itself.
    if (mouseEv.target == mouseEv.currentTarget) {
      this.closeDialog(mouseEv.target as HTMLDialogElement)
    }
  }
}