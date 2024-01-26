'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*  gonna make ajax call - the old school way */

const req = new XMLHttpRequest();
//https://countries-api-836d.onrender.com/countries/
req.open('GET','https://restcountries.com/v2/name/portugal');
req.send();
// console.log(req.responseText);

req.addEventListener('load',(()=>{
    console.log(this.responseText);
}))