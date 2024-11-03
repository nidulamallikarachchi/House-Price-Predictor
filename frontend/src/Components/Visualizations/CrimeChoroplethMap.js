import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import * as d3 from 'd3';

const CrimeChoroplethMap = () => {
    useEffect(() => {
        const loadAndRenderMap = async () => {
            try {
                // Load GeoJSON and CSV data from public folder
                const geojson = await d3.json('/usa_states.json');
                const crimeData = await d3.csv('/crimes_by_state.csv');

                // Create a dictionary for quick access to crime rates by state name
                const crimeRates = {};
                crimeData.forEach(row => {
                    crimeRates[row.state] = {
                        property: parseFloat(row.property_per_100_000),
                        violence: parseFloat(row.violence_per_100_000)
                    };
                });

                // Map crime data to GeoJSON states
                geojson.features.forEach(feature => {
                    const stateName = feature.properties.name;
                    if (crimeRates[stateName]) {
                        feature.properties.property_per_100_000 = crimeRates[stateName].property;
                        feature.properties.violence_per_100_000 = crimeRates[stateName].violence;
                    } else {
                        feature.properties.property_per_100_000 = null;
                        feature.properties.violence_per_100_000 = null;
                    }
                });

                // Create data for Plotly choropleth
                const data = [{
                    type: 'choroplethmapbox',
                    geojson: geojson,
                    locations: geojson.features.map(f => f.id), // State ID (e.g., 'AL', 'AK')
                    z: geojson.features.map(f => f.properties.violence_per_100_000), // Violence crime rate
                    text: geojson.features.map(f => `${f.properties.name}<br>Violent Crime: ${f.properties.violence_per_100_000 || "N/A"}<br>Property Crime: ${f.properties.property_per_100_000 || "N/A"}`),
                    colorbar: {
                        title: ''
                    },
                    colorscale: [
                        [0, 'rgb(253,202,106)'],
                        [1, 'rgb(108,0,0)']
                    ],
                    marker: {
                        line: {
                            width: 1,
                            color: 'darkgray'
                        }
                    },
                    hoverinfo: 'text'
                }];

                // Set layout configuration
                const layout = {
                    mapbox: {
                        style: 'carto-positron',
                        center: { lon: -95.71, lat: 37.09 },
                        zoom: 3
                    },
                    title: '',
                    margin: { t: 40, b: 20 }
                };

                // Initialize Plotly map
                Plotly.newPlot('choropleth_map', data, layout);
            } catch (error) {
                console.error('Error loading data or rendering map:', error);
            }
        };

        loadAndRenderMap();
    }, []);

    return (
        <div id="choropleth_map" style={{ width: '100%', height: '600px' }}></div>
    );
};

export default CrimeChoroplethMap;
