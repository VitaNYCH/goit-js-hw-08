import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  emailarea: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.emailarea.addEventListener('input', throttle(onEmailAreaInput, 1000));

refs.textarea.addEventListener('input', throttle(onTextAreaInput, 1000));

refs.form.addEventListener('input', evt => {
  formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
})

populateTextArea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onEmailAreaInput(evt) {
  const email = evt.target.value;
}

function onTextAreaInput(evt) {
  const message = evt.target.value;

}

function populateTextArea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parseMessage = JSON.parse(savedMessage);
  console.log(parseMessage);
    
  if (parseMessage) {
    refs.emailarea.value = parseMessage.email || " ";
    refs.textarea.value = parseMessage.message || " ";  
  }
}
