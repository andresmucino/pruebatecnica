<script setup lang="ts">
import TransaccionesChart from '../components/TransactionsChars.vue';

</script>

<template>
  <div>
    <h1>📊 Reporte de Transacciones</h1>
    <div class="titles"><p>Ingresos</p> <p>Gastos</p> </div>
    <TransaccionesChart />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
.titles {
  display: flex;
  width: 100%;
  justify-content: stretch;
}
</style>
