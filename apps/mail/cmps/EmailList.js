import EmailPreview from './EmailPreview.js'
import { emailService } from "../services/email.service.js"


export default {
    props: ['emails', 'emailId'],
    template: `
        <section >
            <ul>
                <li @mouseover="isHovering" class="email-list" v-for="email in emails" :key="email.id" @click.stop="moveToDetails(email)">
                    
                    <!-- <RouterLink :to="'/email/'+email.id">Details</RouterLink>  -->
                    <EmailPreview :show="show" :email="email" />
                    <!-- v-if="email.removed !== true -->
                    <!-- <div @click.stop="moveToEdit(email)"><i aria-hidden="true" title="Edit a Message" class="fa fa-pencil"></i></div> -->
                    <!-- <RouterLink :to.stop="'/email/edit/'+email.id"><i aria-hidden="true" title="Edit a Message" class="fa fa-pencil"></i></RouterLink> -->
                    
                    <!-- <button @click="showDetails(email.id)">Details</button> -->
                    <!-- <button @click="remove(email.id)">delet</button> -->
                    <!-- <i aria-hidden="true" title="delete a message" class="fa fa-trash" @click.stop="remove(email.id)" ></i> -->
                    <!-- <i  class="fa fa-envelope-open"></i>  -->
                </li>
            </ul>
        </section>
    `,
    data() {
       return{

           show : false, 
       }


    },
    methods: {

        removeEmail(emailId) {
            console.log('im a father fukcker', emailId)
            emailService.remove(emailId)
                .then(() => {
                    const idx = this.emails.findIndex(email => email.id === emailId)
                    this.emails.splice(idx, 1)
                    console.log('after then')


                })
                .catch(err => {
                    console.log('err')
                    // eventBusService.emit('show-msg', { txt: 'email remove failed', type: 'error' })
                })
        },


        isHovering(){

            this.show = !this.show
        },

        //     remove(emailId) {
        //         this.$emit('remove', emailId)
        //     },
        //     // showDetails(emailId){
        //     //     this.$router.push('/email/'+ emailId)
        //     // }
        moveToDetails(email) {

            console.log(email.isRead)
            if (!email.isRead) {
                email.isRead = true
                emailService.save(email)
            }
            this.$router.push('/email/' + email.id)
            console.log(email.isRead)

        },
        //     moveToEdit(email){
        //         this.$router.push('/email/edit/'+email.id)
        //     }
    },
    components: {
        EmailPreview: EmailPreview,
    },
    created() {



        // console.log('created')

        // const statusReg = new RegExp('inbox', 'i')
        // // console.log(this.filterBy.subject)

        // return this.emails.filter(email => statusReg.test(email.status))



    },

    computed: {
        readClass() {
            return {

                // 'unread': this.email.isRead === false,
                // 'read': this.email.isRead === true,
            }
        }
    }
}