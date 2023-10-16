const button = document.querySelector(".button-add-task")
const input = document.querySelector(".input-task")
const listaCompleta = document.querySelector(".list-tasks")


let myListofItens = [];

function adicionarNovaTarefa() {
  if(input.value == '') {
    alert('Você não pode adicionar uma tarefa vazia')
  } else {
    myListofItens.push({
      tarefa: input.value,
      concluida: false
    });
  
    input.value = ''
  
    mostrarTarefas()
  }
}

function mostrarTarefas() {
  let novaLi = "";

  myListofItens.forEach((item, index) => {
    novaLi = novaLi + `
    <li class="task ${item.concluida && "done"} ">
        <img src="./assets/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${index})">
        <p>${item.tarefa}</p>
        <img src="./assets/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${index})">
    </li>`
  });

  listaCompleta.innerHTML = novaLi

  localStorage.setItem('lista', JSON.stringify(myListofItens))
}

function concluirTarefa(index){
  myListofItens[index].concluida = !myListofItens[index].concluida

  mostrarTarefas()
}

function deletarItem(index) {
  myListofItens.splice(index, 1)
  mostrarTarefas()
}

function recarregarTarefas(){
  const tarefasDoLocalStorage = localStorage.getItem('lista')

  if(tarefasDoLocalStorage){
    myListofItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}

recarregarTarefas()

button.addEventListener("click", adicionarNovaTarefa);

