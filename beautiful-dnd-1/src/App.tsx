import { useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { nanoid } from 'nanoid';
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
const grid = 8;
const CustomInputGroup = styled(InputGroup)`
  width: 400px; /* Burada istediğiniz genişliği belirleyin */
`;
const CustomDiv = styled.div`
text-align: center;
`;
const QuoteItem = styled.div`
  width: 300px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`;
interface Request{
  id:number;
  content:string;
}
function App() {
const [quotes, setQuotes] = useState <Request[]>([]);
const [newTodo,setNewTodo]=useState('');

const onDragEnd=(result:any)=>{
if (!result.destination)return;
const TodoContent=Array.from(quotes);;
const [removedTodo]=TodoContent.splice(result.source.index,1);
TodoContent.splice(result.destination.index,0,removedTodo);
setQuotes(TodoContent);

}
const addButton=()=>{
  if(!newTodo.trim()) return alert("please enter valid data");
const addId=nanoid()
const addTodo={
  id:addId,
  content:newTodo,
}
setQuotes([...quotes, addTodo]);
setNewTodo("")
}
const removeTodo=(todoId:string)=>{
  setQuotes([...quotes.filter((quote)=>quote.id !== todoId)]);
}

  return (
    <>
    <CustomDiv> 
     <CustomInputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
        </InputGroup.Text>
        <Form.Control
        value={newTodo}
        onChange={(e)=> setNewTodo(e.target.value)}
          placeholder="add to do"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <Button onClick={addButton} variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </CustomInputGroup> 
      </CustomDiv>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='list'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {quotes.map(({ id, content }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <QuoteItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {content}
                     <button onClick={() => removeTodo(id)}><MdDeleteForever /> </button>
                      <button><GrUpdate /></button>
                    </QuoteItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}


export default App