import { noteService } from "../services/noteService.js";
import { eventBus } from "../../../services/event-bus.service.js"

export default {
    template: `
<section class="note-edit">

<form @submit.prevent="save" >

                <label for="title">title:</label>
                <input name="title" type="text" v-model="note.info.title" >

                <label for="txt">txt:</label>
                <input name="txt" type="text" v-model="note.info.txt" >

                <label for="bg-color">bg-color:</label>
                <input name="bg-color" type="color" v-model="note.style.backgroundColor" >

                <button>Save</button>
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








