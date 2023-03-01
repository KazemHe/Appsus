import HomePage from './views/HomePage.js'
import AboutUs from './views/AboutUs.js'
import NoteList from './apps/keep/cmps/NoteList.js'
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
			component: NoteList,
		},
		{
			path: '/email',
			component: EmailList,
		}
	],
}

export const router = createRouter(routerOptions)
