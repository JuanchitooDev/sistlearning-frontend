<template>
    <div class="top-bar">
        <div class="-intro-x mr-auto flex bg-yellow-400 text-black text-xs font-medium py-2 px-4 rounded-lg gap-2">
            <span class="self-center">APP</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBar'
}
</script>

<style scoped>
.top-bar {
    --tw-border-opacity: 1;
    align-items: center;
    border-bottom-width: 1px;
    border-color: rgba(222, 231, 239, var(--tw-border-opacity));
    display: flex;
    height: 67px;
    position: relative;
    z-index: 51;
}
</style>