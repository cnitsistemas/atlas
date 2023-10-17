import PdfPrinter from 'pdfmake';
import { Roboto } from './fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import moment from 'moment';

export const createPdf = async (data: any): Promise<Buffer> => {
  console.log(data?.data)
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
            text: `Data e horário da emissão: ${moment(new Date()).format("DD/MM/YYYY HH:mm:ss")}`,
            style: 'date'
          }
        ]
      },
      { text: ['Relatório de rotas responsável por disponibilizar dados como descrição, escola, horário e tipo. É importante lembrar que o relatório só fica disponível enquanto é visualizado no navegador, após isso, é necessário emitir um novo.'], color: 'gray', italics: true, style: 'subheader' },
      {
        style: 'table',
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
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 10],
      },
      date: {
        fontSize: 11,
        margin: [0, 20, 0, 10],
      },
      subheader: {
        fontSize: 11,
        margin: [0, 10, 0, 5],
      },
      table: {
        fontSize: 11,
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