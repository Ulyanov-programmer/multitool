import { returnScrollbarWidth, sleep } from '../general.js'

interface DialogsArgs {
  /**
   * @defaultValue `true`
   */
  closeByClickOnBackdrop?: boolean
}

export default class Dialogs {
  private static dialogModalElements: NodeListOf<HTMLDialogElement>
  private static dialogWindowElements: NodeListOf<HTMLDialogElement>
  private readonly dialogActiveStateAttribute = 'open'
  private readonly dialogCloserAttribute = '[data-close-dialog-id]'
  private readonly dialogOpenerAttribute = '[data-open-dialog-id]'
  private readonly dialogTogglerAttribute = '[data-toggle-dialog-id]'
  private readonly dialogDataAttribute = '[data-modal-dialog]'
  private readonly dialogActiveSelector = `dialog[${this.dialogActiveStateAttribute}]`
  private readonly dialogModalStateActiveClass = '_dialog_modal_'
  private readonly closeByClickOnBackdrop: boolean

  constructor(arg: DialogsArgs) {
    this.closeByClickOnBackdrop = arg.closeByClickOnBackdrop ?? true

    this.setOpeners(document.querySelectorAll(this.dialogOpenerAttribute))
    this.setClosers(document.querySelectorAll(this.dialogCloserAttribute))
    this.setTogglers(document.querySelectorAll(this.dialogTogglerAttribute))

    Dialogs.dialogModalElements = document.querySelectorAll(
      `dialog${this.dialogDataAttribute}`
    )

    Dialogs.dialogWindowElements = document.querySelectorAll(
      `dialog:not(${this.dialogDataAttribute})`
    )
  }

  private setOpeners(openers: NodeListOf<HTMLElement>) {
    for (let opener of openers) {
      if (opener.dataset.typeHover != undefined) {
        this.setButtonHandlerOnHover(opener, true)
      }
      else {
        opener.addEventListener('click', this.openDialog)
      }

      this.closeOnParentPointerLeaveIfSpecified(opener as HTMLButtonElement)
    }
  }
  private setClosers(closers: NodeListOf<HTMLElement>) {
    for (let closer of closers) {
      if (closer.dataset.typeHover != undefined) {
        this.setButtonHandlerOnHover(closer, false)
      }
      else {
        closer.addEventListener('click', this.closeDialog)
      }

      this.closeOnParentPointerLeaveIfSpecified(closer as HTMLButtonElement)
    }
  }
  private setTogglers(togglers: NodeListOf<HTMLElement>) {
    for (let toggler of togglers) {
      if (toggler.dataset.typeHover != undefined) {
        this.setButtonHandlerOnHover(toggler)
        this.closeOnParentPointerLeaveIfSpecified(toggler as HTMLButtonElement)
        return
      }

      this.closeOnParentPointerLeaveIfSpecified(toggler as HTMLButtonElement)

      toggler.addEventListener('click', event => {
        let dialog = document.getElementById(toggler.dataset.toggleDialogId) as HTMLDialogElement

        dialog.open ? this.closeDialog(event) : this.openDialog(event)
      })
    }
  }

  private openDialog(event: Event) {
    let toggler = event.target as HTMLButtonElement
    let dialog = Dialogs.getDialogByData(toggler)

    if (dialog?.open || dialog.nodeName != 'DIALOG') return

    if (!dialog.dataset.modalDialog) {
      dialog.show()
      toggler.setAttribute('aria-expanded', 'true')
      return
    }

    Dialogs.closeAllDialogsIfSpecified(toggler, Dialogs.dialogModalElements)

    this.toggleBodyScroll(false, dialog)
    dialog.showModal()
    dialog.classList.add(this.dialogModalStateActiveClass)

    toggler.setAttribute('aria-expanded', 'true')

    if (this.closeByClickOnBackdrop) {
      dialog.addEventListener('click', this.closeByClickOnBackdropEvent.bind(this))
    }
  }
  private closeDialog(event: Event, currentDialog?: HTMLDialogElement) {
    let toggler = event.target as HTMLButtonElement
    let dialog

    if (currentDialog) {
      dialog = currentDialog
    }
    else if (toggler.nodeName != 'DIALOG') {
      dialog = Dialogs.getDialogByData(toggler) ?? Dialogs.getParentDialog(toggler)
    }
    else {
      dialog = toggler
    }

    if (!dialog?.open || dialog.nodeName != 'DIALOG') return

    if (!dialog.dataset.modalDialog) {
      Dialogs.closeAllDialogsIfSpecified(toggler, Dialogs.dialogWindowElements)

      dialog.close()
      toggler.setAttribute('aria-expanded', 'false')
      return
    }

    Dialogs.closeAllDialogsIfSpecified(toggler, Dialogs.dialogModalElements)

    dialog.close()
    dialog.classList.remove(this.dialogModalStateActiveClass)
    this.toggleBodyScroll(true, dialog)

    toggler.setAttribute('aria-expanded', 'false')

    if (this.closeByClickOnBackdrop) {
      dialog.removeEventListener('click', this.closeByClickOnBackdropEvent.bind(this))
    }
  }


  private setButtonHandlerOnHover(toggler: HTMLElement, toggleTo?: boolean) {
    if (toggleTo == undefined) {
      toggler.addEventListener('pointerenter', event => {
        let dialog = document.getElementById(toggler.dataset.toggleDialogId) as HTMLDialogElement

        dialog.open ? this.closeDialog(event) : this.openDialog(event)
      })

      toggler.addEventListener('keyup', event => {
        let dialog = document.getElementById(toggler.dataset.toggleDialogId) as HTMLDialogElement

        if (event.key == 'Enter') {
          dialog.open ? this.closeDialog(event) : this.openDialog(event)
        }
      })
    }
    else if (toggleTo) {
      toggler.addEventListener('pointerenter', this.openDialog)

      toggler.addEventListener('keyup', event => {
        if (event.key == 'Enter') this.openDialog(event)
      })
    }
    else {
      toggler.addEventListener('pointerenter', this.closeDialog)

      toggler.addEventListener('keyup', event => {
        if (event.key == 'Enter') this.closeDialog(event)
      })
    }
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
  private static getParentDialog(clickedButton: HTMLElement): HTMLDialogElement {
    let activeDialog = clickedButton.closest<HTMLDialogElement>('dialog')

    return activeDialog
  }
  private static getDialogByData(toggler: HTMLButtonElement) {
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
  }
  private closeByClickOnBackdropEvent(event: PointerEvent) {
    //@ts-expect-error
    let rect = event.target.getBoundingClientRect()

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
  private closeOnParentPointerLeaveIfSpecified(toggler: HTMLButtonElement) {
    if (toggler.dataset.closeOnParentPointerleave != undefined) {
      let dialog = Dialogs.getDialogByData(toggler)

      toggler.parentElement.addEventListener('pointerleave', event => {
        this.closeDialog(event, dialog)
      })
    }
  }
  private static closeAllDialogsIfSpecified(
    toggler: HTMLButtonElement, dialogs: NodeListOf<HTMLDialogElement>
  ) {
    if (toggler.dataset.closeOpenedDialogs == undefined) return

    for (let dialog of dialogs) {
      dialog.close()
    }
  }
}