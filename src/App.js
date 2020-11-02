import React from "react";
import Header from "./components/Header";
import MapboxGLMap from "./components/MapboxGLMap";

import InputLocation from "./components/InputLocation";

const styles = {
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

function App() {
  return (
    <div style={styles}>
      <Header />
      <MapboxGLMap />
    </div>
  );
}

export default App;
