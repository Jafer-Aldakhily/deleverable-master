<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $guard = "admin";
    protected $primaryKey = 'id';
    use HasFactory;

    // public function __construct()
    // {
    //     $this->middleware('guest:admin', ['except' => ['logout']]);
    // }

    // public function __construct()
    // {
    //     $this->middleware(function ($request, $next) {
    //         $this->user = Auth::user();
    //         return $next($request);
    //     });
    // }

    // public function findScope($query,array $filters)
    // {
    //     self::where("email")
    // }


    public function retrieveById($primaryKey)
    {
        return $primaryKey;
    }




    public function getAuthIdentifierName()
    {
        return 'id';
    }
}
