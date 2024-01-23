import {useEffect, useState} from 'react';
import { Box, Stack, Divider, Button, IconButton, Typography, Avatar, Badge, Tabs, Tab, Tooltip} from '@mui/material';
import { ArchiveBox } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
// import PinnedConversations from '../../components/PinnedConversations';
import AllConversations from '../../components/AllConversations';
import { Users, CircleDashed, MagnifyingGlass, Chat, UsersThree, Phone } from '@phosphor-icons/react';
import Friends from '../../sections/main/Friends';
import { socket } from '../../utils/socket';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDirectConversations } from '../../redux/slices/conversation';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import SearchIcon from '@mui/icons-material/Search';
import { faker } from '@faker-js/faker';
import StyledBadge from '../../components/StyledBadge';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const [openDialog, setOpenDialog] = useState(false);
    const theme = useTheme();

   const {conversations} = useSelector((state) => state.conversation.direct_chat);

   console.log(conversations);
  
    useEffect(() => {
        socket.emit("get_direct_conversations", {user_id}, (data) => {
            // data => list of conversations
        })
    }, []);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (

    <>
        <Box 
            sx={{
                position: "relative", 
                height: "100%",              
                width: 400,
                backgroundColor: theme.palette.mode === "light" ? "#fff" : "rgb(30, 30, 30)",
                boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)"
            }}
        >
            <Stack p={3} spacing={2}  sx={{height: "100%"}} >
                <Stack 
                    direction={"column"}
                    width={"100%"}  
                    spacing={2}                  
                >
                    <Stack 
                        height={"50px"}
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                    >
                        <Typography variant="h5">Messages</Typography>
                        <Typography 
                            variant="subtitle2"
                            sx={{
                                width: "25px", 
                                lineHeight: "25px", 
                                borderRadius: "50%", 
                                textAlign: "center", 
                                backgroundColor: "rgb(50, 143, 168)",
                                color: "white",
                            }}
                        
                        >6</Typography>
                    </Stack>
                    <Stack>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search'                                
                            }}              
                            />
                        </Search> 
                    </Stack>
                    <Divider />
                    <Stack>
                        <Tabs value={value} onChange={handleChange} aria-label="icon tabs example" centered>
                            <Tooltip title="Messages">
                                <Tab icon={<Chat size={32} />} aria-label="phone" />
                            </Tooltip>
                            <Tooltip title="Group Chat">
                                <Tab icon={<UsersThree size={32} />} aria-label="phone" />
                            </Tooltip>
                            <Tooltip title="Voice and Video">
                                <Tab icon={<Phone size={32} />} aria-label="phone" />
                            </Tooltip>
                        </Tabs>
                    </Stack>
                </Stack>
                <Stack
                    direction={"column"}
                    width={"100%"} 
                    height={"100%"} 
                    spacing={2}  
                    sx={{
                        overflowX: "hidden",
                        scrollbarWidth: "thin",
                        scrollbarColor: theme.palette.primary.dark,
                    }}  
                >
                    {(() => {
                        switch (value) {
                            case 0:
                                return <AllConversations chatType="Chat" /> 
                            case 1: 
                                return <AllConversations chatType="Group" />           
                                    
                            case 2: 
                                return <AllConversations chatType="Call" />; 
                                            
                            default: 
                                break;
                        }
                    })()}
                </Stack>
            </Stack>
            
        </Box>

        { openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />}

    </>

  )
}

export default Chats;


//  <AllConversations chatType="Chat" />  

{/* <Stack 
direction={"row"}
alignItems={"center"}
justifyContent={"space-between"}
>
<Typography 
    variant="h5"
    letterSpacing={1}
>
    Chats
</Typography>
<Box>
    <IconButton
        onClick={() => {
            handleOpenDialog();
        }}
    >
        <Users />
    </IconButton>
    <IconButton>
        <CircleDashed size={32} />
    </IconButton>
</Box>
</Stack>
<Stack
sx={{
    width: "100%"
}}
>
<Search>
    <SearchIconWrapper>
        <MagnifyingGlass color="#709CE6" size={32}/>
    </SearchIconWrapper>
    <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
    />
</Search>
</Stack>       

<Stack spacing={1}>  
<Stack
    direction={"row"}
    alignItems={"center"}    
    spacing={1.5} 
>
    <ArchiveBox size={24} />               
    <Button>Archive</Button>                   
</Stack>
<Divider />
</Stack>
<Stack
direction={"column"}
height={"calc(100vh - 64px)"}
>
<Stack
     sx={{
        flexGrow: 1,                    
        height: "75%",
        overflowX: "hidden",
        scrollbarColor: theme.palette.primary.dark,
    }}
    spacing={2}     
>
    {/* <PinnedConversations chatType="Chat" /> */}

    {/* <AllConversations chatType="Chat" conversations={conversations} />       */}

// </Stack>                    
// </Stack>          */}