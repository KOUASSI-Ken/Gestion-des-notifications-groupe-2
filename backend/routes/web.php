<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});



Route::get('/test-notif', function () {
    $user = \App\Models\User::first();

    $n = notify($user->id, "Test notif", "Ça fonctionne encore🎉");

    return response()->json([
        'id' => $n->id,
        'user_id'=>$n->user_id,
        'title' => $n->title,
        'type'=> $n->type,
        'content' => $n->content,
        'is_read' => $n->is_read
    ]);
});
