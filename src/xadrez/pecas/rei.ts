import { Peca } from ".";
import { Imagem } from "..";
import {  Cor, Jogador } from "../enums";

export class Rei extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().REI;

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }



    
}
    

