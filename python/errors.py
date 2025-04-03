import traceback

'''
Syntax error -> errors detected during parsing
'''

# while True:
#     print('Hello world!'


'''
Exceptions -> errors detected during execution are called exceptions
'''

# TypeError
try:
    a = 'Hello'
    b = 1
    print(a + b)
except TypeError as error:
    print(error)  # can only concatenate str (not "int") to str


# ZeroDivisionError
try:
    a = 1
    b = 0
    print(a / b)
except ZeroDivisionError as error:
    print(error)  # division by zero

# NameError
try:
    a = 1
    if a == 2:
        result = a * 2
    print(result)
except NameError as error:
    print(error)  # name 'result' is not defined

# IndexError
try:
    arr = [1, 2, 3]
    print(arr[3])
except IndexError as error:
    print(error)  # list index out of range


# KeyError
try:
    obj = {'a': 1, 'b': 2}
    print(obj['c'])
except KeyError:
    print(traceback.format_exc())  # KeyError: 'c'

# ValueError
try:
    print(int('a'))
except ValueError as error:
    print(error)  # invalid literal for int() with base 10: 'a'

# Try, Except, Finally
## Finally will execute even if the exception was not handled
try:
    a = 1
    b = 'b'
    b = int(b)
    print(a + b)
    print(result)
except (ValueError, TypeError) as error:
    print(error)  # invalid literal for int() with base 10: 'b'
finally:
    print('Enter a valid number')  # Enter a valid number
