<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Treatment;
use App\Models\Appointment;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        $customers = User::where('role', 'customer')->get();
        $mechanics = User::where('role', 'mechanic')->get();

        $treatments = Treatment::all();

        if ($customers->isEmpty() || $mechanics->isEmpty() || $treatments->isEmpty()) {
            $this->command->warn('⚠️ Not enough data to seed appointments. Make sure customers, mechanics, and treatments exist.');
            return;
        }

        for ($i = 0; $i < 250; $i++) {
            Appointment::factory()->create([
                'user_id' => $customers->random()->id,
                'mechanic_id' => $mechanics->random()->id,
                'treatment_id' => $treatments->random()->id,
            ]);
        }
    }
}
