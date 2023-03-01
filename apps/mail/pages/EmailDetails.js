
import LongTxt from '../cmps/LongTxt.js'
import AddReview from '../cmps/AddReview.js'
import { emailService } from '../services/email.service.js'
import reviewPreview from '../cmps/reviewPreview.js'


export default {
    // props: ['bookId'],
    template: `
        <section class="book-details" v-if="email">

            <!-- <nav> -->
            <RouterLink :to="'/email/' + email.prevBookId">Previous email</RouterLink> |
                <RouterLink :to="'/email/' + email.nextBookId">Next email</RouterLink>
            <!-- </nav> -->
        <RouterLink to="/email">Back to emails</RouterLink>
            <h2>{{ email.subject }}</h2>
            <h3>{{ email.body}}</span></h3>
           
            <h3>{{ email.from}}</h3>
            <h3>{{ email.read }}</h3>



            <!-- <section v-if="book.reviews"> -->
            <!-- <h1>reviews<h1>
            <ul> -->
                <!-- <li v-for="review in book.reviews"> -->
                    <!-- <reviewPreview :review="review"/> -->
 
                    <!-- <button @click="showDetails(book.id)">Details</button> -->
                    <!-- <button @click="removeReview(review.id)">x</button> -->
                <!-- </li>
            </ul>
</section>
                    <ul>
                    <li  v-for="review in reviews" :key="book.id">
                    </li>    
                    </ul> -->

            <button @click="closeDetails">Back </button>
        </section>

<!-- <LongTxt :txt=txt :length="length" /> -->
<!-- <AddReview v-if="book" :bookId="book.id" /> -->

    `,

    methods: {
        closeDetails() {
            this.$router.push('/email')
        },

        removeReview(reviewId) {
            console.log(reviewId)
            // console.log(this.book.review)
        },
        loadEmail() {
            console.log(this.emailId)
            emailService.get(this.emailId)
                .then(email => this.email = email)
        },


    },

    data() {
        return {
            // txt: this.book.description,
            // length : 100,
            email: null
        }
    },

    created() {

        this.loadEmail()
        // console.log('Params:', this.$route.params)
        // const { bookId } = this.$route.params
        // bookService.get(bookId)
        //     .then(book => this.book = book)
    },
    computed: {

        emailId() {
       
            return this.$route.params.emailId
        },

        save() {
            console.log('hi')
        },

        // getDescreption() {
        //     return {
        //         txt: this.book.description,
        //         length: 100,
        //     }
        // },

 

        // priceClass() {
    // },

    watch: {
        emailId() {
            console.log('BookId Changed!')
            this.loadBook()
        },


    },
    components: {
        // LongTxt,
        // AddReview,
        // reviewPreview,
    }

}
}
