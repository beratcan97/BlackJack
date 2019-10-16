import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css'],
})
export class BlackjackComponent implements OnInit {

  isLoaded = false;

  //Cards
  cards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52'];
  dealerCards = [];
  playerCards = [];

  message: string = '';
  gameRunning = false;
  dealersTurn = false;

  playerValue: number = 0;
  dealerValue: number = 0;
  constructor() { }

  ngOnInit() {
    setTimeout(() => { this.isLoaded = true }, 3000)
  }

  gameupdater(): void {
    this.playerAndDealerCardsValueCount();
    this.checkBlackjackAndBust();
  }

  hit(): void {
    this.playerCards.push(this.randomCard(1)[0]);

    this.gameupdater();
  }

  stand(): void {
    this.dealersTurn = true;

    // Dealers move
    while (this.dealerValue < this.playerValue) {
      this.dealerCards.push(this.randomCard(1)[0]);
      this.playerAndDealerCardsValueCount();
    }

    if (this.dealerValue === this.playerValue) {
      this.endGame('Nobody wins, same!');
    } else if (this.dealerValue > 21) {
      this.endGame('You win, Dealer bust!');
    } else {
      this.endGame('You lose!');
    }
  }

  checkTheWinner(): void {
    if (this.playerValue === this.dealerValue) {
      this.endGame('Nobody wins, same!');
    } else if (this.playerValue > this.dealerValue) {
      this.endGame('You win!');
    } else {
      this.endGame('You lose!');
    }
  }

  restartGame(): void {
    this.cards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52'];
    this.dealerCards = [];
    this.playerCards = [];

    this.dealersTurn = false;
    this.playerValue = 0;
    this.dealerValue = 0;

    this.startNewGame();
    this.gameupdater();
  }

  checkBlackjackAndBust(): void {
    //Check player
    if (this.playerValue == 21) {
      this.endGame('You win, BlackJack!');
    } else if (this.playerValue > 21) {
      this.endGame('You lose, Bust!');
    }

    //Check dealer
    if (this.dealerValue == 21) {
      this.endGame('You lose, Dealer BlackJack!');
    } else if (this.dealerValue > 21) {
      this.endGame('You win, Dealer bust!');
    }
  }

  playerAndDealerCardsValueCount(): void {
    let tmpPlayer: number = 0;
    this.playerCards.forEach(card => {
      tmpPlayer = (tmpPlayer + this.cardsValueCounter(card));
    });
    this.playerValue = tmpPlayer;

    let tmpDealer: number = 0;
    this.dealerCards.forEach(card => {
      tmpDealer = (tmpDealer + this.cardsValueCounter(card));
    });
    this.dealerValue = tmpDealer;
  }

  endGame(message): void {
    this.message = message;
    this.gameRunning = false;
  }

  cardsValueCounter(index: number): number {
    let toatelValue: number = 0;
    if (index >= 1 && index <= 4) {
      toatelValue = toatelValue + 2;
    } else if (index >= 5 && index <= 8) {
      toatelValue = toatelValue + 3;
    } else if (index >= 9 && index <= 12) {
      toatelValue = toatelValue + 4;
    } else if (index >= 13 && index <= 16) {
      toatelValue = toatelValue + 5;
    } else if (index >= 17 && index <= 20) {
      toatelValue = toatelValue + 6;
    } else if (index >= 21 && index <= 24) {
      toatelValue = toatelValue + 7;
    } else if (index >= 25 && index <= 28) {
      toatelValue = toatelValue + 8;
    } else if (index >= 29 && index <= 32) {
      toatelValue = toatelValue + 9;
    } else if (index >= 33 && index <= 48) {
      toatelValue = toatelValue + 10;
    } else {
      //A
      toatelValue = toatelValue + 1;
    }

    return toatelValue;
  }

  startNewGame(): void {
    this.gameRunning = true;
    this.message = '';
    this.dealerCards = this.randomCard(2);
    this.playerCards = this.randomCard(2);
    this.gameupdater();
  }

  randomCard(number) {
    let randomCards = [];
    for (let i = 0; i < number; i++) {

      let cardIndex = Math.floor(Math.random() * this.cards.length);

      randomCards.push(this.cards[cardIndex]);
      this.cards.splice(cardIndex, 1);
    }
    return randomCards;
  }
}
