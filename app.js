'use strict'

const seattle = {
    locationName: 'seattle',
    customerMin: 23,
    customerMax: 54,
    averageCookie: 4.4,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour= estSales(this)
    }
};

const tokyo = {
    locationName: 'tokyo',
    customerMin: 14,
    customerMax: 33,
    averageCookie: 9.7,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour= estSales(this)
    }
};

const dubai = {
    locationName: 'dubai',
    customerMin: 26,
    customerMax: 48,
    averageCookie: 6.6,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour= estSales(this)
    }
};

const paris = {
    locationName: 'paris',
    customerMin: 41,
    customerMax: 57,
    averageCookie: 8.4,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour= estSales(this)
    }
};

const lima = {
    locationName: 'lima',
    customerMin: 12,
    customerMax: 33,
    averageCookie: 7.2,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour= estSales(this)
    }
};



const parent = document.getElementById('parent');
const child = document.createElement('h2');
child.textContent= 'store';
parent.appendChild(child);

const hours= ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const store= [seattle, paris, lima, dubai, tokyo];



