<?php

namespace App\Models;

use App\Models\Pin;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'comment',
        'pin_id',
        'user_id'
    ];

    public function pin()
    {
        return $this->belongsTo(Pin::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
