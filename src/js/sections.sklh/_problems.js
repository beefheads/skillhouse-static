import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const problemsCarousel = document.querySelector('.problems-carousel');
	if (!problemsCarousel) return;


	const swiperConfig = {
		speed: 450,
		slidesPerView: 1,
	  modules: [Navigation, Pagination, EffectCreative],
	  spaceBetween: 10,
		effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ["-20%", 0, -1],
        opacity: 0,
      },
      next: {
        translate: ["130%", 0, 0],
      },
    },

	  pagination: {
	    el: ".problems-carousel__pagination",
	    clickable: true,
	  },
	  navigation: {
	    nextEl: ".problems-carousel__button-next",
	    prevEl: ".problems-carousel__button-prev",
	  },
	}

	let problemsSwiper = new Swiper('.problems-carousel__swiper', swiperConfig);
});