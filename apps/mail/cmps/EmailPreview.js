import { emailService } from "../services/email.service.js"

export default {
    props: ['email'],
    template: `
        <article :class="readClass" class="email-container ">
            

        <div class="fromto">
            <i class="fa-regular fa-star"></i> <span clas="e-sub">{{ email.name}}</span>
            <!-- <h2>to {{ email.to }}</h2> -->
</div>

            <!-- <div class="email-body"> -->
            <!-- <h2 class="email-subject">{{ email.subject }}</h2> -->
            <p class="email-body"><span class="e-sub">{{ email.subject }}</span> {{ email.body }}</p>
<!-- </div> -->
            <!-- <RouterLink :to.stop="'/email/edit/'+email.id"><i aria-hidden="true" title="Edit a Message" class="fa fa-pencil"></i></RouterLink> -->
            <!-- <button @click="showDetails(email.id)">Details</button> -->
            <!-- <button @click="remove(email.id)">delet</button> -->
            <div class="icons">
                <span> {{formattedDate}}</span>
            <i @click.stop="moveToEdit(email)" aria-hidden="true" title="Edit a Message" class="fa fa-pencil"></i>
                    <i aria-hidden="true" title="delete a message" class="fa fa-trash" @click.stop=" remove(email.id)" ></i>
          
                    <i  class="fa fa-envelope-open"></i> 
</div>
        </article>
    `,

    data() {

        return {

            sent: this.email.sentAt,
        }

    },



    methods: {
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
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
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


    }
}