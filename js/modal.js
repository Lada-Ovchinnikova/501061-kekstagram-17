'use strict';
(function () {
  // Находит элементы модального окна
  var uploadFileButton = document.querySelector('#upload-file');
  var pictureForm = document.querySelector('.img-upload__overlay');
  var pictureFormCloseButton = document.querySelector('#upload-cancel');

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };

  // Обработчик  закрытия модального окна
  pictureFormCloseButton.addEventListener('click', function () {
    closeForm();
  });

  pictureFormCloseButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeForm);
  });

  // Закрывает модальное окно
  var closeForm = function () {
    pictureForm.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
  };

  // Открывает модальное окно
  var openForm = function () {
    pictureForm.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
  };

  // Обработчик открытия модального окна
  uploadFileButton.addEventListener('change', function () {
    openForm();
  });
  uploadFileButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openForm);
  });
})();
