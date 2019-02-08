# Introduction

> Create, list and edit your invoices with this simple React app

> More features to be added

> This is a practice project for me, feel free to use it as you wish

![](https://img.shields.io/github/last-commit/GavBaros/redux-aws-invoicer.svg?style=flat)
![](https://img.shields.io/github/repo-size/GavBaros/redux-aws-invoicer.svg?style=flat)
![](https://img.shields.io/david/GavBaros/redux-aws-invoicer.svg?style=flat)
![License](http://img.shields.io/:license-mit-blue.svg?)

## Table of Contents

1. [About](#about)
1. [Installation](#installation)
1. [Tests](#tests)
1. [Styling](#styling)
1. [License](#license)


# About

This web app allows a logged in user to create, list and edit invoices. 
All invoices are sorted by their order status and each invoice can have the price of several items calculated dynmaically as well as contain generic billing information. 

### Features

- Two factor authentication at sign up
- Fetch, create and edit invoices
- Sort invoices by their order status

### Future Features:

- Settings feature for each user including account, details and preferences handling
- Premium users will be allowed to send invoices while non-premium users can only receive invoices
- More detailed and relevently charted dashboard

### Preview:

![](demo.gif)


### Live Demo: 

https://invoicer-c6c19.firebaseapp.com


# Technologies

## Frontend
- React 
- Redux
- Redux Form
- Redux Thunk
- Semantic Ui React

## Backend
- API Gateway
- AWS Lambda
- DynamoDB
- AWS Cognito
- Cloudfront

# Installation

For Mac OS, Linux and Windows, from your terminal:

```sh
git clone https://github.com/GavBaros/redux-aws-invoicer.git
cd redux-aws-invoicer
npm install
npm start
```

# Tests

From your terminal:

```sh
npm run test
```

# Styling

[2]: https://github.com/Semantic-Org/Semantic-UI-React

The [Semantic UI React][2] component library has been used for a highly scalable, out-of-the-box and consistent styling across the app. 


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details





