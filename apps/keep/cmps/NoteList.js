import NotePreview from './NotePreview.js'

export default {
    props:['notes'],
    template: `
        <section class="note-list">
          
            <ul>
                <li class="card-note" v-for="note in notes" :style="note.style" :key="note.id"  >
                    <NotePreview :note="note"  @remove="remove" @edit="edit" @changePinMode="changePinMode" @updateNote="updateNote" @changeColor="changeColor" @duplicate="duplicate"
                    />
                </li>
            </ul>
        </section>
    `,

    
data() {
    return {
        selectedColor: ""
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
        updateNote(note){
            console.log(note);
            this.$emit('updateNote', note)
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
