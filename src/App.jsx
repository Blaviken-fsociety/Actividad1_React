import './App.css'
import {useEffect, useState} from 'react'
import {firebase} from './firebase'

function App() {
  const [lista,setLista]=useState([])
  const [nombre,setNombre]=useState('')
  const [apellido,setApellido]=useState('')
  const [id,setid]=useState('')
  const [error,setError]=useState(null)
  const [modoEdicion,setModoEdicion]=useState(false)
  useEffect(()=>{
    const obtenerDatos= async() => {
      
      try{
        const db= firebase.firestore()
        const data = await db.collection('usuarios').get()
        const arrayData=data.docs.map(doc=>({id:doc.id,...doc.data()}))
        setLista(arrayData)
      } catch(error){
        console.log(error);
      }
    }
    obtenerDatos()
  },[])

  //Guardar
  const guardarDatos = async(e) => {
    e.preventDefault()
    if(!nombre.trim()) return alert("Falta el Nombre")
    if(!apellido.trim()) return alert("Falta el Apellido")
      try {
        const db=firebase.firestore()
        const nuevoUsuario={nombre,apellido}
        const dato=await db.collection('usuarios').add(nuevoUsuario)
        setLista([
          ...lista,
          {id:dato.id,...nuevoUsuario}
        ])
      } catch (error) {
        console.log(error);
      }
  }

  //Eliminar
  const eliminarDato=async(id)=>{
    try {
      const db=firebase.firestore()
      await db.collection('usuarios').doc(id).delete()
      const listaFiltrada=lista.filter((item)=>item.id!==id)
      setLista(listaFiltradapt)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-12">
          <h1 className='text-center'>Registro de usuarios</h1>
          <form onSubmit={guardarDatos}>
            <input type="text" placeholder='Ingrese su Nombre'className='form-control mb-2'
            onChange={(e)=>setNombre(e.target.value)}
            value={nombre}
            />

            <input type="text" placeholder='Ingrese su Apellido'className='form-control mb-2' 
            onChange={(e)=>setApellido(e.target.value)}
            value={apellido}
            />

            <div className='d-grid gap-2'>
            <button type='submit' className='btn btn-primary'>Registrar</button>
            </div>
          </form>
        </div>
        <div className="col-12">
          <h1 className='text-center'>Usuarios Registrados</h1>
          <ul className='list-group'>
            {
              lista.map(user=>(<li 
                className='list-group-item' 
                key={user.id}>{user.nombre} {user.apellido}
                <button onClick={()=>eliminarDato(user.id)} className='btn btn-outline-danger float-end me-2'>Eliminar</button>
                <button className='btn btn-outline-warning float-end me-2'>Editar</button>
                </li>))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
