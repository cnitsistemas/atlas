import api from "../api";

export async function fetchReportsRoutesApi({ description, autorization }:
  { description: any, autorization: string }) {
  const url = `api/relatorio-rota?descricao=${description}`;
  const apiResponse = await api.get(url, {
    headers: {
      Authorization: autorization
    }
  });
  const response = apiResponse

  return response
};