import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const problemsCarousel = document.querySelector('.problems-carousel');
	if (!problemsCarousel) return;


	const swiperConfig = {
		slidesPerView: 1,
	  modules: [Navigation, Pagination, EffectFade],
	  spaceBetween: 10,
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