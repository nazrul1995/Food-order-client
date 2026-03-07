🍽️ LocalChefBazaar – Home Cooked Food Marketplace

LocalChefBazaar is a modern full-stack MERN marketplace platform that connects home chefs with customers who want fresh homemade meals. Customers can browse meals, view chef details, place orders, track order status, leave reviews, and make secure payments. Home chefs can create meals, manage orders, and earn money from their kitchen.

The platform includes role-based dashboards (Admin, Chef, User), real-time order workflow, Stripe payment integration, and secure authentication using Firebase + JWT.

🚀 Live Project

🔗 Live Site: https://chef-client-pi.vercel.app

🔗 Client Repository: https://github.com/nazrul1995/chef-bazar-frontend

🔗 Server Repository: https://github.com/nazrul1995/Chef-Bazar-server

🎯 Project Purpose

The goal of LocalChefBazaar is to build a platform where:

• Home chefs can sell homemade meals without opening a restaurant
• Customers can easily find healthy homemade food nearby
• Admins can manage users, chefs, requests, and platform performance

It demonstrates full-stack development, authentication, payments, and role-based dashboards using the MERN stack.

👥 User Roles
👤 User (Customer)

Browse meals

View meal details

Add meals to favorites

Place orders

Pay using Stripe

Submit reviews

Track order status

👨‍🍳 Chef

Create meals

Manage meals

Accept or cancel orders

Deliver orders

View order requests

🛠️ Admin

Manage users

Approve chef/admin requests

Mark users as fraud

View platform statistics

Monitor orders and payments

✨ Key Features
🔐 Authentication

Firebase Email/Password login & registration

JWT authentication for protected API routes

Secure environment variables

Private routes protection

🍔 Meals System

Browse meals from home chefs

Sorting by price

Pagination (10 meals per page)

Detailed meal view

Favorite meal system

🛒 Ordering System

Confirm orders with quantity

Auto price calculation

Order status management

Real-time order updates

Chef order management

⭐ Review System

Add reviews for meals

Edit & delete reviews

Show reviewer info, rating, comment, and date

💳 Stripe Payment Integration

Payment page for accepted orders

Payment history stored in MongoDB

Payment status update

Payment success page

📊 Admin Dashboard

Manage users

Approve chef/admin requests

Mark fraud users

Platform statistics using charts

Order tracking

📱 Responsive UI

Fully responsive design

Mobile-friendly layout

Clean and recruiter-friendly UI

🖥️ Main Pages
Public Pages

Home

Meals

Login

Register

Private Pages

Meal Details

Order Page

Dashboard

Dashboard Sections

User Dashboard

My Profile

My Orders

My Reviews

Favorite Meals

Chef Dashboard

My Profile

Create Meal

My Meals

Order Requests

Admin Dashboard

My Profile

Manage Users

Manage Requests

Platform Statistics

🧰 Technologies Used
Frontend

React

React Router

React Hook Form

Axios

Framer Motion

SweetAlert2 / React Toastify

Recharts

Stripe React SDK

Tailwind CSS / DaisyUI

Backend

Node.js

Express.js

MongoDB

JWT Authentication

Stripe API

Cookie Parser

CORS

Authentication

Firebase Authentication

Deployment

Vercel / Netlify (Client)

Render / Railway (Server)

MongoDB Atlas

📦 NPM Packages Used

Frontend

react
react-router-dom
axios
react-hook-form
framer-motion
sweetalert2
react-toastify
recharts
@stripe/react-stripe-js
@stripe/stripe-js

Backend

express
cors
mongodb
jsonwebtoken
cookie-parser
dotenv
stripe
🔒 Security Features

Firebase authentication

JWT token verification

HTTP-only cookies

Protected routes

Secure MongoDB credentials

Environment variables for sensitive data

📊 Platform Statistics

Admin dashboard provides:

Total Payment Amount

Total Users

Pending Orders

Delivered Orders

Displayed using Recharts charts and summary cards.

📱 Additional Features

✔ Loading screen
✔ Custom error page
✔ Responsive design
✔ Dynamic page titles
✔ Protected routes with JWT
✔ Pagination in meals page


👨‍💻 Admin Access (for evaluation)

Admin Email: admin@email.com

Admin Password: 123456

📌 Future Improvements

Real-time order notifications

Live chat between chef and customer

Advanced search and filters

Push notifications

AI meal recommendations

📄 License

This project is built for educational and demonstration purposes.