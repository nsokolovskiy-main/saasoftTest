<template>
  <div class="hint">
    <div class="hint__icon">
      <v-icon size="small">mdi-help</v-icon>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.hint {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgb(238, 238, 238);
  border-radius: 5px;

  &__icon {
    border-radius: 50%;
    border: 1px solid rgb(49, 49, 49);
    padding: 4px 6px;
  }
}
</style>
