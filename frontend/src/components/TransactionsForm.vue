<script setup lang="ts">
import { ref } from 'vue';
import { useTransactionStore } from '../store/transactions';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

const store = useTransactionStore();

const props = defineProps<{
  visible: boolean
}>();

const transaction = ref({
  client_id: '',
  amount: 0,
  category: '',
  date: Date.now(),
  type: 'income',
  status: 'active'
});

const types = ref([
  { label: 'Ingreso', value: 'income' },
  { label: 'Gasto', value: 'expense' }
]);

const status = 'active'

const addTransaction = () => {
  if (!transaction.value.client_id || transaction.value.amount <= 0 || !transaction.value.category || !transaction.value.date) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }

  store.addTransaction(transaction.value);

  transaction.value = { client_id: '', amount: 0, category: '', date: Date.now(), type: 'income', status: status };
};
</script>

<template>
  <form @submit.prevent="addTransaction" class="bg-white p-4 shadow-md rounded grid gap-4">
    <div style="display: block;">
      <InputText v-model="transaction.client_id" placeholder="Cliente ID" class="w-full" required
        style="width: 60%; margin-bottom: 8px;" />
      <InputNumber v-model="transaction.amount" placeholder="Cantidad" class="w-full" required
        style="width: 60%; margin-bottom: 8px;" />
      <InputText v-model="transaction.category" placeholder="Categoría" class="w-full" required
        style="width: 60%; margin-bottom: 8px;" />
      <Dropdown v-model="transaction.type" :options="types" optionLabel="label" placeholder="Fecha" optionValue="value" class="w-full"
        style="width: 60%; margin-bottom: 8px;" />
    </div>
    <div style="margin-top: 15px;">
      <Button type="submit" label="Agregar" @click="props.visible = false" icon="pi pi-plus" class="w-full"></Button>
    </div>
  </form>
</template>