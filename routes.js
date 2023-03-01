import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
// import EmailList form './apps/mail/pages/EmailList.js'
import NotePreview from './apps/keep/cmps/NotePreview.js'


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
