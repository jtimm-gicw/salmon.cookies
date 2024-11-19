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
    const location = document.createElement('section');
    root.appendChild(location);

    const title = document.createElement('h2');
    title.textContent = this.locationName;
    location.appendChild(title);

    const list = document.createElement('ul');
    location.appendChild(list);

    for (let i = 0; i < hours.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `${hours[i]}: ${this.cookiesEachHour[i]} cookies`; // Fixed typo (was cookieEachHour)
        list.appendChild(listItem);
    }

    const totalItem = document.createElement('li');
    totalItem.textContent = `Total: ${this.totalDailyCookies} cookies`;
    list.appendChild(totalItem);
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
