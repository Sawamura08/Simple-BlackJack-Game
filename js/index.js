const gameIconEl = document.getElementById("game-icon-el");
const cardEl = document.getElementById("cards-el");
const sumEl = document.getElementById("sum-el");
const playerEl = document.getElementById("player-el");

let cards = [];
let sum = 0;
let isAlive = false;
let blackJack = false;
let message;
let playerData = {
	Name: "MJ",
	chips: 500,
};

const startgame = () => {
	if (playerData.chips > 25) {
		isAlive = true;
		let firstCard = getRandomNumber();
		let secondCard = getRandomNumber();
		cards = [firstCard, secondCard];
		sum = firstCard + secondCard;
		renderGame();
	} else {
		gameIconEl.textContent = "You don't have enough chips to play the game";
	}
};

let getRandomNumber = () => {
	let randomNUmber = Math.floor(Math.random() * 13 + 1);
	if (randomNUmber === 1) {
		return 11;
	} else if (randomNUmber > 10) {
		return 10;
	} else {
		return randomNUmber;
	}
};

const renderGame = () => {
	cardEl.textContent = "Cards: ";
	for (let i = 0; i < cards.length; i++) {
		cardEl.textContent += cards[i] + " || ";
	}

	sumEl.textContent = "Sum : " + sum;
	if (sum < 21) {
		message = "Do you want to draw new card?";
	} else if (sum === 21) {
		message = "You got BlackJack!";
		blackJack = true;
		playerData.chips += 250;
		playerEl.textContent = playerData.Name + " : $" + playerData.chips;
	} else {
		message = "You're out of the game!";
		isAlive = false;
		playerData.chips -= 250;
		playerEl.textContent = playerData.Name + " : $" + playerData.chips;
	}

	gameIconEl.textContent = message;
};

const newcard = () => {
	if (isAlive === true && blackJack === false) {
		let drawCard = getRandomNumber();
		cards.push(drawCard);
		sum += drawCard;
		renderGame();
	}
};

const cashout = () => {
	if (playerData.chips > 0) {
		isAlive === false;
		blackJack === false;
		gameIconEl.textContent =
			"You've taken  out your " + playerData.chips + " chips";
		playerData.chips = 0;
		playerEl.textContent = playerData.Name + " : $" + playerData.chips;
	} else {
		gameIconEl.textContent = "You don't have chips to cash out";
	}
};

playerEl.textContent = playerData.Name + " : $" + playerData.chips;
