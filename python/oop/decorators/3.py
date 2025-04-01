def multiply_hi_saying(n):
    def decorator(func):
        def wrapper():
            for _ in range(n):
                func()
        return wrapper
    return decorator




@multiply_hi_saying(4)
def say_hi():
    print("Hi")

say_hi()