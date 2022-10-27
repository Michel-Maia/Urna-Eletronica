let seuVotoPara = document.querySelector('.divisao-1-1 span');
let cargo = document.querySelector('.divisao-1-2 span');
let descricao = document.querySelector('.divisao-1-4 span');
let aviso = document.querySelector('.divisao-1-2');
let lateral = document.querySelector('.divisao-1-right');
let numeros = document.querySelector('.divisao-1-3');

let etapaAtual = 0;
let numero = '';

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });

}

function clicou(n) {
    //alert("Clicou em "+n);
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }       
    }
}

function branco() {
    alert("Clicou em BRANCO");
}

function corrige(n) {
    alert("Clicou em CORRIGE");
}

function confirma(n) {
    alert("Clicou em CONFIRMA");
}

comecarEtapa();