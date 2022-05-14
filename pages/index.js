import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, TextField, InputAdornment, OutlinedInput } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Home() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(new Date())
  const [remark, setRemark] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <div className='m-2 mt-5'>
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
                  <optgroup label="Category 1">
                    <option value={1}>Option 1</option>
                    <option value={2}>Option 2</option>
                  </optgroup>
                  <optgroup label="Category 2">
                    <option value={3}>Option 3</option>
                    <option value={4}>Option 4</option>
                  </optgroup>
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
            <Button>Submit</Button>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}
