'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//render country & error

const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${Object.values(data.flags)[0]}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} Million People </p>
    <p class="country__row"><span>🗣️</span>${Object.values(data.languages).join(
      ', '
    )}</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
  </div>
</article>
  `;

  //insert the html block at
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //set opacity to 100%
  countriesContainer.style.opacity = 1;
};

/*  gonna make ajax call - the old school way 



const getCountryData = function(country){
  
    const req = new XMLHttpRequest();
    //https://countries-api-836d.onrender.com/countries/
    req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    req.send();
    

    
    req.addEventListener('load', function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        //used to test debug
        // console.log(Object.values(data.flags)[1]);
        // console.log(data)
        renderCountry(data)
        
        
        const [neighbour] = data.borders;
        if(!neighbour) return;
        
        
        //ajax call for second country (neighbouring country  )
        const req2 = new XMLHttpRequest();
        req2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
        req2.send();
        
        req2.addEventListener('load', function() {
          const [data2] = JSON.parse(this.responseText);
          console.log(data2);
          renderCountry(data2, 'neighbour')
        
        });
    
      });

    }

    getCountryData('spain')
    
    */

/**  New style, using promises
 *
 * starting with using fetch
 * we then get the response in json format
 * we get the data and display it
 *
 * the reason promise is made to get rid of callback hell which one can get in ajax
 */

// const fetchCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0])

//     });
// };

//simplifying above code

//getting the country as json file

const getJSON = function (url, errMsg = 'Something has gone wrong')  {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMsg} (${response.status})`);
    }
    const result = response.json();
    return result
  });
};

const fetchCountryData = function (country)  {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country Not Found') //read the method, it is a fetch request hence why I can follow it up with then
    .then(data => {
      renderCountry(data[0]);
      
      //getting neighbour
      const neighbour = data[0].borders[0];
      const borders = data[0].borders;
      console.log(neighbour);
      if (!borders) throw new Error('No Neighbouring Countries Found.');
      

        return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'No Neighbouring Countries Found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}, ${err.message}💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message} Try Again`);
    });
};

btn.addEventListener('click', function () {
  fetchCountryData('som');
});
