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

        DB::table('ophthalmologists')->insert([
            'nom' => 'FORK OPTIQUE',
            'adresse_line1' => 'DR ALEN VRINCEANU',
            'adresse_line2' => '8 RUE NATIONALE',
            'ville' => 'MUIDS',
            'cp' => 27430,
            'tele' => '0232513751',
            'partenaire_acuvue' => false,
            'email' => 'fork_optique@gmail.com',
            'lat' => 49.221327,
            'lng' => 1.2903625000000147,
        ]);

        DB::table('ophthalmologists')->insert([
            'nom' => 'OPTIQUE Li',
            'adresse_line1' => 'DR ARCHAIMBAULT MELEARD VALE',
            'adresse_line2' => '68 rue jean jaures',
            'ville' => 'POITIERS',
            'cp' => 86000,
            'tele' => '0586161021',
            'partenaire_acuvue' => false,
            'email' => 'li_optique@gmail.com',
            'lat' => 46.5816157,
            'lng' => 0.34292260000006536,
        ]);

        DB::table('ophthalmologists')->insert([
            'nom' => 'OPTIQUE ASSOUS',
            'adresse_line1' => 'DR ASSOUS NICOLE',
            'adresse_line2' => '19 RUE DE LA REPUBLIQUE',
            'ville' => 'EPINAY SUR SEINE',
            'cp' => 93800,
            'tele' => '0148264162',
            'partenaire_acuvue' => false,
            'email' => 'assous_optique@gmail.com',
            'lat' => 48.6731,
            'lng' => 2.33095,
        ]);

        DB::table('ophthalmologists')->insert([
            'nom' => 'ATENA OPTIQUE',
            'adresse_line1' => 'DR ATENA CRIVENEAU',
            'adresse_line2' => '35 BD DU CHEVRAN',
            'ville' => 'CLUSES',
            'cp' => 74300,
            'tele' => '0987145335',
            'partenaire_acuvue' => false,
            'email' => 'atena_optique@gmail.com',
            'lat' => 46.0634,
            'lng' => 6.58901,
        ]);
    }
}
