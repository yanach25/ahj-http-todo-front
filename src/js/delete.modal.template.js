const deleteModalTemplate = `
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Удалить тикет</h5>
              <button type="button" class="close" aria-label="Close"  data-type="cancel">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <span>Вы уверены, что хотите удалить тикет? Это действие необратимо</span>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-type="cancel">Отмена</button>
              <button type="button" class="btn btn-primary" data-type="ok">Ok</button>
            </div>
          </div>
        </div>      
`;

export default deleteModalTemplate;
