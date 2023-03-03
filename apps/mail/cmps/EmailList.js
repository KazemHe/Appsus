import EmailPreview from './EmailPreview.js'
import { emailService } from "../services/email.service.js"


export default {
    props:['emails'],
    template: `
        <section >
           <!-- <h1>list</h1> -->
            <ul>
                <li  class="email-list" v-for="email in emails" :key="email.id" @click.stop="moveToDetails(email)">
                    <!-- <RouterLink :to="'/email/'+email.id">Details</RouterLink>  -->
                    <EmailPreview :email="email"/>
     
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
    methods: {
    //     remove(emailId) {
    //         this.$emit('remove', emailId)
    //     },
    //     // showDetails(emailId){
    //     //     this.$router.push('/email/'+ emailId)
    //     // }
      moveToDetails(email){
          
          console.log(email.isRead)
        //   if(!email.isRead){
        //       email.isRead =true
        //       emailService.save(this.email)
        //     } 
            this.$router.push('/email/'+email.id)
              console.log(email.isRead)
           
        },
    //     moveToEdit(email){
    //         this.$router.push('/email/edit/'+email.id)
    //     }
    },
    components: {
        EmailPreview: EmailPreview,
    },

    computed :{
        readClass() {
            return {

                // 'unread': this.email.isRead === false,
                // 'read': this.email.isRead === true,
            }
    }
}
}