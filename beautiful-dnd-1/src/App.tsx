import { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { MdDeleteForever } from 'react-icons/md';
import { GrUpdate } from 'react-icons/gr';
import { Button } from 'react-bootstrap';
import { CgCloseR } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
const grid = 8;

const CustomInputGroup = styled(InputGroup)`
  width: 400px; 
  background: #feeadf ;
`;
const CustomDiv = styled.div`
  text-align: center;
`;

const QuoteItem = styled.div`
  width: 400px;
  border: 1px solid white;
  margin-bottom: ${grid}px;
  background-color: #feeadf;
  padding: ${grid}px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
`;

const Modal = styled.div`
  display: flex;
  align-items: center;
  background-color: #feeadf;
  padding: 20px;
`;

const Modalbg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Area = styled.input`
  padding: 8px;
  width: 300px;

`;

interface Request {
  id: string;
  content: string;
}

function App() {
  const [quotes, setQuotes] = useState<Request[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState('');
  const [updateId, setUpdateId] = useState<string>('');

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const TodoContent = Array.from(quotes);
    const [removedTodo] = TodoContent.splice(result.source.index, 1);
    TodoContent.splice(result.destination.index, 0, removedTodo);
    setQuotes(TodoContent);
  };

  const addButton = () => {
    if (!newTodo.trim()) return alert('Lütfen geçerli bir veri girin');
    const addId = nanoid();
    const addTodo = {
      id: addId,
      content: newTodo,
    };
    setQuotes([...quotes, addTodo]);
    setNewTodo('');
  };

  const removeTodo = (todoId: string) => {
    setQuotes(quotes.filter((quote) => quote.id !== todoId));
  };

  const modalUpdate = (id: string, content: string) => {
    setOpen(true);
    setUpdate(content);
    setUpdateId(id);
  };

  const saveUpdate = () => {
    setQuotes(quotes.map(quote => quote.id === updateId ? { ...quote, content: update } : quote));
    setOpen(false);
    setUpdate('');
    setUpdateId('');
  };

  return (
    <div className="App">
        <div><label htmlFor=""> To Do List</label> </div>
      <div className="todo-container">
        <CustomDiv>
          <CustomInputGroup>
            <Form.Control
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add to do "
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />

          </CustomInputGroup>
        </CustomDiv>
        <Button className='todoaddbutton' onClick={addButton} >Add</Button>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
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
                        <div className="QuoteItem-buttons">
                          <button className='both-button' onClick={() => removeTodo(id)}>
                            <MdDeleteForever />
                          </button>
                          <button className='both-button' onClick={() => modalUpdate(id, content)}>
                            <GrUpdate />
                          </button>
                        </div>
                      </QuoteItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {open && (
          <Modalbg>
            <Modal>
              <Area
                type="text"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
              />
              <div className="todo-button-container">
                <Button className='both-button' onClick={saveUpdate}><TiTick /></Button>
                <Button className='both-button' onClick={() => setOpen(false)}><CgCloseR /></Button>
              </div>
            </Modal>
          </Modalbg>
        )}
      </div>
    </div>
  );
}

export default App;
