import { isEqual } from 'lodash';
import { Desenhavel,  Movimento, Posicao, Quadrante, Jogo, Desenho  } from "./";
import { ReiEmCheque, VerificarPosicao, PegarQuadrante, TransformarPosicao,GetCombinacoesPossiveis,ValidarCheckPosicoes } from "./funcoes";
import { MovimentosPossiveis } from "./funcoes/movimentosPossiveis";
import { Bispo, Cavalo, Peao, Peca, Rainha, Rei, Torre } from "./pecas";
import { Cor,Jogador } from "./enums";
export class Tabuleiro implements Desenhavel {
    private quadrantes: Quadrante[][];
    private posicaoSelecionado: Posicao | null;
    private posicaoPossiveis: Posicao[];
    private corjogador: Cor;
    private turno: Jogador;
    private corComputador: Cor;
    private PecasCapJogador: Peca[];
    private PecasCapComputador: Peca[];
    private movimentos: Movimento[] = [];
    private IaJogando: boolean;

    constructor() {
        this.quadrantes = [];
        this.corjogador = Cor.BRANCO;
        this.corComputador = Cor.PRETO;
        this.turno = Jogador.JOGADOR;
        this.posicaoPossiveis = [];
        this.posicaoSelecionado = null;
        this.PecasCapJogador = [];
        this.PecasCapComputador = [];
        this.IaJogando = false;
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
    
    public inserirMovimento(movimento: Movimento) {
        this.movimentos.push(movimento);
    }
    public getUltimoMovimento(): Movimento {
        return this.movimentos.slice(-1)[0];

    }
    public dropUltimoMovimento(): void {
        this.movimentos.pop;
    }
    //buscar todos os quadrante

    public getQuadrantes(): Quadrante[][] {
        return this.quadrantes;
    }
    public peaoElegivel(){
        console.log("peao suspeito")
        let posicao = this.getUltimoMovimento().posicaoAtual;
        let peca = PegarQuadrante(this.getQuadrantes(),posicao).getPeca()
        console.log(peca,posicao)
        if(peca instanceof Peao &&(posicao.linha == 0 || posicao.linha == 7)) {
            console.log("peao safado")
            this.substituirPeao(posicao,null);
          
        }
        
    }
    public substituirPeao(posicao:Posicao,nomePeca:String|null) {
    let quadrante = PegarQuadrante(this.getQuadrantes(),posicao)
    let cor =  this.getTurnoOposto()!= Jogador.COMPUTADOR ? this.corjogador : this.corComputador;
    let peca;
    if(nomePeca=="Bispo"){
        peca = new Bispo(cor, this.getTurnoOposto());
    }
 
    else{
        if(nomePeca=="Torre"){
            peca = new Torre(cor, this.getTurnoOposto());
        }
            else {
              
       
            if(nomePeca=="Cavalo"){
                peca = new Cavalo(cor, this.getTurnoOposto());
            }
                else {
                    peca = new Rainha(cor, this.getTurnoOposto());
 //rainha
                }
            }
        }
        quadrante.setPeca(peca);      


    }
    public ImpossiveldeMover():boolean {
        if(this.getUltimoMovimento()!= undefined) {
            let movimentospossiveis:Posicao[];
            let checkmate = true;
            let todasPossicoes = GetCombinacoesPossiveis();
            todasPossicoes.forEach(posicao => {
            let peca = PegarQuadrante(this.quadrantes, posicao).getPeca();
            if((peca instanceof Peca && isEqual(peca.getjogador(), this.getTurno()))){
            movimentospossiveis = MovimentosPossiveis(this.getQuadrantes(),posicao,this.getUltimoMovimento(),this.getTurno());
            movimentospossiveis = ValidarCheckPosicoes(movimentospossiveis,this.getQuadrantes(), posicao,this.getUltimoMovimento(), this.getTurno())
            checkmate = checkmate&&movimentospossiveis.length==0;
            //console.log(checkmate,movimentospossiveis.length,posicao);
        }})
            //console.log(checkmate);
            return checkmate;;
        }
        return false;
        
    }
    public iniciarPecas(cor: Cor): void {
        let corJogador = cor;
        this.corjogador = this.corjogador;
        let corComputador = cor != Cor.BRANCO ? Cor.BRANCO : Cor.PRETO;

        //criando peças do jogador
        let peaoJ:Peao[]=[];

        for (let i = 0; i < 9; i++) {
            peaoJ.push(new Peao(corJogador, Jogador.JOGADOR))
 }

        let BispoJ1 = new Bispo(corJogador, Jogador.JOGADOR);
        let BispoJ2 = new Bispo(corJogador, Jogador.JOGADOR);
        let TorreJ1 = new Torre(corJogador, Jogador.JOGADOR);
        let TorreJ2 = new Torre(corJogador, Jogador.JOGADOR);
        let RainhaJ = new Rainha(corJogador, Jogador.JOGADOR);
        let ReiJ = new Rei(corJogador, Jogador.JOGADOR);
        let CavaloJ1 = new Cavalo(corJogador, Jogador.JOGADOR);
        let CavaloJ2 = new Cavalo(corJogador, Jogador.JOGADOR);

        //criando peças do computador
        let peaoC:Peao[]=[];

        for (let i = 0; i < 9; i++) {
            peaoC.push(new Peao(corComputador, Jogador.COMPUTADOR))
 
        }
        let BispoC1 = new Bispo(corComputador, Jogador.COMPUTADOR);
        let BispoC2 = new Bispo(corComputador, Jogador.COMPUTADOR);
        let TorreC1 = new Torre(corComputador, Jogador.COMPUTADOR);
        let TorreC2 = new Torre(corComputador, Jogador.COMPUTADOR);
        let RainhaC = new Rainha(corComputador, Jogador.COMPUTADOR);
        let ReiC = new Rei(corComputador, Jogador.COMPUTADOR);
        let CavaloC1 = new Cavalo(corComputador, Jogador.COMPUTADOR);
        let CavaloC2 = new Cavalo(corComputador, Jogador.COMPUTADOR);

        //inserindo peões no tabuleiro
        for (let i = 0; i < 8; i++) {
            this.setPeca(TransformarPosicao(1, i), peaoC[i]);
        }
        for (let i = 0; i < 8; i++) {
            this.setPeca(TransformarPosicao(6, i), peaoJ[i]);
        }

        //inserindo torres
        this.setPeca(TransformarPosicao(7, 0), TorreJ1);
        this.setPeca(TransformarPosicao(7, 7), TorreJ2);
        this.setPeca(TransformarPosicao(0, 0), TorreC1);
        this.setPeca(TransformarPosicao(0, 7), TorreC2);

        //inserindo cavalos
        this.setPeca(TransformarPosicao(7, 1), CavaloJ1);
        this.setPeca(TransformarPosicao(7, 6), CavaloJ2);
        this.setPeca(TransformarPosicao(0, 1), CavaloC1);
        this.setPeca(TransformarPosicao(0, 6), CavaloC2);

        //inserindo bispos
        this.setPeca(TransformarPosicao(7, 2), BispoJ1);
        this.setPeca(TransformarPosicao(7, 5), BispoJ2);
        this.setPeca(TransformarPosicao(0, 2), BispoC2);
        this.setPeca(TransformarPosicao(0, 5), BispoC1);

        //inserindo rainhas e rei
        if (corJogador == Cor.BRANCO) {
            this.setPeca(TransformarPosicao(7, 3), RainhaJ);
            this.setPeca(TransformarPosicao(7, 4), ReiJ);
            this.setPeca(TransformarPosicao(0, 3), RainhaC);
            this.setPeca(TransformarPosicao(0, 4), ReiC);
        }
        else {
            this.setPeca(TransformarPosicao(7, 4), RainhaJ);
            this.setPeca(TransformarPosicao(7, 3), ReiJ);
            this.setPeca(TransformarPosicao(0, 4), RainhaC);
            this.setPeca(TransformarPosicao(0, 7), ReiC);
        }
    }

    public passaTurno() {
        this.turno = this.turno == Jogador.COMPUTADOR ? Jogador.JOGADOR : Jogador.COMPUTADOR;
    }
    public getTurno(): Jogador {
        return this.turno;
    }
    public getTurnoOposto(): Jogador {
        return this.turno == Jogador.COMPUTADOR ? Jogador.JOGADOR : Jogador.COMPUTADOR;
    }


    //metodo responsavel por colocar uma peca em um quadrante especifico
    public setPeca(posicao: Posicao, peca: Peca): void {


        if (!VerificarPosicao(posicao)) {

            throw new Error("Posição fora do tabuleiro:" + posicao.linha + " e " + posicao.coluna);
        }
        PegarQuadrante(this.quadrantes, posicao).setPeca(peca);
    }

    //metodo responsavel por retornar a peça de um quadrante caso haja um, se não houver retorna null
    public getPeca(posicao: Posicao) {
        if (!VerificarPosicao(posicao)) {
            throw new Error("Posição fora do tabuleiro");
        }

        return PegarQuadrante(this.quadrantes, posicao).getPeca();
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

    public click(pos: Posicao): boolean {
        let movi = false;

        if (!VerificarPosicao(pos)) {
            throw new Error("Posição fora do tabuleiro");
        } else {
            let mesmaPosicao: boolean;
            mesmaPosicao = isEqual(this.posicaoSelecionado, pos)
            movi = this.moverPecas(pos);

            this.removerPecas();
            if (!movi && !mesmaPosicao) { this.selecionarPecas(pos); }
        }

        return movi;

    }
    public removerPecas(): void {
        if (this.posicaoPossiveis.length == 0 && this.posicaoSelecionado == null) {
            return
        }
        let posicaoSelecionado = this.posicaoSelecionado;

        let peca = PegarQuadrante(this.quadrantes, posicaoSelecionado!).getPeca();
        //troca o selecionado se existir do peao que ocupa a casa da posicaoSelecionada
        if (peca != null) {
            peca.setSelecionado();
        }
        //troca o selecionado das posições que estao selecionadas
        this.posicaoPossiveis.forEach(posicao => {

            PegarQuadrante(this.quadrantes, posicao).selecionar();

        });
        this.posicaoSelecionado = null;
        this.posicaoPossiveis = [];
    }

    public selecionarPecas(pos: Posicao): void {
        let peca = PegarQuadrante(this.quadrantes, pos).getPeca();
        let posicoessemCheck: Posicao[] = []
        let posicoes: Posicao[] = [];
        if (peca instanceof Peca && isEqual(peca.getjogador(), this.getTurno())) {
            posicoessemCheck = MovimentosPossiveis(this.getQuadrantes(), pos,this.getUltimoMovimento(),this.getTurno())
        }
        
        posicoes = ValidarCheckPosicoes(posicoessemCheck,this.getQuadrantes(), pos,this.getUltimoMovimento(), this.getTurno())


        if (peca != null) {
            peca.setSelecionado();
        }
        posicoes.forEach(posicao => {
            PegarQuadrante(this.quadrantes, posicao).selecionar();
            this.posicaoPossiveis.push(posicao);
        })
        this.posicaoSelecionado = pos;
    }

    public moverPecas(pos: Posicao): boolean {
        let movi = false
        const posicaoSelecionado = this.posicaoSelecionado
        if (posicaoSelecionado == null && this.posicaoPossiveis.length == 0) {
            return movi
        }

        let quadranteAlvo = PegarQuadrante(this.quadrantes, pos);
        this.posicaoPossiveis.forEach(posicao => {
            if (quadranteAlvo == PegarQuadrante(this.quadrantes, posicao)) {

                let quadranteSelecionado = PegarQuadrante(this.quadrantes, posicaoSelecionado!)
                let pecaSelecionada = quadranteSelecionado.getPeca();
                let pecaAlvo = PegarQuadrante(this.quadrantes, posicao).getPeca();

                if (pecaAlvo != null) {
                    if (pecaAlvo.getjogador() == Jogador.JOGADOR) {
                        this.PecasCapJogador.push(pecaAlvo);
                    }
                    else { this.PecasCapComputador.push(pecaAlvo); }

                } else { 
                    if(pecaSelecionada instanceof Peao &&posicao.coluna!=posicaoSelecionado!.coluna){
                    let quadranteEsp = PegarQuadrante(this.quadrantes,TransformarPosicao(posicaoSelecionado!.linha,posicao.coluna))
                    pecaAlvo = quadranteEsp.getPeca();
                    quadranteEsp.removerPeca();
                    }
                }
                if (pecaSelecionada instanceof Rei && !pecaSelecionada.getMovido() && Math.abs(posicao.coluna - posicaoSelecionado!.coluna) == 2) {
                    let sinal = Math.sign(posicao.coluna - posicaoSelecionado!.coluna);
                    let quadranteTorre = PegarQuadrante(this.quadrantes, TransformarPosicao(posicao.linha, sinal == 1 ? 7 : 0));
                    let pecarock = quadranteTorre.getPeca();
                    if (pecarock != null && pecarock instanceof Torre && !pecarock.getMovido()) {
                        let posicaoRock = TransformarPosicao(posicao.linha, posicao.coluna - sinal)
                        quadranteTorre.removerPeca();
                        let quadranteRock = PegarQuadrante(this.quadrantes, posicaoRock)
                        quadranteRock.setPeca(pecarock);
                        let movimento: Movimento = { posicaoAtual: posicaoRock, posicaoAnterior: pos, pecaCapturada: pecaAlvo!, pecaMovimentada: pecaSelecionada!,check: false };
                        this.inserirMovimento(movimento);
                    }
                }
                quadranteAlvo.setPeca(pecaSelecionada!);
                pecaSelecionada?.setMovido();
                this.passaTurno();
                let movimento: Movimento = { posicaoAtual: pos, posicaoAnterior: posicaoSelecionado!, pecaCapturada: pecaAlvo!, pecaMovimentada: pecaSelecionada!,check:ReiEmCheque(this.getQuadrantes(), null, null,this.getUltimoMovimento(), this.getTurno()) };
                
                this.inserirMovimento(movimento);
                quadranteSelecionado.removerPeca();
                movi = true;
                this.peaoElegivel();
            }
        })
        return movi;
    };
        

getMovimentosPossiveis():Posicao[]{
    return this.posicaoPossiveis;
}
getSelecionado():Posicao|null{
    return this.posicaoSelecionado
}

}

