<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from "primevue/dialog";
import { useTransactionStore } from '../store/transactions';
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import { useRouter } from 'vue-router';
import moment from "moment";

const store = useTransactionStore();

const visible = ref(false);
const router = useRouter();

const transaction = ref({
    client_id: '',
    amount: 0,
    category: '',
    date: Date.now(),
    type: 'income',
});

const tipos = ref([
    { label: 'Ingreso', value: 'income' },
    { label: 'Gasto', value: 'expense' }
]);

const openDialog = async (id: string) => {
    const existingTransaction = await store.getOneTransaction(id);
    if (existingTransaction) {
        transaction.value = { ...existingTransaction };
        visible.value = true;
    }
};

const updateTransaction = () => {
    store.updateOneTransaction(transaction.value);
    router.push('/transactions');
};

const updateStatusTransaction = (_id: string, status: string) => {
    store.updateOneTransaction({ _id: _id, status: status === 'active' ? 'inactive' : 'active' })
}

const filters = ref({
    client_id: '',
    amount: '',
    category: '',
    date: null,
});

const filteredTransactions = computed(() => {
    return store.transactions.filter(transaction => {
        return (
            (filters.value.client_id === '' || transaction.client_id.includes(filters.value.client_id)) &&
            (filters.value.amount === '' || transaction.amount.toString() === filters.value.amount) &&
            (filters.value.category === '' || transaction.category.includes(filters.value.category)) &&
            (filters.value.date === null || transaction.date === filters.value.date)
        );
    });
});

</script>

<template>
    <div>
        <div class="flex gap-2 mb-4" style="margin: 8px;">
            <InputText v-model="filters.client_id" placeholder="Filtrar por Cliente ID"
                style="background-color: #fff; margin: 4px; color: #000;" />
            <InputText v-model="filters.amount" placeholder="Filtrar por Cantidad" type="number"
                style="background-color: #fff; margin: 4px; color: #000;" />
            <InputText v-model="filters.category" placeholder="Filtrar por Categoría"
                style="background-color: #fff; margin: 4px; color: #000;" />
            <Calendar v-model="filters.date" placeholder="Filtrar por Fecha" showIcon
                style="background-color: #fff; margin: 4px" />
        </div>
        <DataTable :value="filteredTransactions" responsiveLayout="scroll" class="shadow-md"
            style="background-color: white;">
            <Column field="client_id" header="Cliente ID" style="background-color: azure; color: #000;"></Column>
            <Column field="amount" header="Cantidad" style="background-color: azure; color: #000;"></Column>
            <Column field="category" header="Categoría" style="background-color: azure; color: #000;"></Column>
            <Column field="date" header="Fecha" style="background-color: azure; color: #000;">
                <template #body="slotProps">
                    {{ moment(slotProps.data.date).format("DD / MMMM / YYYY") }}
                </template>
            </Column>
            <Column field="type" header="Tipo" style="background-color: azure; color: #000;">
                <template #body="slotProps">
                    {{ slotProps.data.type === 'income' ? 'Ingreso' : 'Gasto' }}
                </template>
            </Column>
            <Column field="status" header="Estatus" style="background-color: azure; color: #000;">
                <template #body="slotProps">
                    {{ slotProps.data.status === 'active' ? 'Activo' : 'Desactivado' }}
                </template>
            </Column>
            <Column header="Acciones" style="background-color: azure; color: #000;">
                <template #body="slotProps">
                    <Button style="color: #fff; background-color: cornflowerblue; width: 5rem; margin-right: 5px;"
                        @click="updateStatusTransaction(slotProps.data._id, slotProps.data.status)">{{
                            slotProps.data.status === 'active' ?
                        'Desactivar': 'Activar' }}</Button>
                    <Button style="color: #fff; background-color: cornflowerblue; width: 5rem; margin-right: 5px;"
                        @click="store.deleteTransaction(slotProps.data._id)">Eliminar</Button>
                    <Button @click="openDialog(slotProps.data._id)"
                        style="color: #fff; background-color: cornflowerblue; width: 5rem; margin-right: 5px;">Actualizar</Button>
                    <Dialog v-model:visible="visible" modal header="Nueva Transacción" :style="{ width: '40rem' }"
                        :breakpoints="{ '575px': '90vw' }">
                        <h2 class="text-2xl font-bold mb-4">Actualizar Transacción</h2>
                        <form @submit.prevent="updateTransaction"
                            class="bg-white p-4 shadow-md rounded grid gap-4 form-all">
                            <InputText v-model="transaction.client_id" placeholder="Cliente ID" class="w-full inputFull"
                                required />
                            <InputNumber v-model="transaction.amount" type="number" v placeholder="Cantidad"
                                class="w-full inputFull" required />
                            <InputText v-model="transaction.category" placeholder="Categoría" class="w-full inputFull"
                                required />
                            <Dropdown v-model="transaction.type" :options="tipos" optionLabel="label"
                                optionValue="value" class="w-full inputFull" />

                            <div class="inputFull">
                                <Button type="submit" label="Actualizar" @click="visible = false" icon="pi pi-refresh"
                                    class="w-full "></Button>
                            </div>
                        </form>
                    </Dialog>
                </template>
            </Column>
        </DataTable>

    </div>
</template>

<style>
.inputFull {
    width: 60%;
    margin-bottom: 15px;
}

.form-all {
    display: block;

}

.input-filter {
    background-color: #fff;
    margin: 4px;
}
</style>