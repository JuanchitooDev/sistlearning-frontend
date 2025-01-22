<template>
  <div
    class="top-bar bg-yellow-400 text-black flex justify-between items-center py-2 px-4"
  >
    <span class="text-lg font-medium">APP</span>

    <div class="relative">
      <button @click="toggleDropdown" class="flex items-center gap-2">
        <span>Usuario</span>
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <transition name="fade">
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40"
        >
          <ul>
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Ver Perfil</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >Logout</a
              >
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'TopBar',
  setup() {
    const isDropdownOpen = ref(false);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    return {
      isDropdownOpen,
      toggleDropdown,
    };
  },
};
</script>

<style scoped>
/* .top-bar {
  --tw-border-opacity: 1;
  align-items: center;
  border-bottom-width: 1px;
  border-color: rgba(222, 231, 239, var(--tw-border-opacity));
  display: flex;
  height: 67px;
  position: relative;
  z-index: 51; */
/* } */

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 67px;
}

button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>