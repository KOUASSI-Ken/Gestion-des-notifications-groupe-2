<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationPaymentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', [NotificationPaymentController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationPaymentController::class, 'markAsRead']);
});
