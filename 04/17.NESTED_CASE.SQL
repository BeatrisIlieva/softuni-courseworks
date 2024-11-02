SELECT
	first_name,
	last_name,
	job_title,
	salary,
	department_id,
	CASE
		WHEN salary >= 25000 THEN
			CASE
				WHEN job_title LIKE 'Senior%' THEN 'High-performing Senior'
				ELSE 'High-performing Employee'
			END
		ELSE 'Average_performing'
	END AS performence_rating
FROM employees;