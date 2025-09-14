number_of_electrons = int(input())

current_shell = 0
shells = []

while number_of_electrons > 0:
    current_shell += 1
    max_number_of_electrons = 2 * current_shell ** 2
    
    if number_of_electrons >= max_number_of_electrons:
        shells.append(max_number_of_electrons)
        
    else:
        shells.append(number_of_electrons)
        
    number_of_electrons -= max_number_of_electrons
        
        
print(shells)