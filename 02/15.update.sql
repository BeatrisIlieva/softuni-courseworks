UPDATE projects
SET start_date = start_date + INTERVAL '5 months'
WHERE end_date IS NULL;

SELECT * FROM projects