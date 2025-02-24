import { Request, Response } from "express";
import Transactions from "../models/Transactions";

export const CreateTransactions = async (req: Request, res: Response) => {
  try {
    const newTransaction = new Transactions(req.body);
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la transaccion" });
  }
};


export const GetTransactions = async (req: Request, res: Response) => {
  try {
    const getTransactions = await Transactions.find();
    res.status(200).json(getTransactions);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error al optener las trasacciones" });
  }
};

export const GetTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const transaction = await Transactions.findById(id);

    if (!transaction) {
      res.status(400).json({ message: "Transacción no encontrada" });
      return;
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la transacción" });
  }
};

export const UpdateOneTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateOneTrasaction = await Transactions.findByIdAndUpdate(id, req.body);

    if (!updateOneTrasaction) {
      res.status(400).json({ message: 'Transacción no encontrada' })
    }

    res.status(200).json(updateOneTrasaction)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error al actulizar la transacción' })
  }
}

export const DeleteOneTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleteOneTransaction = await Transactions.findByIdAndDelete(id)

    if (!deleteOneTransaction) {
      res.status(400).json({ message: 'Transacción no encontrada' })
    }

    res.status(200).json({ message: 'Elimino su transacción' })
  } catch (error) {
    res.status(500).json({ message: 'Error al Eliminar la transacción' })
  }
}