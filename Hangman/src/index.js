// create elements game
import Words from './words.js';

function buildGame() {
	document.body.classList.add('body');

	// create wrapper and childs
	const wrapper = document.createElement('div');
	wrapper.classList.add('wrapper');
	document.body.append(wrapper);

	const arrClasses = ['gallows', 'quiz'];
	arrClasses.forEach((item) => {
		const div = document.createElement('div');
		div.classList.add(item);
		wrapper.append(div);
	});

	// add elem in gallows block
	const gallows = document.querySelector('.gallows');
	gallows.insertAdjacentHTML('beforeend', '<img class="gallows__img" src="./img/hangman-0.svg" alt="">');
	gallows.insertAdjacentHTML('beforeend', '<h1 class="gallows__title"><span>Hangman</span> Game</h1>');

	// add elem in quiz block
	const quiz = document.querySelector('.quiz');
	quiz.insertAdjacentHTML('beforeend', '<ul class="quiz__word">');
	quiz.insertAdjacentHTML('beforeend', '<h3 class="quiz__guesses">Hint: <b></b>');
	quiz.insertAdjacentHTML('beforeend', '<h3 class="quiz__guesses">Incorrect guesses: <b>0 / 6</b>');
	quiz.insertAdjacentHTML('beforeend', '<div class="quiz__keyboard">');
}
// end buildGame()
buildGame();

	window.addEventListener('load', () => {
	const keyboard = document.querySelector('.quiz__keyboard');
	const imgMan = document.querySelector('.gallows__img');
	let curWord;
	let count = 0;
	const maxCount = 6;
	const wordShow = document.querySelector('.quiz__word');
	const incorrectCounter = document.querySelectorAll('.quiz__guesses b')[1];

	const startGame = (btn, letter) => {
		if (curWord.includes(letter)) {
			[...curWord].forEach((curletter, i) => {
				if (curletter === letter) {
					wordShow.querySelectorAll('li')[i].innerText = curletter;
					wordShow.querySelectorAll('li')[i].classList.add('guessed');
				}
			});
		} else {
			count++;
			imgMan.src = `./img/hangman-${count}.svg`;
		}
		btn.disabled = true;
		incorrectCounter.innerText = `${count} / ${maxCount}`;
	};

	// create keyboard
		for (let i = 97; i <= 122; i++) {
			const btn = document.createElement('button');
			btn.innerText = String.fromCharCode(i);
			keyboard.append(btn);
			btn.addEventListener('click', (e) => startGame(e.target, String.fromCharCode(i)));
		}

// Get random words
	const getRandomWord = () => {
	const { word, hint } = Words[Math.floor(Math.random() * Words.length)];
	console.log(word);
	curWord = word;
	document.querySelector('.quiz__guesses b').innerText += hint;
	wordShow.innerHTML = word.split('').map(() => '<li class="quiz__letter"></li>').join('');
};

	getRandomWord();
});
