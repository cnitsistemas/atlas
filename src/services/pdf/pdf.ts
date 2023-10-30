import PdfPrinter from 'pdfmake';
import { Roboto } from './fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import moment from 'moment';
import { DEFAULT_LOGO } from './img';

export const createPdfStudents = async (data: any): Promise<Buffer> => {
  const students = data?.data
  const body = [];

  if (students && students.length > 0) {
    for await (let student of students) {
      const row = new Array();
      row.push(student.nome)
      row.push(student.serie)
      row.push(student.turno)
      row.push(student.nome_escola)
      row.push(student.route?.nome || student.rota_id)
      row.push(student.endereco)

      body.push(row);
    }
  }

  const docDefinition: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: DEFAULT_LOGO,
            width: 120
          },
          [
            { text: `Relatório de Alunos`, style: 'header' },
            {
              text: `Data e horário da emissão: ${moment(new Date()).format("DD/MM/YYYY HH:mm:ss")}`,
              style: 'date'
            },
          ]
        ]
      },
      { text: ['Relatório de alunos é responsável por disponibilizar dados como nome, escola, horário e turno. É importante lembrar que o relatório só fica disponível enquanto é visualizado no navegador, após isso, é necessário emitir um novo.'], color: 'gray', italics: true, style: 'subheader' },
      {
        style: 'table',
        table: {
          headerRows: 1,
          widths: [220, '*', 100, '*', '*', '*'],
          body: [
            [
              { text: 'Nome', style: 'tableHeader' },
              { text: 'Série', style: 'tableHeader' },
              { text: 'Turno', style: 'tableHeader' },
              { text: 'Escola', style: 'tableHeader' },
              { text: 'Rota', style: 'tableHeader' },
              { text: 'Endereço', style: 'tableHeader' },
            ],
            ...body
          ]
        }
      },
    ],
    styles: {
      header: {
        fontSize: 13,
        bold: true,
        margin: [0, 20, 0, 10],
        alignment: 'right',
      },
      date: {
        fontSize: 9,
        margin: [0, 0, 0, 0],
        alignment: 'right',
      },
      subheader: {
        fontSize: 9,
        margin: [0, 10, 0, 5],
      },
      tableHeader: {
        bold: true,
      },
      table: {
        fontSize: 9,
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

      const hora_ida_inicio = route.hora_ida_inicio ? route.hora_ida_inicio : '00:00'
      const hora_ida_termino = route.hora_ida_termino ? route.hora_ida_termino : '00:00'
      const hora_volta_inicio = route.hora_volta_inicio ? route.hora_volta_inicio : '00:00'
      const hora_volta_termino = route.hora_volta_termino ? route.hora_volta_termino : '00:00'

      const departureTime = `${hora_ida_inicio} - ${hora_ida_termino}`
      const returnTime = `${hora_volta_inicio} - ${hora_volta_termino}`
      row.push(departureTime)
      row.push(returnTime)

      body.push(row);
    }
  }

  const docDefinition: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: DEFAULT_LOGO,
            width: 120
          },
          [
            { text: `Relatório de Rotas`, style: 'header' },
            {
              text: `Data e horário da emissão: ${moment(new Date()).format("DD/MM/YYYY HH:mm:ss")}`,
              style: 'date'
            },
          ]
        ]
      },
      { text: ['Relatório de rotas responsável por disponibilizar dados como descrição, escola, horário e tipo. É importante lembrar que o relatório só fica disponível enquanto é visualizado no navegador, após isso, é necessário emitir um novo.'], color: 'gray', italics: true, style: 'subheader' },
      {
        style: 'table',
        table: {
          headerRows: 1,
          widths: [220, '*', 100, '*', '*', '*'],
          body: [
            [
              { text: 'Descrição', style: 'tableHeader' },
              { text: 'Tipo', style: 'tableHeader' },
              { text: 'Escola', style: 'tableHeader' },
              { text: 'Quantidade de Alunos', style: 'tableHeader' },
              { text: 'Horário de Ida', style: 'tableHeader' },
              { text: 'Horário de Volta', style: 'tableHeader' }
            ],
            ...body
          ]
        }
      },
    ],
    styles: {
      header: {
        fontSize: 13,
        bold: true,
        margin: [0, 20, 0, 10],
        alignment: 'right',
      },
      date: {
        fontSize: 9,
        margin: [0, 0, 0, 0],
        alignment: 'right',
      },
      subheader: {
        fontSize: 9,
        margin: [0, 10, 0, 5],
      },
      tableHeader: {
        bold: true,
      },
      table: {
        fontSize: 9,
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

export const createFrequencyPdf = async (data: any): Promise<Buffer> => {
  const frequencies = data?.data

  const interationFrquency =
    frequencies &&
    frequencies.length > 0 &&
    frequencies.map((frequency: any) => {
      const body = [];

      if (frequency.frequencias && frequency.frequencias.length > 0) {
        for (let item of frequency.frequencias) {
          const row = new Array();

          const presente = item.presenca === 1 ? 'Presente' : 'Ausente'
          row.push(item.aluno.nome)
          row.push(item.aluno.nome_escola)
          row.push(presente)

          body.push(row);
        }
      }

      return [
        {
          alignment: 'justify',
          columns: [
            [
              {
                text: `Data da Chamada: ${moment(frequency.data_chamada).format("DD/MM/YYYY HH:mm:ss")}`,
                style: 'infos'
              },
              {
                text: `Turno: ${frequency.turno}`,
                style: 'infos'
              },
              {
                text: `Finalizada: ${frequency.realizada === 1 ? 'Sim' : 'Não'}`,
                style: 'infos'
              },
            ],
            [
              {
                text: `Rota: ${frequency.route.nome}`,
                style: 'infos'
              },
              {
                text: `Sentido: ${frequency.sentido}`,
                style: 'infos'
              },
              {
                text: `Horário: ${frequency.horario}`,
                style: 'infos'
              },
            ]
          ]
        },
        {
          style: 'table',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: [
              [
                { text: 'Nome do Aluno', style: 'tableHeader' },
                { text: 'Escola', style: 'tableHeader' },
                { text: 'Presença', style: 'tableHeader' }
              ],
              ...body
            ]
          },
          pageBreak: "after"
        },
      ]
    }) || []
  const docDefinition: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    content: [
      {
        alignment: 'justify',
        columns: [
          {
            image: DEFAULT_LOGO,
            width: 120
          },
          [
            { text: `Relatório de Frequência`, style: 'header' },
            {
              text: `Data e horário da emissão: ${moment(new Date()).format("DD/MM/YYYY HH:mm:ss")}`,
              style: 'date'
            },
          ]
        ]
      },
      { text: ['Relatório de rotas responsável por disponibilizar dados como descrição, escola, horário e tipo. É importante lembrar que o relatório só fica disponível enquanto é visualizado no navegador, após isso, é necessário emitir um novo.'], color: 'gray', italics: true, style: 'subheader' },
      ...interationFrquency
    ],
    styles: {
      header: {
        fontSize: 13,
        bold: true,
        margin: [0, 20, 0, 10],
        alignment: 'right',
      },
      date: {
        fontSize: 9,
        margin: [0, 0, 0, 0],
        alignment: 'right',
      },
      infos: {
        fontSize: 10,
        margin: [0, 0, 0, 2],
      },
      freq: {
        fontSize: 10,
        margin: [0, 0, 0, 2],
        color: 'red'
      },
      subheader: {
        fontSize: 9,
        margin: [0, 10, 0, 5],
      },
      tableHeader: {
        bold: true,
      },
      table: {
        fontSize: 9,
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
<h2>Ocorreu um erro ao exibir o documento PDF.</h2>
Error message: ${error}`;