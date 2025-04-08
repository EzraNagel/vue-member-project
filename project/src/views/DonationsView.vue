<template>
    <div style="padding: 40px" class="about">
        <Donations></Donations>

    </div>
</template>

<script>
import Donations from '@/components/Donations.vue';
export default {
    data() {
        return {
            title: "Course Detail Listing",
        }
    },
    components: {
        Donations
    }
}

</script>