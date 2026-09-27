/* First, define what constitutes a small screen.
This will affect the zoom parameter for each chapter. */

var smallMedia = window.matchMedia("(max-width: 600px)").matches;

var initLoad = true;

// var that holds diff types of layers available to Mapbox and opacity attributes
var layerTypes = {
  'fill': ['fill-opacity'],
  'line': ['line-opacity'],
  'circle': ['circle-opacity', 'circle-stroke-opacity'],
  'symbol': ['icon-opacity', 'text-opacity'],
  'raster': ['raster-opacity'],
  'fill-extrusion': ['fill-extrusion-opacity'],
  'heatmap': ['heatmap-opacity']
}

// var that holds possible alignments 
var alignments = {
  'left': 'lefty',
  'center': 'centered',
  'right': 'righty',
  'full': 'fully'
}

// gets the type of layer
function getLayerPaintType(layer) {
  var layerType = map.getLayer(layer).type;
  return layerTypes[layerType];
}

// adjusts layer's opacity
function setLayerOpacity(layer) {
  var paintProps = getLayerPaintType(layer.layer);
  paintProps.forEach(function (prop) {
    var options = {};
    if (layer.duration) {
      var transitionProp = prop + "-transition";
      options = { "duration": layer.duration };
      map.setPaintProperty(layer.layer, transitionProp, options);
    }
    map.setPaintProperty(layer.layer, prop, layer.opacity, options);
  });
}

// main 'story', 'features' and 'header' elements
var story = document.getElementById('story');
var features = document.createElement('div');
features.setAttribute('id', 'features');
var header = document.createElement('div');

// If the content exists, then assign it to the 'header' element
// Note how each one of these are assigning 'innerHTML'
if (config.topTitle) {
  var titleText = document.createElement('h4');
  titleText.innerText = config.topTitle;
  header.appendChild(titleText);
}

if (config.title) {
  var titleText = document.createElement('h1');
  titleText.innerText = config.title;
  header.appendChild(titleText);
}

if (config.subtitle) {
  var subtitleText = document.createElement('h2');
  subtitleText.innerText = config.subtitle;
  header.appendChild(subtitleText);
}

if (config.byline) {
  var bylineText = document.createElement('p');
  bylineText.innerText = config.byline;
  header.appendChild(bylineText);
}

if (config.description) {
  var descriptionText = document.createElement("div");
  descriptionText.innerHTML = config.description;
  header.appendChild(descriptionText);
}

// If after this, the header has anything in it, it gets appended to the story
if (header.innerText.length > 0) {
  header.classList.add(config.theme);
  header.setAttribute('id', 'header');
  story.appendChild(header);
}

/* After building the elements and assigning content to the header these
functions will loop through the chapters in the config.js file,
create the vignette elements and assign them their respective content */
config.chapters.forEach((record, idx) => {
  // 2 variables that hold each vignette, the chapter
  // element will go in the container element  
  var container = document.createElement('div');
  var chapter = document.createElement('div');

  // Adds a class to the vignette
  chapter.classList.add("br3");
  // Adds all the content to the vignette's div
  chapter.innerHTML = record.chapterDiv;
  // Sets the id for the vignette and adds the step css attribute
  container.setAttribute("id", record.id);
  container.classList.add("step");
  // only use chapterDiv if it exists
  if (record.chapterDiv) {
    chapter.innerHTML = record.chapterDiv;
  }

  chapter.innerHTML = record.chapterDiv || '';
  
  if (record.title) {
    var title = document.createElement('h3');
    title.innerText = record.title;
    chapter.appendChild(title);
  }

  if (record.description) {
    var story = document.createElement('p');
    story.innerHTML = record.description;
    chapter.appendChild(story);
  }

  if (record.image) {
    var image = new Image();
    image.src = record.image;
    chapter.appendChild(image);
  }


  container.setAttribute('id', record.id);

  // If the chapter is the first one, set it to active
  container.classList.add('step');
  if (idx === 0) {
    container.classList.add('active');
  }
  // Adds the overall theme to the chapter element
  chapter.classList.add(config.theme);
  container.appendChild(chapter);
  container.classList.add(alignments[record.alignment] || 'centered');
  if (record.hidden) {
    container.classList.add('hidden');
  }
  features.appendChild(container);
});

