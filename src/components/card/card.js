import Element from '../element/element';
import VisitModal from '../modal/visitModal';
import Sortable from 'sortablejs';
import { cardsContainer } from './cardsContainer';
import { deleteVisitById, updateVisit } from '../api/api';

import cardiologist from '../../asset/resource/cardiologist.jpeg';
import dentist from '../../asset/resource/dentist.jpeg';
import therapist from '../../asset/resource/therapist.jpeg';

export default class Card extends Element {
  constructor() {
    super();
    this.showMoreBtn = this.createElement(
      'button',
      [
        'card__show-more-btn',
        'btn',
        'btn-primary',
        'card__show-more-btn--closed',
      ],
      'Show more',
    );
    this.editBtn = this.createElement(
      'button',
      ['card__edit-btn', 'btn', 'btn-primary'],
      'Edit',
    );
    this.deleteBtn = this.createElement('button', [
      'btn',
      'close',
      'card__delete-btn',
    ]);
    this.cardEl = this.createElement('li', ['card__item', 'card']);
    this.cardContainer = document.querySelector('.card__list');
    this.doctorsPicture = { cardiologist, dentist, therapist };
  }

  async renderCard(cardObj) {
    this.fullData = cardObj;

    await cardsContainer.checkItemsOnPage();

    const doctor = cardObj['Doctor:'].toLowerCase();
    this.cardEl.classList.add(
      `card__item--${this.fullData['Urgency:'].toLowerCase()}`,
    );
    this.cardEl.classList.add(`card__item--${this.fullData['Status:']}`);
    this.cardEl.innerHTML = `
            <img class="card__img card-img-top" src=${this.doctorsPicture[doctor]} alt="doctor's photo">
            <div class="card-body">
              <select class="card__status">
                <option value="open">Open</option>
                <option value="done">Done</option>
              </select>
              <div class="card__info">
                <p class="card__text card-text"><span class="card__title">Full name:</span><span class="card__value"> ${cardObj['Full name:']}</span></p>
                <p class="card__text card-text"><span class="card__title">Doctor:</span><span class="card__value"> ${cardObj['Doctor:']}</span></p>
              </div>
            </div>`;
    this.deleteBtn.innerHTML =
      '<span class="card__delete-icon" aria-hidden="true">&times;</span>';
    const cardBody = this.cardEl.querySelector('.card-body');
    cardBody.append(this.showMoreBtn, this.editBtn, this.deleteBtn);
    this.cardContainer.append(this.cardEl);
    this.statusSelect = this.cardEl.querySelector('.card__status');

    this.showMoreData();
    this.removeCard();
    await this.editCard();
    this.cardStatusHandler();
    this.checkCardDate();
    this.dragAndDropCard();
  }

  renderCardWithCheck(cardObj) {
    this.renderCard(cardObj);
    this.checkCardDate();
  }

  async changeCardStatus(statusValue) {
    if (statusValue === 'done') {
      this.cardEl.classList.add('card__item--done');
      this.fullData['Status:'] = 'done';
      this.editBtn.disabled = true;
    } else if (statusValue === 'open') {
      this.cardEl.classList.remove('card__item--done');
      this.fullData['Status:'] = 'open';
      this.editBtn.disabled = false;
    } else if (statusValue === 'overdue') {
      this.cardEl.classList.add('card__item--overdue');
      this.fullData['Status:'] = 'done';
      this.editBtn.disabled = true;
      if (this.statusSelect) this.statusSelect.disabled = true;
    }
  }

  cardStatusHandler() {
    this.statusSelect = this.cardEl.querySelector('.card__status');

    this.statusSelect.addEventListener('change', async (e) => {
      await this.changeCardStatus(e.target.value);
      await updateVisit(this.fullData, this.fullData.id);
    });
  }

  checkCardDate() {
    const visitDate = new Date(this.fullData['Date of visit:']);
    const currentDate = new Date();

    if (this.statusSelect) this.statusSelect.value = this.fullData['Status:'];
    if (this.checkDatesForSameDay(visitDate, currentDate)) return;

    if (visitDate - currentDate < 0) {
      this.changeCardStatus('overdue');
    } else {
      if (this.statusSelect) this.statusSelect.disabled = false;
    }
  }

  checkDatesForSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  removeCard() {
    this.deleteBtn.addEventListener('click', async (e) => {
      await deleteVisitById(this.fullData.id);
      e.target.closest('.card__item').remove();
      await cardsContainer.checkItemsOnPage();
    });
  }

  setUrgencyClass(obj) {
    if (obj['Urgency:'] === 'Urgent') {
      this.cardEl.classList.add('card__item--urgent');
    } else {
      this.cardEl.classList.remove('card__item--urgent');
    }

    if (obj['Urgency:'] === 'Priority') {
      this.cardEl.classList.add('card__item--priority');
    } else {
      this.cardEl.classList.remove('card__item--priority');
    }

    if (obj['Urgency:'] === 'Ordinary') {
      this.cardEl.classList.add('card__item--ordinary');
    } else {
      this.cardEl.classList.remove('card__item--ordinary');
    }
  }

  renderCardInfo(obj, isShort) {
    this.fullData = obj;
    this.setUrgencyClass(obj);
    let cardInfo;

    if (isShort) {
      cardInfo = { 'Full name:': obj['Full name:'], 'Doctor:': obj['Doctor:'] };
    } else {
      const {
        ['Full name:']: fullname,
        ['Doctor:']: doctor,
        id,
        ['Status:']: status,
        ...restData
      } = this.fullData;
      cardInfo = restData;
    }

    Object.keys(cardInfo).forEach((prop) => {
      const cardDataEl = this.createElement('p', ['card__text', 'card-text']);
      cardDataEl.dataset.parametr = 'additional';
      cardDataEl.insertAdjacentHTML(
        'beforeend',
        `<span class="card__title">${prop}</span><span class="card__value"> ${obj[prop]}</span>`,
      );
      this.cardInfoEl.append(cardDataEl);
    });
  }

  showMoreData() {
    this.cardInfoEl = this.cardEl.querySelector('.card__info');

    this.showMoreBtn.addEventListener('click', async (e) => {
      e.target.classList.toggle('card__show-more-btn--closed');

      if (e.target.classList.contains('card__show-more-btn--closed')) {
        this.cardInfoEl.innerText = '';
        this.renderCardInfo(this.fullData, true);
        e.target.innerText = 'Show more';
      } else {
        this.renderCardInfo(this.fullData, false);
        e.target.innerText = 'Show less';
      }
    });
  }

  async editCard() {
    this.editBtn.addEventListener('click', async () => {
      const visitModal = new VisitModal('Edit card');
      visitModal.editCard(this.fullData, this.cardInfoEl, this);
    });
  }

  async removeCardInfo(infoBlockEl) {
    return await new Promise((resolve) => {
      infoBlockEl.innerText = '';
      // collapse the card into a short version
      this.showMoreBtn.classList.add('card__show-more-btn--closed');
      this.showMoreBtn.innerText = 'Show more';
      resolve();
    });
  }

  dragAndDropCard() {
    new Sortable(this.cardContainer, {
      animation: 450,
    });
  }
}
