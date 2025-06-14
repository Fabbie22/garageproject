<!DOCTYPE html>
<html>
<head>
    <title>Factuur #{{ $invoice->id }}</title>
    <div class="header">
        <p>Garage Jim en Fabian <br>
        Bovenbuurtweg 7 <br>
        6717 XA, Ede <br>
        Nederland</p>
    </div>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .header, .total { margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Factuur #{{ $invoice->id }}</h1>
    <p>Fact. Datum: {{ $invoice->invoice_date }}</p>
    <div class="header">
        <p>
            {{ $invoice->appointment->user->first_name ?? 'Geen naam gevonden' }} {{ $invoice->appointment->user->last_name ?? 'Geen achternaam gevonden' }}<br>
            {{ $invoice->appointment->user->address ?? 'Geen adres gevonden' }}<br>
            {{ $invoice->appointment->user->country ?? 'Geen land gevonden' }}<br>
            {{ $invoice->appointment->user->zip_code ?? '' }} {{ $invoice->appointment->user->city ?? '' }}<br>
            {{ $invoice->appointment->user->email ?? '' }}<br>
            {{ $invoice->appointment->user->phone_number ?? '' }}
        </p>
    </div>
    <div class="header">
        <p><strong>Monteur:</strong>
        {{ $invoice->appointment->mechanic->first_name ?? 'Geen naam gevonden' }}
        {{ $invoice->appointment->mechanic->last_name ?? '' }}
        </p>
        <h3>Opmerkingen:</h3>
        <p>
            {{ $invoice->appointment->mechanic_note ?? 'Geen opmerkingen geplaatst' }}
        </p>
    </div>

    <div class="header">
        <h3>Voertuig</h3>
        <p>
            Kenteken: {{ $invoice->vehicle->kenteken }}<br>
            Merk: {{ $invoice->vehicle->model }} {{ $invoice->vehicle->type }}
        </p>
    </div>
    <div class="header">
        <h3>Behandeling</h3>
        <p>
            Type behandeling: {{ $invoice->appointment->treatment->name ?? 'Geen behandeling gevonden' }}
        </p>
    </div>

    @php $total = 0 ;
        $subtotal = 0;
        $workHours = $invoice->appointment->work_hours ?? 0;
        $laborRate = 80;
        $laborCost = $laborRate * $workHours;
    @endphp
    <h3>Producten</h3>
    <table>
        <thead>
            <tr>
                <th>Onderdeelnummer</th>
                <th>Omschrijving</th>
                <th>Aantal</th>
                <th>Prijs per stuk (€)</th>
                <th>Totaal (€)</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->lineitems as $item)
                @php
                    $price = $item->part->price ?? $item->price ?? 0;
                    $lineTotal = $price * $item->quantity;
                    $subtotal += $lineTotal;
                @endphp
                <tr>
                    <td>{{ $item->part->id ?? 'N/A' }}</td>
                    <td>{{ $item->part->part_name ?? $item->name ?? 'N/A' }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ number_format($price, 2) }}</td>
                    <td>{{ number_format($lineTotal, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="header">
        <h3>Arbeid</h3>
        <p>
            Aantal gewerkte uren: {{ $invoice->appointment->work_hours ?? 0 }} uur<br>
            Uurtarief: €80,00<br>
            Totaal arbeidskosten: €{{ number_format(80 * ($invoice->appointment->work_hours ?? 0), 2) }}
        </p>
    </div>

    @php
        $vat = $subtotal * 0.21;
        $total = $subtotal + $vat;
    @endphp

    @php
        $vatBase = $subtotal + $laborCost;
        $vat = $vatBase * 0.21;
        $total = $vatBase + $vat;
    @endphp

    <h3 class="total">Subtotaal: €{{ number_format($vatBase, 2) }}</h3>
    <h3 class="total">21% BTW: €{{ number_format($vat, 2) }}</h3>
    <h3 class="total">Totaal incl. BTW: €{{ number_format($total, 2) }}</h3>
    <h3 class="total">Te betalen bedrag op NL32RABO 0983 4501 90: €{{ number_format($total, 2) }}</h3>

</html>
