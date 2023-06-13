<script lang="ts">

	import { Jogo } from "./xadrez/jogo";
	import { ConfirmPopup, ConfirmPopupControl, Checkbox } from "./componentes";
    import { onMount } from "svelte";

	let _jogo: Jogo;
	let _canvas: HTMLCanvasElement;
	let _confirmarNovoJogo: ConfirmPopupControl;

	onMount(() => {

		_jogo = new Jogo(_canvas); 

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