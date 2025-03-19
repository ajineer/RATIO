-- ALTER TABLE users ADD COLUMN active_token TEXT;
ALTER TABLE accounts DROP CONSTRAINT user_id;
ALTER TABLE accounts ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
-- \i /Users/ajineer/Desktop/Development/code/phase-6/Ratio/server/sqlScripts/alterUsers.sql