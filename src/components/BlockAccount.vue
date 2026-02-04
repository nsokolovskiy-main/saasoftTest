<template>
  <v-form
    class="account"
    :key="`form-${dataAccount.id}`"
    :class="!isLocalType ? 'account_ldap' : ''"
  >
    <div class="account__data">
      <v-textarea
        v-model="dataAccount.label"
        placeholder="Введите метки через ;"
        :auto-grow="true"
        name="label"
        rows="1"
        density="compact"
        variant="outlined"
        :error="v$.label.$error"
        :counter="50"
        @blur="onChangeField"
      >
      </v-textarea>
    </div>
    <div class="account__data">
      <v-select
        v-model="dataAccount.type"
        placeholder="Тип записи"
        name="type"
        density="compact"
        variant="outlined"
        :items="SELECT_ITEMS"
        item-value="value"
        item-text="title"
        @update:model-value="onChangeField"
      />
    </div>
    <div class="account__data">
      <v-text-field
        v-model="dataAccount.login"
        placeholder="Введите логин"
        name="login"
        density="compact"
        variant="outlined"
        required
        :error="v$.login.$error"
        :counter="100"
        @blur="onChangeField"
      />
    </div>
    <div class="account__data" v-if="isLocalType">
      <v-text-field
        v-model="dataAccount.password"
        placeholder="Введите пароль"
        name="password"
        type="password"
        density="compact"
        variant="outlined"
        required
        :error="v$.password.$error"
        :counter="100"
        @blur="onChangeField"
      />
    </div>
    <div class="account__delete">
      <v-btn
        icon="mdi-delete-outline"
        density="compact"
        color="white"
        size="large"
        rounded="sm"
        @click="onDelete"
      ></v-btn>
    </div>
  </v-form>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, watch, nextTick } from 'vue'
import { EType, ISelect } from '@/types'

// Props
const props = defineProps<{ index: number }>()

// Consts - если увеличить количество типов - в этом месте ничего менять не надо, автоматически преобразуется в массив
const SELECT_ITEMS = Object.entries(EType).reduce<ISelect[]>(
  (acc, [key, text]) => {
    acc.push({ value: key, title: text })
    return acc
  },
  []
)

// Store
import { useStore } from '@/store'
const store = useStore()

// Data - если передавать account в props - его нельзя мутировать, а так - сразу меняются данные в store
const dataAccount = computed(() => store.accounts[props.index])

// Watch type - не computed, потому что нужно сбрасывать пароль на null при изменении типа, а в вычисляемых свойствах этого сделать нельзя
const isLocalType = ref(dataAccount.value.type === 'local')
watch(
  () => dataAccount.value.type,
  () => {
    if (dataAccount.value.type === 'ldap') dataAccount.value.password = null
    isLocalType.value = dataAccount.value.type === 'local'
  }
)

// Validation
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, requiredIf } from '@vuelidate/validators'
const rules = computed(() => ({
  label: { maxLength: maxLength(50) },
  login: { required, maxLength: maxLength(100) },
  password: {
    required: requiredIf(isLocalType.value),
    maxLength: maxLength(100),
  },
}))
const v$ = useVuelidate(rules, dataAccount)

// Update account
const onChangeField = async function () {
  await nextTick()
  const valid = await v$.value.$validate()
  if (valid) store.saveAccount({ ...dataAccount.value })
}
// Сразу при создании экземпляра компонента вызываем функцию выше, чтобы запустить валидацию, иначе при первом изменении типа записи в store сохраняется объект с пустым паролем - другого решения не нашел, увы
void onChangeField()

// Delete account
const onDelete = function () {
  store.removeAccount(props.index, dataAccount.value.id)
}
</script>

<style lang="scss">
.account {
  @include scssGlobals.grid-layout;

  &__data {
    padding: 5px 10px !important;
  }

  &__delete {
    padding: 7px 0 !important;
    text-align: center;
  }
}
</style>
