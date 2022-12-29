import { makeStyles } from "@mui/styles";

export const homeStyles = makeStyles({
  parentContainer: {
    margin: "none",
    paddingLeft: "12rem",
    backgroundColor: "#fafafa",
    display: "flex",
    flexDirection: "row",
  },
  storyContainer: {
    paddingTop: "20px",
  },
  postsContainer: {
    marginTop: "20px",
  },
  cardText: {
    paddingRight: "80px",
    "& a": {
      fontSize: "14px",
      fontWeight: "bold",
      letterSpacing: "0.5px",
      cursor: "pointer",
      textDecoration: "inherit",
      color: "inherit",
    },
    "& p": {
      fontSize: "14px",
      color: "#8e8e8e",
    },
  },
  cardPicture: {
    paddingRight: "10px",
    cursor: "pointer",
  },
  cardAction: {
    "& p": {
      color: "#0095f6",
      fontWeight: "bold",
      fontSize: "12px",
    },
  },
});
