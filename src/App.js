import "./main.scss"
import {useState,useEffect} from "react"
function App() {
  const [textArea,setTextArea]=useState("");
  const [titleArea,setTitleArea]=useState("");
  const [notes,setNotes]=useState(
    [
      {
      editing:false,
      title:"Title 1",
      text:"test note 1",
      time:"12-10-2021",
    },
    {
      editing:false,
      title:"Title 2",
      text:"test note 2",
      time:"12-10-2021",
    }
  ]);

  const textEdit=(event)=>{
    let new_obj=[...notes];
    new_obj[event.target.id].editing=true;
    setNotes(new_obj);
  }
  const saveNote=(event)=>{
    let new_obj=[...notes];
    new_obj[event.target.id].editing=false;
    new_obj[event.target.id].title=titleArea;
    new_obj[event.target.id].text=textArea;
    setNotes(new_obj);

  }
  useEffect(()=>{
    if(localStorage.getItem("notes")){
      const old_notes=localStorage.getItem("notes")
      console.log(old_notes)
    setNotes(JSON.parse(old_notes));
    }
    else{
      setNotes(notes);
    }
    
  },[])

  useEffect(()=>{
    if(notes){
      localStorage.setItem("notes",JSON.stringify(notes))
    }
    
  },[notes]);

  const getTime=()=>{
   const date= new Date();
    return `${date.getUTCDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  }

  const AddNote=()=>{
    setNotes([...notes,   {
      editing:false,
      title:"New Note",
      text:"New Note",
      time:getTime(),
    }]);
  }

  const deleteNote=(event)=>{
    let new_obj=[...notes];
    new_obj.splice(event.target.id, 1)
    setNotes(new_obj);
  }

  return (
   <>
    <div className="container">

    <div className="card">
      <div className="card-body d-flex justify-content-between">
        <h1>Notes</h1><button onClick={AddNote} type="button" class="btn btn-outline-primary">Add New Note</button>
      </div>
    </div>
    
    <div className="d-flex mt-3 flex-wrap justify-content-evenly" >

      {notes&&notes.map((value,index)=>{return <div key={index} className="card notes m-1">
       <div className="note-head d-flex p-2 justify-content-between">
         <span className="text-secondary"><i>{value.time}</i></span>
         <div>
       {notes[index].editing===false?<i id={index} onClick={textEdit} class=" cursor-pointer text-secondary fas fa-edit mx-1"></i>:<i id={index} onClick={saveNote} class="cursor-pointer text-success fas fa-check"></i>}  
       <i id={index} onClick={deleteNote} class="cursor-pointer text-danger fas fa-trash-alt mx-1"></i>
         </div>

       
       </div>
       <div className="card-body">
         <h1 id={index} onClick={textEdit}>{notes[index].editing===false&&value.title}</h1>
         <input onChange={(e)=>{setTitleArea(e.target.value)}} defaultValue={notes[index].title} className={`note-edit w-100 ${notes[index].editing===false&&"d-none"}`}></input>
         <div className="markdown"></div>
        <p id={index} onClick={textEdit} className="pt-1">{notes[index].editing===false&&value.text}</p> 
      <textarea onChange={(e)=>{setTextArea(e.target.value)}} defaultValue={notes[index].text} className={`form-control ${notes[index].editing===false&&"d-none"}`} id="floatingTextarea2"></textarea>

       </div>
     </div>
      })}
   
   
 
 
    </div>
   

   
    </div>
   </>
  );
}

export default App;
