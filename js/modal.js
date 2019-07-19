'use strict';
(function () {
  var ESC_KEYCODE = 27;

  // Находит элементы модального окна
  var uploadFileButton = document.querySelector('#upload-file');
  var pictureForm = document.querySelector('.img-upload__overlay');
  var pictureFormCloseButton = document.querySelector('#upload-cancel');

  // Обработчик закрытия по esc
  window.onFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeForm();
    }
  };

  // Открывает модальное окно
  var openForm = function () {
    pictureForm.classList.remove('hidden');
    document.addEventListener('keydown', window.onFormEscPress);
  };

  // Закрывает модальное окно
  var closeForm = function () {
    pictureForm.classList.add('hidden');
    document.removeEventListener('keydown', window.onFormEscPress);
  };

  // Обработчик  закрытия модального окна
  pictureFormCloseButton.addEventListener('click', function () {
    closeForm();
  });

  // Обработчик открытия модального окна
  uploadFileButton.addEventListener('change', function () {
    openForm();

  });
})();
