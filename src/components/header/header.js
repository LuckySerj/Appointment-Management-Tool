import Element from '../element/element';
import logo from '../../asset/resource/logo.webp';
import VisitModal from '../modal/visitModal';
import LoginForm from '../modal/loginForm';
import SignInForm from '../modal/signInForm';
import { getData, getUser, addUser } from '../api/api';
import Card from '../card/card';

export default class Header extends Element {
  constructor() {
    super();
    this.init();
  }

  authorization() {
    this.loginBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.textContent === 'Login') {
        this.loginForm = new LoginForm('Welcome');
        this.loginForm.show();
        this.checkEmailAndPassword();
      } else {
        document.querySelector('.card__list').innerText = '';
        localStorage.removeItem('isLogged');
        this.loginBtn.innerText = 'Login';
        if (this.signInBtn) {
          this.signInBtn.classList.remove('hide');
        }
        this.addVisitBtn.classList.add('hide');
        if (this.greeting) {
          this.greeting.remove();
        }
      }
    });
  }

  signIn() {
    if (this.signInBtn) {
      this.signInBtn.addEventListener('click', (e) => {
        e.preventDefault();

        this.signInForm = new SignInForm('Welcome');
        this.signInForm.show();
        this.registerNewUser();
      });
    }
  }

  addVisit() {
    if (this.addVisitBtn) {
      this.addVisitBtn.addEventListener('click', () => {
        const modal = new VisitModal('Create visit');
        modal.show();
      });
    }
  }

  greetingText(name) {
    this.greeting = this.createElement(
      'h3',
      ['title'],
      `Welcome ${name[0].toUpperCase() + name.slice(1)}`,
    );
    document.querySelector('.btn__group').before(this.greeting);
  }

  renderHeader() {
    this.header = this.createElement('header', ['header']);
    document.querySelector('#root').prepend(this.header);
    this.header.insertAdjacentHTML(
      'afterbegin',
      `
            <a href="" target="_blank">
              <img src=${logo} alt="logo" class="logo">
            </a>`,
    );
  }

  render() {
    if (localStorage.getItem('isLogged')) {
      this.renderHeader();
      const btnContainer = this.createElement('div', ['btn__group']);
      this.header.append(btnContainer);
      this.addVisitBtn = this.createElement(
        'button',
        ['btn', 'btn-success', 'add-visit-btn'],
        'New visit',
      );
      this.loginBtn = this.createElement(
        'button',
        ['btn', 'btn-secondary', 'login-btn'],
        'Logout',
      );
      this.signInBtn = this.createElement(
        'button',
        ['btn', 'btn-secondary', 'signIn-btn', 'hide'],
        'Sign in',
      );
      btnContainer.append(this.addVisitBtn, this.loginBtn, this.signInBtn);
      this.renderPageAfterLogin();
      this.greetingText(localStorage.getItem('user'));
    }
    if (
      !localStorage.getItem('isLogged') ||
      localStorage.getItem('isLogged') === 'false'
    ) {
      this.renderHeader();
      const btnContainer = this.createElement('div', ['btn__group']);
      this.header.append(btnContainer);
      this.addVisitBtn = this.createElement(
        'button',
        ['btn', 'btn-success', 'add-visit-btn', 'hide'],
        'New visit',
      );
      btnContainer.append(this.addVisitBtn);
      this.loginBtn = this.createElement(
        'button',
        ['btn', 'btn-secondary', 'login-btn'],
        'Login',
      );
      this.signInBtn = this.createElement(
        'button',
        ['btn', 'btn-secondary', 'signIn-btn'],
        'Sign in',
      );
      btnContainer.append(this.loginBtn, this.signInBtn);
    }
  }

  renderUserName(name) {
    let userName = name.split('@');
    this.userName = userName[0].toString();
    localStorage.setItem('user', this.userName);
    return this.userName;
  }

  checkEmailAndPassword() {
    this.mail = document.querySelector('#email');
    const password = document.querySelector('#password');
    const submitAuthorizationBtn = document.querySelector('#login-submit-btn');

    submitAuthorizationBtn.addEventListener('click', async () => {
      const users = await getUser();
      const user = users.find((user) => user.username === this.mail.value);

      if (user && user.password === password.value) {
        this.renderPageAfterLogin();
        this.renderUserName(this.mail.value);
        this.loginBtn.innerText = 'Logout';
        this.addVisitBtn.classList.remove('hide');
        if (this.signInBtn) {
          this.signInBtn.classList.add('hide');
        }
        localStorage.setItem('isLogged', 'true');
        this.greetingText(this.userName);
        this.loginForm.hide();
      }
    });
  }

  registerNewUser() {
    this.options = {};
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const submitSignInBtn = document.querySelector('#signIn-submit-btn');

    submitSignInBtn.addEventListener('click', async () => {
      this.options.username = email.value;
      this.options.password = password.value;

      await addUser(this.options);

      this.renderPageAfterLogin();
      this.renderUserName(email.value);
      this.loginBtn.innerText = 'Logout';
      this.addVisitBtn.classList.remove('hide');
      this.signInBtn.classList.add('hide');
      localStorage.setItem('isLogged', 'true');
      this.greetingText(this.userName);
      this.signInForm.hide();
    });
  }

  renderAddVisitTitle(items) {
    const cardField = document.querySelector('.card__field');

    if (items.length === 0) {
      const title = this.createElement(
        'h2',
        ['visit__title'],
        'Please add your first visit',
      );
      cardField.append(title);
    } else {
      const visitTitle = cardField.querySelector('.visit__title');
      if (visitTitle) visitTitle.remove();
    }
  }

  renderPageAfterLogin() {
    getData().then((data) => {
      this.renderAddVisitTitle(data);
      data.map((item) => {
        const card = new Card();
        card.renderCardWithCheck(item);
      });
    });
  }

  filterItems() {
    const input = document.querySelector('.filter__item');
    const searchBtn = document.querySelector('.search-btn');
    const isDoneSelectBtn = document.querySelector(
      '.form-select__filter--done',
    );
    const priorityBtn = document.querySelector(
      '.form-select__filter--priority',
    );

    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const filteredItems = document.querySelectorAll('.card__item');
      filteredItems.forEach((item) => {
        item.closest('.card__item').classList.remove('hide');

        // filter by input
        if (
          item.textContent.toLowerCase().indexOf(input.value.toLowerCase()) ===
          -1
        ) {
          item.closest('.card__item').classList.add('hide');
        }
        // selector isDone
        if (isDoneSelectBtn.value === 'open') {
          if (item.classList.contains('card__item--done')) {
            item.closest('.card__item').classList.add('hide');
          }
        }
        if (isDoneSelectBtn.value === 'done') {
          if (!item.classList.contains('card__item--done')) {
            item.closest('.card__item').classList.add('hide');
          }
        }
        // priority select
        if (priorityBtn.value === 'high') {
          if (!item.classList.contains('card__item--urgent')) {
            item.closest('.card__item').classList.add('hide');
          }
        }
        if (priorityBtn.value === 'normal') {
          if (!item.classList.contains('card__item--priority')) {
            item.closest('.card__item').classList.add('hide');
          }
        }
        if (priorityBtn.value === 'low') {
          if (!item.classList.contains('card__item--ordinary')) {
            item.closest('.card__item').classList.add('hide');
          }
        }
      });
    });
  }

  init() {
    this.render();
    this.authorization();
    this.signIn();
    this.addVisit();
  }
}
