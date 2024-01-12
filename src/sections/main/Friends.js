import {useState, forwardRef, useEffect} from 'react';
import {
    Slide,
    Tab,
    Box,
    Dialog,
    Stack,
    Tabs,
    Typography,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FetchFriendRequests, FetchFriends, FetchUsers } from '../../redux/slices/app';

const UsersList = () => {
    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, []);

    const {users} = useSelector((state) => state.app);

    return (
        <>
            {users.map((el, idx) => {
                return <></> // TODO = Render UserComponent
            })};
        
        </>
    )    
}

const FriendsList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchFriends());
    }, []);

    const {friends} = useSelector((state) => state.app);

    return (
        <>
            {friends.map((el, idx) => {
                return <></> // TODO = Render UserComponent
            })};
        
        </>
    )    
}

const FriendsRequestList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchFriendRequests());
    }, []);

    const {friendRequests} = useSelector((state) => state.app);

    return (
        <>
            {friendRequests.map((el, idx) => {
                return <></> // TODO = Render UserComponent
            })};
        
        </>
    )    
}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });  


const Friends = ({open, handleClose}) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

  return (
    <Dialog
            maxWidth="md" 
            open={open} 
            onClose={handleClose}
            keepMounted
            TransitionComponent={Transition}            
            sx={{
                p: 4,               
            }}  
        >
           <Stack
                p={2}
                sx={{
                    width: "100%"
                }}
           >
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
           </Stack>
           <DialogContent
                sx={{height: "100%"}}
           >
                <Stack 
                    spacing={2.5}
                >
                    {(() => {
                        switch (value) {
                            case 0: // Display all users
                                return <UsersList />;
                            case 1: // Display all friends
                                return <FriendsList />;
                            case 2: // Display all friends requests
                                return <FriendsRequestList />;
                            default:
                                break;
                        }
                    })()}

                </Stack>
           </DialogContent>
        </Dialog>
  )
}

export default Friends;