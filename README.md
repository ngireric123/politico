# Politico [![Build Status](https://travis-ci.org/ngireric123/politico.svg?branch=develop)](https://travis-ci.org/ngireric123/politico) [![Coverage Status](https://coveralls.io/repos/github/ngireric123/politico/badge.svg?branch=develop)](https://coveralls.io/github/ngireric123/politico?branch=develop)  <a href="https://codeclimate.com/github/ngireric123/politico/maintainability"><img src="https://api.codeclimate.com/v1/badges/733113c796dbcd09801f/maintainability" /></a>
Politico is a platform for the politicians and citizens. It helps citizens give mandates to politicians running for different political offices (https://politico-eric.herokuapp.com/)

# Getting Started
Install dependencies 

`npm install`

Starting development server 

`npm run start`

Run Tests 

`npm run test`

# User Interface
https://ngireric123.github.io/political-challenge1/


# Technologies Used

|    Server     | Testing Framework |  Style Guide  |  Linting Library |
| ------------- | -------------     |  ------------- | -------------   | 
| * Node        |     * Mocha       |  * Airbnb      |     * ESLint    |
| * Express     |                   |                |                 |

# API-Endpoints
JSON Object is returned for every API endpoint, structure of return JSON Object:

# Office

`Post / office`

{

    "status": 201,
    "message": "Political Office created",
    "data": {
        "id": 1,
        "type": "legislative",
        "name": "senate"
    }
}

`GET /offices`
{

    "status": 200,
    "data": [
        {
            "id": 1,
            "type": "legislative",
            "name": "senate"
        },
        {
            "id": 2,
            "type": " state",
            "name": "minister"
        }
    ]
}

`GET /offices/<office-id>`

{

    "status": 200,
    "data": [
        {
            "id": 2,
            "type": " state",
            "name": "minister"
        }
    ]
}

# Party

`GET /parties`

{

    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "FPR",
            "hqaddress": "KG 23 ",
            "logourl": "ekfe"
        },
        {
            "id": 2,
            "name": "PL",
            "hqaddress": "KK 22 ",
            "logourl": "dff"
        }
    ]
}

`POST /parties`

{

    "status": 201,
    "message": "Political Party Created",
    "data": {
        "id": 2,
        "name": "PL",
        "hqaddress": "KK 22 ",
        "logourl": "dff"
    }
}

`GET /parties/<party-id>`
{

    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "FPR",
            "hqaddress": "KG 23 ",
            "logourl": "ekfe"
        }
    ]
}

`PATCH /parties/<party-id>`

{

    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "PDI",
            "hqaddress": "KG 23 ",
            "logourl": "ekfe"
        }
    ]
}

`DELETE /parties/<party-id>`
{

    "status": 200,
    "message": "Political party deleted"
}
