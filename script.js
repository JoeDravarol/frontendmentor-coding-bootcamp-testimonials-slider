const carouselFeature = (() => {
  let currentSlideIndex = 0;
  const _minSlideIndex = 0;
  const _maxSlideIndex = 1;

  // Private
  const _setCurrentSlide = (index) => currentSlideIndex = index;
  const _incrementCurrentSlide = () => _setCurrentSlide( getCurrentSlide() + 1 )
  const _decrementCurrentSlide = () => _setCurrentSlide( getCurrentSlide() - 1 )
  const _setSlideToMax = () => _setCurrentSlide(_maxSlideIndex);
  const _setSlideToMin = () => _setCurrentSlide(_minSlideIndex);

  const _switchPrevSlide = (cb) => {
    if (currentSlideIndex === _minSlideIndex) {
      _setSlideToMax();
    } else {
      _decrementCurrentSlide()
    }

    return cb ? cb( getCurrentSlide() ) : undefined;
  }

  const _switchNextSlide = (cb) => {
    if (currentSlideIndex === _maxSlideIndex) {
      _setSlideToMin()
    } else {
      _incrementCurrentSlide()
    }

    return cb ? cb( getCurrentSlide() ) : undefined;
  }

  // Public
  const getCurrentSlide = () => currentSlideIndex;

  const switchSlide = (direction, callback) => {
    if (direction === 'previous') {
      _switchPrevSlide(callback)
    } else {
      _switchNextSlide(callback)
    }
  }

  return {
    switchSlide,
    getCurrentSlide
  }
})()

const carouselEventHandler = ((carouselFeature) => {
  // Create local version of carousel feature to change implementation
  // details for event handlers when required
  const getCurrentSlideIndex = () => carouselFeature.getCurrentSlide();
  const switchSlide = (direction, callback) => carouselFeature.switchSlide(direction, callback);

  // Helpers
  const toggleSlideActiveClass = (slideId) => {
    const slide = document.getElementById(slideId);
    slide.classList.toggle('slide--active');
  }

  const switchSlidesHandler = (event) => {
    const { target } = event;
    const buttonClassName = 'carousel__button'
    const buttonDataAttr = 'switch';

    if ( target.classList.contains(buttonClassName) ) {
      const direction = target.dataset[buttonDataAttr];
      const currentSlideId = `slide-${getCurrentSlideIndex()}`;

      toggleSlideActiveClass(currentSlideId)
      switchSlide(direction, (nextSlideIndex) => {
        const nextSlideId = `slide-${nextSlideIndex}`;
        toggleSlideActiveClass(nextSlideId)
      })
    }
  }

  // Event listeners
  const SlideListener = () => {
    const allSlides = document.querySelectorAll('.slide');

    for (let slide of allSlides) {
      slide.addEventListener('click', switchSlidesHandler)
    }
  }

  const initEvents = () => {
    SlideListener()
  }

  initEvents()
})(carouselFeature)