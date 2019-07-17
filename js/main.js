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

var ESC_KEYCODE = 27;

// Находит элементы модального окна
var uploadFileButton = document.querySelector('#upload-file');
var pictureForm = document.querySelector('.img-upload__overlay');
var pictureFormCloseButton = document.querySelector('#upload-cancel');


// Обработчик закрытия по esc
var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeForm();
  }
};


// Открывает модальное окно
var openForm = function () {
  pictureForm.classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
};

// Закрывает модальное окно
var closeForm = function () {
  pictureForm.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
};

// Обработчик  закрытия модального окна
pictureFormCloseButton.addEventListener('click', function () {
  closeForm();
});

// Обработчик открытия модального окна
uploadFileButton.addEventListener('change', function () {
  openForm();

});

// Находит элемент с комментарием
var commentText = document.querySelector('.text__description');
commentText.setCustomValidity('Комментарий не должен превышать 140 символов');
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

var getValidation = function () {
  return checkComment();
};
// Находит форму
var form = document.querySelector('.img-upload__form');

form.addEventListener('submit', function (evt) {
  if (!getValidation()) {
    evt.preventDefault();
  }
});

// Обработчик события фокус
commentText.addEventListener('focus', function () {
  document.removeEventListener('keydown', onFormEscPress);
});

// Обработчик события снятие фокуса
commentText.addEventListener('blur', function () {
  document.addEventListener('keydown', onFormEscPress);
});


// Находит эл-ты формы редактирования
var previewPicture = document.querySelector('.img-upload__preview');
var effectsList = document.querySelector('.effects__list');
var sliderLine = document.querySelector('.effect-level__line');
var slider = document.querySelector('.effect-level');
var sliderPin = document.querySelector('.effect-level__pin');
var filter = {
  none: function () {
    return 'none';
  },
  chrome: function (value) {
    return 'grayscale' + '(' + value + '%)';
  },
  sepia: function (value) {
    return 'sepia' + '(' + value + '%)';
  },
  marvin: function (value) {
    return 'invert' + '(' + value + '%)';
  },
  phobos: function (value) {
    return 'blur' + '(' + value * 3 / 100 + 'px)';
  },
  heat: function (value) {
    return 'brightness' + '(' + value * 3 + '%)';
  }
};

// Находит значение уровня фильтра
var getEffectValue = function () {
  return Math.round(sliderPin.offsetLeft * 100 / sliderLine.clientWidth);
};

// Задает значение фильтра
var setFilter = null;
effectsList.addEventListener('change', function (evt) {
  if (evt.target.value !== 'none') {
    slider.classList.remove('hidden');
  } else {
    slider.classList.add('hidden');
  }
  setFilter = filter[evt.target.value];
  previewPicture.style.filter = filter[evt.target.value](100);
});

sliderPin.addEventListener('mouseup', function () {
  previewPicture.style.filter = setFilter(getEffectValue());
});
