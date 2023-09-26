import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const quiz = document.querySelector('.quiz');
	if (!quiz) return;


	const swiperConfig = {
		autoHeight: true,
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
	  		initSwiperProgress(this);
	  		handleRadioChange(this);
	  	},
	  }
	}

	let quizSwiper = new Swiper('.quiz__swiper', swiperConfig);

	quizSwiper.on('slideChange', () => {
		updateSwiperProgress(".quiz__progress-value-current");

		if (isPassedHalfSlides(quizSwiper)) {
			dispatchQuizEvent('half-slides-passed');
		}

		handleQuizFinishing(quizSwiper)
	})


	function handleRadioChange(context) {
		context.el.querySelectorAll('input[type="radio"]').forEach(radio => {
			radio.addEventListener('change', () => {
				setTimeout(() => {
					context.slideNext();
				}, 400)
			})
		})
	}

	function initSwiperProgress(context) {
		const progressCurrentValueElement = quiz.querySelector('.quiz__progress-value-current');
		progressCurrentValueElement.innerText = context.activeIndex + 1;

		const progressMaxValueElement = quiz.querySelector('.quiz__progress-value-max');
		progressMaxValueElement.innerText = context.slides.length;

		const progressValueElement = quiz.querySelector('.quiz__progress-value');
		progressValueElement.classList.remove('is-hidden');
	}

	function updateSwiperProgress(currentValueSelector) {
		const currentValueElement = quizSwiper.el.closest('.quiz').querySelector(currentValueSelector);
		if (!currentValueElement) return;

		currentValueElement.innerText = quizSwiper.activeIndex + 1;
	}

	function handleQuizFinishing(context) {
		const CURRENT_SLIDE = context.activeIndex + 1;
		const LAST_SLIDE_INDEX = context.slides.length;

		if (CURRENT_SLIDE === LAST_SLIDE_INDEX) {
			// console.log('последний')
			dispatchQuizEvent('slide-last')
			quiz.classList.add('quiz--slide-final')
		} else {
			dispatchQuizEvent('slide-not-last')
			quiz.classList.remove('quiz--slide-final')
		}

		if (CURRENT_SLIDE === LAST_SLIDE_INDEX - 1) {
			// console.log('предпоследний')
			dispatchQuizEvent('slide-before-last')
		}
	}

	function dispatchQuizEvent(eventName, data = {}) {
		const event = new CustomEvent(eventName, { 
		  detail: data,
		  bubbles: true, // Allow event to bubble up the DOM tree
		  cancelable: true // Allow event to be canceled
		});
		quiz.dispatchEvent(event);
	}

	function isPassedHalfSlides(swiperVar) {
		const HALF_SLIDES = Math.ceil(swiperVar.slides.length / 2);
		const CURRENT_SLIDE = swiperVar.activeIndex + 1;

		if (CURRENT_SLIDE === HALF_SLIDES + 1) return true;
	}

	quiz.addEventListener('half-slides-passed', () => {
		// console.log('half')
	})
	quiz.addEventListener('slide-last', () => {
		// console.log('slide-last')
	})
	quiz.addEventListener('slide-before-last', () => {
		// console.log('slides-before-last')
	})

});