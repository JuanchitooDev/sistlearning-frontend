<template>
    <DefaultLayout>
        <DashboardPanel />
    </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import DashboardPanel from "@/components/Sistema/Dashboard/DashboardPanel.vue"
export default {
    name: 'Dashboard',
    components: {
        DefaultLayout,
        DashboardPanel
    }
}
</script>