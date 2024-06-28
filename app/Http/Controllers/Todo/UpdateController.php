<?php

namespace App\Http\Controllers\Todo;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UpdateController extends Controller
{
    public function __invoke(TodoRequest $request, Todo $todo)
    {
        $data = $request->validated();
        Gate::authorize('update', $todo);
        $todo->update($data);

        return ['message' => 'Задача измененна'];
    }
}
