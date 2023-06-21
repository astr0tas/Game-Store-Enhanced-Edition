The client is using ReactJS so in order to run the client, first you need to go to the `client` directory, simple type: `cd client`, and then type: `npm i` to install all the necessary libraries, and finally type: `npm start` to run the react app.

The database is MySQL server so you just need to run the .sql files in MySQL Workbench or anything else that support MySQL server.

The server is using XAMPP so you will need to put the content of the `server` folder into your XAMPP root directory (default is C:/xampp/htdocs) to establish the server.

P/S: The project still has some bugs and weird behaviors but they're minors and don't affect much, also the server doesn't send http status code accordingly, the web app itself doesn't have anything security methods to prevent threats like SQL Injection, XSS, etc... These problems can be fixed but since I really don't have much time so I'm just leaving them there. Afterall, this is just a project to improve my understanding of React and vanilla PHP.
