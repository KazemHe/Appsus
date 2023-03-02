export default {
    props: ['email'],
    template: `
        <article :class="readClass">
            <h2 class="email-subject">{{ email.subject }}</h2>
            <h3 class="email-body">{{ email.body }}</h3>

        </article>
    `,


    computed: {
        readClass() {
            
            return {

                'read': this.email.isRead === true,
                'unread': this.email.iRead === false ,
            }

        }
    },

    created(){
        console.log(this.email.isRead)


    }
}