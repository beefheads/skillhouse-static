import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const quiz = document.querySelector('.quiz');
	if (!quiz) return;


	const swiperConfig = {
		allowTouchMove: false,
		slidesPerView: 1,
	  modules: [Navigation, Pagination, EffectFade],
	  spaceBetween: 10,
	  pagination: {
	    el: ".quiz__progress-pagination",
	    clickable: false,
	  },
	  navigation: {
	    nextEl: ".quiz__button-next",
	    prevEl: ".quiz__button-prev",
	  },
	  on: {
	  	init() {
				const progressCurrentValueElement = quiz.querySelector('.quiz__progress-value-current');
				progressCurrentValueElement.innerText = this.activeIndex + 1;

				const progressMaxValueElement = quiz.querySelector('.quiz__progress-value-max');
				progressMaxValueElement.innerText = this.slides.length;

				const progressValueElement = quiz.querySelector('.quiz__progress-value');
				progressValueElement.classList.remove('is-hidden');
	  	},
	  }
	}

	let quizSwiper = new Swiper('.quiz__swiper', swiperConfig);

	quizSwiper.on('init', () => {
	});

	quizSwiper.on('slideChange', () => {
		updateSwiperProgress(".quiz__progress-value-current");

		if (isPassedHaldSlides(quizSwiper)) {
			const halfSlidesPassed = new CustomEvent('half-slides-passed', { 
			  detail: {
			  },
			  bubbles: true, // Allow event to bubble up the DOM tree
			  cancelable: true // Allow event to be canceled
			});
			quiz.dispatchEvent(halfSlidesPassed);
		}
	})

	function updateSwiperProgress(currentValueSelector) {
		const currentValueElement = quizSwiper.el.closest('.quiz').querySelector(currentValueSelector);
		if (!currentValueElement) return;

		currentValueElement.innerText = quizSwiper.activeIndex + 1;
	}

	function isPassedHaldSlides(swiperVar) {
		const HALF_SLIDES = Math.ceil(swiperVar.slides.length / 2);
		const CURRENT_SLIDE = swiperVar.activeIndex + 1;

		if (CURRENT_SLIDE === HALF_SLIDES + 1) return true;
	}

	quiz.addEventListener('half-slides-passed', () => {
	})

});