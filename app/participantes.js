var participantesAdicionados = [];
var botaocont = document.getElementById('botaocontinuarata');
var botaohist = document.getElementById('abrirhist');

var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var addItemButton = document.getElementById('addItemButton');
var mensagemInfo = document.getElementById('infoMessage');

//LINKANDO AS VARÍAVEIS QUE VÃO SER ENVIADO JUNTO COM PARTICIPANTES


addItemButton.addEventListener('click', function() {

    var newItem = document.getElementById('item').value.trim();
    if (newItem === "") {

        Swal.fire({
            title: "Você não adicionou um participante",
            text: "Adicione pelo menos 1 participante para a ata",
            icon: "error"
        });

    } else {
        
        //ZONA QUE CRIA A NOVA CAIXA DE TEXTO
        var li = document.createElement('li');
        
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(newItem));

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'row btn btn-danger float-left delete';
        deleteBtn.appendChild(document.createTextNode('X'));

        deleteBtn.addEventListener('click', function() {

            if (confirm('Tem certeza?')) {
                
                itemList.removeChild(li);
                var index = participantesAdicionados.indexOf(newItem);
                if (index !== -1) {
                    participantesAdicionados.splice(index, 1);
                }
            }
        });

        li.appendChild(deleteBtn);
        itemList.appendChild(li);

        participantesAdicionados.push(newItem);
        document.getElementById('item').value = '';
    }
});

function addDeliberacoes() {
    console.log("adadasdasdsad");
    console.log(participantesAdicionados);

    $.ajax({
        url: 'registrarfacilitadores.php',
        method: 'POST',
        data: {
            
            particadd: JSON.stringify(participantesAdicionados)
        },
        success: function(response) {
            console.log("(4.2) Deu bom! AJAX está enviando os participantes");
            console.log(response);
            console.log(participantesAdicionados);

            // Montando a URL com os parâmetros
            var url = 'pagdeliberacoes.php' +
                '?participantesAdicionados=' + encodeURIComponent(JSON.stringify(participantesAdicionados));

            // Redirecionando para a nova URL
            window.location.href = url;

            // Exibindo uma mensagem de sucesso para o usuário
            Swal.fire({
                title: "Perfeito!",
                text: "Seus participantes foram registrados",
                icon: "success"
            });

            // Limpando a lista de participantes adicionados
            participantesAdicionados = [];
            atualizarListaParticipantes();
        },
        error: function(error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
}

// Função para limpar visualmente a lista de participantes
function atualizarListaParticipantes() {
    itemList.innerHTML = ''; // Limpa a lista visualmente
}

///------------BOTÃO DE REGISTRAR EMAIL DENTRO DA MODAL------------------------------

var caixadenome = document.getElementById("caixanome").value;
var caixadeemail = document.getElementById("caixadeemail").value;
var caixacargo = document.getElementById("caixacargo").value

var botaoemail = document.getElementById("registraremail");

function gravaremail(){
   
    if (caixadenome.trim() ==="" || caixadeemail.trim() ==="" || caixacargo.trim()==="")
    {
        
        Swal.fire({
            title: "Erro no registro",
            text: "Preencha todas as caixas do formulário",
            icon: "error"
          });
          console.log ("(X) Puxou a function da modal, mas não preencheu todas as informações")
    } 
    
    else {

        Swal.fire({
            title: "Cadastrado com sucesso!",
            text: "Atualize a página e continue a operação",
            icon: "success"
          });

        window.alert ("Que bom, o seu nome é: " + caixadenome + " seu email é " + caixadeemail);
        console.log ("(3.1) As informações de email foram enviadas");

        if (caixadenome !=="" && caixadeemail !=="" && caixacargo !=="") 

        $.ajax({
            url: 'registrarfacilitadores.php',
            method: 'POST',
            data: {
               caixaname: caixadenome,
               caixaemail: caixadeemail,
               caixacargo: caixacargo,
            },

            success: function (response) {
                console.log("(3.2) Deu bom! AJAX está enviando");
                console.log(response);

                
            },
            error: function (error) {
                console.error('Erro na solicitação AJAX:', error);
            }
        });
    }

};
    

botaocont.addEventListener('click', addDeliberacoes);
botaohist.addEventListener('click', addDeliberacoes);

botaoemail.addEventListener('click', gravaremail);
