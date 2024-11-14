'use strict';

function CookieStore (locationName, customerMin, customerMax, averageCookie, cookieEachHour, avgCookiesPerSale) {
    this.locationName= locationName,
    this.customerMin= customerMin,
    this.customerMax= customerMax,
    this.avgCookiesPerSale = avgCookiesPerSale;
    this.averageCookie=averageCookie,
    this.cookieEachHour=cookieEachHour,
    this.customersEachHour = [];
    this.cookiesEachHour = [];
    this.totalDailyCookies = 0;
    }

CookieStore.prototype.calCustomerEachHour= function () {// creates a prototype, will have a for loop
    for (let i=0; i< hours.length;i++) { // i is the index starting at 0; the condition says that if i is less than number of hours it is true (will stop when it is false); finally the index will be incremented up by 1
        this.customersEachHour.push (random(this.customerMin, this.customerMax)); // the code on this line uses a the method `this`for customerEachHour for all locations data about this. dot push adds the number to the end of the array

    } 

}



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
        sales.push(hourSales);// adds hourSales to the end of the array sales []
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
