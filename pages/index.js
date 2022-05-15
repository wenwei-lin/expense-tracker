import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, TextField, InputAdornment, OutlinedInput, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState, useEffect } from 'react';
import moment from 'moment';


export default function Home() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date())
  const [remark, setRemark] = useState('')
  const [amount, setAmount] = useState('')
  const [categories, setCategories] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const getCategories = async () => {
    await fetch('https://expense-tracker-api.azurewebsites.net/api/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const submit = () => {
    const body = {
      title,
      category,
      date: moment(date).format("YYYY-MM-DD"),
      remark,
      amount
    }
    console.log(body)
    fetch('https://expense-tracker-api.azurewebsites.net/api/addRecord', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'applicaiton/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.status)
      .then(status => {
        if (status === 200) {
          handleClickOpen()
          setTitle('')
          setCategory('')
          setRemark('')
          setAmount('')
        }
      })
      
  }

  return (
    <div className='flex justify-center'>
      <div className='max-w-sm m-2 mt-5'>
        <form>
          <Card>
            <CardContent>
              <div>
                <h1 className=' text-blue-500'>Record your expense</h1>
              </div>
              <div>
                <FormControl className='w-full'>
                  <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl className='mt-5 w-full'>
                  <InputLabel htmlFor="category">Category</InputLabel>
                  <Select native defaultValue="" id="category" label="Category" value={category} onChange={e => setCategory(e.target.value)}>
                    <option aria-label="None" value="" />
                    {categories.length != 0 && categories.map(category => (
                      <optgroup label={category.name} key={category.id}>
                        {category.child_categories.length != 0 && category.child_categories.map(child => (
                          <option value={child.id} key={child.id}>{child.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className='mt-5 w-full'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      label="Date"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
                <FormControl className='mt-5 w-full'>
                  <TextField
                    id="remark"
                    label="Remark"
                    variant="outlined"
                    value={remark}
                    onChange={e => setRemark(e.target.value)}
                  />
                </FormControl>
                <FormControl className='mt-5 w-full'>
                  <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    startAdornment={<InputAdornment position="start">¥</InputAdornment>}
                    label="Amount"
                    type='number'
                  />
                </FormControl>
              </div>
            </CardContent>
            <CardActions>
              <Button onClick={submit}>Submit</Button>
              <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Information"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You have successfully submit the record! Keep going and track your next record!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Great!
                  </Button>
                </DialogActions>
              </Dialog>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  )
}
