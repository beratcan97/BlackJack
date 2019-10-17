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
    this.playEffect("assets/soundEffects/mixCards.m4a");
    setTimeout(() => {
      this.isLoaded = true 
    }, 2000)
  }

  hit(): void {
    this.playEffect("assets/soundEffects/deal1Card.m4a");

    this.playerCards.push(this.randomCard(1)[0]);
    this.playerCardsValueCount();
    this.checkBlackjackAndBust();
  }

  stand(): void {
    this.dealersTurn = true;

    // Dealers move
    while (this.dealerValue < this.playerValue) {
      this.dealerCards.push(this.randomCard(1)[0]);
      this.dealerCardsValueCount();
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
    this.dealerValue = 0;
    this.playerValue = 0;
    this.cards = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52'];
    this.dealerCards = [];
    this.playerCards = [];

    this.dealersTurn = false;
    this.playerValue = 0;
    this.dealerValue = 0;

    this.startNewGame();
    this.dealerCardsValueCount();
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

  endGame(message): void {
    this.message = message;
    this.gameRunning = false;
  }

  dealerCardsValueCount(): void {
    let tmpDealer: number = 0;
    let tmpADeck = [];
    this.dealerCards.forEach(card => {
      if (card < 49) {
        tmpDealer = (tmpDealer + this.cardValueCounter(card, this.dealerValue));
      } else {
        tmpADeck.push(card);
      }
    });
    tmpADeck.forEach(card => {
      tmpDealer = (tmpDealer + this.aCardValueCounter(this.dealerValue));
    });
    this.dealerValue = tmpDealer;
  }

  playerCardsValueCount(): void {
    let tmpPlayer: number = 0;
    let tmpADeck = [];
    this.playerCards.forEach(card => {
      if (card < 49) {
        tmpPlayer = (tmpPlayer + this.cardValueCounter(card, this.playerValue));
      } else {
        tmpADeck.push(card);
      }
    });
    tmpADeck.forEach(card => {
      tmpPlayer = (tmpPlayer + this.aCardValueCounter(this.playerValue));
    });
    this.playerValue = tmpPlayer;
  }

  aCardValueCounter(userValue): number {
    if ((userValue + 11) == 21) {
      return 11
    } else if ((userValue + 11) < 21) {
      return 11
    }
    else {
      return 1
    }
  }
  
  cardValueCounter(index: number, user): number {
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
      console.log("Error");
    }
    return toatelValue;
  }

  startNewGame(): void {
    this.playEffect("assets/soundEffects/deal4Cards.m4a");

    this.gameRunning = true;
    this.message = '';
    this.dealerCards = this.randomCard(2);
    this.playerCards = this.randomCard(2);

    this.playerCardsValueCount();
    this.dealerCardsValueCount();
    this.checkBlackjackAndBust();
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

  playEffect(src){
    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }
}
