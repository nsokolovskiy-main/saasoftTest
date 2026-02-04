export interface ILabel {
  text: string
}

export type TLabels = ILabel[]

export enum EType {
  ldap = 'LDAP',
  local = 'Локальный',
}

export interface IAccount {
  id: number
  label: TLabels | string
  type: string
  login: string
  password: string | null
}

export type TAccounts = IAccount[]

export interface ISelect {
  title: string
  value: string
}
