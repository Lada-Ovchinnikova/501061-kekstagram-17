'use strict';

var allMessages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var allAuthors = ['Мурзик', 'Светик', 'Банан', 'Леопольд', 'Андромеда', 'Тыковка'];
var allAvatars = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
var picturesAmount = 25;

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
var createPicture = function (index) {
  return {
    url: 'photos/' + (index + 1) + '.jpg',
    likes: getRandomRange(15, 255),
    comments: [createComment(), createComment()],
  };
};

// Добавляет фото в массив
var allPictures = [];
for (var i = 0; i < picturesAmount; i++) {
  allPictures.push(createPicture(i));
}

// Находит элемент в который добавляются фотографии
var similarListElement = document.querySelector('.pictures');

// Находит шаблон который копируется
var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

// Добавляет данные фото в шаблон
var renderPicture = function (picture) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

// Хранит и добавляет данные из шаблона
var fragment = document.createDocumentFragment();
for (i = 0; i < allPictures.length; i++) {
  fragment.appendChild(renderPicture(allPictures[i]));
}
similarListElement.appendChild(fragment);
