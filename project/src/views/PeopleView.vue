<template>
    <div style="padding: 40px" class="about">
        
        <People></People>

    </div>
</template>

<script>
import People from '@/components/People.vue';
export default {
    data() {
        return {
            title: "People",
        }
    },
    components: {
        People
    }
}

</script>