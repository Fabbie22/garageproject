<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $allInvoices = Invoice::with('appointment.treatment', 'appointment.mechanic', 'vehicle', 'lineitems.part')
            ->whereHas('appointment', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->get();

        return Inertia::render('Invoices/Invoices', [
            'allInvoices' => $allInvoices
        ]);
    }

    public function generateInvoicePdf($id)
    {
        $invoice = \App\Models\Invoice::with(['vehicle', 'appointment', 'lineitems.part'])->findOrFail($id);
        $pdf = PDF::loadView('invoice-pdf', compact('invoice'));
        return $pdf->download('invoice-' . $id . '.pdf');
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
    }

    public function pay(Request $request, \App\Models\Invoice $invoice)
    {
        try {
            $invoice->paid = true;
            $invoice->save();

            return back()->with('success', 'Factuur gemarkeerd als betaald.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Er is iets fout gegaan met het betalen!');
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
