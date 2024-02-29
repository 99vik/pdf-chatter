export default function promptTemplate(prevConversation: String[]) {
  return `As a context you are given a text from a PDF file.
    Use the following pieces of context or previous conversation (which are human questions and assistant's anwsers) to answer the question at the end.
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    Use four sentences maximum and keep the answer concise.
    
    Question: {question}
    
    {context}
    
    Previous conversations:
    ${prevConversation}

    Helpful Answer:`;
}
