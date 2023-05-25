import React, {useState} from 'react';
import DeckGL from '@deck.gl/react/typed';
import {GeoJsonLayer} from '@deck.gl/layers/typed';
import Map from 'react-map-gl';
import dates from './export.json'
import FilterContainer from "./component/FilterContainer";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZnJhYmVseSIsImEiOiJjbGhxZDhxZW0yN3h1M2VveHB2dXFyMnA1In0.yv7mJ8nDAbP3fctomci_2Q';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: 12.9209,
    latitude: 50.8282,
    zoom: 13,
    pitch: 0,
    bearing: 0
};



// Data to be used by the LineLayer
const data = [
    {sourcePosition: [12.9209, 50.8282], targetPosition: [12.9209, 50.83]}
];

export type FilterSelection = {
    startDate: string,
    endDate: string,
    currentAreaSearch: number // 0-2
}

export const getToday = () => {
    let now = new Date();
    let month: number | string = (now.getMonth() + 1);
    let day: number | string = now.getDate();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    return now.getFullYear() + '-' + month + '-' + day;
}

export const getYesterday = () => {
    let now = new Date();
    let month: number | string = (now.getMonth() + 1);
    let day: number | string = now.getDate()-1;
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    return now.getFullYear() + '-' + month + '-' + day;
}

function App() {

    const defaultFilter:  FilterSelection = {
        startDate: getYesterday(),
        endDate: getToday(),
        currentAreaSearch: 0
    }

    const [currentFilterSelection, setCurrentFilterSelection] = useState(defaultFilter)

    const layers = [
        new GeoJsonLayer({
            id: 'GeoJsonLayer',
            data: dates,
            // extruded: true,
            // filled: true,
            // getElevation: 30,
            // getFillColor: [245, 141, 66],
            getLineColor: [14, 69, 19],
            // getLineWidth: 20,
            // getPointRadius: 4,
            // getTextSize: 12,
            lineWidthMinPixels: 1,
        })
    ];

    return (
        <div style={{width: '100vw'}}>
            <div style={{padding: '1%'}}>
                <FilterContainer currentFilterSelection={currentFilterSelection} setCurrentFilterSelection={setCurrentFilterSelection}/>
            </div>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={layers}>
                <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                     mapStyle="mapbox://styles/mapbox/outdoors-v12"/>
            </DeckGL>
        </div>
    );
}

export default App;
