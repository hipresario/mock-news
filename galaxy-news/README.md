# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Live News Feed
Simple React bootstrapped with ChartGPT in few hours.
1. I need to build the React app from scratch, should store large news items in context and retire older news after 2 hours
2. news item attributes have id, headline, source, timestamp, assets, keywords, link and optional priority
3. all news needs to be sorted by timestamp and with latest news displayed on top of the news feed
4. yes I need to keep news list always sorted in NewsContext
5. the total news items will grow bigger, I want to limit the display using react-window to max 100 items
6. need to highlight high-priority news
7. I would like to have filtering by source, assets, keywords
8. I also want a global search bar for all news
9. yes, with a debounce using lodash.debounce
10. I need to use the news feed in both mobile and desktop, can you help improve the css styles?
11. could you display all the source codes now?

- The problem is to handle large incoming news and limit memory usage and also control the display items
- I am familiar with React, and it's simple to start, build and deploy.
- I would like to improve the data structures used if given more time, mostly in filter conditions and
- also will provide a full view router of all news since client connected query by time, filter etc. 