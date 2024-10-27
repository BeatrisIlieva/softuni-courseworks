def even_parameters(func_ref):
    def wrapper(*args):
        for x in args:
            if not isinstance(x, int) or x % 2 != 0:
                return "Please use only even numbers!"

        return func_ref(*args)

    return wrapper


@even_parameters
def add(a, b):
    return a + b


print(add(2, 4))
print(add("Peter", 1))
