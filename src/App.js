import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

import { Provider } from 'react-redux';
import store from './store';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import Products from '../src/components/products/Products';
import Product from '../src/components/products/Product';
import AddProduct from '../src/components/products/AddProduct';
import EditProduct from '../src/components/products/EditProduct';
import Login from '../src/components/auth/Login';
import Register from '../src/components/auth/Register';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Header />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Products} />
								<Route
									exact
									path="/product/view/:id"
									component={Product}
								/>
								<Route
									exact
									path="/product/add"
									component={UserIsAuthenticated(AddProduct)}
								/>
								<Route
									exact
									path="/product/edit/:id"
									component={UserIsAuthenticated(EditProduct)}
								/>
								<Route
									exact
									path="/login"
									component={UserIsNotAuthenticated(Login)}
								/>
								<Route
									exact
									path="/register"
									component={UserIsAuthenticated(Register)}
								/>
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
