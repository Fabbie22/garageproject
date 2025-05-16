<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $personalVehicles = auth()->user()
            ->vehicles()
            ->select('vehicles.id', 'kenteken', 'model', 'type')
            ->get();

        return Inertia::render('Vehicles/Vehicles', [
            'personalVehicles' => $personalVehicles,
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
                'model' => 'nullable|string',
                'type' => 'nullable|string',
                'kenteken' => 'required|string'
            ]);

            $vehicle = Vehicle::create([
                'model' => $request->model,
                'type' => $request->type,
                'kenteken' => $request->kenteken,
            ]);

            $vehicle->users()->syncWithoutDetaching([$request->user()->id]);

            return redirect()->back()->with('success', 'Voertuig toegevoegd');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Er is iets fout gegaan tijdens het voertuig aanmaken!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $vehicle = Vehicle::findOrFail($id);


            $vehicle->delete();

            return redirect()->back()->with('success', 'Voertuig verwijderd');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Er is iets fout gegaan tijdens het voertuig verwijderen!');
        }
    }
}
