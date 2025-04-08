<template>
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
        <thead id="table">
            <td></td>
            <td>
                Event Name
            </td>
            <td>
                Event Date
            </td>
        </thead>
        <tbody>
            <tr v-for="item in events">
                <td>
                    <o-button size="medium" id="button" @click="signup(item.Event_ID)">Register</o-button>
                </td>
                <td>
                    {{ item.Event_Title }}
                </td>
                <td>
                    {{ item.Event_Start_Date }}
                </td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>

import { defineComponent, ref } from 'vue'
import { usePeopleStore } from '../stores/PeopleStore';
import { storeToRefs } from 'pinia';
import axios from 'axios';





export default {
    name: "EventsRegister",
    props: ["eventsregister"],
    methods: {},
    setup() {
        const store = usePeopleStore();
        const { events } = storeToRefs(store);
        function fetchEvents() {
            store.fetchEvents();
            return events;
        }
        function signup(event) {
            axios.post('http://csc364chms.cscprof.com/events/31216/register', {'Contact_ID':34970}).then(response => {
                console.log("***************************************");
                console.log(response.data);
                console.log("***************************************");
            })
        }
    

        return { fetchEvents, store, events, signup};
    },
    mounted() {
        this.store.fetchEvents();
    },
    components: {}
}
</script>
  