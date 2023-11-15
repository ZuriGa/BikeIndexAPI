import './css/styles.css';
import StolenBike from './bike.js';

// Business Logic
function getStolenBike(location) {
  StolenBike.getStolenBike(location)
    .then(function(response) {
      if (response.bikes) {
        printElements(response, location);
      } else {
        printError(response, location);
      }
    });
}

function convertDate(timestamp){
  const date = new Date(timestamp * 1000);
  const options = { year: 'numeric', month: 'short', day: 'numeric'};
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
}


// UI Logic
function printElements(response, location) {
  const bikes = response.bikes;
  const resultContainer = document.querySelector('#displayResults');
  for (const bike of bikes) {
    const newDate = convertDate(bike.date_stolen);
    const listItem = document.createElement('li');
    listItem.textContent = `Date Stolen: ${newDate}, Bike ID: ${bike.id}, Manufacturer: ${bike.manufacturer_name},  Model: ${bike.frame_model}`;
    resultContainer.appendChild(listItem);
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", bike.thumb);
    listItem.appendChild(imgTag);
  }
}


function printError(error, location) {
  document.querySelector('#results').innerText = `There was a small  error accessing bike data in your ${location}: ${error}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const location = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getStolenBike(location);
}


window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});


