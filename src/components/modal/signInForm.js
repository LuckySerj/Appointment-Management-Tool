import LoginForm from './loginForm';

export default class SignInForm extends LoginForm {
  constructor(title) {
    super(title);
    this.options = {};
  }

  renderConfirmPasswordInput() {
    const html = `<div class="mb-3">
        ${this.renderPasswordSvg()}
        <label for="confirmPassword" class="form-label">Confirm Password:</label>
        <input required name="confirmPassword" type="password" class="form-control card-login-input" id="confirmPassword">
        <p class="verifyPassword"></p>
      </div>`;
    return html;
  }

  renderBody() {
    const html = `<form class ="card-login-form" id="card-login-form">
         ${this.renderEmailInput()}
         ${this.renderPasswordInput()}
         ${this.renderConfirmPasswordInput()}
          </form>`;
    return html;
  }

  renderBtn() {
    const html = `<button type="submit" id="signIn-submit-btn" class="btn btn-primary d-grid gap-2 col-6 mx-auto">
        Sign In</button>`;
    return html;
  }

  addListeners() {
    this.btn = document.getElementById('signIn-submit-btn');
    this.btn.addEventListener('click', this.onSubmitBtnClick);
  }

  onSubmitBtnClick(e) {
    e.preventDefault();

    if (this.getValue()) {
      this.getValue();
    } else {
      return;
    }
    if (Object.values(this.options).some((v) => v === '')) return;
    this.btn.removeEventListener('click', this.onSubmitBtnClick);
    this.hide();
  }

  getValue() {
    if (
      this.form.elements.password.value !==
      this.form.elements.confirmPassword.value
    ) {
      const verifyPassword = document.querySelector('.verifyPassword');
      verifyPassword.innerHTML = "Your password doesn't match";
      return false;
    }
    this.options.email = this.form.elements.email.value;
    this.options.password = this.form.elements.password.value;
    return this.options;
  }
}
