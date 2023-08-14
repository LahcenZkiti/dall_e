<script setup>
const props = defineProps({
  data: Array,
  title: String,
});
</script>
<template>
  <div>
    <div
      class="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3"
      v-if="data?.length > 0"
    >
      <Card
        v-for="post in data"
        :key="post"
        :_id="post._id"
        :name="post.name"
        :photo="post.photo"
        :prompt="post.prompt"
      />
    </div>
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">
      {{ title }}
    </h2>
  </div>
</template>

<style lang="scss" scoped></style>
