import { emailService as emailService } from '../services/email.service.js'

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
import { eventBusService } from '../services/event-bus.service.js'
import EmailDetails from './EmailDetails.js'
// import EmailEdit from './EmailEdit.js'

export default {
    template: `
        <section class="email-index">
            <nav class="side-bar">
            <div><i class="fa-sharp fa-solid fa-square-envelope"></i><span class="e-sub">Mister Email</span></div>
                <RouterLink class="compose" to="/email/edit"><i class="fa-regular fa-pen-to-square"></i>compose</RouterLink>
      <div @click="filterBy.status = 'inbox'" class="status-icons"><i class="fa-solid fa-inbox" ><span class="e-sub"> index {{ this.unreadCount}}</span></i></div>
                <!-- unread emails: {{this.unreadCount}} -->    
                <div class="status-icons"><i class="fa-regular fa-star"> <span class="e-sub"> star</span></i></div>
                <div class="status-icons" @click="filterBy.status = 'trash'">  <i class="fa-solid fa-trash" ><span class="e-sub"> trash</span></i></div>
                <div class="status-icons" @click="filterBy.status = 'sent'" >  <i class="fa-solid fa-paper-plane "  ><span class="e-sub"> sent</span></i></div>
            </nav>
       

            <EmailFilter @filter="setFilterBy"/>
            <EmailList 
            v-if="emails"
            :emails="filteredEmails" 
            
            @remove="removeEmail" 
            />
            <!-- <EmailEdit @email-saved="onSaveEmail"/> -->
            <!-- <EmailDetails 
            v-if="selectedEmail" 
            @hide-details="selectedEmail = null"
            :email="selectedEmail"/> -->
        </section>
    `,
    data() {
        return {
            emails: null,
            // selectedEmail: null,
            filterBy: {subject:'', status:'' },
            unread: 0,
        }
    },
    methods: {

        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    this.emails.splice(idx, 1)
                    eventBusService.emit('show-msg', { txt: 'email removed', type: 'success' })
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'email remove failed', type: 'error' })
                })
        },



        showEmailDetails(emailId) {
            this.selectedEmail = this.emails.find(email => email.id === emailId)
        },
        onSaveEmail(newEmail) {
            this.emails.unshift(newEmail)
        },
        setFilterBy(filterBy) {
            console.log()
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredEmails() {
            console.log(this.emails)
            const regex = new RegExp(this.filterBy.subject, 'i')
            const statusReg = new RegExp(this.filterBy.status, 'i')
            console.log(this.filterBy.subject)

            return this.emails.filter(email => regex.test(email.subject) && statusReg.test(email.status))
        },

        unreadCount() {
            if (!this.emails) return
            return this.unread = this.emails.reduce((acc, email) => {

                return acc + !email.isRead

            }, 0)


        },



    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails
                console.log(emails);
            })

    },
    components: {
        EmailFilter: EmailFilter,
        EmailList: EmailList,
        EmailDetails: EmailDetails,
        // EmailEdit: EmailEdit,
    }
}