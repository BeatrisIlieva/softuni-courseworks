from django.db import models
from django.utils.translation import gettext_lazy as _

from e_commerce_website.jewelry.utils import calculate_max_choices_length


class CustomerGender(models.Model):
    
    class ClassificationChoices(models.TextChoices):
        
        FEMALE = "F", _("Lady's")
        MALE = "M", _("Gentlemen's")
        
    max_choice_length = calculate_max_choices_length(ClassificationChoices)
        
    classification = models.CharField(
        max_length=max_choice_length,
        choices=ClassificationChoices.choices,
    )
    

class Category(models.Model):
    
    class TitleChoices(models.TextChoices):
        
        Earrings = "E", _("Earrings")
        Necklaces = "N", _("Necklaces")
        Bracelets = "B", _("Bracelets")
        Rings = "R", _("Rings")
        
    max_choice_length = calculate_max_choices_length(TitleChoices)
    
    title = models.CharField(
        max_length=max_choice_length,
        choices=TitleChoices.choices,
    )
    
    
class Style(models.Model):
    
    class TitleChoices(models.TextChoices):
        
        DROP = "DR", _("Drop")
        HOOP = "HO", _("Hoop")
        STUD = "ST", _("Stud")
        CHAIN = "CH", _("Chain")
        PEARL = "PE", _("Pearl")
        PENDANT = "PN", _("Pendant")
        YNECKLACE = "YN", _("Y Necklace")
        BEAD = "BE", _("Bead")
        BANGLE = "BA", _("Bangle")
        CUFF = "CU", _("Cuff")
        BAND = "BN", _('Band')
        PETITE = "PT", _('Petite')
        PINKY = "PI", _('Pinky')
        STATEMENT = "SA", _('Statement')
        ENGAGEMENT = "EN", _('Engagement')
        
    max_choice_length = calculate_max_choices_length(TitleChoices)
        
    title = models.CharField(
        max_length=max_choice_length,
        choices=TitleChoices.choices,
    )
    
    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name='style_category',
    )
    

class Metal(models.Model):
    
    class TitleChoices(models.TextChoices):
        
        YELLOW_GOLD = "YG", _("Yellow Gold")
        ROSE_GOLD = "RG", _("Rose Gold")
        WHITE_GOLD = "WG", _("White Gold")
        STERLING_SILVER = "SS", _("Sterling Silver")
    
    max_choice_length = calculate_max_choices_length(TitleChoices)
    
    title = models.CharField(
        max_length=max_choice_length,
        choices=TitleChoices.choices,
    )
    
class GoldCaratWeight(models.Model):  
    
    class WeightChoices(models.TextChoices):
        
        V_9 = "9", _("9K")
        V_10 = "10", _("10K")
        V_14 = "14", _("14K")
        V_18 = "18", _("18K")
        V_22 = "22", _("22K")
        
    max_choice_length = calculate_max_choices_length(WeightChoices)
        
    weight = models.CharField(
        max_length=max_choice_length,
        choices=WeightChoices.choices,
    )
    
    
class StoneType(models.Model):
    
    class TitleChoices(models.TextChoices):
        
        AG = "AG", _("Agate")
        AM = "AM", _("Amethyst")
        BO = "BO", _("Black Onyx")
        CH = "CH", _("Chariote")
        CR = "CR", _("Chrysocolla")
        CI = "CI", _("Citrine")
        CY = "CY", _("Crystal")
        DI = "DI", _("Diamond")
        EM = "EM", _("Emerald")
        GA = "GA", _("Garnet")
        IN = "IN", _("Initial")
        LL = "LL", _("Lapis Lazuli")
        MA = "MA", _("Malachite")
        MO = "MO", _("Morganite")
        PE = "PE", _("Pearl")
        PR = "PR", _("Peridot")
        PI = "PI", _("Pinolith")
        PS = "PS", _("Prasiolite")
        QU = "QU", _("Quartz")
        RB = "RB", _("Rubellite")
        RU = "RU", _("Ruby")
        SA = "SA", _("Sapphire")
        TA = "TA", _("Tanzanite")
        TI = "TI", _("Tiger's")
        TO = "TO", _("Topaz")
        TU = "TU", _("Tourmaline")
        TS = "TS", _("Tsavorite")
        TR = "TR", _("Turquoise")
    
    max_choice_length = calculate_max_choices_length(TitleChoices)
    
    title = models.CharField(
        max_length=max_choice_length,
        choices=TitleChoices.choices,
    )
    
    
