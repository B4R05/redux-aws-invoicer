This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup Instructions

- From your MacOS terminal, cd into the 'client' folder
- Run the command 'npm install' to install the required module dependencies
- After the modules have been installed, run the command 'npm start' to run the app.
- IMPORTANT: Only run the app on 'localhost:3000' as the backend will only accept requests from that point

## How the client side works

1. Invoices can be created through the form in 'NewInvoice.js'
2. On 'InvoiceList.js', the user can see the list of Invoices created as Invoice components within a table layout. If no 'Date Paid' value is assigned (eg: an empty string), the Invoice component will return a 'Status' of 'Pending'. If a value is assigned, a 'Paid' status will be visible.
   The 'Status' header when clicked sorts the Invoice components by status 'Paid' first or 'Pending' first.
3. A 'View' button is included in each Invoice component, which when clicked, navigates the user to a detailed version of that invoice, 'InvoiceDetails.js'
4. 'InvoiceDetails.js' receives props fed to it by the Invoice component and displays them
5. One can edit the 'Date Paid' property of every invoice inside of 'InvoiceDetails.js'
6. The Dashboard component simply shows the number of paid and unpaid invoices.

## Form Validation

- React form validation libraries such as 'Formik' would have been ideal to use and is more dependable. For the sake of speed, I validated all fields manually.

- When creating or updating an invoice, 'Date Paid' can be left blank and cannot accept a future date but only the current date to a date since the last ten years.

# Styling

- Styling was kept to a minimum using Semantic UI.
