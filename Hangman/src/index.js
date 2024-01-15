// create elements game
function buildGame() {
	document.body.classList.add('body');

	const wrapper = document.createElement('div');
	wrapper.classList.add('wrapper');
	document.body.append(wrapper);

	const arrClasses = ['gallows', 'quiz'];
	arrClasses.forEach((item) => {
		const div = document.createElement('div');
		div.classList.add(item);
		wrapper.append(div);
	});

	const gallows = document.querySelector('.gallows');
	gallows.insertAdjacentHTML('beforeend', '<img class="gallows__img" src="./img/hangman-0.svg" alt="">');
	gallows.insertAdjacentHTML('beforeend', '<h1 class="gallows__title"><span>Hangman</span> Game</h1>');

	const quiz = document.querySelector('.quiz');
	quiz.insertAdjacentHTML('beforeend', '<ul class="quiz__word">');
	quiz.insertAdjacentHTML('beforeend', '<h3 class="quiz__guesses">Hint: <b>Музыкальный инструмент духовой</b>');
	quiz.insertAdjacentHTML('beforeend', '<h3 class="quiz__guesses">Incorrect guesses: <b>0 / 6</b>');
	quiz.insertAdjacentHTML('beforeend', '<div class="quiz__keyboard">');

	const keyboard = document.querySelector('.quiz__keyboard');
	const symbArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
	symbArr.forEach((symb) => {
		const btn = document.createElement('button');
		btn.append(symb);
		keyboard.append(btn);
	});
}

window.addEventListener('load', () => {
	buildGame();
});