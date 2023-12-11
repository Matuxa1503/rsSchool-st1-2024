import products from "./products.js";

function modalWindow() {
	const body = document.querySelector("body");
	const backgroundFill = document.querySelector('.backgroundFill');

	const modal = document.querySelector('.modal__menu');
	const menuItems = document.querySelectorAll('.menu__item');
	const closeModal = document.querySelector('.menu__close-btn');

	const menuBtns = document.querySelectorAll('.menu__btns');
	const modalImg = document.querySelector('.menu__img');
	const modalTitle = document.querySelector('.menu__title');
	const menuText = document.querySelector('.menu__text');
	const price = document.querySelectorAll('.price__text')[1];

	// size and additivies btns
	const sizeModalBtn = document.querySelectorAll('.sizeModalBtn');
	const addivModalBtn = document.querySelectorAll('.addivModalBtn');

	// size and additivies products in modal
	const sizeModal = document.querySelectorAll('.sizeModal');
	const additivesModal = document.querySelectorAll('.additivesModal');

	// calc total products (переменные для подсчета цены товара)
	let size = 0;
	let priceProd = 0;
	let arr = [];

	// click item
	menuItems.forEach(item => {
		const nameTitleItem = item.children[1].children[0].textContent;
		item.addEventListener('click', () => {
			products.forEach(objItem => {
				// если найден нужный объект продукта из products.js заполняем модалку информ., записываем в переменную прайс товара и считаем сумму с доп услугами
				if (objItem.name === nameTitleItem) {
					modalContent(objItem);
					priceProd = objItem.price;
					sumSize();
				}
			});

			modal.classList.add('displayBlock');
			body.classList.add("bodyHidden");
			backgroundFill.classList.add('displayBlock');
		});
	});

	function hiddenModal() {
		modal.classList.remove('displayBlock');
		body.classList.remove("bodyHidden");
		backgroundFill.classList.remove('displayBlock');
	}

	// click close btn or background fill, hidden modal window
	closeModal.addEventListener('click', () => {
		hiddenModal();
		removeModalContent();
	});

	backgroundFill.addEventListener('click', function (e) {
		hiddenModal();
		removeModalContent();
	});

	// filling modal content window
	function modalContent(item) {
		modalImg.src = item.images.front;
		modalTitle.textContent = item.name;
		menuText.textContent = item.description;
		price.textContent = '$' + item.price;

		let i = 0;
		sizeModal.forEach(size => {
			size.textContent = Object.values(item.sizes)[i].size;
			i++;
		});

		let j = 0;
		additivesModal.forEach(additiv => {
			additiv.textContent = Object.values(item.additives)[j].name;
			j++;
		});
	}

	// remove modal content window
	function removeModalContent() {
		modalImg.src = '';
		modalTitle.textContent = '';
		menuText.textContent = '';
		price.textContent = '';
		sizeModalBtn.forEach((btn, ind) => {
			btn.disabled = false;
			if (ind == 0) {
				btn.disabled = true;
			}
		});
		sizeModal.forEach(size => size.textContent = '');
		additivesModal.forEach(additiv => additiv.textContent = '');
		addivModalBtn.forEach(btn => btn.classList.remove('activeModalBtn'));
		arr = [];
		size = 0;
		priceProd = 0;
	}


	// calc total prise (подсчет окончательной цены)
	function calcPrise() {
		let totalPrice = (size + +priceProd + (arr.length * 0.5)).toFixed(2);
		price.textContent = "$" + totalPrice;
	}

	// click btn size 
	function sumSize() {
		// клик на одну из кнопок размера
		menuBtns[0].addEventListener('click', (e) => {
			if (e.target.closest('.sizeModalBtn')) {
				sizeModalBtn.forEach(btn => btn.disabled = false);
				e.target.closest('.sizeModalBtn').disabled = true;

				// Если клик на кнопку 200 мл цена товара не увелич
				if (e.target.closest('.sizeModalBtn').id == 'S') {
					size = 0;
					calcPrise();
				}

				// увелич на 0.50$
				if (e.target.closest('.sizeModalBtn').id == 'M') {
					size = 0.5;
					calcPrise();
				}

				// увелич на 1$
				if (e.target.closest('.sizeModalBtn').id == 'L') {
					size = 1;
					calcPrise();
				}
			}
		});
	};

	// click btns additivies (проверяем через массив активны кнопки добавок или нет)
	menuBtns[1].addEventListener('click', (e) => {
		if (e.target.closest('.addivModalBtn')) {
			e.target.closest('.addivModalBtn').classList.toggle('activeModalBtn');

			if (arr.includes(e.target.closest('.addivModalBtn').id)) {
				arr.splice(arr.indexOf(e.target.closest('.addivModalBtn').id), 1);
			} else {
				arr.push(e.target.closest('.addivModalBtn').id);
			}
		}
		calcPrise();
	})
}

export default modalWindow;
