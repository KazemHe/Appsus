'use strict'

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()
// _setNextPrevNoteId()
// _makeNoteId(id)

export const noteService = {
    query,save, remove, get, createNote, pinNote, doubleNote, getNoteId


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

   // .then(books => {
    //     if (filterBy.txt) {
    //         const regex = new RegExp(filterBy.txt, 'i')
    //         books = books.filter(book => regex.test(book.title))
    //     }
    //     if (filterBy.price) {
    //         books = books.filter(book => book.listPrice.amount >= filterBy.price)
    //     }
    //     return books
    // })



function get(noteId) {
    console.log(noteId);
    console.log(storageService.get(NOTE_KEY, noteId));
    return storageService.get(NOTE_KEY, noteId)
       
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) return storageService.put(NOTE_KEY, book)
    else return storageService.post(NOTE_KEY, note)
}

function getEmptyBook() {
    return { id: '', title: '', listPrice: { amount: 0 } }
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
                    backgroundColor: '#00d'
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
                    backgroundColor: '#00d'
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

function _createBook(title, amount = 120) {
    const book = getEmptyBook(title, amount)
    book.id = utilService.makeId()
    return book
}


// function addReview(bookId, review) {

//     console.log('hi')
//     let currBook = get(bookId).then(book => {

//         if (!book.reviews) {
//             book.reviews = []
//         }

//         book.reviews.push(review)

//         save(book)
//     })
//     return currBook

// }

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


function createNote(notes) {
    let note
    switch (notes.type) {
        case 'NoteTxt':
            note =
            {
                id: getNextId(notes),
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            }
            break

        case 'NoteImg':

            note = {
                id: getNextId(notes),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }

            }
            break

        case 'NoteTodos':
            note = {
                id: getNextId(notes),
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
            break
    }
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

function doubleNote() {}

function changeTxt(id , noteTxt){
    return get(id , noteTxt)
}

