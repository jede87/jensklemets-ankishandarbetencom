import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class EditPost extends Component {
	constructor(props) {
		super(props);
		// Create refs
		this.titleInput = React.createRef();
		this.taglineInput = React.createRef();
		this.imageurlInput = React.createRef();
		this.bodyInput = React.createRef();
	}

	onDelete = () => {
		const { post, firestore, history } = this.props;

		firestore
			.delete({ collection: 'posts', doc: post.id })
			.then(history.push('/'));
	};

	onSubmit = e => {
		e.preventDefault();

		const { post, firestore, history, auth } = this.props;

		const updPost = {
			title: this.titleInput.current.value,
			tagline: this.taglineInput.current.value,
			imageurl: this.imageurlInput.current.value,
			body: this.bodyInput.current.value
		};

		const postData = {
			editedById: auth.uid,
			editedDate: new Date().toISOString()
		};

		var postForSubmit = {
			...updPost,
			...postData
		};

		firestore
			.update({ collection: 'posts', doc: post.id }, postForSubmit)
			.then(() => history.push(`/`));
	};

	render() {
		const { post } = this.props;
		if (post) {
			return (
				<>
					<div className="row">
						<div className="col">
							<button
								type="button"
								className="btn btn-danger"
								onClick={this.onDelete}
							>
								<i className="fa fa-trash" />
							</button>
						</div>
						<div className="col text-right">
							<Link
								to={`/postdetails/${post.id}`}
								className="btn btn-dark"
							>
								<i className="fa fa-chevron-left" /> Back
							</Link>
						</div>
					</div>
					<hr />
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
										ref={this.titleInput}
										defaultValue={post.title}
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
										ref={this.taglineInput}
										defaultValue={post.tagline}
										placeholder="Tagline"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="imageUrl">Image URL</label>
									<input
										type="text"
										name="imageurl"
										className="form-control"
										ref={this.imageurlInput}
										defaultValue={post.imageurl}
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
										ref={this.bodyInput}
										defaultValue={post.body}
										placeholder="Insert html"
										rows="10"
									/>
								</div>
								<input
									type="submit"
									value="Update Post"
									className="btn btn-primary btn-block"
								/>
							</form>
						</div>
					</div>
				</>
			);
		} else {
			return <Spinner />;
		}
	}
}

EditPost.propTypes = {
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
)(EditPost);
