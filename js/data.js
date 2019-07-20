'use strict';
(function () {

  var allMessages = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var allAuthors = ['Мурзик', 'Светик', 'Банан', 'Леопольд', 'Андромеда', 'Тыковка'];
  var allAvatars = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];


  // Генерирует случайное число
  var getRandom = function (items) {
    return items[Math.floor(Math.random() * items.length)];
  };

  // Генерирует случайное число в диапазоне от .. до ..
  var getRandomRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Создает коментарий
  var createComment = function () {
    return {
      avatar: getRandom(allAvatars),
      message: getRandom(allMessages),
      author: getRandom(allAuthors),
    };
  };

  // Создает фото
  window.data = {
    createPicture: function (index) {
      return {
        url: 'photos/' + (index + 1) + '.jpg',
        likes: getRandomRange(15, 255),
        comments: [createComment(), createComment()],
      };
    }
  };
})();

