import { emailService as emailService } from '../services/email.service.js'

import EmailFilter from '../cmps/EmailFilter.js'
import EmailList from '../cmps/EmailList.js'
import { eventBusService } from '../services/event-bus.service.js'
import EmailDetails from './EmailDetails.js'
// import EmailEdit from './EmailEdit.js'

export default {
    template: `
        <section class="email-index">

        <RouterLink to="/email/edit">compose</RouterLink>
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
            filterBy: {},
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
            console.log(this.filterBy.subject)
            return this.emails.filter(email => regex.test(email.subject))
        }
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