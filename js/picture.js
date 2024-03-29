'use strict';
(function () {
  // Находит элемент в который добавляются фотографии
  var similarListElement = document.querySelector('.pictures');

  var similarPictureTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');

  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureElement.addEventListener('click', function () {
      window.preview.openModal(picture);
    });
    return pictureElement;
  };

  var renderPictures = function (data) {
    // Хранит и добавляет данные из шаблона
    var takeNumber = data.length > 25 ? 25 : data.length;

    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderPicture(data[i]));
    }
  };

  window.picture = {
    renderPictures: renderPictures
  };
})();
