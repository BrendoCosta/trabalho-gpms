import { Peca } from ".";
import { Imagem } from "..";
import {  Cor, Jogador } from "../enums";


export class Rainha extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().RAINHA;

    constructor(cor: Cor, jogador: Jogador){
        super(90,cor,jogador);
    }




}
    

