import { noteService as noteService } from '../services/noteService.js'

import NoteEdit from '../cmps/NoteEdit.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
    template: `
<section class="note-index">
<NoteEdit @save="save" />

<NoteFilter @filter="setFilterBy"/>

            <NoteList v-if="notes"
            :notes="filteredNotes" 
            @remove="removeNote"
            
          />

          
          <!-- <NoteList v-if="onEdit" /> -->
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
            filterBy: {},
            currNote: ''
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
                    eventBus.emit('show-msg', { txt: 'note removed', type: 'success' })
                    })
                    .catch(err => {
                        eventBus.emit('show-msg', { txt: 'note remove failed', type: 'error' })
                })
        },

        save(note) {
            this.notes.push(note)
        },

        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },

    computed: {
        filteredNotes() {
            const regex = new RegExp(this.filterBy.type, 'i')
            return this.notes.filter(note => regex.test(note.type))// note. )
        },
    },

    components: {
        NoteList: NoteList,
        NoteFilter: NoteFilter,
        NoteEdit
    }
}


