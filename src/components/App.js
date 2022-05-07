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
			<div className='toppadded'>
				<h1 className='center'>Worldle (HCI Edition)</h1>
				<div className='center'>
					<Suspense>
						<Game place={this.state.chosenPlace} />
					</Suspense>
				</div>
			</div>
		);
	}
}

export default App;
