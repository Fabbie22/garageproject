<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home.index');

Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/afspraken', [AppointmentController::class, 'index'])->name('appointments.index');
    Route::post('/afspraken/create', [AppointmentController::class, 'store'])->name('appointments.store');
    Route::get('/voertuigen', [VehicleController::class, 'index'])->name('vehicles.index');
    Route::post('/voertuigen/create', [VehicleController::class, 'store'])->name('vehicles.store');
    Route::delete('/voertuigen/delete/{id}', [VehicleController::class, 'destroy'])->name('vehicles.delete');
    Route::get('/facturen', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::get('/facturen/{id}/pdf', [InvoiceController::class, 'generateInvoicePdf'])->name('invoice.pdf');
    Route::put('/facturen/{invoice}/pay', [InvoiceController::class, 'pay']);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
