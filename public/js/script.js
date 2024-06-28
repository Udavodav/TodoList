
let event = 'create',
    editId = 0;
let listItem;

function clearFields(){
    $('#title').val('');
    $('#description').val('');
    $('#gravity option:last').prop('selected', true);
    $('#is_finished').prop('checked', false);
}

function check(chb){
    $.ajax({
        type: "PATCH",
        url: "/update/check/"+chb.closest('.item').querySelector('.id').value,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            '_token': $('#_token').value,
            '_method': 'PATCH',
        },
        processData: false,
        contentType: false,
        success: function (response) {
            const item = chb.closest('.item');
            const el = `
                ${chb.checked ? '<del>' : ''}
                <h4 class="title">${item.querySelector('.title').innerText}</h4>
                ${chb.checked ? '</del>' : ''}`;
            item.querySelector('del,.title').remove();
            item.querySelector('.div-title').insertAdjacentHTML('afterbegin', el);
        },
        error: function (e) {
            console.log(e);
        }
    });

}

function editClick(btn){
    event = 'edit';

    document.getElementById('create_btn').classList.add('d-none');
    document.getElementById('edit_btn').classList.remove('d-none');
    document.getElementById('close_btn').classList.remove('d-none');

    const item = btn.closest('.item');
    listItem = item;
    $('#title').val(item.querySelector('.title').innerText);
    $('#description').val(item.querySelector('.description').innerText);
    $('#gravity option[value='+item.querySelector('.gravity').value+']').prop('selected', true);

    if (item.querySelector('.is_finished').checked) {
        $('#is_finished').prop('checked', true);
    }else{
        $('#is_finished').prop('checked', false);
    }

    editId = item.querySelector('.id').value;
}

function closeClick(){
    event = 'create';

    document.getElementById('create_btn').classList.remove('d-none');
    document.getElementById('edit_btn').classList.add('d-none');
    document.getElementById('close_btn').classList.add('d-none');

    clearFields();
}

function addTodo(data, idTodo){
    const list = document.getElementById('todo_list');
    const textBg = data.get('gravity') == 1 ? 'text-bg-danger' : (data.get('gravity') == 2 ? 'text-bg-warning' : 'text-bg-success');
    let item = `
        <div class="${textBg} my-2 rounded-4 item">
        <input class="d-none id" type="text" value="${idTodo}">
        <input class="d-none gravity" type="text" value="${data.get('gravity')}">
        <div class="row">
            <div class="col-2 text-center align-content-center">
                <div class="form-check">
                    <input class="form-check-input mx-auto is_finished" type="checkbox" ${data.get('is_finished') ? 'checked' : ''} onchange="check(this)">
                </div>
            </div>
            <div class="col-8 py-3 div-title">
                ${data.get('is_finished') ? '<del>' : ''}
                <h4 class="title">${data.get('title')}</h4>
                ${data.get('is_finished') ? '</del>' : ''}
                <div class="description">${data.get('description') ? data.get('description') : 'Без описания'}</div>
            </div>
            <div class="col-2 align-content-center">
                <button type="button" class="border-1 rounded-2 bg-transparent mx-2"
                        onclick="editClick(this)"><i class="fas fa-edit"></i></button>
                <form class="mx-2 my-1">

                    <input type="hidden" name="_method" value="DELETE">
                    <button type="button" class="border-1 rounded-2 bg-transparent" onclick="deleteTodo(this)"><i
                            class="fas fa-trash"></i></button>
                </form>
            </div>
        </div>
    </div>`;

    if(data.get('gravity') == 1 && list.querySelectorAll('.gravity[value="1"],.gravity[value="2"],.gravity[value="3"]').length > 0){
        list.querySelector('.gravity[value="1"],.gravity[value="2"],.gravity[value="3"]').closest('.item').insertAdjacentHTML('beforeBegin', item);
    }else if(data.get('gravity') == 2 && list.querySelectorAll('.gravity[value="2"],.gravity[value="3"]').length > 0){
        list.querySelector('.gravity[value="2"],.gravity[value="3"]').closest('.item').insertAdjacentHTML('beforeBegin', item);
    }else if(data.get('gravity') == 3 && list.querySelectorAll('.gravity[value="3"]').length > 0){
        list.querySelector('.gravity[value="3"]').closest('.item').insertAdjacentHTML('beforeBegin', item);
    }else{
        list.insertAdjacentHTML('beforeEnd', item);
    }

}


$('#todo_form').on('submit', function (e){
    e.preventDefault();
    const data = new FormData(this);

    if(event == 'create'){
        $.ajax({
            type: "POST",
            url: "/",
            data: data,
            processData: false,
            contentType: false,
            success: function (response) {
                clearFields();
                addTodo(data, response['id']);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }else{
        data.append('_method', 'PATCH');
        $.ajax({
            type: "POST",
            url: "/update/"+editId,
            data: data,
            processData: false,
            contentType: false,
            success: function (response) {
                closeClick();

                if(listItem.querySelector('.gravity').value != data.get('gravity')){
                    if(listItem.querySelector('.is_finished').checked)
                        data.append('is_finished', listItem.querySelector('.is_finished').checked)
                    listItem.remove();
                    addTodo(data, listItem.querySelector('.id').value);
                }

                listItem.querySelector('.title').innerText = data.get('title');
                listItem.querySelector('.description').innerText = data.get('description') ? data.get('description') : 'Без описания';
                listItem.querySelector('.gravity').value = data.get('gravity');
            },
            error: function (e) {
                console.log(e);
            }
        });
    }
});

function deleteTodo(btn){
    const data = new FormData(btn.closest('form'));
    const item = btn.closest('.item');

    $.ajax({
        type: "POST",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: "/delete/"+item.querySelector('.id').value,
        data: data,
        processData: false,
        contentType: false,
        success: function (response) {
            item.remove();
        },
        error: function (e) {
            console.log(e);
        }
    });
}


