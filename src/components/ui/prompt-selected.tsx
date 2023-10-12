import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { api } from "@/lib/axios";


interface Prompt {
    id: string;
    title: string;
    template: string;
}

interface PrompSelectProps  {
    onPrompSelected: (template: string) => void
}

export function PromptSelecte({onPrompSelected} :PrompSelectProps ) {

    const [prompts, setPrompts] = useState<Prompt[] | null>(null);

    useEffect(() => {
        api.get('/prompts').then((response) => {
            setPrompts(response.data) 
        })
       
    },[])

    function handlePromptSelected(propmptId: string){
     const selectedPrompt = prompts?.find(prompt => prompt.id === propmptId)

     if(!selectedPrompt){
        return
     }

     onPrompSelected(selectedPrompt.template)
    }

    return (
        <Select onValueChange={handlePromptSelected}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um prompt..." />
            </SelectTrigger>
            <SelectContent>
                {
                  prompts?.map(prompt => <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem> )
                }
               
            </SelectContent>
        </Select>
    )
}