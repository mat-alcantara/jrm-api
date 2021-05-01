import fs from 'fs';
import PDFDocument from 'pdfkit';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';
import CustomerEntity from '@modules/customers/infra/typeorm/entities/Customer';
import MaterialEntity from '@modules/materials/infra/typeorm/entities/MaterialEntity';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';

export default class PDFKitProvider implements IPDFProvider {
  public async createPDF(
    orderToGeneratePDF: OrderEntity,
    customerData: CustomerEntity,
    materialData: MaterialEntity[],
  ): Promise<void> {
    const doc = new PDFDocument({ size: 'A4' });

    doc.pipe(fs.createWriteStream('output.pdf'));

    // HEADER
    doc
      .font('Times-Bold')
      .fontSize(24)
      .text('SERVIÇO DE CORTE', { align: 'center' });

    doc
      .font('Courier')
      .fontSize(10)
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
      .font('Courier')
      .fontSize(12)
      .text(`Nome: ${customerData.name}`, { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text(
        `Endereço: ${customerData.street}, ${customerData.area} - ${customerData.city}`,
        { align: 'left' },
      )
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text(`Telefone: ${customerData.telephone[0]}`, { align: 'left' })
      .moveDown(1);

    // Dados do serviço
    doc
      .font('Times-Bold')
      .fontSize(16)
      .text('Serviço', { align: 'left' })
      .moveDown(0.2);

    doc
      .font('Courier')
      .fontSize(12)
      .text('Codigo do Serviço: ', { align: 'left', continued: true })
      .font('Courier-Bold')
      .text(`${orderToGeneratePDF.order_code}`)
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text(`Vendedor: ${orderToGeneratePDF.seller}`, { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text(`Loja do Pedido: ${orderToGeneratePDF.orderStore}`, {
        align: 'left',
      })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text(`Status do Pagamento: ${orderToGeneratePDF.paymentStatus}`, {
        align: 'left',
      })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text(`Observação: ${orderToGeneratePDF.ps}`, { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text(`Valor: ${orderToGeneratePDF.price}`, { align: 'left' })
      .moveDown(1);

    // Dados das peças
    doc
      .font('Times-Bold')
      .fontSize(16)
      .text('Lista de Peças', { align: 'left' })
      .moveDown(0.2);

    doc
      .font('Courier-BoldOblique')
      .fontSize(12)
      .text('Qtd - Material - Lado A [Fita A] x Lado B [Fita B] - Valor', {
        align: 'left',
      })
      .moveDown(0.4);

    for (let i = 0; i < orderToGeneratePDF.cutlist.length; i += 1) {
      doc
        .font('Courier')
        .fontSize(12)
        .text(
          `${orderToGeneratePDF.cutlist[i].quantidade} - ${materialData[i].name} - ${orderToGeneratePDF.cutlist[i].side_a_size} [${orderToGeneratePDF.cutlist[i].side_a_border}] x ${orderToGeneratePDF.cutlist[i].side_b_size} [${orderToGeneratePDF.cutlist[i].side_b_border}] - R$ ${orderToGeneratePDF.cutlist[i].price}`,
          {
            align: 'left',
          },
        )
        .moveDown(0.2);
    }

    doc
      .font('Courier')
      .fontSize(12)
      .text('5 - MDF Comum 15mm - 400 [2] x 200 [4] - R$ 200,00', {
        align: 'left',
      })
      .moveDown(0.2);

    doc
      .font('Courier')
      .fontSize(12)
      .text('5 - MDF Comum 15mm - 400 [2] x 200 [4] - R$ 200,00', {
        align: 'left',
      })
      .moveDown(0.2);

    doc.end();
  }
}
