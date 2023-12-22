import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()

from e_commerce_website.jewelry.models import (
    Jewelry,
    JewelryMetal,
    JewelryStone, JewelrySize,
)

from get_all_objects import (
    categories,
    jewelries,
    metals,
    gold_carats,
    stone_types,
    stone_colors,
    sizes,
)


def bulk_create_jewelry(*args):
    Jewelry.objects.bulk_create(*args)


bulk_create_jewelry(
    [
        Jewelry(
            title='Forget-Me-Not',
            quantity=10,
            price=48000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179446/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-1_kb2xap.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179447/earrings/9/forget_me_not_drop_earrings_diamond_and_pink_sapphire_eapspdrflrfmn_ee-2_vgnjja.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Sunflower',
            quantity=10,
            price=24000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703183465/earrings/13/sunflower_earrings_sapphire_and_diamond_easppopetsf_e-1_npfqnr.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703183463/earrings/13/sunflower_earrings_sapphire_and_diamond_easppopetsf_e-2_hwz9zt.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Classics',
            quantity=10,
            price=97000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703178293/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-1_cycchy.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703178292/earrings/6/drop_earrings_diamond_and_ruby_earmrpsfpsd_431958_e-2_gs6ai0.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Berry',
            quantity=10,
            price=37000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703180217/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-1_xvkff7.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703180215/earrings/11/berry_cluster_earrings_emerald_and_diamond_eaepclrfber_568120_e-2_bcmypf.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Belle',
            quantity=10,
            price=42000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703181891/earrings/14/belle_earrings_diamond_esdprd005bel_e-1_kdcplp.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703181893/earrings/14/belle_earrings_diamond_esdprd005bel_e-2_gq685k.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Multi Color Stone',
            quantity=10,
            price=38000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703180657/earrings/12/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-1_vp47er.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703180659/earrings/12/diamond_loop_earrings_full_motif_multi_color_stone_diamond_eamprpmel4c_e-2_kvtj3v.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Heart',
            quantity=10,
            price=14000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703178867/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-1_lumsno.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703178866/earrings/7/classics_heart-shaped_diamond_earstuds_esdphs010si_e-2_w2aaff.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Daytime',
            quantity=10,
            price=27000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179269/earrings/8/classics_earrings_diamond_eadpdrmedw_e-1_vptn8c.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179268/earrings/8/classics_earrings_diamond_eadpdrmedw_e-2_h1edi3.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Chandelier',
            quantity=10,
            price=120000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703167483/earrings/1/diamond_chandelier_earrings_eadpchsmct.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Pink Flower',
            quantity=10,
            price=21000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179871/earrings/10/forget_me_earrings_diamond_and_pink_sapphire_eapsp1mflrfmn_ee-1_zhnvgu.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703179870/earrings/10/forget_me_earrings_diamond_and_pink_sapphire_eapsp1mflrfmn_ee-2_vnawpt.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Pirouette',
            quantity=10,
            price=24000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703176025/earrings/4/pirouette_earrings__diamond__eadprfprspir_e-1_zfcw3e.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703176029/earrings/4/pirouette_earrings__diamond__eadprfprspir_e-2_qafrue.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Garland Heart',
            quantity=10,
            price=32000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703175666/earrings/3/garland_earrings_diamond_eadphssmoc_581447_e-1_ysmxop.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703175667/earrings/3/garland_earrings_diamond_eadphssmoc_581447_e-2_z74pjd.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Queen of Diamonds',
            quantity=10,
            price=163000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703168853/earrings/2/diamond_chandelier_earrings_eadpclafrchaa.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703168594/earrings/2/diamond_chandelier_earrings_eadpclafrcha.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Lotus Cluster',
            quantity=10,
            price=56000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703177862/earrings/5/lotus_cluster_earrings_diamond_eadpde010ltc_e-1_dstqna.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703177862/earrings/5/lotus_cluster_earrings_diamond_eadpde010ltc_e-2_cd7sd2.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Cushion-Cut',
            quantity=10,
            price=44000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703182222/earrings/15/classics_cushion-cut_diamond_earstuds_on_wires_esdpcu010micw_e-1_nalggi.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703182224/earrings/15/classics_cushion-cut_diamond_earstuds_on_wires_esdpcu010micw_e-2_xfamwz.webp',
            category=categories[1],
        ),

        Jewelry(
            title='Unforgettable',
            quantity=10,
            price=33000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703262109/bracelets/8/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_1_bc0a5y.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703262106/bracelets/8/forget_me_not_bracelet_diamond_and_sapphire_brsprfflrfmn_e_2_yli2iv.webp',
            category=categories[0],
        ),

        Jewelry(
            title='Lily',
            quantity=10,
            price=36000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703258159/bracelets/1/lily_cluster_bracelet_diamond_rose_gold_brdrsm1mlc_e-1_csp0lg.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703258156/bracelets/1/lily_cluster_bracelet_diamond_rose_gold_brdrsm1mlc_e-2_zihj3x.webp',
            category=categories[0],
        ),

        Jewelry(
            title='Forget-Me-Not',
            quantity=10,
            price=55000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703259627/bracelets/3/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_1_h0xaug.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703259630/bracelets/3/forget_me_not_bracelet_diamond_and_pink_sapphire_brpsprfflrfmn_e_2_qlogdk.webp',
            category=categories[0],
        ),

        Jewelry(
            title='Oval',
            quantity=10,
            price=78000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703260442/bracelets/4/oval_diamond_bracelet_brdpsfovov_e-1_jon3ta.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703260439/bracelets/4/oval_diamond_bracelet_brdpsfovov_e-2_lowjbd.webp',
            category=categories[0],
        ),

        Jewelry(
            title='Dream',
            quantity=10,
            price=49000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703261691/bracelets/7/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-1_mx30fj.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703261688/bracelets/7/forget-me-not_bracelet_ruby_and_diamond_brrprfflrfmn_e-2_cqsw89.webp',
            category=categories[0],
        ),
        Jewelry(
            title='Gates',
            quantity=10,
            price=103000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703265142/bracelets/9/gates_bracelet_diamond_yellow_gold_brdyrd1mwg_e-1_yxkx8q.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703265151/bracelets/9/winston_gates_bracelet_diamond_yellow_gold_brdyrd1mwg_e-2_lo9uge.webp',
            category=categories[0],
        ),

        Jewelry(
            title='Flower',
            quantity=10,
            price=94000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703260723/bracelets/5/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-1_xioiw0.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703260720/bracelets/5/diamond_loop_full_motif_diamond_bracelet_brdprp1ml4c_e-2_q6cxzy.webp',
            category=categories[0],
        ),

        Jewelry(
            title='Bezel-Set',
            quantity=10,
            price=24000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703261003/bracelets/6/classics_bezel-set_diamond_bracelet_brdprfsfbz_e-1_bj23kv.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703261006/bracelets/6/classics_bezel-set_diamond_bracelet_brdprfsfbz_e-2_e9age8.webp',
            category=categories[0],
        ),

        Jewelry(
            title='Tennis',
            quantity=10,
            price=42000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703258603/bracelets/2/classics_round_brilliant_diamond_tennis_bracelet_brdpsrp40te_e-1_w4fviy.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703258601/bracelets/2/classics_round_brilliant_diamond_tennis_bracelet_brdpsrp40te_e-2_jth1ky.webp',
            category=categories[0],
        ),

        Jewelry(
            title='Sunflower',
            quantity=10,
            price=39000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703265867/necklaces/1/sunflower_petite_sapphire_and_diamond_pendant_pespnapetsf_e-1h_cjtef5.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703265840/necklaces/1/sunflower_petite_sapphire_and_diamond_pendant_pespnapetsf_e-2_zv74yi.webp',
            category=categories[2],
        ),

        Jewelry(
            title='Forget-Me-Not',
            quantity=10,
            price=52000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703269036/necklaces/2/forget_me_not_pendant_diamond_and_pink_sapphire_pepsprfflrfmn_e_1_i09w6i.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703269032/necklaces/2/forget_me_not_pendant_diamond_and_pink_sapphire_pepsprfflrfmn_e_2_b2lu73.webp',
            category=categories[2],
        ),

        Jewelry(
            title='Forget-Me',
            quantity=10,
            price=97000.00,
            first_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703270087/necklaces/3/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_2_fqgnn6.webp',
            second_image_url='https://res.cloudinary.com/deztgvefu/image/upload/v1703270083/necklaces/3/forget_me_not_lariat_necklace_diamond_and_pink_sapphire_nkpspltflrfmn_e_1_zegnl4.webp',
            category=categories[2],
        ),

    ]
)


