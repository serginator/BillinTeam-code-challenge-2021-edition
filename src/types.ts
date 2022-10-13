type Status = 'issued' | 'draft';

type Invoice = {
  code: string;
  issuedDate: string;
  ownerName: string;
  contactName: string;
  subtotal: number;
  taxes: number;
  total: number;
  status: Status;
};

type PropertyError = {
  property: string;
  message: string;
};

type InvoiceError = {
  line: number;
  errors: PropertyError[];
};

type ImportResult = {
  ok: Invoice[];
  ko: InvoiceError[];
};

export {
  Invoice,
  PropertyError,
  InvoiceError,
  ImportResult,
};
