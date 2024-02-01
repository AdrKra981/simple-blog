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
} from "slate";
import { Editable, Slate, withReact, ReactEditor } from "slate-react";
import TextEditorToolbar from "../atoms/TextEditorToolbar";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

interface TextEditorProps {}

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return (
    <div
      {...props.attributes}
      contentEditable={false}
      style={{ userSelect: "none" }}
    >
      {props.children}
    </div>
  );
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
      contentEditable={false}
    >
      {props.children}
    </span>
  );
};

const TextEditor: FunctionComponent<TextEditorProps> = () => {
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
          return <DefaultElement attributes={attributes} />;
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
      children: [{ text: "This is initial text" }],
    },
  ];

  const format = (formatType: string) => {
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

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
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

  return (
    <div>
      <Slate editor={editor} initialValue={initialValue}>
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
    </div>
  );
};

export default TextEditor;
