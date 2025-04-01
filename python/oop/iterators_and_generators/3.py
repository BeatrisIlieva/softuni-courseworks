def squares(num):
    curr_num = 1

    while curr_num <= num:
        yield curr_num * curr_num
        curr_num += 1



print(list(squares(5)))