import './App.css';
import React, { Component } from 'react';
import keyCodes from '../keyCodes';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			guess: '',
		};
	}

	handlekeydown = async (event) => {
		const keycode = event.keyCode || event.charCode;
		console.log(keycode);
		if (keycode === 13) {
			// nothing for now
		}
		else if (keycode === 8) {
			// backspace this.state.guess
			if (!this.state.guess.length) {
				return;
			}
			await this.setState({
				guess: this.state.guess.slice(0, -1),
			});
		}
		else if (keyCodes[keycode] !== undefined) {
			if (keyCodes[keycode] === '[SPACE]') {
				await this.setState({
					guess: this.state.guess + ' ',
				});
			}
			else {
				const val = keyCodes[keycode + ''];
				this.setState({
					guess: this.state.guess + val,
				});
			}
		}
	};

	componentDidMount = () => {
		console.log('Mounted');

		window.onkeydown = this.handlekeydown;
	};

	render() {
		return (
			<>
				<h1 className='center'>HCI Open House Worldle</h1>
				<div className='center'>
					{this.state.guess}
				</div>
			</>
		);
	}
}

export default App;
