<template>
  <div class="table">
    <div class="table__header">
      <div class="table__cell">Метки</div>
      <div class="table__cell">Тип записи</div>
      <div class="table__cell">Логин</div>
      <div class="table__cell">Пароль</div>
      <div class="table__cell"></div>
    </div>
    <div class="table__body">
      <h3 class="table__empty" v-if="!store.accounts.length">Нет данных</h3>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
const store = useStore()
</script>

<style lang="scss">
.table {
  &__header {
    @include scssGlobals.grid-layout;
  }

  &__cell {
    padding: 0 10px;
    color: rgb(184, 184, 184);
  }

  &__empty {
    padding: 10px;
  }
}
</style>
