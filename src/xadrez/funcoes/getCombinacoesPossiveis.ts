import {TransformarPosicao} from "."
export function GetCombinacoesPossiveis(){
    let possiblePositions = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
           let pos = TransformarPosicao(i, j);
           possiblePositions.push(pos)
        }
    }
    return possiblePositions
}