'use strict';

const seattle = {
    locationName: 'seattle',
    customerMin: 23,
    customerMax: 54,
    averageCookie: 4.4,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};

const tokyo = {
    locationName: 'tokyo',
    customerMin: 14,
    customerMax: 33,
    averageCookie: 9.7,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};

const dubai = {
    locationName: 'dubai',
    customerMin: 26,
    customerMax: 48,
    averageCookie: 6.6,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};

const paris = {
    locationName: 'paris',
    customerMin: 41,
    customerMax: 57,
    averageCookie: 8.4,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};

const lima = {
    locationName: 'lima',
    customerMin: 12,
    customerMax: 33,
    averageCookie: 7.2,
    cookieEachHour: [],
    estimate: function () {
        this.cookieEachHour = estimateSales(this);
    }
};

const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const stores = [seattle, paris, lima, dubai, tokyo]; // Updated array name to 'stores'

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function estimateSales(store) {
    const sales = [];
    for (let i = 0; i < hours.length; i++) {
        const numCustomers = random(store.customerMin, store.customerMax);
        const hourSales = Math.ceil(numCustomers * store.averageCookie);
        sales.push(hourSales);
    }
    return sales;
}

function render(store) {
    let total = 0;
    const root = document.getElementById('root');
    const location = document.createElement('section');
    location.classList.add('location');
    root.appendChild(location);

    const title = document.createElement('h2');
    title.textContent = store.locationName;
    location.appendChild(title);

    const list = document.createElement('ul');
    location.appendChild(list);

    for (let i = 0; i < hours.length; i++) {
        total += store.cookieEachHour[i];
        const listItem = document.createElement('li');
        listItem.textContent = hours[i] + ': ' + store.cookieEachHour[i] + ' cookies';
        list.appendChild(listItem);
    }

    const totalItem = document.createElement('li');
    totalItem.textContent = 'Total: ' + total + ' cookies';
    list.appendChild(totalItem);
}

function runApplication() {
    for (let i = 0; i < stores.length; i++) {
        stores[i].estimate();
        render(stores[i]);
    }
}

runApplication();
