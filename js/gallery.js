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

  var render = function (data) {
    // Хранит и добавляет данные из шаблона
    var takeNumber = data.length > 25 ? 25 : data.length;
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderPicture(data[i]));
    }
  };

  var gallery = [];

  var onLoadSuccess = function (data) {
    gallery = data;
    render(gallery);
  };


  var imageFilters = document.querySelector('.img-filters');
  imageFilters.classList.remove('img-filters--inactive');

  var filterForm = document.querySelector('.img-filters__form');

  var imageFiltersButtons = document.querySelector('.img-filters__buttons');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterPopular = document.querySelector('#filter-popular');

  var compareRandom = function (a, b) {
    return Math.random() - 0.5;
  };
  var getDiscPict = function (array) {
    array.sort(function (first, second) {
      if (first.comments > second.comments) {
        return -1;
      } else if (first.comments < second.comments) {
        return 1;
      } else {
        return 0;
      }
    });
  };
  var getPopularPict = function (array) {

  };

  var getTenPict = function (array) {
    array.sort(compareRandom);
    array.slice(0, 10);
  };

  filterForm.addEventListener('click', function (evt) {
    console.log('click');
    if (evt.target.id === 'filter-discussed') {
      getDiscPict(gallery);
    } else if (evt.target.id === 'filter-popular') {
      getPopularPict(gallery);
    } else {
      console.log('filter');
      getTenPict(gallery);
    }
  });


  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.top = '10px';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.style.height = '25px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.data.loadPhotos(onLoadSuccess, onLoadError);
})();
