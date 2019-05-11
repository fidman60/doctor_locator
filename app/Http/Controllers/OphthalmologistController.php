<?php

namespace App\Http\Controllers;

use App\Repositories\OphthalmologistRepository;
use Illuminate\Http\Request;

class OphthalmologistController extends Controller{

    protected $ophthalmologistRepository;

    /**
     * OphthalmologistController constructor.
     * @param $ophthalmologistRepository
     */
    public function __construct(OphthalmologistRepository $ophthalmologistRepository){
        $this->ophthalmologistRepository = $ophthalmologistRepository;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return $this->ophthalmologistRepository->getOphthalmologistsWithSpecialities()->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        //
    }
}
