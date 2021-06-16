/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import PDFDocument from 'pdfkit';

class PDFDocumentWithTables extends PDFDocument {
  constructor(options) {
    super(options);
  }

  table(table, options = {}) {
    const startX = 50;
    let startY = this.y;

    const columnCount = table.headers.length;
    const columnSpacing = options.columnSpacing || 15;
    const rowSpacing = options.rowSpacing || 5;
    const usableWidth =
      options.width ||
      this.page.width - this.page.margins.left - this.page.margins.right;

    const prepareHeader = options.prepareHeader || (() => {});
    const prepareRow = options.prepareRow || (() => {});
    const columnContainerWidth = usableWidth / columnCount;
    const columnWidth = columnContainerWidth - columnSpacing;

    const computeRowHeight = row => {
      let result = 0;

      row.forEach(cell => {
        const cellHeight = this.heightOfString(cell, {
          width: columnWidth,
          align: 'left',
        });
        result = Math.max(result, cellHeight);
      });

      return result + rowSpacing;
    };

    const maxY = this.page.height - this.page.margins.bottom;

    let rowBottomY = 0;

    this.on('pageAdded', () => {
      startY = this.page.margins.top;
      rowBottomY = 0;
    });

    // Allow the user to override style for headers
    prepareHeader();

    // Check to have enough room for header and first rows
    if (startY + 3 * computeRowHeight(table.headers) > maxY) this.addPage();

    // Print all headers
    table.headers.forEach((header, i) => {
      this.text(header, startX + i * columnContainerWidth, startY, {
        width: columnWidth,
        align: 'left',
      });
    });

    // Refresh the y coordinate of the bottom of the headers row
    rowBottomY = Math.max(startY + computeRowHeight(table.headers), rowBottomY);

    // Separation line between headers and rows
    this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
      .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
      .lineWidth(2)
      .stroke();

    table.rows.forEach((row, i) => {
      const rowHeight = computeRowHeight(row);

      // Switch to next page if we cannot go any further because the space is over.
      // For safety, consider 3 rows margin instead of just one
      if (startY + 3 * rowHeight < maxY) startY = rowBottomY + rowSpacing;
      else this.addPage();

      // Allow the user to override style for rows
      prepareRow(row, i);

      // Print all cells of the current row
      row.forEach((cell, ii) => {
        this.text(cell, startX + ii * columnContainerWidth, startY, {
          width: columnWidth,
          align: 'left',
        });
      });

      // Refresh the y coordinate of the bottom of this row
      rowBottomY = Math.max(startY + rowHeight, rowBottomY);

      // Separation line between rows
      this.moveTo(startX, rowBottomY - rowSpacing * 0.5)
        .lineTo(startX + usableWidth, rowBottomY - rowSpacing * 0.5)
        .lineWidth(1)
        .opacity(0.7)
        .stroke()
        .opacity(1); // Reset opacity after drawing the line
    });

    this.x = startX;
    this.moveDown();

    return this;
  }
}

export default PDFDocumentWithTables;
