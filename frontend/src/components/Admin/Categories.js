import './Categories.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  button: {
    display: 'inline',
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 140,
  },
}));

const Categories =()=>{
    const classes = useStyles();
    const [newMainCategory, setNewMainCategory] = useState('')
    const[newMainImageUrl, setNewMainImageUrl] = useState('')

    const [newSubCategory, setNewSubCategory] = useState('');

    const [loadedMainCategories, setLoadedMainCategories] = useState(null);
    const [loadedSubCategories, setLoadedSubCategories] = useState(null);

    const [logs, setLogs] = useState('');
    const [selectedMainCategory, setSelectdMainCategory] = useState('');
    const [open, setOpen] = useState(false);
  
    const handleChange = (event) => {
      setSelectdMainCategory(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    useEffect(()=>{
      loadMainCategories();
    }, false)


    const submitMainCatHandler = (e)=>{
      e.preventDefault();
      axios({
        method: 'post',
        url: 'http://localhost:8080/category',
        data:{
          categoryName: newMainCategory,
          imageUrl: newMainImageUrl
        }
      })
      .then(response=>{
              
          if (response.data.error){
              setLogs(response.data.error);
          }

          if (response.data.status===true){
                setLogs(`New Main Category ${response.data.message.main_category} addedd successfully`);
                //load updated conditions again from db
                loadMainCategories();
          }
          
      })
    .catch(error=>console.log(error));
      }

    const submitSubCatHandler = (e)=>{
      e.preventDefault();
      axios({
        method: 'post',
        url: 'http://localhost:8080/category/createSubCategory',
        data:{
          mainCategory: selectedMainCategory,
          subCategory: newSubCategory
        }
      })
      .then(response=>{
              
          if (response.data.error){
              setLogs(response.data.error);
          }

          if (response.data.status===true){
                setLogs(response.data.message);
                //load updated conditions again from db
              
          }
          
      })
    .catch(error=>console.log(error));
      }
    


    const loadMainCategories = ()=>{
      axios.get('http://localhost:8080/category')
      .then(response=>{
          setLoadedMainCategories(response.data);
      })
      .catch(error=>console.log(error))
    }



    return(
        <div className='Categories'>

            <h2 className='catHeading'>Categories</h2>
            <bold>{logs!=='' ? `${logs}`:null}</bold>
            <div >
              <form className='categorySection' onSubmit={(e)=>{submitMainCatHandler(e)}}>

                <label className='lblHead'>Add a new Main category</label>
                
                <input type='text' id='inputCategory'
                required
                  value = {newMainCategory}
                  onChange={(e=>setNewMainCategory(e.target.value))}
                 placeholder='add a new main category'/>

              <input type='text' id='inputCategory'
                required
                  value = {newMainImageUrl}
                  onChange={(e=>setNewMainImageUrl(e.target.value))}
                 placeholder='Add image url'/>
                
                <input id='mainCatSubmitBtn' type='submit' value='Create Main Category'/>
              </form>
                
            </div>
            
          
              <div>
              <form className='subCategorySection' onSubmit={(e)=>{submitSubCatHandler(e)}}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-controlled-open-select-label">Main Category</InputLabel>
                        <Select
                        required
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={selectedMainCategory}
                        onChange={handleChange}
                        >
                          {loadedMainCategories!==null ?
                            loadedMainCategories.map(category=>{
                              return(
                                <MenuItem value={category.main_category}>{category.main_category}</MenuItem>
                              )
                            }):null
                          }
                        </Select>
                    </FormControl> 

                <input type='text' id='inputCategory'
                 required
                 value = {newSubCategory}
                 onChange = {(e)=>setNewSubCategory(e.target.value)}
                 placeholder='Add new sub category'/>


                <input id='SubSubmitBtn' type='submit' value='Create sub category'/>
              </form>
            
            </div>

            
        </div>
    );
}

export default Categories;