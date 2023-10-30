import api from "../api";

export async function fetchReportsFrequencyApi({
  toDataChamada,
  fromDataChamada,
  autorization,
  route,
  shift,
}: {
  toDataChamada: any,
  fromDataChamada: any,
  autorization: string,
  route: any,
  shift: any,
}) {
  const url = `api/relatorio-frequencias?from_data_chamada=${fromDataChamada}&to_data_chamada=${toDataChamada}&rota=${route}&turno=${shift}`;
  const apiResponse = await api.get(url, {
    headers: {
      Authorization: autorization
    }
  });
  const response = apiResponse

  return response
};