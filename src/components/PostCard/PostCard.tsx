import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { ProfilePicture } from "../ProfilePicture/ProfilePicture";
import { CarouselCard } from "../ Carousel/CarouselCard";
import { postCard } from "./PostCardStyles";
import { addLikeThunk, removeLikeThunk } from "../../core/features/userSlice";
import { AppDispatch } from "../../core/store";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface PostCardProps {
  users: {
    doc_ID: string;
    src: string[];
    likes?: string[];
    user: {
      dp: string;
      email: string;
      name: string;
      uid: string;
    };
  };
}
export const PostCard = ({ users }: PostCardProps) => {
  const classes = postCard();
  const dispatch = useDispatch<AppDispatch>();
  const authUser = useSelector((state: any) => state.authReducer.user);
  const [like, setLike] = useState<boolean>();
  const [likeCount, setLikeCount] = useState<any>(0);

  const handleLike = (doc_id: any, user_uid: any) => {
    dispatch(addLikeThunk({ docID: doc_id, userID: user_uid }));
    setLike(true);
  };
  const handleRemoveLike = (doc_id: any, user_uid: any) => {
    dispatch(removeLikeThunk({ docID: doc_id, userID: user_uid }));
    setLike(false);
  };

  const checkLikes = () => {
    if (users.likes?.includes(authUser.uid)) {
      setLike(true);
      setLikeCount(likeCount + 1);
    } else {
      setLike(false);
      setLikeCount(likeCount - 1);
    }
  };
  const checkLength = () => {
    setLikeCount(users?.likes?.length);
  };
  useEffect(() => {
    checkLikes();
    checkLength();
  }, []);
  console.log(users.user);
  
  return (
    <Card className={classes.cardContainer}>
      <CardHeader
        avatar={<ProfilePicture src={users.user.dp} type="profile" />}
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={users.user.name}
      />
      <CarouselCard src={users.src} />
      <CardActions disableSpacing>
        {like ? (
          <IconButton
            onClick={() => handleRemoveLike(users.doc_ID, users.user.uid)}
          >
            <FavoriteIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleLike(users.doc_ID, users.user.uid)}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        )}

        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <IconButton>
          <SendSharpIcon />
        </IconButton>
        <IconButton className={classes.cardActionRight}>
          <BookmarkBorderOutlinedIcon />
        </IconButton>
      </CardActions>
      {users?.likes?.length ? (
        <Typography ml={2} my={1} fontWeight={"bold"}>
          {likeCount} likes
        </Typography>
      ) : null}
    </Card>
  );
};
