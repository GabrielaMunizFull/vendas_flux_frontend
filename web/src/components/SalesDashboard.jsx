import { useEffect, useState } from 'react';
import api from '../services/api';

export default function SalesDashboard() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("CANCELED");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSales() {
      try {
        const startDate = "2025-05-01T00:00:00";
        const endDate = "2025-05-10T23:59:59";

        const res = await api.get(`/sales`, {
          params: { status, startDate, endDate },
        });

        setSales(res.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar vendas");
      } finally {
        setLoading(false);
      }
    }

    fetchSales();
  }, [status]);

  if (loading) return <p className="text-blue-600">Carregando vendas...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">📊 Dashboard de Vendas</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Data</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((venda, index) => (
              <tr key={index} className="hover:bg-gray-100 border-t">
                <td className="p-3">{venda.id || '—'}</td>
                <td className="p-3">{venda.clientName || '—'}</td>
                <td className="p-3">{venda.status || '—'}</td>
                <td className="p-3">{venda.date || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
