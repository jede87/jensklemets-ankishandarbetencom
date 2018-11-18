import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class Product extends Component {
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
		console.log('product component loading');
	}
	render() {
		const { product } = this.props;
		const { isAuthenticated } = this.state;
		if (product) {
			return (
				<React.Fragment>
					<div className="row">
						<div className="col">
							<h1>
								{product.title}
								{isAuthenticated ? (
									<Link
										to={`/product/edit/${product.id}`}
										className="btn btn-secondary btn-sm pull-right"
									>
										<i className="fa fa-pencil" />
									</Link>
								) : null}
							</h1>
                            {/* <p className="lead text-right">
                            {product.category.map(cat => {
							        return (<span>{cat} </span>);
                                })
                            }</p> */}
						</div>
					</div>
					<hr />
					{product.image ? (
						<div className="row">
							<div
								className="col"
								style={{
									backgroundColor: '#ffffff',
									backgroundImage: `url(${product.image})`,
									backgroundRepeat: 'no-repeat',
									backgroundPosition: 'center top',
									minHeight: '250px'
								}}
							/>
                            <div className="col">
							<p>description: {product.description}</p>
                            <p>views: {product.views}</p>
                            <p>price: {product.price}</p>
                            <p>sold:  <i className={product.sold ? 'fa fa-money': 'fa fa-shopping-cart'}></i></p>
						</div>
						</div>
					) : (<div className="row">
                    <div className="col">
                    <p>description: {product.description}</p>
                            <p>views: {product.views}</p>
                            <p>price: {product.price}</p>
                            <p>sold:  <i className={product.sold ? 'fa fa-money': 'fa fa-shopping-cart'}></i></p>
                    </div>
                </div>)}
                    
					<div className="row">
						<div className="col text-right">
							<p>createdDate: {product.createdDate} </p>
							<p>editedDate: {product.editedDate} </p>
						</div>
					</div>
				</React.Fragment>
			);
		} else {
			return <Spinner />;
		}
	}
}

Product.propTypes = {
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
)(Product);
