
function montarTabela(data) {
    let table = "<table class='tblDefault'>";
    table += "<tr>" +
        "<th>Endereço</th>" +
        "<th>Bairro</th>" +
        "<th>Descrição</th>" +
        "<th>Pç. Of.</th>" +
        "<th>Vl. Aval.</th>" +
        "<th>% Desc.</th>" +
        "<th>Modalidade.</th>" +
        "<th>Cidade</th>" +
        "<th>UF</th>" +
        "</tr>";
    for (i = 0; i<data.length; i++){
        imovel = data[i];
        table += "<tr>";
        table += "<td>" + imovel.endereco + "</td>";
        table += "<td>" + imovel.bairro + "</td>";
        table += "<td>" + imovel.descricao + "</td>";
        table += "<td>" + imovel.precoOferta + "</td>";
        table += "<td>" + imovel.valorAvaliacao + "</td>";
        table += "<td>" + imovel.porcentagemDesconto + "</td>";
        table += "<td>" + imovel.modalidadeVenda + "</td>";
        table += "<td>" + imovel.cidade + "</td>";
        table += "<td>" + imovel.estado + "</td>";
        table += "</tr>";
    }
    table += "</table>";

    $("#contentdiv").html(table);

    return;
}

function gerarDataGrafico1(data) {
    
    let modalidades = [];
    let modalidades_count = [];
    for (let i = 0; i<data.length; i++) {
        imovel = data[i];
        v = parseFloat(imovel.valorAvaliacao.replace(",", "."));
        if (!modalidades.includes(imovel.modalidadeVenda)) {
            modalidades.push(imovel.modalidadeVenda);
            let obj = {"modalidade":imovel.modalidadeVenda, "count":1, "valor":v};
            modalidades_count.push(obj);
        } else {
            for (let j=0; j<modalidades_count.length; j++) {
                if (modalidades_count[j]["modalidade"] === imovel.modalidadeVenda) {
                    modalidades_count[j]["count"]++;
                    modalidades_count[j]["valor"] +=  v;
                }                
            }
        }
    }
    return modalidades_count;
}

function gerarDataGrafico2(data) {
    
    let modalidades = [];
    let modalidades_count = [];
    let total = 0;
    for (let i = 0; i<data.length; i++) {
        imovel = data[i];
        v = parseFloat(imovel.valorAvaliacao.replace(",", "."));
        if (!modalidades.includes(imovel.modalidadeVenda)) {
            modalidades.push(imovel.modalidadeVenda);
            let obj = {"modalidade":imovel.modalidadeVenda, "count":1, "valor":v};
            modalidades_count.push(obj);
        } else {
            for (let j=0; j<modalidades_count.length; j++) {
                if (modalidades_count[j]["modalidade"] === imovel.modalidadeVenda) {
                    modalidades_count[j]["count"]++;
                    modalidades_count[j]["valor"] +=  v;
                }                
            }
        }
    }
    return modalidades_count;
}
function gerarDataGrafico3(data) {
    
    let cidades = [];
    let cidades_count = [];
    for (let i = 0; i<data.length; i++) {
        imovel = data[i];
        v = parseFloat(imovel.valorAvaliacao.replace(",", "."));
        if (!cidades.includes(imovel.cidade)) {
            cidades.push(imovel.cidade);
            let obj = {"cidade":imovel.cidade, "count":1, "valor":v};
            cidades_count.push(obj);
        } else {
            for (let j=0; j<cidades.length; j++) {
                if (cidades_count[j]["cidade"] === imovel.cidade) {
                    cidades_count[j]["count"]++;
                    cidades_count[j]["valor"] +=  v;
                }                
            }
        }
    }
    return cidades_count;
}
function totalizarDataRegistro(data) {
    return data.length;
}
function totalizarDataValor(data) {
    let total = 0;
    for (let i = 0; i<data.length; i++) {
        imovel = data[i];
        total += parseFloat(imovel.valorAvaliacao.replace(",", "."));
    }
    return total.toFixed(2);
}
function carregarGrafico1(arr, id, total) {

    let tb = document.createElement("table");
    tb.setAttribute('class', 'tblGraph');
    let tr = document.createElement("tr");
    tr.innerHTML = "<th colspan='2'>Quantidade de Imóveis por Modalidade de Venda</th>";
    tb.appendChild(tr);

    for (let i = 0; i<arr.length; i++) {
        let x = Math.ceil((arr[i]["count"] * 500)/total);
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td2 = document.createElement("td");
        td.innerHTML = "<div style='height:30px; width: "+x+"px; background-color:"+colors[i]+";text-align:center;'>"+arr[i]["count"]+"</div>";
        td2.innerHTML = arr[i]["modalidade"];
        tr.appendChild(td);
        tr.appendChild(td2);
        tb.appendChild(tr);
    }

     document.getElementById(id).appendChild(tb);
}
function carregarGrafico2(arr, id, total) {

    let tb = document.createElement("table");
    tb.setAttribute('class', 'tblGraph');
    let tr = document.createElement("tr");
    tr.innerHTML = "<th colspan='2'>Valor Total de Imóveis por Modalidade de Venda (em milhões de reais)</th>";
    tb.appendChild(tr);

    for (let i = 0; i<arr.length; i++) {
        let x = Math.ceil((arr[i]["valor"] * 500)/total);
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td2 = document.createElement("td");
        let vf = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRA' }).format(arr[i]["valor"].toFixed(2)).substring(4)
        td.innerHTML = "<div style='height:30px; width: "+x+"px; background-color:"+colors[i]+";text-align:center;'>"+vf+"</div>";
        td2.innerHTML = arr[i]["modalidade"];
        tr.appendChild(td);
        tr.appendChild(td2);
        tb.appendChild(tr);
    }

     document.getElementById(id).appendChild(tb);
}
function carregarGrafico3(arr, id, total) {

    let tb = document.createElement("table");
    tb.setAttribute('class', 'tblGraph');
    let tr = document.createElement("tr");
    tr.innerHTML = "<th colspan='2'>Quantidade de Imóveis por Cidade e Valor em milhões de reais</th>";
    tb.appendChild(tr);

    for (let i = 0; i<arr.length; i++) {
        let x = Math.ceil((arr[i]["count"] * 800)/total);
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let td2 = document.createElement("td");
        td.innerHTML = "<div style='height:30px; width: " + x + "px; background-color: dodgerblue;text-align:center;'>" + arr[i]["count"] + "</div>";
        td2.innerHTML = "(" + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRA' }).format(arr[i]["valor"]).substring(4) + ")              " + arr[i]["cidade"];
        tr.appendChild(td);
        tr.appendChild(td2);
        tb.appendChild(tr);
    }

     document.getElementById(id).appendChild(tb);
}
function carregarPagina() {
    let result = null;
    $.getJSON( "json/imoveis.json", function(data) {
        let result = null;
        $.each( data, function(key, val) {});

        montarTabela(data);  

        let arr = gerarDataGrafico1(data);
        arr.sort(compararCount).reverse();
        carregarGrafico1(arr, 'chartContainer1', totalizarDataRegistro(data));

        arr = gerarDataGrafico2(data);
        arr.sort(compararValor).reverse();
        carregarGrafico2(arr, 'chartContainer2', totalizarDataValor(data));

        arr = gerarDataGrafico3(data);
        arr.sort(compararCount).reverse();
        carregarGrafico3(arr, 'chartContainer3', totalizarDataRegistro(data));
        
        return;
    });
}

(function() {
    $(document).ready(function(){    
        carregarPagina();
    });
})();

