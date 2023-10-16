import PdfPrinter from 'pdfmake';
import { Roboto } from './fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import moment from 'moment';

export const createPdf = async (data: any): Promise<Buffer> => {
  const routes = data?.data
  const body = [];

  if (routes && routes.length > 0) {
    for await (let route of routes) {
      const row = new Array();
      row.push(route.nome)
      row.push(route.tipo)
      row.push(route.escolas)
      row.push(route.quantidade_alunos)

      body.push(row);
    }
  }

  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        alignment: 'justify',
        columns: [
          { text: `Relatório de rotas`, style: 'header' },
          {
            text: `Data e horário da emissão: ${moment(new Date()).format("DD-MM-YYYY HH:mm:ss")}`
          }
        ]
      },
      'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
      { text: ['It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there\'s not enough space for the first row to be rendered here'], color: 'gray', italics: true },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: [220, '*', 100, '*'],
          body: [
            [
              { text: 'Nome', style: 'tableHeader' },
              { text: 'Tipo', style: 'tableHeader' },
              { text: 'Escola', style: 'tableHeader' },
              { text: 'Quantidade de Alunos', style: 'tableHeader' }
            ],
            ...body
          ]
        }
      },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
    },
  };

  const printer = new PdfPrinter({ Roboto });
  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  return new Promise((resolve, reject) => {
    try {
      const chunks: Uint8Array[] = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    } catch (err) {
      reject(err);
    }
  });
};

export const errorPdfHtmlTemplate = (error: string): string => `
<h2>There was an error displaying the PDF document.</h2>
Error message: ${error}`;