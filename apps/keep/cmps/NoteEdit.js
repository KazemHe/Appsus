import { noteService } from "../services/noteService.js";
// import { eventBusService } from "../../../services/event-bus.service.js"

export default {
    template: `
<section class="note-edit">

<form @submit.prevent="save">
                <label for="title">title:</label>
                <input name="title" type="text" v-model="note.info.title" placeholder="write note">
                <label for="txt">txt:</label>
                <input name="txt" type="text" v-model="note.info.txt" placeholder="write note">
                <label for="bg-color">bg-color:</label>
                <input name="bg-color" type="color" v-model="note.style.backgroundColor" placeholder="write note">
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
                console.log(this.note);
                noteService.save(this.note)
                    .then(savedNote => {
                        eventBusService.emit('show-msg', { txt: 'note saved', type: 'success' })
                        this.$router.push('/note')
                    })
                    .catch(err => {
                        eventBusService.emit('show-msg', { txt: 'note save failed', type: 'error' })
                    })
            }
        }
    }

      






