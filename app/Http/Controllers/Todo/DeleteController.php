<?php

namespace App\Http\Controllers\Todo;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class DeleteController extends Controller
{
    public function __invoke(Todo $todo)
    {
        Gate::authorize('delete', $todo);
        $todo->delete();

        return ['message' => 'Задача удалена'];
    }
}
