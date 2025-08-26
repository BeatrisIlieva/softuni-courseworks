set_1 = {(1, 2)}

set_1.add((1, 3))
set_2 = {(3, 4), (7, 8)}

set_1.update(set_2)
print(set_1)

[print(' '.join([str(x) for x in el] for el in set_1))]
