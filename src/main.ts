import './style.css'
const form = document.querySelector('[data-form]') as HTMLFormElement
const input = document.querySelector('[data-input]') as HTMLInputElement
const todoList = document.querySelector('[data-list]') as HTMLDivElement

interface  TodoTypes  {
    id: number
    task : string
} 
class Storage {

    static addTodoStorage(todoArr){
        localStorage.setItem("todo", JSON.stringify(todoArr))
    }

    static getStorage(){
        let storage = localStorage.getItem("todo") === null ? 
        [] : JSON.parse(localStorage.getItem("todo"));
        storage
    }

}

let  todoArr: TodoTypes[] = Storage.getStorage();

form.addEventListener('submit', (e:any)=> {
    e.preventDefault()
    const id = Math.random() * 10000
    let todo = new Todo(id, input.value)
    if(typeof(todo === "array")){
        todoArr = [...todoArr, todo]
    }
    UI.displayData()
    UI.clearInput()

    UI.removeTodo(e)
    Storage.addTodoStorage(todoArr)

})


class Todo {
    constructor(id: number, task: string){
        this.id= id,
        this.task  = task
    }
}

class UI {

   static displayData(){
        const data = Storage.getStorage()

        let displayedData = data.map((item: TodoTypes) => {
            return `
            <div class="todo">
                <p>${item.task}</p>
                <span class="remove" data-id = ${item.id}>remove</span>
            </div>
            `
        })
        todoList.innerHTML = displayedData.join(" ")
    }

    static clearInput (){
        input.value= " "
    }

    static removeTodo(e:any){
        todoList.addEventListener("click", (e:any)=>{
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove()
            }
            let btnId = e.target.dataset.id
            UI.removeArrayTodo(btnId)

        })
    }

    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id)
    }
}





document.addEventListener("DOMContentLoaded",()=> {
   

})

