my_dict = {"Oracle": {1: 1_500_00, 2: 800_000},
           "Honda": {8: 20_000, 10: 10_000}}

for spons in my_dict.values():
    for key, value in spons.items():
        print(key, value)
