<template>
    <div style="padding: 40px" class="about">
        <Events></Events>

    </div>
</template>

<script>
import Events from '@/components/Events.vue';
export default {
    data() {
        return {
            title: "Course Detail Listing",
        }
    },
    components: {
        Events
    }
}

</script>