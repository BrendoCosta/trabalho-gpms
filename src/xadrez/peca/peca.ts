import { Cor, Desenhavel } from "../";

export abstract class Peca implements Desenhavel {
    public cor: Cor;
    constructor(cor: Cor) { this.cor = cor }
    public abstract possiveisMovimento(coluna: number, linha: number): [number, number][]
    public abstract desenhar(ctx: CanvasRenderingContext2D): void;
}