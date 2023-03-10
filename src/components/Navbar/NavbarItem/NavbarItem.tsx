import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routepath";
import { MENU_ITEM } from "../../../constants/menuItemConstants";
import { Grid, Typography, Modal, Box } from "@mui/material";
import { NavbarStyles } from "../navStyles";
import { imageUploadThunk } from "../../../core/features/userSlice";
import { AppDispatch, RootState } from "../../../core/store";
import { ReactComponent as CreatPostIcon } from "../../../Assets/createPost.svg";
import CircularProgress from "@mui/material/CircularProgress";

interface NavbarProps {
  label: string;
  imgSrc: string;
}

const NavbarItem = ({ label, imgSrc }: NavbarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: any) => state.authReducer.user);
  const isLoading = useSelector(
    (state: RootState) => state.userReducer.isLoading
  );

  const classes = NavbarStyles();
  const [open, setOpen] = React.useState(false);
  const [imagePreview, setimagePreview] = useState("");
  const [image, setImage] = useState(null);

  const menuClick = (label: string) => {
    if (label === MENU_ITEM.HOME) {
      navigate(ROUTES.HOME_PAGE);
    }
    if (label === MENU_ITEM.PROFILE) {
      navigate(ROUTES.PROFILE_PAGE);
    }
    if (label === MENU_ITEM.CREATE) {
      handleOpen();
    }
    if(label === MENU_ITEM.SOCKET){
      navigate(ROUTES.MESSAGING);
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setimagePreview("");
  };
  const imageInputPreview = (e: any) => {
    setImage(e.target.files[0]);
    let files = e.target.files[0];
    let imageSrc = URL.createObjectURL(files);
    setimagePreview(imageSrc);
  };

  const createPostHandler = async () => {
    if (image) {
      await dispatch(
        imageUploadThunk({
          imageUpload: image,
          user: currentUser,
        })
      );
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <Grid item className={classes.listStyle} onClick={() => menuClick(label)}>
        <img src={imgSrc} />
        <Typography>{label}</Typography>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modalStyle}>
          <Grid>
            {imagePreview === "" ? (
              <Typography>Create new post</Typography>
            ) : (
              <Typography
                onClick={createPostHandler}
                color="primary"
                fontWeight={"bold"}
                ml={60}
              >
                Post
              </Typography>
            )}
          </Grid>
          {isLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Box className={classes.previewPost}>
              {imagePreview !== "" ? (
                <img id="blah" src={imagePreview} />
              ) : (
                <Box className={classes.previewPost}>
                  <form>
                    <CreatPostIcon />
                    <Typography variant="h5">
                      Drag photos and videos here
                    </Typography>
                    <label className={classes.createPostBtn}>
                      <input
                        type="file"
                        accept="image/*"
                        multiple={true}
                        onChange={(e) => imageInputPreview(e)}
                      />
                      Search from computer
                    </label>
                  </form>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default NavbarItem;
