## Getting started

#### Developed with:

- [Node.js](https://nodejs.org/en/) - 22.5.1

First, install the dependencies using `npm install` or `yarn`.

Then, run the development server:

```bash
npm run dev
```

Then, open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

You can start testing the API with your favorite tools (curl, postman, swagger, ...)

To avoid any issues, please make sure you have the latest stable version of [Node.js](https://nodejs.org/en/) installed.

If you need to have multiple versions of Node.js installed, you can use [nvm](https://github.com/nvm-sh/nvm).

### List of available scripts:

### `dev`

Runs the app in the development mode.
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The api will reload when you make changes.\


### How to use environment variables

All environment variables should be added in .env file.

You can see the example usage in [.env.example]([http://localhost:8080](https://github.com/huannguyen2114/ecommerce-app/blob/main/.env.example)):


##### .env.local example:

```bash
PORT=8080
NODE_ENV=dev
```

------

## File structure

    .
    ├── src                     # source files
    │   ├── auth                # authentication utilities
    │   ├── config              # configuration for server
    │   ├── controllers         # controllers           
    │   ├── core                # core utilities (ex: error status code)
    │   ├── dbs                 # database connection
    │   ├── helpers               
    │   ├── lib                 # custom libraries
    │   ├── models              # models for database entities               
    │   ├── postman             # API testing using HTTP client extension on VSCode
    │   ├── routes              # routes definition
    │   ├── services            # services for controllers
    │   ├── utils               # some utilities
    │   ├── app.js              # app entry point
    ├── .eslint.config.js       # eslint config
    ├── .server.js              # setup port/graceful shutdown and run the server
    ├── .env                    # enviroment file
    ├── package.json   
