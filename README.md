<div align="center">
  <br/>
  <h1><a href="https://find-me-a-coffee-shop.onrender.com/">:coffee: :cookie: Find Me a Coffee Shop  :tea: :doughnut: </a></h1>
  <p>
    <strong>A platform to explore the best coffee shops and pay for them.</strong>
  </p>
<a href="https://find-me-a-coffee-shop.onrender.com/">Live Link ↗</a>
  <br/>
</div>

## Demo Video
[![Watch the video](https://github.com/Rishabh-Singh-Codes/find-me-a-shop/assets/86565216/4144acb0-345d-4b5c-b503-be20bdf8f465)](https://www.youtube.com/watch?v=Ll0pKgaRlPc)
Video Link: [YouTube](https://www.youtube.com/watch?v=Ll0pKgaRlPc)


## Features
This dynamic, secure, and user-friendly website has the following features: 
  - **Home Page**
    - Grid of all the shops present on our platform (list coming from DB).
    - Image carousel to get a vibe of the shop.
    - Shop at a glance feature (displays info like name, locality, rating, avg. price for two)
    - Navigation to get individual shop's details.
  - **Shop Details Page**
    - Displays shop-specific data.
    - Item's category list.
    - Items are listed category-wise.
    - List of each item with its info like name, price, nutritional info, description, veg/non-veg etc.
    - Each item has add button to add an item to our cart.
> [!IMPORTANT]
> - Upon clicking the ![Add +](https://img.shields.io/badge/Add%2B-green) (add) button, if the user is not logged in, they're **redirected to login page**.
> - If the user is logged in but item(s) from a different store is present in the cart, **an error message(toast) is displayed**.
  - **Login Page**
    - Checks the user credentials provided with the credentials in our DB using secure password verification.
    - Has validations for all the fields.
    - If they successfully login, they are redirected back to the same shop page & and the item is added to their cart.
    - User can be redirected to Register page, if they haven't registered yet.
  - **Register Page**
    - Has validations for all the fields with specific error messages.
    - Checks for already registered email, as email registration is unique in our platform.
    - If they successfully register, they are redirected back to the same shop page & and the item is added to their cart.
  - **Cart Page** 
    - On this page, all the items added in the cart are displayed with total cart value.
    - The shop details are also shown, for easy navigation.
> [!IMPORTANT]
> - The user can increase or decrease the quantity of a particular item from the cart itself without the need of going back to the shop page.
> - When the user adds an item to the cart, it is stored in their session storage for easy access all across the app.
  -
    - Provision provided to clear the cart completely.
    - CTA button to proceed to pay for the cart.
  - **Payment Page**
    - This is the most important page as this is where the user makes the final payment for their cart.
    - User cart with item info. is displayed.
    - User info. provided at the time of registration is displayed (non-editable) which goes to the shop also.
> [!IMPORTANT]
> - A payment intent is created for the total cart price and is displayed.
> - After confirming the details, the user will put in their card details, into **Stripe** ![Stripe](https://img.shields.io/badge/stripe-violet?logo=stripe&logoColor=white)
 card element. A confirm payment option like OTP, password is provided for payment completion.
> - In doing so, we do not have to have to worry about handling user's financial info.
- 
   - After the payment is complete we store the order data, empty the cart and redirect the user to the user's completed orders page.
- **Order Page**
   - All the orders made by the user is shown here, with shop, cart items, order id, total and the time of order confirmation.
> [!IMPORTANT]
> If the user signs out at any point in the journey, the cart is cleared from session & application storage so that if any other user logs in, the do not see any stale data.

> [!NOTE]
> All the sensitive routes in client and server are protected.

## Tech Stack
![Tech Stack](https://skillicons.dev/icons?i=react,express,nodejs,mongodb,typescript,redux,tailwind,aws,git,html,css,javascript,github,vscode,postman)
- React
- Express
- MongoDB
- Typescript
- Redux
- React-Query
- React Hook Form
- JWT
- Zod
- Tailwind
- Stripe SDK

## Setup Prerequisite
- MongoDB account and connection string for new DB
- Stripe account with Public & Secret Key

## Project Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/Rishabh-Singh-Codes/find-me-a-shop.git
    ```

2. Navigate to the project directory:
    ```bash
    cd find-me-a-shop
    ```

3. Install the dependencies: 
    ```bash
    cd client && npm install && cd .. && cd server && npm install && cd .. && cd shared && npm install
    ```

4. Create `.env` files similar to `.env.example` in client & server and add your values for the keys
    ```bash
    ## client
    VITE_API_BASE_URL="URL on which server is running"
    VITE_STRIPE_PUB_KEY="Public key provided by Stripe"
    
    ## server
    MONGODB_CONNECTION_STRING="DB connection string containing username & password"
    JWT_SECRET_KEY="Your secret key (can be anything)"
    FRONTEND_URL="URL on which client is running"
    STRIPE_API_KEY="Secret key provided by Stripe"
    ```

5. Run the development environment individually in server & client using:
   ```bash
   npm run dev
   ```
   
6. Access the application at http://localhost:5173
