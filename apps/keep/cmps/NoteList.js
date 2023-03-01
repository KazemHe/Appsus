import NotePreview from './NotePreview.js'

export default {
    props:['notes'],
    template: `
        <section class="note-list">
           <!-- <h1>list</h1> -->
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <NotePreview :note="note"/>
                    <!-- <RouterLink :to="'/note/'+note.id">Details</RouterLink> |
                    <RouterLink :to="'/note/edit/'+note.id">Edit</RouterLink> | -->
                    <!-- <button @click="showDetails(book.id)">Details</button> -->
                    <button @click="remove(note.id)">x</button>
                </li>
            </ul>
        </section>
    `,

    
    methods: {
        remove(noteId) {
            
            this.$emit('remove', noteId)
        },
        // showDetails(bId){
        //     // this.$router.push('/book/'+ bookId)
        // },
    },
    components: {
        NotePreview,
    }
}