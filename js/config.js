
let topTitleDiv = "MUSA 6110 | Story Narrative | Fall 2026";

let titleDiv =
    "What Does the Sameification of NYC Tell Us About the City?";
let subtitleDiv = " \n";

let bylineDiv = '';

let descriptionDiv =
  '<div class="intro-layout">' +
    '<div class="intro-copy">' +
      '<h1>OF BODEGAS AND BIG CHAINS</h1>' +
      '<h2>A Data Follow-Up to Infatuation\'s Sameification of NYC<br></h2>' +
      '<p>In August 2026, Infatuation, a NYC-based publication that focuses on restaurant recommendations and guides, posted a chart titled <a href="https://www.instagram.com/p/Daf0HKhMUOo/">"The Sameification of NYC."</a> The chart plotted out which food chains (think Blank Street, 7th Street Burger) were present in which neighborhoods.</p>' +
      '<p>This sparked conversation over gentrification and the death of small businesses as private equity-backed businesses take up more space in a city that fewer and fewer businesses are able to operate in.</p>' +
      '<p>The response to this chart was varied and passionate. The comments were filled with a spectrum of opinions from folks assenting that private-equity businesses are taking over neighborhoods to folks defending NYC-founded chains.</p>' +
      '<p>This story map looks at the places behind that conversation and asks what restaurant patterns can and can\’t tell us about neighborhood change. It will supplement the Infatuation chart with data on NYC restaurants (derived from NYC Inspection data), rent and income data, and neighborhood data. </p>' +
      
      '<p style="text-align:center">scroll to continue<br>▼</p>' +
    '</div>' +
    '<img src="images/infat_chart.png" id="main-img" alt="The Sameification of NYC chart">' +
  '</div>';
  

let footerDiv =
    '<p>This story is based on <a href="https://www.instagram.com/p/Daf0HKhMUOo/">The Same-ification of NYC chart</a> posted by <a href="http://web.mta.info/developers/turnstile.html">Infatuation NYC</a> as part of their <a href="https://www.theinfatuation.com/new-york/features/nyc-restaurant-trends-q2-2026">Q2 2026 food trends article.</a></p>' +
    '<p><a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> | <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>'

