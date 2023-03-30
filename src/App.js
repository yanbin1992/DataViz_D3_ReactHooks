import React, { useState } from "react";
import DataVizChart from "./components/DataVizChart";

const App = () => {
  const [data, setData] = useState([10, 15, 20, 25, 30, 15]);

  const handleAddData = () => {
    const newData = data.concat([Math.floor(Math.random() * 20) + 1]);
    setData(newData);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Data Viz Chart</h1>
      <DataVizChart data={data} />
      <button onClick={handleAddData}>Add Data</button>
    </div>
  );
};

export default App;
