<script setup lang="ts">
import { RouterView } from 'vue-router';
import Menu from 'primevue/menubar';
import { useTransactionStore } from './store/transactions';

const store = useTransactionStore()

</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 text-gray-900">
    <Menu class="shadow-md" style="background-color: gray;">
      <template #start>
        <RouterLink to="/" class="mr-4" style="margin: 15px;">Inicio</RouterLink>
        <RouterLink to="/transactions" class="mr-4" style="margin: 15px;">Transacciones</RouterLink>
        <Button class="mr-4" style="margin: 15px;" @click="store.DownloadReport" >Descargar reporte</Button>
        <RouterLink to="/chars" class="mr-4" style="margin: 15px;" >Chars</RouterLink>
      </template>
    </Menu>
    <main class="flex-1 container mx-auto p-6">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>