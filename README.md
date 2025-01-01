# Reprice

Reprice is a web scraping application that allows users to track eCommerce product prices in real-time. Built with Next.js 14, the application scrapes product data, monitors price changes, and sends email notifications to keep users informed.

---

### Features

Real-Time Price Tracking: Monitor the prices of products across multiple eCommerce platforms.

Email Notifications: Receive instant alerts when a product's price drops.

Automated Data Scraping: Continuously fetch and update product data without manual intervention.

User-Friendly Interface: Simple and intuitive UI to add and manage tracked products.

Efficient Performance: Built using modern web technologies to ensure fast and seamless operation.

---

### Tech Stack

Framework: Next.js 14

Styling: TailwindCSS

Database: MongoDB

Web Scraping: Cheerio.js and BrightData

Email Notifications: Nodemailer

Deployment: Vercel

---

### Installation

#### Clone the Repository:
```bash
git clone https://github.com/KH4NY0/reprice.git
```

##### Install Dependencies:
```bash
npm install
```

#### Set Up Environment Variables:
Create a .env file in the root directory and add the following:

```bash
BRIGHT_DATA_USERNAME=
BRIGHT_DATA_PASSWORD=
MONGODB_URI=
EMAIL_PASSWORD= // from outlook.com
```

#### Run the Application:

```bash
npm run dev
```

### Access the Application:
Open http://localhost:3000 in your browser.

### Usage
Add a Product to Track:
Enter the product URL from Amazon to start tracking its price.

Monitor Price Changes:
The app will automatically scrape the product's price at regular intervals.

Receive Notifications:
Get email alerts whenever the product's price drops or reaches your desired threshold.


### Contributing
Contributions are welcome! Please follow these steps:

#### 1. Fork the repository.

#### 2. Create a new branch: git checkout -b feature-name.

#### 3. Commit your changes: git commit -m 'Add feature name'.

#### 4. Push to the branch: git push origin feature-name.

#### 5. Submit a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.


