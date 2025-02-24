import ExcelJS from 'exceljs';
import Transactions from '../models/Transactions';
import path from 'path';

export const generateReport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    worksheet.columns = [
        { header: 'transaction_id', key: 'transaction_id', width: 20 },
        { header: 'client_id', key: 'client_id', width: 20 },
        { header: 'amount', key: 'amount', width: 20 },
        { header: 'category', key: 'category', width: 20 },
        { header: 'date', key: 'date', width: 20 },
        { header: 'type', key: 'type', width: 20 },
        { header: 'status', key: 'status', width: 20 },
    ]

    const transactions = await Transactions.find();
    transactions.forEach((transaction) => {
        worksheet.addRow(transaction.toObject())
    })

    const filePath = path.join(__dirname, '../../reports/report.xlsx')
    await workbook.xlsx.writeFile(filePath)

    return filePath

}