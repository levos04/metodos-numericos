interface Props {
  setMetodo: (metodo: string) => void;
}

export default function Menu({ setMetodo }: Props) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Métodos Numéricos</h1>
      <p style={styles.subtitle}>Selecciona un método</p>

      <div style={styles.buttons}>
        <button style={styles.button} onClick={() => setMetodo("biseccion")}>
          Método de Bisección
        </button>

        <button style={styles.button} onClick={() => setMetodo("falsa")}>
          Falsa Posición
        </button>

        <button style={styles.button} onClick={() => setMetodo("newton")}>
          Newton-Raphson
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center" as const,
    marginTop: "50px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    alignItems: "center",
  },
  button: {
    padding: "12px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#161C78",
    color: "white",
    width: "250px",
  },
};