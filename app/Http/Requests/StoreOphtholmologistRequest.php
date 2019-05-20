<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOphtholmologistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'specialties' => 'required|array|min:1|max:4',
            'specialties.0.id' => 'required|integer',
            'ophthalmologist.nom' => 'required|max:200|min:3|unique:ophthalmologists,nom',
            'ophthalmologist.adresse_line1' => 'required|unique:ophthalmologists,adresse_line1',
            'ophthalmologist.adresse_line2' => 'required|unique:ophthalmologists,adresse_line2',
            'ophthalmologist.cp' => 'required',
            'ophthalmologist.ville' => 'required',
            'ophthalmologist.tele' => 'required|unique:ophthalmologists,tele',
            'ophthalmologist.email' => 'required|email|unique:ophthalmologists,email',
            'ophthalmologist.lat' => 'required',
            'ophthalmologist.lng' => 'required',
        ];
    }
}
