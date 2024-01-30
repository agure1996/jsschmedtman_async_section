'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*  gonna make ajax call - the old school way */


const getCountryData = function(country){
    
    const req = new XMLHttpRequest();
    //https://countries-api-836d.onrender.com/countries/
    req.open('GET', `https://restcountries.eu/rest/v3.1/name/${country}`);
    req.send();



    req.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
      
      
      
      
      
        const html = `
          <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} Million People </p>
            <p class="country__row"><span>🗣️</span>${data.languages[0]}</p>
            <p class="country__row"><span>💰</span>${data.currencies}</p>
          </div>
        </article>
          `;
      
          //insert the html block at
          countriesContainer.insertAdjacentHTML('beforeend',html)
          //set opacity to 100%
          countriesContainer.style.opacity = 1;
      });

}

getCountryData('Portugal')
getCountryData('Spain')

