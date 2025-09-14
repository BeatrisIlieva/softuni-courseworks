money = [int(x) for x in input().split(', ')]
beggars_count = int(input())

amounts = []

current_beggar_index = 0

for _ in range(beggars_count):
    current_sum = 0
    
    for i in range(current_beggar_index, len(money), beggars_count):
        current_sum += money[i]
    
    amounts.append(current_sum)
    current_beggar_index += 1
    
print(amounts)
    
# 1, 2, 3, 4, 5
# 2