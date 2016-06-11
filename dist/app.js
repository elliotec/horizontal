'use strict';

var horizon = Horizon();
var chat = horizon('chat');

var app = new Vue({
  el: '#app',
  data: {
    newMessage: '',
    avatar_url: 'http://api.adorable.io/avatars/50/$new Date().getMilliseconds()}.png',
    messages: []
  },

  methods: {
    addMessage: function addMessage() {
      var text = this.newMessage.trim();
      if (text) {
        chat.store({
          text: text,
          datetime: new Date(),
          url: this.avatar_url
        }).subscribe();
        this.newMessage = '';
      }
    },

    messagesUpdate: function messagesUpdate(newMessages) {
      this.messages = newMessages;
      console.log(this.messages);
    }
  }
});

chat.order('datetime', 'descending').limit(8).watch().subscribe(app.messagesUpdate);

var image = new Image();
image.src = app.avatar_url;

horizon.onReady(function () {
  document.querySelector('h1').innerHTML = 'Horizon works!';
});
horizon.connect();
