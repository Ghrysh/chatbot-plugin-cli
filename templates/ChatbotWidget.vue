<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (!document.getElementById('fc-chatbot-script')) {
    const script = document.createElement('script');
    script.id = 'fc-chatbot-script';
    script.src = "https://api-chatbot.futurecloud.id/widget.js";
    script.setAttribute('data-license', '__LICENSE_KEY__');
    script.defer = true;
    document.body.appendChild(script);
  }
});
</script>
<template></template>
