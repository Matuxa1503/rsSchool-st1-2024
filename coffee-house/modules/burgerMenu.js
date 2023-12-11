// Burger menu
function burgerMenu() {
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
	}

	function hiddenBurgerMenu() {
		navMenu.classList.remove("activeMenu");
		burgerIcon.classList.remove("activeIcon");
		body.classList.remove("bodyHidden");
	}

	if (navMenu) {
		navMenu.addEventListener('click', (e) => {
			if (e.target.classList.contains('nav__link')) {
				hiddenBurgerMenu();
			}
		});
	}

	(function() {
		matchMedia('only screen and (min-width:769px)').addEventListener('change', hiddenBurgerMenu);
	})();
}

export default burgerMenu;


