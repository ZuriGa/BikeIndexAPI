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

// UI Logic
function printElements(response, location) {
  const resultContainer = document.querySelector('#displayResults');
  resultContainer.innerText = `Here is a list of descriptions of stolen Bikes in ${location}.  ${response.bikes[0].description}, ${response.bikes[1].description},${response.bikes[2].description}.`;
 
}


function printError(error, location) {
  document.querySelector('#results').innerText = `There was an error accessing bike data in your ${location}: ${error}`;
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


