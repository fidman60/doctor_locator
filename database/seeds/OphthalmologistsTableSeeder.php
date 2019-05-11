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
            'adresse_line1' => 'DR ACKER JACQUES',
            'adresse_line2' => '5 Rue des Pharmaciens',
            'ville' => 'Bischwiller',
            'cp' => 67240,
            'tele' => '0388239543',
            'partenaire_acuvue' => true,
            'lat' => 48.7676428,
            'lng' => 7.860464900000011,
        ]);
    }
}
