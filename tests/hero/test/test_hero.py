from unittest import TestCase, main

from tests.hero.project.hero import Hero


class TestHero(TestCase):
    def setUp(self):
        self.hero = Hero("Hero", 1, 100, 100)
        self.enemy = Hero("Enemy", 1, 50, 50)

    def test_correct_initialization(self):
        self.assertEqual("Hero", self.hero.username)
        self.assertEqual(100, self.hero.health)
        self.assertEqual(100, self.hero.damage)


    def test_fight_with_itself_raises_exception(self):
        with self.assertRaises(Exception) as ex:
            self.hero.battle(self.hero)

        self.assertEqual("You cannot fight yourself", str(ex.exception))

    def test_fight_with_zero_hero_energy_raises_value_error(self):
        self.hero.health = 0

        with self.assertRaises(ValueError) as ve:
            self.hero.battle(self.enemy)

        self.assertEqual("Your health is lower than or equal to 0. You need to rest", str(ve.exception))

    def test_battle_enemy_remove_health_after_draw(self):
        self.hero.health = 50

        result = self.hero.battle(self.enemy)

        self.assertEqual(0, self.hero.health)
        self.assertEqual(-50, self.enemy.health)
        self.assertEqual("Draw", result)

if __name__ == "__main__":
    main()