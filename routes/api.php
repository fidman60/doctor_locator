<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/ophthalmologists','OphthalmologistController');

Route::get('/paginate/ophthalmologists','OphthalmologistController@indexPerPage');

Route::post('/ophthalmologists/toggle_favorite/','OphthalmologistController@toggleFavorite');

Route::post('/ophthalmologists/get_favorites/','OphthalmologistController@getFavorites');

Route::get('/count/','OphthalmologistController@countOphtho');

Route::get('/specialities','SpecialityController@index');



Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');
Route::group(['middleware' => 'auth:api'], function(){
    Route::post('details', 'API\UserController@details');
    Route::post('logout','API\UserController@logout');
});

Route::group([
    'namespace' => 'API',
    'middleware' => 'api',
    'prefix' => 'password'
], function () {
    Route::post('create', 'PasswordResetController@create');
    Route::get('find/{token}', 'PasswordResetController@find');
    Route::post('reset', 'PasswordResetController@reset');
});