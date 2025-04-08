<template>
  <h1 class="title">Church Members</h1>
  <div class="columns">
    <div class="search-wrapper column is-one-third"><label>Search Names: </label>
      <input class="form-control" type="text" name="searchQuery" v-model="searchQuery" placeholder="Search.." />
    </div>
    <div class="column">
      <p>Sort Last Name A-Z</p>
      <o-switch :value="true" @click="filterLastName" />
    </div>
    <div class="column">
      <p>Sort First Name A-Z</p>
      <o-switch @click="filterFirstName" />
    </div>
    <div class="column">
      <p>Only Active</p>
      <o-switch @click="filterStatus" />
    </div>


  </div>
  <div id="table">
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
      <thead id="table">
        <td>Last Name</td>
        <td>First Name</td>
        <td>Email Address</td>
        <td>Phone Number</td>
        <td>Details</td>
        <td>Register Events</td>
        <td>Make Donation</td>
      </thead>
      <tbody>
        <tr v-for="person in resultQuery()">
          <td>
            {{ person.Last_Name }}
          </td>
          <td>
            {{ person.First_Name }}
          </td>
          <td>
            {{ person.Email_address }}
          </td>
          <td>
            {{ person.Mobile_Phone }}
          </td>
          <td>
            <button size="medium" id="button" @click="isImageModalActive = true, person1 = person">
              Details
            </button>
          </td>
          <td>
            <o-button size="medium" id="button" @click="isEventModalActive = true, person1 = person">
              Register Event
            </o-button>
          </td>
          <td>
            <o-button size="medium" id="button" @click="isDonationModalActive = true, person1 = person">
              Donate
            </o-button>
          </td>


        </tr>
      </tbody>
    </table>
  </div>

  <o-modal v-model:active="isImageModalActive" :width="640" scroll="clip">
    <div style="padding: 10px;">
      <p>{{ person1.First_Name }} {{ person1.Last_Name }}</p>
      <p>Date of Birth: {{ person1.Date_of_Birth }}</p>
      <p>Gender: {{ person1.Gender }}</p>
      <p>Marital Status: {{ person1.Marital_Status }}</p>
      <p>Contact Status: {{ person1.Contact_Status }}</p>
      <p>Email Address: {{ person1.Email_address }}</p>
      <p>Mobile Phone: {{ person1.Mobile_Phone }}</p>
    </div>
  </o-modal>
  <o-modal v-model:active="isEventModalActive" :width="640" scroll="clip">
    <div style="padding: 10px;">
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
              <o-button size="medium" id="button" @click="signup, event1 = event">Register</o-button>
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
    </div>
  </o-modal>
  <o-modal v-model:active="isDonationModalActive" :width="640" scroll="clip">
    <div>
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <label class="label">Donation Amount</label>
          <div class="control">
            <input class="input" :class="{ 'is-danger': v$.fields.amount.$error }" v-model="fields.amount" type="number"
              min="0" placeholder="amount" />
            <span v-if="v$.fields.amount.$error">{{ v$.fields.amount.$errors[0].$message }}</span>
          </div>
          <button class="button is-success is-light">Submit</button>
        </div>
      </form>
    </div>
  </o-modal>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { usePeopleStore } from '../stores/PeopleStore';
import { storeToRefs } from 'pinia';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios';





export default {
  name: "People",
  props: ["people"],
  data() {
    return {
      fields: {
        amount: null,
        id: null,
      },
      item: null
    }
  },
  validations() {
    return {
      fields: {
        amount: { required },
      }
    }
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();
      this.v$.$validate();
      this.fields.id = this.person1.Donor_ID;
      if (!this.v$.$error) {
        this.item = this.fields;
        this.donate();
        this.fields.donor_id = 0;
        this.fields.amount = 0;
        this.v$.$reset();
        alert('Donation Success!')
      }

    },
    donate() {
      axios.post('http://csc364chms.cscprof.com/donations', {
        "donor_id": this.fields.id,
        "amount": this.fields.amount
      }).then(response => {
        console.log("***************************************");
        console.log(response.data);
        console.log("***************************************");
      })
        .catch(e => {
          this.errors.push(e);
        })
    },
    signup() {
      axios.post(`http://csc364chms.cscprof.com/events/${this.event1.event_id}/register`, {
        contact_id: this.person1.Contact_Id,
        event_id: this.event1.event_id
      })
    },
    resultQuery() {
      return this.filteredPeople.filter((entry) => this.filteredPeople.length ? Object.keys(this.filteredPeople[0]).some(key => ("" + entry[key]).toLowerCase().includes(this.searchQuery)) : true);
    },
    filterFirstName() {
      if (this.firstNameFilter) {
        this.filteredPeople = this.filteredPeople.sort((a, b) => {
          if (a.First_Name < b.First_Name) {
            return -1;
          }
        });
        this.firstNameFilter = false;
      }
      else {
        this.filteredPeople = this.filteredPeople.sort((a, b) => {
          if (a.First_Name > b.First_Name) {
            return -1;
          }
        });
        this.firstNameFilter = true;
      }
    },
    filterLastName() {
      if (this.lastNameFilter) {
        this.filteredPeople = this.filteredPeople.sort((a, b) => {
          if (a.Last_Name < b.Last_Name) {
            return -1;
          }
        });
        this.lastNameFilter = false;
      }
      else {
        this.filteredPeople = this.filteredPeople.sort((a, b) => {
          if (a.Last_Name > b.Last_Name) {
            return -1;
          }
        });
        this.lastNameFilter = true;
      }
    },

  },
  setup() {
    const isImageModalActive = ref(false);
    const isEventModalActive = ref(false);
    const isDonationModalActive = ref(false);
    const store = usePeopleStore();
    const firstNameFilter = ref(true);
    const lastNameFilter = ref(true);
    const { people } = storeToRefs(store);
    const { events } = storeToRefs(store);
    const filteredPeople = people;
    const person1 = people[0];
    const event1 = event[0]
    const personID = 0;
    let searchQuery = ref("");

    function fetchPeople() {
      store.fetchPeople();
      return people;
    }
    function fetchEvents() {
      store.fetchEvents();
      return events;
    }
    return { v$: useVuelidate(), people, events, fetchPeople, fetchEvents, store, isImageModalActive, isEventModalActive, isDonationModalActive, person1, event1, filteredPeople, firstNameFilter, lastNameFilter, searchQuery };
  },
  mounted() {
    this.store.fetchPeople();
    this.store.fetchEvents();
  },
}
</script>