class StoneColor(models.Model):
    
    class TitleChoices(models.TextChoices):
        
        WH = "WH", _('White')
        BL = "BL", _('Black')
        BR = "BR", _('Brown')
        BU = "BU", _('Blue')
        GR = "GR", _('Green')
        PI = "PI", _('Pink')
        YE = "YE", _('Yellow')
        PU = "PU", _('Purple')
        RE = "RE", _('Red')
        GO = "GO", _('Gold')
    
    max_choice_length = calculate_max_choices_length(TitleChoices)
    
    title = models.CharField(
        max_length=max_choice_length,
        choices=TitleChoices.choices,
    )
    
class Size(models.Model):
    
    class MeasurementChoices(models.TextChoices):
        
        V_4_70 = "4.70", _('4.70')
        V_4_80 = "4.80", _('4.80')
        V_4_90 = "4.90", _('4.90')
        V_5_05 = "5.05", _('5.05')
        V_5_18 = "5.18", _('5.18')
        V_5_30 = "5.30", _('5.30')
        V_5_43 = "5.43", _('5.43')
        V_5_56 = "5.56", _('5.56')
        V_5_68 = "5.68", _('5.68')
        V_5_81 = "5.81", _('5.81')
        V_5_94 = "5.94", _('5.94')
        V_6_07 = "6.07", _('6.07')
        V_6_19 = "6.19", _('6.19')
        V_15_20 = "15.20", _('15.20')
        V_16_50 = "16.50", _('16.50')
        V_17_80 = "17.80", _('17.80')
        V_19_10 = "19.10", _('19.10')
        V_20_30 = "20.30", _('20.30')
        V_21_60 = "21.60", _('21.60')
        V_40_64 = "40.64", _('40.64')
        V_43_18 = "43.18", _('43.18')
        V_45_72 = "45.72", _('45.72')
        V_50_80 = "50.80", _('50.80')
        V_55_88 = "55.88", _('55.88')
        V_60_96 = "60.96", _('60.96')
        V_81_28 = "81.28", _('81.28')
        V_91_44 = "91.44", _('91.44')
        V_182_88 = "182.88", _('182.88')
        
    max_choice_length = calculate_max_choices_length(MeasurementChoices)
    
    measurement = models.CharField(
        max_length=max_choice_length,
        choices=MeasurementChoices.choices,
    )
    
    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name='size_category',
    )


class Title(models.Model):
    content = models.CharField()
    
    
class Jewelry(models.Model):
    
    customer_gender = models.ForeignKey(
        to=CustomerGender,
        on_delete=models.CASCADE,
        related_name='customer_gender',
    )
    
    category = models.ForeignKey(
        to=Category,
        on_delete=models.CASCADE,
        related_name='jewelry_category',
    )
    
    style = models.ForeignKey(
        to=Style,
        on_delete=models.CASCADE,
        related_name='style',
    )
    
    title = models.ForeignKey(
        to=Title,
        on_delete=models.CASCADE,
        related_name='title',
    )
    

class JewelryDetails(models.Model):

    jewelry = models.ForeignKey(
        to=Jewelry,
        on_delete=models.CASCADE,
        related_name='jewelry',
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
    
    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    
    discounted_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        editable=False,
    )
    
    updated_at = models.DateTimeField(
        auto_now=True,
        editable=False,
    )
    
    first_image_url = models.URLField()
    
    second_image_url = models.URLField()


class JewelryMetal(models.Model):
    
    class Meta:
        unique_together = ('jewelry', 'metal', 'gold_carat')
        
    jewelry = models.ForeignKey(
        to=JewelryDetails,
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
        to=JewelryDetails,
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
        to=JewelryDetails,
        on_delete=models.CASCADE,
        related_name='jewelry_sizes',
    )
    
    size = models.ForeignKey(
        to=Size,
        on_delete=models.CASCADE,
        related_name='sizes',
    ) 
    
