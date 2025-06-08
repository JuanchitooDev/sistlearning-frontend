<template>
    <DefaultLayout>
        <NotFound></NotFound>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import NotFound from "@/components/Sistema/Error/404.vue"
export default {
    name: '401',
    components: {
        DefaultLayout,
        NotFound
    }
}
</script>