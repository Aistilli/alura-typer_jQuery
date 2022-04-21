$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
  var corpoTabela = $(".placar").find("tbody");
  var usuario = $("#usuarios").val();
  var numeroPalavras = $("#contador-palavras").text();

  var linha = novaLinha(usuario, numeroPalavras);
  linha.find(".botao-remover").click(removeLinha);

  corpoTabela.prepend(linha);

  $(".placar").slideDown(500);
  scrollPlacar();
}

function novaLinha(usuario, palavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemove = $("<td>");

  var link = $("<a>").attr("href", "#").addClass("botao-remover");
  var icone = $("<i>")
    .addClass("small")
    .addClass("material-icons")
    .text("delete");

  link.append(icone);
  colunaRemove.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemove);

  return linha;
}

function removeLinha(event) {
  event.preventDefault();

  var linha = $(this).parent().parent();

  // linha.fadeOut(1000);
  // setTimeout(function(){
  //   linha.remove();
  // },1000);

  linha.fadeOut(2000, function () {
    linha.remove();
  });
}

function mostraPlacar() {
  $(".placar").stop().slideToggle(600);
}

function scrollPlacar() {
  var posicaoPlacar = $(".placar").offset().top;

  $("body").animate(
    {
      scrollTop: posicaoPlacar + "px",
    },
    1000
  );
}

function sincronizaPlacar() {
  var placar = [];
  var linhas = $("tbody>tr");

  linhas.each(function () {
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();
    var score = {
      usuario: usuario,
      pontos: palavras,
    };

    placar.push(score);
  });

  var dados = {
    placar: placar,
  };

  $.post("http://localhost:3000/placar", dados, function () {
    console.log("Placar sincronizado com sucesso");
    $(".tooltip")
      .tooltipster("open")
      .tooltipster("content", "Sucesso ao sincronizar");
  })
    .fail(function () {
      $(".tooltip")
        .tooltipster("open")
        .tooltipster("content", "Falha ao sincronizar");
    })
    .always(function () {
      setTimeout(function () {
        $(".tooltip").tooltipster("close");
      }, 1200);
    });
}

function atualizaPlacar() {
  $.get("http://localhost:3000/placar", function (dados) {
    $(dados).each(function () {
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);
      $("tbody").append(linha);
    });
  });
}