<?php

namespace App\Http\Controllers\Todo;

use App\Http\Controllers\Controller;
use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class UpdateCheckController extends Controller
{
    public function __invoke(Todo $todo)
    {
        Gate::authorize('update', $todo);
        $todo->update(['is_finished' => !($todo->is_finished)]);

        return ['message' => 'Задача измененна'];
    }
}
