# Backend Assessment - Blog Posts

Tech stack = Node.js, Express, Jest 

## Setup
Ensure you have `Node.js` and `npm` ( or `yarn` ) installed. <br />
Confirm that the following commands can output their versions without error on your machine:
```
node -v
npm -v # or yarn -v
```

Next, install the project dependencies:

```
npm install # or yarn install
```

Then start the server:
```
npm run start # or yarn run start
```
Open http://localhost:3000/api/posts with your browser to test out APIs.
(Refer to Routes Section for more details) 

The page outputs JSON data based on API and its query parameters.

## Routes

Route 1: /api/ping

Route 2: /api/posts

An /api/posts route that handles the following query parameters: <br />

* tags (mandatory) : any number of comma-separated strings (example: /api/posts?tags=tech,health)<br />
* sortBy (optional) : one of “id” (default), “reads”, “likes”, “popularity” (example: /api/posts?tags=tech&sortBy=likes) <br />
* direction (optional) : one of “asc” (default), “desc” (example: /api/posts?tags=tech&sortBy=likes&direction=desc)

## Testing

Please run the following test cases written to test the APIs:
```
npm run test # or yarn run test
```
