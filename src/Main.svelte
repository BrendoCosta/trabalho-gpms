<script lang="ts">

	import { Jogo } from "./xadrez/jogo";
	import { ConfirmPopup, ConfirmPopupControl, Checkbox } from "./componentes";
    import { onMount } from "svelte";
    import { Peca } from "./xadrez/pecas";
    import { Jogador } from "./xadrez/enums";
	import { fade } from "svelte/transition";

	let _jogo: Jogo;
	let _canvas: HTMLCanvasElement;
	let _confirmarNovoJogo: ConfirmPopupControl;
	let _pecasCapJogador: Peca[] = [];
	let _pecasCapComputador: Peca[] = [];

	onMount(() => {

		_jogo = new Jogo(_canvas);
		_jogo.OnPecaCap.Add((sender, peca) => {

			if (peca.getjogador() == Jogador.JOGADOR) {

				_pecasCapJogador.push(peca);
				_pecasCapJogador = _pecasCapJogador; // Ativa reatividade do svelte

			} else {

				_pecasCapComputador.push(peca);
				_pecasCapComputador = _pecasCapComputador; // Ativa reatividade do svelte

			}

		})

	});
	
</script>
<svelte:head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" type="image/png" href="/favicon.png">
	<title>Trabalho GPMS</title>
</svelte:head>
<div id="app" class="w-full h-full flex flex-row items-center justify-center p-8">
	<div class="w-[30%] flex flex-col items-start justify-center gap-4 text-gray-800">
		<h2 class="text-xl drop-shadow-md">Ações</h2>
		<button class="input" on:click={() => _confirmarNovoJogo.Open() }>Novo jogo</button>
		<h2 class="text-xl drop-shadow-md">Opções</h2>
		<div class="inline-flex items-center">
			<Checkbox bind:checked={Jogo.isometrico}/>
			<label class="ml-2">Ativar perspectiva isométrica</label>
		</div>
		<div class="inline-flex items-center">
			<Checkbox bind:checked={Jogo.ia_active}/>
			<label class="ml-2">Ativar inteligência artificial</label>
		</div>
		<h2 class="text-xl drop-shadow-md">Peças capturadas</h2>
		<h3 class="text-lg drop-shadow-md">Jogador</h3>
		<div class="inline-flex flex-wrap gap-x-2 items-center">
			{#each _pecasCapJogador as peca }
				<img src={peca.Imagem.src} class="h-[2rem]" transition:fade={{ duration: 500 }}/>
			{/each}
		</div>
		<h3 class="text-lg drop-shadow-md">Adversário</h3>
		<div class="inline-flex flex-wrap gap-x-2 items-center">
			{#each _pecasCapComputador as peca }
				<img src={peca.Imagem.src} class="h-[2rem]" transition:fade={{ duration: 500 }}/>
			{/each}
		</div>
	</div>
	<div class="w-[70%] flex flex-col items-center justify-center bg-gray-200">
		<canvas bind:this={_canvas} on:click={(e) => _jogo.eventoClick(e) } width="{Jogo.isometrico ? 800 : 600}" height="{Jogo.isometrico ? 800 : 600}"/>
	</div>
	<ConfirmPopup bind:Root={_confirmarNovoJogo} callback={(e) => {
    
		if (e) {
	
			_jogo.novoJogo();
	
		}
	
	}}>
		<p>Começar um novo jogo?</p>
	</ConfirmPopup>
</div>