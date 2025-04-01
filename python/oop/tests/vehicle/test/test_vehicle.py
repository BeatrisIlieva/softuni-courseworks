from unittest import TestCase, main

from tests.vehicle.project.vehicle import Vehicle


class TestVehicle(TestCase):
    def setUp(self):
        self.vehicle = Vehicle(5, 320)

    def test_class_atr(self):
        self.assertEqual(self.vehicle.DEFAULT_FUEL_CONSUMPTION, 1.25)

    def test_correct_initialization(self):
        self.assertEqual(5, self.vehicle.fuel)
        self.assertEquals(320, self.vehicle.horse_power)

    def test_drive_without_enough_fuel(self):
        self.vehicle.fuel = 0

        with self.assertRaises(Exception) as ex:
            self.vehicle.drive(100)

        self.assertEqual("Not enough fuel", str(ex.exception))

    def test_drive_with_enough_fuel_expect_fuel_decreasement(self):
        self.vehicle.drive(2)
        self.assertEqual(2.5, self.vehicle.fuel)

    def test_refuel_full_car_expect_exception(self):
        with self.assertRaises(Exception) as ex:
            self.vehicle.refuel(1)

        self.assertEqual("Too much fuel", str(ex.exception))

    def test_correct__str__method(self):
        result = str(self.vehicle)
        expected = f"The vehicle has {self.vehicle.horse_power} " \
                   f"horse power with {self.vehicle.fuel} fuel left " \
                   f"and {self.vehicle.fuel_consumption} fuel consumption"

        self.assertEqual(expected, result)


if __name__ == "__main__":
    main()
