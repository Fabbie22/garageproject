<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Invoice;
use App\Models\Treatment;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appointments = Appointment::select('treatment_id', 'date')->with('treatment')->get();
        $personalAppointments = Appointment::select('user_id', 'vehicle_id', 'treatment_id', 'date', 'customer_note', 'mechanic_note', 'status', 'work_hours')
            ->with('vehicle', 'treatment')->where('user_id', auth()->id())
            ->get();
        $personalVehicles = auth()->user()
            ->vehicles()
            ->select('vehicles.id', 'kenteken', 'model', 'type')
            ->get();
        $treatments = Treatment::all();

        return Inertia::render('Appointments/Appointments', [
            'appointments' => $appointments,
            'treatments' => $treatments,
            'personalAppointments' => $personalAppointments,
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
                'vehicle' => 'required',
                'treatment' => 'required',
                'date' => 'required|date',
                'customer_note' => 'nullable|string'
            ]);

            $appointment = Appointment::create([
                'user_id' => $request->user()->id,
                'vehicle_id' => $request->vehicle,
                'treatment_id' => $request->treatment,
                'date' => $request->date,
                'customer_note' => $request->customer_note
            ]);

            Invoice::create([
            'vehicle_id' => $appointment->vehicle_id,
            'appointment_id' => $appointment->id,
            'invoice_date' => now(),
            'paid' => false
        ]);

            return redirect()->back()->with('success', 'Afspraak is gemaakt.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Er is iets fout gegaan tijdens het maken van een afspraak!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
