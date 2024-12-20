'use strict';



const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];



function random(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}



function CookieStore(store, customerMin, customerMax, averageCookie) {

    this.locationName = store;

    this.customerMin = customerMin;

    this.customerMax = customerMax;

    this.averageCookie = averageCookie;

    this.customersEachHour = [];

    this.cookiesEachHour = []; // Fixed typo (was cookieEachHour)

    this.totalDailyCookies = 0;

}



CookieStore.prototype.calCustomersEachHour = function () {

    for (let i = 0; i < hours.length; i++) {

        this.customersEachHour.push(random(this.customerMin, this.customerMax));

    }

};



CookieStore.prototype.calCookiesEachHour = function () {

    this.calCustomersEachHour();

    for (let i = 0; i < hours.length; i++) {

        const hourlyCookies = Math.ceil(this.customersEachHour[i] * this.averageCookie);

        this.cookiesEachHour.push(hourlyCookies); // Fixed typo (was cookieEachHour)

        this.totalDailyCookies += hourlyCookies;

    }

};



CookieStore.prototype.render = function () {

    const root = document.getElementById('root');

   const table = document.createElement('table');

   table.setAttribute('border', '1');

   root.appendChild(table);
   table.id='cookieTable'; //added the id tag to the table



   const headerRow= document.createElement('tr');

   const headerCell= document.createElement('th');

   headerCell.setAttribute('colspan', hours.length + 2);

   headerCell.textContent = this.locationName;

   headerRow.appendChild(headerCell);

   table.appendChild(headerRow);



    const hoursRow = document.createElement('tr');

    for (let i = 0; i < hours.length; i++) {

        const hourCell = document.createElement('th');

        hourCell.textContent = hours[i];

        hoursRow.appendChild(hourCell);

    }



    const totalHeader = document.createElement('th');

    totalHeader.textContent = 'Total';

    hoursRow.appendChild(totalHeader);

    table.appendChild(hoursRow);

     // Create a <tbody> for the table
     const tbody = document.createElement('tbody');
     table.appendChild(tbody);

    const dataRow = document.createElement('tr');

    for (let i = 0; i< this.cookiesEachHour.length; i++) {

        const dataCell = document.createElement('td');

        dataCell.textContent = this.cookiesEachHour[i];

        dataRow.appendChild(dataCell);

    }



    const totalCell = document.createElement('td');

    totalCell.textContent = this.totalDailyCookies;

    dataRow.appendChild(totalCell);

    table.appendChild(dataRow);

};



const seattle = new CookieStore('Seattle', 25, 42, 13);

const paris = new CookieStore('Paris', 25, 42, 13);

const lima = new CookieStore('Lima', 25, 42, 13);

const dubai = new CookieStore('Dubai', 25, 42, 13);

const tokyo = new CookieStore('Tokyo', 25, 42, 13);



const stores = [seattle, paris, lima, dubai, tokyo];



function runApplication() {

    for (let i = 0; i < stores.length; i++) {

        stores[i].calCookiesEachHour();

        stores[i].render(); // Added parentheses to call the render method

    }

}


runApplication();

// -------------FORM STARTS HERE-----------

const form= document.getElementById('cookieStandForm');
// selects the form you can attach an event listener to
const table= document.getElementById('cookieTable').querySelectorAll('tbody');
// selects the table body the new row will be added to



// function addCookieStand(){
//     const location= document.getElementById('location').value;
//     const cookie= document.getElementById('cookie').value;

//     //Creates a new row
//     const row= document.createElement('tr');
//     //Creates a new cell for the location put into the form
//     const locationCell= document.createElement('td');
//     //Adds the info into the cell
//     locationCell.textContent = location;
//     //Creates a new cell for the cookies
//     const cookiesCell= document.createElement('td');
//     cookiesCell.textContent = cookie;

//     //Appends cell to the row 
//     row.appendChild(locationCell);
//     row.appendChild(cookiesCell);

//     //Appends row to table
//     table.appendChild(row);

//     //clear the form
//     form.reset();
// }
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const minCookies = parseInt(document.getElementById('minCookies').value);
    const maxCookies = parseInt(document.getElementById('maxCookies').value);
    const avgCookies = parseFloat(document.getElementById('avgCookies').value);

    // Create and render a new store
    const newStore = new CookieStore(location, minCookies, maxCookies, avgCookies);
    newStore.calCookiesEachHour();
    newStore.render();

    // Reset form after submission
    form.reset();
});