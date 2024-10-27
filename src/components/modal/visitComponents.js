import Visit from './visit';
import { getDateTimeString, checkVisitValue } from './validateModal';

class VisitDentist extends Visit {
  constructor() {
    super();
  }

  renderFields() {
    const html = `<form id="visit-form" class="visit-form">
        ${super.renderInputFields()}
        ${this.renderAdditionalFields()}
        </form>`;
    return html;
  }

  renderAdditionalFields() {
    const html = `<label for="last-visit" class="form-label">Date of last visit:</label>
           <input required type="date" name="last-visit" id="last-visit" class="visit-form-date" max="${getDateTimeString()}" title="Choose date of last visit"/>`;
    return html;
  }
}

class VisitCardiologist extends Visit {
  constructor() {
    super();
  }

  renderFields() {
    const html = `<form id="visit-form" class="visit-form">
        ${super.renderInputFields()}
        ${this.renderAdditionalFields()}
        </form>`;
    return html;
  }
  renderAdditionalFields() {
    const html = `<label for="pressure" class="form-label">Normal pressure:</label>
        <input required type="text" name="pressure" id="pressure" min="50" max="160" title="Add value from 50 till 160" placeholder="value from 50 till 160"/>
        <label for="body-mass-index" class="form-label">Body mass index:</label>
        <input required type="number" name="body-mass-index" id="body-mass-index" min="16" max="40" title="Add value from 16 till 40" placeholder="value from 16 till 40"/>
        <label for="cardiovascular-diseases" class="form-label"
            >Transferred diseases of the cardiovascular system:</label>
        <input required type="text" name="cardiovascular-diseases" id="cardiovascular-diseases" title="Fill this field"/>
        <label for="age" class="form-label">Age:</label> 
        <input required type="number" name="age" id="age" min="0" max="200" title="Add value from 0" placeholder="value from 0"/>`;
    return html;
  }
  getValue() {
    super.getValue();
    const form = document.querySelector('#visit-form');
    this.options['Normal pressure:'] = checkVisitValue(
      form.elements.pressure,
      50,
      160,
    );
    this.options['Body mass index:'] = checkVisitValue(
      form.elements['body-mass-index'],
      16,
      40,
    );
    this.options['Age:'] = checkVisitValue(form.elements.age, 0, 200);
    return this.options;
  }
}

class VisitTherapist extends Visit {
  constructor() {
    super();
  }

  renderFields() {
    const html = `<form id="visit-form" class="visit-form">
        ${super.renderInputFields()}
        ${this.renderAdditionalFields()}
        </form>`;
    return html;
  }
  renderAdditionalFields() {
    const html = `<label for="age" class="form-label">Age:</label> 
       <input required type="number" name="age" id="age" min="0" max="200" title="Add value from 0 till 200" placeholder="value from 0"/>`;
    return html;
  }

  getValue() {
    super.getValue();
    const form = document.querySelector('#visit-form');
    this.options['Age:'] = checkVisitValue(form.elements.age, 0, 200);
    return this.options;
  }
}

export { VisitDentist, VisitCardiologist, VisitTherapist };
