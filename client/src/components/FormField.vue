<script setup>
const props = defineProps({
  type: String,
  name: String,
  labelName: String,
  placeholder: String,
  isSurpriseMe: Boolean,
  modelValue: String,
  _id: String,
});

const emit = defineEmits([
  "handleSurpriseMe",
  "handleChange",
  "update:modelValue",
]);
const value = ref(props.modelValue);

watch(value, () => {
  emit("update:modelValue", value.value);
});

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  }
);
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <label :for="name" class="block text-sm font-medium text-gray-900">
        {{ labelName }}
      </label>

      <button
        v-if="isSurpriseMe"
        type="button"
        @click="emit('handleSurpriseMe')"
        class="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black"
      >
        Surprise me
      </button>
    </div>
    <input
      v-model="value"
      :type="type"
      :id="name"
      :name="name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3"
      :placeholder="placeholder"
      @change="($event) => emit('handleChange', $event)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
