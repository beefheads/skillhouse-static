import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade, Grid } from "swiper";

window.addEventListener('DOMContentLoaded', (event) => {
	const priceTable = document.querySelectorAll('.price-table');
	if (!priceTable) return;

	const swiperConfig = {
		slidesPerView: 1,
	}

	let priceTableSwiper = new Swiper('.price-table-swiper', swiperConfig);

  function isSwiperDestroyed() {
		let swiperDestroyed = priceTableSwiper.destroyed === true;
  	return swiperDestroyed;
  }

	function initSwiper() {
		let swiperDestroyed = isSwiperDestroyed();

	  if (window.innerWidth > 992 && !swiperDestroyed) {
	  	const destroy = priceTableSwiper.destroy();
	    // console.log('destroy', destroy);
	  } else if (window.innerWidth <= 992 && swiperDestroyed) {
	    priceTableSwiper = new Swiper('.price-table-swiper', swiperConfig);
	    // console.log('built', priceTableSwiper)
	  }
	}

	window.addEventListener('resize', function() {
	  initSwiper();
	});
	initSwiper();
});


