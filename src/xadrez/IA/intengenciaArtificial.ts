
import { IaPensando } from ".";
import { Posicao, Tabuleiro } from "..";

export function InteligenciaArtificial(tabuleiro: Tabuleiro, grau: number): [Posicao | null, Posicao | null] {
    let posPont: [number, Posicao | null, Posicao | null] = [0, null, null];
    posPont = IaPensando(tabuleiro, 0, grau)

    return [posPont[1], posPont[2]]
}

