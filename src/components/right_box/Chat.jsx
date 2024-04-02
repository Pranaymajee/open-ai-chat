import { React, useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { ReactComponent as SendButton } from "../../assets/images/send.svg";
import { ReactComponent as ChatBotLogo }  from "../../assets/images/chatbot-logo.svg";
import { ReactComponent as UserLogo } from "../../assets/images/user-logo.svg";
import Button from '@mui/material/Button';
import { sendMsgToOpenAi } from "../../openai";
import { Typography } from "@mui/material";
import Typewriter from "./Typewriter";
import Loader from "../Loader";

export const Chat = () => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        setLoading(true);
        if (input.trim() !== "") {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    text: input,
                    isBot: false
                }
            ]);
            try {
                const response = await sendMsgToOpenAi(input);
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        text: response,
                        isBot: true
                    }
                ]);
            } catch (error) {
                console.error("Error occurred while sending message:", error);
            }
            setLoading(false);
            setInput("");
        }
    };

    const handleRegenerate = async (index) => {
        setLoading(true);
        if (messages[index].text.trim() !== "") {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    text: messages[index].text,
                    isBot: false
                }
            ]);
            try {
                const regeneratedResponse = await sendMsgToOpenAi(messages[index].text);
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        text: regeneratedResponse,
                        isBot: true
                    }
                ]);
            } catch (error) {
                console.error("Error occurred while sending message:", error);
            }
            setLoading(false);
        }
    };

    console.log(loading);
    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
            setInput("");
        }
    }

    return (
        <Box
            sx={{
                height: "100vh",
                width: "70vw",
                backgroundColor: "#191A19",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    height: "94%",
                    width: "96%",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    borderRadius: "10px",
                    padding: "2%",
                }}
            >
                <Box
                    sx={{
                        padding: "2%",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        overflowY: "scroll",
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            display: "none",
                        },
                    }}
                >
                    <Box
                        sx={{
                            height: "max-content",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            flexDirection: "column-reverse"
                        }}
                    >
                        {(loading) && 
                        <Box sx={{
                            position: "absolute",
                            bottom: "-40px",
                            left: "10px"
                        }}>
                            <Loader style={{float: "left"}} />
                        </Box>}
                        
                        
                        {messages.slice().reverse().map((msg, i) =>
                            <>
                                <Box sx={{
                                        height: "max-content",
                                        padding: "2%",
                                        paddingBottom: "3%",
                                        marginBottom : "2%",
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        borderRadius: "10px",
                                        border: "2px solid #EEEEEE",
                                        wordWrap: "break-word", 
                                        overflowWrap: "break-word !important",
                                        backgroundColor: msg.isBot ? "#EEEEEE" : "",
                                        position: "relative"
                                    }}
                                    key={i}
                                >
                                    {msg.isBot ? 
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            height: '25px',
                                            width: "max-content",
                                            position: "absolute",
                                            right: "0px",
                                            bottom: "-30px",
                                        }}>
                                            <Button onClick={() => navigator.clipboard.writeText(messages[messages.length - i - 1].text)} sx={{
                                                backgroundColor: "#EEEEEE",
                                                height: '23px',
                                                minWidth: "50px",
                                                borderRadius: "7px",
                                                textTransform: "none"
                                            }}
                                            >
                                                <Typography sx={{
                                                    fontSize: "1.7vh",
                                                    fontWeight: "bold",
                                                    color: "#61677A",
                                                }}>
                                                    Copy
                                                </Typography>
                                            </Button>
                                            <Button onClick={() => handleRegenerate(messages.length - i - 2)} sx={{
                                                backgroundColor: "#EEEEEE",
                                                height: '23px',
                                                minWidth: "50px",
                                                marginLeft: "5px",
                                                borderRadius: "7px",
                                                textTransform: "none"
                                            }}
                                            >
                                                <Typography sx={{
                                                    fontSize: "1.7vh",
                                                    fontWeight: "bold",
                                                    color: "#61677A",
                                                }}>
                                                    Regenarate response
                                                </Typography>
                                            </Button>
                                        </Box> : 
                                        <></>
                                    }
                                    <Typography sx={{
                                        lineHeight: "1.55rem",
                                        fontWeight: 500
                                    }}>
                                        {i === messages.length - 1 && msg.isBot ? <Typewriter text={msg.text} delay={1} /> : msg.text}
                                    </Typography>
                                    <Box sx={{
                                        height: "40px",
                                        width: "40px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "absolute",
                                        bottom: "-22px",
                                        borderRadius: "10px",
                                        backgroundColor: "#378CE7",
                                        right: msg.isBot ? "" : "20px",
                                        left : msg.isBot ? "20px" : "",
                                    }}>
                                        {msg.isBot ? <ChatBotLogo /> : <UserLogo />}
                                    </Box>
                                </Box>
                                <br />
                            </>
                        )}
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "2%",
                    }}
                >
                    <TextField
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#EEEEEE",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#EEEEEE",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#EEEEEE",
                                },
                                '& .MuiInputBase-input': {
                                    height: '15px',
                                },
                            },
                        }}
                        fullWidth
                        value={input}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setInput(e.target.value)}
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Message Open AI Chat ..."
                    />
                    <Button disabled={input === ""} variant="text" onClick={handleSend}
                        sx={{
                            minWidth: "47.5px",
                            minHeight: "47.5px",
                            ml: 1
                        }}>
                        <SendButton
                            sx={{
                                width: "30px",
                                height: "30px"
                            }}
                        />
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
