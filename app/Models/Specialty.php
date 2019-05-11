<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialty extends Model{

    protected $fillable = [
        'label'
    ];

    public function ophthalmologists(){
        return $this->belongsToMany(\App\Models\Ophthalmologist::class);
    }

}
