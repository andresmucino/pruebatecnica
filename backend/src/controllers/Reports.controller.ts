import { Request, Response } from "express";
import { generateReport } from "../services/reports.service";


export const DownloadReport = async (_req: Request, res: Response) => {
    try {
        const filePath = await generateReport();
        res.download(filePath)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error al descargar el reporte' })
    }

}