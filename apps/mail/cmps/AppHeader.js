export default {
    template: `
        <header class="app-header">
            <h1>Mister Email</h1>
            <nav>
                <!-- <a @click="setRoute('HomePage')" href="#">Home</a>
                <a @click="setRoute('BookIndex')" href="#">books</a>
                <a @click="setRoute('AboutPage')" href="#">About</a> -->

                <RouterLink to="/">Home</RouterLink> |
                <RouterLink to="/email">your e-mails</RouterLink> |
                <RouterLink to="/about">About</RouterLink>|
                <!-- <RouterLink to="/addBookGoogle">add book from google</RouterLink> -->


            </nav>
        </header>
    `,
    methods: {
        // setRoute(route) {
        //     this.$emit('set-route', route)
        // }
    }
}