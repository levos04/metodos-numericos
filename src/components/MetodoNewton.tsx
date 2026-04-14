import { useState } from "react";
import { metodoNewton } from "../utils/newton";

export default function MetodoNewton() {
  const [funcion, setFuncion] = useState("");
  const [x0, setX0] = useState("");
  const [tolerancia, setTolerancia] = useState("");
  const [iteracionesMax, setIteracionesMax] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState("");

  const calcular = () => {
    try {
      setError("");

      const res = metodoNewton(
        funcion,
        parseFloat(x0),
        parseFloat(tolerancia),
        parseInt(iteracionesMax)
      );

      setResultado(res);
    } catch (err: any) {
      setError(err.message);
      setResultado(null);
    }
  };

  const limpiar = () => {
    setFuncion("");
    setX0("");
    setTolerancia("");
    setIteracionesMax("");
    setResultado(null);
    setError("");
  };

  return (
    <div>
      <h2>Método de Newton-Raphson</h2>

      <input
        placeholder="f(x) = x^3 - x - 2"
        value={funcion}
        onChange={(e) => setFuncion(e.target.value)}
      />

      <input
        placeholder="Valor inicial x0"
        value={x0}
        onChange={(e) => setX0(e.target.value)}
      />

      <input
        placeholder="Tolerancia (%)"
        value={tolerancia}
        onChange={(e) => setTolerancia(e.target.value)}
      />

      <input
        placeholder="Iteraciones máximas"
        value={iteracionesMax}
        onChange={(e) => setIteracionesMax(e.target.value)}
      />

      <br /><br />

      <button onClick={calcular}>Calcular</button>
      <button onClick={limpiar}>Limpiar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {resultado && (
        <div>
          <h3>Raíz aproximada: {resultado.raiz}</h3>

          <table border={1}>
            <thead>
              <tr>
                <th>i</th>
                <th>x</th>
                <th>f(x)</th>
                <th>f'(x)</th>
                <th>Error %</th>
              </tr>
            </thead>
            <tbody>
              {resultado.iteraciones.map((it: any) => (
                <tr key={it.iteracion}>
                  <td>{it.iteracion}</td>
                  <td>{it.x.toFixed(6)}</td>
                  <td>{it.fx.toFixed(6)}</td>
                  <td>{it.dfx.toFixed(6)}</td>
                  <td>{it.error.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}