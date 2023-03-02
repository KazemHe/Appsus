import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"

export default {
    props: ['note'],
    template: `
    
        <article class="note-preview">
        <div :style="{ backgroundColor: selectedColor }">
    <input type="color" v-model="selectedColor" />
    
    <component :is="note.type" :note="note"/>   
    </div>
        </article>
    `,

    data() {
        return {
            selectedColor: "#ffffff"
        }
    },
    components: {
        NoteImg,
        NoteTxt, 
        NoteTodos
    }
}