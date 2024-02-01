import {
  Code,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { FunctionComponent } from "react";

interface TextEditorToolbarProps {
  format: (formatType: string) => void;
}

const TextEditorToolbar: FunctionComponent<TextEditorToolbarProps> = ({
  format,
}) => {
  // const editor = useSlate();

  return (
    <div>
      <IconButton onClick={() => format("underline")}>
        <FormatUnderlined />
      </IconButton>
      <IconButton onClick={() => format("bold")}>
        <FormatBold />
      </IconButton>
      <IconButton onClick={() => format("italic")}>
        <FormatItalic />
      </IconButton>
      <IconButton onClick={() => format("code")}>
        <Code />
      </IconButton>
    </div>
  );
};

export default TextEditorToolbar;
