import './Game.css';
import React, { Component } from 'react';
import placeList from '../placeList';
import PropTypes from 'prop-types';
import { Container, Button, Dropdown, Table, Icon, Tab } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import places from '../placeList';

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
	render() {
		return (
			<Container style={{
				paddingBottom: '70px',
			}}>
				<h2 className='center'>Guess this place:</h2>
				<div className='center'>
					<iframe src={this.props.place.url} />
					<Dropdown placeholder='Guess a place' fluid search selection options={this.places} />
					<Button className='center toppadded' color='blue' fluid>
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
											<Table.Cell>{guess.correct}</Table.Cell>
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