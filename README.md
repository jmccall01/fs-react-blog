# How to run this project locally
## Step 1:
Clone this repo
## Step 2:
From the client repo run `npm i`
## Step 3:
From the server repo run `npm i`
## Step 4:
In pgAdmin create a db called blog and run the queries.sql file to create the required tables
## Step 5:
In the posts table import the posts.csv (using | as the delimiter)
## Step 6:
In the users table import the users.csv (using | as the delimiter)
## Step 7:
Create a .env file in your server repo.
In the .env file add:
DB_PASS="your database password here"
JWT_KEY="JWT key here"
## Step 8:
Run `nodemon index.js` from both the server and client repos (let them run simultaneously along with having your pgAdmin server running)
