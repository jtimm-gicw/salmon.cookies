'use strict';

/* =====================================================
   GLOBAL DATA
   -----------------------------------------------------
   These values are shared across the whole app
   ===================================================== */

// Store hours used for table headers and calculations
const hours = [
  '6am', '7am', '8am', '9am', '10am', '11am',
  '12pm', '1pm', '2pm', '3pm', '4pm', '5pm',
  '6pm', '7pm'
];


/* =====================================================
   HELPER FUNCTION
   -----------------------------------------------------
   Small utility function used by other code
   ===================================================== */

// Returns a random whole number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* =====================================================
   COOKIE STORE CONSTRUCTOR
   -----------------------------------------------------
   Blueprint for creating cookie store objects
   ===================================================== */

function CookieStore(store, customerMin, customerMax, averageCookie) {
  this.locationName = store;
  this.customerMin = customerMin;
  this.customerMax = customerMax;
  this.averageCookie = averageCookie;

  // Arrays to store hourly data
  this.customersEachHour = [];
  this.cookiesEachHour = [];

  // Running total for the day
  this.totalDailyCookies = 0;
}


/* =====================================================
   PROTOTYPE METHODS
   -----------------------------------------------------
   Functions shared by all CookieStore objects
   ===================================================== */

// Calculate number of customers each hour
CookieStore.prototype.calCustomersEachHour = function () {
  for (let i = 0; i < hours.length; i++) {
    this.customersEachHour.push(
      random(this.customerMin, this.customerMax)
    );
  }
};

// Calculate cookies sold each hour
CookieStore.prototype.calCookiesEachHour = function () {
  // First get customers per hour
  this.calCustomersEachHour();

  // Then calculate cookies per hour
  for (let i = 0; i < hours.length; i++) {
    const hourlyCookies = Math.ceil(
      this.customersEachHour[i] * this.averageCookie
    );

    this.cookiesEachHour.push(hourlyCookies);
    this.totalDailyCookies += hourlyCookies;
  }
};


/* =====================================================
   RENDER METHOD
   -----------------------------------------------------
   Creates and displays the HTML table for one store
   ===================================================== */

CookieStore.prototype.render = function () {
  const root = document.getElementById('root');

  // Create the table
  const table = document.createElement('table');
  table.setAttribute('border', '1');
  table.id = 'cookieTable';
  root.appendChild(table);

  /* ---------- Store Name Header ---------- */
  const headerRow = document.createElement('tr');
  const headerCell = document.createElement('th');

  headerCell.setAttribute('colspan', hours.length + 2);
  headerCell.textContent = this.locationName;

  headerRow.appendChild(headerCell);
  table.appendChild(headerRow);

  /* ---------- Hours Header Row ---------- */
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

  /* ---------- Table Body ---------- */
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  const dataRow = document.createElement('tr');

  for (let i = 0; i < this.cookiesEachHour.length; i++) {
    const dataCell = document.createElement('td');
    dataCell.textContent = this.cookiesEachHour[i];
    dataRow.appendChild(dataCell);
  }

  // Total column
  const totalCell = document.createElement('td');
  totalCell.textContent = this.totalDailyCookies;
  dataRow.appendChild(totalCell);

  tbody.appendChild(dataRow);
};


/* =====================================================
   STORE OBJECTS
   -----------------------------------------------------
   Individual cookie store instances
   ===================================================== */

const seattle = new CookieStore('Seattle', 25, 42, 13);
const paris   = new CookieStore('Paris', 25, 42, 13);
const lima    = new CookieStore('Lima', 25, 42, 13);
const dubai   = new CookieStore('Dubai', 25, 42, 13);
const tokyo   = new CookieStore('Tokyo', 25, 42, 13);

// Array to manage all stores together
const stores = [seattle, paris, lima, dubai, tokyo];


/* =====================================================
   APPLICATION CONTROLLER
   -----------------------------------------------------
   Runs the app logic in the correct order
   ===================================================== */

function runApplication() {
  for (let i = 0; i < stores.length; i++) {
    stores[i].calCookiesEachHour();
    stores[i].render();
  }
}

// Start the application
runApplication();


/* =====================================================
   FORM HANDLING
   -----------------------------------------------------
   Allows users to add a new cookie store
   ===================================================== */

// Select the form
const form = document.getElementById('cookieStandForm');

// Listen for form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Stop page refresh

  // Get user input values
  const location   = document.getElementById('location').value;
  const minCookies = parseInt(document.getElementById('minCookies').value);
  const maxCookies = parseInt(document.getElementById('maxCookies').value);
  const avgCookies = parseFloat(document.getElementById('avgCookies').value);

  // Create and render the new store
  const newStore = new CookieStore(
    location,
    minCookies,
    maxCookies,
    avgCookies
  );

  newStore.calCookiesEachHour();
  newStore.render();

  // Clear the form
  form.reset();
});
