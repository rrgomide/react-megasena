import React, { Component } from 'react';

import { range, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Button } from '@material-ui/core';

import './App.css';

import { Numero } from './components/numero/Numero';
import NewGameDialog from './components/game/NewGameDialog';
import { randomNumbers, randomNumber } from './helpers/randomHelpers';
import { numberInArray } from './helpers/arrayHelpers';

class App extends Component {
  constructor() {
    super();

    this.state = {
      interval: 1000,
      loading: false,
      myGames: [],
      numbers: [],
      pickedNumbers: []
    };

    this.pickedNumbers$ = null;
  }

  componentDidMount() {
    this._generateAllNumbers();
    this._generateMyGames();
  }

  _generateMyGames() {
    const myGames = [];
    for (let i = 0; i < 6; i++) myGames.push(randomNumbers(1, 60, 6));
    this.setState({ myGames });
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
    const pickedNumbers$ = interval(this.state.interval).pipe(
      map(value => {
        let numberOk = false;
        while (!numberOk) {
          const newNumber = randomNumber(1, 60);
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

  /**
   * Verificamos se o vetor de números sorteados
   * possui pelo menos um item e por fim se o
   * número do parâmetro está contido nesse vetor
   */
  _isNumberPicked = number => numberInArray(number, this.state.pickedNumbers);

  render() {
    return (
      <div className="App">
        <div className="row">
          {this.state.numbers.map(number => (
            <Numero
              key={number}
              value={number}
              picked={this._isNumberPicked(number)}
            />
          ))}
        </div>
        <br />
        <Button
          style={{ marginRight: '10px' }}
          color="primary"
          variant="raised"
          disabled={this.state.loading}
          className="button"
          onClick={() => this._generatePickedNumbers()}
        >
          Iniciar sorteio
        </Button>
        <Button
          style={{ marginRight: '10px' }}
          color="primary"
          variant="raised"
          disabled={this.state.loading}
          className="button"
          onClick={() => this._generateMyGames()}
        >
          Gerar novos números
        </Button>

        <NewGameDialog />

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
                      picked={this._isNumberPicked(number)}
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
