n = int(input())

my_stack = []

actions = {
    '1': lambda stack, x: stack.append(int(x)),
    '2': lambda stack: stack.pop() if stack else None,
    '3': lambda stack: print(max(stack)) if stack else None,
    '4': lambda stack: print(min(stack)) if stack else None,
}

for _ in range(n):
    data = input().split(' ')

    actions[data[0]](my_stack, *data[1:])

print(', '.join([str(x) for x in my_stack[::-1]]))

# 9
# 1 97
# 2
# 1 20
# 2
# 1 26
# 1 20
# 3
# 1 91
# 4
