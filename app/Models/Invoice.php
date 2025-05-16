<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = ['vehicle_id', 'appointment_id', 'invoice_date', 'paid'];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function lineItems()
    {
        return $this->hasMany(LineItem::class);
    }
}
