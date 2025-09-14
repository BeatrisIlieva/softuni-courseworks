n = int(input())

even_set = set()
odd_set = set()

for i in range(1, n + 1):
    name = input()
    sum_of_chars = sum([ord(x) for x in name])
    result = sum_of_chars // i

    if result % 2 == 0:
        even_set.add(result)
    else:
        odd_set.add(result)

even_set_sum = sum(even_set)
odd_set_sum = sum(odd_set)

if even_set_sum == odd_set_sum:
    union_of_two_sets = even_set.union(odd_set)
    print(', '.join([str(x) for x in union_of_two_sets]))
elif odd_set_sum > even_set_sum:
    difference_of_two_sets = odd_set.difference(even_set)
    print(', '.join([str(x) for x in difference_of_two_sets]))
else:
    symmetric_difference_of_two_sets = even_set.symmetric_difference(
        odd_set)
    print(', '.join([str(x) for x in symmetric_difference_of_two_sets]))

# 4
# Pesho
# Stefan
# Stamat
# Gosho


# 6
# Preslav
# Gosho
# Ivan
# Stamat
# Pesho
# Stefan