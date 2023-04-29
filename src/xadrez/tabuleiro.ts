import { Peca, Peao, Bispo, Torre, Rainha, Rei, Cavalo } from "./pecas";
import { Cor, Quadrante, Posicao, Jogador, verificarPosicao, Desenhavel, converterPosicao, Desenho, Jogo } from "./";
import { MovimentosPossiveis } from "./movimentosPossiveis";
export class Tabuleiro implements Desenhavel {
    private quadrantes: Quadrante[][];
    private posicaoSelecionado: Posicao | null;
    private posicaoPossiveis: Posicao[];
    private corjogador: Cor;
    private corComputador: Cor;
    private PecasCapJogador: Peca[];
    private PecasCapComputador: Peca[];

    constructor() {
        this.quadrantes = [];
        this.corjogador = Cor.BRANCO;
        this.corComputador = Cor.PRETO;
        this.posicaoPossiveis = [];
        this.posicaoSelecionado = null;
        this.PecasCapJogador = [];
        this.PecasCapComputador = [];
        for (let i = 0; i < 8; i++) {
            this.quadrantes[i] = [];
            for (let j = 0; j < 8; j++) {
                const cor = (i + j) % 2 === 0 ? Cor.BRANCO : Cor.PRETO;
                const quadrante = new Quadrante(j, i, cor, null);
                this.quadrantes[i][j] = quadrante;
            }
        }
        this.iniciarPecas(Cor.BRANCO);
    }

    //buscar todos os quadrantes
    public getQuadrantes(): Quadrante[][] {
        return this.quadrantes;
    }
    //pega um quadrante
    public getQuadrante(posicao: Posicao): Quadrante {
        return this.quadrantes[posicao.linha][posicao.coluna];
    }

    public iniciarPecas(cor: Cor): void {
        let corJogador = cor;
        this.corjogador = this.corjogador;
        let corComputador = cor != Cor.BRANCO ? Cor.BRANCO : Cor.PRETO;

        //criando peças do jogador
        let peaoJ = new Peao(corJogador, Jogador.JOGADOR);
        let BispoJ = new Bispo(corJogador, Jogador.JOGADOR);
        let TorreJ = new Torre(corJogador, Jogador.JOGADOR);
        let RainhaJ = new Rainha(corJogador, Jogador.JOGADOR);
        let ReiJ = new Rei(corJogador, Jogador.JOGADOR);
        let CavaloJ = new Cavalo(corJogador, Jogador.JOGADOR);

        //criando peças do computador
        let peaoC = new Peao(corComputador, Jogador.COMPUTADOR);
        let BispoC = new Bispo(corComputador, Jogador.COMPUTADOR);
        let TorreC = new Torre(corComputador, Jogador.COMPUTADOR);
        let RainhaC = new Rainha(corComputador, Jogador.COMPUTADOR);
        let ReiC = new Rei(corComputador, Jogador.COMPUTADOR);
        let CavaloC = new Cavalo(corComputador, Jogador.COMPUTADOR);

        //inserindo peões no tabuleiro
        for (let i = 0; i < 8; i++) {
            this.setPeca(converterPosicao([1, i]), peaoC);
        }
        for (let i = 0; i < 8; i++) {
            this.setPeca(converterPosicao([6, i]), peaoJ);
        }

        //inserindo torres
        this.setPeca(converterPosicao([7, 0]), TorreJ);
        this.setPeca(converterPosicao([7, 7]), TorreJ);
        this.setPeca(converterPosicao([0, 0]), TorreC);
        this.setPeca(converterPosicao([0, 7]), TorreC);

        //inserindo cavalos
        this.setPeca(converterPosicao([7, 1]), CavaloJ);
        this.setPeca(converterPosicao([7, 6]), CavaloJ);
        this.setPeca(converterPosicao([0, 1]), CavaloC);
        this.setPeca(converterPosicao([0, 6]), CavaloC);

        //inserindo bispos
        this.setPeca(converterPosicao([7, 2]), BispoJ);
        this.setPeca(converterPosicao([7, 5]), BispoJ);
        this.setPeca(converterPosicao([0, 2]), BispoC);
        this.setPeca(converterPosicao([0, 5]), BispoC);

        //inserindo rainhas e rei
        if (corJogador == Cor.BRANCO) {
            this.setPeca(converterPosicao([7, 3]), RainhaJ);
            this.setPeca(converterPosicao([7, 4]), ReiJ);
            this.setPeca(converterPosicao([0, 3]), RainhaJ);
            this.setPeca(converterPosicao([0, 4]), ReiJ);
        }
        else {
            this.setPeca(converterPosicao([7, 4]), RainhaJ);
            this.setPeca(converterPosicao([7, 3]), ReiJ);
            this.setPeca(converterPosicao([0, 4]), RainhaJ);
            this.setPeca(converterPosicao([0, 7]), ReiJ);
        }
    }


