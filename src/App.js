import React,{useEffect, useState} from 'react'
import './App.css';
import Alert from './Alert';
import List from './List';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [name,setName] = useState('');
  const [list,setList] = useState(getLocalStorage());
  const [edit,setEdit] = useState(false);
  const [editID,setEditId] = useState(null)
  const [alert,setAlert] = useState({
    show:false,
    msg:'',
    type:''})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      showAlert(true,'Please enter values','danger')
      //alert code
      // setAlert({
      //   show:true,
      //   msg:'Please enter values',
      //   type:'danger'
      // })
    }
    else if( name && edit){
      //Editing code
      setList(
        list.map((item)=>{
        if(item.id === editID){
          return {...item,title:name}
        }
        return item
      })
      )
      setName('')
      setEdit(false)
      setEditId(null)
      showAlert(true,'item edited','success')
    }
    else{
      //New list code
      showAlert(true,'item added to list','success')
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list,newItem]);
      console.log(list);
      setName('');
    }
  }

  const showAlert = (show=false,msg="",type="") =>{
    setAlert({show,msg,type})

  }

  const clearList = () =>{
    showAlert(true,"Empty list",'danger')
    setList([])
  }

  const removeItem = (id) =>{
    showAlert(true,"Item Removed",'danger')
    setList(list.filter((item)=>item.id !==id))
  }
  const editItem = (id) =>{
    const specificEdit = list.find((item)=>item.id===id);
    showAlert(true,'Edit Item','danger')
    setEdit(true);
    setEditId(id);
    setName(specificEdit.title);
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery List</h3>
        <div className='form-control'>
          <input type="text" className='grocery' placeholder='e.g. eggs' value={name}
          onChange={(e) => setName(e.target.value)}/>
          <button type="submit" className='submit-btn'>{edit?'edit':'submit'}</button>
        </div>
      </form>
      <div className='grocery-container'>
        <List item={list} removeItem={removeItem} editItem={editItem}/>
        <button className='clear-btn' onClick={clearList}>clear items</button>
      </div>
    </section>
  );
}

export default App;
