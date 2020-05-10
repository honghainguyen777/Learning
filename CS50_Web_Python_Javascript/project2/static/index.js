function scrollToBottom() {
    const element = document.getElementById("scroll_default");
    const elementHeight = element.scrollHeight;
    element.scrollTop = elementHeight;
}


// when the new message is added, call scrollToBottom. if the elementHeight === to scrollHeight
// do nothing

document.addEventListener('DOMContentLoaded', () => {
  // connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  let localData = new Object();

  socket.on('connect', () => {

    var channel_name = document.getElementById("channel_name").textContent;
    var username = document.getElementById("username").textContent;


    if (localStorage.length === 0) {
      localData[channel_name] = new Object();
      localStorage.setItem(channel_name, JSON.stringify(localData[channel_name]));
    } else {
      console.log(localStorage.getItem(channel_name));
      localData[channel_name] = JSON.parse(localStorage.getItem(channel_name));
      console.log(localData[channel_name]);
    }

    // Grab all previous message

    // When exit the room, delete all data in the room in the localStorage. hint in the state
    // if state === 'left', then delete

    // When signout, emit an announce and delete all localStorage: announce from Flask, and delete from local

    // dont save anything in the flask, try to take the data from local and place it in flask

    socket.emit('joined');

    // The submit button should emit a 'submit message' event
    document.querySelector('#send_message').addEventListener('click', () => {
      let message = document.querySelector('.type_msg').value;
      socket.emit('submit message', {'message': message});
      document.querySelector('.type_msg').value = '';
    });

    document.querySelector('.type_msg').addEventListener('keydown', event => {
      let send_message = document.querySelector('#send_message');
      if (event.keyCode == 13) {
        send_message.click();
      }
    });
  });

  socket.on('announce message', data => {
    let message_data = data.message_data;
    let current_channel = data.current_channel;
    let existingLocalData = localData[current_channel];
    console.log(existingLocalData);
    // we have 3 variable: user, message and time in an array called message_data
    console.log(Object.keys(existingLocalData).length);
    // length of the existingLocalData Object
    objLength = Object.keys(existingLocalData).length;
    existingLocalData[objLength] = message_data;
    localData[current_channel] = existingLocalData;
    localStorage.setItem(current_channel, JSON.stringify(localData[current_channel]));

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="row">
        <div class="col-lg-1 pt-3">
          <figure class="chatting__fig">
                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg">
          </figure>
          <h4 class="ml-3"><b>${ message_data[0] }</b></h4>
        </div>
        <div class="col-lg-10 pt-2">
          <div class="message__data">
              <h4 class="results__name">${ message_data[1] }</h4>
          </div>
        </div>
      </div>
    `;
    document.querySelector('.message_list').append(li);
  });


  socket.on('state', data => {
    const li = document.createElement('li');
    li.innerHTML = `
      <p>-------------------------------------------------</p>
      <h4 style="text-align: center;">${data.announce}</h4>
      <p>-------------------------------------------------</p>
    `;
    document.querySelector('.message_list').append(li);
    console.log(li);

  });
});
