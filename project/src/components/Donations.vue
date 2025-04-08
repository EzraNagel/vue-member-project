<template>
    <h1 class="title">Church Donations</h1>
    <div class="columns">
        <div class="search-wrapper column is-one-third"><label>Search Names: </label>
            <input class="form-control" type="text" name="searchQuery" v-model="searchQuery" placeholder="Search.." />
        </div>
        <div class="column">
            <p>Sort First Name A-Z</p>
            <o-switch @click="filterFirstName" />
        </div>
        <div class="column">
            <p>Sort Last Name A-Z</p>
            <o-switch @click="filterLastName" />
        </div>
        <div class="column">
            <p>Sort by Donation Amount</p>
            <o-switch @click="filterAmount" />
        </div>



    </div>
    <div id="table">
        <table class="table is-bordered is-striped is-hoverable is-fullwidth">
            <thead id="table">
                <td>First Name</td>
                <td>Last Name</td>
                <td>Donation Amount ($)</td>
                <td>Donation Date</td>
                <td>Details</td>
            </thead>
            <tbody>
                
                <tr v-for="donation in resultQuery()">
                    
                    <td v-if="donation.donor !== null">
                        {{ donation.donor.First_Name }}
                    </td>
                    <td v-else>
                        N/A
                    </td>
                    <td v-if="donation.donor !== null">
                        {{ donation.donor.Last_Name }}
                    </td>
                    <td v-else>
                        N/A
                    </td>
                    <td v-if="donation.Donation_Amount != null">
                        {{ donation.Donation_Amount }}
                    </td>
                    <td v-else>
                        N/A
                    </td>
                    <td>
                        {{ donation.Donation_Date }}
                    </td>
                    <td>
                        <o-button size="medium" id="button" @click="isModalActive = true, donation1 = donation">
                            Details
                        </o-button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>

    <o-modal v-model:active="isModalActive" :width="640" scroll="clip">
        <div style="padding: 10px;">
            <p v-if="donation1.donor !== null">Donation ID: {{ donation1.Donation_ID }}</p>
            <p v-if="donation1.donor !== null">Donor ID: {{ donation1.Donor_ID }}</p>
            <p v-if="donation1.donor !== null">Name: {{ donation1.donor.First_Name }} {{ donation1.donor.Last_Name }}</p>
            <p>Donation Date: {{ donation1.Donation_Date }}</p>
        </div>
    </o-modal>
</template>
  
<script>

import { defineComponent, ref } from 'vue'
import { usePeopleStore } from '../stores/PeopleStore';
import { storeToRefs } from 'pinia';




export default {
    name: 'Donations',
    props: ['donations'],

    methods: {
        resultQuery() {
            return this.filteredDonations.filter((entry) => this.filteredDonations.length ? 
                Object.keys(this.filteredDonations[0]).some(key => ('' + entry[key]).
                toLowerCase().includes(this.searchQuery))
                : true)
        },
        filterFirstName() {
            if (this.firstNameFilter) {
                this.filteredDonations = this.filteredDonations.sort((a, b) => {
                    if (a.donor.First_Name < b.donor.First_Name) {
                        return -1;
                    }
                })
                this.firstNameFilter = false;
            }
            else {
                this.filteredDonations = this.filteredDonations.sort((a, b) => {
                    if (a.donor.First_Name > b.donor.First_Name) {
                        return -1;
                    }
                })
                this.firstNameFilter = true;
            }
        },
        filterLastName() {
            if (this.lastNameFilter) {
                this.filteredDonations = this.filteredDonations.sort((a, b) => {
                    if (a.donor.Last_Name < b.donor.Last_Name) {
                        return -1;
                    }
                })
                this.lastNameFilter = false;
            }
            else {
                this.filteredDonations = this.filteredDonations.sort((a, b) => {
                    if (a.donor.Last_Name > b.donor.Last_Name) {
                        return -1;
                    }
                })
                this.lastNameFilter = true;
            }
        },
        filterAmount() {
            if (this.amountFilter) {
                this.filteredDonations = this.filteredDonations.sort((a, b) => {
                    if (a.Donation_Amount < b.Donation_Amount) {
                        return -1;
                    }
                })
                this.amountFilter = false;
            }
            else {
                this.filteredDonations = this.filteredDonations.sort((a, b) => {
                    if (a.Donation_Amount > b.Donation_Amount) {
                        return -1;
                    }
                })
                this.amountFilter = true;
            }
        }


    },

    setup() {
        const isModalActive = ref(false);
        const store = usePeopleStore();
        const firstNameFilter = ref(false);
        const lastNameFilter = ref(false);
        const amountFilter = ref(false);
        const { donations } = storeToRefs(store);
        const filteredDonations = donations;
        const donation1 = [];
        let searchQuery = ref('');

        function fetchDonations() {
            store.fetchDonations();
            return donations;
        }


        return { donations, fetchDonations, store, isModalActive, donation1, filteredDonations, firstNameFilter, lastNameFilter, amountFilter, searchQuery };
    },
    mounted() {
        this.store.fetchDonations();
    },


}
</script>
  