<template>
  <div class="home">
    <header class="header">
      <h1>Учетные записи</h1>
      <v-btn
        icon="mdi-plus"
        density="compact"
        size="large"
        color="white"
        rounded="sm"
        @click="store.addAccount"
      ></v-btn>
    </header>
    <BlockHint>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </BlockHint>

    <BlockTable>
      <BlockAccount
        v-for="(account, index) in store.accounts"
        :index="index"
        :key="`account-${index}`"
      ></BlockAccount>
    </BlockTable>
  </div>
</template>

<script lang="ts" setup>
import { BlockHint, BlockAccount, BlockTable } from '@/components'

import { useStore } from '@/store'
const store = useStore()
</script>

<style lang="scss">
.home {
  max-width: 1000px;
  margin: 30px auto;
  text-align: left;
  & > * + * {
    margin-top: 20px; // автоотступы между элементами, либо можно flex-column и gap: 20px;
  }
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>