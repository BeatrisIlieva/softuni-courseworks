CREATE OR REPLACE VIEW view_continents_countries_currencies_details
AS SELECT
	CONCAT_WS(
		': ',
		TRIM(con.continent_name),
		TRIM(con.continent_code)
		) AS continent_details,
	CONCAT_WS (
		' - ',
		cou.country_name,
		cou.capital,
		cou.area_in_sq_km,
		'km2'
		) AS country_information,
	CONCAT_WS(
		' ',
		cur.description,
		'(',
		cur.currency_code,
		')'
	) AS currencies

FROM 
	continents AS con,
	countries AS cou,
	currencies AS cur
ORDER BY
	country_information,
	currencies;

SELECT * FROM view_continents_countries_currencies_details;