// Appends the features element (with the vignettes) to the story element
story.appendChild(features);

/* Next, this section creates the footer element and assigns it
its content based on the config.js file */
var footer = document.createElement('div');

// This assigns all the content to the footer element
if (config.footer) {
  var footerText = document.createElement('p');
  footerText.innerHTML = config.footer;
  footer.appendChild(footerText);
}

// If the footer element contains any content, add it to the story
if (footer.innerText.length > 0) {
  footer.classList.add(config.theme);
  footer.setAttribute('id', 'footer');
  story.appendChild(footer);
}

// Adds the Mapbox access token
mapboxgl.accessToken = config.accessToken;

// Honestly, don't know what this does
const transformRequest = (url) => {
  const hasQuery = url.indexOf("?") !== -1;
  const suffix = hasQuery
    ? "&pluginName=scrollytellingV2"
    : "?pluginName=scrollytellingV2";
  return {
    url: url + suffix,
  };
};

// COMMENT OUT IF ZOOM IS WEIRD
// Creates a variable to hold the starting zoom value
var startingZoom;
// If the screen size is small, it uses the `zoomSmall` value
if (smallMedia) {
  startingZoom = config.chapters[0].location.zoomSmall;
} else {
  startingZoom = config.chapters[0].location.zoom;
}

const initialView = {
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  bearing: config.chapters[0].location.bearing,
  pitch: config.chapters[0].location.pitch,
};

var map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: initialView.center,
  zoom: initialView.zoom,
  //zoom: startingZoom,
  bearing: initialView.bearing,
  pitch: initialView.pitch,
  interactive: true,
  projection: config.projection,
  transformRequest: transformRequest

});

map.dragPan.enable();
map.scrollZoom.disable();
map.boxZoom.enable();
map.dragRotate.disable();
map.keyboard.disable();
map.doubleClickZoom.disable();
map.touchZoomRotate.disable();

// Create a inset map if enabled in config.js
if (config.inset) {
  map.addControl(
    new GlobeMinimap({ ...config.insetOptions }),
    config.insetPosition
  );
}

