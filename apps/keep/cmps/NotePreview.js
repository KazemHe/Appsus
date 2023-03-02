import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
// type:note-txt

export default {
    props: ['note'],
    template: `
    
        <article class="note-preview" >
        
        <component :is="note.type" :note="note" /> 
        <input type="color" v-model="selectedColor" />
                    <button @click="remove(note.id)"><i class="fa-solid fa-trash"></i></button>
                    <button @click="pinUp(note)"> <i class="fa-solid fa-thumbtack"></i></button>
                    <button @click="edit(note.id)"><i class="fa-solid fa-pencil"></i></button>
        </article>
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
    },



    components: {
        NoteImg,
        NoteTxt,
        NoteTodos
    }
}