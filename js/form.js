'use strict';

(function () {
// Находит эл-ты формы редактирования
  var previewPicture = document.querySelector('.img-upload__preview');
  var effectsList = document.querySelector('.effects__list');
  var sliderLine = document.querySelector('.effect-level__line');
  var slider = document.querySelector('.effect-level');
  var sliderPin = document.querySelector('.effect-level__pin');
  var valueEffect = document.querySelector('.effect-level__value');
  var filter = {
    none: function () {
      return 'none';
    },
    chrome: function (value) {
      return 'grayscale' + '(' + value + '%)';
    },
    sepia: function (value) {
      return 'sepia' + '(' + value + '%)';
    },
    marvin: function (value) {
      return 'invert' + '(' + value + '%)';
    },
    phobos: function (value) {
      return 'blur' + '(' + value * 3 / 100 + 'px)';
    },
    heat: function (value) {
      return 'brightness' + '(' + value * 3 + '%)';
    }
  };

  // Находит значение уровня фильтра
  var getEffectValue = function () {
    return Math.round(sliderPin.offsetLeft * 100 / sliderLine.clientWidth);
  };

  // Задает значение фильтра

  var setFilter = null;
  effectsList.addEventListener('change', function (evt) {
    if (evt.target.value !== 'none') {
      slider.classList.remove('hidden');
      sliderPin.style.left = 100 + '%';
      effectDepthLine.style.width = 100 + '%';
      valueEffect.value = 100;
    } else {
      slider.classList.add('hidden');
    }
    setFilter = filter[evt.target.value];
    previewPicture.style.filter = filter[evt.target.value](100);
  });

  // Находит полосу глубины эффекта
  var effectDepthLine = document.querySelector('.effect-level__depth');

  // Находит ширину (яркой желтой) полосы глубины эффекта
  var getEffectDepthLineWidth = function () {
    return Math.round(sliderPin.offsetLeft) + 'px';
  };


  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };
      // Считает смещение
      var setPosition = function () {
        if ((sliderPin.offsetLeft - shift.x) > (sliderLine.clientWidth)) {
          return sliderLine.clientWidth;
        } else if ((sliderPin.offsetLeft - shift.x) < 0) {
          return 0;
        }
        return (sliderPin.offsetLeft - shift.x);
      };
      // Задает смещение пина
      sliderPin.style.left = setPosition() + 'px';
      // Задает фильтр
      previewPicture.style.filter = setFilter(getEffectValue());
      // Считает ширину полосы глубины эффекта
      effectDepthLine.style.width = getEffectDepthLineWidth();
      // Задает значение глубины эффекта
      valueEffect.value = getEffectValue();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      previewPicture.style.filter = setFilter(getEffectValue());
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
