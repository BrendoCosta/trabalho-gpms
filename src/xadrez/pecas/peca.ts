import { Cor, Desenhavel,Jogador, Posicao, Quadrante } from "..";

export abstract class Peca implements Desenhavel {
    private cor: Cor;
    private jogador: Jogador;
    protected abstract imagem: HTMLImageElement;
    private corSelecionado: Cor ;
    private selecionado: boolean ;
    private movido:boolean = false;
    constructor(cor: Cor, jogador: Jogador) { this.cor = cor ; this.jogador = jogador ;this.corSelecionado = Cor.VERDE; this.selecionado=false}

    public getCor():Cor{
        return this.cor;
    }
    public setCor(cor: Cor):void{
        this.cor = cor;
    }
    public getjogador():Jogador{
        return this.jogador;
    }
    setSelecionado():void {
        this.selecionado=this.selecionado==false?true:false;
    }
    getSelecionado():Boolean {

        return this.selecionado;
    }
    

    public desenhar(ctx: CanvasRenderingContext2D): void {

        let larguraQuadrante: number = Quadrante.getLarguraDesenho(ctx);
        let escala: number = Math.min(larguraQuadrante / this.imagem.width, larguraQuadrante / this.imagem.height) * 0.5;
        let larguraImagem: number = this.imagem.width * escala;
        let alturaImagem: number = this.imagem.height * escala;

        /* Se a peça for branca, é preciso inverter
         * a cor dos pixels da imagem. Isso funciona pois nas
         * imagens a serem utilizadas, a cor da peça é preta.
        */

        let filtroNormal: string = ctx.filter;
        
        if (this.cor == Cor.BRANCO) {

            ctx.filter = "invert(1)";

        }

        // Desenha a imagem da peça de forma centralizada no quadrante
        
        ctx.drawImage(this.imagem, (larguraQuadrante - larguraImagem) / 2, (larguraQuadrante - alturaImagem) / 2, larguraImagem, alturaImagem);

        // Restaura o filtro de inversão de cor para o estado anterior

        ctx.filter = filtroNormal;

    }
    setMovido():void{
        this.movido = true;
    }
    getMovido():boolean{
        return this.movido;
    }
}