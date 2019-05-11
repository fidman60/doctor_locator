<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ophthalmologist extends Model{

    protected $fillable = [
        'adresse_line1','adresse_line2','cp','ville','tele','partenaire_acuvue','lat','lng'
    ];

    public function specialties(){
        return $this->belongsToMany(\App\Models\Specialty::class);
    }

}
