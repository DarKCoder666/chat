import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import { Input, Button } from 'antd';
import './Auth.scss';

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ error });
			});
	}

	render() {
		const { email, password, error } = this.state;
		return (
			<div className="auth--container">
				<h1>Sign In</h1>
				{error && <p className="error-message">{error.message}</p>}
				<form onSubmit={this.handleSubmit}>
					<Input.Group compact>
						<label htmlFor="email">Email address</label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							value={email}
							onChange={this.handleChange}
						/>
					</Input.Group>
					<br />
					<Input.Group compact>
						<label htmlFor="password">Password</label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="password"
							value={password}
							onChange={this.handleChange}
						/>
					</Input.Group>
					<br />
					<Button htmlType="submit">Sign In</Button>

					<p>Don't have an account yet? <Link to="/signUp">Sign Up here</Link></p>
				</form>
			</div>
		);
	}
}
export default SignIn;