def bulk_create_jewelry_by_metal(*args):
    JewelryMetal.objects.bulk_create(*args)


bulk_create_jewelry_by_metal(
    [
        JewelryMetal(
            jewelry=jewelries[0],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[1],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[2],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[2],
            metal=metals[0],
            gold_carat=gold_carats[3]
        ),

        JewelryMetal(
            jewelry=jewelries[3],
            metal=metals[2],
        ),

        JewelryMetal(
            jewelry=jewelries[4],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[5],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[6],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[7],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[8],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[9],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[10],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[11],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[12],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[13],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[14],
            metal=metals[2],
        ),

        JewelryMetal(
            jewelry=jewelries[15],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[16],
            metal=metals[1],
            gold_carat=gold_carats[3]
        ),

        JewelryMetal(
            jewelry=jewelries[17],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[18],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[19],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[20],
            metal=metals[0],
            gold_carat=gold_carats[4]
        ),

        JewelryMetal(
            jewelry=jewelries[21],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[22],
            metal=metals[2],
        ),

        JewelryMetal(
            jewelry=jewelries[23],
            metal=metals[2],
        ),

        JewelryMetal(
            jewelry=jewelries[24],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[25],
            metal=metals[3],
        ),

        JewelryMetal(
            jewelry=jewelries[26],
            metal=metals[3],
        ),

    ]
)


