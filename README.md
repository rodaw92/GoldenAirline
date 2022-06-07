# GoldenAirline

# Functional requirements

![Parts](https://github.com/rodaw92/GoldenAirline/blob/master/image.png)


# Setup
1.	I used the command "npx create-react-app frontend" in the VS code console to get the react application.
2.	Use 'npm start' to start the react application.
3.	“npm install react-router-dom” was used to install React DOM, which is used to define routes in react applications.
4.	In the root folder, develop a nodejs application that creates APIs to return data to the frontend. First, run “npm init” to construct it using the package,json file, and other options.
5.	After that, I used “npm install express” to create a basic server to serve the client.
6.	To start the server, I installed the babel package, which converts the code to an ES6 module version that nodejs can comprehend because nodejs only supports the ES5 version. 
•	"npm install @babel/cli @babel/core @babel/node @babel/preset-env @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-env @babel/preset-env @babel –save-dev nodemon”
7.	Nodemon is a tool that aids in the development of node.js apps by dynamically restarting them when file changes in the directory are detected. (By Remy Sharp, https://github.com/remy/nodemon).
8.	I made a file called .babelrc to define a configuration for babel/presents so that I could run the project from the terminal while also running ES6 code.
9.	Modified the script inside package.json "start": "nodemon --watch backend --exec babel-node backend/server.js" to run the server from the terminal using “npm start” command.
10.	I installed axios library in frontend folder to fetch the data from API “npm install axios”.
11.	I installed redux using: npm install react-redux.
12.	Added middleware (thunk) to store.js, which allows me to conduct async transactions inside redux actions, and installed it with “npm install redux-thunk”.
13.	I used the following command to install js-cookie in the frontend folder: “npm install js-cookie” to store the previous state in case the user closes the browser or refreshes the screen.
14.	I need to install mongoose using "npm install mongoose" to connect to MonogoDB.
15.	I defined the URL of connection to MongoDB inside a file named (.env) after installing mongoose and MongoDB to save sensitive data in it.
16.	. I need a library called dotenv and to install it: “npm install dotenv” in order to access the variables that defined in. env
17.	Created a new file under backend/config.js to hold all configurations, then implemented this file, as well as the dotenv library and mongoose, in server.js. Use the "mongoose.connect" method to connect to MongoDB.
18.	Set a token to check the next request authentication while checking the signin user data. To utilise the token, I used "npm install jsonwebtoken" in the backend folder.

# Build and Run
  First to run the server ,in the terminal type:
cd backend
cd start
  To run the client, Open new terminal and type:
cd frontend
cd start
