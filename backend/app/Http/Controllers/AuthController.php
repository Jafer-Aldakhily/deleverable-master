<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

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
            $user = Auth::user();
            return response()->json([
                'user' => $user,
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



    public function loggedInUser(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->token);
        $user = $token->tokenable;
        return response()->json([
            "user" => $user
        ]);
    }

    public function getProfileForEdit($id)
    {
        $user = User::find($id);
        return response()->json([
            "username" => $user->username,
            "email" => $user->email,
            "image" => $user->image,
        ]);
    }

    public function updateProfile(Request $request, $id)
    {
        if ($request->hasFile("image")) {
            // with image
            $user = User::find($id);
            $oldImagePath = "C:/Users/user/Desktop/masterpiece/frontend/public/users" . $user->image;
            if (file_exists($oldImagePath)) {
                $imageName = time() . "." . $request->file("image")->getClientOriginalExtension();
                $request->image->move("C:/Users/user/Desktop/masterpiece/frontend/public/users", $imageName);
                unlink($oldImagePath);
                $user->username = $request->username;
                $user->email = $request->email;
                $user->image = $imageName;
                $user->update();
                return response()->json([
                    "status" => 200,
                    "message" => "updated profile successfully"
                ]);
            } else {
                $imageName = time() . "." . $request->file("image")->getClientOriginalExtension();
                $request->image->move("C:/Users/user/Desktop/masterpiece/frontend/public/users", $imageName);
                $user->username = $request->username;
                $user->email = $request->email;
                $user->image = $imageName;
                $user->update();
                return response()->json([
                    "status" => 200,
                    "message" => "updated profile successfully"
                ]);
            }
            // $imageName = time() . "." . $request->file("image")->getClientOriginalExtension();
            // $request->image->move("C:/Users/user/Desktop/masterpiece/frontend/public/pins", $imageName);
            // unlink($oldImagePath);
            // $user->username = $request->username;
            // $user->email = $request->email;
            // $user->image = $imageName;
            // $user->save();
            // return response()->json([
            //     "status" => 200,
            //     "message" => "updated profile successfully"
            // ]);
        } else {
            $user = User::find($id);
            $user->username = $request->username;
            $user->email = $request->email;
            $user->update();
            return response()->json([
                "status" => 200,
                "message" => "updated profile successfully"
            ]);
        }
    }

    public function forgetPassword(Request $request)
    {
        $user = DB::table('users')->where('email', $request->email)->first();
        if ($user) {
            // do the steps to reset password
            return response()->json([
                "status" => 200,
                "email" => $user->email,
                "message" => "Check your email to reset password!"
            ]);
        } else {
            return response()->json([
                "status" => 204,
                "message" => "Your email is incorrect"
            ]);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            "email" => "required|email|exists:users",
        ]);

        $user = User::where("email", $request->email)->first();
        // $user = DB::table('users')->where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->update();
        return response()->json([
            "status" => 200,
            "message" => "Your password is changed successfully"
        ]);
    }
}
