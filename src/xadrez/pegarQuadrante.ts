import { Posicao, Quadrante } from ".";

/*export function PegarQuadrante(quadrantes:Quadrante[][],x:number,y:number):Quadrante {
return quadrantes[x][y];
    
}*/
export function PegarQuadrante(quadrantes:Quadrante[][],posicao:Posicao):Quadrante {
    return quadrantes[posicao.linha][posicao.coluna];
        
    }