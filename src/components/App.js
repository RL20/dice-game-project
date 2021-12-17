import "../style/App.css";
import Player from "./Player";
import React from "react";
import Buttons from "./Buttons";
import Dice from "./Dice";
import Inputs from "./Inputs";

class App extends React.Component {
  state = { p1: { name: "Player 1", cur: 0, total: 0, active: true }, p2: { name: "Player 2", cur: 0, total: 0, active: false }, dice1: 0, dice2: 0, winScore: 100, disable: false };

  handleHold = () => {
    this.setState((prevState) => ({
      p1: { ...prevState.p1, active: !prevState.p1.active },
      p2: { ...prevState.p2, active: !prevState.p2.active },
    }));
  };
  handleDice = () => {
    const diceList = [Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)];
    const [a, b] = diceList;
    let currentScore = a + b;
    this.setState({ dice1: a, dice2: b, disable: true });
    const { p1, p2, winScore } = this.state;
    let active = this.activePlayer();
    if (active === "p1") {
      if (p1.total >= winScore) {
        alert("YOU ARE THE WINNER");

        return;
      }
      currentScore !== 12 ? this.updatPlayerScore("p1", currentScore) : this.resetPlayerScore("p1");
    } else {
      currentScore !== 12 ? this.updatPlayerScore("p2", currentScore) : this.resetPlayerScore("p2");
    }
  };
  handleNewGame = () => {};
  DiceSum = () => {};
  // //!--------------------------------------------
  updatPlayerScore = (player, curentScore) => {
    this.setState((prevState) => ({ [player]: { ...prevState[player], cur: curentScore, total: (prevState[player].total += curentScore) } }));
  };
  // //!--------------------------------------------
  resetPlayerScore = (player) => {
    this.setState((prevState) => ({ [player]: { ...prevState[player], cur: 0, total: 0 } }));
    this.handleHold();
  };
  // //!--------------------------------------------
  resetGame = () => {
    this.setState((prevState) => ({
      p1: { ...prevState.p1, cur: 0, total: 0, active: true },
      p2: { ...prevState.p2, cur: 0, total: 0, active: false },
      dice1: 0,
      dice2: 0,
      winScore: 100,
    }));
  };
  //!--------------------------------------------
  activePlayer = () => {
    const { p1 } = this.state;
    return p1.active ? "p1" : "p2";
  };
  //!--------------------------------------------
  setWinScore = (childData) => {
    this.setState({ winScore: childData });
  };

  render() {
    const { p1, p2, dice1, dice2, disable } = this.state;
    console.log("active", p1.active);
    console.log("win", this.state.winScore);
    return (
      <div className="App">
        <Player name={p1.name} cur={p1.cur} total={p1.total} active={p1.active} />
        <div className="main-game-logic">
          <Buttons text="NEW GAME" parentCallback={this.resetGame} />
          <Dice text={dice1} />
          <Dice text={dice2} />
          <Buttons text="ROLL DICE" parentCallback={this.handleDice} />
          <Buttons text="HOLD" parentCallback={this.handleHold} />
          <Inputs placeholder="set winning scrore" parentCallback={this.setWinScore} disable={disable} />
        </div>

        <Player name={p2.name} cur={p2.cur} total={p2.total} active={p2.active} />
      </div>
    );
  }
}

export default App;