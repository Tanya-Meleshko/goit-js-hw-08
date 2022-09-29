// Добавь библиотеку SimpleLightbox как зависимость проекта используя npm
//     (ссылка на CDN из твоей прошлой работы больше не нужна).
// Используй свой JavaScript код из предыдущей домашней работы,
//     но выполни рефакторинг с учетом того, что библиотека была установлена через npm
//         (синтаксис import /export).
// Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт,
//             кроме того который описан в документации.

// Описан в документации
// import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
// import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryDivEl = document.querySelector('.gallery');

const markupGallery = galleryItems
  .map(
    ({ preview, original, description }) =>
      ` <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`
  )
  .join('');

galleryDivEl.insertAdjacentHTML('beforeend', markupGallery);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
