'use strict';
(function () {

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
  window.load(function (allPictures) {
    // Хранит и добавляет данные из шаблона
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderPicture(allPictures[i]));
    }
    similarListElement.appendChild(fragment);
  });

})();


