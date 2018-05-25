/**
 * Verifica se determinado número está no vetor
 * @param {number} number Número a ser testado
 * @param {array} array Vetor que deve conter o número
 */
export const numberInArray = (number, array) =>
  array && !!array.length && array.indexOf(number) !== -1;
