import { defineStore } from 'pinia';
import axios from 'axios';

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as any[],
  }),
  actions: {
    async fetchTransactions() {
      try {
        const response = await axios.get('http://localhost:5000/transactions');
        this.transactions = response.data;
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    },
    async addTransaction(transaction: any) {
      try {
        await axios.post('http://localhost:5000/transactions', transaction);
        this.fetchTransactions();
      } catch (error) {
        console.error("Error adding transaction", error);
      }
    },
    async updateOneTransaction(transaction: any) {
      try {
        await axios.put(`http://localhost:5000/transactions/${transaction._id}`, transaction);
        this.fetchTransactions();
      } catch (error) {
        console.error("Error updating transaction", error);
      }
    },
    async getOneTransaction(id: string) {
      try {
        const response = await axios.get(`http://localhost:5000/transactions/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching transaction", error);
        return null;
      }
    },
    async deleteTransaction(id: string) {
      try {
        await axios.delete(`http://localhost:5000/transactions/${id}`);
        this.fetchTransactions();
      } catch (error) {
        console.error("Error deleting transaction", error);
      }
    },
    async DownloadReport() {
      try {
        const response = await axios.get(`http://localhost:5000/transactions/downloadreport`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.csv');
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading report:", error);
      }
    }
  },
});
