import { Console } from '@woowacourse/mission-utils';

import View from '../views/View.js';
import LottoPublisher from '../models/LottoPublisher.js';
import LottoService from '../models/LottoService.js';

class LottoGameController {
  #view = new View();

  #lottoPublisher = new LottoPublisher();

  #lottoService = new LottoService();

  async executeLottoGame() {
    await this.setMoneyAmountFromInput();
    const tickets = this.#lottoPublisher.publishLottos();
    this.#lottoService.setLottoTickets(tickets);
    this.#view.printLottoPurchaseResult(tickets);
    await this.setWinningNumbersFromInput();
    await this.setBonusNumbersFromInput();
    const { results, profitRate } = this.executeLottoMatch();
    this.displayLottoResult(results, profitRate);
  }

  async #retryOnFailure(func) {
    try {
      return await func();
    } catch (error) {
      this.#view.printError(error);
      return this.#retryOnFailure(func);
    }
  }

  async setMoneyAmountFromInput() {
    await this.#retryOnFailure(async () => {
      const moneyAmount = await this.#view.readMoneyAmount();
      this.#lottoPublisher.setMoneyAmount(moneyAmount);
    });
  }

  async setWinningNumbersFromInput() {
    await this.#retryOnFailure(async () => {
      const winningNumbers = await this.#view.readWinningNumbers();
      this.#lottoService.setWinningNumbers(winningNumbers);
      this.#view.printNewLine();
    });
  }

  async setBonusNumbersFromInput() {
    await this.#retryOnFailure(async () => {
      const bonusNumber = await this.#view.readBonusNumber();
      this.#lottoService.setBonusNumber(bonusNumber);
      this.#view.printNewLine();
    });
  }

  executeLottoMatch() {
    const results = this.#lottoService.calculateResults();
    const profitRate = this.#lottoService.calculateProfitRate();
    return { results, profitRate };
  }

  displayLottoResult(results, profitRate) {
    this.#view.printLottoStats(results);
    this.#view.printProfitRate(profitRate);
  }
}

export default LottoGameController;
