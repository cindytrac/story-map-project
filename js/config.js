
let topTitleDiv = "MUSA 6110 | Story Narrative | Fall 2026";

let titleDiv =
    "What Does the Sameification of NYC Tell Us About the City?";
let subtitleDiv = "A Data-Driven Response to Infatuation's Sameification of NYC";
//let bylineDiv = "Cindy Trac";
let bylineDiv = '';

// let descriptionDiv =
//     '<p>In August 2026, Infatuation, a NYC-based publication that focuses on restaurant recommendations and guides, posted a chart titled <a href="https://www.instagram.com/p/Daf0HKhMUOo/">"The Sameification of NYC."</a> The chart plotted out which food chains (think Blank Street, 7th Street Burger) were present in which neighborhoods.   </p>' +
//     '<p>This sparked conversation over genetrification and the death of small businesses as private equity-backed business take up more and more space.</p>' +
//     "<p> </p>" +
//     '<img src="images/infat_chart.png" id="main-img">' +
//     "<p>It was fascinating to see such a response to this chart. The comments were filled with a spectrum of opinions from folks assenting that private-equity businesses (like Wonder) are taking over neighborhoods to folks defending NYC-founded chains (like 7th Street Burger).</p>" +
//     "<p>This story map will supplement the Infatuation chart with real data from the City of New York. Where are these restaurants popping up and do these neighborhoods have anything in common? What does this mean for the future of these neighborhoods?</p>" +
//     '<p style="text-align:center">scroll to continue<br>▼</p>';

let descriptionDiv =
  '<div class="intro-layout">' +
    '<div class="intro-copy">' +
      '<p>In August 2026, Infatuation, a NYC-based publication that focuses on restaurant recommendations and guides, posted a chart titled <a href="https://www.instagram.com/p/Daf0HKhMUOo/">"The Sameification of NYC."</a> The chart plotted out which food chains (think Blank Street, 7th Street Burger) were present in which neighborhoods.</p>' +
      '<p>This sparked conversation over gentrification and the death of small businesses as private equity-backed businesses take up more and more space.</p>' +
      '<p>It was fascinating to see such a response to this chart. The comments were filled with a spectrum of opinions from folks assenting that private-equity businesses are taking over neighborhoods to folks defending NYC-founded chains.</p>' +
      '<p>This story map will supplement the Infatuation chart with data on NYC restaurants (derived from NYC Inspection data), rent and income data, and neighborhood data. Where are these restaurants popping up and do these neighborhoods have anything in common? What does this mean for the future of these neighborhoods?</p>' +
      '<p style="text-align:center">scroll to continue<br>▼</p>' +
    '</div>' +
    '<img src="images/infat_chart.png" id="main-img" alt="The Sameification of NYC chart">' +
  '</div>';
  

let footerDiv =
    '<p>This story is based on the <a href="https://www.instagram.com/p/Daf0HKhMUOo/">The Same-ification of NYC chart</a> posted by <a href="http://web.mta.info/developers/turnstile.html">Infatuation NYC</a> as part of their <a href="https://www.theinfatuation.com/new-york/features/nyc-restaurant-trends-q2-2026">Q2 2026 food trends article.</a></p>' +
    '<p><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> | <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a> | <a href="https://brown.columbia.edu">The Brown Institute for Media Innovation</a></p>';

