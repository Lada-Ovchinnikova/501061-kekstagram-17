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
    if (element.length < 20) {
      return {status: true};
    } else {
      return {status: false, error: 'Хэштег не должен превышать 20 символов (включая #);   '};
    }
  };
  var check2 = function (array) {
    if (array.length < 4) {
      return {status: true};
    } else {
      return {status: false, error: 'Количество хэштегв не должно превышать 5;    '};
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
    if (/^#/.test(element.value)) {
      return {status: true};
    } else {
      return {status: false, error: 'Хэштег должен начинаться с символа #'};
    }
  };
  var checkForEachElement = function () {
  var hashtagArray = hashtag.value.split(' ');
    check2(hashtagArray);
    for (var i = 0; i < hashtagArray.length; i++) {
    check1(hashtagArray[i]);
    check3(hashtagArray[i]);
    check4(hashtagArray[i]);
  }
}
  // var check4 = function () {
  //   var hasharray = hashtag.value.split(' ');
  //   hasharray.forEach(function (item, index) {
  //     for (var i = index + 1; i < hasharray.length -1; i++) {
  //       if (hasharray[i] === item) {
  //         return {status: false, error: 'Хэштег не должен повторяться'};
  //       } else {
  //         return {status: true};
  //       }
  //     }
  //   });
  // };


  var getValidation = function () {
    //var result = [check1(), check2()];

    var error = result.map(item => {
      if (!item.status) {
        return item.error;
      }
    });
    hashtag.setCustomValidity(error.join(''));
    return !error.length;
  };
  // Находит форму и кнопку отправки
  var form = document.querySelector('.img-upload__form');
  var submitButton = document.querySelector('#upload-submit');

  // // Обработчик клика по кнопке
  submitButton.addEventListener('click', function () {
    getValidation();
  });
})();

