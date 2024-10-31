SELECT
	LEFT(peak_name, 4) AS "Positive Left",
	LEFT(peak_name, -4) AS "Negative Left"

FROM
	peaks;