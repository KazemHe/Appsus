export default {
    template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.subject"
                @input="filter" 
                placeholder="Search"
                type="text" />
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
            filterBy: { subject: '' },
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy)
        }
    }
}