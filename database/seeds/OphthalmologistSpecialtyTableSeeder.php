<?php

use Illuminate\Database\Seeder;

class OphthalmologistSpecialtyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ophthalmologist_specialty')->insert([
            'ophthalmologist_id' => 1,
            'specialty_id' => 1,
        ]);
        DB::table('ophthalmologist_specialty')->insert([
            'ophthalmologist_id' => 1,
            'specialty_id' => 3,
        ]);

    }
}
