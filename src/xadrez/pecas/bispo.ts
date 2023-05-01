import { Peca } from ".";
import { Imagem } from "..";
import {  Cor, Jogador } from "../enums";

export class Bispo extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().BISPO;

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }
    


}
    

