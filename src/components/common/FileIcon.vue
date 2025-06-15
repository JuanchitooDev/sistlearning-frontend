<template>
    <div class="file-icon">
        <Icon icon="teenyicons:pdf-solid" width="15" height="15" />
    </div>
</template>

<script>
import { Icon } from "@iconify/vue"
import { computed } from "vue"

export default {
    name: 'FileIcon',
    props: {
        fileType: {
            type: String
        }
    },
    setup(props) {
        const iconMap = {
            pdf: { icon: 'teenyicons:pdf-solid', color: 'red' },
            default: { icon: 'mdi:file-document-box', color: 'gray' }
        }

        const iconData = computed(() => iconMap[props.fileType] || iconMap.default)

        const iconName = computed(() => iconData.value.icon)

        const iconColor = computed(() => iconData.value.color)

        return {
            Icon,
            iconName,
            iconColor
        }
    }
}
</script>

<style scoped>
.file-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>