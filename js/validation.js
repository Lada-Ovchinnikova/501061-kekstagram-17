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

  // Проверяет на валидность
  var checkComment = function () {
    if (commentText.value.length < 140) {
      commentText.setCustomValidity('');
      return true;
    } else {
      commentText.setCustomValidity('Комментарий не должен превышать 140 символов');
      commentText.style.border = 'solid 3px rgb(255, 0, 0)';
      return false;
    }
  };

  var checkHashtagMaxLength = function (element) {
    if (element.length <= 20) {
      return {status: true};
    } else {
      return {status: false, error: 'Хэштег не должен превышать 20 символов (включая #);'};
    }
  };

  var checkHashtagMinLength = function (element) {
    if (element.length !== 1) {
      return {status: true};
    } else {
      return {status: false, error: 'Хэштег не должен состоять из одного символа;   '};
    }
  };
  var checkHashtagFirstElement = function (element) {
    if (element[0] === '#' || element === '') {
      return {status: true};
    } else {
      return {status: false, error: 'Хэштег должен начинаться с символа #'};
    }
  };

  var validationHashtags = function (hashtags) {
    var errors = [];
    var status;
    for (var i = 0; i < hashtags.length; i++) {
      var resultMaxLength = checkHashtagMaxLength(hashtags[i]);
      if (!resultMaxLength.status) {
        errors.push(resultMaxLength.error);
      }
      var resultMinLength = checkHashtagMinLength(hashtags[i]);
      if (!resultMinLength.status) {
        errors.push(resultMinLength.error);
      }
      var resultFirstElement = checkHashtagFirstElement(hashtags[i]);
      if (!resultFirstElement .status) {
        errors.push(resultFirstElement .error);
      }
      if (errors.length) {
        status = {errors: errors, number: i};
        return status;
      } else {
        status = {status: true};
      }
    }
    return status;
  };

  var checkUniqeHashtag = function (hashtagArray) {
    var isExists = {};
    var status;
    for (var i = 0; i < hashtagArray.length; i++) {
      var lowerCase = hashtagArray[i].toLocaleLowerCase();
      if (isExists[lowerCase] === undefined) {
        isExists[lowerCase] = 1;// true
        status = {status: true};
      } else {
        status = {status: false};
        return status;
      }
    }
    return status;
  };

  var isFormValid = function () {
    var hashtagArray = hashtag.value.split(' ');
    if (hashtagArray.length > 5) {
      hashtag.setCustomValidity('Количество хэштегв не должно превышать 5;');
      return false;
    }

    var resultNameValid = checkUniqeHashtag(hashtagArray);
    if (!resultNameValid.status) {
      hashtag.setCustomValidity('Хэштег не должен повторяться');
      return false;
    }

    checkComment();

    var resultValidHashtags = validationHashtags(hashtagArray);
    if (resultValidHashtags.errors) {
      hashtag.setCustomValidity((resultValidHashtags.number + 1) + 'й -' + resultValidHashtags.errors.join(''));
      return !resultValidHashtags.errors.length;
    } else {
      return true;
    }
  };

  // Находит форму и кнопку отправки
  var form = document.querySelector('.img-upload__form');
  var submitButton = document.querySelector('#upload-submit');

  // Обработчик клика по кнопке
  submitButton.addEventListener('click', function () {
    isFormValid();
  });
  form.addEventListener('submit', function (evt) {
    if (!isFormValid()) {
      evt.preventDefault();
    }
  });
})();
