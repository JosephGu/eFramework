import { useEffect } from 'react'
import Menu from './components/Menu'
import './App.css'
import Cookies from 'js-cookie';


function App() {
  useEffect(() => {
    fetch('/initPortal', {
      method: 'GET',
      credentials: 'include'
    }).then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log('res', res);
      return res;
    }).catch(error => {
      console.error('Fetch error:', error);
    })
      .finally(() => {
        console.log('Fetch request completed');
      });
  }, [])



  return (
    <>
      <Menu></Menu>
      <button onClick={()=>clickMe()}>Click Me</button>
    </>
  )
}


function clickMe(){
  const csrfToken=Cookies.get('csrfToken');
  console.log('csrfToken',csrfToken);
}

export default App
