<script lang="ts">

	import { Jogo } from "./xadrez/jogo";
	import { ConfirmPopup, ConfirmPopupControl, Checkbox, Modal, ModalControl } from "./componentes";
    import { onMount } from "svelte";
    import { Peca } from "./xadrez/pecas";
    import { Cor, Jogador } from "./xadrez/enums";
	import { fade } from "svelte/transition";

	let _jogo: Jogo;
	let _canvas: HTMLCanvasElement;
	let _confirmarNovoJogo: ConfirmPopupControl;
	let _pecasCapJogador: Peca[] = [];
	let _pecasCapComputador: Peca[] = [];
	
	let _selecaoCorModal: ModalControl = new ModalControl();
	$: _selecaoCorModalProps = _selecaoCorModal.Properties;
	let _fimDeJogoModal: ModalControl = new ModalControl();
	let _jogadorVitorioso: Jogador | null = null;

	function novoJogo(cor: Cor) {

		_jogo.novoJogo(cor);
		_pecasCapJogador = [];
		_pecasCapComputador = [];

	}

	onMount(() => {

		_jogo = new Jogo(_canvas, Cor.BRANCO); // Cor default

		$_selecaoCorModalProps.Closable = false;
		_selecaoCorModal.Open();

		/*
		 * Evento de peça capturada
		*/
		
		_jogo.OnPecaCap.Add((sender, peca) => {

			if (peca.getjogador() == Jogador.JOGADOR) {

				_pecasCapJogador.push(peca);
				_pecasCapJogador = _pecasCapJogador; // Ativa reatividade do svelte

			} else {

				_pecasCapComputador.push(peca);
				_pecasCapComputador = _pecasCapComputador; // Ativa reatividade do svelte

			}

		});

		/*
		 * Evento de vitória
		*/

		_jogo.OnVitoria.Add((sender, jogador) => {

			_jogadorVitorioso = jogador;
			_fimDeJogoModal.Open();

		});

		/*
		 * Evento de empate
		*/

		_jogo.OnEmpate.Add((sender) => {

			_fimDeJogoModal.Open();

		});

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
		{#if Jogo.ia_active }
			<div class="flex flex-col items-start" transition:fade={{ duration: 500 }}>
				<label>Tempo de resposta da inteligência artificial</label>
				<div class="inline-flex items-center">
					<p class="mr-2">{Jogo.delayIa / 1000} s</p>
					<input bind:value={Jogo.delayIa} type="range" min="1000" max="10000" step="1000" class="input">
					<p class="ml-2">10 s</p>
				</div>
			</div>
		{/if}
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
	<div class="w-[70%] flex flex-col items-center justify-center">
		<canvas bind:this={_canvas} on:click={(e) => _jogo.eventoClick(e) } width="{Jogo.isometrico ? 800 : 600}" height="{Jogo.isometrico ? 800 : 600}"/>
	</div>
	<Modal bind:Root={_selecaoCorModal}>
		<div class="relative w-[30%] h-auto rounded-md bg-white p-1 flex items-center justify-center shadow-md">
			<div class="w-full h-full p-6 bg-white flex">
				<div class="w-full h-full flex flex-col items-start m-2 gap-y-4">
					<div class="w-full h-4/5 flex flex-col justify-center gap-y-4">
						<h1 class="text-2xl font-medium text-gray-800 drop-shadow-md">Nova partida</h1>
						<hr class="w-full border-[0.1rem] border-gray-300"/>
						<div class="w-full max-h-[6rem] overflow-y-scroll text-sm text-gray-800">
							<p>Selecione uma cor para iniciar a partida:</p>
						</div>
					</div>
					<div class="w-full h-1/5 inline-flex justify-center gap-x-6">
						<button class="input w-full" on:click={() => {
							novoJogo(Cor.BRANCO);
							$_selecaoCorModalProps.Closable = true;
							_selecaoCorModal.Close();
						}}>Branco</button>
						<button class="input w-full" on:click={() => {
							novoJogo(Cor.PRETO);
							$_selecaoCorModalProps.Closable = true;
							_selecaoCorModal.Close();
						}}>Preto</button>
					</div>
				</div>
			</div>
		</div>
	</Modal>
	<Modal bind:Root={_fimDeJogoModal}>
		<div class="relative w-[30%] h-auto rounded-md bg-white p-1 flex items-center justify-center shadow-md">
			<div class="w-full h-full p-6 bg-white flex">
				<div class="w-full h-full flex flex-col items-start m-2 gap-y-4">
					<div class="w-full h-4/5 flex flex-col justify-center gap-y-4">
						<h1 class="text-2xl font-medium text-gray-800 drop-shadow-md">Fim de jogo</h1>
						<hr class="w-full border-[0.1rem] border-gray-300"/>
						<div class="w-full max-h-[6rem] overflow-y-scroll text-sm text-gray-800">
							{#if _jogadorVitorioso != null }
								<p>Xeque-mate: {_jogadorVitorioso == Jogador.JOGADOR ? "você venceu!" : "você foi derrotado!"}</p>
							{:else}
								<p>A partida terminou em um empate!</p>
							{/if}
						</div>
					</div>
					<div class="w-full h-1/5 inline-flex justify-center gap-x-6">
						<button class="input w-full" on:click={() => {
							_jogadorVitorioso = null;
							_fimDeJogoModal.Close();
							_confirmarNovoJogo.Open(); // Pergunta se deseja jogar novamente
						}}>OK</button>
					</div>
				</div>
			</div>
		</div>
	</Modal>
	<ConfirmPopup bind:Root={_confirmarNovoJogo} callback={(e) => {
    
		if (e) {
	
			$_selecaoCorModalProps.Closable = false;
			_selecaoCorModal.Open();
	
		}
	
	}}>
		<p>Começar um novo jogo?</p>
	</ConfirmPopup>
</div>