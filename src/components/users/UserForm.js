import React from 'react';

class UserForm extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const node = this.refs.username;
        const username = node.value;
        this.props.setUserName(username);
        node.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <input
                        ref="username"
                        type="text"
                        className="form-control"
                        placeholder="Set your name..."
                    />
                </div>
            </form>
        );
    }
}

export default UserForm;