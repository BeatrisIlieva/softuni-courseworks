CREATE OR REPLACE PROCEDURE sp_transfer_money(
	sender_id INT,
	receiver_id INT,
	amount NUMERIC(10, 4)
)
AS
$$
DECLARE	
	sender_balance NUMERIC;
BEGIN
	CALL sp_deposit_money(receiver_id, amount);
	CALL sp_withdraw_money(sender_id, amount);
	
	sender_balance := (SELECT balance FROM accounts WHERE id = sender_id);
	
	IF (sender_balance < 0) THEN
		ROLLBACK;
	END IF;
END;
$$
LANGUAGE plpgsql;

CALL sp_transfer_money(10, 2, 1043);

SELECT * FROM accounts WHERE id = 5 OR id = 1