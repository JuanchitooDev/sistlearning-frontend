<template>
    <div class="flex h-screen overflow-hidden">
        <SidebarArea />

        <!-- ===== Content Area Start ===== -->
        <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <!-- ===== Header Start ===== -->
            <Header />
            <!-- ===== Header End ===== -->

            <!-- ===== Main Content Start ===== -->
            <main>
                <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    <slot></slot>
                </div>
            </main>
            <!-- ===== Main Content End ===== -->
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header/Header.vue"
import SidebarArea from '@/components/Sidebar/SidebarArea.vue';

export default {
    name: 'DefaultLayout',
    components: {
        Header,
        SidebarArea,
    },
};
</script>