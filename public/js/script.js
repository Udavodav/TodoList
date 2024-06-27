
let event = 'create';

function createTodo(){
    event = 'create';
}

function addTodo(data){
    const list = document.getElementById('todo_list');
    const textBg = data.get('is_finished') ? 'text-bg-secondary' : (data.get('gravity') == 1 ? 'text-bg-danger' : (data.get('gravity') == 2 ? 'text-bg-warning' : 'text-bg-success'))
    let item = `
        <div class="${textBg} my-2 rounded-4 item">
        <input class="d-none gravity" type="text" value="${data.get('gravity')}">
        <div class="row">
            <div class="col-2 text-center align-content-center">
                <div class="form-check">
                    <input class="form-check-input mx-auto" type="checkbox" ${data.get('is_finished') ? 'checked' : ''}>
                </div>
            </div>
            <div class="col-8 py-3">
                ${data.get('is_finished') ? '<del>' : ''}
                <h4>${data.get('title')}</h4>
                ${data.get('is_finished') ? '</del>' : ''}
                <div>${data.get('description') ? data.get('description') : 'Без описания'}</div>
            </div>
            <div class="col-2 align-content-center">Кнопки</div>
        </div>
    </div>`;

    if(list.querySelectorAll('.gravity').length == 0){
        list.insertAdjacentHTML('beforeEnd', item);
    }else if(data.get('gravity') == 1 && list.querySelectorAll('.gravity[value="1"],.gravity[value="2"],.gravity[value="3"]').length > 0){
        list.querySelector('.gravity[value="1"],.gravity[value="2"],.gravity[value="3"]').closest('.item').insertAdjacentHTML('beforeBegin', item);
    }else if(data.get('gravity') == 2 && list.querySelectorAll('.gravity[value="2"],.gravity[value="3"]').length > 0){
        list.querySelector('.gravity[value="2"],.gravity[value="3"]').closest('.item').insertAdjacentHTML('beforeBegin', item);
    }else if(data.get('gravity') == 3 && list.querySelectorAll('.gravity[value="3"]').length > 0){
        list.querySelector('.gravity[value="3"]').closest('.item').insertAdjacentHTML('beforeBegin', item);
    }

}


$('#todo_form').on('submit', function (e){
    e.preventDefault();
    const data = new FormData(this);

    if(event == 'create'){
        $.ajax({
            type: "POST",
            url: "/todo/",
            data: data,
            processData: false,
            contentType: false,
            success: function (response) {
                $('#title').val('');
                $('#description').val('');
                $('#gravity option:last').prop('selected', true);
                $('#is_finished').prop('checked', false);

                addTodo(data);
            },
            error: function (e) {
                console.log(e);
            }
        });
    }else{
        console.log('edit');
    }
});
