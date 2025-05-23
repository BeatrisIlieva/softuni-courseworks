CREATE OR REPLACE PROCEDURE sp_withdraw_money(
	account_id INT,
	money_amount NUMERIC(10, 4)
)
AS
$$
DECLARE
	current_balance NUMERIC;
BEGIN
	current_balance := (SELECT balance FROM accounts WHERE id = account_id);
	IF current_balance < money_amount THEN
		RAISE NOTICE 'Insufficient balance to withdraw %', money_amount;
	ELSE
		UPDATE accounts
		SET balance = balance - money_amount
		WHERE
			accounts.id = account_id;
	END IF;
END;
$$
LANGUAGE plpgsql;

CALL sp_withdraw_money(1, 100);