from .factories import (
    PinkProductSetFactory,
    BlueProductSetFactory,
    WhiteProductSetFactory,
)

pink_factory = PinkProductSetFactory()
blue_factory = BlueProductSetFactory()
white_factory = WhiteProductSetFactory()

print(pink_factory.generate_product_set())
print(blue_factory.generate_product_set())
print(white_factory.generate_product_set())


def generate_product_set(color_title):
    pass
