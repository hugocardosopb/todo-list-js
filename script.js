const content_tasks = document.getElementById('conteudo')
const input = document.getElementById('input_task')
const input_edit = document.getElementById('edit')



const tarefas = []


// função para abrir o menu dropdown/leftdown
function handleMenu() {
    let open_menu = document.getElementById('hamburger-menu')
    let tela = document.getElementById('sub-menu')
    let itens_li = document.querySelectorAll('.list-item')

    open_menu.addEventListener('click', () => {
       if(tela.style.display === 'block') {
        open_menu.innerHTML = "☰"
        $(tela).animate({
            width: "toggle"
        })
        $(itens_li).fadeOut("fast")
       }
       else {
        open_menu.innerHTML = "☓"
        $(tela).animate({
            height: "toggle"
        })
        $(itens_li).fadeIn("fast")
       }
    })
}





// função para criar elemento dinamico
function element_generator(elemento, classe, content) {
    let elem = document.createElement(elemento)
    elem.classList.add(classe)
    let task = document.createTextNode(content)
    elem.appendChild(task)
    return elem
}






// função para criar as tarefas dinamicamente / insere classe e id
let num = 1
function task() {
    let task_Value = document.getElementById('input_task').value
    let newTask_element = element_generator('div','task', task_Value)
    let set_id = newTask_element.setAttribute('id', num++)
    content_tasks.appendChild(newTask_element)
    tarefas.push(newTask_element)
    newTask_element.addEventListener('click', update)
}





// função para abrir o modal ao clicar no elemento
function todoList_Modal(){
    let todolist = document.getElementById('first_li')
    let open_modal = document.getElementById('modal-todolist')
    let tela = document.getElementById('sub-menu')
    todolist.addEventListener('click', (e) => {
        if(!open_modal.hasAttribute('open')) {
            open_modal.setAttribute('open', '')
            $('main').animate({
                opacity: 0.6 
            },500)
        }
    })
    // chamando função para fechar o modal
    this.addEventListener('click', modal_close)
    // chamando função para validar o click no menu
    this.addEventListener('click', handleModal)
    // desabilitando o input quando o modal estiver aberto
    this.addEventListener('click', handleInput_modal_on)
}
// ^
// ^
// ^
// ^
// ^
function handleInput_modal_on(e) {
    const open_modal = document.getElementById('modal-todolist')
    if(e.target.id === "input_task" && open_modal.hasAttribute('open')) {
        input.setAttribute('disabled', '')
    }
    else {
        input.removeAttribute('disabled')
    }
}





function handleModal(e) {
    const open_modal = document.getElementById('modal-todolist')
    if(!open_modal.hasAttribute('open')) {
        return 
    }
    else {
        e.preventDefault()
    }
}




// limpando input ao inserir um registro
input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter' && input.value != 0) {
        task()
        input.value = ""
     }
})





// função para fechar modal
function modal_close() {
    let modal = document.querySelector('.close')
    let modal_opacity = document.getElementById('modal-todolist')
    modal.addEventListener('click', (e) => {
        modal_opacity.removeAttribute('open')
        $('main').animate({
            opacity:1
        }, 500)
    })
}

const lists = document.querySelectorAll('.task')

lists.forEach(task => {
    if(task.style.display === "block") {
        alert('existe tarefas')
    }
    else {
        alert('não existe tarefas')
    }
})



function update(event) {

    const task = document.querySelectorAll('.task')
    const update_modal = document.getElementById('modal-update')
    const edit_update = document.getElementById('edit-task')
    let id = event.target.id
    update_modal.setAttribute('open', '')

    update_modal.addEventListener('click', (e) => {
        
        if(e.target.id === 'editar') {
            let old_txt = event.target.innerHTML
            edit_update.setAttribute('open','')
            update_modal.removeAttribute('open')
            document.getElementById('edit').value = old_txt

            input_edit.addEventListener('keypress', (event) => {
                if(event.key === 'Enter') {
                    let newTxt = input_edit.value
                    document.getElementById(id).innerHTML = newTxt
                    edit_update.removeAttribute('open')
                 }
            })
           
        }

        if(e.target.id === 'deletar') {
            document.getElementById(id).remove()
        }


        if(e.target.className === "close") {
            update_modal.removeAttribute('open')
        }

    })


}


// Chamadas de funções
handleMenu()
todoList_Modal()






