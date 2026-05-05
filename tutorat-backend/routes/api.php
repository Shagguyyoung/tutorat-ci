<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TuteurController;

Route::post('/inscription', [AuthController::class, 'inscription']);
Route::post('/connexion', [AuthController::class, 'connexion']);
Route::post('/deconnexion', [AuthController::class, 'deconnexion'])->middleware('auth:sanctum');

Route::get('/tuteurs', [TuteurController::class, 'index']);
Route::get('/tuteurs/{id}', [TuteurController::class, 'show']);