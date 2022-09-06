import throttle from 'lodash.throttle';

//Ключ к localStorage
const keyLocalStorage = 'feedback-form-state';

//Элементы формы
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

//Делегирование событий:
refs.form.addEventListener('input', throttle(onInputForm, 500));
refs.form.addEventListener('submit', onSubmit);

//Необходимо получить значения input и textarea и записать в обьект, который необходимо перезаписать в localStorage:
let formData = {};

function onInputForm(event) {
  event.preventDefault();

  formData[event.target.name] = event.target.value;
  // console.log(formData)
  localStorage.setItem(keyLocalStorage, JSON.stringify(formData));
}

//Необходимо задать значения input и textarea по умолчанию
function defaultForm() {
  const getKeyFromStorage = localStorage.getItem(keyLocalStorage);

  const keyFromStorageToObj = JSON.parse(getKeyFromStorage);

  if (keyFromStorageToObj?.email) {
    refs.input.value = keyFromStorageToObj.email;
  }
  if (keyFromStorageToObj?.message) {
    refs.textarea.value = keyFromStorageToObj.message;
  }
  if (keyFromStorageToObj) {
    formData = keyFromStorageToObj;
  }
}
defaultForm();

//При сабмите формы очищается хранилище и поля формы
function onSubmit(event) {
  event.preventDefault();

  localStorage.removeItem(keyLocalStorage);
  event.currentTarget.reset();
  console.log(formData);
}
