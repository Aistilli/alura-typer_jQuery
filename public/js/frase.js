$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
  $("#spinner").toggle();

  $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function () {
      $("#erro").toggle();
      setTimeout(function () {
        $("#erro").toggle();
      }, 1500);
    })
    .always(function () {
      $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(dados) {
  var frase = $(".frase");
  var numeroAleatorio = Math.floor(Math.random() * dados.length);

  frase.text(dados[numeroAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(dados[numeroAleatorio].tempo);
}

function buscaFrase() {
  $("#spinner").toggle();
  var fraseId = $("#frase-id").val();

  var dados = {
    id: fraseId,
  };

  $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function () {
      $("#erro").toggle();
      setTimeout(function () {
        $("#erro").toggle();
      }, 1500);
    })
    .always(function () {
      $("#spinner").toggle();
    });
}

function trocaFrase(dados) {
  var frase = $(".frase");
  frase.text(dados.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(dados.tempo);
}
