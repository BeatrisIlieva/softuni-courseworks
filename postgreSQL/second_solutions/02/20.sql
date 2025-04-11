CREATE OR REPLACE VIEW
	view_addresses
AS SELECT
	CONCAT_WS(
		' ',
		e.first_name,
		e.last_name
	) AS full_name,
	e.department_id,
	CONCAT_WS(
		' ',
		a.number,
		a.street
	) AS address
FROM 	
	employees AS e
JOIN 	
	addresses AS a
ON
	e.address_id = a.id
ORDER BY
	address ASC;