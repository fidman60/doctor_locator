<?php

namespace App\Http\Controllers;

use App\Repositories\SpecialtyRepository;
use Illuminate\Http\Request;

class SpecialityController extends Controller {

    protected $specialityRepository;

    /**
     * SpecialityController constructor.
     * @param $specialityRepository
     */
    public function __construct(SpecialtyRepository $specialityRepository){
        $this->specialityRepository = $specialityRepository;
    }

    public function index(){
        return $this->specialityRepository->getSpecialtiesList()->toJson(JSON_UNESCAPED_UNICODE);
    }


}
