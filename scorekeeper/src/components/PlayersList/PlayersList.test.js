import PlayersList from './PlayersList';
import Player from '../Player/Player';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { platform } from 'os';

it('renders without crashing', () => {
  shallow(<PlayersList players={[]} />);
});

it('renders correct number of players', () => {
  const players = [
    {
      name: 'Kunegunda',
      score: 5
    },
    {
      name: 'Antoś',
      score: 0
    }
  ]
  const playerComponent = mount(<PlayersList players={players} />);
  const expectedPlayersNumber = playerComponent.find(Player).length;

  //console.log(playerComponent.debug());
  expect(expectedPlayersNumber).toEqual(2);
});

it('renders onScoreUpdate', () => {
  const players = [
    {
      name: 'Kunegunda',
      score: 5
    },
    {
      name: 'Antoś',
      score: 0
    }
  ]

  const mockedOnScoreUpdate = jest.fn();
  const playerComponent = shallow(<PlayersList players={players} onScoreUpdate={mockedOnScoreUpdate} />);
  const firstPlayer = playerComponent.find(Player).first();
  const secondPlayer = playerComponent.find(Player).at(1);
  const onPlayerScoreChange = firstPlayer.prop('onPlayerScoreChange');
  //const onPlayerScoreChange = secondPlayer.prop('onPlayerScoreChange');
  onPlayerScoreChange(10);
  expect(mockedOnScoreUpdate).toBeCalledWith(0, 10);
});