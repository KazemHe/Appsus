
import EmailIndex from '../apps/mail/pages/EmailIndex.js'
import NoteIndex from '../apps/keep/pages/NoteIndex.js'
import BookInsex from '../books/pages/BookIndex.js'

export default {
	template: `
        <section class="home-page">
        <img  class="hp-img" src="../assets/style/img/mis books.jpg">
           
            <RouterLink  to="/email"><img  class="hp-img" src="../assets/style/img/meEmail.png"></RouterLink>
            <RouterLink  to="/keep"> <img class="hp-img" src="../assets/style/img/keep.png"></RouterLink>

        </section>
    `,



component :{
    EmailIndex,
    NoteIndex,
    BookInsex,

}
}

