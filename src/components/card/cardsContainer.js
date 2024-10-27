import Element from '../element/element';
import { header } from '../../index';
import { getData } from '../api/api';

class CardsContainer extends Element {
  constructor() {
    super();
    this.createCardsContainer();
  }

  createCardsContainer() {
    const root = document.querySelector('#root');
    root.insertAdjacentHTML(
      'beforeend',
      '<div class="card__field"><ul class="card__list"></ul></div>',
    );
  }

  async checkItemsOnPage() {
    await getData().then((data) => {
      header.renderAddVisitTitle(data);
    });
  }
}

const cardsContainer = new CardsContainer();
export { cardsContainer };
