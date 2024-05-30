import { useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
const grid = 8;
const CustomInputGroup = styled(InputGroup)`
  width: 400px; /* Burada istediğiniz genişliği belirleyin */
`;
const CustomDiv = styled.div`
text-align: center;
`;
const ListCon = styled.div`
  width: 200px;
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
const TodoContent=[quotes];
const [removedTodo]=TodoContent.splice(result.source.index,1);
TodoContent.splice(result.destination.index,removedTodo);
setQuotes(TodoContent);

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
        <Button onClick={onDragEnd} variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </CustomInputGroup> 
      </CustomDiv>
      
        <ul>
        {quotes.map((quote) => (
         <ListCon>  <li key={quote.id}>{quote.content}</li></ListCon>
        ))}
      </ul>
      
    </>
  )
}

export default App