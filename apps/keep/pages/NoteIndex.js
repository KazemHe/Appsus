    import { noteService as noteService } from '../services/noteService.js'

    import NoteEdit from '../cmps/NoteEdit.js'
    import NoteFilter from '../cmps/NoteFilter.js'
    import NoteList from '../cmps/NoteList.js'
    import { eventBus } from '../../../services/event-bus.service.js'

    export default {
        name: 'NoteIndex',
        template: `
         <NoteFilter @filter="setFilterBy"/>
    <section class="note-index">
    <NoteEdit @save="save" />
    
                <NoteList
                    :notes="getPinned"
                    v-if="notes && getPinned "
                    @remove="removeNote"
                    @changePinMode="changePinMode" 
                    @updateNote="updateNote"
                    @duplicate="duplicateNote"
                />
                <NoteList
                    :notes="getUnPinned"
                    v-if="notes"
                    @remove="removeNote"
                    @updateNote="updateNote"
                    @changePinMode="changePinMode" 
                    @duplicate="duplicateNote"
                />
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
         
            updateNote(note){
                noteService.save(note)
                .then(savedNote => {
                    const idx = this.notes.findIndex(n => n.id === savedNote.id) 
                    this.notes.splice(idx, 1, savedNote)
            })
            },

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

            duplicateNote(note) {
                const copy = { ...note }
                copy.id =''
                noteService.save(copy).then(copy => {
                   this.notes.push(copy)
                });
            },
            
            changePinMode(note) {
                note.isPinned = !note.isPinned
                noteService.save(note)
            },

            save(note) {
                console.log(note);
                this.notes.push(note)
            },

            setFilterBy(filterBy) {
                this.filterBy = filterBy
            }
        },

        computed: {

            getPinned() {
                const pinnedNotes = this.notes.filter(note => note.isPinned)
                const titleRegex = new RegExp(this.filterBy.title, 'i')
                const typeRegex = new RegExp(this.filterBy.type, 'i')
                return pinnedNotes.filter(note => titleRegex.test(note.info.title) && typeRegex.test(note.type))
              },
              getUnPinned() {
                const unpinnedNotes = this.notes.filter(note => !note.isPinned)
                const titleRegex = new RegExp(this.filterBy.search, 'i')
                const typeRegex = new RegExp(this.filterBy.type, 'i')
                return unpinnedNotes.filter(note => titleRegex.test(note.info.title) && typeRegex.test(note.type))
              },
            },
            

        components: {
            NoteList,
            NoteFilter,
            NoteEdit
        }
    }

  
 