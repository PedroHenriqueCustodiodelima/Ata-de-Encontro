var participantesAdicionados = [];

var botaocont = document.getElementById('botaocontinuarata');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var addItemButton = document.getElementById('addItemButton');

addItemButton.addEventListener('click', function() {
    var newItem = document.getElementById('item').value.trim();
    if (newItem === "") {
        Swal.fire({
            title: "Você não adicionou um participante",
            text: "Adicione pelo menos 1 participante para a ata",
            icon: "error"
        });
    } else {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(newItem));

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'col-3 btn btn-danger float-left delete';
        deleteBtn.appendChild(document.createTextNode('X'));

        deleteBtn.addEventListener('click', function() {
            if (confirm('Tem certeza?')) {
                itemList.removeChild(li);

                // Remove o participante do array quando removido da lista
                var index = participantesAdicionados.indexOf(newItem);
                if (index !== -1) {
                    participantesAdicionados.splice(index, 1);
                }
            }
        });

        li.appendChild(deleteBtn);
        itemList.appendChild(li);

        // Adiciona o novo participante ao array
        participantesAdicionados.push(newItem);

        document.getElementById('item').value = ''; // Limpa o campo de texto
    }
});

filter.addEventListener('keyup', function() {
    var text = this.value.toLowerCase();
    var items = itemList.getElementsByTagName('li');

    Array.from(items).forEach(function(item) {
        var itemName = item.textContent.toLowerCase();
        if (itemName.includes(text)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

botaocont.addEventListener('click', addDeliberacoes);

function addDeliberacoes() {

    // Função para enviar os participantes para o servidor usando AJAX
    $.ajax({
        url: 'registrarfacilitadores.php', // Altere para o URL correto do seu servidor
        method: 'POST',
        data: {
            participantes: participantesAdicionados
        },
        success: function(response) {
            console.log("(4.2) Deu bom! AJAX está enviando os participantes");
            console.log(response);
            console.log(participantesAdicionados);
        },
        error: function(error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
}
