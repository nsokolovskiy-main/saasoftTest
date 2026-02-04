import { IAccount, ILabel, TAccounts, TLabels } from '@/types'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useStore = defineStore('main', () => {
  const accounts = ref<TAccounts>([]) // массив аккаунтов на экране пользователя
  const savedAccounts = ref<TAccounts>([]) // массив сохраненных в localStorage аккаунтов
  const uid = ref<number>(0) // уникальный id, чтобы отслеживать редактирование уже созданных аккаунтов

  // Заполнение store из LocalStorage
  const data = localStorage.getItem('store')
  if (data) {
    let maxUid = 0
    const result = JSON.parse(data).map((item: IAccount) => {
      if (item.id > maxUid) maxUid = item.id
      return {
        ...item,
        label: (item.label as TLabels).reduce(
          (acc: string, labelItem: ILabel) => {
            return labelItem.text + ';' + acc
          },
          ''
        ),
      }
    })
    uid.value = maxUid + 1
    // Используем spread-оператор, иначе оба массива будут связаны одной ссылкой на результирующий массив
    savedAccounts.value.push(...result)
    accounts.value.push(...result)
  }

  // При любом изменении массива savedAccounts (включая вложенные объекты) - сохраняем в localStorage
  watch(
    () => savedAccounts.value,
    (value) => {
      const result = value.map((item) => ({
        ...item,
        label: (item.label as string)
          .split(';')
          .filter((item: string) => !!item)
          .map((item: string) => ({ text: item.trim() })),
      }))
      localStorage.setItem('store', JSON.stringify(result))
    },
    {
      deep: true,
    }
  )

  // CRUD для аккаунтов
  function addAccount() {
    const data: IAccount = {
      id: uid.value++,
      label: '',
      type: 'local',
      login: '',
      password: null,
    }
    accounts.value.push(data)
  }

  function removeAccount(index: number, id: number) {
    const indexAccount = savedAccounts.value.findIndex((item) => item.id === id)
    if (index > -1) {
      savedAccounts.value.splice(indexAccount, 1)
    }
    accounts.value.splice(index, 1)
  }

  function saveAccount(data: IAccount) {
    const index = savedAccounts.value.findIndex((item) => item.id === data.id)
    if (index > -1) {
      savedAccounts.value[index] = data
    } else {
      savedAccounts.value.push(data)
    }
  }

  return {
    accounts,
    savedAccounts,
    uid,
    addAccount,
    removeAccount,
    saveAccount,
  }
})
