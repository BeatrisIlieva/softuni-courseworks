from collections import deque

parenthesis_deque = deque(list(input()))
parenthesis_stack = []

parenthesis = {
    '(': ')',
    '[': ']',
    '{': '}'
}


balanced = True

for i in range(len(parenthesis_deque)):
    current_element = parenthesis_deque[i]

    if current_element not in parenthesis.keys() and current_element not in parenthesis.values():
        balanced = False
        break

    if current_element not in parenthesis.keys() and len(parenthesis_stack) == 0:
        balanced = False
        break

    if current_element in parenthesis.keys():
        parenthesis_stack.append(current_element)
        continue

    else:
        previous_element = parenthesis_stack.pop()
        correct_closing_parenthesis = parenthesis[previous_element]

        if current_element != correct_closing_parenthesis:
            balanced = False
            break

print('YES' if balanced else 'NO')