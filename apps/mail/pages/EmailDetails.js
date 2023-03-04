
import LongTxt from '../cmps/LongTxt.js'
import AddReview from '../cmps/AddReview.js'
import { emailService } from '../services/email.service.js'
import reviewPreview from '../cmps/reviewPreview.js'


export default {
    // props: ['bookId'],
    template: `
        <section   class="email-details" v-if="email">

            <nav>
     
                <h1 class="subject"><span class="e-sub">{{ email.subject }}</span></h1>
                <h3 class="email-from"><span></span>{{ email.from}}</h3><hr>
                <h1 class="subject"><span>name :</span>{{ email.name }}</h1>
                <!-- <h3 class="email-from"><span>to: :</span>{{ email.to}}</h3> -->
                <h3 class="email-content">{{ email.body}}</span></h3>
                <button>save as a note</button>
                <button>delete</button>
            <!-- <RouterLink :to="'/email/' + email.prevBookId">Previous email</RouterLink> |
                <RouterLink :to="'/email/' + email.nextBookId">Next email</RouterLink> -->
                <RouterLink  to="/email">back</RouterLink>
            </nav>

           
            <!-- <h3>{{ email.read }}</h3> -->



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
            if (!this.emailId) return
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

 

    },

    watch: {
        emailId() {
            console.log('emailId Changed!')
            this.loadEmail()
        },


    },
    components: {
        // LongTxt,
        // AddReview,
        // reviewPreview,
    }

}

