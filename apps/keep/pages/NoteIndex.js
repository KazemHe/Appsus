import { noteService as noteService } from '../services/noteService.js'

import NoteList from '../cmps/NoteList.js'
// import { eventBusService } from '../../../services/event-bus.service.js'

export default {
    template: `
<section class="note-list">
<!-- <NoteFilter @filter="setFilterBy"/> -->
            <NoteList v-if="notes"
            :notes="notes" 
            @remove="removeNote" 
           />
            <!-- <BookEdit @note-saved="onSaveBook"/> -->
            <!-- <BookDetails 
                v-if="selectedBook" 
                @hide-details="selectedBook = null"
                :note="selectedBook"/> -->
        </section>

    `,

    data() {
        return {
            notes: null,
            selectedBook: null,
            filteerdBy: null // filterBy: { price: 0 },
        }
    },

    created() {
        noteService.query()
            .then(notes => {
                console.log(notes);
                this.notes = notes
            })
    },

    methods: {
        removeNote(noteId) {
            console.log(noteId);
            noteService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    eventBusService.emit('show-msg', { txt: 'note removed', type: 'success' })
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'note remove failed', type: 'error' })
                })
        },

        // setFilterBy(filterBy) {
        //     console.log()
        //     this.filterBy = filterBy
        // }
    },

    computed: {
        // filteredNotes() {
        //     const regex = new RegExp(this.filterBy.title, 'i')
        //     return this.notes.filter(note => regex.test(note.title) && note.listPrice.amount >= this.filterBy.price)
        // },
    },


    components: {
        NoteList: NoteList,
    //    NoteFilter:NoteFilter,
    }
}


