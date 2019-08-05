'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = {
    loadMessage: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {

          onSuccess(xhr.response);

      });
      xhr.addEventListener('error', function () {
        onError(xhr.response);
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
