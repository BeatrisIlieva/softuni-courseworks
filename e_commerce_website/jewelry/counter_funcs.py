def define_jewelries_count_before_selected_style(jewelries, styles):
    jewelries_count_by_style = {}
    for style in styles:
        jewelries_count_by_style[style.get_title_display()] = jewelries.\
            prefetch_related('jewelry__style__category').\
            filter(jewelry__style=style.id).\
            count()

    return jewelries_count_by_style


def define_jewelries_count_before_selected_stone_color(jewelries, stone_colors):
    jewelries_count_by_stone_color = {}
    for color in stone_colors:
        jewelries_count_by_stone_color[color.get_title_display()] = jewelries.\
            prefetch_related('jewelry_stones__stone_color').\
            filter(jewelry_stones__stone_color_id__exact=color.id).\
            count()

    return jewelries_count_by_stone_color


def define_jewelries_count_before_selected_metal(jewelries, metals):
    jewelries_count_by_metal = {}
    for metal in metals:
        jewelries_count_by_metal[metal.get_title_display()] = jewelries.\
            prefetch_related('jewelry_metals__metal').\
            filter(jewelry_metals__metal_id=metal.id).\
            count()

    return jewelries_count_by_metal


def define_jewelries_count_before_selected_stone_type(jewelries, stone_types):
    jewelries_count_by_stone_type = {}
    for stone_type in stone_types:
        jewelries_count_by_stone_type[stone_type.get_title_display()] = jewelries. \
            prefetch_related('jewelry_stones__stone_type'). \
            filter(jewelry_stones__stone_type_id__exact=stone_type.id). \
            count()

    return jewelries_count_by_stone_type