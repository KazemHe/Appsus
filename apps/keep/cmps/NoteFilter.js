export default {
    template: `
      <section class="note-filter">
  <div class="search-bar">
    <i class="fa-solid fa-search"></i>
    <input class="search-input"
      v-model="filterBy.txt"
      @input="filter" 
      placeholder="Search"
      type="text" />
  </div>
  
  <div class="filter-bar">
    <label for="filter-select">Filter by:</label>
    <select class="filter-select" id="filter-select" v-model="filterBy.type" @input="filter">
      <option value="">All</option>
      <option value="NoteTxt">Text</option>
      <option value="NoteImg">Img</option>
      <option value="NoteVideo">Vid</option>
      <option value="NoteTodos">Todo</option>
    </select>
  </div>
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