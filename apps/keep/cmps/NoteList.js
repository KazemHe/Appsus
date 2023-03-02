import NotePreview from './NotePreview.js'

export default {
    props:['notes'],
    template: `
        <section class="note-list">
           <!-- <h1>list</h1> -->
            <ul>
                <li class="card-note" v-for="note in notes" :key="note.id" :style="changeStyle(note)" >
                    <NotePreview :note="note"/>
                    <!-- <RouterLink :to="'/note/'+note.id">Details</RouterLink> |
                    <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> | -->
                    <!-- <button @click="showDetails(book.id)">Details</button> -->
                    <input type="color" v-model="selectedColor" />
                    <button @click="remove(note.id)">x</button>
                    <button @click="pinUp(note)"> PIN ME UP</button>
                    <button @click="edit(note.id)">edid</button>
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
        pinUp(noteId){
            this.$emit('pinUp', noteId)
        },

        remove(noteId) {
            this.$emit('remove', noteId)
        },

        edit(noteId){
            this.$emit('edit', noteId)
        },

        changeStyle(note){

        }

        // showDetails(bId){
        //     // this.$router.push('/book/'+ bookId)
        // },
    },
    components: {
        NotePreview,
    }
}