var config = {
    // style: 'mapbox://styles/mapbox/streets-v12',
    // mapbox://styles/mapbox/standard
    // leave commented to use Mapbox Standard Style

    style: "mapbox://styles/ctrac/cmuam725600dd01s52xsu0mwq",


    //accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN',
    showMarkers: true,
    markerColor: '#3FB1CE',
    topTitle: topTitleDiv,
    title: titleDiv,
    subtitle: subtitleDiv,
    byline: bylineDiv,
    description: descriptionDiv,
    footer: footerDiv,
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: true,
    insetOptions: {
        markerColor: 'orange'
    },
    insetPosition: 'bottom-right',
    theme: 'dark',
    use3dTerrain: false, //set true for enabling 3D maps.
    auto: false,
    chapters: [
        {
            id: 'slug-style-id',
            alignment: 'left',
            hidden: false,
            title: 'A MELTING POT',
            image: 'images/melting_pot.jpg',
            description: 'NYC\'s melting pot of cultures is reflected in the cuisines, bodegas, and shops you can find all across the city. As you look at the map, you\'ll see recognizable chains and mom-and-pop names. ' +
            'Often the first physical signs of genetrification come in the form of storefronts. There are over XXXX restaurants in New York (Source)',
            location: {
                center: [-73.97964, 40.75507],
                zoom: 10,
                pitch: 40,
                bearing: -43.2,
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'dohmh-new-york-city-restaurant-inspection-results-20260917',
                    opacity: 0.5,
                    duration: 5000,
                    filter: ['==', ['get', 'DBA'], 'Blank Street']
                },
                {
                    layer: 'neighborhoods',
                    opacity: 0,
                    duration: 5000
                },
                {
                    layer: 'nyc',
                    opacity: 0.3,
                    duration: 5000
                }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'second-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Washington, D.C.',
            image: 'images/infat_chart.png',
            description: 'The second chapter flies to Washington, D.C., updates the camera pitch, and slowly rotates. <br>  <br> Washington, D.C., the capital of the United States, is a vibrant city known for its iconic landmarks, including the White House, the U.S. Capitol, and the Washington Monument. It serves as the political heart of the nation and a center for history, culture, and international diplomacy.',
            location: {
                center: [-73.97964, 40.75507],
                zoom: 10,
                pitch: 40,
                bearing: 0,
                // flyTo additional controls-
                // These options control the flight curve, making it move
                // slowly and zoom out almost completely before starting
                // to pan.
                //speed: 2, // make the flying slow
                //curve: 1, // change the speed at which it zooms out
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'dohmh-new-york-city-restaurant-inspection-results-20260917',
                    opacity: 0.9,
                    duration: 5000,
                    filter: ['===', 'DBA', 'Blank Street']
                },
                {
                    layer: 'neighborhoods',
                    opacity: 0,
                    duration: 5000
                },
                {
                    layer: 'nyc',
                    opacity: 0.1,
                    duration: 5000
                }
            ],
            onChapterExit: []
        },
        {
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Geneva',
            image: './assets/geneva.jpg',
            description: 'Geneva, Switzerland, is a picturesque city nestled along the shores of Lake Geneva, surrounded by the Alps and Jura mountains. Known as a global hub for diplomacy and finance, it is home to numerous international organizations, including the United Nations and the Red Cross.',
            location: {
                center: [6.15116, 46.20595],
                zoom: 12.52,
                pitch: 8.01,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'fourth-chapter',
            alignment: 'fully',
            hidden: false,
            title: 'Buenos Aires',
            image: './assets/buenos-aires.jpg',
            description: 'Buenos Aires, the capital of Argentina, is a dynamic city known for its European-inspired architecture, vibrant tango culture, and rich culinary scene. Often called the "Paris of South America," it blends historic charm with modern energy.  You can add as many chapters as you need, just copy the JSON data and make changes.',
            location: {
                center: [-58.54195, -34.71600],
                zoom: 4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        },
        {
            id: 'fifth-chapter',
            alignment: 'fully',
            hidden: false,
            title: 'Buenos Aires',
            image: './assets/buenos-aires.jpg',
            description: 'Buenos Aires, the capital of Argentina, is a dynamic city known for its European-inspired architecture, vibrant tango culture, and rich culinary scene. Often called the "Paris of South America," it blends historic charm with modern energy.  You can add as many chapters as you need, just copy the JSON data and make changes.',
            location: {
                center: [-58.54195, -34.71600],
                zoom: 4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};
