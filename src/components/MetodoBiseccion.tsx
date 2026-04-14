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
  const [loading, setLoading] = useState(false);

  const calcular = async () => {
    if (!funcion) return setError("Falta la función");
    if (!a) return setError("Falta el valor de a");
    if (!b) return setError("Falta el valor de b");
    if (!tolerancia) return setError("Falta la tolerancia");
    if (!iteracionesMax) return setError("Faltan las iteraciones máximas");

    try {
      setError("");
      setLoading(true);

      // Simulate async if needed, but for now sync
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
    } finally {
      setLoading(false);
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
    <div className="metodo-container">
      <h2>Método de Bisección</h2>

      <form className="input-form">
        <div className="input-group">
          <label htmlFor="funcion">Función f(x):</label>
          <input
            id="funcion"
            type="text"
            placeholder="Ej: x^3 - x - 2"
            value={funcion}
            onChange={(e) => setFuncion(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="a">Valor de a:</label>
          <input
            id="a"
            type="number"
            step="any"
            placeholder="Ej: 1"
            value={a}
            onChange={(e) => setA(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="b">Valor de b:</label>
          <input
            id="b"
            type="number"
            step="any"
            placeholder="Ej: 2"
            value={b}
            onChange={(e) => setB(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="tolerancia">Tolerancia:</label>
          <input
            id="tolerancia"
            type="number"
            step="any"
            placeholder="Ej: 0.001"
            value={tolerancia}
            onChange={(e) => setTolerancia(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="iteraciones">Iteraciones máximas:</label>
          <input
            id="iteraciones"
            type="number"
            placeholder="Ej: 100"
            value={iteracionesMax}
            onChange={(e) => setIteracionesMax(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button type="button" onClick={calcular} disabled={loading}>
            {loading ? "Calculando..." : "Calcular"}
          </button>
          <button type="button" onClick={limpiar}>Limpiar</button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          ⚠ {error}
        </div>
      )}

      {resultado && !error && (
        <div className="result-container">
          <h3>Raíz aproximada: {resultado.raiz.toFixed(6)}</h3>

          <div className="table-container">
            <table className="result-table">
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
                    <td>{it.a.toFixed(6)}</td>
                    <td>{it.b.toFixed(6)}</td>
                    <td>{it.c.toFixed(6)}</td>
                    <td>{it.error.toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}