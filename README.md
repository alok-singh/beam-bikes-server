# beam-bikes-server
Beam bikes server

## Requirements

 - [Node v10+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [MySQL](https://dev.mysql.com/downloads/mysql/)

## Getting Started
## Pre-Requisites
```bash
MySQL
```

Install Node dependencies:

```bash
yarn
```
## Running Locally

```bash 
Create .env file copy from .env.example 
```
```bash
Replace test values with actual values
```
```bash 
Make sure Node can access MYSQL
```

### Run the following command to start server locally

```bash
yarn dev
```

## Testing API

### API Example to generate bikes
```bash
http://localhost:3000/v1/generate-bikes?limit=1000
```

### API Example to get bikes
```bash
http://localhost:3000/v1/bikes?lat=1.2847447&lng=103.5669755&distance=100&limit=12
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## License

[MIT License](README.md) - [Alok Singh]
