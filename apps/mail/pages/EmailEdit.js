import { emailService } from "../services/email.service.js"
import { eventBusService } from "../services/event-bus.service.js"


export default {
    template: `
        <section class="email-edit"> 
        <!-- <h2>{{(email.id)? 'Edit' : 'Add'}} a email</h2> -->
            <h2>sent a email</h2>
           <form @submit.prevent="save"> 
        
               <input type="text" v-model="email.name" placeholder="to name :">
               <input type="text" v-model="email.to" placeholder="to email :">
                <input type="text" v-model="email.subject" placeholder="subject">
                <input type="text" v-model="email.body" placeholder="enter your next" >
                <!-- <input type="text" v-modal="email." -->
                <button>send</button> 
            </form>
        </section>
    `,
    data() {
        return {
            email: emailService.getEmptyEmail()
        }
    },
    created(){
        const {emailId} = this.$route.params
        if (emailId) {
            emailService.get(emailId)
                .then(email => this.email = email)
        }
    },
    methods: {
        // sent() {
        //     emailService.save(this.email)
        //         .then(savedEmail => {
        //             this.email = emailService.getEmptyEmail()
        //             this.$emit('email-saved', savedEmail)
        //         })
        // },


        save() {
            emailService.save(this.email)
                .then(savedEmail=> {
                    console.log('email sent')
                    eventBusService.emit('show-msg', { txt: 'email sent', type: 'success' })
                    this.$router.push('/email')
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'email sent failed', type: 'error' })
                })

        }
    }
}