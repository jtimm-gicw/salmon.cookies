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

// ⭐ CHANGED: Added global array to manage all stores
const stores = [];


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

  // ⭐ CHANGED: Automatically add each new store to global stores array
  stores.push(this);
}


/* =====================================================
   PROTOTYPE METHODS
   -----------------------------------------------------
   Functions shared by all CookieStore objects
   ===================================================== */

// Calculate cookies sold each hour (combined method)
CookieStore.prototype.calculateData = function () {

  // ⭐ CHANGED: Reset arrays and totals to prevent duplication bug
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;

  for (let i = 0; i < hours.length; i++) {
    const customers = random(this.customerMin, this.customerMax);
    const hourlyCookies = Math.ceil(customers * this.averageCookie);

    this.customersEachHour.push(customers);
    this.cookiesEachHour.push(hourlyCookies);
    this.totalDailyCookies += hourlyCookies;
  }
};


// ⭐ CHANGED: render() no longer creates a full table
// It now renders only ONE ROW inside an existing table
CookieStore.prototype.renderRow = function (tbody) {

  const row = document.createElement('tr');

  // Store Name Column
  const nameCell = document.createElement('th');
  nameCell.textContent = this.locationName;
  row.appendChild(nameCell);

  // Hourly Data Columns
  for (let i = 0; i < this.cookiesEachHour.length; i++) {
    const cell = document.createElement('td');
    cell.textContent = this.cookiesEachHour[i];
    row.appendChild(cell);
  }

  // Total Column
  const totalCell = document.createElement('td');
  totalCell.textContent = this.totalDailyCookies;
  row.appendChild(totalCell);

  tbody.appendChild(row);
};


/* =====================================================
   TABLE CREATION
   -----------------------------------------------------
   Creates one shared table for all stores
   ===================================================== */

// ⭐ CHANGED: Table header is now created once globally
function createTableHeader(table) {

  const thead = document.createElement('thead');
  const row = document.createElement('tr');

  // Location Header
  const locationHeader = document.createElement('th');
  locationHeader.textContent = 'Location';
  row.appendChild(locationHeader);

  // Hour Headers
  for (let i = 0; i < hours.length; i++) {
    const th = document.createElement('th');
    th.textContent = hours[i];
    row.appendChild(th);
  }

  // Total Header
  const totalHeader = document.createElement('th');
  totalHeader.textContent = 'Total';
  row.appendChild(totalHeader);

  thead.appendChild(row);
  table.appendChild(thead);
}


// ⭐ CHANGED: New controller function renders ALL stores in ONE table
function renderAllStores() {

  const root = document.getElementById('root');
  root.innerHTML = ''; // Clears previous table before re-render

  const table = document.createElement('table');
  table.setAttribute('border', '1');
  root.appendChild(table);

  createTableHeader(table);

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  for (let i = 0; i < stores.length; i++) {
    stores[i].calculateData();
    stores[i].renderRow(tbody);
  }
}


/* =====================================================
   STORE OBJECTS
   -----------------------------------------------------
   Individual cookie store instances
   ===================================================== */

new CookieStore('Seattle', 23, 65, 6.3);
new CookieStore('Tokyo', 3, 24, 1.2);
new CookieStore('Dubai', 11, 38, 3.7);
new CookieStore('Paris', 20, 38, 2.3);
new CookieStore('Lima', 2, 16, 4.6);


/* =====================================================
   APPLICATION CONTROLLER
   -----------------------------------------------------
   Runs the app logic in the correct order
   ===================================================== */

// ⭐ CHANGED: Wrapped in DOMContentLoaded for safety
document.addEventListener('DOMContentLoaded', function () {

  renderAllStores();


  /* =====================================================
     FORM HANDLING
     -----------------------------------------------------
     Allows users to add a new cookie store
     ===================================================== */

  // Select the form
  const form = document.getElementById('cookieStandForm');

  if (form) { // ⭐ CHANGED: Prevent crash if form not found

    // Listen for form submission
    form.addEventListener('submit', function (event) {

      event.preventDefault(); // Stop page refresh

      // Get user input values
      const location = document.getElementById('location').value;
      const minCookies = parseInt(document.getElementById('minCookies').value);
      const maxCookies = parseInt(document.getElementById('maxCookies').value);
      const avgCookies = parseFloat(document.getElementById('avgCookies').value);

      // ⭐ CHANGED: Basic validation check
      if (minCookies > maxCookies) {
        alert('Minimum customers cannot be greater than maximum.');
        return;
      }

      // Create new store
      new CookieStore(location, minCookies, maxCookies, avgCookies);

      // ⭐ CHANGED: Re-render entire table instead of adding new table
      renderAllStores();

      // Clear the form
      form.reset();
    });
  }

});
