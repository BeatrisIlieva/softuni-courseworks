CREATE OR REPLACE PROCEDURE 
	sp_retrieving_holders_with_balance_higher_than(
		searched_balance NUMERIC
	)
AS
$$
DECLARE
	account_info RECORD;
BEGIN
	FOR account_info IN
		SELECT
			CONCAT_WS(
				' ',
				ah.first_name,
				ah.last_name
			) AS full_name,
			SUM(a.balance) AS total_balance
		FROM
			accounts AS a
		JOIN
			account_holders AS ah
		ON
			ah.id = a.account_holder_id
		GROUP BY
			ah.first_name,
			ah.last_name
		HAVING
			SUM(a.balance) > 200000
		ORDER BY
			full_name
	LOOP
		RAISE NOTICE '% - %', account_info.full_name, account_info.total_balance;
	END LOOP;
END;
$$
LANGUAGE plpgsql;

CALL sp_retrieving_holders_with_balance_higher_than(200000);