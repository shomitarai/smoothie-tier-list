<template>
  <div id="app">
    <Navbar />
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
