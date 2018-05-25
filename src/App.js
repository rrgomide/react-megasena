import React, { Component } from 'react';

import { range, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

import './App.css';

import { Numero } from './components/numero/Numero';
import { NewGameDialog } from './components/game/NewGameDialog';
import { MyButton } from './components/forms/MyButton';
import { randomNumbers, randomNumber } from './helpers/randomHelpers';
import { numberInArray } from './helpers/arrayHelpers';

class App extends Component {
  constructor() {
    super();

    this.state = {
      interval: 1000,
      loading: false,
      customGames: [],
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

  _newGame = numbers => {
    console.log('newGame');
    const newGames = this.state.customGames;
    newGames.push(numbers);
    this.setState({ customGames: newGames });
  };

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

        <div className="row">
          <MyButton
            title="Iniciar sorteio"
            disabled={this.state.loading}
            onClick={() => this._generatePickedNumbers()}
          />

          <MyButton
            title="Gerar novos números"
            disabled={this.state.loading}
            onClick={() => this._generateMyGames()}
          />
        </div>

        <div>
          <h2>Meus jogos</h2>
          {this.state.myGames
            .concat(this.state.customGames)
            .map((game, index) => {
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

          <div style={{ marginTop: '15px' }}>
            <NewGameDialog
              disabled={this.state.loading}
              onSucess={numbers => this._newGame(numbers)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
