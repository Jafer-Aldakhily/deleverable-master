<?php

namespace App\Http\Controllers;

use App\Models\Pin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class PinController extends Controller
{
    public $imageName = "";

    public function uploadPin(Request $request)
    {
        $imageName = time() . "." . $request->file("image")->getClientOriginalExtension();
        $request->image->move("C:/Users/user/Desktop/masterpiece/frontend/public/pins", $imageName);
        return response()->json([
            "imagePath" => $imageName
        ]);
    }


    public function createPin(Request $request)
    {
        $request->validate([
            "image" => "required",
            "title" => "required",
            "about" => "required",
            "destination" => "required",
            "category_id" => "required",
        ]);

        $token = PersonalAccessToken::findToken($request->token);
        $user = $token->tokenable;

        if ($user) {
            Pin::create([
                "title" => $request->title,
                "about" => $request->about,
                "destination" => $request->destination,
                "category_id" => $request->category_id,
                "user_id" => $user->id,
                "image" => $request->image,
            ]);
            return response()->json([
                "status" => 200,
                "message" => "Pin Created Successfully"
            ]);
        } else {
            return response()->json([
                "status" => 500,
                "message" => "you have an error in the logged in user"
            ]);
        }
    }


    public function userProfile($id)
    {
        // $token = PersonalAccessToken::findToken($request->token);
        // $user = $token->tokenable;
        $user = User::find($id);
        // $pins = Pin::where("user_id", $user->id)->get();
        $pins = Pin::with("user")->where("user_id", $user->id)->get();
        $saved_pins = DB::table('pin_user')->where("user_id", $user->id)->get();
        $saved_pins = $user->saved_pins;

        return response()->json([
            "status" => 200,
            "user" => $user,
            "user_pins" => $pins,
            "user_saved_pins" => $saved_pins
        ]);
    }

    public function allPins($search = "")
    {
        // $projects = Project::latest()->filter(request(["search"]))->get();

        $pins = Pin::with('user')->filter($search)->get();
        // $pins = Pin::with('user')->get();
        // $pins = request(["search"]);
        return response()->json([
            "status" => 200,
            "pins" => $pins
            // "search" => $search
        ]);
    }


    public function findPin($id)
    {
        // $pin = Pin::findOrFail($id);
        $pin = Pin::with('comments.user')->where('id', $id)->first();
        // $comments = $pin->comments;
        // $comments->with("user");
        // more like pins have same category id
        $pins = Pin::where("category_id", $pin->category_id)->get();
        return response()->json([
            "status" => 200,
            "pin" => $pin,
            // "comments" => $comments,
            "pins" => $pins

        ]);
    }


    public function filterByCategoryId($categoryId)
    {
        $pins = Pin::where("category_id", $categoryId)->get();
        return response()->json([
            "status" => 200,
            "pins" => $pins
        ]);
    }


    public function savedPin(Request $request)
    {
        DB::table('pin_user')->insert([
            "user_id" => $request->user_id,
            "pin_id" => $request->pin_id
        ]);
        $id = $request->pin_id;
        $pin = Pin::find($id);
        $pin->number_of_saved += 1;
        $pin->update();
        return response()->json([
            "status" => 200,
            "message" => "Pin saved successfully"
        ]);
    }

    public function deletePin($id)
    {
        $pin = Pin::findOrFail($id);
        $pin->delete();
        return response()->json([
            "status" => 200,
            "message" => "Pin deleted successfully"
        ]);
    }
}
