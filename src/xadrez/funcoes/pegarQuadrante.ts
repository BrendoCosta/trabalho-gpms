import { VerificarPosicao } from ".";
import { Posicao, Quadrante } from "..";

/*export function PegarQuadrante(quadrantes:Quadrante[][],x:number,y:number):Quadrante {
return quadrantes[x][y];
    
}*/
export function PegarQuadrante(quadrantes: Quadrante[][], posicao: Posicao): Quadrante {
    let quadrante: Quadrante | undefined = undefined;
    try {
      quadrante = quadrantes[posicao.linha][posicao.coluna];
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Erro ao pegar quadrante na posição [${posicao.linha}, ${posicao.coluna}]: ${error.message}`);
          } else {
            console.error(`Erro ao pegar quadrante na posição [${posicao.linha}, ${posicao.coluna}]: erro desconhecido`);
          }}
    return quadrante!;
  }