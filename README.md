# The App Brewery - Back-end project 06 - Secrets

## Udemy - The Complete 2020 Web Development Bootcamp

### Section 32: Authentication & Security
A back-end program, that can manage user authentication. Users can register and login with a username + password combination, or with their Google/Facebook/GitHub accounts.
 - Passport - Local/Google/Facebook/Github Authentication
 - Mongoose - MongoDB
 - EJS
 - Express
 - Node.js
 - HTML5
 - CSS3
 - Bootstrap

#### The project is not deployed yet.
This was my first attemt to separate a little the 'spaghetti code' of the course, and I still want to work on refactoring it before deploying the project.

#### How to run: (from terminal)
 Clone the repository: 
 > git clone https://github.com/ArpadGBondor/The_App_Brewery-Back-end_project_06-Secrets.git
 
 Enter directory:
 > cd The_App_Brewery-Back-end_project_06-Secrets/
 
 Download the missing dependencies from npm: 
 > npm install
 
 Download, install and run MongoDB
 > https://www.mongodb.com/try/download/community

You need to register your application to get ID and SECRET keys from Google, Facebook and GitHub.
[(Google login registration)](https://console.developers.google.com/apis/)
[(Facebook login registration)](https://developers.facebook.com/)
[(GitHub login registration)](https://github.com/settings/developers)
 
 Create a file named '.env' and set these [enviroment variables](https://www.npmjs.com/package/dotenv):
 > PORT=3000  
 > DB_USER_CONNECT=mongodb://localhost:27017/SecretsDB  
 > APP_SESSION_SECRET=Any text that can be used as a session secret key  
 > APP_COOKIE_SECRET=Any text that can be used as a cookie secret key  
 > GOOGLE_CLIENT_ID=  
 > GOOGLE_CLIENT_SECRET=  
 > GOOGLE_REDIRECT_URL=http://localhost:3000/auth/google/secrets  
 > GOOGLE_PROFILE_URL=https://www.googleapis.com/oauth2/v3/userinfo  
 > FACEBOOK_APP_ID=  
 > FACEBOOK_APP_SECRET=  
 > FACEBOOK_REDIRECT_URL=http://localhost:3000/auth/facebook/secrets  
 > GITHUB_CLIENT_ID=  
 > GITHUB_CLIENT_SECRET=  
 > GITHUB_REDIRECT_URL=http://localhost:3000/auth/github/secrets  

 Run program: 
 > nodemon app.js
 
 Send get request from browser:
 > Open: http://localhost:3000
