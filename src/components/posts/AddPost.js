import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddPost extends Component {
	state = {
		title: '',
		tagline: '',
		imageurl: '',
		body: ''
	};

	addData = () => {};

	onSubmit = e => {
		e.preventDefault();
		const { auth } = this.props;

		const postData = {
			createdById: auth.uid,
			editedById: auth.uid,
			createdDate: new Date().toISOString(),
			editedDate: new Date().toISOString()
		};

		const newPost = this.state;

		var postForSubmit = { ...newPost, ...postData };

		const { firestore, history } = this.props;
		firestore
			.add({ collection: 'posts' }, postForSubmit)
			.then(() => history.push('/'));
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });
	render() {
		return (
			<div>
				<Link to="/">
					<i className="fa fa-arrow" />
				</Link>
				<div className="row">
					<div className="col">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label htmlFor="title">Title</label>
								<input
									type="text"
									name="title"
									className="form-control"
									minLength={2}
									required
									onChange={this.onChange}
									value={this.state.title}
									placeholder="Title"
									autoFocus
								/>
							</div>
							<div className="form-group">
								<label htmlFor="tagline">Tagline</label>
								<input
									type="text"
									name="tagline"
									className="form-control"
									minLength={2}
									required
									onChange={this.onChange}
									value={this.state.tagline}
									placeholder="Tagline"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="imageUrl">Image URL</label>
								<input
									type="text"
									name="imageurl"
									className="form-control"
									onChange={this.onChange}
									value={this.state.imageurl}
									placeholder="Image URL"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="body">Body</label>
								<textarea
									type="text"
									name="body"
									className="form-control"
									minLength={2}
									required
									onChange={this.onChange}
									value={this.state.body}
									placeholder="Insert html"
									rows="10"
								/>
							</div>
							<input
								type="submit"
								value="Add Post"
								className="btn btn-primary btn-block"
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

AddPost.propTypes = {
	firestore: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect(),
	connect((state, props) => ({
		auth: state.firebase.auth
	}))
)(AddPost);
