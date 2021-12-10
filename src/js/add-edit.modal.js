import addEditModal from './add-edit.modal.template';

export default class AddEditModal {
  constructor(item) {
    this.watchClickBtn();
    this.item = item;
    this.template = addEditModal(item);
  }

  show() {
    document.getElementById('backdrop').style.display = 'block';
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.classList.add('fade');
    this.modal.setAttribute('id', 'newOrEdit');
    this.modal.setAttribute('tabindex', '-1');
    this.modal.setAttribute('aria-labelledby', 'manageModalLabel');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('role', 'dialog');
    this.modal.innerHTML = this.template;
    document.body.appendChild(this.modal);
    this.modal.style.display = 'block';
    this.modal.classList.add('show');

    this.watchFormChanges();
  }

  close() {
    document.removeEventListener('click', this.listener);
    document.removeEventListener('input', this.formChangesListener);
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

  static validateField(name, value) {
    const errEl = document.querySelector(`[data-error="${name}"]`);
    errEl.style.display = value ? 'none' : 'block';
  }

  watchFormChanges() {
    const form = document.querySelector('#addModalForm');
    this.formChangesListener = (event) => {
      const { name } = event.target;
      AddEditModal.validateField(name, event.target.value);
    };

    form.addEventListener('input', this.formChangesListener);
  }

  doActionClickBtn(event, type) {
    if (type === 'cancel') {
      this.close();
    } else {
      this.submitForm();
    }
  }

  submitForm() {
    const formData = new FormData(document.forms.addEditModal);
    const keys = Array.from(formData.keys());

    const data = this.item ?? {};
    let valid = true;

    keys.forEach((key) => {
      data[key] = formData.get(key);
      AddEditModal.validateField(key, data[key]);
      if (valid) {
        valid = !!data[key];
      }
    });

    if (valid) {
      document.dispatchEvent(new CustomEvent(this.item ? 'editItem' : 'addNew', { detail: data }));
    }
  }
}
