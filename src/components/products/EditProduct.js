import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class EditProduct extends Component {
	constructor(props) {
		super(props);
		// Create refs
		this.titleInput = React.createRef();
		this.imageInput = React.createRef();
		this.descriptionInput = React.createRef();
	}

	onDelete = () => {
		const { product, firestore, history } = this.props;

		firestore
			.delete({ collection: 'products', doc: product.id })
			.then(history.push('/'));
	};

	onSubmit = e => {
		e.preventDefault();

		const { product, firestore, history, auth } = this.props;

		const updProduct = {
			title: this.titleInput.current.value,
			image: this.imageInput.current.value,
			description: this.descriptionInput.current.value
		};

		const productData = {
			editorId: auth.uid,
			editedDate: new Date().toISOString()
		};

		var productForSubmit = {
			...updProduct,
			...productData
		};

		firestore
			.update({ collection: 'products', doc: product.id }, productForSubmit)
			.then(() => history.push(`/`));
	};

	render() {
		const { product } = this.props;
		if (product) {
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
								to={`/product/${product.id}`}
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
										defaultValue={product.title}
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
										ref={this.imageInput}
										defaultValue={product.image}
										placeholder="Image"
									/>
								</div>
								<div className="form-group">
									<label htmlFor="description">Description</label>
									<textarea
										type="text"
										name="description"
										className="form-control"
										minLength={2}
										required
										ref={this.descriptionInput}
										defaultValue={product.description}
										placeholder="Insert description"
										rows="10"
									/>
								</div>
								<input
									type="submit"
									value="Update Product"
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

EditProduct.propTypes = {
	firestore: PropTypes.object.isRequired
};

export default compose(
	firestoreConnect(props => [
		{ collection: 'products', storeAs: 'product', doc: props.match.params.id }
	]),
	connect((state, props) => ({
		product: state.firestore.ordered.product && state.firestore.ordered.product[0],
		auth: state.firebase.auth
	}))
)(EditProduct);
