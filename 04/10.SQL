SELECT
	CONCAT_WS(
		' ',
		first_name,
		last_name
	) AS wizard_name,
	deposit_start_date,
	deposit_expiration_date,
	deposit_amount
FROM 
	wizard_deposits
WHERE
	deposit_expiration_date <= '1983-08-17'
GROUP BY
	wizard_name,
	deposit_start_date,
	deposit_expiration_date,
	deposit_amount
ORDER BY
	deposit_expiration_date ASC;