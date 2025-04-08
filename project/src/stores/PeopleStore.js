import { defineStore } from 'pinia'
import axios from "axios"

export const usePeopleStore = defineStore("people", {

    state: () => ({
        people: [],
        events: [],
        donations: [],
    }),

    getters: {
        getPeople(state) {
            return state.people;
        },
        getEvents(state) {
            return state.events;
        },
        getDonations(state) {
            return state.donations;
        }
    },

    actions: {
        async fetchPeople() {
            try {
                const response = await axios.get('http://csc364chms.cscprof.com/contacts')
                this.people = response.data;
                for(const person of this.people){ 
                    person.Date_of_Birth = person.Date_of_Birth?.replace(' 00:00:00', '')
                }
            }
            catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchEvents() {
            try {
                const response = await axios.get('http://csc364chms.cscprof.com/events')
                this.events = response.data;
                for(const event of this.events){ 
                    event.Event_Start_Date = event.Event_Start_Date?.replace(' 00:00:00', '')
                    event.Event_End_Date = event.Event_End_Date?.replace(' 00:00:00', '')
                }
            }
            catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchDonations() {
            try {
                const response = await axios.get('http://csc364chms.cscprof.com/donations')
                this.donations = response.data;
                for(const donation of this.donations){ 
                     donation.Donation_Date = donation.Donation_Date?.replace(' 00:00:00', '')
                     donation.Donation_ID = donation.Donation_ID?.toString();
                     donation.Donor_ID = donation.Donor_ID?.toString();
                     donation.Donation_Amount = donation.Donation_Amount?.toString();
                }
                
            }
            catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});