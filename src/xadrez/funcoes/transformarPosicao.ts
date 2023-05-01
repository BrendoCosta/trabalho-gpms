import { Posicao } from "..";

export function TransformarPosicao(x:number,y:number):Posicao {
    return {linha: x, coluna:y};  
}