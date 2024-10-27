import Modal from './modal';

class LoginForm extends Modal {
  constructor(title) {
    super(title);
    this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
    this.options = {};
  }

  renderBody() {
    const html = `<form class ="card-login-form" id="card-login-form">
         ${this.renderEmailInput()}
         ${this.renderPasswordInput()}
          </form>`;
    return html;
  }

  renderEmailInput() {
    const html = `<div class="mb-3">
        ${this.renderEmailSvg()}
        <label for="email" class="form-label">Email address:</label>
        <input name="email" type="email" class="form-control card-login-input" id="email">
        <div required id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>`;
    return html;
  }

  renderEmailSvg() {
    const emailSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
        </svg>`;
    return emailSvg;
  }

  renderPasswordInput() {
    const html = `<div class="mb-3">
        ${this.renderPasswordSvg()}
        <label for="password" class="form-label">Password:</label>
        <input required name="password" type="password" class="form-control card-login-input" id="password">
      </div>`;
    return html;
  }

  renderPasswordSvg() {
    const passwordSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 16">
      <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
      <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
      </svg>`;
    return passwordSvg;
  }

  renderBtn() {
    const html = `<button type="submit" id="login-submit-btn" class="btn btn-primary d-grid gap-2 col-6 mx-auto">
        Login</button>`;
    return html;
  }

  show() {
    super.show();
    this.addListeners();
    this.form = document.getElementById('card-login-form');
  }

  addListeners() {
    this.btn = document.getElementById('login-submit-btn');
    this.btn.addEventListener('click', this.onSubmitBtnClick);
  }

  onSubmitBtnClick(e) {
    e.preventDefault();
    this.getValue();
    if (Object.values(this.options).some((v) => v === '')) return;
    this.btn.removeEventListener('click', this.onSubmitBtnClick);
    this.hide();
  }

  getValue() {
    this.options.email = this.form.elements.email.value;
    this.options.password = this.form.elements.password.value;
    return this.options;
  }
}

export default LoginForm;
