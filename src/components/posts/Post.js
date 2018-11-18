import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class Post extends Component {
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
	componentDidMount() {
		console.log('post component loading');
	}
	render() {
		const { post } = this.props;
		const { isAuthenticated } = this.state;
		if (post) {
			return (
				<React.Fragment>
					<div className="row">
						<div className="col">
							<h1>
								{post.title}
								{isAuthenticated ? (
									<Link
										to={`/post/edit/${post.id}`}
										className="btn btn-secondary btn-sm pull-right"
									>
										<i className="fa fa-pencil" />
									</Link>
								) : null}
							</h1>
							<p className="lead text-right">{post.tagline}</p>
						</div>
					</div>
					<hr />
					{post.imageurl ? (
						<div className="row">
							<div
								className="col"
								style={{
									backgroundColor: '#ffffff',
									backgroundImage: `url(${post.imageurl})`,
									backgroundRepeat: 'no-repeat',
									// backgroundAttachment: 'fixed',
									backgroundPosition: 'center top',
									minHeight: '250px',
									marginLeft: '15px',
									marginRight: '15px'
								}}
							/>
						</div>
					) : null}

					<div className="row">
						<div className="col">
							<div
								dangerouslySetInnerHTML={{ __html: post.body }}
							/>
						</div>
					</div>
				</React.Fragment>
			);
		} else {
			return <Spinner />;
		}
	}
}

Post.propTypes = {
	firestore: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect(props => [
		{ collection: 'posts', storeAs: 'post', doc: props.match.params.id }
	]),
	connect((state, props) => ({
		post: state.firestore.ordered.post && state.firestore.ordered.post[0],
		auth: state.firebase.auth
	}))
)(Post);
