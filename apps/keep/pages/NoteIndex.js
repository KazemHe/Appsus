import { noteService as noteService } from '../services/noteService.js'


import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'
// import { eventBusService } from '../../../services/event-bus.service.js'

export default {
    template: `
<section class="note-index">

<NoteFilter @filter="setFilterBy"/>

            <NoteList v-if="notes"
            :notes="filteredNotes" 
            @remove="removeNote"
            @edit="editTxt"
            @pinUp="pinNote"/>

          
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
            filterBy:{},
            currId: ''
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
                //     eventBusService.emit('show-msg', { txt: 'note removed', type: 'success' })
                // })
                // .catch(err => {
                //     eventBusService.emit('show-msg', { txt: 'note remove failed', type: 'error' })
                })
        },


        editTxt(noteId) {
           console.log(x);
           
         return  x = noteService.get(noteId)
             
          },



        
        setFilterBy(filterBy) {
            
            this.filterBy = filterBy
            console.log(this.filterBy)
        }
    },

    computed: {
        filteredNotes() {
            console.log('hello', this.filterBy);
            const regex = new RegExp(this.filterBy.type, 'i')
            return this.notes.filter(note => regex.test(note.type) )// && note.listPrice.amount >= this.filterBy.price)
        },
    },

    data() {
        return {
          notes: null,
          selectedBook: null,
          filterBy: {},
          currId: null
        }
      },
      watch: {
        currId(newValue, oldValue) {
          console.log(`currId changed from ${oldValue} to ${newValue}`);
          // Do something with the new value
        }
      },



    components: {
        NoteList: NoteList,
        NoteFilter: NoteFilter,
    }
}


