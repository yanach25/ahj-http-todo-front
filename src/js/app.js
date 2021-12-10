import 'bootstrap/dist/css/bootstrap.min.css';
import HttpService from './http.service';
import generateItem from './generate-item';
import AddEditModal from './add-edit.modal';
import DeleteModal from './delete.modal';

class App {
  constructor(httpService) {
    this.httpService = httpService;
    this.registerListeners();
    this.init();
  }

  init() {
    this.httpService.getAll().then((list) => {
      this.list = list;
      App.renderList(list);
    });
  }

  registerListeners() {
    this.watchClick();
    this.watchAddNew();
    this.watchEditItem();
    this.watchDelete();
  }

  closeModal() {
    this.modal?.close();
    this.modal = null;
  }

  watchAddNew() {
    document.addEventListener('addNew', (event) => {
      this.httpService.addNew(event.detail).then((res) => {
        const listGroup = document.querySelector('.list-group');
        listGroup.appendChild(App.generateListItemEl(res));
        this.list.push(res);
        this.closeModal();
      }).catch((err) => {
        console.error(err);
      });
    });
  }

  watchDelete() {
    document.addEventListener('deleteItem', (event) => {
      this.httpService.deleteItem(event.detail).then(() => {
        let item = document.querySelector(`[data-id="${event.detail}"]`);
        item.remove();
        const index = this.list.findIndex((currItem) => currItem.id === event.detail);
        this.list.splice(index, 1);
        this.closeModal();
      }).catch((err) => {
        console.error(err);
      });
    });
  }

  watchEditItem() {
    document.addEventListener('editItem', (event) => {
      this.httpService.editItem(event.detail).then((res) => {
        let item = document.querySelector(`[data-id="${res.id}"]`);
        item.parentNode.replaceChild(App.generateListItemEl(res), item);
        const index = this.list.findIndex((currItem) => currItem.id === res.id);
        this.list[index] = res;
        this.closeModal();
      }).catch((err) => {
        console.error(err);
      });
    });
  }

  watchClick() {
    document.addEventListener('click', (event) => {
      const btn = event.target.closest('button');
      const input = event.target.closest('input');
      const listItem = event.target.closest('.list-group-item');
      if (btn) {
        event.preventDefault();
        const type = btn.dataset?.type;
        if (type) {
          this.doActionClickBtn(event, type);
        }
      } else if (input && input.type === 'checkbox') {
        this.saveCheckboxChanges(input);
      } else if (listItem) {
        this.showDetails(listItem);
      }
    });
  }

  saveCheckboxChanges(el) {
    const listItem = el.closest('.list-group-item');
    const { id } = listItem.dataset;
    this.httpService.getById(id).then((res) => {
      res.status = !res.status;
      document.dispatchEvent(new CustomEvent('editItem', { detail: res }));
    });
  }

  static renderList(list) {
    const listGroup = document.querySelector('.list-group');

    list.forEach((item) => {
      listGroup.appendChild(App.generateListItemEl(item));
    });
  }

  static generateListItemEl(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('list-group-item');
    itemEl.dataset.id = item.id;
    itemEl.innerHTML = generateItem(item);

    return itemEl;
  }

  doActionClickBtn(event, type) {
    const listItem = event.target.closest('.list-group-item');
    const id = listItem?.dataset.id;

    switch (type) {
      case 'add':
        this.modal = new AddEditModal();
        this.modal.show();
        break;
      case 'edit':
        this.httpService.getById(id).then((res) => {
          this.modal = new AddEditModal(res);
          this.modal.show();
        });
        break;
      case 'delete':
        this.modal = new DeleteModal(id);
        this.modal.show();
        break;
      default:
        break;
    }
  }

  showDetails(listItem) {
    const { id } = listItem.dataset;
    const description = listItem.querySelector('.description');

    if (description) {
      description.remove();
    } else {
      this.httpService.getById(id).then((res) => {
        const descriptionEl = document.createElement('div');
        descriptionEl.classList.add('row');
        descriptionEl.classList.add('description');
        descriptionEl.innerHTML = `
          <div class="col-1"></div>
          <div class="col-11">${res.description}</div>
        `;
        listItem.appendChild(descriptionEl);
      });
    }
  }
}

const httpService = new HttpService();
// eslint-disable-next-line no-new
new App(httpService);
