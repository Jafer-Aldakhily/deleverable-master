<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

class AdminAuthController extends Controller
{
    public function getLogin()
    {
        return view('auth.login');
    }

    public function postLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if (Auth::guard("admin")->attempt(["email" => $request->email, "password" => $request->password])) {
            $admin = Auth::guard('admin')->user();
            return redirect()->route('adminDashboard');
        } else {
            return back()->with('error', 'Whoops! invalid email and password.');
        }
    }

    public function adminLogout(Request $request)
    {
        auth()->guard('admin')->logout();
        Session::flush();
        Session::put('success', 'You are logout sucessfully');
        return redirect(route('adminLogin'));
    }


    public function test(Request $request)
    {
        return redirect(route('testRestult'))->with('message', "Test message is $request->text");
    }

    public function testView()
    {
        // if (session()->has('message')) {
        //     return view('testResult')->with('message', session()->get('message'));
        // } else {
        //     dd("session is invalid");
        // }
        return view('testResult');
    }

    protected function guard()
    {
        return Auth::guard('admin');
    }
}
