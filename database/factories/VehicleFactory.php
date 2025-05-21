<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'kenteken' => $this->generateDutchLicensePlate(),
            'model' => $this->faker->randomElement([
                'Volkswagen Golf',
                'Toyota Yaris',
                'Ford Focus',
                'Renault Clio',
                'BMW 3 Series',
                'Audi A4',
                'Peugeot 208',
                'Mercedes-Benz C-Class',
                'Hyundai i30',
                'Kia Ceed'
            ]),
            'type' => $this->faker->randomElement(['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Stationwagen']),
        ];
    }

    private function generateDutchLicensePlate(): string
    {
        // Common NL license plate format: XX-999-X
        return strtoupper(
            $this->faker->bothify('??-###-?')
        );
    }
}
