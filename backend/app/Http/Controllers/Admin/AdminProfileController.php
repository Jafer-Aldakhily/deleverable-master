<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminProfileController extends Controller
{
    public function adminProfile()
    {
        return view('users.profile');
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            "first_name" => "required",
            "last_name" => "required",
            "email" => "required|email"
        ]);

        Admin::where('id', '=', $request->admin_id)->update([
            "first_name" => $request->first_name,
            "last_name" => $request->last_name,
            "email" => $request->email,
        ]);

        // return redirect()->route('adminProfile')->with("success", "Profile updated successfully");
        return view("users.profile")->with("success", "Profile updated successfully");
    }

    public function updatePassword(Request $request)
    {

        // $request->validate(
        //     [
        //         'password_current'      => 'required',
        //         'password_new'          => 'required|regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/|required_with:password_confirmation|same:password_confirmation',
        //         'password_confirmation' => 'required'
        //     ],
        //     [
        //         'password_new.regex' => 'The password should have minimum eight characters,
        // at least one letter, one number and one special character'
        //     ]
        // );

        // dd($request->all());

        $admin = Admin::findOrFail($request->admin_id);
        // dd($admin);
        $check = Hash::check($request->password_current, $admin->password);
        // dd($check);
        if ($check) {
            $admin->password = Hash::make($request->password_new);
            $admin->update();
            return back();
        }
    }


    public function updateAvatar(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);


        $admin = Admin::findOrFail($request->admin_id);

        // Variable to check
        $url = $admin->admin_image;
        // Validateurl using to check if admin_image is url or not
        if (filter_var($url, FILTER_VALIDATE_URL)) {
            $image = $request->file("image");
            $image_file_name = time() . "." . $image->getClientOriginalExtension();
            $request->image->move(public_path("images"), $image_file_name);
            $admin->admin_image = $image_file_name;
            $admin->save();
            return back();
        } else {
            $oldImagePath = public_path("/images" . "/" . $admin->admin_image);
            unlink($oldImagePath);
            $image = $request->file("image");
            $image_file_name = time() . "." . $image->getClientOriginalExtension();
            $request->image->move(public_path("images"), $image_file_name);
            $admin->admin_image = $image_file_name;
            $admin->save();
            return back();
        }
    }
}
