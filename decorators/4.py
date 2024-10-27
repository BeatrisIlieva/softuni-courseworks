def logged(function):
    def wrapper(*args):
        return f"you called {function.__name__}({', '.join([str(x) for x in args])}) \nit returned {function(*args)}"

    return wrapper


@logged
def func(*args):
    return 3 + len(args)


print(func(4, 4, 4))
