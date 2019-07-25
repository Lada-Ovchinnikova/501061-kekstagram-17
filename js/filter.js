'use strict';
(function () {
  var filterForm = document.querySelector('.img-filters__form');
  var filterPopular = document.querySelector('#filter-popular');
  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var getDiscPict = function () {
    window.picture.renderPictures(window.picture.data.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    }));
  };

  var getTenPict = function () {
    window.picture.renderPictures(window.picture.data.slice().sort(compareRandom).slice(0, 10));
  };

  var getPopPict = function () {
    window.picture.renderPictures(window.picture.data.slice());
  };

  var selectedElement = filterPopular;

  var setButtonColor = function (activeElement) {
    if (selectedElement) {
      selectedElement.classList.remove('img-filters__button--active');
    }
    selectedElement = activeElement;
    selectedElement.classList.add('img-filters__button--active');
  };

  filterForm.addEventListener('click', function (evt) {
    setButtonColor(evt.target);
    switch (evt.target.id) {
      case 'filter-discussed':
        window.debounce(getDiscPict);
        break;
      case 'filter-new' :
        window.debounce(getTenPict);
        break;
      case 'filter-popular' :
        window.debounce(getPopPict);
        break;
    }
  });
})();
