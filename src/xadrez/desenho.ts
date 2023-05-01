export class Desenho {

    public static desenharLosango(ctx: CanvasRenderingContext2D, x: number, y: number, largura: number, altura: number): void {

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - largura / 2, y + altura / 2);
        ctx.lineTo(x, y + altura);
        ctx.lineTo(x + largura / 2, y + altura / 2);
        ctx.closePath();
        ctx.restore();

    }

}