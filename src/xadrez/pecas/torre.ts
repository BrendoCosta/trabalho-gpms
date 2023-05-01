import { Peca } from ".";
import { Imagem } from "..";
import {  Cor, Jogador } from "../enums";


export class Torre extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().TORRE;

    constructor(cor: Cor, jogador: Jogador){
        super(cor,jogador);
    }




}
    

