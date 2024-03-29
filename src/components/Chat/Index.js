import React, { Component } from 'react';
import firebase from '../../firebase';
import {Link} from 'react-router-dom';
import { Input, Button } from 'antd';
import Chatbox from './Chatbox';

import './Chat.scss';

const { TextArea  } = Input;

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			message: ''
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		if(this.state.message !== ''){
			const chatRef = firebase.database().ref().child('general');
			const chat = {
				message: this.state.message,
				user: this.props.user.displayName,
				timestamp: new Date().getTime()
			}
			
			chatRef.push(chat);
			this.setState({message: ''});
		}
	}

	render(){
		return(
			<div className="home--container">
				<h1>Welcome to the chat!</h1>
				{this.props.user && 
					<div className="allow-chat">
						<form className="send-chat" onSubmit={this.handleSubmit}>
							<TextArea rows="4" type="text" name="message" id="message" value={this.state.message} onChange={this.handleChange} placeholder='Leave a message...' />
							<Button htmlType="submit">Send</Button>
						</form>
						<br/>

						<Chatbox user={this.props.user}/>
					</div>
				}
				{!this.props.user && 
					<div className="disallow-chat">
						<p><Link to="/signIn">Sign In</Link> or <Link to="/signUp">Sign Up</Link> to start chatting!</p>
					</div>
				}
			</div>
		);
	}
}

export default Home;