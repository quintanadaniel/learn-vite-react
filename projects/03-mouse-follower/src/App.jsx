import { useEffect, useState } from "react";
import "./App.css";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // pointer move
  useEffect(() => {
    console.log("efecto", { enabled });
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }
    // limpiamos el el evento montado, y desmontamos un componente, podmos hacer un return en el useEffect
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  // change body class
  useEffect(() => {
    document.body.classList.toggle("no-cursor", enabled)

    return () => {
      document.body.classList.remove("no-cursor")
    }
  })

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundColor: "#09f",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};

function App() {
  return <FollowMouse />;
}

export default App;
