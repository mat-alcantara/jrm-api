import { Router, Request, Response } from 'express';

import PDFDocument from 'pdfkit';

const pdfRoutes = Router();

pdfRoutes.get('/generatePDF', async (req: Request, res: Response) => {
  const myDoc = new PDFDocument({ bufferPages: true });
  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-disposition': 'attachment;filename=test.pdf',
    'Content-Length': 1111,
  });
  myDoc.pipe(res);
  myDoc.font('Times-Roman').fontSize(12).text(`this is a test text`);
  myDoc.end();
  res.send(myDoc.toString());
});

export default pdfRoutes;
