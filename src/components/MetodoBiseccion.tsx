import { useState } from "react";
import { metodoBiseccion } from "../utils/biseccion";

export default function MetodoBiseccion() {
  const [funcion, setFuncion] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [tolerancia, setTolerancia] = useState("");
  const [iteracionesMax, setIteracionesMax] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState("");

  const calcular = () => {
    try {
      setError("");

      const res = metodoBiseccion(
        funcion,
        parseFloat(a),
        parseFloat(b),
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
    setA("");
    setB("");
    setTolerancia("");
    setIteracionesMax("");
    setResultado(null);
    setError("");
  };

  return (
    <div>
      <h2>Método de Bisección</h2>

      <input
        placeholder="f(x) = x^3 - x - 2"
        value={funcion}
        onChange={(e) => setFuncion(e.target.value)}
      />

      <input
        placeholder="a"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      <input
        placeholder="b"
        value={b}
        onChange={(e) => setB(e.target.value)}
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
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>Error %</th>
              </tr>
            </thead>
            <tbody>
              {resultado.iteraciones.map((it: any) => (
                <tr key={it.iteracion}>
                  <td>{it.iteracion}</td>
                  <td>{it.a.toFixed(4)}</td>
                  <td>{it.b.toFixed(4)}</td>
                  <td>{it.c.toFixed(4)}</td>
                  <td>{it.error.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}