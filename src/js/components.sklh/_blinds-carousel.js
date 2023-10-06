// import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const blindsCarousel = document.querySelectorAll('.blinds-carousel');
	if (blindsCarousel.length == 0) return;

	const RERENDER_BREAKPOINT = 601;
	const swiperConfig = {
	  	modules: [Navigation, Pagination, EffectCreative],
		slidesPerView: 1,

		pagination: {
		    el: '.blinds-carousel__pagination',
		    clickable: true,
		},
		navigation: {
		    nextEl: '.blinds-carousel__button-next',
		    prevEl: '.blinds-carousel__button-prev',
		},

		breakpoints: {
			962: {
				slidesPerView: 3,
				slidesPerGroup: 3,
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
			}
		}
	}

	let blindsCarouselSwiper = new Swiper('.blinds-carousel-swiper', swiperConfig);


	// для отключения карусели на нужном разрешении экрана
	function isSwiperDestroyed() {
		let swiperDestroyed = blindsCarouselSwiper.destroyed === true;
	  	return swiperDestroyed;
	}
	function initSwiper() {
		let swiperDestroyed = isSwiperDestroyed();

	  if (window.innerWidth > RERENDER_BREAKPOINT && !swiperDestroyed) {
	  	const destroy = blindsCarouselSwiper.destroy();
	    // console.log('destroy', destroy);
	  } else if (window.innerWidth <= RERENDER_BREAKPOINT && swiperDestroyed) {
	    blindsCarouselSwiper = new Swiper('.blinds-carousel-swiper', swiperConfig);
	    // console.log('built', blindsCarouselSwiper)
	  }
	}

	//
	// window.addEventListener('resize', function() {
	//   initSwiper();
	// });
	// initSwiper();
});


