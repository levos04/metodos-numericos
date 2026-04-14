import { evaluate, derivative } from "mathjs";

export interface IteracionNewton {
  iteracion: number;
  x: number;
  fx: number;
  dfx: number;
  error: number;
}

export function metodoNewton(
  funcion: string,
  x0: number,
  tolerancia: number,
  maxIter: number
) {
  let iteraciones: IteracionNewton[] = [];
  let x = x0;
  let error = 100;

  const derivada = derivative(funcion, "x").toString();

  for (let i = 1; i <= maxIter; i++) {
    let xAnterior = x;

    let fx = evaluate(funcion, { x });
    let dfx = evaluate(derivada, { x });

    if (dfx === 0) {
      throw new Error("La derivada es 0, no se puede continuar");
    }

    // 🔥 fórmula de Newton
    x = x - fx / dfx;

    if (i > 1) {
      error = Math.abs((x - xAnterior) / x) * 100;
    }

    iteraciones.push({
      iteracion: i,
      x,
      fx,
      dfx,
      error,
    });

    if (error < tolerancia) break;
  }

  return {
    raiz: x,
    iteraciones,
  };
}