import express, { Request, Response } from 'express';
import { createPdfStudents, errorPdfHtmlTemplate } from '../services/pdf/pdf';
import moment from 'moment';
import { fetchReportsStudantsApi } from '../services/routes/studants-service';

const router = express.Router();

type ReportsReponse = any;

router.get<{}, ReportsReponse>('/', async (request: Request, response: Response) => {
  try {
    const name = request?.query?.nome || ''
    const school = request?.query?.escola || ''
    const route = request?.query?.rota || ''
    const shift = request?.query.turno || ''
    const autorization = request?.rawHeaders[1]

    const data = await fetchReportsStudantsApi({
      name: name,
      school: school,
      autorization: autorization,
      route: route,
      shift: shift
    })

    const binaryResult = await createPdfStudents(data?.data);

    const filename = `relatorio${moment(new Date()).format('DD-MM-YYYY')}.pdf`;
    response.setHeader('Content-disposition', `attachment; filename=${filename}`);
    response.type('pdf').send(binaryResult);
  } catch (err: any) {
    console.log(err);
    response.send(errorPdfHtmlTemplate(err.message));
  }
});

export default router;
