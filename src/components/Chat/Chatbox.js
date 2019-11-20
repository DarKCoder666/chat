import React, { Component } from 'react';
import firebase from '../../firebase';

class Chatbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: []
		}
	}

	componentDidMount() {
		const chatRef = firebase.database().ref().child('general');
		chatRef.on('value', snapshot => {
			const getChats = snapshot.val();
			let ascChats = [];
			for (let chat in getChats) {
				if (getChats[chat].message !== '') {
					ascChats.push({
						id: chat,
						message: getChats[chat].message,
						user: getChats[chat].user,
						date: getChats[chat].timestamp
					});
				}
			}
			const chats = ascChats.reverse();
			this.setState({ chats });
		});
	}

	render() {
		return (
			<div className="chatbox">
				<ul className="chatbox-messages">
					{this.state.chats.map(chat => {
						const className = `chatbox-message ${this.props.user.displayName === chat.user ? 'my-message' : ''}`;
						return (
							<li key={chat.id} >
								<div className={className}>
									<strong>{chat.user}:</strong>
									<br />
									{chat.message}
								</div>
							</li>
						);
					})}
				</ul>
			</div >
		);
	}
}

export default Chatbox;