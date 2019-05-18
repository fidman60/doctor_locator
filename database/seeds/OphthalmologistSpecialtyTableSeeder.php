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

        DB::table('ophthalmologist_specialty')->insert([
            'ophthalmologist_id' => 2,
            'specialty_id' => 2,
        ]);

        DB::table('ophthalmologist_specialty')->insert([
            'ophthalmologist_id' => 3,
            'specialty_id' => 1,
        ]);

        DB::table('ophthalmologist_specialty')->insert([
            'ophthalmologist_id' => 4,
            'specialty_id' => 4,
        ]);

        DB::table('ophthalmologist_specialty')->insert([
            'ophthalmologist_id' => 5,
            'specialty_id' => 1,
        ]);

        DB::table('ophthalmologist_specialty')->insert([
            'ophthalmologist_id' => 5,
            'specialty_id' => 4,
        ]);

        DB::table('ophthalmologist_specialty')->insert([
            'ophthalmologist_id' => 6,
            'specialty_id' => 2,
        ]);

    }
}
