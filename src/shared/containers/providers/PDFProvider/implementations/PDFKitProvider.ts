import fs from 'fs';
import PDFDocument from 'pdfkit';
import OrderEntity from '@modules/orders/infra/typeorm/entities/OrderEntity';
import IPDFProvider from '@shared/containers/providers/PDFProvider/models/IPDFProvider';

export default class PDFKitProvider implements IPDFProvider {
  public async createPDF(orderToGeneratePDF: OrderEntity): Promise<void> {
    const doc = new PDFDocument({ size: 'A4' });

    doc.pipe(fs.createWriteStream('output.pdf'));

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

    doc
      .font('Times-Bold')
      .fontSize(16)
      .text('Cliente', { align: 'left' })
      .moveDown(0.2);

    doc
      .font('Courier')
      .fontSize(12)
      .text('Nome: Mateus Alcantara de Castro', { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text(
        'Endereço: Travessa dos Coqueiros n° 40, Frade - Angra dos Reis - Rio de Janeiro',
        { align: 'left' },
      )
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text('Telefone: 24999710064', { align: 'left' })
      .moveDown(1);

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
      .text('112')
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text('Vendedor: Mateus Alcantara', { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text('Loja do Pedido: Frade', { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text('Status do Pagamento: Pago', { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text('Observação: Entregar na casa do cliente', { align: 'left' })
      .moveDown(0.3);

    doc
      .font('Courier')
      .fontSize(12)
      .text('Valor: R$ 600,00', { align: 'left' })
      .moveDown(1);

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
