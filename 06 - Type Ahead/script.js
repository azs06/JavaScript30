    /*
    
    @todo
    add babel to make it cross browser compatible
    make the dropdown selectable
    
    */
	(function(){
	"use strict";
		
	const searchInput = document.querySelector('.search');
    const suggestions = document.querySelector('.suggestions');
    const suggestionsHolder = `<li>Filter for a city</li><li>or a state</li>`;
    suggestions.innerHTML = suggestionsHolder;
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];
    /*using fetch api to fetch data and append it to an array*/
    fetch(endpoint)
        .then( (blob) => blob.json())
        .then((data)=> cities.push(...data))
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    function findMatchWord(wordToMatch, cities){
        return cities.filter(place =>{
            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) || place.state.match(regex);
        });
    }
    
    function displayMatches(){
        const matchArray = findMatchWord(this.value, cities);
        const html = matchArray.map((place)=>{
            const regex = new RegExp(this.value, 'gi');
            const cityName = place.city.replace(regex, `<span class="hl">${place.city}</span>`);
            const stateName = place.state.replace(regex, `<span class="hl">${place.state}</span>`);
            return `<li>
                    <span class="name"> ${cityName}, ${stateName} </span>   
                    <span class="polpulation"> ${numberWithCommas(place.population)} </span>    
                    </li>`;
        }).join('');
        
        if(searchInput.value === ''){
            suggestions.innerHTML = suggestionsHolder
            return;
        }
        
        suggestions.innerHTML = html;
    }
    
    searchInput.addEventListener('change',displayMatches);
    searchInput.addEventListener('keyup',displayMatches);	
	}())
    