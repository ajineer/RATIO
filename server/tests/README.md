# Testing guide

## Folder structure for different types of testing

tests/
│── unit/
│ ├── schemaTests.test.js
│ │ ├── user signup schema
│ │ ├── user login schema
│ │ ├── reset password schema
│ │ ├── add account schema
│ │ ├── update account schema
│ │ ├── add invoice schema
│ │ ├── update invoice schema
│ │ ├── add transaction schema
│ ├── middleware.test.js
│ │ ├── token generation
│ │ ├── token validation
│ │ ├── token revoking
│ │ ├── hashing password
│ ├── controllers.test.js (Business logic tests)
│ │ │ ├── userControllerTest
│ │ │ │ ├── signup
│ │ │ │ ├── login
│ │ │ │ ├── logout
│ │ │ │ ├── reset password
│ │ ├── accountController
│ │ │ │ ├── retrieve accounts
│ │ │ │ ├── create new account
│ │ │ │ ├── update account
│ │ │ │ ├── delete account
│ │ ├── invoiceController
│ │ │ │ ├── retrieve invoices
│ │ │ │ ├── create new invoice
│ │ │ │ ├── update invoice (freq, amount, next due date, recurring status)
│ │ │ │ ├── pay invoice (amount, status, )
│ │ ├── transactionController
│ │ │ │ ├── retrieve transactions for an account
│ │ │ │ ├── create a transaction on an account
│ │ │ │ ├── reverse a transaction on an account
│── integration/
│ ├── userRoutes.test.js (API endpoint tests for signup and login)
│ │ ├── post request (sign up)
│ │ ├── post request (login)
│ │ ├── post request (logout)
│ │ ├── patch request (reset password)
│ ├── accountRoutes.test.js (API endpoint tests for get, post, patch and delete actions on accounts)
│ │ ├── get request
│ │ ├── post request
│ │ ├── patch request
│ │ ├── delete request
│ ├── invoiceRoutes.test.js (API endpoint tests for post, and patching invoices)
│ │ ├── get request
│ │ ├── post request
│ │ ├── patch request (modify invoice)
│ │ ├── patch request (pay invoice)
│ ├── transactionsRoutes.test.js (API endpoint tests for transaction routes (get, post, and patch))
│ │ ├── get transactions (works with one account at a time)
│ │ ├── post a new transaction (manual creation differs from automated creation in the invoice controller)
│ │ ├── patch transaction (reverses transaction, this is only allowed within 24 hours of the creation of the transaction)
│── e2e/
│ ├── fullAppFlow.test.js (Simulate real user flow; From signup to adding and reversing transactions on accounts and modifying invoices)
│ │ ├── sign up new user
│ │ ├── login in new user
│ │ ├── change password
│ │ ├── logout
│ │ ├── login again
│ │ ├── create account(s)
│ │ ├── see all account(s)
│ │ ├── update account(s)
│ │ ├── delete account(s)
│ │ ├── create invoice(s)
│ │ ├── see invoice(s)
│ │ ├── update invoice(s)
│ │ ├── pay invoice(s)
│ │ ├── create transaction(s)
│ │ ├── see transaction(s)
│ │ ├── reverse transaction(s)
