import './App.css'

import React, { Component } from 'react';

import ChannelSection from './components/channels/ChannelSection';
import MessageSection from './components/messages/MessageSection';
import UserSection from './components/users/UserSection';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      messages: [],
      users: [],
      activeChannel: {},
      connected: false,
    };
  }

  componentDidMount() {
    //eslint-disable-next-line
    let ws = this.ws = new WebSocket('ws://echo.websocket.org');
  }

  newChannel(channel) {
    let { channels } = this.state;
    channels.push(channel);
    this.setState({ channels });
  }

  addChannel(name) {
    let { channels } = this.state;
    let msg = {
      name: 'channel add',
      data: {
        id: channels.length,
        name,
      },
    };
    this.ws.send(JSON.stringify(msg));
  }

  setChannel(activeChannel) {
    this.setState({ activeChannel });
    // TODO: Get Channels Messages
  }

  setUserName(name) {
    let { users } = this.state;
    users.push({ id: users.length, name });
    this.setState({ users });
  }

  addMessage(body) {
    let { messages, users, activeChannel } = this.state;
    let createdAt = new Date();
    let author = users.length > 0 ? users[0].name : 'anonymous';
    let channel = activeChannel.name;
    messages.push({
      id: messages.length,
      body,
      createdAt,
      channel,
      author,
    });
    this.setState({ messages });
  }

  render() {
    return (
      <div className="app">
        <div className="nav">
          <ChannelSection
            {...this.state}
            addChannel={this.addChannel.bind(this)}
            setChannel={this.setChannel.bind(this)}
          />
          <UserSection
            {...this.state}
            setUserName={this.setUserName.bind(this)}
          />
        </div>
        <MessageSection
          {...this.state}
          addMessage={this.addMessage.bind(this)}
        />
      </div>
    );
  }
}

export default App;
