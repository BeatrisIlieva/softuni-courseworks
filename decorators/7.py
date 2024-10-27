def type_check(t):
    def decorator(func_ref):
        def wrapper(*args):
            for arg in args:
                if not isinstance(arg, t):
                    return "Bad type"

            return func_ref(*args)

        return wrapper

    return decorator


@type_check(str)
def first_letter(word):
    return word[0]
print(first_letter('Hello World'))
print(first_letter(['Not', 'A', 'String']))