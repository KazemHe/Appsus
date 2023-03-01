import HomePage from './pages/HomePage.js'
import AboutPage, {AboutTeam, AboutServices} from './pages/AboutPage.js'
import EmailIndex from './pages/EmailIndex.js'
import EmailDetails from './pages/EmailDetails.js'
import EmailEdit from './pages/EmailEdit.js'
// import BookAdd from './pages/BookAdd.js'




const { createRouter, createWebHashHistory } = VueRouter
const options = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/about',
            component: AboutPage,
            children: [
                {
                    path: 'team',
                    component: AboutTeam
                },
                {
                    path: 'services',
                    component: AboutServices
                },
            ]
        },
        {
            path: '/email',
            component: EmailIndex
        },
        {
            path: '/email/:emailId',
            component: EmailDetails
        },
        {
            path: '/email/edit/:emailId?',
            component: EmailEdit
        },
        // Last fallback if no route was matched:
        {
            path: '/:catchAll(.*)',
            component: AboutPage
        },

    ]
}
export const router = createRouter(options)

