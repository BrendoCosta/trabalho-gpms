import BISPO_IMAGEM_URL from "/imagens/pecas/chess-bishop.svg";
import CAVALO_IMAGEM_URL from "/imagens/pecas/chess-knight.svg";
import PEAO_IMAGEM_URL from "/imagens/pecas/chess-pawn.svg";
import RAINHA_IMAGEM_URL from "/imagens/pecas/chess-queen.svg";
import REI_IMAGEM_URL from "/imagens/pecas/chess-king.svg";
import TORRE_IMAGEM_URL from "/imagens/pecas/chess-rook.svg";

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

        this.BISPO = document.createElement("img");
        this.BISPO.src = BISPO_IMAGEM_URL;

        this.CAVALO = document.createElement("img");
        this.CAVALO.src = CAVALO_IMAGEM_URL;

        this.PEAO = document.createElement("img");
        this.PEAO.src = PEAO_IMAGEM_URL;

        this.RAINHA = document.createElement("img");
        this.RAINHA.src = RAINHA_IMAGEM_URL;

        this.REI = document.createElement("img");
        this.REI.src = REI_IMAGEM_URL;

        this.TORRE = document.createElement("img");
        this.TORRE.src = TORRE_IMAGEM_URL;

    }

}