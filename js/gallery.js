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

  var onSuccess = function (allPictures) {
    // Хранит и добавляет данные из шаблона
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderPicture(allPictures[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: grey;';
    node.style.position = 'absolute';
    node.style.top = '10px';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.style.width = '400px';
    node.style.height = '25px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.data(onSuccess, onError);
})();


