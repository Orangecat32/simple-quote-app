# Interview question: Write a simple quote viewer application

## Requirements
  - Display and update the Last, % Change, Bid and Ask from a websocket server
  - When a row is clicked, expand to show additional details
  - Write the application in 90 minutes
  
## Strategy
  - Bootstrap the project with [Create React App](https://github.com/facebook/create-react-app).
  - Connect to quote service when the App component is mounted and set state when updates are received
  - Toggle details visibility by adding the symbol of the expanded row to state when the row is clicked
  - Two versions of the render were implemented:
    1. Branch "html-table", primarily using "table" semantics
    2. Branch "row-component", which uses a react component for each ticker row

     
## Running the database server
  - To get the quote data, run the server [in this repository](https://github.com/Orangecat32/simple-quote-server) on your machine  
