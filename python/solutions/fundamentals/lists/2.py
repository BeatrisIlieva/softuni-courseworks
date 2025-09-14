version = [int(num) for num in input().split('.')]

version[-1] += 1

for i in range(len(version) - 1, 0, -1):
    if version[i] == 10:
        version[i] = 0
        
        version[i - 1] = version[i - 1] + 1

print('.'.join([str(num) for num in version]))
