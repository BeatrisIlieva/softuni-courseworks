def outer():
    a = 5
    
    def inner():
        b = 7
        a = 6
        print(a)

    inner()
    
outer()