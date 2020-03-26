document.addEventListener('DOMContentLoaded', () => {
  // Cnnect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure buttons
  socket.on('connect', () => {
    document.querySelector('#smg button').onclick = () => {
      const selection = document.getElementById("message").value;
      socket.emit('submit message', {'selection': selection});

      // delete the input in the typing field
      document.getElementById("message").value = '';
    };
  });
});
