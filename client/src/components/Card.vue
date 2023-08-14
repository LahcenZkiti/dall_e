<script setup>
import { download } from "../assets";
import { downloadImage } from "../utils";

const props = defineProps({
  photo: String,
  prompt: String,
  name: Array,
  _id: String,
});
</script>

<template>
  <div
    class="rounded-xl group relative shadow-card hover:shadow-cardhover card"
  >
    <img
      class="w-full h-auto object-cover rounded-xl"
      :src="photo"
      :alt="prompt"
    />
    <div
      class="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md"
    >
      <p class="text-white text-sm overflow-y-auto prompt">{{ prompt }}</p>

      <div class="mt-5 flex justify-between items-center gap-2">
        <div class="flex items-center gap-2">
          <div
            class="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold"
          >
            {{ name[0] }}
          </div>
          <p class="text-white text-sm">{{ name }}</p>
        </div>
        <button
          type="button"
          @click="() => downloadImage(_id, photo)"
          class="outline-none bg-transparent border-none"
        >
          <img
            :src="download"
            alt="download"
            class="w-6 h-6 object-contain invert"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
