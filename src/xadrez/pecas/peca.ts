import { Cor, Desenhavel,Jogador, Posicao } from "..";

export abstract class Peca implements Desenhavel {
    private cor: Cor;
    private jogador: Jogador;
    constructor(cor: Cor, jogador: Jogador) { this.cor = cor ; this.jogador = jogador }

    public getCor():Cor{
        return this.cor;
    }
    public getjogador():Jogador{
        return this.jogador;
    }

    public abstract possiveisMovimento(posicao:Posicao): Posicao[];

    public abstract desenhar(ctx: CanvasRenderingContext2D): void;
}