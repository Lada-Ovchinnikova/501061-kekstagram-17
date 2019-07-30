'use strict';
(function () {

  var bigPicture = document.querySelector('.big-picture');
  var listForCopies = document.querySelector('.social__comments');
  var preview = document.querySelector('.big-picture__img--preview');
  var likes = document.querySelector('.likes-count');
  var numberOfComments = document.querySelector('.comments-count');
  var description = document.querySelector('.social__caption');
  var commentsCount = document.querySelector('.social__comment-count');
  var downladNemComments = document.querySelector('.comments-loader');

  function openModal() {
    bigPicture.classList.remove('hidden');
    commentsCount.classList.add('visually-hidden');
    downladNemComments.classList.add('visually-hidden');
    renderModal(window.picture.data[0]);
  }

  function removeOldComments() {
    var commentBlocks = document.querySelectorAll('.social__comment');
    listForCopies.removeChild(commentBlocks[0]);
    listForCopies.removeChild(commentBlocks[1]);

  }

  function renderModal(picture) {
    preview.src = picture.url;
    likes.textContent = picture.likes;
    numberOfComments.textContent = picture.comments.length;
    description.textContent = picture.description;
    picture.comments.forEach(function (item) {
      var comment = document.querySelector('.social__comment').cloneNode(true);
      comment.querySelector('.social__picture').src = item.avatar;
      comment.querySelector('.social__text').textContent = item.message;
      listForCopies.appendChild(comment);
    });
    removeOldComments();
  }

  window.preview = {
    openModal: openModal()
  };
})();
