function getModalides() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8000/api/v1/modalidades/`,
        dataType: 'json',
        success: modalidades => {
    
            modalidades.forEach(modalidade => {
                $('#modalides-select').append($('<option>', {
                    value: modalidade.id,
                    text: modalidade.nome
                }));
            });
        },
        error: e => {
            Swal.fire(
                'Erro de conexão!',
                'Desculpe, mas não conseguimos nos conectar ao servidor, tente novamente mais tarde',
                'error'
              )
        }
    })
}

$('#modalides-select').on('change', function (e) {
    e.preventDefault()
    var Idmodalidade = $('#modalides-select').val()
    $('#select-times1').empty()
    $('#select-times2').empty()
    $.ajax({
        type: 'GET',
        url: `http://localhost:8000/api/v1/times/modalidade/${Idmodalidade}`,
        dataType: 'json',
        success: times => {
            
            times.forEach(time => {
               
                $('#select-times1').append($('<option>', {
                    value: time.id,
                    text: time.nome
                }));

                $('#select-times2').append($('<option>', {
                    value: time.id,
                    text: time.nome
                }));
            });
        },
        error: e => {
            
        }
    })

})

function clearInputs(){
    $('#select-times1').val('')
    $('#select-times2').val('')
    $('#date').val('')
    $('#horario').val('')
}


$('#form-cadastro').on('submit', (e) => {
    e.preventDefault()
    
    idTime1 = $('#select-times1').val()
    idTime2 = $('#select-times2').val()
    dataJogo = $('#date').val()
    horarioJogo = $('#horario').val()
    if (dataJogo == '' || horarioJogo == '' || idTime1 == '' || idTime2 == '') {
        Swal.fire(
            'Valores inválidos',
            'Preencha todos os campos, para adicionar um jogo',
            'error'
          )
    } else{
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8000/api/v1/jogos/',
            data : `{"time1":"${idTime1}", "time2":"${idTime2}", "data_do_jogo":"${dataJogo} ${horarioJogo}:00"}`,
            contentType: "application/json",
            dataType: 'json',
            success: dados => {
                    clearInputs()
                    return Swal.fire(
                        'Adicionado',
                        `Jogo cadastrado com sucesso`,
                        'success'
                    )
            }
        })
        
    }
})

$(document).ready(function() {
    getModalides()    
});