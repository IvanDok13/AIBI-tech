import { movies } from './data/data.js';

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

document.addEventListener('DOMContentLoaded', changeBackground);
