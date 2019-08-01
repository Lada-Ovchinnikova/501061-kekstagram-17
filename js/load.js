'use strict';
(function () {
  var imageFilters = document.querySelector('.img-filters');

  var onLoadSuccess = function (data) {

    var gallery = data;
    window.picture.renderPictures(data);
    imageFilters.classList.remove('img-filters--inactive');

    window.load = {
      gallery: gallery
    };
  };

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
