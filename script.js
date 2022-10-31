let seuVotoPara = document.querySelector('.divisao-1-1 span');
let cargo = document.querySelector('.divisao-1-2 span');
let descricao = document.querySelector('.divisao-1-4');
let aviso = document.querySelector('.divisao-2');
let lateral = document.querySelector('.divisao-1-right');
let numeros = document.querySelector('.divisao-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];
let corrigir = true;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';

    numero = '';
    votoBranco = false;
    corrigir = true;

    for(let i=0; i<etapa.numeros; i++) {
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

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';

        descricao.innerHTML = `Nome: ${candidato.nome} <br> Partido: ${candidato.partido} <br>`;
        if(candidato.vice !== undefined){
            descricao.innerHTML += `Vice: ${candidato.vice}`;
        }

        let fotosHtml = '';
        for(const i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="img/${candidato.fotos[i].url}" alt""> ${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="img/${candidato.fotos[i].url}" alt""> ${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso_grande pisca"><br>VOTO NULO</div>';
    }

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
    //alert("Clicou em BRANCO");
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso_grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    } else {
        alert('Para votar em BRANCO')
    }
}

function corrige() {
   // alert("Clicou em CORRIGE");
   if(corrigir) {
    comecarEtapa();
   }
}

function confirma() {
    //alert("Clicou em CONFIRMA");
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
        //console.log('Confirmando como voto Branco');
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        //console.log('Confirmando como '+ numero);
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
           // corrigir = false;
            document.querySelector('.tela').innerHTML = '<div class="aviso_gigante pisca">FIM</div>';
        }
    }
}

comecarEtapa();