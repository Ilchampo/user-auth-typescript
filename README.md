# User Authorization Template

Author: Pablo Beltran
Date: January 31st, 2022
Language: Typescript, Node Js.

## About

This project is a template for role-based Web Applications developed in Typescript as extension for Node JS. As database, MongoDB is used, which can be connected locally or as a cloud service with MongoDB ATLAS. Currently, there is only one Schema for the Users collection, which contains the following attributes.

### User Schema

| Attribute    | Type    | Constraint | Default  |
| ------------ | ------- | ---------- | -------- |
| Role         | String  | None       | user     |
| Firstname    | String  | None       | None     |
| Lastname     | String  | None       | None     |
| Email        | String  | Unique     | None     |
| Password     | String  | None       | None     |
| CreationDate | Date    | None       | Date now |
| LastSignOut  | Date    | None       | None     |
| Enable       | Boolean | None       | true     |

-   Role: currently, the template only validates if the user is either an 'admin' or 'user'. In case of needing more roles, it is necessary to edit the `role.ts` middle ware file to add the required permissions.
-   Enable: in case of needing to disable an user from sign in, you can set the value to `true` or `false`.

## Endpoints

The template has 2 endpoints, the auth routes and the private routes.

### 1. Auth routes

This endpoint allows the application to sign up and sign in users. To sign up, the body needs to contain the following data: `firstname`, `lastname`, `email` and `password`.
Sign Up: `http://localhost:3000/auth/signup`

As for the Sign In route, the body needs to contain the user `email` and `password`.
Sign In: `http://localhost:3000/auth/signin`

Both of these endpoints will return a `token`. The token needs to be storage as a Authorization header. For example, `Authorization: Bearer Yourgeneratedtoken`. This format is **important** since the authorization middlewares search for the Authorization header in order to grant access to protected endpoints.

**_Note: the fields on the front-end needs to match with the provided field names_**

### 2. Private routes

This endpoint has no impact on the Web Application. The purpose is to demonstrate the developer how to call the authorization middlewares for each endpoint. There are 3 routes, which can be access only by admins, only users and any client respectively.

Admin endpoint: `http://localhost:3000/admin`
User endpoint: `http://localhost:3000/user`
Client endpoint: `http://localhost:3000/`

**_Note: as mentioned before, the token has to be set as Authorization header to access protected endpoints._**

## Clone and run template

To run this project, is necessary to have installed [Node JS](https://nodejs.org/en/) and NPM.

### 1. Clone the repository

If using the Git-Bash console, you can run the following command.
`git clone https://github.com/Ilchampo/user-auth-typescript.git`

### 2. Install dependencies

Once the repository is cloned, run the following command to install the project dependencies specified on the `package.json` file.
`npm install`

### 3. Create a dotenv file in the project root folder

Before running the project, is important to create a `.env` with the following fields:

```
PORT = your port
MONGO_URI = your mongodb uri
MONGO_USER = your mongo user
MONGO_PASSWORD = your mongo password
TOKEN_KEY = your jwt key
TOKEN_EXPIRE = your jwt expire time (ex: 1 hour)
```

### 4. Run the project

#### 4.1 Developer Mode

To run the Typescript files, run the following command
`npm run dev`

#### 4.2 Build project

To build the Typescript files into JavaScript files, run this command. This will generate a `/dist` directory with the JavaScript files.
`npm run build`

#### 4.3 Run built project

Finally, to run the built Typescript files as JavaScript files. run the following command. This will run the `index.js` file in the `/dist` directory.
`npm run start`
