import PollCreator from './components/poll-creator/PollCreator'
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <PollCreator maxOptions={5}/>
      <Toaster position="top-right" toastOptions={{ duration: 10000 }} />
    </>
  )
}

export default App
