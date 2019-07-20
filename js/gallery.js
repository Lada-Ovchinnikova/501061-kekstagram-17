'use strict';
(function () {
  var picturesAmount = 25;

  // Добавляет фото в массив
  var allPictures = [];
  for (var i = 0; i < picturesAmount; i++) {
    allPictures.push(window.data.createPicture(i));
  }

  // Находит элемент в который добавляются фотографии
  var similarListElement = document.querySelector('.pictures');

  // Находит шаблон который копируется
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  // Добавляет данные фото в шаблон
  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  // Хранит и добавляет данные из шаблона
  var fragment = document.createDocumentFragment();
  for (i = 0; i < allPictures.length; i++) {
    fragment.appendChild(renderPicture(allPictures[i]));
  }
  similarListElement.appendChild(fragment);
})();
