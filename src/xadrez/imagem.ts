import RAINHA_IMG from "../assets/rainha.png";

export class Imagem {

    private static instancia: Imagem | null = null;
    
    public BISPO: HTMLImageElement;
    public CAVALO: HTMLImageElement;
    public PEAO: HTMLImageElement;
    public RAINHA: HTMLImageElement;
    public REI: HTMLImageElement;
    public TORRE: HTMLImageElement;

    public static getInstancia(): Imagem {

        if (this.instancia == null) {

            this.instancia = new Imagem();

        }

        return this.instancia;

    }

    private constructor() {

        this.BISPO = this.criarImagem("/imagens/pecas/chess-bishop.svg");
        this.CAVALO = this.criarImagem("/imagens/pecas/chess-knight.svg");
        this.PEAO = this.criarImagem("/imagens/pecas/chess-pawn.svg");
        this.RAINHA = this.criarImagem("/imagens/pecas/chess-queen.svg");
        this.REI = this.criarImagem("/imagens/pecas/chess-king.svg");
        this.TORRE = this.criarImagem("/imagens/pecas/chess-rook.svg");

    }

    private criarImagem(caminho: string): HTMLImageElement {

        let temp = document.createElement("img");
        temp.src = new URL(caminho, import.meta.url).href;
        return temp;

    }

}