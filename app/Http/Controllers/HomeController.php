<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
        public function index()
    {
        $reviews = Review::with('user')->get();

        $appointments = Appointment::select('date', 'treatment_id')
            ->with(['treatment' => function ($query) {
                $query->select('id', 'duration');
            }])
            ->get();

        return Inertia::render('Home', [
            'reviews' => $reviews,
            'appointments' => $appointments,
        ]);
    }
}
