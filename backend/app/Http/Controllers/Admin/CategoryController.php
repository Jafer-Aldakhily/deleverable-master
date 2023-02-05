<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::paginate(5);
        return view('categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('categories.create');
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
                'name' => 'required',
                'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048'
            ]
        );
        $image = $request->file("image");
        $image_file_name = time() . "." . $image->getClientOriginalExtension();
        $request->image->move("C:/Users/user/Desktop/masterpiece/frontend/public/categories", $image_file_name);
        // $distenation = public_path() . '/categories';
        // dd(public_path('categories'));
        // $request->image->move(public_path('categories'), $image_file_name);
        move_uploaded_file($image_file_name, public_path('categories'));
        $admin = new Category;
        $admin->name = $request->name;
        $admin->image = $image_file_name;
        $admin->save();

        return redirect('/admin/categories');
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
        $category = Category::findOrFail($id);
        return view('categories.edit', compact('category'));
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
        $category = Category::findOrFail($id);

        $request->validate(
            [
                'name' => 'required',
                'image' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            ],
        );
        if ($request->hasFile("image")) {
            $oldImagePath = public_path("/categories" . "/" . $category->image);
            unlink($oldImagePath);
            $image = $request->file("image");
            $image_file_name = time() . "." . $image->getClientOriginalExtension();
            $request->image->move(public_path("categories"), $image_file_name);
            $category->name = $request->name;
            $category->image = $image_file_name;
            $category->save();

            return redirect('/admin/categories');
        } else {
            $category->name = $request->name;
            $category->save();
            return redirect('/admin/categories');
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
        $category = Category::findOrFail($id);
        $oldImagePath = public_path("/categories" . "/" . $category->image);
        unlink($oldImagePath);
        $category->delete();
        return redirect('/admin/categories');
    }
}
