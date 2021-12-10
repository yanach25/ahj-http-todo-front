import deleteModalTemplate from './delete.modal.template';

export default class DeleteModal {
  constructor(id) {
    this.id = id;
    this.watchClickBtn();
    this.template = deleteModalTemplate;
  }

  show() {
    document.getElementById('backdrop').style.display = 'block';
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.classList.add('fade');
    this.modal.setAttribute('id', 'deleteConfirmation');
    this.modal.setAttribute('tabindex', '-1');
    this.modal.setAttribute('aria-labelledby', 'deleteModalLabel');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('role', 'dialog');
    this.modal.innerHTML = this.template;
    document.body.appendChild(this.modal);
    this.modal.style.display = 'block';
    this.modal.classList.add('show');
  }

  close() {
    document.removeEventListener('click', this.listener);
    document.getElementById('backdrop').style.display = 'none';
    this.modal.remove();
  }

  watchClickBtn() {
    this.listener = (event) => {
      const btn = event.target.closest('button');

      if (btn) {
        event.preventDefault();
        const type = btn.dataset?.type;
        if (type) {
          this.doActionClickBtn(event, type);
        }
      }
    };

    document.addEventListener('click', this.listener);
  }

  doActionClickBtn(event, type) {
    if (type === 'cancel') {
      this.close();
    } else {
      document.dispatchEvent(new CustomEvent('deleteItem', { detail: this.id }));
    }
  }
}
