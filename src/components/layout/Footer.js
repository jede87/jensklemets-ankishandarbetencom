import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

class Footer extends Component {
	state = {
		isAuthenticated: false
	};
	static getDerivedStateFromProps(props, state) {
		const { auth } = props;

		if (auth.uid) {
			return { isAuthenticated: true };
		} else {
			return { isAuthenticated: false };
		}
	}
	onLogoutClick = e => {
		e.preventDefault();
		const { firebase } = this.props;
		firebase.logout();
	};
	render() {
		const { isAuthenticated } = this.state;
		const { auth } = this.props;
		return (
			<footer className="mt-5">
				<div className="container">
					<div className="row">
						<div className="col">
							<p>all rights reserved</p>
						</div>
						<div className="col">
							<div className="btn-group btn-group-sm mb-3 pull-right">
								{isAuthenticated ? (
									<>
										<a
											className="btn btn-warning"
											href="#!"
											onClick={this.onLogoutClick}
										>
											<i className="fa fa-unlock" />{' '}
											{auth.email}
										</a>
										{/* <Link
											to="/register"
											className="btn btn-info"
										>
											<i className="fa fa-user" />{' '}
											register user
										</Link> */}
										<Link
											to="/product/add"
											className="btn btn-success"
										>
											<i className="fa fa-plus" /> produkt
										</Link>
									</>
								) : (
									<Link to="/login" className="btn btn-dark">
										<i className="fa fa-lock" /> login
									</Link>
								)}
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

Footer.propTypes = {
	firebase: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

export default compose(
	firebaseConnect(),
	connect((state, props) => ({
		auth: state.firebase.auth
	}))
)(Footer);
