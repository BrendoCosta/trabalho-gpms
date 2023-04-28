import { Jogador, Posicao, Quadrante, Tabuleiro, verificarPosicao } from ".";
import { Bispo, Cavalo, Peao, Peca, Rainha, Rei, Torre } from "./pecas";

export function MovimentosPossiveis(quadrantes: Quadrante[][], posicaoPeca: Posicao): Posicao[]{
    let movimentosPossiveis : Posicao[]=[];
    const peca = quadrantes[posicaoPeca.linha][posicaoPeca.coluna].getPeca()
    if (peca==null) {
        return movimentosPossiveis;
    }
    //console.log("to aq");
    //console.log(peca.constructor.name+" "+peca.getCor()+" em "+posicaoPeca.linha+" e "+posicaoPeca.coluna)
    if (peca instanceof Peao) {
        
         movimentosPossiveis = MovimentosPeao(peca,quadrantes,posicaoPeca)
        
        };
         
  
    
   // console.log(movimentosPossiveis);


    return movimentosPossiveis;


    
}
function MovimentosPeao(peca: Peca, quadrantes: Quadrante[][],  posicaoPeca: Posicao): Posicao[]{
//console.log(peca.constructor.name+" "+peca.getCor()+" em "+posicaoPeca.linha+" e "+posicaoPeca.coluna)

const movimentosPossiveis: Posicao[] = [];
const posicaoAtual: Posicao = posicaoPeca;

const direcao = peca.getjogador() == Jogador.JOGADOR ? -1 : 1;
const posicaoInicial = peca.getjogador() == Jogador.JOGADOR ? 6 : 1;
//console.log(peca.getjogador()+" E "+peca.getCor());

for (let i = (posicaoAtual.coluna-1); i <(posicaoAtual.coluna+2); i++) {
    //console.log("posicaoAtual");
    //console.log(posicaoAtual);
    
    let posicaoAlvo :Posicao = {linha:(posicaoAtual.linha+direcao),coluna:i}
    //console.log("posicaoAlvo");
    //console.log(posicaoAlvo);
    verificarPosicao(posicaoAlvo)?movimentosPossiveis.push(posicaoAlvo):null;

}
if(posicaoAtual.linha==posicaoInicial) {
    let posicaoAlvo : Posicao = {linha:(posicaoAtual.linha+2*direcao),coluna: posicaoAtual.coluna}
    movimentosPossiveis.push(posicaoAlvo);
}

//console.log(direcao+","+ posicaoInicial)
//console.log("movimentos possiveis FINAL");
//console.log(movimentosPossiveis);
return movimentosPossiveis;
}


