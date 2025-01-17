import { Random } from '@woowacourse/mission-utils';
import NUMBER from '../utils/constants/number.js';
import Lotto from '../Lotto.js';
import CustomError from '../errors/CustomError.js';

const { game } = NUMBER;
const { lotto } = game;

class LottoPublisher {
  #moneyAmount;

  setMoneyAmount(moneyAmount) {
    this.validate(moneyAmount);
    this.#moneyAmount = moneyAmount;
  }

  validate(moneyAmount) {
    if (moneyAmount % 1000 !== 0) {
      throw new CustomError('안돼임마');
    }
  }

  #generateRandomLottoNumbers() {
    return Random.pickUniqueNumbersInRange(
      lotto.minNumber,
      lotto.maxNumber,
      lotto.length,
    );
  }

  #publishSingleLotto() {
    const lottoNumbers = this.#generateRandomLottoNumbers();
    return new Lotto(lottoNumbers);
  }

  publishLottos() {
    const count = this.#moneyAmount / game.money.unitAmount;
    return Array.from({ length: count }, () => this.#publishSingleLotto());
  }
}

export default LottoPublisher;
