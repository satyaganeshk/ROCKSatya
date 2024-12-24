import {Component} from 'react'

import {
  AppContainer,
  MainScoreBoard,
  Heading,
  ScoreContainer,
  ScoreText,
  ScoreCount,
  GameViewContainer,
  ResultViewContainer,
  PlayersContainer,
  PlayerItem,
  PlayerText,
  PlayerSelectSymbol,
  ResultTest,
  PlayAgain,
} from './styledComponents'

import GameButtonItem from '../GameButtonItem'

import RulesPopUpButton from '../RulesPopUpButton'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class RockPaperScissors extends Component {
  state = {
    isGameOver: false,
    playerSelected: {},
    opponentSelected: choicesList[Math.floor(Math.random() * 3)],
    score: 0,
    matchResult: '',
  }
  playerSelection = selectedItem => {
    const {opponentSelected} = this.state
    if (selectedItem === opponentSelected) {
      this.setState({
        isGameOver: true,
        matchResult: 'IT IS DRAW',
        playerSelected: selectedItem,
      })
    } else if (
      (selectedItem.id === 'ROCK' && opponentSelected.id === 'SCISSORS') ||
      (selectedItem.id === 'PAPER' && opponentSelected.id === 'ROCK') ||
      (selectedItem.id === 'SCISSORS' && opponentSelected.id === 'PAPER')
    ) {
      this.setState(prevState => ({
        isGameOver: true,
        matchResult: 'YOU WON',
        score: prevState.score + 1,
        playerSelected: selectedItem,
      }))
    } else {
      this.setState(prevState => ({
        isGameOver: true,
        matchResult: 'YOU LOSE',
        score: prevState.score - 1,
        playerSelected: selectedItem,
      }))
    }
  }
  renderGameView = () => (
    <GameViewContainer>
      {choicesList.map(each => (
        <GameButtonItem
          key={each.id}
          gameButtonDetails={each}
          playerSelection={this.playerSelection}
        />
      ))}
    </GameViewContainer>
  )
  onPlayAgain = () => {
    this.setState({
      isGameOver: false,
      playerSelected: {},
      opponentSelected: choicesList[Math.floor(Math.random() * 3)],
      matchResult: '',
    })
  }
  renderReslutView = () => {
    const {playerSelected, opponentSelected, matchResult} = this.state
    return (
      <ResultViewContainer>
        <PlayersContainer>
          <PlayerItem>
            <PlayerText>YOU</PlayerText>
            <PlayerSelectSymbol
              src={playerSelected.imageUrl}
              alt="your choice"
            />
          </PlayerItem>
          <PlayerItem>
            <PlayerText>OPPONENT</PlayerText>
            <PlayerSelectSymbol
              src={opponentSelected.imageUrl}
              alt="opponent choice"
            />
          </PlayerItem>
        </PlayersContainer>
        <ResultTest>{matchResult}</ResultTest>
        <PlayAgain type="button" onClick={this.onPlayAgain}>
          PlayAgain
        </PlayAgain>
      </ResultViewContainer>
    )
  }

  render() {
    const {isGameOver, opponentSelected, score} = this.state
    console.log(opponentSelected)
    return (
      <AppContainer>
        <MainScoreBoard>
          <Heading>
            ROCK
            <br />
            PAPER
            <br />
            SCISSORS
          </Heading>
          <ScoreContainer>
            <ScoreText>Score</ScoreText>
            <ScoreCount>{score}</ScoreCount>
          </ScoreContainer>
        </MainScoreBoard>
        {isGameOver ? this.renderReslutView() : this.renderGameView()}
        <RulesPopUpButton />
      </AppContainer>
    )
  }
}
export default RockPaperScissors
