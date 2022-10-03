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
populateInput();

//Функция записывает данные в localstorage
function onWritesDataToLocalstorage(event) {
  fotmData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fotmData));
}

//Функция отменяет перезагрузку страницы при отправке данных,
//восстанавливает стандартные значения,
//удаляет из localstorage запись с ключом,
//выводит в консоль объект с данными
function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log(fotmData);
  localStorage.removeItem(STORAGE_KEY);
  fotmData = checkStorage();
}

//Функция добавляет текст в texterea, если он был набран ранее
function populateInput() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  if (saveMessage) {
    const fotmDataSaved = JSON.parse(saveMessage);
    if (fotmDataSaved.email !== null) {
      refs.input.value = fotmDataSaved.email;
    } else {
      refs.input.value = '';
    }
    if (fotmDataSaved.message !== null) {
      refs.textarea.value = fotmDataSaved.message;
    } else {
      refs.textarea.value = '';
    }
  }
}

function checkStorage() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  if (saveMessage) {
    return JSON.parse(saveMessage);
  } else {
    return {};
  }
}
