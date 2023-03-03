import NotePreview from './NotePreview.js'

export default {
    props:['notes'],
    template: `
        <section class="note-list">
           <!-- <h1>list</h1> -->
            <ul>
                <li class="card-note" v-for="note in notes" :key="note.id"  >
                    <NotePreview :note="note"  @remove="remove" @edit="edit" @changePinMode="changePinMode" @changeColor="changeColor" @duplicate="duplicate"
                    />
                    <!-- <button @click="remove(note.id)"><i class="fa-solid fa-trash"></i></button> -->
                    <!-- <RouterLink :to="'/note/'+note.id">Details</RouterLink> |
                    <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> | -->
                    <button @click="showDetails(book.id)">Details</button>
                   
                </li>
            </ul>
        </section>
    `,

    
data() {
    return {
        selectedColor: "#ffffff"
    }
},
    methods: {
        changePinMode(note){
            
            this.$emit('changePinMode', note)
        },

        edit(note){
            this.$emit('edit', note)
        },

        remove(noteId) {
          
            this.$emit('remove', noteId)
        },

        duplicate(note){
            
            this.$emit('duplicate', note)
        },

        changeColor(selectedColor , noteId) {
           
            this.$emit('changeColor', selectedColor, noteId)
        }

        // showDetails(bId){
        //     // this.$router.push('/book/'+ bookId)
        // },
    },
    components: {
        NotePreview,
    }
}
