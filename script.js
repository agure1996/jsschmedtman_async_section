'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////



//render country

const renderCountry = function(data){
      
  const html = `
  <article class="country">
  <img class="country__img" src="${Object.values(data.flags)[1]}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population/1000000).toFixed(1)} Million People </p>
    <p class="country__row"><span>🗣️</span>${Object.values(data.languages).join(", ")}</p>
    <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
  </div>
</article>
  `;

  //insert the html block at
  countriesContainer.insertAdjacentHTML('beforeend',html)
  //set opacity to 100%
  countriesContainer.style.opacity = 1;
}



/*  gonna make ajax call - the old school way */


const getCountryData = function(country){
    
    const req = new XMLHttpRequest();
    //https://countries-api-836d.onrender.com/countries/
    req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    req.send();



    req.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
       
        //used to test debug
        // console.log(Object.values(data.flags)[1]);
        console.log(data)
        renderCountry(data)

      
        const [neighbour] = data.borders;
        if(!neighbour) return;
        else 

        req.open('GET', `https://restcountries.com/v3.1/name/${neighbour}`);
        req.send();
        neighbour = JSON.parse(this.responseText);
       
        //used to test debug
        // console.log(Object.values(data.flags)[1]);
        console.log(neighbour)
        renderCountry(neighbour)
      
      });

}


getCountryData('somalia')


