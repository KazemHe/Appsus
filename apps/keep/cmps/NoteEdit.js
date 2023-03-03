import { noteService } from "../services/noteService.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
<section class="note-edit">
<form @submit.prevent="save" >
    <div class="edit-texts">
        <span class="edit-head">
            ADD YOUR NOTE: 
        </span>
        <label for="title">title:</label>
        <input name="title" type="text" v-model="note.info.title" >
        <label for="txt">txt:</label>
        <input name="txt" type="text" v-model="note.info.txt" >
        <button class="v-button"> <i class="fa-solid fa-v"></i></button>
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








