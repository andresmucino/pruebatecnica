<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTransactionStore } from '../store/transactions';
import TransactionsTable from '../components/TransactionsTable.vue';
import TransactionsForm from '../components/TransactionsForm.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const store = useTransactionStore();
const visible = ref(false);

onMounted(() => {
  store.fetchTransactions();
});
</script>

<template>
  <div class=" mx-auto p-6">
    <div class="container">
      <h1 class="text-2xl font-bold mb-4">Gestión de Transacciones</h1>
      <Button label="Agregar transación" @click="visible = true" />
      <Dialog v-model:visible="visible" modal header="Nueva transacción" :style="{ width: '25rem' }">
        <TransactionsForm :visible />
      </Dialog>
    </div>
    <TransactionsTable :transactions="store.transactions" />
  </div>
</template>

<style>
.container {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>