def bulk_create_jewelry_by_stone(*args):
    JewelryStone.objects.bulk_create(*args)


bulk_create_jewelry_by_stone(
    [
        JewelryStone(
            jewelry=jewelries[0],
            stone_type=stone_types[21],
            stone_color=stone_colors[5],
            stone_carat=3.20,
        ),

        JewelryStone(
            jewelry=jewelries[0],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=1.98,
        ),

        JewelryStone(
            jewelry=jewelries[1],
            stone_type=stone_types[20],
            stone_color=stone_colors[3],
            stone_carat=2.66,
        ),

        JewelryStone(
            jewelry=jewelries[1],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=0.90,
        ),

        JewelryStone(
            jewelry=jewelries[2],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=2.91,
        ),

        JewelryStone(
            jewelry=jewelries[2],
            stone_type=stone_types[20],
            stone_color=stone_colors[8],
            stone_carat=2.03,
        ),

        JewelryStone(
            jewelry=jewelries[3],
            stone_type=stone_types[8],
            stone_color=stone_colors[4],
            stone_carat=2.01,
        ),

        JewelryStone(
            jewelry=jewelries[3],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=3.35,
        ),

        JewelryStone(
            jewelry=jewelries[4],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=0.90,
        ),

        JewelryStone(
            jewelry=jewelries[5],
            stone_type=stone_types[21],
            stone_color=stone_colors[6],
            stone_carat=1.35,
        ),

        JewelryStone(
            jewelry=jewelries[5],
            stone_type=stone_types[2],
            stone_color=stone_colors[1],
        ),

        JewelryStone(
            jewelry=jewelries[5],
            stone_type=stone_types[21],
            stone_color=stone_colors[5],
            stone_carat=1.35,
        ),

        JewelryStone(
            jewelry=jewelries[5],
            stone_type=stone_types[21],
            stone_color=stone_colors[3],
            stone_carat=1.35,
        ),

        JewelryStone(
            jewelry=jewelries[5],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=2.66,
        ),

        JewelryStone(
            jewelry=jewelries[6],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=1.00,
        ),

        JewelryStone(
            jewelry=jewelries[7],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=6.41,
        ),

        JewelryStone(
            jewelry=jewelries[8],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=16.81,
        ),

        JewelryStone(
            jewelry=jewelries[9],
            stone_type=stone_types[21],
            stone_color=stone_colors[5],
            stone_carat=2.20,
        ),

        JewelryStone(
            jewelry=jewelries[9],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=0.07,
        ),

        JewelryStone(
            jewelry=jewelries[10],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=4.52,
        ),

        JewelryStone(
            jewelry=jewelries[11],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=2.05,
        ),

        JewelryStone(
            jewelry=jewelries[12],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=9.21,
        ),

        JewelryStone(
            jewelry=jewelries[13],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=4.30,
        ),

        JewelryStone(
            jewelry=jewelries[14],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=1.00,
        ),

        JewelryStone(
            jewelry=jewelries[15],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=4.37,
        ),

        JewelryStone(
            jewelry=jewelries[15],
            stone_type=stone_types[20],
            stone_color=stone_colors[3],
            stone_carat=4.43,
        ),

        JewelryStone(
            jewelry=jewelries[16],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=0.31,

        ),

        JewelryStone(
            jewelry=jewelries[17],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=4.24,
        ),

        JewelryStone(
            jewelry=jewelries[17],
            stone_type=stone_types[21],
            stone_color=stone_colors[5],
            stone_carat=4.36,
        ),

        JewelryStone(
            jewelry=jewelries[18],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=22.09,
        ),

        JewelryStone(
            jewelry=jewelries[19],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=4.37,
        ),

        JewelryStone(
            jewelry=jewelries[19],
            stone_type=stone_types[20],
            stone_color=stone_colors[8],
            stone_carat=4.43,
        ),

        JewelryStone(
            jewelry=jewelries[20],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=4.41,
        ),

        JewelryStone(
            jewelry=jewelries[21],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=0.29,
        ),

        JewelryStone(
            jewelry=jewelries[22],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=8.27,
        ),

        JewelryStone(
            jewelry=jewelries[23],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=14.62,
        ),

        JewelryStone(
            jewelry=jewelries[24],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=0.44,
        ),

        JewelryStone(
            jewelry=jewelries[24],
            stone_type=stone_types[21],
            stone_color=stone_colors[3],
            stone_carat=0.42,
        ),

        JewelryStone(
            jewelry=jewelries[25],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=0.04,
        ),

        JewelryStone(
            jewelry=jewelries[25],
            stone_type=stone_types[21],
            stone_color=stone_colors[5],
            stone_carat=0.04,
        ),

        JewelryStone(
            jewelry=jewelries[26],
            stone_type=stone_types[7],
            stone_color=stone_colors[0],
            stone_carat=8.60,
        ),

        JewelryStone(
            jewelry=jewelries[26],
            stone_type=stone_types[21],
            stone_color=stone_colors[5],
            stone_carat=8.61,
        ),
    ]

)


