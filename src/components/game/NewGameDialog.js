import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { MyButton } from '../forms/MyButton';
import { MyInputNumberMegaSena } from '../forms/MyInputNumberMegaSena';

export class NewGameDialog extends Component {
  state = {
    numbers: [30, 29, 31, 28, 32, 33],
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (forceClose = true) => {
    if (forceClose) {
      this.setState({ open: false });
      return;
    }

    if (this._numbersOk()) {
      this.props.onSucess(this.state.numbers);
      this.setState({ open: false });
      return;
    }
  };

  _numbersOk() {
    const numbers = this.state.numbers;
    let numbersOk = true;

    numbers.forEach(number => {
      if (!this._isUnique(number)) {
        numbersOk = false;
      }
    });

    return numbersOk;
  }

  _isUnique(numberToCheck) {
    return (
      numberToCheck > 0 &&
      numberToCheck < 61 &&
      this.state.numbers.filter(number => number === numberToCheck).length === 1
    );
  }

  changeNumberValue = (event, index) => {
    const newNumbers = this.state.numbers;
    newNumbers[index] = +event.target.value;
    this.setState({ numbers: newNumbers });
  };

  render() {
    const inputs = this.state.numbers.map((number, index) => {
      return (
        <MyInputNumberMegaSena
          autoFocus={index === 0}
          error={!this._isUnique(number)}
          key={index}
          min={1}
          max={60}
          label="Número"
          onChange={event => this.changeNumberValue(event, index)}
          defaultValue={number}
        />
      );
    });

    return (
      <div>
        <MyButton
          disabled={this.props.disabled}
          title="+ Novo jogo"
          onClick={this.handleClickOpen}
        />
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Novo jogo</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Informe os seus seis números desejados
            </DialogContentText>
            {inputs}
          </DialogContent>

          <DialogActions>
            <MyButton onClick={() => this.handleClose()} title="Cancelar" />
            <MyButton
              disabled={!this._numbersOk()}
              onClick={() => this.handleClose(false)}
              title="Confirmar novo jogo"
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
