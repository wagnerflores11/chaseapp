import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();
const config = {
    position: toast.POSITION.TOP_RIGHT,
    autoclose: 5000
}

export default class Notify {
    success = (message) => {
        toast.success (message, config)
    }
    error = (message) => {
        toast.error(message, config)
    }
    warn = (message) => {
        toast.warn(message, config)
    }
}