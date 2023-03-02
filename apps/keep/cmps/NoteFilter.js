export default {
    template: `
        <section class="note-filter">
            <input 
                v-model="filterBy.txt"
                @input="filter" 
                placeholder="Search"
                type="text" />


                <select v-model="filterBy.type" @input="filter">
                  <option value="">All</option>
                  <option value="NoteTxt">Text</option>
                  <option value="NoteImg">Img</option>
                  <option value="NoteVideo">Vid</option>
                  <option value="NoteTodos">Todo</option>
                </select>
        </section>
    `,
    data() {
        return {
            filterBy: { txt: '', type: '' },
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}


// v-model="filterBy.price"
// @input="filter"
// onchange="this.title=this.value"
// min="10" max="400"
// type="range" />