// import { bookService } from "../services/book.service.js"
// import { eventBusService } from "../services/event-bus.service.js"
// import { utilService } from "../services/util.service.js"
// import {surveyService} from  "../services/survey.service.js"
// import RateBySelect from "./RateBySelect.js"
// import RateByTextbox from "./RateByTextbox.js"


export default {
    props: ['bookId'],
    template: `

<section class="add-review">
 <h2>add review </h2>
<form @submit.prevent="saveReview">
    <h2>{{book}}</h2> 
    
                <input type="text" v-model="fullname" placeholder="full name"> -->
              
                <input type="date" v-model.number="date"> -->
            
                
                <!-- <legend>Select raiting style:</legend -->
    <!-- <div> -->
      <!-- <input type="radio" id="huey" name="drone" value="huey"
             checked>
      <label for="huey">select</label>
      <input type="radio" id="dewey" name="drone" value="dewey">
      <label for="dewey">text box</label> -->
    <!-- </div> -->
    <section v-if="survey">
        <!-- <h2 :style="{color: survey.color}">{{survey.title}}</h2> -->
            <form @submit.prevent="save">
                <div v-for="(cmp, idx) in survey.cmps">
                    <Component 
                        :is="cmp.type"  
                        :info="cmp.info" 
                        @setVal="setAns($event, idx)" />
                </div>
                <button>Save</button>
            </form>
            <pre>{{answers}}</pre>
        </section>
              
                <!-- <input type="text" v-modal="book." -->
                <button>Save</button>
            </form>
</section>
    `,
    data() {
        return {

            fullname: '',
            rate: null,
            date: null,
            survey: null,
            answers: []
        }

    },
    created() {
        surveyService.getSurvey()
            .then(survey => {
                console.log(survey)
                this.survey = survey
                console.log(this.survey)
                this.answers = new Array(this.survey.cmps.length)
            })

    },
    methods: {
        setAns(ans, idx) {
            console.log('Setting the answer: ', ans, 'idx:', idx);
            // this.answers[idx] = ans
            this.answers.splice(idx, 1, ans)
    
        },
        save() {
            console.log('Saving..', this.answers);
        },

        saveReview() {

            console.log('Review')
            const review = {
                id: utilService.makeId(),
                fullname: this.fullname,
                rating: this.rate,
                readAt: this.date,
            }

            console.log(review)
            console.log(this.bookId, review)
            bookService.addReview(this.bookId, review)
                .then(savedReview => {

                    eventBusService.emit('show-msg', { txt: 'book review', type: 'success' })
                    // this.$router.push('/book')
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'book review failed', type: 'error' })
                })

        }


    },

    components: {
        // RateBySelect,
        // RateByTextbox,
        // RatingService,
    }

}


