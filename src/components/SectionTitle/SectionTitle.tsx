import { FC } from "react";
import { Typography } from "@mui/material";

const sectionTitleSx = {
  sectionTitle: {
    textTransform: "uppercase",
    color: "#0A2A3B",
    fontSize: { xs: "36px", md: "48px" },
  },
};

export interface SectionTitleProps {
  title: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title }) => {
  return (
    <Typography component="h4" variant="h4" align="center" sx={sectionTitleSx}>
      {title}
    </Typography>
  );
};

export default SectionTitle;
