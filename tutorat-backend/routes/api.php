<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TuteurController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewController;

Route::post('/inscription', [AuthController::class, 'inscription']);
Route::post('/connexion', [AuthController::class, 'connexion']);
Route::post('/deconnexion', [AuthController::class, 'deconnexion'])->middleware('auth:sanctum');
Route::post('/paiement/notify', [PaymentController::class, 'notify']);

Route::get('/tuteurs', [TuteurController::class, 'index']);
Route::get('/tuteurs/{id}', [TuteurController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/sessions', [SessionController::class, 'store']);
    Route::get('/mes-sessions', [SessionController::class, 'mesSessions']);
    Route::get('/mes-sessions-tuteur', [SessionController::class, 'sessionsComeTuteur']);
    Route::patch('/sessions/{id}/statut', [SessionController::class, 'updateStatut']);
    Route::post('/paiement/initier', [PaymentController::class, 'initier']);
    Route::post('/reviews', [ReviewController::class, 'store']);
});