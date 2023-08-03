import { useState } from "react";

const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [weather, setWeather] = useState(null);
  const [err, setErr] = useState(null);

  const getPosition = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      return setErr("Geolocation is not supported by this browser.");
    }
  };

  function success(pos) {
    const crd = pos.coords;

    setPosition({
      lat: crd.latitude,
      lang: crd.longitude,
    });

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=1a44f30638a4ef4ab1c84f35986493e5&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => console.log(error));

    setIsLoading(false);
  }

  function error(err) {
    setErr(`ERROR(${err.code}): ${err.message}`);
    setIsLoading(false);
  }

  return { isLoading, position, weather, err, getPosition };
};

export default useGeolocation;
