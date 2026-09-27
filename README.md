# Of Bodegas and Big Chains

An interactive story map exploring the conversation sparked by Infatuation's *The Sameification of NYC* chart. It uses restaurant locations and neighborhood rent estimates to help readers investigate what storefront patterns can reveal about New York City, and what they cannot establish on their own.

## Project Question

Can public data help us examine claims about chain restaurants, changing storefronts, and neighborhood change? The map invites readers to inspect restaurant locations, compare them with neighborhood rent patterns, and ask further questions without treating geographic overlap as proof of cause and effect.

## Story Slides

1. **The Streetscape of NYC** introduces the city's mix of restaurants, bodegas, and storefronts.
2. **Explore the Current Streetscape** lets readers browse and search restaurant locations.
3. **Rent Varies Across Neighborhoods** introduces neighborhood median gross rent estimates and compares areas and changes over time.
4. **A Closer Look: Wonder** focuses on one rapidly expanding food-hall and delivery-platform business.
5. **Neighborhoods with Wonders** overlays Wonder locations with neighborhood rent change to prompt questions about where the chain operates and the context around those locations.
6. **Explore More** encourages readers to question publication claims, inspect public data, and consider whose experiences the datasets represent.

## Interacting With the Map

- Scroll through the story cards to move between chapters.
- Use the restaurant search control to filter by restaurant name. The Wonder and Wonder-neighborhood chapters apply an exact `DBA` match for `Wonder`.
- Click and drag the map to pan. Use the `+` and `-` controls to zoom; scroll-wheel zoom is disabled.
- Click a neighborhood on the rent slides to see its name and rent information.
- Use **Reset view** to return to the opening map camera position.

## Data and Interpretation

The map is configured in `js/config.js` to use a custom Mapbox style. Its visible data layers include:

- **Restaurant inspection locations:** a Mapbox style layer named `dohmh-new-york-city-restaurant-inspection-results-20260917`, with business names in the `DBA` property. The source dataset is NYC DOHMH's [NYC Restaurant Inspection Results](https://data.cityofnewyork.us/Health/DOHMH-NYC-Restaurant-Inspection/c9jv-y9ru/about_data).
- **Neighborhood rent estimates:** the `neighborhoods` layer, with neighborhood names and median gross rent attributes for 2018 and 2023. The map labels these estimates as inflation-adjusted 2024 dollars. The source GeoJSON is Sonia C. Q.'s [NYC median rent dataset](https://github.com/soniacq/urbanTrace/blob/main/data/geojson/NYC_median_rent.geojson).
- **Rent change:** the story map calculates the displayed difference as the 2023 estimate minus the 2018 estimate.

## Run Locally

The project is a static web map. Serve the repository root over HTTP rather than opening `index.html` directly, so the browser can load local assets and external map resources consistently.

With Python installed, from the project root run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser. Stop the server with `Ctrl+C`.

## Sources and Credits

- [Infatuation: NYC Q2 2026 food trends](https://www.theinfatuation.com/new-york/features/nyc-restaurant-trends-q2-2026), the inspiration for the story map.
- [Infatuation's Sameification of NYC post](https://www.instagram.com/p/Daf0HKhMUOo/), the chart discussed in the introduction.
- [NYC DOHMH NYC Restaurant Inspection Results](https://data.cityofnewyork.us/Health/DOHMH-NYC-Restaurant-Inspection/c9jv-y9ru/about_data), used for mapped restaurant inspection locations.
- [NYC median rent GeoJSON](https://github.com/soniacq/urbanTrace/blob/main/data/geojson/NYC_median_rent.geojson) by [Sonia C. Q.](https://github.com/soniacq), used for neighborhood rent estimates.
- [Mapbox](https://www.mapbox.com/about/maps/) provides the map platform and custom style.
- [OpenStreetMap](https://www.openstreetmap.org/copyright) is credited through the map style.
-