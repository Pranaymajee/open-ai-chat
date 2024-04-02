import React from "react";
import "./App.css";
import { Box } from "@mui/system";
import { PromptCompressor } from "./components/left_box/PromptCompressor";
import { Chat } from "./components/right_box/Chat";

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#191A19",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PromptCompressor />
        <Chat />
      </Box>
    </div>
  );
}

export default App;
