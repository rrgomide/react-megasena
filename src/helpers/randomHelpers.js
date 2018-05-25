/**
 * Gera um único número aleatório conforme
 * os critérios
 * @param {number} min Valor mínimo para a geração
 * @param {number} max Valor máximo para a geração
 */
export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * max + min);
};

/**
 * Gera determinada quantidade de números aleatórios
 * conforme os critérios
 *
 * @param {number} min Valor mínimo para a geração
 * @param {number} max Valor máximo para a geração
 * @param {number} count Quantidade de números a serem gerados
 */
export const randomNumbers = (min, max, count) => {
  const numbers = [];
  for (let i = 0; i < count; i++) {
    const number = Math.floor(randomNumber(min, max));
    if (numbers.indexOf(number) === -1) numbers.push(number);
    else i--;
  }
  return numbers.sort((a, b) => a > b);
};
