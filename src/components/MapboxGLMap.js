import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button, ButtonGroup } from "reactstrap";
import InputLocation from "./InputLocation";

const styles = {
  width: "98vw",
  height: "85vh",
  borderRadius: "10px",
};

const inputStyles = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "20px",
};

const MapboxGLMap = () => {
  const backgrounds = {
    normal: "streets-v11",
    light: "light-v10",
    dark: "dark-v10",
    satellite: "satellite-v9",
  };

  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const [currentBackground, setCurrentBackground] = useState(
    backgrounds.normal
  );

  const handleBackgroundChange = (b) => {
    setCurrentBackground(backgrounds[b]);
    map.setStyle(`mapbox://styles/mapbox/${b}`);
  };

  useEffect(
    () => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: `mapbox://styles/mapbox/${currentBackground}`, // stylesheet location
          center: [10.408773, 63.422091],
          zoom: 10,
        });

        map.on("load", () => {
          setMap(map);
          map.resize();
        });
      };

      if (!map) initializeMap({ setMap, mapContainer });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map]
  );

  return (
    <div>
      <div style={inputStyles}>
        <ButtonGroup size="lg">
          {Object.keys(backgrounds).map((b, index) => (
            <Button
              key={index}
              onClick={() => handleBackgroundChange(backgrounds[b])}
            >
              {b}
            </Button>
          ))}
        </ButtonGroup>
        <InputLocation />
      </div>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
    </div>
  );
};

export default MapboxGLMap;
