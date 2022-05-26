import './App.css';
import { Component, Suspense, lazy } from 'react';
const Game = lazy(() => import('./Game'));
// import { Icon } from 'semantic-ui-react';
import placeList from '../placeList';
import Swal2 from 'sweetalert2';
import SwalReact from 'sweetalert2-react-content';
const Swal = SwalReact(Swal2);
import axios from 'axios';
import '@sweetalert2/themes/borderless/borderless.scss';
import packageJSON from '../../../package.json';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chosenPlace: placeList[Math.floor(Math.random() * placeList.length)],
			version: 'Loading...',
			phase: 'Loading...',
			contributors: [],
		};
	}

	componentDidMount = async () => {
		console.log('Mounted');
		try {
			const version = packageJSON['version'];
			const phase = packageJSON['phase'];
			const contributors = (await axios.get('https://api.github.com/repos/EC3-Gang/open-house-wordle/contributors')).data;
			this.setState({ version, phase, contributors });
		}
		catch (err) {
			console.error(err);
		}
	};

	openHelp = () => {
		Swal.fire({
			titleText: 'How to Play',
			html: (
				<>
					<p>The aim of this game is to guess the correct place based on the 3d tour.</p>
					<p>You will have to choose from a number of places to guess and will be given 4 chances.</p>
					<p>If you guessed wrongly, you will be given a distance between the place you guess and the correct place.</p>
					<p><a href='https://github.com/EC3-Gang/open-house-wordle/issues'>Issues/Report an issue here</a></p>
				</>
			),
			confirmButtonText: 'Play Now',
			confirmButtonColor: '#21b500',
			showCancelButton: true,
			cancelButtonText: 'Version',
			cancelButtonColor: '#0a0099',
			showDenyButton: true, // aye I'm only using this as an extra button, ignore the deny
			denyButtonColor: '#1500ff',
			denyButtonText: 'Credits',
		}).then((res) => {
			if (res.isDenied) {
				Swal.fire({
					titleText: 'Credits',
					html: (<>
						<p>This game was commissioned by iCouncil and made by the following programmer(s) from EC<sup>3</sup>:</p>
						<ul>
							<li>Du Yuancheng (1i2)</li>
						</ul>
						<p>The following people were the coordinate mappers:</p>
						<ul>
							<li>Tey Yixiang (1i2)</li>
							<li>Liang Weiyu (1A3)</li>
							<li>Darryl Shi(1i2)</li>
						</ul>
						<p>The following people/organisations were the coordinators:</p>
						<ul>
							<li>iCouncil and all of its related entities</li>
							<li>Darren Yap (2i4)</li>
						</ul>
						<p>MIT Licensed | Copyright &copy; 2022-Present HCI EC<sup>3</sup> &amp; everyone mentioned above</p>
					</>),
					confirmButtonText: 'Return to game',
					confirmButtonColor: '#21b500',
				});
			}
			else if (res.dismiss === Swal.DismissReason.cancel) {
				Swal.fire({
					titleText: 'Current Game Version',
					html: (
						<>
							<p>Version: v{this.state.version} ({this.state.phase + ' '}phase)</p>
							<p>Contributors:</p>
							<ul>
								{this.state.contributors.map((contributor) => {
									return <li key={contributor.id}><a href={contributor.html_url}>{contributor.login}</a></li>;
								})}
							</ul>
						</>
					),
					confirmButtonText: 'Return to game',
					confirmButtonColor: '#21b500',
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
