import { Button, Card, Checkbox, Grid, List, ListItem, Paper, TextField, Typography, ListItemIcon } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import './App.css';
import AddTaskIcon from '@mui/icons-material/AddTask';

function App() {
  const [task, setTask] = useState("");
  const [data, setData] = useState(()=>{
    let saveTodos= localStorage.getItem("todos");
    if(saveTodos){
      return JSON.parse(saveTodos);
    }
    else{
      return [];
    }
  })
  

  const handleInsert = () => {
    setData([...data, { id: data.length + 1, title: task, status: true }]);
    setTask("");
  }
  useEffect(()=>{
       localStorage.setItem("todos",JSON.stringify(data));
  },[data]);
  const handleDelete = (id) => {
    setData(data.filter((task) => task.id !== id))

  }
  const handleChecked = (id,status) => {

    if (!status) {

      setData(data.map((item) => (item.id === id) ? { ...item, status: true } : item));
    
    }
    else {

      setData(data.map((item) => (item.id === id) ? { ...item, status: false } : item));
      
    }

  }
  return (
    <>
      <Container>
        <Grid container sx={{ justifyContent: "center", }}>
`<Grid item lg={6}>
            <Typography variant='h2' sx={{ color: 'white',backgroundColor:"gray", textAlign: 'center', borderRadius: 2 }} my={2}>
              Todo App
            </Typography>
            <Card sx={{ height: 600 }}>
              <Paper elevation={2} sx={{ display: 'flex', gap: 1, padding: 1.5 }}>
                <TextField sx={{ width: '90%' }} value={task} onChange={(e) => setTask(e.target.value)} placeholder='e.g buy a milk,food,vegitable etc...' />
                <Button variant='contained' onClick={handleInsert} startIcon={<AddTaskIcon />} >Add</Button>
              </Paper>
              <Card>
                <List> {
                  data.map((value, key) => (
                    <ListItem key={key} secondaryAction={<Button variant='contained'
                      color='error' onClick={() => handleDelete(value.id)}>Delete</Button>}>
                      <ListItemIcon>
                        {
                          (value.status)? <Checkbox onChange={() => handleChecked(value.id,value.status)}></Checkbox>:
                          <Checkbox defaultChecked onChange={() => handleChecked(value.id,value.status)}></Checkbox>
                        }
                       
                      </ListItemIcon>
                      {value.status && value.title} {(!value.status) && <del>{value.title}</del>}
                    </ListItem>
                  ))
                }
                </List>
              </Card>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;