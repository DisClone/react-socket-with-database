var ChatApp = React.createClass({

  getInitialState() {
    return {
      messages: [],
      socket: window.io('http://localhost:3000'),
      user: undefined
    }
  },
  componentDidMount() {
    var self = this;
    this.state.socket.on('recieve-message', function(msg) {
      var messages = self.state.messages;
      messages.push(msg);
      self.setState({
        messages: messages
      })
      console.log(self.state.messages)
    });
  },
  submitMessage() {
    let body = document.getElementById("message").value;
    var message = {
      body: body,
      user: this.state.user || "guest"
    }
    this.state.socket.emit("new-message", message);
    console.log(message);
  },
  pickUser() {
    var user = document.getElementById('user').value;
    this.setState({
      user: user
    })
  },

  render() {

    var self = this;
    var messages = self.state.messages.map(msg => {
      return (
        <li><strong>{msg.user}</strong><span>{msg.body}</span></li>
      )
    })

    return (
      <div>
        <ul>
        {messages}
          <input id="message" type="text"></input>
          <button onClick={this.submitMessage.bind(this)}>Submit</button>
          <br />
          <br />
          <input id="user" placeholder="username" /> <button onClick={() => self.pickUser()}></button>
        </ul>
      </div>
    )
  }
});

ReactDOM.render(
  <ChatApp />,
  document.getElementById('chat')
)
