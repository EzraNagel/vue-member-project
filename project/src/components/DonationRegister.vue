<template>
    <div>
        <form @submit="submitForm">
            <div class="field">
                <label class="label">Donation Amount</label>
                <div class="control">
                    <input class="input" placeholder="Joe Smith" />

                </div>
            </div>
        </form>
        <o-button @click="submitForm"></o-button>
    </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { usePeopleStore } from '../stores/PeopleStore';
import { storeToRefs } from 'pinia';
import axios from 'axios';





export default {
    name: "DonationRegister",
    props: ["donationregister"],
    methods: {
        submitForm() {
            axios.post('http://csc364chms.cscprof.com/donations', {
                "donor_id": 10495,
                "amount": 69
            }
            );
        }
    },
    setup() {
        const store = usePeopleStore();


        return { store };
    },
    mounted() {

    },
    components: {}
}
</script>