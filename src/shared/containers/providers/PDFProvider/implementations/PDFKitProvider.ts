import getStream from 'get-stream';
import PDFDocument from 'pdfkit';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';
import CustomerEntity from '@modules/customers/infra/typeorm/entities/Customer';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';

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
        'JRM Compensados | Frade: (24) 99964-4953  | Japuíba: (24) 99969-4543 ',
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
      .text(`Nome: ${customerData.name}`, { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(
        `Endereço: ${customerData.street}, ${customerData.area} - ${customerData.city}`,
        { align: 'left' },
      )
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Telefone: ${customerData.telephone[0]}`, { align: 'left' })
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
      .text('Codigo do Serviço: ', { align: 'left', continued: true })
      .font('Helvetica-Bold')
      .text(`${orderToGeneratePDF.order_code}`)
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Vendedor: ${orderToGeneratePDF.seller}`, { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Loja do Pedido: ${orderToGeneratePDF.orderStore}`, {
        align: 'left',
      })
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Status do Pagamento: ${orderToGeneratePDF.paymentStatus}`, {
        align: 'left',
      })
      .moveDown(0.3);

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Tipo de Entrega: ${orderToGeneratePDF.delivery_type}`, {
        align: 'left',
      })
      .moveDown(0.3);

    if (orderToGeneratePDF.ps) {
      doc
        .font('Helvetica')
        .fontSize(10)
        .text(`Observação: ${orderToGeneratePDF.ps}`, { align: 'left' })
        .moveDown(0.3);
    }

    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Valor total: R$ ${orderToGeneratePDF.price}`, { align: 'left' })
      .moveDown(1);

    // Dados das peças
    doc
      .font('Times-Bold')
      .fontSize(16)
      .text('Lista de Peças', { align: 'left' })
      .moveDown(0.2);

    for (let i = 0; i < orderToGeneratePDF.cutlist.length; i += 1) {
      doc
        .font('Helvetica')
        .fontSize(9)
        .text(
          `${orderToGeneratePDF.cutlist[i].quantidade} - ${materialData[i].name} - ${orderToGeneratePDF.cutlist[i].side_a_size} [${orderToGeneratePDF.cutlist[i].side_a_border}] x ${orderToGeneratePDF.cutlist[i].side_b_size} [${orderToGeneratePDF.cutlist[i].side_b_border}] | R$ ${orderToGeneratePDF.cutlist[i].price}`,
          {
            align: 'left',
          },
        )
        .moveDown(0.2);
    }

    doc.end();

    const pdfStream = getStream.buffer(doc);

    return pdfStream;
  }
}
