import React, { useState } from "react";
// Componente principal de la app
export default function App() {
// Estados para manejar el saldo, inputs, historial y mensajes dinámicos
  const [saldo, setSaldo] = useState(0); // Saldo inicial
  const [cantidad, setCantidad] = useState(""); // Cantidad ingresada - Input del usuario
  const [motivo, setMotivo] = useState(""); // Motivo de la transacción
  const [mensaje, setMensaje] = useState(""); // Mensaje dinámico para mostrar notificaciones
  const [emoji, setEmoji] = useState(""); // Emoji dinámico que aparece en cada transacción
  const [historial, setHistorial] = useState([]); // Historial de transacciones
// Funciones para manejar depositos y retiros
  const manejarOperacion = (tipo) => {
    const monto = parseFloat(cantidad); // Convierte la cantidad ingresada a un número
    if (isNaN(monto) || monto <= 0) {
      setMensaje("⚠️ Por favor, ingresa una cantidad válida."); // Validació básica
      return;
    }
// Validación para retiros: Verificar si hay saldo suficiente
    if (tipo === "retirar" && monto > saldo) {
      setMensaje("❌ Saldo insuficiente para esta operación.");
      setEmoji("‼️"); // Emoji para saldo insuficiente
      setTimeout(() => setEmoji(""), 2000); // Ocultar emoji después de 2 segundos
      return;
    }
// Actualización del saldo depeniendo del tipo de operación
    const nuevoSaldo = tipo === "depositar" ? saldo + monto : saldo - monto;
    setSaldo(nuevoSaldo);
    setMensaje(
      tipo === "depositar"
        ? `✔️ ¡Has depositado $${monto}!`
        : `✔️ ¡Has retirado $${monto}!`
    );
// Mensaje dinámico según la operación
    // Mostrar emoji correspondiente
    setEmoji(tipo === "depositar" ? "🤑" : "💸");

    // Agregar la transacción al historial
    const nuevaTransaccion = {
      tipo, // Puede ser "depositar" o "retirar"
      monto, // El monto de la transacción - Cantidad de dinero
      motivo: motivo || "Sin motivo", // Motivo de la transacción o "Sin motivo" por defecto
      fecha: new Date().toLocaleString(), // Fecha y hora de la transacción
    };
    setHistorial([...historial, nuevaTransaccion]); // Actualizar el historial
// Lipiaos los inputs
    setCantidad(""); // Limpia el input
    setMotivo(""); // Limpia el motivo

    // Ocultar emoji después de 2 segundos
    setTimeout(() => setEmoji(""), 2000);
  };

  return (
    // Contenedor principal con fondo y gradiente
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#334155] via-[#1e293b] to-[#0f172a] relative">
      {/* Emoji grande */}
      {emoji && (
        <div className="absolute top-[240px] left-1/2 transform -translate-x-1/2 text-9xl animate-bounce">
          {emoji}
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🏦 Registro de Transacciones 💳
        </h1>

        {/* Saldo total */}
        <p className="text-xl font-bold text-center text-gray-700 mb-6">
          Saldo actual:{" "}
          <span className="text-3xl text-blue-800">${saldo}</span>
        </p>

        {/* Inputs para ingresar cantidad y motivo */}
        <div className="mb-6">
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Ingresa una cantidad"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ingresa el motivo (opcional)"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Botones de accón - depositar y retirar */}
        <div className="flex justify-around mb-6 relative">
          <button
            onClick={() => manejarOperacion("depositar")}
            className="bg-[#64748b] hover:bg-[#475569] text-white font-medium py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            Depositar
          </button>
          <button
            onClick={() => manejarOperacion("retirar")}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            Retirar
          </button>
        </div>

        {/* Mensaje dinámico */}
        {mensaje && (
          <p
            className={`text-center text-lg font-medium ${
              mensaje.includes("✔️") ? "text-blue-600" : "text-red-600"
            }`}
          >
            {mensaje}
          </p>
        )}

        {/* Historial de transacciones */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Historial</h2>
          <ul className="text-left text-gray-700">
            {historial.length === 0 ? (
              <p className="italic text-gray-500">No hay transacciones aún.</p>
            ) : (
              historial.map((transaccion, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between p-3 mb-3 rounded-lg shadow ${
                    transaccion.tipo === "depositar"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {/* Ícono - Detalles de la transacción */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xl ${
                        transaccion.tipo === "depositar"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaccion.tipo === "depositar" ? "🤑" : "💸"}
                    </span>
                    <div>
                      <p className="font-bold">
                        {transaccion.tipo === "depositar"
                          ? "Depósito"
                          : "Retiro"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {transaccion.fecha}
                      </p>
                    </div>
                  </div>

                  {/* Monto */}
                  <div>
                    <p className="font-bold text-lg">
                      ${transaccion.monto.toFixed(2)}
                    </p>
                    <p className="text-sm italic text-gray-600">
                      {transaccion.motivo}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
