import './App.css';
import React, { Component, Suspense } from 'react';
const Game = React.lazy(() => import('./Game'));
// import { Icon } from 'semantic-ui-react';
import placeList from '../placeList';
import Swal from 'sweetalert2';

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

	openHelp = () => {
		Swal.fire({
			titleText: 'How to Play',
			html: /* html*/`
				<p>The aim of this game is to guess the correct place based on the 3d tour</p>
				<p>You will have to choose from a number of places to guess and will be given 4 chances.</p>
				<p>If you guessed wrongly, you will be given a distance between the place you guess and the correct place.</p>
			`,
			confirmButtonText: 'Play Now',
			showDenyButton: true, // aye I'm only using this as an extra button, ignore the deny
			denyButtonColor: '#1500ff',
			denyButtonText: 'Credits',
		}).then((res) => {
			if (res.dismiss === Swal.DismissReason.DENY) {
				Swal.fire({
					titleText: 'Credits',
					html: /* html*/`
						<p>This game was commissioned by iCouncil and made by the following programmer(s) from EC<sup>3</sup>:</p>
						<ul>
							<li>Du Yuancheng (1i2)</li>
						</ul>
						<p>The following people were the coordinate mappers:</p>
						<ul>
							<li>Tey Yixiang (1i2)</li>
							<li>Liang Weiyu (1A3)</li>
						</ul>
						<p>The following people/organisations were the coordinators:</p>
						<ul>
							<li>iCouncil and all of its related entities</li>
							<li>Darren Yap (2i4)</l1>
						</ul>
						<p>MIT Licensed | Copyright &copy; 2022-Present HCI EC<sup>3</sup> &amp; everyone mentioned above</p>
					`,
					confirmButtonText: 'Return to game',
				});
			}
		});
	};

	render() {
		return (
			<div className='toppadded'>
				<h1 className='center'>Worldle (HCI Edition)</h1>
				<div className='center'>
					<Suspense>
						<Game place={this.state.chosenPlace} />
					</Suspense>
					<button className='help' onClick={this.openHelp}>?</button>
				</div>
			</div>
		);
	}
}

export default App;
