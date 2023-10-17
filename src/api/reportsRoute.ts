import express, { Request, Response } from 'express';
import { createPdf, errorPdfHtmlTemplate } from '../services/pdf/pdf';
import { fetchReportsRoutesApi } from '../services/routes/routes-service';
import moment from 'moment';

const router = express.Router();

type ReportsReponse = any;

router.get<{}, ReportsReponse>('/', async (request: Request, response: Response) => {
  try {
    const description = request?.query?.descricao
    const school = ""
    const autorization = request?.rawHeaders[1]

    const data = await fetchReportsRoutesApi({ description: description, school: school, autorization: autorization })

    const binaryResult = await createPdf(data?.data);

    const filename = `relatorio${moment(new Date()).format('DD-MM-YYYY')}.pdf`;
    response.setHeader('Content-disposition', `attachment; filename=${filename}`);
    response.type('pdf').send(binaryResult);
  } catch (err: any) {
    console.log(err);
    response.send(errorPdfHtmlTemplate(err.message));
  }
});

export default router;
