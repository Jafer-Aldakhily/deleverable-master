<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Models\Comment;
use App\Models\Pin;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



// Route::group(['middleware' => 'adminauth'], function () {
//     Route::get('/', function () {
//         return view('index');
//     })->name('adminDashboard');
// });
Route::get('/', function () {
    $users = count(User::all());
    $pins = count(Pin::all());
    $comments = count(Comment::all());
    $saved_pins = count(Pin::where("number_of_saved", ">", 0)->get());
    return view('index', compact("users", "pins", "comments", "saved_pins"));
})->name('adminDashboard');
// Route::group(['middleware' => 'guest:admin'], function () {
// });

Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function () {
    Route::get('/login', [AdminAuthController::class, 'getLogin'])->name('adminLogin');
    Route::post('/login', [AdminAuthController::class, 'postLogin'])->name('adminLoginPost');
    Route::get('/logout', [AdminAuthController::class, 'adminLogout'])->name('adminLogout');
    Route::get('/profile', [AdminProfileController::class, 'adminProfile'])->name('adminProfile');
    Route::put('/update/profile', [AdminProfileController::class, 'updateProfile'])->name('updateAdmin');
    Route::put('/update/password', [AdminProfileController::class, 'updatePassword'])->name('updatePassword');
    Route::put('/update/avatar', [AdminProfileController::class, 'updateAvatar'])->name('updateAvatar');
    Route::resource('/users', '\App\Http\Controllers\Admin\AdminUserController');
    Route::resource('/categories', '\App\Http\Controllers\Admin\CategoryController');
});


Route::get('/test', function () {
    return view('test');
});
Route::post('/test', [AdminAuthController::class, 'test']);
Route::get('/test/view', [AdminAuthController::class, 'testView'])->name('testRestult');
