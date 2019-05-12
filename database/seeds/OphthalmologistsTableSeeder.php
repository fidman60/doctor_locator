<?php

use Illuminate\Database\Seeder;

class OphthalmologistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ophthalmologists')->insert([
            'nom' => 'OPTIQUE CAROLINE JOO',
            'adresse_line1' => 'DR ACKER JACQUES',
            'adresse_line2' => '5 Rue des Pharmaciens',
            'ville' => 'Bischwiller',
            'cp' => 67240,
            'tele' => '0388239543',
            'partenaire_acuvue' => true,
            'email' => 'fidman60@gmail.com',
            'lat' => 48.7676428,
            'lng' => 7.860464900000011,
        ]);

        DB::table('ophthalmologists')->insert([
            'nom' => 'M OPTIQUE',
            'adresse_line1' => 'DR AIDIB ALI',
            'adresse_line2' => '2 Rue des Deux Frères Laporte',
            'ville' => 'Mézières-sur-Seine',
            'cp' => 78970,
            'tele' => '0323819034',
            'partenaire_acuvue' => false,
            'email' => 'm_optique@gmail.com',
            'lat' => 48.9590374,
            'lng' => 1.8089755999999397,
        ]);
    }
}
