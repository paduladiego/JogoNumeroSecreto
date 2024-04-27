let chute = '0';
let chuteResposta = 'igual';
tentativasChute = 1;
let palavraTentativa = 'tentativa';
const qtdNumeroSorteados = 10;
let listaNumerosSorteados = [];
const h1Data = ['h1', 'jogo Número Secreto'];
const pData = ['p', 'Escolha um número de 1 a 10'];
const h1DataAcerto = ['h1', 'Parabéns!!!'];
const pDataAcerto = ['p', `Você acertou número Secreto com ${tentativasChute} ${palavraTentativa}!`];
const h1DataErrou = ['h1', 'Que Pena!!!'];
let pDataErrou = ['p', 'Tente Novamente, este Chute não foi o Número Secreto!'];

let listData = [h1Data, pData];
let listDataAcerto = [h1DataAcerto, pDataAcerto];
let listDataErro = [h1DataErrou, pDataErrou];

let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoTela(tagHTML, textHTML) {
	let varCampo = document.querySelector(tagHTML);
	varCampo.innerHTML = textHTML;
	responsiveVoice.speak(textHTML, "Brazilian Portuguese Female", {rate: 1.3});
}
function exibirTodosTextoTela(listaNome) {
	for (let i = 0; i < listaNome.length; i++) {
		exibirTextoTela(...listaNome[i]);
	}
}
function inputLimparFocar() {
	let varInput = document.querySelector('input');
	varInput.value = '';
	varInput.focus();
}
inputLimparFocar();

let funcaoChamada = verificarChute;
document.addEventListener('DOMContentLoaded', function () {
	let input = document.querySelector('input');

	input.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			funcaoChamada(); // Aqui você pode chamar a função que deseja executar quando Enter for pressionado
		}
	});
});

exibirTodosTextoTela(listData);

function verificarChute() {
	chute = document.querySelector('input').value;
	console.log(tentativasChute);

	if (chute == numeroSecreto) {
		for (let i = 0; i < listDataAcerto.length; i++) {
			exibirTextoTela(...listDataAcerto[i]);
			palavraTentativa = tentativasChute > 1 ? 'tentativas' : 'tentativa';
			pDataAcerto[1] = `Você acertou o número secreto com ${tentativasChute} ${palavraTentativa}!`;
			exibirTextoTela(...pDataAcerto);
		}
		document.querySelector('#reiniciar').disabled = false;
		document.getElementById('btn-chutar').setAttribute('disabled', true);
		funcaoChamada = novoJogo;
	} else {
		if (chute > numeroSecreto) {
			chuteResposta = 'maior';
		} else {
			chuteResposta = 'menor';
		}
		tentativasChute++;
		inputLimparFocar();
		pDataErrou[1] = `Tente Novamente, Seu Chute ${chute} foi ${chuteResposta} que o número Secreto!`;

		exibirTodosTextoTela(listDataErro);
	}
}

function gerarNumeroAleatorio() {
	let numeroEscolhido = parseInt(Math.random() * qtdNumeroSorteados) + 1;
	let qtdElementosListaSorteado = listaNumerosSorteados.length;
	console.log(`Numero Secreto = ${numeroEscolhido}`);

	if (qtdElementosListaSorteado == qtdNumeroSorteados / 2) {
		listaNumerosSorteados = [];
	}

	if (listaNumerosSorteados.includes(numeroEscolhido)) {
		return gerarNumeroAleatorio();
	} else {
		listaNumerosSorteados.push(numeroEscolhido);
		console.log(listaNumerosSorteados);
		return numeroEscolhido;
	}
}

function novoJogo() {
	tentativasChute = 1;
	exibirTodosTextoTela(listData);
	document.getElementById('btn-chutar').removeAttribute('disabled');
	document.getElementById('reiniciar').setAttribute('disabled', true);
	inputLimparFocar();
	funcaoChamada = verificarChute;
	numeroSecreto = gerarNumeroAleatorio();
}

// --------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
	let input2 = document.querySelector('.container__input');

	input2.addEventListener('keydown', function (event) {
		if (
			// Permite números de 0 a 9
			(event.key >= '0' && event.key <= '9') ||
			// Permite Backspace e Delete
			event.key === 'Backspace' ||
			event.key === 'Delete' ||
			event.key === 'ArrowUp' ||
			event.key === 'ArrowDown'
		) {
			// Permite a ação padrão
		} else {
			// Bloqueia a ação padrão para as demais teclas
			event.preventDefault();
		}
	});
	input2.addEventListener('keyup', function (event) {
		// Se o valor digitado for maior que 1 caractere, substitui por "10"
		if (input2.value.length > 1) {
			input2.value = '10';
		}
	});
});
