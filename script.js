const URL = "https://api.openweathermap.org/data/2.5/"
const KEY = "5344bdfe0aef6c5a03084c6d54315a08"

/*
 This function is associated with keypress event and calls getResult when entered is pressed
 * @param {event} event - Keyboard event.
 */
const setValue = (event) => {
  const {
    keyCode,
    target: { value },
  } = event
  if (keyCode == "13") getResult(value)
}

/*
 This function calls the external weather API and calls the displayResult with response
 * @param {string} cityName - Input field value.
 */
const getResult = async (cityName) => {
  const query = `${URL}weather?q=${cityName}&appid=${KEY}&units=metric&lang=en`
  const response = await fetch(query)
  const result = await response.json()
  displayResult(result)
}

/*
 This function display the result on page
 * @param {json} result - API response.
 */
const displayResult = (result) => {
  const city = document.querySelector(".city")
  city.innerText = `${result.name}, ${result.sys.country}`
  const temp = document.querySelector(".temp")
  temp.innerText = `${Math.round(result.main.temp)}°C`
  const desc = document.querySelector(".desc")
  desc.innerText = result.weather[0].description
  const minmax = document.querySelector(".minmax")
  minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`
}

const searchBar = document.querySelector("#searchBar")
searchBar.addEventListener("keypress", setValue)
