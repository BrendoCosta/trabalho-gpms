import { Peca, Peao, Bispo, Torre, Rainha, Rei, Cavalo } from "./pecas";
import { Cor, Quadrante, Posicao, Jogador, verificarPosicao } from "./";
import { Desenhavel } from "./";
export class Tabuleiro implements Desenhavel {
    private quadrantes: Quadrante[][];

    constructor() {
        this.quadrantes = [];
        for (let i = 0; i < 8; i++) {
          this.quadrantes[i] = [];
          for (let j = 0; j < 8; j++) {
            const cor = (i + j) % 2 === 0 ? Cor.BRANCO : Cor.PRETO;
            const quadrante = new Quadrante(i, j, cor,null);
            this.quadrantes[i][j] = quadrante;
          }
        }
      }
      /*
      public iniciarPecas(cor: Cor): void {
        let corJogador = cor;
        let corComputador = cor === Cor.BRANCO ? Cor.BRANCO : Cor.PRETO;
    
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
            this.setPeca([i, 1], peaoJ);
        }
        for (let i = 0; i < 8; i++) {
            this.setPeca([i, 6], peaoC);
        }

        //inserindo torres
        this.setPeca([0, 0], TorreJ);
        this.setPeca([0, 7], TorreJ);
        this.setPeca([7, 0], TorreC);
        this.setPeca([7, 7], TorreC);

        //inserindo cavalos
        this.setPeca([0, 1], CavaloJ);
        this.setPeca([0, 6], CavaloJ);
        this.setPeca([7, 1], CavaloC);
        this.setPeca([7, 6], CavaloC);

        //inserindo bispos
        this.setPeca([0, 2], BispoJ);
        this.setPeca([0, 5], BispoJ);
        this.setPeca([7, 2], BispoC);
        this.setPeca([7, 5], BispoC);

        //inserindo rainhas e rei
        if (corJogador == Cor.BRANCO) {
            this.setPeca([0, 3], RainhaJ);
            this.setPeca([0, 4], ReiJ);
            this.setPeca([7, 3], RainhaJ);
            this.setPeca([7, 4], ReiJ);
        }
        else {
            this.setPeca([0, 4], RainhaJ);
            this.setPeca([0, 3], ReiJ);
            this.setPeca([7, 4], RainhaJ);
            this.setPeca([7, 3], ReiJ);
        }
    }
*/

    //metodo responsavel por colocar uma peca em um quadrante especifico
    public setPeca(posicao: [number, number], peca: Peca): void {
        if (verificarPosicao({ posicao })) {
            throw new Error("Posição fora do tabuleiro");
        }
        this.quadrantes[posicao[0]][posicao[1]].peca = peca
    }

    //metodo responsavel por retornar a peça de um quadrante caso haja um, se não houver retorna null
    public getPeca(linha: number, coluna: number) {
        if (linha < 0 ||linha > 7 ||coluna < 0 || coluna > 7) {
            throw new Error("Posição fora do tabuleiro");
        }

        return this.quadrantes[linha][coluna].peca;
    }

    public desenhar(ctx: CanvasRenderingContext2D): void {

        let origemX: number = 0;
        let origemY: number = 0;
        let largura = Quadrante.getLarguraDesenho(ctx);

        for (let i = 0; i < 8; i++) {

            for (let j = 0; j < 8; j++) {

                // Move o ponto de origem da renderização
                
                ctx.translate(origemX + largura * i, origemY + largura * j);

                // Renderiza o quadrante no ponto
                
                this.quadrantes[i][j].desenhar(ctx);

                // Move o ponto e origem de volta a (0, 0)

                ctx.resetTransform();

            }

        }
        
    }

    public click(pos: Posicao): void {

        if (pos.linha < 0 || pos.linha > 7 || pos.coluna < 0 || pos.coluna > 7) {

            throw new Error("Posição fora do tabuleiro");

        }

        this.quadrantes[pos.coluna][pos.linha].selecionar();

    }

}