if (config.showMarkers) {
  var marker = new mapboxgl.Marker({ color: config.markerColor });
  marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

const resetViewButton = document.createElement('button');
resetViewButton.className = 'reset-view-button map-tools-hidden';
resetViewButton.type = 'button';
resetViewButton.textContent = 'Reset view';
resetViewButton.setAttribute('aria-label', 'Reset map to its initial view');
resetViewButton.title = 'Reset map to its initial view';
resetViewButton.addEventListener('click', () => {
  map.flyTo({ ...initialView, essential: true });
  if (config.showMarkers) {
    marker.setLngLat(initialView.center);
  }
});
document.body.appendChild(resetViewButton);

const zoomControls = document.createElement('div');
zoomControls.className = 'zoom-controls map-tools-hidden';

const zoomInButton = document.createElement('button');
zoomInButton.type = 'button';
zoomInButton.textContent = '+';
zoomInButton.setAttribute('aria-label', 'Zoom in');
zoomInButton.title = 'Zoom in';
zoomInButton.addEventListener('click', (event) => {
  event.stopPropagation();
  map.zoomIn({ duration: 300 });
});

const zoomOutButton = document.createElement('button');
zoomOutButton.type = 'button';
zoomOutButton.textContent = '−';
zoomOutButton.setAttribute('aria-label', 'Zoom out');
zoomOutButton.title = 'Zoom out';
zoomOutButton.addEventListener('click', (event) => {
  event.stopPropagation();
  map.zoomOut({ duration: 300 });
});

zoomControls.append(zoomInButton, zoomOutButton);
document.body.appendChild(zoomControls);

// set ids for restaurant filters
const restaurantLayerId = 'dohmh-new-york-city-restaurant-inspection-results-20260917';
const restaurantMarkerLayerId = 'restaurant-search-markers';
const restaurantSearchControl = document.createElement('div');
restaurantSearchControl.className = 'restaurant-search-control map-tools-hidden';

const rentChangeLegend = document.createElement('div');
rentChangeLegend.className = 'rent-change-legend map-tools-hidden';
const rentPriceLegendContent =
  '<strong>Median Monthly Rent</strong>' +
  '<span>2023 estimate, 2024 dollars</span>' +
  '<div class="rent-price-ramp" aria-hidden="true"></div>' +
  '<div class="rent-change-labels"><span>$1,100</span><span>$2,400</span><span>$3,600+</span></div>';
const rentChangeLegendContent =
  '<strong>Median Rent Change</strong>' +
  '<span>2018 to 2023, monthly dollars</span>' +
  '<div class="rent-change-ramp" aria-hidden="true"></div>' +
  '<div class="rent-change-labels"><span>Decrease</span><span>No change</span><span>Increase</span></div>';
rentChangeLegend.innerHTML = rentPriceLegendContent;
document.body.appendChild(rentChangeLegend);

const restaurantSearchLabel = document.createElement('label');
restaurantSearchLabel.htmlFor = 'restaurant-search';
restaurantSearchLabel.textContent = 'Filter Restaurants';

const restaurantSearchRow = document.createElement('div');
restaurantSearchRow.className = 'restaurant-search-row';

const restaurantSearch = document.createElement('input');
restaurantSearch.id = 'restaurant-search';
restaurantSearch.type = 'search';
restaurantSearch.placeholder = 'Search by restaurant name';
restaurantSearch.autocomplete = 'off';
restaurantSearch.disabled = true;

const clearRestaurantSearch = document.createElement('button');
clearRestaurantSearch.type = 'button';
clearRestaurantSearch.textContent = 'Clear';
clearRestaurantSearch.disabled = true;

restaurantSearchRow.append(restaurantSearch, clearRestaurantSearch);
restaurantSearchControl.append(restaurantSearchLabel, restaurantSearchRow);
document.body.appendChild(restaurantSearchControl);

const updateMapToolsVisibility = () => {
  const firstChapter = document.getElementById(config.chapters[0].id);
  const showControls = firstChapter &&
    firstChapter.getBoundingClientRect().top < window.innerHeight * 0.6;

  resetViewButton.classList.toggle('map-tools-hidden', !showControls);
  zoomControls.classList.toggle('map-tools-hidden', !showControls);
  restaurantSearchControl.classList.toggle('map-tools-hidden', !showControls);
};

window.addEventListener('scroll', updateMapToolsVisibility, { passive: true });
window.addEventListener('resize', updateMapToolsVisibility);
window.addEventListener('load', updateMapToolsVisibility);
const introHeader = document.getElementById('header');
if (introHeader && 'ResizeObserver' in window) {
  new ResizeObserver(updateMapToolsVisibility).observe(introHeader);
}
updateMapToolsVisibility();

const applyRestaurantSearch = (exactMatch = false) => {
  if (!map.getLayer(restaurantLayerId)) return;

  const searchTerm = restaurantSearch.value.trim().toLowerCase();
  const restaurantName = ['downcase', ['to-string', ['get', 'DBA']]];
  const filter = !searchTerm
    ? null
    : exactMatch
      ? ['==', restaurantName, searchTerm]
      : ['>=', ['index-of', searchTerm, restaurantName], 0];

  map.setFilter(restaurantLayerId, filter);

  if (map.getLayer(restaurantMarkerLayerId)) {
    map.setFilter(restaurantMarkerLayerId, filter);
    map.setLayoutProperty(
      restaurantMarkerLayerId,
      'visibility',
      searchTerm ? 'visible' : 'none'
    );
  }
};

restaurantSearch.addEventListener('input', () => applyRestaurantSearch());
clearRestaurantSearch.addEventListener('click', () => {
  restaurantSearch.value = '';
  applyRestaurantSearch();
  restaurantSearch.focus();
});
map.once('load', () => {
  const restaurantLayer = map.getLayer(restaurantLayerId);
  if (restaurantLayer && !map.getLayer(restaurantMarkerLayerId)) {
    map.addLayer({
      id: restaurantMarkerLayerId,
      type: 'circle',
      source: restaurantLayer.source,
      'source-layer': restaurantLayer['source-layer'],
      layout: {
        visibility: 'none',
      },
      paint: {
        'circle-color': '#e96138',
        'circle-radius': 6,
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 1.5,
      },
    });
  }

  restaurantSearch.disabled = false;
  clearRestaurantSearch.disabled = false;
  applyRestaurantSearch();
});

// instantiate the scrollama
var scroller = scrollama();

// add clicking on 
map.on("load", function () {
  map.on('click', 'neighborhoods', (event) => {
    const activeRentChapter = ['median_rent', 'third-identifier'].some((id) =>
      document.getElementById(id)?.classList.contains('active')
    );
    if (!activeRentChapter) return;

    const properties = event.features?.[0]?.properties;
    if (!properties) return;

    const areaName = properties.Official_SBA_name ||
      properties['Sub-Borough Area'] || 'Unknown area';
    const rent2018 = Number(properties['2018']);
    const rent2023 = Number(properties['2023']);
    const rentChange = rent2023 - rent2018;
    const formatRent = (rent) => Number.isFinite(rent)
      ? `$${Math.round(rent).toLocaleString('en-US')}`
      : 'Not available';
    const formatRentChange = (change) => Number.isFinite(change)
      ? `${change > 0 ? '+' : change < 0 ? '−' : ''}$${Math.round(Math.abs(change)).toLocaleString('en-US')}`
      : 'Not available';
    const escapedAreaName = String(areaName).replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);

    const activeChapterId = config.chapters.find((chapter) =>
      document.getElementById(chapter.id)?.classList.contains('active')
    )?.id;
    const popupContent = activeChapterId === 'median_rent'
      ? `<strong>${escapedAreaName}</strong><br>` +
        `2023 median rent: ${formatRent(rent2023)}`
      : `<strong>${escapedAreaName}</strong><br>` +
        `2018 median gross rent: ${formatRent(rent2018)}<br>` +
        `2023 median gross rent: ${formatRent(rent2023)}<br>` +
        `Change (2023 minus 2018): ${formatRentChange(rentChange)}`;

    new mapboxgl.Popup()
      .setLngLat(event.lngLat)
      .setHTML(popupContent)
      .addTo(map);
  });

  map.on('mouseenter', 'neighborhoods', () => {
    const rentChapterActive = ['median_rent', 'third-identifier'].some((id) =>
      document.getElementById(id)?.classList.contains('active')
    );
    if (rentChapterActive) {
      map.getCanvas().style.cursor = 'pointer';
    }
  });

  map.on('mouseleave', 'neighborhoods', () => {
    map.getCanvas().style.cursor = '';
  });

  if (config.use3dTerrain) {
    map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

    // add a sky layer that will show when the map is highly pitched
    map.addLayer({
      'id': 'sky',
      'type': 'sky',
      'paint': {
        'sky-type': 'atmosphere',
        'sky-atmosphere-sun': [0.0, 0.0],
        'sky-atmosphere-sun-intensity': 15
      }
    });
  };


  // setup the instance, pass callback functions
  scroller
    .setup({
      step: '.step',
      offset: 0.5,
      progress: true
    })
    .onStepEnter(async response => {
      var current_chapter = config.chapters.findIndex(chap => chap.id === response.element.id);
      var chapter = config.chapters[current_chapter];

      const rentLegendChapters = [
        'median_rent',
        'median_rent_wonder',
        'third-identifier',
        'last-chapter',
      ];
      rentChangeLegend.classList.toggle(
        'map-tools-hidden',
        !rentLegendChapters.includes(chapter.id)
      );

      if (chapter.id === 'median_rent_wonder' || chapter.id === 'third-identifier') {
        restaurantSearch.value = 'Wonder';
        applyRestaurantSearch(true);
      }

      if (chapter.id === 'median_rent' && map.getLayer('neighborhoods')) {
        map.setPaintProperty('neighborhoods', 'fill-color', [
          'interpolate', ['linear'], ['to-number', ['get', '2023']],
          1100, '#fff4cc',
          1700, '#fdb863',
          2400, '#e8753b',
          3000, '#bd3b32',
          3600, '#772b3a',
        ]);
        rentChangeLegend.innerHTML = rentPriceLegendContent;
      }

      if (chapter.id === 'third-identifier' && map.getLayer('neighborhoods')) {
        const rentChange = [
          '-',
          ['coalesce', ['to-number', ['get', '2023']], 0],
          ['coalesce', ['to-number', ['get', '2018']], 0],
        ];
        map.setPaintProperty('neighborhoods', 'fill-color', [
          'interpolate', ['linear'], rentChange,
          -1000, '#2166ac',
          -500, '#92c5de',
          0, '#f7f7f2',
          500, '#f4a582',
          1000, '#b2182b',
        ]);
        rentChangeLegend.innerHTML = rentChangeLegendContent;
      }

      if (current_chapter === 0) {
        resetViewButton.classList.remove('map-tools-hidden');
        zoomControls.classList.remove('map-tools-hidden');
        restaurantSearchControl.classList.remove('map-tools-hidden');
      }

      response.element.classList.add('active');
      map[chapter.mapAnimation || 'flyTo'](chapter.location);

      if (config.showMarkers) {
        marker.setLngLat(chapter.location.center);
      }
      if (chapter.onChapterEnter.length > 0) {
        chapter.onChapterEnter.forEach(setLayerOpacity);
      }
      if (chapter.callback) {
        window[chapter.callback]();
      }
      if (chapter.rotateAnimation) {
        map.once('moveend', () => {
          const rotateNumber = map.getBearing();
          map.rotateTo(rotateNumber + 180, {
            duration: 30000, easing: function (t) {
              return t;
            }
          });
        });
      }
      if (config.auto) {
        var next_chapter = (current_chapter + 1) % config.chapters.length;
        map.once('moveend', () => {
          document.querySelectorAll('[data-scrollama-index="' + next_chapter.toString() + '"]')[0].scrollIntoView();
        });
      }
    })
    .onStepExit(response => {
      var chapter = config.chapters.find(chap => chap.id === response.element.id);
      response.element.classList.remove('active');
      if (
        chapter.id === 'third-identifier' ||
        (chapter.id === 'median_rent_wonder' && response.direction === 'up')
      ) {
        restaurantSearch.value = '';
        applyRestaurantSearch();
      }
      if (response.element.id === config.chapters[0].id && response.direction === 'up') {
        resetViewButton.classList.add('map-tools-hidden');
        zoomControls.classList.add('map-tools-hidden');
        restaurantSearchControl.classList.add('map-tools-hidden');
        rentChangeLegend.classList.add('map-tools-hidden');
      }
      if (chapter.onChapterExit.length > 0) {
        chapter.onChapterExit.forEach(setLayerOpacity);
      }
    });


  if (config.auto) {
    document.querySelectorAll('[data-scrollama-index="0"]')[0].scrollIntoView();
  }
});

