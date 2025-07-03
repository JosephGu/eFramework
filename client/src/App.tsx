import { useEffect } from 'react'
import Menu from './components/Menu'
import './App.css'


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

  function clickMe() {
    fetch('./getUsers', {
      method: 'GET', credentials: 'include',
    }).then((res) => {
      console.log(res.body);
    })
  }

  return (
    <>
      <Menu></Menu>
      <button onClick={() => clickMe()}>Click Me</button>
    </>
  )
}




export default App
