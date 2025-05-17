<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'vehicle_id', 'treatment_id', 'date', 'customer_note', 'mechanic_note', 'status', 'work_hours', 'approved'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function treatment()
    {
        return $this->belongsTo(Treatment::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
    
    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
}
