import './Game.css';
import React, { Component } from 'react';
import placeList from '../placeList';
import PropTypes from 'prop-types';
import { Input, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			guess: '',
			placeList,
		};
	}
	render() {
		return (
			<Container>
				<h2 className='center'>Guess this place:</h2>
				<div className='center'>
					<iframe src={this.props.place.url} />
					<Input placeholder='Enter a place' fluid list='placeinput' name='placeinput' id='placeinput' />
					<datalist id='placeinput'>
						{
							this.state.placeList.map((place) => {
								return (
									// eslint-disable-next-line react/jsx-key
									<option value={place.name} />
								);
							})
						}
					</datalist>
				</div>
			</Container>
		);
	}
}

Game.propTypes = {
	place: PropTypes.object.isRequired,
};