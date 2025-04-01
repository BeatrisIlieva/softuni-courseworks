CREATE VIEW
	view_company_char
AS
SELECT
	full_name,
	job_title
FROM 
	company_chart
WHERE 
	MANAGER_ID = 184