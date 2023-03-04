'use strict'

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()


export const noteService = {
    query,
    save,
    remove,
    get,
    createNote, 
    pinNote,
    getNoteId, 
    getEmptyNote


    // getEmptyBook: getEmptyBook,
    // addReview,

}

function getNoteId(noteId){
    return storageService.query(NOTE_KEY)
}


function query(filterBy = {}) { 

    return storageService.query(NOTE_KEY)
    .then(notes => {
        const regexType = new RegExp(filterBy.type, 'i')
        const regex = new RegExp(filterBy.txt, 'i')
        return notes.filter(note => {
            return (regex.test(note.info.txt) || regex.test(note.info.title))
            && regexType.test(note.type)
        })
    })
}


function get(noteId) {
    console.log(storageService.get(NOTE_KEY, noteId));
    return storageService.get(NOTE_KEY, noteId)
       
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTE_KEY, note)
    else return storageService.post(NOTE_KEY, note)
}


function getEmptyNote(type) {
    switch (type) {
      case 'NoteTxt':
        return {
          type: 'NoteTxt',
          info: { txt: '' }
        }
      case 'NoteImg':
        return {
          type: 'NoteImg',
          info: { url: '', title: '' }
        }
      case 'NoteTodos':
        return {
          type: 'NoteTodos',
          info: { title: '', todos: [{ txt: '', doneAt: null }] }
        }
      default:
        return {
          type: 'NoteTxt',
          info: { txt: '' }
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {

        const notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#ffffff'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#ffffff'
                }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}





// function _setNextPrevNoteId(note) {
//     return storageService.query(NOTE_KEY).then((notes) => {
//         const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
//         note.nextNoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id
//         note.prevNoteId = notes[noteIdx - 1]
//             ? notes[noteIdx - 1].id
//             : notes[notes.length - 1].id
//         console.log('note in setnext ', note)
//         return note
//     })
// }


function createNote (type) {
    let note;
    switch (type) {
        case 'NoteTxt':
            note = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            };
            break;
        case 'NoteImg':
            note = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            };
            break;
        case 'NoteTodos':
            note = {
                id: utilService.makeId(),
                createdAt: Date.now(),
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            };
            break;
    }
    return note;
}


function getNextId(notes) {
    const ids = notes.map(note => note.id);
    const lastId = ids[ids.length - 1];
    const lastNum = Number(lastId.substr(1));
    return `n${lastNum + 1}`;
  }

function pinNote (id){
    return get(id).then (note =>{
        note.isPinned = !note.isPinned
    })
}





