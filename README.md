# salmon.cookies


# 🍪 Pat’s Salmon Cookies

A proof-of-concept web application built to help a user/business manage daily cookie production across multiple store locations.

This project simulates hourly cookie sales based on customer traffic ranges and average cookies purchased per customer. It dynamically calculates and renders daily projections for each store location while also providing a public-facing homepage.

---

## 📌 Problem Domain

A user created a coffee-time confection called **Salmon Cookies** — delicious treats shaped like salmon and suitable for both humans and salmon to enjoy.

As the company prepares for international expansion, Pat needs:

- 📊 A sales projection application to estimate hourly and daily cookie production.
- 🏪 A public-facing homepage that reflects the brand design and provides essential business information.
- 🔄 An adaptable system that allows new store locations to be added easily.

This application solves those needs using JavaScript object constructors, DOM manipulation, and dynamic rendering.

---

# 🖥️ Application Overview

## 📄 Pages

### 🏠 Home Page (`index.html`)
Public-facing business website including:
- Business description
- Locations
- Hours of operation (6:00 AM – 8:00 PM)
- Contact information
- Brand styling (fonts, colors, layout)
- Lighthouse accessibility optimization

### 📈 Sales Page (`sales.html`)
Internal data management page that:
- Simulates hourly cookie sales
- Calculates daily totals
- Renders structured sales tables
- Allows users to dynamically add new store locations via form

---

# 🧠 JavaScript Architecture

## 🏗 Constructor Function

A reusable `CookieStore` constructor is used as a blueprint for all store locations:

function CookieStore(store, customerMin, customerMax, averageCookie)

Each store object stores:
- Location name
- Minimum hourly customers
- Maximum hourly customers
- Average cookies per customer
- Arrays for hourly customers and cookies
- Daily total cookies

---

## 🎲 Sales Simulation Logic

### Random Customer Generator

Generates a random whole number between minimum and maximum customer estimates using:

Math.random()

---

### Prototype Methods

Each store object shares methods through prototypes:

- calCustomersEachHour()
- calCookiesEachHour()
- render()

These methods generate simulated data and dynamically build HTML tables displaying hourly sales and totals.

---

# 📊 Default Store Locations

| Location | Min Customers | Max Customers | Avg Cookies |
|----------|--------------|--------------|------------|
| Seattle  | 23           | 65           | 6.3        |
| Tokyo    | 3            | 24           | 1.2        |
| Dubai    | 11           | 38           | 3.7        |
| Paris    | 20           | 38           | 2.3        |
| Lima     | 2            | 16           | 4.6        |

Each location is instantiated as its own JavaScript object.

---

# ➕ Dynamic Store Creation

The application includes a form that allows users to:

- Add new store locations
- Set custom min/max customers
- Set custom average cookies
- Automatically generate and render projections

This demonstrates:
- Event handling
- Form submission control
- Dynamic DOM updates
- Object creation at runtime

---

# 🎨 Design Requirements Implemented

### Fonts
- Righteous (Google Font) for headings
- Standard sans-serif font (e.g., Arial) for sales data
- Standard serif font (e.g., Georgia) for body text

### Color Scheme
- Header background: Black
- Navigation background: Salmon
- Navigation text: Black
- Page background: White
- Distinct font colors for different content areas

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Constructor functions & prototypes
- DOM manipulation
- Event listeners
- Math.random() simulation logic
- Git branching workflow
- ESLint configuration

---

# 📈 Key Concepts Demonstrated

- Object constructors
- Prototypes
- Single Responsibility Principle
- Template literals
- Random number generation
- Dynamic HTML table creation
- Form handling
- Application controller pattern

---

# 🌿 Accessibility

- Lighthouse Accessibility score targeted between 65–80
- Semantic HTML structure
- Proper heading hierarchy
- Clear table structure for screen readers

(Add Lighthouse screenshot to this README before final submission.)

---

# 🚀 How to Run the Project

1. Clone the repository.
2. Open `index.html` for the public site.
3. Open `sales.html` for the sales projection tool.
4. Use the form to add additional store locations.

---

# 👨‍💻 Developer Workflow

- New branch per lab (e.g., class06-Objects)
- Regular commits
- .gitignore included
- .eslintrc.json configured
- Meaningful variable and method names
- Clean, organized code structure

---

# 🎯 Project Purpose

This project demonstrates the ability to:

- Translate a business problem into a working web application
- Use JavaScript constructors and prototypes effectively
- Simulate real-world data
- Build both public-facing and internal-facing web interfaces
- Follow structured development workflow practices

---

## 👤 Author

Jason Timm
