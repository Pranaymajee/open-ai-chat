import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const PromptCompressor = () => {
    return (
        <Box
        sx={{
            height: "100vh",
            width: "30vw",
            backgroundColor: "#191A19",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            <Typography>Prompt Optimization Area</Typography>
        </Box>
    );
};
