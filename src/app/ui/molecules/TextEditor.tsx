import {
  FunctionComponent,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";
import {
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Transforms,
  Text,
} from "slate";
import { Editable, Slate, withReact, ReactEditor } from "slate-react";
import TextEditorToolbar from "../atoms/TextEditorToolbar";
import { useField } from "formik";
import { FormControl, FormHelperText } from "@mui/material";
import escapeHtml from "escape-html";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface TextEditorProps {
  id: string;
  error: boolean;
  helperText?: string | false | undefined;
}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return <div {...props.attributes}>{props.children}</div>;
};

const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none",
      }}
    >
      {props.children}
    </span>
  );
};

const TextEditor: FunctionComponent<TextEditorProps> = ({
  id,
  error,
  helperText,
}) => {
  const [field, _, helpers] = useField({ name: id });
  const { setValue } = helpers;
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback(
    ({ attributes, children, element }: any) => {
      switch (element.type) {
        case "code":
          return <CodeElement attributes={attributes}>{children}</CodeElement>;
        case "quote":
          return <blockquote {...attributes}>{children}</blockquote>;
        case "link":
          return (
            <a {...attributes} href={element.url}>
              {children}
            </a>
          );
        default:
          return (
            <DefaultElement attributes={attributes}>{children}</DefaultElement>
          );
      }
    },
    []
  );

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const initialValue: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const format = (formatType: string) => {
    Editor.addMark(editor, formatType, true);
    const [match] = Editor.nodes(editor, {
      match: (n) => {
        return (n as any).type === formatType;
      },
    });

    Transforms.setNodes(
      editor,
      { type: match ? undefined : formatType } as any,
      { match: (n) => Editor.isBlock(editor, n as any), split: true }
    );
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (!event.ctrlKey) {
      return;
    }

    event.preventDefault();

    switch (event.key) {
      case "&": {
        editor.insertText("and");
        break;
      }

      case "b": {
        format("bold");
        break;
      }

      case "i": {
        format("italic");
        break;
      }

      default: {
        break;
      }
    }
  };

  const serialize = (node: any) => {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text);
      if (node.bold) {
        string = `<strong>${string}</strong>`;
      }
      return string;
    }

    const children = node.children.map((n) => serialize(n)).join("");

    switch (node.type) {
      case "quote":
        return `<blockquote><p>${children}</p></blockquote>`;
      case "paragraph":
        return `<p>${children}</p>`;
      case "link":
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      default:
        return children;
    }
  };

  return (
    <FormControl fullWidth error={error}>
      <Slate
        editor={editor}
        initialValue={initialValue}
        {...field}
        onChange={(v) => setValue(serialize(editor))}
      >
        <TextEditorToolbar format={format} />
        <Editable
          style={{
            minHeight: 350,
            border: "2px solid black",
            padding: 8,
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly={false}
          onKeyDown={onKeyDown}
        />
      </Slate>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default TextEditor;
