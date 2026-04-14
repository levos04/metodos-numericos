import { useState } from "react";
import Menu from "./components/Menu";
import MetodoBiseccion from "./components/MetodoBiseccion";
import MetodoFalsaPosicion from "./components/MetodoFalsaPosicion";
import MetodoNewton from "./components/MetodoNewton";

function App() {
  const [metodo, setMetodo] = useState<string>("menu");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f7fb",
      padding: "20px"
    }}>
      {metodo === "menu" && <Menu setMetodo={setMetodo} />}

      {metodo === "biseccion" && (
        <>
          <button onClick={() => setMetodo("menu")}>⬅ Volver</button>
          <MetodoBiseccion />
        </>
      )}

      {metodo === "falsa" && (
        <>
          <button onClick={() => setMetodo("menu")}>⬅ Volver</button>
          <MetodoFalsaPosicion />
        </>
      )}

      {metodo === "newton" && (
        <>
          <button onClick={() => setMetodo("menu")}>⬅ Volver</button>
          <MetodoNewton />
        </>
      )}
    </div>
  );
}

export default App;