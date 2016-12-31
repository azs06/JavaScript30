'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*

@todo
*/
(function () {
  "use strict";

  var searchInput = document.querySelector('.search');
  var suggestions = document.querySelector('.suggestions');
  var suggestionsHolder = '<li>Filter for a city</li><li>or a state</li>';
  suggestions.innerHTML = suggestionsHolder;
  var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  var cities = [];
  /*using fetch api to fetch data and append it to an array*/
  fetch(endpoint).then(function (blob) {
    return blob.json();
  }).then(function (data) {
    return cities.push.apply(cities, _toConsumableArray(data));
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function findMatchWord(wordToMatch, cities) {
    return cities.filter(function (place) {
      var regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
  }
  function initSelector() {
    console.log(this.dataSet);
  }
  function displayMatches() {
    var _this = this;

    if (searchInput.value === '') {
      suggestions.classList.remove('searchList--open');
      suggestions.innerHTML = suggestionsHolder;
      return;
    }
    var matchArray = findMatchWord(this.value, cities);
    var html = matchArray.map(function (place) {
      var regex = new RegExp(_this.value, 'gi');
      var cityName = place.city.replace(regex, '<span class="hl">' + place.city + '</span>');
      var stateName = place.state.replace(regex, '<span class="hl">' + place.state + '</span>');

      return '<li class="areaData" data-city="' + place.city + '" data-state="' + place.state + '">\n                    <span class="name"> ' + cityName + ', ' + stateName + ' </span>   \n                    <span class="polpulation"> ' + numberWithCommas(place.population) + ' </span>    \n                    </li>';
    }).join('');
    suggestions.classList.add('searchList--open');
    suggestions.innerHTML = html;
    var suggestionsLi = suggestions.querySelectorAll('li');
    suggestionsLi.forEach(function (area) {
      area.addEventListener('click', function () {
        updateInput(this.dataset);
      });
    });
  }

  function updateInput(newData) {
    searchInput.value = newData.city + ", " + newData.state;
  }

  window.onload = function () {
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);
  };
})();
