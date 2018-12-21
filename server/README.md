## Setup Instructions

- From your MacOS terminal, cd into the 'server' folder
- Run the command 'npm install' to install the required module dependencies
- After the modules have been installed, run the command 'node server.js' to run the server.

## How the server side works

1.  There are just 3 REST api endpoints (get, patch, post)
2.  The post endpoint validates a request and if the 'req.body' values are valid, it creates a new invoice object
3.  The patch endpoint similarly checks if there is an 'id' sent to it, only then does it update an invoice object
4.  The get endpoint simply returns all the created invoice objects from the database

5.  Note: The server is configured such that it only allows 'localhost:3000' to perform requests
6.  'Mlab' was used as a DaaS to host a sandbox mongoDB service.

## Validation

- Request validation was done manually ('middlewares.js'), node validation libraries that handle this such as 'Joi' could have been used especially if the app scales and becomes more complex.


## Test
- IMPORTANT: I haven't used a test database, any test that is executed will affect the real database!
- 'npm test'
