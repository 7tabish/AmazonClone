import { useState, useEffect } from 'react';
import './Condition.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { useStateValue } from '../../reducer/StateProvider';


import ProductDataTable from './ProductDataTable';
import { ControlPointDuplicateOutlined } from '@material-ui/icons';

const Condition =()=>{
    const [loadedConditions, setLoadedConditions] = useState(null);
    const [condition, setCondition] = useState('');
    const [logs, setLogs] = useState('');
    const [rows, setRows] = useState([]);
    const [deletedRows, setDeletedRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70,hide: true },
        {field: 'name',headerName: 'Condition Name',sortable: true,width: 300},
      ];

   

    useEffect(()=>{
        laodConditions();
    },[])

    useEffect(()=>{
        if (loadedConditions !==null){
            loadedConditions.map(condition=>{
                
                setRows(rows=>[...rows, {id: condition._id, name:condition.name}])
            })
        }
        
    }, [loadedConditions])



    const submitConditionHandler = event=>{
        event.preventDefault();
        setLogs('');
        axios({
            method: 'post',
            url: 'http://localhost:8080/condition',
            data:{
              conditionName: condition
            }
          })
          .then(response=>{
              
              if (response.data.error){
                  setLogs(response.data.error);
              }

              if (response.data.status===true){
                    setLogs(`New condition ${response.data.message.name} addedd successfully`);
                    //load updated conditions again from db
                    laodConditions();
              }
              
          })
          .catch(error=>console.log(error));
        };
    
        const laodConditions =()=>{
            axios.get('http://localhost:8080/condition')
            .then(response=>{
                setLoadedConditions(response.data);
                
            })
            .catch(error=>console.log(error))
        }
      
    const onRowSelection = (e)=>{
        setDeletedRows(deletedRows => [...deletedRows, e.data.id])
    }

    const handleRowsPurge =()=>{
        console.log('deleted rows ', deletedRows)
    }

    return(
        <div className='Condition'>
        
                <h2 className='catHeading'>Conditions</h2>
            <div className='condition__input__block'>
            <form className='condition__input__section' onSubmit={(e)=>submitConditionHandler(e)}>
                <input type='text'
                required
                 id='inputCondition'
                  placeholder='add a new condition'
                  onChange={(e)=>setCondition(e.target.value)}
                  value={condition}/>


                <input type='submit'
                 id='conditionSubmitBtn'
                  value='Add Condition'/>
            </form>
            
            </div>
            <bold>{logs!=='' ? `${logs}`:null}</bold>
            
            <ProductDataTable 
            columns={columns}
            rows = {rows}
            onRowSelected = {onRowSelection}/>

            <Button variant='contained' onClick={()=>handleRowsPurge()}>Delete Conditons</Button>
        </div>
    );
}

export default Condition;