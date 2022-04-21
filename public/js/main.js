var tempoInicial = $("#tempo-limite").text();
var campo = $(".campo-digitacao");

// $(document).ready(function () { --> forma completa de escrita.
$(function () {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);
  $(".botao-remover").click(removeLinha);
  atualizaPlacar();
  $("#usuarios").selectize({
    create: true,
    sortField: "text",
  });
  $(".tooltip").tooltipster({
    trigger: "custom"
  });
});

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $("#tempo-limite").text(tempo);
}

function atualizaTamanhoFrase() {
  var frase = $(".frase").text();
  var fraseArr = frase.split(/\s+/g);
  var fraseAjust = fraseArr.filter(function (elem) {
    return elem != "";
  });
  var quantidadePalavras = fraseAjust.length;

  var numeroPalavras = $("#numero-palavras");
  numeroPalavras.text(quantidadePalavras);

  // console.log(fraseArr);

  // console.log(fraseAjust);
}

function inicializaContadores() {
  campo.on("input", function () {
    var conteudo = campo.val();
    var contadorPalavras = conteudo.split(/\S+/g).length - 1;

    var conteudoSemEspaco = conteudo.replace(/\s+/g, " ");
    var contadorCaracteres = conteudoSemEspaco.length;
    $("#contador-palavras").text(contadorPalavras);

    $("#contador-caracteres").text(contadorCaracteres);
  });
}

function inicializaCronometro() {
  campo.one("focus", function () {
    var tempoLimite = $("#tempo-limite").text();
    var cronometroID = setInterval(function () {
      tempoLimite--;
      $("#tempo-limite").text(tempoLimite);
      $("#botao-reiniciar").attr("disabled", true);
      if (tempoLimite < 1) {
        clearInterval(cronometroID);
        finalizaJogo();
      }
    }, 1000);
  });
}

function finalizaJogo() {
  campo.attr("disabled", true);
  $("#botao-reiniciar").attr("disabled", false);
  $("#fim").text("Acabou o Tempo!");
  campo.toggleClass("campo-desativado");
  inserePlacar();
}

function inicializaMarcadores() {
  // console.log(frase);

  campo.on("input", function () {
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);

    // console.log(comparavel);

    if (digitado == comparavel) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
}

function reiniciaJogo() {
  campo.attr("disabled", false);
  campo.val("");
  $("#contador-caracteres").text("0");
  $("#contador-palavras").text("0");
  $("#tempo-limite").text(tempoInicial);
  $("#fim").text("");
  inicializaCronometro();
  campo.toggleClass("campo-desativado");
  campo.removeClass("borda-vermelha");
  campo.removeClass("borda-verde");
}
