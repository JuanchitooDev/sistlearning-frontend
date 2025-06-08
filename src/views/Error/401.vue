<template>
    <DefaultLayout>
        <NotAuthorized></NotAuthorized>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import NotAuthorized from "@/components/Sistema/Error/401.vue"
export default {
    name: '401',
    components: {
        DefaultLayout,
        NotAuthorized
    }
}
</script>