SELECT 
	a.name,
	a.country,
	CAST(b.booked_at AS DATE)
FROM 
	apartments AS a
LEFT JOIN
	bookings AS b
ON 
	a.booking_id = b.booking_id
LIMIT 10;