<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TreatmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $treatments = [
            ['name' => 'APK', 'duration' => 1.0],
            ['name' => 'Grote beurt', 'duration' => 4.0],
            ['name' => 'Vakantiebeurt', 'duration' => 1.0],
            ['name' => 'Kleine beurt', 'duration' => 1.0],
            ['name' => 'Airco controle', 'duration' => 0.5],
            ['name' => 'Overige (Notitie)', 'duration' => 1.0],
            ['name' => 'Bandenwissel', 'duration' => 0.5],
            ['name' => 'Wintercheck', 'duration' => 1.0],
        ];

        DB::table('treatments')->insert($treatments);
    }
}
