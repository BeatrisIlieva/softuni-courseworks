from math import sqrt


def get_primes(*args):
    for num in args:
        if num > 1:
            for curr_num in range(2, int(sqrt(num)) + 1):
                if num % curr_num == 0:
                    break
            else:
                print(num)


get_primes(100000007, 2, 4, 3, 5, 6, 9, 1, 0)
