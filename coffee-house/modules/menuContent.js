import products from "./products.js";

function menuContent() {
	const menuContainer = document.querySelectorAll('.menu__grid-container');
	const menu = document.querySelectorAll('.menu__grid');

	// search type products
	products.forEach(objItem => {
		if (objItem.category == 'coffee') {
			createCard(objItem, 0);
		}

		if (objItem.category == 'tea') {
			createCard(objItem, 1);
		}

		if (objItem.category == 'dessert') {
			createCard(objItem, 2);
		}
	});

	// create cards and insert by index
	function createCard(item, ind) {
		let menuItem = document.createElement('div');
		menuItem.classList.add('menu__item');

		let imgWrapper = document.createElement('div');
		imgWrapper.classList.add('item__img-wrapper');

		let imgItem = document.createElement('div');
		imgItem.classList.add('item__img');
		imgItem.style.background = item.images.backgr;

		imgWrapper.append(imgItem);

		let itemContent = document.createElement('div');
		itemContent.classList.add('item__content');

		let itemTitle = document.createElement('h3');
		itemTitle.classList.add('item__title');
		itemTitle.textContent = item.name;

		let itemParagr = document.createElement('p');
		itemParagr.classList.add('item__text');
		itemParagr.textContent = item.description;

		let itemPrice = document.createElement('h3');
		itemPrice.classList.add('item__price');
		itemPrice.textContent = '$' + item.price;

		itemContent.append(itemTitle, itemParagr, itemPrice);

		menuItem.append(imgWrapper, itemContent);

		menu[ind].append(menuItem);
	}

	// visible button depending on the number of elements in type products
	for (let i = 0; i < menu.length; i++) {
		// если товаров данного типа больше 4х показать кнопку btn load
		if (menu[i].children.length > 4) {
			let btnLoad = document.createElement('div');
			btnLoad.classList.add('menu__btn');
			btnLoad.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>`
			btnLoad.id = `btnLoad${i}`;
			menuContainer[i].append(btnLoad);
		}
	}

	// click btn load more
	const btnsLoad = document.querySelectorAll('.menu__btn');

	function showMoreContent(btn, id) {
		menu[id].classList.add('heightAuto');
		btn.classList.add('noneLoadBtn');
	}

	btnsLoad.forEach(btn => {
		btn.addEventListener('click', function () {
			if (this.id == 'btnLoad0') {
				showMoreContent(this, 0);
			}

			if (this.id == 'btnLoad1') {
				showMoreContent(this, 1);
			}

			if (this.id == 'btnLoad2') {
				showMoreContent(this, 2);
			}
		});
	});

	// resize delete classed for btnsLoad and menu
	window.addEventListener('resize', () => {
		btnsLoad.forEach(btn => {
			btn.classList.remove('noneLoadBtn');
		});

		menu.forEach(menu => {
			menu.classList.remove('heightAuto');
		});
	});

	// click btn type
	const btns = document.querySelectorAll('.info__type-btn');

	function showTypeContent(btn, id) {
		menuContainer[id].classList.add('activeMenu');
		btn.disabled = true;
	}

	btns.forEach(btn => {
		btn.addEventListener('click', function () {
			menuContainer.forEach(item => item.classList.remove('activeMenu'));
			btns.forEach(btn => btn.disabled = false);

			if (this.id == 'coffee') {
				showTypeContent(this, 0);
			}

			if (this.id == 'tea') {
				showTypeContent(this, 1);
			}

			if (this.id == 'dessert') {
				showTypeContent(this, 2);
			}
		});
	});
}

export default menuContent;
