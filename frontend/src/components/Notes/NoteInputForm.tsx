import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Upload } from "lucide-react";

import { Card, CardContent, CardFooter } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

import TextAreaTab from "./TextAreaTab";
import FileUploadTab from "./FileUploadTab";

import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

import { GenerateAIResponseProps } from "@/types/ai.types";
import { cn } from "@/lib/utils";
import { FileUploadSchema, TextInputSchema } from "@/utils/formSchemas";

interface NoteInputFormProps {
  onSubmit: (props: GenerateAIResponseProps) => void;
}

const NoteInputForm = ({ onSubmit }: NoteInputFormProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [activeTab, setActiveTab] = useState<"text" | "files">("text");

  const textInputForm = useForm<z.infer<typeof TextInputSchema>>({
    resolver: zodResolver(TextInputSchema),
  });

  const fileUploadForm = useForm<z.infer<typeof FileUploadSchema>>({
    resolver: zodResolver(FileUploadSchema),
  });

  const switchTo = (tab: "text" | "files") => {
    if (tab === "text") {
      setSelectedFiles(null);
      fileUploadForm.reset();
    }
    if (tab === "files") {
      setText("");
      textInputForm.reset();
    }
    setActiveTab(tab);
  };

  const handleChangeText = (e: string) => {
    setText(e);
  };

  const handleUploadText = () => {
    const trimmedText = text.trim();

    {
      toast({
        title: "You submitted this note:",
        description: trimmedText,
      });
    }

    onSubmit({
      input: trimmedText,
    });
    setText("");
  };

  const handleChangeFiles = (files: FileList) => {
    if (files) {
      fileUploadForm.trigger("files");
      setSelectedFiles(files);
    }
  };

  const handleUploadFiles = async () => {
    try {
      if (!selectedFiles) {
        throw new Error("No files selected");
      }

      onSubmit({
        input: selectedFiles,
      });

      setSelectedFiles(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  return (
    <Card className="w-11/12 place-self-center pt-4">
      <CardContent>
        <Tabs defaultValue="text" className="flex flex-col gap-3">
          <TabsList className="w-1/2 flex">
            <TabsTrigger
              value="text"
              onClick={() => switchTo("text")}
              className=" m-0 rounded-tr-none"
            >
              Text
            </TabsTrigger>
            <TabsTrigger
              value="files"
              onClick={() => switchTo("files")}
              className=" m-0 rounded-tl-none"
            >
              Files
            </TabsTrigger>
          </TabsList>
          <TextAreaTab form={textInputForm} onChange={handleChangeText} />
          <FileUploadTab
            form={fileUploadForm}
            selectedFiles={selectedFiles}
            onChange={handleChangeFiles}
          />
        </Tabs>
      </CardContent>
      <CardFooter className={isMobile ? "" : "justify-end"}>
        <Button
          className={cn(
            "bg-green hover:bg-green_hover text-base",
            isMobile ? "w-full" : "min-w-72",
          )}
          onClick={() => {
            if (activeTab === "text") {
              textInputForm.handleSubmit(handleUploadText)();
            }
            if (activeTab === "files") {
              fileUploadForm.handleSubmit(handleUploadFiles)();
            }
          }}
        >
          <Upload />
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NoteInputForm;
