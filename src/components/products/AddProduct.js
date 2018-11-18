import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddProduct extends Component {
	state = {
		title: '',
		image: '',
		description: ''
	};

	addData = () => {};

	onSubmit = e => {
		e.preventDefault();
		const { auth } = this.props;

		const productData = {
			creatorId: auth.uid,
			editorId: auth.uid,
			createdDate: new Date().toISOString(),
			editedDate: new Date().toISOString()
		};

		const newProduct = this.state;

		var productForSubmit = { ...newProduct, ...productData };

		const { firestore, history } = this.props;
		firestore
			.add({ collection: 'products' }, productForSubmit)
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
								<label htmlFor="image">Image</label>
								<input
									type="text"
									name="image"
									className="form-control"
									onChange={this.onChange}
                                    value={this.state.image}
									placeholder="Image URL"
								/>
							</div>
							<div className="form-group">
								<label htmlFor="description">Beskrivning</label>
								<textarea
									type="text"
									name="description"
									className="form-control"
									minLength={2}
									required
									onChange={this.onChange}
									value={this.state.description}
									placeholder="Description"
									rows="10"
								/>
							</div>
							<input
								type="submit"
								value="Add Product"
								className="btn btn-primary btn-block"
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

AddProduct.propTypes = {
	firestore: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect(),
	connect((state, props) => ({
		auth: state.firebase.auth
	}))
)(AddProduct);
