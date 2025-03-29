# Testing guide

## Folder structure for different types of testing

tests/
│── unit/
│ ├── validation.test.js (Joi Schema tests)
│ ├── auth.test.js (Login & token tests)
│ ├── controllers.test.js (Business logic tests)
│── integration/
│ ├── userRoutes.test.js (API endpoint tests for signup and login)
│ ├── accountRoutes.test.js (API endpoint tests for get, post, patch and delete actions on accounts)
│ ├── invoiceRoutes.test.js (API endpoint tests for post, and patching invoices)
│ ├── transactionsRoutes.test.js (API endpoint tests for transaction routes (get, post, and patch))
│── e2e/
│ ├── fullAppFlow.test.js (Simulate real user flow; From signup to adding and reversing transactions on accounts and modifying invoices)
