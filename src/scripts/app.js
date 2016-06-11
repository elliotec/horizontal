const horizon = Horizon()
const chat = horizon('chat')

const app = new Vue({
  el: '#app',
  data: {
    newMessage: '',
    avatar_url: `http://api.adorable.io/avatars/50/$new Date().getMilliseconds()}.png`,
    messages: []
  },

  methods: {
    addMessage: function() {
      let text = this.newMessage.trim()
      if (text) {
        chat.store({
          text: text,
          datetime: new Date(),
          url: this.avatar_url
        }).subscribe();
        this.newMessage = ''
      }
    },

    messagesUpdate: function (newMessages){
      this.messages = newMessages;
      console.log(this.messages);
    }
  }
})

chat.order('datetime', 'descending')
  .limit(8)
  .watch()
  .subscribe(app.messagesUpdate)

const image = new Image()
image.src = app.avatar_url

horizon.onReady(() => {
  document.querySelector('h1').innerHTML = 'Horizon works!'
})
horizon.connect()

