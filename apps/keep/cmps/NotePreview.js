import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"

export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <component :is="note.type" :note="note" /> 

            <button @click="updateNoteId(note.id)"> <input type="color" v-model="selectedColor" class="fa-solid fa-palette" /> </button>
            <button @click="remove(note.id)"><i class="fa-solid fa-trash"></i></button>
            <button @click="changePinMode(note)"><i class="fa-solid fa-thumbtack"></i></button>
            <button @click="duplicate(note)"><i class="fa-solid fa-pencil"></i></button>
        </article>
    `,
    data() {
        return {
            selectedColor: "#ffffff",
            noteId: ''
        }
    },
    created() {
        console.log(this.note);
    },
    methods: {
        updateNoteId(id) {
            console.log(id);
            
            this.noteId = id;
        },

        changePinMode(note) {
            this.$emit('changePinMode', note)
        },
        remove(noteId) {
            this.$emit('remove', noteId)
        },
        duplicate(note) {
           
            this.$emit('duplicate', note)
        },
        changeColor() {
            this.$emit('changeColor', selectedColor , this.noteId );
        }
    },
    watch: {
        selectedColor(newVal) {
           
            this.$emit('changeColor', newVal);
        
        }
    },
    components: {
        NoteImg,
        NoteTxt,
        NoteTodos
    }
}