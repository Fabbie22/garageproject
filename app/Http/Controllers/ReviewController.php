<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $reviews = Review::with('user')->get();

        // dd($reviews);

        return Inertia::render('Home', [
            'reviews' => $reviews,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'rating' => 'required|integer|min:1|max:5',
                'description' => 'nullable|string'
            ]);

            Review::create([
                'rating' => $request->rating,
                'description' => $request->description,
                'user_id' => $request->user()->id
            ]);

            return redirect()->back()->with('success', 'Bedankt voor je review!');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Er is iets fout gegaan tijdens het toevoegen van de review!');
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}
