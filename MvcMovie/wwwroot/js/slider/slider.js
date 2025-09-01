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
    stars +=
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>';
  }

  if (hasHalfStar) {
    stars +=
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16"><path d="M5.354 5.119 7.538.792a.516.516 0 0 1 .927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.33-.314-.159-.888.282-.95l4.898-.696zM8 12.027a1 1 0 0 1 .485.139l3.686 1.894-.694-3.957a1 1 0 0 1 .163-.905l2.906-2.77-4.052-.575a1 1 0 0 1-.787-.55L8 2.223v9.804z"/></svg>';
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars +=
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>';
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
