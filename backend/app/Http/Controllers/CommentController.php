<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class CommentController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 200,
            'comments' => Comment::all()
        ]);
    }
    public function store(Request $request)
    {
        // $validate = $request->validate([
        //     'pin_id' => 'required',
        //     'user_id' => 'required',
        //     'comment' => 'required'
        // ]);

        $token = PersonalAccessToken::findToken($request->token);
        $user = $token->tokenable;
        Comment::create([
            'pin_id' => $request->pin_id,
            'user_id' => $user->id,
            'comment' => $request->comment
        ]);
        return response()->json([
            'status' => 200,
            'message' => 'Added new comment successfully'
        ]);
    }
    public function update(Request $request, $id)
    {
        // 
    }
    public function delete($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Deleted comment successfully'
        ]);
    }
}
