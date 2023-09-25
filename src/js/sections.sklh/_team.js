import Swiper, { Navigation, Pagination } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const problemsCarousel = document.querySelector('.team-carousel');
	if (!problemsCarousel) return;

	const teamCarousels = document.querySelectorAll('.team-carousel');

	teamCarousels.forEach((carousel, index) => {

		const uniqueClass = `team-carousel-${index}`
		carousel.classList.add(uniqueClass);

		const swiperConfig = {
			slidesPerView: 1,
		  modules: [Navigation, Pagination],
		  spaceBetween: 10,
		  pagination: {
		    el: `.${uniqueClass} .team-carousel__pagination`,
		    clickable: true,
		  },
		  navigation: {
		    nextEl: `.${uniqueClass} .team-carousel__button-next`,
		    prevEl: `.${uniqueClass} .team-carousel__button-prev`,
		  },
		}

		let problemsSwiper = new Swiper(`.${uniqueClass} .team-carousel__swiper`, swiperConfig);
	})


});