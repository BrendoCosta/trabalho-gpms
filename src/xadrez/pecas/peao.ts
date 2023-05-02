import { Peca } from ".";
import { Imagem } from "..";
import {  Cor, Jogador } from "../enums";


export class Peao extends Peca {

    protected imagem: HTMLImageElement = Imagem.getInstancia().PEAO;

    constructor(cor: Cor, jogador: Jogador) {
        super(10,cor, jogador);
    }




}


