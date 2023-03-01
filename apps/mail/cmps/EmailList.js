import EmailPreview from './EmailPreview.js'

export default {
    props:['emails'],
    template: `
        <section class="email-list">
           <!-- <h1>list</h1> -->
            <ul>
                <li v-for="email in emails" :key="email.id">
                    <EmailPreview :email="email"/>
                  
                    <RouterLink :to="'/email/'+email.id">Details</RouterLink> |
                    <RouterLink :to="'/email/edit/'+email.id">Edit</RouterLink> |
                    <!-- <button @click="showDetails(email.id)">Details</button> -->
                    <button @click="remove(email.id)">delet</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId)
        },
        // showDetails(emailId){
        //     this.$router.push('/email/'+ emailId)
        // },
    },
    components: {
        EmailPreview: EmailPreview,
    }
}