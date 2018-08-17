import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: ""
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {
    const { manager, players } = this.state;
    const balance = web3.utils.fromWei(this.state.balance, "ether");

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract managed by {manager}</p>
        <p>
          There are currently {players.length} people entered, competing to win{" "}
          {balance} ether!
        </p>
      </div>
    );
  }
}

export default App;
