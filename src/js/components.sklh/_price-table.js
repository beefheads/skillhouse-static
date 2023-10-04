// import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";
import Swiper, { Navigation, Pagination, EffectCreative } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const priceTable = document.querySelectorAll('.price-table');
	if (!priceTable) return;

	const RERENDER_BREAKPOINT = 601;
	const swiperConfig = {
	  	modules: [Navigation, Pagination, EffectCreative],
		spaceBetween: 50,
		slidesPerView: 1,
	  	pagination: {
	    	el: '.price-table__pagination',
	    	clickable: true,
	  	},
	}

	let priceTableSwiper = new Swiper('.price-table-swiper', swiperConfig);

  function isSwiperDestroyed() {
		let swiperDestroyed = priceTableSwiper.destroyed === true;
  	return swiperDestroyed;
  }

	function initSwiper() {
		let swiperDestroyed = isSwiperDestroyed();

	  if (window.innerWidth > RERENDER_BREAKPOINT && !swiperDestroyed) {
	  	const destroy = priceTableSwiper.destroy();
	    // console.log('destroy', destroy);
	  } else if (window.innerWidth <= RERENDER_BREAKPOINT && swiperDestroyed) {
	    priceTableSwiper = new Swiper('.price-table-swiper', swiperConfig);
	    // console.log('built', priceTableSwiper)
	  }
	}

	window.addEventListener('resize', function() {
	  initSwiper();
	});
	initSwiper();
});


