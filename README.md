# Interview question: Write a simple quote viewer application and node server

## Requirements
  - Display and update the Last, % Change, Bid and Ask from a websocket server
  - When a row is clicked, expand to show additional details
  - Write the application in 90 minutes
  
## Strategy
  - Bootstrap the project with [Create React App](https://github.com/facebook/create-react-app).
  - Connect to quote service when the App component is mounted and set state when updates are received
  - Toggle details visibility by adding the symbol of the expanded row to state when the row is clicked

     
## Running the server
  - To get the quote data, run 'yarn server' from the root directory  
