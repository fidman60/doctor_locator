<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 11/05/2019
 * Time: 04:35
 */

namespace App\Repositories;


use App\Models\Ophthalmologist;

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


}