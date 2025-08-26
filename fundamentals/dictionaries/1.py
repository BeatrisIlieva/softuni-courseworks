countries = input().split(', ')
capitals = input().split(', ')

countries_by_capitals = {
    country: capitals[index] for index, country in enumerate(countries)
}

for key, value in countries_by_capitals.items():
    print(f'{key} -> {value}')

# Bulgaria, Romania, Germany, England
# Sofia, Bucharest, Berlin, London
