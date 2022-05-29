# Node Tiny URL API

## Quick Links
API Hosted on Heroku : [https://miniurlapi.herokuapp.com/api/v1/](https://miniurlapi.herokuapp.com/api/v1/)

Swagger Doc: [https://miniurlapi.herokuapp.com/api-explorer/](https://miniurlapi.herokuapp.com/api-explorer/)

## Quick Start (Local)


You need to create a `.env` file and configure your database at first, then set up the database and start developing / testing.
I have added my test credentials into the .env.example file , feel free to use them if you like!
```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test

```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It

#### Run in _development_ mode:

Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in _production_ mode:

Compiles the application and starts it in production mode

```shell
npm run compile
npm run start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm test:debug
```

## Try It

Make sure the database is running

- Open your browser to [http://localhost:3000](http://localhost:3000)
- Invoke the `/` endpoint
  ```shell
  curl http://localhost:3000/api/v1/
  ```

