<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'products', 'as' => 'products.'], function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/create', [ProductController::class, 'create'])->name('create');
    Route::post('/store', [ProductController::class, 'store'])->name('store');
    Route::get('/{id}/edit', [ProductController::class, 'edit'])->name('edit');
    Route::put('/{id}/update', [ProductController::class, 'update'])->name('update');
    Route::get('/{id}/details', [ProductController::class, 'show'])->name('show');
    Route::delete('/{id}/delete', [ProductController::class, 'delete'])->name('delete');
    Route::post('/upload_picture', [ProductController::class, 'uploadPicture'])->name('upload_picture');
})->middleware(['auth', 'verified'])->prefix('products')->name('products.');
