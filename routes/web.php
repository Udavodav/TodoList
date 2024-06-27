<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Auth::routes();

Route::get('/', \App\Http\Controllers\Todo\IndexController::class);

Route::prefix('/todo')->group(function (){
   Route::post('/', \App\Http\Controllers\Todo\StoreController::class);
});
