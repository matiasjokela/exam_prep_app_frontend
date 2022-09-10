import React from 'react'
import ReactDOM from 'react-dom/client'
//import { Provider } from 'react-redux'
import App from './App'
//import store from './utils/store'
//import './scss/custom.scss'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
	//<Provider store={store}>
	<div className='container-fluid'>
		<App />
	</div>
		
	//</Provider>
)
