<template>
    <h1 class="title">Church Events</h1>
    <div class="columns">
        <div class="search-wrapper column is-one-third"><label>Search Names: </label>
            <input class="form-control" type="text" name="searchQuery" v-model="searchQuery" placeholder="Search.." />
        </div>
        <div class="column">
            <p>Sort First Name A-Z</p>
            <o-switch @click="filterTitle" />
        </div>
        <div class="column">
            <p>Sort by Date</p>
            <o-switch @click="filterDate" />
        </div>



    </div>
    <div id="table">
        <table class="table is-bordered is-striped is-hoverable is-fullwidth">
            <thead id="table">
                <td>
                    Event Name
                </td>
                <td>
                    Start Date
                </td>
                <td>
                    End Date
                </td>
            </thead>
            <tbody>
                <tr v-for="event in resultQuery()">
                    <td>
                        {{ event.Event_Title }}
                    </td>
                    <td>
                        {{ event.Event_Start_Date }}
                    </td>
                    <td>
                        {{ event.Event_End_Date }}
                    </td>
                    <td>
                        <o-button size="medium" id="button" @click="isModalActive = true, event1 = event">
                            Details
                        </o-button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>

    <o-modal v-model:active="isModalActive" :width="640" scroll="clip">
        
        <div style="padding: 10px;">
            <p>Event Name: {{ event1.Event_Title }}</p>
            <p>Event Description: {{ event1.Event_Description }}</p>
            <p>Event Start: {{ event1.Event_Start_Date }}</p>
            <p>Event End: {{ event1.Event_End_Date }}</p>
        </div>
    </o-modal>
</template>
  
<script>

import { defineComponent, ref } from 'vue'
import { usePeopleStore } from '../stores/PeopleStore';
import { storeToRefs } from 'pinia';




export default {
    name: 'Events',
    props: ['events'],

    methods: {
        resultQuery() {
            return this.filteredEvents.filter((entry) => this.filteredEvents.length ? Object.keys(this.filteredEvents[0]).some(key => ('' + entry[key]).toLowerCase().includes(this.searchQuery))
                : true)
        },
        filterTitle() {
            if (this.titleFilter) {
                this.filteredEvents = this.filteredEvents.sort((a, b) => {
                    if (a.Event_Title < b.Event_Title) {
                        return -1;
                    }
                })
                this.titleFilter = false;
            }
            else {
                this.filteredEvents = this.filteredEvents.sort((a, b) => {
                    if (a.Event_Title > b.Event_Title) {
                        return -1;
                    }
                })
                this.titleFilter = true;
            }
        },
        filterDate() {
            if (this.dateFilter) {
                this.filteredEvents = this.filteredEvents.sort((a, b) => {
                    if (a.Event_Start_Date < b.Event_Start_Date) {
                        return -1;
                    }
                })
                this.dateFilter = false;
            }
            else {
                this.filteredEvents = this.filteredEvents.sort((a, b) => {
                    if (a.Event_Start_Date > b.Event_Start_Date) {
                        return -1;
                    }
                })
                this.dateFilter = true;
            }
        }


    },

    setup() {
        const isModalActive = ref(false);
        const store = usePeopleStore();
        const titleFilter = ref(true);
        const dateFilter = ref(true);
        const { events } = storeToRefs(store);
        const filteredEvents = events;
        const event1 = [];
        let searchQuery = ref('')

        function fetchEvents() {
            store.fetchEvents();
            return events;
        }


        return { events, fetchEvents, store, isModalActive, event1, filteredEvents, titleFilter, dateFilter, searchQuery };
    },
    mounted() {
        this.store.fetchEvents();
    },


}
</script>
  