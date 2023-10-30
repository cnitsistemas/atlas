import api from "../api";

export async function fetchReportsStudantsApi({
  name,
  school,
  autorization,
  route,
  shift,
}: {
  name: any,
  school: any,
  autorization: string,
  route: any,
  shift: any,
}) {
  const url = `api/relatorio-alunos?nome=${name}&escola=${school}&rota=${route}&turno=${shift}`;
  const apiResponse = await api.get(url, {
    headers: {
      Authorization: autorization
    }
  });
  const response = apiResponse

  return response
};