import CustomError from './errors/CustomError.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new CustomError('로또 번호는 중복될 수 없습니다.');
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
