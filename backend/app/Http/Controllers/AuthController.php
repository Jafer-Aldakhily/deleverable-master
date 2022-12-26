<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function test()
    {
        return response()->json([
            "message" => "Done"
        ]);
    }
    public function register(Request $request)
    {
        $request->validate([
            "first_name" => "required",
            "last_name" => "required",
            "username" => "required",
            "phone" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|min:6|confirmed",
        ]);
        $user = User::create([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "username" => $request->username,
            "phone" => $request->phone,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ]);
        $token = $user->createToken("auth_token")->plainTextToken;
        return response()->json([
            "status" => "success",
            "message" => "User registered successfully",
            "token" => $token
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            "email" => "required",
            "password" => "required|min:6",
        ]);
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password]))
            $user = User::where("email", $request->email)->first();
        $token = $user->createToken("auth_token")->plainTextToken;
        return response([
            "status" => "success",
            "message" => "User LoggedIn successfully",
            "token" => $token
        ]);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response([
            "status" => "200",
            "message" => "User logged out successfully"
        ]);
    }


    public function googleLogin(Request $request)
    {
        $finduser = User::where('google_id', $request->google_id)->first();

        if ($finduser) {
            return response()->json([
                'user' => $finduser,
                'token' => $finduser->createToken('API token of ' . $finduser->name)->plainTextToken
            ]);
        } else {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->name,
                'email' => $request->email,
                'image' => $request->image,
                'google_id' => $request->google_id
            ]);
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
            ]);
        }
    }

    public function facebookLogin(Request $request)
    {
        $finduser = User::where('facebook_id', $request->facebook_id)->first();

        if ($finduser) {
            return response()->json([
                'user' => $finduser,
                'token' => $finduser->createToken('API token of ' . $finduser->name)->plainTextToken,
                'status' => 200
            ]);
        } else {
            $email = User::where("email", "=", $request->email);
            if ($email) {
                $user = User::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'username' => $request->name,
                    'image' => $request->image,
                    'facebook_id' => $request->facebook_id
                ]);
                return response()->json([
                    'user' => $user,
                    'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken,
                    'status' => 200
                ]);
            } else {
                $user = User::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'username' => $request->name,
                    'email' => $request->email,
                    'image' => $request->image,
                    'facebook_id' => $request->facebook_id
                ]);
                return response()->json([
                    'user' => $user,
                    'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken,
                    'status' => 200
                ]);
            }
        }
    }
}
