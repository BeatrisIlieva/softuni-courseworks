from django.db import models
from django.utils.translation import gettext_lazy as _

from e_commerce_website.core.mixins import ChoicesMaxLengthMixin


class Category(models.Model):
    class TitleChoices(ChoicesMaxLengthMixin, models.TextChoices):
        BRACELET = "B", _("Bracelets")
        EARRING = "E", _("Earrings")
        NECKLACE = "N", _("Necklaces")
        RING = "R", _("Rings")

    title = models.CharField(
        max_length=TitleChoices.max_length(),
        choices=TitleChoices.choices,
    )

    def __str__(self):
        return self.get_title_display()


class Metal(models.Model):
    class TitleChoices(ChoicesMaxLengthMixin, models.TextChoices):
        YELLOW_GOLD = "YG", _("Yellow Gold")
        ROSE_GOLD = "RG", _("Rose Gold")
        WHITE_GOLD = "WG", _("White Gold")
        PLATINUM = "PT", _("Platinum")

    title = models.CharField(
        max_length=TitleChoices.max_length(),
        choices=TitleChoices.choices,
    )

    def __str__(self):
        return self.get_title_display()


class GoldCaratWeight(models.Model):
    class WeightChoices(ChoicesMaxLengthMixin, models.TextChoices):
        V_9 = "9", _("9K")
        V_10 = "10", _("10K")
        V_14 = "14", _("14K")
        V_18 = "18", _("18K")
        V_22 = "22", _("22K")

    weight = models.CharField(
        max_length=WeightChoices.max_length(),
        choices=WeightChoices.choices,
    )


class StoneType(models.Model):
    class TitleChoices(ChoicesMaxLengthMixin, models.TextChoices):
        BLACK_SPINEL = "BS", _("Spinel")  # 0
        DIAMOND = "DI", _("Diamond")  # 1
        EMERALD = "EM", _("Emerald")  # 2
        RUBY = "RU", _("Ruby")  # 3
        SAPPHIRE = "SA", _("Sapphire")  # 4

    title = models.CharField(
        max_length=TitleChoices.max_length(),
        choices=TitleChoices.choices,
    )


class StoneColor(models.Model):
    class TitleChoices(ChoicesMaxLengthMixin, models.TextChoices):
        AQUAMARINE = "AQ", _("Aquamarine")  # 0
        BLACK = "BL", _('Black')  # 1
        BLUE = "BU", _('Blue')  # 2
        GREEN = "GR", _('Green')  # 3
        PINK = "PI", _('Pink')  # 4
        RED = "RE", _('Red')  # 5
        WHITE = "WH", _('White')  # 6
        YELLOW = "YE", _('Yellow')  # 7

    title = models.CharField(
        max_length=TitleChoices.max_length(),
        choices=TitleChoices.choices,
    )


class Size(models.Model):
    class MeasurementChoices(ChoicesMaxLengthMixin, models.TextChoices):
        V_1 = "1.00", _('1.00 cm')
        V_2 = "2.00", _('2.00 cm')
        V_3 = "3.00", _('3.00 cm')
        V_4 = "4.00", _('4.00 cm')
        V_5 = "5.00", _('5.00 cm')
        V_6 = "6.00", _('6.00 cm')
        V_7 = "7.00", _('7.00 cm')
        V_8 = "8.00", _('8.00 cm')
        V_9 = "9.00", _('9.00 cm')
        V_4_70 = "4.70", _('4.70 cm')
        V_4_80 = "4.80", _('4.80 cm')
        V_4_90 = "4.90", _('4.90 cm')
        V_5_05 = "5.05", _('5.05 cm')
        V_5_18 = "5.18", _('5.18 cm')
        V_5_30 = "5.30", _('5.30 cm')
        V_5_43 = "5.43", _('5.43 cm')
        V_5_56 = "5.56", _('5.56 cm')
        V_5_68 = "5.68", _('5.68 cm')
        V_5_81 = "5.81", _('5.81 cm')
        V_5_94 = "5.94", _('5.94 cm')
        V_6_07 = "6.07", _('6.07 cm')
        V_6_19 = "6.19", _('6.19 cm')
        V_15_20 = "15.20", _('15.20 cm')
        V_16_50 = "16.50", _('16.50 cm')
        V_17_80 = "17.80", _('17.80 cm')
        V_19_10 = "19.10", _('19.10 cm')
        V_20_30 = "20.30", _('20.30 cm')
        V_21_60 = "21.60", _('21.60 cm')
        V_40_64 = "40.64", _('40.64 cm')
        V_43_18 = "43.18", _('43.18 cm')
        V_45_72 = "45.72", _('45.72 cm')
        V_50_80 = "50.80", _('50.80 cm')
        V_55_88 = "55.88", _('55.88 cm')
        V_60_96 = "60.96", _('60.96 cm')
        V_81_28 = "81.28", _('81.28 cm')
        V_91_44 = "91.44", _('91.44 cm')
        V_182_88 = "182.88", _('182.88 cm')

    measurement = models.CharField(
        max_length=MeasurementChoices.max_length(),
        choices=MeasurementChoices.choices,
    )

    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name='size_category',
    )


class Jewelry(models.Model):
    class Meta:
        verbose_name_plural = 'Jewelries'

    title = models.CharField(
        max_length=40,
    )

    first_image_url = models.URLField()

    second_image_url = models.URLField()

    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name='jewelry_category',
    )

    metals = models.ManyToManyField(
        to=Metal,
        through='JewelryMetal',
    )

    gold_carats = models.ManyToManyField(
        to=GoldCaratWeight,
        through='JewelryMetal',
    )

    stone_types = models.ManyToManyField(
        to=StoneType,
        through='JewelryStone',
    )

    stone_colors = models.ManyToManyField(
        to=StoneColor,
        through='JewelryStone',
    )

    size = models.ManyToManyField(
        to=Size,
        through='JewelrySize',
    )


    def __str__(self):
        return f'Jewelry ID: {self.pk}'




class JewelryMetal(models.Model):
    class Meta:
        unique_together = ('jewelry', 'metal', 'gold_carat')

    jewelry = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE,
        related_name='jewelry_metals',
    )

    metal = models.ForeignKey(
        to=Metal,
        on_delete=models.CASCADE,
        related_name='metals',
    )

    gold_carat = models.ForeignKey(
        to=GoldCaratWeight,
        on_delete=models.CASCADE,
        related_name='jewelry_gold_carats',
        null=True,
        blank=True,
    )


class JewelryStone(models.Model):
    class Meta:
        unique_together = ('jewelry', 'stone_type', 'stone_color')

    jewelry = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE,
        related_name='jewelry_stones',
    )

    stone_type = models.ForeignKey(
        to=StoneType,
        on_delete=models.CASCADE,
        related_name='stone_types',
    )

    stone_color = models.ForeignKey(
        to=StoneColor,
        on_delete=models.CASCADE,
        related_name='stone_colors',
    )

    stone_carat = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )


class JewelrySize(models.Model):
    class Meta:
        unique_together = ('jewelry', 'size')

    jewelry = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE,
        related_name='jewelry_sizes',
    )

    size = models.ForeignKey(
        to=Size,
        on_delete=models.CASCADE,
        related_name='sizes',
    )



