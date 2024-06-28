<?php

namespace App\Http\Controllers\Todo;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    public function __invoke()
    {
        $todos = Auth::user()->todos()->orderBy('gravity', 'ASC')->orderBy('created_at', 'DESC')->get();

        return view('index', compact('todos'));
    }
}
