import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { v4 } from "uuid";
import { ProfilePicture } from "../ProfilePicture/ProfilePicture";

interface SuggestionProps {
  users: any;
}

export const Suggestion = ({ users }: SuggestionProps) => {
  console.log(users);
  return (
    <>
      <Typography mx={2} ml={6} color="#8e8e8e" fontWeight={"500"}>
        Suggestions for you
      </Typography>
      <br />

      {Array.isArray(users) &&
        users.map((val: any) => {
          return (
            <div key={v4()}>
              <Grid container direction="row" mx={6}>
                <Box
                  display="flex"
                  justifySelf="center"
                  alignSelf="center"
                  marginRight={"12px"}
                >
                  <ProfilePicture src={val.dp} type="profile" />
                </Box>
                <Grid>
                  <Typography fontWeight={"500"} fontSize={"15px"}>
                    {val.name}
                  </Typography>
                </Grid>
              </Grid>
              <br />
            </div>
          );
        })}
      <br />
    </>
  );
};
