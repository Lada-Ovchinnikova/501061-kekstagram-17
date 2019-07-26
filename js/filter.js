'use strict';
(function () {
  var filterForm = document.querySelector('.img-filters__form');
  var filterPopular = document.querySelector('#filter-popular');
  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var getDiscPictures = function () {
    var sortedPictures = window.picture.data.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    window.picture.renderPictures(sortedPictures);
  };

  var getTenPictures = function () {
    var copiedArray = window.picture.data.slice();
    var newArray = [];
    for (var i = 0; i < 10; i++) {
      var rand = Math.floor(Math.random() * copiedArray.length);
      console.log(rand);
      var element = copiedArray.splice(rand, 1);
      console.log(element);
      newArray.push(element);
    }

    window.picture.renderPictures(newArray);
  };

  var getPopPictures = function () {
    window.picture.renderPictures(window.picture.data);
  };

  var selectedElement = filterPopular;

  var setButtonColor = function (activeElement) {
    selectedElement.classList.remove('img-filters__button--active');
    selectedElement = activeElement;
    selectedElement.classList.add('img-filters__button--active');
  };


  filterForm.addEventListener('click', function (evt) {

    setButtonColor(evt.target);
    switch (evt.target.id) {
      case 'filter-discussed':
        window.debounce(getDiscPictures);
        break;
      case 'filter-new' :
        window.debounce(getTenPictures);
        break;
      case 'filter-popular' :
        window.debounce(getPopPictures);
        break;
    }
  });
})();
