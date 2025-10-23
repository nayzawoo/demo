<?php

use Illuminate\Support\Facades\Route;

Route::get('/products', [App\Http\Controllers\ProductApiController::class, 'index']);
Route::get('/products/{id}', [App\Http\Controllers\ProductApiController::class, 'show']);
Route::post('/products/cart/add', [App\Http\Controllers\ProductApiController::class, 'addToCart']);
Route::get('/view_cart', [App\Http\Controllers\ProductApiController::class, 'viewCart']);
