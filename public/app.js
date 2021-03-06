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
    var imgCountryFlag = document.createElement("imgCountryFlag");

    var chosenCountryName = event.target.value;

    var chosenCountry = countries.find(function(country) {
      return chosenCountryName === country.name;
    });

    liCountryName.innerText = "\n" + chosenCountry.name;
    liCountryPopulation.innerText = "\nPopulation: " + chosenCountry.population;
    liCountryCapital.innerText = "\nCapital city: " + chosenCountry.capital;
    liCountryRegion.innerText = "\nRegion: " + chosenCountry.region;
    liCountrySubRegion.innerText = "\nSub-region: " + chosenCountry.subregion;
    imgCountryFlag.innerHTML = "<img src=" + chosenCountry.flag + " />";

    var map = document.getElementById("country-map");
    console.log(chosenCountry)
    var center = {lat: chosenCountry.latlng[0], lng: chosenCountry.latlng[1]};
    var countryMap = new MapWrapper(map, center, 3);
    countryMap.addMarker(center);

    ulCountryInfo.appendChild(imgCountryFlag);
    ulCountryInfo.appendChild(liCountryName);
    ulCountryInfo.appendChild(liCountryPopulation);
    ulCountryInfo.appendChild(liCountryCapital);
    ulCountryInfo.appendChild(liCountryRegion);
    ulCountryInfo.appendChild(liCountrySubRegion);
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