export function verificarPosicao({ posicao }: { posicao: [number, number]; }): boolean {
    const [x, y] = posicao;
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }