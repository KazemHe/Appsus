export default {
    template: `
        <section class="email-filter">
        <!-- <i class="fa-solid fa-magnifying-glass"></i> -->
            <input 
                v-model="filterBy.subject"
              
                placeholder="🔍 Search"
                type="text"  />
            <!-- <input 
                v-model="filterBy.price"
                @input="filter" 
                onchange="this.title=this.value"
                min="10" max="400"
                type="range" /> -->
               
        </section>
    `,
    data() {
        return {
            filterBy: { subject: '',status : 'inbox' },
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    },



    watch: {
        filterBy: {
            handler() {
                console.log('filterBy changed', this.filterBy)
                this.$emit('filter', this.filterBy)
            },
            deep: true
        },
        'filterBy.subject'() {
            console.log('filterBy VENDOR changed', this.filterBy)
            this.$emit('filter', this.filterBy)
        },
    }


}