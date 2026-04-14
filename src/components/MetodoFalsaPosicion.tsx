import { useState } from "react";
import { metodoFalsaPosicion } from "../utils/falsaPosicion";

export default function MetodoFalsaPosicion() {
  const [funcion, setFuncion] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [tolerancia, setTolerancia] = useState("");
  const [iteracionesMax, setIteracionesMax] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState("");

  const calcular = () => {
    if (!funcion) return setError("Falta la función");
    if (!a) return setError("Falta el valor de a");
    if (!b) return setError("Falta el valor de b");
    if (!tolerancia) return setError("Falta la tolerancia");
    if (!iteracionesMax) return setError("Faltan las iteraciones máximas");

    try {
      setError("");

      const res = metodoFalsaPosicion(
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
      <h2>Método de Falsa Posición</h2>

      <input
        placeholder="f(x) = x^3 - x - 2"
        value={funcion}
        onChange={(e) => setFuncion(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        step="any" 
        placeholder="a" 
        value={a} 
        onChange={(e) => setA(e.target.value)} 
        style={inputStyle}
      />

      <input
        type="number"
        step="any" 
        placeholder="b" 
        value={b} 
        onChange={(e) => setB(e.target.value)} 
        style={inputStyle}
      />

      <input
        type="number"
        step="any"
        placeholder="Tolerancia decimal"
        value={tolerancia}
        onChange={(e) => setTolerancia(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        step="any"
        placeholder="Iteraciones máximas"
        value={iteracionesMax}
        onChange={(e) => setIteracionesMax(e.target.value)}
        style={inputStyle}
      />

      <br /><br />

      <button onClick={calcular} style={buttonStyle}>
        Calcular
      </button>
      <button onClick={limpiar} style={buttonStyle}>
        Limpiar
      </button>

      {error && (
        <div style={{
          background: "#ffe5e5",
          color: "#b00020",
          padding: "10px",
          borderRadius: "6px",
          marginTop: "10px"
        }}>
          ⚠ {error}
        </div>
      )}

      {resultado && !error && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}      
        >
          <h3>Raíz aproximada: {resultado.raiz}</h3>

          <table style={{
            marginTop: "20px",
            borderCollapse: "collapse",
            width: "100%"
          }} 
          border={1}
          >
            <thead>
              <tr>
                <th style={{ background: "#161C78", color: "white", padding: "8px" }}>i</th>
                <th style={{ background: "#161C78", color: "white", padding: "8px" }}>a</th>
                <th style={{ background: "#161C78", color: "white", padding: "8px" }}>b</th>
                <th style={{ background: "#161C78", color: "white", padding: "8px" }}>c</th>
                <th style={{ background: "#161C78", color: "white", padding: "8px" }}>Error %</th>
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

const inputStyle = {
  padding: "10px",
  margin: "5px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "180px"
};

const buttonStyle = {
  padding: "10px 15px",
  margin: "10px 5px",
  borderRadius: "6px",
  border: "none",
  background: "#FFE816",
  cursor: "pointer",
  fontWeight: "bold"
};