# CI/CD Bloglist App
Web application allowing user to create, remove, like and comment on a blog.

The purpose of this repository is to build a CI/CD-pipeline using Github actions to lint, test and deploy the application to Heroku as part of [Full Stack open's curriculum exercise](https://fullstackopen.com/en/part11/expanding_further#exercises-11-20-11-22).

[DEMO](https://fullstackopen-blog-app.herokuapp.com/)

* Demo Login credentials:
  * **username**: Artos
  * **password**: testing


## Tech Stack
* **Language**: JavaScript
* **Database**: MongoDB
* **[Micro]Frameworks**: NodeJs - Express - React
* **Libraries**: Material UI


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

* For instruction on setting up MongoDB visit [here](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#mongo-db)

### Installing dependencies
```
npm install
```

### Create `.env` file at the root of the repository:
```
MONGODB_URI=your_uri_key
TEST_MONGODB_URI=your_test_uri_key
SECRET=your_secret
PORT=your_port
```


### Building the client
```
npm run build:ui
```

### Starting the application
```
npm run dev
```

## Testing

### Server test
```
CI=true npm test
```

### E2E test
* To open the browser
```
npm run cypress:open
```

* To run tests headless
```
npm run test:e2e
```

## Contributors
* Joe Lee - Initial work

## Acknowledgement
Created as part of the [Full Stack open's curriculum](https://fullstackopen.com/en/part11)