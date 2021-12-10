const addEditModal = (item) => `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
            <form name="addEditModal" id="addModalForm">
                <div class="modal-header">
                  <h5 class="modal-title" id="manageModalLabel">${item ? 'Редактировать тикет' : 'Добавить тикет'}</h5>
                  <button type="button" class="close" aria-label="Close" data-type="cancel">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="manageFormControlInput1" class="form-label">Краткое описание</label>
                    <input type="text" name="name" class="form-control" id="manageFormControlInput1" placeholder="Введите краткое описание" value="${item?.name ?? ''}">
                    <span class="error" data-error="name" style="display: none">Поле обязательно</span>
                  </div>
                  <div class="mb-3">
                    <label for="manageFormControlTextarea1" class="form-label">Подробное описание</label>
                    <textarea class="form-control" name="description" id="manageFormControlTextarea1" rows="3">${item?.description ?? ''}</textarea>
                    <span class="error" data-error="description" style="display: none">Поле обязательно</span>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-type="cancel">Отмена</button>
                  <button type="button" class="btn btn-primary" data-type="ok">Ok</button>
                </div>
            </form>
          </div>
        </div>
`;

export default addEditModal;
