# TodoApp

## Tools
This project was developed with the following tools:
- Angular CLI v13.3.2
- NodeJS v8.5.4
- MySQL v5.0.12
- Express v4.17.3

## Average Runtimes
### API setup: 4120 ms
### Angular App: 203.51 ms

## How to run
The `start.sh` file provides the commands necessary to start the API and Angular App at `localhost:4200`.
If bash is not available but have [concurrently](https://www.npmjs.com/package/concurrently), you can start the server by running:
```
concurrently "ng serve" "npm start --prefix ./server"
```

## Testing Credentials
For testing purposes, the default account is "admin" and "23 8451" as user and password, respectively. No quotes included.
