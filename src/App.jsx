import { useState, useEffect } from "react";
import useGeolocation from "./hooks/useGeolocation";
import { ProgressBar } from "react-loader-spinner";

function App() {
  const { isLoading, position, weather, err, getPosition } = useGeolocation();
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    // Check if weather is available and log its value
    if (weather && weather.main) {
      setTemp(weather.main.temp);
    }
  }, [weather]);

  const handleClickChange = () => {
    getPosition();
  };

  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <div className="mx-auto p-2" style={{ width: 300 }}>
        <button type="button" className="btn btn-primary" onClick={handleClickChange} disabled={isLoading}>
          Get my Current Position
        </button>
        {isLoading && <ProgressBar height="80" width="100" ariaLabel="progress-bar-loading" wrapperStyle={{}} wrapperClass="progress-bar-wrapper" borderColor="#F4442E" barColor="#51E5FF" />}
        {err && <p>{err}</p>}
        {position.lat && position.lang && (
          <div>
            <span>Latitude: {position.lat}</span>
            <br />
            <span>Longitude: {position.lang}</span>
            <br />
            <span>Current Weather of your Area: {temp} Deg</span>
            <br />
            <a target="_blank" rel="noreferrer" href={`https://www.openstreetmap.org/#map=16/${position.lat}/${position.lang}`}>
              View in Map
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
