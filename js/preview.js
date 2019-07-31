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

    picture.comments.forEach(function (item) {
      var comment = document.querySelector('.social__comment').cloneNode(true);

      removeOldComments();
      comment.querySelector('.social__picture').src = item.avatar;
      comment.querySelector('.social__text').textContent = item.message;
      listForCopies.appendChild(comment);
    });

  }
  window.preview = function () {
    openModal();
  };
  // // window.preview = {
  // //   openModal: openModal()
  // // };
  var gallery = document.querySelector('.pictures');
  gallery.addEventListener('click', function (evt) {

    var target = evt.target;
    if (target.className !== 'picture__img') {
      return;
    }
    window.preview();
  });
})();
