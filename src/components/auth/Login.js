import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';
// import Spinner from '../layout/Spinner';

class Login extends Component {
	state = {
		email: '',
		password: ''
	};
	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();
		const { firebase, notifyUser } = this.props;
		const { email, password } = this.state;
		firebase
			.login({
				email,
				password
			})
			.catch(err => {
				notifyUser(err.message, 'error');
			});
	};
	componentDidMount() {
		this.props.notifyUser('', '');
	}
	render() {
		const { email, password } = this.state;
		const { message, messageType } = this.props.notify;
		return (
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card">
						<h1 className="card-header text-center">
							<i className="fa fa-lock" /> Login
						</h1>
						<div className="card-body">
							{message ? (
								<Alert
									message={message}
									messageType={messageType}
								/>
							) : null}

							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor="email">E-mail</label>
									<input
										type="text"
										className="form-control"
										name="email"
										value={email}
										placeholder="Your e-mail"
										onChange={this.onChange}
										autoFocus
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										className="form-control"
										name="password"
										value={password}
										placeholder="Type password"
										onChange={this.onChange}
									/>
								</div>
								<input
									type="submit"
									value="Login"
									className="btn btn-dark btn-block"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	firebase: PropTypes.object.isRequired,
	notify: PropTypes.object.isRequired,
	notifyUser: PropTypes.func.isRequired
};

export default compose(
	firebaseConnect(),
	connect(
		(state, props) => ({
			notify: state.notify
		}),
		{ notifyUser }
	)
)(Login);
