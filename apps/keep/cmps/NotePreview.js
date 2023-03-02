import NoteImg from "./NoteImg.js"
import NoteTodos from "./NoteTodos.js"
import NoteTxt from "./NoteTxt.js"
// type:note-txt

export default {
    props: ['note'],
    template: `
    
        <article class="note-preview" >
       
       
        <component :is="note.type" :note="note" /> 
        </article>
    `,

    components: {
        NoteImg,
        NoteTxt,
        NoteTodos
    }
}