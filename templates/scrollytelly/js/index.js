import { SlideDeck } from './slidedeck.js';

// 1. Initialize the map container
const map = L.map('map', { scrollWheelZoom: false }).setView([42.3126, -71.0407], 12);

// 2. Define the base tile layer URL and options
var openStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// 3. Add the layer to the map
openStreetMap.addTo(map);



// // ## The Base Tile Layer
// const baseTileLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
//   maxZoom: 16,
//   attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
// });
// baseTileLayer.addTo(map);

// ## Interface Elements
const container = document.querySelector('.slide-section');
const slides = document.querySelectorAll('.slide');

const slideOptions = {
  'second-slide': {
    style: (feature) => {
      return {
        color: 'red',
        fillColor: 'green',
        fillOpacity: 0.5,
      };
    },
    onEachFeature: (feature, layer) => {
      layer.bindTooltip(feature.properties.label);
    },
  },
  'third-slide': {
    style: (feature) => {
      return {
        color: 'blue',
        fillColor: 'yellow',
        fillOpacity: 0.5,
      };
    },
    onEachFeature: (feature, layer) => {
      layer.bindTooltip(feature.properties.label);
    },
  },
};

// ## The SlideDeck object
const deck = new SlideDeck(container, slides, map, slideOptions);

document.addEventListener('scroll', () => deck.calcCurrentSlideIndex());

deck.preloadFeatureCollections();
deck.syncMapToCurrentSlide();
