import './App.css';
import React, { Component, Suspense } from 'react';
const Game = React.lazy(() => import('./Game'));
import placeList from '../placeList';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chosenPlace: placeList[Math.floor(Math.random() * placeList.length)],
		};
	}

	componentDidMount = () => {
		console.log('Mounted');
	};

	render() {
		return (
			<>
				<h1 className='center'>HCI Open House Worldle</h1>
				<div className='center'>
					<Suspense>
						<Game place={this.state.chosenPlace} />
					</Suspense>
				</div>
			</>
		);
	}
}

export default App;
