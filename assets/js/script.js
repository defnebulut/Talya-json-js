document.addEventListener("DOMContentLoaded", function() {

var flightArray;
var flightDetails;

fetch("http://localhost:8080/assets/fligthJSONList.json")
  .then((response) => response.json())
  .then((json) => {
    var flight = json;
    flightArray = flight.response.itineraryList[0].flightOptionList;

    flightDetails = flightArray.map((flight) => ({
      flightNo: flight.flightList[0].flightNo,
      departureAirportName: flight.flightList[0].departureAirport.name,
      departureAirportCode: flight.flightList[0].departureAirport.code,
      arrivalAirportName: flight.flightList[0].arrivalAirport.name,
      arrivalAirportCode: flight.flightList[0].arrivalAirport.code,
      arrivalTime: flight.flightList[0].arrivalTime,
      departureTime: flight.flightList[0].departureTime,
      flightPrice: flight.fareOptionList[0].totalPriceInRequestedCurrency,
      flightOperator: flight.flightList[0].flightOperator.name,
      freeSeatCount: flight.fareOptionList[0].freeSeatCount,
    }));

    displayFlightDetails(); // Call the function to display flight details
  });

function displayFlightDetails() {
  var containerElement = document.getElementById("flight-details-container");
  containerElement.innerHTML = "";

  var headerRowElement = document.createElement("div");
  headerRowElement.classList.add("flight-row");

  var operatorHeader = document.createElement("div");
  operatorHeader.textContent = "Operator";
  headerRowElement.appendChild(operatorHeader);

  var flightNoHeader = document.createElement("div");
  flightNoHeader.textContent = "Flight No";
  headerRowElement.appendChild(flightNoHeader);

  var departureHeader = document.createElement("div");
  departureHeader.textContent = "Departure";
  headerRowElement.appendChild(departureHeader);

  var arrivalHeader = document.createElement("div");
  arrivalHeader.textContent = "Arrival";
  headerRowElement.appendChild(arrivalHeader);

  var priceHeader = document.createElement("div");
  priceHeader.textContent = "Price";
  headerRowElement.appendChild(priceHeader);

  containerElement.appendChild(headerRowElement);

  flightDetails.forEach(function (flight) {
    var flightContainer = document.createElement("div");
    flightContainer.classList.add("flight-container");

    var operatorElement = document.createElement("p");
    operatorElement.textContent = flight.flightOperator;
    flightContainer.appendChild(operatorElement);

    var flightNoElement = document.createElement("p");
    flightNoElement.textContent = flight.flightNo;
    flightContainer.appendChild(flightNoElement);

    var departureElement = document.createElement("p");

    var departureTimeElement = document.createElement("p");
    var departureTime = new Date(flight.departureTime);
    var formattedDepartureTime = departureTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    var formattedDepartureDate = departureTime.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    departureTimeElement.insertAdjacentHTML(
      "beforeend",
      formattedDepartureTime + "  -  " + formattedDepartureDate
    );

    departureElement.textContent =
      flight.departureAirportName +
      " (" +
      flight.departureAirportCode +
      ")" +
      "\n" +
      departureTimeElement.textContent;
    flightContainer.appendChild(departureElement);

    var arrivalElement = document.createElement("p");

    var arrivalTimeElement = document.createElement("p");
    var arrivalTime = new Date(flight.arrivalTime);
    var formattedArrivalTime = arrivalTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    var formattedArrivalDate = arrivalTime.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    arrivalTimeElement.insertAdjacentHTML(
      "beforeend",
      formattedArrivalTime + "   -   " + formattedArrivalDate
    );

    arrivalElement.textContent =
      flight.arrivalAirportName +
      " (" +
      flight.arrivalAirportCode +
      ")" +
      "\n" +
      arrivalTimeElement.textContent;
    flightContainer.appendChild(arrivalElement);

    var priceElement = document.createElement("p");
    priceElement.textContent = flight.flightPrice + " TRY";
    flightContainer.appendChild(priceElement);

    var bookButton = document.createElement("button");
    bookButton.classList.add("book-button");
    bookButton.textContent = "Book";
    flightContainer.appendChild(bookButton);

    containerElement.appendChild(flightContainer);

    
  });
}

function sortByLowerPrice() {
    var sortedFlights = flightDetails.sort(function(a, b) {
      return a.flightPrice - b.flightPrice;
    });
  
    displayFlightDetails(sortedFlights);
  }
  
  function sortByHigherPrice() {
    var sortedFlights = flightDetails.sort(function(a, b) {
      return b.flightPrice - a.flightPrice;
    });
  
    displayFlightDetails(sortedFlights);
  }
  
  document.getElementById("sort-low").onclick = sortByLowerPrice;

  //It should work but does not work..
  document.getElementById("sort-high").addEventListener("click", sortByHigherPrice);
  document.getElementById("filter-button").onclick = filterByArrivalCity;
  function filterByArrivalCity() {
    var selectedCity = document.getElementById("arrival-city-filter").value;
    var filteredFlights = flightDetails.filter(function(flight) {
      return flight.arrivalAirportName === selectedCity;
    });
    console.log(filteredFlights);
    displayFlightDetails(filteredFlights);
  }
  
  
});