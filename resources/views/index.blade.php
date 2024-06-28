@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Список дел</div>

                    <div class="card-body">

                        {{--Создание и редактирование задачи--}}
                        <div class="card mb-5">
                            <div class="card-body">
                                <form id="todo_form">
                                    @csrf
                                    <input class="form-control mb-3" name="title" type="text" placeholder="Заголовок"
                                           maxlength="100" id="title" required/>
                                    <input class="form-control mb-3" name="description" type="text"
                                           placeholder="Описание"
                                           maxlength="300" id="description"/>
                                    <select class="form-control mb-3" name="gravity" id="gravity">
                                        <option value="1">Очень важно</option>
                                        <option value="2">Важно</option>
                                        <option value="3" selected>Не важно</option>
                                    </select>
                                    <button type="submit" class="btn btn-success" id="create_btn">
                                        <i class="fas fa-plus"></i>
                                        Добавить
                                    </button>
                                    <button type="submit" class="btn btn-primary d-none" id="edit_btn">
                                        <i class="fas fa-edit mx-1"></i>
                                        Изменить
                                    </button>
                                    <button type="button" class="btn btn-danger d-none" id="close_btn"
                                            onclick="closeClick()">
                                        <i class="fas fa-times"></i>
                                        Отменить
                                    </button>
                                </form>
                            </div>
                        </div>

                        {{-- Список задач --}}
                        <div id="todo_list">
                            <h2>Мои задачи</h2>

                            @foreach($todos as $todo)
                                <div class="@if($todo->gravity == 1)
                                                text-bg-danger
                                            @elseif($todo->gravity == 2)
                                                text-bg-warning
                                            @else
                                                text-bg-success
                                            @endif
                                            my-2 rounded-4 item">
                                    <input class="d-none id" type="text" value="{{$todo->id}}">
                                    <input class="d-none gravity" type="text" value="{{$todo->gravity}}">
                                    <div class="row">
                                        <div class="col-2 text-center align-content-center">
                                            <div class="form-check">
                                                <input class="form-check-input mx-auto is_finished" onchange="check(this)"
                                                       type="checkbox" {{$todo->is_finished ? 'checked' : ''}}>
                                            </div>
                                        </div>
                                        <div class="col-8 py-3 div-title">
                                            @if($todo->is_finished)
                                                <del>
                                                    @endif
                                                    <h4 class="title">{{$todo->title}}</h4>
                                                    @if($todo->is_finished)
                                                </del>
                                            @endif
                                            <div class="description">{{empty($todo->description) ? 'Без описания' : $todo->description}}</div>
                                        </div>
                                        <div class="col-2 align-content-center">
                                                <button type="button" class="border-1 rounded-2 bg-transparent mx-2"
                                                        onclick="editClick(this)"><i class="fas fa-edit"></i></button>
                                                <form class="mx-2 my-1">
                                                    @method('DELETE')
                                                    <button type="button" class="border-1 rounded-2 bg-transparent" onclick="deleteTodo(this)"><i
                                                            class="fas fa-trash"></i></button>
                                                </form>
                                        </div>
                                    </div>
                                </div>
                            @endforeach

                        </div>
                    </div>
                </div>
            </div>

            <script src="{{asset('js/script.js')}}"></script>
        </div>
@endsection
