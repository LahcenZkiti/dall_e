<script setup>
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { useNotyf } from "../composables/useNotyf";

const form = ref({
  name: "",
  prompt: "",
  photo: "",
});
const generatingImg = ref(false);
const loading = ref(false);
const router = useRouter();
const notif = useNotyf();
const handleChange = (e) => {
  form.value = { ...form.value, [e.target.name]: e.target.value };
};

const handleSurpriseMe = () => {
  const randomPrompt = getRandomPrompt(form.prompt);
  form.value = { ...form.value, prompt: randomPrompt };
};

const generateImage = async () => {
  if (form.value.prompt) {
    try {
      generatingImg.value = true;
      const response = await fetch(
        "https://dall-e-yvel.onrender.com/api/v1/dalle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.value.prompt }),
        }
      );

      const data = await response.json();

      form.value = {
        ...form.value,
        photo: `data:image/jpeg;base64, ${data.photo}`,
      };
    } catch (error) {
      notif.error(error.response.data.message);
    } finally {
      generatingImg.value = false;
    }
  }
};

const handleSubmit = async () => {
  if (form.value.prompt && form.value.photo) {
    try {
      loading.value = true;
      const response = await fetch(
        "https://dall-e-yvel.onrender.com/api/v1/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.value),
        }
      );

      await response.json();
      router.push({ name: "home" });
    } catch (error) {
      notif.error(error.response.data.message);
    } finally {
      loading.value = false;
    }
  } else {
    notif.error("Please enter a prompt and generate an image");
  }
};
</script>

<template>
  <section class="max-w-7xl mx-auto">
    <div>
      <h1 class="font-extrabold text-[#222328] text-[32px]">Create</h1>
      <p class="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
        Generate an imaginative image through DALL-E AI and share it with the
        community
      </p>
    </div>

    <form class="mt-16 max-w-3xl" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-5">
        <FormField
          v-model="form.name"
          labelName="Your Name"
          type="text"
          name="name"
          placeholder="Ex., john doe"
          @handleChange="handleChange"
        />

        <FormField
          v-model="form.prompt"
          labelName="Prompt"
          type="text"
          name="prompt"
          placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
          :value="form.prompt"
          @handleChange="handleChange"
          isSurpriseMe
          @handleSurpriseMe="handleSurpriseMe"
        />

        <div
          class="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center"
        >
          <img
            v-if="form.photo"
            :src="form.photo"
            :alt="form.prompt"
            class="w-full h-full object-contain"
          />
          <img
            v-else
            :src="preview"
            alt="preview"
            class="w-9/12 h-9/12 object-contain opacity-40"
          />

          <div
            v-if="generatingImg"
            class="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg"
          >
            <Loader />
          </div>
        </div>
      </div>

      <div class="mt-5 flex gap-5">
        <button
          type="button"
          @click="generateImage"
          class="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {{ generatingImg ? "Generating..." : "Generate" }}
        </button>
      </div>

      <div class="mt-10">
        <p class="mt-2 text-[#666e75] text-[14px]">
          ** Once you have created the image you want, you can share it with
          others in the community **
        </p>
        <button
          type="submit"
          class="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {{ loading ? "Sharing..." : "Share with the Community" }}
        </button>
      </div>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>
