<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOphtholmologistRequest;
use App\Http\Requests\UpdateOphtholmologistRequest;
use App\Repositories\OphthalmologistRepository;
use Illuminate\Http\Request;
use Cookie;
use function MongoDB\BSON\toJSON;

class OphthalmologistController extends Controller{

    protected $ophthalmologistRepository;

    protected $perPage = 5;

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

    public function indexPerPage(){
        return $this->ophthalmologistRepository->getOphthalmologistsWithSpecialitiesPaginate($this->perPage)->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOphtholmologistRequest $request){
        $this->ophthalmologistRepository->store($request->input('ophthalmologist'),$request->input('specialties'));
        return response()->json($this->ophthalmologistRepository->getOphthalmologistsWithSpecialitiesPaginate($this->perPage));
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
    public function update(UpdateOphtholmologistRequest $request, $id){
        $this->ophthalmologistRepository->update($id,$request->input('ophthalmologist'),$request->input('specialties'));
        return response()->json($this->ophthalmologistRepository->getWithSpecialties($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $this->ophthalmologistRepository->delete($id);
        return response()->json($this->ophthalmologistRepository->getOphthalmologistsWithSpecialitiesPaginate($this->perPage));
    }

    public function toggleFavorite(Request $request) {
        $id = $request->all()['id'];
        if ($request->cookie('favoritesList')){
            $arr = unserialize($request->cookie('favoritesList'));
            if(($key = array_search($id, $arr)) !== false) {
                unset($arr[$key]);
                $response = 'L\'ophthalmologist a été bien supprimé de la liste des favoris!';
            } else {
                array_push($arr,$id);
                $response = 'L\'ophthalmologist a été bien ajouté à la liste des favoris!';
            }
            $newArr = [];
            foreach ($arr as $item) $newArr[] = $item;
            return response($response)->withCookie(cookie('favoritesList',serialize($newArr),100));
        } else {
            return response('L\'ophthalmologist a été bien ajouté à la liste favoris!')
                ->withCookie(cookie('favoritesList', serialize([$id]), 100));
        }
    }

    public function getFavorites(Request $request) {
        if ($value = unserialize($request->cookie('favoritesList'))) return json_encode($value);
        return json_encode([]);
    }

    public function countOphtho(){
        return response()->json(['count' => $this->ophthalmologistRepository->total()]);
    }

}
