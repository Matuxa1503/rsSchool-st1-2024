// Burger menu
const body = document.querySelector("body");
const burgerContainer = document.querySelector('.header__burger__container');
const navMenu = document.querySelector('.nav__content');
const burgerIcon = document.querySelector('.header__burger-icon');

if (burgerContainer) {
	burgerContainer.addEventListener("click", () => {
		burgerIcon.classList.toggle("activeIcon");
		navMenu.classList.toggle("activeMenu");
		body.classList.toggle("bodyHidden");
	});
};

if (navMenu) {
	navMenu.addEventListener('click', (e) => {
		if (e.target.classList.contains('nav__link')) {
			navMenu.classList.remove("activeMenu");
			burgerIcon.classList.remove("activeIcon");
			body.classList.remove("bodyHidden");
		}
	});
}


// carousel swiper
const items = document.querySelectorAll('.carousel__item');
const itemsContainer = document.querySelectorAll('.carousel__container-items');
const pagination = document.querySelectorAll('.favCoffee__pagination-rectangle');

let curItem = 0;
let posItem = 0;
let intervalCarousel;

function changeCurItem(n) {
	curItem = (n + items.length) % items.length;
}

// arrow btns
document.querySelector('#arrowLeft').addEventListener('click', () => {
	clearInterval(intervalCarousel);
	prevItem(curItem);
	curPagination(curItem);
	// interval()
});

document.querySelector('#arrowRight').addEventListener('click', () => {
	clearInterval(intervalCarousel);
	nextItem(curItem);
	curPagination(curItem);
	// interval()
});

// prev element
function prevItem(n) {
	let prevIndexItem = n - 1;
	if (prevIndexItem < 0) {
		posItem -= (items[items.length - 1].getBoundingClientRect().width + parseInt(getComputedStyle(items[items.length - 1]).marginRight)) * 2;
	} 

	if (prevIndexItem >= 0) {
		posItem += items[prevIndexItem].getBoundingClientRect().width + parseInt(getComputedStyle(items[prevIndexItem]).marginRight);
	}
	changeCurItem(prevIndexItem);
	itemsContainer[0].style.left = posItem + 'px';
}

// next element
function nextItem(n) {
	let nextIndexItem = n + 1;
	if (nextIndexItem < 3) {
		posItem -= items[nextIndexItem].getBoundingClientRect().width + parseInt(getComputedStyle(items[nextIndexItem]).marginRight);
	} 

	if (nextIndexItem > 2) {
		posItem = 0;
	}
	changeCurItem(nextIndexItem);
	itemsContainer[0].style.left = posItem + 'px';
}

// current pagination 
function curPagination(n) {
	pagination.forEach(item => item.classList.remove('activePag'));
	pagination[n].classList.add('activePag');
}

function interval() {
	intervalCarousel = setInterval(() => {nextItem(curItem); curPagination(curItem)}, 5000);
}

// interval()

// items[0].addEventListener('mousedown', () => console.log('click'))
// items[0].addEventListener('mouseup', () => console.log('noneClick'))
// items[0].addEventListener('mouseover', () => console.log('навел'))
// items[0].addEventListener('mouseout', () => console.log('убрал'))

const swiper = (el) => {
	let areaSwipe = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;

	let startTime = 0;
	let finishTime = 0;

	let distMouse = 150;
	let angleMouse = 100;
	let allowedTime = 300;

	areaSwipe.addEventListener('mousedown', (e) => {
		e.preventDefault();
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
	});

	areaSwipe.addEventListener('mouseup', (e) => {
		e.preventDefault();
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		finishTime = new Date().getTime() - startTime;
		
		if (finishTime <= allowedTime) {
			if (Math.abs(distX) >= distMouse && Math.abs(distY) <= angleMouse) {
				if (distX > 0) {
					prevItem(curItem);
					curPagination(curItem);
				} else {
					nextItem(curItem);
					curPagination(curItem);
				}
			}
		}
	});

	areaSwipe.addEventListener('touchstart', (e) => {
		e.preventDefault();
		let touchObj = e.changedTouches[0];
		startX = touchObj.pageX;
		startY = touchObj.pageY;
		startTime = new Date().getTime();
	});

	areaSwipe.addEventListener('touchmove', (e) => {
		e.preventDefault();
	});

	areaSwipe.addEventListener('touchend', (e) => {
		e.preventDefault();
		let touchObj = e.changedTouches[0];
		distX = touchObj.pageX - startX;
		distY = touchObj.pageY - startY;
		finishTime = new Date().getTime() - startTime;
		
		if (finishTime <= allowedTime) {
			if (Math.abs(distX) >= distMouse && Math.abs(distY) <= angleMouse) {
				if (distX > 0) {
					prevItem(curItem);
					curPagination(curItem);
				} else {
					nextItem(curItem);
					curPagination(curItem);
				}
			}
		}
	});
}

let el = itemsContainer[0];
swiper(el);


