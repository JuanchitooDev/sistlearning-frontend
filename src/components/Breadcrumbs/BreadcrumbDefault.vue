<template>
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 class="font-semibold text-black dark:text-white">
            {{ props.pageTitle }}
        </h3>
        <nav>
            <ol class="flex items-center gap-2">
                <li v-for="option in props.options" :key="option.title">
                    <router-link class="font-medium" :to="option.url">{{ option.title }}</router-link><span
                        class="ml-2 d-block">/</span>
                </li>
                <li class="font-medium text-greenwhite-700">{{ props.urlCurrentName }}</li>
            </ol>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'BreadcrumbDefault',
    props: {
        pageTitle: {
            type: String,
            required: true
        },
        urlCurrentName: {
            type: String,
            required: true
        },
        options: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        return {
            props
        }
    }
}
</script>