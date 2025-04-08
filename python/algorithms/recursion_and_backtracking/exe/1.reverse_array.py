def reverse_array(elements, left_index):
    if left_index == len(elements) // 2:
        print(" ".join(elements))
        return

    right_index = len(elements) - 1 - left_index
    elements[left_index], elements[right_index] = elements[right_index], elements[left_index]

    reverse_array(elements, left_index + 1)

elements = input().split()

reverse_array(elements, 0)
