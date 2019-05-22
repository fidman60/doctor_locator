<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 11/05/2019
 * Time: 04:33
 */

namespace App\Repositories;

interface OphthalmologistRepository {

    function getOphthalmologistsWithSpecialities();

    function getOphthalmologistsWithSpecialitiesPaginate($n);

    function update($id,$ophtho,$specialties);

    function getWithSpecialties($id);

    function delete($id);

    function total();

    function store($ophtho, $specialties);

    function getOpthalsNomByQuery($query);

}