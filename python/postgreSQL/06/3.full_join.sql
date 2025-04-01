SELECT
	b.booking_id,
	a.name AS apartment_owner,
	a.apartment_id,
	CONCAT_WS(
		' ',
		c.first_name,
		c.last_name
	) AS customer_name

FROM
	bookings AS b
FULL JOIN
	customers AS c
USING (customer_id)
FULL JOIN
	apartments AS a
USING (apartment_id)
ORDER BY
	booking_id ASC,
	apartment_owner ASC,
	customer_name ASC
