SELECT
	CONCAT_WS(' ', a.address, a.address_2) AS apartment_address,
	b.booked_for AS nights
FROM
	bookings AS b
JOIN
	apartments AS a
USING
	(apartment_id)
ORDER BY 
	a.apartment_id ASC