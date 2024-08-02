import React from "react";
import Tree from "react-d3-tree";
import "./App.scss";
import { TreeData } from "./constants/tree";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";

const orgChart = TreeData;

function OrgChartTree() {
  const [currentTextLink, setCurrentTextLink] = React.useState("");
  const [currentVoiceLink, setCurrentVoiceLink] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = (info: any) => {
    setCurrentTextLink(info?.linkToText ? info.linkToText : "");
    setCurrentVoiceLink(info?.linkToVoice ? info.linkToVoice : "");
    info ? setOpen(true) : setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    setCurrentTextLink("");
    setCurrentVoiceLink("");
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-box">
            <Typography id="modal-modal-title" variant="body2">
              Get more information about this version of the script
            </Typography>
            <Stack direction="row" spacing={1} className="stack">
              {currentTextLink.length && (
                <IconButton
                  aria-label="Read Text"
                  color="primary"
                  onClick={() => {
                    window.open(currentTextLink, "_blank");
                    handleClose();
                  }}
                >
                  <ArticleOutlinedIcon />
                </IconButton>
              )}
              {currentVoiceLink && (
                <IconButton>
                  <RecordVoiceOverOutlinedIcon
                    color="primary"
                    onClick={() => {
                      window.open(currentVoiceLink, "_blank");
                      handleClose();
                    }}
                  />
                </IconButton>
              )}
            </Stack>
          </Box>
        </Modal>
      </div>
      <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
        <Tree
          data={orgChart}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          orientation="vertical"
          depthFactor={150}
          collapsible={false}
          onNodeClick={(info) => handleOpen(info.data.attributes)}
        />
      </div>
    </>
  );
}

export default OrgChartTree;
