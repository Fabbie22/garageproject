<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Treatment;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    public function definition(): array
    {
        $customer = User::where('role', 'customer')->inRandomOrder()->first();
        $mechanic = User::where('role', 'mechanic')->inRandomOrder()->first();

        // Get vehicle that belongs to the customer
        $vehicle = $customer?->vehicles()->inRandomOrder()->first();

        return [
            'user_id' => $customer->id,
            'mechanic_id' => $mechanic->id,
            'treatment_id' => Treatment::inRandomOrder()->first()?->id,
            'vehicle_id' => $vehicle?->id ?? Vehicle::factory()->create()->id,
            'date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'customer_note' => $this->faker->sentence(),
            'mechanic_note' => null,
            'status' => 'Wachten op Voertuig', // Assuming this is the first enum
            'work_hours' => $this->faker->randomFloat(1, 0.5, 3.0),
            'approved' => false,
        ];
    }
}
