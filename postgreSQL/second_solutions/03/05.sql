SELECT
	(REGEXP_MATCHES("River Information", '([0-9]{1,4})'))[1]
FROM
	view_river_info;