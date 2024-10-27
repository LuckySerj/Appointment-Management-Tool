import Element from '../element/element';

export default class Modal extends Element {
  constructor(title) {
    super();
    this.title = title;
    this.modalContainer = this.createElement('div', [
      'card-modal',
      'modal',
      'fade',
      'show',
    ]);
    this.modalBackDrop = this.createElement('div', [
      'card-modal__backdrop',
      'modal-backdrop',
    ]);
    this.onModalClick = this.onModalClick.bind(this);
  }

  createMarkup() {
    this.html = `<div class="modal-dialog modal-dialog-centered">
              <div class="modal-content card-modal-content">
                <div class="modal-header card-modal-header">
                  <h5 class="modal-title card-modal-title">${this.title}</h5>
                  <button type="button" data-bs-dismiss="modal" class="btn close modal-close-btn" aria-label="Close">
                  <span class="modal-close-icon">&times;</span aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                ${this.renderBody()}
                </div>
                <div class="modal-footer card-modal-footer">
                ${this.renderBtn()}
                </div>
              </div>
          </div>`;
    return this.html;
  }

  render() {
    document.body.classList.add('modal-open');
    this.modalContainer.insertAdjacentHTML('beforeend', this.createMarkup());
    document
      .getElementById('root')
      .prepend(this.modalContainer, this.modalBackDrop);
  }

  renderBody() {
    return '';
  }

  renderBtn() {
    return '';
  }

  show() {
    this.render();
    this.addCloseListener();
  }

  hide() {
    document.body.classList.remove('modal-open');
    this.modalContainer.innerHTML = '';

    this.modalContainer.remove();
    this.modalBackDrop.remove();
    this.removeCloseListener();
  }

  addCloseListener() {
    this.modalContainer.addEventListener('click', this.onModalClick);
  }

  removeCloseListener() {
    this.modalContainer.removeEventListener('click', this.onModalClick);
  }

  onModalClick(e) {
    if (
      e.target === this.modalContainer ||
      e.target === this.modalContainer.querySelector('.modal-close-icon')
    )
      this.hide();
  }
}
