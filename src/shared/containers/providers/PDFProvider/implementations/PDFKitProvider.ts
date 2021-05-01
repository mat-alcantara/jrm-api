import fs from 'fs';
import PDFDocument from 'pdfkit';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';

export default class PDFKitProvider implements IPDFProvider {
  public async createPDF(orderToGeneratePDF: OrderEntity): Promise<void> {
    const doc = new PDFDocument({ size: 'A4' });

    doc.pipe(fs.createWriteStream('output.pdf'));

    /*
     * PDF DATA
     */

    doc.end();
  }
}
