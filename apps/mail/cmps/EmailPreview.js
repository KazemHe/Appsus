import { emailService } from "../services/email.service.js"

export default {
    props: ['email' ,'show'],
    template: `
        <article :class="readClass" class="email-container ">
            

        <div class="fromto">
            <i @click.stop="isStared" class="fa-regular fa-star"></i> <span clas="e-sub">{{ email.name}}</span>
</div>


            <p class="email-body"><span class="e-sub">{{ email.subject }}</span> {{ email.body }}</p>

            <div class="action-icons">
                <!-- <span  v-if="!this.show"> {{formattedDate}}</span>
                <div class="action-icons"  v-if="this.show && email===email" > -->
                    <div class="action-icons" >
                    <span > {{formattedDate}}</span>
            <i @click.stop="moveToEdit(email)" aria-hidden="true" title="Edit a Message" class="fa fa-pencil"></i>
                    <i aria-hidden="true" title="delete a message" class="fa fa-trash" @click.stop=" remove(email.id)" ></i>
          
                    <i  v-if="email.isRead" class="fa fa-envelope-open"></i> 
                    <i  v-if="!email.isRead" class="fa-solid fa-envelope"></i> 
</div>
</div>
        </article>
    `,

    data() {

        return {

            sent: this.email.sentAt,
            isStared : this.email.isStared 
        }

    },



    methods: {
        isStared(){

        },
        remove(emailId) {
            console.log('remove', emailId)
            if (this.email.removed) {
                this.email.status = 'deleted',
                    console.log('remove son of the bitch remove', emailId)
                console.log('remove2', emailId)

                this.$parent.removeEmail(emailId)
            }
            else {

                this.email.removed = true,
                    this.email.status = 'trash',
                    emailService.save(this.email)
            }


            // this.$emit('remove', emailId)
        },
        // showDetails(emailId){
        //     this.$router.push('/email/'+ emailId)
        // }
        //   moveToDetails(email){
        //         this.$router.push('/email/'+email.id)
        //     },
        moveToEdit(email) {
            this.$router.push('/email/edit/' + email.id)
        }
    },



    computed: {

       

        formattedDate() {
            const date = new Date(this.sent);
            const options = { month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        },


        readClass() {

            return {

                'unread': this.email.isRead,
                'read': !this.email.isRead,
            }

        }
    },

    created() {
        console.log(this.email.isRead)
console.log(this.show)

    }
}