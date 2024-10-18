<template>
    <nav>
        <ul>
            <li><router-link>Inicio</router-link></li>
            <li><router-link to='tipo-evento'>Tipo de Evento</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style scoped>
nav {
  background-color: #333;
  padding: 1em;
}
nav ul {
  list-style-type: none;
  display: flex;
}
nav li {
  margin-right: 1em;
}
nav a {
  color: white;
  text-decoration: none;
}
</style>