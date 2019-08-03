'use strict';

(function () {
  var pictureForm = document.querySelector('.img-upload__overlay');

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };
  // Находит элемент с комментарием
  var commentText = document.querySelector('.text__description');

  // Обработчик события фокус
  commentText.addEventListener('focus', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  // Обработчик события снятие фокуса
  commentText.addEventListener('blur', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  var hashtag = document.querySelector('.text__hashtags');

  // Обработчик события фокус
  hashtag.addEventListener('focus', function () {
    document.removeEventListener('keydown', onFormEscPress);
  });

  // Обработчик события снятие фокуса
  hashtag.addEventListener('blur', function () {
    document.addEventListener('keydown', onFormEscPress);
  });

  var closeForm = function () {
    pictureForm.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
  };
  //
  // // Проверяет на валидность
  // var checkComment = function () {
  //   if (commentText.value.length < 140) {
  //     commentText.setCustomValidity('');
  //     return true;
  //   } else {
  //     commentText.setCustomValidity('Комментарий не должен превышать 140 символов');
  //     commentText.style.border = 'solid 3px rgb(255, 0, 0)';
  //     return false;
  //   }
  // };

  // Проверяет на валидность
  var check1 = function () {
     hashtag.value.split(' ');
    if (hashtag.value.length < 20) {
      hashtag.setCustomValidity('');
      return true;
    } else {
      hashtag.setCustomValidity('Хэштег не должен превышать 20 символов (включая #)');
      hashtag.style.border = 'solid 3px rgb(255, 0, 0)';
      return false;
    }
  };
  var check2 = function () {
    var hasharray = hashtag.value.split(' ');
    if (hasharray.length < 4) {
      hashtag.setCustomValidity('');
      return true;
    } else {
      hashtag.setCustomValidity('Количество хэштегв не должно превышать 5');
      hashtag.style.border = 'solid 3px rgb(255, 0, 0)';
      return false;
    }
  };
  var check3 = function () {
    hashtag.value.split(' ');
    if (hashtag.value.match(/^#/i)) {
      hashtag.setCustomValidity('');
      return true;
    } else {
      hashtag.setCustomValidity('хэштег должен начинаться с символа #');
      // hashtag.style.border = 'solid 3px rgb(255, 0, 0)';
      return false;
    }
  };
  var check4 = function () {
    hashtag.value.split(' ');
    // проверятк на длину
    if (hashtag.value.length > 2 ) {
      hashtag.setCustomValidity('');
      return true;
    } else {
      hashtag.setCustomValidity('Хэштег не должен состоять из одного символа');
      hashtag.style.border = 'solid 3px rgb(255, 0, 0)';
      return false;
    }
  };

  var getValidation = function () {
    return (check1() && check2() && check3() && check4());
  };

  // Находит форму и кнопку отправки
  var form = document.querySelector('.img-upload__form');
  var submitButton = document.querySelector('#upload-submit');

  // // // Обработчик клика по кнопке
  submitButton.addEventListener('click', function () {
    getValidation();
  });

  form.addEventListener('submit', function (evt) {
    if (!getValidation()) {
      evt.preventDefault();
    }
  });
})();

