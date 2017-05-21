var app = function() {
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
}

var requestComplete = function() {
  if (this.status !== 200) return;

  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);

  populateList(countries);
}

var populateList = function(countries) {
  var dropDownList = document.getElementById("all-countries-dropdown");

  dropDownList.addEventListener("change", function(event) {
    var ulCountryInfo = document.getElementById("country-info");
    ulCountryInfo.innerHTML = "";
    var liCountryName = document.createElement("liCountryName");
    var liCountryPopulation = document.createElement("liCountryPopulation");
    var liCountryCapital = document.createElement("liCountryCapital");
    var liCountryRegion = document.createElement("liCountryRegion");
    var liCountrySubRegion = document.createElement("liCountrySubRegion");
    var liCountryBorders = document.createElement("liCountryBorders");

    var chosenCountryName = event.target.value;

    var chosenCountry = countries.find(function(country) {
      return chosenCountryName === country.name;
    });

    liCountryName.innerText = chosenCountry.name;
    liCountryPopulation.innerText = "\nPopulation: " + chosenCountry.population;
    liCountryCapital.innerText = "\nCapital city: " + chosenCountry.capital;
    liCountryRegion.innerText = "\nRegion: " + chosenCountry.region;
    liCountrySubRegion.innerText = "\nSub-region: " + chosenCountry.subregion;
    liCountryBorders.innerText = "\nBordering countries: " + chosenCountry.borders;

    ulCountryInfo.appendChild(liCountryName);
    ulCountryInfo.appendChild(liCountryPopulation);
    ulCountryInfo.appendChild(liCountryCapital);
    ulCountryInfo.appendChild(liCountryRegion);
    ulCountryInfo.appendChild(liCountrySubRegion);
    ulCountryInfo.appendChild(liCountryBorders);
  });

  countries.forEach(function(country){
    var dropDownItem = document.createElement("option");
    dropDownItem.innerText = country.name;
    dropDownList.appendChild(dropDownItem);
  });
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

window.addEventListener("load", app);