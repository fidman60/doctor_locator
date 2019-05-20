<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 11/05/2019
 * Time: 04:35
 */

namespace App\Repositories;


use App\Models\Ophthalmologist;

use Cookie;

use DB;

class OphthalmologistRepositoryImpl implements OphthalmologistRepository {

    protected $ophthalmologist;

    /**
     * OphthalmologistRepositoryImpl constructor.
     * @param $ophthalmologist
     */
    public function __construct(Ophthalmologist $ophthalmologist){
        $this->ophthalmologist = $ophthalmologist;
    }


    function getOphthalmologistsWithSpecialities(){
        return $this->ophthalmologist->with('specialties')->get();
    }

    function getOphthalmologistsWithSpecialitiesPaginate($n){
        return $this->ophthalmologist->with('specialties')->paginate($n);
    }

    function update($id, $ophtho, $specialties){


        DB::transaction(function () use ($id,$ophtho,$specialties){

            $ophotholmologist = $this->ophthalmologist->find($id);

            $ophotholmologist->nom = $ophtho['nom'];
            $ophotholmologist->adresse_line1 = $ophtho['adresse_line1'];
            $ophotholmologist->adresse_line2 = $ophtho['adresse_line2'];
            $ophotholmologist->cp = $ophtho['cp'];
            $ophotholmologist->ville = $ophtho['ville'];
            $ophotholmologist->tele = $ophtho['tele'];
            $ophotholmologist->email = $ophtho['email'];
            $ophotholmologist->lat = $ophtho['lat'];
            $ophotholmologist->lng = $ophtho['lng'];
            $ophotholmologist->partenaire_acuvue = $ophtho['partenaire_acuvue'];

            $ophotholmologist->save();

            $ophotholmologist->specialties()->detach();

            $idSpecialties = [];

            foreach ($specialties as $specialty){
                $idSpecialties[] = $specialty['id'];
            }

            $ophotholmologist->specialties()->attach($idSpecialties);
        });

    }

    function getWithSpecialties($id){
        return $this->ophthalmologist
            ->with('specialties')
            ->where('id',$id)
            ->get();
    }

    function delete($id){
        DB::transaction(function () use ($id){

            $ophthalmologist = $this->ophthalmologist->find($id);

            $ophthalmologist->specialties()->detach();

            $ophthalmologist->delete();
        });
    }

    function total(){
        return $this->ophthalmologist->count();
    }

    function store($ophtho, $specialties){
        DB::transaction(function () use ($ophtho,$specialties){

            $ophotholmologist = $this->ophthalmologist;

            $ophotholmologist->nom = $ophtho['nom'];
            $ophotholmologist->adresse_line1 = $ophtho['adresse_line1'];
            $ophotholmologist->adresse_line2 = $ophtho['adresse_line2'];
            $ophotholmologist->cp = $ophtho['cp'];
            $ophotholmologist->ville = $ophtho['ville'];
            $ophotholmologist->tele = $ophtho['tele'];
            $ophotholmologist->email = $ophtho['email'];
            $ophotholmologist->lat = $ophtho['lat'];
            $ophotholmologist->lng = $ophtho['lng'];
            $ophotholmologist->partenaire_acuvue = $ophtho['partenaire_acuvue'];

            $ophotholmologist->save();

            $idSpecialties = [];

            foreach ($specialties as $specialty){
                $idSpecialties[] = $specialty['id'];
            }

            $ophotholmologist->specialties()->attach($idSpecialties);
        });
    }


}