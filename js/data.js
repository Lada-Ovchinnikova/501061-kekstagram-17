'use strict';
(function () {

  var URL = 'https://js.dump.academy/kekstagram/data';

  window.data = {
    loadPhotos: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.open('GET', URL);
      xhr.send();
    }
  };

})();

