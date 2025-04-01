CREATE VIEW 
	view_addresses
AS 
SELECT
	CONCAT_WS(
		' ',
		e.first_name,
		e.last_name
	) AS full_name,
	a.id,
	e.address_id
FROM 
	employees AS e
JOIN
	addresses AS a
		ON
	e.address_id = a.id