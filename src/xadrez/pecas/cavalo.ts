import { Peca } from ".";
import { Imagem } from "..";
import {  Cor, Jogador } from "../enums";
export class Cavalo extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().CAVALO;

    constructor(cor: Cor, jogador: Jogador){
        super(30,cor,jogador);
    }




}
    

