//import {CreateChannel, GenerateLi, JoinLeft}  from "./base";

var current_channel;
var channel_list = [];

document.addEventListener('DOMContentLoaded', () => {
  // connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  socket.on('connect', () => {
    var value;
    try {
      value = document.getElementById("scroll_default").getAttribute('data-value');
    } catch (error) {
      value = 0;
    }

    socket.on('add_channel', data => {
      let created_channel = data.channel;
      GenerateLiChList(created_channel);
    });

    /* FURTHER VOID LOADING WHEN USER CLICK TO CHANGE THE CHANNEL */
    document.querySelectorAll('.channel_link').forEach(channel => {
      channel.parentElement.onclick = () => {
        const select_channel = channel.dataset.channel;
        var a = window.location.href.split('/');
        a.pop();
        a.push(select_channel);
        const new_href = a.join('/');
        window.location.href = new_href;
        //socket.emit("change_channel", {"select_channel": select_channel});
      };
    });


    socket.on('del_channel', data => {

      const id_channel = `channel_${data.channel}`;
      const el = document.getElementById(id_channel);
      el.parentElement.removeChild(el);
    });

    // get previous data when user enter chatroom
    if (value === '1') {
      message_display();
      current_channel = document.getElementById("channel_name").textContent;
      localStorage["current_channel"] = current_channel;

      socket.emit('getData', {"current_channel": current_channel});

      socket.on('emitData', data => {
        let previousMessages = data.messageData;
        if (Object.keys(previousMessages).length > 0) {
          for (let i = 0; i < previousMessages.length; i++) {
            GenerateLi(previousMessages[i]);
            scrollToBottom();
          }
        }
      });

      socket.emit('joined', {"current_channel": current_channel});

      // The submit button should emit a 'submit message' event
      document.querySelector('#send_message').addEventListener('click', () => {
        let message = document.querySelector('.type_msg').value;
        if (message.length > 2) {
          socket.emit('submit message', {'message': message, "current_channel": current_channel});
        }
        document.querySelector('.type_msg').value = '';
      });

      document.querySelector('.type_msg').addEventListener('keydown', event => {
        let send_message = document.querySelector('#send_message');
        if (event.keyCode == 13) {
          send_message.click();
        }
      });

      document.querySelector('#new_channel').addEventListener('click', () => {
        create_display();
      });

      socket.on('announce message', data => {
        if (data.current_channel === localStorage["current_channel"]) {
          let message_data = data.message_data;
          GenerateLi(message_data);
          scrollToBottom();
        }
      });

      document.querySelector('#leave_channel').addEventListener('click', () => {
        // remove current_channel
        localStorage.removeItem("current_channel");
        document.getElementById("scroll_default").setAttribute('data-value', "0");
        create_display();

        socket.emit('left');
      });

      document.querySelector(".logout").addEventListener('click', () => {
        localStorage.removeItem("current_channel");
      });

      socket.on('state', data => {
        // annouce to people that the user just enter/leave the channel
        console.log(data.current_channel);
        console.log(current_channel);
        if (data.current_channel === current_channel) {
          if (data.type === 'join') {
            localStorage.setItem("current_channel", data.current_channel);
            current_channel = data.current_channel;
          } else if (data.type === 'leave') {
            console.log("he left");
            localStorage.removeItem("current_channel");
            //emit('getAllChannel');
          }
          JoinLeft(data);
        }
      });

    } else {

      var element = document.querySelector('.message_list');
      if (element !== null) {
        // first clear all message in chatbox, hide the submit and textarea
        document.querySelector('.message_list').style.display = "none";

        // add the Create Channel inside the chatbox
        document.getElementById("card_css").style.display = "block";
        socket.on('channel_create', data => {
          localStorage.setItem("current_channel", data.current_channel);
        });
      }
    }
  });
});


// can not use toggle() since there existence from the very beginning is not specified
const message_display = () => {
  document.querySelector('.message_list').style.display = "block";
  document.getElementById('typing').style.display = "block";
  document.getElementById('channel_name').style.display = "block";
  document.getElementById('leave_channel').style.display = "block";
  // card for creating a new channel
  document.getElementById("card_css").style.display = "none";

};

const create_display = () => {
  document.querySelector('.message_list').style.display = "none";
  document.getElementById('typing').style.display = "none";
  document.getElementById('channel_name').style.display = "none";
  document.getElementById('leave_channel').style.display = "none";
  // card for creating a new channel
  document.getElementById("card_css").style.display = "block";
};

const GenerateLiChList = channel => {
  const li = document.createElement('li');
  li.innerHTML = `
    <a class="channel_link" id="channel_${channel}" data-channel="${channel}">
      <span class="link_icon" ><i class="fab fa-joomla fa-2x"></i></span>
      <div class="results__data">
        <span class="results__name"><b>${ channel }</b></span>
      </div>
      <hr>
    </a>
  `;
  document.querySelector('.channel_list').append(li);
};

// Add messages to massage_list
const GenerateLi = data => {
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="smg_container">
      <img src="/static/images/emotion1.png" alt="Avatar" style="width:100%;">
      <p>${ data[1] }</p>
      <span class="time-right">${ data[0] } --- ${ data[2] }</span>
    </div>
  `;
  document.querySelector('.message_list').append(li);
};

// Add Join/Left to massage_list
const JoinLeft = data => {
  const li = document.createElement('li');
  li.innerHTML = `
    <hr>
    <h4 style="text-align: center; color: #DCDCDC">${data.announce}</h4>
    <hr>
  `;
  document.querySelector('.message_list').append(li);
};


// when the new message is added, call scrollToBottom. if the elementHeight === to scrollHeight
// do nothing
function scrollToBottom() {
  var element = document.getElementById("scroll_default");
  element.scrollTop = element.scrollHeight - element.clientHeight;
}
