import express, { Request, Response } from 'express';
import { createFrequencyPdf, errorPdfHtmlTemplate } from '../services/pdf/pdf';
import moment from 'moment';
import { fetchReportsFrequencyApi } from '../services/routes/frequency-service';

const router = express.Router();

type ReportsReponse = any;

router.get<{}, ReportsReponse>('/', async (request: Request, response: Response) => {
  try {
    const route = request?.query?.rota || ''
    const shift = request?.query.turno || ''
    const fromDataChamada = request?.query.from_data_chamada || ''
    const toDataChamada = request?.query.to_data_chamada || ''
    const autorization = request?.rawHeaders[1]

    const data = await fetchReportsFrequencyApi({
      autorization: autorization,
      route: route,
      shift: shift,
      fromDataChamada: fromDataChamada,
      toDataChamada: toDataChamada
    })

    console.log(data)
    const binaryResult = await createFrequencyPdf(data?.data);

    const filename = `relatorio${moment(new Date()).format('DD-MM-YYYY')}.pdf`;
    response.setHeader('Content-disposition', `attachment; filename=${filename}`);
    response.type('pdf').send(binaryResult);
  } catch (err: any) {
    console.log(err);
    response.send(errorPdfHtmlTemplate(err.message));
  }
});

export default router;