    //metodo responsavel por colocar uma peca em um quadrante especifico
    public setPeca(posicao: Posicao, peca: Peca): void {
        // console.log("Consegui colocar "+peca.constructor.name+" "+peca.getCor()+" em linha: "+posicao.linha+" e coluna:"+posicao.coluna)

        if (!verificarPosicao(posicao)) {

            throw new Error("Posição fora do tabuleiro:" + posicao.linha + " e " + posicao.coluna);
        }
        this.quadrantes[posicao.linha][posicao.coluna].setPeca(peca);
    }

    //metodo responsavel por retornar a peça de um quadrante caso haja um, se não houver retorna null
    public getPeca(posicao: Posicao) {
        if (!verificarPosicao(posicao)) {
            throw new Error("Posição fora do tabuleiro");
        }

        return this.quadrantes[posicao.linha][posicao.coluna].getPeca();
    }


    public desenhar(ctx: CanvasRenderingContext2D): void {

        let origemX: number = Jogo.isometrico ? ctx.canvas.width / 2 : 0;
        let origemY: number = Jogo.isometrico ? ctx.canvas.height / 2 : 0;
        let largura = Quadrante.getLarguraDesenho(ctx);

        for (let i = 0; i < 8; i++) {

            for (let j = 0; j < 8; j++) {

                if (Jogo.isometrico) {

                    let dx: number = origemX + (i * largura / 2) - (j * largura / 2);
                    let dy: number = origemY + (i * largura / 2) + (j * largura / 2);
                    
                    // Renderiza o losango no ponto

                    Desenho.desenharLosango(ctx, dx, dy / 2, largura, largura / 2);
                    ctx.translate(dx, dy / 2);
                    this.quadrantes[j][i].desenhar(ctx);

                    // Move o ponto de origem da renderização
                    
                    
                    this.quadrantes[j][i].getPeca()?.desenhar(ctx);

                } else {

                    // Move o ponto de origem da renderização

                    ctx.translate(origemX + largura * i, origemY + largura * j);

                    // Renderiza o quadrante no ponto

                    this.quadrantes[j][i].desenhar(ctx);

                }

                // Move o ponto e origem de volta a (0, 0)

                ctx.resetTransform();

            }

        }

    }

    public click(pos: Posicao): void {
        let movi = false;
        
        if (!verificarPosicao(pos)) {
            throw new Error("Posição fora do tabuleiro");
        }
        let mesmaPosicao: boolean;
        this.posicaoSelecionado != null ? mesmaPosicao = (this.posicaoSelecionado.linha == pos.linha && this.posicaoSelecionado.coluna == pos.coluna) : null;
        movi = this.moverPecas(pos);
        this.removerPecas(pos);
        !movi?this.selecionarPecas(pos):null;


    }
    public removerPecas(pos: Posicao): void {
        if (this.posicaoPossiveis.length != 0 && this.posicaoSelecionado != null) {
            console.log("testes");
            let posicaoSelecionado = this.posicaoSelecionado;

            let peca = this.getQuadrante(posicaoSelecionado).getPeca();
            //troca o selecionado se existir do peao que ocupa a casa da posicaoSelecionada
            if (peca != null) {
                peca.setSelecionado();
            }
            //troca o selecionado das posições que estao selecionadas
            this.posicaoPossiveis.forEach(posicao => {

                this.getQuadrante(posicao).selecionar();

            });
            this.posicaoSelecionado = null;
            this.posicaoPossiveis = [];
        }
    }
    public selecionarPecas(pos: Posicao): void {
        let peca = this.getQuadrante(pos).getPeca();
        let posicoes: Posicao[] = MovimentosPossiveis(this.getQuadrantes(), pos)
        if (peca != null) {
            peca.setSelecionado();
        }
        posicoes.forEach(posicao => {
            this.getQuadrante(posicao).selecionar();
            this.posicaoPossiveis.push(posicao);
        })
        this.posicaoSelecionado = pos;
    }
    public moverPecas(pos: Posicao): boolean {
        let movi = false
        if (this.posicaoPossiveis.length != 0 && this.posicaoSelecionado != null) {
            let quadranteAlvo = this.getQuadrante(pos);
            this.posicaoPossiveis.forEach(posicao => {
                if (quadranteAlvo == this.getQuadrante(posicao)) {
                    
                    let quadranteSelecionado =this.getQuadrante(this.posicaoSelecionado!)
                    let pecaSelecionada = quadranteSelecionado.getPeca();
                    let pecaAlvo = this.getQuadrante(posicao).getPeca();
                    if(pecaAlvo!=null){
                        this.PecasCapJogador.push(pecaAlvo);
                    }
                    quadranteAlvo.setPeca(pecaSelecionada!);
                    quadranteSelecionado.removerPeca();
                    movi= true;
                }

            })
        }
        return movi;
    };

}

