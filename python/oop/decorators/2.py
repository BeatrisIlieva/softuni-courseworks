def return_even_numbers(func):
    def wrapper(numbers):
        return [x for x in func(numbers) if x % 2 == 0]

    return wrapper


@return_even_numbers
def filter_even_numbers(numbers):
    return numbers


print(filter_even_numbers([1, 2, 3, 4, 5, 6, 7, 8]))