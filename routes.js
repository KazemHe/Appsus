import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import EmailDetails from './apps/mail/pages/EmailDetails.js'
import EmailEdit from './apps/mail/pages/EmailEdit.js'
import EmailIndex from './apps/mail/pages/EmailIndex.js'
import NoteIndex from './apps/keep/pages/NoteIndex.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},

		{
			path: '/keep',
			component: NoteIndex,
		
		},
		{
			path: '/email',
			component: EmailIndex,
		},
		{
            path: '/email/:emailId',
            component: EmailDetails
        },
        {
            path: '/email/edit/:emailId?',
            component: EmailEdit
        },
	

	],
}

export const router = createRouter(routerOptions)
