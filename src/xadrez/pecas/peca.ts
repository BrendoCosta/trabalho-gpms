import { Cor, Desenhavel,Jogador } from "..";

export abstract class Peca implements Desenhavel {
    public cor: Cor;
    public jogador: Jogador;
    constructor(cor: Cor, jogador: Jogador) { this.cor = cor ; this.jogador = jogador }
    public abstract possiveisMovimento(posicao: [number,number]): [number, number][]
    public abstract desenhar(ctx: CanvasRenderingContext2D): void;
}