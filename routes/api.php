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

Route::group([
    'prefix' => 'auth'
], function ($route) {
    $route->post('login', 'AuthController@login');
    $route->post('logout', 'AuthController@logout');
});

// Information of site
Route::group([
    'prefix' => 'site'
], function ($route) {
    $route->any('announcement', 'OptionsController@announcement');
    $route->any('score', 'OptionsController@score');
});
