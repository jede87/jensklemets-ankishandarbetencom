import React from 'react';

function Spinner() {
	return (
		<div className="row">
			<div className="col">
				<h1 className="text-center">
					<i className="fa fa-circle-o-notch fa-spin" /> Loading..
				</h1>
			</div>
		</div>
	);
}
export default Spinner;
