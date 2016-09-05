import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import socket from 'socket.io';
// const socket = require('socket.io')(http);

class App extends React.Component{
  constructor(props) {
    super()
    this.state = {
      test: "This will be Discord one day...",
      socket: window.io('http://localhost:3000'),
      messages: [],
      user: undefined,
      messageTest: "",
      oldMsgs: [],

    }
  }
  componentWillMount() {
    return axios({
      method: 'GET',
      url: "http://localhost:3000/api/test_msgs"
    }).then(response => {
      this.setState({oldMsgs: response.data})
    })
  }
  componentDidMount() {
    let self = this;
    self.state.socket.on('recieve-message', function(msg) {
      let messages = self.state.messages;
      messages.push(msg);
      self.setState({
        messages: messages
      })
      console.log(self.state.messages);
    })
  }
  submitMessage() {
    let body = document.getElementById('message').value;
    var message = {
      body: body,
      user: this.state.user || 'Guest'
    }
    this.state.socket.emit("new-message", message);
    console.log(message);
    this.setState({
      messageText: ""
    })
  }
  handleChange(e) {
    this.setState({messageText: e.target.value})
  }
  render() {
    let oldMsgs = this.state.oldMsgs.map((msg, i) => {
      return (
        <li key={i}><strong>{msg.author}: </strong><span>{msg.body}</span></li>
      )
    })
    let messages = this.state.messages.map((msg, i) => {
      return (
        <li key={i}><strong>{msg.user}: </strong><span>{msg.body}</span></li>
      )
    })
    return (
      <div>
        {this.state.test}
        <ul>
          {oldMsgs}
          {messages}
        </ul>
        <input
          onChange={this.handleChange.bind(this)}
           value={this.state.messageText} id="message" type="text"
            placeholder="Message text"></input>
        <button onClick={this.submitMessage.bind(this)}>Submit</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
