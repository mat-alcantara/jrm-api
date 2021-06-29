/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import getStream from 'get-stream';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';
import CustomerEntity from '@modules/customers/infra/typeorm/entities/Customer';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';
import PDFDocument from '../repositories/pdfkit.js';

interface IMaterialData {
  name: string;
}

export default class PDFKitProvider implements IPDFProvider {
  public async createPDF(
    orderToGeneratePDF: OrderEntity,
    customerData: CustomerEntity,
    materialData: IMaterialData[],
  ): Promise<Buffer> {
    const doc = new PDFDocument({ size: 'A4', bufferPages: true });

    // HEADER
    doc
      .font('Times-Bold')
      .fontSize(22)
      .text('SERVIÇO DE CORTE', { align: 'center' });

    doc
      .font('Helvetica')
      .fontSize(8)
      .text(
        'JRM Compensados | Frade: (24) 99964-4953  | Japuíba: (24) 99969-4543 | jrmcompensados@hotmail.com',
        { align: 'center' },
      )
      .moveDown(1.2);

    // Dados do cliente
    doc
      .font('Times-Bold')
      .fontSize(16)
      .text('Cliente', { align: 'left' })
      .moveDown(0.2);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Nome: ${customerData.name}`, { align: 'left', indent: 15 })
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(
        `Endereço: ${customerData.street}, ${customerData.area} - ${customerData.city}`,
        { align: 'left', indent: 15 },
      )
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Telefone: ${customerData.telephone[0]}`, {
        align: 'left',
        indent: 15,
      })
      .moveDown(1);

    // Dados do serviço
    doc
      .font('Times-Bold')
      .fontSize(16)
      .text('Serviço', { align: 'left' })
      .moveDown(0.2);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text('Codigo do Serviço: ', {
        align: 'left',
        continued: true,
        indent: 15,
      })
      .font('Helvetica-Bold')
      .text(`${orderToGeneratePDF.order_code}`)
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Tipo de Entrega: `, {
        align: 'left',
        indent: 15,
        continued: true,
      })
      .font('Helvetica-Bold')
      .text(`${orderToGeneratePDF.delivery_type}`)
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Vendedor: ${orderToGeneratePDF.seller}`, {
        align: 'left',
        indent: 15,
      })
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Loja do Pedido: ${orderToGeneratePDF.orderStore}`, {
        align: 'left',
        indent: 15,
      })
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Status do Pagamento: ${orderToGeneratePDF.paymentStatus}`, {
        align: 'left',
        indent: 15,
      })
      .moveDown(0.3);

    if (orderToGeneratePDF.ps) {
      doc
        .font('Helvetica')
        .fontSize(10)
        .text(`Observação: ${orderToGeneratePDF.ps}`, {
          align: 'left',
          indent: 15,
        })
        .moveDown(0.3);
    }

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Data de entrega: ${orderToGeneratePDF.deliveryDate}`, {
        align: 'left',
        indent: 15,
      })
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Valor total: R$ ${orderToGeneratePDF.price}`, {
        align: 'left',
        indent: 15,
      })
      .moveDown(1);

    const tableRows = [];

    for (let i = 0; i < orderToGeneratePDF.cutlist.length; i += 1) {
      tableRows.push([
        `${materialData[i].name}`,
        `${orderToGeneratePDF.cutlist[i].quantidade} - ${orderToGeneratePDF.cutlist[i].side_a_size} [${orderToGeneratePDF.cutlist[i].side_a_border}] x ${orderToGeneratePDF.cutlist[i].side_b_size} [${orderToGeneratePDF.cutlist[i].side_b_border}] | R$ ${orderToGeneratePDF.cutlist[i].price}`,
      ]);
    }

    const table = {
      headers: ['Material', 'Dados da Peça'],
      rows: tableRows,
    };

    doc.moveDown().table(table, {
      prepareRow: (row: any, i: any) => doc.font('Helvetica').fontSize(8),
      prepareHeader: (row: any, i: any) => doc.font('Times-Bold').fontSize(12),
      width: 500,
      columnSpacing: 5,
    });

    doc.end();

    const pdfStream = getStream.buffer(doc);

    return pdfStream;
  }
}
