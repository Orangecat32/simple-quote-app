# Interview question : write a simple quote viewer application

## Requirements
  - Display and update the Last, % Change, Bid and Ask from a websocket server
  - When a row is clicked, expand to show additional details
  - Write the application in 90 minutes
  
## Strategy:
  - Bootstrap the project with [Create React App](https://github.com/facebook/create-react-app).
  - Connect to quote service when the App component is mounted and set state when updates are received
  - Toggle details visibility by adding the symbol of the expanded row to state when the row clicked
  - Two versions of the render were implemented: 
  - - Using <table> on branch "html-table"
  - - Using a second component and mostly <div> on branch "sub-component"

## Running the database server
- To get data, run the quote server [Here](https://github.com/Orangecat32/simple-quote-server) on your machine  

