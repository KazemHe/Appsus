import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'

import EmailList from './apps/mail/cmps/EmailList.js'
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
			component: EmailList,
		}

	],
}

export const router = createRouter(routerOptions)
