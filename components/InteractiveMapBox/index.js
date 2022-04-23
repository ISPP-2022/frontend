import React, { useRef, useEffect, useState } from 'react';
import { render } from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { CardMobile } from '../../components/Card';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

export default function InteractiveMapBox({ spaces }) {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(parseFloat(spaces[0].location.split(',')[1]));
    const [lat, setLat] = useState(parseFloat(spaces[0].location.split(',')[0]));
    const [zoom, setZoom] = useState(15);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        map.on('load', () => {
            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': spaces.map(space => {
                        return {
                            'type': 'Feature',
                            'properties': {
                                'space': space
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    parseFloat(space.location.split(',')[1]),
                                    parseFloat(space.location.split(',')[0])
                                ]
                            }
                        }
                    })

                }
            });
            // Add a layer showing the places.
            map.addLayer({
                'id': 'places',
                'type': 'circle',
                'source': 'places',
                'paint': {
                    'circle-color': '#4264fb',
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff',

                }
            });

            // Create a popup, but don't add it to the map yet.
            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: true,
                anchor: 'bottom',
                focusAfterOpen: true,
                maxWidth: '325px',
            });

            map.on('click', 'places', (e) => {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const space = JSON.parse(e.features[0].properties.space);

                const popUpNode = document.createElement('div');
                popUpNode.style.width = '300px';
                //Set size of popup

                render(
                    <a href={`/space/${space.id}`} target="_blank" rel="noopener noreferrer">
                        <CardMobile space={space} />
                    </a>,
                    popUpNode);


                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(coordinates).setDOMContent(popUpNode).addTo(map);
            });

        });


        // Clean up on unmount
        return () => map.remove();
    },
        [],
    );

    return (
        <div>
            <div className='sidebarStyle inline-block absolute top-0 left-0 m-3 bg-gray-50 p-1 font-bold'>
                <div>
                    Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
                </div>
            </div>
            <div className='map-container absolute top-0 bottom-0 left-0 right-0 h-[500px]' ref={mapContainerRef} />
        </div>
    );
};
