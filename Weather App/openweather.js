let weather = {
  apiKey: "902bf9981862d29820ec713c8ce58dd8",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Please enter a valid city name.");
          throw new Error("Please enter a valid city name.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name, timezone } = data;
    const { icon, description } = data.weather[0];
    const { temp_min, temp_max } = data.main;
    const { speed } = data.wind;
    const { sunrise, sunset } = data.sys;

    function convertEpochToSpecificTimezone(dt) {
      let d = new Date(dt * 1000);
      return d;
    }

    document.querySelector(".city").innerText = name;
    document.querySelector(".sunrise").innerText =
      "Sunrise " +
      convertEpochToSpecificTimezone(sunrise).getHours() +
      ":" +
      convertEpochToSpecificTimezone(sunrise).getMinutes();
    document.querySelector(".sunset").innerText =
      "Sunset " +
      convertEpochToSpecificTimezone(sunset).getHours() +
      ":" +
      convertEpochToSpecificTimezone(sunset).getMinutes();
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".desc").innerText = description;
    document.querySelector(".tempmin").innerText =
      "Max temp: " + temp_min + "°C";
    document.querySelector(".tempmax").innerText =
      "Min temp: " + temp_max + "°C";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " Km/h";
    document.querySelector(".wcard").classList.remove("loading");
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Tehran");
