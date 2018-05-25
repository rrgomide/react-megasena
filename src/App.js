import React, { Component } from 'react';

import { range, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

import './App.css';

import { Numero } from './components/numero/Numero';

class App extends Component {
  constructor() {
    super();

    this.state = {
      numbers: [],
      pickedNumbers: [],
      myGames: [],
      loading: false
    };

    this.pickedNumbers$ = null;
  }

  componentDidMount() {
    this._generateAllNumbers();
    this._generateMyGames();
  }

  _generateMyGames() {
    const myGames = [];
    for (let i = 0; i < 6; i++) myGames.push(this._randomNumbers(1, 60, 6));
    this.setState({ myGames });
  }

  _randomNumbers(min, max, count) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      const number = Math.floor(Math.random() * max + 1);
      if (numbers.indexOf(number) === -1) numbers.push(number);
      else i--;
    }
    return numbers.sort((a, b) => a > b);
  }

  _generateAllNumbers = async () => {
    await this.setState({ pickedNumbers: [] });

    const numbers = [];
    const numbers$ = range(1, 60).pipe(
      map(value => {
        numbers.push(value);
      })
    );
    numbers$.subscribe(() => this.setState({ numbers }));
  };

  _generatePickedNumbers() {
    this.setState({ loading: true });
    const pickedNumbers = [];
    const pickedNumbers$ = interval(1000).pipe(
      map(value => {
        let numberOk = false;
        while (!numberOk) {
          const newNumber = Math.floor(Math.random() * 60 + 1);
          if (pickedNumbers.indexOf(newNumber) === -1) {
            pickedNumbers.push(newNumber);
            numberOk = true;
          }
        }
      }),
      take(6)
    );
    pickedNumbers$.subscribe(
      () => this.setState({ pickedNumbers }),
      () => null,
      () => this.setState({ loading: false })
    );
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          {this.state.numbers.map(number => (
            <Numero
              key={number}
              value={number}
              picked={
                !!this.state.pickedNumbers.length &&
                this.state.pickedNumbers.indexOf(number) !== -1
              }
            />
          ))}
        </div>
        <br />
        <button
          disabled={this.state.loading}
          className="button"
          onClick={() => this._generatePickedNumbers()}
        >
          Iniciar sorteio!
        </button>
        <div>
          <h2>Meus jogos</h2>
          {this.state.myGames.map((game, index) => {
            return (
              <div key={index} className="row game">
                {index + 1}:&nbsp;
                {game.map(number => {
                  return (
                    <Numero
                      key={number}
                      value={number}
                      picked={
                        !!this.state.pickedNumbers.length &&
                        this.state.pickedNumbers.indexOf(number) !== -1
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
