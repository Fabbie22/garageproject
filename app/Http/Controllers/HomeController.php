<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
        public function index(Request $request)
    {
        $reviews = Review::with('user')->get();

        $appointments = Appointment::select('date')->get();

        return Inertia::render('Home', [
            'reviews' => $reviews,
            'appointments' => $appointments,
        ]);
    }
}
