<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PinController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::post("/googleLogin", [AuthController::class, "googleLogin"]);
Route::post("/facebookLogin", [AuthController::class, "facebookLogin"]);
Route::get('/test', [AuthController::class, 'test']);
Route::post("/upload", [PinController::class, "uploadPin"]);
Route::post("/create/pin", [PinController::class, "createPin"]);
Route::post("/user/profile/{id}", [PinController::class, "userProfile"]);
Route::get("/all/pins/{search?}", [PinController::class, "allPins"]);
Route::get("/find/pin/{id}", [PinController::class, "findPin"]);
Route::post("/loggedin", [AuthController::class, "loggedInUser"]);
Route::get("/pins/{categoryId}", [PinController::class, "filterByCategoryId"]);
Route::post("/create/comment", [CommentController::class, "store"]);
Route::post("/save/pin", [PinController::class, "savedPin"]);
Route::delete("/delete/pin/{id}", [PinController::class, "deletePin"]);
Route::get("/profile/{id}", [AuthController::class, "getProfileForEdit"]);
Route::post("/update/profile/{id}", [AuthController::class, "updateProfile"]);
Route::post("/forget/password", [AuthController::class, "forgetPassword"]);
// Route::post("/reset/password", [AuthController::class, "resetPassword"]);
Route::post("/reset/password", [AuthController::class, "resetPassword"]);

// Protected routes---------------------------------------
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post("/logout", [AuthController::class, "logout"]);
});
