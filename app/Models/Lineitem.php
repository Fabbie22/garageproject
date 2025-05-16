<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lineitem extends Model
{
    use HasFactory;

    protected $fillable = ['part_id', 'name', 'price', 'quantity', 'invoice_id'];

    public function part()
    {
        return $this->belongsTo(Part::class);
    }
}
