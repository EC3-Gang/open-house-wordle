import './Game.css';
import { Component } from 'react';
import placeList from '../placeList';
import PropTypes from 'prop-types';
import { Container, Button, Dropdown, Table, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import places from '../placeList';
import haversine from '../haversine';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';


export default class Game extends Component {
	constructor(props) {
		super(props);
		this.places = places;
		this.state = {
			guess: '',
			placeList,
			guesses: [],
		};
	}

	componentDidMount = () => {
		console.log('Game component loaded');
	};

	handleGuess = () => {
		const guess = this.state.guess;
		const prevGuesses = this.state.guesses;
		const correctPlace = this.props.place;
		let newGuesses;

		if (guess === correctPlace.text) {
			newGuesses = [...prevGuesses, { guess, correct: '<i class=\'icon checkmark green\' />', distance: '0m' }];
			Swal.fire({
				titleText: 'Congratulations!',
				html: `
					<p>You guessed the place correctly!</p>
				`,
				icon: 'success',
				confirmButtonText: 'Play Again',
			}).then(({ isConfirmed }) => {
				if (isConfirmed) location.reload();
			});
		}
		else if (guess !== correctPlace.text) {
			// eslint-disable-next-line no-shadow
			const place = places.find(place => place.text === guess);
			const distance = Math.round(haversine(
				[correctPlace.lat, correctPlace.long],
				[place.lat, place.long],
			) * 1000);
			newGuesses = [...prevGuesses, { guess, correct: '<i class=\'icon x red\' />', distance: `${distance}m` }];
			if (newGuesses.length >= 4) {
				Swal.fire({
					titleText: 'Oops...',
					html: `
						<p>You guessed the place incorrectly!</p>
						<p>The correct place is ${correctPlace.text}</p>
					`,
					icon: 'error',
					confirmButtonText: 'Play Again',
					allowOutsideClick: false,
				}).then(({ isConfirmed }) => {
					if (isConfirmed) location.reload();
				});
			}
			else {
				Swal.fire({
					titleText: 'Oops...',
					html: `
						<p>You guessed the place incorrectly!</p>
					`,
					icon: 'error',
					confirmButtonText: 'Try Again',
				});
			}
		}
		this.setState({ guesses: newGuesses });
	};

	render() {
		return (
			<Container style={{
				paddingBottom: '70px',
			}}>
				<h2 className='center'>Guess this place:</h2>
				<div className='center'>
					<iframe src={this.props.place.url} />
					<Dropdown
						placeholder='Guess a place'
						fluid search selection options={this.places}
						onChange={(e) => {
							this.setState({ guess: e.target.innerText });
						}}
					/>
					<Button className='center toppadded' color='blue' fluid onClick={this.handleGuess}>
						<img alt="🌍"
							src="https://twemoji.maxcdn.com/2/72x72/1f30d.png"
							className="globe"
						/>
						&nbsp;&nbsp;Guess
					</Button>
					<Table singleLine>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Guess</Table.HeaderCell>
								<Table.HeaderCell><Icon name='checkmark' className='green' />/<Icon className='red' name='x' /></Table.HeaderCell>
								<Table.HeaderCell>Distance from correct place (if <Icon className='red' name='x' />)</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{
								this.state.guesses.map((guess) => {
									return (
										<Table.Row key={guess.guess}>
											<Table.Cell>{guess.guess}</Table.Cell>
											<Table.Cell><span dangerouslySetInnerHTML={{ __html: guess.correct }}></span></Table.Cell>
											<Table.Cell>{guess.distance}</Table.Cell>
										</Table.Row>
									);
								})
							}
						</Table.Body>
						<Table.Footer>
							<Table.Row>
								<Table.HeaderCell colSpan='3'>{4 - this.state.guesses.length}/4 guesses left</Table.HeaderCell>
							</Table.Row>
						</Table.Footer>
					</Table>
				</div>
			</Container>
		);
	}
}

Game.propTypes = {
	place: PropTypes.object.isRequired,
};