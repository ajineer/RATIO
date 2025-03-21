-- ALTER TABLE users ADD COLUMN active_token TEXT;
-- ALTER TABLE accounts DROP CONSTRAINT user_id;
-- ALTER TABLE accounts ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE invoices ADD COLUMN account_id UUID;
ALTER TABLE invoices ADD CONSTRAINT account_id FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE;
-- \i /Users/ajineer/Desktop/Development/code/phase-6/Ratio/server/sqlScripts/alterUsers.sql