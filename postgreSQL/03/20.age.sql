SELECT
	AGE(starts_at, booked_at) AS difference

FROM
	bookings
WHERE
	starts_at - booked_at >= '10 MONTHS'