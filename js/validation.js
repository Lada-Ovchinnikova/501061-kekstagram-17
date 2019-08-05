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
  // // //
  // // // // Проверяет на валидность
  // // // var checkComment = function () {
  // // //   if (commentText.value.length < 140) {
  // // //     commentText.setCustomValidity('');
  // // //     return true;
  // // //   } else {
  // // //     commentText.setCustomValidity('Комментарий не должен превышать 140 символов');
  // // //     commentText.style.border = 'solid 3px rgb(255, 0, 0)';
  // // //     return false;
  // // //   }
  // // // };
  // //
// || element.length = 0
//
  // Проверяет на валидность
  var check1 = function (element) {
    console.log(element.length);
    if (element.length <= 20) {
      return {status: true};
    } else {
      return {status: false, error: 'Хэштег не должен превышать 20 символов (включая #);'};
    }
  };

  var check3 = function (element) {
    if (element.length !== 1) {
      return {status: true};
    } else {
      return {status: false, error: 'Хэштег не должен состоять из одного символа;   '};
    }
  };
  var check4 = function (element) {
    if (element.value[0] === '#') {
      return {status: true};
    } else {
      return {status: false, error: 'Хэштег должен начинаться с символа #'};
    }
  };
  var checkForEachElement = function () {
    var hashtagArray = hashtag.value.split(' ');

    for (var i = 0; i < hashtagArray.length; i++) {
      check1(hashtagArray[i]);
      check3(hashtagArray[i]);
      check4(hashtagArray[i]);

    }
  }
  var check4 = function (hasharray) {

    for(var k = 0; k < hasharray.length; k++) {
      for (var i = k +1 ; i < hasharray.length; i++) {
        if (hasharray[i] === hasharray[k]) {
          return {status: false, error: 'Хэштег не должен повторяться'};
        }
      }
    }

    return {status: true}
  };

  var checkMy4 = function (hasharray) {
    var isExists = {}

    for (var i = 0; i < hasharray.length; i++) {
      if (hasharray[hasharray[i]] === undefined) {
        isExists[hasharray[i]] = 1// true
      } else {
        return {status: false, error: 'Хэштег не должен повторяться'};
      }
    }

    return {status: false}
  }

  function validationHashtags(hashtags) {
    var errors = []
    for (var i = 0; i < hashtags.length; i++) {
      var resultValidName1 = check1(hashtags[i]);
      if(!isValidName1.status) {
        errors.push(isValidName1.error)
      }
      check3(hashtags[i]);
      check4(hashtags[i]);
      if(errors.length) {
        return {errors:errors, number:i}
      }
    }
    return  {errors:errors, number:i}
  }


  var isFormValid = function () {
    //var result = [check1(), check2()];
    var hashtagArray = hashtag.value.split(' ');

    if(hashtagArray.length>5) {
      hashtag.setCustomValidity(',jkmit 5');
      return false;
    }

    var resultNameValid = checkMy4()
     if(!resultNameValid.status) {
       hashtag.setCustomValidity('repeat ');
       return false;
     }

    var resultValidHashtags = validationHashtags(hashtagArray);
    hashtag.setCustomValidity(resultValidHashtags.errors.join('hashtag number:£' + (resultValidHashtags.number + 1)+ resultValidHashtags.errors.join(' ')));
    return !resultValidHashtags.errors.length;
  };
  // Находит форму и кнопку отправки
  var form = document.querySelector('.img-upload__form');
  var submitButton = document.querySelector('#upload-submit');

  // // Обработчик клика по кнопке
  submitButton.addEventListener('click', function (e) {
    if (!isFormValid()) {
      e.preventDefault();
    }
  });
})();
