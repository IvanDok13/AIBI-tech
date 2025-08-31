import { movies } from './data/data.js';
import { initSlider, nextSlide, prevSlide } from './slider/slider.js';

export function changeBackground() {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const movie = movies[randomIndex];

  const backgroundElement = document.getElementById('background');
  backgroundElement.style.backgroundImage = `url(${movie.posterPath})`;

  document.getElementById('movie-title').textContent = movie.title;
  document.getElementById('movie-year').textContent = movie.year;
  document.getElementById('movie-rating').textContent = movie.rating;
  document.getElementById('movie-description').textContent = movie.description;
}

document.addEventListener('DOMContentLoaded', () => {
  changeBackground();

  const slider = document.getElementById('slider');
  const indicatorsContainer = document.getElementById('indicators');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  initSlider(slider, indicatorsContainer, movies);

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
});
