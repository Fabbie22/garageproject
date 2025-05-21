<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Vehicle;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = Vehicle::factory()->count(100)->create();

        $user = User::first();
        $user->vehicles()->attach($vehicles->pluck('id'));
    }
}
