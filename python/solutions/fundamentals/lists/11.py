elements = [int(el) for el in input().split(' ')]

sum_of_removed_elements = 0

while elements:
    index = int(input())

    element = None

    if index < 0:
        element = elements.pop(0)
        elements.insert(0, elements[-1])
    elif index >= len(elements):
        element = elements.pop()
        elements.append(elements[0])
    else:
        element = elements.pop(index)

    sum_of_removed_elements += element

    elements = [x + element if x <= element else x - element for x in elements]

print(sum_of_removed_elements)

# 4 5 3
# 1
# 1
# 0
