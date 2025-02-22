import './style.css';
import { useState } from 'react';
import json from './data.json'


const List = ({list, addNodeToList, deleteNodeFromList}) =>{
  const [isExpended, setIsExpended]=useState(false)
  return (
    <div className='container'>
      {list.map((node) => (
        <div key={node.id}>
          {/* <div> */}
          {node.isFolder && <span onClick={()=>setIsExpended((prev) =>({...prev ,[node.name]:!prev[node.name]}))}>{isExpended?.[node.name]? "▿":"▹"}</span>}
          <span onClick={()=>setIsExpended((prev) =>({...prev ,[node.name]:!prev[node.name]}))}>{node.name}</span>
          {node.isFolder && <img src="https://cdn-icons-png.flaticon.com/512/4732/4732392.png" alt="open file" className='icon' onClick={()=>addNodeToList(node.id)}/>}
          {/* </div> */}
          <span onClick={()=>deleteNodeFromList(node.id)}><img src="https://www.clipartmax.com/png/middle/84-842915_delete-icon-png-red.png" alt="delete" className='icon' /></span>
          {isExpended?.[node.name] && node?.children && <List list={node.children} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList} />}
          </div>
        ))}
      
    </div>
  )
}

function App() {
  const[data,setData]=useState(json);

  const deleteNodeFromList=(itemId)=>{
    const UpdateTree=(list)=>{
      return list.filter(node=> node.id !== itemId).map((node)=>{
          if(node.children){
            return {...node, children:UpdateTree(node.children)}
          }
          return node;
      });
    }
    setData((prev)=>UpdateTree(prev));
  }
  
  const addNodeToList=(parentId)=>{
    const name = prompt("Enter name of folder")
     const UpdateTree=(list)=>{
       return list.map( node =>{
        if(node.id === parentId){
          return{
            ...node,
            children:[...node.children,{id:Date.now(),name:name,isFolder: true, children:[]},]
          }
        }
        if(node.children){
          return{...node, children: UpdateTree(node.children)}
        }
        return node;
       })
     }
     setData((prev)=>UpdateTree(prev));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading'>File Explorer</h1>
        <List list={data} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList}/>
      </header>
    </div>
  );
}

export default App;
