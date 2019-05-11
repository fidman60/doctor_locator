<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 11/05/2019
 * Time: 04:55
 */

namespace App\Repositories;


use App\Models\Specialty;

class SpecialtyRespositoryImpl implements SpecialtyRepository {

    protected $specialty;

    /**
     * SpecialtyRespositoryImpl constructor.
     * @param $specialtyRepository
     */
    public function __construct(Specialty $specialty){
        $this->specialty = $specialty;
    }

    function getSpecialtiesList(){
        return $this->specialty->get();
    }


}