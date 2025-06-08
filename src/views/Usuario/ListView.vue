<template>
  <DefaultLayout>
    <BreadcrumbDefault :pageTitle="pageTitle" :urlCurrentName="urlCurrentName" />
    <div class="flex flex-col gap-10">
      <UsuarioTable />
    </div>
  </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import UsuarioTable from "@/components/Sistema/Usuario/UsuarioTable.vue"

export default {
  name: 'ListView',
  components: {
    DefaultLayout,
    BreadcrumbDefault,
    UsuarioTable
  },
  setup() {
    const pageTitle = ref("Listado")
    const urlCurrentName = ref("Usuario")

    return {
      pageTitle,
      urlCurrentName
    }
  }
}

</script>