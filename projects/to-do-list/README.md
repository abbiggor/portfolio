

Como uma pessoa que valoriza a disciplina, decidi desenvolver um projeto de estudo muito comum entre os iniciantes da programação: a famosa lista de tarefas, conhecida como ToDo List. No entanto, adaptei-a para atender às minhas necessidades e à minha rotina.

Para auxiliar em meu projeto, utilizei um vídeo do canal do YouTube do Rodolfo Mori (https://www.youtube.com/watch?v=k0roUpojoSE) como guia e ponto de partida. No entanto, como mencionado anteriormente, realizei diversas adaptações para personalizar a experiência de acordo com o meu gosto e requisitos pessoais.

Empreguei conhecimentos previamente adquiridos por meio de tutoriais e projetos mais simples que desenvolvi anteriormente. Também contei com a assistência do ChatGPT para incorporar algumas funcionalidades à minha lista de tarefas, afim de torná-la mais completa e aprender outros comandos de código.

Abaixo, documentei os itens em que busquei apoio na ferramenta de inteligência artificial, e como ela me auxiliou.



(Resolvi remover as tarefas padrão, mas deixo documentado o processo que tive para implementá-las de forma funcional)
Estava tendo problemas com as tasks padrão, para que fossem exibidas e respondessem normalmente como as tarefas adicionadas. Usei da ajuda do ChatGPT que me trouxe, em resumo, a seguinte solução:

* Linha do script.js de número 12:
    listItems = listItems.concat(defaultTasks.map((task) => ({ task, completed: false })));



As principais alterações incluem:

As tarefas padrão agora são armazenadas como objetos com uma propriedade completed, que permite a funcionalidade de completar as tarefas.

No evento addNewTask, as novas tarefas são adicionadas à lista como objetos com a propriedade completed definida como false.

Na função exibitTask, as tarefas padrão e as novas tarefas são exibidas corretamente, com a classe done aplicada às tarefas concluídas.

A função taskCompletion agora funciona com base no índice da tarefa na lista para alternar o status de completude.

Com essas alterações, as tarefas padrão continuarão sendo exibidas normalmente, e a função de completar tarefas funcionará tanto nas tarefas padrão quanto nas novas tarefas adicionadas.


/////////////////////////////////////////////////////////////

Também pedi auxílio para que fosse exibida uma mensagem de erro ao inserir um valor vazio.

O ChatGPT me deu a seguinte solução:

*HTML linha 20:

    <p class="error-message" style="color: red; display: none;">Please enter a task.</p>

* script linha 4:

    const errorMessage = document.querySelector('.error-message');

* Atualização da função addNewTask:

    function addNewTask () {
    const taskText = input.value.trim();

    if (taskText !== '') {
        listItems.push({
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


    Que antes era assim:    function addNewTask() {
                            listItems.push({
                                task: input.value,
                                completed: false
                            });

                            input.value = ''; // Isso limpará o campo de entrada após a adição de uma tarefa

                            exibitTask();
                            }