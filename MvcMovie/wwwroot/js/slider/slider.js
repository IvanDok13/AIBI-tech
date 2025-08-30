let currentPosition = 0;
let slidesPerView = 4;
let totalSlides = 0;
let autoSlideInterval;
let sliderElement;
let indicatorsContainer;

export function calculateSlidesPerView() {
  const width = window.innerWidth;
  if (width >= 1200) return 4;
  if (width >= 992) return 3;
  if (width >= 768) return 2;
  return 1;
}

function generateStarRating(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

export function initSlider(slider, indicators, moviesData) {
  sliderElement = slider;
  indicatorsContainer = indicators;
  totalSlides = moviesData.length;
  slidesPerView = calculateSlidesPerView();

  sliderElement.innerHTML = '';
  indicatorsContainer.innerHTML = '';

  moviesData.forEach((movie, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
            <div class="card">
                <img src="${movie.posterPath}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <div class="star-rating">
                        ${generateStarRating(movie.rating)}
                        <span>${movie.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        `;
    sliderElement.appendChild(slide);

    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
      goToSlide(index);
    });
    indicatorsContainer.appendChild(indicator);
  });

  for (let i = 0; i < slidesPerView; i++) {
    const clone = sliderElement.children[i].cloneNode(true);
    sliderElement.appendChild(clone);
  }

  updateSlider();
  startAutoSlide();
}

function updateSlider() {
  const slideWidth = sliderElement.children[0].offsetWidth + 15;
  sliderElement.style.transform = `translateX(-${currentPosition * slideWidth}px)`;

  const indicators = document.querySelectorAll('.indicator');
  let activeIndex = currentPosition % totalSlides;
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === activeIndex);
  });

  if (currentPosition >= totalSlides) {
    setTimeout(() => {
      sliderElement.style.transition = 'none';
      currentPosition = 0;
      updateSlider();
      setTimeout(() => {
        sliderElement.style.transition = 'transform 0.5s ease';
      }, 50);
    }, 1000);
  }
}

export function goToSlide(index) {
  currentPosition = index;
  updateSlider();
  resetAutoSlide();
}

export function nextSlide() {
  currentPosition++;
  updateSlider();
  resetAutoSlide();
}

export function prevSlide() {
  if (currentPosition <= 0) {
    currentPosition = totalSlides;
    sliderElement.style.transition = 'none';
    updateSlider();
    setTimeout(() => {
      sliderElement.style.transition = 'transform 0.5s ease';
      currentPosition--;
      updateSlider();
    }, 50);
  } else {
    currentPosition--;
    updateSlider();
  }
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}
