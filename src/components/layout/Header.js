import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
	state = {
		headerImageUrl:
			'https://images.unsplash.com/photo-1536550263171-dae6766fcd4e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b278f098e854c181ea2022b3b6c658c7&auto=format&fit=crop&w=1280&q=80'
	};

	render() {
		const { headerImageUrl } = this.state;
		return (
			<header>
				<div
					className="jumbotron jumbotron-fluid"
					style={{
						backgroundImage: `url(${headerImageUrl})`,
						backgroundRepeat: 'no-repeat',
						backgroundAttachment: 'fixed',
						backgroundPosition: 'center top'
					}}
				>
					<div className="container">
						<div className="row">
							<div className="col">
								<Link to="/">
									<h1 className="display-2 text-dark">
										Ankis Handarbeten
									</h1>
								</Link>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<p className="lead">
									 - Med omsorg gjorda handarbeten
								</p>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}
export default Header;
