const button = document.querySelector('.add-task-button')
const input = document.querySelector('.input-task')
const completeList = document.querySelector('.list-tasks')
const errorMessage = document.querySelector('.error-message'); // (ChatGPT)


let myItemsList = []

// * const defaultTasks = ["Stretch", "Drink water"]; // (ChatGPT)Tarefas padrão
// * Resolvi remover as tarefas padrão pois estava conflitando com a local storage

// (ChatGPT)Adicione as tarefas padrão à lista inicial
// * myItemsList = myItemsList.concat(defaultTasks.map((task) => ({ task, completed: false })));



function addNewTask () {
    const taskText = input.value.trim();

    if (taskText !== '') {
        myItemsList.push({
            task: taskText,
            completed: false
        });

        input.value = '';
        exibitTask();
        
        // Oculte a mensagem de erro (se estiver visível)
        errorMessage.style.display = 'none';
    } else {
        // Exiba a mensagem de erro
        errorMessage.style.display = 'block';
    }
}

function exibitTask () {

    let newLi = ''

    myItemsList.forEach((taskItem, index) => {
        newLi = newLi + `


        <li class="task ${taskItem.completed && "done"}">
                <p>${taskItem.task}</p>
                    <div class="task-icons">
                        <img src="./img/check.svg" alt="check" onclick="taskCompletion(${index})">
                        <img src="./img/delete.svg" alt="delete" onclick="deleteItem(${index})">
                    </div>
               </li>
        `

    })

    completeList.innerHTML = newLi

    localStorage.setItem('addedItems', JSON.stringify(myItemsList))


}

function taskCompletion(index) {
    myItemsList[index].completed = !myItemsList[index].completed
    console.log(index)
    exibitTask()
}

function deleteItem(index){
    myItemsList.splice(index,1)
    console.log(index)

    exibitTask();
}

function refreshItems(){
    const localStorageTasks = localStorage.getItem('addedItems')

    if(localStorageTasks){
    myItemsList = JSON.parse(localStorageTasks)
    }

    exibitTask()
}

button.addEventListener('click', addNewTask)
// Chame a função refreshItems() ao carregar a página
window.addEventListener('load', refreshItems);



// (ChatGPT)Chame exibitTask() para exibir as tarefas padrão inicialmente
//exibitTask();


