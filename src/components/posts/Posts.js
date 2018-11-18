import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class Posts extends Component {
	render() {
		const { posts } = this.props;

		if (posts) {
			return (
				<div className="row">
					<div className="col">
						{posts.map(post => (
							<div key={post.id} className="card mb-3">
								<div className="card-body">
									<h5 className="card-title">
										<Link
											to={`/postdetails/${post.id}`}
											className="text-dark"
										>
											{post.title}
										</Link>
									</h5>
									<p className="card-text">{post.tagline}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			);
		} else {
			return <Spinner />;
		}
	}
}

Posts.propTypes = {
	firestore: PropTypes.object.isRequired,
	posts: PropTypes.array
};

export default compose(
	firestoreConnect([{ collection: 'posts' }]),
	connect((state, props) => ({
		posts: state.firestore.ordered.posts
	}))
)(Posts);
