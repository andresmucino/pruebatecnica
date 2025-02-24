<script setup lang="ts">
import { computed, onMounted } from "vue";
import Chart from "primevue/chart";
import { useTransactionStore } from "../store/transactions";

const store = useTransactionStore();

onMounted(() => {
  store.fetchTransactions();
});

const chartData = computed(() => {
  const documentStyle = getComputedStyle(document.body);

  const incomes = store.transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expenses = store.transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  return {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        data: [incomes, expenses],
        backgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-500'),
          documentStyle.getPropertyValue('--p-orange-500')
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-cyan-400'),
          documentStyle.getPropertyValue('--p-orange-400')
        ]
      }
    ]
  };
});

const chartOptions = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    }
  };
});
</script>

<template>
  <div class="card flex justify-center">
    <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
  </div>
</template>