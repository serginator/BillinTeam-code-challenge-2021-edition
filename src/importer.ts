import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { Invoice, InvoiceError, ImportResult } from './types';
import { validate } from './validate';

export class Importer {
  async import(filePath: string): Promise<ImportResult> {
    const ok: Invoice[] = [];
    const ko: InvoiceError[] = [];
    try {
      const file = path.join(__dirname, '..', 'files', filePath);
      const fileContent = fs.readFileSync(file, 'utf8');
      const headers = ['code', 'issuedDate', 'ownerName', 'contactName', 'subtotal', 'taxes', 'total', 'status'];

      const invoices = parse(fileContent, {
        delimiter: ';',
        columns: headers,
        fromLine: 2,
        trim: true,
        cast: (value, context) => {
          if (context.column === 'subtotal' || context.column === 'taxes' || context.column === 'total') {
            return Number(value);
          }
          return value;
        }
      });
      let line = 1;
      for await (const invoice of invoices) {
        const errors = validate(invoice);
        errors ? ko.push({line: line, errors: errors}) : ok.push(invoice);
        line++;
      }
    } catch (error) {
      console.error(error);
    } finally {
      return {
        ok,
        ko
      };
    }
  }
}
