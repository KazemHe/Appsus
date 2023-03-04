
import EmailIndex from '../apps/mail/pages/EmailIndex.js'
import NoteIndex from '../apps/keep/pages/NoteIndex.js'
import BookIndex from '../books/pages/BookIndex.js'

export default {
	template: `
        <section class="home-page">
        <RouterLink  to="/book">  <img  class="hp-img" src="../assets/style/img/mis books.jpg"></RouterLink>
           
            <RouterLink  to="/email"><img  class="hp-img" src="../assets/style/img/meEmail.png"></RouterLink>
            <RouterLink  to="/keep"> <img class="hp-img" src="../assets/style/img/keep.png"></RouterLink>

        </section>
    `,



component :{
    EmailIndex,
    NoteIndex,
    BookIndex,

}
}

