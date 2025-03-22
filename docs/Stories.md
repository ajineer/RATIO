# Ratio

## User Stories

- User can signup or login
- User can reset password

## App Functions

### Accounts

- User can see all their accounts
- User can add an account
- User can edit any of their accounts (allowed to edit: name, type, description)

### Invoices

- User can view the invoice of any of their accounts
- User can edit an account's invoice (allowed to edit: status, amount, recurring, due date, and frequency)
- User can edit an account's invoice paid status under the restriction that it has not already been paid and it resets only after a period of time
- User can check off bills paid (invoices belonging to accoounts that have been paid [daily, weekly, monthly, annually]) create a transaction automatically for that account and marks the paid status of the invoice as paid

### Transactions

- User can manually add transactions (extra credit card payment, or loan payments, etc....)
- User can view transaction history for any account
- User can reverse a transaction under the restriction it happens withing the next 24 hours
