import React, {Component} from 'react';

import dateFormat from 'dateformat';

class Message extends Component {
  render() {
    const {message} = this.props;
    const created = dateFormat(message.created, "h:MM:ss TT");

    return (
      <li>
        {created} - {message.body}
      </li>
    )
  }
}

Message.propTypes = {
  message: React.PropTypes.object.isRequired
}

export default Message;