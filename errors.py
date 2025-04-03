'''
Syntax error
'''

# while True:
#     print('Hello world!'


'''
Exceptions
'''

## TypeError

a = 'Hello'
b = 1

try:
    print(a + b)
except TypeError as error:
    print(error) # can only concatenate str (not "int") to str
