// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const Transferencias = () => {
  const [transferencias, setTransferencias] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [nome, setNomeOperador] = useState("");
  const [numeroDaConta, setIdConta] = useState("");

  const fetchTransferencias = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8083/banco/v1/transferencias",
        {
          params: {
            id_conta: numeroDaConta,
            data_inicio: dataInicio,
            data_fim: dataFim,
            nome_operador: nome,
          },
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
        <label>Numero Conta:</label>
        <input
          type="text"
          value={numeroDaConta}
          onChange={(e) => setIdConta(e.target.value)}
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
            <th>Nome</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transferencias?.map((transferencia) => (
            <tr key={transferencia.id}>
              <td>{transferencia.id}</td>
              <td>{transferencia.nome_operador_transacao}</td>
              <td>{transferencia.tipo}</td>
              <td>{transferencia.data_transferencia}</td>
              <td>{transferencia.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Transferencias;
