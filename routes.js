import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import NotePreview from './apps/keep/cmps/NotePreview.js'
import EmailList from './apps/mail/cmps/EmailList.js'


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
			component: NotePreview,
		
		},
		{
			path: '/email',
			component: EmailList,
		}

	],
}

export const router = createRouter(routerOptions)
