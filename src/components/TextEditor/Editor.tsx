"use client"
import { BlockNoteEditor,  filterSuggestionItems,
  PartialBlock, } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote,  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController, } from "@blocknote/react";
import "@blocknote/react/style.css";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom, useSelf } from "../../../liveblocks.config";
import { useCallback, useEffect, useState } from "react";
// import { Avatars } from "@/components/Avatars";
import styles from "./Editor.module.css";
// import { MoonIcon, SunIcon } from "@/icons";
// import { Button } from "@/primitives/Button";
import { Alert } from "./Alert";

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();



  

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);


  


  // console.log("provider",provider)

  

  // console.log("doc",doc)
  if (!doc || !provider) {
    return null;
  } 

  return <BlockNote doc={doc} provider={provider} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

function BlockNote({ doc, provider }: EditorProps) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me:any) => me.info);

  const Content=doc.getXmlFragment("document-store");

  // console.log("Content",Content)

  const username=localStorage.getItem("username")

  const editor: any = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: username as string,
        color: "Red",
      },
    },
  });

  // const getStoredData = () => {
  //   if (editor && editor.document) {
  //     const content = editor.document.toJSON(); // Convert the document to JSON format
  //     console.log("Stored data:", JSON.stringify(content));
  //     return content;
  //   }
  //   return null;
  // };

  // doc.on("update",()=>{
  //       if (editor && editor.document) {
  //     const content = editor.document // Convert the document to JSON format
  //     console.log("Stored data:", JSON.stringify(content));
  
  //   }
  // })

  
  
 



  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const changeTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  return (
    <div className={styles.container}>
      <div className={styles.editorPanel}>
        <BlockNoteView
          editor={editor}
          className={styles.editorContainer}
          theme={theme}

          

        > </BlockNoteView>
      </div>
    </div>
  );
}
