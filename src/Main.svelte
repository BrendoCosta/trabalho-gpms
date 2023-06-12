<script lang="ts">

	import { Jogo } from "./xadrez";

	// Define a classe Jogo como um elemento HTML <jogo-xadrez>

	window.customElements.define("jogo-xadrez", Jogo);

	// Cria uma instância da classe Jogo e a insere na página

	let jogo = document.createElement("jogo-xadrez");
	document.body.appendChild(jogo);

	// Configuração do jogo

	let opcao_isometrico: HTMLInputElement = document.getElementsByName("opcao_isometrico")[0] as HTMLInputElement;
	opcao_isometrico.addEventListener("change", (event) => {
		
		if (event != null) {

			if ((event.currentTarget as HTMLInputElement).checked) {

				Jogo.isometrico = true;

			} else {

				Jogo.isometrico = false;

			}

		}
		
	});
	
</script>
<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" type="image/png" href="/favicon.png">
	<title>Trabalho GPMS</title>
</svelte:head>
<div id="app" class="w-full h-full">
	aaaaaa
</div>