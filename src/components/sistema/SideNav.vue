<template>
  <nav class="side-nav bg-white p-4 w-64 h-full border-r">
    <a class="intro-x flex items-center pt-4">
      <span class="xl:block">
        <img class="w-21" alt="Perú agro" src="" />
      </span>
    </a>
    <div class="side-nav__devider my-6"></div>
    <ul>
      <li>
        <a href="#" class="side-menu">
          <div class="side-menu__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="side-menu__title">Panel Principal</div>
        </a>
      </li>
      <li>
        <a href="tipo-evento" class="side-menu">
          <div class="side-menu__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="side-menu__title">Tipo de Evento</div>
        </a>
      </li>
      <li>
        <a href="#" class="side-menu">
          <div class="side-menu__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="side-menu__title">Evento</div>
        </a>
      </li>
      <li>
        <a href="#" class="side-menu">
          <div class="side-menu__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="side-menu__title">Alumno</div>
        </a>
      </li>
      <li>
        <a href="#" class="side-menu">
          <div class="side-menu__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="side-menu__title">Certificado</div>
        </a>
      </li>
      <li>
        <a href="#" class="side-menu">
          <div class="side-menu__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <div class="side-menu__title">Usuario</div>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'SideNav',
  setup() {
    //
  },
};
</script>

<style scoped>
.side-nav {
  overflow-x: hidden;
  padding-bottom: 4rem;
  padding-right: 1.25rem;
  width: 230px;
}

/* .side-nav .side-menu {
  --tw-text-opacity: 1;
  align-items: center;
  border-radius: 9999px;
  display: flex;
  height: 50px;
  margin-bottom: 0.25rem;
  padding-left: 1.25rem;
  position: relative;
} */

.side-menu {
  align-items: center;
  display: flex;
  height: 50px;
  margin-bottom: 0.25rem;
  padding-left: 1.25rem;
}

.side-nav__devider {
  margin: 1.5rem 0;
  border-top: 1px solid #e5e7eb;
}

.side-nav > ul > li:first-child > a:not(.side-menu--active) {
  animation: intro-menu-animation 0.4s ease-in-out 0.33333s;
  animation-delay: 0.33333s;
  animation-fill-mode: none;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
  opacity: 0;
  transform: translateX(50px);
}

.side-nav .side-menu .side-menu__title {
  align-items: center;
  display: flex;
  margin-left: 0.75rem;
  width: 100%;
}
</style>