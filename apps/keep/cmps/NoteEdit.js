import { noteService } from "../services/noteService.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
<section class="note-edit">

<form @submit.prevent="save" >
<span class="edit-head">
    ADD YOUR NOTE 
    <button> <i class="fa-solid fa-v"></i></button>
</span>
                  <div class="edit-texts">
                <label for="title">title:</label>
                <input name="title" type="text" v-model="note.info.title" >
                <label for="txt">txt:</label>
                <input name="txt" type="text" v-model="note.info.txt" >
                </div>

                <div class="edit-color" >
                <label for="bg-color">bg-color:</label>
                <input name="bg-color" type="color" v-model="note.style.backgroundColor" >
                </div>

               

                </form>
</section>

    `,

    data() {
        return {
            note: noteService.getEmptyNote()
        }
    },


    created() {
        const { noteId } = this.$route.params
        if (noteId) {
            noteService.get(noteId)
                .then(note => this.note = note)
        }
    },

    methods: {
        save() {
            noteService.save(this.note).then(note => this.$emit('save', note))

        },


    }
}








