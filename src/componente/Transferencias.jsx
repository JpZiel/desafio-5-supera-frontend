// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const Transferencias = () => {
  const [transferencias, setTransferencias] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [nome, setNomeOperador] = useState("");

  const fetchTransferencias = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/api/transferencias",
        {
          params: { page: "1", size: "5" },
        }
      );
      setTransferencias(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransferencias();

    console.log(transferencias);
  }, []);

  return (
    <div>
      <h1>Transferências</h1>
      <div>
        <label>Data Início:</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <label>Data Fim:</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNomeOperador(e.target.value)}
        />
        <button onClick={fetchTransferencias}>Pesquisar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transferencias.map((transferencia) => (
            <tr key={transferencia.id}>
              <td>{transferencia.id}</td>
              <td>{transferencia.origem}</td>
              <td>{transferencia.destino}</td>
              <td>{transferencia.data}</td>
              <td>{transferencia.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Transferencias;
