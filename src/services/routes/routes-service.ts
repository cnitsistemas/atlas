import api from "../api";

export async function fetchReportsRoutesApi({
  description,
  school,
  autorization,
  type,
  morning,
  afternoon,
  nocturnal
}: {
  description: any,
  school: any,
  autorization: string,
  type: any,
  morning: any,
  afternoon: any,
  nocturnal: any
}) {
  const url = `api/relatorio-rota?descricao=${description}&escola=${school}&tipo=${type}
    &matutino=${morning}&vespertino=${afternoon}&noturno=${nocturnal}`;
  const apiResponse = await api.get(url, {
    headers: {
      Authorization: autorization
    }
  });
  const response = apiResponse

  return response
};