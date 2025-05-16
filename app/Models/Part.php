<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $fillable = ['part_name', 'price', 'brand'];

    public function lineItem()
    {
        return $this->belongsTo(Lineitem::class);
    }

}
