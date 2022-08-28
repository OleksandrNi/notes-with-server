import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const SideMenu = ({noteId, deleteNote, notesLength, setNoteIdRemove, setNoteIdAdd, isShowAddSubButton}) => {

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => {deleteNote(noteId); handleClose()}}>Delete note</MenuItem>
        {notesLength ? <MenuItem onClick={() => {setNoteIdRemove(noteId); handleClose()}}>Remove Subnote</MenuItem> : null}
        {!notesLength && isShowAddSubButton && <MenuItem onClick={() => {setNoteIdAdd(noteId); handleClose()}}>Hide form</MenuItem>}
        {!notesLength && !isShowAddSubButton && <MenuItem onClick={() => {setNoteIdAdd(noteId); handleClose()}}>Add Subnote</MenuItem>}
      </Menu>
    </div>
  )
};

export default SideMenu;