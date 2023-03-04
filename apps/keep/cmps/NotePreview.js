import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"

export default {
    props: ['note'],
    emits: ['updateNote'],
    name: 'NotePreview',
    template: `
    <div></div>
        <article class="note-preview" @mouseover="isHovered = true" @mouseleave="isHovered = false">
            <component :is="note.type" :note="note" /> 
            <div class="flex" v-if="isHovered">
                <button class="edit-button"> <input type="color" v-model="selectedColor" class="fa-solid fa-palette edit-button" @input="changeColor" /> </button>
                <button class="edit-button" @click="remove(note.id)"><i class="fa-solid fa-trash"></i></button>
                <button class="edit-button" @click="changePinMode(note)"><i class="fa-solid fa-thumbtack"></i></button>
                <button class="edit-button" @click="duplicate(note)"> <i class="fa-regular fa-clone"></i></button>
            </div>
        </article>
    `,
    data() {
        return {
            selectedColor: '',
            isHovered: false
        }
    },

    created() {
        
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
            const note = JSON.parse(JSON.stringify(this.note))
            if(!note.style){
                note.style = {}
            }
            note.style.backgroundColor = this.selectedColor
            // console.log(note.style.backgroundColor);
            this.$emit('updateNote', note)
            // this.$emit('changeColor', selectedColor , noteId);
        },

    },
  

    components: {
        NoteImg,
        NoteTxt,
        NoteTodos
    }
}