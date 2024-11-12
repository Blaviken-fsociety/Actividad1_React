import './App.css'
import {useEffect, useState} from 'react'
import {firebase} from './firebase'

function App() {
  const [lista,setLista]=useState([])
  useEffect(()=>{
    const obtenerDatos= async() => {
      
      try{
        const db= firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData=data.docs.map(doc=>({id:doc.id,...doc.data()}))
      } catch(error){
        console.log(error);
      }
    }
    obtenerDatos()
  },[])

  return (
    <div className='container'>
      <h1>Hola</h1>
    </div>
  )
}

export default App