var config = {
    // style: 'mapbox://styles/mapbox/streets-v12',
    // mapbox://styles/mapbox/standard
    // leave commented to use Mapbox Standard Style

    style: "mapbox://styles/ctrac/cmuam725600dd01s52xsu0mwq",
    // accessToken only works on specified site URLs
    accessToken: "pk.eyJ1IjoiY3RyYWMiLCJhIjoiY211YmwyNTNmMDM2ejJ4cHZoeHNoMGhiZiJ9.YCUukMS6kMZWXslJJRfktA",
    //accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN',
    showMarkers: true,
    markerColor: '#3FB1CE',
    //topTitle: topTitleDiv,
    //title: titleDiv,
    subtitle: subtitleDiv,
    byline: bylineDiv,
    description: descriptionDiv,
    footer: footerDiv,
    //projection: 'equirectangular',
    //Read more about available projections here
    //https://docs.mapbox.com/mapbox-gl-js/example/projections/
    inset: false,
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
            title: 'THE STREETSCAPE OF NYC',
            //
            description: 'NYC\'s melting pot of cultures is reflected in the cuisines, bodegas, and shops you can find all across the city.  As you look at the map, you\'ll see recognizable chains, but also plenty of smaller businesses you have yet to discover.' +
            '<br><br> Storefronts are one visible way neighborhoods change. Shifts in a city\'s streetscape can raise questions about who gets to shape a neighborhood—and who can afford to stay. <br>',
            image: 'images/melting_pot.jpg',
            
            location: {
                center: [-73.97964, 40.75507],
                zoom: 10,
                pitch: 40,
                bearing: 0,
            },
            mapAnimation: 'flyTo',
            rotateAnimation: true,
            callback: '',
            onChapterEnter: [
                {
                    layer: 'dohmh-new-york-city-restaurant-inspection-results-20260917',
                    opacity: 0.5,
                    duration: 5000,
                    
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
            title: 'Explore the Current Streetscape',
            //image: 'images/infat_chart.png',
            description: 'Infatuation calls it sameification, but what this discourse signals is genetrification. Gentrification can first become visible in everyday places: a longtime shop closes, a new cafe opens, or familiar storefronts begin to look different. One new business does not prove a neighborhood is gentrifying, but a changing mix of storefronts can be an early sign residents notice. <span style="color:blue;"><br><br><b>Explore the map to see the current restaurant-scape of NYC.</b> <br><br> <b>Filter by restaurants</b> in the upper right corner. <br><b>Click and drag</b> to move around the map.</span>  ',
            location: {
                center: [-73.97964, 40.75507],
                zoom: 13,
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
                },
                {
                    layer: 'neighborhoods',
                    opacity: 0,
                    duration: 5000
                },
                {
                    layer: 'nyc',
                    opacity: 0,
                    duration: 5000
                }
            ],
            onChapterExit: []
        },
        {
            id: 'median_rent',
            alignment: 'left',
            hidden: false,
            title: 'Rent Varies Across Neighborhoods',
            //image: 'images/infat_chart.png',
            description: 'Before looking at the chains mentioned in the Infatuation chart, let\'s look at the neighborhood rent landscape.<br><br> <span style="color:blue;"><b>Click on neighborhoods on the map to see the change in median monthly rent.</b></span><br><br><b>The mapped estimates show how sharply rents can vary.</b><br>  In 2023, median gross rent was about $3,077 in Brooklyn Heights/Fort Greene and $1,343 in the Lower East Side/Chinatown.<br> <br> <b>Changes also varied from place to place.</b> From 2018 to 2023, the estimate median gross income rose about $493 in Brooklyn Heights/Fort Greene, while it dipped about $49 in the Lower East Side/Chinatown. <br><br> Next, we will use Wonder as a case study and ask how its locations relate to this uneven neighborhood landscape.',
            location: {
                center: [-73.97964, 40.75507],
                zoom: 13,
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
                    duration: 5000
                },
                {
                    layer: 'neighborhoods',
                    opacity: 0.75,
                    duration: 5000
                },
                {
                    layer: 'nyc',
                    opacity: 0,
                    duration: 500
                }
            ],
            onChapterExit: []
        },
        {
            id: 'median_rent_wonder',
            alignment: 'left',
            hidden: false,
            title: 'A CLOSER LOOK: WONDER',
            //image: 'images/infat_chart.png',
            description: 'Wonder, a food-hall that\'s also a delivery platform, is mentioned in the Infatuation chart and has been the center of recent discourse on private-equity backed food vendors expanding across the city. Rather than a food hall where each vendor has its own operation, Wonder operates as one entity, one kitchen. <br> <br>Wonder’s rapid expansion across New York makes it a useful case study in how a restaurant concept can quickly become part of the city’s streetscape. Its growing footprint raises questions: Why these neighborhoods? What does the model bring to local food options, and what might it displace?  <br><br>  ',
            location: {
                center: [-73.97964, 40.75507],
                zoom: 11,
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
                },
                {
                    layer: 'neighborhoods',
                    opacity: 0.1,
                    duration: 5000
                },
                {
                    layer: 'nyc',
                    opacity: 0,
                    duration: 5000
                }
            ],
            onChapterExit: []
        },
        {
            id: 'third-identifier',
            alignment: 'left',
            hidden: false,
            title: 'Neighborhoods with Wonders',
            description: 'All Wonder locations are located in neighborhoods that had an increase in median rent price from 2018-2023. <br> <br> <b>Compare Wonder locations with neighborhood rent patterns and consider what the map suggests.</b> <br> <br> What does this model add to local food options and what might it displace? Is it seeking a particular clientele, dense foot traffic, delivery demand, or access to commercial space?',
                
            location: {
                center: [-73.97964, 40.75507],
                zoom: 12.52,
                pitch: 8.01,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                  {
                    layer: 'dohmh-new-york-city-restaurant-inspection-results-20260917',
                    opacity: 0.9,
                    duration: 5000
                },
                {
                    layer: 'neighborhoods',
                    opacity: 0.75,
                    duration: 5000
                },
                {
                    layer: 'nyc',
                    opacity: 0,
                    duration: 500
                }
            ],
            onChapterExit: []
        },
     /*    {
            id: 'fourth-chapter',
            alignment: 'fully',
            hidden: false,
            title: '',
            description: '',
            location: {
                center: [-73.97964, 40.75507],
                zoom: 4,
                pitch: 0,
                bearing: 0
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [],
            onChapterExit: []
        }, */
        {
            id: 'last-chapter',
            alignment: 'left',
            hidden: false,
            title: 'EXPLORE MORE',
            description: 'When a publication makes a claim about the city, treat it as an invitation to get curious. What evidence supports it? What’s missing? Who gets represented, and whose experience might not show up in the data? <br> <br> A lot of information used to explore these questions is public. You don’t need to be an expert to look at a map, compare neighborhoods, or ask whether a pattern holds up. <br> <br> <b>Continue to explore on this map. </b>',
            location: {
                center: [-73.97964, 40.75507],
                zoom: 12.52,
                pitch: 8.01,
                bearing: 0.00
            },
            mapAnimation: 'flyTo',
            rotateAnimation: false,
            callback: '',
            onChapterEnter: [
                  {
                    layer: 'dohmh-new-york-city-restaurant-inspection-results-20260917',
                    opacity: 0.9,
                    duration: 5000,
                },
                {
                    layer: 'neighborhoods',
                    opacity: 0.1,
                    duration: 5000
                },
                {
                    layer: 'nyc',
                    opacity: 0,
                    duration: 5000
                }
            ],
            onChapterExit: []
        }
    ]
};
