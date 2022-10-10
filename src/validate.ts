import { Invoice, PropertyError } from './types'

export function validate(invoice: Invoice): PropertyError[] {
    const errors: PropertyError[] = [];

    if (invoice.code === '') {
        errors.push({
            property: 'code',
            message: 'required'
        });
    }
    if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(invoice.issuedDate)) {
        errors.push({
            property: 'issuedDate',
            message: 'invalid'
        });
    }
    if (invoice.ownerName === '') {
        errors.push({
            property: 'ownerName',
            message: 'required'
        });
    }
    if (invoice.contactName === '') {
        errors.push({
            property: 'contactName',
            message: 'invalid'
        });
    }
    if (isNaN(invoice.subtotal)) {
        errors.push({
            property: 'subtotal',
            message: 'invalid'
        });
    }
    if (isNaN(invoice.taxes)) {
        errors.push({
            property: 'taxes',
            message: 'invalid'
        });
    }
    if (isNaN(invoice.total)) {
        errors.push({
            property: 'total',
            message: 'invalid'
        });
    }
    if (!['issued', 'draft'].includes(invoice.status)) {
        errors.push({
            property: 'status',
            message: 'invalid'
        });
    }
    return errors;
}
