//Импорт библиотеки Лодаш
import Throttle from 'lodash.throttle';

//Имя ключа
const STORAGE_KEY = 'feedback-form-state';

//Создаем объект для хранения данных
let fotmData = checkStorage();

//Получаем ссылки на элементы
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

//Добавляем слушателя на событие
refs.form.addEventListener('submit', onFormSubmit);
//Записывает изменения 1 раз в 0,5 сек
refs.form.addEventListener('input', Throttle(onWritesDataToLocalstorage, 500));

//Вызываем фунцию, которая добавляет текст в поля ввода, если он был набран ранее
populateInputFields();

//Функция записывает данные в localstorage
function onWritesDataToLocalstorage(event) {
  fotmData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fotmData));
}

//Функция отменяет перезагрузку страницы при отправке данных,
//восстанавливает стандартные значения,
//выводит в консоль объект с данными,если заполнены все поля
//удаляет из localstorage запись с ключом,
//если заполнены не все поля - выводит сообщение и добавляет набранный текст в поле из localstorage
function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  if (JSON.parse(saveMessage).email && JSON.parse(saveMessage).message) {
    console.log(fotmData);
    localStorage.removeItem(STORAGE_KEY);
    fotmData = checkStorage();
  } else {
    alert('Please fill in all fields');
    populateInputFields();
  }
}

//Функция добавляет текст в поле ввода, если он был набран ранее
function populateInputFields() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  if (saveMessage) {
    const fotmDataSaved = JSON.parse(saveMessage);
    refs.input.value = fotmDataSaved.email || '';
    refs.textarea.value = fotmDataSaved.message || '';
  }
}

//Функция заполняет обЪект данными, если они есть в localstorage
//или создает пустой обЪект
function checkStorage() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  if (saveMessage) {
    return JSON.parse(saveMessage);
  } else {
    return {};
  }
}
