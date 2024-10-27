import { getDateTimeString } from './validateModal';

class Visit {
  renderInputFields() {
    const html = `<label for="fullName" class="form-label">Full name of the patient:</label>
        <input required type="text" name="fullName" id="fullName" title="Fill this field"/>
        <label for="target" class="form-label">Target of visit:</label>
        <input required type="text" name="target" id="target" title="Fill this field"/>
        <label for="description" class="form-label">Brief description of visit:</label>
        <input type="text" name="description" id="description"/>
        <label for="urgency" class="form-label">Urgency of visit:</label>
        <select required name="urgency" class="visit-form-select form-select">
            <option value="Ordinary">Ordinary</option>
            <option value="Priority">Priority</option>
            <option value="Urgent">Urgent</option>
        </select>
        <label for="date-visit" class="form-label">Date of visit:</label>
       <input required type="date" name="date-visit" id="date-visit" class="visit-form-date" min="${getDateTimeString()}" title="Choose date of visit"/>`;
    return html;
  }

  renderFields() {
    const html = `<form id="visit-form" class="visit-form">
        ${this.rendeInputFields()}
        </form>`;
    return html;
  }

  getValue() {
    this.form = document.querySelector('#visit-form');
    const inputs = this.form.querySelectorAll('input');
    this.options = {};
    const urgencyValue = this.form.querySelector('.visit-form-select').value;
    inputs.forEach((input) => {
      if (!input.hasAttribute('required') && input.value === '') {
        return;
      }
      input.value === ''
        ? (input.style.borderColor = 'red')
        : (input.style.borderColor = '#006196');
      const key = this.form.querySelector(`label[for = ${input.name}]`);
      this.options[key.textContent] = input.value;
    });

    this.changeOptionsKey(
      this.options,
      'Full name of the patient:',
      'Full name:',
    );
    this.options['Urgency:'] = urgencyValue;
    return this.options;
  }

  setValue(obj) {
    const form = document.querySelector('#visit-form');
    const urgencySelector = form.querySelector('.visit-form-select');
    const inputs = form.querySelectorAll('input');
    const fullNameInput = form.querySelector(`input[name="fullName"]`);
    inputs.forEach((input) => {
      const key = form.querySelector(`label[for= "${input.name}"]`);
      Object.keys(obj).forEach((dataKey) => {
        if (dataKey === key.textContent) {
          input.value = obj[dataKey];
        }
      });
    });

    urgencySelector.value = obj['Urgency:'];
    fullNameInput.value = obj['Full name:'];
  }

  changeOptionsKey(obj, oldKey, newKey) {
    if (obj[oldKey]) {
      Object.defineProperty(
        obj,
        newKey,
        Object.getOwnPropertyDescriptor(obj, oldKey),
      );
      delete obj[oldKey];
    }
  }
}

export default Visit;
