<?php

use Illuminate\Database\Seeder;

class SpecialitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('specialties')->insert([
            'label' => 'Spécialiste en lentilles de contact multifocales',
        ]);

        DB::table('specialties')->insert([
            'label' => 'Spécialiste en lentilles de contact souples',
        ]);

        DB::table('specialties')->insert([
            'label' => 'Spécialiste en lentilles de contact rigides',
        ]);

        DB::table('specialties')->insert([
            'label' => 'Spécialiste en sécheresse oculaire',
        ]);
    }
}