def bulk_create_jewelry_by_size(*args):
    JewelrySize.objects.bulk_create(*args)


bulk_create_jewelry_by_size(
    [
        JewelrySize(
            jewelry=jewelries[0],
            size=sizes[8],
        ),

        JewelrySize(
            jewelry=jewelries[1],
            size=sizes[1],
        ),

        JewelrySize(
            jewelry=jewelries[2],
            size=sizes[6],
        ),

        JewelrySize(
            jewelry=jewelries[3],
            size=sizes[2],
        ),

        JewelrySize(
            jewelry=jewelries[4],
            size=sizes[4],
        ),

        JewelrySize(
            jewelry=jewelries[5],
            size=sizes[2],
        ),

        JewelrySize(
            jewelry=jewelries[6],
            size=sizes[0],
        ),

        JewelrySize(
            jewelry=jewelries[7],
            size=sizes[2],
        ),

        JewelrySize(
            jewelry=jewelries[8],
            size=sizes[8],
        ),

        JewelrySize(
            jewelry=jewelries[9],
            size=sizes[2],
        ),

        JewelrySize(
            jewelry=jewelries[10],
            size=sizes[3],
        ),

        JewelrySize(
            jewelry=jewelries[11],
            size=sizes[4],
        ),

        JewelrySize(
            jewelry=jewelries[12],
            size=sizes[7],
        ),

        JewelrySize(
            jewelry=jewelries[13],
            size=sizes[3],
        ),

        JewelrySize(
            jewelry=jewelries[14],
            size=sizes[3],
        ),

        JewelrySize(
            jewelry=jewelries[15],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[15],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[15],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[15],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[16],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[16],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[16],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[16],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[17],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[17],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[17],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[17],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[18],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[18],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[18],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[18],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[19],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[19],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[19],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[19],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[20],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[20],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[20],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[20],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[21],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[21],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[21],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[21],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[22],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[22],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[22],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[22],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[23],
            size=sizes[22],
        ),

        JewelrySize(
            jewelry=jewelries[23],
            size=sizes[23],
        ),

        JewelrySize(
            jewelry=jewelries[23],
            size=sizes[24],
        ),

        JewelrySize(
            jewelry=jewelries[23],
            size=sizes[25],
        ),

        JewelrySize(
            jewelry=jewelries[24],
            size=sizes[28],
        ),

        JewelrySize(
            jewelry=jewelries[24],
            size=sizes[29],
        ),

        JewelrySize(
            jewelry=jewelries[24],
            size=sizes[30],
        ),

        JewelrySize(
            jewelry=jewelries[24],
            size=sizes[31],
        ),

        JewelrySize(
            jewelry=jewelries[25],
            size=sizes[28],
        ),

        JewelrySize(
            jewelry=jewelries[25],
            size=sizes[29],
        ),

        JewelrySize(
            jewelry=jewelries[25],
            size=sizes[30],
        ),

        JewelrySize(
            jewelry=jewelries[25],
            size=sizes[31],
        ),

        JewelrySize(
            jewelry=jewelries[26],
            size=sizes[28],
        ),

        JewelrySize(
            jewelry=jewelries[26],
            size=sizes[29],
        ),

        JewelrySize(
            jewelry=jewelries[26],
            size=sizes[30],
        ),

        JewelrySize(
            jewelry=jewelries[26],
            size=sizes[31],
        ),
    ]
)
