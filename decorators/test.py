a = 8

def enclosing(*numbers):
    def local_scope():
        print(numbers)
        print(a)
    local_scope()

enclosing(1, 2, 3)