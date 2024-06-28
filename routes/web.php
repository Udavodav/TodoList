<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Auth::routes();

Route::middleware('auth')->group(function (){
    Route::get('/', \App\Http\Controllers\Todo\IndexController::class);
    Route::post('/', \App\Http\Controllers\Todo\StoreController::class);
    Route::patch('/update/{todo}', \App\Http\Controllers\Todo\UpdateController::class);
    Route::patch('/update/check/{todo}', \App\Http\Controllers\Todo\UpdateCheckController::class);
    Route::delete('/delete/{todo}', \App\Http\Controllers\Todo\DeleteController::class);
});
