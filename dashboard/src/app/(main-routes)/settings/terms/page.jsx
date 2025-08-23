"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "@/components/editor/ToolbarPlugin";
import { useState } from "react";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import PageContainer from "@/components/container/PageContainer";

const initialText = `Welcome to Press!! By using the Press! application, services, or accessing any of the content provided on the Pod Love platform, you agree to the following Terms of Use ("Terms"). Please read these Terms carefully before using our services. If you do not agree to these Terms, you must not use the Press! app or any of its associated services.

1. Acceptance of Terms
By creating an account or using the Press! app, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. These Terms constitute a legally binding agreement between you and Press! LLC ("Press!," "we," "our," or "us"). If you do not accept and agree to these Terms, you are not authorized to use our services.

2. Eligibility
You must be at least 18 years of age to create an account and use the Press! platform. By using the app, you affirm that you meet this requirement and that the information you provide is accurate. You must also be legally able to form a binding contract under applicable law.

3. Account Registration
To use Press!, you will need to create an account by providing certain personal information, such as your name, age, location, and other demographic data. You agree to provide accurate and truthful information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
`;

const editorConfig = {
  theme: {
    paragraph: "editor-paragraph",
  },
  onError(error) {
    throw error;
  },
  nodes: [
    ListNode,
    ListItemNode,
    HeadingNode,
    QuoteNode,
  ],
  editorState: () => {
    const root = $getRoot();
    const paragraph = $createParagraphNode();
    paragraph.append($createTextNode(initialText));
    root.append(paragraph);
  },
};

const Terms = () => {
  const [content, setContent] = useState(initialText);

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setContent(root.getTextContent());
    });
  };

  const handleSave = () => {
    console.log("Saved content:", content);
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="h-[78vh] overflow-auto scrl-hide">
          <h2 className="text-xl font-medium text-gray-800">Terms and Conditions</h2>
          <LexicalComposer initialConfig={editorConfig}>
            <ToolbarPlugin />
            <RichTextPlugin
              contentEditable={<ContentEditable className="min-h-[300px] rounded-md outline-none" />}
              placeholder=""
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={handleChange} />
          </LexicalComposer>
        </div>

        <div className="flex justify-center">
         <button onClick={handleSave} className="px-4 py-1 bg-primary text-white rounded-xs text-sm hover:bg-primary/90 transition cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Terms;
