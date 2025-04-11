SELECT
	COUNT(CASE WHEN department_id = 1 THEN 1 END) AS "Engineering",
	COUNT(CASE WHEN department_id = 2 THEN 1 END) AS "Tool Design",
	COUNT(CASE WHEN department_id = 3 THEN 1 END) AS "Sales",
	COUNT(CASE WHEN department_id = 4 THEN 1 END) AS "Marketing"
FROM
	employees;