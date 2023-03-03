'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import emailsJson from '../emails.json' assert {type: 'json'}
const EMAIL_KEY = 'emailDB'

_createEmails()

export const emailService = {
    query,
    get,
    remove,
    save,
    getEmptyEmail,
    // addReview,

}

function query(filterBy = {}) {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                emails = emails.filter(email => regex.test(email.subject))
            }
            if (filterBy.status) {
                emails = emails.filter(email => email.status >= filterBy.status)
            }
            return emails
        })
}

function get(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
        .then(_setNextPrevEmailId)
}

function remove(emailId) {
    return storageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
    console.log(email)
    if (email.id) {
        return storageService.put(EMAIL_KEY, email)
    } else {
        return storageService.post(EMAIL_KEY, email)
    }
}




// const email = {
//     id: 'e101',
//     subject: 'Miss you!',
//     body: 'Would love to catch up sometimes',
//     isRead: false,
//     sentAt: 1551133930594,
//     removedAt: null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
// }


function getEmptyEmail(
    status = 'sent',
    name = '',
    subject = '',
    body = '',
    isRead = false,
    sentAt = Date.now(),
    removed = false,
    from = 'user@appsus.com',
    to = '',
    isStared = false,

) {
    return {
        status,
        name,
        id: '',
        subject,
        body,
        isRead,
        sentAt,
        removed,
        from,
        to,
        isStared,
    }
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}



function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {

        emails = emailsJson
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
}

function _createEmail(subject, isRead = null) {
    const email = getEmptyEmail(subject, isRead)
    email.id = utilService.makeId()
    email.body = utilService.makeLorem(10)
    return email
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

function _setNextPrevEmailId(email) {
    return storageService.query(EMAIL_KEY).then((emails) => {
        const emailIdx = emails.findIndex((currEmail) => currEmail.id === email.id)
        email.nextBookId = emails[emailIdx + 1] ? emails[emailIdx + 1].id : emails[0].id
        email.prevBookId = emails[emailIdx - 1]
            ? emails[emailIdx - 1].id
            : emails[emails.length - 1].id
        console.log('email in setnext ', email)
        return email
    })
}

