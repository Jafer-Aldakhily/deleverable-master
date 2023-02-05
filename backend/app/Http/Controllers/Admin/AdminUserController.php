<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $admins = Admin::latest()->paginate(3);
        return view('users.index', compact('admins'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email|unique:admins',
                'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
                'admin_type' => 'required',
                // 'password' => 'required|regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/|required_with:password_confirmation|same:password_confirmation',
                // 'password_confirmation' => 'required'
            ],
            [
                'password_new.regex' => 'The password should have minimum eight characters,
                at least one letter, one number and one special character'
            ]
        );
        $image = $request->file("image");
        $image_file_name = time() . "." . $image->getClientOriginalExtension();
        $request->image->move(public_path("images"), $image_file_name);

        $admin = new Admin;
        $admin->first_name = $request->first_name;
        $admin->last_name = $request->last_name;
        $admin->email = $request->email;
        $admin->password = Hash::make($request->password);
        $admin->admin_image = $image_file_name;
        $admin->admin_type = $request->admin_type;
        $admin->save();

        Session::push('success', 'Added admin successfully');
        Session::save();

        return redirect('/admin/users');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $admin = Admin::findOrFail($id);
        return view('users.edit', compact('admin'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $request->validate(
            [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'unique:admins,email,' . $admin->id . ',id',
                'image' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048',
                'admin_type' => 'required',
                // 'password' => 'required|regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/|required_with:password_confirmation|same:password_confirmation',
                // 'password_confirmation' => 'required'
            ],
            [
                'password_new.regex' => 'The password should have minimum eight characters,
                at least one letter, one number and one special character'
            ]
        );
        if ($request->hasFile("image")) {
            $oldImagePath = public_path("/images" . "/" . $admin->admin_image);
            unlink($oldImagePath);
            $image = $request->file("image");
            $image_file_name = time() . "." . $image->getClientOriginalExtension();
            $request->image->move(public_path("images"), $image_file_name);
            $admin->first_name = $request->first_name;
            $admin->last_name = $request->last_name;
            $admin->email = $request->email;
            $admin->admin_image = $image_file_name;
            $admin->admin_type = $request->admin_type;
            $admin->save();

            Session::push('success', 'Update admin successfully');
            Session::save();
            return redirect('/admin/users');
        } else {
            $admin->first_name = $request->first_name;
            $admin->last_name = $request->last_name;
            $admin->email = $request->email;
            $admin->admin_type = $request->admin_type;
            $admin->save();

            Session::push('success', 'Update admin successfully');
            Session::save();
            return redirect('/admin/users');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $oldImagePath = public_path("/images" . "/" . $admin->admin_image);
        unlink($oldImagePath);
        $admin->delete();
        return redirect('/admin/users');
        Session::flash('success', 'Delete admin successfully');
    }
}
