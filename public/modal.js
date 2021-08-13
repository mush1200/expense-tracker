document.querySelector('#data-panel').addEventListener('click', (event) => {
  // delete confirm modal
  if (event.target.classList.contains('btn-delete')) {
    document.querySelector('#delete-modal-body').innerHTML = `確定要刪除 ${event.target.dataset.info} 嗎？`
    document.querySelector('#delete-form').action = `/records/${event.target.dataset.id}?_method=DELETE`
  }
})