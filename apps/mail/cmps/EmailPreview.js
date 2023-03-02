export default {
    props: ['email'],
    template: `
        <article class="email-container">
            
            <h2 >{{ email.from }}</h2>
            <h2>{{ email.to }}</h2>
            <h2 class="email-subject">{{ email.subject }}</h2>
            <h3 class="email-body">{{ email.body }}</h3>
            <!-- <RouterLink :to.stop="'/email/edit/'+email.id"><i aria-hidden="true" title="Edit a Message" class="fa fa-pencil"></i></RouterLink> -->
            
            <!-- <button @click="showDetails(email.id)">Details</button> -->
            <!-- <button @click="remove(email.id)">delet</button> -->
            <div @click.stop="moveToEdit(email)"><i aria-hidden="true" title="Edit a Message" class="fa fa-pencil"></i></div>
                    <i aria-hidden="true" title="delete a message" class="fa fa-trash" @click.stop="remove(email.id)" ></i>
                    <i  class="fa fa-envelope-open"></i> 
        </article>
    `,

methods: {
    remove(emailId) {
        this.$emit('remove', emailId)
    },
    // showDetails(emailId){
    //     this.$router.push('/email/'+ emailId)
    // }
//   moveToDetails(email){
//         this.$router.push('/email/'+email.id)
//     },
    moveToEdit(email){
        this.$router.push('/email/edit/'+email.id)
    }
},



    computed: {



        readClass() {
            
            return {

                // 'read': this.email.isRead === true,
                // 'unread': this.email.iRead === false ,
            }

        }
    },

    created(){
        console.log(this.email.isRead)


    }
}