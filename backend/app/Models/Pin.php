<?php

namespace App\Models;

use App\Models\User;
use App\Models\Comment;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pin extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'about',
        'destination',
        'category_id',
        'user_id',
        'image'
    ];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function saved_users()
    {
        return $this->belongsToMany(User::class, "pin_user");
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }


    public function scopeFilter($query, $search)
    {
        if ($search ?? false) {
            $searchValues = preg_split('/\s+/', $search, -1, PREG_SPLIT_NO_EMPTY);
            self::where(function () use ($query, $searchValues) {
                foreach ($searchValues as $value) {
                    $query->where('title', 'like', '%' . $value . '%');
                    // ->orWhere('about', 'like', '%' . $value . '%');
                }
            });
        }
    }
}
