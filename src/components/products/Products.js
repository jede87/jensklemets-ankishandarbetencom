import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class Products extends Component {
	render() {
		const { products } = this.props;

		if (products) {
			return (
				<div className="row">
					<div className="col">
						{products.map(product => (
							<div key={product.id} className="card mb-3">
								<div className="card-body">
									<h5 className="card-title">
										<Link
											to={`/product/view/${product.id}`}
											className="text-dark"
										>
											{product.title}
										</Link>
										<span className="pull-right text-success">{product.price} €</span>
									</h5>
									{/* <p className="card-text">{product.category.map(cat => {
										return (<span>{cat} </span>);
									})}</p> */}
									<hr />
									<p>Skapad: {product.createdDate}, Editerad: {product.editedDate}</p>
									<p>Visningar: {product.views}, Såld:  <i className={product.sold ? 'fa fa-money': 'fa fa-shopping-cart'}></i></p>
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

Products.propTypes = {
	firestore: PropTypes.object.isRequired,
	products: PropTypes.array
};

export default compose(
	firestoreConnect([{ collection: 'products' }]),
	connect((state, props) => ({
		products: state.firestore.ordered.products
	}))
)(Products);
