'use strict';
(function () {
  var filterForm = document.querySelector('.img-filters__form');
  var filterPopular = document.querySelector('#filter-popular');

  var getDiscussedPictures = function () {
    var sortedPictures = window.picture.data.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    window.picture.renderPictures(sortedPictures);
  };

  var getNewPictures = function () {
    debugger
    var copiedArray = window.picture.data.slice();
    var sortedPictures = [];
    for (var i = 0; i < 10; i++) {
      var randomNumber = Math.floor(Math.random() * copiedArray.length);
      var onePicture = copiedArray.splice(randomNumber, 1);
      sortedPictures.push(onePicture[0]);
    }
    window.picture.renderPictures(sortedPictures);
  };

  var getPopularPictures = function () {
    var sortedPictures = window.picture.data;
    window.picture.renderPictures(sortedPictures);
  };

  var selectedElement = filterPopular;
  var setButtonColor = function (activeElement) {
    selectedElement.classList.remove('img-filters__button--active');
    selectedElement = activeElement;
    selectedElement.classList.add('img-filters__button--active');
  };


  filterForm.addEventListener('click', function (evt) {
    var pictures = document.querySelectorAll('.picture');

    window.array = Array.from(pictures);
    for (var i = 0; i < window.array.length; i++) {
      window.array[i].remove();
    }
    setButtonColor(evt.target);
    switch (evt.target.id) {
      case 'filter-discussed':
        window.debounce(getDiscussedPictures);
        break;
      case 'filter-new' :
        window.debounce(getNewPictures);
        break;
      case 'filter-popular' :
        window.debounce(getPopularPictures);
        break;
    }
  });

})();


