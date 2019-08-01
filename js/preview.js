'use strict';
(function () {

  var bigPicture = document.querySelector('.big-picture');
  var listForCopies = document.querySelector('.social__comments');
  var preview = document.querySelector('.big-picture__img--preview');
  var likes = document.querySelector('.likes-count');
  var numberOfComments = document.querySelector('.comments-count');
  var description = document.querySelector('.social__caption');
  var commentsCount = document.querySelector('.social__comment-count');
  var downladNewComments = document.querySelector('.comments-loader');
  var bigPictureExitte = document.querySelector('.big-picture__cancel');

  function openModal() {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onFormEscPress);
    commentsCount.classList.add('visually-hidden');
    downladNewComments.classList.add('visually-hidden');
    renderModal(window.load.gallery[0]);
  }

  function removeOldComments() {
    var commentBlocks = document.querySelectorAll('.social__comment');
    commentBlocks.forEach(function (item) {
      item.remove();
    });
  }

  function renderModal(picture) {
    preview.src = picture.url;
    likes.textContent = picture.likes;
    numberOfComments.textContent = picture.comments.length;
    description.textContent = picture.description;
    var commentCopy = document.querySelector('.social__comment').cloneNode(true);
    removeOldComments();

    picture.comments.forEach(function (item) {
      var comment = commentCopy.cloneNode(true);
      comment.querySelector('.social__picture').src = item.avatar;
      comment.querySelector('.social__text').textContent = item.message;
      listForCopies.appendChild(comment);
    });

  }
  // window.preview = function () {
  //   openModal();
  // };
  window.preview = {
    openModal: openModal
  };

  var gallery = document.querySelector('.pictures');
  gallery.addEventListener('click', function (evt) {

    var target = evt.target;

    // цикл двигается вверх от target к родителям до table
    while (target !== gallery) {
      if (target.className === 'picture') {
        window.preview.openModal();
      }
      target = target.parentNode;
    }
  });

  var onFormEscPress = function (evt) {
    window.util.isEscEvent(evt, closeForm);
  };

  // Обработчик  закрытия модального окна
  bigPictureExitte.addEventListener('click', function () {
    closeForm();
  });

  bigPictureExitte.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeForm);
  });

  // Закрывает модальное окно
  var closeForm = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onFormEscPress);
  };
})();
