<?php

namespace App\Http\Controllers\Todo;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    public function __invoke(TodoRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();

        $todo = Todo::create($data);

        return ['message' => 'Задача добавлена', 'id' => $todo->id];
    }
}
