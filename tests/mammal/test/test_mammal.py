from unittest import TestCase, main

from tests.mammal.project.mammal import Mammal


class TestMammal(TestCase):
    def setUp(self):
        self.mammal = Mammal(
            "some name",
            "some type",
            "some sound"
        )

    def test_initialize_correctly(self):
        self.assertEqual("some name", self.mammal.name)
        self.assertEqual("some type", self.mammal.type)
        self.assertEqual("some sound", self.mammal.sound)
        self.assertEqual("animals", self.mammal._Mammal__kingdom)

    def test_makes_correct_sound(self):
        result = self.mammal.make_sound()

        self.assertEqual("some name makes some sound", result)

if __name__ == "__main__":
    main()
