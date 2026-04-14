import { evaluate } from "mathjs";

export interface IteracionFalsa {
  iteracion: number;
  a: number;
  b: number;
  c: number;
  fa: number;
  fb: number;
  fc: number;
  error: number;
}

export function metodoFalsaPosicion(
  funcion: string,
  a: number,
  b: number,
  tolerancia: number,
  maxIter: number
) {
  let iteraciones: IteracionFalsa[] = [];
  let c = 0;
  let error = 100;

  let fa = evaluate(funcion, { x: a });
  let fb = evaluate(funcion, { x: b });

  if (fa * fb > 0) {
    throw new Error("El intervalo no es válido (no hay cambio de signo)");
  }

  for (let i = 1; i <= maxIter; i++) {
    let cAnterior = c;

    // 🔥 Fórmula clave de falsa posición
    c = b - (fb * (a - b)) / (fa - fb);

    let fc = evaluate(funcion, { x: c });

    if (i > 1) {
      error = Math.abs((c - cAnterior) / c) * 100;
    }

    iteraciones.push({
      iteracion: i,
      a,
      b,
      c,
      fa,
      fb,
      fc,
      error,
    });

    if (fc === 0 || error < tolerancia) break;

    if (fa * fc < 0) {
      b = c;
      fb = fc;
    } else {
      a = c;
      fa = fc;
    }
  }

  return {
    raiz: c,
    iteraciones,
  };
}